class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    toString() {
        return this.x + this.y;
    }
}

let a = new Point(1, 2)
Point.prototype.fuck = function () {
    console.log('fuck the world.');
}

// class是ES6新添加的语法糖：
// 1.主要结构 2.与ES5都有prototype 3.必须使用new调用 4.内部默认严格模式
// 5.不存在提升 6.类的方法内部如果含有this，它默认指向类的实例
// 