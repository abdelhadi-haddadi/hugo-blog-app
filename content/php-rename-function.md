+++
title = "PHP rename Function"
date = 2025-08-29T20:06:04.953+01:00
draft = false
description = "PHP rename function tutorial shows how to rename files and directories in PHP. Learn rename with practical examples."
image = ""
imageBig = ""
categories = ["php-filesystem"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP rename Function

last modified April 3, 2025

The PHP rename function renames a file or directory. It can also
move files between directories if paths are on the same filesystem.

## Basic Definition

The rename function changes the name or location of a file/directory.
It returns true on success or false on failure.

Syntax: rename(string $oldname, string $newname, resource $context = null): bool.
Both parameters must be strings representing valid paths.

## Basic File Rename Example

This shows the simplest usage of rename to rename a file.

basic_rename.php
  

&lt;?php

declare(strict_types=1);

$oldname = 'oldfile.txt';
$newname = 'newfile.txt';

if (rename($oldname, $newname)) {
    echo "File renamed successfully";
} else {
    echo "Error renaming file";
}

This renames 'oldfile.txt' to 'newfile.txt' in the same directory. The function
returns true if successful. Always check the return value for errors.

## Moving a File Between Directories

rename can move files between directories on the same filesystem.

move_file.php
  

&lt;?php

declare(strict_types=1);

$source = 'documents/report.txt';
$destination = 'archives/report_2023.txt';

if (rename($source, $destination)) {
    echo "File moved and renamed successfully";
} else {
    echo "Error moving file";
}

This moves report.txt from documents to archives while renaming it. Both
operations happen atomically. The directories must exist beforehand.

## Directory Rename Example

rename works with directories just like with files.

rename_dir.php
  

&lt;?php

declare(strict_types=1);

$olddir = 'temp';
$newdir = 'temporary_files';

if (rename($olddir, $newdir)) {
    echo "Directory renamed successfully";
} else {
    echo "Error renaming directory";
}

This renames the 'temp' directory to 'temporary_files'. The operation fails if
the target directory exists or if permissions are insufficient.

## Error Handling Example

Proper error handling is essential when working with filesystem operations.

error_handling.php
  

&lt;?php

declare(strict_types=1);

$old = 'nonexistent.txt';
$new = 'newfile.txt';

if (!file_exists($old)) {
    die("Source file doesn't exist");
}

if (file_exists($new)) {
    die("Target file already exists");
}

if (!rename($old, $new)) {
    die("Error: " . error_get_last()['message']);
}

echo "File renamed successfully";

This checks for common error conditions before attempting the rename. It also
provides detailed error messages if the operation fails.

## Cross-Device Rename Example

When moving between filesystems, rename may fail and require copy.

cross_device.php
  

&lt;?php

declare(strict_types=1);

function moveFile(string $source, string $dest): bool {
    if (rename($source, $dest)) {
        return true;
    }
    
    if (!copy($source, $dest)) {
        return false;
    }
    
    unlink($source);
    return true;
}

$result = moveFile('/mnt/volume1/file.txt', '/mnt/volume2/file.txt');
echo $result ? "Success" : "Failed";

This attempts a direct rename first, then falls back to copy+delete if needed.
The function handles cases where source and target are on different devices.

## Best Practices

- **Check Permissions:** Verify read/write permissions beforehand.

- **Validate Paths:** Ensure paths are valid and accessible.

- **Handle Errors:** Implement proper error handling logic.

- **Atomic Operations:** Use rename for atomic file updates.

- **Backup:** Consider backups for critical operations.

## Source

[PHP rename Documentation](https://www.php.net/manual/en/function.rename.php)

This tutorial covered the PHP rename function with practical
examples showing file and directory renaming and moving operations.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Filesystem functions](/php/#php-fs).