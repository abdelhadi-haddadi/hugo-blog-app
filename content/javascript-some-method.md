+++
title = "JavaScript some() method"
date = 2025-08-29T20:02:13.807+01:00
draft = false
description = "JavaScript some() tutorial shows how to test array elements in JavaScript. The tutorial provides numerous examples to demonstrate array element testing in JS."
image = ""
imageBig = ""
categories = ["js-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript some() method

last modified April 4, 2025

 

In this article we show how to test array elements using the some
method in JavaScript.

## Array some() method

The some method tests whether at least one element in the array
passes the test implemented by the provided function. It returns true if at
least one element passes the test, otherwise it returns false.

This method does not modify the original array. It executes the callback
function once for each element until it finds one where callback returns a
truthy value. If such an element is found, some() immediately returns true.

The some method is useful for checking if any elements in an
array meet certain conditions. It's often used for validation or checking
for the presence of specific values in an array.

## Basic some() example

The following example demonstrates the basic usage of the some
method.

main.js
  

const numbers = [1, 2, 3, 4, 5];
const hasEven = numbers.some(num =&gt; num % 2 === 0);

console.log(hasEven);  // true
console.log(numbers);  // Original array unchanged

We check if the array contains any even numbers. The callback function tests
each element for evenness. Since 2 and 4 are even, some() returns true.
The original array remains unmodified.

$ node main.js
true
[ 1, 2, 3, 4, 5 ]

## Checking for existence of an object property

The some() method can check if any objects in an array have a specific property.

main.js
  

const users = [
  { name: 'John', age: 25 },
  { name: 'Jane', age: 22 },
  { name: 'Bob', admin: true }
];

const hasAdmin = users.some(user =&gt; user.admin);

console.log(hasAdmin);  // true

We check if any user in the array has the admin property. The callback function
tests each object for the presence of the admin property. Since Bob has it,
some() returns true.

$ node main.js
true

## Using some() with strings

The some() method can be used with arrays of strings to check for patterns.

main.js
  

const words = ['apple', 'banana', 'cherry', 'date'];
const hasLongWord = words.some(word =&gt; word.length &gt; 6);

console.log(hasLongWord);  // true

We check if any word in the array has more than 6 characters. The callback
function tests each string's length. Since 'banana' has 6 characters and
'cherry' has 6, some() returns false in this case.

$ node main.js
false

## Checking array elements against a value

The some() method can compare array elements against a specific value.

main.js
  

const temperatures = [22, 19, 25, 18, 30];
const isHotDay = temperatures.some(temp =&gt; temp &gt; 28);

console.log(isHotDay);  // true

We check if any temperature in the array is greater than 28 degrees. The
callback function tests each temperature value. Since 30 is greater than 28,
some() returns true.

$ node main.js
true

## Using some() with complex conditions

The some() method can handle more complex conditions in the callback function.

main.js
  

const products = [
  { name: 'Laptop', price: 999, inStock: true },
  { name: 'Phone', price: 699, inStock: false },
  { name: 'Tablet', price: 499, inStock: true }
];

const hasExpensiveInStock = products.some(product =&gt; {
  return product.price &gt; 500 &amp;&amp; product.inStock;
});

console.log(hasExpensiveInStock);  // true

We check if any product is both in stock and priced over $500. The callback
function tests both conditions. The laptop meets both criteria, so some()
returns true.

$ node main.js
true

## Source

[Array some() - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)

In this article we have demonstrated how to use the some() method to test
array elements in JavaScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Array Functions.](/javascript/#js-array)