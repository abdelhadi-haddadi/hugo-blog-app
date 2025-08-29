+++
title = "JavaScript arrays"
date = 2025-08-29T20:01:06.752+01:00
draft = false
description = "Understand how to work with arrays in JavaScript, including creation, manipulation, and iteration, with examples and explanations."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript arrays

last modified last modified October 18, 2023

 

In this article we show how to work with arrays in JavaScript.

An array is a collection of a number of values. The array items
are called elements of the array. Each element can be referred to by
an index. Arrays are zero based.

## JavaScript array initialization

In the first example, we show how we can initialize arrays in JavaScript.

array_init.js
  

"use strict";

const nums = [1, 2, 3, 4, 5];

console.log(nums);

The example creates a simple array in JavaScript.

const nums = [1, 2, 3, 4, 5];

An array is created using square brackets. The elements are separated
by a comma character.

$ nodejs array_init.js
[ 1, 2, 3, 4, 5 ]

## JavaScript array indexing

The next example shows the array indexing operations in JavaScript.

array_index.js
  

"use strict";

const nums = [1, 2, 3, 4, 5, 1];

const e1 = nums[0];
console.log(e1);

nums[2] = 22;
console.log(nums[2]);

console.log(nums.indexOf(1));
console.log(nums.lastIndexOf(1));

We use the indexing operations to get and modify array values and
get the index of an element.

const e1 = nums[0];

We get the first element of the array. The indexing starts from zero.

nums[2] = 22;

We modify the third value of the array.

console.log(nums.indexOf(1));

With indexOf we get the first occurrence of element 1.

console.log(nums.lastIndexOf(1));

With lastIndexOf we get the last occurrence of element 1.

$ nodejs array_index.js
1
22
0
5

## JavaScript array basic operations

The following example presents some basic operations with JavaScript
arrays.

basic_oper.js
  

"use strict";

const words = [];
words.push("pen");
words.push("pencil", "knife", "chair");

console.log(words);

const el1 = words.shift();
console.log(el1);
console.log(words);

const el2 = words.pop();
console.log(el2);
console.log(words);

In the example, we present push, shift, and
pop methods of JavaScript arrays.

const words = [];
words.push("pen");
words.push("pencil", "knife", "chair");

An empty array is created. With the push method, we
add one or more elements at the end of the array.

const el1 = words.shift();

The shift method removes the first element from an
array and returns the removed element. It changes the length
of the array.

const el2 = words.pop();

The pop method removes the last element from an array and
returns the element. This method also changes the length of the array.

$ nodejs basic_oper.js
[ 'pen', 'pencil', 'knife', 'chair' ]
pen
[ 'pencil', 'knife', 'chair' ]
chair
[ 'pencil', 'knife' ]

## JavaScript looping arrays

In the next example, we loop over JavaScript arrays.

array_loop.js
  

"use strict";

const words = ["pen", "pencil", "rock", "sky", "earth"];

words.forEach(e =&gt; console.log(e));

for (let word of words) {

    console.log(word);
}

for (let idx in words) {

    console.log(words[idx]);
}

const len = words.length;

for (let i = 0; i &lt; len; i++) {

    console.log(words[i]);
}

const i = 0;

while (i &lt; len) {

    console.log(words[i]);
    i++;
}

The example shows four ways of looping over a JavaScript array.

words.forEach(e =&gt; console.log(e));

We use the forEach method to traverse the array.
It executes the provided function once for each array element.

for (let word of words) {

    console.log(word);
}

With for of loop, we go over the values of the array.

for (let idx in words) {

    console.log(words[idx]);
}

With for in loop, we go over the indexes of the array.

var len = words.length;

for (let i = 0; i &lt; len; i++) {

    console.log(words[i]);
}

Here we use the C-like for loop to traverse the array.

var i = 0;

while (i &lt; len) {

    console.log(words[i]);
    i++;
}

Finally, we use the while loop to traverse the array.

## JavaScript array slice

The slice method returns a shallow copy of an array portion.
The method takes one or two parameters, which specify the indexes of the selection.
The original array is not modified.

array_slice.js
  

"use strict";

const nums = [2, -3, 4, 6, -1, 9, -7];

const res = nums.slice(3);
console.log(res);

const res2 = nums.slice(2, 4);
console.log(res2);

In the example, we create two slices.

const res = nums.slice(3);

We create a slice from index 3 until the end of the array.

const res2 = nums.slice(2, 4);

We create a slice from index 2, to index 4; the ending index
is non-inclusive.

$ nodejs array_slice.js
[ 6, -1, 9, -7 ]
[ 4, 6 ]

## Sorting arrays in JavaScript

The sort method sorts the elements of an array in place
and returns the array.  The default sort order is according to string
Unicode code points. The sort method takes an optional
function which defines the sorting order.

array_sort.js
  

"use strict";

const nums = [2, 3, 1, 6, 5, 8, 9, 0];

nums.sort();
console.log(nums);

nums.reverse();
console.log(nums);

const persons = [
    {name: 'Peter', age: 21},
    {name: 'Robert', age: 37},
    {name: 'Martin', age: 45},
    {name: 'Jane', age: 31}
];

persons.sort((a, b) =&gt; a.age - b.age);
console.log(persons);

persons.sort((a, b) =&gt; {

    const nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();

    if (nameA &lt; nameB) {
        return -1;
    } else if (nameA &gt; nameB) {
        return 1;
    } else {
        return 0;
    }
});

console.log(persons);

The example sorts an array of integers and an array of objects.

nums.sort();

The sort method sorts the array of integers in ascending order.

nums.reverse();

The reverse method sorts the array of integers in
descending order.

persons.sort((a, b) =&gt; a.age - b.age);

We sort an array of person objects by the age attribute.

persons.sort((a, b) =&gt; {

    const nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();

    if (nameA &lt; nameB) {
        return -1;
    } else if (nameA &gt; nameB) {
        return 1;
    } else {
        return 0;
    }
});

We sort an array of person objects by the name attribute.

$ nodejs array_sort.js
[ 0, 1, 2, 3, 5, 6, 8, 9 ]
[ 9, 8, 6, 5, 3, 2, 1, 0 ]
[ { name: 'Peter', age: 21 },
  { name: 'Jane', age: 31 },
  { name: 'Robert', age: 37 },
  { name: 'Martin', age: 45 } ]
[ { name: 'Jane', age: 31 },
  { name: 'Martin', age: 45 },
  { name: 'Peter', age: 21 },
  { name: 'Robert', age: 37 } ]

## JavaScript multi-dimensional arrays

In JavaScript, we can create multi-dimensional arrays.

multi_dim.js
  

"use strict";

const nums = [2, 3, 2, [33, 44, 55], [7, 8, [77, 88]]];

console.log(nums[2]);

console.log(nums[3]);
console.log(nums[3][0]);

console.log(nums[4][0]);
console.log(nums[4][2][0]);

A multi-dimensional array is created by nesting arrays into other arrays.

const nums = [2, 3, 2, [33, 44, 55], [7, 8, [77, 88]]];

We have a multi-dimenstional array defined.

console.log(nums[2]);

To get an element from the first dimension, we use a single pair of square
brackets.

console.log(nums[3]);

This line prints the entire inner array.

console.log(nums[3][0]);

To get an element from an inner array, we use two pairs of brackets.

console.log(nums[4][2][0]);

Here we get a value from the third dimension.

$ nodejs multi_dim.js
2
[ 33, 44, 55 ]
33
7
77

## JavaScript filtering arrays

The filter method creates a new array with all elements that pass
the test implemented by the given function.

filter_array.js
  

"use strict"

const nums = [2, -3, 4, 6, -1, 9, -7];

const res = nums.filter(e =&gt; e &gt; 0);

console.log(res);

The example creates a new array that contains only positive values.

const res = nums.filter(e =&gt; e &gt; 0);

The filter method takes a predicate method as a parameter.
The predicate returns true to keep the element, false otherwise.

$ nodejs filter_array.js
[ 2, 4, 6, 9 ]

## JavaScript array map

The map method creates a new array by applying a provided function
on every element in the calling array.

array_map.js
  

"use strict";

const a1 = ['dog', 'tree', 'smart'];

const a2 = a1.map(e =&gt; e.toUpperCase());
console.log(a2);

We have an array of words. With the map method,
we apply the toUpperCase method on each of the words.

$ nodejs array_map.js
[ 'DOG', 'TREE', 'SMART' ]

## JavaScript array find

The find method returns the value of the first element
that satisfies the provided function; otherwise undefined
is returned.

array_find.js
  

"use strict";

const nums = [2, -3, 4, 6, 1, 23, 9, 7];

const e1 = nums.find(e =&gt; e &gt; 10);
console.log(e1);

In the example, we print the first value that is greater than 10.

$ nodejs array_find.js
23

## JavaScript array reduction

Reduction is a terminal operation that aggregates array values into a
single value. The reduce method applies a function against an
accumulator and each element in the array (from left to right) to reduce it to a
single value.

array_reduce.js
  

"use strict";

const nums = [2, 3, 4, 5, 6, 7];

const res = nums.reduce((product, next) =&gt; product * next);

console.log(res);

We use the reduce method to calculate a product from
array elements.

const res = nums.reduce((product, next) =&gt; product * next);

The product is the accumulator, the next is the next
value in the array.

$ nodejs array_reduce.js
5040

## Source

[JS Array documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

In this article we have covered JavaScript arrays.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)