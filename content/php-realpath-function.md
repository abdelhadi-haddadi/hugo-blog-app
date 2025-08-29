+++
title = "PHP realpath Function"
date = 2025-08-29T20:06:03.851+01:00
draft = false
description = "PHP realpath function tutorial shows how to resolve absolute canonical paths in PHP. Learn realpath with practical examples."
image = ""
imageBig = ""
categories = ["php-filesystem"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP realpath Function

last modified April 3, 2025

The PHP realpath function resolves absolute canonical paths from
relative or symbolic paths. It expands all symbolic links and resolves path
components.

## Basic Definition

The realpath function returns the absolute canonicalized pathname.
It resolves all symbolic links, '/./', '/../' and extra '/' characters.

Syntax: realpath(string $path): string|false. Returns the absolute
path on success or false on failure. The function is binary-safe.

## Basic realpath Example

This shows the simplest usage of realpath to resolve a relative path.

basic_realpath.php
  

&lt;?php

declare(strict_types=1);

$path = "../config/settings.ini";
$absolute = realpath($path);

echo $absolute; // Outputs absolute path like: /home/user/project/config/settings.ini

This converts a relative path to an absolute one. The exact output depends on
your filesystem structure. The function returns false if the path doesn't exist.

## Resolving Symbolic Links

realpath resolves symbolic links to their actual paths.

symlink_resolution.php
  

&lt;?php

declare(strict_types=1);

// Assuming /var/www is a symlink to /srv/www
$path = "/var/www/html/index.php";
$absolute = realpath($path);

echo $absolute; // Outputs: /srv/www/html/index.php

Here the function resolves the symbolic link to the actual path. This is useful
for getting the true location of files behind symlinks.

## Handling Non-Existent Paths

realpath returns false when the path doesn't exist.

nonexistent_path.php
  

&lt;?php

declare(strict_types=1);

$path = "/nonexistent/path/to/file.txt";
$absolute = realpath($path);

var_dump($absolute); // Outputs: bool(false)

Always check the return value before using it. This prevents errors when working
with paths that might not exist in your filesystem.

## Resolving Relative Components

The function resolves relative path components like '../' and './'.

relative_components.php
  

&lt;?php

declare(strict_types=1);

$path = "/var/www/../tmp/./file.log";
$absolute = realpath($path);

echo $absolute; // Outputs: /tmp/file.log

This resolves '/var/www/../tmp' to '/tmp' and './file.log' to 'file.log'. The
result is the simplest absolute path representation.

## Windows Path Example

realpath works with Windows paths using backslashes.

windows_path.php
  

&lt;?php

declare(strict_types=1);

$path = "C:\\Windows\\System32\\..\\notepad.exe";
$absolute = realpath($path);

echo $absolute; // Outputs: C:\Windows\notepad.exe

The function correctly handles Windows-style paths and resolves the parent
directory reference. It works with both forward and backward slashes.

## Best Practices

- **Error Checking:** Always check if the return value is false.

- **Security:** Use for path validation before file operations.

- **Performance:** Cache results when used frequently.

- **Cross-platform:** Works consistently across operating systems.

## Source

[PHP realpath Documentation](https://www.php.net/manual/en/function.realpath.php)

This tutorial covered the PHP realpath function with practical
examples showing its usage in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Filesystem functions](/php/#php-fs).