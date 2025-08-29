+++
title = "PHP Named Arguments"
date = 2025-08-29T20:04:33.570+01:00
draft = false
description = "PHP Named Arguments tutorial shows how to use named arguments in PHP."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP Named Arguments

last modified February 15, 2025

In this article, we show how to use named arguments in PHP. Named
arguments allow you to pass arguments to a function by specifying the parameter
name, rather than relying on the order of the parameters. This feature was
introduced in PHP 8.0 and provides more flexibility and readability when calling
functions.

## Main Features of PHP Named Arguments

    Improved Readability: Named arguments make function calls more readable
    by explicitly stating the purpose of each argument.
    Flexibility: You can skip optional parameters without having to provide
    default values for preceding parameters.
    Order Independence: Named arguments allow you to pass arguments in any
    order, as long as the parameter names are specified.
    Reduced Errors: By using named arguments, you reduce the risk of passing
    arguments in the wrong order.

Named arguments are particularly useful when dealing with functions that have
many optional parameters or when the parameter order is not intuitive.

## Basic Usage of Named Arguments

The following example demonstrates how to use named arguments in PHP.

main.php
    

&lt;?php

declare(strict_types=1);

function createUser(string $name, int $age, string $email): void
{
    echo "User created: $name, $age, $email\n";
}

createUser(name: "John Doe", age: 30, email: "john@example.com");

In this program, the createUser function is called using named
arguments. The arguments are passed by specifying the parameter names, making
the function call more readable.

$ php main.php
User created: John Doe, 30, john@example.com

## Skipping Optional Parameters

The following example demonstrates how to skip optional parameters using named
arguments.

main.php
  

&lt;?php

declare(strict_types=1);

function sendEmail(string $to, string $subject = "No Subject", string $body = ""): void
{
    echo "Sending email to: $to\n";
    echo "Subject: $subject\n";
    echo "Body: $body\n";
}

sendEmail(to: "john@example.com", body: "Hello, John!");

In this program, the sendEmail function is called with named
arguments. The subject parameter is skipped, and the default value
is used.

$ php main.php
Sending email to: john@example.com
Subject: No Subject
Body: Hello, John!

## Order Independence

The following example demonstrates how named arguments allow you to pass
arguments in any order.

main.php
  

&lt;?php

declare(strict_types=1);

function createProfile(string $name, int $age, string $country): void
{
    echo "Profile created: $name, $age, $country\n";
}

createProfile(country: "USA", name: "Jane Doe", age: 25);

In this program, the createProfile function is called with named
arguments in a different order than the parameter list. The function still works
correctly because the arguments are identified by their names.

$ php main.php
Profile created: Jane Doe, 25, USA

## Combining Named and Positional Arguments

The following example demonstrates how to combine named and positional arguments
in a function call.

main.php
  

&lt;?php

declare(strict_types=1);

function createOrder(string $product, int $quantity, float $price): void
{
    echo "Order created: $product, $quantity, $price\n";
}

createOrder("Laptop", price: 999.99, quantity: 1);

In this program, the createOrder function is called with a
combination of positional and named arguments. The first argument is passed
positionally, while the remaining arguments are passed by name.

$ php main.php
Order created: Laptop, 1, 999.99

## Using Named Arguments with Arrays

The following example demonstrates how to use named arguments with array
parameters.

main.php
  

&lt;?php

declare(strict_types=1);

function createPost(string $title, array $tags, string $content): void
{
    echo "Post created: $title\n";
    echo "Tags: " . implode(", ", $tags) . "\n";
    echo "Content: $content\n";
}

createPost(title: "PHP Named Arguments", tags: ["PHP", "Tutorial"], 
    content: "Learn about named arguments in PHP.");

In this program, the createPost function is called with named
arguments, including an array parameter for tags.

$ php main.php
Post created: PHP Named Arguments
Tags: PHP, Tutorial
Content: Learn about named arguments in PHP.

## Named Arguments with Default Values

The following example demonstrates how to use named arguments with default
values.

main.php
  

&lt;?php

declare(strict_types=1);

function createEvent(string $name, string $date = "2025-01-01", string $location = "Online"): void
{
    echo "Event created: $name, $date, $location\n";
}

createEvent(name: "PHP Conference", location: "New York");

In this program, the createEvent function is called with named
arguments, and the default value for the date parameter is used.

$ php main.php
Event created: PHP Conference, 2025-01-01, New York

## Named Arguments with Variadic Functions

The following example demonstrates how to use named arguments with variadic
functions.

main.php
  

&lt;?php

declare(strict_types=1);

function createReport(string $title, string ...$sections): void
{
    echo "Report created: $title\n";
    echo "Sections: " . implode(", ", $sections) . "\n";
}

createReport(title: "Annual Report", "Introduction", "Analysis", "Conclusion");

In this program, the createReport function is called with named
arguments and variadic parameters for sections.

$ php main.php
Report created: Annual Report
Sections: Introduction, Analysis, Conclusion

## Named Arguments with Object Parameters

The following example demonstrates how to use named arguments with object
parameters.

main.php
  

&lt;?php

declare(strict_types=1);

class User
{
    public function __construct(public string $name, public int $age) {}
}

function createUserProfile(User $user, string $bio): void
{
    echo "User Profile: {$user-&gt;name}, {$user-&gt;age}\n";
    echo "Bio: $bio\n";
}

createUserProfile(user: new User(name: "John Doe", age: 30), bio: "Software Developer");

In this program, the createUserProfile function is called with
named arguments, including an object parameter for the user.

$ php main.php
User Profile: John Doe, 30
Bio: Software Developer

## Named Arguments with Callbacks

The following example demonstrates how to use named arguments with callback
functions.

main.php
  

&lt;?php

declare(strict_types=1);

function processData(array $data, callable $callback): void
{
    $result = array_map($callback, $data);
    echo "Processed Data: " . implode(", ", $result) . "\n";
}

processData(data: [1, 2, 3], callback: fn($n) =&gt; $n * 2);

In this program, the processData function is called with named
arguments, including a callback function.

$ php main.php
Processed Data: 2, 4, 6

## Source

[PHP Named Arguments - Documentation](https://www.php.net/manual/en/functions.arguments.php#functions.named-arguments)

In this article, we have shown how to use named arguments in PHP.
Named arguments provide a flexible and readable way to pass arguments to
functions, especially when dealing with functions that have many optional
parameters.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).