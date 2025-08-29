+++
title = "PHP count Function"
date = 2025-08-29T20:05:16.729+01:00
draft = false
description = "PHP count function tutorial shows how to count array elements in PHP. Learn count() with practical examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP count Function

last modified March 13, 2025

The PHP count function counts all elements in an array or
properties in an object. It's essential for working with collections.

## Basic Definition

The count function returns the number of elements in an array.
It can also count public properties of an object when used with COUNT_NORMAL.

Syntax: count(Countable|array $value, int $mode = COUNT_NORMAL): int.
The mode parameter can be COUNT_RECURSIVE for multidimensional arrays.

## Basic count Example

This shows how to count elements in a simple array using the count function.

basic_count.php
  

&lt;?php

$fruits = ['apple', 'banana', 'orange', 'grape'];
$count = count($fruits);

echo "There are $count fruits in the basket."; 

This counts the elements in the $fruits array. The function returns 4,
which we display in a formatted string.

## Counting Multidimensional Arrays

Demonstrates counting elements in a multidimensional array with COUNT_RECURSIVE.

multidimensional_count.php
  

&lt;?php

$matrix = [
    ['a', 'b', 'c'],
    ['d', 'e'],
    ['f', 'g', 'h', 'i']
];

$normalCount = count($matrix);
$recursiveCount = count($matrix, COUNT_RECURSIVE);

echo "Normal count: $normalCount\n"; 
echo "Recursive count: $recursiveCount"; 

COUNT_NORMAL counts only top-level elements (3). COUNT_RECURSIVE counts all
elements at all levels (9 total). The second level counts are included.

## Counting Object Properties

Shows how count behaves when used with objects and their properties.

object_count.php
  

&lt;?php

class User {
    public $name;
    public $email;
    private $password;
    
    public function __construct($name, $email) {
        $this-&gt;name = $name;
        $this-&gt;email = $email;
        $this-&gt;password = bin2hex(random_bytes(8));
    }
}

$user = new User('John Doe', 'john@example.com');
$count = count($user);

echo "Public properties: $count"; 

Count only sees public properties (name and email). Private properties like
password are not counted. The result is 2 public properties.

## Empty Array Behavior

Demonstrates how count handles empty arrays and non-countable values.

empty_count.php
  

&lt;?php

$emptyArray = [];
$count = count($emptyArray);

echo "Empty array count: $count\n"; 

$nullValue = null;
$count = count($nullValue);

echo "Null count: $count"; 

Empty arrays return 0. Non-countable values like null also return 0. For
scalars, count returns 1 unless the value is null.

## Counting with SPL Countable

Shows how count works with objects implementing the Countable interface.

countable_interface.php
  

&lt;?php

class BookCollection implements Countable {
    private $books = [];
    
    public function add($book) {
        $this-&gt;books[] = $book;
    }
    
    public function count(): int {
        return count($this-&gt;books);
    }
}

$library = new BookCollection();
$library-&gt;add('PHP Guide');
$library-&gt;add('JavaScript Basics');
$library-&gt;add('Python Cookbook');

echo "Books in collection: " . count($library); 

Objects implementing Countable can define their own counting logic. Here,
count() uses the object's count() method. The result reflects the internal
array size.

## Best Practices

- **Type Checking:** Verify countable types before counting.

- **Performance:** Avoid COUNT_RECURSIVE on large arrays.

- **Objects:** Implement Countable for custom collections.

- **Null Safety:** Remember null returns 0, not an error.

## Source

[PHP Count Documentation](https://www.php.net/manual/en/function.count.php)

This tutorial covered the PHP count function with practical
examples showing its usage for counting array elements and object properties.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).