+++
title = "PHP fstat Function"
date = 2025-08-29T20:05:53.663+01:00
draft = false
description = "PHP fstat function tutorial shows how to get file status information in PHP. Learn fstat with practical examples."
image = ""
imageBig = ""
categories = ["php-filesystem"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP fstat Function

last modified April 3, 2025

The PHP fstat function retrieves file status information from an
open file pointer. It provides details like size, permissions, and timestamps.

## Basic Definition

The fstat function returns an array with statistics about a file.
It requires an open file resource handle as its only parameter.

Syntax: fstat(resource $stream): array|false. The function returns
an associative array on success or false on failure.

## Basic fstat Example

This example shows how to get basic file information using fstat.

basic_fstat.php
  

&lt;?php

declare(strict_types=1);

$file = fopen('example.txt', 'r');
$stats = fstat($file);

print_r($stats);
fclose($file);

This opens a file and prints its statistics. The output includes file size,
access time, and other metadata. Always close files after use.

## Getting File Size

This example demonstrates extracting the file size from fstat results.

file_size.php
  

&lt;?php

declare(strict_types=1);

$file = fopen('example.txt', 'r');
$stats = fstat($file);

if ($stats !== false) {
    echo "File size: " . $stats['size'] . " bytes";
}
fclose($file);

The 'size' index contains the file size in bytes. We check if fstat succeeded
before accessing the array. This is good practice for error handling.

## Checking File Modification Time

This example shows how to get the last modification time of a file.

modification_time.php
  

&lt;?php

declare(strict_types=1);

$file = fopen('example.txt', 'r');
$stats = fstat($file);

if ($stats !== false) {
    $mtime = date('Y-m-d H:i:s', $stats['mtime']);
    echo "Last modified: " . $mtime;
}
fclose($file);

The 'mtime' index contains the Unix timestamp of last modification. We format
it for human readability using date(). This helps in file monitoring systems.

## File Permissions Example

This example demonstrates checking file permissions using fstat.

file_permissions.php
  

&lt;?php

declare(strict_types=1);

$file = fopen('example.txt', 'r');
$stats = fstat($file);

if ($stats !== false) {
    $permissions = decoct($stats['mode'] &amp; 0777);
    echo "File permissions: " . $permissions;
}
fclose($file);

The 'mode' index contains file permissions in octal format. We mask it with
0777 to get only permission bits. decoct() converts it to readable octal.

## Comparing File Stats

This example compares stats of two files to check if they're identical.

compare_files.php
  

&lt;?php

declare(strict_types=1);

$file1 = fopen('file1.txt', 'r');
$file2 = fopen('file2.txt', 'r');

$stats1 = fstat($file1);
$stats2 = fstat($file2);

if ($stats1['ino'] === $stats2['ino']) {
    echo "Files are the same (same inode)";
} else {
    echo "Files are different";
}

fclose($file1);
fclose($file2);

The 'ino' index contains the inode number, unique per file. Comparing inodes
is more reliable than comparing filenames. This helps detect hard links.

## Best Practices

- **Error Handling:** Always check if fstat returns false.

- **Resource Management:** Close files after getting stats.

- **Performance:** Cache results if needed multiple times.

- **Security:** Validate file paths before opening.

## Source

[PHP fstat Documentation](https://www.php.net/manual/en/function.fstat.php)

This tutorial covered the PHP fstat function with practical
examples showing its usage for file information retrieval.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Filesystem functions](/php/#php-fs).