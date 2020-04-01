// 基本的Ajax请求写法：
let url = 'https://www.baidu.com'

function getSomething(url) {
    // get
    let request = new XMLHttpRequest; // 创建XHR对象
    request.open('GET', url); // 设置请求类型、请求URL
    request.responseType = 'text'; // 设置返回类型
    request.onload = function () { // onload事件，只要浏览器接收到响应就会触发
        // console.log(request.response);
        if (request.status == 200) {
            console.log(request.responseText);
        } else {
            console.log('fail to access.');
        }
    };
    request.send(); // 开始发送请求
}

function postSomething(url) {
    //创建异步对象  
    var xhr = new XMLHttpRequest();
    //设置请求的类型及url
    xhr.open('post', url);
    //post请求一定要添加请求头才行不然会报错
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    //发送请求
    xhr.send('name=fox&age=18'); // 传参数
    xhr.onreadystatechange = function () {
        // 这步为判断服务器是否正确响应
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log(xhr.responseText);
        }
    };
}

// Fetch写法：
//fetch中发生了什么：
fetch(url).then(function (response) {
    response.text().then(function (text) {
        console.log(text);
    })
})


//原生Ajax请求实现：
function ajax_method(url, data, method, success) {
    // 异步对象
    let ajax = new XMLHttpRequest(); //这里暂时没考虑兼容性
    if (method == 'get') {
        // get 请求
        if (data) {
            url += '?';
            url += data;
        }
        // 设置方法和url
        ajax.open('get', url);
        ajax.send()
    } else if (method == 'post') {
        ajax.open('post', url);
        // 设置请求头部
        ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        // 判断data
        if (data) {
            ajax.send(data);
        } else {
            ajax.send();
        }
        // ajax.send(data ? data : '');
    }
    // 注册事件
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            console.log(ajax.responseText);

            // 外面可以使用 - 闭包
            // return ajax.responseText;

            //若外面可传入一个function作为参数success
            success(ajax.responseText);
        } else {
            console.log('Error');
        }
    }

    // 还可以设置有效时间
    setTimeout(function () {
        if (ajax.status != 4) {
            ajax.abort(); // 停止请求
        }
    }, 5000)
}