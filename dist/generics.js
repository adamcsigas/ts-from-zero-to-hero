"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = '';
//GENERICS:
//---------
/*
Exist in TS only.
*/
//built-in examples to generics:
//1.)array.
const names = []; // Array<string> === string[]
//2.)promise
const promise = new Promise((resolve, reject) => {
    //you tell TS what your data will yield
    //which can improve type safety
    setTimeout(() => {
        resolve('This is done!');
    }, 2000);
});
promise.then(data => {
    data.split(' ');
});
//Build custom generic function:
//TYPE CONSTRAINTS:
//<T, U> if you want that the generic types here could be
//any type of object: <T extends object, U extends object>
//Example: a function that merges two objects
function merge(objectA, objectB) {
    return Object.assign(objectA, objectB);
}
//if you would give objA and objB parameters the type object which would be two unknown object
//the return also would be an unknown object
const mergedObj = merge({ name: 'Adam' }, { age: 29 });
//so in this case of mergedObj.name, TS wouldn't know the specifics
//of the returned object
console.log(mergedObj.name);
function countAndDescribe(element) {
    let descriptionText = 'Got no value.';
    if (element.length > 0) {
        descriptionText = 'Got ' + element.length + ' elements';
    }
    return [element, descriptionText];
}
console.log(countAndDescribe('Hi there!')); // got 9 characters
console.log(countAndDescribe(['yo', 'wow', 'foo'])); // got 3 characters
//The "keyof" constraint
//memo: what problem would raise
//if params would be (obj:object, key:string) ?
function extractAndConvert(obj, key) {
    return 'Value: ' + obj[key];
}
//Generic Classes
//flexible and strongly typed
//cons: this works perfectly with primitive values
//but you will run into troubles if you start to work with
//reference values like objects or arrays
//Generic types vs Union Types:
//First glance generic types and union types
//might seem to achieve the same thing, but that's
//not the case!
//In case of DataStorage:
//Union type is great if you want to have functions
//which would accept string | number | boolean every time.
//Generic type is great if you want to lock in on a type.
class DataStorage {
    constructor() {
        this.data = [];
    }
    addItem(item) {
        this.data.push(item);
    }
    removeItem(item) {
        this.data.splice(this.data.indexOf(item), 1);
    }
    getItems() {
        return [...this.data];
    }
}
const textStorage = new DataStorage();
textStorage.addItem('Adam');
textStorage.addItem('Adam2');
textStorage.addItem('Gowango');
console.log(textStorage.getItems());
function createCourseGoal(title, description, date) {
    let courseGoal = {}; //Partial tells TS this in the end, going to be a CourseGoal
    //partial turns the inside type properties optional (temporarily), therefore we can have an empty object in this case
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = date;
    return courseGoal; //you need typecasting in this case
}
//2.) Readonly<>
const firstNames = ['Adam', 'Eve'];
//firstNames.push();
//firstNames.pop();
