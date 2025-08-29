+++
title = "PHP filetype Function"
date = 2025-08-29T20:05:49.154+01:00
draft = false
description = "PHP filetype function tutorial shows how to check file types in PHP. Learn filetype with practical examples."
image = ""
imageBig = ""
categories = ["php-filesystem"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP filetype Function

last modified April 3, 2025

The PHP filetype function determines the type of a file or
directory. It returns a string indicating the type of the specified file.

## Basic Definition

The filetype function returns the type of the given file. Possible
return values include 'file', 'dir', 'link', and other system-specific types.

Syntax: filetype(string $filename): string|false. The function
returns false on failure. It requires the file to exist and be accessible.

## Basic filetype Example

This shows the simplest usage of filetype to check a file type.

basic_filetype.php
  

&lt;?php

declare(strict_types=1);

$filename = "example.txt";
$type = filetype($filename);

echo $type; // Outputs: file (if example.txt exists)

This checks the type of "example.txt". The function returns 'file' for regular
files. Make sure the file exists before checking its type.

## Checking Directory Type

filetype can distinguish between files and directories.

directory_type.php
  

&lt;?php

declare(strict_types=1);

$dirname = "docs";
$type = filetype($dirname);

echo $type; // Outputs: dir (if docs is a directory)

Here we check if "docs" is a directory. The function returns 'dir' for
directories. The same path rules apply as with files.

## Checking Symbolic Link

The function can identify symbolic links on systems that support them.

symlink_type.php
  

&lt;?php

declare(strict_types=1);

$linkname = "shortcut.lnk";
$type = filetype($linkname);

echo $type; // Outputs: link (if it's a symlink)

This checks if "shortcut.lnk" is a symbolic link. The function returns 'link'
for symlinks. Note behavior may vary by operating system.

## Handling Non-Existent Files

filetype returns false and generates a warning for missing files.

nonexistent_file.php
  

&lt;?php

declare(strict_types=1);

$filename = "missing.txt";
$type = filetype($filename);

if ($type === false) {
    echo "File not found or inaccessible";
}

This demonstrates proper error handling. Always check the return value when
the file might not exist. Consider using file_exists first.

## Checking Special File Types

On Unix systems, filetype can identify special file types.

special_types.php
  

&lt;?php

declare(strict_types=1);

$fifo = "/path/to/named.pipe";
$type = filetype($fifo);

echo $type; // Outputs: fifo (if it's a named pipe)

This checks for a FIFO (named pipe) file type. Other possible values include
'char' for character devices and 'block' for block devices on Unix systems.

## Best Practices

- **Error Handling:** Always check for false return values.

- **File Existence:** Verify files exist before checking type.

- **Permissions:** Ensure proper read permissions for target.

- **Caching:** Be aware of stat cache in repeated calls.

- **Cross-platform:** Some types are OS-specific.

## Source

[PHP filetype Documentation](https://www.php.net/manual/en/function.filetype.php)

This tutorial covered the PHP filetype function with practical
examples showing its usage for different file types and scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Filesystem functions](/php/#php-fs).