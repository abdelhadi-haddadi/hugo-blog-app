+++
title = "PHP ftell Function"
date = 2025-08-29T20:05:53.636+01:00
draft = false
description = "PHP ftell function tutorial shows how to get current file pointer position in PHP. Learn ftell with practical examples."
image = ""
imageBig = ""
categories = ["php-filesystem"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP ftell Function

last modified April 3, 2025

The PHP ftell function returns the current position of the file
pointer in an open file. It's essential for random file access operations.

## Basic Definition

The ftell function returns the current position of the file pointer
in the given file handle. It measures the position in bytes from the start.

Syntax: ftell(resource $stream): int|false. Returns the position
as integer or false on failure. Works with files opened by fopen.

## Basic ftell Example

This shows the simplest usage of ftell to get pointer position.

basic_ftell.php
  

&lt;?php

declare(strict_types=1);

$file = fopen('example.txt', 'r');
$position = ftell($file);

echo "Initial position: $position"; // Outputs: Initial position: 0
fclose($file);

This shows the pointer starts at position 0 when a file is first opened. The
position is measured in bytes from the file's beginning.

## After Reading Data

ftell shows how reading moves the file pointer forward.

after_read.php
  

&lt;?php

declare(strict_types=1);

$file = fopen('example.txt', 'r');
fread($file, 10); // Read 10 bytes
$position = ftell($file);

echo "Position after read: $position"; // Outputs position 10
fclose($file);

After reading 10 bytes, ftell returns 10. The pointer moves
automatically during read/write operations.

## With fseek

ftell can verify positions set by fseek.

with_fseek.php
  

&lt;?php

declare(strict_types=1);

$file = fopen('example.txt', 'r');
fseek($file, 25);
$position = ftell($file);

echo "Position after seek: $position"; // Outputs position 25
fclose($file);

This demonstrates how ftell confirms manual pointer positioning.
The position matches the fseek offset of 25 bytes.

## Writing Mode

In writing mode, ftell shows the current write position.

writing_mode.php
  

&lt;?php

declare(strict_types=1);

$file = fopen('output.txt', 'w');
fwrite($file, 'Hello');
$position = ftell($file);

echo "Position after write: $position"; // Outputs position 5
fclose($file);

After writing "Hello" (5 bytes), ftell returns 5. The pointer
moves to the end of the written data.

## Append Mode

In append mode, ftell always shows the end position.

append_mode.php
  

&lt;?php

declare(strict_types=1);

$file = fopen('log.txt', 'a');
$position = ftell($file);

echo "Initial append position: $position"; // Shows file size
fwrite($file, "New entry\n");
$position = ftell($file);

echo "New append position: $position"; // Shows new end position
fclose($file);

Append mode starts at the file's end. ftell reflects the current
end position after each write operation.

## Error Handling

ftell returns false on failure, which should be checked.

error_handling.php
  

&lt;?php

declare(strict_types=1);

$file = fopen('nonexistent.txt', 'r');
if ($file === false) {
    die("File open failed");
}

$position = ftell($file);
if ($position === false) {
    die("ftell failed");
}

echo "Position: $position";
fclose($file);

This shows proper error handling. Always check if ftell returns
false, indicating an error condition.

## Best Practices

- **Error Checking:** Always verify ftell doesn't return false.

- **Binary Safety:** Use 'b' mode for consistent positions.

- **Large Files:** Works with files larger than 2GB on 64-bit.

- **Streams:** Works with network streams if seekable.

## Source

[PHP ftell Documentation](https://www.php.net/manual/en/function.ftell.php)

This tutorial covered the PHP ftell function with practical
examples showing file pointer position tracking in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Filesystem functions](/php/#php-fs).