+++
title = "PHP is_dir Function"
date = 2025-08-29T20:05:55.857+01:00
draft = false
description = "PHP is_dir function tutorial shows how to check if a path is a directory in PHP. Learn is_dir with practical examples."
image = ""
imageBig = ""
categories = ["php-filesystem"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP is_dir Function

last modified April 3, 2025

The PHP is_dir function checks whether a path is a directory. It's
essential for filesystem operations where directory validation is needed.

## Basic Definition

The is_dir function checks if the given filename is a directory.
It returns true if the filename exists and is a directory, false otherwise.

Syntax: is_dir(string $filename): bool. The function caches results,
so multiple calls may return cached values until clearstatcache()
is called.

## Basic is_dir Example

This shows the simplest usage of is_dir to check a directory.

basic_is_dir.php
  

&lt;?php

declare(strict_types=1);

$path = "/var/www/html";
$isDirectory = is_dir($path);

var_dump($isDirectory); // Outputs: bool(true) if directory exists

This checks if "/var/www/html" is a directory. The function returns true only
if the path exists and is a directory, not a file or symlink.

## Checking Relative Paths

is_dir works with relative paths from the current working directory.

relative_path.php
  

&lt;?php

declare(strict_types=1);

$path = "docs";
$isDirectory = is_dir($path);

echo $isDirectory ? "Directory exists" : "Not a directory";

This checks if "docs" is a directory relative to the current script location.
Remember that relative paths depend on the current working directory.

## Checking Non-Existent Path

is_dir returns false for paths that don't exist or aren't directories.

nonexistent_path.php
  

&lt;?php

declare(strict_types=1);

$path = "/nonexistent/path";
$isDirectory = is_dir($path);

var_dump($isDirectory); // Outputs: bool(false)

The function returns false for non-existent paths. It doesn't throw errors for
invalid paths, making it safe for existence checking.

## Checking File vs Directory

This example demonstrates differentiating between files and directories.

file_vs_dir.php
  

&lt;?php

declare(strict_types=1);

$path1 = "/var/www/html/index.php";
$path2 = "/var/www/html";

$result1 = is_dir($path1) ? "Directory" : "Not directory";
$result2 = is_dir($path2) ? "Directory" : "Not directory";

echo $result1 . "\n"; // Outputs: Not directory
echo $result2 . "\n"; // Outputs: Directory

This shows how is_dir correctly identifies files vs directories.
It's useful for filesystem traversal where you need to handle each differently.

## Windows Path Example

is_dir works with Windows-style paths using backslashes.

windows_path.php
  

&lt;?php

declare(strict_types=1);

$path = "C:\\Windows\\System32";
$isDirectory = is_dir($path);

echo $isDirectory ? "Valid Windows directory" : "Invalid directory";

The function handles Windows paths correctly. Note that backslashes need to be
escaped in PHP strings, or you can use forward slashes which also work.

## Best Practices

- **Permission Checks:** Verify read permissions before checking.

- **Error Handling:** Combine with file_exists for robust checks.

- **Symbolic Links:** Use is_link with is_dir for symlink handling.

- **Performance:** Cache results when checking repeatedly.

- **Security:** Sanitize paths before filesystem operations.

## Source

[PHP is_dir Documentation](https://www.php.net/manual/en/function.is-dir.php)

This tutorial covered the PHP is_dir function with practical
examples showing directory validation in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Filesystem functions](/php/#php-fs).