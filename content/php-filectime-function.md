+++
title = "PHP filectime Function"
date = 2025-08-29T20:05:46.965+01:00
draft = false
description = "PHP filectime function tutorial shows how to get file creation time in PHP. Learn filectime with practical examples."
image = ""
imageBig = ""
categories = ["php-filesystem"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP filectime Function

last modified April 3, 2025

The PHP filectime function returns the creation time of a file.
This is different from modification time and access time. It's useful for
file management tasks.

## Basic Definition

The filectime function returns the Unix timestamp when a file was
created. On Unix systems, this is the inode change time. On Windows, it's the
actual creation time.

Syntax: filectime(string $filename): int|false. Returns timestamp
on success, false on failure. The timestamp can be formatted with date functions.

## Basic filectime Example

This shows the simplest usage of filectime to get creation time.

basic_filectime.php
  

&lt;?php

declare(strict_types=1);

$filename = "example.txt";
$ctime = filectime($filename);

echo "File created on: " . date("Y-m-d H:i:s", $ctime);

This outputs the creation time in a readable format. The date
function converts the Unix timestamp to a human-readable string.

## Checking File Existence First

It's good practice to check if a file exists before getting its ctime.

filectime_exists.php
  

&lt;?php

declare(strict_types=1);

$filename = "example.txt";

if (file_exists($filename)) {
    $ctime = filectime($filename);
    echo "File created: " . date("Y-m-d", $ctime);
} else {
    echo "File does not exist";
}

This prevents warnings if the file doesn't exist. The file_exists
check ensures we only call filectime on existing files.

## Comparing with Filemtime

This example shows the difference between creation time and modification time.

filectime_vs_filemtime.php
  

&lt;?php

declare(strict_types=1);

$filename = "example.txt";

$ctime = filectime($filename);
$mtime = filemtime($filename);

echo "Created: " . date("Y-m-d H:i:s", $ctime) . "\n";
echo "Modified: " . date("Y-m-d H:i:s", $mtime);

Creation time stays constant while modification time changes when content is
updated. This helps track when a file was first created versus last changed.

## Handling Directories

filectime works with directories as well as files.

directory_ctime.php
  

&lt;?php

declare(strict_types=1);

$dir = "documents";

$ctime = filectime($dir);

echo "Directory created: " . date("Y-m-d", $ctime);

This shows when a directory was created. The function behaves the same way for
directories as it does for regular files.

## Error Handling

Proper error handling makes code more robust when dealing with filesystem ops.

filectime_error.php
  

&lt;?php

declare(strict_types=1);

$filename = "nonexistent.txt";

$ctime = @filectime($filename);

if ($ctime === false) {
    echo "Could not get creation time";
} else {
    echo "Created: " . date("Y-m-d", $ctime);
}

The @ operator suppresses warnings, and we check the return value explicitly.
This provides cleaner error handling than letting PHP emit warnings.

## Best Practices

- **Timezones:** Be aware of server timezone settings.

- **Caching:** Results may be cached; clearstatcache() helps.

- **Permissions:** Ensure proper file permissions.

- **Cross-platform:** Behavior differs slightly between OSes.

## Source

[PHP filectime Documentation](https://www.php.net/manual/en/function.filectime.php)

This tutorial covered the PHP filectime function with practical
examples showing its usage in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Filesystem functions](/php/#php-fs).