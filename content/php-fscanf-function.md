+++
title = "PHP fscanf Function"
date = 2025-08-29T20:05:52.544+01:00
draft = false
description = "PHP fscanf function tutorial shows how to read formatted input from files in PHP. Learn fscanf with practical examples."
image = ""
imageBig = ""
categories = ["php-filesystem"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP fscanf Function

last modified April 3, 2025

The PHP fscanf function reads formatted input from a file. It's
similar to scanf but works with file resources instead of stdin.

## Basic Definition

The fscanf function parses input from a file according to a format.
It takes a file handle and format string as required parameters.

Syntax: fscanf(resource $handle, string $format, mixed &amp;...$vars): mixed.
The function returns the number of assigned values or false on failure.

## Basic fscanf Example

This shows the simplest usage of fscanf to read a single value.

basic_fscanf.php
  

&lt;?php

declare(strict_types=1);

$file = fopen("data.txt", "r");
if ($file === false) {
    die("Error opening file");
}

$count = fscanf($file, "%d");
fclose($file);

echo "Read value: " . $count[0];

This reads an integer from "data.txt". The format specifier "%d" matches a
decimal integer. The result is returned as an array.

## Reading Multiple Values

fscanf can read multiple values at once using a format string.

multi_value.php
  

&lt;?php

declare(strict_types=1);

$file = fopen("user.txt", "r");
if ($file === false) {
    die("Error opening file");
}

$result = fscanf($file, "%s %d %f");
fclose($file);

[$name, $age, $score] = $result;

echo "Name: $name, Age: $age, Score: $score";

This reads a string, integer, and float from the file. The values are assigned
to variables using array destructuring for cleaner code.

## Using Variable References

Instead of returning an array, fscanf can assign to variables.

variable_references.php
  

&lt;?php

declare(strict_types=1);

$file = fopen("product.txt", "r");
if ($file === false) {
    die("Error opening file");
}

$id = 0;
$name = "";
$price = 0.0;

$count = fscanf($file, "%d %s %f", $id, $name, $price);
fclose($file);

echo "Read $count values: ID $id, $name, \$$price";

Here we pass variables by reference to receive the parsed values directly.
The function returns the count of successfully assigned values.

## Complex Format String

fscanf supports complex format strings with literal characters.

complex_format.php
  

&lt;?php

declare(strict_types=1);

$file = fopen("log.txt", "r");
if ($file === false) {
    die("Error opening file");
}

$date = "";
$time = "";
$message = "";

fscanf($file, "[%10s %8s] %[^\n]", $date, $time, $message);
fclose($file);

echo "On $date at $time: $message";

This parses a log file entry with a specific format. The "%[^\n]" specifier
matches all characters until a newline. Literal brackets are part of the format.

## Reading Until EOF

We can use fscanf in a loop to process all data in a file.

read_until_eof.php
  

&lt;?php

declare(strict_types=1);

$file = fopen("numbers.txt", "r");
if ($file === false) {
    die("Error opening file");
}

$sum = 0;
while (fscanf($file, "%d", $number) === 1) {
    $sum += $number;
}
fclose($file);

echo "Sum of numbers: $sum";

This reads integers from a file until EOF. The loop continues as long as
fscanf successfully reads one value per line.

## Best Practices

- **Error Handling:** Always check if file opening succeeds.

- **Resource Management:** Close files with fclose.

- **Type Safety:** Use strict_types for predictable behavior.

- **Format Validation:** Verify input matches expected format.

## Source

[PHP fscanf Documentation](https://www.php.net/manual/en/function.fscanf.php)

This tutorial covered the PHP fscanf function with practical
examples showing its usage for formatted file input.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Filesystem functions](/php/#php-fs).