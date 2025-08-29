+++
title = "TypeScript Iterators"
date = 2025-08-29T20:14:30.492+01:00
draft = false
description = "Learn TypeScript iterators with practical examples. Understand iterables, custom iterators, and generators for efficient data handling."
image = ""
imageBig = ""
categories = ["typescript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# TypeScript Iterators

last modified March 3, 2025

Iterators in TypeScript provide a way to traverse collections like arrays, maps, 
and sets. They implement the Iterable and Iterator 
protocols, enabling custom iteration logic. This tutorial explores iterators, 
generators, and practical examples.

## Basic Iterator Protocol

An iterator must implement the next() method, which returns an 
object with value and done properties. This example 
shows a simple iterator.

basic_iterator.ts
  

const numbers = [1, 2, 3];
const iterator = numbers[Symbol.iterator]();

console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: undefined, done: true }

The Symbol.iterator method returns an iterator object. The 
next() method advances the iterator and returns the current value.

## Custom Iterators

You can create custom iterators by implementing the Iterable 
interface. This example defines a custom range iterator.

custom_iterator.ts
  

class Range implements Iterable&lt;number&gt; {
    constructor(private start: number, private end: number) {}

    [Symbol.iterator](): Iterator&lt;number&gt; {
        let current = this.start;
        return {
            next: () =&gt; {
                return current &lt;= this.end
                    ? { value: current++, done: false }
                    : { value: undefined, done: true };
            }
        };
    }
}

const range = new Range(1, 3);
for (const num of range) {
    console.log(num); // Output: 1, 2, 3
}

The Range class implements the Iterable interface. The 
Symbol.iterator method returns an iterator object.

## Generators

Generators simplify iterator creation using the function* syntax. 
They automatically implement the iterator protocol.

generator.ts
  

function* generateSequence(start: number, end: number) {
    for (let i = start; i &lt;= end; i++) {
        yield i;
    }
}

const sequence = generateSequence(1, 3);
for (const num of sequence) {
    console.log(num); // Output: 1, 2, 3
}

The yield keyword pauses execution and returns a value. Generators 
are ideal for lazy evaluation.

## Iterating Over Maps

Maps are iterable by default. This example demonstrates iterating over a map's 
keys, values, and entries.

map_iterator.ts
  

const map = new Map([
    ['a', 1],
    ['b', 2],
    ['c', 3]
]);

for (const [key, value] of map) {
    console.log(`${key}: ${value}`); // Output: a: 1, b: 2, c: 3
}

Maps provide built-in iterators for keys, values, and entries. Use destructuring 
to access key-value pairs.

## Iterating Over Sets

Sets are also iterable. This example shows how to iterate over a set's values.

set_iterator.ts
  

const set = new Set([1, 2, 3]);

for (const value of set) {
    console.log(value); // Output: 1, 2, 3
}

Sets store unique values and provide a simple iterator for traversal.

## Async Iterators

Async iterators enable asynchronous data traversal. This example uses an async 
generator to fetch data.

async_iterator.ts
  

async function* fetchData(urls: string[]) {
    for (const url of urls) {
        const response = await fetch(url);
        yield response.json();
    }
}

(async () =&gt; {
    const urls = ['https://api.example.com/data1', 'https://api.example.com/data2'];
    for await (const data of fetchData(urls)) {
        console.log(data);
    }
})();

Async iterators use for await...of to handle asynchronous data 
streams. They are useful for APIs and databases.

## Combining Iterators

You can combine multiple iterators using utility functions. This example merges 
two arrays into a single iterator.

combine_iterators.ts
  

function* mergeIterators&lt;T&gt;(...iterators: Iterable&lt;T&gt;[]) {
    for (const iterator of iterators) {
        yield* iterator;
    }
}

const merged = mergeIterators([1, 2], [3, 4]);
for (const num of merged) {
    console.log(num); // Output: 1, 2, 3, 4
}

The yield* keyword delegates iteration to another iterable. This 
pattern is useful for combining data sources.

## Best Practices

- **Use Generators:** Prefer generators for custom iterators

- **Lazy Evaluation:** Leverage lazy evaluation for performance

- **Async Iterators:** Use async iterators for asynchronous data

- **Combine Iterators:** Merge iterators for complex data flows

- **Type Safety:** Ensure iterators return consistent types

## Source

[TypeScript Iterators Documentation](https://www.typescriptlang.org/docs/handbook/iterators-and-generators.html)

This tutorial covered TypeScript iterators with practical examples. Use these 
patterns to handle collections and asynchronous data efficiently.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all TypeScript tutorials](/all/#typescript).