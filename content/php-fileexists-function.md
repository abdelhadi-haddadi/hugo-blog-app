+++
title = "PHP file_exists Function"
date = 2025-08-29T20:05:45.817+01:00
draft = false
description = "PHP file_exists function tutorial shows how to check if files exist in PHP. Learn file_exists with practical examples."
image = ""
imageBig = ""
categories = ["php-filesystem"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP file_exists Function

last modified April 3, 2025

The PHP file_exists function checks whether a file or directory
exists. It's essential for file operations to avoid errors when accessing
nonexistent files.

## Basic Definition

The file_exists function checks if a file or directory exists at
the specified path. It returns true if the file/directory exists, false otherwise.

Syntax: file_exists(string $filename): bool. The function works
with both files and directories, and accepts relative and absolute paths.

## Basic file_exists Example

This shows the simplest usage of file_exists to check a file.

basic_file_exists.php
  

&lt;?php

declare(strict_types=1);

$file = "example.txt";

if (file_exists($file)) {
    echo "The file $file exists";
} else {
    echo "The file $file does not exist";
}

This checks if "example.txt" exists in the current directory. The function
returns a boolean that we use in a conditional statement.

## Checking Absolute Path

file_exists works with absolute paths to specific locations.

absolute_path.php
  

&lt;?php

declare(strict_types=1);

$file = "/var/www/html/config.ini";

if (file_exists($file)) {
    echo "Configuration file found";
} else {
    echo "Configuration file missing";
}

Here we check for a file at an absolute path. This is useful when you need to
verify system files or files at specific locations.

## Checking Directory Existence

The function can also check if a directory exists, not just files.

directory_check.php
  

&lt;?php

declare(strict_types=1);

$dir = "uploads";

if (file_exists($dir) &amp;&amp; is_dir($dir)) {
    echo "The directory $dir exists";
} else {
    echo "The directory $dir does not exist";
}

We combine file_exists with is_dir to specifically
check for directories. This ensures we're checking a directory, not a file.

## URL Check Example

file_exists doesn't work with HTTP URLs - it's for local files only.

url_check.php
  

&lt;?php

declare(strict_types=1);

$url = "https://example.com/image.jpg";

if (file_exists($url)) {
    echo "This will never be true for HTTP URLs";
} else {
    echo "Use file_get_contents or cURL for remote files";
}

This demonstrates that file_exists only works with local filesystem
paths. For URLs, you need different functions like file_get_contents.

## Permission Considerations

File permissions can affect file_exists results.

permissions_check.php
  

&lt;?php

declare(strict_types=1);

$restricted = "/etc/shadow";

if (file_exists($restricted)) {
    echo "File exists but you may not have access";
} else {
    echo "File may exist but is inaccessible";
}

Even if a file exists, PHP might not have permission to access it. The function
may return false for files the web server user can't read.

## Best Practices

- **Combine Checks:** Use with is_file/is_dir for specific checks.

- **Error Handling:** Implement proper error handling around file ops.

- **Security:** Validate and sanitize file paths before checking.

- **Caching:** Be aware PHP may cache file_exists results.

- **Performance:** Avoid excessive checks in loops.

## Source

[PHP file_exists Documentation](https://www.php.net/manual/en/function.file-exists.php)

This tutorial covered the PHP file_exists function with practical
examples showing its usage for checking file and directory existence.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Filesystem functions](/php/#php-fs).