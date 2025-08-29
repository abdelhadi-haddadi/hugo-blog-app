+++
title = "PHP pclose Function"
date = 2025-08-29T20:06:02.762+01:00
draft = false
description = "PHP pclose function tutorial shows how to close process file pointers in PHP. Learn pclose with practical examples."
image = ""
imageBig = ""
categories = ["php-filesystem"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP pclose Function

last modified April 3, 2025

The PHP pclose function closes a process file pointer opened by
popen. It's essential for proper resource cleanup when working with
process pipes.

## Basic Definition

The pclose function terminates the process associated with a pipe
and closes the file pointer. It returns the termination status of the process.

Syntax: pclose(resource $handle): int. The function takes a pipe
handle from popen and returns the process exit status.

## Basic pclose Example

This shows the simplest usage of pclose with a process pipe.

basic_pclose.php
  

&lt;?php

declare(strict_types=1);

$handle = popen('ls -l', 'r');
if ($handle === false) {
    throw new RuntimeException('Failed to open process');
}

// Read process output here...

$status = pclose($handle);

echo "Process exited with status: $status";

This opens a process to list files, then properly closes it with pclose.
Always check if popen succeeded before calling pclose.

## Reading Process Output Before Closing

This example reads output before closing the process.

read_before_close.php
  

&lt;?php

declare(strict_types=1);

$handle = popen('date', 'r');
if ($handle === false) {
    throw new RuntimeException('Failed to open process');
}

$output = fread($handle, 4096);
$status = pclose($handle);

echo "Output: $output";
echo "Exit status: $status";

We read the process output before closing. The exit status is captured in
$status. Always read all output before calling pclose.

## Error Handling with pclose

This demonstrates proper error handling with process pipes.

error_handling.php
  

&lt;?php

declare(strict_types=1);

$command = 'nonexistent-command 2&gt;&amp;1';
$handle = @popen($command, 'r');

if ($handle === false) {
    die("Failed to execute command: $command");
}

$output = stream_get_contents($handle);
$status = pclose($handle);

if ($status !== 0) {
    echo "Command failed with status $status\n";
    echo "Error output: $output";
} else {
    echo "Command succeeded: $output";
}

This shows how to handle command failures. We capture both output and exit
status. The 2&gt;&amp;1 redirects stderr to stdout for error capture.

## Writing to a Process

This example demonstrates writing to a process before closing.

write_process.php
  

&lt;?php

declare(strict_types=1);

$handle = popen('grep "error" &gt; errors.log', 'w');
if ($handle === false) {
    throw new RuntimeException('Failed to open process');
}

fwrite($handle, "error: file not found\n");
fwrite($handle, "warning: deprecated function\n");
fwrite($handle, "error: permission denied\n");

$status = pclose($handle);

echo "Grep process exited with status: $status";

We open a process for writing, send data to it, then close it. The process
filters input and writes to a file. Always close write pipes when done.

## Checking Process Status

This example shows how to interpret the process exit status.

process_status.php
  

&lt;?php

declare(strict_types=1);

function executeCommand(string $cmd): string
{
    $handle = popen($cmd . ' 2&gt;&amp;1', 'r');
    if ($handle === false) {
        throw new RuntimeException("Failed to execute: $cmd");
    }

    $output = stream_get_contents($handle);
    $status = pclose($handle);

    if ($status !== 0) {
        throw new RuntimeException(
            "Command failed with status $status: $output"
        );
    }

    return $output;
}

try {
    $result = executeCommand('ls -l /nonexistent');
    echo $result;
} catch (RuntimeException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This wraps process execution in a function with proper error handling. The exit
status is checked after closing. Non-zero status indicates command failure.

## Best Practices

- **Always Close:** Never leave process pipes open.

- **Error Handling:** Check both popen and pclose results.

- **Resource Limits:** Be mindful of system process limits.

- **Security:** Sanitize command inputs to prevent injection.

- **Timeouts:** Consider adding timeouts for long-running processes.

## Source

[PHP pclose Documentation](https://www.php.net/manual/en/function.pclose.php)

This tutorial covered the PHP pclose function with practical
examples showing its usage with process pipes in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Filesystem functions](/php/#php-fs).