"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = '';
//difference between var and let:
//var only knows function scope and global scope
//let introduced a new concept block scope
//that means the variable exists in the block you define it
//or in any lower blocks. This forces you to write
//cleaner code, and avoid unwanted global scope variables
var myName = 'Adam';
var myAge = 29;
myAge = 30;
//Arrow function and it's variations
//arrow function
var add = function (a, b) {
    if (b === void 0) { b = 1; }
    return a + b;
};
//if you have only one expression, you can leave the curly braces
//and the result of that one expression will be automatically returned:
var substract = function (a, b) { return a - b; };
//if you have a function that only takes one parameter, you can ommit
//the parentheses around the argument
var printOutput = function (output) { return console.log(output); };
//in the above example we didn't save much, but there are cases where you can:
var fancyButton = document.querySelector('button');
if (fancyButton) {
    fancyButton.addEventListener('click', function (event) { return console.log(event); });
    //here we don't have to specify any function type anywhere, because
    //because TS knows what addEventListener will provide to us
}
