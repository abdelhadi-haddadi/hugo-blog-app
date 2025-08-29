+++
title = "PHP fflush Function"
date = 2025-08-29T20:05:43.589+01:00
draft = false
description = "PHP fflush function tutorial shows how to flush output buffers in PHP. Learn fflush with practical examples."
image = ""
imageBig = ""
categories = ["php-filesystem"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP fflush Function

last modified April 3, 2025

The PHP fflush function forces a write of all buffered output to a
file pointer. It's useful when you need immediate output without waiting for
the buffer to fill.

## Basic Definition

The fflush function flushes the output to a file. It takes one
parameter: the file pointer resource. Returns true on success or false on
failure.

Syntax: fflush(resource $stream): bool. The function is particularly
useful with output streams like STDOUT or file handles.

## Basic fflush Example

This shows the simplest usage of fflush with a file handle.

basic_fflush.php
  

&lt;?php

declare(strict_types=1);

$file = fopen('output.txt', 'w');
fwrite($file, "Hello, World!\n");
fflush($file);
fclose($file);

This writes to a file and immediately flushes the buffer. Without fflush,
the data might remain in the buffer until the script ends or the buffer fills.

## Flushing STDOUT

fflush can be used with STDOUT for real-time command line output.

stdout_flush.php
  

&lt;?php

declare(strict_types=1);

for ($i = 0; $i &lt; 5; $i++) {
    echo "Progress: $i\n";
    fflush(STDOUT);
    sleep(1);
}

This demonstrates real-time output in a CLI script. Without fflush,
the output might be buffered and appear all at once when the script completes.

## Flushing Network Streams

fflush is useful when writing to network sockets or pipes.

socket_flush.php
  

&lt;?php

declare(strict_types=1);

$socket = fsockopen('example.com', 80);
fwrite($socket, "GET / HTTP/1.1\r\nHost: example.com\r\n\r\n");
fflush($socket);

while (!feof($socket)) {
    echo fgets($socket, 128);
}
fclose($socket);

This flushes the HTTP request immediately to the server. Network programming
often requires immediate data transmission rather than buffered output.

## Error Handling with fflush

This example shows proper error handling when using fflush.

error_handling.php
  

&lt;?php

declare(strict_types=1);

$file = fopen('data.log', 'a');
if ($file === false) {
    die("Failed to open file");
}

$bytes = fwrite($file, "Log entry\n");
if ($bytes === false) {
    die("Failed to write to file");
}

if (!fflush($file)) {
    die("Failed to flush output");
}

fclose($file);

Proper error handling ensures data integrity. Each operation is checked for
success before proceeding to the next step in the file handling process.

## Performance Considerations

This example demonstrates the performance impact of frequent flushing.

performance.php
  

&lt;?php

declare(strict_types=1);

$file = fopen('large_data.txt', 'w');

// Without flushing
$start = microtime(true);
for ($i = 0; $i &lt; 10000; $i++) {
    fwrite($file, "Line $i\n");
}
$timeNoFlush = microtime(true) - $start;

// With flushing
rewind($file);
$start = microtime(true);
for ($i = 0; $i &lt; 10000; $i++) {
    fwrite($file, "Line $i\n");
    fflush($file);
}
$timeWithFlush = microtime(true) - $start;

fclose($file);

echo "Without flush: $timeNoFlush seconds\n";
echo "With flush: $timeWithFlush seconds\n";

Frequent flushing can significantly impact performance. This example compares
execution time with and without flushing after each write operation.

## Best Practices

- **Selective Flushing:** Only flush when immediate output is needed.

- **Error Handling:** Always check the return value of fflush.

- **Resource Management:** Close files properly after flushing.

- **Buffering:** Understand PHP's output buffering mechanisms.

- **Performance:** Balance between data safety and performance.

## Source

[PHP fflush Documentation](https://www.php.net/manual/en/function.fflush.php)

This tutorial covered the PHP fflush function with practical
examples showing its usage in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Filesystem functions](/php/#php-fs).