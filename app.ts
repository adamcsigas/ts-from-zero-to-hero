function add(
  n1: number,
  n2: number,
  showResult: boolean,
  phrase: string
) {
  const result = n1 + n2;
  if (showResult) {
    console.log(phrase + result);
  } else {
    return result;
  }
}

// The reason why we don't use type assignments here is because typescript has a built in function called type interference
// this means typescript does it's best to understand which type you have in a certain variable or const
// for instance initialize the number1 variable:
// with const number1 = 5, it's type going to be not just any number but :5
// if you use let number1 = 5 it's goint to be :number
// and of course you could give it's type like let number1: number = 5
// but that is unnecessary since TS can perfectly tell what is the type is going to be (reduntant code)
const number1 = 5;
const number2 = 2.8;
const printResult = typeof number1 === 'number' && typeof number2 === 'number';
const resultPhrase = 'Result is: ';

const result = add(number1, number2, printResult, resultPhrase);

console.log(result);
