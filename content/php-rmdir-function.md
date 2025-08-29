+++
title = "PHP rmdir Function"
date = 2025-08-29T20:06:06.095+01:00
draft = false
description = "PHP rmdir function tutorial shows how to remove directories in PHP. Learn rmdir with practical examples."
image = ""
imageBig = ""
categories = ["php-filesystem"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP rmdir Function

last modified April 3, 2025

The PHP rmdir function removes an empty directory from the
filesystem. It's essential for directory management in PHP applications.

## Basic Definition

The rmdir function attempts to remove the specified directory.
The directory must be empty and the script must have proper permissions.

Syntax: rmdir(string $directory, resource $context = null): bool.
Returns true on success or false on failure. Throws warnings on errors.

## Basic rmdir Example

This shows the simplest usage of rmdir to remove an empty directory.

basic_rmdir.php
  

&lt;?php

declare(strict_types=1);

$dir = "temp_dir";

if (rmdir($dir)) {
    echo "Directory removed successfully";
} else {
    echo "Failed to remove directory";
}

This attempts to remove "temp_dir". The directory must exist and be empty.
The function returns true on success, false on failure.

## Checking Directory Existence

It's good practice to check if directory exists and is empty before removal.

check_before_rmdir.php
  

&lt;?php

declare(strict_types=1);

$dir = "empty_dir";

if (file_exists($dir) &amp;&amp; is_dir($dir)) {
    if (count(scandir($dir)) == 2) {
        rmdir($dir);
        echo "Directory removed";
    } else {
        echo "Directory not empty";
    }
} else {
    echo "Directory does not exist";
}

This checks existence and emptiness before removal. scandir returns
array with "." and ".." for empty directories (count = 2).

## Handling rmdir Errors

Proper error handling makes directory removal more robust.

error_handling.php
  

&lt;?php

declare(strict_types=1);

$dir = "non_empty_dir";

try {
    if (!rmdir($dir)) {
        throw new RuntimeException("Could not remove directory");
    }
    echo "Directory removed successfully";
} catch (RuntimeException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This uses exception handling to manage rmdir failures. The
RuntimeException provides details about what went wrong.

## Relative and Absolute Paths

rmdir works with both relative and absolute directory paths.

path_types.php
  

&lt;?php

declare(strict_types=1);

// Relative path
$relativeDir = "temp/subdir";
rmdir($relativeDir);

// Absolute path
$absoluteDir = "/var/www/temp/subdir";
rmdir($absoluteDir);

Both path types work with rmdir. Relative paths are resolved
relative to the current working directory of the script.

## Using Context Parameter

The optional context parameter can modify how the function behaves.

context_parameter.php
  

&lt;?php

declare(strict_types=1);

$dir = "temp_dir";
$context = stream_context_create();

if (rmdir($dir, $context)) {
    echo "Directory removed with context";
} else {
    echo "Failed to remove directory";
}

Context can specify stream options like timeout or notification callbacks.
This example shows basic context usage with default options.

## Best Practices

- **Check emptiness:** Always verify directory is empty first.

- **Error handling:** Implement proper error handling.

- **Permissions:** Ensure script has delete permissions.

- **Relative paths:** Be careful with relative path resolution.

- **Cleanup:** Consider recursive deletion for non-empty dirs.

## Source

[PHP rmdir Documentation](https://www.php.net/manual/en/function.rmdir.php)

This tutorial covered the PHP rmdir function with practical
examples showing its usage in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Filesystem functions](/php/#php-fs).