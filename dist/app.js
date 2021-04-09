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
/*
  You can return values on the following decorators:
  - class decorator
  - method decorators - Log3
  - accessor decorators - Log2
*/
//Creating an "Autobind" Decorator
//--------------------------------
function Autobind(_, _2, descriptor) {
    const originalMethod = descriptor.value;
    const adjustedDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = originalMethod.bind(this);
            //What does "this" refers to, here?
            //TLDR; we ensure that "this" will always refer to the exact same object
            //as the original method
            /*
              We are inside of the getter method, so "this" will
              refer to whatever is responsible for triggering the get()
              method.
              This is the trick: getter method will be triggered
              by the concrete object to which it's belongs. So
              "this" inside of the getter method will always refer
              to the object on which we defined the get().
      
              This will not overwritten by addEventListener, because
              the getter is like an extra layer between our function
              that's being executed, the object to which it belongs
              and the eventListener.
            */
            return boundFn;
        },
    };
    return adjustedDescriptor;
}
class Printer {
    constructor() {
        this.message = 'This works!';
    }
    showMessage() {
        console.log(this.message);
    }
}
__decorate([
    Autobind
], Printer.prototype, "showMessage", null);
const p = new Printer();
const button = document.querySelector('button');
button.addEventListener('click', p.showMessage);
//output: undefined
/*
  within addEventListener, if we point at a function
  that should be executed (showMessage) the "this" keyword
  inside of that function will not have the same
  context/reference as we call just p.showMessage.
  In this case "this" will refer to the target of the event!
  Because addEventListener binds the "this" keyword
  to the target of the event.
  Common workaround: p.showMessage.bind(p)
  You can also build a decorator to do this!
*/
