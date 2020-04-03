function test(resolve, reject) {
    // 最简单的Promise例子
    let timeout = Math.random() * 2;
    console.log(timeout);
    setTimeout(function () {
        if (timeout < 1) {
            console.log("call resolve()...");
            resolve('200 ok');
        } else {
            console.log("call reject()...");
            reject(timeout);
        }
    }, timeout * 1000)
}

let p1 = new Promise(test);
let p2 = p1.then(function (result) {
    console.log('成功：' + result);
});
let p3 = p1.catch(function (reason) {
    console.log('fail: ' + reason)
})

// 简化为
new Promise(test).then((result) => {
    console.log('success: ' + result);
}).catch((error) => {
    console.log('fail: ' + error);
})


// 一个Promise的例子：

// 0.5秒后返回input*input的计算结果:
function multiply(input) {
    return new Promise(function (resolve, reject) {
        console.log('calculating ' + input + ' x ' + input + '...');
        setTimeout(resolve, 500, input * input);
    });
}

// 0.5秒后返回input+input的计算结果:
function add(input) {
    return new Promise(function (resolve, reject) {
        console.log('calculating ' + input + ' + ' + input + '...');
        setTimeout(resolve, 500, input + input);
    });
}

var p = new Promise(function (resolve, reject) {
    console.log('start new Promise...');
    resolve(123);
});

p.then(multiply)
    .then(add)
    .then(multiply)
    .then(add)
    .then(function (result) {
        console.log('Got value: ' + result);
    });


// 把AJAX异步执行函数转换为Promise对象
// ajax函数将返回Promise对象:
function ajax(method, url, data) {
    var request = new XMLHttpRequest();
    return new Promise(function (resolve, reject) {
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    resolve(request.responseText);
                } else {
                    reject(request.status);
                }
            }
        };
        request.open(method, url);
        request.send(data);
    });
}
var p = ajax('GET', 'https://lchblog.xyz?name=111');
p.then(function (text) { // 如果AJAX成功，获得响应内容
    console.log(text);
}).catch(function (status) { // 如果AJAX失败，获得响应代码
    console.log('ERROR: ' + status);
});

// 并行执行异步任务 - Promise.all()
var p1 = new Promise(function (resolve, reject) {
    setTimeout(resolve, 500, 'p1');
})

var p2 = new Promise(function (resolve, reject) {
    setTimeout(resolve, 2000, 'p2');
})

Promise.all([p1, p2]).then(function (results) {
    console.log(results);
})

// 有些时候，多个异步任务是为了容错
// 比如，同时向两个URL读取用户的个人信息，只需要获得先返回的结果即可。
//这种情况下，用Promise.race()实现：
Promise.race([p1, p2]).then((result) => {
    console.log(result);
})



var xhr = createXHR();
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
            alert(xhr.responseText);
        } else {
            alert("Request was unsuccessful: " + xhr.status);
        }
    }
};

xhr.open("post", "postexample.php", true);
var form = document.getElementById("user-info");
xhr.send(new FormData(form));