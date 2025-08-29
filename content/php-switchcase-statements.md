+++
title = "PHP switch/case Statements"
date = 2025-08-29T20:04:47.239+01:00
draft = false
description = "PHP switch/case tutorial shows how to use switch statements in PHP. Learn switch/case with practical examples."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP switch/case Statements

last modified April 16, 2025

The PHP switch statement is an alternative to complex if/elseif
chains. It compares a value against multiple cases and executes matching code.
Switch statements improve readability when testing a single variable against
many possible values.

## Basic Definitions

The switch statement evaluates an expression once and compares it
with multiple case values. When a match is found, the corresponding code block
executes until a break statement.

The case keyword defines possible matching values. The break
statement exits the switch block. Without break, execution falls through to the
next case.

The default case runs when no matches are found. It's optional but
recommended for handling unexpected values. Switch statements use loose comparison
(==) by default.

## Basic switch Statement

This example demonstrates a simple switch statement checking day numbers.

basic_switch.php
  

&lt;?php

declare(strict_types=1);

$day = 3;

switch ($day) {
    case 1:
        echo "Monday";
        break;
    case 2:
        echo "Tuesday";
        break;
    case 3:
        echo "Wednesday";
        break;
    default:
        echo "Invalid day";
}

The code checks the $day variable against case values 1-3. When
it matches 3, "Wednesday" is printed. The break prevents fall-through to other
cases. Default handles values outside 1-3.

## Multiple Cases with Same Code

This example shows how to group multiple cases that share the same code block.

multiple_cases.php
  

&lt;?php

declare(strict_types=1);

$month = "Feb";

switch ($month) {
    case "Jan":
    case "Feb":
    case "Mar":
        echo "First Quarter";
        break;
    case "Apr":
    case "May":
    case "Jun":
        echo "Second Quarter";
        break;
    default:
        echo "Other Quarter";
}

The code groups months by quarter. Cases without break statements fall through
to the next case. This allows multiple values to execute the same code block.
The switch compares string values in this example.

## Using break and fall-through

This example demonstrates intentional fall-through behavior in switch statements.

fallthrough.php
  

&lt;?php

declare(strict_types=1);

$score = 85;

switch (true) {
    case $score &gt;= 90:
        echo "A";
        break;
    case $score &gt;= 80:
        echo "B";
        // No break - intentional fall-through
    case $score &gt;= 70:
        echo " (passing grade)";
        break;
    default:
        echo "F (failing)";
}

The code shows a score evaluation with partial fall-through. A score of 85 prints
"B (passing grade)" because execution continues to the next case. This technique
can build complex output but requires careful documentation.

## Switch with Enumerated Types

This example demonstrates using switch with PHP 8.1+ enums for type-safe comparisons.

enum_switch.php
  

&lt;?php

declare(strict_types=1);

enum Status: string {
    case PENDING = 'pending';
    case APPROVED = 'approved';
    case REJECTED = 'rejected';
}

$status = Status::APPROVED;

switch ($status) {
    case Status::PENDING:
        echo "Your request is pending review.";
        break;
    case Status::APPROVED:
        echo "Your request was approved!";
        break;
    case Status::REJECTED:
        echo "Your request was denied.";
        break;
}

The code uses a typed enum for status values. Switch cases compare against enum
cases directly. This provides type safety and prevents invalid comparisons. Enums
make switch statements more robust and maintainable.

## Switch vs If-Else Performance

This example compares switch and if-else performance for large value sets.

performance.php
  

&lt;?php

declare(strict_types=1);

$value = 500;

// Switch version
$start = microtime(true);
switch ($value) {
    case 1: /* ... */ break;
    // ... 500 cases ...
    case 500: $result = "Found 500"; break;
}
$switchTime = microtime(true) - $start;

// If-else version
$start = microtime(true);
if ($value == 1) { /* ... */ }
// ... 500 elseif ...
elseif ($value == 500) { $result = "Found 500"; }
$ifTime = microtime(true) - $start;

echo "Switch: " . $switchTime . "s\n";
echo "If-else: " . $ifTime . "s\n";

The code tests execution time for finding value 500 in large condition sets.
Switch statements often outperform if-else chains for many conditions. PHP
optimizes switch to use jump tables for integer cases. For few conditions,
the difference is negligible.

## Switch with Return Values

This example shows using switch in functions to return different values.

return_switch.php
  

&lt;?php

declare(strict_types=1);

function getDiscount(string $memberType): float {
    switch ($memberType) {
        case 'gold':
            return 0.25;
        case 'silver':
            return 0.15;
        case 'bronze':
            return 0.10;
        default:
            return 0.05;
    }
}

echo "Gold member discount: " . (getDiscount('gold') * 100) . "%";

The function uses switch to determine discount rates. Each case returns a value
immediately, making break statements unnecessary. This pattern is clean for
value lookup functions. The default case provides a base discount rate.

## Advanced Switch with Arrays

This example demonstrates using switch with array values and complex conditions.

array_switch.php
  

&lt;?php

declare(strict_types=1);

$user = [
    'role' =&gt; 'editor',
    'status' =&gt; 'active',
    'posts' =&gt; 42
];

switch (true) {
    case $user['role'] === 'admin':
        $access = 'full';
        break;
    case $user['role'] === 'editor' &amp;&amp; $user['status'] === 'active':
        $access = 'limited';
        break;
    case $user['posts'] &gt; 50:
        $access = 'extended';
        break;
    default:
        $access = 'basic';
}

echo "Access level: $access";

The code uses switch(true) to evaluate complex conditions in cases.
Each case can check different array elements with various operators. This approach
provides if-else-like flexibility while maintaining switch structure. Conditions
are evaluated top-to-bottom until a match is found.

## Best Practices

- **Always use break** unless fall-through is intentionally needed

- **Include default case** to handle unexpected values

- **Order cases logically** (numeric/alphabetic or most frequent first)

- **Keep cases simple** - move complex logic to functions

- **Consider match()** for PHP 8.0+ simple value returns

## Source

[PHP switch Documentation](https://www.php.net/manual/en/control-structures.switch.php)

This tutorial covered PHP switch statements with practical examples showing
basic usage, fall-through, enums, performance, and advanced techniques.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).