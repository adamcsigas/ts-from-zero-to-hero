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
