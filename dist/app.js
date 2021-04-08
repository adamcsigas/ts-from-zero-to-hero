"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = '';
//they're closely related to interface inheritance
//interface ElevatedEmployee extends Employee, Admin {}
var employee1 = {
    name: 'Adam',
    privileges: ['create-homepage'],
    startDate: new Date()
};
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
function add(a, b) {
    if (typeof a === 'string' || typeof b === 'string') {
        //note: typeof will run at runtime so it good to keep in mind that you can only
        //check types that JS knows
        return a.toString() + b.toString();
    }
    return a + b; //only returning a + b will throw an error!
}
function printEmployeeInformation(emp) {
    console.log('Name: ' + emp.name);
    if ('privileges' in emp) {
        console.log('Privileges: ' + emp.privileges);
    }
    if ('startDate' in emp) {
        console.log('startDate: ' + emp.startDate);
    }
}
//3.) instanceof (if you work with classes)
//most of the time you can use the 'in' keyword
//as well but this is a more elegant way and
//can minimize the risk of typos
var Car = /** @class */ (function () {
    function Car() {
    }
    Car.prototype.drive = function () {
        console.log('driving');
    };
    return Car;
}());
var Truck = /** @class */ (function () {
    function Truck() {
    }
    Truck.prototype.drive = function () {
        console.log('Driving a truck...');
    };
    Truck.prototype.loadCargo = function (amount) {
        console.log('Loading cargo ...' + amount);
    };
    return Truck;
}());
var v1 = new Car();
var v2 = new Truck();
function useVehicle(vehicle) {
    vehicle.drive();
    if (vehicle instanceof Truck) { //this is JS code
        //although JS doesn't know Truck type but knows
        //constructor functions and classes are at the
        //end of the day just translated to that.
        vehicle.loadCargo(1000);
    }
}
useVehicle(v1);
useVehicle(v2);
function moveAnimal(animal) {
    var speed;
    switch (animal.type) {
        case 'bird':
            speed = animal.flyingSpeed;
            break;
        case 'horse':
            speed = animal.runningSpeed;
    }
    console.log('Moving at speed: ' + speed);
}
moveAnimal({ type: 'bird', flyingSpeed: 30 });
