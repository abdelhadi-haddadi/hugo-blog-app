+++
title = "PHP fdatasync Function"
date = 2025-08-29T20:05:42.445+01:00
draft = false
description = "PHP fdatasync function tutorial shows how to synchronize file data to disk in PHP. Learn fdatasync with practical examples."
image = ""
imageBig = ""
categories = ["php-filesystem"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP fdatasync Function

last modified April 3, 2025

The PHP fdatasync function synchronizes file data to disk. It ensures
file content is physically written to storage. This is critical for data integrity.

## Basic Definition

The fdatasync function forces write operations for a file descriptor
to complete. Unlike fflush, it ensures data reaches physical storage.

Syntax: fdatasync(resource $stream): bool. It returns true on success
or false on failure. The function requires a valid file pointer resource.

## Basic fdatasync Example

This shows the simplest usage of fdatasync to ensure data is written.

basic_fdatasync.php
  

&lt;?php

declare(strict_types=1);

$file = fopen('data.txt', 'w');
fwrite($file, 'Important data');
$result = fdatasync($file);
fclose($file);

var_dump($result); // Outputs: bool(true)

This writes data to a file and immediately synchronizes it to disk. The function
returns true indicating successful synchronization.

## Error Handling Example

This demonstrates proper error handling when using fdatasync.

error_handling.php
  

&lt;?php

declare(strict_types=1);

$file = fopen('data.txt', 'w');
if ($file === false) {
    die('Failed to open file');
}

fwrite($file, 'Critical data');

if (!fdatasync($file)) {
    die('Failed to sync data to disk');
}

fclose($file);

This checks both file opening and synchronization success. It ensures data is
safely stored before continuing execution.

## Comparing fsync and fdatasync

This example shows the difference between fsync and fdatasync.

sync_comparison.php
  

&lt;?php

declare(strict_types=1);

$file = fopen('data.txt', 'w');
fwrite($file, 'Test data');

// Only synchronizes data, not metadata
$dataSync = fdatasync($file);

// Synchronizes both data and metadata
$fullSync = fsync($file);

fclose($file);

var_dump($dataSync, $fullSync); // Both output: bool(true)

fdatasync is faster as it doesn't flush metadata. fsync
provides stronger guarantees but is slower.

## Database Transaction Example

This shows fdatasync in a database transaction scenario.

database_transaction.php
  

&lt;?php

declare(strict_types=1);

function writeTransaction(string $filename, string $data): bool {
    $file = fopen($filename, 'a');
    if ($file === false) return false;
    
    if (fwrite($file, $data) === false) {
        fclose($file);
        return false;
    }
    
    if (!fdatasync($file)) {
        fclose($file);
        return false;
    }
    
    return fclose($file);
}

$success = writeTransaction('transactions.log', 'TX123:500.00');
var_dump($success); // Outputs: bool(true)

This ensures transaction data is safely stored before continuing. It's critical
for financial or important logging operations.

## Performance Considerations

This example measures the performance impact of fdatasync.

performance_test.php
  

&lt;?php

declare(strict_types=1);

$start = microtime(true);
$file = fopen('perf_test.txt', 'w');

for ($i = 0; $i &lt; 1000; $i++) {
    fwrite($file, "Line $i\n");
    if ($i % 100 === 0) {
        fdatasync($file);
    }
}

fclose($file);
$duration = microtime(true) - $start;

echo "Execution time: " . round($duration, 4) . " seconds";

This shows how frequent synchronization affects performance. The example balances
data safety with performance by syncing every 100 writes.

## Best Practices

- **Critical Data:** Use for important data that must persist.

- **Performance:** Avoid overuse as it slows operations.

- **Error Handling:** Always check return values.

- **Battery Devices:** Consider impact on mobile devices.

- **Alternatives:** Use fsync when metadata matters.

## Source

[PHP fdatasync Documentation](https://www.php.net/manual/en/function.fdatasync.php)

This tutorial covered the PHP fdatasync function with practical
examples showing its usage in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Filesystem functions](/php/#php-fs).