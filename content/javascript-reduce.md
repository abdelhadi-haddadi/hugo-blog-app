+++
title = "JavaScript reduce"
date = 2025-08-29T20:01:37.052+01:00
draft = false
description = "Learn how to use the reduce method in JavaScript for data reduction and aggregation, with examples and explanations."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript reduce

last modified last modified October 18, 2023

 

In this article we show how to use reduction operations in JavaScript
language.

## The reduce function

The reduce function executes a reducer function on each element of
the array, resulting in a single output value. The reducer is provided by the
programmer.

The reducer function takes four arguments:

    - Accumulator

    - Current value

    - Current index

    - Source array

The reducer's returned value is assigned to the accumulator. The accumulator is
remembered across each iteration throughout the array, and ultimately becomes
the final, single resulting value.

Reduction operations are very powerful. They allow us to calculate sums,
products, averages, maximum and minimum values, sort, reverse, flatten arrays
and many more.

## The reduce function syntax

The reduce function has the following syntax:

arr.reduce(callback( accumulator, currentValue[, index[, array]] )[, initialValue])

The parameters in square brackets are optional. If initialValue is
not provided, reduce will execute the callback function starting at
index 1, skipping the first index. If initialValue is provided, it
will start at index 0.

In our example, we call the accumulator *total* and the current value 
*next*.

## JS reduce - sum and product

In the next example, we calculate the sum and the product of values.

sum_product.js
  

let vals = [1, 2, 3, 4, 5];

let sum = vals.reduce((total, next) =&gt; {return total + next});
let product = vals.reduce((total, next) =&gt; {return total * next});

console.log(`The sum is: ${sum}`);
console.log(`The product is: ${product}`);

The sum and product are computed from an array of integers.

$ node sum_product.js 
The sum is: 15
The product is: 120

## JS reduce - min and max values

The following example picks the maximum and minimum values from the array.

min_max.js
  

let vals = [1, 2, 3, 4, 5];

const [initial] = vals;

const min = vals.reduce((total, next) =&gt; Math.min(total, next), initial);
const max = vals.reduce((total, next) =&gt; Math.max(total, next), initial);

console.log(`The minimum is: ${min}`);
console.log(`The maximum is: ${max}`);

We use the Math.max and Math.min functions to get the
maximum and minimum for the current total accumulator value, which is passed
across iterations until the final one is returned. The initial value is the
first element in the array. Note that in this context, the 'total' value is the
currently chosen max value. 

$ node min_max.js 
The minimum is: 1
The maximum is: 5

It is possible to calculate both values in one go.

min_max2.js
  

let vals = [1, 2, 3, 4, 5];

const initials = {
    min: Number.MAX_VALUE,
    max: Number.MIN_VALUE,
};

const min_max_vals = vals.reduce(min_max, initials);
console.log(min_max_vals);

function min_max(total, next) {
    return {
        min: Math.min(total.min, next),
        max: Math.max(total.max, next),
    };
}

We min_max reducer function returns an object with min and max 
properties.

$ node min_max2.js 
{ min: 1, max: 5 }

## JS reduce map

In a functional map operation, a new array is created from the source array 
by applying an expression on each of the elements.

mapping.js
  

let vals = [1, 2, 3, 4, 5];

let mapped = vals.reduce((total, next) =&gt; {total.push(next * 2); return total}, []);
console.log(mapped);

The example creates a new array from the initial array. Each of the elements is
multiplied by two. Initial value is an empty array. The reducer function adds
the next value multiplied by two to the initial array with the push
function.

$ node mapping.js 
[ 2, 4, 6, 8, 10 ]

## JS reduce filter

The filter functional operation creates a new array with all elements that pass
the given test.

filtering.js
  

let vals = [-1, -2, 3, 4, -5, -6];

let filtered = vals.reduce((total, next) =&gt; {
  
    if (next &gt; 0) {
        total.push(next * 2);
    }

    return total;
}, []);

console.log(filtered);

The example creates a new array containing only positive values. The reducer
function adds the next value to the total array only if it is greater than zero.

$ node filtering.js 
[ 6, 8 ]

## JS reduce - flatten array

The following example flattens an array. 

flatten.js
  

let vals = [[0, 1], [2, 3], [4, 5], [5, 6]];

let flattened = vals.reduce((total, next) =&gt; total.concat(next), []);

console.log(flattened);

The initial value is an empty array to which the reducer function merges the new
nested array with the concat function.

$ node flatten.js 
[
  0, 1, 2, 3,
  4, 5, 5, 6
]

## JS reduce average

When calculating the average, we also utilize the index and the source array.

average.js
  

let vals = [1, 2, 3, 4, 5];

let average = vals.reduce((total, next, idx, array) =&gt; {

  total += next;

  if (idx === array.length - 1) { 
    return total / array.length;
  } else { 
    return total;
  }
});

console.log(average);

The example calculates the average of values.

if (idx === array.length - 1) { 
  return total / array.length;
} else { 
  return total;
}

When we reach the end of the array in the reducer function, we divide the total
value (the sum of values in this case) by the number of elements. This is the
final value to be returned. Otherwise, we add the next value to the total value
and return the total value from the reducer.

$ node average.js 
3

The average of values 1 through 5 is 3. 

## JS reduce reverse

In the next example, we use the spread ... operator. The spread
operator returns all the elements of an array.

reversed.js
  

let vals = [88, 28, 0, 9, 389, 420];

let reversed = vals.reduce((total, next) =&gt; {return [next, ...total]}, []);

console.log(reversed);

In each iteration, the reducer function returns a new array, where the current
element  is placed into the first position, followed by all elements that are
already in the total array.

$ node reversing.js 
[ 420, 389, 9, 0, 28, 88 ]

## JS reduce - unique values

The following example creates a new array containing only unique values.

unique_vals.js
  

let vals = [1, 1, 2, 2, 3, 4, 5, 5];

let unique_vals = vals.reduce((total, next) =&gt; {

    if (total.includes(next)) {

        return total;
    } else {

        return [...total, next];
    }

}, []);

console.log(unique_vals);

The reducer function checks if the value is already in the total array with the
includes function. It adds the next value into the total array only
if the includes function returns false.

$ node unique_vals.js 
[ 1, 2, 3, 4, 5 ]

## JS reduce piping

We can chain functions in a reducer function.

piping.js
  

function inc(val) { 
    return val + 1; 
}

function dec(val) {

    return val - 1; 
}

function double(val) { 

    return val * 2; 
}

function halve(val) { 

    return val / 2; 
}

let pipeline = [inc, halve, dec, double];

let res = pipeline.reduce((total, fn) =&gt; {
    
  return fn(total);
}, 9);

console.log(res);

In the example, we chain four functions in a reducer. The functions are applied
on the initial value. 

$ node piping.js 
8

## JS reduce - currying and function composition

Currying is a transformation of a function with multiple arguments into a
sequence of nested functions with a single argument. Currying helps us create
composed functions, which later take arguments.

Read the [JavaScript currying tutorial](/javascript/currying/)
to learn more about currying. 

fun_composition.js
  

const double = x =&gt; x * 2
const triple = x =&gt; x * 3
const quadruple = x =&gt; x * 4

const pipe = (...funs) =&gt; input =&gt; funs.reduce(
    (total, fn) =&gt; fn(total),
    input
)

const fun1 = pipe(double)
const fun2 = pipe(double, triple)
const fun3 = pipe(triple, triple)
const fun4 = pipe(double, triple, quadruple)

console.log(fun1(2))
console.log(fun2(5))
console.log(fun3(7))
console.log(fun4(9))

The pipe function takes arbitrary number of parameters - functions.
The combined function later takes the input value on which the functions
operate. 

const pipe = (...funs) =&gt; input =&gt; funs.reduce(
    (total, fn) =&gt; fn(total),
    input
)

The pipe fuction first applies the function on the input value. The
calculated intermediate values are then passed to other functions in the chain,
until the final value is returned. 

const fun1 = pipe(double)
const fun2 = pipe(double, triple)
const fun3 = pipe(triple, triple)
const fun4 = pipe(double, triple, quadruple)

These are composed functions for multiplication of specific values.

$ node fun_composition.js 
4
30
63
216

## JS reduce - count occurrences

The reducer function can be used to count the occurrence of the elements
in the array.

tally.js
  

const words = ['sky', 'forest', 'wood', 'sky', 'rock', 'cloud', 
    'sky', 'forest', 'rock', 'sky'];

const tally = words.reduce((total, next) =&gt; {

  total[next] = (total[next] || 0) + 1 ;

  return total;
}, {});

console.log(tally);

In the example, we have an array of words. Several words are included multiple
times. The initial value is an empty object. The reducer function either creates
a new property or increases the value of the property.

$ node tally.js 
{ sky: 4, forest: 2, wood: 1, rock: 2, cloud: 1 }

## JS reduce - group objects by property

The following example groups objects in an array by 
a property. 

grouping.js
  

let users = [
  { name: 'John', age: 25, occupation: 'gardener' },
  { name: 'Lenny', age: 51, occupation: 'programmer' },
  { name: 'Andrew', age: 43, occupation: 'teacher' },
  { name: 'Peter', age: 52, occupation: 'gardener' },
  { name: 'Anna', age: 43, occupation: 'teacher' },
  { name: 'Albert', age: 46, occupation: 'programmer' },
  { name: 'Adam', age: 47, occupation: 'teacher' },
  { name: 'Robert', age: 32, occupation: 'driver' }
];

let grouped = users.reduce((result, user) =&gt; {

    (result[user.occupation] || (result[user.occupation] = [])).push(user);  
    return result;
}, {});

console.log(grouped);

We have an array of users. We group the users by their occupation. The initial
value is an empty object. The resulting object has the occupations as
properties; each property contains a list of users with the corresponding
occupation.

let grouped = users.reduce((result, user) =&gt; {

    (result[user.occupation] || (result[user.occupation] = [])).push(user);  
    return result;
}, {});

The reducer either creates a new property with an empty array and pushes the
first user or adds a new user object to already created array.

$ node grouping.js 
{
  gardener: [
    { name: 'John', age: 25, occupation: 'gardener' },
    { name: 'Peter', age: 52, occupation: 'gardener' }
  ],
  programmer: [
    { name: 'Lenny', age: 51, occupation: 'programmer' },
    { name: 'Albert', age: 46, occupation: 'programmer' }
  ],
  teacher: [
    { name: 'Andrew', age: 43, occupation: 'teacher' },
    { name: 'Anna', age: 43, occupation: 'teacher' },
    { name: 'Adam', age: 47, occupation: 'teacher' }
  ],
  driver: [ { name: 'Robert', age: 32, occupation: 'driver' } ]
}

## JS reduce - convert array to object

The following example converts and array to object.

array2object.js
  

let users = [
  { id: 1, name: 'John', age: 25, occupation: 'gardener' },
  { id: 2, name: 'Lenny', age: 51, occupation: 'programmer' },
  { id: 3, name: 'Andrew', age: 43, occupation: 'teacher' },
  { id: 4, name: 'Peter', age: 52, occupation: 'gardener' },
  { id: 5, name: 'Anna', age: 43, occupation: 'teacher' },
  { id: 6, name: 'Albert', age: 46, occupation: 'programmer' },
  { id: 7, name: 'Adam', age: 47, occupation: 'teacher' },
  { id: 8, ame: 'Robert', age: 32, occupation: 'driver' }
];

let obj = users.reduce((total, e) =&gt; {

    const {id, ...attrs} = e;

    return {...total, [id]: attrs, };
}, {});

console.log(obj);

We have an array of user objects. Using the reducer, we transform the array into
an object; the user Id becomes the identification attribute in the resulting
object.

const {id, ...attrs} = e;  

From the current element, some user object, we copy the id value into the 
id constant and the rest of the attributes into the
attrs.

return {...total, [id]: attrs, };

Then we build the intermediate (and in the end final) object. First, we expand
all the inner attributes created so far in total and add the
current one.

**Note: ** With the [id] syntax we use the actual value of the id
variable as key/property while creating a JavaScript object. 

$ node array2object.js 
{
  '1': { name: 'John', age: 25, occupation: 'gardener' },
  '2': { name: 'Lenny', age: 51, occupation: 'programmer' },
  '3': { name: 'Andrew', age: 43, occupation: 'teacher' },
  '4': { name: 'Peter', age: 52, occupation: 'gardener' },
  '5': { name: 'Anna', age: 43, occupation: 'teacher' },
  '6': { name: 'Albert', age: 46, occupation: 'programmer' },
  '7': { name: 'Adam', age: 47, occupation: 'teacher' },
  '8': { ame: 'Robert', age: 32, occupation: 'driver' }
}

## Source

[Array reduce - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)

In this article we have worked with reductions in JavaScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)