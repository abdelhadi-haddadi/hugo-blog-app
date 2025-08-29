+++
title = "PHP diskfreespace Function"
date = 2025-08-29T20:05:41.358+01:00
draft = false
description = "PHP diskfreespace function tutorial shows how to check available disk space in PHP. Learn diskfreespace with practical examples."
image = ""
imageBig = ""
categories = ["php-filesystem"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP diskfreespace Function

last modified April 3, 2025

The PHP diskfreespace function returns available space on a filesystem
or disk partition. It's useful for monitoring disk usage in applications.

## Basic Definition

The diskfreespace function returns the number of available bytes on
the filesystem or disk partition. It's an alias of disk_free_space.

Syntax: diskfreespace(string $directory): float|false. It returns
false on failure. The directory parameter specifies the filesystem to check.

## Basic diskfreespace Example

This shows the simplest usage of diskfreespace to check free space.

basic_diskfreespace.php
  

&lt;?php

declare(strict_types=1);

$freeSpace = diskfreespace("/");

if ($freeSpace !== false) {
    echo "Free space: " . $freeSpace . " bytes";
} else {
    echo "Could not determine free space";
}

This checks available space on the root partition. The result is in bytes. Always
check for false return value in case of errors.

## Converting Bytes to Human-Readable Format

Disk space values are often more readable when converted to KB, MB, or GB.

human_readable.php
  

&lt;?php

declare(strict_types=1);

function formatBytes(float $bytes, int $precision = 2): string {
    $units = ['B', 'KB', 'MB', 'GB', 'TB'];
    $bytes = max($bytes, 0);
    $pow = floor(($bytes ? log($bytes) : 0) / log(1024));
    $pow = min($pow, count($units) - 1);
    $bytes /= (1 &lt;&lt; (10 * $pow));
    return round($bytes, $precision) . ' ' . $units[$pow];
}

$freeSpace = diskfreespace("/");

if ($freeSpace !== false) {
    echo "Free space: " . formatBytes($freeSpace);
} else {
    echo "Could not determine free space";
}

The formatBytes helper function converts bytes to appropriate units.
This makes the output more user-friendly for large disk space values.

## Checking Multiple Partitions

You can check free space on different partitions or mount points.

multiple_partitions.php
  

&lt;?php

declare(strict_types=1);

$partitions = ["/", "/home", "/var"];

foreach ($partitions as $partition) {
    $freeSpace = diskfreespace($partition);
    
    if ($freeSpace !== false) {
        echo "Free space on $partition: " . 
             round($freeSpace / (1024 * 1024)) . " MB\n";
    } else {
        echo "Could not check space on $partition\n";
    }
}

This example checks multiple partitions and displays space in megabytes. Note that
the partition must exist and be accessible for the check to succeed.

## Calculating Percentage Free Space

Combine with disk_total_space to calculate percentage free space.

percentage_free.php
  

&lt;?php

declare(strict_types=1);

$directory = "/";
$free = diskfreespace($directory);
$total = disk_total_space($directory);

if ($free !== false &amp;&amp; $total !== false) {
    $percentFree = ($free / $total) * 100;
    echo "Free space: " . round($percentFree, 2) . "%";
} else {
    echo "Could not determine disk space";
}

This calculates the percentage of free space available. Both functions must
succeed for the calculation to work. The result shows how full the disk is.

## Windows Drive Example

diskfreespace works with Windows drive letters too.

windows_drive.php
  

&lt;?php

declare(strict_types=1);

$drive = "C:";
$freeSpace = diskfreespace($drive);

if ($freeSpace !== false) {
    $freeGB = $freeSpace / (1024 * 1024 * 1024);
    echo "Free space on $drive: " . round($freeGB, 2) . " GB";
} else {
    echo "Could not check space on $drive";
}

On Windows, specify the drive letter followed by a colon. The example converts
bytes to gigabytes for better readability of typical Windows drive sizes.

## Best Practices

- **Error Handling:** Always check for false return value.

- **Permissions:** Ensure PHP has access to the filesystem.

- **Caching:** Don't call frequently as it's filesystem-intensive.

- **Cross-platform:** Works on both Unix and Windows systems.

- **Units:** Convert bytes for human-readable output.

## Source

[PHP diskfreespace Documentation](https://www.php.net/manual/en/function.diskfreespace.php)

This tutorial covered the PHP diskfreespace function with practical
examples showing its usage in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Filesystem functions](/php/#php-fs).