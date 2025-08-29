+++
title = "PHP default Keyword"
date = 2025-08-29T20:04:18.598+01:00
draft = false
description = "PHP default keyword tutorial shows how to use the default keyword in switch statements, arrays, and functions with practical examples."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP default Keyword

last modified April 16, 2025

The PHP default keyword serves multiple purposes in different
contexts. Primarily used in switch statements as a fallback case, it also
appears in array destructuring and function parameter declarations.

## Basic Definitions

In switch statements, default specifies code to execute when no
case matches. It's optional but provides a safety net for unexpected values.

For arrays, default can specify fallback values during
destructuring assignments. This prevents undefined index errors when keys
don't exist.

In function parameters, default values make arguments optional.
Callers can omit parameters with defaults, which then use the specified value.

## Basic switch Statement with default

This example demonstrates the most common use of default in a switch statement.

switch_default.php
  

&lt;?php

declare(strict_types=1);

$day = "Tuesday";

switch ($day) {
    case "Monday":
        echo "Start of work week";
        break;
    case "Friday":
        echo "Almost weekend!";
        break;
    default:
        echo "Regular weekday";
}

The switch checks the $day variable against specific cases. When
no case matches, the default block executes. Default acts as a catch-all for
unhandled values. It's conventionally placed last in switch statements.

## default in Array Destructuring

This example shows using default values when destructuring associative arrays.

array_default.php
  

&lt;?php

declare(strict_types=1);

$user = ['name' =&gt; 'John', 'age' =&gt; 30];

['name' =&gt; $name, 'role' =&gt; $role = 'guest'] = $user;

echo "Name: $name, Role: $role";

The code extracts array values into variables. The role key doesn't exist, so
the default 'guest' value is used. This prevents undefined index errors while
providing sensible fallbacks. Defaults work with both indexed and associative
arrays.

## Function Parameter Defaults

This example demonstrates default parameter values in function declarations.

function_default.php
  

&lt;?php

declare(strict_types=1);

function greet(string $name, string $greeting = "Hello") {
    echo "$greeting, $name!";
}

greet("Alice");          // Uses default greeting
greet("Bob", "Hi");      // Overrides default

The greet function makes the $greeting parameter
optional with a default value. Callers can omit it to use "Hello" or specify
a custom greeting. Default parameters must come after required parameters in
the declaration.

## Multiple Default Cases

This example shows how default works with multiple switch cases.

multiple_default.php
  

&lt;?php

declare(strict_types=1);

$score = 75;

switch (true) {
    case $score &gt;= 90:
        echo "Grade: A";
        break;
    case $score &gt;= 80:
        echo "Grade: B";
        break;
    case $score &gt;= 70:
        echo "Grade: C";
        break;
    default:
        echo "Grade: F";
}

The switch evaluates each case conditionally. The default case handles scores
below 70. Only one case executes due to break statements. This pattern is
useful for range-based conditions where if-elseif would be verbose.

## Default in match Expression

This example demonstrates default in PHP 8's match expression.

match_default.php
  

&lt;?php

declare(strict_types=1);

$status = 404;

$message = match($status) {
    200 =&gt; 'OK',
    301 =&gt; 'Moved Permanently',
    404 =&gt; 'Not Found',
    default =&gt; 'Unknown Status'
};

echo $message;

The match expression is a more concise alternative to switch. Its default case
handles any unlisted status codes. Unlike switch, match does strict comparisons
and returns a value. Default is required if not all possible values are covered.

## Default Array Merge

This example shows using default values when merging configuration arrays.

merge_default.php
  

&lt;?php

declare(strict_types=1);

$defaults = ['color' =&gt; 'red', 'size' =&gt; 'medium'];
$userPrefs = ['color' =&gt; 'blue'];

$config = array_merge($defaults, $userPrefs);

print_r($config);

The code merges default values with user preferences. Missing keys in
$userPrefs keep their default values. This pattern is common
for configuration systems. Array union operator (+) can also be used but
behaves differently with numeric keys.

## Default Class Properties

This example demonstrates default property values in class definitions.

class_default.php
  

&lt;?php

declare(strict_types=1);

class Product {
    public string $name = 'Unknown';
    public float $price = 0.0;
    public bool $inStock = false;
}

$product = new Product();
echo "{$product-&gt;name}: \${$product-&gt;price}";

The Product class defines default values for all properties. New instances
start with these defaults unless overridden. Defaults ensure objects always
have valid property values. They're particularly useful for data transfer
objects and configuration classes.

## Best Practices

- **Switch defaults:** Always include a default case in switch statements for robustness.

- **Array safety:** Use default values when destructuring arrays to avoid undefined index errors.

- **Function parameters:** Place parameters with defaults after required ones in function declarations.

- **Documentation:** Clearly document default behaviors in your code comments.

- **Consistency:** Use similar default values across related functions for predictable behavior.

## Source

[PHP switch Documentation](https://www.php.net/manual/en/control-structures.switch.php)

This tutorial covered the PHP default keyword with examples showing its usage
in switch statements, arrays, functions, and class properties.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).