+++
title = "JavaScript array loop"
date = 2025-08-29T20:01:06.775+01:00
draft = false
description = "Learn how to loop over arrays in JavaScript using forEach, for, and while loops, with examples and explanations."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript array loop

last modified last modified October 18, 2023

 

In this articlw we show how to loop over arrays in JavaScript. We can loop over
elements with forEach method and for and while statements. 

An array is a collection of a number of values. The array items are called
elements of the array. 

The following ways can be used to iterate over elements of an array in
JavaScript:

  - forEach method - goes over array elements

  - for in - iterates over array indexes

  - for of - iterates over array values

  - classic for - uses counter to traverse arrays

  - classic while loop - uses counter to traverse arrays

## JavaScript array loop with forEach

The forEach method executes the provided function once for each
array element.

foreach.js
  

const words = ['pen', 'pencil', 'falcon', 'rock', 'sky', 'earth'];

words.forEach(e =&gt; console.log(e));

console.log('-------------------------');

words.forEach((e, idx) =&gt; console.log(`${e} has index ${idx}`));

We have an array of words. With the forEach method, we go throug 
the elements of the array and print them to the console.

words.forEach(e =&gt; console.log(e));

We loop over elements of the array.

words.forEach((e, idx) =&gt; console.log(`${e} has index ${idx}`));

In this form, we have an element and its index at disposal.

$ node foreach.js 
pen
pencil
falcon
rock
sky
earth
-------------------------
pen has index 0
pencil has index 1
falcon has index 2
rock has index 3
sky has index 4
earth has index 5

In the following example, we work with numbers.

foreach2.js
  

let vals = [1, 2, 3, 4, 5];

vals.forEach(e =&gt; console.log(e * e))
console.dir(vals);

console.log('----------------');

let vals2 = vals.map(e =&gt; e * e);
vals2.forEach(e =&gt; console.log(e));
console.dir(vals2);

We apply a numeric operation on the array values.

let vals = [1, 2, 3, 4, 5];

We have an array of values.

vals.forEach(e =&gt; console.log(e * e))

We traverse the array and power all its elements.

console.dir(vals);

The contents of the array are shown with console.dir.

let vals2 = vals.map(e =&gt; e * e);

With the map function, we create a new array based on the function
that we pass as a parameter.

vals2.forEach(e =&gt; console.log(e));

We go throug the array of the newly created array.

$ node foreach2.js 
1
4
9
16
25
[ 1, 2, 3, 4, 5 ]
----------------
1
4
9
16
25
[ 1, 4, 9, 16, 25 ]

## JavaScript array loop with for in

The for in construct is used to iterate over array indexes.

for_in.js
  

let words = ['pen', 'pencil', 'falcon', 'rock', 'sky', 'earth'];

for (let idx in words) {

    console.log(`${words[idx]} has index ${idx}`);
}

The example iterates over indexes of the array of words. It prints words along
with their indexes.

$ node for_in.js 
pen has index 0
pencil has index 1
falcon has index 2
rock has index 3
sky has index 4
earth has index 5

## JavaScript array loop with for of

With the for of construct, we iterate over elements of the array.

for_of.js
  

let words = ['pen', 'pencil', 'falcon', 'rock', 'sky', 'earth'];

for (let word of words) {

    console.log(word);
}

The example prints all the words of the words array.

## JavaScript array loop with classic for statement

JavaScript supports the classic C-style for statement. It uses an auxiliary
counter variable to traverse the array. 

A for loop has three phases: initialization, condition and code block execution,
and incrementation. 

classic_for.js
  

let words = ['pen', 'pencil', 'falcon', 'rock', 'sky', 'earth'];

for (let i=0; i&lt;words.length; i++) {

    console.log(words[i]);
}

The example loops over the array of words with the classic for loop.

for (let i=0; i&lt;words.length; i++) {

The i variable is the auxiliary counter value. We determine the
size of the array with the length property. 

In the first phase, we initiate the counter i to zero. This phase
is done only once. Next comes the condition. If the condition is met, the
statement inside the for block is executed. In the third phase the counter is
increased. Now we repeat the 2, 3 phases until the condition is not met and the
for loop is left. In our case, when the counter is equal to the size of the
array, the for loop stops executing. 

## JavaScript array loop with while statement

The while statement is a control flow statement that allows code to be executed
repeatedly based on a given boolean condition. The while keyword executes the
statements inside the block enclosed by the curly brackets. The statements are
executed each time the expression is evaluated to true. 

while_loop.js
  

let words = ['pen', 'pencil', 'falcon', 'rock', 'sky', 'earth'];

let i = 0;

while (i &lt; words.length) {

    console.log(words[i]);
    i++;
}

The while loop is similar to the for loop; We have the counter variable and
there are three phases of the while loop.

## Source

[JS Array documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

In the article we have covered several ways of looping arrays in JavaScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)