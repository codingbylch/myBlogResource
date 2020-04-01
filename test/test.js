for (var i = 1; i <= 5; i++) {
    (function (i) {
            function p() {
                return i
            }
            setTimeout(function timer() {
                console.log(p());
            })
        }


    )(i);
}

(function () {
    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        today = new Date(),
        msg = 'Today is ' + days[today.getDay()] + ', ' + today.getDate();
    alert(msg);
}());


var CachedSearchBox = (function () {
    // 利用闭包对缓存的设计
    var cache = {},
        count = [];
    return {
        attachSearchBox: function (dsid) {
            if (dsid in cache) { // 如果结果在缓存中
                return cache[dsid]; // 直接返回缓存中的对象
            }
            var fsb = new uikit.webctrl.SearchBox(dsid); // 不存在缓存，则新建
            cache[dsid] = fsb; // 更新缓存
            if (count.length > 100) { // 保正缓存的大小<=100
                delete cache[count.shift()];
            }
            return fsb;
        },
        clearSearchBox: function (dsid) {
            if (dsid in cache) {
                cache[dsid].clearSelection();
            }
        }
    };
})();

CachedSearchBox.attachSearchBox(1)

var person = function () {
    // 利用闭包对函数进行封装（模块的IIFE写法）
    //变量作用域为函数内部，外部无法访问
    var name = "default";
    return {
        getName: function () {
            return name;
        },
        setName: function (newName) {
            name = newName;
        }
    }
}();


function Person() {
    // 利用闭包实现类和继承
    var name = "default";
    return {
        getName: function () {
            return name;
        },
        setName: function (newName) {
            name = newName;
        }
    }
};

var p = new Person();
p.setName("Tom");
alert(p.getName()); //Tom

var Jack = function () {};
//继承自Person
Jack.prototype = new Person();
//添加私有方法
Jack.prototype.Say = function () {
    alert("Hello,my name is Jack");
};
var j = new Jack();
j.setName("Jack");
j.Say();
alert(j.getName()); //Jack