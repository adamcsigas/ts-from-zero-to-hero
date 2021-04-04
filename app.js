//return types:
//just as with variables it's a good idea to let typescript do it's job regarding inference
function add(n1, n2) {
    return n1 + n2;
}
function printResult(num) {
    console.log('Result: ' + num);
}
printResult(add(5, 12));
