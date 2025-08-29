+++
title = "JavaScript function"
date = 2025-08-29T20:01:20.162+01:00
draft = false
description = "JavaScript function tutorial shows how to work with functions in JavaScript. A function is a mapping of zero or more input parameters to zero or more output parameters."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript function

last modified last modified October 18, 2023

 

In this article we show how to work with functions in JavaScript.

A function is a mapping of zero or more input parameters to zero or
more output parameters.

Using functions, we can reduce code duplicity and increase its clarity. More
complex tasks can be divided into simpler steps by using functions.

Functions can be assigned to variables, passed as arguments to functions or
returned from other functions.

## JS function definition

A JS function is defined with the function keyword. The keyword is
followed by the name of the function, a list of function parameters enclosed in
parentheses and separated by commas, and body of the function enclosed in curly
brackets {}.

The body of a function consists of JS statements. Functions return values with
the return keyword.

main.js
  

function add(x, y) {

    return x + y;
}

let z = add(10, 5);
console.log(z);

The example defines a simple add function.

function add(x, y) {

    return x + y;
}

This is the definition of a function. It returns the value of a simple addition
expression. It has two parameters separated by a comma. With the
return keyword, we pass the computed value to the caller.

let z = add(10, 5);

The function is called. It receives to integer parameters. The returned value
is stored in the z variable.

## JS function expression

The function keyword can be used to define a function inside an
expression. Function expressions allow us to create anonymous functions.

Function expressions are called lambda expression in other programming
languages.

main.js
  

let z = function add(x, y) {

    return x + y;
}

console.log(z(10, 10));

We rewrite the previous example with function expression.

let z = function add(x, y) {

    return x + y;
}

We pass the function expression to the z variable.

console.log(z(10, 10));

The function is invoked through the z variable.

## JS anonymous function

Anonymous functions do not have a name. In many cases, defining a named function
is redundant.

main.js
  

setTimeout(
    function() {
        console.log('Hello there!')
    }, 3000
);

The setTimeout function defines a handler function which is
executed after the specified amount of milliseconds. There is not need to define
a named function; an anonymous function fits here well.

The array collection contains several functions that work on its elements.

main.js
  

let vals = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

let res = vals.reduce(function (x, y) { return x + y; });
console.log(res);

The reduce function is used to calculate the sum of JS array
elements. The function takes a reducer function as a parameter.  The result of
running the reducer across all elements of the array is the sum value.

let res = vals.reduce(function (x, y) { return x + y; });

The reducer function is an anonymous JS function.

## JS function default values

In JavaScript, parameters of functions default to undefined. We can
give function arguments custome default values; they are used if no value is
provided for the argument.

main.js
  

function power(a, b = 2) {

    if (b == 2) {

        return a * a
    }

    let value = 1

    for (let i = 0; i &lt; b; i++) {

        value *= a
    }

    return value;
}

let r1 = power(3)
console.log(r1);

let r2 = power(3, 3)
console.log(r2);

let r3 = power(3, 5)
console.log(r3);

We have created a power function. The function has one argument
with an implicit value. We can call the function with one or two arguments.

$ node main.js 
9
27
243

## JS variadic function

A variadic function can accept variable number of parameters. For instance, when
we want to calculate the sum of values, we might have four, five, six etc.
values to pass to the function.

We use the ... (ellipses) operator to define a variadic function in JavaScript.

main.js
  

function sum(...vals) {

    return vals.reduce(function (x, y) { return x + y; });
}

console.log(sum(1, 2));
console.log(sum(1, 2, 3));
console.log(sum(1, 2, 3, 4));

The program defines a sum function which can take variable number
of arguments.

function sum(...vals) {

    return vals.reduce(function (x, y) { return x + y; });
}

The vals is a JS array. We use its reduce function to calculate
the sum of values. The reduce function takes

$ node main.js 
3
6
10

## JS arrow function

An arrow function is an anonymous function with a shorter syntax. It is defined
with a pair of parenthesis that contains a list of parameters, followed by a fat
arrow (=&gt;) and a pair of curly braces {} that delimits the body
statements.

The pair of parentheses can be omitted if the arrow function has only one
parameter. If it contains a single statement, the curly braces can be omitted
too.

main.js
  

let vals = [-1, 2, 3, -4, 5, 6, -7, 8, 9, 10];

let res = vals.filter(e =&gt; e &gt; 0);
console.log(res);

In the example, we filter an array of integers. The filter function
takes a predicate function as a parameter; it defines what values are filtered.
The predicate is defined with an arrow function.

## JS nested function

A nested function, also called an inner function, is a function defined inside
another function.

main.js
  

let user = { fname: 'John', lname: 'Doe', occupation: 'gardener' }

function sayHello(u) {

    let msg = buildMessage(u);

    console.log(msg);

    function buildMessage(u) {
        return `${u.fname} ${u.lname} is a ${u.occupation}`;
    }
}

sayHello(user);

In the example, we have a nested buildMessage function, which is
a helper function defined inside the sayHello function.

## JS closures

A closure is an anonymous, nested function which retains bindings to
variables defined outside the body of the closure. Closures can hold a unique
state of their own. The state then becomes isolated as we create new instances
of the function.

main.js
  

function intSeq() {

    let i = 0;

    return function () {

        return i++;
    };
}

let nextInt = intSeq();

console.log(nextInt());
console.log(nextInt());
console.log(nextInt());
console.log(nextInt());

let nextInt2 = intSeq();

console.log(nextInt2());
console.log(nextInt2());

We have the intSeq function, which generates a sequence of
integers. It returns a closure which increments the i variable.

function intSeq() {

    let i = 0;

    return function () {

        return i++;
    };
}

Variables defined in functions have a local function scope. However, in this
case, the closure is bound to the i variable even after the
intSeq function returns.

let nextInt = intSeq();

We call the intSeq function. It returns a function which will
increment a counter. The returned function closes over the variable
i to form a closure. The closure is bound to the
nextInt name.

let nextInt2 = intSeq();

console.log(nextInt2());
console.log(nextInt2());

The next call of the intSeq function returns a new closure. This
new closure has its own distinct state. 

$ node main.js 
0
1
2
3
0
1

## JS higher-order functions

Higher-order functions operate on other functions, either by taking them as
arguments or by returning them.

main.js
  

let vals = [-3, 0, 1, 2, 5, 4, 9, 11, 8, 7];

let isEven = e =&gt; e % 2 == 0;
let isOdd = e =&gt; e % 2 != 0;

function doFilter(vals, pred) {

    let filtered = [];

    for (let i = 0; i &lt; vals.length; i++) {
        pred(vals[i]) ? filtered.push(vals[i]) : null;
    }

    return filtered;
}

let res = doFilter(vals, isEven);
console.log(res);

res = doFilter(vals, isOdd);
console.log(res);

The doFilter is a higher-order function.

function doFilter(vals, pred) {

    let filtered = [];

    for (let i = 0; i &lt; vals.length; i++) {
        pred(vals[i]) ? filtered.push(vals[i]) : null;
    }

    return filtered;
}

The function takes a predicate function (a predicate is a function resulting in
a boolean value) as a parameter. It filters out all values that satisfy the
given predicate.

$ node main.js 
[ 0, 2, 4, 8 ]
[ -3, 1, 5, 9, 11, 7 ]

## JS member function

Member functions are functions defined inside class definitions. Member
functions are called methods in some languages, including Java and C#.

main.js
  

class Person {

    constructor(firstName, lastName, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    info() {
        return `${this.firstName} ${this.lastName}, ${this.email}`;
    }
}

let person = new Person('John', 'Doe', 'jdoe@example.com');
console.log(person.info());

A class is defined with the class keyword.

info() {
    return `${this.firstName} ${this.lastName}, ${this.email}`;
}

The info is a member function defined inside a class.

## JS function constructor

A JS object can be created with a function constructor. It takes the values as
parameters. The attributes are set using this keyword. Member
functions are created with this and function keywords. New objects
are created with the new keyword.

main.js
  

function Person(firstName, lastName, email) {

    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;

    this.info = function () {
        return `${this.firstName} ${this.lastName}, ${this.email}`;
    }
}

let person = new Person('John', 'Doe', 'jdoe@example.com');
console.log(person.info());

In the program, we define a Person type.

function Person(firstName, lastName, email) {

The constructor of the Person is defined with the
function keyword.

this.info = function () {
    return `${this.firstName} ${this.lastName}, ${this.email}`;
}

Inside the constructor definition, we define the info member
function.

$ node main.js 
John Doe, jdoe@example.com

## JS Function type

JavaScript is also a powerful object-oriented language. Each function is an
object too. Its type is Function. Functions can be created with the
new Function constructor, although, it is not a recommened
practice.

main.js
  

let x = 3;
let y = 8;

let square = new Function('x', 'return x * x');

let res = square(x);
console.log(res);

res = square(y);
console.log(res);

In the example, we define a square function with the
Function constructor.

## JS function hoisting

Hoisting is the process of moving the declaration of functions, variables or
classes to the top of their scope, prior to execution of the code.

main.js
  

console.log(sum(1, 2, 3, 4, 5));

function sum(...vals) {

    return vals.reduce((x, y) =&gt; x + y);
}

We call the sum function before it is defined.

However, hoisting does not work with function expressions.

main.js
  

console.log(sum(1, 2, 3, 4, 5));

let sum = (...vals) =&gt; vals.reduce((x, y) =&gt; x + y);

The program ends in error: ReferenceError: Cannot access 'sum' before initialization.

## JS generators

Generators are functions that can be exited and later re-entered. Their context
(variable bindings) is saved across function calls. A generator function is
created with the function* syntax.

Calling the generator function returns an iterator. When the iterator's
next method is called, the generator function's body is executed
until the first yield expression; it returns an object with a
value property containing the yielded value. The done
property indicates whether the generator has yielded its last value.

main.js
  

function* idxGen(max) {
    let idx = 0;

    while (idx &lt; max) {

        yield idx++;
    }
}

const g = idxGen(100);

for (let i of g) {

    console.log(i);
}

The example creates a generator which produces indexes up to the specified
maximum value.

function* idxGen(max) {
    let idx = 0;

    while (idx &lt; max) {

        yield idx++;
    }
}

We define the idxGen generator function. The yield
keyword exits the generator and returns a value. Next time the next function of
an iterator is called, we continue on the line following the yield keyword.
The local idx variable is preserved. When the idx
reaches the max value, the generator yields its last value and the
done property is set to true.

const g = idxGen(100);

We call the idxGen; it returns an iterator.

for (let i of g) {

    console.log(i);
}

In a for loop, we iterate over the generated values.

## JS IIFE

An Immediately Invoked Function Expression (IIFE) is a function defined as an
expression and executed immediately after creation. It produces a lexical scope
using function scoping. It was a widely used approach before the intoduction of
JS modules.

main.js
  

let sum = (function (a, b) {
    return a + b;
})(15, 50);

console.log(sum);

We define an addition function which is immediately executed with two
parameters. The result is stored in the sum variable.

$ node main.js 
65

## Source

[JS functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)

In this article we have covered JavaScript functions.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)