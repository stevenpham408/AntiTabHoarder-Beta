import '../img/icon-128.png'
import '../img/icon-34.png'
import{ start, end } from './time.js';

'use strict';

let db = null;
let tableEntry = {}
var startTime, endTime;

initializeTableEntries();
updateTabInfo();
updateLastVisited();
updateTimeElapsedOnTabChange();

// Listener for changes to existing tabs and updates local storage accordingly
function updateTabInfo(){
	chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
		// Saves the favIcon url for the tab when it successfully loads 
		if(changeInfo != undefined && changeInfo.favIconUrl != undefined){
			tableEntry[tabId].faviconUrl = changeInfo.favIconUrl;
			chrome.storage.local.set({entries: tableEntry});
		}

		// Saves the website url for the tab when it successfully loads 
		if(changeInfo != undefined && changeInfo.url != undefined){
			tableEntry[tabId].url = changeInfo.url;
			chrome.storage.local.set({entries: tableEntry});
		}

		// Saves the website title for the tab when it successfully loads 
		if(changeInfo != undefined && changeInfo.title != undefined){
			tableEntry[tabId].title = changeInfo.title;
			chrome.storage.local.set({entries: tableEntry});
		}
	})
}

// Initializes the local storage with all of the currently open tabs of the window for the Tab Manager to fetch data from
function initializeTableEntries(){
	chrome.tabs.query({currentWindow: true}, function(arrayOfTabs){
		for(const tab of arrayOfTabs){
			tableEntry[tab.id] = {id: tab.id, url: tab.url, faviconUrl: tab.favIconUrl, title: tab.title, timeElapsed: 0, lastVisited: '', }
			chrome.storage.local.set({entries: tableEntry})
		}
	})
}

// Deletes new tabs after a user-specified delay
chrome.tabs.onCreated.addListener(function(tab){
	tableEntry[tab.id] = {id: tab.id, url: tab.pendingUrl, title: tab.title, timeElapsed: 0, lastVisited: ''}
	chrome.storage.local.set({entries: tableEntry})
	chrome.storage.local.get(null, function(results){
		if(results.auto_delete_toggle == true){
			results.tabsToDelete[tab.id] = new Date().toString();
			chrome.storage.local.set({tabsToDelete: results.tabsToDelete});
			delayedDelete(tab.id);
		}
	})
});

// // In the case the user self-deletes the tab before delayedDelete is ran, no errors will be found
chrome.tabs.onRemoved.addListener(function(tabID, removeInfo){
	delete tableEntry[tabID];
	chrome.storage.local.set({entries: tableEntry});
	chrome.storage.local.get(null, function(results){
		if(results.tabsToDelete != undefined && results.tabsToDelete.hasOwnProperty(tabID) && results.auto_delete_toggle == true){
				delete results.tabsToDelete[tabID];
				chrome.storage.local.set({tabsToDelete: results.tabsToDelete});
		}
	});
});

// Updates the Last Visited column for the current tab
function updateLastVisited(){
	chrome.tabs.onActivated.addListener(function(activeInfo){
		let currentTab = activeInfo.tabId;
		if(tableEntry[currentTab] != undefined){
			tableEntry[currentTab].lastVisited = (new Date()).toLocaleString();
			chrome.storage.local.set( {entries: tableEntry} );
		}
	})
}

// Updates the Time Elapsed column for the current tab
function updateTimeElapsedOnTabChange(){
	chrome.tabs.query({currentWindow: true, active: true}, function(arrayOfTabs){
		let previous = arrayOfTabs[0].id;
		chrome.tabs.onActivated.addListener(function(activeInfo){
			// console.log("----------------------------------Time elapsed onActivated-------------------------------------");
			let current = activeInfo.tabId;

			if(tableEntry[previous] != undefined){		
				// console.log('Tab switch triggered -- Previous Tab:', tableEntry[previous].title)
				tableEntry[previous].timeElapsed = tableEntry[previous].timeElapsed + end(endTime, startTime);
				chrome.storage.local.set({entries: tableEntry});
			}
 
			if(tableEntry[current].timeElapsed == undefined){
				// console.log('Undefined current tab yas -- Title: ', tableEntry[current].title)
				tableEntry[current].timeElapsed = 0;
			}
			else{
				startTime = start();
				chrome.storage.local.set({entries: tableEntry});
				previous = current;
			}
		})
	})
}

// Helper function that performs an automatic browser tab delete after user-specified amount of time,
// provided that AutoDelete is toggled on
function delayedDelete(tabID){
	let delayedTime;
	chrome.storage.local.get(null, function(results){
		if(results.timeUnit == "minutes") { delayedTime = results.auto_delete_time_amount * 60000 };
		if(results.timeUnit == "hours")  { delayedTime = results.auto_delete_time_amount * 3600000 };
		chrome.storage.local.get(null, function(results){
			setTimeout(function(){
				chrome.storage.local.get(null, function(results){
					if(tabID in results.tabsToDelete){
						chrome.tabs.remove(tabID)
					}
				})	
			}, delayedTime);

		})
	})
}

// Opens a connection to IndexedDB and creates an object store if it does not exist
function createDataStore() {
	const request = window.indexedDB.open('MyIndexedDB');

	// Print a message to the console indicating that our request to connect to IndexedDB failed
	request.onerrror = function(event) {
		console.log('Error in opening MyIndexedDB.');	
	}

	// Opens a connection and creates an object store if our db object is on a different version
	request.onupgradeneeded = function(event){
		db = event.target.result;
		
		let store = db.createObjectStore('bookmarks', {
			keyPath: 'id', autoIncrement: false
		});
		
		store.transaction.oncomplete = function(event) {
			console.log('Store created.')
		}
	}
	
	// Initialize the db object when our request to open a connection to IndexedDB is successful
	request.onsuccess = function(event){
		db = event.target.result;
		console.log('MyIndexedDB opened.')
	}
}

// Deletes the entire object store holding all the bookmarks saved from the extension
function deleteDataStore() {
	const request = window.indexedDB.deleteDatebase('MyIndexedDB');
	request.onerrror = function(event) {
		console.log('Error in deleting MyIndexedDB.');	
	}
	
	request.onsuccess = function(event){
		console.log('Successful deleting MyIndexedDB.');
	}
}

// Inserts a record into IndexedDB in the 'bookmarks' object store
function insertRecord(record){
	// Check if database is open
	if(db){	
		const insertTransaction = db.transaction('bookmarks', 'readwrite');
		const objectStore = insertTransaction.objectStore('bookmarks');

		insertTransaction.oncomplete = function() {
			console.log('All insert transactions are complete.');
		}

		insertTransaction.onerror = function() {
			console.log('Error inserting transactions.');
		}

		let request = objectStore.add(record)
		request.onsuccess = function (event) {
			console.log('Successfully added.');
		}
	}
}

// Listener for IndexedDB operations
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse){
		// When the user clicks on 'Bookmark' for a row in the Tab Manager
		if(request.message == 'insert'){
			insertRecord(request.newBookmark)
		}

		// When the user clicks on the 'View Bookmarks' button
		else if(request.message == 'launch'){
			console.log('Received Launch');
			chrome.tabs.create({ url: chrome.runtime.getURL('./dashboard.html') });
		}
	}
)

createDataStore();