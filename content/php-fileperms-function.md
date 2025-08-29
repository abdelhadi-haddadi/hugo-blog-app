+++
title = "PHP fileperms Function"
date = 2025-08-29T20:05:49.186+01:00
draft = false
description = "PHP fileperms function tutorial shows how to check file permissions in PHP. Learn fileperms with practical examples."
image = ""
imageBig = ""
categories = ["php-filesystem"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP fileperms Function

last modified April 3, 2025

The PHP fileperms function retrieves permissions for a file or
directory. It returns the permissions as a numeric value that can be formatted.

## Basic Definition

The fileperms function returns the permissions of the specified
file. The return value is a bitmask that needs decoding to human-readable form.

Syntax: fileperms(string $filename): int|false. Returns false on
failure. The result contains file type and permission bits combined.

## Basic fileperms Example

This shows the simplest usage of fileperms to get permissions.

basic_fileperms.php
  

&lt;?php

declare(strict_types=1);

$filename = "example.txt";
$perms = fileperms($filename);

echo $perms; // Outputs numeric value like 33206

This returns a numeric value representing the file permissions. The number needs
to be converted to octal for meaningful interpretation.

## Formatting Permissions

We can format the numeric permissions to a human-readable string.

format_perms.php
  

&lt;?php

declare(strict_types=1);

$filename = "example.txt";
$perms = fileperms($filename);

echo substr(sprintf('%o', $perms), -4); // Outputs like 0644

This converts the permissions to octal and shows the last 4 digits. The first
digit represents special bits, the next three are owner/group/others.

## Checking Specific Permissions

We can check if specific permissions are set using bitwise operations.

check_perms.php
  

&lt;?php

declare(strict_types=1);

$filename = "example.txt";
$perms = fileperms($filename);

if ($perms &amp; 0x0080) {
    echo "Owner has write permission\n";
} else {
    echo "Owner doesn't have write permission\n";
}

This checks if the owner has write permission (0x0080). Bitwise AND compares the
permission bits with our test value.

## Getting File Type

The permission value also contains information about the file type.

file_type.php
  

&lt;?php

declare(strict_types=1);

$filename = "example.txt";
$perms = fileperms($filename);

switch ($perms &amp; 0xF000) {
    case 0xC000: echo "Socket"; break;
    case 0xA000: echo "Symbolic link"; break;
    case 0x8000: echo "Regular file"; break;
    case 0x6000: echo "Block device"; break;
    case 0x4000: echo "Directory"; break;
    case 0x2000: echo "Character device"; break;
    case 0x1000: echo "FIFO pipe"; break;
    default: echo "Unknown file type";
}

This checks the high bits of the permission value to determine file type. Each
file type has a unique identifier in the highest bits.

## Complete Permission String

We can create a complete permission string like "drwxr-xr-x".

full_perms.php
  

&lt;?php

declare(strict_types=1);

function getPerms($filename): string {
    $perms = fileperms($filename);
    $info = '';
    
    $info .= (($perms &amp; 0x4000) ? 'd' : '-');
    $info .= (($perms &amp; 0x0100) ? 'r' : '-');
    $info .= (($perms &amp; 0x0080) ? 'w' : '-');
    $info .= (($perms &amp; 0x0040) ? 'x' : '-');
    $info .= (($perms &amp; 0x0020) ? 'r' : '-');
    $info .= (($perms &amp; 0x0010) ? 'w' : '-');
    $info .= (($perms &amp; 0x0008) ? 'x' : '-');
    $info .= (($perms &amp; 0x0004) ? 'r' : '-');
    $info .= (($perms &amp; 0x0002) ? 'w' : '-');
    $info .= (($perms &amp; 0x0001) ? 'x' : '-');
    
    return $info;
}

echo getPerms("example.txt"); // Outputs like -rw-r--r--

This builds a complete permission string by checking each permission bit. The
first character shows file type, followed by owner/group/others permissions.

## Best Practices

- **Error Handling:** Always check if fileperms returns false.

- **Security:** Be careful with sensitive file permissions.

- **Cross-platform:** Results may vary between operating systems.

- **Performance:** Cache results if checking repeatedly.

## Source

[PHP fileperms Documentation](https://www.php.net/manual/en/function.fileperms.php)

This tutorial covered the PHP fileperms function with practical
examples showing how to check and interpret file permissions.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Filesystem functions](/php/#php-fs).