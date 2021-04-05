"use strict";
var button = document.querySelector('button'); //with the ! I tell TS this button indeed going to exist
button.addEventListener('click', function () {
    console.log('it works');
});
//tsconfig notes:
//allowJs and checkJs: you can check with the tsc compiler the js files as well
//sourcemap - good for debugging purposes
//noEmit - it will not create the js output file
//noEmitOnError - problematic ts files will not generated
//strict configs:
//implicitAny - if turned off ts will stop crying for implicit any type
//difference between function param and variable in case of type any:
//because the function is defined before you call it, TS will have no chance
//of knowing what you pass in there can be used inside of the function
