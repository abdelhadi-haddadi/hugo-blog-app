+++
title = "PHP yield Keyword"
date = 2025-08-29T20:04:53.339+01:00
draft = false
description = "PHP yield tutorial shows how to use generators with the yield keyword in PHP. Learn generators with practical examples."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP yield Keyword

last modified April 16, 2025

The PHP yield keyword creates generator functions that can
pause execution and return values one at a time. Generators provide
memory-efficient iteration over large datasets without building arrays.
They're powerful for working with sequences and streams of data.

## Basic Definitions

A generator function is a special kind of function that uses yield
instead of return. When called, it returns a Generator object
that can be iterated over. Each iteration resumes execution after the last
yield.

The yield keyword both provides a value to the iterator and
pauses function execution. Execution resumes when the next value is requested.
This enables memory-efficient processing of large datasets.

Generators implement the Iterator interface, so they work with foreach loops.
They maintain their state between yields, including local variable values.
Generators can both yield and receive values during iteration.

## Basic Generator Function

This example demonstrates a simple generator function that yields three values.

basic_generator.php
  

&lt;?php

declare(strict_types=1);

function numberGenerator() {
    yield 1;
    yield 2;
    yield 3;
}

foreach (numberGenerator() as $number) {
    echo $number . "\n";
}

The numberGenerator function yields three numbers sequentially.
When called, it returns a Generator object that can be iterated over. Each
yield pauses execution until the next iteration. The foreach loop consumes
the values one by one.

## Generating a Range

This example shows how to create a memory-efficient range generator.

range_generator.php
  

&lt;?php

declare(strict_types=1);

function xrange($start, $limit, $step = 1) {
    for ($i = $start; $i &lt;= $limit; $i += $step) {
        yield $i;
    }
}

foreach (xrange(1, 1000000) as $number) {
    echo $number . "\n";
}

The xrange generator produces numbers from start to limit without
creating an array. It uses constant memory regardless of range size. This
contrasts with range() which builds an entire array in memory. Generators
excel at large sequences.

## Yielding Key-Value Pairs

This example demonstrates yielding associative key-value pairs from a generator.

key_value_generator.php
  

&lt;?php

declare(strict_types=1);

function userGenerator() {
    yield 'id' =&gt; 1;
    yield 'name' =&gt; 'John Doe';
    yield 'email' =&gt; 'john@example.com';
}

foreach (userGenerator() as $key =&gt; $value) {
    echo "$key: $value\n";
}

The generator yields key-value pairs that can be consumed in a foreach loop.
This syntax resembles array iteration. Each yield provides both key and value.
Generators can simulate associative arrays without storing all elements.

## Receiving Values

This example shows how generators can receive values during iteration.

receiving_generator.php
  

&lt;?php

declare(strict_types=1);

function echoingGenerator() {
    echo "Generator started\n";
    $input = yield;
    echo "Received: $input\n";
    $input = yield;
    echo "Received: $input\n";
}

$gen = echoingGenerator();
$gen-&gt;send('First');
$gen-&gt;send('Second');

The generator starts when first called. The send method provides
values to the generator. Each send resumes execution until the next yield.
Values become the result of yield expressions. This enables two-way communication.

## Memory Efficiency

This example compares memory usage between array and generator approaches.

memory_comparison.php
  

&lt;?php

declare(strict_types=1);

function generateLines($file) {
    $handle = fopen($file, 'r');
    while (!feof($handle)) {
        yield fgets($handle);
    }
    fclose($handle);
}

// Array approach would load entire file into memory
foreach (generateLines('large_file.txt') as $line) {
    // Process each line
}

The generator reads one line at a time, using minimal memory. An array approach
would load the entire file at once. Generators are ideal for large datasets.
Memory usage remains constant regardless of input size. This enables processing
files larger than available memory.

## Infinite Sequences

This example demonstrates creating an infinite sequence with a generator.

infinite_generator.php
  

&lt;?php

declare(strict_types=1);

function fibonacci() {
    $a = 0;
    $b = 1;
    while (true) {
        yield $a;
        [$a, $b] = [$b, $a + $b];
    }
}

$count = 0;
foreach (fibonacci() as $number) {
    echo $number . "\n";
    if (++$count &gt; 10) break;
}

The Fibonacci generator creates an infinite sequence without memory issues.
The while(true) loop would be dangerous with arrays but safe with yield.
Consumers control when to stop iteration. This pattern is useful for
mathematical sequences and streams.

## Generator Delegation

This example shows how to delegate to another generator using yield from.

delegation_generator.php
  

&lt;?php

declare(strict_types=1);

function countToThree() {
    yield 1;
    yield 2;
    yield 3;
}

function countToFive() {
    yield from countToThree();
    yield 4;
    yield 5;
}

foreach (countToFive() as $number) {
    echo $number . "\n";
}

The yield from syntax delegates to another generator. Values from
the inner generator are yielded directly to the caller. This enables generator
composition and code reuse. Execution returns to the outer generator after
delegation completes.

## Best Practices

- **Memory:** Use generators for large datasets to save memory.

- **Performance:** Generators are fast for single-pass iteration.

- **Reusability:** Generator results can't be rewound or reused.

- **Clarity:** Document generator behavior for other developers.

- **Compatibility:** Works with all PHP iteration constructs.

## Source

[PHP Generators Documentation](https://www.php.net/manual/en/language.generators.overview.php)

This tutorial covered PHP generators with practical examples showing yield
usage for memory-efficient iteration, infinite sequences, and data processing.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).