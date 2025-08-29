+++
title = "JavaScript copyWithin method"
date = 2025-08-29T20:02:02.581+01:00
draft = false
description = "JavaScript copyWithin tutorial shows how to copy array elements in JavaScript. The tutorial provides numerous examples to demonstrate element copying in JS arrays."
image = ""
imageBig = ""
categories = ["js-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript copyWithin method

last modified April 4, 2025

 

In this article we show how to copy array elements using the copyWithin
method in JavaScript.

## Array element copying

The copyWithin method copies a sequence of array elements within
the same array. It modifies the original array and returns the modified array.
This method does not change the array's length.

The method takes up to three parameters: target position, start index, and
optional end index. The elements are copied from the start index up to but
not including the end index. If omitted, the end index defaults to the array's
length.

This method is useful for efficiently moving elements within an array without
creating new arrays. It performs the operation in place, making it memory
efficient for large arrays. Negative indices count from the end of the array.

## Basic copyWithin example

The following example demonstrates the basic usage of the copyWithin
method.

main.js
  

const arr = [1, 2, 3, 4, 5];
arr.copyWithin(0, 3);

console.log(arr);

We copy elements starting from index 3 to the beginning of the array. The
original elements at positions 0 and 1 are overwritten. The array length
remains unchanged.

$ node main.js
[ 4, 5, 3, 4, 5 ]

## Copying with start and end indices

The copyWithin method can specify both start and end indices for copying.

main.js
  

const letters = ['a', 'b', 'c', 'd', 'e'];
letters.copyWithin(1, 2, 4);

console.log(letters);

We copy elements from index 2 to 4 (excluding 4) to position 1. Only elements
'c' and 'd' are copied. The original elements at positions 1 and 2 are
overwritten.

$ node main.js
[ 'a', 'c', 'd', 'd', 'e' ]

## Using negative indices

The copyWithin() method accepts negative indices that count from the array's end.

main.js
  

const nums = [1, 2, 3, 4, 5];
nums.copyWithin(-2, -4, -1);

console.log(nums);

Negative indices count backward from the array's end. Here, we copy elements
from index -4 (1) to -1 (4) to position -2 (3). The original elements at
positions 3 and 4 are overwritten.

$ node main.js
[ 1, 2, 3, 2, 3 ]

## Copying within a portion of the array

The copyWithin method can target a specific portion of the array.

main.js
  

const colors = ['red', 'green', 'blue', 'yellow', 'purple'];
colors.copyWithin(2, 0, 2);

console.log(colors);

We copy the first two elements ('red', 'green') to position 2. The original
elements at positions 2 and 3 are overwritten. The array length remains
unchanged.

$ node main.js
[ 'red', 'green', 'red', 'green', 'purple' ]

## Copying overlapping ranges

The copyWithin method handles overlapping ranges correctly.

main.js
  

const data = [1, 2, 3, 4, 5];
data.copyWithin(1, 0, 3);

console.log(data);

When source and target ranges overlap, the method copies elements as if first
copied to a temporary array. Here, elements 1, 2, 3 are copied to position 1.
The original elements at positions 1, 2, and 3 are overwritten.

$ node main.js
[ 1, 1, 2, 3, 5 ]

## Source

[Array copyWithin - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin)

In this article we have demonstrated how to use the copyWithin() method to
copy array elements in JavaScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Array Functions.](/javascript/#js-array)