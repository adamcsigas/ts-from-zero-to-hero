"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = '';
//GENERICS:
//---------
/*
Exist in TS only.
*/
//built-in examples to generics:
//1.)array.
const names = []; // Array<string> === string[]
//2.)promise
const promise = new Promise((resolve, reject) => {
    //you tell TS what your data will yield
    //which can improve type safety
    setTimeout(() => {
        resolve('This is done!');
    }, 2000);
});
promise.then(data => {
    data.split(' ');
});
