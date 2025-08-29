+++
title = "JavaScript currying"
date = 2025-08-29T20:01:13.432+01:00
draft = false
description = "Understand currying in JavaScript for transforming functions with multiple arguments into nested functions, with examples and explanations."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript currying

last modified last modified October 18, 2023

 

JavaScript currying tutorial defines the currying transformations and
demonstrates it in practical examples.

## Currying

Currying is a transformation of a function with multiple arguments
into a sequence of nested functions with a single argument. The currying allows
to perform function specialization and composition.

We can transform the fn(a,b,c) callable into fn(a)(b)(c). 

Curried functions are higher-order functions which allow us to create
specialized versions of original functions. Currying works thanks to closures,
which retain the enclosing function scopes after they have returned.

Lodash contains the _.curry function, which can turn a normal
function into a curried function. In Ramda, all functions are autocurried.

## JS curry basic example

The following basic example uses currying.

basic.js
  

function multiply(a, b, c) {

    return a * b * c;
}

function multiply_curried(a) {

    return function (b) {
        return function (c)  {
            return a * b * c
        }
    }
}

let res = multiply(1, 2, 3);
console.log(res);

let mc1 = multiply_curried(1);
let mc2 = mc1(2);
let res2 = mc2(3);
console.log(res2);

let res3 = multiply_curried(1)(2)(3);
console.log(res3);

We have normal multiply function, which multiplies its three
arguments. The code multiply_curried uses currying to get the
multiplication done.

let res = multiply(1, 2, 3);

This is the classic function call; all its parameters are passed between the
round brackets.

let mc1 = multiply_curried(1);
let mc2 = mc1(2);
let res2 = mc2(3);
console.log(res2);  

In currying, the function takes one argument and returns another function, which
takes the next argument, until all arguments are exhausted.

let res3 = multiply_curried(1)(2)(3);

This is the shorthand notation of the previous code.

$ node basic.js 
6
6
6

## JS curry basic example II

The next example uses the arrow functions to create both normal 
and curried functions.

basic2.js
  

let multiply = (a, b, c) =&gt; {
    return a * b * c;
}

let multiply_curried = (a) =&gt; (b) =&gt; (c) =&gt; {

    return a * b * c;
}

let res = multiply(1, 2, 3);
console.log(res);

let res2 = multiply_curried(1)(2)(3);
console.log(res2);

The multiplication functions are rewritten using arrow function syntax.

## JS uncurry

It is possible to uncurry the curried function. 

uncurry.js
  

let multiply_curried = (a) =&gt; (b) =&gt; (c) =&gt; {

    return a * b * c;
}

let multiply = (a, b, c) =&gt; multiply_curried(a)(b)(c);

let res = multiply(2,3,4);
console.log(res);

let res2 = multiply_curried(2)(3)(4);
console.log(res2);

The example turns the multiply_curried into the 
multiply function.

## JS curry - generic function

We create a generic function which checks if the word has n characters.

hasnchars.js
  

let hasNChars = (n=3) =&gt; (word) =&gt; word.length === n;

let words = ['forest', 'gum', 'pencil', 'wonderful', 'grace',
    'table', 'lamp', 'biblical', 'midnight', 'or', 'perseverance', 
    'adminition', 'redemption', 'dog', 'no'];

let res = words.some(hasNChars(2), words);
console.log(res);

let res2 = words.some(hasNChars, words);
console.log(res2);

There is an array of words. The hasNChars function first takes 
the n value, then it takes the word to check. If we do not 
provide the n value, the default 3 is used.

let res = words.some(hasNChars(2), words);

Using the array's some function, we check if there is any word 
that has two characters.

let res2 = words.some(hasNChars, words);

Here we check if there is any word with two letters.

$ node hasnchars.js 
true
true

## JS curry - specialized function

Specialized functions are derived from more generic functions.

specialized.js
  

let greet = (message) =&gt; (name) =&gt; {

    return `${message} ${name}!`;
}

let helloGreet = greet('Hello'); 

console.log(greet('Good day')('Lucia'));
console.log(helloGreet('Peter'));

There is a curried greet function. The specialized 
helloGreet function is derived from the greet
function.

$ node specialized.js 
Good day Lucia!
Hello Peter!

## JS curry - function composition

Function composition allows to combine any number of functions to create a new
one.

composing.js
  

let double = x =&gt; x * 2
let triple = x =&gt; x * 3
let quadruple = x =&gt; x * 4

let pipe = (...funs) =&gt; input =&gt; funs.reduce(
    (total, fn) =&gt; fn(total),
    input
)

let fun1 = pipe(double)
let fun2 = pipe(double, triple)
let fun3 = pipe(triple, triple)
let fun4 = pipe(double, triple, quadruple)

console.log(fun1(2)) 
console.log(fun2(5)) 
console.log(fun3(7)) 
console.log(fun4(9)) 

The pipe function takes arbitrary number of parameters - functions.
The combined function later takes the input value on which the functions
operate. To create the pipe function, we use the
reduce function. Read the JavaScript
reduce tutorial to learn more about the reduce function.

$ node composing.js 
4
30
63
216

## Lodash _.curry

Lodash is a powerful library which provides utility functions for common
programming tasks. The _.curry function turns a normal function
into a curried one.

$ npm i lodash  

We need to install the Lodash library.

lodash_curry.js
  

const _ = require("lodash");

function multiply(a, b, c) {

    return a * b * c;
}

let curried = _.curry(multiply);

let ret = curried(2)(3)(4);
console.log(ret);

In the example, we turn the multiply function into a curried 
version.

## Ramda autocurrying

Ramda is a practical functional library for JavaScript programmers. The library
focuses on immutability and side-effect free functions. Ramda functions are also
automatically curried.

$ npm i ramda  

We need to install the Ramda library.

auto_curry.js
  

const R = require('ramda');

let fn1 = R.add(5);
let res = fn1(6);
console.log(res);

let fn2 = R.divide(100);
let res2 = fn2(20);
console.log(res2);

We demonstrate the automatic currying in R.add and R.divide
functions.

$ node auto_curry.js 
11
5

## JS custom curry method

Finally, we create our custom curry method.

mycurry.js
  

function multiply(a, b, c) {

    return a * b * c;
}

function curry(func) {

  return function curried(...args) {

    console.log(args);

    if (args.length &gt;= func.length) {

      return func.apply(this, args);
    } else {

      console.log('calling else');

      return function(...args2) {
        
        return curried.apply(this, args.concat(args2));
      }
    }
  };
}

let curried = curry(multiply);

console.log(curried(1, 2, 3));  
console.log(curried(1)(2, 3));   
console.log(curried(1)(2)(3));  

The custom curry method is created with recursion. We also 
utilize the spread operator, the apply function, and the 
function length property.

The length property returns the number of parameters the 
function receives. The apply function calls the given function 
with a given this value, and arguments provided as an array.

let curried = curry(multiply);

We create a curried version of the multiply function with our custom
curry
function.

console.log(curried(1, 2, 3));

The curried function is still callable normally.

console.log(curried(1)(2, 3));   

In this line, we are currying the first argument.

console.log(curried(1)(2)(3)); 

We curry all three arguments.

$ node mycurry.js 
[ 1, 2, 3 ]
6
[ 1 ]
[ 1, 2, 3 ]
6
[ 1 ]
[ 1, 2 ]
[ 1, 2, 3 ]
6

## Source

[Currying](https://en.wikipedia.org/wiki/Currying)

In this article we have examined the currying transformation process in
JavaScript. We also briefly mentioned the Lodash and the Ramda functional
libraries.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)