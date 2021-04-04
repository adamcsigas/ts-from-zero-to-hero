//type union:
//let's say we want to add two values. not only numbers but strings as well (like concat)
//in this case we can use union type: number | string for instance

//note: TS doesn't analyze what the union types contain, only recognize that it is a union type
//so if you use const result = input1 + input2; for instance even though the + operator can be
//used on string and number, it will throw an error because from TS point of view
//it might contain things that cannot be added together
//in case needed, you can use a runtime check to overcome this issue

function combine(input1: number | string, input2: number | string) {
  let result;

  if (typeof input1 === 'number' && typeof input2 === 'number') {
    result = input1 + input2;
  } else {
    result = input1.toString() + input2.toString();
  }

  return result;
}

const combinedAges = combine(30, 26);
console.log(combinedAges);

const combinedNames = combine('Adam', 'Yolo');
console.log(combinedNames);
