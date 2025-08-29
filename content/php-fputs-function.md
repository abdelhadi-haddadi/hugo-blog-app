+++
title = "PHP fputs Function"
date = 2025-08-29T20:05:51.405+01:00
draft = false
description = "PHP fputs function tutorial shows how to write data to files in PHP. Learn fputs with practical examples."
image = ""
imageBig = ""
categories = ["php-filesystem"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP fputs Function

last modified April 3, 2025

The PHP fputs function writes data to a file. It's identical to
fwrite and provides low-level file writing capabilities.

## Basic Definition

The fputs function writes a string to a file pointer. It takes
three parameters: the file handle, the string to write, and optional length.

Syntax: fputs(resource $handle, string $string, int $length = ?): int.
It returns the number of bytes written or false on failure.

## Basic fputs Example

This shows the simplest usage of fputs to write to a file.

basic_fputs.php
  

&lt;?php

declare(strict_types=1);

$file = fopen("output.txt", "w");

if ($file) {
    $bytes = fputs($file, "Hello, World!");
    fclose($file);
    echo "Wrote $bytes bytes to file.";
}

This writes "Hello, World!" to output.txt. Always check if fopen succeeded
and remember to close the file with fclose when done.

## Appending to a File

Use the "a" mode to append content to an existing file.

append_fputs.php
  

&lt;?php

declare(strict_types=1);

$file = fopen("log.txt", "a");

if ($file) {
    $message = date('Y-m-d H:i:s') . " - User logged in\n";
    fputs($file, $message);
    fclose($file);
}

This appends a timestamped message to log.txt. The "a" mode creates the file
if it doesn't exist and preserves existing content.

## Writing Binary Data

fputs can write binary data when using the "b" mode flag.

binary_fputs.php
  

&lt;?php

declare(strict_types=1);

$file = fopen("data.bin", "wb");

if ($file) {
    $binaryData = pack('C*', 0x48, 0x65, 0x6C, 0x6C, 0x6F);
    $bytes = fputs($file, $binaryData);
    fclose($file);
    echo "Wrote $bytes bytes of binary data.";
}

This writes binary data (ASCII codes for "Hello") to a file. The "b" mode
ensures proper handling of binary data across platforms.

## Writing with Length Limit

The optional length parameter limits how many bytes are written.

length_fputs.php
  

&lt;?php

declare(strict_types=1);

$file = fopen("partial.txt", "w");

if ($file) {
    $text = "This is a long string that will be truncated";
    $bytes = fputs($file, $text, 10);
    fclose($file);
    echo "Wrote first $bytes characters: " . substr($text, 0, 10);
}

This writes only the first 10 bytes of the string. The length parameter is
useful when you need to write fixed-size chunks of data.

## Error Handling

Proper error handling ensures robustness when writing files.

error_fputs.php
  

&lt;?php

declare(strict_types=1);

$file = @fopen("readonly.txt", "w");

if ($file === false) {
    die("Failed to open file");
}

$result = fputs($file, "Attempt to write");

if ($result === false) {
    echo "Failed to write to file";
} else {
    echo "Successfully wrote $result bytes";
}

fclose($file);

This shows proper error checking for both file opening and writing. The @
suppresses warnings, allowing custom error handling.

## Best Practices

- **Check Returns:** Always verify fputs return value.

- **Proper Modes:** Use correct file opening modes.

- **Resource Cleanup:** Always close files with fclose.

- **Error Handling:** Implement comprehensive error checking.

- **Binary Safety:** Use "b" mode for binary data.

## Source

[PHP fputs Documentation](https://www.php.net/manual/en/function.fputs.php)

This tutorial covered the PHP fputs function with practical
examples showing its usage in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Filesystem functions](/php/#php-fs).