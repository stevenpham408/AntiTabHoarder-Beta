import '../img/icon-128.png'
import '../img/icon-34.png'
'use strict';
import{ start, end } from './time.js';
let tableEntry = {}
var startTime, endTime;
initializeTableEntries();
updateTitle();
updateLastVisited();
updateTimeElapsedOnTabChange();

console.log(chrome.windows.WINDOW_ID_CURRENT);
function updateTitle(){
	chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){

		if(changeInfo != undefined && changeInfo.favIconUrl != undefined){
			tableEntry[tabId].faviconUrl = changeInfo.favIconUrl;
			console.log('favicon url onupdated: ', tableEntry[tabId].faviconUrl);
			chrome.storage.local.set({entries: tableEntry});

		}

		if(changeInfo != undefined && changeInfo.url != undefined){
			tableEntry[tabId].url = changeInfo.url;
			console.log('yes: ', tableEntry[tabId].url);

			chrome.storage.local.set({entries: tableEntry});

		}

		if(changeInfo != undefined && changeInfo.title != undefined){
			tableEntry[tabId].title = changeInfo.title;
			console.log('New title of ', tabId, 'is', tableEntry[tabId].title)
			chrome.storage.local.set({entries: tableEntry});
		}
	})
}

function initializeTableEntries(){
	chrome.tabs.query({currentWindow: true}, function(arrayOfTabs){
		for(const tab of arrayOfTabs){
			console.log("Query url: ", tab.favIconUrl);
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
			console.log('Debug #1 ', tab.id, results.tabsToDelete);
			delayedDelete(tab.id);
		}
	})
});

// // In the case the user self-deletes the tab before delayedDelete is ran, no errors will be found
chrome.tabs.onRemoved.addListener(function(tabID, removeInfo){
	console.log('Removed', tabID, 'from tableEntry. Original data:', tableEntry[tabID]);
	delete tableEntry[tabID];
	console.log('Check to see if data is now null:', tableEntry[tabID])
	chrome.storage.local.set({entries: tableEntry});

	chrome.storage.local.get(null, function(results){
		if(results.tabsToDelete != undefined && results.tabsToDelete.hasOwnProperty(tabID) && results.auto_delete_toggle == true){
				delete results.tabsToDelete[tabID];
				chrome.storage.local.set({tabsToDelete: results.tabsToDelete});
		}
	});
});

// // Updates the Last Visited column for the current tab
function updateLastVisited(){
	chrome.tabs.onActivated.addListener(function(activeInfo){
		let currentTab = activeInfo.tabId;
		if(tableEntry[currentTab] != undefined){
			tableEntry[currentTab].lastVisited = dateToString((new Date()));
			chrome.storage.local.set( {entries: tableEntry} );
		}
	})
}

// Updates the Time Elapsed column for the current tab
function updateTimeElapsedOnTabChange(){
	chrome.tabs.query({currentWindow: true, active: true}, function(arrayOfTabs){
		let previous = arrayOfTabs[0].id;
		chrome.tabs.onActivated.addListener(function(activeInfo){
			console.log("----------------------------------Time elapsed onActivated-------------------------------------");
			let current = activeInfo.tabId;

			if(tableEntry[previous] != undefined){		
				console.log('Tab switch triggered -- Previous Tab:', tableEntry[previous].title)
				tableEntry[previous].timeElapsed = tableEntry[previous].timeElapsed + end(endTime, startTime);
				chrome.storage.local.set({entries: tableEntry});
			}
 
			if(tableEntry[current].timeElapsed == undefined){
				console.log('Undefined current tab yas -- Title: ', tableEntry[current].title)
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

function dateToString(dateObject) {
	const year = dateObject.getFullYear();
	const month = dateObject.getMonth() + 1;
	const day = dateObject.getDate();
	let hour = dateObject.getHours();
	let minutes = dateObject.getMinutes();
	let seconds = dateObject.getSeconds();
  
	if (dateObject.getHours() < 10) {
	  hour = "0" + dateObject.getHours();
	}
  
	if (dateObject.getMinutes() < 10) {
	  minutes = "0" + dateObject.getMinutes();
	}
  
	if (dateObject.getSeconds() < 10) {
	  seconds = "0" + dateObject.getSeconds();
	}
  
	const formattedDate = month + "/" + day + "/" + year;
	const formattedTime = hour + ":" + minutes + ":" + seconds;
	const finishedFormattedString = formattedDate + ", " + formattedTime;
	return finishedFormattedString;
  }

  let db = null;
  function createDataStore() {
	const request = window.indexedDB.open('MyIndexedDB');
	request.onerrror = function(event) {
		console.log('Error in opening MyIndexedDB.');	
	}
	
	request.onupgradeneeded = function(event){
		db = event.target.result;
		
		let store = db.createObjectStore('bookmarks', {
			keyPath: 'id', autoIncrement: false
		});
		
		store.transaction.oncomplete = function(event) {
			console.log('Store created.')
		}
	}
	
	request.onsuccess = function(event){
		db = event.target.result;
		console.log('MyIndexedDB opened.')
	}
}

function deleteDataStore() {
	const request = window.indexedDB.deleteDatebase('MyIndexedDB');
	request.onerrror = function(event) {
		console.log('Error in deleting MyIndexedDB.');	
	}
	
	request.onsuccess = function(event){
		console.log('Successful deleting MyIndexedDB.');
	}
}

function insertRecord(record){
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