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

//types of type guards:

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

//DISCRIMINATED UNION:
//--------------------
//it's a pattern which you can use when working with union types.
//This pattern makes implementing type guards easier.
//It is available when you work with object types.
//also minimize the risk of typos!

interface Bird {
  type: 'bird'; //type field here created to make type guarding in moveAnimal() easier
  flyingSpeed: number;
}

interface Horse {
  type: 'horse';
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed;
  switch (animal.type) {
    case 'bird':
      speed = animal.flyingSpeed;
      break;
    case 'horse':
      speed = animal.runningSpeed;
  }
  console.log('Moving at speed: ' + speed);
}

moveAnimal({type: 'bird', flyingSpeed: 30});

//TYPE CASTING:
//TC helps you tell TS that some value is of a specific type
//where TS is not able to detect on it's own but you know its
//going to be the case

//good example for this is if we get access to something in the DOM!
//const userInputElement = document.getElementById('input')!;

//if you use queryselector then TS will know that
//its type going to be: HTMLInputElement | null
//but if you use getElementById for instance, things get interesting
//because TS can't tell, it doesn't read our HTML code
//so it only knows that it will be an HTMLElement

//if we want to set value property would error
//because .value is not specific to any HTMLElement!
//userInputElement.value = 'Hi there!';
//output: Property 'value' does not exist on type 'HTMLElement'.ts(2339)

//type casting for the win! Both approach is considered ok, just
//be consistent about it.

//1.)
//since this syntax has a different meaning in react JS provides another way see in 2.)
/*
  const userInputElement = <HTMLInputElement>document.getElementById('input')!;
  userInputElement.value = 'Hi there!'; //it works fine!
*/

//2.)
const userInputElement = document.getElementById('input')! as HTMLInputElement; //! for only demo purposes
userInputElement.value = 'Hi there!'; //it works fine!

//The ! tells TS that the variable will never going to be null
//if we are not certain you can use an if check
const userInputElement2 = document.getElementById('input'); //by casting here you would tell TS
//it will never going to be null!

if(userInputElement2) {
  (userInputElement2 as HTMLInputElement).value = 'My existance is unquestionable!';
}

//INDEX TYPES:
//------------
//use-case: I know the value type,
//I don't know how many properties I will have,
//what the name of the property will be.

interface ErrorContainer { // {email: 'not a valid email', username: 'must start with a capital character'}
  //id: string; //pre-defined properties are ok, as long as they have the same type as the index type
  [prop: string]: string;
  //With that I say I don't know the property name, and the count
  //they will have a property name with a string value type
  //note: It cannot be boolean!!!
}

const errorBag: ErrorContainer = {
  email: 'Not a valid email!',
  username: 'Must start with a capital character'
};

//FUNCTION OVERLOADS:
//-------------------
//it comes handy when TS not quite get the return type

function adding(a: number, b: number): number;
function adding(a: number, b: string): string;
function adding(a: string, b: number): string;
function adding(a: string, b: string): string;
function adding(a: Combinable, b: Combinable) {
  if(typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}
//for instance here, by default TS will say here that the return type will be Combinable.
//which is technically true, but we might want to be more specific, especially
//if want to do stuff with the returned value.
//We know in fact that in this case the return value will be either a string or a number,
//and if we want to call built in functions like split(), TS will throw an error.

const result = adding('Foo', ' bar');
result.split(' ');

//OPTIONAL CHAINING:
//------------------
//Useful if you cannot tell with certainty
//if in an object a property is existing or not

const fetchedUserData = {
  id: 'u1',
  name: 'Adam',
  job: { title: 'developer', description: 'frontend developer' }
}
//the JS way is:
//console.log(fetchedUserData.job && fetchedUserData.job.title);

//in TS you have the optional chaining operator:
//you put ? after the thing you are not sure if it exists
console.log(fetchedUserData.job?.title);