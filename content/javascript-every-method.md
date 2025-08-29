+++
title = "JavaScript every() method"
date = 2025-08-29T20:02:03.726+01:00
draft = false
description = "JavaScript every() tutorial shows how to test array elements in JavaScript. The tutorial provides numerous examples to demonstrate element testing in JS arrays."
image = ""
imageBig = ""
categories = ["js-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript every() method

last modified April 4, 2025

 

In this article we show how to test array elements using the every
method in JavaScript.

## Array every() method

The every method tests whether all elements in an array pass a
test implemented by a provided function. It returns a Boolean value - true if
all elements pass the test, false otherwise.

The method executes the callback function once for each element until it finds
one that fails the test. If such an element is found, the method immediately
returns false. Otherwise, it returns true for an empty array.

The callback function is invoked with three arguments: the value of the element,
the index of the element, and the array object being traversed. The method does
not mutate the array on which it is called.

## Basic every() example

The following example demonstrates the basic usage of the every
method.

main.js
  

const numbers = [12, 34, 56, 78, 90];
const allEven = numbers.every(num =&gt; num % 2 === 0);

console.log(allEven);  // Check if all numbers are even

We test if all elements in the array are even numbers. The arrow function checks
each element's divisibility by 2. The method returns false because not all
numbers are even.

$ node main.js
false

## Testing array elements with a function

We can use a named function as the test condition for every.

main.js
  

function isPositive(element) {
    return element &gt; 0;
}

const values = [1, 2, 3, 4, 5];
const allPositive = values.every(isPositive);

console.log(allPositive);

We define a separate isPositive function that checks if a number is
positive. The every method applies this function to each element.
Since all numbers are positive, it returns true.

$ node main.js
true

## Testing object properties

The every method can test properties of objects in an array.

main.js
  

const users = [
    { name: 'John', age: 25 },
    { name: 'Jane', age: 30 },
    { name: 'Bob', age: 18 }
];

const allAdults = users.every(user =&gt; user.age &gt;= 18);
console.log(allAdults);

We check if all users in the array are adults (age 18 or older). The arrow
function accesses each object's age property. The method returns true as all
users meet the condition.

$ node main.js
true

## Using index parameter

The callback function can use the index parameter for more complex tests.

main.js
  

const temperatures = [22, 23, 24, 25, 26];
const increasing = temperatures.every((temp, index, arr) =&gt; {
    return index === 0 || temp &gt; arr[index - 1];
});

console.log(increasing);

We check if temperatures are strictly increasing. The callback compares each
element with the previous one using the index. The method returns true as each
temperature is higher than the previous.

$ node main.js
true

## Testing empty arrays

The every method returns true for any condition on an empty array.

main.js
  

const emptyArray = [];
const result = emptyArray.every(element =&gt; element &gt; 10);

console.log(result);

We test an empty array with a condition that would normally fail. The method
returns true because there are no elements to fail the test. This is a
mathematical property of universal quantification.

$ node main.js
true

## Source

[Array every() - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)

In this article we have demonstrated how to use the every() method to test array
elements in JavaScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Array Functions.](/javascript/#js-array)