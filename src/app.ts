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