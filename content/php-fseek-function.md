+++
title = "PHP fseek Function"
date = 2025-08-29T20:05:52.536+01:00
draft = false
description = "PHP fseek function tutorial shows how to position file pointers in PHP. Learn fseek with practical examples."
image = ""
imageBig = ""
categories = ["php-filesystem"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP fseek Function

last modified April 3, 2025

The PHP fseek function sets the file position indicator for a file
pointer. It allows random access to file contents by moving the pointer.

## Basic Definition

The fseek function moves the file pointer to a specified position.
It takes three parameters: the file pointer, offset, and optional whence.

Syntax: fseek(resource $stream, int $offset, int $whence = SEEK_SET): int.
Returns 0 on success, -1 on failure. Works with files opened in binary mode.

## Basic fseek Example

This shows the simplest usage of fseek to move the file pointer.

basic_fseek.php
  

&lt;?php

declare(strict_types=1);

$file = fopen('data.txt', 'rb');
if ($file === false) {
    die("Failed to open file");
}

fseek($file, 10);
echo fread($file, 20);

fclose($file);

This moves the pointer to position 10 and reads 20 bytes. The default whence
parameter is SEEK_SET, meaning offset is from the start of the file.

## Seeking from Current Position

Using SEEK_CUR moves the pointer relative to its current position.

fseek_current.php
  

&lt;?php

declare(strict_types=1);

$file = fopen('data.txt', 'rb');
if ($file === false) {
    die("Failed to open file");
}

fseek($file, 10, SEEK_SET); // Move to position 10
fseek($file, 5, SEEK_CUR);  // Move 5 more bytes
echo fread($file, 15);

fclose($file);

This first moves to position 10, then moves 5 more bytes forward. The final
position is 15 bytes from the start of the file.

## Seeking from End of File

Using SEEK_END moves the pointer relative to the end of the file.

fseek_end.php
  

&lt;?php

declare(strict_types=1);

$file = fopen('data.txt', 'rb');
if ($file === false) {
    die("Failed to open file");
}

fseek($file, -10, SEEK_END); // 10 bytes from end
echo fread($file, 10);

fclose($file);

This positions the pointer 10 bytes before the end of the file. Negative offsets
are often used with SEEK_END to read the end of files.

## Checking File Position

Combine fseek with ftell to verify positions.

fseek_ftell.php
  

&lt;?php

declare(strict_types=1);

$file = fopen('data.txt', 'rb');
if ($file === false) {
    die("Failed to open file");
}

fseek($file, 25);
echo "Position: " . ftell($file) . "\n";

fseek($file, -5, SEEK_CUR);
echo "New position: " . ftell($file) . "\n";

fclose($file);

This shows the current position before and after seeking. ftell
returns the current position measured in bytes from the file start.

## Error Handling

Check fseek return value for error handling.

fseek_error.php
  

&lt;?php

declare(strict_types=1);

$file = fopen('data.txt', 'rb');
if ($file === false) {
    die("Failed to open file");
}

$result = fseek($file, 1000000);
if ($result === -1) {
    echo "Seek failed - position may be beyond EOF\n";
} else {
    echo "Seek successful\n";
}

fclose($file);

This attempts to seek beyond likely file size. The function returns -1 on
failure. Note that seeking beyond EOF isn't always an error in PHP.

## Best Practices

- **Binary Mode:** Always open files in binary mode for reliable seeking.

- **Error Checking:** Verify both fopen and fseek return values.

- **Position Validation:** Check positions don't exceed file size.

- **Resource Cleanup:** Always close files with fclose.

- **Large Files:** Use with caution on very large files (&gt;2GB).

## Source

[PHP fseek Documentation](https://www.php.net/manual/en/function.fseek.php)

This tutorial covered the PHP fseek function with practical
examples showing its usage in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Filesystem functions](/php/#php-fs).