+++
title = "PHP is_writable Function"
date = 2025-08-29T20:05:58.123+01:00
draft = false
description = "PHP is_writable function tutorial shows how to check if a file or directory is writable in PHP. Learn is_writable with practical examples."
image = ""
imageBig = ""
categories = ["php-filesystem"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP is_writable Function

last modified April 3, 2025

The PHP is_writable function checks whether a file or directory
is writable. It's essential for file operations to avoid permission errors.

## Basic Definition

The is_writable function checks if the specified filename exists
and is writable. It returns true if the file exists and is writable.

Syntax: is_writable(string $filename): bool. The function checks
the effective user's permissions, not just the file mode.

## Basic is_writable Example

This shows the simplest usage of is_writable to check a file.

basic_is_writable.php
  

&lt;?php

declare(strict_types=1);

$file = "data.txt";

if (is_writable($file)) {
    echo "The file is writable";
} else {
    echo "The file is not writable";
}

This checks if "data.txt" is writable by the current user. The result depends
on both file permissions and the user running the script.

## Checking Directory Writability

is_writable can also check if a directory is writable.

directory_check.php
  

&lt;?php

declare(strict_types=1);

$dir = "/var/www/uploads";

if (is_writable($dir)) {
    echo "The directory is writable";
} else {
    echo "The directory is not writable";
}

This verifies if the web server can write to the uploads directory. Directory
writability is needed for creating or modifying files within it.

## Checking Before File Write

A practical example checking writability before attempting to write.

before_write.php
  

&lt;?php

declare(strict_types=1);

$logFile = "application.log";

if (!is_writable($logFile)) {
    die("Cannot write to log file. Check permissions.");
}

file_put_contents($logFile, "New log entry\n", FILE_APPEND);
echo "Log entry written successfully";

This prevents errors by checking writability before writing. It's a good
practice for robust file handling in applications.

## Relative vs Absolute Paths

The function works with both relative and absolute file paths.

path_types.php
  

&lt;?php

declare(strict_types=1);

$relative = "config/settings.ini";
$absolute = "/etc/php/8.2/php.ini";

var_dump(is_writable($relative));
var_dump(is_writable($absolute));

Both path types are valid. Relative paths are resolved relative to the
current working directory of the script.

## Checking Multiple Files

Example showing how to check writability for multiple files.

multiple_files.php
  

&lt;?php

declare(strict_types=1);

$files = [
    "data.csv",
    "reports/output.log",
    "/tmp/php_uploads"
];

foreach ($files as $file) {
    $status = is_writable($file) ? "writable" : "not writable";
    echo "{$file} is {$status}\n";
}

This efficiently checks multiple files in one loop. The ternary operator
makes the output concise and readable.

## Edge Cases

is_writable has specific behaviors with special cases.

edge_cases.php
  

&lt;?php

declare(strict_types=1);

// Non-existent file
var_dump(is_writable("nonexistent.txt"));

// Symbolic link
var_dump(is_writable("/var/www/html/symlink"));

// Windows share
var_dump(is_writable("\\\\server\\share\\file.txt"));

For non-existent files, it returns false. For symlinks, it checks the target.
Windows network paths are also supported with proper permissions.

## Best Practices

- **Error Handling:** Combine with file_exists for complete checks.

- **Security:** Validate paths before checking permissions.

- **Caching:** Results may be cached; clearstatcache() if needed.

- **Portability:** Works consistently across platforms.

## Source

[PHP is_writable Documentation](https://www.php.net/manual/en/function.is-writable.php)

This tutorial covered the PHP is_writable function with practical
examples showing its usage in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Filesystem functions](/php/#php-fs).