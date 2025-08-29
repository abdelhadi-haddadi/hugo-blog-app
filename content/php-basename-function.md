+++
title = "PHP basename Function"
date = 2025-08-29T20:05:38.018+01:00
draft = false
description = "PHP basename function tutorial shows how to extract filenames from paths in PHP. Learn basename with practical examples."
image = ""
imageBig = ""
categories = ["php-filesystem"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP basename Function

last modified April 3, 2025

The PHP basename function extracts the filename component from a
path string. It's useful for working with file paths in a cross-platform way.

## Basic Definition

The basename function returns the trailing name component of a
path. It takes two parameters: the path string and an optional suffix to remove.

Syntax: basename(string $path, string $suffix = ""): string. The
function is binary-safe and works with both Unix and Windows paths.

## Basic basename Example

This shows the simplest usage of basename to extract a filename.

basic_basename.php
  

&lt;?php

declare(strict_types=1);

$path = "/var/www/html/index.php";
$filename = basename($path);

echo $filename; // Outputs: index.php

This extracts "index.php" from the full path. The function works the same
regardless of the directory separator used in the input path.

## Removing File Extension

The second parameter can remove a specified suffix from the result.

basename_suffix.php
  

&lt;?php

declare(strict_types=1);

$path = "/var/www/html/index.php";
$filename = basename($path, ".php");

echo $filename; // Outputs: index

Here we remove the ".php" extension from the result. Note that the suffix must
match exactly, including case sensitivity on case-sensitive filesystems.

## Windows Path Example

basename works with Windows paths using backslashes.

windows_path.php
  

&lt;?php

declare(strict_types=1);

$path = "C:\\Windows\\System32\\kernel32.dll";
$filename = basename($path);

echo $filename; // Outputs: kernel32.dll

The function correctly handles Windows-style paths. It returns "kernel32.dll"
regardless of the directory separator style used in the input.

## URL Path Example

basename can also extract the last component from URLs.

url_path.php
  

&lt;?php

declare(strict_types=1);

$url = "https://example.com/images/logo.png";
$filename = basename($url);

echo $filename; // Outputs: logo.png

This extracts "logo.png" from the URL. Note that basename doesn't
validate URLs - it just processes them as strings.

## Multiple Directory Levels

The function works with paths containing multiple directory levels.

multi_level.php
  

&lt;?php

declare(strict_types=1);

$path = "/home/user/docs/projects/php/README.md";
$filename = basename($path);

echo $filename; // Outputs: README.md

Despite multiple directory levels, basename correctly returns just
"README.md". It only looks at the last path component.

## Edge Cases

basename has some interesting behaviors with edge cases.

edge_cases.php
  

&lt;?php

declare(strict_types=1);

$path1 = "/var/www/html/";
$path2 = "/var/www/html";
$path3 = "filename.txt";

echo basename($path1); // Outputs: html
echo basename($path2); // Outputs: html
echo basename($path3); // Outputs: filename.txt

With directory paths (ending with separator), it returns the directory name. For
simple filenames, it returns the filename unchanged. Trailing slashes are
ignored.

## Best Practices

- **Validate Input:** Check paths exist before processing.

- **Handle Encoding:** Be aware of character encoding in paths.

- **Security:** Sanitize input when using in filesystem operations.

- **Cross-platform:** Use for both Unix and Windows paths.

## Source

[PHP basename Documentation](https://www.php.net/manual/en/function.basename.php)

This tutorial covered the PHP basename function with practical
examples showing its usage in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Filesystem functions](/php/#php-fs).