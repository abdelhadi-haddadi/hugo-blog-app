+++
title = "PHP copy Function"
date = 2025-08-29T20:05:40.250+01:00
draft = false
description = "PHP copy function tutorial shows how to copy files in PHP. Learn file copying with practical examples."
image = ""
imageBig = ""
categories = ["php-filesystem"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP copy Function

last modified April 3, 2025

The PHP copy function duplicates a file from source to destination.
It's essential for file management operations in PHP applications.

## Basic Definition

The copy function copies a file from one location to another.
It returns true on success or false on failure.

Syntax: copy(string $source, string $dest, resource $context = null): bool.
The function overwrites existing files if permissions allow.

## Basic File Copy Example

This demonstrates the simplest usage of copy to duplicate a file.

basic_copy.php
  

&lt;?php

declare(strict_types=1);

$source = "source.txt";
$destination = "destination.txt";

if (copy($source, $destination)) {
    echo "File copied successfully";
} else {
    echo "Failed to copy file";
}

This copies "source.txt" to "destination.txt". The function returns true if
successful. Always check the return value for error handling.

## Copy with Absolute Paths

This example shows copying using absolute file paths for clarity.

absolute_paths.php
  

&lt;?php

declare(strict_types=1);

$source = "/var/www/html/images/photo.jpg";
$destination = "/var/www/html/backups/photo_backup.jpg";

if (copy($source, $destination)) {
    echo "Backup created successfully";
} else {
    echo "Backup failed: " . error_get_last()['message'];
}

Here we copy a photo to a backup location. Absolute paths ensure we're working
with specific files. Error handling shows the last error message if it fails.

## Copy with Context

This demonstrates using a stream context for additional copy options.

copy_with_context.php
  

&lt;?php

declare(strict_types=1);

$source = "data.csv";
$destination = "archive/data_backup.csv";
$context = stream_context_create([
    'http' =&gt; [
        'method' =&gt; 'GET',
        'header' =&gt; "User-Agent: PHP Copy Script\r\n"
    ]
]);

if (copy($source, $destination, $context)) {
    echo "Data archived successfully";
} else {
    echo "Archive operation failed";
}

The stream context allows setting HTTP headers or other options. This is useful
when copying from remote sources or needing specific transfer parameters.

## Copy with Error Handling

This example shows robust error handling for file copy operations.

error_handling.php
  

&lt;?php

declare(strict_types=1);

function safeCopy(string $source, string $dest): bool {
    if (!file_exists($source)) {
        throw new RuntimeException("Source file not found");
    }
    
    if (!is_readable($source)) {
        throw new RuntimeException("Source file not readable");
    }
    
    if (file_exists($dest) &amp;&amp; !is_writable(dirname($dest))) {
        throw new RuntimeException("Destination directory not writable");
    }
    
    return copy($source, $dest);
}

try {
    safeCopy("report.pdf", "backups/report.pdf");
    echo "File copied successfully";
} catch (RuntimeException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This implements a safe copy function with pre-validation. It checks file
existence, readability, and writability before attempting the copy operation.

## Copy Remote File

This example demonstrates copying a file from a remote URL to local server.

remote_copy.php
  

&lt;?php

declare(strict_types=1);

$remoteUrl = "https://example.com/images/banner.jpg";
$localPath = "downloads/banner.jpg";

if (copy($remoteUrl, $localPath)) {
    echo "Remote file downloaded successfully";
} else {
    echo "Failed to download remote file";
}

The copy function can fetch files from HTTP/HTTPS URLs. Note that
the PHP configuration must allow URL fopen wrappers for this to work.

## Best Practices

- **Permissions:** Ensure proper file permissions for source and destination.

- **Validation:** Check file existence and accessibility before copying.

- **Error Handling:** Always implement proper error handling.

- **Large Files:** Consider chunked copying for very large files.

- **Security:** Sanitize file paths to prevent directory traversal.

## Source

[PHP copy Documentation](https://www.php.net/manual/en/function.copy.php)

This tutorial covered the PHP copy function with practical
examples showing its usage in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Filesystem functions](/php/#php-fs).