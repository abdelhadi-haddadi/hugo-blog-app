+++
title = "PHP filesize Function"
date = 2025-08-29T20:05:49.166+01:00
draft = false
description = "PHP filesize function tutorial shows how to get file sizes in PHP. Learn filesize with practical examples."
image = ""
imageBig = ""
categories = ["php-filesystem"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP filesize Function

last modified April 3, 2025

The PHP filesize function returns the size of a file in bytes. It's
useful for checking file sizes before processing or displaying them.

## Basic Definition

The filesize function returns the size of the specified file. It
takes one parameter: the filename or path to the file.

Syntax: filesize(string $filename): int|false. Returns file size in
bytes or false on failure. The result is cached; use clearstatcache()
for updated results.

## Basic filesize Example

This shows the simplest usage of filesize to get a file's size.

basic_filesize.php
  

&lt;?php

declare(strict_types=1);

$filename = "example.txt";
$size = filesize($filename);

echo "File size: $size bytes"; // Outputs size in bytes

This gets the size of "example.txt" in bytes. The function requires the file to
exist and be accessible to work properly.

## Formatting File Size

We can format the raw byte count into a human-readable format.

format_size.php
  

&lt;?php

declare(strict_types=1);

function formatSize(int $bytes): string {
    $units = ['B', 'KB', 'MB', 'GB', 'TB'];
    $index = 0;
    
    while ($bytes &gt;= 1024 &amp;&amp; $index &lt; 4) {
        $bytes /= 1024;
        $index++;
    }
    
    return round($bytes, 2) . ' ' . $units[$index];
}

$filename = "largefile.zip";
$size = filesize($filename);

echo "File size: " . formatSize($size);

This converts bytes to appropriate units (KB, MB, etc.). The function handles
files of any size by dynamically selecting the best unit.

## Checking File Existence

It's good practice to check if a file exists before getting its size.

check_existence.php
  

&lt;?php

declare(strict_types=1);

$filename = "nonexistent.txt";

if (file_exists($filename)) {
    $size = filesize($filename);
    echo "File size: $size bytes";
} else {
    echo "File does not exist";
}

This prevents errors when trying to get the size of non-existent files. Always
verify file existence before operations to avoid warnings.

## Remote File Size

For remote files, we need a different approach as filesize doesn't
work with HTTP URLs.

remote_file.php
  

&lt;?php

declare(strict_types=1);

function getRemoteFileSize(string $url): ?int {
    $headers = get_headers($url, true);
    
    if ($headers &amp;&amp; isset($headers['Content-Length'])) {
        return (int)$headers['Content-Length'];
    }
    
    return null;
}

$fileUrl = "https://example.com/largefile.pdf";
$size = getRemoteFileSize($fileUrl);

echo $size ? "Remote file size: $size bytes" : "Size unavailable";

This uses HTTP headers to get remote file sizes. Note that not all servers
provide Content-Length headers for all files.

## Directory Size Calculation

We can calculate total size of all files in a directory recursively.

directory_size.php
  

&lt;?php

declare(strict_types=1);

function getDirectorySize(string $path): int {
    $size = 0;
    $files = new RecursiveIteratorIterator(
        new RecursiveDirectoryIterator($path)
    );
    
    foreach ($files as $file) {
        if ($file-&gt;isFile()) {
            $size += $file-&gt;getSize();
        }
    }
    
    return $size;
}

$dir = "/path/to/directory";
$totalSize = getDirectorySize($dir);

echo "Directory size: " . formatSize($totalSize);

This recursively calculates the total size of all files in a directory. It uses
PHP's SPL iterators for efficient directory traversal.

## Best Practices

- **Error Handling:** Always check if files exist and are readable.

- **Caching:** Use clearstatcache() if file sizes might change.

- **Memory:** Be careful with very large files on 32-bit systems.

- **Permissions:** Ensure proper file permissions for access.

## Source

[PHP filesize Documentation](https://www.php.net/manual/en/function.filesize.php)

This tutorial covered the PHP filesize function with practical
examples showing its usage in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Filesystem functions](/php/#php-fs).