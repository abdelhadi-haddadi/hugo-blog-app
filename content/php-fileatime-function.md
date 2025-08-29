+++
title = "PHP fileatime Function"
date = 2025-08-29T20:05:46.963+01:00
draft = false
description = "PHP fileatime function tutorial shows how to get file access time in PHP. Learn fileatime with practical examples."
image = ""
imageBig = ""
categories = ["php-filesystem"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP fileatime Function

last modified April 3, 2025

The PHP fileatime function gets the last access time of a file. It
returns a Unix timestamp representing when the file was last accessed.

## Basic Definition

The fileatime function returns the time the file was last accessed.
It takes one parameter: the filename path as a string.

Syntax: fileatime(string $filename): int|false. Returns Unix
timestamp on success, false on failure. Requires file existence and permissions.

## Basic fileatime Example

This shows the simplest usage of fileatime to get access time.

basic_fileatime.php
  

&lt;?php

declare(strict_types=1);

$filename = "example.txt";
$accessTime = fileatime($filename);

if ($accessTime !== false) {
    echo "Last accessed: " . date("Y-m-d H:i:s", $accessTime);
} else {
    echo "Could not get access time";
}

This gets the access time of "example.txt" and formats it. The function returns
false if the file doesn't exist or can't be accessed.

## Comparing Access Times

We can compare access times of two files to see which was accessed more recently.

compare_times.php
  

&lt;?php

declare(strict_types=1);

$file1 = "file1.txt";
$file2 = "file2.txt";

$time1 = fileatime($file1);
$time2 = fileatime($file2);

if ($time1 &gt; $time2) {
    echo "$file1 was accessed more recently";
} elseif ($time2 &gt; $time1) {
    echo "$file2 was accessed more recently";
} else {
    echo "Both files were accessed at the same time";
}

This compares access times of two files. Note that some filesystems disable access
time recording for performance reasons.

## Checking Recent Access

We can check if a file was accessed within a certain time period.

recent_access.php
  

&lt;?php

declare(strict_types=1);

$filename = "data.log";
$accessTime = fileatime($filename);
$oneDayAgo = time() - 86400; // 24 hours ago

if ($accessTime !== false &amp;&amp; $accessTime &gt; $oneDayAgo) {
    echo "File was accessed within the last 24 hours";
} else {
    echo "File not accessed recently or error occurred";
}

This checks if the file was accessed in the last 24 hours. The example uses
time() to get the current timestamp for comparison.

## Handling Errors

Proper error handling is important when working with filesystem functions.

error_handling.php
  

&lt;?php

declare(strict_types=1);

$filename = "nonexistent.txt";
$accessTime = fileatime($filename);

if ($accessTime === false) {
    if (!file_exists($filename)) {
        echo "File does not exist";
    } elseif (!is_readable($filename)) {
        echo "File is not readable";
    } else {
        echo "Unknown error getting access time";
    }
} else {
    echo "Last accessed: " . date("Y-m-d H:i:s", $accessTime);
}

This demonstrates comprehensive error handling. We check for file existence and
readability when fileatime returns false.

## Using with Directory

fileatime can also be used with directories, not just files.

directory_access.php
  

&lt;?php

declare(strict_types=1);

$dir = "/var/www/html";
$accessTime = fileatime($dir);

if ($accessTime !== false) {
    echo "Directory last accessed: " . date("Y-m-d H:i:s", $accessTime);
    echo "&lt;br&gt;";
    echo "Days since last access: " . round((time() - $accessTime) / 86400);
} else {
    echo "Could not get directory access time";
}

This gets the access time of a directory and calculates days since last access.
Directory access times work similarly to file access times on most systems.

## Best Practices

- **Performance:** Access time recording may be disabled.

- **Error Handling:** Always check for false return value.

- **Permissions:** Ensure proper file permissions.

- **Timezones:** Be aware of timezone settings when formatting.

## Source

[PHP fileatime Documentation](https://www.php.net/manual/en/function.fileatime.php)

This tutorial covered the PHP fileatime function with practical
examples showing its usage in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Filesystem functions](/php/#php-fs).