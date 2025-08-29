+++
title = "JavaScript Array.of method"
date = 2025-08-29T20:02:01.455+01:00
draft = false
description = "JavaScript Array.of tutorial shows how to create arrays in JavaScript. The tutorial provides numerous examples to demonstrate array creation with Array.of in JS."
image = ""
imageBig = ""
categories = ["js-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript Array.of method

last modified April 4, 2025

 

In this article we show how to create arrays using the Array.of method
in JavaScript.

## Array.of method

The Array.of method creates a new array instance from a variable
number of arguments. Unlike the Array constructor, it treats single numeric
arguments as array elements rather than setting the array length.

This method was introduced in ES6 to address inconsistencies with the Array
constructor. The Array.of() method always creates an array containing its
arguments as elements, regardless of the number or type of arguments.

The primary use case for Array.of() is when you need to create arrays with
specific elements. It provides a consistent way to create arrays that works
the same regardless of the number or type of arguments passed.

## Basic Array.of example

The following example demonstrates the basic usage of the Array.of
method.

main.js
  

const nums = Array.of(1, 2, 3, 4, 5);
console.log(nums);

We create an array containing five numeric elements. The Array.of() method
takes each argument and adds it as an element to the new array. This works
consistently regardless of argument types.

$ node main.js
[ 1, 2, 3, 4, 5 ]

## Array.of vs Array constructor

The key difference between Array.of() and the Array constructor is shown here.

main.js
  

const arr1 = Array.of(7);
const arr2 = Array(7);

console.log(arr1);
console.log(arr2);

When using Array.of(7), we get an array with one element (7). With Array(7),
we get an empty array with length 7. This demonstrates Array.of's consistent
behavior compared to the Array constructor.

$ node main.js
[ 7 ]
[ , , , , , ,  ]

## Creating arrays with mixed types

Array.of can create arrays containing elements of different types.

main.js
  

const mixed = Array.of(1, 'two', true, {name: 'John'}, [5, 6]);
console.log(mixed);

We create an array containing a number, string, boolean, object, and another
array. Array.of() handles all these types consistently, adding each argument
as an element in the new array.

$ node main.js
[ 1, 'two', true, { name: 'John' }, [ 5, 6 ] ]

## Creating empty and single-element arrays

Array.of() provides consistent behavior when creating empty or single-element
arrays.

main.js
  

const empty = Array.of();
const single = Array.of('hello');
const singleNum = Array.of(10);

console.log(empty);
console.log(single);
console.log(singleNum);

Array.of() without arguments creates an empty array. With one argument, it
creates a single-element array, whether the argument is a string or number.
This consistency is the main advantage over the Array constructor.

$ node main.js
[]
[ 'hello' ]
[ 10 ]

## Using Array.of with array-like objects

Array.of can be used to convert array-like objects into true arrays.

main.js
  

function example() {
    return Array.of(...arguments);
}

const arr = example(1, 2, 3);
console.log(arr);

We convert the arguments object into a true array using Array.of() with the
spread operator. This demonstrates how Array.of() can work with array-like
objects to create proper arrays.

$ node main.js
[ 1, 2, 3 ]

## Source

[Array.of - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of)

In this article we have demonstrated how to use the Array.of() method to create
arrays in JavaScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Array Functions.](/javascript/#js-array)