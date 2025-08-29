+++
title = "JavaScript filter method"
date = 2025-08-29T20:02:04.836+01:00
draft = false
description = "JavaScript filter tutorial shows how to filter arrays in JavaScript. The tutorial provides numerous examples to demonstrate array filtering in JS."
image = ""
imageBig = ""
categories = ["js-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript filter method

last modified April 4, 2025

 

In this article we show how to filter arrays using the filter method
in JavaScript.

## Array filtering

Array filtering is the operation of creating a new array with elements that pass
a test implemented by a provided function. The filter method creates
a new array with all elements that pass the test.

This method does not mutate the original array but returns a new array. The
callback function should return true to keep the element or
false to exclude it.

The filter method is useful when you need to extract elements from
an array based on certain conditions. It provides a clean and functional way to
work with arrays without modifying the original data.

## Basic filter example

The following example demonstrates the basic usage of the filter
method.

main.js
  

const numbers = [1, 2, 3, 4, 5, 6];
const evenNumbers = numbers.filter(num =&gt; num % 2 === 0);

console.log(numbers);      // Original array unchanged
console.log(evenNumbers);  // New filtered array

We create an array of numbers and filter out only the even numbers. The original
array remains unmodified. The filter() method returns a new array containing
only elements that pass the test.

$ node main.js
[ 1, 2, 3, 4, 5, 6 ]
[ 2, 4, 6 ]

## Filtering objects in an array

The filter method can be used with arrays of objects to find specific items.

main.js
  

const products = [
  { name: 'Laptop', price: 999 },
  { name: 'Phone', price: 699 },
  { name: 'Tablet', price: 299 }
];

const expensiveProducts = products.filter(product =&gt; product.price &gt; 500);

console.log(expensiveProducts);

We filter an array of product objects to find items with prices over 500. The
callback function checks each object's price property. Only objects meeting the
condition are included in the new array.

$ node main.js
[
  { name: 'Laptop', price: 999 },
  { name: 'Phone', price: 699 }
]

## Filtering with index parameter

The filter callback can accept an index parameter to use the element's position.

main.js
  

const fruits = ['apple', 'banana', 'orange', 'kiwi', 'mango'];
const filteredFruits = fruits.filter((fruit, index) =&gt; index % 2 === 0);

console.log(filteredFruits);

We filter an array to get only elements at even indices. The callback function
receives both the element and its index. We use the index to determine which
elements to include.

$ node main.js
[ 'apple', 'orange', 'mango' ]

## Filtering with thisArg parameter

The filter method can accept a second parameter to set the this value.

main.js
  

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const filterObj = {
  min: 3,
  max: 7,
  checkRange(num) {
    return num &gt;= this.min &amp;&amp; num &lt;= this.max;
  }
};

const filteredNumbers = numbers.filter(function(num) {
  return this.checkRange(num);
}, filterObj);

console.log(filteredNumbers);

We use an object to define our filtering criteria and pass it as the second
argument. The this value inside the callback refers to our filter
object. This allows us to use object methods in our filter logic.

$ node main.js
[ 3, 4, 5, 6, 7 ]

## Filtering out falsy values

The filter method can be used to remove all falsy values from an array.

main.js
  

const mixedValues = [0, 1, false, 2, '', 3, null, undefined, NaN, 4];
const truthyValues = mixedValues.filter(Boolean);

console.log(truthyValues);

We use the Boolean constructor as our filter function. This automatically
converts each value to a boolean and keeps only truthy values. Falsy values
like 0, false, empty string, null, undefined, and NaN are removed.

$ node main.js
[ 1, 2, 3, 4 ]

## Source

[Array filter - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

In this article we have demonstrated how to use the filter() method to process
arrays in JavaScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Array Functions.](/javascript/#js-array)