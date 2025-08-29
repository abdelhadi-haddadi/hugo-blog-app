+++
title = "PHP fclose Function"
date = 2025-08-29T20:05:42.482+01:00
draft = false
description = "PHP fclose function tutorial shows how to properly close file handles in PHP. Learn fclose with practical examples."
image = ""
imageBig = ""
categories = ["php-filesystem"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP fclose Function

last modified April 3, 2025

The PHP fclose function closes an open file pointer. It's essential
for proper resource management when working with files in PHP.

## Basic Definition

The fclose function closes a file that was opened with fopen
or fsockopen. It returns true on success or false
on failure.

Syntax: fclose(resource $stream): bool. The function frees system
resources associated with the file handle. Always close files when done.

## Basic fclose Example

This shows the simplest usage of fclose to close a file handle.

basic_fclose.php
  

&lt;?php

declare(strict_types=1);

$file = fopen("example.txt", "r");

if ($file) {
    // Read or write operations here
    fclose($file);
    echo "File closed successfully.";
}

This opens a file for reading, then closes it. The fclose call
releases the file resource. Always check if the file opened successfully first.

## Closing After Writing

Files should be closed after writing to ensure all data is flushed to disk.

write_fclose.php
  

&lt;?php

declare(strict_types=1);

$file = fopen("output.txt", "w");

if ($file) {
    fwrite($file, "Hello, World!");
    fclose($file);
    echo "Data written and file closed.";
}

This writes to a file then closes it. Closing ensures all buffered data is
written. Without fclose, data might remain in buffers.

## Error Handling

Proper error handling ensures resources are cleaned up even if errors occur.

error_handling.php
  

&lt;?php

declare(strict_types=1);

$file = @fopen("nonexistent.txt", "r");

if ($file === false) {
    echo "Failed to open file.";
} else {
    try {
        // File operations here
    } finally {
        fclose($file);
    }
}

This demonstrates robust error handling. The finally block ensures
the file is closed even if exceptions occur. Always clean up resources.

## Closing Network Connections

fclose can also close network connections opened with fsockopen.

network_fclose.php
  

&lt;?php

declare(strict_types=1);

$socket = fsockopen("www.example.com", 80);

if ($socket) {
    fwrite($socket, "GET / HTTP/1.0\r\nHost: example.com\r\n\r\n");
    // Read response here
    fclose($socket);
    echo "Network connection closed.";
}

This opens a network connection, sends a request, then closes it. Network
resources should be released promptly like file resources.

## Multiple File Handles

When working with multiple files, each should be properly closed.

multi_fclose.php
  

&lt;?php

declare(strict_types=1);

$file1 = fopen("file1.txt", "r");
$file2 = fopen("file2.txt", "w");

if ($file1 &amp;&amp; $file2) {
    // Process files here
    fclose($file1);
    fclose($file2);
    echo "Both files closed successfully.";
}

This shows proper handling of multiple file handles. Each opened file must be
closed individually. The order of closing usually doesn't matter.

## Best Practices

- **Always Close:** Never leave file handles open unnecessarily.

- **Error Check:** Verify files opened successfully before closing.

- **Resource Management:** Use try-finally for robust cleanup.

- **Buffering:** Closing ensures all buffered data is written.

- **Performance:** Open files only when needed and close promptly.

## Source

[PHP fclose Documentation](https://www.php.net/manual/en/function.fclose.php)

This tutorial covered the PHP fclose function with practical
examples showing proper file handle management in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Filesystem functions](/php/#php-fs).