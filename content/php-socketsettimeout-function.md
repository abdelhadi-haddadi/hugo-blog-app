+++
title = "PHP socket_set_timeout Function"
date = 2025-08-29T20:06:21.643+01:00
draft = false
description = "PHP socket_set_timeout function tutorial shows how to configure socket timeouts in PHP. Learn socket_set_timeout with practical examples for network programming."
image = ""
imageBig = ""
categories = ["php-network"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP socket_set_timeout Function

last modified April 4, 2025

The PHP socket_set_timeout function sets timeout values for socket
operations. It's essential for network programming to prevent hanging.

## Basic Definition

socket_set_timeout configures timeout values for socket streams.
It affects operations like reading, writing, and connecting.

Syntax: socket_set_timeout(resource $socket, int $seconds, int $microseconds = 0): bool.
Returns true on success, false on failure. Works with stream sockets.

## Setting Basic Socket Timeout

This example demonstrates setting a simple timeout for socket operations.

basic_timeout.php
  

&lt;?php

declare(strict_types=1);

$socket = fsockopen("example.com", 80);
if ($socket === false) {
    die("Connection failed");
}

// Set 5 second timeout
socket_set_timeout($socket, 5);

// Perform socket operations...

fclose($socket);

This sets a 5-second timeout for all operations on the socket. After this
period, operations will timeout if not completed. Prevents indefinite blocking.

## Precise Timeout with Microseconds

This shows how to set a timeout with microsecond precision for exact timing.

microsecond_timeout.php
  

&lt;?php

declare(strict_types=1);

$socket = fsockopen("example.com", 80);
if ($socket === false) {
    die("Connection failed");
}

// Set 2.5 second timeout (2 seconds + 500000 microseconds)
socket_set_timeout($socket, 2, 500000);

// Read operation with precise timeout
$data = fread($socket, 1024);

fclose($socket);

This sets a 2.5 second timeout by combining seconds and microseconds. Useful
when you need more precise control over timeout durations.

## Checking for Timeout Condition

This example demonstrates how to check if a timeout occurred during operations.

check_timeout.php
  

&lt;?php

declare(strict_types=1);

$socket = fsockopen("example.com", 80);
if ($socket === false) {
    die("Connection failed");
}

socket_set_timeout($socket, 3);

$data = fread($socket, 1024);

$info = stream_get_meta_data($socket);
if ($info['timed_out']) {
    echo "Socket operation timed out";
} else {
    echo "Operation completed successfully";
}

fclose($socket);

After socket operations, we check the stream metadata for timeout status.
This helps identify if operations failed due to timeout conditions.

## Different Timeouts for Read/Write

This shows how to set different timeout values for read and write operations.

rw_timeouts.php
  

&lt;?php

declare(strict_types=1);

$socket = fsockopen("example.com", 80);
if ($socket === false) {
    die("Connection failed");
}

// Set read timeout (5 seconds)
socket_set_timeout($socket, 5);

// Perform read operations...

// Set write timeout (2 seconds)
socket_set_timeout($socket, 2);

// Perform write operations...

fclose($socket);

Different operations may need different timeout values. This example shows
how to adjust timeouts between read and write operations.

## Handling Slow Connections

This demonstrates using timeouts to handle slow or unreliable connections.

slow_connection.php
  

&lt;?php

declare(strict_types=1);

function fetchWithRetry($host, $port, $retries = 3) {
    $timeout = 2; // Start with 2 second timeout
    
    for ($i = 0; $i &lt; $retries; $i++) {
        $socket = fsockopen($host, $port);
        if ($socket === false) continue;
        
        socket_set_timeout($socket, $timeout);
        
        $data = fread($socket, 1024);
        $info = stream_get_meta_data($socket);
        
        if (!$info['timed_out']) {
            fclose($socket);
            return $data;
        }
        
        fclose($socket);
        $timeout *= 2; // Double timeout for next retry
    }
    
    return false;
}

$data = fetchWithRetry("example.com", 80);

This implements a retry mechanism with increasing timeouts. Useful for
handling temporary network issues or slow connections.

## Best Practices

- **Reasonable Timeouts:** Set appropriate values for your use case

- **Error Handling:** Always check for timeout conditions

- **Resource Cleanup:** Close sockets properly after use

- **Context Awareness:** Adjust timeouts based on network conditions

## Source

[PHP socket_set_timeout Documentation](https://www.php.net/manual/en/function.socket-set-timeout.php)

This tutorial covered the PHP socket_set_timeout function with practical
examples for network programming and timeout management.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Network Functions](/php/#php-network).