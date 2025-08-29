+++
title = "PHP iterable Keyword"
date = 2025-08-29T20:04:29.901+01:00
draft = false
description = "PHP iterable tutorial shows how to use the iterable pseudo-type in PHP. Learn iterables with practical examples."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP iterable Keyword

last modified April 16, 2025

The PHP iterable pseudo-type was introduced in PHP 7.1. It acts
as a type hint for values that can be iterated with foreach. The iterable type
accepts both arrays and objects implementing Traversable.

## Basic Definitions

An iterable is a built-in pseudo-type in PHP that represents
either an array or a Traversable object. It's used in parameter and return
type declarations.

The iterable type was created to simplify working with different
iterable structures. Before PHP 7.1, you had to use array or Traversable
separately.

Syntax: function foo(iterable $iterable) {} or
function bar(): iterable {}. The iterable type can be used
anywhere type hints are accepted.

## Basic iterable Parameter

This example shows a function accepting an iterable parameter.

basic_iterable.php
  

&lt;?php

declare(strict_types=1);

function printIterable(iterable $iterable): void {
    foreach ($iterable as $item) {
        echo $item . " ";
    }
}

$array = [1, 2, 3];
printIterable($array);

The printIterable function accepts any iterable value. We pass
an array which is automatically valid. The function then iterates through
each item using foreach. This demonstrates basic iterable type usage.

## iterable Return Type

This example demonstrates a function returning an iterable value.

iterable_return.php
  

&lt;?php

declare(strict_types=1);

function getIterable(): iterable {
    return ['a', 'b', 'c'];
}

$letters = getIterable();
foreach ($letters as $letter) {
    echo $letter . " ";
}

The getIterable function declares it will return an iterable.
It returns an array which satisfies the return type. The calling code can
then iterate over the returned value. This shows iterable in return position.

## Generator as iterable

This example shows how generators can be used with iterable type.

generator_iterable.php
  

&lt;?php

declare(strict_types=1);

function getGenerator(): iterable {
    yield 'apple';
    yield 'banana';
    yield 'cherry';
}

$fruits = getGenerator();
foreach ($fruits as $fruit) {
    echo $fruit . " ";
}

Generators implement the Traversable interface, making them valid iterables.
The getGenerator function yields values instead of returning an
array. The calling code treats the generator like any other iterable. This
shows iterable's flexibility with different data sources.

## Type Checking iterable

This example demonstrates checking if a variable is iterable.

is_iterable.php
  

&lt;?php

declare(strict_types=1);

function checkIterable($value): void {
    if (is_iterable($value)) {
        echo "Value is iterable";
    } else {
        echo "Value is not iterable";
    }
}

$array = [1, 2, 3];
$object = new stdClass();

checkIterable($array);
checkIterable($object);

The is_iterable function checks if a value can be iterated over.
Arrays pass this check while plain objects don't. This is useful for runtime
type validation. The function helps ensure values are usable in foreach loops.

## iterable with Iterator

This example shows a custom iterator class used as iterable.

iterator_iterable.php
  

&lt;?php

declare(strict_types=1);

class NumberIterator implements Iterator {
    private $numbers = [10, 20, 30];
    private $position = 0;

    public function current() { return $this-&gt;numbers[$this-&gt;position]; }
    public function key() { return $this-&gt;position; }
    public function next(): void { $this-&gt;position++; }
    public function rewind(): void { $this-&gt;position = 0; }
    public function valid(): bool { return isset($this-&gt;numbers[$this-&gt;position]); }
}

function printNumbers(iterable $numbers): void {
    foreach ($numbers as $number) {
        echo $number . " ";
    }
}

$iterator = new NumberIterator();
printNumbers($iterator);

The NumberIterator class implements the Iterator interface. This
makes it valid for use as an iterable. The printNumbers function
accepts any iterable, including our custom iterator. This demonstrates how
iterable works with custom traversal logic.

## iterable in Class Methods

This example shows iterable used in class method signatures.

class_iterable.php
  

&lt;?php

declare(strict_types=1);

class DataProcessor {
    private iterable $data;

    public function setData(iterable $data): void {
        $this-&gt;data = $data;
    }

    public function process(): void {
        foreach ($this-&gt;data as $item) {
            echo "Processing: " . $item . "\n";
        }
    }
}

$processor = new DataProcessor();
$processor-&gt;setData(['x', 'y', 'z']);
$processor-&gt;process();

The DataProcessor class uses iterable in multiple ways. The
setData method accepts an iterable parameter. The class property
is also typed as iterable. This shows iterable's usage in object-oriented
contexts. The type safety helps ensure correct data usage throughout.

## iterable with Variadic Functions

This example demonstrates using iterable with variadic parameters.

variadic_iterable.php
  

&lt;?php

declare(strict_types=1);

function mergeIterables(iterable ...$iterables): iterable {
    $result = [];
    foreach ($iterables as $iterable) {
        foreach ($iterable as $item) {
            $result[] = $item;
        }
    }
    return $result;
}

$merged = mergeIterables([1, 2], new ArrayIterator([3, 4]), ['a', 'b']);
print_r($merged);

The mergeIterables function accepts multiple iterables as
variadic parameters. It combines all elements into a single array. The
function demonstrates iterable's flexibility with different input types.
Variadic parameters with iterable allow processing multiple collections.

## Best Practices

- **Type Safety:** Use iterable for parameters that accept multiple collection types.

- **Documentation:** Clearly document expected element types in iterables.

- **Performance:** Be aware generators can only be traversed once.

- **Flexibility:** Prefer iterable over array when Traversable objects might be used.

- **Validation:** Use is_iterable() for runtime checks when type hints aren't available.

## Source

[PHP iterable Documentation](https://www.php.net/manual/en/language.types.iterable.php)

This tutorial covered PHP's iterable pseudo-type with practical examples
showing parameter, return, and property usage with different iterable types.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).