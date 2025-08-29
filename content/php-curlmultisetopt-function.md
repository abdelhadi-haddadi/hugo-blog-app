+++
title = "PHP curl_multi_setopt Function"
date = 2025-08-29T20:05:32.459+01:00
draft = false
description = "PHP curl_multi_setopt function tutorial shows how to set options for multiple cURL handles in PHP. Learn curl_multi_setopt with practical examples."
image = ""
imageBig = ""
categories = ["php-curl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP curl_multi_setopt Function

last modified April 11, 2025

The PHP curl_multi_setopt function sets options for a cURL multi handle. 
It's used to configure behavior for multiple simultaneous cURL transfers. 
This function works with curl_multi_init() created handles.

## Basic Definition

The curl_multi_setopt function sets an option on the given cURL multi handle. 
It returns TRUE on success or FALSE on failure. The function takes three parameters.

Syntax: curl_multi_setopt(CurlMultiHandle $multi_handle, int $option, mixed $value): bool. 
The multi handle must be created with curl_multi_init(). 
Options affect how the multi handle processes multiple transfers.

## Setting Pipeline Option

This example demonstrates how to enable HTTP pipelining for multiple requests.

pipeline_option.php
  

&lt;?php

declare(strict_types=1);

$mh = curl_multi_init();

// Enable HTTP pipelining
curl_multi_setopt($mh, CURLMOPT_PIPELINING, CURLPIPE_HTTP1 | CURLPIPE_MULTIPLEX);

$ch1 = curl_init("https://example.com/api1");
$ch2 = curl_init("https://example.com/api2");

curl_setopt($ch1, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);

curl_multi_add_handle($mh, $ch1);
curl_multi_add_handle($mh, $ch2);

// Execute the multi handle
$running = null;
do {
    curl_multi_exec($mh, $running);
} while ($running &gt; 0);

// Get responses
$response1 = curl_multi_getcontent($ch1);
$response2 = curl_multi_getcontent($ch2);

// Clean up
curl_multi_remove_handle($mh, $ch1);
curl_multi_remove_handle($mh, $ch2);
curl_multi_close($mh);

This code enables HTTP pipelining for multiple requests. CURLMOPT_PIPELINING 
allows requests to be sent over the same connection. This can improve 
performance when making multiple requests to the same server.

## Setting Max Host Connections

This example shows how to limit connections to a single host.

max_host_connections.php
  

&lt;?php

declare(strict_types=1);

$mh = curl_multi_init();

// Limit to 2 connections per host
curl_multi_setopt($mh, CURLMOPT_MAX_HOST_CONNECTIONS, 2);

$handles = [];
$urls = [
    "https://api.example.com/users/1",
    "https://api.example.com/users/2",
    "https://api.example.com/users/3",
    "https://api.example.com/users/4"
];

foreach ($urls as $url) {
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_multi_add_handle($mh, $ch);
    $handles[] = $ch;
}

// Execute the multi handle
$running = null;
do {
    curl_multi_exec($mh, $running);
    curl_multi_select($mh);
} while ($running &gt; 0);

// Process responses
foreach ($handles as $ch) {
    echo curl_multi_getcontent($ch) . "\n";
    curl_multi_remove_handle($mh, $ch);
    curl_close($ch);
}

curl_multi_close($mh);

We limit connections to the same host to 2 with CURLMOPT_MAX_HOST_CONNECTIONS. 
This prevents overwhelming a server with too many simultaneous connections. 
The multi handle will queue requests when the limit is reached.

## Setting Max Total Connections

This example demonstrates limiting the total number of simultaneous connections.

max_total_connections.php
  

&lt;?php

declare(strict_types=1);

$mh = curl_multi_init();

// Limit to 3 total connections
curl_multi_setopt($mh, CURLMOPT_MAXCONNECTS, 3);

$handles = [];
$urls = [
    "https://api1.example.com",
    "https://api2.example.com",
    "https://api3.example.com",
    "https://api4.example.com",
    "https://api5.example.com"
];

foreach ($urls as $url) {
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_multi_add_handle($mh, $ch);
    $handles[] = $ch;
}

// Execute the multi handle
$running = null;
do {
    curl_multi_exec($mh, $running);
    curl_multi_select($mh);
} while ($running &gt; 0);

// Process responses
foreach ($handles as $ch) {
    echo curl_multi_getcontent($ch) . "\n";
    curl_multi_remove_handle($mh, $ch);
    curl_close($ch);
}

curl_multi_close($mh);

CURLMOPT_MAXCONNECTS limits all simultaneous connections to 3. This is useful 
when making requests to multiple different hosts. The multi handle will queue 
requests when the global connection limit is reached.

## Setting Socket Callback

This example shows how to use a socket callback for monitoring.

socket_callback.php
  

&lt;?php

declare(strict_types=1);

function socket_callback($mh, $timeout_ms) {
    // Custom logic to handle socket activity
    echo "Socket callback called with timeout: $timeout_ms ms\n";
    return 0;
}

$mh = curl_multi_init();

// Set socket callback function
curl_multi_setopt($mh, CURLMOPT_SOCKETFUNCTION, 'socket_callback');

$ch1 = curl_init("https://example.com/api1");
$ch2 = curl_init("https://example.com/api2");

curl_setopt($ch1, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);

curl_multi_add_handle($mh, $ch1);
curl_multi_add_handle($mh, $ch2);

// Execute the multi handle
$running = null;
do {
    curl_multi_exec($mh, $running);
} while ($running &gt; 0);

// Get responses
$response1 = curl_multi_getcontent($ch1);
$response2 = curl_multi_getcontent($ch2);

// Clean up
curl_multi_remove_handle($mh, $ch1);
curl_multi_remove_handle($mh, $ch2);
curl_multi_close($mh);

CURLMOPT_SOCKETFUNCTION sets a callback for socket activity monitoring. 
The callback receives the multi handle and timeout value. This allows custom 
logic to be executed when sockets are ready for reading/writing.

## Setting Timer Callback

This example demonstrates using a timer callback for timeout control.

timer_callback.php
  

&lt;?php

declare(strict_types=1);

function timer_callback($mh, $timeout_ms) {
    // Custom timeout handling logic
    echo "Timer callback called with timeout: $timeout_ms ms\n";
    return 0;
}

$mh = curl_multi_init();

// Set timer callback function
curl_multi_setopt($mh, CURLMOPT_TIMERFUNCTION, 'timer_callback');

$ch1 = curl_init("https://example.com/api1");
$ch2 = curl_init("https://example.com/api2");

curl_setopt($ch1, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);

curl_multi_add_handle($mh, $ch1);
curl_multi_add_handle($mh, $ch2);

// Execute the multi handle
$running = null;
do {
    curl_multi_exec($mh, $running);
} while ($running &gt; 0);

// Get responses
$response1 = curl_multi_getcontent($ch1);
$response2 = curl_multi_getcontent($ch2);

// Clean up
curl_multi_remove_handle($mh, $ch1);
curl_multi_remove_handle($mh, $ch2);
curl_multi_close($mh);

CURLMOPT_TIMERFUNCTION sets a callback for timeout control. The callback 
receives the multi handle and timeout value in milliseconds. This allows 
custom timeout handling logic to be implemented.

## Best Practices

- **Connection Limits:** Use CURLMOPT_MAX_HOST_CONNECTIONS to be polite to servers.

- **Performance:** Enable pipelining when making multiple requests to the same host.

- **Resource Management:** Always clean up handles with curl_multi_remove_handle.

- **Error Handling:** Check return values of curl_multi_setopt calls.

- **Monitoring:** Use callbacks for advanced control over transfers.

## Source

[PHP curl_multi_setopt Documentation](https://www.php.net/manual/en/function.curl-multi-setopt.php)

This tutorial covered the PHP curl_multi_setopt function with practical
examples showing its usage for configuring multiple cURL transfers.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP cURL tutorials](/php/#php-curl).