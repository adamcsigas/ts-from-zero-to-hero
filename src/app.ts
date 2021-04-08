export default '';

//intersection types allows us to combine other types:
//in case of objects the result will be the combination of
//the two objects

type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type ElevatedEmployee = Admin & Employee;

//they're closely related to interface inheritance
//interface ElevatedEmployee extends Employee, Admin {}

const employee1: ElevatedEmployee = {
  name: 'Adam',
  privileges: ['create-homepage'],
  startDate: new Date()
}

//note: you can use them with any types not just objects!
//in case of union type intersection the result type
//will be what they have in common
type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric; //in this case number

//TYPE GUARDS:
//------------
//It allows us to utilize the flexibility union types give
//and still ensure that our code runs correctly at runtime
//because it happens a lot that you have a functions that
//work with 2-3 different types and therefore a union type
//is perfect.
//But what exactly you do with the values then does depend
//on the type.

//examples of type guards:

//1.) typeof
function add(a: Combinable, b: Combinable) {
  if(typeof a === 'string' || typeof b === 'string') { 
    //note: typeof will run at runtime so it good to keep in mind that you can only
    //check types that JS knows
    return a.toString() + b.toString();
  }
  return a + b; //only returning a + b will throw an error!
}

//2.) in
//it comes handy if you have to check if a property exists
//in an object.
type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log('Name: ' + emp.name);
  if ('privileges' in emp) {
    console.log('Privileges: ' + emp.privileges);
  }
  if('startDate' in emp) {
    console.log('startDate: ' + emp.startDate);
  }
}

//3.) instanceof (if you work with classes)
//most of the time you can use the 'in' keyword
//as well but this is a more elegant way and
//can minimize the risk of typos

class Car {
  drive() {
    console.log('driving');
  }
}

class Truck {
  drive() {
    console.log('Driving a truck...');
  }

  loadCargo(amount: number) {
    console.log('Loading cargo ...' + amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  if(vehicle instanceof Truck) { //this is JS code
    //although JS doesn't know Truck type but knows
    //constructor functions and classes are at the
    //end of the day just translated to that.
    vehicle.loadCargo(1000);
  }
}

useVehicle(v1);
useVehicle(v2);
