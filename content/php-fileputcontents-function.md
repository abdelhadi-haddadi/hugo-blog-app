+++
title = "PHP file_put_contents Function"
date = 2025-08-29T20:05:45.820+01:00
draft = false
description = "PHP file_put_contents function tutorial shows how to write data to files in PHP. Learn file_put_contents with practical examples."
image = ""
imageBig = ""
categories = ["php-filesystem"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP file_put_contents Function

last modified April 3, 2025

The PHP file_put_contents function writes data to a file. It's a
simple way to create or overwrite files in one function call.

## Basic Definition

The file_put_contents function writes a string to a file. It can
create the file if it doesn't exist. The function returns the number of bytes
written or false on failure.

Syntax: file_put_contents(string $filename, mixed $data, int $flags = 0, ?resource $context = null): int|false.

## Basic file_put_contents Example

This shows the simplest usage of file_put_contents to write text.

basic_write.php
  

&lt;?php

declare(strict_types=1);

$file = 'example.txt';
$data = 'Hello, World!';

$result = file_put_contents($file, $data);

if ($result !== false) {
    echo "Successfully wrote $result bytes to $file";
} else {
    echo "Failed to write to $file";
}

This creates or overwrites example.txt with "Hello, World!". The function
returns the number of bytes written or false on error.

## Appending to a File

Use the FILE_APPEND flag to add content without overwriting existing data.

append_write.php
  

&lt;?php

declare(strict_types=1);

$file = 'log.txt';
$data = "New log entry at " . date('Y-m-d H:i:s') . PHP_EOL;

$result = file_put_contents($file, $data, FILE_APPEND);

if ($result !== false) {
    echo "Appended $result bytes to $file";
} else {
    echo "Failed to append to $file";
}

This appends a timestamped log entry to log.txt. The FILE_APPEND flag preserves
existing content. PHP_EOL adds the correct end-of-line character.

## Writing Arrays to File

You can write array data by converting it to a string first.

array_write.php
  

&lt;?php

declare(strict_types=1);

$file = 'data.csv';
$data = ['Name', 'Email', 'Phone'];
$csv = implode(',', $data) . PHP_EOL;

$result = file_put_contents($file, $csv);

if ($result !== false) {
    echo "Wrote CSV header with $result bytes";
} else {
    echo "Failed to write CSV data";
}

This converts an array to a CSV string and writes it to a file. implode joins
array elements with commas. Always validate and sanitize array data first.

## Locking Files During Write

Use LOCK_EX to prevent other processes from writing to the file simultaneously.

locked_write.php
  

&lt;?php

declare(strict_types=1);

$file = 'counter.txt';
$data = '1';

$result = file_put_contents($file, $data, LOCK_EX);

if ($result !== false) {
    echo "Wrote data with exclusive lock";
} else {
    echo "Failed to acquire lock or write data";
}

LOCK_EX provides exclusive write access during the operation. This prevents race
conditions in concurrent access scenarios. Always check the return value.

## Combining Flags

You can combine multiple flags using the bitwise OR operator.

combined_flags.php
  

&lt;?php

declare(strict_types=1);

$file = 'audit.log';
$data = "User action at " . date('Y-m-d H:i:s') . PHP_EOL;

$flags = FILE_APPEND | LOCK_EX;
$result = file_put_contents($file, $data, $flags);

if ($result !== false) {
    echo "Appended with lock: $result bytes written";
} else {
    echo "Failed to write with combined flags";
}

This combines FILE_APPEND and LOCK_EX for safe concurrent appending. The bitwise
OR operator (|) combines the flags. Always test flag combinations thoroughly.

## Best Practices

- **Error Handling:** Always check the return value.

- **Permissions:** Ensure proper file permissions.

- **Validation:** Sanitize input data before writing.

- **Security:** Avoid user-controlled filenames.

- **Memory:** For large data, consider streaming.

## Source

[PHP file_put_contents Documentation](https://www.php.net/manual/en/function.file-put-contents.php)

This tutorial covered the PHP file_put_contents function with
practical examples showing its usage in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Filesystem functions](/php/#php-fs).