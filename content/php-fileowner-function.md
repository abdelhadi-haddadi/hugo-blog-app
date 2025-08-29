+++
title = "PHP fileowner Function"
date = 2025-08-29T20:05:48.080+01:00
draft = false
description = "PHP fileowner function tutorial shows how to get file owner information in PHP. Learn fileowner with practical examples."
image = ""
imageBig = ""
categories = ["php-filesystem"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP fileowner Function

last modified April 3, 2025

The PHP fileowner function retrieves the owner of a specified file.
It returns the user ID of the file owner, which can be resolved to a username.

## Basic Definition

The fileowner function returns the user ID of the owner of a file.
It takes one parameter: the path to the file as a string.

Syntax: fileowner(string $filename): int|false. Returns the user ID
on success or false on failure. The result is numeric on Unix systems.

## Basic fileowner Example

This shows the simplest usage of fileowner to get a file owner ID.

basic_fileowner.php
  

&lt;?php

declare(strict_types=1);

$filename = "/var/www/html/index.php";
$ownerId = fileowner($filename);

if ($ownerId !== false) {
    echo "File owner ID: " . $ownerId;
} else {
    echo "Could not get file owner";
}

This retrieves the numeric user ID of the file owner. The ID can be resolved to
a username using posix_getpwuid on Unix-like systems.

## Getting Owner Username

This example shows how to convert the owner ID to a readable username.

fileowner_username.php
  

&lt;?php

declare(strict_types=1);

$filename = "/etc/passwd";
$ownerId = fileowner($filename);

if ($ownerId !== false) {
    $ownerInfo = posix_getpwuid($ownerId);
    echo "File owner: " . $ownerInfo['name'];
} else {
    echo "Could not get file owner";
}

Here we use posix_getpwuid to convert the numeric ID to a username.
Note this function is only available on Unix-like systems with POSIX extension.

## Checking File Ownership

This example checks if the current user owns a specific file.

check_ownership.php
  

&lt;?php

declare(strict_types=1);

$filename = "test.txt";
$ownerId = fileowner($filename);
$currentUserId = posix_geteuid();

if ($ownerId !== false) {
    if ($ownerId === $currentUserId) {
        echo "You own this file";
    } else {
        echo "You don't own this file";
    }
} else {
    echo "Could not check file ownership";
}

We compare the file owner ID with the current effective user ID. This is useful
for permission checks before performing sensitive file operations.

## Error Handling

This demonstrates proper error handling when using fileowner.

error_handling.php
  

&lt;?php

declare(strict_types=1);

$filename = "nonexistent.txt";
$ownerId = @fileowner($filename);

if ($ownerId === false) {
    $error = error_get_last();
    echo "Error: " . $error['message'];
} else {
    echo "File owner ID: " . $ownerId;
}

We use the @ operator to suppress warnings and check the return value explicitly.
The error_get_last function retrieves the last occurred error.

## Windows Compatibility

This shows fileowner behavior on Windows systems.

windows_compat.php
  

&lt;?php

declare(strict_types=1);

$filename = "C:\\Windows\\win.ini";
$ownerId = fileowner($filename);

if ($ownerId !== false) {
    echo "File owner ID: " . $ownerId;
} else {
    echo "Could not get file owner (Windows may return 0)";
}

On Windows, fileowner typically returns 0 (SYSTEM) or may fail.
Windows has different permission systems than Unix-like operating systems.

## Best Practices

- **Error Handling:** Always check for false return value.

- **Security:** Validate file paths before use.

- **Windows:** Be aware of different behavior on Windows.

- **Caching:** Use clearstatcache if owner changes.

- **Permissions:** Ensure script has permission to check owners.

## Source

[PHP fileowner Documentation](https://www.php.net/manual/en/function.fileowner.php)

This tutorial covered the PHP fileowner function with practical
examples showing its usage in different scenarios and operating systems.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Filesystem functions](/php/#php-fs).