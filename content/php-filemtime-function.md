+++
title = "PHP filemtime Function"
date = 2025-08-29T20:05:48.075+01:00
draft = false
description = "PHP filemtime function tutorial shows how to get file modification time in PHP. Learn filemtime with practical examples."
image = ""
imageBig = ""
categories = ["php-filesystem"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP filemtime Function

last modified April 3, 2025

The PHP filemtime function returns the last modification time of a
file as a Unix timestamp. It's useful for caching, file synchronization, and
version control.

## Basic Definition

The filemtime function retrieves the time when a file's contents
were last modified. It returns a Unix timestamp (seconds since Unix epoch).

Syntax: filemtime(string $filename): int|false. Returns false on
failure. The timestamp can be formatted with date functions for display.

## Basic filemtime Example

This shows the simplest usage of filemtime to get modification time.

basic_filemtime.php
  

&lt;?php

declare(strict_types=1);

$file = "example.txt";
$timestamp = filemtime($file);

if ($timestamp !== false) {
    echo "Last modified: " . date("Y-m-d H:i:s", $timestamp);
} else {
    echo "Could not get modification time";
}

This gets the modification time of "example.txt" and formats it for display. The
strict type declaration ensures type safety in the function's return handling.

## Checking File Before Access

Always verify a file exists and is readable before calling filemtime.

check_file.php
  

&lt;?php

declare(strict_types=1);

$file = "config.ini";

if (file_exists($file) &amp;&amp; is_readable($file)) {
    $timestamp = filemtime($file);
    echo "Last modified: " . date("F d Y H:i:s", $timestamp);
} else {
    echo "File not accessible";
}

This example demonstrates proper file checking before attempting to get its
modification time. It prevents warnings and handles errors gracefully.

## Cache Control Example

filemtime is often used for cache validation in web applications.

cache_control.php
  

&lt;?php

declare(strict_types=1);

$cssFile = "styles.css";
$lastModified = filemtime($cssFile);

header("Last-Modified: " . gmdate("D, d M Y H:i:s", $lastModified) . " GMT");

if (isset($_SERVER['HTTP_IF_MODIFIED_SINCE']) &amp;&amp; 
    strtotime($_SERVER['HTTP_IF_MODIFIED_SINCE']) &gt;= $lastModified) {
    header("HTTP/1.1 304 Not Modified");
    exit;
}

This sends proper cache headers based on file modification time. Browsers can
use this to avoid re-downloading unchanged files, improving performance.

## Comparing File Ages

Compare modification times to determine which file is newer.

compare_files.php
  

&lt;?php

declare(strict_types=1);

$file1 = "data.json";
$file2 = "backup.json";

$time1 = filemtime($file1);
$time2 = filemtime($file2);

if ($time1 &gt; $time2) {
    echo "$file1 is newer than $file2";
} elseif ($time1 &lt; $time2) {
    echo "$file2 is newer than $file1";
} else {
    echo "Files were modified at the same time";
}

This compares two files' modification times to determine which is newer. Useful
for synchronization tasks or determining which version to use.

## Directory Modification Check

Check when files in a directory were last modified by checking each file.

directory_check.php
  

&lt;?php

declare(strict_types=1);

$dir = "uploads/";
$latestTime = 0;

if (is_dir($dir)) {
    foreach (scandir($dir) as $file) {
        if ($file !== "." &amp;&amp; $file !== "..") {
            $fileTime = filemtime($dir . $file);
            if ($fileTime &gt; $latestTime) {
                $latestTime = $fileTime;
            }
        }
    }
}

echo "Newest file modified: " . date("Y-m-d H:i:s", $latestTime);

This scans a directory to find the most recently modified file. Useful for
monitoring directories for changes or finding the latest uploaded file.

## Best Practices

- **Error Handling:** Always check if filemtime returns false.

- **File Permissions:** Ensure script has read access to files.

- **Caching:** Consider caching results for frequently checked files.

- **Time Zones:** Be aware of timezone settings when formatting.

## Source

[PHP filemtime Documentation](https://www.php.net/manual/en/function.filemtime.php)

This tutorial covered the PHP filemtime function with practical
examples showing its usage in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Filesystem functions](/php/#php-fs).