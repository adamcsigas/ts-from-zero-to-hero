"use strict";
/* this approach is only for demo purpose it's not best practice!
L2-5 is a typescript representation of an object's type
by default it's better let type inference do it's thing :)
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
var Role;
(function (Role) {
    Role[Role["ADMIN"] = 0] = "ADMIN";
    Role[Role["READ_ONLY"] = 1] = "READ_ONLY";
    Role[Role["AUTHOR"] = 2] = "AUTHOR";
})(Role || (Role = {}));
;
//behind the scenes every element recieves an index by default ADMIN the number 0, READ_ONLY the number 1 and so on
//if you need different behaviour you can change the number simply: ADMIN = 5. 
//after that the upcoming element will be 6 and so on
var person = {
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
//typescript type inference works it says role can be a type of string | number[]
//but we explicitly want to override it
//with tuple types of the elements and the length is fixated
var favoriteActivities;
favoriteActivities = ['sports'];
console.log(person.name);
//typescript inference can tell that a hobby is going to be a string, so all
//built in string function will be available
for (var _i = 0, _a = person.hobbies; _i < _a.length; _i++) {
    var hobby = _a[_i];
    console.log(hobby.toUpperCase());
    //but for instance we would get an error on console.log(hobby.map());
}
if (person.role === Role.ADMIN) {
    console.log('admin');
}
//some notes on the last type which was mentioned: any
//although it sounds good at first but you want avoid the type any
//anywhere it's possible because it has a great disadvantage to take
//away TS strictness about types. It can be used as a fallback when
//you really can't know what kind of data will be stored in there
//and then you can maybe use some runtime checks
//by default: you want to avoid using any by any mean!!! .-)
