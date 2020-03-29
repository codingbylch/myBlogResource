fn(); // -> 2                                            
function fn() {
    console.log(1);
}
fn(); // -> 2                                            
var fn = 10; // -> fn = 10          （预解析2）                      
fn(); // -> 10()  Uncaught TypeError: fn is not a function                          
function fn() {
    console.log(2);
}
fn(); //不执行