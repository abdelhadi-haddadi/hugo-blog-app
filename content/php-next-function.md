+++
title = "PHP next Function"
date = 2025-08-29T20:05:21.264+01:00
draft = false
description = "PHP next function tutorial shows how to manipulate array internal pointer in PHP. Learn next with practical examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP next Function

last modified March 13, 2025

The PHP next function advances the internal array pointer of
an array to the next element and returns its value. It's part of PHP's array
pointer manipulation functions.

## Basic Definition

The next function moves the array's internal pointer forward
one element. It returns the value of the next element or false if there
are no more elements.

Syntax: next(array &amp;$array): mixed. The function affects the
array's internal pointer. After reaching the end, it returns false.

## Basic next Example

This demonstrates moving through an array using next after
setting the initial position with reset.

basic_next.php
  

&lt;?php

$colors = ['red', 'green', 'blue'];

// Set pointer to first element
reset($colors);

echo current($colors) . "\n"; 

// Move to next element
echo next($colors) . "\n";    

// Move to next element
echo next($colors) . "\n";    

// Attempt to move past end
var_dump(next($colors));      

This shows basic pointer movement. After reset, we advance through the array
with next, getting each value until false indicates the end.

## Combining with current

Use next with current to traverse an array while
keeping track of the current position.

next_current.php
  

&lt;?php

$fruits = ['apple', 'banana', 'cherry'];

reset($fruits);

while ($fruit = current($fruits)) {
    echo $fruit . "\n";
    next($fruits);
}

// apple
// banana
// cherry

This loops through the array by checking current and advancing
with next. The loop stops when current returns
false at the end.

## Edge Case: Empty Array

next behaves predictably with empty arrays, returning false
immediately.

empty_array.php
  

&lt;?php

$empty = [];

reset($empty);
var_dump(next($empty)); 

With no elements to traverse, next returns false right away.
This behavior is consistent with other pointer functions.

## Modifying Array During Traversal

Changing an array while traversing can lead to unexpected behavior with
pointer functions.

modify_during_traversal.php
  

&lt;?php

$numbers = [1, 2, 3, 4];

reset($numbers);
echo current($numbers) . "\n"; 

next($numbers);
echo current($numbers) . "\n"; 

// Modify array
array_pop($numbers);

next($numbers);
echo current($numbers) . "\n"; 

After removing the last element, the pointer still moves to what was
previously the third element. Array modifications can disrupt expected
pointer behavior.

## Reset After next

After reaching the end with next, you must reset
the pointer to traverse again.

reset_after_next.php
  

&lt;?php

$letters = ['a', 'b', 'c'];

reset($letters);
while ($letter = current($letters)) {
    echo $letter . "\n";
    next($letters);
}

// Pointer now at end
var_dump(current($letters)); // bool(false)

// Reset to traverse again
reset($letters);
echo current($letters) . "\n"; 

This demonstrates that after traversal, the pointer remains at the end until
explicitly reset. Always reset before re-traversing an array with pointer
functions.

## Best Practices

- **Reset First:** Always call reset before traversal.

- **Check Return:** Verify next didn't return false.

- **Avoid Modification:** Don't change arrays during traversal.

- **Alternative Methods:** Consider foreach for simpler iteration.

## Source

[PHP next Documentation](https://www.php.net/manual/en/function.next.php)

This tutorial covered the PHP next function with practical
examples showing array pointer manipulation and traversal techniques.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).