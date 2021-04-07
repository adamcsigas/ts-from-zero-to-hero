//Interface:
//----------
//describe how an object should look like
//without concrete values.
//it might look like an abstract class
//but in interface you don't have any concrete
//thing where as in abstract class you might have
//some concrete implementation for a method
//or have a concrete value for a property


//idea behind it: you can typecheck an object
interface Greetable {
  name: string;

  greet(phrase: string): void;
}

class Person implements Greetable {
  name: string;
  age = 29;

  constructor(n: string) {
    this.name = n;
  }

  greet(phrase: string) {
    console.log(`${phrase} ${this.name}`);
  }
}


let user1: Greetable;

user1 = new Person('Adam');

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
//
