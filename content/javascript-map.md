+++
title = "JavaScript Map"
date = 2025-08-29T20:01:28.360+01:00
draft = false
description = "Learn how to use the Map collection in JavaScript for managing key/value pairs, with examples and explanations."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript Map

last modified last modified October 18, 2023

 

In this article we show how to work with a Map collection in JavaScript. 

## Map

A Map is a container which stores key/value pairs. It remembers the
original insertion order of the keys. Any value may be used as either a key or a
value.

We can use the for/of form and the forEach method to
iterate over a Map.

## JS Map methods

The following methods are used to work with a map:

    - new Map() - creates a new map

    - set(key, value) - sets the value for the key

    - get(key) - returns the value by the key

    - has(key) - checks if key exists

    - delete(key) - removes the value by the key

    - clear() - deletes the whole map

Also, the size property returns the size of the map.

## JS Map simple example

The following is a simple example using Map.

simple.js
  

let stones = new Map();

stones.set(0, "citrine");
stones.set(1, "garnet");
stones.set(2, "topaz");
stones.set(3, "opal");
stones.set(4, "amethyst");

console.log(stones);

console.log(stones.get(0));
console.log(stones.get(3));
console.log(stones.get(9));

We have a map of stones. The keys are integers and the values are strings.

let stones = new Map();

An empty map is created.

stones.set(0, "citrine");

A new key/value pair is inserted with set.

console.log(stones.get(0));

We get the value which has key equal to 0.

$ node simple.js 
Map {
    0 =&gt; 'citrine',
    1 =&gt; 'garnet',
    2 =&gt; 'topaz',
    3 =&gt; 'opal',
    4 =&gt; 'amethyst'
}
citrine
opal
undefined

If the value is not present, the get method returns
undefined.

## JS initiating Map

There are several ways to initiate an Map.

initiate.js
  

let stones = new Map();

stones.set(0, "citrine");
stones.set(1, "garnet");
stones.set(2, "topaz");

let stones2 = new Map(stones);

console.log(stones);
console.log(stones2);

let items = new Map([["coin", 3], ["pen", 4], ["cup", 3]]);
console.log(items);

The example creates a new map from an empty map, from an existing map, and from
an array.

$ node initiate.js 
Map { 0 =&gt; 'citrine', 1 =&gt; 'garnet', 2 =&gt; 'topaz' }
Map { 0 =&gt; 'citrine', 1 =&gt; 'garnet', 2 =&gt; 'topaz' }
Map { 'coin' =&gt; 3, 'pen' =&gt; 4, 'cup' =&gt; 3 }

## JS Map size

The size of the Map is determined with the size property.

map_size.js
  

let stones = new Map();

console.log(`The size is ${stones.size}`);

stones.set(0, "citrine");
stones.set(1, "garnet");
stones.set(2, "topaz");

console.log(`The size is ${stones.size}`);

stones.set(3, "opal");
stones.set(4, "amethyst");

console.log(`The size is ${stones.size}`);

stones.clear();

console.log(`The size is ${stones.size}`);

We initiate a new empty map, add new pairs and determine the current size 
with the size property.

$ node map_size.js 
The size is 0
The size is 3
The size is 5
The size is 0

## JS Map loop

We can easily loop over the key, values, and key/value pairs with
for/of form.

looping.js
  

let stones = new Map();

stones.set(0, "citrine");
stones.set(1, "garnet");
stones.set(2, "topaz");
stones.set(3, "opal");
stones.set(4, "amethyst");

for (const entry of stones)) {
  console.log(entry);
}

console.log('-------------------------------');

for (const [k, v] of stones.entries()) {
  console.log(`${k}: ${v}`);
}

console.log('-------------------------------');

for (const val of stones.values()) {
  console.log(val);
}

console.log('-------------------------------');

for (const key of stones.keys()) {
  console.log(key);
}

We define a new map and loop over it in various ways.

$ node looping.js 
[ 0, 'citrine' ]
[ 1, 'garnet' ]
[ 2, 'topaz' ]
[ 3, 'opal' ]
[ 4, 'amethyst' ]
-------------------------------
0: citrine
1: garnet
2: topaz
3: opal
4: amethyst
-------------------------------
citrine
garnet
topaz
opal
amethyst
-------------------------------
0
1
2
3
4

Another way to loop over a map is to use the forEach method.

looping2.js
  

let stones = new Map();

stones.set(0, "citrine");
stones.set(1, "garnet");
stones.set(2, "topaz");
stones.set(3, "opal");
stones.set(4, "amethyst");

stones.forEach((v, k) =&gt; {
    console.log(`${k} has value ${v}`);
});

We loop over a map of stones with forEach.

$node looping2.js 
0 has value citrine
1 has value garnet
2 has value topaz
3 has value opal
4 has value amethyst

## JS Map transform into array

The Array.from method creates an array from an iterable object.

array_from.js
  

let stones = new Map();

stones.set(0, "citrine");
stones.set(1, "garnet");
stones.set(2, "topaz");
stones.set(3, "opal");
stones.set(4, "amethyst");

let stones2d = Array.from(stones);
let keys = Array.from(stones.keys());
let values = Array.from(stones.values());

console.log(stones2d);
console.log([...stones]);

console.log('--------------------');

console.log(keys);
console.log(values);

In the example, we turn the map into arrays.

let stones2d = Array.from(stones);

We create a 2D array from the stones map. Each subarray is a pair 
from the map.

let keys = Array.from(stones.keys());

We create an array of map keys.

let values = Array.from(stones.values());

We create an array of map values.

console.log([...stones]);

Another way to create a 2D array is to use the spread operator.

$ node array_from.js 
[
    [ 0, 'citrine' ],
    [ 1, 'garnet' ],
    [ 2, 'topaz' ],
    [ 3, 'opal' ],
    [ 4, 'amethyst' ]
]
[
    [ 0, 'citrine' ],
    [ 1, 'garnet' ],
    [ 2, 'topaz' ],
    [ 3, 'opal' ],
    [ 4, 'amethyst' ]
]
--------------------
[ 0, 1, 2, 3, 4 ]
[ 'citrine', 'garnet', 'topaz', 'opal', 'amethyst' ]

## JS Map combine

In the following example, we combine two maps. The maps are combined with the 
spread ... operator.

combining.js
  

const assert = require('assert');

let stones1 = new Map();

stones1.set(0, "citrine");
stones1.set(1, "garnet");
stones1.set(2, "topaz");

let stones2 = new Map();
stones2.set(3, "opal");
stones2.set(4, "amethyst");

let stones = new Map([...stones1, ...stones2])

console.log(stones);

assert.deepStrictEqual(
  [...stones],
  [ [ 0, 'citrine' ],
    [ 1, 'garnet' ],
    [ 2, 'topaz' ],
    [ 3, 'opal' ],
    [ 4, 'amethyst' ] ]
);

We combine two maps and verify that the actual and expected values are equal.
The assert.deepStrictEqual throws an exception it the values
differ.

$ node combining.js 
Map {
    0 =&gt; 'citrine',
    1 =&gt; 'garnet',
    2 =&gt; 'topaz',
    3 =&gt; 'opal',
    4 =&gt; 'amethyst'
}

## Source

[Map - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)

In this article we have worked with the maps in JavaScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)