export default '';

//GENERICS:
//---------
/*
Exist in TS only.
*/

//built-in examples to generics:

//1.)array.
const names: Array<string> = []; // Array<string> === string[]

//2.)promise
const promise: Promise<string> = new Promise((resolve, reject) => { //by adding <string> to promise
  //you tell TS what your data will yield
  //which can improve type safety
  setTimeout(() => {
    resolve('This is done!');
  }, 2000);
});

promise.then(data => {
  data.split(' ');
})

//Build custom generic function:
//TYPE CONSTRAINTS:
//<T, U> if you want that the generic types here could be
//any type of object: <T extends object, U extends object>
//Example: a function that merges two objects
function merge<T extends object, U extends object>(objectA: T, objectB: U): T & U { //return type added only for demo purpose
  return Object.assign(objectA, objectB);
}

//if you would give objA and objB parameters the type object which would be two unknown object
//the return also would be an unknown object
const mergedObj = merge({ name: 'Adam' }, { age: 29 });
//so in this case of mergedObj.name, TS wouldn't know the specifics
//of the returned object
console.log(mergedObj.name);

interface Lengthy {
  length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = 'Got no value.';
  if(element.length > 0) {
    descriptionText = 'Got ' + element.length + ' elements';
  }
  return [element, descriptionText];
}

console.log(countAndDescribe('Hi there!')); // got 9 characters
console.log(countAndDescribe(['yo','wow','foo'])); // got 3 characters

