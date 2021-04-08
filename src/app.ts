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

//Example: a function that merges two objects
function merge<T, U>(objectA: T, objectB: U): T & U { //return type added only for demo purpose
  return Object.assign(objectA, objectB);
}

//if you would give objA and objB parameters the type object which would be two unknown object
//the return also would be an unknown object
const mergedObj = merge({name: 'Adam'}, {age: 29});
//so in this case of mergedObj.name, TS wouldn't know the specifics
//of the returned object
console.log(mergedObj.name);