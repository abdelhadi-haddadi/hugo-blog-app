+++
title = "JavaScript reduce method"
date = 2025-08-29T20:02:11.501+01:00
draft = false
description = "JavaScript reduce tutorial shows how to transform arrays in JavaScript. The tutorial provides numerous examples to demonstrate array reduction in JS."
image = ""
imageBig = ""
categories = ["js-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript reduce method

last modified April 4, 2025

 

In this article we show how to transform arrays using the reduce method
in JavaScript.

## Array reduction

Array reduction is the process of transforming an array into a single value.
The reduce method executes a reducer function on each element of
the array. This results in a single output value calculated from the elements.

The reducer function takes four arguments: accumulator, current value, current
index, and source array. The accumulator accumulates the callback's return
values. It remembers the value across iterations.

The reduce method is powerful for operations like summing numbers,
flattening arrays, or grouping objects. It can also take an initial value for
the accumulator. If omitted, the first array element becomes the initial value.

## Basic reduce example

The following example demonstrates summing numbers with the reduce
method.

main.js
  

const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((accumulator, current) =&gt; {
    return accumulator + current;
}, 0);

console.log(sum);

We sum all numbers in the array. The accumulator starts at 0 (initial value).
Each iteration adds the current number to the accumulator. The final result is
the sum of all numbers.

$ node main.js
15

## Finding maximum value

The reduce method can find the maximum value in an array.

main.js
  

const values = [12, 34, 21, 54, 38];
const max = values.reduce((acc, current) =&gt; {
    return Math.max(acc, current);
});

console.log(max);

We find the maximum value without providing an initial accumulator value. The
first element becomes the initial value. Each iteration compares and keeps the
higher value between accumulator and current element.

$ node main.js
54

## Flattening an array

The reduce method can flatten nested arrays into a single array.

main.js
  

const nested = [[1, 2], [3, 4], [5, 6]];
const flat = nested.reduce((acc, current) =&gt; {
    return acc.concat(current);
}, []);

console.log(flat);

We start with an empty array as the accumulator. Each iteration concatenates
the current nested array to the accumulator. The result is a single flattened
array containing all elements.

$ node main.js
[ 1, 2, 3, 4, 5, 6 ]

## Counting occurrences

The reduce method can count occurrences of values in an array.

main.js
  

const fruits = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple'];
const count = fruits.reduce((acc, fruit) =&gt; {
    acc[fruit] = (acc[fruit] || 0) + 1;
    return acc;
}, {});

console.log(count);

We start with an empty object as the accumulator. For each fruit, we increment
its count in the accumulator object. The result is an object with fruit names
as keys and their counts as values.

$ node main.js
{ apple: 3, banana: 2, orange: 1 }

## Grouping objects by property

The reduce method can group objects by a specific property.

main.js
  

const people = [
    { name: 'Alice', age: 21 },
    { name: 'Bob', age: 25 },
    { name: 'Charlie', age: 21 }
];

const grouped = people.reduce((acc, person) =&gt; {
    const key = person.age;
    if (!acc[key]) {
        acc[key] = [];
    }
    acc[key].push(person);
    return acc;
}, {});

console.log(grouped);

We group people by their age. The accumulator is an empty object. For each
person, we check if their age exists as a key. If not, we initialize it with
an empty array. Then we push the person into their age group array.

$ node main.js
{
  '21': [ { name: 'Alice', age: 21 }, { name: 'Charlie', age: 21 } ],
  '25': [ { name: 'Bob', age: 25 } ]
}

## Source

[Array reduce - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)

In this article we have demonstrated how to use the reduce() method to transform
arrays in JavaScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Array Functions.](/javascript/#js-array)