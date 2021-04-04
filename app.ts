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

const person: {
  name: string;
  age: number;
  hobbies: string[];
  role: [number, string]; //tuple concept
} = {
  name: 'Adam',
  age: 29,
  hobbies: [
    'sports',
    'cooking',
  ],
  role: [2, 'author'],
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
