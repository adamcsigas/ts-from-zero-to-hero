export default '';
//Decorators:
//It useful for meta-programming.
//The main idea is to write code which then
//easier to use by other developers.
//we can guarantee that a class, a method in a class,
//functions, hidden transformations etc.
// will be used correctly

//DECORATOR:
//----------
/*
The end of the day a decorator is just a function which you
apply to something (eg. class) in a certain way.
Decorators execute NOT when your class is instantiated
BUT when your class is defined!
Decorators run when JS finds your class/constructor function
definition.
*/

//Starting with a capital is not a must have thing
//but lot of 3rd party libraries creating decorators like that.
/*
decorators recieve arguments. The number of arguments
depends on where you use them. In this first example
it will be used on a class, the argument will be
the target AKA constructor function
*/
function Logger(constructor: Function) {
  console.log('Logging...');
  console.log(constructor);
}

@Logger
class Person {
  name = 'Adam';

  constructor() {
    console.log('Creating person object...');
  }
}

const pers = new Person();

console.log(pers);
