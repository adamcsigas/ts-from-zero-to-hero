abstract class Department {
  //private readonly id: string;
  //private name: string; this is not a property but a field
  //private is a so called access modifier by default this is public.
  //only available in the class where declared
  protected employees: string[] = []; //protected: also available in classes which are extended from this class

  //this is a so called utility function which has been called when the class is instantiated
  //readonly: only exists in TS, after initialization it's value cannot be changed
  //this adds some extra type safety to your code, make your intention extra clear
  constructor(protected readonly id: string, private name: string) { //shorthand initialization
    //this.name = n;
  }

  static createEmployee(name: string) {
    return { name: name};
  }

/*
  describe(this: Department) { //this is not an actual param in this case but it tells what this in the method refers to!
    console.log(`Department (${this.id}): ${this.name}`);
    //you have to use 'this.' keyword otherwise it will going to look for a global variable
    //outside of this class' scope
    //'this.' refers back to the instanced class!
  }
*/
  abstract describe(this: Department): void;

  addEmployee(employee: string) {
    //validation...
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

//INHERITANCE:
//------------
//In case we have a specific type of department
//which has the same properties as Department class
//but actually has more specific fields or methods
//inheritance can be used.
//TLDR; base methods => Department, specialized version => base + specific stuff
//------------

class ITDepartment extends Department { //you can only inherit from one class
  //as longs as nothing added here it will work just as Department
  admins: string[];

  constructor(id: string, admins: string[]) {
    //every time you create a custom constructor in an inherited class
    //you have to call super first and execute it like a function
    //super calls the constructor of the base class (Department)
    super(id, 'IT');
    this.admins = admins;
  }

  describe() {
    console.log('IT Department - ID: ' + this.id);
  }
}

class AccountingDepartment extends Department {
  private lastReport: string;
  private static instance: AccountingDepartment;

  //getters and setters:
  //access private properties and adding extra logic
  //that should run when you read/set a property

  //getter method
  get mostRecentReport() {
    if(this.lastReport) {
      return this.lastReport;
    }
    throw new Error('No report found.');
  }

  //setter method
  set mostRecentReport(value: string) {
    if(!value) {
      throw new Error('Please pass in a valid value');
    }
    this.addReport(value);
  }

  //For Singleton:
  //make constructor private
  //create a method that check 
  //if there is an existing instance
  //and make one if not
  private constructor(id: string, private reports: string[]) {
    super(id, 'Accounting');
    this.lastReport = reports[0];
  }

  static getInstance() {
    if(AccountingDepartment.instance) {
      return this.instance;
    }
    this.instance = new AccountingDepartment('d2', []);
    return this.instance;
  }

  describe() {
    console.log('Accounting Department: ID' + this.id);
  }

  //if you want to override a base method you can do that by redefining it (polymorphism)
  addEmployee(name: string) {
    if(name === 'Adam') {
      return;
    }
    this.employees.push(name);
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }

  printReports(this: AccountingDepartment) {
    console.log(this.reports);
  }
}

const it = new ITDepartment('devs', ['Foo', 'Bartendr']);
it.addEmployee('Foo');
it.addEmployee('Bartendr');
console.log(it);

//const accDep = new AccountingDepartment('acc', []);
const accDep = AccountingDepartment.getInstance();
accDep.addReport('something went wrong');
accDep.addEmployee('Adam');
accDep.addEmployee('Tadam');
console.log(accDep);

/*
  const accounting = new Department('godlike', 'Accounting');
  accounting.addEmployee('Foo');
  accounting.addEmployee('Bar');
  accounting.describe();
  accounting.printEmployeeInformation();
*/

//PRIVATE CONSTRUCTORS + SINGLETON PATTERN
//Singleton pattern is about ensuring that you only have
//one instantiation of a certain class.
//useful when you somehow can't use static methods/properties
//or you don't want to, but at the same time
//you want to make sure that you can't create multiple
//objects based on a class but you always have exactly one object
//based on a class
//eg.: we only want 1 AccountingDepartment

//ABSTRACT CLASSES:
//-----------------
//abstract classes cannot be instantiated
//Eventhough override a method always there as an option but
//sometimes you want to force the developer
//to implement/override a method from the base class
//when would you do that?
//when you want to ensure that a certain method
//is available in all classes based on some base class
//but that you also know at the same time that the exact
//implementation will depend on this specific version
//so when you can't provide a general method but you
//want to enforce that method exists but the inheriting class'
//will need to provide it's own implementation because
//you can't provide a default implementation in the base class



//STATIC PROPERTIES/METHODS:
//--------------------------
//these are props and methods that are not accessed
//on the instances of the class but which you access
//directly on the class. eg.: Math constructor function in JS
//in constructor you cannot access them with the 'this'
//keyword because the whole idea behind it to detach
//from instances
const employee = Department.createEmployee('John');

//ACCESS MODIFIERS:
//-----------------
//the problem here by default, that we could access
//and modify employees information from the outside:
//like: accounting.employees[2] = 'Tibee';

//It is a good practice to have one uniform way to modify data
//also a method might envolve some extra logic
//which would not execute if you just add an element to the array
//like a validation process

//to make some restriction you can use private access modifier
//note: this only works in TS-land in runtime accounting.employees[2] = 'Tibee';
//would execute without an error since private added to JS just recently
//and TS only knows this because it checks during compilation

//THIS KEYWORD:
//-------------
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
/* 
  const accountingCopy = { name: 'DUMMY', describe: accounting.describe };
  accountingCopy.describe();
*/

//--------------------------------------------------------------------------
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
//---------------------------------------------------------------------------
