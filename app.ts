//type union:
//let's say we want to add two values. not only numbers but strings as well (like concat)
//in this case we can use union type: number | string for instance

//note: TS doesn't analyze what the union types contain, only recognize that it is a union type
//so if you use const result = input1 + input2; for instance even though the + operator can be
//used on string and number, it will throw an error because from TS point of view
//it might contain things that cannot be added together
//in case needed, you can use a runtime check to overcome this issue

//*literal types: in the case below you can only use specific string values to that param.
//by this we can gain some extra type safety
//this is especially useful in conjunction with union types

function combine(
  input1: number | string,
  input2: number | string,
  resultConversion: 'as-number' | 'as-text' //this called literal type*
  ) {
  let result;

  if (typeof input1 === 'number' && typeof input2 === 'number' || resultConversion === 'as-number') {
    result = +input1 + +input2; //+ sign before a variable converts the variable into a number, like parseFloat()
  } else {
    result = input1.toString() + input2.toString();
  }
  return result;
/*if (resultConversion === 'as-number') {
    return +result;
  } else {
    return result.toString();
  } */
}

const combinedAges = combine(30, 26, 'as-number');
console.log(combinedAges);

const combinedNames = combine('Adam', 'Yolo', 'as-text');
console.log(combinedNames);

const combinedStringAges = combine('30', '26', 'as-number');
console.log(combinedStringAges);
