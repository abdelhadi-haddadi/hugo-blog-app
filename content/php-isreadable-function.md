+++
title = "PHP is_readable Function"
date = 2025-08-29T20:05:57.012+01:00
draft = false
description = "PHP is_readable function tutorial shows how to check if a file is readable in PHP. Learn is_readable with practical examples."
image = ""
imageBig = ""
categories = ["php-filesystem"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP is_readable Function

last modified April 3, 2025

The PHP is_readable function checks whether a file exists and is
readable. It's essential for file operations to verify access permissions.

## Basic Definition

The is_readable function checks if a file exists and has read
permissions. It returns true if the file exists and is readable, false otherwise.

Syntax: is_readable(string $filename): bool. The function checks
both file existence and read permissions in a single call.

## Basic is_readable Example

This shows the simplest usage of is_readable to check a file.

basic_is_readable.php
  

&lt;?php

declare(strict_types=1);

$file = "data.txt";
$readable = is_readable($file);

echo $readable ? "File is readable" : "File is not readable";

This checks if "data.txt" exists and is readable. The function returns a boolean
that we can use in conditional statements.

## Checking Absolute Path

is_readable works with absolute file paths as well.

absolute_path.php
  

&lt;?php

declare(strict_types=1);

$file = "/var/www/html/config.ini";
$readable = is_readable($file);

if ($readable) {
    echo "Config file is readable";
} else {
    echo "Cannot read config file";
}

This example checks a specific absolute path. The function verifies both the
file's existence and the current user's read permissions.

## Checking Directory Readability

The function can also check if a directory is readable.

directory_check.php
  

&lt;?php

declare(strict_types=1);

$dir = "/var/www/uploads";
$readable = is_readable($dir);

echo $readable ? "Directory is readable" : "Cannot read directory";

This checks if the directory "/var/www/uploads" is readable. Note that directory
readability is different from file readability in terms of permissions.

## Checking Remote File

is_readable can check remote files with proper URL wrappers.

remote_file.php
  

&lt;?php

declare(strict_types=1);

$url = "https://example.com/data.json";
$readable = is_readable($url);

if ($readable) {
    $content = file_get_contents($url);
    echo "Fetched content";
} else {
    echo "Cannot access remote file";
}

This checks a remote file's readability. Note that URL wrappers must be enabled
in PHP for this to work properly.

## Checking Multiple Files

We can use is_readable in a loop to check multiple files.

multiple_files.php
  

&lt;?php

declare(strict_types=1);

$files = ["file1.txt", "file2.txt", "file3.txt"];

foreach ($files as $file) {
    if (is_readable($file)) {
        echo "$file is readable\n";
    } else {
        echo "$file is not readable\n";
    }
}

This example checks multiple files in an array. The function is called for each
file, returning its readability status individually.

## Edge Cases

is_readable has specific behaviors with certain edge cases.

edge_cases.php
  

&lt;?php

declare(strict_types=1);

$file1 = "";
$file2 = "nonexistent.txt";
$file3 = "/root/secret.txt";

var_dump(is_readable($file1)); // bool(false)
var_dump(is_readable($file2)); // bool(false)
var_dump(is_readable($file3)); // depends on permissions

Empty paths always return false. Non-existent files return false. Root-owned
files return false unless the script has appropriate permissions.

## Best Practices

- **Error Handling:** Always check return values carefully.

- **Permissions:** Understand file system permission models.

- **Caching:** Results may be cached; use clearstatcache().

- **Security:** Validate paths before using them.

- **Performance:** Avoid unnecessary repeated checks.

## Source

[PHP is_readable Documentation](https://www.php.net/manual/en/function.is-readable.php)

This tutorial covered the PHP is_readable function with practical
examples showing its usage in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Filesystem functions](/php/#php-fs).