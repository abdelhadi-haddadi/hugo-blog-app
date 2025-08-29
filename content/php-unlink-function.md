+++
title = "PHP unlink Function"
date = 2025-08-29T20:06:08.388+01:00
draft = false
description = "PHP unlink function tutorial shows how to delete files in PHP. Learn unlink with practical examples and error handling."
image = ""
imageBig = ""
categories = ["php-filesystem"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP unlink Function

last modified April 3, 2025

The PHP unlink function deletes a file from the filesystem. It's
essential for file management operations in PHP applications.

## Basic Definition

The unlink function removes a file specified by its path. It
returns true on success or false on failure. The function is binary-safe.

Syntax: unlink(string $filename, resource $context = null): bool.
The optional context parameter can be used with stream wrappers.

## Basic unlink Example

This shows the simplest usage of unlink to delete a file.

basic_unlink.php
  

&lt;?php

declare(strict_types=1);

$file = "test.txt";

if (file_exists($file)) {
    if (unlink($file)) {
        echo "File deleted successfully";
    } else {
        echo "Error deleting file";
    }
} else {
    echo "File does not exist";
}

This checks if the file exists before attempting deletion. The unlink
function returns true if successful. Always verify file existence first.

## Error Handling with unlink

Proper error handling is crucial when working with filesystem operations.

error_handling.php
  

&lt;?php

declare(strict_types=1);

$file = "nonexistent.txt";

try {
    if (!unlink($file)) {
        throw new RuntimeException("Could not delete $file");
    }
    echo "File deleted successfully";
} catch (RuntimeException $e) {
    error_log($e-&gt;getMessage());
    echo "Error: " . $e-&gt;getMessage();
}

This demonstrates exception handling for file deletion. The code attempts to
delete a file and throws an exception if unsuccessful. Errors are logged.

## Deleting Files with Relative Paths

unlink works with both absolute and relative file paths.

relative_path.php
  

&lt;?php

declare(strict_types=1);

$file = "../temp/old_data.csv";

if (is_writable($file)) {
    if (unlink($file)) {
        echo "Temporary file removed";
    } else {
        echo "Failed to remove temporary file";
    }
} else {
    echo "File not writable or doesn't exist";
}

This checks file permissions before deletion using is_writable.
Relative paths are resolved relative to the current working directory.

## Using Context with unlink

The context parameter allows additional options for stream operations.

context_usage.php
  

&lt;?php

declare(strict_types=1);

$file = "ftp://user:pass@example.com/tmp/file.txt";
$options = ['ftp' =&gt; ['overwrite' =&gt; true]];
$context = stream_context_create($options);

if (unlink($file, $context)) {
    echo "Remote file deleted successfully";
} else {
    echo "Failed to delete remote file";
}

This shows how to delete a file via FTP using a stream context. The context
provides authentication and additional FTP-specific options.

## Secure File Deletion

Security considerations are important when deleting files in PHP.

secure_deletion.php
  

&lt;?php

declare(strict_types=1);

function secureDelete(string $path): bool {
    if (!file_exists($path)) {
        return false;
    }
    
    if (!is_file($path)) {
        return false;
    }
    
    $realpath = realpath($path);
    $allowedDir = realpath(__DIR__ . '/uploads');
    
    if (strpos($realpath, $allowedDir) !== 0) {
        return false;
    }
    
    return unlink($realpath);
}

$file = "uploads/user_upload.jpg";
if (secureDelete($file)) {
    echo "File securely deleted";
} else {
    echo "Deletion failed or not allowed";
}

This secure deletion function validates the file path thoroughly. It checks if
the file exists, is a regular file, and is within an allowed directory.

## Best Practices

- **Check Permissions:** Verify file is writable before deletion.

- **Error Handling:** Implement proper error handling mechanisms.

- **Path Validation:** Validate paths to prevent directory traversal.

- **Backup:** Consider backup before critical deletions.

- **Logging:** Log deletion operations for audit purposes.

## Source

[PHP unlink Documentation](https://www.php.net/manual/en/function.unlink.php)

This tutorial covered the PHP unlink function with practical
examples showing file deletion in different scenarios with security in mind.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Filesystem functions](/php/#php-fs).