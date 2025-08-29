+++
title = "PHP socket_set_blocking Function"
date = 2025-08-29T20:06:21.646+01:00
draft = false
description = "PHP socket_set_blocking function tutorial shows how to control socket blocking behavior in PHP. Learn socket_set_blocking with practical examples for network programming."
image = ""
imageBig = ""
categories = ["php-network"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP socket_set_blocking Function

last modified April 4, 2025

The PHP socket_set_blocking function controls the blocking mode
of a socket. It determines whether socket operations will wait for completion.

## Basic Definition

socket_set_blocking sets a socket to blocking or non-blocking mode.
In blocking mode, operations wait until they can complete.

Syntax: socket_set_blocking(Socket $socket, bool $enable): bool.
Returns true on success, false on failure. Affects all subsequent operations.

## Basic Blocking Socket Example

This example demonstrates creating a blocking socket for a simple TCP client.

blocking_socket.php
  

&lt;?php

declare(strict_types=1);

$socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
if ($socket === false) {
    die("Socket creation failed");
}

// Set socket to blocking mode
socket_set_blocking($socket, true);

$connected = socket_connect($socket, 'example.com', 80);
if ($connected === false) {
    die("Connection failed");
}

echo "Connected in blocking mode\n";
socket_close($socket);

This creates a TCP socket in blocking mode. The connect operation will wait
until it succeeds or fails. Blocking mode is simpler for basic operations.

## Non-blocking Socket Example

This shows how to create a non-blocking socket for asynchronous operations.

non_blocking_socket.php
  

&lt;?php

declare(strict_types=1);

$socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
if ($socket === false) {
    die("Socket creation failed");
}

// Set socket to non-blocking mode
socket_set_blocking($socket, false);

$connected = socket_connect($socket, 'example.com', 80);
if ($connected === false) {
    $error = socket_last_error($socket);
    if ($error !== SOCKET_EINPROGRESS) {
        die("Connection failed");
    }
    echo "Connection in progress\n";
}

socket_close($socket);

Non-blocking mode returns immediately. The code must handle EINPROGRESS
errors. This allows for asynchronous network programming.

## Switching Between Modes

This example demonstrates dynamically switching between blocking modes.

mode_switching.php
  

&lt;?php

declare(strict_types=1);

$socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
socket_connect($socket, 'example.com', 80);

// Start in blocking mode for initial data
socket_set_blocking($socket, true);
$data = socket_read($socket, 1024);

// Switch to non-blocking for subsequent reads
socket_set_blocking($socket, false);

while (true) {
    $more = socket_read($socket, 1024);
    if ($more === false) break;
    $data .= $more;
}

echo "Received data: " . strlen($data) . " bytes\n";
socket_close($socket);

This starts in blocking mode for initial data, then switches to non-blocking.
The approach combines both modes for flexible network communication.

## Timeout Handling with Blocking Sockets

This example shows how to implement timeouts with blocking sockets.

timeout_handling.php
  

&lt;?php

declare(strict_types=1);

$socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
socket_set_blocking($socket, true);

// Set timeout options
socket_set_option($socket, SOL_SOCKET, SO_RCVTIMEO, [
    "sec" =&gt; 5,
    "usec" =&gt; 0
]);

$connected = socket_connect($socket, 'example.com', 80);
if ($connected === false) {
    die("Connection failed");
}

$data = socket_read($socket, 1024);
if ($data === false) {
    die("Read timed out after 5 seconds");
}

echo "Received data: $data\n";
socket_close($socket);

Even in blocking mode, timeouts can be set using socket options.
This prevents indefinite waits while maintaining blocking simplicity.

## Non-blocking Socket Server

This example creates a simple non-blocking socket server.

non_blocking_server.php
  

&lt;?php

declare(strict_types=1);

$server = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
socket_bind($server, '0.0.0.0', 8080);
socket_listen($server);

// Set server socket to non-blocking
socket_set_blocking($server, false);

echo "Server running on port 8080 (non-blocking)\n";

while (true) {
    $client = socket_accept($server);
    if ($client === false) {
        usleep(100000); // Sleep to prevent CPU overload
        continue;
    }
    
    $data = "HTTP/1.1 200 OK\r\nContent-Length: 13\r\n\r\nHello, World!";
    socket_write($client, $data);
    socket_close($client);
}

The non-blocking server checks for connections without waiting.
It sleeps briefly when no connections are available to reduce CPU usage.

## Best Practices

- **Error Handling:** Always check socket operation return values

- **Resource Management:** Close sockets properly when done

- **Performance:** Use non-blocking for high-concurrency servers

- **Simplicity:** Prefer blocking mode for simple clients

- **Timeouts:** Set appropriate timeouts for blocking operations

## Source

[PHP socket_set_blocking Documentation](https://www.php.net/manual/en/function.socket-set-blocking.php)

This tutorial covered the PHP socket_set_blocking function with
practical examples for different network programming scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Network Functions](/php/#php-network).