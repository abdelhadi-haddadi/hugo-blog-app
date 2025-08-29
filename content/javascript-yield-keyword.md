+++
title = "JavaScript yield keyword"
date = 2025-08-29T20:01:44.925+01:00
draft = false
description = "Learn how to use the JavaScript yield keyword and generator functions, with clear examples and explanations."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript yield keyword

last modified April 16, 2025

In this article we show how to use generator functions with the yield
keyword in JavaScript.

## The yield keyword

The yield keyword is used in generator functions to pause execution
and return a value. When the generator is resumed, execution continues from where
it was paused. This allows for iterative value production.

Generator functions are declared with function* syntax. They return
a Generator object that can be iterated over. The yield keyword is
what makes generators special compared to regular functions.

Generators maintain their state between executions. This enables complex
iterations and lazy evaluation. They are useful for handling large datasets
or infinite sequences efficiently.

## Basic generator function

This example demonstrates the simplest usage of yield in a generator.

main.js
  

function* simpleGenerator() {
    yield 1;
    yield 2;
    yield 3;
}

const gen = simpleGenerator();

console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);

The generator yields three values in sequence. Each call to next()
resumes execution until the next yield. The generator remembers its
state between calls.

$ node main.js
1
2
3

## Generator with infinite sequence

Generators can produce infinite sequences without consuming memory.

main.js
  

function* infiniteSequence() {
    let i = 0;
    while (true) {
        yield i++;
    }
}

const gen = infiniteSequence();

console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);

This generator produces an infinite sequence of numbers. It doesn't store all
values in memory at once. Each value is generated on demand when next()
is called.

$ node main.js
0
1
2

## Passing values to yield

Values can be passed into the generator through the next() method.

main.js
  

function* generatorWithInput() {
    const name = yield 'What is your name?';
    const age = yield `Hello ${name}, how old are you?`;
    yield `${name} is ${age} years old`;
}

const gen = generatorWithInput();

console.log(gen.next().value);
console.log(gen.next('John').value);
console.log(gen.next(30).value);

The generator first yields a question. The value passed to next()
becomes the result of the yield expression. This enables two-way
communication between generator and caller.

$ node main.js
What is your name?
Hello John, how old are you?
John is 30 years old

## Using yield* for delegation

The yield* expression delegates to another generator.

main.js
  

function* innerGenerator() {
    yield 'a';
    yield 'b';
}

function* outerGenerator() {
    yield 1;
    yield* innerGenerator();
    yield 2;
}

const gen = outerGenerator();

for (const val of gen) {
    console.log(val);
}

The yield* expression yields all values from innerGenerator.
This is similar to spreading the inner generator's values. It provides a way to
compose generators.

$ node main.js
1
a
b
2

## Early return in generators

Generators can return a final value using return.

main.js
  

function* generatorWithReturn() {
    yield 'First';
    yield 'Second';
    return 'Done';
    yield 'This will not execute';
}

const gen = generatorWithReturn();

console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());

The return statement ends the generator. Subsequent next()
calls return {value: undefined, done: true}. The return value appears
in the last next() call before done becomes true.

$ node main.js
{ value: 'First', done: false }
{ value: 'Second', done: false }
{ value: 'Done', done: true }
{ value: undefined, done: true }

## Error handling in generators

Generators can handle errors using try-catch blocks.

main.js
  

function* errorHandlingGenerator() {
    try {
        yield 'Start';
        throw new Error('Something went wrong');
        yield 'This will not execute';
    } catch (err) {
        yield `Caught error: ${err.message}`;
    }
    yield 'End';
}

const gen = errorHandlingGenerator();

console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);

Errors thrown inside the generator can be caught within the generator. The
generator continues execution after the catch block. This allows for robust
error handling in asynchronous operations.

$ node main.js
Start
Caught error: Something went wrong
End

## Practical use case: pagination

Generators are useful for implementing pagination.

main.js
  

function* paginate(items, pageSize) {
    for (let i = 0; i &lt; items.length; i += pageSize) {
        yield items.slice(i, i + pageSize);
    }
}

const items = Array.from({length: 10}, (_, i) =&gt; i + 1);
const pages = paginate(items, 3);

for (const page of pages) {
    console.log('Page:', page);
}

This generator yields pages of items from an array. Each call to next()
returns the next page. This pattern is memory efficient for large datasets.

$ node main.js
Page: [ 1, 2, 3 ]
Page: [ 4, 5, 6 ]
Page: [ 7, 8, 9 ]
Page: [ 10 ]

## Source

[yield - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield)

In this article we have demonstrated how to use the yield keyword in generator
functions in JavaScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)