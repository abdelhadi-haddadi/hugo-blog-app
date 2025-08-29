+++
title = "PHP object Keyword"
date = 2025-08-29T20:04:35.840+01:00
draft = false
description = "PHP object keyword tutorial shows how to use the object type in PHP. Learn object type hints with practical examples."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP object Keyword

last modified April 16, 2025

The PHP object keyword is used for type hinting and type
declaration of objects. It ensures a value is an object instance. This
helps with code clarity and prevents type-related bugs.

## Basic Definitions

The object type represents any object instance in PHP. It was
introduced in PHP 7.2 as a formal type declaration. It can be used in
parameter, return, and property type declarations.

Type hinting with object ensures functions receive proper
object arguments. It works with any object, regardless of its class.
This provides flexibility while maintaining type safety.

The object type is different from class-specific type hints.
It accepts any object instance, while class hints only accept that class.

## Basic object Type Hint

This example demonstrates using object as a parameter type hint.

basic_object.php
  

&lt;?php

declare(strict_types=1);

function processObject(object $obj): void {
    echo "Processing object of class: " . get_class($obj);
}

$user = new stdClass();
processObject($user);

The function processObject requires an object parameter. It
accepts any object instance, demonstrated with stdClass. The function
uses get_class to show the object's class name.

## Returning object Type

This example shows how to specify object as a return type.

return_object.php
  

&lt;?php

declare(strict_types=1);

function createUser(): object {
    $user = new stdClass();
    $user-&gt;name = "John";
    $user-&gt;age = 30;
    return $user;
}

$user = createUser();
echo "{$user-&gt;name} is {$user-&gt;age} years old.";

The createUser function returns an object type. It creates and
returns a stdClass instance with properties. The calling code can then access
these properties. The return type ensures only objects are returned.

## object in Class Properties

This example demonstrates using object as a property type.

property_object.php
  

&lt;?php

declare(strict_types=1);

class Logger {
    private object $writer;

    public function setWriter(object $writer): void {
        $this-&gt;writer = $writer;
    }

    public function log(string $message): void {
        $this-&gt;writer-&gt;write($message);
    }
}

$fileWriter = new class {
    public function write(string $message): void {
        file_put_contents('log.txt', $message, FILE_APPEND);
    }
};

$logger = new Logger();
$logger-&gt;setWriter($fileWriter);
$logger-&gt;log("Error occurred\n");

The Logger class uses an object type property for its writer. The anonymous
class implements the required write method. This demonstrates flexible
dependency injection while maintaining type safety.

## object vs Specific Class

This example compares object type with specific class type hints.

object_vs_class.php
  

&lt;?php

declare(strict_types=1);

class User {
    public string $name;
}

function acceptObject(object $obj): void {
    echo "Accepted object of class: " . get_class($obj);
}

function acceptUser(User $user): void {
    echo "Accepted User: {$user-&gt;name}";
}

$user = new User();
$user-&gt;name = "Alice";

acceptObject($user);  // Works
acceptUser($user);    // Works

$std = new stdClass();
acceptObject($std);   // Works
// acceptUser($std);  // Would fail

The acceptObject function takes any object, while
acceptUser only takes User instances. This shows the
difference in flexibility between generic object and specific class
type hints.

## object with instanceof

This example demonstrates checking object types with instanceof.

object_instanceof.php
  

&lt;?php

declare(strict_types=1);

interface LoggerInterface {
    public function log(string $message): void;
}

class FileLogger implements LoggerInterface {
    public function log(string $message): void {
        file_put_contents('app.log', $message, FILE_APPEND);
    }
}

function processLogger(object $logger): void {
    if ($logger instanceof LoggerInterface) {
        $logger-&gt;log("Processing started\n");
        echo "Logger is valid.";
    } else {
        echo "Invalid logger provided.";
    }
}

$fileLogger = new FileLogger();
processLogger($fileLogger);

The function accepts any object but checks for LoggerInterface. This
combines the flexibility of object type with runtime interface
verification. It's useful when you need to verify capabilities.

## object in Arrays

This example shows working with arrays of objects.

object_array.php
  

&lt;?php

declare(strict_types=1);

function processObjects(array $objects): void {
    foreach ($objects as $obj) {
        if ($obj instanceof object) {
            echo "Processing " . get_class($obj) . "\n";
        }
    }
}

$items = [
    new stdClass(),
    new DateTime(),
    new ArrayObject()
];

processObjects($items);

The function processes an array containing various objects. Each item is
verified to be an object before processing. This is useful for collections
of heterogeneous objects. The instanceof check is technically redundant
with proper type hints.

## object as Union Type

This example demonstrates using object in union types.

object_union.php
  

&lt;?php

declare(strict_types=1);

function stringOrObject(string|object $input): void {
    if (is_object($input)) {
        echo "Object: " . get_class($input);
    } else {
        echo "String: $input";
    }
}

stringOrObject("Hello");
stringOrObject(new stdClass());

The function accepts either strings or objects. The union type provides
flexibility while maintaining type safety. Inside the function, we check
the actual type to handle each case appropriately.

## Best Practices

- **Specificity:** Prefer specific class/interface types when possible.

- **Documentation:** Document expected object capabilities.

- **Verification:** Use instanceof for required interfaces.

- **Flexibility:** Use object when you need maximum flexibility.

- **Modern PHP:** Combine with other type features like union types.

## Source

[PHP object Type Documentation](https://www.php.net/manual/en/language.types.object.php)

This tutorial covered the PHP object keyword with practical examples
showing its usage in various scenarios for flexible object handling.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).