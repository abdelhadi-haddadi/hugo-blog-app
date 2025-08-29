+++
title = "TypeScript Generators"
date = 2025-08-29T20:14:29.378+01:00
draft = false
description = "Comprehensive TypeScript generators tutorial covering syntax, usage, and practical examples to master iterators and yield."
image = ""
imageBig = ""
categories = ["typescript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# TypeScript Generators

last modified March 3, 2025

Generators in TypeScript are special functions that produce sequences of values
on demand. They use the function* syntax and the yield
keyword to pause and resume execution. This tutorial explores generators with
practical examples to help you master their usage.

## Basic Generator Syntax

Generators are defined using function*. The yield
keyword pauses execution and returns a value. This example demonstrates a simple
generator.

basic_generator.ts
  

function* simpleGenerator() {
    yield 1;
    yield 2;
    yield 3;
}

const generator = simpleGenerator();
console.log(generator.next().value); // Output: 1
console.log(generator.next().value); // Output: 2
console.log(generator.next().value); // Output: 3

In this example, simpleGenerator is defined with the
function* syntax, marking it as a generator. The yield
keyword pauses execution and returns a value each time next is
called on the generator object. The first call to next executes
up to yield 1, returning 1; subsequent calls resume from the last
pause point, yielding 2 and then 3. 

After the final yield, further calls to next would
return { value: undefined, done: true }, indicating the generator
is exhausted. This demonstrates the core mechanic of generators: producing
values lazily and sequentially.

## Infinite Sequence

Generators can produce infinite sequences. This example generates an infinite
sequence of even numbers.

infinite_generator.ts
  

function* evenNumbers() {
    let num = 0;
    while (true) {
        yield num;
        num += 2;
    }
}

const evens = evenNumbers();
console.log(evens.next().value); // Output: 0
console.log(evens.next().value); // Output: 2
console.log(evens.next().value); // Output: 4

The evenNumbers generator uses a while (true) loop to
create an infinite sequence of even numbers, starting at 0 and incrementing by 2
with each yield. Unlike traditional functions that compute all
values at once, this generator produces values on demand: each
next call resumes the loop, yields the current num,
and pauses again. The output shows 0, 2, and 4, but the sequence could continue
indefinitely with more calls. This highlights generators' ability to handle
potentially infinite data without consuming infinite memory, making them ideal
for lazy evaluation.

## Passing Values to Generators

Generators can receive values via next. This example demonstrates
passing values to a generator.

passing_values.ts
  

function* valueReceiver() {
    const name = yield "What is your name?";
    const age = yield `Hello, ${name}! How old are you?`;
    return `You are ${age} years old.`;
}

const receiver = valueReceiver();
console.log(receiver.next().value); // Output: What is your name?
console.log(receiver.next("Alice").value); // Output: Hello, Alice! How old are you?
console.log(receiver.next(30).value); // Output: You are 30 years old.

The valueReceiver generator showcases two-way communication: it
yields prompts and receives values through next. The first
next yields "What is your name?" and pauses. The second call,
next("Alice"), passes "Alice" to the yield expression,
assigning it to name, then yields the next prompt using that value.
Finally, next(30) assigns 30 to age and returns a
final string, ending the generator. The output reflects this interactive flow,
demonstrating how generators can act as stateful, conversational iterators, with
each next call advancing the internal logic based on external
input.

## Combining Generators

Generators can delegate to other generators using yield*. This
example combines two generators.

combining_generators.ts
  

function* firstGenerator() {
    yield 1;
    yield 2;
}

function* secondGenerator() {
    yield* firstGenerator();
    yield 3;
}

const combined = secondGenerator();
console.log(combined.next().value); // Output: 1
console.log(combined.next().value); // Output: 2
console.log(combined.next().value); // Output: 3

Here, secondGenerator uses yield* to delegate to
firstGenerator, effectively embedding its sequence (1, 2) into its
own. When next is called on combined, it first
yields values from firstGenerator in order (1, then 2), then
continues to yield 3 from its own body. The yield* syntax
seamlessly transfers control to the delegated generator until it's exhausted,
then resumes the parent generator's execution. The output—1, 2, 3—shows how this
composability allows generators to build complex sequences from simpler ones,
enhancing modularity and reusability.

## Error Handling

Generators can handle errors using throw. This example shows
error handling in a generator.

error_handling.ts
  

function* errorGenerator() {
    try {
        yield 1;
        yield 2;
    } catch (error) {
        yield `Error: ${error}`;
    }
}

const errorGen = errorGenerator();
console.log(errorGen.next().value); // Output: 1
console.log(errorGen.throw("Something went wrong").value); // Output: Error: Something went wrong

The errorGenerator wraps its yields in a try-catch
block to manage errors. The first next yields 1 normally. Then,
throw("Something went wrong") injects an error at the point of the
last yield, which is caught by the catch block,
yielding a formatted error message instead of crashing. 

Subsequent next calls would indicate the generator is done. This
example illustrates how throw enables external error signaling,
and the try-catch ensures robust error handling, making generators
resilient to interruptions while maintaining their iterative flow.

## Returning from Generators

Generators can return a final value using return. This example
demonstrates returning a value.

return_generator.ts
  

function* returnGenerator() {
    yield 1;
    yield 2;
    return "Done";
}

const returnGen = returnGenerator();
console.log(returnGen.next().value); // Output: 1
console.log(returnGen.next().value); // Output: 2
console.log(returnGen.next().value); // Output: Done

In returnGenerator, the return "Done" statement
provides a final value and terminates the generator. The first two
next calls yield 1 and 2 via yield, while the third
reaches the return, yielding "Done" with { value: "Done",
done: true } internally (though only the value is logged here). 

Unlike yield, which pauses, return ends the
generator, signaling completion. This example shows how return can
be used to conclude a sequence with a meaningful result, offering a clear
endpoint distinct from the lazy yielding process.

## Async Generators

Async generators combine generators with asynchronous operations. This example
shows an async generator.

async_generator.ts
  

async function* asyncGenerator() {
    yield await Promise.resolve(1);
    yield await Promise.resolve(2);
    yield await Promise.resolve(3);
}

(async () =&gt; {
    const asyncGen = asyncGenerator();
    console.log(await asyncGen.next()); // Output: { value: 1, done: false }
    console.log(await asyncGen.next()); // Output: { value: 2, done: false }
    console.log(await asyncGen.next()); // Output: { value: 3, done: false }
})();

The asyncGenerator uses async function* to define an
async generator, combining yield with await to handle
asynchronous values from Promise.resolve. Each yield
waits for the promise to resolve before pausing and returning the value (1, 2, 3). 

The IIFE (Immediately Invoked Function Expression) with await
on next retrieves each result, logging the full iterator object
({ value, done }). The output shows a sequence of resolved values
with done: false, and a fourth call would return { value:
undefined, done: true }. This demonstrates how async generators manage
asynchronous data streams lazily, ideal for tasks like fetching data
incrementally.

## Generator with Type Annotations

TypeScript allows adding type annotations to generators for better type safety.
This example shows a typed generator.

typed_generator.ts
  

function* numberGenerator(): Generator {
    yield 1;
    yield 2;
    return "Finished";
}

const numGen = numberGenerator();
console.log(numGen.next().value); // Output: 1
console.log(numGen.next().value); // Output: 2
console.log(numGen.next().value); // Output: Finished

The numberGenerator uses a Generator type annotation,
specifying number as the yielded type, string as the
return type, and void as the type of values received by
yield (none here). This ensures TypeScript enforces that
yield produces numbers and return produces a string,
catching type mismatches at compile time. The next calls yield 1
and 2, then return "Finished", matching the annotation. The output confirms the
sequence, showing how type annotations enhance generators with static type
checking, improving code reliability and maintainability.

## Lazy Fibonacci Sequence

Generators are perfect for lazy evaluation of sequences like Fibonacci numbers.
This example generates Fibonacci numbers on demand.

fibonacci_generator.ts
  

function* fibonacci() {
    let a = 0, b = 1;
    while (true) {
        yield a;
        [a, b] = [b, a + b];
    }
}

const fib = fibonacci();
console.log(fib.next().value); // Output: 0
console.log(fib.next().value); // Output: 1
console.log(fib.next().value); // Output: 1
console.log(fib.next().value); // Output: 2

The fibonacci generator creates an infinite Fibonacci sequence
lazily. It initializes a and b as 0 and 1, yielding
a each time and updating the pair using array destructuring to
compute the next number (b, then a + b). Each
next call produces the next Fibonacci number—0, 1, 1, 2, and so
on—without precomputing the entire sequence. The output reflects the first four
values, showcasing how generators efficiently handle complex sequences by
computing values only when requested, conserving memory and enabling infinite
series.

## Generator with Early Termination

Generators can be terminated early using return. This example
demonstrates controlled termination.

early_termination.ts
  

function* countDown(n: number) {
    while (n &gt; 0) {
        yield n;
        n--;
    }
}

const counter = countDown(3);
console.log(counter.next().value); // Output: 3
console.log(counter.return(0).value); // Output: 0
console.log(counter.next().value); // Output: undefined

The countDown generator yields numbers from n down to
1, but return(0) allows early termination. The first
next yields 3, then return(0) stops the generator,
returning 0 with { value: 0, done: true }. Subsequent
next calls yield undefined since the generator is
done. This contrasts with the internal return statement, as
return is an external control mechanism. The output shows how
this method provides flexibility to halt a generator prematurely, useful for
scenarios requiring dynamic control over iteration.

## Best Practices

**Utilize Generators for Lazy Sequences:** Leverage generators
for on-demand value production, especially for large or infinite sequences, to
optimize memory usage.
**Implement Robust Error Handling:** Use try-catch
blocks within generators to gracefully handle errors triggered by
throw or internal logic failures.
**Compose with Yield*:** Employ yield* to delegate
to other generators, promoting modularity and reusability in complex sequence
generation.
**Use Async Generators for Async Data:** Apply async generators
to manage asynchronous operations like API calls or file reads, yielding values
as they resolve.
**Control Infinite Loops:** Design infinite generators with
clear termination conditions (e.g., via return) or limits to
prevent unintended endless iteration.
**Add Type Annotations:** Include TypeScript type annotations
(e.g., Generator) to ensure type safety and improve code
clarity.
**Test Generator States:** Verify generator behavior across all
states—yielding, returning, and done—especially when using next,
throw, or return.

## Source

[TypeScript Generators Documentation](https://www.typescriptlang.org/docs/handbook/iterators-and-generators.html)

This tutorial covered TypeScript generators with practical examples. Use these
patterns to create efficient and maintainable code.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all TypeScript tutorials](/all/#typescript).