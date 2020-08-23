export function makeData(){
    return getVarFromLocalStorage('entries')
}

// Helper function that returns a Promise to an array of our custom Tab objects stored in the browser's local storage
export function getVarFromLocalStorage(name){
    return new Promise(function(resolve, reject) {
        chrome.storage.local.get([name], function(items){
            let target = items[name];
            let resultObj = Object.keys(target).map((key) => [Number(key), target[key]]);
            resolve(resultObj)
        });
    })
}
