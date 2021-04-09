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
/*
  if you add decorator to a property, decorator will take 2 arguments
  1.)
    a.)target property:
    in case of instance property (like the example below), target will refer
    the prototype of the object if it was created
    b.)static property:
    target will refer to the constructor function
    Because we don't know the structure what this object will have,
    target will be any type this time
  2.)property name
*/
//property decorator
function Log(target, propertyName) {
    console.log('Property decorator');
    console.log(target, propertyName);
}
//accessor decorator
function Log2(target, name, descriptor) {
    console.log('Accessor decorator!');
    console.log(target); //prototype in this case
    console.log(name); //name of the accessor itself (not the internal value!!!)
    console.log(descriptor); //property descriptor
}
//method decorator
//recieve the same args as accessor decorator
function Log3(target, name, descriptor) {
    console.log('Method decorator');
    console.log(target);
    console.log(name);
    console.log(descriptor); // is a little bit different then accessor descriptor, not TS specific though
}
//parameter decorator
//this gets the name of the method where this parameter is being used!
//position: the position of the argument in the method where used
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
