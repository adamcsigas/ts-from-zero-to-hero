function Logger(logString: string) {
  console.log('logger factory');
  return function(constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

//Returning and changing a Class in a class decorator
/*
  with the following modification the decorator will only run
  if the class where the decorator is being used instantiated
*/
function WithTemplate(template: string, hookId: string) {
  console.log('template factory');
  return function<T extends {new(...args: any[]): {name: string}}>(originalConstructor: T) {
    return class extends originalConstructor {
      //this based on my original constructor function(aka CF)
      //with the following logic I replace the original class
      //with a custom class with extra logic, which not run
      //when the class is defined, but when instantiated
      constructor(..._: any) {
        super();
        console.log('rendering template');
        const hookEl = document.getElementById(hookId);
        //const p = new originalConstructor();
        if(hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector('h1')!.textContent = this.name;
        }
      }
    }
  }
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

@Logger('Logging...')
@WithTemplate('<h1>My Person Object</h1>', 'app')
class Person {
  name = 'Adam';

  constructor() {
    console.log('Creating person object...');
  }
}

const pers = new Person();

console.log(pers);

//property decorator
function Log(target: any, propertyName: string | symbol) {
  console.log('Property decorator');
  console.log(target, propertyName);
}

//accessor decorator
function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log('Accessor decorator!');
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

//method decorator
function Log3 (target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
  console.log('Method decorator');
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

//parameter decorator
function Log4 (target: any, name: string | Symbol, position: number) {
  console.log('Parameter decorator');
  console.log(target);
  console.log(name);
  console.log(position);
}


class Product {
  @Log
  title: string;
  private _price: number;

  constructor (t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @Log2
  set price(val: number) {
    if(val > 0) {
      this._price = val;
    } else {
      throw new Error('Invalid price - should be positive!');
    }
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}
