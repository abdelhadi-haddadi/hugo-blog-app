+++
title = "Collect.js tutorial"
date = 2025-08-29T20:01:12.351+01:00
draft = false
description = "Learn how to work with arrays and objects in JavaScript using the Collect.js library, with examples and explanations."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Collect.js tutorial

last modified last modified October 18, 2023

 

In this article we show how to work with arrays and objects in JavaScript
with Collect.js library.

## Collect.js

Collect.js is a fluent and convenient wrapper for working with
arrays and objects. It is a port of Laravel's Collections. It contains many
functions that makes working with data much easier.

Collect.js helps programmers write more concise and easier to maintain
JavaScript code.

## Collect.js installation

First, we install the Collect.js library.

$ npm init -y
$ npm i collect.js

The collect.js library is installed locally with npm.

## The collect function

We transform a JavaScript array with collect
into a collection and apply functions on the collection. In the end,
we get the underlying array back with all or toArray.

## Collect.js all vs toArray

The all and toArray functions return the underlying
array from the collection. The difference between the  two functions is that the
toArray function also transforms the nested collections into arrays if
present.

all_toarray.js
  

const collect = require('collect.js');

const nums1 = [1, 2, 3];
const nums2 = [4, 5, 6];

const data = collect([collect(nums1),
    collect(nums2)]);

console.log(data.all());
console.log(data.toArray());

The example shows the difference between the two functions.

$ node all_toarray.js
[ Collection { items: [ 1, 2, 3 ] },
    Collection { items: [ 4, 5, 6 ] } ]
[ [ 1, 2, 3 ], [ 4, 5, 6 ] ]

From the output we can see that in the second example the nested collections
were transformed into arrays.

## Collect.js count

The count function counts the number of elements in the collection.

count_elements.js
  

const collect = require('collect.js');

const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const data = collect(nums);

const nOfElements = data.count();

console.log(`There are ${nOfElements} elements`);

The example counts the number of values in the array.

$ node count_elements.js
Therea are 10 elements

## Collect.js unique

The unique function  returns all of the unique items
in the collection.

unique.js
  

const collect = require('collect.js');

const nums = [1, 1, 1, 2, 4, 4, 5];

const data = collect(nums);
const unique_data = data.unique();

console.log(unique_data.all());

The example prints the unique values of an array.

const unique_data = data.unique();

We get all the unique values from the collection with unique.

console.log(unique_data.all());

The all function returns the underlying array represented
by the collection.

$ node unique.js
[ 1, 2, 4, 5 ]

## Collect.js first

The first function returns the first element in the collection that passes the
given truth test or simply the first value.

first_fun.js
  

const collect = require('collect.js');

const nums = [1, 2, -3, 4, -5, 6, 7, 8];
const data = collect(nums);

let fval = data.first();
console.log(fval);

let fneg = data.first(e =&gt; e &lt; 0);
console.log(fneg);

The example prints the first value and the first negative value.

$ node first_fun.js
1
-3

## Collect.js firstWhere

The firstWhere function returns the first element in the collection
with the given key/value pair.

firstwhere_fun.js
  

const collect = require('collect.js');

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

const data = collect(users);

let fval = data.firstWhere('city', 'Bratislava');
console.log(fval);

The example prints the first user who lives in Bratislava.

$ node firstwhere_fun.js
{ name: 'Anna', city: 'Bratislava', born: '1973-11-18' }

## Collect.js avg

The avg function returns the average of all
items in the collection.

average.js
  

const collect = require('collect.js');

const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const data = collect(nums);

console.log(data.avg());

The program prints the average of the array of numbers.

## Collect.js min &amp; max

The min and max functions return the
minimum and maximum, respectively.

min_max.js
  

const collect = require('collect.js');

const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const data = collect(nums);

console.log(`Minimum: ${data.min()}`);
console.log(`Maximum: ${data.max()}`);

The program prints the mininum and maximum values of an array
of numbers.

$ node min_max.js
Minimum: 1
Maximum: 10

## Collect.js median

The median function returns the median. The median is
a middle value of a data set.

median_fun.js
  

const collect = require('collect.js');

const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const data = collect(nums);

console.log(data.median());

The example prints the median of an array of numbers.

$ node median.js
5.5

If there is no middle value then the average of the two values in the middle is
computed as in our case.

## Collect.js each

The each function iterates over the items in the collection and
passes each item to a callback.

each_fun.js
  

const collect = require('collect.js');

const nums = [1, 2, 3, 4, 5];
let sum = 0;

const data = collect(nums);

data.each((item) =&gt; {
    sum += item;
});

console.log(`The sum of values: ${sum}`);

We calculate the sum of values using the each function.

$ node each_fun.js
The sum of values: 15

## Collect.js eachSpread

The eachSpread function iterates over the collection's items,
passing each nested item value into the given callback.

eachspread_fun.js
  

const collect = require('collect.js');

const users = [
    ['John Doe', 'gardener'], ['Peter Smith', 'programmer'],
    ['Lucy Black', 'teacher']
];

const data = collect(users);

data.eachSpread((user, occupation) =&gt; {
    console.log(`${user} is a ${occupation}`);
});

The example uses the eachSpread function to iterate over nested
arrays.

$ node eachspread_fun.js
John Doe is a gardener
Peter Smith is a programmer
Lucy Black is a teacher

## Collect.js map

The map function applies the given callback function on each of
the elements, thus forming a new collection of modified items.

map_fun.js
  

const collect = require('collect.js');

const nums = [1, 2, 3, 4, 5];

const data = collect(nums);

const tr_data = data.map(e =&gt; e * 2);

console.log(tr_data.all());

In the example, we create a modified collection by multiplying each value by
two.

$ node  map_fun.js
[ 2, 4, 6, 8, 10 ]

## Collect.js mapInto

The mapInto function iterates through the collection and creates
objects from the elements.

mapinto_fun.js
  

const collect = require('collect.js');

const User = function (name, age) {
    this.name = name;
    this.age = age;
};

const users = [
    { name: 'John Doe', age: 34 },
    { name: 'Peter Smith', age: 43 },
    { name: 'Bruce Long', age: 40 },
    { name: 'Lucy White', age: 54 },
];

const data = collect(users);

const objects = data.mapInto(User);

console.log(objects.all());

In the example, we transform JSON object literals into JavaScript objects
with the help of the mapInto function.

$ node mapinto_fun.js
[ User { name: { name: 'John Doe', age: 34 }, age: 0 },
    User { name: { name: 'Peter Smith', age: 43 }, age: 1 },
    User { name: { name: 'Bruce Long', age: 40 }, age: 2 },
    User { name: { name: 'Lucy White', age: 54 }, age: 3 } ]

## Collect.js filter

The filter function filters the collection using the given callback
function, keeping only those items that pass a given truth test.

finter_fun.js
  

const collect = require('collect.js');

const nums = [-1, 2, -3, 4, -5, 6, 7, 8, -9, 0];
const data = collect(nums);

const filtered = data.filter((val, key) =&gt; val &gt; 0);

console.log(filtered.all());

The example filters out positive values.

$ node finter_fun.js
[ 2, 4, 6, 7, 8 ]

```
$ npm i moment

```

In the following example, we also need the moment.js library.

filter_fun2.js
  

const collect = require('collect.js');
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

const data = collect(users);

let res = data.filter((val, key) =&gt; getAge(val.born) &gt; 40);
console.log(res.all());

function getAge(dt) {

    return moment.duration(moment() - moment(dt, 'YYYY-MM-DD', true)).years();
}

The example filters out users that are older than fourty.

$ node filter_fun2.js
[ { name: 'Peter', city: 'Prague', born: '1936-03-24' },
    { name: 'Anna', city: 'Bratislava', born: '1973-11-18' },
    { name: 'Albert', city: 'Bratislava', born: '1940-12-11' },
    { name: 'Robert', city: 'Bratislava', born: '1935-05-15' } ]

Four people in the list are older than fourty.

## Collect.js shuffle

The shuffle function randomly reorganizes the items in the
collection.

shuffle.js
  

const collect = require('collect.js');

const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const data = collect(nums);

const shuffled = data.shuffle();

console.log(shuffled.all());

The example shuffles an array.

$ node shuffling.js
[ 6, 4, 3, 7, 5, 10, 1, 9, 8, 2 ]

## Collect.js random

The random function returns a random element from a collection.

random_fun.js
  

const collect = require('collect.js');

let nums = [1, 2, 3, 4, 5, 6, 7, 8];

const data = collect(nums);

let r1 = data.random();
console.log(r1);

let r2 = data.random(2);
console.log(r2.all());

The example picks a random value and random two values
from an array of numbers.

$ node random_fun.js
6
[ 4, 2 ]

## Collect.js sortBy

The sortBy function function sorts the collection by the given key.

sortby_fun.js
  

const collect = require('collect.js');

const users = [
    { name: 'John Doe', occupation: 'gardener' },
    { name: 'Adam Forsythe', occupation: 'writer' },
    { name: 'Peter Smith', occupation: 'programmer' },
    { name: 'Lucy Black', occupation: 'teacher' }
];

const data = collect(users);

const sorted1 = data.sortBy('name');
console.log(sorted1.all());

const sorted2 = data.sortBy('occupation');
console.log(sorted2.all());

The program sorts the array of objects by the provided keys.

$ node sortby_fun.js
[ { name: 'Adam Forsythe', occupation: 'writer' },
  { name: 'John Doe', occupation: 'gardener' },
  { name: 'Lucy Black', occupation: 'teacher' },
  { name: 'Peter Smith', occupation: 'programmer' } ]
[ { name: 'John Doe', occupation: 'gardener' },
  { name: 'Peter Smith', occupation: 'programmer' },
  { name: 'Lucy Black', occupation: 'teacher' },
  { name: 'Adam Forsythe', occupation: 'writer' } ]

The array was sorted by the name and the occupation
keys.

## Collect.js nth

The nth function returns every nth element in the collection.

nth_fun.js
  

const collect = require('collect.js');

const nums = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const data = collect(nums);

console.log(data.nth(2).all());
console.log(data.nth(3).all());
console.log(data.nth(4).all());

The example returns every second, third, and fourth element
of the array.

$ node nth_fun.js
[ 'a', 'c', 'e', 'g' ]
[ 'a', 'd', 'g' ]
[ 'a', 'e' ]

## Collect.js chunk

The chunk function divides the collection into smaller
parts of the given size.

chunk_fun.js
  

const collect = require('collect.js');

const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const data = collect(nums);
const chunks = data.chunk(4);

console.log(chunks.toArray());

The example breaks the array into a parts containing four elements.

$ node chunk_fun.js
[ [ 1, 2, 3, 4 ], [ 5, 6, 7, 8 ], [ 9, 10 ] ]

The flatten function flattens a multi-dimensional
collection into a single dimension.

flatten.js
  

const collect = require('collect.js');

const nums = [1, 2, 3, [4, 5, 6, 7, 8], [9, 10]];

const data = collect(nums);
const flattened = data.flatten();

console.log(flattened.all());

The example flattens an array of numbers into one level array.

 -->

node flatten_fun.js
[ 4, 5, 6, 7, 8, 9, 10 ]

## Collect.js difference

The dif function compares the collection against another
collection. It returns the values from the original collection that are not
present in the second collection.

diff_fun.js
  

const collect = require('collect.js');

const nums = [1, 2, 3, 4];
const nums2 = [3, 4, 5, 6];

const data = collect(nums);
const data2 = collect(nums2);

const difference = data.diff(data2);

console.log(difference.all());

The example returns the difference between two arrays.

$ node diff_fun.js
[ 1, 2 ]

## Collect.js partition

The partition function separates the elements of a collection into
two parts: elements that pass the given condition and that do not.

partition_fun.js
  

const collect = require('collect.js');

const nums = [-1, 2, 3, -4, 5, 7, -2];

const data = collect(nums);

const [positive, negative] = data.partition(e =&gt; {
    return e &lt; 0 &amp;&amp; e != 0;
});

console.log(positive.all());
console.log(negative.all());

The example uses the partition function to separate positive values
from the negative ones.

$ node partition_fun.js
[ -1, -4, -2 ]
[ 2, 3, 5, 7 ]

## Collect.js pluck

The pluck function retrieves all the values for the
given key.

pluck_fun.js
  

const collect = require('collect.js');

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

let data = collect(users);

let names = data.pluck('name');
console.log(names.all());

let cities = data.pluck('city');
console.log(cities.all());

The example prints all the names and cities from the array of
users objects. Since the names and cities are repeating, we use
unique to make them unique.

$ node pluck_fun.js
[ 'John',
    'Lenny',
    'Andrew',
    'Peter',
    'Anna',
    'Albert',
    'Adam',
    'Robert' ]
[ 'London', 'New York', 'Boston', 'Prague', 'Bratislava', 'Trnava' ]

## Collect.js implode

The implode function joins the elements of a collection by the
given character.

implode_fun.js
  

const collect = require('collect.js');

const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const data = collect(nums);

let output = data.implode('-');
console.log(output);

The example joins the elements with the '-' character.

When we are dealing with objects, we need to specify the
key by which we join the elements.

implode_fun2.js
  

const collect = require('collect.js');

const users = [
    { name: 'John Doe', occupation: 'gardener' },
    { name: 'Adam Forsythe', occupation: 'writer' },
    { name: 'Peter Smith', occupation: 'programmer' },
    { name: 'Lucy Black', occupation: 'teacher' }
];

const data = collect(users);

let output = data.implode('name', ',');
console.log(output);

The example joins the names from the users array of objects.

$ node implode_fun2.js
John Doe,Adam Forsythe,Peter Smith,Lucy Black

## Collect.js reduce

The reduce function reduces the collection to a single value,
passing the result of each iteration into the subsequent iteration. The first
parameter of the function is the accumulator or carry, the second one is the
current element.

reduce_fun.js
  

const collect = require('collect.js');

const nums = [1, 2, 3, 4, 5, 6];

const data = collect(nums);

const val = data.reduce((c, e) =&gt; { return e += c });
console.log(val);

const val2 = data.chunk(2).reduce((c, e) =&gt; {
    return c + e.get(0) * e.get(1)
}, 0);

console.log(val2);

The program uses the reduce function to calculate the sum and the
sum of products of values.

const val2 = data.chunk(2).reduce((c, e) =&gt; {
    return c + e.get(0) * e.get(1)
}, 0);

With the help of the chunk function, we calculate the sum of
products of pairs: 1*2 + 3*4 + 5*6.

$ node reduce_fun.js
21
44

## Collect.js tap

The tap function passes the collection to the given callback,
allowing us to hook into the collection at a specific point and do something
with the items while not affecting the collection itself.

tap_fun.js
  

const collect = require('collect.js');

const nums = [1, 3, 2, 6, 5, 4];
const data = collect(nums);

const val = data.sort()
        .tap((col) =&gt; console.log(col.all()))
        .chunk(2)
        .tap((col) =&gt; console.log(col.toArray()))
        .reduce((c, e) =&gt; c + e.get(0) * e.get(1));

console.log(val);

The example sorts the collection, chunks it and finally reduces it. In the
process, we hook into the operations to see the results.

$ node tap_fun.js
[ 1, 2, 3, 4, 5, 6 ]
[ [ 1, 2 ], [ 3, 4 ], [ 5, 6 ] ]
44

## Collect.js every

The every function verifies that all elements of a collection pass
the given truth test.

every_fun.js
  

const collect = require('collect.js');

const words = ['forest', 'wood', 'sky', 'cloud'];

const data = collect(words);

if (data.every(e =&gt; e.length &gt; 2)){

    console.log('Each word has more than 2 letters');
} else {

    console.log('There is at least one word that does not have more than 2 letters');
}

The program verifies that each word in the collection has more than two
characters.

$ node every_fun.js
Each word has more than 2 letters

The collection passes the truth test.

## Collect.js groupBy

The groupBy function groups the collection's items by the given
key.

groupby_fun.js
  

const collect = require('collect.js');

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

const data = collect(users);

let cityGroups = data.groupBy('city');

cityGroups.each((group, city) =&gt; {

    console.log(city);

    group.each(e =&gt; {

        let { name, city, born } = e;
        console.log(`${name} ${born}`);
    });
});

The example groups the users by cities.

$ node groupby_fun.js
London
John 2001-04-01
New York
Lenny 1997-12-11
Boston
Andrew 1987-02-22
Prague
Peter 1936-03-24
Robert 1998-03-14
Bratislava
Anna 1973-11-18
Albert 1940-12-11
Robert 1935-05-15
Trnava
Adam 1983-12-01

## Source

[Collect.js usage](https://collect.js.org/usage.html)

In this article we have introduced the Collect.js JavaScript library.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)