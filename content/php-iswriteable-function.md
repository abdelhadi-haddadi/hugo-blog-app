+++
title = "PHP is_writeable Function"
date = 2025-08-29T20:05:58.111+01:00
draft = false
description = "PHP is_writeable function tutorial shows how to check file write permissions in PHP. Learn is_writeable with practical examples."
image = ""
imageBig = ""
categories = ["php-filesystem"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP is_writeable Function

last modified April 3, 2025

The PHP is_writeable function checks whether a file or directory
is writable. It's essential for file operations to verify permissions first.

## Basic Definition

The is_writeable function checks if the specified path exists and
is writable. It returns true if writable, false otherwise.

Syntax: is_writeable(string $filename): bool. Note that
is_writable is an alias with identical functionality. The function
considers both file permissions and filesystem restrictions.

## Basic is_writeable Example

This shows the simplest usage of is_writeable to check a file.

basic_is_writeable.php
  

&lt;?php

declare(strict_types=1);

$file = "data.txt";
if (is_writeable($file)) {
    echo "The file is writable";
} else {
    echo "The file is not writable";
}

This checks if "data.txt" exists and is writable. The result depends on your
filesystem permissions. Always check before attempting file operations.

## Checking Directory Write Permissions

is_writeable can also check directory permissions.

directory_check.php
  

&lt;?php

declare(strict_types=1);

$dir = "/var/www/uploads";
if (is_writeable($dir)) {
    echo "Directory is writable";
} else {
    echo "Cannot write to directory";
}

This verifies if the web server can write to the uploads directory. Directory
write permission is needed to create or modify files within it.

## Using is_writeable Before File Operations

A practical example checking permissions before writing to a file.

file_operation.php
  

&lt;?php

declare(strict_types=1);

$logFile = "application.log";
if (!is_writeable($logFile) &amp;&amp; file_exists($logFile)) {
    die("Log file exists but isn't writable");
}

$result = file_put_contents($logFile, "New log entry\n", FILE_APPEND);
if ($result === false) {
    die("Failed to write to log file");
}

echo "Log entry added successfully";

This demonstrates proper error handling when writing to files. We check
writeability before attempting the operation to prevent runtime errors.

## Checking Multiple Files

You can check write permissions for multiple files in one operation.

multiple_files.php
  

&lt;?php

declare(strict_types=1);

$files = ["config.ini", "cache/data.cache", "templates/default.html"];

foreach ($files as $file) {
    echo $file . ": " . (is_writeable($file) ? "Writable" : "Not writable") . "\n";
}

This loops through an array of files and reports their write status. Useful for
verifying all required files are accessible before application startup.

## Real-world Configuration Check

A more complex example checking configuration file permissions.

config_check.php
  

&lt;?php

declare(strict_types=1);

function checkConfigFile(string $path): void {
    if (!file_exists($path)) {
        if (!is_writeable(dirname($path))) {
            throw new RuntimeException("Config directory not writable");
        }
        return;
    }

    if (!is_writeable($path)) {
        throw new RuntimeException("Config file exists but isn't writable");
    }
}

checkConfigFile("/etc/myapp/config.ini");
echo "Configuration file check passed";

This function checks if either the config file is writable or its directory is
writable if the file doesn't exist yet. Demonstrates comprehensive permission
checking for configuration management.

## Edge Cases

is_writeable has some behaviors worth noting in edge cases.

edge_cases.php
  

&lt;?php

declare(strict_types=1);

// Non-existent file
var_dump(is_writeable("nonexistent.txt")); // bool(false)

// Symbolic link
symlink("data.txt", "link.txt");
var_dump(is_writeable("link.txt")); // Depends on target permissions

// Windows share
var_dump(is_writeable("\\\\server\\share\\file.txt")); // Checks network permissions

For non-existent files, returns false. For symlinks, checks the target file.
Windows network paths are supported but subject to additional permission layers.

## Best Practices

- **Check Early:** Verify permissions as soon as possible.

- **Error Handling:** Provide clear error messages when checks fail.

- **Security:** Don't expose sensitive permission details to users.

- **Race Conditions:** Be aware permissions may change between check and use.

- **Alternatives:** Consider try/catch for actual operations instead of just checks.

## Source

[PHP is_writeable Documentation](https://www.php.net/manual/en/function.is-writeable.php)

This tutorial covered the PHP is_writeable function with practical
examples showing its usage in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Filesystem functions](/php/#php-fs).