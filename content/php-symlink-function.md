+++
title = "PHP symlink Function"
date = 2025-08-29T20:06:07.218+01:00
draft = false
description = "PHP symlink function tutorial shows how to create symbolic links in PHP. Learn symlink with practical examples."
image = ""
imageBig = ""
categories = ["php-filesystem"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP symlink Function

last modified April 3, 2025

The PHP symlink function creates symbolic links between files. It's
useful for creating file system references without duplicating content.

## Basic Definition

The symlink function creates a symbolic link from the target to the
link name. It takes two parameters: the target path and the link name.

Syntax: symlink(string $target, string $link): bool. The function
returns true on success and false on failure. Requires appropriate permissions.

## Basic symlink Example

This shows the simplest usage of symlink to create a link.

basic_symlink.php
  

&lt;?php

declare(strict_types=1);

$target = "/var/www/html/original.txt";
$link = "/var/www/html/link.txt";

if (symlink($target, $link)) {
    echo "Symbolic link created successfully";
} else {
    echo "Failed to create symbolic link";
}

This creates a symbolic link named "link.txt" pointing to "original.txt". The
function returns true if successful. Note that the target must exist.

## Relative Path symlink

The function can create links using relative paths for both target and link.

relative_symlink.php
  

&lt;?php

declare(strict_types=1);

$target = "../files/document.pdf";
$link = "downloads/doc.pdf";

if (symlink($target, $link)) {
    echo "Relative symbolic link created";
} else {
    echo "Failed to create relative link";
}

Here we create a link using relative paths. The link will point to the document
one directory up in the files hierarchy. Relative links maintain their
relationship when moved.

## Directory symlink

symlink can create links to directories as well as files.

directory_symlink.php
  

&lt;?php

declare(strict_types=1);

$targetDir = "/var/www/projects/current";
$linkDir = "/var/www/html/project";

if (symlink($targetDir, $linkDir)) {
    echo "Directory link created successfully";
} else {
    echo "Failed to create directory link";
}

This creates a symbolic link to an entire directory. The link will behave like
the original directory for most operations. Directory links are commonly used in
web development.

## Checking Before Creating

It's good practice to check if a link or file exists before creating.

safe_symlink.php
  

&lt;?php

declare(strict_types=1);

$target = "config.ini";
$link = "settings.ini";

if (file_exists($link)) {
    echo "Link name already exists";
} elseif (!file_exists($target)) {
    echo "Target file does not exist";
} elseif (symlink($target, $link)) {
    echo "Symbolic link created safely";
} else {
    echo "Failed to create symbolic link";
}

This example demonstrates safe link creation by checking preconditions. First we
verify the target exists, then check the link name isn't taken. This prevents
errors and overwrites.

## Windows symlink Example

On Windows, symlink creation requires appropriate privileges.

windows_symlink.php
  

&lt;?php

declare(strict_types=1);

$target = "C:\\Users\\Public\\Documents\\report.docx";
$link = "C:\\Users\\Public\\Desktop\\current_report.docx";

if (symlink($target, $link)) {
    echo "Windows symbolic link created";
} else {
    echo "Failed to create Windows link";
}

Windows symlinks require administrator privileges or developer mode enabled. The
syntax uses backslashes but forward slashes also work. Windows distinguishes
file and directory links.

## Edge Cases

symlink has specific behaviors with certain edge cases.

edge_cases.php
  

&lt;?php

declare(strict_types=1);

// Attempt to create link to non-existent target
$result1 = symlink("nonexistent.txt", "badlink.txt");

// Attempt to create link where name exists
file_put_contents("existing.txt", "content");
$result2 = symlink("target.txt", "existing.txt");

var_dump($result1); // bool(false)
var_dump($result2); // bool(false)

Creating links to non-existent targets fails. Trying to create a link where the
name already exists also fails. The function is strict about these conditions
and returns false.

## Best Practices

- **Error Handling:** Always check the return value.

- **Permissions:** Ensure proper filesystem permissions.

- **Security:** Validate paths to prevent symlink attacks.

- **Cross-platform:** Be aware of OS differences.

- **Cleanup:** Use unlink() to remove symbolic links.

## Source

[PHP symlink Documentation](https://www.php.net/manual/en/function.symlink.php)

This tutorial covered the PHP symlink function with practical
examples showing its usage in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Filesystem functions](/php/#php-fs).