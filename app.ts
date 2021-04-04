//return types:
//just as with variables it's a good idea to let typescript do it's job regarding inference

function add(n1: number, n2: number) {
  return n1 + n2;
}

//void added for demo purposes!
//void functions doesn't return anything
//if there is return instead of void you can use undefined but this is a very rare case
function printResult(num: number): void {
  console.log('Result: ' + num);
}

printResult(add(5,12));

//Functions as types called function type (dah!)
//you can define a variable to be a function, and how it should look like
//in other words: which type of functions we want to use somewhere

let combineValues: (a: number, b: number) => number; //by that we say TS that we have a var which is a func that will take 2 params and will return with a number
combineValues = add;
//combineValues = printResult;
//combineValues = 5;

console.log(combineValues(8, 8));

//let someValue: undefined; <-- this is a valid TS variable