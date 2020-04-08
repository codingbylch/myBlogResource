
// 调用它们都用到了闭包特性！！
// 所以enterTime、timer是会保留的
// 函数节流：
function throttle(fn, interval) {
    var enterTime = 0; // 触发时间
    var gapTime = interval || 300; // 间隔时间
    return function () {
        var context = this;
        var backTime = new Date();
        if (backTime - enterTime > gapTime) {
            fn.call(context, arguments);
            enterTime = backTime;
        }
    }
}

// 函数防抖：
function debounce(fn, interval) {
    var timer;
    var gapTime = interval || 1000;
    return function () {
        clearTimeout(timer);
        var args = arguments;
        var context = this;
        timer = setTimeout(function () {
            fn.call(context, args);
        },gapTime);
    }
}

export default{
    throttle,
    debounce
};