+++
title = "PHP end Function"
date = 2025-08-29T20:05:17.818+01:00
draft = false
description = "PHP end function tutorial shows how to access the last element of an array in PHP. Learn end with practical examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP end Function

last modified March 13, 2025

The PHP end function moves the internal array pointer to the
last element and returns its value. It's useful for accessing array ends.

## Basic Definition

The end function advances the array's internal pointer to the
last element. It returns the value of that element or false if empty.

Syntax: end(array|object &amp;$array): mixed. The function takes
an array parameter by reference. It modifies the internal pointer position.

## Basic end Example

This demonstrates getting the last element of a simple indexed array.

basic_end.php
  

&lt;?php

$fruits = ['apple', 'banana', 'cherry'];
$lastFruit = end($fruits);

echo "The last fruit is: $lastFruit"; 

This code moves the pointer to the end of the array and retrieves 'cherry'.
The original array remains unchanged except for pointer position.

## Associative Array Example

Access the last element in an associative array using end.

associative_end.php
  

&lt;?php

$user = [
    'name' =&gt; 'John',
    'age' =&gt; 34,
    'email' =&gt; 'john@example.com'
];

$lastValue = end($user);

echo "Last user property value: $lastValue"; 

The function returns the value of the last element regardless of its key.
In associative arrays, element order depends on insertion sequence.

## Combined with current()

Show how end affects the internal pointer for subsequent calls.

pointer_position.php
  

&lt;?php

$colors = ['red', 'green', 'blue'];

echo current($colors) . "\n"; 
end($colors);
echo current($colors) . "\n"; 

First current shows the pointer at array start. After end,
current shows the last element, demonstrating pointer movement.

## Empty Array Handling

end returns false for empty arrays, which requires careful handling.

empty_array.php
  

&lt;?php

$empty = [];
$result = end($empty);

if ($result === false) {
    echo "Array is empty or last element is false";
} else {
    echo "Last element: $result";
}

Since false can be a valid array element, use strict comparison (===) to
distinguish between empty arrays and false values.

## Modifying Array After end

Demonstrate how array modifications affect the pointer position.

modify_after_end.php
  

&lt;?php

$numbers = [1, 2, 3];
end($numbers);
array_push($numbers, 4);

echo current($numbers) . "\n"; 
end($numbers);
echo current($numbers) . "\n"; 

After adding an element, the pointer stays at position 3 until end
is called again. This shows pointer persistence through modifications.

## Best Practices

- **Pointer Awareness:** Remember end() changes the internal pointer.

- **Empty Checks:** Always verify return values for empty arrays.

- **Reset Pointer:** Use reset() if you need to traverse again.

- **Alternative Syntax:** Consider $array[count($array)-1] for indexed arrays.

## Source

[PHP end Documentation](https://www.php.net/manual/en/function.end.php)

This tutorial covered the PHP end function with practical
examples showing its usage for accessing array end elements.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).