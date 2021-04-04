/* this approach is only for demo purpose it's not best practice!
L2-5 is a typescript representation of an object's type
by default it's better let type interference do it's thing :)
 const person : {
  name: string;
  age: number;
} = {
  name: 'Adam',
  age: 29,
}; */

/* const person: {
  name: string;
  age: number;
  hobbies: string[];
  role: [number, string]; //tuple concept: added by TS: fixed-length array
} = {
  name: 'Adam',
  age: 29,
  hobbies: [
    'sports',
    'cooking',
  ],
  role: [2, 'author'],
}; */

//this is a common pattern in JS to store eg. roles in consts
//but it has downsides like in the person object we can use any number in the role
//even ones that are not exists
//and in addition we have to define all these constants and manage them

//const ADMIN = 0;
//const READ_ONLY = 1;
//const AUTHOR = 2;

//enum makes this easier! enum is a custom type
enum Role { ADMIN, READ_ONLY, AUTHOR }; 
//behind the scenes every element recieves an index by default ADMIN the number 0, READ_ONLY the number 1 and so on
//if you need diferent behaviour you can change the number simply: ADMIN = 5. 
//after that the upcoming element will be 6 and so on

const person = {
  name: 'Adam',
  age: 29,
  hobbies: [
    'sports',
    'cooking',
  ],
  role: Role.ADMIN,
};

//by default we could do
//person.role.push('admin'); or person.role[1] = 10;
//because typescript doesn't know that we want only 2 elements
//typescript interference works it says role can be a type of string | number[]
//but we explicitly want to override it
//with tuple types of the elements and the length is fixated

let favoriteActivities: string[];
favoriteActivities = ['sports'];

console.log(person.name);

//typescript interference can tell that a hobby is going to be a string, so all
//built in string function will be available
for (const hobby of person.hobbies) {
  console.log(hobby.toUpperCase());
  //but for instance we would get an error on console.log(hobby.map());
}

if(person.role === Role.ADMIN) {
  console.log('admin');
}
