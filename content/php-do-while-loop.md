+++
title = "PHP do-while Loop"
date = 2025-08-29T20:04:18.595+01:00
draft = false
description = "PHP do-while tutorial shows how to use do-while loops in PHP. Learn looping with practical examples."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP do-while Loop

last modified April 16, 2025

The PHP do-while loop is a control structure that executes a block
of code at least once, then repeats while a condition remains true. Unlike
regular while loops, do-while checks the condition after each iteration.

## Basic Definitions

The do keyword starts a do-while loop that always executes its
block at least once. The while condition is checked after each
iteration to determine if the loop should continue.

Syntax: do { code } while (condition);. The condition is any
expression that evaluates to boolean true or false. Note the semicolon
after the while condition.

Do-while loops are useful when you need to execute code before checking
a condition. They're commonly used for input validation and menu systems.

## Basic do-while Loop

This example demonstrates a simple do-while loop counting from 1 to 5.

basic_do_while.php
  

&lt;?php

declare(strict_types=1);

$i = 1;

do {
    echo $i . " ";
    $i++;
} while ($i &lt;= 5);

The code initializes $i to 1. The loop prints the value and
increments it. The condition checks if $i is 5 or less. The
loop runs exactly 5 times, printing numbers 1 through 5.

## Guaranteed First Execution

This example shows how do-while always executes at least once.

guaranteed_execution.php
  

&lt;?php

declare(strict_types=1);

$count = 10;

do {
    echo "This runs once, even though count is $count";
} while ($count &lt; 5);

The loop executes once despite the condition being false initially. This
demonstrates the key difference from regular while loops. The condition
is only checked after the first iteration.

## User Input Validation

This example uses do-while for validating user input.

input_validation.php
  

&lt;?php

declare(strict_types=1);

do {
    $input = (int) readline("Enter a number between 1-10: ");
} while ($input &lt; 1 || $input &gt; 10);

echo "Valid input: $input";

The code prompts for input until a valid number between 1-10 is entered.
The loop continues while the input is invalid. This pattern ensures the
user gets at least one prompt and continues until valid input.

## Menu System

This example implements a simple menu system using do-while.

menu_system.php
  

&lt;?php

declare(strict_types=1);

do {
    echo "1. Option 1\n";
    echo "2. Option 2\n";
    echo "3. Exit\n";
    
    $choice = (int) readline("Select: ");
    
    switch ($choice) {
        case 1: echo "Option 1 selected\n"; break;
        case 2: echo "Option 2 selected\n"; break;
    }
} while ($choice != 3);

echo "Goodbye!";

The loop displays a menu and processes user choices. It continues until
the user selects option 3 (Exit). The menu is always shown at least once.
Switch statements often pair well with menu systems.

## Array Processing

This example processes array elements with do-while.

array_processing.php
  

&lt;?php

declare(strict_types=1);

$colors = ["red", "green", "blue"];
$index = 0;

do {
    echo strtoupper($colors[$index]) . "\n";
    $index++;
} while ($index &lt; count($colors));

The code processes each element in the $colors array. It
converts each color to uppercase and prints it. The loop continues while
the index is less than the array length. Note array bounds are checked.

## Nested do-while Loops

This example demonstrates nested do-while loops for a multiplication table.

nested_loops.php
  

&lt;?php

declare(strict_types=1);

$i = 1;

do {
    $j = 1;
    do {
        echo ($i * $j) . "\t";
        $j++;
    } while ($j &lt;= 10);
    
    echo "\n";
    $i++;
} while ($i &lt;= 10);

The outer loop controls rows, while the inner loop handles columns. It
prints a 10x10 multiplication table. Each inner loop completes fully
before the outer loop advances. Nested loops can create grid patterns.

## Break and Continue

This example shows using break and continue in do-while loops.

break_continue.php
  

&lt;?php

declare(strict_types=1);

$num = 0;

do {
    $num++;
    
    if ($num % 2 == 0) {
        continue; // Skip even numbers
    }
    
    echo "$num ";
    
    if ($num &gt;= 9) {
        break; // Exit loop at 9
    }
} while (true);

echo "\nLoop ended at $num";

The loop prints odd numbers using continue to skip evens. It breaks when
reaching 9, despite the always-true condition. Break exits the loop
immediately, while continue skips to the next iteration.

## Best Practices

- **Initialization:** Initialize variables before the loop.

- **Termination:** Ensure the condition will eventually become false.

- **Readability:** Use clear conditions and proper indentation.

- **Complexity:** Avoid deeply nested do-while structures.

- **Alternatives:** Consider for loops for counter-based iteration.

## Source

[PHP do-while Documentation](https://www.php.net/manual/en/control-structures.do.while.php)

This tutorial covered PHP do-while loops with practical examples showing
basic usage, input validation, menu systems, and control flow.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).