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
