+++
title = "PHP Delete Function"
date = 2025-08-29T20:05:40.247+01:00
draft = false
description = "PHP delete function tutorial shows how to delete files in PHP. Learn file deletion with practical examples."
image = ""
imageBig = ""
categories = ["php-filesystem"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP Delete Function

last modified April 3, 2025

The PHP unlink function is used to delete files from the filesystem.
It's the primary way to remove files programmatically in PHP applications.

## Basic Definition

The unlink function deletes a file from the filesystem. It takes
one mandatory parameter (filename) and returns true on success or false on failure.

Syntax: unlink(string $filename, ?resource $context = null): bool.
The function requires proper permissions to delete the specified file.

## Basic File Deletion Example

This shows the simplest usage of unlink to delete a file.

basic_delete.php
  

&lt;?php

declare(strict_types=1);

$file = "test.txt";

if (file_exists($file)) {
    if (unlink($file)) {
        echo "File deleted successfully.";
    } else {
        echo "Error deleting file.";
    }
} else {
    echo "File does not exist.";
}

This checks if the file exists before attempting deletion. The unlink
function returns true if successful. Always check file existence first.

## Deletion with Error Handling

Proper error handling makes file deletion more robust in production.

delete_with_error_handling.php
  

&lt;?php

declare(strict_types=1);

function deleteFile(string $filename): bool {
    if (!file_exists($filename)) {
        throw new RuntimeException("File not found: $filename");
    }
    
    if (!is_writable($filename)) {
        throw new RuntimeException("No write permission: $filename");
    }
    
    return unlink($filename);
}

try {
    deleteFile("data.csv");
    echo "File deleted successfully.";
} catch (RuntimeException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This example demonstrates comprehensive error handling. It checks file existence
and write permissions before attempting deletion. Exceptions provide clear errors.

## Deleting Multiple Files

You can delete multiple files by iterating through an array of filenames.

delete_multiple_files.php
  

&lt;?php

declare(strict_types=1);

$files = ["temp1.txt", "temp2.txt", "temp3.txt"];

foreach ($files as $file) {
    if (file_exists($file)) {
        if (unlink($file)) {
            echo "Deleted: $file\n";
        } else {
            echo "Failed to delete: $file\n";
        }
    } else {
        echo "Not found: $file\n";
    }
}

This loops through an array of files and attempts to delete each one. Each
operation is handled individually with its own success/failure message.

## Secure File Deletion

For sensitive data, consider secure deletion methods that overwrite files.

secure_delete.php
  

&lt;?php

declare(strict_types=1);

function secureDelete(string $filename, int $passes = 3): bool {
    if (!file_exists($filename)) return false;
    
    $filesize = filesize($filename);
    $handle = fopen($filename, 'r+');
    
    for ($i = 0; $i &lt; $passes; $i++) {
        ftruncate($handle, 0);
        fwrite($handle, str_repeat("\0", $filesize));
        fflush($handle);
    }
    
    fclose($handle);
    return unlink($filename);
}

secureDelete("sensitive_data.db");

This function overwrites the file with null bytes before deletion. While not
perfect, it provides better security than simple deletion for sensitive data.

## Deleting Files with Wildcards

PHP can delete multiple files matching a pattern using glob.

delete_with_wildcards.php
  

&lt;?php

declare(strict_types=1);

$pattern = "logs/*.tmp";

foreach (glob($pattern) as $file) {
    if (is_file($file)) {
        unlink($file);
        echo "Deleted: $file\n";
    }
}

This example finds all .tmp files in the logs directory and deletes them.
The glob function expands the wildcard pattern into filenames.

## Best Practices

- **Check Permissions:** Verify write access before deletion.

- **Error Handling:** Implement proper error handling.

- **Backup:** Consider backups before mass deletions.

- **Security:** Validate file paths to prevent directory traversal.

- **Logging:** Log deletion operations for audit purposes.

## Source

[PHP unlink Documentation](https://www.php.net/manual/en/function.unlink.php)

This tutorial covered the PHP file deletion function with practical examples
showing different usage scenarios and best practices.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Filesystem functions](/php/#php-fs).