let xhrpromise = new Promise((resolve, reject) => {
    // 可行！！！
    let request = new XMLHttpRequest();
    let url = 'https://www.baidu.com';
    request.open('get', url);
    request.send();
    request.onload = function () {
        if (request.readyState === 4) {
            if (request.status === 200) {
                resolve(request.responseText);
            }
        } else {
            reject('something Error');
        }
    }
})

xhrpromise.then((result) => console.log(result)).catch((error) => console.log(error));