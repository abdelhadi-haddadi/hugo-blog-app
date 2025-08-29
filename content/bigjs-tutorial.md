+++
title = "Big.js tutorial"
date = 2025-08-29T20:01:09.008+01:00
draft = false
description = "Explore how to perform arbitrary precision arithmetic in JavaScript using the Big.js library, with examples and explanations."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Big.js tutorial

last modified last modified October 18, 2023

 

In this article we show to work with arbitrary precision big decimal arithmetic
in JavaScript with Big.js module.

## Big.js

Big.js is a small, fast JavaScript library for arbitrary-precision
decimal arithmetic.

In this article we work with Big.js in a Node application.

## Setting up Big.js

First, we install Big.js.

$ node -v
v18.2.0

We use Node version 18.2.0.

$ npm init -y

We initiate a new Node application.

$ npm i big.js

We install Big.js with npm i big.js command.

## JavaScript Number precision error

In the first example, we show that JavaScript Numbers are not precise for doing
arbitrary precision arithmetic.

count_currency.js
  

var sum = 0;
// two euros fifty-five cents
var amount = 2.55;

for (let i = 0; i &lt; 100000; i++) {

    sum += amount;
}

console.log(sum);

In the example, we add two euros fifty-five cents one hundred thousand times. 

$ nodejs numbers.js 
254999.9999995398

We have an error in the calculation.

## Big.js example

In the next example we correct the error with Big.js. 

main.js
  

import Big from 'big.js';

let val = new Big(0.0);
let amount = new Big(2.55);

let sum = val.plus(amount).times(100000);

console.log(sum.toFixed(2));

With Big.js library, the calculation is precise. 

import Big from 'big.js';

We import Big from the big.js module.

let val = new Big(0.0);
let amount = new Big(2.55);

We create two big decimal values.

let sum = val.plus(amount).times(100000);

We add the value 100000 times. Note that the big decimal values are immutable,
so we generate a new variable.

$ node main.js 
255000.00

## Big.js pow

The pow provides a high-precision power operation.

main.js
  

import Big from 'big.js';

let val = new Big(0.9);

let res = val.pow(3);
console.log(res);

console.log(0.9 ** 3);

The example raises the 0.9 to the power of 3 using Big.js and vanilla JS.

$ node main.js
0.729
0.7290000000000001

## Source

[Big.js documentation](https://mikemcl.github.io/big.js/)

In this article we have worked with arbitrary precision arithmetic in
JavaScript with the Big.js library.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)