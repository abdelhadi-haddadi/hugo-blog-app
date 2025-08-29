+++
title = "PHP flock Function"
date = 2025-08-29T20:05:50.293+01:00
draft = false
description = "PHP flock function tutorial shows how to use file locking in PHP. Learn flock with practical examples."
image = ""
imageBig = ""
categories = ["php-filesystem"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP flock Function

last modified April 3, 2025

The PHP flock function provides advisory file locking. It helps
prevent race conditions when multiple processes access the same file.

## Basic Definition

The flock function allows you to acquire or release a lock on an
open file. It operates on a file pointer resource and supports shared/exclusive
locks.

Syntax: flock(resource $stream, int $operation, int &amp;$would_block = null): bool.
The function returns true on success or false on failure.

## Basic Exclusive Lock Example

This shows how to acquire an exclusive lock for writing to a file.

basic_exclusive_lock.php
  

&lt;?php

declare(strict_types=1);

$file = fopen("data.txt", "c+");

if (flock($file, LOCK_EX)) {
    fwrite($file, "Writing with exclusive lock\n");
    flock($file, LOCK_UN); // Release lock
} else {
    echo "Couldn't get the lock!";
}

fclose($file);

This acquires an exclusive lock (LOCK_EX) before writing. The lock is released
with LOCK_UN. Only one process can hold an exclusive lock at a time.

## Shared Lock Example

This demonstrates using a shared lock for reading a file safely.

shared_lock.php
  

&lt;?php

declare(strict_types=1);

$file = fopen("data.txt", "r");

if (flock($file, LOCK_SH)) {
    $content = fread($file, filesize("data.txt"));
    echo $content;
    flock($file, LOCK_UN);
} else {
    echo "Couldn't get the shared lock!";
}

fclose($file);

Multiple processes can hold shared locks (LOCK_SH) simultaneously. This is useful
when you want to allow concurrent reads but prevent writes during reading.

## Non-blocking Lock Example

This shows how to attempt a non-blocking lock that fails immediately if unavailable.

non_blocking.php
  

&lt;?php

declare(strict_types=1);

$file = fopen("data.txt", "c+");

if (flock($file, LOCK_EX | LOCK_NB, $would_block)) {
    if ($would_block) {
        echo "Lock is held by another process\n";
    }
    fwrite($file, "Non-blocking write\n");
    flock($file, LOCK_UN);
} else {
    echo "Couldn't get non-blocking lock!\n";
}

fclose($file);

The LOCK_NB flag makes the function return immediately if the lock can't be
acquired. The $would_block parameter indicates if the lock failed due to
contention.

## File Locking with Timeout

This example implements a simple timeout mechanism for acquiring locks.

lock_timeout.php
  

&lt;?php

declare(strict_types=1);

function acquireLockWithTimeout($file, int $timeout = 5): bool {
    $start = time();
    
    while (!flock($file, LOCK_EX | LOCK_NB)) {
        if (time() - $start &gt;= $timeout) {
            return false;
        }
        usleep(100000); // Wait 100ms before retry
    }
    
    return true;
}

$file = fopen("data.txt", "c+");

if (acquireLockWithTimeout($file)) {
    fwrite($file, "Write with timeout lock\n");
    flock($file, LOCK_UN);
} else {
    echo "Failed to acquire lock within timeout\n";
}

fclose($file);

This implements a custom timeout by repeatedly trying to acquire a non-blocking
lock. It waits up to 5 seconds before giving up.

## Process Synchronization Example

This demonstrates using file locks for inter-process synchronization.

process_sync.php
  

&lt;?php

declare(strict_types=1);

$lockFile = fopen("process.lock", "c+");

if (!flock($lockFile, LOCK_EX)) {
    die("Could not acquire lock\n");
}

// Critical section
file_put_contents("output.log", "Process " . getmypid() . " running\n", FILE_APPEND);
sleep(2); // Simulate work

flock($lockFile, LOCK_UN);
fclose($lockFile);

echo "Process completed\n";

This ensures only one instance of the script runs at a time. The lock file acts
as a mutex for process synchronization.

## Best Practices

- **Always release locks:** Use try-finally blocks to ensure unlock.

- **Keep lock duration short:** Minimize time holding locks.

- **Handle errors:** Check return values from flock calls.

- **Use advisory locking:** Remember locks are advisory in PHP.

- **Clean up:** Close files after use to free resources.

## Source

[PHP flock Documentation](https://www.php.net/manual/en/function.flock.php)

This tutorial covered the PHP flock function with practical
examples showing file locking techniques for safe file operations.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Filesystem functions](/php/#php-fs).