+++
title = "JavaScript array filter"
date = 2025-08-29T20:01:05.616+01:00
draft = false
description = "Discover how to filter arrays in JavaScript using the filter function, with examples and explanations."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript array filter

last modified last modified October 18, 2023

 

In this artile we show how to filter arrays in JavaScript. The filter function
creates a new array with all elements that pass the predicate function.

An array is a collection of a number of values. The array items are called
elements of the array. 

## Predicate

Predicate in general meaning is a statement about something that is either true
or false. In programming, predicates represent single argument functions that
return a boolean value. 

## JS filter function

The filter function creates a new array with all elements that 
satisfy the given predicate.

filter(predicate, [ctx])

The filter function takes the predicate as its first parameter. The
second parameter is optional; it is a helper context object. Inside the
predicate, we can access the properties of the context object with the
this keyword.

## JS array filter example

In the first example, we filter numbers in an array.

positive.js
  

let nums = [4, -5, 3, 2, -1, 7, -6, 8, 9];

let pos_nums = nums.filter((e) =&gt; e &gt; 0);
console.log(pos_nums);

We have an array of numbers. With the filter function, we create a
new array that contains only positive numbers.

let pos_nums = nums.filter((e) =&gt; e &gt; 0);

In this case, the predicate is an anonymous function which returns true for
values greater than zero.

$ node positive.js 
[ 4, 3, 2, 7, 8, 9 ]

## JS array filter context

In the next example, we use a context object in the filtering.

filter_range.js
  

function isInRange(val) {

    return val &gt;= this.lower &amp;&amp; val &lt;= this.upper;
}

let range = {
    lower: 1,
    upper: 10
};

let data = [-2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

let res = data.filter(isInRange, range);
console.log(res);

We have an array of values. We specify the lower and upper bounds for the 
filtering in the context object.

function isInRange(val) {

    return val &gt;= this.lower &amp;&amp; val &lt;= this.upper;
}

We access the properties of the context via the this keyword.

let range = {
    lower: 1,
    upper: 10
};

This is the context object.

let res = data.filter(isInRange, range);

We pass the context as the second parameter.

$ node filter_range.js 
[
  1, 2, 3, 4,  5,
  6, 7, 8, 9, 10
]

## JS array filter datatype

The typeof operator returns a string indicating the type of 
the operand.

filter_datatype.js
  

function isNumber(value) {

    if (typeof value === 'number') {
        return true;
    }
}

let data = [10, null, "30", 1.4, 'falcon', undefined, true, 17];

let res = data.filter(isNumber);
console.log(res);

In the example, the data array has elements of various data types.
We filter out all numbers.

function isNumber(value) {

    if (typeof value === 'number') {
        return true;
    }
}

In the isNumber predicate, we check for numeric values using the 
typeof operator.

$ node filter_datatype.js 
[ 10, 1.4, 17 ]

## JS array filter objects

We have an array of objects. We filter the array based on the object property.

filter_by_city.js
  

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

let res = users.filter(user =&gt; user.city === 'Bratislava');
console.log(res);

The example filters out all users who live in Bratislava.

$ node filter_by_city
[
  { name: 'Anna', city: 'Bratislava', born: '1973-11-18' },
  { name: 'Albert', city: 'Bratislava', born: '1940-12-11' },
  { name: 'Robert', city: 'Bratislava', born: '1935-05-15' }
]

We can filter the objects by multiple properties.

filter_by_city_name.js
  

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

let res = users.filter(user =&gt; user.city === 'Bratislava' &amp;&amp; user.name.startsWith('A'));
console.log(res);

We filter all users who live in Bratislava and whose names begins with 'A'.

$ node filter_by_city_name.js 
[
  { name: 'Anna', city: 'Bratislava', born: '1973-11-18' },
  { name: 'Albert', city: 'Bratislava', born: '1940-12-11' }
]

In the next example, we are going to filter by age. For this, we need the 
moment library.

$ nmp i moment

We install the moment library.

filter_by_age.js
  

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

let res = users.filter(user =&gt; getAge(user.born) &gt; 40);

console.log(res);

function getAge(dt) {

    return moment.duration(moment() - moment(dt, 'YYYY-MM-DD', true)).years();
}

The example filters out all users older than 40 years.

$ node filter_by_age.js 
[
  { name: 'Peter', city: 'Prague', born: '1936-03-24' },
  { name: 'Anna', city: 'Bratislava', born: '1973-11-18' },
  { name: 'Albert', city: 'Bratislava', born: '1940-12-11' },
  { name: 'Robert', city: 'Bratislava', born: '1935-05-15' }
]

## Source

[JS Array documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

In this article we have covered filtering of JavaScript arrays.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)