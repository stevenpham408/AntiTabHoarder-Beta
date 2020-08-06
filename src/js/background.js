import '../img/icon-128.png'
import '../img/icon-34.png'
'use strict';
import {makeData, getVarFromLocalStorage2} from './makeData'
import{ start, end } from './time.js';
let tableEntry = {}
// var startTime, endTime;
initializeState();
initializeTableEntries();
updateLastVisited();
// updateTimeElapsedOnTabChange();

// Initialize the states
function initializeState(){
	chrome.storage.local.set({lastVisited: {} });
	chrome.storage.local.set({timeElapsed: {} });
	chrome.storage.local.set({tabsToDelete: {} });
}

function initializeTableEntries(){
	chrome.storage.local.get(null, function(res){
		chrome.tabs.query({currentWindow: true}, function(arrayOfTabs){
			for(const tab of arrayOfTabs){
				tableEntry[tab.id] = {title: tab.title, timeElapsed: '', lastVisited: ''}
				chrome.storage.local.set({entries: tableEntry})
			}
		})
	})
 
}

// Deletes new tabs after a user-specified delay
chrome.tabs.onCreated.addListener(function(tab){
	tableEntry[tab.id] = {title: tab.title, timeElapsed: '', lastVisited: ''}
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
		if(results.tabsToDelete.hasOwnProperty(tabID) && results.auto_delete_toggle == true){
				delete results.tabsToDelete[tabID];
				chrome.storage.local.set({tabsToDelete: results.tabsToDelete});
		}
	});
});

// // Updates the Last Visited column for the current tab
function updateLastVisited(){
	chrome.tabs.onActivated.addListener(function(activeInfo){
		let currentTab = activeInfo.tabId;
		tableEntry[currentTab].lastVisited = dateToString((new Date()));
		chrome.storage.local.set( {entries: tableEntry} );
	})
}

// // Updates the Time Elapsed column for the current tab
// function updateTimeElapsedOnTabChange(){
// 	chrome.tabs.query({currentWindow: true, active: true}, function(arrayOfTabs){
// 		let previous = arrayOfTabs[0].id;
// 		chrome.tabs.onActivated.addListener(function(activeInfo){
// 			console.log("Time elapsed onActivated");
// 			let current = activeInfo.tabId;
// 			chrome.storage.local.get(null, function(results){

// 				// When user changes tabs, we set the new elapsed time to the tab that we switched FROM
// 				results.timeElapsed[previous] = results.timeElapsed[previous] + end(endTime, startTime);
// 				chrome.storage.local.set({timeElapsed: results.timeElapsed});

// 				// Initialize current tab with 0 if it doesn't have a value
// 				if(results.timeElapsed[current] == null || results.timeElapsed[current] == undefined){
// 					results.timeElapsed[current] = 0;
// 				}

// 				// Start a brand new timer for the current tab
// 				startTime = start();
// 				chrome.storage.local.set({timeElapsed: results.timeElapsed});

// 				previous = current;
// 			})
//  		})
// 	})
// }
// // Deletes function after a user-specified amount of time
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

  if (dateObject.getHours() < 10) {
    hour = "0" + dateObject.getHours();
  }

  let minutes = dateObject.getMinutes();
  let seconds = dateObject.getSeconds();


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