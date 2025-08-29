+++
title = "PHP disk_total_space Function"
date = 2025-08-29T20:05:41.353+01:00
draft = false
description = "PHP disk_total_space function tutorial shows how to get total disk space in PHP. Learn disk_total_space with practical examples."
image = ""
imageBig = ""
categories = ["php-filesystem"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP disk_total_space Function

last modified April 3, 2025

The PHP disk_total_space function returns the total size of a
filesystem or disk partition. It's useful for storage monitoring and management.

## Basic Definition

The disk_total_space function returns the total space in bytes for
the filesystem that the specified directory is on. It takes one parameter.

Syntax: disk_total_space(string $directory): float|false. Returns
total bytes as float or false on failure. Requires filesystem permissions.

## Basic disk_total_space Example

This shows the simplest usage of disk_total_space to get disk size.

basic_disk_space.php
  

&lt;?php

declare(strict_types=1);

$directory = "/";
$totalSpace = disk_total_space($directory);

echo "Total space: " . $totalSpace . " bytes";

This returns the total space of the root filesystem in bytes. The function
requires read permissions for the specified directory path.

## Converting Bytes to Human-Readable Format

Disk space is often more readable when converted to larger units.

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

$space = disk_total_space("/");
echo "Total space: " . formatBytes($space);

This converts raw bytes to a human-readable format like GB or TB. The helper
function handles the conversion with configurable precision.

## Checking Multiple Disks

You can check space on multiple mounted filesystems with one script.

multiple_disks.php
  

&lt;?php

declare(strict_types=1);

$disks = [
    "/" =&gt; "Root",
    "/home" =&gt; "Home",
    "/mnt/data" =&gt; "Data Storage"
];

foreach ($disks as $path =&gt; $name) {
    $space = disk_total_space($path);
    if ($space !== false) {
        echo "$name: $space bytes\n";
    } else {
        echo "Failed to read $name disk\n";
    }
}

This checks multiple mounted filesystems and handles potential failures. Each
disk is labeled for clarity in the output.

## Calculating Free Space Percentage

Combine with disk_free_space to calculate usage percentages.

free_space_percent.php
  

&lt;?php

declare(strict_types=1);

$directory = "/";
$total = disk_total_space($directory);
$free = disk_free_space($directory);

if ($total !== false &amp;&amp; $free !== false) {
    $used = $total - $free;
    $percentUsed = ($used / $total) * 100;
    echo "Disk usage: " . round($percentUsed, 2) . "%";
} else {
    echo "Unable to determine disk usage";
}

This calculates the percentage of disk space used. Both functions must succeed
for the calculation to work. Error handling is included.

## Windows Drive Example

The function works with Windows drive letters when properly formatted.

windows_drive.php
  

&lt;?php

declare(strict_types=1);

$drive = "C:\\";
$space = disk_total_space($drive);

if ($space !== false) {
    echo "Drive C: total space: " . $space . " bytes";
} else {
    echo "Unable to read drive C:";
}

On Windows, use backslashes and include the trailing slash. The function returns
the total capacity of the specified drive in bytes.

## Edge Cases

disk_total_space has specific behaviors with certain inputs.

edge_cases.php
  

&lt;?php

declare(strict_types=1);

// Non-existent path
$result1 = disk_total_space("/nonexistent/path");

// No permissions
$result2 = disk_total_space("/root");

var_dump($result1); // bool(false)
var_dump($result2); // bool(false) if no permissions

The function returns false for invalid paths or when permissions are insufficient.
Always check the return value before using the result in calculations.

## Best Practices

- **Error Handling:** Always check for false return values.

- **Permissions:** Ensure script has filesystem read access.

- **Network Paths:** May not work reliably with network shares.

- **Caching:** Results may be cached by the OS between calls.

- **Units:** Convert bytes for human-readable displays.

## Source

[PHP disk_total_space Documentation](https://www.php.net/manual/en/function.disk-total-space.php)

This tutorial covered the PHP disk_total_space function with
practical examples showing disk space monitoring in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Filesystem functions](/php/#php-fs).