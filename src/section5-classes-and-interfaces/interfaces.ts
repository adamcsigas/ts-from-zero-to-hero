export default '';
//Interface:
//----------
//describe how an object should look like
//without concrete values.
//it might look like an abstract class
//but in interface you don't have any concrete
//thing where as in abstract class you might have
//some concrete implementation for a method
//or have a concrete value for a property

//you can also combine interfaces
//use-case: app where some object you only want to force Name,
//on other objects you want to force them both.
//you can merge as many interfaces together as many you want
//you can implement as many interfaces into your class as many you need
interface Named {
  readonly name?: string; //readonly has an effect on the class as well which implements the interface!
  outputName?: string; //optional parameter
}

//idea behind it: you can typecheck an object
interface Greetable extends Named {
  greet(phrase: string): void;
  optionalFunction?(): void;//methods can be optional too
}

class Person implements Greetable {
  name?: string;
  age = 29;

  constructor(n?: string) {
    if(n) {
      this.name = n;
    }
  }

  greet(phrase: string) {
    console.log(`${phrase} ${this.name}`);
  }
}


let user1: Greetable;

user1 = new Person('Adam');
//user1.name = 'Tadam'; this will throw error because it's a readonly prop in the interface

user1.greet('Hi there - I am');

//why do we have an interface, not a type?
//while most of the time they are interchangable
//there are some differences:
//an interface can only be used to describe
//the structure of an object, (you can use type for that as well)
//but inside of a custom type you can also store other things
//like union types
//this make it sounds like type is more flexible but there is the
//other side of the coin: interface is clearer!
//When you define something as an interface, it's super clear
//that you want to define the structure of an object with that.
//interfaces are more commonly used 
//to describe the structure of an object (historical reasonss)

//Interfaces as function types
//----------------------------
//this use-case is a little bit more exotic, but good to know,
//the type version of it is more commonly used: 
//type addFunction = (a: number, b: number) => number; (one already known approach)

interface addFunction {
  (a: number, b: number): number;
}

let add: addFunction;
add = (a: number, b: number) => {
  return a + b;
}

//Good to know notes:
//Interfaces a TS only/pure developement feature!
//You can use interface to improve your code
//but no output will end up in your JS files though!
//it's been used during compilation to check your code
//then it's dumped. :(
