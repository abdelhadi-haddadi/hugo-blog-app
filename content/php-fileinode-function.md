+++
title = "PHP fileinode Function"
date = 2025-08-29T20:05:48.084+01:00
draft = false
description = "PHP fileinode function tutorial shows how to get file inode numbers in PHP. Learn fileinode with practical examples."
image = ""
imageBig = ""
categories = ["php-filesystem"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP fileinode Function

last modified April 3, 2025

The PHP fileinode function retrieves the inode number of a file.
Inodes are unique identifiers in Unix-like filesystems that store file metadata.

## Basic Definition

The fileinode function returns the inode number of the specified
file. It takes one parameter: the filename as a string.

Syntax: fileinode(string $filename): int|false. Returns the inode
number or false on failure. Requires the file to exist and be accessible.

## Basic fileinode Example

This shows the simplest usage of fileinode to get a file's inode.

basic_fileinode.php
  

&lt;?php

declare(strict_types=1);

$filename = "example.txt";
$inode = fileinode($filename);

if ($inode !== false) {
    echo "Inode number: " . $inode;
} else {
    echo "Could not get inode number";
}

This retrieves and displays the inode number of "example.txt". The function
returns false if the file doesn't exist or can't be accessed.

## Checking File Identity

Inodes can be used to check if two paths refer to the same physical file.

file_identity.php
  

&lt;?php

declare(strict_types=1);

$file1 = "original.txt";
$file2 = "hardlink.txt";

$inode1 = fileinode($file1);
$inode2 = fileinode($file2);

if ($inode1 === $inode2) {
    echo "Files are the same (hardlinked)";
} else {
    echo "Files are different";
}

This compares inodes to determine if files are hardlinked. Files with the same
inode share the same physical data on disk.

## Directory Inode Example

fileinode works with directories as well as regular files.

directory_inode.php
  

&lt;?php

declare(strict_types=1);

$dir = "/var/www";
$inode = fileinode($dir);

if ($inode !== false) {
    echo "Directory inode: " . $inode;
} else {
    echo "Could not get directory inode";
}

This gets the inode number of a directory. Directories in Unix-like systems are
just special files with their own inodes.

## Error Handling

Proper error handling is important when working with filesystem functions.

error_handling.php
  

&lt;?php

declare(strict_types=1);

$filename = "nonexistent.txt";
$inode = fileinode($filename);

if ($inode === false) {
    echo "Error: File not found or permission denied";
    // Additional error handling here
} else {
    echo "Inode: " . $inode;
}

This demonstrates proper error checking. Always verify the return value isn't
false before using the inode number.

## Comparing Files

Inodes can help compare files without opening them.

compare_files.php
  

&lt;?php

declare(strict_types=1);

function areSameFile(string $file1, string $file2): bool {
    $inode1 = fileinode($file1);
    $inode2 = fileinode($file2);
    
    return $inode1 !== false &amp;&amp; $inode2 !== false &amp;&amp; $inode1 === $inode2;
}

$result = areSameFile("file1.txt", "file2.txt");
echo $result ? "Same file" : "Different files";

This function uses inodes to check if two paths reference the same file. More
reliable than comparing paths which might differ due to symlinks or hardlinks.

## Best Practices

- **Check Existence:** Verify files exist before getting inodes.

- **Error Handling:** Always handle false return values.

- **Cross-platform:** Note inodes are Unix-specific.

- **Caching:** Results may be cached; use clearstatcache().

- **Security:** Validate paths when using user input.

## Source

[PHP fileinode Documentation](https://www.php.net/manual/en/function.fileinode.php)

This tutorial covered the PHP fileinode function with practical
examples showing its usage in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Filesystem functions](/php/#php-fs).