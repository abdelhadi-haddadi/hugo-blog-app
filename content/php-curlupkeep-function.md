+++
title = "PHP curl_upkeep Function"
date = 2025-08-29T20:05:36.921+01:00
draft = false
description = "PHP curl_upkeep function tutorial shows how to maintain cURL connections in PHP. Learn curl_upkeep with practical examples."
image = ""
imageBig = ""
categories = ["php-curl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP curl_upkeep Function

last modified April 11, 2025

The PHP curl_upkeep function performs connection upkeep checks on
a cURL handle. It helps maintain persistent HTTP/2 connections by checking
their health. This function was introduced in PHP 7.3.0 with cURL 7.62.0.

## Basic Definition

The curl_upkeep function checks the health of an HTTP/2 connection.
It returns TRUE on success or FALSE on failure. The function takes a cURL handle
as its only parameter.

Syntax: curl_upkeep(CurlHandle $handle): bool. The handle must be
an active HTTP/2 connection. This function helps prevent connection timeouts
in long-lived HTTP/2 connections.

## Basic Connection Upkeep

This example demonstrates basic usage of curl_upkeep with an HTTP/2 connection.

basic_upkeep.php
  

&lt;?php

declare(strict_types=1);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://http2.golang.org/");
curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_2_0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

// Initial request
curl_exec($ch);

// Perform connection upkeep
if (curl_upkeep($ch)) {
    echo "Connection is healthy\n";
} else {
    echo "Connection check failed: " . curl_error($ch) . "\n";
}

curl_close($ch);

This code establishes an HTTP/2 connection and performs a health check. The
curl_upkeep call verifies the connection is still alive. Note that
HTTP/2 server support is required for this to work properly.

## Persistent Connection with Upkeep

This example shows how to maintain a persistent connection with periodic upkeep.

persistent_connection.php
  

&lt;?php

declare(strict_types=1);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://http2.golang.org/");
curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_2_0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

// Initial request
$response = curl_exec($ch);
echo "Initial request: " . substr($response, 0, 50) . "...\n";

// Wait 30 seconds
sleep(30);

// Perform upkeep before next request
if (curl_upkeep($ch)) {
    $response = curl_exec($ch);
    echo "Second request: " . substr($response, 0, 50) . "...\n";
} else {
    echo "Connection lost, need to reinitialize\n";
}

curl_close($ch);

We maintain a connection between requests with curl_upkeep. This
is useful for applications making multiple requests to the same server. The
upkeep check helps avoid connection timeouts between requests.

## Connection Upkeep with Error Handling

This example demonstrates proper error handling with curl_upkeep.

error_handling.php
  

&lt;?php

declare(strict_types=1);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://http2.golang.org/");
curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_2_0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

// Initial request
curl_exec($ch);

// Simulate network issue by changing timeout
curl_setopt($ch, CURLOPT_TIMEOUT, 1);

// Perform upkeep with error handling
$upkeepResult = curl_upkeep($ch);

if ($upkeepResult === false) {
    $errno = curl_errno($ch);
    $error = curl_error($ch);
    
    echo "Upkeep failed (errno $errno): $error\n";
    
    // Reinitialize connection if needed
    curl_close($ch);
    $ch = curl_init();
    // ... reinitialize options ...
} else {
    echo "Connection is healthy\n";
}

curl_close($ch);

We demonstrate how to handle potential upkeep failures. The code checks the
return value and examines error details if upkeep fails. This pattern is
important for robust connection management in production applications.

## Upkeep in a Connection Pool

This example shows how to use curl_upkeep with multiple connections.

connection_pool.php
  

&lt;?php

declare(strict_types=1);

// Initialize multiple HTTP/2 connections
$connections = [];
$urls = [
    "https://http2.golang.org/",
    "https://http2.akamai.com/",
    "https://nghttp2.org/"
];

foreach ($urls as $url) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_2_0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_exec($ch); // Establish connection
    $connections[] = $ch;
}

// Periodically check all connections
foreach ($connections as $i =&gt;  $ch) {
    echo "Checking connection $i: ";
    if (curl_upkeep($ch)) {
        echo "OK\n";
    } else {
        echo "FAILED - " . curl_error($ch) . "\n";
        // Mark for reinitialization
        unset($connections[$i]);
        curl_close($ch);
    }
}

// Clean up remaining connections
foreach ($connections as $ch) {
    curl_close($ch);
}

This example maintains multiple HTTP/2 connections and checks their health.
The code demonstrates how to manage a connection pool with periodic upkeep
checks. Failed connections are removed from the pool and closed properly.

## Upkeep with Custom Interval

This example implements a custom upkeep interval based on connection age.

custom_interval.php
  

&lt;?php

declare(strict_types=1);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://http2.golang.org/");
curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_2_0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$lastUsed = time();
$connectionAge = 0;

// Main application loop
for ($i = 0; $i &lt; 5; $i++) {
    // Perform request
    $response = curl_exec($ch);
    echo "Request $i: " . substr($response, 0, 20) . "...\n";
    
    // Update last used time
    $lastUsed = time();
    
    // Wait random time (simulate application work)
    $waitTime = rand(10, 30);
    sleep($waitTime);
    
    // Calculate connection age
    $connectionAge = time() - $lastUsed;
    
    // Perform upkeep if connection is idle
    if ($connectionAge &gt; 15) {
        echo "Performing upkeep (idle for $connectionAge seconds)\n";
        if (!curl_upkeep($ch)) {
            echo "Upkeep failed, reinitializing connection\n";
            curl_close($ch);
            $ch = curl_init();
            // Reinitialize options...
            $lastUsed = time();
        }
    }
}

curl_close($ch);

This code implements a custom upkeep strategy based on connection idle time.
Upkeep is only performed when the connection has been idle for more than 15
seconds. This approach optimizes performance by minimizing unnecessary upkeep
checks.

## Best Practices

- **HTTP/2 Only:** curl_upkeep only works with HTTP/2 connections.

- **Error Handling:** Always check the return value of curl_upkeep.

- **Timing:** Perform upkeep during idle periods, not during requests.

- **Reinitialization:** Be prepared to recreate failed connections.

- **Testing:** Verify server support for HTTP/2 and connection upkeep.

## Source

[PHP curl_upkeep Documentation](https://www.php.net/manual/en/function.curl-upkeep.php)

This tutorial covered the PHP curl_upkeep function with practical
examples showing its usage for maintaining HTTP/2 connections. Proper connection
management can significantly improve performance for HTTP/2 applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP cURL tutorials](/php/#php-curl).