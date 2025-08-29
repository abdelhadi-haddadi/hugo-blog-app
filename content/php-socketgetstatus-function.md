+++
title = "PHP socket_get_status Function"
date = 2025-08-29T20:06:21.653+01:00
draft = false
description = "PHP socket_get_status function tutorial shows how to check socket status in PHP. Learn socket_get_status with practical examples for network programming."
image = ""
imageBig = ""
categories = ["php-network"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP socket_get_status Function

last modified April 4, 2025

The PHP socket_get_status function retrieves information about
a socket stream. It's useful for monitoring socket connections in network
programming.

## Basic Definition

socket_get_status returns an array with socket stream metadata.
It provides details like timed_out, blocked, eof, and unread_bytes.

Syntax: socket_get_status(resource $socket): array.
Returns an associative array with socket status information.
Requires an active socket connection.

## Basic Socket Status Check

This example shows how to get basic status information from a socket.

basic_status.php
  

&lt;?php

declare(strict_types=1);

$socket = fsockopen("www.example.com", 80);
$status = socket_get_status($socket);

print_r($status);
fclose($socket);

This connects to example.com on port 80 and retrieves socket status.
The output shows various connection parameters and state information.

## Checking for Timeout

This demonstrates checking if a socket operation has timed out.

timeout_check.php
  

&lt;?php

declare(strict_types=1);

$socket = fsockopen("www.example.com", 80);
stream_set_timeout($socket, 1);

fread($socket, 10000); // Force potential timeout
$status = socket_get_status($socket);

echo $status['timed_out'] ? "Timeout occurred" : "No timeout";
fclose($socket);

This sets a short timeout and checks if the read operation timed out.
The timed_out flag helps detect connection issues in network applications.

## Monitoring Unread Bytes

This example shows how to check for unread bytes in the socket buffer.

unread_bytes.php
  

&lt;?php

declare(strict_types=1);

$socket = fsockopen("www.example.com", 80);
fwrite($socket, "GET / HTTP/1.0\r\nHost: www.example.com\r\n\r\n");

$status = socket_get_status($socket);
echo "Unread bytes: " . $status['unread_bytes'];
fclose($socket);

After sending a request, this checks how many bytes remain unread.
This helps manage buffer sizes and optimize network communication.

## Checking End-of-File Status

This demonstrates checking if the socket has reached end-of-file.

eof_check.php
  

&lt;?php

declare(strict_types=1);

$socket = fsockopen("www.example.com", 80);
fwrite($socket, "GET / HTTP/1.0\r\nHost: www.example.com\r\n\r\n");

while (!feof($socket)) {
    fread($socket, 1024);
}

$status = socket_get_status($socket);
echo $status['eof'] ? "EOF reached" : "Data still available";
fclose($socket);

This reads until end-of-file and verifies the eof flag in the status.
The eof flag indicates when no more data is available from the socket.

## Complete Socket Monitoring

This shows a comprehensive socket monitoring example with all status flags.

complete_monitoring.php
  

&lt;?php

declare(strict_types=1);

function monitorSocket($host, $port) {
    $socket = fsockopen($host, $port);
    if (!$socket) return false;
    
    $status = socket_get_status($socket);
    
    echo "Socket status:\n";
    echo "Timed out: " . ($status['timed_out'] ? 'Yes' : 'No') . "\n";
    echo "Blocked: " . ($status['blocked'] ? 'Yes' : 'No') . "\n";
    echo "EOF: " . ($status['eof'] ? 'Yes' : 'No') . "\n";
    echo "Unread bytes: " . $status['unread_bytes'] . "\n";
    
    fclose($socket);
    return true;
}

monitorSocket("www.example.com", 80);

This function provides complete socket status monitoring in one call.
It displays all important socket parameters for debugging and analysis.

## Best Practices

- **Error Handling:** Always check if socket operations succeed

- **Resource Management:** Close sockets when done

- **Timeout Configuration:** Set appropriate timeouts

- **Status Monitoring:** Check status regularly

## Source

[PHP stream_get_meta_data Documentation](https://www.php.net/manual/en/function.stream-get-meta-data.php)

This tutorial covered the PHP socket_get_status function with
practical examples for socket monitoring in network programming.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Network Functions](/php/#php-network).