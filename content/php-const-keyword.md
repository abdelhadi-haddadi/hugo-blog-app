+++
title = "PHP const Keyword"
date = 2025-08-29T20:04:16.026+01:00
draft = false
description = "PHP const tutorial shows how to use constants in PHP. Learn constant declaration with practical examples."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP const Keyword

last modified April 16, 2025

The PHP const keyword is used to define constants in PHP. Constants
are immutable values that cannot be changed during script execution. They provide
a way to store fixed values that remain consistent throughout the program.

## Basic Definitions

Constants in PHP are identifiers for simple values. Unlike variables, constants
are automatically global across the entire script. They are case-sensitive by
default, but this can be changed.

The const keyword defines constants at compile time, while
define defines them at runtime. Constants can only contain
scalar values (boolean, integer, float, string) or arrays.

Syntax: const CONSTANT_NAME = value;. Constant names should be
in uppercase by convention. They don't use the $ prefix like variables.

## Basic Constant Declaration

This example demonstrates the simplest way to declare and use a constant.

basic_const.php
  

&lt;?php

declare(strict_types=1);

const PI = 3.14159;

echo "The value of PI is: " . PI;

The code declares a constant named PI with the value 3.14159. Constants are
accessed directly by their name without the $ symbol. The value cannot be
changed after declaration. This is useful for mathematical constants.

## Class Constants

This example shows how to define constants within a class using const.

class_const.php
  

&lt;?php

declare(strict_types=1);

class MathOperations {
    const PI = 3.14159;
    const EULER = 2.71828;
    
    public function getPi() {
        return self::PI;
    }
}

echo "PI value: " . MathOperations::PI . "\n";
echo "Euler's number: " . MathOperations::EULER . "\n";

$math = new MathOperations();
echo "From method: " . $math-&gt;getPi();

The code defines two constants within the MathOperations class. Class constants
are accessed using the scope resolution operator (::). They can also be accessed
from within class methods using self::. Class constants are useful for values
specific to a class.

## Constant Arrays

This example demonstrates using const with array values in PHP.

array_const.php
  

&lt;?php

declare(strict_types=1);

const COLORS = [
    'RED' =&gt; '#FF0000',
    'GREEN' =&gt; '#00FF00',
    'BLUE' =&gt; '#0000FF'
];

echo "Red hex code: " . COLORS['RED'] . "\n";
echo "All colors:\n";
print_r(COLORS);

The code declares a constant array containing color hex codes. Array constants
can be accessed like regular arrays. This is useful for storing fixed sets of
related values. The array cannot be modified after declaration.

## Namespace Constants

This example shows how to define and use constants within namespaces.

namespace_const.php
  

&lt;?php

declare(strict_types=1);

namespace MyApp\Config;

const DB_HOST = 'localhost';
const DB_USER = 'admin';
const DB_PASS = 'secret';

function connect() {
    echo "Connecting to " . DB_HOST . " as " . DB_USER;
}

namespace MyApp;

use const MyApp\Config\DB_HOST;

echo "Database host: " . Config\DB_HOST . "\n";
echo "Using imported constant: " . DB_HOST . "\n";
Config\connect();

The code defines constants within the MyApp\Config namespace. Constants can be
accessed using their fully qualified name or imported with use const. This helps
organize constants in large applications. Namespaced constants prevent naming
collisions.

## Magic Constants

This example demonstrates PHP's built-in magic constants with const.

magic_const.php
  

&lt;?php

declare(strict_types=1);

class MagicDemo {
    public function showInfo() {
        echo "Line: " . __LINE__ . "\n";
        echo "File: " . __FILE__ . "\n";
        echo "Class: " . __CLASS__ . "\n";
        echo "Method: " . __METHOD__ . "\n";
    }
}

const CURRENT_DIR = __DIR__;

echo "Current directory: " . CURRENT_DIR . "\n";
echo "Namespace: " . __NAMESPACE__ . "\n";

$demo = new MagicDemo();
$demo-&gt;showInfo();

The code uses PHP's magic constants which change depending on where they're used.
These constants provide information about the script's execution context. We can
assign them to regular constants for easier use. Magic constants are always
available in PHP.

## Constant Expressions

This example shows how to use expressions in constant declarations.

expression_const.php
  

&lt;?php

declare(strict_types=1);

const SECONDS_IN_MINUTE = 60;
const SECONDS_IN_HOUR = 60 * SECONDS_IN_MINUTE;
const SECONDS_IN_DAY = 24 * SECONDS_IN_HOUR;

function formatDuration(int $seconds) {
    $days = floor($seconds / SECONDS_IN_DAY);
    $remaining = $seconds % SECONDS_IN_DAY;
    
    $hours = floor($remaining / SECONDS_IN_HOUR);
    $remaining %= SECONDS_IN_HOUR;
    
    $minutes = floor($remaining / SECONDS_IN_MINUTE);
    $seconds = $remaining % SECONDS_IN_MINUTE;
    
    return sprintf("%d days, %d hours, %d minutes, %d seconds", 
        $days, $hours, $minutes, $seconds);
}

echo "One day has " . SECONDS_IN_DAY . " seconds\n";
echo formatDuration(123456);

The code demonstrates constant expressions where constants can be defined based
on other constants. This creates a hierarchy of related constants. The
expressions are evaluated at compile time. This is useful for derived values
that shouldn't change.

## Interface Constants

This example shows how to define and use constants in interfaces.

interface_const.php
  

&lt;?php

declare(strict_types=1);

interface HttpStatus {
    const OK = 200;
    const NOT_FOUND = 404;
    const SERVER_ERROR = 500;
}

class Response implements HttpStatus {
    public static function getStatusMessage(int $code): string {
        switch ($code) {
            case self::OK:
                return "OK";
            case self::NOT_FOUND:
                return "Not Found";
            case self::SERVER_ERROR:
                return "Internal Server Error";
            default:
                return "Unknown Status";
        }
    }
}

echo "Status 200: " . Response::getStatusMessage(HttpStatus::OK) . "\n";
echo "Status 404: " . Response::getStatusMessage(HttpStatus::NOT_FOUND);

The code defines an interface with HTTP status code constants. Classes
implementing the interface can access these constants. Interface constants
provide a way to share common values between classes. They help maintain
consistency across implementations.

## Best Practices

- **Naming:** Use uppercase with underscores for constant names.

- **Scope:** Use class constants for values related to a class.

- **Organization:** Group related constants in classes/interfaces.

- **Performance:** Prefer const over define() when possible.

- **Documentation:** Document constants with comments when needed.

## Source

[PHP Constants Documentation](https://www.php.net/manual/en/language.constants.php)

This tutorial covered PHP constants with practical examples showing const usage
in various scenarios including classes, namespaces, and interfaces.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).