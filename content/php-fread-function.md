+++
title = "PHP fread Function"
date = 2025-08-29T20:05:52.547+01:00
draft = false
description = "PHP fread function tutorial shows how to read files in PHP. Learn fread with practical examples."
image = ""
imageBig = ""
categories = ["php-filesystem"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP fread Function

last modified April 3, 2025

The PHP fread function reads from an open file pointer. It's a
binary-safe function that reads up to a specified number of bytes.

## Basic Definition

The fread function reads from a file pointer. It takes two
parameters: the file handle and the length to read.

Syntax: fread(resource $stream, int $length): string|false. The
function returns the read string or false on failure.

## Basic fread Example

This shows the simplest usage of fread to read a file.

basic_fread.php
  

&lt;?php

declare(strict_types=1);

$filename = "example.txt";
$handle = fopen($filename, "r");
$contents = fread($handle, filesize($filename));
fclose($handle);

echo $contents;

This reads the entire contents of example.txt. We first open the file, read it,
then close the handle. Always close file handles when done.

## Reading Fixed Length

fread can read a specific number of bytes from a file.

fixed_length.php
  

&lt;?php

declare(strict_types=1);

$filename = "data.bin";
$handle = fopen($filename, "rb");
$chunk = fread($handle, 1024);
fclose($handle);

echo "Read " . strlen($chunk) . " bytes";

Here we read exactly 1024 bytes from a binary file. The "rb" mode ensures
binary-safe reading on all platforms.

## Reading Line by Line

Combine fread with other functions for line-based reading.

line_by_line.php
  

&lt;?php

declare(strict_types=1);

$filename = "lines.txt";
$handle = fopen($filename, "r");

while (!feof($handle)) {
    $line = fread($handle, 4096); // Read in chunks
    echo $line;
}

fclose($handle);

This reads the file in 4096-byte chunks until EOF. For text files, consider
using fgets instead for line-by-line reading.

## Binary File Reading

fread is ideal for reading binary files like images.

binary_file.php
  

&lt;?php

declare(strict_types=1);

$filename = "image.jpg";
$handle = fopen($filename, "rb");
$data = fread($handle, filesize($filename));
fclose($handle);

header("Content-Type: image/jpeg");
echo $data;

This reads a JPEG image and outputs it directly. The binary mode ensures no
data corruption occurs during reading.

## Reading with Offset

Combine fread with fseek for random access.

offset_read.php
  

&lt;?php

declare(strict_types=1);

$filename = "largefile.dat";
$handle = fopen($filename, "rb");
fseek($handle, 1024); // Skip first 1KB
$data = fread($handle, 512); // Read 512 bytes
fclose($handle);

echo "Read " . strlen($data) . " bytes from offset 1024";

This demonstrates reading from a specific file offset. Useful for large files
where you only need certain sections.

## Best Practices

- **Error Handling:** Always check if fopen succeeded.

- **Resource Cleanup:** Use try-finally for handle cleanup.

- **Memory Limits:** Be mindful when reading large files.

- **Binary Safety:** Use "b" mode for binary files.

- **Performance:** Choose appropriate chunk sizes.

## Source

[PHP fread Documentation](https://www.php.net/manual/en/function.fread.php)

This tutorial covered the PHP fread function with practical
examples showing its usage in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Filesystem functions](/php/#php-fs).