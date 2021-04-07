"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = '';
//arrays and objects:
var hobbies = ['sports', 'sauna'];
//if you want to extract all values of an array
var activeHobbies = ['hiking'];
//spread operator:
//---
//arrays are objects and objects are reference values
//when we push, we change the memory but not the address
//that's why you can push to a const array
//more on that: reference-vs-primitives.ts
activeHobbies.push.apply(activeHobbies, hobbies);
//or when you assign a new array you can just spread the values in it like this
var myOtherHobbies = ['swimming'].concat(hobbies);
//this of course also works on objects
var yetAnotherPerson = {
    name: 'Adam',
    age: 30,
};
//this is a real copy, not just a copy of the pointer
//this is not true in case of nested object properties
var copiedPerson = __assign({}, yetAnotherPerson);
yetAnotherPerson.age = 29;
console.log(copiedPerson);
console.log(yetAnotherPerson);
//Rest parameters:
//---
//This comes handy when you not want to limit how many
//values the user can passes in. A simple example to this
//the adding function: we don't want to limit the user to
//adding only 2 values but n number of values:
var add = function () {
    var numbers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        numbers[_i] = arguments[_i];
    }
    return numbers.reduce(function (curResult, curValue) {
        return curResult + curValue;
    }, 0);
};
//Destructuring:
//on the right side you have the array/object you want to destructure
//on the left side you have the elements from the array/object you want to get
var hobby1 = hobbies[0], hobby2 = hobbies[1], remainingHobbies = hobbies.slice(2);
//this line of code says: 
//get the first and second element store them in a const
//and store the rest in an array
//main difference between array and object destructuring is that
//in case of objects, the order is not guaranteed
//so we pull out elements by key name
//hence these names cannot be arbitrary. If you want to rename it
//you can use js alias syntax like this: 'oldName: newName'.
var firstName = yetAnotherPerson.name, age = yetAnotherPerson.age;
console.log(firstName);
console.log(age);
