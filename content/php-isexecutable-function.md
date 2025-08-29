+++
title = "PHP is_executable Function"
date = 2025-08-29T20:05:55.863+01:00
draft = false
description = "PHP is_executable function tutorial shows how to check if a file is executable in PHP. Learn is_executable with practical examples."
image = ""
imageBig = ""
categories = ["php-filesystem"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP is_executable Function

last modified April 3, 2025

The PHP is_executable function checks if a file is executable. It
verifies both file permissions and existence before returning a boolean result.

## Basic Definition

The is_executable function determines if the specified file is
executable. It checks both the file's existence and its executable permission.

Syntax: is_executable(string $filename): bool. Returns true if the
file exists and is executable, false otherwise. Works on both Unix and Windows.

## Basic is_executable Example

This shows the simplest usage of is_executable to check a file.

basic_is_executable.php
  

&lt;?php

declare(strict_types=1);

$file = "/usr/bin/php";
$isExecutable = is_executable($file);

echo $isExecutable ? "File is executable" : "File is not executable";

This checks if PHP binary is executable. The result depends on your system's
permissions. On most systems, this will return true for the PHP binary.

## Checking Script File

We can verify if a PHP script itself has executable permissions.

check_script.php
  

&lt;?php

declare(strict_types=1);

$script = __FILE__;
$isExecutable = is_executable($script);

if ($isExecutable) {
    echo "This script has executable permissions";
} else {
    echo "This script is not executable";
}

This checks the current script's executability. Note that PHP scripts typically
don't need executable flags since they're executed by the PHP interpreter.

## Windows Executable Check

On Windows, is_executable checks file extensions in PATHEXT.

windows_check.php
  

&lt;?php

declare(strict_types=1);

$file = "C:\\Windows\\System32\\cmd.exe";
$isExecutable = is_executable($file);

var_dump($isExecutable); // Outputs: bool(true)

This verifies if cmd.exe is executable. On Windows, it checks both file
existence and whether the extension is in the system's PATHEXT environment.

## Checking Directory

is_executable can also check if a directory is executable.

directory_check.php
  

&lt;?php

declare(strict_types=1);

$dir = "/tmp";
$isExecutable = is_executable($dir);

echo $isExecutable ? "Directory is searchable" : "Directory is not searchable";

For directories, executable permission means the directory is searchable. This
allows accessing files within the directory if read permissions are also set.

## Relative Path Check

The function works with relative paths as well as absolute paths.

relative_path.php
  

&lt;?php

declare(strict_types=1);

$file = "./test.sh";
$isExecutable = is_executable($file);

if ($isExecutable) {
    echo "The local test.sh script is executable";
} else {
    echo "The script is not executable or doesn't exist";
}

This checks a shell script in the current directory. Remember that relative paths
are resolved relative to the current working directory of the PHP process.

## Edge Cases

is_executable has specific behaviors with special cases.

edge_cases.php
  

&lt;?php

declare(strict_types=1);

$nonexistent = "/nonexistent/file";
$symlink = "/usr/bin/php"; // Assuming this is a symlink on your system

var_dump(is_executable($nonexistent)); // bool(false)
var_dump(is_executable($symlink));     // Follows symlink to target

For nonexistent files, it returns false. For symlinks, it follows to the target.
The function also considers the effective user ID when checking permissions.

## Best Practices

- **Check existence first:** Use file_exists before is_executable.

- **Error handling:** Consider using error suppression (@) in production.

- **Security:** Validate paths before checking permissions.

- **Cross-platform:** Be aware of Windows vs Unix differences.

- **Caching:** Results may be cached; use clearstatcache() if needed.

## Source

[PHP is_executable Documentation](https://www.php.net/manual/en/function.is-executable.php)

This tutorial covered the PHP is_executable function with practical
examples showing its usage in different scenarios across operating systems.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Filesystem functions](/php/#php-fs).