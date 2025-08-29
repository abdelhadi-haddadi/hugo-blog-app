+++
title = "JavaScript group() method"
date = 2025-08-29T20:02:07.084+01:00
draft = false
description = "JavaScript group() tutorial shows how to group array elements in JavaScript. The tutorial provides numerous examples to demonstrate array grouping in JS."
image = ""
imageBig = ""
categories = ["js-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript group() method

last modified April 4, 2025

 

In this article we show how to group array elements using the group
method in JavaScript.

## Array grouping

Array grouping is the operation of organizing array elements into categories
based on a grouping function. The group method groups elements
of an array according to string values returned by a provided callback function.

This method returns a new object with properties representing the groups and
arrays containing the elements that belong to each group. The original array
is not modified. The callback function is executed for each element in the array.

The group method was introduced in ECMAScript 2022 (ES13). It
provides a convenient way to categorize data without external libraries. The
grouping is case-sensitive and maintains the original order of elements.

## Basic group() example

The following example demonstrates the basic usage of the group
method.

main.js
  

const inventory = [
  { name: 'asparagus', type: 'vegetables' },
  { name: 'bananas', type: 'fruit' },
  { name: 'goat', type: 'meat' },
  { name: 'cherries', type: 'fruit' },
  { name: 'fish', type: 'meat' }
];

const result = inventory.group(({ type }) =&gt; type);

console.log(result);

We create an array of objects and group them by their type property. The callback
function extracts the type value which becomes the group key. The result is an
object with properties matching the group keys.

$ node main.js
{
  vegetables: [{ name: 'asparagus', type: 'vegetables' }],
  fruit: [
    { name: 'bananas', type: 'fruit' },
    { name: 'cherries', type: 'fruit' }
  ],
  meat: [
    { name: 'goat', type: 'meat' },
    { name: 'fish', type: 'meat' }
  ]
}

## Grouping numbers by parity

We can group numbers based on whether they are even or odd.

main.js
  

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const grouped = numbers.group((num) =&gt; {
  return num % 2 === 0 ? 'even' : 'odd';
});

console.log(grouped);

We create an array of numbers and group them into 'even' and 'odd' categories.
The callback function checks each number's parity and returns the appropriate
group key. The result contains two arrays under the 'even' and 'odd' keys.

$ node main.js
{
  odd: [1, 3, 5, 7, 9],
  even: [2, 4, 6, 8, 10]
}

## Grouping by string length

The group method can categorize strings by their length.

main.js
  

const words = ['apple', 'banana', 'cat', 'dog', 'elephant', 'fox'];

const lengthGroups = words.group((word) =&gt; {
  return word.length &gt; 5 ? 'long' : 'short';
});

console.log(lengthGroups);

We group an array of words into 'long' and 'short' categories based on their
length. The callback function checks each word's character count and returns
the appropriate group key. The grouping is dynamic based on our length criteria.

$ node main.js
{
  short: ['apple', 'cat', 'dog', 'fox'],
  long: ['banana', 'elephant']
}

## Grouping objects by age range

We can group objects into age ranges using the group method.

main.js
  

const people = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 17 },
  { name: 'Charlie', age: 30 },
  { name: 'David', age: 15 },
  { name: 'Eve', age: 22 }
];

const ageGroups = people.group((person) =&gt; {
  if (person.age &lt; 18) return 'minor';
  if (person.age &lt; 30) return 'adult';
  return 'senior';
});

console.log(ageGroups);

We categorize people into 'minor', 'adult', and 'senior' groups based on their
age. The callback function contains conditional logic to determine the
appropriate group for each person. The result is an object with three properties.

$ node main.js
{
  minor: [
    { name: 'Bob', age: 17 },
    { name: 'David', age: 15 }
  ],
  adult: [
    { name: 'Alice', age: 25 },
    { name: 'Eve', age: 22 }
  ],
  senior: [{ name: 'Charlie', age: 30 }]
}

## Grouping with complex keys

The group method can use complex keys combining multiple values.

main.js
  

const products = [
  { name: 'Laptop', category: 'Electronics', price: 999 },
  { name: 'Shirt', category: 'Clothing', price: 25 },
  { name: 'Phone', category: 'Electronics', price: 699 },
  { name: 'Pants', category: 'Clothing', price: 45 }
];

const groupedProducts = products.group((product) =&gt; {
  return `${product.category}-${product.price &gt; 100 ? 'expensive' : 'cheap'}`;
});

console.log(groupedProducts);

We group products by both category and price range. The callback function creates
compound keys combining category and price information. This demonstrates how to
create more sophisticated grouping criteria.

$ node main.js
{
  'Electronics-expensive': [
    { name: 'Laptop', category: 'Electronics', price: 999 },
    { name: 'Phone', category: 'Electronics', price: 699 }
  ],
  'Clothing-cheap': [
    { name: 'Shirt', category: 'Clothing', price: 25 },
    { name: 'Pants', category: 'Clothing', price: 45 }
  ]
}

## Source

[Array group() - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/group)

In this article we have demonstrated how to use the group() method to categorize
array elements in JavaScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Array Functions.](/javascript/#js-array)