# AntiTabHoarder-Beta
# ANTI-TabHoarder (Beta version, LATEST)
ANTI-TabHoarder is a Google Chrome extension that aims to help tab hoarders control their hoarding and to alleviate CPU stress from an excessive amount of unneccesary tabs running.

## Purpose
I wanted to make this extension for 2 reasons: (1) I hoard tabs and don't close them even when I don't use them and (2) my computer isn't powerful enough to sustain this browsing habit of mines. It's no surprise that Google Chrome uses a lot of CPU power and RAM. That is in part due to Google Chrome creating a different process for each tab. Now, when the memory usage is too high due to the large number of times, then Chrome will combine some into a single process in order to mitigate it. In any case, the most simple and efficient way to reduce CPU strain and lessen RAM usage is to delete open tabs.

#### Why not use an existing extension like OneTab? 
Those extensions are great but I wanted to have more control over what I would be closing and was inspired by Window's Task Manager due to the control and valuable information it gives you over your computer's processes. 

## Features
The extension revolves around two main features: the Auto-Delete & the Tab Manager.

#### Auto-Delete
The Auto-Delete feature acts as a preventative measure for tab hoarders. Once toggled on, tab hoarders will be able to input a certain amount of time in minutes or hours, in which newly created tabs will be deleted after the specified delay. 


#### Tab Manager
The Tab Manager, inspired by Window's Task Manager, is an interactive table wherein users will be allowed to view the elapsed time that they have spent focused on each tab and the last date that the tab was visited. Additionally, the table allows for the user to delete and bookmark particular tabs with the information that this extension provides them. Bookmarked tabs are NOT stored in Chrome's Bookmarks Manager but are written to a No-SQL data storage system, IndexedDB, to prevent clogging up and slowing Chrome. To view or clear the bookmarks, the user can access them through the "VIEW BOOKMARKS" button. 
