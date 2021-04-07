export default '';
//This file is just a documentation of the following video:
//https://www.youtube.com/watch?v=9ooYYRLdg_g - reference vs primitive values/types

let someValue = 'hello';
console.log(someValue);
//output: 'hello'

let someOtherValue = someValue;
console.log(someOtherValue);
//output: 'hello' 'hello'

someValue = 'world';
console.log(someOtherValue);
//output: 'hello' 'hello' 'hello'

// ----

let person = {
  age: 29,
  name: 'Adam',
  hobbies: ['sauna', 'biking']
};
console.log(person);
//output: 
// { age: 29, name: 'Adam', hobbies: ['sauna', 'biking']}

let secondPerson = person;
console.log(secondPerson);
//output: 
// { age: 29, name: 'Adam', hobbies: ['sauna', 'biking']}
// { age: 29, name: 'Adam', hobbies: ['sauna', 'biking']}

person.name = 'Chris';
console.log(secondPerson);
//output:
// { age: 29, name: 'Adam', hobbies: ['sauna', 'biking']}
// { age: 29, name: 'Adam', hobbies: ['sauna', 'biking']}
// { age: 29, name: 'Chris', hobbies: ['sauna', 'biking']} !!!
// this is because arrays and objects in JS are reference types

//primitive values (string, number, boolean, undefined, null, symbol(es6))
//Stored: in stack. Stack is a stack of data in your memory
//this type of memory can be accessed really quick, its size limited
//it doesn't hold that much information, doesn't have much space
//but due to it's nature/how it works it is very fast
//ideal for smaller data

//reference types (object, (object-->array) )
//Stored: in heap. Heap is a different place in memory
//takes little bit more to access, but can take much more information
//it's not as "short living" as the stack so to say
//ideal for bigger data

//How the data kinda stored?
//in stack: on top of eachother
//in heap: data are not stored top of on eachother, placed "randomly" so to say
//but therefore each data has it's address
//we still have to stack of course!!!

//creating an object1 will create an element in the heap, which stores the actual object
//and a pointer also will be created in the stack,
//which stores the reference/address to the object in the heap
//and the variable simply stores the pointer!
//the variable only knows where the pointer lies on the stack
//the pointer stores the address where the object stored in the heap
//if you create an object2 like this: object2 = object1; than what happen is
//a new pointer will be created but it will point to the same address as object1
//so what we do when we create object2 like above we create a new pointer
//but we still only have one place in the heap memory
//so changing something on an object will effect all other objects
//which points to the same data in the heap

//TLDR;
//creating a primitive typed variables like this:
//let name = 'John'; let otherName = name; will create real copies
//creating reference typed objects like this:
//let object1 = {name: 'foo', age: 20}; object2 = object1;
//will create a copy of the pointer which points to the same data in the heap
//this can have unexpected behaviours if you don't know what you're doing

//what if you really want to copy an object?
let thirdPerson = Object.assign({},person);

//here with Object. we create a new object
//the assign() method allows you to merge 2 objects into one
//the first argument can be ANY object, it doesn't have to be a new or empty one!
//note: this not creates a deep clone! so if the object you copy has object properties
//those properties still will point to the same data in the heap!!!
//There is no super trivial solution to this problem,
//you can work around it
//or use third party libraries like lodash which has deepclone function

//what if you want to copy an array in the object?
let myUpToDateHobbies = person.hobbies.slice();
//by not giving any arguments, slice will create a new array
//and push all the values from the other array