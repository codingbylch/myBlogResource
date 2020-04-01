---
title: Ajax与Comet
tags: JS
categories: 前端
toc: true
date: 2020-04-01 16:21:49
---

### XHLHttpRequest对象
```js
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

// post
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

```
原生ajax请求实现：
```js
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
```

### Fetch
```js
// Fetch写法：
//fetch中发生了什么：
fetch(url).then(function(response){
    response.text().then(function(text){
        console.log(text);
    })
})
```

### 跨源资源共享 
CORS（Cross-Origin Resource Sharing，跨源资源共享）是W3C 的一个工作草案，定义了在必须访问跨源资源时，浏览器与服务器应该如何沟通。 CORS 背后的基本思想，就是使用自定义的 HTTP 头部让浏览器与服务器进行沟通，从而决定请求或响应是应该成功，还是应该失败。
- IE对CORS的实现 
微软在 IE8 中引入了 XDR（XDomainRequest）类型。这个对象与 XHR 类似，但能实现安全可靠的跨域通信。
使 CSRF（Cross-Site Request Forgery，跨站点请求伪造）和 XSS（Cross-Site Scripting，跨站点脚本）的问题得到了缓解。

- 其他浏览器对CORS的实现 
通过 XMLHttpRequest对象实现了对 CORS 的原生支持

- 为了兼容，跨浏览器的CORS 
检测 XHR 是否支持 CORS 的最简单方式，就是检查是否存在 withCredentials 属性。再结合检测 XDomainRequest 对象是否存在，就可以兼顾所有浏览器了。 

- 其它跨域技术
  - 图像Ping
    特点：JS中动态创建图像，使用onload或onerror事件处理程序来接受响应。
    缺点：1.只能发送GET请求；2.无法访问服务器得响应文本。
  - JSONP
  - Comet