class Department {
  name: string; //this is not a property but a field

  constructor(n: string) { //utility function which has been called when the class is instantiated
    this.name = n;
  }

  describe(this: Department) { //this is not an actual param in this case but it tells what this in the method refers to!
    console.log('Department: ' + this.name);
    //you have to use 'this.' keyword otherwise it will going to look for a global variable
    //outside of this class' scope
    //'this.' refers back to the instanced class!
  }
}

const accounting = new Department('Accounting');

console.log(accounting);
accounting.describe();

//THIS keyword:
//----
//rule of thumb: this typically refers to the thing
//which is responsible for calling the method in this case accountingCopy
//and accountingCopy doesn't have a name property
//to work around this behaviour you can add
//what 'this' refers to in the describe() method as a parameter
//after that if you don't have a name property in accountingCopy
//TS will throw you an error

//Eg.:
//Before adding what this refers to in describe() method
//The following line of code will compile
//but calling the method, the department will be undefined.
//const accountingCopy = { describe: accounting.describe };
//accountingCopy.describe();
//output: Department: undefined

//adding what 'this' refers to to describe() and TS will throw
//an error to you. adding name property to the object
//and it will work just fine again:
const accountingCopy = { name: 'DUMMY', describe: accounting.describe };
accountingCopy.describe();

//-------------
//Good to know:
//after compilation to JS some interesting things happen in case of ES5:
//something called constructor function which've been around quite some time
//this was the old way to create blueprints of objects in JS
/*
var Department = (function () {
    function Department(n) {
        this.name = n;
    }
    return Department;
}());
var accounting = new Department('Accounting');
console.log(accounting);
*/
