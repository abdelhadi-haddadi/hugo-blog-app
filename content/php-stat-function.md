+++
title = "PHP stat Function"
date = 2025-08-29T20:06:06.066+01:00
draft = false
description = "PHP stat function tutorial shows how to get file status information in PHP. Learn stat with practical examples."
image = ""
imageBig = ""
categories = ["php-filesystem"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP stat Function

last modified April 3, 2025

The PHP stat function retrieves file status information. It returns
an array with detailed statistics about a file or symbolic link.

## Basic Definition

The stat function gathers information about a file. It returns an
associative array with numeric and string indices containing file statistics.

Syntax: stat(string $filename): array|false. Returns false on
failure. The array contains 13 elements with both numeric and named keys.

## Basic stat Example

This example shows how to get basic file information using stat.

basic_stat.php
  

&lt;?php

declare(strict_types=1);

$file = 'example.txt';
$stats = stat($file);

if ($stats !== false) {
    echo "File size: " . $stats['size'] . " bytes\n";
    echo "Last modified: " . date('Y-m-d H:i:s', $stats['mtime']);
}

This retrieves the file size and modification time. The size is in
bytes, and mtime is a Unix timestamp converted to readable format.

## Checking File Type

We can use stat to determine if a path is a file or directory.

file_type.php
  

&lt;?php

declare(strict_types=1);

$path = 'example.txt';
$stats = stat($path);

if ($stats !== false) {
    $mode = $stats['mode'];
    if (($mode &amp; 0x4000) === 0x4000) {
        echo "This is a directory";
    } else {
        echo "This is a regular file";
    }
}

This checks the file mode bits to determine the type. The bitmask 0x4000
identifies directories in Unix-like systems.

## File Permissions

stat can be used to check file permissions.

file_permissions.php
  

&lt;?php

declare(strict_types=1);

$file = 'example.txt';
$stats = stat($file);

if ($stats !== false) {
    $permissions = $stats['mode'] &amp; 0777;
    echo "Permissions: " . decoct($permissions);
}

This extracts the permission bits from the mode. The octal representation shows
Unix-style permissions like 644 or 755.

## File Access Times

The function provides three different timestamps for file access.

file_times.php
  

&lt;?php

declare(strict_types=1);

$file = 'example.txt';
$stats = stat($file);

if ($stats !== false) {
    echo "Created: " . date('Y-m-d H:i:s', $stats['ctime']) . "\n";
    echo "Modified: " . date('Y-m-d H:i:s', $stats['mtime']) . "\n";
    echo "Accessed: " . date('Y-m-d H:i:s', $stats['atime']);
}

This displays creation, modification, and access times. Note that ctime
on Unix is inode change time, not creation time.

## Symbolic Link Stats

stat follows symbolic links by default. Use lstat for
link information.

symlink_stats.php
  

&lt;?php

declare(strict_types=1);

$link = 'symlink_to_file';
$stats = lstat($link);

if ($stats !== false) {
    echo "Link size: " . $stats['size'] . " bytes\n";
    echo "Is symlink: " . (is_link($link) ? 'Yes' : 'No');
}

This shows how to get information about the symbolic link itself rather than
the target file. The size here is the length of the link path.

## Best Practices

- **Error Handling:** Always check if stat returns false.

- **Performance:** Cache results for repeated access.

- **Security:** Validate paths before processing.

- **Cross-platform:** Be aware of system differences.

## Source

[PHP stat Documentation](https://www.php.net/manual/en/function.stat.php)

This tutorial covered the PHP stat function with practical
examples showing its usage for file information retrieval.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Filesystem functions](/php/#php-fs).