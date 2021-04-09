"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//DECORATOR-FACTORY:
/*
  returns a decorator function
  but allows us to configure it
  when we assign it as a decorator to something.
  As a first example, we take decorator-sample1.ts
  and convert Logger into a factory.
*/
function Logger(logString) {
    console.log('logger factory');
    return function (constructor) {
        console.log(logString);
        console.log(constructor);
    };
}
function WithTemplate(template, hookId) {
    console.log('template factory');
    return function (constructor) {
        //if you're not interested in of the constructor function
        //you can use _ as an argument name to let TS know
        console.log('rendering template');
        const hookEl = document.getElementById(hookId);
        //you can also get access to constructor functions' variables
        const p = new constructor();
        if (hookEl) {
            hookEl.innerHTML = template;
            //for demo purposes let assume that h1 always exists
            hookEl.querySelector('h1').textContent = p.name;
        }
    };
}
let Person = class Person {
    constructor() {
        this.name = 'Adam';
        console.log('Creating person object...');
    }
};
Person = __decorate([
    Logger('Logging...'),
    WithTemplate('<h1>My Person Object</h1>', 'app')
], Person);
const pers = new Person();
console.log(pers);
//execution order:
/*
- creation of the factory function happens in the order you specify
the factory functions. Logger --> WithTemplate
- but the execution of the actual decorator functions then happens
bottom up! WithTemplate --> Logger

*/
