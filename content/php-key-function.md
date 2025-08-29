+++
title = "PHP key() Function"
date = 2025-08-29T20:05:18.937+01:00
draft = false
description = "PHP key function tutorial shows how to get the key of the current array element in PHP. Learn key() with practical examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP key() Function

last modified March 13, 2025

The PHP key function fetches the key of the current array element.
It's part of PHP's array pointer functions, working with the internal pointer.

## Basic Definition

The key function returns the key of the element currently pointed
to by the internal array pointer. It doesn't advance the pointer.

Syntax: key(array $array): mixed. Returns the current key or null
if the pointer is beyond array bounds. Works with both indexed and associative.

## Basic key() Example

This demonstrates getting the current key from a simple associative array.

basic_key.php
  

&lt;?php

$colors = [
    'red' =&gt; '#FF0000',
    'green' =&gt; '#00FF00',
    'blue' =&gt; '#0000FF'
];

$currentKey = key($colors);

echo "Current key: $currentKey"; 

The internal pointer starts at the first element. key returns
'red' as it's the key of the first element. The pointer remains unchanged.

## Using key() in a Loop

Combine key with next to iterate through keys.

key_in_loop.php
  

&lt;?php

$fruits = [
    'apple' =&gt; 'red',
    'banana' =&gt; 'yellow',
    'grape' =&gt; 'purple'
];

while ($key = key($fruits)) {
    echo "Key: $key, Value: {$fruits[$key]}\n";
    next($fruits);
}

This prints all key-value pairs. key gets the current key,
while next advances the pointer. The loop stops when key()
returns null.

## key() with Indexed Arrays

key works with numeric indices just like associative keys.

indexed_array.php
  

&lt;?php

$numbers = [10, 20, 30, 40];

echo "First key: " . key($numbers) . "\n"; 

next($numbers);
echo "Second key: " . key($numbers); 

For indexed arrays, key returns the numeric index. After
next, it moves to the next index (1) in this example.

## key() After Array Modification

Array modifications can affect the internal pointer position.

modified_array.php
  

&lt;?php

$data = [
    'a' =&gt; 1,
    'b' =&gt; 2,
    'c' =&gt; 3
];

next($data); // Move to 'b'
unset($data['b']); // Remove current element

echo "Current key after removal: " . key($data); 

When removing the current element, PHP moves the pointer to the next element.
Here, after removing 'b', the pointer moves to 'c', which key
then returns.

## key() with Empty Arrays

key returns null when used on empty arrays or at array end.

empty_array.php
  

&lt;?php

$empty = [];
$end = ['a', 'b'];

end($end); // Move past last element

var_dump(key($empty)); 
var_dump(key($end));   

For empty arrays or when the pointer is beyond array bounds, key
returns null. This behavior helps detect when iteration should stop.

## Best Practices

- **Reset Pointer:** Use reset before iteration.

- **Check Validity:** Verify return value isn't null.

- **Combine Functions:** Pair with current.

- **Avoid Modification:** Don't modify arrays during iteration.

## Source

[PHP key() Documentation](https://www.php.net/manual/en/function.key.php)

This tutorial covered the PHP key function with practical
examples showing its usage for array key retrieval scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).