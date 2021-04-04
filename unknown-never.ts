//type unkown:
//the interesting thing about it that we can store any kind of value in it, just like in any,
//but it's more districtive than type any. Once again: type again will disable any typecheck!
//unkown is better than any if:
//we don't know what the datatype will be, but we know what we eventually want to do with it
//with unknown first we have to check the type we store *example1*
//it will not throw an error

let userInput: unknown;
let userName: string;

userInput = 5;
userInput = 'Adam';

//*example1*
//with this check TS will know userInput is 100% going to be a string
//for a more abstract point of view: you check if the thing you want to do
//is possible or not
if (typeof userInput === 'string') {
  userName = userInput;
}

//never is another type that functions can return
//a function like this will always crash the script
//and will NEVER have a return value
//so if you want to console.log the result such function
//you will get nothing back
//never is a newer type than void and not had been added
//to type inference so hovering over the function will
//say :void. it's not horrible but with never you can make it
// really clear that this function will never return anything!
function generateError(message: string, code: number): never {
  throw {
    message: message,
    errorCode: code,
  };
}

const result = generateError('An error occured', 500);
console.log(result);