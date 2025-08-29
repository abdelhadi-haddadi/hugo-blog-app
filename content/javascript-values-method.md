+++
title = "JavaScript values() method"
date = 2025-08-29T20:02:17.155+01:00
draft = false
description = "JavaScript values() tutorial shows how to iterate over values in JavaScript. The tutorial provides examples to demonstrate values() usage with different data structures."
image = ""
imageBig = ""
categories = ["js-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript values() method

last modified April 4, 2025

 

In this article we show how to use the values method to iterate
over values in JavaScript collections. The method works with Array, Map, and Set.

## The values() method

The values method returns a new iterator object that contains the
values for each element in the collection. It is available for Array, Map, and
Set objects in JavaScript.

This method provides a way to access all values in a collection sequentially.
The returned iterator follows the iteration protocol, allowing use with
for...of loops and other iteration contexts.

For Arrays, values is equivalent to the array itself since array
elements are values. For Maps, it returns the stored values (not keys). For
Sets, it returns the set elements since Sets store only values.

## Basic Array values() example

The following example demonstrates the basic usage of values with
an array.

main.js
  

const fruits = ['apple', 'banana', 'cherry'];
const iterator = fruits.values();

for (const value of iterator) {
    console.log(value);
}

We create an array and get its values iterator. We then iterate through the
values using a for...of loop. The iterator provides each array
element in sequence.

$ node main.js
apple
banana
cherry

## Using values() with Map

The values method is particularly useful with Map objects.

main.js
  

const capitals = new Map();
capitals.set('France', 'Paris');
capitals.set('Germany', 'Berlin');
capitals.set('Italy', 'Rome');

const cityIterator = capitals.values();

for (const city of cityIterator) {
    console.log(city);
}

We create a Map of country-capital pairs and use values to get
an iterator of just the capital cities. The iterator allows us to access each
value without dealing with the keys.

$ node main.js
Paris
Berlin
Rome

## Using values() with Set

The values method works similarly with Set objects.

main.js
  

const uniqueNumbers = new Set([10, 20, 30, 20, 10]);
const valueIterator = uniqueNumbers.values();

console.log([...valueIterator]); // Convert iterator to array

We create a Set (which automatically removes duplicates) and get its values
iterator. We convert the iterator to an array using the spread operator to
demonstrate all unique values.

$ node main.js
[ 10, 20, 30 ]

## Manual iteration with next()

We can manually step through the iterator using the next method.

main.js
  

const colors = ['red', 'green', 'blue'];
const colorIterator = colors.values();

console.log(colorIterator.next().value);
console.log(colorIterator.next().value);
console.log(colorIterator.next().value);
console.log(colorIterator.next().done);

We manually call next on the iterator to get each value. The
done property becomes true when no more values are available.
This demonstrates how iterators work internally.

$ node main.js
red
green
blue
true

## Combining values() with other methods

The values method can be combined with other iterator methods.

main.js
  

const scores = new Map([
    ['Alice', 95],
    ['Bob', 88],
    ['Charlie', 92]
]);

const topScores = [...scores.values()].filter(score =&gt; score &gt; 90);
console.log(topScores);

We get all values from a Map, convert them to an array, then filter for scores
above 90. This shows how values can be part of a processing
pipeline.

$ node main.js
[ 95, 92 ]

## Source

[Array values() - MDN reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/values)

In this article we have demonstrated how to use the values method
to work with different JavaScript collections.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Array Functions.](/javascript/#js-array)