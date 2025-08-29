+++
title = "PHP lstat Function"
date = 2025-08-29T20:06:00.459+01:00
draft = false
description = "PHP lstat function tutorial shows how to get file status information in PHP. Learn lstat with practical examples."
image = ""
imageBig = ""
categories = ["php-filesystem"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP lstat Function

last modified April 3, 2025

The PHP lstat function gathers information about a file or symbolic
link. Unlike stat, it doesn't follow symbolic links.

## Basic Definition

The lstat function returns an array with file status information.
It works like stat but doesn't follow symbolic links.

Syntax: lstat(string $filename): array|false. Returns an array on
success or false on failure. The array contains detailed file statistics.

## Basic lstat Example

This shows the simplest usage of lstat to get file information.

basic_lstat.php
  

&lt;?php

declare(strict_types=1);

$file = "example.txt";
$stats = lstat($file);

if ($stats !== false) {
    print_r($stats);
} else {
    echo "Could not get file stats";
}

This outputs an array with file statistics. The array contains numeric and
associative indices with various file attributes like size and permissions.

## Checking File Size

We can use lstat to get the size of a file in bytes.

file_size.php
  

&lt;?php

declare(strict_types=1);

$file = "example.txt";
$stats = lstat($file);

if ($stats !== false) {
    echo "File size: " . $stats['size'] . " bytes";
} else {
    echo "Could not get file stats";
}

This displays the file size using the 'size' index from the stats array. The size
is always in bytes regardless of the filesystem.

## Checking File Permissions

lstat can be used to check file permissions and type.

file_permissions.php
  

&lt;?php

declare(strict_types=1);

$file = "example.txt";
$stats = lstat($file);

if ($stats !== false) {
    $permissions = $stats['mode'] &amp; 0777;
    echo "Permissions: " . decoct($permissions);
} else {
    echo "Could not get file stats";
}

This shows how to extract the permission bits from the mode value. We use bitwise
AND with 0777 to get only the permission bits.

## Checking File Modification Time

We can check when a file was last modified using lstat.

modification_time.php
  

&lt;?php

declare(strict_types=1);

$file = "example.txt";
$stats = lstat($file);

if ($stats !== false) {
    $mtime = date("Y-m-d H:i:s", $stats['mtime']);
    echo "Last modified: " . $mtime;
} else {
    echo "Could not get file stats";
}

This converts the modification timestamp to a human-readable format. The 'mtime'
index contains the Unix timestamp of the last modification.

## Checking Symbolic Links

lstat is particularly useful for examining symbolic links.

symbolic_link.php
  

&lt;?php

declare(strict_types=1);

$link = "symlink_to_file";
$stats = lstat($link);

if ($stats !== false) {
    if (($stats['mode'] &amp; 0xF000) === 0xA000) {
        echo "This is a symbolic link";
    } else {
        echo "This is not a symbolic link";
    }
} else {
    echo "Could not get file stats";
}

This checks if the file is a symbolic link by examining the mode bits. The value
0xA000 in the mode indicates a symbolic link.

## Best Practices

- **Error Handling:** Always check if lstat returns false.

- **Symbolic Links:** Use lstat when you need link info.

- **Performance:** Cache results if checking multiple times.

- **Security:** Validate filenames before using.

## Source

[PHP lstat Documentation](https://www.php.net/manual/en/function.lstat.php)

This tutorial covered the PHP lstat function with practical
examples showing its usage in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Filesystem functions](/php/#php-fs).