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
var Person = /** @class */ (function () {
    function Person(n) {
        this.age = 29;
        if (n) {
            this.name = n;
        }
    }
    Person.prototype.greet = function (phrase) {
        console.log(phrase + " " + this.name);
    };
    return Person;
}());
var user1;
user1 = new Person('Adam');
//user1.name = 'Tadam'; this will throw error because it's a readonly prop in the interface
user1.greet('Hi there - I am');
var add;
add = function (a, b) {
    return a + b;
};
