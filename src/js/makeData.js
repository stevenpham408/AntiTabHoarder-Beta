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
        // console.log("get: getting "+ name +" from localstorage")
        chrome.storage.local.get([name], function(items){
            let target = items[name];
            console.log("length of target: ", target, "length of items[name]:", items[name] )
            // console.log("   items[name] = " + target)
            let resultObj = Object.keys(target).map((key) => [Number(key), target[key]]);
            alert('Access')
            resolve(resultObj)
        });
    })
}
