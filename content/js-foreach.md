+++
title = "JS foreach"
date = 2025-08-29T20:01:19.061+01:00
draft = false
description = "JS foreach tutorial shows how to use foreach loop in JavaScript."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JS foreach

last modified last modified October 18, 2023

 

In this article we show how to create foreach loops in JavaScript. 

C language popularized the classic for loop, where a counter is used to create a
loop. 

The foreach loop iterates over a collection of data one by one. In each loop, 
a temporary variable contains the current element.

JavaScript has forEach method and the for/of form to
loop over iterables.

## JS forEach method

In the first example, we use the forEach method to go over the 
elements of an array.

foreach.js
  

let words = ['pen', 'pencil', 'falcon', 'rock', 'sky', 'earth'];

words.forEach(e =&gt; console.log(e));

console.log("----------------------");

words.forEach((word, idx) =&gt; {
    console.log(`${word} has index ${idx}`);
});

The example loops over elements of an array of words.

words.forEach(e =&gt; console.log(e));

In the first loop, we print all elements.

words.forEach((word, idx) =&gt; {
    console.log(`${word} has index ${idx}`);
});

In the second loop, we print element with its index.

$ node foreach.js
pen
pencil
falcon
rock
sky
earth
----------------------
pen has index 0
pencil has index 1
falcon has index 2
rock has index 3
sky has index 4
earth has index 5

In the next example we use the forEach method to loop over a map.

foreach2.js
  

let stones = new Map([[1, "garnet"], [2, "topaz"],
    [3, "opal"], [4, "amethyst"]]);

stones.forEach((k, v) =&gt; {

    console.log(`${k}: ${v}`);
});

We have a small map of stones. In each loop, the pair is destructured into 
a key and a value.

$ node foreach2.js
garnet: 1
topaz: 2
opal: 3
amethyst: 4

## JS for/of

The for/of statement iterates over a sequence of values from an iterable
object. 

for_of.js
  

let words = ['pen', 'pencil', 'falcon', 'rock', 'sky', 'earth'];

for (let word of words) {

    console.log(word);
}

In the example, we go over the array of words using for/of statement.

In the next example we go over a map.

for_of2.js
  

let stones = new Map([[1, "garnet"], [2, "topaz"],
    [3, "opal"], [4, "amethyst"]]);
  
for (let e of stones) {

    console.log(e);
}

console.log('------------------------');

for (let [k, v] of stones) {

    console.log(`${k}: ${v}`);
}

We have two for/of loops.

for (let e of stones) {

    console.log(e);
}

In the first loop, we go over elements.

for (let [k, v] of stones) {

    console.log(`${k}: ${v}`);
}

In the second loop, we destructure each element into key and value items.

$ node for_of2.js
[ 1, 'garnet' ]
[ 2, 'topaz' ]
[ 3, 'opal' ]
[ 4, 'amethyst' ]
------------------------
1: garnet
2: topaz
3: opal
4: amethyst

## Source

[JS forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)

In this article we have used foreach loops to go over elements of iterables in
JavaScript. We have utilized the forEach method and the
for/of statement.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)