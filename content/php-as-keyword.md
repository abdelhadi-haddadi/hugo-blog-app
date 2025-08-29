+++
title = "PHP as Keyword"
date = 2025-08-29T20:04:10.243+01:00
draft = false
description = "PHP as keyword tutorial shows how to use aliasing in PHP. Learn foreach loops and namespace aliasing with practical examples."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP as Keyword

last modified April 16, 2025

The PHP as keyword has two primary uses: in foreach loops to
assign array elements to variables, and in namespace aliasing to create
shorter names for classes. This tutorial covers both uses with practical
examples.

## Basic Definitions

In foreach loops, as assigns the current element to a variable
during iteration. The syntax is foreach ($array as $value) or
foreach ($array as $key =&gt; $value) for key-value pairs.

For namespaces, as creates an alias for a class or namespace.
The syntax is use Namespace\Class as Alias. This helps avoid
name conflicts and makes code cleaner.

The as keyword is also used in try-catch blocks to assign
exceptions to variables, though this is less common than the other uses.

## Basic foreach with as

This example demonstrates the simplest use of as in a foreach loop.

basic_foreach.php
  

&lt;?php

declare(strict_types=1);

$colors = ['red', 'green', 'blue'];

foreach ($colors as $color) {
    echo $color . "\n";
}

The code iterates through the $colors array. Each element is
assigned to $color via the as keyword. The loop
body then uses this variable. This is the most common foreach pattern.

## foreach with Key-Value Pairs

This example shows how to access both keys and values using as.

key_value_foreach.php
  

&lt;?php

declare(strict_types=1);

$user = [
    'name' =&gt; 'John',
    'age' =&gt; 25,
    'city' =&gt; 'New York'
];

foreach ($user as $key =&gt; $value) {
    echo "$key: $value\n";
}

The code loops through an associative array. The as keyword
assigns both key and value to variables. This syntax is essential for
working with key-value data structures like configuration arrays.

## Namespace Aliasing with as

This example demonstrates creating shorter names for classes using as.

namespace_alias.php
  

&lt;?php

declare(strict_types=1);

namespace MyApp\Services;

class LongClassName {
    public function greet() {
        echo "Hello from LongClassName!\n";
    }
}

// In another file:
use MyApp\Services\LongClassName as LCN;

$obj = new LCN();
$obj-&gt;greet();

The code defines a class with a long name. The use statement
with as creates a shorter alias. This makes the code cleaner
and easier to maintain, especially with long namespace paths.

## Aliasing in Group Use Declarations

This example shows how to alias multiple classes in a group use statement.

group_use_alias.php
  

&lt;?php

declare(strict_types=1);

namespace Vendor\Package;

class FirstClass {}
class SecondClass {}

// In another file:
use Vendor\Package\{
    FirstClass as FC,
    SecondClass as SC
};

$first = new FC();
$second = new SC();

The code demonstrates PHP 7+ group use syntax with aliasing. Multiple classes
can be imported and aliased in one statement. This is useful when working
with many classes from the same namespace.

## Exception Handling with as

This example shows the less common use of as in try-catch blocks.

exception_as.php
  

&lt;?php

declare(strict_types=1);

try {
    $result = 10 / 0;
} catch (DivisionByZeroError as $e) {
    echo "Caught exception: " . $e-&gt;getMessage() . "\n";
}

The code catches a division by zero error. The as keyword assigns
the exception object to $e. This allows accessing exception
methods and properties. While less common, this is valid PHP syntax.

## Iterating Objects with foreach

This example demonstrates using as to iterate over object properties.

object_iteration.php
  

&lt;?php

declare(strict_types=1);

class User {
    public $name = 'John';
    public $age = 30;
    private $id = 12345;
}

$user = new User();

foreach ($user as $property =&gt; $value) {
    echo "$property: $value\n";
}

The code loops through a User object's public properties. The as
keyword assigns each property name and value to variables. Note that private
properties are not accessible in this way by default.

## Using as with Array References

This example shows how to modify array elements directly using references.

reference_foreach.php
  

&lt;?php

declare(strict_types=1);

$numbers = [1, 2, 3, 4];

foreach ($numbers as &amp;$number) {
    $number *= 2;
}

print_r($numbers);

The code doubles each value in the array. The &amp; before $number
makes it a reference to the actual array element. Changes to $number
affect the original array. This is a powerful but potentially dangerous feature.

## Best Practices

- **Readability:** Use clear, meaningful names after as in foreach loops.

- **Namespace Aliases:** Keep aliases short but descriptive.

- **References:** Use references sparingly and document them well.

- **Exception Handling:** Always type hint exceptions in catch blocks.

- **Group Use:** Prefer group use statements for cleaner imports.

## Source

[PHP foreach Documentation](https://www.php.net/manual/en/control-structures.foreach.php)

This tutorial covered the PHP as keyword with practical examples showing
foreach iteration, namespace aliasing, and exception handling scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).