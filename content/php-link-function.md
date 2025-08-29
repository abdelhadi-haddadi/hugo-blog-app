+++
title = "PHP link Function"
date = 2025-08-29T20:05:59.236+01:00
draft = false
description = "PHP link function tutorial shows how to create hard links in PHP. Learn link with practical examples."
image = ""
imageBig = ""
categories = ["php-filesystem"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP link Function

last modified April 3, 2025

The PHP link function creates a hard link between files. It's a
filesystem function that creates additional directory entries for existing
files.

## Basic Definition

The link function creates a hard link to an existing target file.
It takes two parameters: the target file and the link name to create.

Syntax: link(string $target, string $link): bool. The function
returns true on success or false on failure. Both files must reside on the
same filesystem.

## Basic link Example

This shows the simplest usage of link to create a hard link.

basic_link.php
  

&lt;?php

declare(strict_types=1);

$target = "original.txt";
$link = "hardlink.txt";

if (link($target, $link)) {
    echo "Hard link created successfully";
} else {
    echo "Failed to create hard link";
}

This creates a hard link named "hardlink.txt" pointing to "original.txt". Both
files will reference the same inode and data blocks on disk.

## Checking Before Linking

It's good practice to check if the target exists before creating a link.

check_before_link.php
  

&lt;?php

declare(strict_types=1);

$target = "data.txt";
$link = "backup.txt";

if (!file_exists($target)) {
    die("Target file does not exist");
}

if (link($target, $link)) {
    echo "Backup link created";
} else {
    echo "Backup creation failed";
}

This checks for the target's existence first. The link creation will only
proceed if the target file exists. This prevents errors from missing files.

## Error Handling

Proper error handling helps diagnose link creation failures.

error_handling.php
  

&lt;?php

declare(strict_types=1);

$target = "source.pdf";
$link = "duplicate.pdf";

if (!link($target, $link)) {
    $error = error_get_last();
    echo "Link creation failed: " . $error['message'];
}

This captures the last error if link creation fails. Common errors include
permission issues or cross-filesystem linking attempts.

## Linking in Different Directory

Hard links can be created in different directories on the same filesystem.

different_directory.php
  

&lt;?php

declare(strict_types=1);

$target = "/var/www/uploads/image.jpg";
$link = "/home/user/desktop/image_link.jpg";

if (link($target, $link)) {
    echo "Directory link created";
} else {
    echo "Cross-directory link failed";
}

This creates a link in the user's desktop pointing to a file in the web uploads
directory. Both locations must be on the same physical filesystem.

## Multiple Links to Same File

A single file can have multiple hard links pointing to it.

multiple_links.php
  

&lt;?php

declare(strict_types=1);

$target = "document.odt";
$link1 = "backup1.odt";
$link2 = "backup2.odt";

link($target, $link1);
link($target, $link2);

echo "Created two links to the same file";

This creates two separate hard links to the same original file. All three names
will reference the same file content until all links are deleted.

## Edge Cases

link has specific behaviors with certain edge cases.

edge_cases.php
  

&lt;?php

declare(strict_types=1);

// Trying to link to non-existent file
if (!link("nonexistent.txt", "link.txt")) {
    echo "Cannot link to non-existent file\n";
}

// Trying to create existing link
if (!link("existing.txt", "existing.txt")) {
    echo "Cannot link a file to itself\n";
}

The function fails when linking to non-existent files or creating self-links.
These are common error cases that need to be handled in applications.

## Best Practices

- **Permissions:** Ensure proper filesystem permissions.

- **Same Filesystem:** Links must stay on the same filesystem.

- **Error Handling:** Always check the return value.

- **Cleanup:** Remove unused links with unlink().

## Source

[PHP link Documentation](https://www.php.net/manual/en/function.link.php)

This tutorial covered the PHP link function with practical
examples showing its usage in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Filesystem functions](/php/#php-fs).