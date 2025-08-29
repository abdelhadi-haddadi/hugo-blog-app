+++
title = "JavaScript toString method"
date = 2025-08-29T20:02:17.174+01:00
draft = false
description = "JavaScript toString tutorial shows how to convert objects to strings in JavaScript. The tutorial provides numerous examples to demonstrate string conversion in JS."
image = ""
imageBig = ""
categories = ["js-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript toString method

last modified April 4, 2025

 

In this article we show how to convert objects to strings using the
toString method in JavaScript.

## The toString method

The toString method returns a string representing the object. Every
JavaScript object inherits this method from the Object prototype. Different
types override this method to return meaningful string representations.

Primitive values like numbers and booleans have their own toString
implementations. Arrays return comma-separated elements, while dates return
human-readable date strings. Objects by default return [object Object].

The method is automatically called when an object needs to be represented as a
text value. This happens during string concatenation or when using alert().
You can also call it explicitly when needed.

## Basic toString example

The following example demonstrates the basic usage of the toString
method with numbers.

main.js
  

const num = 42;
const str = num.toString();

console.log(typeof num);  // number
console.log(typeof str);  // string
console.log(str);         // "42"

We convert a number to its string representation. The original number remains
unchanged. The toString method returns a new string value.
Note that we can call toString on primitive values due to auto-boxing.

$ node main.js
number
string
42

## Array toString

Arrays have their own implementation of toString that joins elements.

main.js
  

const fruits = ['apple', 'banana', 'cherry'];
const str = fruits.toString();

console.log(str);
console.log(typeof str);

The array's toString method joins all elements with commas. Nested
arrays are also flattened and converted to strings. This is equivalent to
calling join without arguments.

$ node main.js
apple,banana,cherry
string

## Object toString

Plain objects inherit the default toString from Object.prototype.

main.js
  

const person = {
  name: 'John Doe',
  age: 30,
  occupation: 'Developer'
};

console.log(person.toString());

The default object toString returns [object Object].
To get more useful output, we typically override this method or use
JSON.stringify. The format shows the object's type but not its
contents.

$ node main.js
[object Object]

## Custom toString

We can override toString to provide meaningful string representations.

main.js
  

function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.toString = function() {
  return `${this.name} (${this.age})`;
};

const person = new Person('Alice', 25);
console.log(person.toString());
console.log(`Person: ${person}`);  // implicit call

We create a custom toString method for our Person constructor.
When the object is used in string contexts, this method is automatically called.
This provides control over how objects are represented as strings.

$ node main.js
Alice (25)
Person: Alice (25)

## Number base conversion

Number's toString can convert to different numeral systems.

main.js
  

const num = 255;

console.log(num.toString());    // "255" (default base 10)
console.log(num.toString(2));  // "11111111" (binary)
console.log(num.toString(8));  // "377" (octal)
console.log(num.toString(16)); // "ff" (hexadecimal)

The number's toString accepts a radix parameter (2-36). This allows
conversion to different bases. Common bases include 2 (binary), 8 (octal),
10 (decimal), and 16 (hexadecimal). The output is always a string.

$ node main.js
255
11111111
377
ff

## Source

[Object toString - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString)

In this article we have demonstrated how to use the toString() method to convert
objects to strings in JavaScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Array Functions.](/javascript/#js-array)