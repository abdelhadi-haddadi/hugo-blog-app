+++
title = "PHP continue Statement"
date = 2025-08-29T20:04:16.359+01:00
draft = false
description = "PHP continue tutorial shows how to use the continue keyword in PHP loops. Learn loop control with practical examples."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP continue Statement

last modified April 16, 2025

The PHP continue statement is used in loops to skip the current
iteration and continue with the next one. It provides control over loop
execution flow. When encountered, it jumps to the next iteration immediately.

## Basic Definitions

The continue statement skips the remaining code in the current
loop iteration. It moves execution to the next iteration in for, while, do-while,
and foreach loops. It's useful for skipping specific values or conditions.

Syntax: continue; or continue n; where n specifies
how many nested loops to skip. The optional numeric argument was added in PHP 5.4.
Without it, continue affects only the innermost loop.

The continue statement differs from break which exits the loop entirely.
Continue only skips one iteration while keeping the loop running. Both are
powerful flow control tools in loops.

## Basic continue in for Loop

This example demonstrates skipping even numbers in a for loop using continue.

basic_continue.php
  

&lt;?php

declare(strict_types=1);

for ($i = 1; $i &lt;= 10; $i++) {
    if ($i % 2 == 0) {
        continue;
    }
    echo "$i ";
}

The code prints odd numbers between 1 and 10. When $i is even, continue skips
the echo statement. The loop continues with the next iteration. Output: 1 3 5 7 9.

## continue in while Loop

This example shows continue skipping specific values in a while loop.

while_continue.php
  

&lt;?php

declare(strict_types=1);

$count = 0;
while ($count &lt; 5) {
    $count++;
    if ($count == 3) {
        continue;
    }
    echo "Count: $count\n";
}

The loop runs while $count is less than 5. When $count equals 3, continue
skips the echo statement. The loop continues with $count = 4. Output shows
all numbers except 3.

## continue in foreach Loop

This example demonstrates skipping array elements based on a condition.

foreach_continue.php
  

&lt;?php

declare(strict_types=1);

$fruits = ['apple', 'banana', 'cherry', 'date', 'elderberry'];

foreach ($fruits as $fruit) {
    if (strlen($fruit) &gt; 5) {
        continue;
    }
    echo "$fruit ";
}

The loop processes each fruit in the array. Fruits with names longer than 5
characters are skipped. Only shorter fruit names are printed. Output: apple
banana date.

## continue with Optional Argument

This example shows using continue with a numeric argument to skip outer loops.

continue_n.php
  

&lt;?php

declare(strict_types=1);

for ($i = 1; $i &lt;= 3; $i++) {
    for ($j = 1; $j &lt;= 3; $j++) {
        if ($i == $j) {
            continue 2;
        }
        echo "$i,$j ";
    }
}

The nested loops would normally produce 9 combinations. When $i equals $j,
continue 2 skips both loops' current iterations. Output shows only unequal
pairs: 1,2 1,3 2,1 2,3 3,1 3,2.

## continue in do-while Loop

This example demonstrates continue behavior in a do-while loop structure.

dowhile_continue.php
  

&lt;?php

declare(strict_types=1);

$num = 0;
do {
    $num++;
    if ($num % 3 == 0) {
        continue;
    }
    echo "$num ";
} while ($num &lt; 10);

The loop prints numbers from 1 to 10, skipping multiples of 3. Unlike while,
do-while always executes at least once. Continue jumps to the condition check.
Output: 1 2 4 5 7 8 10.

## continue with switch

This example shows continue behavior within a switch statement inside a loop.

switch_continue.php
  

&lt;?php

declare(strict_types=1);

for ($i = 1; $i &lt;= 5; $i++) {
    switch ($i) {
        case 2:
            echo "Two ";
            continue 2;
        case 4:
            echo "Four ";
            break;
        default:
            echo "$i ";
    }
}

The loop runs from 1 to 5. When $i is 2, continue 2 skips both switch and loop.
For $i=4, break only exits the switch. Output: 1 Two 3 Four 5.

## Practical Example: Filtering Data

This example shows a practical use of continue to filter invalid data.

filter_data.php
  

&lt;?php

declare(strict_types=1);

$users = [
    ['name' =&gt; 'Alice', 'active' =&gt; true],
    ['name' =&gt; 'Bob', 'active' =&gt; false],
    ['name' =&gt; 'Charlie', 'active' =&gt; true],
    ['name' =&gt; 'Dave', 'active' =&gt; false]
];

foreach ($users as $user) {
    if (!$user['active']) {
        continue;
    }
    echo "Active user: {$user['name']}\n";
}

The code processes an array of users. Only active users are processed; inactive
ones are skipped. This demonstrates real-world data filtering. Output shows
only Alice and Charlie.

## Best Practices

- **Clarity:** Use continue when it makes logic clearer than nested ifs.

- **Moderation:** Avoid excessive continue statements that make flow hard to follow.

- **Comments:** Document why iterations are being skipped when not obvious.

- **Alternatives:** Consider if conditions might be clearer than continue in some cases.

- **Levels:** Use numeric arguments carefully with nested loops.

## Source

[PHP continue Documentation](https://www.php.net/manual/en/control-structures.continue.php)

This tutorial covered PHP continue statement with practical examples showing
its usage in different loop types and scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).