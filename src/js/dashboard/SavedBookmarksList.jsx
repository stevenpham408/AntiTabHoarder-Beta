import React, { useState } from 'react';
import suspender from "../suspender.js";
import { openDB } from 'idb';
const MenuContext = React.createContext();
import Bookmark from "./Bookmark.jsx"; // we'll create this component soon

async function getAllMealsFromDB() {

    // open the database & grab the database object
    const dbPromise = await openDB('MyIndexedDB');

    const values = await dbPromise.getAll('bookmarks');
    return values;
}
 
const resource = suspender(getAllMealsFromDB());


function MenuContextProvider(){
    const bookmarks = resource.data.read();
    const [bookmarkList, setBookmarkList] = useState(bookmarks);

    const removeBookmark =  async ({target}) => {
        if(target.type==='image'){
            const bookmark = target.parentElement.parentElement;
            let key = (bookmark.getAttribute('id'))
            const dbPromise = await openDB('MyIndexedDB');  
            await dbPromise.delete('bookmarks', ~~key);
            
            const values = await dbPromise.getAll('bookmarks');
            setBookmarkList(values)
        }
    }

    const bookmarksInDB = bookmarkList.map((bookmark) => {
        // return a Meal component for each meal object in DB
        return <Bookmark key={bookmark.id} bookmark={bookmark} />;
    });

    return (
         <div className="menu" onClick={(e) => {removeBookmark(e)}}>
             {bookmarksInDB}</div>
    );
}

export default MenuContextProvider;
export {MenuContext}; 