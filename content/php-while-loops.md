+++
title = "PHP while Loops"
date = 2025-08-29T20:04:53.345+01:00
draft = false
description = "PHP while loop tutorial shows how to use iterative statements in PHP. Learn loops with practical examples."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP while Loops

last modified April 16, 2025

The PHP while loop repeatedly executes a block of code as long as
a specified condition is true. It's fundamental for performing repetitive tasks
and processing data until a condition is met. While loops are essential for
iterative operations in PHP.

## Basic Definitions

The while loop checks a condition before each iteration. If the
condition evaluates to true, the code block executes. The loop continues until
the condition becomes false.

Syntax: while (condition) { code }. The condition is any expression
that returns a boolean value. The loop will run indefinitely if the condition
never becomes false.

Unlike for loops, while loops don't have built-in initialization or increment
steps. These must be handled manually before and within the loop.

## Basic while Loop

This example demonstrates a simple while loop counting from 1 to 5.

basic_while.php
  

&lt;?php

declare(strict_types=1);

$count = 1;

while ($count &lt;= 5) {
    echo "Count: $count\n";
    $count++;
}

The code initializes $count to 1. The loop runs while count is 5
or less. Each iteration prints the current count and increments it. The loop
terminates when count reaches 6. This shows basic while loop structure.

## Infinite Loop with Break

This example shows an intentional infinite loop with a conditional break.

infinite_break.php
  

&lt;?php

declare(strict_types=1);

$value = 0;

while (true) {
    echo "Processing...\n";
    $value += 10;
    
    if ($value &gt;= 50) {
        break;
    }
}

The loop condition is always true, creating an infinite loop. Inside, we
increment $value by 10 each iteration. When value reaches 50,
the break statement exits the loop. This pattern is useful for polling.

## Reading File Line by Line

This example demonstrates reading a file line by line using while.

file_read.php
  

&lt;?php

declare(strict_types=1);

$file = fopen("data.txt", "r");

while ($line = fgets($file)) {
    echo "Line: $line";
}

fclose($file);

The code opens a file for reading. The while loop continues as long as
fgets returns a line. Each iteration reads and prints one line.
The loop stops when EOF is reached. Always close files after processing.

## Array Processing

This example shows how to process array elements with a while loop.

array_processing.php
  

&lt;?php

declare(strict_types=1);

$fruits = ["Apple", "Banana", "Cherry"];
$index = 0;

while ($index &lt; count($fruits)) {
    echo "Fruit {$index}: {$fruits[$index]}\n";
    $index++;
}

The code initializes an array and counter. The loop runs while index is less
than array length. Each iteration accesses one array element. The index is
incremented manually. This is an alternative to foreach for arrays.

## Nested while Loops

This example demonstrates nested while loops for multi-dimensional processing.

nested_while.php
  

&lt;?php

declare(strict_types=1);

$row = 1;
while ($row &lt;= 3) {
    $col = 1;
    while ($col &lt;= 3) {
        echo "($row,$col) ";
        $col++;
    }
    echo "\n";
    $row++;
}

The outer loop controls rows, the inner loop controls columns. Both loops have
their own counters. The inner loop completes fully for each outer loop iteration.
This creates a 3x3 grid output. Nested loops are powerful but can be complex.

## Database Record Processing

This example shows processing database records with a while loop.

database_while.php
  

&lt;?php

declare(strict_types=1);

$conn = mysqli_connect("localhost", "user", "pass", "db");
$result = mysqli_query($conn, "SELECT * FROM products");

while ($row = mysqli_fetch_assoc($result)) {
    echo "Product: {$row['name']}, Price: {$row['price']}\n";
}

mysqli_close($conn);

The code connects to a database and queries products. The while loop processes
each row until no more exist. mysqli_fetch_assoc returns null
when done. This is a common pattern for database operations. Always close
connections when finished.

## Condition with Logical Operators

This example demonstrates complex conditions with logical operators.

complex_condition.php
  

&lt;?php

declare(strict_types=1);

$attempts = 0;
$success = false;

while ($attempts &lt; 5 &amp;&amp; !$success) {
    echo "Attempt #" . ($attempts + 1) . "\n";
    $success = (rand(1, 10) &gt; 8);
    $attempts++;
}

echo $success ? "Success!" : "Failed after 5 attempts.";

The loop runs while attempts are under 5 and success is false. Each iteration
simulates an operation with random success. The condition combines two checks
with &amp;&amp; (AND). The loop exits if either condition fails. This shows complex
loop control logic.

## Best Practices

- **Initialization:** Ensure loop variables are properly initialized.

- **Termination:** Guarantee the loop condition will eventually become false.

- **Complexity:** Avoid overly complex conditions for readability.

- **Performance:** Move invariant calculations outside the loop.

- **Safety:** Consider adding maximum iteration limits for safety.

## Source

[PHP while Documentation](https://www.php.net/manual/en/control-structures.while.php)

This tutorial covered PHP while loops with practical examples showing basic
usage, file processing, database operations, and complex conditions.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).