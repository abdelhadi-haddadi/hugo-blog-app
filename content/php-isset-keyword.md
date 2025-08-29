+++
title = "PHP isset Keyword"
date = 2025-08-29T20:04:29.905+01:00
draft = false
description = "PHP isset tutorial shows how to use isset to check variable existence in PHP. Learn isset with practical examples."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP isset Keyword

last modified April 16, 2025

The PHP isset language construct checks if a variable is set and
not null. It's essential for avoiding undefined variable errors. isset returns
true if the variable exists and has any value other than null.

## Basic Definitions

The isset function determines if a variable is declared and not
null. It accepts one or more parameters and returns a boolean value. isset is
not a regular function but a language construct.

Syntax: isset(mixed $var, mixed ...$vars): bool. It can check
multiple variables at once. If any variable is not set, it returns false.

Unlike empty, isset doesn't evaluate the variable's value. It only
checks if the variable exists and isn't null. This makes it safer for checking
variable existence.

## Basic isset Usage

This example demonstrates the basic usage of isset with a simple variable.

basic_isset.php
  

&lt;?php

declare(strict_types=1);

$name = "John";

if (isset($name)) {
    echo "Name is set to: $name";
} else {
    echo "Name is not set";
}

The code checks if $name exists and isn't null. Since we assigned
a value, isset returns true. This is the most common use case for isset. It
prevents undefined variable errors.

## Checking Multiple Variables

This example shows how to check multiple variables with a single isset call.

multiple_vars.php
  

&lt;?php

declare(strict_types=1);

$firstName = "John";
$lastName = "Doe";
$age = null;

if (isset($firstName, $lastName, $age)) {
    echo "All variables are set";
} else {
    echo "Not all variables are set";
}

The code checks three variables at once. Since $age is null, isset
returns false. This is efficient for validating multiple required variables.
All variables must be set for it to return true.

## Array Element Checking

This example demonstrates using isset to check array elements.

array_element.php
  

&lt;?php

declare(strict_types=1);

$user = [
    'name' =&gt; 'John',
    'email' =&gt; 'john@example.com',
    'age' =&gt; null
];

if (isset($user['name'])) {
    echo "Name: {$user['name']}";
}

if (!isset($user['address'])) {
    echo "Address is not set";
}

The code checks if array keys exist. Note that $user['age'] is
null, so isset would return false. This is safer than array_key_exists for
most cases. Always use isset for array element checks.

## Form Input Validation

This example shows how to use isset with form submissions.

form_validation.php
  

&lt;?php

declare(strict_types=1);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['username'], $_POST['password'])) {
        // Process form data
        echo "Form submitted successfully";
    } else {
        echo "Please fill all required fields";
    }
}

The code checks if form fields were submitted. This prevents undefined index
notices. Always validate form inputs with isset before processing. It's
essential for secure form handling.

## Object Property Checking

This example demonstrates checking object properties with isset.

object_property.php
  

&lt;?php

declare(strict_types=1);

class User {
    public $name;
    private $email;
    
    public function __construct($name) {
        $this-&gt;name = $name;
    }
}

$user = new User('John');

if (isset($user-&gt;name)) {
    echo "Name property exists";
}

if (!isset($user-&gt;email)) {
    echo "Email is not accessible or not set";
}

The code checks object property existence. Note that private properties return
false with isset from outside the class. isset works with both public and
private properties when used within the class.

## Null Coalescing with isset

This example shows the null coalescing operator as an isset alternative.

null_coalescing.php
  

&lt;?php

declare(strict_types=1);

$username = $_GET['username'] ?? 'guest';

echo "Welcome, $username";

The null coalescing operator (??) checks if the left operand exists and isn't
null. If not, it returns the right operand. This provides a default value
when variables might not exist. It's shorthand for isset checks.

## Combining isset with empty

This example demonstrates the difference between isset and empty.

isset_vs_empty.php
  

&lt;?php

declare(strict_types=1);

$var1 = '';
$var2 = null;
$var3 = 0;

var_dump(isset($var1)); // true
var_dump(isset($var2)); // false
var_dump(isset($var3)); // true

var_dump(empty($var1)); // true
var_dump(empty($var2)); // true
var_dump(empty($var3)); // true

The code shows how isset and empty behave differently. isset checks existence,
while empty checks for "falsy" values. Use isset when you only care about
variable existence, not its value. empty is stricter about what it considers
"empty".

## Best Practices

- **Always validate:** Use isset before accessing variables that might not exist.

- **Form handling:** Always check form inputs with isset before processing.

- **Array safety:** Prefer isset over array_key_exists for most array checks.

- **Default values:** Consider null coalescing for simpler default value assignment.

- **Performance:** isset is very fast, so don't hesitate to use it liberally.

## Source

[PHP isset Documentation](https://www.php.net/manual/en/function.isset.php)

This tutorial covered PHP isset with practical examples showing its usage in
various scenarios for safe variable checking.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).