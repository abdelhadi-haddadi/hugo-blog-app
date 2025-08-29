+++
title = "PHP touch Function"
date = 2025-08-29T20:06:08.397+01:00
draft = false
description = "PHP touch function tutorial shows how to modify file timestamps in PHP. Learn touch with practical examples."
image = ""
imageBig = ""
categories = ["php-filesystem"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP touch Function

last modified April 3, 2025

The PHP touch function modifies file access and modification times.
It can also create empty files if they don't exist. This is useful for logging.

## Basic Definition

The touch function sets access and modification times of files.
It can create files if they don't exist. The function returns true on success.

Syntax: touch(string $filename, ?int $mtime = null, ?int $atime = null): bool.
All parameters are optional except the filename. Times are Unix timestamps.

## Basic touch Example

This shows the simplest usage of touch to update a file's timestamp.

basic_touch.php
  

&lt;?php

declare(strict_types=1);

$file = "example.txt";

if (touch($file)) {
    echo "Timestamp updated for $file";
} else {
    echo "Failed to update timestamp";
}

This updates both access and modification times to the current time. If the file
doesn't exist, it will be created empty. The function returns a boolean result.

## Creating a New File

touch can create empty files if they don't exist.

create_file.php
  

&lt;?php

declare(strict_types=1);

$newFile = "newfile.txt";

if (!file_exists($newFile) &amp;&amp; touch($newFile)) {
    echo "Created new empty file: $newFile";
} else {
    echo "File exists or creation failed";
}

This checks if the file exists first, then creates it if needed. The file will
have current timestamps and zero bytes size. Permissions depend on umask.

## Setting Specific Timestamps

You can set custom timestamps using the optional parameters.

custom_timestamps.php
  

&lt;?php

declare(strict_types=1);

$file = "timestamp.txt";
$time = strtotime("2025-01-01 00:00:00");

if (touch($file, $time)) {
    echo "Set custom timestamp for $file";
    echo "New modification time: " . date("Y-m-d H:i:s", filemtime($file));
}

This sets the file's modification time to January 1, 2025. The access time will
also be updated to the current time unless specified. Uses Unix timestamp.

## Setting Both Access and Modification Times

You can control both access and modification times independently.

both_timestamps.php
  

&lt;?php

declare(strict_types=1);

$file = "times.txt";
$mtime = strtotime("2024-06-15 12:00:00");
$atime = strtotime("2024-06-15 08:30:00");

if (touch($file, $mtime, $atime)) {
    echo "Set custom times for $file";
    echo "Modification: " . date("Y-m-d H:i:s", filemtime($file));
    echo "Access: " . date("Y-m-d H:i:s", fileatime($file));
}

This sets different access and modification times. The third parameter controls
access time. Both times are set precisely as specified in the example.

## Touch with Error Handling

Proper error handling makes file operations more robust.

error_handling.php
  

&lt;?php

declare(strict_types=1);

$file = "/root/protected.txt";

try {
    if (!is_writable(dirname($file))) {
        throw new Exception("Directory not writable");
    }
    
    if (!touch($file)) {
        throw new Exception("Failed to update timestamp");
    }
    
    echo "Timestamp updated successfully";
} catch (Exception $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This checks directory permissions before attempting the operation. It uses
exceptions for error handling. Always verify permissions when working with files.

## Best Practices

- **Permissions:** Check file/directory permissions first.

- **Error Handling:** Implement proper error handling.

- **Time Zones:** Be aware of timezone settings for timestamps.

- **File Existence:** Check if file exists when needed.

- **Security:** Validate file paths to prevent directory traversal.

## Source

[PHP touch Documentation](https://www.php.net/manual/en/function.touch.php)

This tutorial covered the PHP touch function with practical
examples showing timestamp modification and file creation.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Filesystem functions](/php/#php-fs).