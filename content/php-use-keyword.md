+++
title = "PHP use Keyword"
date = 2025-08-29T20:04:50.925+01:00
draft = false
description = "PHP use keyword tutorial shows how to use namespace aliasing and traits in PHP. Learn use keyword with practical examples."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP use Keyword

last modified April 16, 2025

The PHP use keyword has multiple purposes in PHP programming. It
is primarily used for namespace aliasing and trait inclusion. The keyword helps
manage naming conflicts and code organization.

## Basic Definitions

The use keyword imports namespaces, classes, or traits into the
current scope. It creates aliases for long namespace paths, making code more
readable. This is essential in modern PHP applications.

For namespaces, use allows referencing classes with shorter names.
For traits, it includes trait methods in a class. The keyword appears at the
top of files or within class definitions.

Syntax varies: use Namespace\Class; for namespaces, use TraitName;
for traits. Group use declarations are available since PHP 7.1.

## Basic Namespace Import

This example demonstrates importing a class from another namespace.

basic_use.php
  

&lt;?php

namespace MyApp;

use Symfony\Component\HttpFoundation\Request;

$request = new Request();
echo get_class($request); // Outputs: Symfony\Component\HttpFoundation\Request

The code imports the Request class from Symfony namespace. We can now use
Request directly without full qualification. The actual class name remains
unchanged. This is the most common use case.

## Namespace Aliasing

This example shows how to create an alias for a namespaced class.

alias_use.php
  

&lt;?php

namespace MyApp;

use Symfony\Component\HttpFoundation\Request as HttpRequest;

$request = new HttpRequest();
echo get_class($request); // Outputs: Symfony\Component\HttpFoundation\Request

The as keyword creates an alias for the Request class. This is
useful when dealing with name conflicts. The alias only exists in the current
file scope. Original class names remain unchanged.

## Group Use Declarations

This example demonstrates PHP 7.1+ group use syntax for multiple imports.

group_use.php
  

&lt;?php

namespace MyApp;

use Symfony\Component\HttpFoundation\{
    Request,
    Response,
    Cookie
};

$request = new Request();
$response = new Response();
$cookie = new Cookie('name', 'value');

Group use declarations import multiple classes from one namespace. The syntax
reduces repetition and improves readability. All imported classes must come
from the same parent namespace. This is a PHP 7.1+ feature.

## Function and Constant Use

This example shows how to import functions and constants with use.

function_use.php
  

&lt;?php

namespace MyApp;

use function MyLibrary\helperFunction;
use const MyLibrary\API_VERSION;

helperFunction();
echo API_VERSION;

PHP 5.6+ allows importing functions and constants. The function
and const keywords specify what to import. This works similarly
to class imports. The syntax helps organize utility functions.

## Trait Usage

This example demonstrates using traits with the use keyword.

trait_use.php
  

&lt;?php

trait Loggable {
    public function log($message) {
        echo "Logging: $message";
    }
}

class User {
    use Loggable;
}

$user = new User();
$user-&gt;log("User created");

Traits are included in classes with the use keyword. The trait's
methods become available in the class. This is different from namespace usage.
Traits provide horizontal code reuse.

## Multiple Traits

This example shows a class using multiple traits.

multi_trait.php
  

&lt;?php

trait Logger {
    public function log($msg) {
        echo "Logger: $msg";
    }
}

trait Notifier {
    public function notify($msg) {
        echo "Notifier: $msg";
    }
}

class Application {
    use Logger, Notifier;
}

$app = new Application();
$app-&gt;log("Error occurred");
$app-&gt;notify("New message");

Multiple traits can be used in one class by separating them with commas. This
combines functionality from different sources. Trait methods must not conflict.
The class gains all methods from all used traits.

## Conflict Resolution

This example demonstrates resolving trait method conflicts.

trait_conflict.php
  

&lt;?php

trait A {
    public function test() {
        echo "A::test()";
    }
}

trait B {
    public function test() {
        echo "B::test()";
    }
}

class MyClass {
    use A, B {
        B::test insteadof A;
        A::test as aTest;
    }
}

$obj = new MyClass();
$obj-&gt;test();  // Outputs: B::test()
$obj-&gt;aTest(); // Outputs: A::test()

When traits have conflicting methods, we must resolve them. The insteadof
operator chooses which method to use. The as operator creates an
alias for the excluded method. This provides fine-grained control.

## Best Practices

- **Organization:** Keep use statements grouped and ordered logically.

- **Readability:** Use aliases when class names are too long.

- **Conflict:** Resolve trait conflicts explicitly.

- **PSR:** Follow PSR-12 coding standards for use statements.

- **Autoloading:** Ensure classes are autoloadable when using namespaces.

## Source

[PHP use Documentation](https://www.php.net/manual/en/language.namespaces.importing.php)

This tutorial covered PHP use keyword with practical examples showing namespace
imports, aliasing, traits, and conflict resolution.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).