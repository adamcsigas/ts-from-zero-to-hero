"use strict";
//Interface:
//----------
//describe how an object should look like
//without concrete values.
//it might look like an abstract class
//but in interface you don't have any concrete
//thing where as in abstract class you might have
//some concrete implementation for a method
//or have a concrete value for a property
class Person {
    constructor(n) {
        this.age = 29;
        if (n) {
            this.name = n;
        }
    }
    greet(phrase) {
        console.log(`${phrase} ${this.name}`);
    }
}
let user1;
user1 = new Person('Adam');
//user1.name = 'Tadam'; this will throw error because it's a readonly prop in the interface
user1.greet('Hi there - I am');
let add;
add = (a, b) => {
    return a + b;
};
//Good to know notes:
//Interfaces a TS only/pure developement feature!
//You can use interface to improve your code
//but no output will end up in your JS files though!
//it's been used during compilation to check your code
//then it's dumped. :(
