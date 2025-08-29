+++
title = "JavaScript add strings"
date = 2025-08-29T20:01:05.606+01:00
draft = false
description = "Learn how to concatenate strings in JavaScript using various methods like + operator, concat, join, and string formatting."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript add strings

last modified last modified October 18, 2023

 

In this article we show how to concatenate strings in JavaScript.

In JavaScript, a string is an object used to represent and manipulate a sequence
of characters.

There are several ways of adding strings in JavaScript:

     - + operator

     - concat method

     - join method

     - formatting strings

## JavaScript add strings with + operator

The easiest way of concatenating strings is to use the + or the
+= operator. The + operator is used both for adding
numbers and strings; in programming we say that the operator is
*overloaded*.

add_string.js
  

let a = 'old';
let b = ' tree';

let c = a + b;
console.log(c);

In the example, we add two strings with the + opeartor.

$ node add_string.js
old tree

In the second example, we use the compound addition operator.

add_string2.js
  

let msg = 'There are';

msg += ' three falcons';
msg += ' in the sky';

console.log(msg);

The example builds a message with the += operator.

$ node add_string2.js
There are three falcons in the sky

## JavaScript add strings with join

The join method  creates and returns a new string by concatenating
all of the elements of an array. 

joining.js
  

let words = ['There', 'are', 'three', 'falcons', 'in', 'the', 'sky'];

let msg = words.join(' ');
console.log(msg);

The example forms a message by concatenating words of an array.

$ node joining.js 
There are three falcons in the sky

## JavaScript add strings with concat

The concat method concatenates the string arguments to the calling
string and returns a new string.

Because the concat method is less efficient than the +
operator, it is recommended to use the latter instead.

concat.js
  

let a = 'old';

let c = a.concat(' tree');
console.log(c);

The example concatenates two strings with the built-in concat
method.

## JavaScript add strings with string formatting

We can build JavaScript strings with string formatting, which is essentially
another form of string addition.

formatting.js
  

let w1 = 'two';
let w2 = 'eagles';

let msg = `There are ${w1} ${w2} in the sky`;
console.log(msg);

The example builds a message using template literals.

$ node formatting.js 
There are two eagles in the sky

## Source

[JS String documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

In this article we have presented several ways of concatenating strings in
JavaScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)