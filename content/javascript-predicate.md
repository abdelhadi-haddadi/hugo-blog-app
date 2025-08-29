+++
title = "JavaScript predicate"
date = 2025-08-29T20:01:33.321+01:00
draft = false
description = "Explore how to use predicates in JavaScript for boolean evaluations, with examples and explanations."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript predicate

last modified last modified October 18, 2023

 

In this article we show how to use predicates in JavaScript. 

A predicate in general meaning is a statement about something that is
either true or false. In programming, predicates represent single argument
functions that return a boolean value. 

## JS predicate with find

The find function takes a predicate to determine the first element 
that satisfies it.

main.js
  

function isPositive(e) {
    return e &gt; 0;
}

let vals = [-2, -3, 0, 4, 3, -1, 1, 7];

let res = vals.find(isPositive);
console.log(res);

let res2 = vals.find(e =&gt; e &gt; 0);
console.log(res2);

In the example, we find the first positive value in the array.

function isPositive(e) {
    return e &gt; 0;
}

The first predicate is a classic function definition.

let res2 = vals.find(e =&gt; e &gt; 0);

The second predicate is an annonymous arrow function.

$ node main.js 
4
4

## JS predicate with filter

The filter function creates a new array filled with elements that 
satisfy the provided predicate.

main.js
  

let vals = [-2, -3, 0, 4, 3, -1, 1, 7];

let pos = vals.filter(e =&gt; e &gt; 0);
console.log(pos);

let neg = vals.filter(e =&gt; e &lt; 0);
console.log(neg);

let evs = vals.filter(e =&gt; e % 2 === 0);
console.log(evs);

In the example, we filter out positive values, negative values, and even values.

$ node main.js 
[ 4, 3, 1, 7 ]
[ -2, -3, -1 ]
[ -2, 0, 4 ]

## JS predicate with every/some

The every function determines whether all the members of an array
satisfy the specified predicate. The some function determines
whether any element of the array satisfies the predicate.

main.js
  

let vals = [-2, -3, 0, 4, 3, -1, 1, 7];

if (vals.every(e =&gt; e &gt; 0)) {
    console.log('all values are positive');
} else {
    console.log('not all values are positive');
}

if (vals.some(e =&gt; e &gt; 0)) {
    console.log('at least one value is positive');
} else {
    console.log('no value is positive');
}

In the example we check, if all values of the array are positive and if at least 
one value is positive. 

$ node main.js 
not all values are positive
at least one value is positive

## JS negating predicates

In the next example, we define a negate function which negates 
the given predicate. 

main.js
  

function negate(other) {
    return e =&gt; { return !other(e) };
};

let vals = [-2, -3, 0, 4, 3, -1, 1, 7];

let res = vals.filter(negate(e =&gt; e &gt; 0));
console.log(res);

let res2 = vals.filter(negate(negate(e =&gt; e &gt; 0)));
console.log(res2);

We use the negate function with filter.

function negate(other) {
    return e =&gt; { return !other(e) };
};

In the negate function, we use the ! operator, which 
computes logical negation of its operand.

let res = vals.filter(negate(e =&gt; e &gt; 0));

We negate the output of the arrow function, which returns positive values.

let res2 = vals.filter(negate(negate(e =&gt; e &gt; 0)));

We apply the negate funtion twice.

$ node main.js 
[ -2, -3, 0, -1 ]
[ 4, 3, 1, 7 ]

## Source

[JavaScript - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)

In this article we have worked with predicates in JavaScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)