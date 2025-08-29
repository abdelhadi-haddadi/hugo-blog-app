+++
title = "PHP unset Keyword"
date = 2025-08-29T20:04:49.811+01:00
draft = false
description = "PHP unset tutorial shows how to use the unset keyword in PHP. Learn variable management with practical examples."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP unset Keyword

last modified April 16, 2025

The PHP unset keyword is used to destroy variables and free up
memory. It can remove single variables, array elements, or object properties.
Proper use of unset helps manage memory efficiently in PHP applications.

## Basic Definitions

The unset construct removes the specified variable from the current
scope. After unsetting, the variable becomes undefined. Attempting to use it
will trigger a notice unless checked with isset().

Unset affects different variable types differently. For local variables, it
removes them immediately. For global variables, it removes them only from the
current scope.

Syntax: unset($var1, $var2, ...). Multiple variables can be
unset in one statement. The function returns no value and works by reference.

## Basic Variable Unset

This example demonstrates the simplest use of unset with a single variable.

basic_unset.php
  

&lt;?php

declare(strict_types=1);

$name = "John Doe";
echo "Before unset: $name\n";

unset($name);

// This will cause a notice
echo "After unset: $name";

The code creates a variable, prints it, then unsets it. The second echo will
trigger a notice as $name no longer exists. Unset completely removes the
variable from memory.

## Unsetting Array Elements

This example shows how to remove specific elements from an array using unset.

array_unset.php
  

&lt;?php

declare(strict_types=1);

$colors = ['red', 'green', 'blue', 'yellow'];
print_r($colors);

unset($colors[1]); // Remove 'green'
print_r($colors);

// Note: array keys are preserved

The code removes the second element (index 1) from the array. Unlike array_splice,
unset doesn't reindex the array. The original keys remain, creating a "gap".

## Unsetting Multiple Variables

This example demonstrates unsetting several variables in one statement.

multiple_unset.php
  

&lt;?php

declare(strict_types=1);

$var1 = "test";
$var2 = 42;
$var3 = [1, 2, 3];

unset($var1, $var2, $var3);

var_dump(isset($var1)); // bool(false)
var_dump(isset($var2)); // bool(false)
var_dump(isset($var3)); // bool(false)

The code unsets three different variables simultaneously. The isset checks
confirm all variables were successfully removed. This is more efficient than
multiple unset calls.

## Unsetting Object Properties

This example shows how to remove properties from an object instance.

object_unset.php
  

&lt;?php

declare(strict_types=1);

class User {
    public $name = 'John';
    public $age = 30;
}

$user = new User();
var_dump($user);

unset($user-&gt;age);
var_dump($user);

The code creates a User object then removes its age property. The second var_dump
shows the object without the age field. Note this only affects this instance,
not the class definition.

## Global vs Local Scope

This example demonstrates how unset behaves differently in various scopes.

scope_unset.php
  

&lt;?php

declare(strict_types=1);

$globalVar = "I'm global";

function testUnset() {
    global $globalVar;
    $localVar = "I'm local";
    
    unset($globalVar); // Only removes from function scope
    unset($localVar);  // Completely removes local var
}

testUnset();
echo $globalVar; // Still exists

The code shows that unsetting a global variable inside a function only removes
it from that scope. The variable remains accessible outside. Local variables
are completely destroyed when unset.

## Unset in Foreach Loops

This example demonstrates using unset to free memory during array iteration.

foreach_unset.php
  

&lt;?php

declare(strict_types=1);

$largeArray = range(1, 100000);

foreach ($largeArray as $key =&gt; $value) {
    // Process value
    processValue($value);
    
    // Free memory
    unset($largeArray[$key]);
}

function processValue($val) {
    // Some processing
}

The code processes a large array and unsets each element after use. This
technique helps manage memory with large datasets. The array shrinks as
elements are processed and removed.

## Unset vs Null

This example compares unset with setting a variable to null.

unset_vs_null.php
  

&lt;?php

declare(strict_types=1);

$var1 = "test";
$var2 = "test";

unset($var1);
$var2 = null;

var_dump(isset($var1)); // bool(false)
var_dump(isset($var2)); // bool(false)
var_dump(is_null($var2)); // bool(true)

Both approaches make isset return false, but differ in memory impact. Unset
completely removes the variable, while null assigns a value. Null is better
when the variable needs to exist but be empty.

## Best Practices

- **Memory Management:** Use unset for large variables no longer needed.

- **Arrays:** Remember unset preserves array keys; use array_values to reindex.

- **Objects:** Unset object properties carefully as it may affect functionality.

- **Session Data:** Often used to remove specific session variables.

- **Performance:** Don't overuse - PHP's garbage collector handles most cleanup.

## Source

[PHP unset Documentation](https://www.php.net/manual/en/function.unset.php)

This tutorial covered PHP's unset keyword with practical examples showing its
usage with variables, arrays, objects, and in different scopes.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).