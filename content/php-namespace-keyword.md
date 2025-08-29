+++
title = "PHP namespace Keyword"
date = 2025-08-29T20:04:33.574+01:00
draft = false
description = "PHP namespace tutorial shows how to use namespaces in PHP. Learn namespaces with practical examples."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP namespace Keyword

last modified April 16, 2025

The PHP namespace keyword is used to declare a namespace, which
helps organize code and prevent naming collisions. Namespaces are essential
for modern PHP development, especially when using third-party libraries.
They provide a way to group related classes, interfaces, and functions.

## Basic Definitions

A namespace is a container for identifiers (classes, functions, constants).
It helps avoid name collisions between code components. Namespaces follow
a hierarchical structure similar to directories in a filesystem.

The namespace keyword must be the first statement in a PHP file
(except declare). Namespaces can contain sub-namespaces separated by
backslashes (\). Global code resides in the unnamed global namespace.

Syntax: namespace MyProject; or namespace MyProject\Sub;.
Use the use keyword to import namespaces or create aliases.
Namespaces are case-insensitive but should follow case conventions.

## Basic Namespace Declaration

This example demonstrates a simple namespace declaration and usage.

basic_namespace.php
  

&lt;?php

declare(strict_types=1);

namespace MyApp;

class Logger {
    public function log(string $message): void {
        echo $message;
    }
}

$logger = new Logger();
$logger-&gt;log("Hello from namespace!");

The code declares a MyApp namespace containing a Logger class.
The class is referenced without prefix within the same namespace. Outside,
it would be MyApp\Logger. Namespaces help organize code into
logical groups.

## Sub-namespaces

This example shows how to create and use nested namespaces.

sub_namespace.php
  

&lt;?php

declare(strict_types=1);

namespace MyApp\Database;

class Connection {
    public function connect(): void {
        echo "Database connected.";
    }
}

$conn = new Connection();
$conn-&gt;connect();

The code creates a MyApp\Database sub-namespace. The Connection
class resides in this nested namespace. Sub-namespaces help further organize
related components. They mirror directory structures in projects.

## Using Namespaced Code

This example demonstrates how to use classes from other namespaces.

use_namespace.php
  

&lt;?php

declare(strict_types=1);

namespace MyApp;

use MyApp\Database\Connection;

$conn = new Connection();
$conn-&gt;connect();

The use statement imports the Connection class from the Database
sub-namespace. After importing, we can reference the class directly. Without
use, we'd need to use the fully qualified name. This makes code
cleaner and more readable.

## Namespace Aliases

This example shows how to create aliases for namespaced classes.

namespace_alias.php
  

&lt;?php

declare(strict_types=1);

namespace MyApp;

use MyApp\Database\Connection as DBConnection;

$conn = new DBConnection();
$conn-&gt;connect();

The as keyword creates an alias for the Connection class. This is
useful when dealing with long names or name conflicts. Aliases can make code
more concise. They're especially helpful when using multiple libraries.

## Global Namespace Access

This example demonstrates how to access global namespace functions.

global_namespace.php
  

&lt;?php

declare(strict_types=1);

namespace MyApp;

function strlen(string $str): int {
    return \strlen($str) * 2; // Using global strlen
}

echo strlen("test"); // Outputs 8 (4*2)

The backslash prefix accesses the global namespace. Here we override strlen
but still use the original. This prevents naming conflicts with PHP functions.
Global namespace access is explicit with the backslash prefix.

## Multiple Namespaces in One File

This example shows how to declare multiple namespaces in a single file.

multiple_namespaces.php
  

&lt;?php

declare(strict_types=1);

namespace MyApp\First {
    class Example {
        public function show(): void {
            echo "First namespace";
        }
    }
}

namespace MyApp\Second {
    class Example {
        public function show(): void {
            echo "Second namespace";
        }
    }
}

$first = new \MyApp\First\Example();
$second = new \MyApp\Second\Example();

$first-&gt;show();
$second-&gt;show();

The code declares two namespaces using curly brace syntax. Each contains an
Example class with different implementations. This approach is generally
discouraged but can be useful in certain cases. Always prefer one namespace
per file.

## Namespace Constants and Functions

This example demonstrates defining constants and functions in namespaces.

namespace_functions.php
  

&lt;?php

declare(strict_types=1);

namespace MyApp\Utils;

const VERSION = "1.0";

function greet(string $name): string {
    return "Hello, $name!";
}

echo greet("John"); // Hello, John!
echo VERSION;      // 1.0

Namespaces can contain constants and functions, not just classes. These
elements are accessed using the namespace prefix. Constants are always
case-sensitive in namespaces. Namespaced functions help organize utility
functions logically.

## Best Practices

- **PSR-4:** Follow PSR-4 autoloading standard for namespaces.

- **One per file:** Use one namespace per PHP file when possible.

- **Directory structure:** Match namespace hierarchy to directory structure.

- **Vendor prefix:** Start with vendor name (e.g., MyCompany\MyApp).

- **Use statements:** Group use statements by type (classes, functions, constants).

## Source

[PHP Namespaces Documentation](https://www.php.net/manual/en/language.namespaces.php)

This tutorial covered PHP namespaces with practical examples showing basic
usage, sub-namespaces, aliases, and other namespace features.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).