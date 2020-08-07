export function makeData(){
    return getVarFromLocalStorage('entries')
    
}

export function getVarFromLocalStorage2(name){
    return new Promise(function(resolve, reject){
        chrome.storage.local.get([name], function(items){
            resolve(items[name])
        })
    })
}

export function getVarFromLocalStorage(name){
    return new Promise(function(resolve, reject) {
        chrome.storage.local.get([name], function(items){
            let target = items[name];
            let resultObj = Object.keys(target).map((key) => [Number(key), target[key]]);
            resolve(resultObj)
        });
    })
}
