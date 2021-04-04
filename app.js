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
var person = {
    name: 'Adam',
    age: 29,
    hobbies: [
        'sports',
        'cooking',
    ]
};
var favoriteActivities;
favoriteActivities = ['sports'];
console.log(person.name);
//typescript interference says that a hobby is going to be a string, so all
//built in string function will be available
for (var _i = 0, _a = person.hobbies; _i < _a.length; _i++) {
    var hobby = _a[_i];
    console.log(hobby.toUpperCase());
    //but for instance we would get an error on console.log(hobby.map());
}
