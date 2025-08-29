+++
title = "PHP Predicates"
date = 2025-08-29T20:04:37.039+01:00
draft = false
description = "PHP Predicates tutorial with examples."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP Predicates

last modified March 12, 2025

In this article, we explore predicates in PHP. A predicate is a
function that returns a boolean value, typically used to test conditions or
validate data. Predicates are useful for filtering, validating, or making
decisions in code.

## Basic Definition

A predicate is a function that takes one or more arguments and returns
true or false. Predicates are often used in
functional programming to filter arrays, validate inputs, or make decisions.

## Simple Predicate

The following example demonstrates a simple predicate that checks if a number
is even.

main.php
    

&lt;?php

declare(strict_types=1);

function isEven(int $number): bool
{
    return $number % 2 === 0;
}

$result = isEven(4);
echo $result ? 'true' : 'false';

In this program, the isEven function is a predicate that checks
if a number is even. It returns true if the number is even and
false otherwise.

$ php main.php
true

## Predicate with Array Filtering

The following example demonstrates how to use a predicate to filter an array.

main.php
    

&lt;?php

declare(strict_types=1);

function isPositive(int $number): bool
{
    return $number &gt; 0;
}

$numbers = [-1, 2, -3, 4, -5];
$positiveNumbers = array_filter($numbers, 'isPositive');

print_r($positiveNumbers);

In this program, the isPositive predicate filters out negative
numbers from the array. The array_filter function applies the
predicate to each element of the array.

$ php main.php
Array
(
    [1] =&gt; 2
    [3] =&gt; 4
)

## Predicate with Anonymous Function

The following example demonstrates how to use an anonymous function as a
predicate.

main.php
    

&lt;?php

declare(strict_types=1);

$numbers = [1, 2, 3, 4, 5];
$evenNumbers = array_filter($numbers, function(int $number): bool {
    return $number % 2 === 0;
});

print_r($evenNumbers);

In this program, an anonymous function is used as a predicate to filter even
numbers from the array. The array_filter function applies the
predicate to each element of the array.

$ php main.php
Array
(
    [1] =&gt; 2
    [3] =&gt; 4
)

## Predicate with Multiple Conditions

The following example demonstrates a predicate with multiple conditions.

main.php
    

&lt;?php

declare(strict_types=1);

function isValidEmail(string $email): bool
{
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

$emails = ['test@example.com', 'invalid-email', 'user@domain.com'];
$validEmails = array_filter($emails, 'isValidEmail');

print_r($validEmails);

In this program, the isValidEmail predicate checks if an email
is valid using PHP's filter_var function. The
array_filter function applies the predicate to each element of
the array.

$ php main.php
Array
(
    [0] =&gt; test@example.com
    [2] =&gt; user@domain.com
)

## Predicate with Object Validation

The following example demonstrates a predicate that validates an object.

main.php
    

&lt;?php

declare(strict_types=1);

class User
{
    public function __construct(public int $age) {}
}

function isAdult(User $user): bool
{
    return $user-&gt;age &gt;= 18;
}

$users = [new User(15), new User(20), new User(17)];
$adults = array_filter($users, 'isAdult');

print_r($adults);

In this program, the isAdult predicate checks if a user is an
adult based on their age. The array_filter function applies the
predicate to each element of the array.

$ php main.php
Array
(
    [1] =&gt; User Object
        (
            [age] =&gt; 20
        )
)

## Predicate with Strict Type Declaration

The following example demonstrates a predicate with strict type declaration.

main.php
    

&lt;?php

declare(strict_types=1);

function isStringLong(string $text): bool
{
    return strlen($text) &gt; 10;
}

$texts = ['short', 'a longer text', 'another long text'];
$longTexts = array_filter($texts, 'isStringLong');

print_r($longTexts);

In this program, the isStringLong predicate checks if a string
is longer than 10 characters. The array_filter function applies
the predicate to each element of the array.

$ php main.php
Array
(
    [1] =&gt; a longer text
    [2] =&gt; another long text
)

## Source

[PHP Anonymous Functions - Documentation](https://www.php.net/manual/en/functions.anonymous.php)

In this article, we have shown how to use predicates in PHP for filtering,
validation, and decision-making. Predicates are a powerful tool for writing
clean and reusable code.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).