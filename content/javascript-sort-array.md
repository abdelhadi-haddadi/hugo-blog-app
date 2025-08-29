+++
title = "JavaScript sort array"
date = 2025-08-29T20:01:39.364+01:00
draft = false
description = "Discover how to sort arrays in JavaScript using various techniques, with examples and explanations."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript sort array

last modified last modified October 18, 2023

 

In this article we show how to sort array elements in JavaScript.

## Sorting

Sorting is arranging elements in an ordered sequence. Multiple algorithms were
developed to do sorting, including merge sort, quick sort, selection sort, or
bubble sort.

The opposite of sorting, rearranging a sequence of elements in a random or
meaningless order, is called shuffling.

We can sort data alphabetically or numerically. The sort key specifies the
criteria used to perform the sort. It is possible to sort objects by multiple
keys. For instance, when sorting users, the names of the users could be used as
primary sort key, and their occupation as the secondary sort key.

The built-in sort function sorts the elements of an array in place
and returns the sorted array. It takes an optional compare function as a
parameter. The function is used to determine the order of the elements. It
returns a negative value if the first argument is less than the second argument,
zero if they're equal, and a positive value otherwise.

## JS array default sort

By default, numbers are sorted numerically in ascending order and strings
lexically also in ascending order.

main.js
  

let vals = [-3, 3, 0, 1, 5, -1, -2, 8, 7, 6];
let words = ['sky', 'blue', 'nord', 'cup', 'lemon', 'new'];

vals.sort();
console.log(vals.join(' '));

words.sort();
console.log(words.join(' '));

The example sorts an array of numbers and words.

$ node core.js
-1 -2 -3 0 1 3 5 6 7 8
blue cup lemon new nord sky

## JS sort array in descending order

In order to sort values in descending order, we need to provide a custom compare
function.

main.js
  

let vals = [-3, 3, 0, 1, 5, -1, -2, 8, 7, 6];
let words = ['sky', 'blue', 'nord', 'cup', 'lemon', 'new'];

vals.sort((a, b) =&gt; b - a);
console.log(vals.join(' '));

words.sort((a, b) =&gt; {

    if (a === b) {
        return 0;
    }

    return b &lt; a ? -1 : 1;
});

console.log(words.join(' '));

We sort an array of integers and strings in descending order.

$ node main.js
8 7 6 5 3 1 0 -1 -2 -3
sky nord new lemon cup blue

## JS array sort strings case insensitive

To compare strings in a case insensitive manner, we call the 
toLowerCase function on the compared elements.

main.js
  

let words = ["world", "War", "abbot", "Caesar", "castle", "sky", "den",
    "forest", "ocean", "water", "falcon", "owl", "rain", "Earth"];

function icase(e1, e2) {

    if (e1.toLowerCase() === e2.toLowerCase()) return 0;

    return e1.toLowerCase() &lt; e2.toLowerCase() ? -1 : 1;
}

words.sort(icase);
console.log(words.join(' '));

The example sorts an array of strings regardless of the case.

$ node main.js
abbot Caesar castle den Earth falcon forest ocean owl rain sky War water world

## JS sort by string length

In the next example, we sort an array of strings by its length.

main.js
  

let words = ['brown', 'war', 'a', 'falcon', 'tradition',
    'no', 'boot', 'ellipse', 'strength'];

let bylen = (e1, e2) =&gt; e1.length - e2.length;
let bylendesc = (e1, e2) =&gt; e2.length - e1.length;

words.sort(bylen);
console.log(words.join('\n'));

words.sort(bylendesc);
console.log(words.join('\n'));

We use the length function to get the size of the sorted elements.

$ node main.js
a
no
war
boot
brown
falcon
ellipse
strength
tradition
tradition
strength
ellipse
falcon
brown
boot
war
no
a

## JS sort names by surname

When we want to sort names by their surname, assuming that the whole name is a
single string, we need to provide a custom comparison method.

main.js
  

let users = ['John Doe', 'Lucy Smith', 'Benjamin Young', 'Robert Brown', 
    'Thomas Moore', 'Linda Black', 'Adam Smith', 'Jane Smith'];

function bysur(n1, n2) {

    let sname1 = n1.split(' ')[1];
    let sname2 = n2.split(' ')[1];

    if (sname1 &gt; sname2) return 1;
    if (sname1 &lt; sname2) return -1;
    return 0;
}

users.sort(bysur);
console.log(users);

We split the string into two parts and compare the second part of the string.

$ node main.js 
[
    'Linda Black',
    'Robert Brown',
    'John Doe',
    'Thomas Moore',
    'Lucy Smith',
    'Adam Smith',
    'Jane Smith',
    'Benjamin Young'
]

## JS sort array of objects

In the following example, we sort an array of objects.

main.js
  

let users = [
    { fname: 'John', lname: 'Doe', salary: 1230 },
    { fname: 'Roger', lname: 'Roe', salary: 3130 },
    { fname: 'Lucy', lname: 'Novak', salary: 670 },
    { fname: 'Ben', lname: 'Walter', salary: 2050 },
    { fname: 'Robin', lname: 'Brown', salary: 2300 },
    { fname: 'Joe', lname: 'Draker', salary: 1190 },
    { fname: 'Janet', lname: 'Doe', salary: 980 }
];

users.sort((e1, e2) =&gt; e1.salary - e2.salary)
console.log(users);

console.log('---------------------');

users.sort((e1, e2) =&gt; e2.salary - e1.salary)
console.log(users);

We have a list of users. The users are sorted by their salary in ascending an 
then descending order. 

$ node main.js 
[
  { fname: 'Lucy', lname: 'Novak', salary: 670 },
  { fname: 'Janet', lname: 'Doe', salary: 980 },
  { fname: 'Joe', lname: 'Draker', salary: 1190 },
  { fname: 'John', lname: 'Doe', salary: 1230 },
  { fname: 'Ben', lname: 'Walter', salary: 2050 },
  { fname: 'Robin', lname: 'Brown', salary: 2300 },
  { fname: 'Roger', lname: 'Roe', salary: 3130 }
]
---------------------
[
  { fname: 'Roger', lname: 'Roe', salary: 3130 },
  { fname: 'Robin', lname: 'Brown', salary: 2300 },
  { fname: 'Ben', lname: 'Walter', salary: 2050 },
  { fname: 'John', lname: 'Doe', salary: 1230 },
  { fname: 'Joe', lname: 'Draker', salary: 1190 },
  { fname: 'Janet', lname: 'Doe', salary: 980 },
  { fname: 'Lucy', lname: 'Novak', salary: 670 }
]

## JS sort by multiple fields

The following example sorts user objects by multiple fields.

main.js
  

let users = [
    { fname: "John", lname: "Doe", salary: 1230 },
    { fname: "Lucy", lname: "Novak", salary: 670 },
    { fname: "Ben", lname: "Walter", salary: 2050 },
    { fname: "Robin", lname: "Brown", salary: 2300 },
    { fname: "Amy", lname: "Doe", salary: 1250 },
    { fname: "Joe", lname: "Draker", salary: 1190 },
    { fname: "Janet", lname: "Doe", salary: 980 },
    { fname: "Albert", lname: "Novak", salary: 1930 }
];

users.sort((e1, e2) =&gt; {
    return e1.lname.localeCompare(e2.lname) || e2.salary - e1.salary
});

console.log(users);

We sort users first by last names and then by salaries. We utilize the
|| operator.

$ node main.js
[
  { fname: 'Robin', lname: 'Brown', salary: 2300 },
  { fname: 'Amy', lname: 'Doe', salary: 1250 },
  { fname: 'John', lname: 'Doe', salary: 1230 },
  { fname: 'Janet', lname: 'Doe', salary: 980 },
  { fname: 'Joe', lname: 'Draker', salary: 1190 },
  { fname: 'Albert', lname: 'Novak', salary: 1930 },
  { fname: 'Lucy', lname: 'Novak', salary: 670 },
  { fname: 'Ben', lname: 'Walter', salary: 2050 }
]

## JS sort by accented strings 

To sort accented strings, we can use the  Intl.Collator which
enables language-sensitive string comparison.

main.js
  

const words = ['čaj', 'auto', 'drevo', 'cibuľa', 'čučoriedka', 'banán', 
    'čerešňa', 'ďateľ', 'červený', 'čierny', 'cesnak'];

words.sort(new Intl.Collator('sk').compare);
console.log(words.join(' '));

The example sorts Slovak words.

## Source

[Array sort - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

In this article we have sorted arrays in JavaScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)