+++
title = "PHP is_file Function"
date = 2025-08-29T20:05:55.843+01:00
draft = false
description = "PHP is_file function tutorial shows how to check if a path is a regular file in PHP. Learn is_file with practical examples."
image = ""
imageBig = ""
categories = ["php-filesystem"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP is_file Function

last modified April 3, 2025

The PHP is_file function checks whether a path is a regular file.
It's useful for verifying file existence and type before file operations.

## Basic Definition

The is_file function returns true if the filename exists and is a
regular file. It returns false for directories, symlinks, or non-existent paths.

Syntax: is_file(string $filename): bool. The function caches results
for better performance on repeated checks of the same file.

## Basic is_file Example

This shows the simplest usage of is_file to check a file.

basic_is_file.php
  

&lt;?php

declare(strict_types=1);

$path = "/var/www/html/index.php";

if (is_file($path)) {
    echo "The path points to a regular file.";
} else {
    echo "The path does not point to a regular file.";
}

This checks if "/var/www/html/index.php" is a regular file. The function returns
true only for actual files, not directories or special files.

## Checking Relative Path

is_file works with relative paths based on the current directory.

relative_path.php
  

&lt;?php

declare(strict_types=1);

$path = "config.ini";

if (is_file($path)) {
    echo "Found config file in current directory.";
} else {
    echo "Config file not found in current directory.";
}

This checks for "config.ini" in the current working directory. Remember that PHP's
current directory may differ from your script's location.

## Checking Multiple Files

You can use is_file to verify multiple files in an array.

multiple_files.php
  

&lt;?php

declare(strict_types=1);

$files = [
    "/var/log/apache2/access.log",
    "/var/log/apache2/error.log",
    "/var/log/apache2/other_vhosts_access.log"
];

foreach ($files as $file) {
    echo $file . " is " . (is_file($file) ? "a file" : "not a file") . "\n";
}

This loops through an array of log files and checks each one. The ternary operator
makes the output more readable by converting the boolean to text.

## Comparing with file_exists

is_file differs from file_exists in specificity.

compare_file_exists.php
  

&lt;?php

declare(strict_types=1);

$path = "/var/www/html/uploads";

$fileExists = file_exists($path);
$isFile = is_file($path);

echo "file_exists: " . ($fileExists ? "true" : "false") . "\n";
echo "is_file: " . ($isFile ? "true" : "false") . "\n";

For directories, file_exists returns true while is_file
returns false. Use is_file when you specifically need a regular file.

## Checking Symbolic Links

is_file follows symbolic links to check the target file.

symlink_check.php
  

&lt;?php

declare(strict_types=1);

$symlink = "/var/www/html/current";
$target = "/var/www/html/releases/v1.2.3";

if (is_file($symlink)) {
    echo "The symlink points to a regular file.";
} else {
    echo "The symlink does not point to a regular file.";
}

This checks if the symlink's target is a regular file. The function dereferences
symbolic links automatically to examine the actual file.

## Best Practices

- **Error Handling:** Combine with error suppression for robustness.

- **Performance:** Cache results if checking the same file repeatedly.

- **Security:** Validate paths before filesystem operations.

- **Clearance:** Check file permissions after existence checks.

## Source

[PHP is_file Documentation](https://www.php.net/manual/en/function.is-file.php)

This tutorial covered the PHP is_file function with practical
examples showing its usage in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Filesystem functions](/php/#php-fs).