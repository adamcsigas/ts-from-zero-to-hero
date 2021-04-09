"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
function Logger(logString) {
    console.log('logger factory');
    return function (constructor) {
        console.log(logString);
        console.log(constructor);
    };
}
//Returning and changing a Class in a class decorator
/*
  with the following modification the decorator will only run
  if the class where the decorator is being used instantiated
*/
function WithTemplate(template, hookId) {
    console.log('template factory');
    return function (originalConstructor) {
        return class extends originalConstructor {
            //this based on my original constructor function(aka CF)
            //with the following logic I replace the original class
            //with a custom class with extra logic, which not run
            //when the class is defined, but when instantiated
            constructor(..._) {
                super();
                console.log('rendering template');
                const hookEl = document.getElementById(hookId);
                //const p = new originalConstructor();
                if (hookEl) {
                    hookEl.innerHTML = template;
                    hookEl.querySelector('h1').textContent = this.name;
                }
            }
        };
    };
}
//Explaining <T extends {new(...args: any[]): {name: string}}> <--- this magic:
/*
  - We want to say that our decorator function going to be a generic fn:
    <T>

  - That generic fn will accept such object,
    which we can make new instances:
    <T extends {new()}>

  - This object can accept as many arguements as we want:
    <T extends {new(...args: any[])}>

  - The generic fn at the end will return with an object:
    <T extends {new(...args: any[])}: {}>

  - We have to make clear the returning object will have
    a name property with the type string:
    <T extends { new(...args: any[]): { name: string } }>
*/
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
//property decorator
function Log(target, propertyName) {
    console.log('Property decorator');
    console.log(target, propertyName);
}
//accessor decorator
function Log2(target, name, descriptor) {
    console.log('Accessor decorator!');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
//method decorator
function Log3(target, name, descriptor) {
    console.log('Method decorator');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
//parameter decorator
function Log4(target, name, position) {
    console.log('Parameter decorator');
    console.log(target);
    console.log(name);
    console.log(position);
}
class Product {
    constructor(t, p) {
        this.title = t;
        this._price = p;
    }
    set price(val) {
        if (val > 0) {
            this._price = val;
        }
        else {
            throw new Error('Invalid price - should be positive!');
        }
    }
    getPriceWithTax(tax) {
        return this._price * (1 + tax);
    }
}
__decorate([
    Log
], Product.prototype, "title", void 0);
__decorate([
    Log2
], Product.prototype, "price", null);
__decorate([
    Log3,
    __param(0, Log4)
], Product.prototype, "getPriceWithTax", null);
