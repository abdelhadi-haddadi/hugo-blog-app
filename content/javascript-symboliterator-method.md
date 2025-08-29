+++
title = "JavaScript [Symbol.iterator] method"
date = 2025-08-29T20:02:14.923+01:00
draft = false
description = "JavaScript [Symbol.iterator] tutorial shows how to create iterable objects in JavaScript. The tutorial provides numerous examples to demonstrate custom iteration behavior in JS."
image = ""
imageBig = ""
categories = ["js-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript [Symbol.iterator] method

last modified April 4, 2025

 

In this article we show how to create iterable objects using the
[Symbol.iterator] method in JavaScript.

## Iterables and Iterators

An iterable is an object that implements the [Symbol.iterator]
method. This method returns an iterator object. The iterator must implement
a next method that returns an object with value
and done properties.

Iterables can be used with for...of loops and the spread operator.
Built-in types like Array, String, Map, and Set are iterable by default.
The [Symbol.iterator] method allows custom objects to become
iterable.

The iterator protocol defines a standard way to produce a sequence of values.
When an object implements this protocol, it can be consumed by JavaScript
language constructs that expect iterables. This provides flexibility in
how objects can be traversed.

## Basic [Symbol.iterator] example

The following example demonstrates the basic usage of the
[Symbol.iterator] method.

main.js
  

const myIterable = {
  [Symbol.iterator]: function() {
    let step = 0;
    return {
      next: function() {
        step++;
        if (step &lt;= 3) {
          return { value: step, done: false };
        }
        return { value: undefined, done: true };
      }
    };
  }
};

for (const value of myIterable) {
  console.log(value);
}

We create a simple iterable object that yields values 1, 2, and 3. The
[Symbol.iterator] method returns an iterator object with a
next method. The for...of loop consumes the
iterable.

$ node main.js
1
2
3

## Custom range iterator

This example shows how to create a custom range iterator.

main.js
  

function makeRange(start, end, step = 1) {
  let current = start;
  return {
    [Symbol.iterator]: function() {
      return {
        next: function() {
          if (current &lt;= end) {
            const value = current;
            current += step;
            return { value, done: false };
          }
          return { done: true };
        }
      };
    }
  };
}

for (const num of makeRange(1, 10, 2)) {
  console.log(num);
}

We create a range iterator that generates numbers from start to end with a
given step. The iterator maintains its state in the current
variable. This demonstrates how to create parameterized iterators.

$ node main.js
1
3
5
7
9

## Iterating over object properties

This example shows how to make an object's properties iterable.

main.js
  

const person = {
  name: 'John',
  age: 30,
  city: 'New York',
  [Symbol.iterator]: function() {
    const keys = Object.keys(this);
    let index = 0;
    return {
      next: () =&gt; {
        if (index &lt; keys.length) {
          const key = keys[index++];
          return { value: `${key}: ${this[key]}`, done: false };
        }
        return { done: true };
      }
    };
  }
};

for (const prop of person) {
  console.log(prop);
}

We make a regular object iterable by implementing [Symbol.iterator].
The iterator yields key-value pairs as strings. This pattern is useful when you
want to control how an object's properties are enumerated.

$ node main.js
name: John
age: 30
city: New York

## Infinite iterator

This example demonstrates an infinite iterator that never completes.

main.js
  

const infiniteSequence = {
  [Symbol.iterator]: function() {
    let n = 0;
    return {
      next: function() {
        n++;
        return { value: n, done: false };
      }
    };
  }
};

const iterator = infiniteSequence[Symbol.iterator]();
console.log(iterator.next().value);
console.log(iterator.next().value);
console.log(iterator.next().value);

We create an iterator that generates an infinite sequence of numbers. Since it
never returns done: true, it would cause an infinite loop if used
with for...of. Instead, we manually call next to
get values.

$ node main.js
1
2
3

## Combining with generators

This example shows how to use generators with [Symbol.iterator].

main.js
  

const fibonacci = {
  *[Symbol.iterator]() {
    let a = 0, b = 1;
    while (true) {
      yield a;
      [a, b] = [b, a + b];
    }
  }
};

let count = 0;
for (const num of fibonacci) {
  console.log(num);
  if (count++ &gt;= 9) break;
}

We implement the Fibonacci sequence using a generator function as the
[Symbol.iterator] method. Generators simplify iterator
implementation by automatically handling state and the iterator protocol.
The yield keyword produces values.

$ node main.js
0
1
1
2
3
5
8
13
21
34

## Source

[Iteration protocols - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols)

In this article we have demonstrated how to use the [Symbol.iterator]
method to create custom iterable objects in JavaScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Array Functions.](/javascript/#js-array)