+++
title = "Ramda tutorial"
date = 2025-08-29T20:01:35.837+01:00
draft = false
description = "Explore functional programming in JavaScript with the Ramda.js library, featuring practical examples and detailed explanations."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Ramda tutorial

last modified last modified October 18, 2023

 

In this article we show how to work with the Ramda library, which provides tools
for advanced functional programming in JavaScript. In this article we use terms
list and array interchangeably.

## Ramda

Ramda is a practical functional library for JavaScript programmers.
The library focuses on immutability and side-effect free functions. Ramda
functions are also automatically curried, which allows to build up new functions
from old ones simply by not supplying the final parameters.

In this article we work with Ramda in a Node application.

## Setting up Ramda

First, we install Ramda.

$ npm init -y

We initiate a new Node application.

$ npm i ramda

We install Ramda with npm i ramda command.

## Ramda add, subtract functions

The add function adds two values, and the subtract
function subtracts two values.

add_sub.js
  

import * as R from 'ramda';

console.log(R.add(2, 5));
console.log(R.subtract(2, 5));

let res = R.add(R.add(2, 5), R.subtract(2, 10));
console.log(res);

The example uses both add and subtract
functions.

let res = R.add(R.add(2, 5), R.subtract(2, 10));

Here we combine these functions.

$ node add_sub.js
7
-3
-1

## Ramda flip function

The flip function returns a new function from the supplied one
where its arguments are reversed.

flipfun.js
  

import * as R from 'ramda';

let val = R.subtract(2, 10);
console.log(val);

let val2 = R.flip(R.subtract)(2, 10);
console.log(val2);

The example reverses the arguments of the subtract function
with flip.

$ node flipfun.js
-8
8

## Ramda call function

The call function invokes a provided function on arguments
separated by comma.

calling.js
  

import * as R from 'ramda';

let res = R.call(R.add, 1, 2);
console.log(res);

console.log(R.call(R.repeat, 'x')(5));

R.call(console.log, [1, 2, 3]);

The example uses the call function.

let res = R.call(R.add, 1, 2);

We call the add function to add two integers.

console.log(R.call(R.repeat, 'x')(5));

We call the repeat function to generate a list of five 'x' letters.

R.call(console.log, [1, 2, 3]);

Finally, we use the call function to output the list.

$ node calling.js
3
[ 'x', 'x', 'x', 'x', 'x' ]
[ 1, 2, 3 ]

## Ramda apply function

The apply function invokes a provided function on a list of
arguments.

applyfun.js
  

import * as R from 'ramda';

let nums = [3, 5, 7, 8, 2, 1];

let res = R.apply(Math.min, nums);
console.log(res);

let res2 = R.apply(Math.max, nums);
console.log(res2);

The example uses the apply function to compute minimum and maximum.

let res = R.apply(Math.min, nums);

We invoke the Math.min function on a nums list. We get
the minimum from the values.

$ node applyfun.js
1
8

We get the minimum and maximum.

## Ramda automatic currying

Currying is the process of transforming a function that expects multiple
parameters into another function that, when supplied fewer parameters, returns a
new function that awaits the remaining ones.

currying.js
  

import * as R from 'ramda';

let addOneToAll = R.map(R.add(1));
let res = addOneToAll([1,2,3]);

console.log(res);

In the example, we create a addOneToAllfunction that
increments each element in the list by one.

$ node currying.js
[ 2, 3, 4 ]

## Ramda head, tail, init, last functions

The head returns the first element of the given list or string. The
tail returns all but the first element of the given list or string.
The init returns all but the last element of the given list or
string. The last returns the last element of the given list or
string.

head_tail.js
  

import * as R from 'ramda';

let nums = [2, 4, 6, 8, 10];

console.log(R.head(nums));
console.log(R.tail(nums));
console.log(R.init(nums));
console.log(R.last(nums));

The example uses head, tail, init,
and last functions on an array of values.

$ node head_tail.js
2
[ 4, 6, 8, 10 ]
[ 2, 4, 6, 8 ]
10

## Ramda length function

The length function returns the number of elements in
the list.

lengthfun.js
  

import * as R from 'ramda';

let nums = [1, 2, 2, 2, 3, 3, 4, 5, 5, 5, 6, 7];

let n1 = R.length(nums);
console.log(n1);

let n2 = R.length(R.uniq(nums));
console.log(n2);

In the example, we calculate the number of elements in list and the number of
unique elements in the list.

$ node lengthfn.js
12
7

There are twelve elements in the list and seven unique elements in the list.

## Ramda prop function

The prop function returns the specified property of an object if it
exists.

propfun.js
  

import * as R from 'ramda';

console.log(R.prop('name', { name: 'John', age: 25 }));
console.log(R.prop('age', { name: 'John', age: 25 }));

With the prop function, we get the values of the
name and age properties.

$ node propfun.js
John
25

## Ramda pluck function

The pluck function returns a new list by plucking the specified
property off all objects in the list supplied.

plucking.js
  

import * as R from 'ramda';

const users = [
  { name: 'John', age: 25 },
  { name: 'Lenny', age: 51 },
  { name: 'Andrew', age: 43 },
  { name: 'Peter', age: 81 },
  { name: 'Anna', age: 43 },
  { name: 'Albert', age: 76 },
  { name: 'Adam', age: 47 },
  { name: 'Robert', age: 72 }
];

console.log(R.pluck('age', users));
console.log(R.pluck('name', users));

With the pluck function, we take the name
and age properties and form two new lists.

$ node plucking.js
[ 25, 51, 43, 81, 43, 76, 47, 72 ]
[ 'John',
  'Lenny',
  'Andrew',
  'Peter',
  'Anna',
  'Albert',
  'Adam',
  'Robert' ]

In the following example we work with the formed list.

plucking2.js
  

import * as R from 'ramda';

const users = [
  { name: 'John', age: 25 },
  { name: 'Lenny', age: 51 },
  { name: 'Andrew', age: 43 },
  { name: 'Peter', age: 81 },
  { name: 'Anna', age: 43 },
  { name: 'Albert', age: 76 },
  { name: 'Adam', age: 47 },
  { name: 'Robert', age: 72 }
];

let maxAge = R.apply(Math.max, R.pluck('age', users));
// let maxAge = Math.max(... R.pluck('age', users));

console.log(`The oldest person is ${maxAge} years old.`);

In the example we find out the oldest age of a person.

let maxAge = R.apply(Math.max, R.pluck('age', users));

By invoking the Math.max function on a list of ages, we get the
oldest age.

// let maxAge = Math.max(... R.pluck('age', users));

An alternative commented solution uses a spread operator instead of the
apply function.

$ node plucking2.js
The oldest person is 81 years old.

## Ramda split list

With splitEvery function, we can split a list into chunks of
specified length.

chunks.js
  

import * as R from 'ramda';

let nums = [1, 2, 3, 4, 5, 6];

console.log(R.splitEvery(2, nums));
console.log(R.splitEvery(3, nums));

In the example, we split the array into chunks of 2 and 3 elements.

$ node chunks.js
[ [ 1, 2 ], [ 3, 4 ], [ 5, 6 ] ]
[ [ 1, 2, 3 ], [ 4, 5, 6 ] ]

## Ramda contains function

The contains function returns true if the specified value is in the
list.

containsfun.js
  

import * as R from 'ramda';

const users = [
  { name: 'John', age: 25 },
  { name: 'Lenny', age: 51 },
  { name: 'Andrew', age: 43 },
  { name: 'Peter', age: 81 },
  { name: 'Anna', age: 43 },
  { name: 'Albert', age: 76 },
  { name: 'Adam', age: 47 },
  { name: 'Robert', age: 72 }
];

let isJohn = R.contains('John', R.pluck('name', users));

if (isJohn) {

  console.log('There is John in the list');
}

In the example we check if the specified user is in the list.

let isJohn = R.contains('John', R.pluck('name', users));

First, we use the pluck function to form a list from the
name property. Then we check if  'John' is in the list with
contains.

$ node containsfun.js
There is John in the list

## Ramda range function

The range function returns a list of numbers from the start value
(inclusive) to the end value (exclusive).

rangefun.js
  

import * as R from 'ramda';

console.log(R.range(1, 10));

let vals = R.range(2, 12);

vals.forEach(x =&gt; console.log(x));

The example shows how to use the range function.

console.log(R.range(1, 10));

In this line, we create a list of 1..9 integers. We print them to the console.

let vals = R.range(2, 12);

vals.forEach(x =&gt; console.log(x));

Here we generate a list of 2..11 values. We go over the list with the
forEach function.

$ node rangefun.js
[ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
2
3
4
5
6
7
8
9
10
11

## Ramda sum function

The sum function sums all the elements of a list.

summation.js
  

import * as R from 'ramda';

let nums = [2, 4, 6, 8, 10];
console.log(R.sum(nums));

console.log(R.sum(R.range(1, 11)));

The example uses the sum function to sum integer values.

let nums = [2, 4, 6, 8, 10];
console.log(R.sum(nums));

Here we sum the values of the nums array.

console.log(R.sum(R.range(1, 11)));

In this line we sum values of a list generated by the range
function.

$ node summation.js
30
55

## Ramda product function

The product function multiplies together all the elements of a
list.

productfun.js
  

import * as R from 'ramda';

let nums = [2, 4, 6, 8, 10];

console.log(R.product(nums));

The example calculates the product of a list of integers.

$ node productfun.js
3840

## Ramda sort, reverse functions

The sort function returns a copy of the list, sorted according to
the comparator function. The comparator function accepts two values at a time
and returns a negative number if the first value is smaller, a positive number
if it is larger, and zero if they are equal.

The reverse function returns a new list or string with the elements
or characters in reverse order.

sort_reverse.js
  

import * as R from 'ramda';

let nums = [3, 1, 4, 2, 8, 5, 6];

console.log('sorting:')

// sort ascending
console.log(R.sort((x, y) =&gt;  x - y , nums));

// sort descending
console.log(R.sort((x, y) =&gt;  y - x , nums));

console.log('reversing:')

// reversing
console.log(R.reverse(nums));
console.log(R.reverse('forest'));

The example sorts integers in ascending and descending order and reverses
integers and a string.

$ node sort_reverse.js
sorting:
[ 1, 2, 3, 4, 5, 6, 8 ]
[ 8, 6, 5, 4, 3, 2, 1 ]
reversing:
[ 6, 5, 8, 2, 4, 1, 3 ]
tserof

We can also use the built-in R.lt and R.gt
comparators.

sort_comp.js
  

import * as R from 'ramda';

let nums = [3, 1, 4, 2, 8, 5, 6];

console.log('sorting:')

// sort ascending
console.log(R.sort(R.comparator(R.lt), nums));

// sort descending
console.log(R.sort(R.comparator(R.gt), nums));

The example sorts integers in ascending and descending order.

## Ramda sortBy function

The sortBy function sort the list according to the
supplied function.

sorting_objects.js
  

import * as R from 'ramda';

const users = [
  { name: 'John', age: 25 },
  { name: 'Lenny', age: 51 },
  { name: 'Andrew', age: 43 },
  { name: 'Peter', age: 81 },
  { name: 'Anna', age: 43 },
  { name: 'Albert', age: 76 },
  { name: 'Adam', age: 47 },
  { name: 'Robert', age: 72 }
];

console.log('Sorted by age:');

let sortedByAge = R.sortBy(R.prop('age'), users);
console.log(sortedByAge);

console.log('Sorted by name:');

let sortedByName = R.sortBy(R.prop('name'), users);
console.log(sortedByName);

In the example, we sort the list of users by age and
name properties in ascending order.

$ node sorting_objects.js
Sorted by age:
[ { name: 'John', age: 25 },
  { name: 'Andrew', age: 43 },
  { name: 'Anna', age: 43 },
  { name: 'Adam', age: 47 },
  { name: 'Lenny', age: 51 },
  { name: 'Robert', age: 72 },
  { name: 'Albert', age: 76 },
  { name: 'Peter', age: 81 } ]
Sorted by name:
[ { name: 'Adam', age: 47 },
  { name: 'Albert', age: 76 },
  { name: 'Andrew', age: 43 },
  { name: 'Anna', age: 43 },
  { name: 'John', age: 25 },
  { name: 'Lenny', age: 51 },
  { name: 'Peter', age: 81 },
  { name: 'Robert', age: 72 } ]

## Ramda find, findLast functions

The find function returns the first element of the list which
matches the predicate, or undefined if there is no match. The
findLast function returns the last element of the list which
matches the predicate, or undefined if no element matches.

finding.js
  

import * as R from 'ramda';

const isPositive = x =&gt; x &gt; 0;

let values = [-1, 0, -4, 5, 6, -1, 9, -2]

let val = R.find(isPositive, values);
console.log(val);

let val2 = R.findLast(isPositive, values);
console.log(val2);

In the example, we find the first and last positive value.

const isPositive = x =&gt; x &gt; 0;

The isPositive is a predicate function which returns true for
values greater than zero.

let val = R.find(isPositive, values);

With find, we find the first occurrence of a positive
number.

let val2 = R.findLast(isPositive, values);

With findLast, we find the last occurrence of a positive
number.

$ node finding.js
5
9

The first positive value is 5, the last 9.

In the following example, we use the find function on
a list of objects.

finding2.js
  

import * as R from 'ramda';

const users = [
  { name: 'John', age: 25 },
  { name: 'Lenny', age: 51 },
  { name: 'Andrew', age: 43 },
  { name: 'Peter', age: 81 },
  { name: 'Anna', age: 43 },
  { name: 'Albert', age: 76 },
  { name: 'Adam', age: 47 },
  { name: 'Robert', age: 72 },
  { name: 'Robert', age: 26 },
];

console.log(R.find(R.propEq('name', 'Robert'))(users));
console.log(R.find(R.propEq('age', 81))(users));

With the combination of find and propEq
functions we look for users having specified attributes.

console.log(R.find(R.propEq('name', 'Robert'))(users));

Here we look for a person named Robert. There are two Roberts and the first
match is returned.

$ node finding2.js
{ name: 'Robert', age: 72 }
{ name: 'Peter', age: 81 }

## Ramda map function

The map function maps a provided function on each of the
container's values.

mapping.js
  

import * as R from 'ramda';

nums = [2, 4, 5, 6, 7, 8, 9];

let res = R.map(x =&gt; x * 2, nums);
console.log(res);

const isEven = x =&gt; x % 2 === 0;
let res2 = R.map(isEven, nums);
console.log(res2);

let repeated = R.map(R.call, R.repeat(Math.random, 5));
console.log(repeated);

The example demonstrates the usage of map.

let res = R.map(x =&gt; x * 2, nums);

We map an anonymous function on the list of integers. A new list is generated
where each of the value is multiplied by 2.

const isEven = x =&gt; x % 2 === 0;
let res2 = R.map(isEven, nums);

Here we apply the isEven function on each of the elements. The
res2 is a list of true and false values. If we wanted to pick only
event numbers then we would use filter function.

let repeated = R.map(R.call, R.repeat(Math.random, 5));

In the third case, we generate a list of five random values.

$ node mapping.js
[ 4, 8, 10, 12, 14, 16, 18 ]
[ true, true, false, true, false, true, false ]
[ 0.22019193556521865,
  0.415950206671615,
  0.8770997167119405,
  0.23393806619678315,
  0.8181008680173825 ]

## Ramda filter function

The filter fuction filters a filterable (such as list or plain
object) according to the supplied predicate function. (A predicate is a function
that returns a boolean value).

filtering.js
  

import * as R from 'ramda';

nums = [-3, -1, 0, 2, 3, 4, 5, 6, 7]

let res = R.filter(x =&gt; x &gt; 0, nums);
console.log(res);

let res2 = R.filter(x =&gt; x &lt; 0, nums);
console.log(res2);

const isEven = x =&gt; x % 2 === 0;

let filtered = R.filter(isEven, nums);
console.log(filtered);

In the example, we have a list of integer values. We use the filter
function to filter out positive, negative, and even values.

let res = R.filter(x =&gt; x &gt; 0, nums);

The filter function in this line takes an anonymous function that
returns true for all values greater than zero. The predicate is then applied on
each element of the list. This way we form a new list containing only positive
values.

$ node filtering.js
[ 2, 3, 4, 5, 6, 7 ]
[ -3, -1 ]
[ 0, 2, 4, 6 ]

In the following example we apply the filter function on a list of
users.

filtering2.js
  

import * as R from 'ramda';

// senior is a person who is 70+

const users = [
  { name: 'John', age: 25 },
  { name: 'Lenny', age: 51 },
  { name: 'Andrew', age: 43 },
  { name: 'Peter', age: 81 },
  { name: 'Anna', age: 43 },
  { name: 'Albert', age: 76 },
  { name: 'Adam', age: 47 },
  { name: 'Robert', age: 72 }
];

console.log(R.filter(user =&gt; user.age &gt;= 70, users));

The example filters out senior users. We define a senior as someone who is 70
and older.

$ node filtering2.js
[ { name: 'Peter', age: 81 },
  { name: 'Albert', age: 76 },
  { name: 'Robert', age: 72 } ]

We have three senior users.

## The reject function

The reject is a complement to the filter. It excludes
elements of a filterable for which the predicate returns true.

rejecting.js
  

import * as R from 'ramda';

const users = [
    { name: 'John', city: 'London', born: '2001-04-01' },
    { name: 'Lenny', city: 'New York', born: '1997-12-11' },
    { name: 'Andrew', city: 'Boston', born: '1987-02-22' },
    { name: 'Peter', city: 'Prague', born: '1936-03-24' },
    { name: 'Anna', city: 'Bratislava', born: '1973-11-12' },
    { name: 'Albert', city: 'Bratislava', born: '1940-18-19' },
    { name: 'Adam', city: 'Trnava', born:'1983-12-01' },
    { name: 'Robert', city: 'Bratislava', born: '1935-05-15' },
    { name: 'Robert', city: 'Prague', born:'1998-03-14' }
  ];

let res = R.reject(R.propEq('city', 'Bratislava'))(users);
console.log(res);

let res2 = R.filter(R.propEq('city', 'Bratislava'))(users);
console.log(res2);

In the example, we use the reject function to form a new list of
objects that does not contain Bratislava city. We also use the
filter function to form a new list of objects that
contain Bratislava city.

$ node rejecting.js
[ { name: 'John', city: 'London', born: '2001-04-01' },
  { name: 'Lenny', city: 'New York', born: '1997-12-11' },
  { name: 'Andrew', city: 'Boston', born: '1987-02-22' },
  { name: 'Peter', city: 'Prague', born: '1936-03-24' },
  { name: 'Adam', city: 'Trnava', born: '1983-12-01' },
  { name: 'Robert', city: 'Prague', born: '1998-03-14' } ]
[ { name: 'Anna', city: 'Bratislava', born: '1973-11-12' },
  { name: 'Albert', city: 'Bratislava', born: '1940-18-19' },
  { name: 'Robert', city: 'Bratislava', born: '1935-05-15' } ]

This is the output. The first list contains all objects that do not contain the
Bratislava city attribute. The second one contains only objects having
Bratislava city attribute.

## The partition function

The partition function divides filterable into a two separate
objects: one that satisfies the predicate and one that does not.

partitionfun.js
  

import * as R from 'ramda';

let nums = [4, -5, 3, 2, -1, 7, -6, 8, 9];

let [ neg, pos ] = R.partition(e =&gt; e &lt; 0, nums);

console.log(neg);
console.log(pos);

With the partition function we split the list of integers into two
separate lists: negative and positive.

$ node partitionfun.js
[ -5, -1, -6 ]
[ 4, 3, 2, 7, 8, 9 ]

The first list contains negative values, the second list positive.

## Ramda groupBy function

The groupBy function splits a list into sub-lists stored in an
object, based on the result of calling a String-returning function on each
element, and grouping the results according to values returned.

grouping.js
  

import * as R from 'ramda';

let students = [
  { name: 'Adam', score: 84 },
  { name: 'Eddy', score: 58 },
  { name: 'Peter', score: 69 },
  { name: 'Roman', score: 93 },
  { name: 'Jane', score: 56 },
  { name: 'Lucy', score: 76 },
  { name: 'Jack', score: 88 },
];

var groupByGrade = R.groupBy((student) =&gt; {

  let score = student.score;

  return score &lt; 65 ? 'F' :
         score &lt; 70 ? 'D' :
         score &lt; 80 ? 'C' :
         score &lt; 90 ? 'B' : 'A';
});

let grouped = groupByGrade(students);

console.log('Student(s) having A grade:');
console.log(grouped['A']);

console.log('Student(s) having B grade:');
console.log(grouped['B']);

console.log('Student(s) having C grade:');
console.log(grouped['D']);

console.log('Student(s) having D grade:');
console.log(grouped['D']);

console.log('Student(s) having F grade:');
console.log(grouped['F']);

In the example, we group students by their score into grade sublists.

$ node grouping.js
Student(s) having A grade:
[ { name: 'Roman', score: 93 } ]
Student(s) having B grade:
[ { name: 'Adam', score: 84 }, { name: 'Jack', score: 88 } ]
Student(s) having C grade:
[ { name: 'Peter', score: 69 } ]
Student(s) having D grade:
[ { name: 'Peter', score: 69 } ]
Student(s) having F grade:
[ { name: 'Eddy', score: 58 }, { name: 'Jane', score: 56 } ]

## Ramda reduce function

The reduce function aggregates list values into a single value. It
applies a function against an accumulator and each element in the list (from
left to right) to reduce it to a single value.

reducefun.js
  

import * as R from 'ramda';

let nums = [2, 3, 4, 5, 6, 7];

let sum = R.reduce((x, y) =&gt; x+y, 0, nums);
console.log(sum);

let product = R.reduce((x, y) =&gt; x*y, 1, nums);
console.log(product);

The example uses the reduce function to calculate a
sum and product of a list of integers.

let sum = R.reduce((x, y) =&gt; x+y, 0, nums);

In this line, we calculate a sum of values. The first parameter is the function
that is applied on the values. The second is the accumulator, which is the
starting value. The third is the list containing values.

let product = R.reduce((x, y) =&gt; x*y, 1, nums);

Here we calculate the product of the list values.

$ node reducefun.js
27
5040

The following example calculates the expression: 1*2 + 3*4 + 5*6.

reduce_fun2.js
  

import * as R from 'ramda';

let nums = [1, 2, 3, 4, 5, 6];

let ret = R.reduce((acc, x) =&gt; acc + x[0] * x[1], 0, R.splitEvery(2, nums));
console.log(ret);

In the example, we split the list into pairs and apply a reduce operation on
those pairs.

$ node reduce_fun2.js
44

## Ramda where function

The where function allows to create complex queries on objects.

wherefun.js
  

import * as R from 'ramda';
const moment = require('moment');

const users = [
  { name: 'John', city: 'London', born: '2001-04-01' },
  { name: 'Lenny', city: 'New York', born: '1997-12-11' },
  { name: 'Andrew', city: 'Boston', born: '1987-02-22' },
  { name: 'Peter', city: 'Prague', born: '1936-03-24' },
  { name: 'Anna', city: 'Bratislava', born: '1973-11-18' },
  { name: 'Albert', city: 'Bratislava', born: '1940-12-11' },
  { name: 'Adam', city: 'Trnava', born: '1983-12-01' },
  { name: 'Robert', city: 'Bratislava', born: '1935-05-15' },
  { name: 'Robert', city: 'Prague', born: '1998-03-14' }
];

let res1 = R.filter(R.where({ city: R.equals('Bratislava') }))(users);
console.log(res1);

let res2 = R.filter(R.where({
  city: R.equals('Bratislava'),
  name: R.startsWith('A')
}))(users);

console.log(res2);

let res3 = R.filter(R.where({
  born: (dt) =&gt; getAge(dt) &gt; 40}))(users);

console.log(res3);

function getAge(dt) {

    return moment.duration(moment() - moment(dt, 'YYYY-MM-DD', true)).years();
}

In the example, we create queries with where on a list
of users.

let res1 = R.filter(R.where({ city: R.equals('Bratislava') }))(users);

Here we find out all users living in Bratislava.

let res2 = R.filter(R.where({
  city: R.equals('Bratislava'),
  name: R.startsWith('A')
}))(users);

In this code we find out users that live in Bratislava and their name
starts with 'A'.

let res3 = R.filter(R.where({
  born: (dt) =&gt; getAge(dt) &gt; 40}))(users);

Finally, we find out users that are older than 40.

function getAge(dt) {

    return moment.duration(moment() - moment(dt, 'YYYY-MM-DD', true)).years();
}

To compute the age from the supplied date of birth, we use the moment
module.

$ node where_fun.js
[ { name: 'Anna', city: 'Bratislava', born: '1973-11-18' },
  { name: 'Albert', city: 'Bratislava', born: '1940-12-11' },
  { name: 'Robert', city: 'Bratislava', born: '1935-05-15' } ]
[ { name: 'Anna', city: 'Bratislava', born: '1973-11-18' },
  { name: 'Albert', city: 'Bratislava', born: '1940-12-11' } ]
[ { name: 'Peter', city: 'Prague', born: '1936-03-24' },
  { name: 'Anna', city: 'Bratislava', born: '1973-11-18' },
  { name: 'Albert', city: 'Bratislava', born: '1940-12-11' },
  { name: 'Robert', city: 'Bratislava', born: '1935-05-15' } ]

## Source

[Ramda documentation](https://ramdajs.com/docs/)

In this article we have worked with the Ramda library.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)