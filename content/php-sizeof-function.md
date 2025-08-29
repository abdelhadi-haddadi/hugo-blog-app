+++
title = "PHP sizeof Function"
date = 2025-08-29T20:05:23.552+01:00
draft = false
description = "PHP sizeof function tutorial shows how to get array size in PHP. Learn sizeof with practical examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP sizeof Function

last modified March 13, 2025

The PHP sizeof function returns the number of elements in an
array. It's an alias of count and works identically.

## Basic Definition

The sizeof function counts all elements in an array or countable
object. It returns the number of elements as an integer.

Syntax: sizeof(array|Countable $value, int $mode = COUNT_NORMAL): int.
The optional mode parameter can be COUNT_RECURSIVE for multidimensional arrays.

## Basic sizeof Example

This demonstrates counting elements in a simple indexed array.

basic_sizeof.php
  

&lt;?php

$fruits = ['apple', 'banana', 'orange'];
$count = sizeof($fruits);

echo "The array contains $count fruits"; 

This counts the elements in the $fruits array. The function
returns 3, which matches the number of elements in the array.

## Associative Array Size

sizeof works with associative arrays the same way as with indexed
arrays.

associative_array.php
  

&lt;?php

$user = [
    'name' =&gt; 'John Doe',
    'email' =&gt; 'john@example.com',
    'age' =&gt; 30
];

$fieldCount = sizeof($user);

echo "User has $fieldCount fields"; 

This counts the key-value pairs in an associative array. The function returns
3 regardless of whether the array is indexed or associative.

## Multidimensional Array Counting

Using COUNT_RECURSIVE mode counts all elements in nested arrays.

multidimensional_array.php
  

&lt;?php

$matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

$normalCount = sizeof($matrix);
$recursiveCount = sizeof($matrix, COUNT_RECURSIVE);

echo "Normal count: $normalCount\n"; 
echo "Recursive count: $recursiveCount"; 

Normal mode counts only the top-level arrays (3). Recursive mode counts all
elements including nested ones (9 numbers + 3 arrays = 12).

## Empty Array Behavior

sizeof returns 0 for empty arrays, which is useful for checking.

empty_array.php
  

&lt;?php

$emptyArray = [];
$count = sizeof($emptyArray);

if ($count === 0) {
    echo "The array is empty"; 
}

This demonstrates that sizeof correctly identifies empty arrays
by returning 0. This is helpful for validation checks in code.

## Counting Objects

sizeof can count objects that implement the Countable interface.

countable_object.php
  

&lt;?php

class Cart implements Countable {
    private $items = [];
    
    public function add($item) {
        $this-&gt;items[] = $item;
    }
    
    public function count(): int {
        return sizeof($this-&gt;items);
    }
}

$cart = new Cart();
$cart-&gt;add('Product 1');
$cart-&gt;add('Product 2');

echo "Cart has " . sizeof($cart) . " items"; 

This shows sizeof working with a Countable object. The Cart class
implements the interface and provides its own counting logic.

## Best Practices

- **Consistency:** Prefer count for readability.

- **Performance:** Both sizeof and count are O(1).

- **Type Safety:** Check is_countable() before counting.

- **Empty Checks:** Use empty() when just checking for emptiness.

## Source

[PHP sizeof Documentation](https://www.php.net/manual/en/function.sizeof.php)

This tutorial covered the PHP sizeof function with practical
examples showing its usage for counting array elements in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).