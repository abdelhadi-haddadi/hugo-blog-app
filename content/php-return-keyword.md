+++
title = "PHP return Keyword"
date = 2025-08-29T20:04:42.665+01:00
draft = false
description = "PHP return keyword tutorial shows how to use return statements in PHP. Learn return with practical examples."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP return Keyword

last modified April 16, 2025

The PHP return keyword is essential for functions and methods. It
terminates function execution and returns a value to the caller. Without return,
functions would not be able to provide results. This tutorial covers all aspects
of using return in PHP.

## Basic Definitions

The return statement immediately ends function execution. It can
return any valid PHP value including arrays and objects. When return is called,
control returns to the calling code.

Functions without explicit return statements return NULL. Return can appear
anywhere in a function, but typically comes at the end. Multiple return points
are possible but can reduce readability.

Syntax: return expression; or return; for void returns.
The expression can be any valid PHP value or variable. Return type declarations
can enforce specific return types.

## Basic Function Return

This example shows a simple function that returns a calculated value.

basic_return.php
  

&lt;?php

declare(strict_types=1);

function addNumbers(int $a, int $b): int {
    return $a + $b;
}

$result = addNumbers(5, 3);
echo "The sum is: " . $result;

The addNumbers function takes two integers and returns their sum.
The return type is declared as int. The returned value is stored in $result.
This demonstrates the most basic return usage.

## Returning Different Types

This example shows returning different data types from functions.

return_types.php
  

&lt;?php

declare(strict_types=1);

function getUserData(string $type) {
    if ($type === 'name') {
        return 'John Doe';
    } elseif ($type === 'age') {
        return 30;
    } elseif ($type === 'active') {
        return true;
    }
    return null;
}

echo "Name: " . getUserData('name') . "\n";
echo "Age: " . getUserData('age') . "\n";
var_dump(getUserData('invalid'));

The function returns different types based on input. Without strict return types,
PHP allows this flexibility. The final return provides a default null value.
This shows PHP's dynamic typing capabilities.

## Early Return Pattern

This example demonstrates using early returns for validation.

early_return.php
  

&lt;?php

declare(strict_types=1);

function processOrder(array $order): ?string {
    if (empty($order['items'])) {
        return 'Error: No items in order';
    }
    
    if ($order['total'] &lt;= 0) {
        return 'Error: Invalid order total';
    }
    
    // Process valid order
    return null; // No error
}

$result = processOrder(['items' =&gt; [], 'total' =&gt; 0]);
echo $result ?? 'Order processed successfully';

The function checks conditions and returns early if problems are found. This
avoids deep nesting of validation logic. The final return indicates success.
Early returns make code more readable and maintainable.

## Returning Arrays

This example shows returning an array from a function.

return_array.php
  

&lt;?php

declare(strict_types=1);

function getCoordinates(): array {
    return [
        'latitude' =&gt; 40.7128,
        'longitude' =&gt; -74.0060,
        'city' =&gt; 'New York'
    ];
}

$coords = getCoordinates();
echo "Latitude: {$coords['latitude']}, Longitude: {$coords['longitude']}";

The function returns an associative array with multiple values. Arrays are
commonly used to return grouped data. The caller can access array elements
individually. This is useful for returning complex data structures.

## Return Type Declarations

This example demonstrates strict return type declarations.

return_types_declaration.php
  

&lt;?php

declare(strict_types=1);

function divide(float $a, float $b): float {
    if ($b === 0.0) {
        throw new InvalidArgumentException('Cannot divide by zero');
    }
    return $a / $b;
}

try {
    $result = divide(10.0, 2.0);
    echo "Result: " . $result;
} catch (InvalidArgumentException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

The function declares it will return a float value. Attempting to return another
type would cause an error. Type declarations make code more predictable. They
help catch errors during development rather than runtime.

## Returning Objects

This example shows returning an object instance from a function.

return_object.php
  

&lt;?php

declare(strict_types=1);

class User {
    public string $name;
    public int $age;
    
    public function __construct(string $name, int $age) {
        $this-&gt;name = $name;
        $this-&gt;age = $age;
    }
}

function createUser(string $name, int $age): User {
    return new User($name, $age);
}

$user = createUser('Alice', 25);
echo "User: {$user-&gt;name}, Age: {$user-&gt;age}";

The function creates and returns a User object. Object returns allow for complex
data structures with behavior. The caller receives a fully constructed instance.
This pattern is common in object-oriented PHP.

## Returning by Reference

This example demonstrates returning values by reference.

return_reference.php
  

&lt;?php

declare(strict_types=1);

function &amp;getCounter(): int {
    static $counter = 0;
    return $counter;
}

$countRef = &amp;getCounter();
$countRef++;
echo "Counter: " . getCounter(); // Outputs 1

The function returns a reference to a static variable. Modifying the returned
reference affects the original. Reference returns are less common but useful
for specific cases. They require careful use to avoid unexpected behavior.

## Best Practices

- **Consistency:** Use consistent return types when possible.

- **Clarity:** Make return values obvious from function names.

- **Documentation:** Document return types in PHPDoc comments.

- **Validation:** Validate data before returning it.

- **Simplicity:** Avoid complex return structures when possible.

## Source

[PHP return Documentation](https://www.php.net/manual/en/functions.returning-values.php)

This tutorial covered PHP return statements with practical examples showing
various ways to use return in functions and methods.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).