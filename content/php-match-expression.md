+++
title = "PHP match Expression"
date = 2025-08-29T20:04:31.017+01:00
draft = false
description = "PHP match tutorial shows how to use the match expression in PHP. Learn pattern matching with practical examples."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP match Expression

last modified April 16, 2025

The PHP match expression is a powerful feature introduced in PHP 8.
It provides a more concise and safer alternative to switch statements. Match
compares values strictly (===) and returns a value, making it more predictable.

## Basic Definitions

The match expression compares a subject value against multiple
alternatives. It returns the value of the first matching case. Unlike switch,
it performs strict type comparison and doesn't require break statements.

Syntax: match (subject) { pattern1 =&gt; result, pattern2 =&gt; result }.
The match must be exhaustive or include a default case. It evaluates to a value
that can be assigned to a variable.

Key differences from switch: strict comparison, returns a value, no fall-through,
and more compact syntax. Match is an expression, not a statement like switch.

## Basic match Example

This example demonstrates a simple match expression checking HTTP status codes.

basic_match.php
  

&lt;?php

declare(strict_types=1);

$statusCode = 404;

$message = match($statusCode) {
    200 =&gt; 'OK',
    301 =&gt; 'Moved Permanently',
    404 =&gt; 'Not Found',
    500 =&gt; 'Internal Server Error',
    default =&gt; 'Unknown Status Code'
};

echo $message; // Outputs: Not Found

The code matches the status code against several possible values. Each case
specifies a pattern and corresponding result. The default case handles any
unmatched values. The result is assigned to $message.

## match with Multiple Conditions

This example shows how to combine multiple conditions in a single match arm.

multiple_conditions.php
  

&lt;?php

declare(strict_types=1);

$age = 25;

$category = match(true) {
    $age &lt; 13 =&gt; 'Child',
    $age &gt;= 13 &amp;&amp; $age &lt; 20 =&gt; 'Teenager',
    $age &gt;= 20 &amp;&amp; $age &lt; 65 =&gt; 'Adult',
    default =&gt; 'Senior'
};

echo $category; // Outputs: Adult

The match uses true as the subject to evaluate boolean conditions. Each arm
contains a condition that returns true or false. The first true condition
determines the result. This pattern is useful for range checks.

## match with Non-Identity Checks

This example demonstrates using match with non-identity comparison scenarios.

non_identity.php
  

&lt;?php

declare(strict_types=1);

$input = '42';

$result = match((int)$input) {
    0 =&gt; 'Zero',
    42 =&gt; 'The Answer',
    1, 2, 3 =&gt; 'Small number',
    default =&gt; 'Other number'
};

echo $result; // Outputs: The Answer

The input is cast to an integer before matching. Multiple values can be
combined in one arm with commas. The match performs strict comparison
after the type conversion. This shows how to handle type juggling cases.

## match with Complex Patterns

This example shows advanced pattern matching with arrays and conditions.

complex_patterns.php
  

&lt;?php

declare(strict_types=1);

$user = [
    'name' =&gt; 'Alice',
    'age' =&gt; 30,
    'status' =&gt; 'active'
];

$access = match(true) {
    !isset($user['name']) =&gt; 'Invalid user',
    $user['status'] === 'banned' =&gt; 'Access denied',
    $user['age'] &lt; 18 =&gt; 'Parental control required',
    $user['status'] === 'active' =&gt; 'Full access',
    default =&gt; 'Limited access'
};

echo $access; // Outputs: Full access

The match evaluates complex conditions against array data. Each arm checks
different aspects of the user data. Conditions can include function calls
and nested checks. This demonstrates match's flexibility with complex logic.

## match Returning Functions

This example shows how match can return function calls or complex expressions.

return_functions.php
  

&lt;?php

declare(strict_types=1);

function getDiscount(string $memberType): float {
    return match($memberType) {
        'gold' =&gt; 0.2,
        'silver' =&gt; 0.1,
        'bronze' =&gt; 0.05,
        default =&gt; 0.0
    };
}

$discount = getDiscount('gold');
echo "Discount: " . ($discount * 100) . "%"; // Outputs: Discount: 20%

The match is used within a function to return different discount values.
Each arm returns a specific float value. The function encapsulates the
matching logic. This pattern is useful for lookup tables and configs.

## match with Enums

This example demonstrates using match with PHP 8.1 enums for type-safe matching.

enum_match.php
  

&lt;?php

declare(strict_types=1);

enum UserRole: string {
    case ADMIN = 'admin';
    case EDITOR = 'editor';
    case READER = 'reader';
}

$role = UserRole::EDITOR;

$permissions = match($role) {
    UserRole::ADMIN =&gt; ['create', 'read', 'update', 'delete'],
    UserRole::EDITOR =&gt; ['create', 'read', 'update'],
    UserRole::READER =&gt; ['read']
};

print_r($permissions); // Outputs Array([0]=&gt;create [1]=&gt;read [2]=&gt;update)

The match works seamlessly with enum cases. Each enum value maps to specific
permissions. The compiler ensures all enum cases are handled. This provides
type safety that switch statements lack.

## match vs switch Comparison

This example contrasts match with traditional switch statements.

match_vs_switch.php
  

&lt;?php

declare(strict_types=1);

$value = '1';

// Switch example (loose comparison)
switch ($value) {
    case 1:
        $result = 'Integer 1';
        break;
    case '1':
        $result = 'String "1"';
        break;
    default:
        $result = 'Other';
}

echo "Switch: $result\n"; // Outputs: Switch: Integer 1

// Match example (strict comparison)
$result = match($value) {
    1 =&gt; 'Integer 1',
    '1' =&gt; 'String "1"',
    default =&gt; 'Other'
};

echo "Match: $result"; // Outputs: Match: String "1"

The switch uses loose comparison (==) while match uses strict (===). Switch
requires break statements to prevent fall-through. Match returns values
directly. The example shows how they handle string '1' differently.

## Best Practices

- **Exhaustiveness:** Always include a default case unless all possibilities are covered.

- **Readability:** Keep match arms simple; move complex logic to functions.

- **Type Safety:** Leverage match's strict comparison for more predictable code.

- **Return Values:** Use match's expression nature to directly assign values.

- **Performance:** Prefer match over switch for better performance and safety.

## Source

[PHP match Documentation](https://www.php.net/manual/en/control-structures.match.php)

This tutorial covered PHP's match expression with practical examples
showing its syntax, advantages over switch, and various use cases.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).