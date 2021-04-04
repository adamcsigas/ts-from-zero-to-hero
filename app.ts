//return types:
//just as with variables it's a good idea to let typescript do it's job regarding inference

function add(n1: number, n2: number) {
  return n1 + n2;
}

//void added for demo purposes!
//void functions doesn't return anything
//if there is return instead of void you can use undefined but this is a very rare case
function printResult(num: number): void {
  console.log('Result: ' + num);
}

printResult(add(5,12));