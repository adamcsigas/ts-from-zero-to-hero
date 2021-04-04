/* this approach is only for demo purpose it's not best practice!
L2-5 is a typescript representation of an object's type
 const person : {
  name: string;
  age: number;
} = {
  name: 'Adam',
  age: 29,
}; */

//it's better let type interference do it's thing :)
const person = {
  name: 'Adam',
  age: 29,
  hobbies: [
    'sports',
    'cooking',
  ],
};

let favoriteActivities: string[];
favoriteActivities = ['sports'];

console.log(person.name);

//typescript interference says that a hobby is going to be a string, so all
//built in string function will be available
for (const hobby of person.hobbies) {
  console.log(hobby.toUpperCase());
  //but for instance we would get an error on console.log(hobby.map());
}
