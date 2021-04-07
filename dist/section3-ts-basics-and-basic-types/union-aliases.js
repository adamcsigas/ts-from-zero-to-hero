"use strict";
//type union:
//let's say we want to add two values. not only numbers but strings as well (like concat)
//in this case we can use union type: number | string for instance
function combine(input1, input2, resultConversion) {
    var result;
    if (typeof input1 === 'number' && typeof input2 === 'number' || resultConversion === 'as-number') {
        result = +input1 + +input2; //+ sign before a variable converts the variable into a number, like parseFloat()
    }
    else {
        result = input1.toString() + input2.toString();
    }
    return result;
    /*if (resultConversion === 'as-number') {
        return +result;
      } else {
        return result.toString();
      } */
}
var combinedAges = combine(30, 26, 'as-number');
console.log(combinedAges);
var combinedNames = combine('Adam', 'Yolo', 'as-text');
console.log(combinedNames);
var combinedStringAges = combine('30', '26', 'as-number');
console.log(combinedStringAges);
