+++
title = "PHP mixed keyword"
date = 2025-08-29T20:04:32.467+01:00
draft = false
description = "PHP mixed keyword tutorial shows how to use mixed type in PHP. Learn mixed type with practical examples."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP mixed keyword

last modified April 16, 2025

The PHP mixed keyword is a pseudo-type that indicates a parameter
or return value can accept multiple different types. It was introduced in PHP
8.0 as part of the type system improvements. The mixed type is equivalent to
not having any type declaration at all.

## Basic Definitions

The mixed type means a value can be any PHP type: array, bool,
callable, int, float, null, object, resource, string. It explicitly documents
that the value can be of any type. This is useful for functions that handle
various input types.

Unlike union types, mixed doesn't require listing all possible types. It's a
catch-all that includes every possible type. When used as a return type, it
indicates the function can return any type of value.

Syntax: function example(mixed $param): mixed {}. The mixed type
can be used for parameters, return types, and properties (PHP 8.0+).

## Basic mixed parameter

This example shows a function accepting a mixed parameter and handling it.

basic_mixed.php
  

&lt;?php

declare(strict_types=1);

function processValue(mixed $value): void {
    if (is_int($value)) {
        echo "Integer: " . ($value * 2);
    } elseif (is_string($value)) {
        echo "String: " . strtoupper($value);
    } else {
        echo "Other type: " . gettype($value);
    }
}

processValue(10);      // Integer: 20
processValue("hello"); // String: HELLO
processValue(true);    // Other type: boolean

The processValue function accepts any type of parameter. Inside,
we check the type and handle it appropriately. This pattern is common when
working with mixed types. Type checking functions like is_int are
essential.

## Mixed return type

This example demonstrates a function that can return different types of values.

mixed_return.php
  

&lt;?php

declare(strict_types=1);

function getConfigValue(string $key): mixed {
    $config = [
        'timeout' =&gt; 30,
        'debug' =&gt; true,
        'name' =&gt; 'App'
    ];

    return $config[$key] ?? null;
}

$timeout = getConfigValue('timeout'); // int(30)
$debug = getConfigValue('debug');    // bool(true)
$name = getConfigValue('name');      // string(3) "App"

The getConfigValue function returns different types based on the
configuration key. The mixed return type accurately documents this behavior.
Without mixed, we'd need a union type or no return type declaration. This is
cleaner than using ? for nullable returns.

## Mixed with type checking

This example shows proper type checking when working with mixed values.

type_checking.php
  

&lt;?php

declare(strict_types=1);

function calculate(mixed $a, mixed $b): float {
    if (!is_numeric($a) || !is_numeric($b)) {
        throw new InvalidArgumentException('Non-numeric value provided');
    }

    return (float)$a + (float)$b;
}

echo calculate(10, 5.5);    // 15.5
echo calculate("3", "2.5"); // 5.5
// calculate("foo", 5);    // Throws exception

The function accepts mixed parameters but requires them to be numeric. We use
is_numeric to verify this before calculation. This demonstrates
defensive programming with mixed types. The function still maintains clear
expectations despite accepting any input type.

## Mixed in class properties

This example shows using mixed type for class properties in PHP 8.0+.

mixed_property.php
  

&lt;?php

declare(strict_types=1);

class UserSettings {
    public mixed $theme = 'light';
    public mixed $lastLogin;
    
    public function setPreference(mixed $value): void {
        $this-&gt;theme = $value;
    }
    
    public function getTheme(): mixed {
        return $this-&gt;theme;
    }
}

$settings = new UserSettings();
$settings-&gt;setPreference('dark');
$settings-&gt;lastLogin = new DateTime();

var_dump($settings-&gt;getTheme());    // string(4) "dark"
var_dump($settings-&gt;lastLogin);     // DateTime object

The class uses mixed type for properties and methods. This allows flexible
storage of different value types. The $theme property starts as
a string but could change type. Mixed properties should be used judiciously
to maintain code clarity.

## Mixed with array functions

This example demonstrates handling mixed values in array operations.

array_functions.php
  

&lt;?php

declare(strict_types=1);

function processArray(array $data): array {
    return array_map(function(mixed $item): mixed {
        if (is_string($item)) {
            return trim($item);
        } elseif (is_int($item)) {
            return $item * 2;
        }
        return $item;
    }, $data);
}

$result = processArray([10, " hello ", true, 3.5]);
// [20, "hello", true, 3.5]

The processArray function applies different transformations based
on each element's type. The callback uses mixed for its parameter and return
type. This pattern is common when processing heterogeneous arrays. Each array
element maintains its original type unless transformed.

## Mixed in union types

This example shows how mixed interacts with other types in union types.

union_types.php
  

&lt;?php

declare(strict_types=1);

function example(string|mixed $param): void {
    // mixed includes string, so this is redundant
    echo $param;
}

function betterExample(mixed $param): void {
    if ($param instanceof DateTimeInterface) {
        echo $param-&gt;format('Y-m-d');
    } else {
        echo $param;
    }
}

example("test");       // works
betterExample(new DateTime()); // outputs current date

The first function shows redundant mixing of mixed with other types. Since
mixed includes all types, union types with mixed are unnecessary. The second
function demonstrates proper use of mixed with type checking. Instanceof checks
are useful when working with objects in mixed parameters.

## Mixed with null

This example explores the relationship between mixed and null values.

mixed_null.php
  

&lt;?php

declare(strict_types=1);

function handleNull(mixed $input): string {
    if ($input === null) {
        return 'NULL value';
    }
    
    return gettype($input) . ': ' . (string)$input;
}

echo handleNull(null);         // NULL value
echo handleNull(42);          // integer: 42
echo handleNull("text");      // string: text
echo handleNull(false);       // boolean: 

The function shows that null is a valid mixed value. We explicitly check for
null to handle it differently. Mixed includes null along with all other types.
This differs from some languages where null might be separate. The function
converts non-null values to strings for consistent output.

## Best Practices

- **Documentation:** Clearly document expected values when using mixed.

- **Validation:** Validate mixed inputs early in your functions.

- **Type checks:** Use specific type checks before operations.

- **Alternatives:** Consider union types if only specific types are allowed.

- **Clarity:** Use mixed sparingly to maintain code understandability.

## Source

[PHP mixed Documentation](https://www.php.net/manual/en/language.types.declarations.php#language.types.declarations.mixed)

This tutorial covered PHP's mixed type with practical examples showing its
usage in parameters, return values, properties, and more.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).