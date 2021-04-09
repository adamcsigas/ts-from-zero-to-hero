export default '';
//DECORATOR-FACTORY:
/*
  returns a decorator function
  but allows us to configure it
  when we assign it as a decorator to something.
  As a first example, we take decorator-sample1.ts
  and convert Logger into a factory.
*/
function Logger(logString: string) {
  console.log('logger factory');
  return function(constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

function WithTemplate(template: string, hookId: string) {
  console.log('template factory');
  return function(constructor: any) {
    //if you're not interested in of the constructor function
    //you can use _ as an argument name to let TS know
    console.log('rendering template');
    const hookEl = document.getElementById(hookId);
    //you can also get access to constructor functions' variables
    const p = new constructor();
    if(hookEl) {
      hookEl.innerHTML = template;
      //for demo purposes let assume that h1 always exists
      hookEl.querySelector('h1')!.textContent = p.name;
    }
  }
}

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
function Log(target: any, propertyName: string | symbol) {
  console.log('Property decorator');
  console.log(target, propertyName);
}

//accessor decorator
function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log('Accessor decorator!');
  console.log(target); //prototype in this case
  console.log(name); //name of the accessor itself (not the internal value!!!)
  console.log(descriptor); //property descriptor
}

//method decorator
//recieve the same args as accessor decorator
function Log3 (target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
  console.log('Method decorator');
  console.log(target);
  console.log(name);
  console.log(descriptor); // is a little bit different then accessor descriptor, not TS specific though
}

//parameter decorator
//this gets the name of the method where this parameter is being used!
//position: the position of the argument in the method where used
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

//When do decorators execute?
//---------------------------
/*
  Every decorator runs without instantiating the class.
  Decorators are not eventlisteners! They are functions
  that executes when your class is defined, and then
  you can use the decorator to do some behind the scenes
  work.
  For example:
  - To setup some code that should run whenever this is called
  - To add extra meta-data or store some data property somewhere else
*/
