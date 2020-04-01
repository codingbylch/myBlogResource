/*
 * @Author: lch
 * @Date: 2020-03-14 15:26:26
 * @LastEditors: lch
 * @LastEditTime: 2020-03-18 13:42:19
 * @Description: file content
 */
/*
 * @Author: your name
 * @Date: 2020-03-11 22:15:58
 * @LastEditTime: 2020-03-14 15:23:08
 * @LastEditors: lch
 * @Description: In User Settings Edit
 * @FilePath: \Paper\Html\JavaScript.js
 */
let inputText = document.querySelector('#inputText');
let inputDate = document.querySelector('#inputDate');
let todolist = document.querySelector('#todolist');
let confirms = document.querySelector('#confirm');
let collate = document.querySelector('#collate');
let nowdate = document.querySelector('.nowdate');
let timelist = new Date();
let listArray = new Array();

confirms.addEventListener('click', addTodoList); //异步执行
inputText.addEventListener('keypress', getkey);
// collate.addEventListener('click', listSort);
collate.addEventListener('click', sort2);

inputText.focus();
setTime();

inputDate.value = `${curyear}-${curmonth}-${curday}`;

//函数：注册button的click事件
function addTodoList() {
    if (inputText.value) {
        //添加li
        let list = document.createElement('li');
        todolist.appendChild(list);

        //添加日期
        let date = document.createElement('span');
        date.textContent = inputDate.value;
        list.appendChild(date);

        //添加span
        let span = document.createElement('span');
        span.textContent = inputText.value;
        list.appendChild(span);

        //添加删除按钮
        let delButton = document.createElement('button');
        delButton.textContent = '删除';
        delButton.addEventListener('click', function (e) {
            e.target.parentNode.parentNode.removeChild(e.target.parentNode);
        })
        list.appendChild(delButton);
        inputText.value = '';
        inputText.focus();
    }
}

//函数：按下enter键
function getkey() {
    if (event.keyCode === 13) {
        addTodoList();
    }

}
//设置显示当前时间
function setTime() {
    curyear = timelist.getFullYear();
    curmonth = timelist.getMonth() + 1;
    curday = timelist.getDate();
    if (curmonth < '10') {
        curmonth = '0' + curmonth;
    }
    if (curday < '10') {
        curday = '0' + curday;
    }
    nowdate.textContent = `${curyear}年${curmonth}月${curday}日`;
}

//冒泡排序
function listSort() {
    length = 0 || todolist.children.length;
    for (let i = 0; i < length; i++) {
        for (let j = i + 1; j < length; j++) {
            if (todolist.children[i].firstElementChild.innerText < todolist.children[j].firstElementChild.innerText) {
                todolist.insertBefore(todolist.children[j], todolist.children[i]);
            }
        }
    }
}
//别人的排序修改一下
function quickSort() {
    let needsort = [...document.querySelectorAll('#todolist>li')];
    let mapped = needsort.map((el, i) => {
        return {
            index: i,
            value: el.firstElementChild.innerText
        }
    });
    mapped.sort((a, b) => {
        return a.value > b.value ? 1 : -1;
    });

    // needsort.map((e, i) => needsort[mapped[i].index]);
    needsort.map((e, i) => todolist.appendChild(needsort[mapped[i].index]));
    // console.log(needsort);
}

//sort排序：类数组先转为数组, 再排序, 最后appendChild
function sort2() {
    let needsort = [...document.querySelectorAll('#todolist>li')];
    needsort.sort((a, b) => {
        return a.firstElementChild.innerText > b.firstElementChild.innerText ? 1 : -1;
    })
    needsort.forEach((e, i, a) => {
        todolist.appendChild(e);
    })
}

