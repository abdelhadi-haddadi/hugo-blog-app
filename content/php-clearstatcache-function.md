+++
title = "PHP clearstatcache Function"
date = 2025-08-29T20:05:39.105+01:00
draft = false
description = "PHP clearstatcache function tutorial shows how to clear file status cache in PHP. Learn clearstatcache with practical examples."
image = ""
imageBig = ""
categories = ["php-filesystem"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP clearstatcache Function

last modified April 3, 2025

The PHP clearstatcache function clears the file status cache. PHP caches file information for better performance.

## Basic Definition

The clearstatcache function clears the cached results of file system functions. It takes optional parameters for specific file clearing.

Syntax: clearstatcache(bool $clear_realpath_cache = false, string $filename = ""): void. The function affects all file system functions.

## Basic clearstatcache Example

This shows the simplest usage of clearstatcache to clear all cached data.

basic_clearstatcache.php
  

&lt;?php

declare(strict_types=1);

$file = 'test.txt';

// First check
$size1 = filesize($file);

// Modify file
file_put_contents($file, 'New content');

// Clear cache
clearstatcache();

// Second check
$size2 = filesize($file);

echo "Before: $size1, After: $size2";

This demonstrates how file size might be cached without clearing the cache. The second filesize call returns updated data.

## Clearing Specific File Cache

You can clear cache for a specific file to improve performance.

specific_file.php
  

&lt;?php

declare(strict_types=1);

$file1 = 'file1.txt';
$file2 = 'file2.txt';

// Check both files
$size1a = filesize($file1);
$size2a = filesize($file2);

// Modify file1
file_put_contents($file1, 'Updated');

// Clear cache only for file1
clearstatcache(true, $file1);

// Check again
$size1b = filesize($file1);
$size2b = filesize($file2);

echo "File1: $size1a → $size1b, File2: $size2a → $size2b";

This clears cache only for file1.txt, leaving file2.txt cached. This is more efficient than clearing all cache.

## Realpath Cache Clearing

The function can also clear the realpath cache for symbolic links.

realpath_cache.php
  

&lt;?php

declare(strict_types=1);

$link = 'symlink_to_file';

// Get real path (cached)
$path1 = realpath($link);

// Change symlink target
unlink($link);
symlink('new_target.txt', $link);

// Clear realpath cache
clearstatcache(true);

// Get updated real path
$path2 = realpath($link);

echo "Before: $path1, After: $path2";

This shows how to clear the realpath cache when working with symbolic links. The first parameter must be true to clear this cache.

## Performance Impact Example

This demonstrates the performance impact of excessive cache clearing.

performance.php
  

&lt;?php

declare(strict_types=1);

$file = 'large_file.txt';
$iterations = 1000;

// With cache clearing
$start1 = microtime(true);
for ($i = 0; $i &lt; $iterations; $i++) {
    clearstatcache();
    filesize($file);
}
$time1 = microtime(true) - $start1;

// Without cache clearing
$start2 = microtime(true);
for ($i = 0; $i &lt; $iterations; $i++) {
    filesize($file);
}
$time2 = microtime(true) - $start2;

echo "With clearing: $time1, Without: $time2";

This shows the significant performance difference when clearing cache unnecessarily. Only clear cache when file changes are expected.

## Combined with file_exists

This example shows clearstatcache with file_exists.

file_exists.php
  

&lt;?php

declare(strict_types=1);

$file = 'temp_file.txt';

// Create file
file_put_contents($file, 'data');

// Check exists (cached)
$exists1 = file_exists($file);

// Delete file
unlink($file);

// Check without clearing cache
$exists2 = file_exists($file);

// Clear cache and check
clearstatcache();
$exists3 = file_exists($file);

echo "Exists: $exists1, Deleted (cached): $exists2, Deleted (cleared): $exists3";

This demonstrates how file_exists results can be cached. The second check returns incorrect data until cache is cleared.

## Best Practices

- **Selective Clearing:** Clear cache only for changed files.

- **Performance:** Avoid unnecessary cache clearing in loops.

- **Realpath:** Use first parameter for symbolic link changes.

- **Testing:** Verify behavior in your specific environment.

## Source

[PHP clearstatcache Documentation](https://www.php.net/manual/en/function.clearstatcache.php)

This tutorial covered the PHP clearstatcache function with practical examples showing its usage in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Filesystem functions](/php/#php-fs).