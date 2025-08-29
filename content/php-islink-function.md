+++
title = "PHP is_link Function"
date = 2025-08-29T20:05:57.016+01:00
draft = false
description = "PHP is_link function tutorial shows how to check for symbolic links in PHP. Learn is_link with practical examples."
image = ""
imageBig = ""
categories = ["php-filesystem"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP is_link Function

last modified April 3, 2025

The PHP is_link function checks whether a filename is a symbolic
link. It's part of PHP's filesystem functions and helps in file system
operations.

## Basic Definition

The is_link function returns true if the filename exists and is a
symbolic link. It takes one parameter: the path to check.

Syntax: is_link(string $filename): bool. The function returns false
for non-existent files or files that aren't symbolic links.

## Basic is_link Example

This shows the simplest usage of is_link to check a file.

basic_is_link.php
  

&lt;?php

declare(strict_types=1);

$filename = "/path/to/symlink";

if (is_link($filename)) {
    echo "$filename is a symbolic link";
} else {
    echo "$filename is not a symbolic link";
}

This checks if the given path is a symbolic link. The function returns a boolean
that we can use in conditional statements.

## Checking Before Reading Link

We often use is_link before calling readlink.

is_link_readlink.php
  

&lt;?php

declare(strict_types=1);

$filename = "/path/to/symlink";

if (is_link($filename)) {
    $target = readlink($filename);
    echo "Link points to: $target";
} else {
    echo "Not a symbolic link";
}

Here we safely check if the file is a link before trying to read its target.
This prevents errors when calling readlink on non-links.

## Checking Multiple Files

We can use is_link in a loop to check multiple files.

multiple_files.php
  

&lt;?php

declare(strict_types=1);

$files = ["file1", "file2", "file3"];

foreach ($files as $file) {
    if (is_link($file)) {
        echo "$file is a symbolic link\n";
    }
}

This example checks each file in an array to see if it's a symbolic link. The
function works the same way when processing multiple files in sequence.

## Combining with file_exists

We can combine is_link with file_exists for robust
checks.

with_file_exists.php
  

&lt;?php

declare(strict_types=1);

$filename = "/path/to/file";

if (file_exists($filename)) {
    if (is_link($filename)) {
        echo "Exists and is a symbolic link";
    } else {
        echo "Exists but not a symbolic link";
    }
} else {
    echo "File does not exist";
}

This checks file existence first, then determines if it's a symbolic link. This
approach prevents errors from checking non-existent files.

## Real-world Directory Scan

Here's how to use is_link when scanning a directory.

directory_scan.php
  

&lt;?php

declare(strict_types=1);

$dir = "/path/to/directory";

if ($handle = opendir($dir)) {
    while (false !== ($entry = readdir($handle))) {
        if ($entry != "." &amp;&amp; $entry != "..") {
            $fullpath = $dir . "/" . $entry;
            if (is_link($fullpath)) {
                echo "$entry is a symbolic link\n";
            }
        }
    }
    closedir($handle);
}

This scans a directory and identifies all symbolic links. It shows how to use
is_link in a real directory processing scenario.

## Edge Cases

is_link has specific behaviors with certain edge cases.

edge_cases.php
  

&lt;?php

declare(strict_types=1);

// Non-existent file
var_dump(is_link("/nonexistent/file")); // bool(false)

// Regular file (not a link)
touch("/tmp/regular_file");
var_dump(is_link("/tmp/regular_file")); // bool(false)

// Actual symbolic link
symlink("/tmp/regular_file", "/tmp/symlink");
var_dump(is_link("/tmp/symlink")); // bool(true)

The function returns false for non-existent files and regular files. It only
returns true for actual symbolic links that exist on the filesystem.

## Best Practices

- **Check existence:** Combine with file_exists for robust code.

- **Error handling:** Handle cases where links might be broken.

- **Permissions:** Ensure proper permissions to check links.

- **Cross-platform:** Behavior may vary on different OS.

- **Performance:** Cache results if checking repeatedly.

## Source

[PHP is_link Documentation](https://www.php.net/manual/en/function.is-link.php)

This tutorial covered the PHP is_link function with practical
examples showing its usage in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Filesystem functions](/php/#php-fs).