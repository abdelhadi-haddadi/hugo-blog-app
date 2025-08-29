+++
title = "PHP popen Function"
date = 2025-08-29T20:06:02.746+01:00
draft = false
description = "PHP popen function tutorial shows how to execute commands and communicate with processes in PHP. Learn popen with practical examples."
image = ""
imageBig = ""
categories = ["php-filesystem"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP popen Function

last modified April 3, 2025

The PHP popen function opens a process file pointer. It allows
two-way communication with an external command. This is useful for executing
system commands and processing their input/output.

## Basic Definition

The popen function opens a pipe to a process executed by running
a command. It returns a file pointer similar to what fopen returns.

Syntax: popen(string $command, string $mode): resource|false. The
mode can be "r" for reading or "w" for writing. Always close with pclose.

## Basic popen Example

This shows the simplest usage of popen to read command output.

basic_popen.php
  

&lt;?php

declare(strict_types=1);

$handle = popen('ls -l', 'r');
if ($handle === false) {
    exit("Failed to open process");
}

while (!feof($handle)) {
    echo fgets($handle);
}

pclose($handle);

This executes the 'ls -l' command and reads its output line by line. The file
pointer is closed with pclose when done. Always check for failure.

## Writing to a Process

We can also write data to a command's input using the "w" mode.

popen_write.php
  

&lt;?php

declare(strict_types=1);

$handle = popen('grep "error" &gt; errors.log', 'w');
if ($handle === false) {
    exit("Failed to open process");
}

fwrite($handle, "error: file not found\n");
fwrite($handle, "warning: deprecated function\n");
fwrite($handle, "error: permission denied\n");

pclose($handle);

This writes lines to the grep command which filters for "error" messages. The
filtered output is redirected to errors.log. The process receives input via pipe.

## Two-way Communication

For bidirectional communication, we need two popen calls.

two_way.php
  

&lt;?php

declare(strict_types=1);

$writeHandle = popen('bc', 'w');
$readHandle = popen('bc', 'r');

if ($writeHandle === false || $readHandle === false) {
    exit("Failed to open process");
}

fwrite($writeHandle, "5 + 7\n");
echo "Result: " . fgets($readHandle);

fwrite($writeHandle, "10 * 3\n");
echo "Result: " . fgets($readHandle);

pclose($writeHandle);
pclose($readHandle);

This demonstrates communicating with the bc calculator. Note this approach has
limitations - proper process control requires proc_open instead.

## Processing Large Output

popen is efficient for processing large command output.

large_output.php
  

&lt;?php

declare(strict_types=1);

$handle = popen('find /var/log -type f -name "*.log"', 'r');
if ($handle === false) {
    exit("Failed to open process");
}

$count = 0;
while (!feof($handle)) {
    $file = trim(fgets($handle));
    if (!empty($file)) {
        $count++;
        echo "Found log file: {$file}\n";
    }
}

pclose($handle);
echo "Total log files found: {$count}\n";

This finds all .log files in /var/log without loading all results into memory.
Each line is processed as it's read, making it memory-efficient for large outputs.

## Error Handling

Proper error handling is crucial when working with processes.

error_handling.php
  

&lt;?php

declare(strict_types=1);

$command = 'nonexistent-command 2&gt;&amp;1';
$handle = popen($command, 'r');

if ($handle === false) {
    exit("Failed to open process");
}

$output = '';
while (!feof($handle)) {
    $output .= fgets($handle);
}

$status = pclose($handle);
if ($status !== 0) {
    echo "Command failed with status: {$status}\n";
    echo "Error output: {$output}\n";
} else {
    echo "Command succeeded. Output:\n{$output}";
}

This shows how to capture both output and error streams (2&gt;&amp;1). We check the
process exit status with pclose. Always handle potential errors.

## Best Practices

- **Security:** Never pass unsanitized user input to popen.

- **Error Handling:** Always check for failed process opening.

- **Resource Cleanup:** Always close handles with pclose.

- **Alternatives:** Consider proc_open for more control.

- **Platform Differences:** Commands may behave differently across OS.

## Source

[PHP popen Documentation](https://www.php.net/manual/en/function.popen.php)

This tutorial covered the PHP popen function with practical
examples showing its usage for process communication in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Filesystem functions](/php/#php-fs).