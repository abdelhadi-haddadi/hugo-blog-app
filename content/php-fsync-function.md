+++
title = "PHP fsync Function"
date = 2025-08-29T20:05:53.660+01:00
draft = false
description = "PHP fsync function tutorial shows how to force synchronization of file changes to disk in PHP. Learn fsync with practical examples."
image = ""
imageBig = ""
categories = ["php-filesystem"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP fsync Function

last modified April 3, 2025

The PHP fsync function forces synchronization of file changes to
disk. It ensures all buffered modifications are physically written to storage.

## Basic Definition

The fsync function synchronizes a file's in-core state with storage
device. It takes a file pointer resource and returns a boolean indicating success.

Syntax: fsync(resource $stream): bool. This function is crucial for
data integrity when working with critical file operations.

## Basic fsync Example

This shows the simplest usage of fsync to ensure file changes are
written to disk.

basic_fsync.php
  

&lt;?php

declare(strict_types=1);

$file = fopen('important.log', 'w');
fwrite($file, 'Critical data');
$success = fsync($file);
fclose($file);

var_dump($success); // Outputs: bool(true)

This ensures "Critical data" is physically written to disk before continuing. The
function returns true if the synchronization was successful.

## Error Handling Example

This demonstrates proper error handling when using fsync.

fsync_error.php
  

&lt;?php

declare(strict_types=1);

$file = fopen('data.log', 'w');

if ($file === false) {
    die('Failed to open file');
}

fwrite($file, 'Important content');

if (!fsync($file)) {
    die('Failed to sync file to disk');
}

fclose($file);

This example checks both file opening and fsync success. Proper error handling is
essential for critical file operations.

## Combining with fflush

fsync is often used with fflush for complete control.

fsync_fflush.php
  

&lt;?php

declare(strict_types=1);

$file = fopen('transaction.log', 'a');

fwrite($file, 'New transaction data' . PHP_EOL);
fflush($file); // Flush PHP buffers
$synced = fsync($file); // Force OS to write to disk

if (!$synced) {
    error_log('Disk sync failed');
}

fclose($file);

fflush flushes PHP's buffers while fsync ensures the
OS writes to disk. This combination provides maximum data integrity.

## Database Transaction Example

Using fsync when writing database transaction logs.

db_transaction.php
  

&lt;?php

declare(strict_types=1);

function logTransaction(string $data): void {
    $logFile = fopen('transactions.log', 'a');
    
    fwrite($logFile, date('Y-m-d H:i:s') . ': ' . $data . PHP_EOL);
    
    if (!fsync($logFile)) {
        throw new RuntimeException('Failed to sync transaction log');
    }
    
    fclose($logFile);
}

logTransaction('User payment processed');

This ensures transaction logs are physically written before continuing. Critical
financial systems often use this approach.

## Performance Considerations

fsync has significant performance impact as it waits for disk writes.

performance.php
  

&lt;?php

declare(strict_types=1);

$start = microtime(true);
$file = fopen('largefile.dat', 'w');

// Write 1MB of data
fwrite($file, str_repeat('x', 1024 * 1024));

fsync($file); // This will block until write completes
fclose($file);

$duration = microtime(true) - $start;
echo "Operation took: " . round($duration, 3) . " seconds";

This shows how fsync can impact performance. Use it judiciously for
critical operations only.

## Best Practices

- **Critical Data Only:** Use fsync only when data integrity is essential.

- **Error Handling:** Always check fsync's return value.

- **Combine with fflush:** Use fflush before fsync for complete control.

- **Performance:** Be aware of the performance impact.

- **File Handles:** Keep file handle open until after fsync.

## Source

[PHP fsync Documentation](https://www.php.net/manual/en/function.fsync.php)

This tutorial covered the PHP fsync function with practical
examples showing its usage in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Filesystem functions](/php/#php-fs).