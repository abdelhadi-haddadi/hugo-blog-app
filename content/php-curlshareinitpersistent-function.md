+++
title = "PHP curl_share_init_persistent Function"
date = 2025-08-29T20:05:35.826+01:00
draft = false
description = "PHP curl_share_init_persistent function tutorial shows how to create persistent shared cURL handles in PHP. Learn with practical examples."
image = ""
imageBig = ""
categories = ["php-curl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP curl_share_init_persistent Function

last modified April 11, 2025

The PHP curl_share_init_persistent function creates a persistent
shared cURL handle. It allows multiple cURL handles to share data like cookies
and DNS cache between requests. This improves performance for repeated requests.

## Basic Definition

The curl_share_init_persistent function initializes a persistent
shared cURL handle. It returns a cURL share handle resource on success.

Syntax: curl_share_init_persistent(string $name): CurlShareHandle.
The $name parameter identifies the persistent handle. The same name can be used
to retrieve the handle later.

## Basic Shared Handle Example

This example demonstrates creating and using a basic shared cURL handle.

basic_shared.php
  

&lt;?php

declare(strict_types=1);

// Create or retrieve persistent shared handle
$sh = curl_share_init_persistent('my_shared_handle');

// Configure what to share
curl_share_setopt($sh, CURLSHOPT_SHARE, CURL_LOCK_DATA_COOKIE);
curl_share_setopt($sh, CURLSHOPT_SHARE, CURL_LOCK_DATA_DNS);

// Create regular cURL handles
$ch1 = curl_init('https://example.com/api1');
$ch2 = curl_init('https://example.com/api2');

// Attach shared handle
curl_setopt($ch1, CURLOPT_SHARE, $sh);
curl_setopt($ch2, CURLOPT_SHARE, $sh);

// Execute requests
$result1 = curl_exec($ch1);
$result2 = curl_exec($ch2);

// Cleanup
curl_close($ch1);
curl_close($ch2);

This code creates a persistent shared handle named 'my_shared_handle'. It shares
cookies and DNS cache between two cURL requests. The shared handle remains
available for future requests.

## Sharing SSL Session Data

This example shows how to share SSL session data between requests.

ssl_shared.php
  

&lt;?php

declare(strict_types=1);

$sh = curl_share_init_persistent('ssl_shared');

// Share SSL session data to reuse SSL handshake
curl_share_setopt($sh, CURLSHOPT_SHARE, CURL_LOCK_DATA_SSL_SESSION);

$ch1 = curl_init('https://secure.example.com/login');
curl_setopt($ch1, CURLOPT_SHARE, $sh);
curl_setopt($ch1, CURLOPT_RETURNTRANSFER, true);

$ch2 = curl_init('https://secure.example.com/profile');
curl_setopt($ch2, CURLOPT_SHARE, $sh);
curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);

// Execute requests - SSL session will be reused
$login = curl_exec($ch1);
$profile = curl_exec($ch2);

curl_close($ch1);
curl_close($ch2);

We share SSL session data to avoid repeating SSL handshakes. This significantly
improves performance for HTTPS requests to the same server. The shared handle
stores the SSL session information.

## Persistent Handle Across Requests

This example demonstrates using the same persistent handle across multiple HTTP
requests.

persistent_across_requests.php
  

&lt;?php

declare(strict_types=1);

// First request
function firstRequest() {
    $sh = curl_share_init_persistent('cross_request_handle');
    curl_share_setopt($sh, CURLSHOPT_SHARE, CURL_LOCK_DATA_COOKIE);
    
    $ch = curl_init('https://example.com/set-cookie');
    curl_setopt($ch, CURLOPT_SHARE, $sh);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    
    $response = curl_exec($ch);
    curl_close($ch);
    
    return $response;
}

// Second request
function secondRequest() {
    // Retrieve same shared handle
    $sh = curl_share_init_persistent('cross_request_handle');
    
    $ch = curl_init('https://example.com/use-cookie');
    curl_setopt($ch, CURLOPT_SHARE, $sh);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    
    $response = curl_exec($ch);
    curl_close($ch);
    
    return $response;
}

// Execute requests
$first = firstRequest();
$second = secondRequest();

The same persistent shared handle is used across two separate HTTP requests.
Cookies set in the first request are available in the second request. The handle
is identified by the name 'cross_request_handle'.

## Multi-threaded Shared Handling

This example shows thread-safe usage of persistent shared handles.

threaded_shared.php
  

&lt;?php

declare(strict_types=1);

// Worker function for threads
function fetchUrl($url) {
    $sh = curl_share_init_persistent('threaded_shared');
    curl_share_setopt($sh, CURLSHOPT_SHARE, CURL_LOCK_DATA_DNS);
    
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_SHARE, $sh);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    
    $result = curl_exec($ch);
    curl_close($ch);
    
    return $result;
}

// Create multiple threads
$threads = [];
$urls = [
    'https://example.com/page1',
    'https://example.com/page2',
    'https://example.com/page3'
];

foreach ($urls as $url) {
    $thread = new Thread('fetchUrl', $url);
    $threads[] = $thread;
    $thread-&gt;start();
}

// Wait for threads to complete
foreach ($threads as $thread) {
    $thread-&gt;join();
}

Multiple threads use the same persistent shared handle safely. DNS cache is
shared between all threads, reducing DNS lookups. The handle is thread-safe
when properly configured.

## Advanced Shared Options

This example demonstrates advanced configuration options for shared handles.

advanced_shared.php
  

&lt;?php

declare(strict_types=1);

$sh = curl_share_init_persistent('advanced_handle');

// Share multiple data types
curl_share_setopt($sh, CURLSHOPT_SHARE, CURL_LOCK_DATA_COOKIE);
curl_share_setopt($sh, CURLSHOPT_SHARE, CURL_LOCK_DATA_DNS);
curl_share_setopt($sh, CURLSHOPT_SHARE, CURL_LOCK_DATA_SSL_SESSION);

// Set user-defined data
curl_share_setopt($sh, CURLSHOPT_USERDATA, ['app' =&gt;  'MyCrawler']);

// Cleanup function when handle is closed
curl_share_setopt($sh, CURLSHOPT_UNSHARE, function($handle) {
    echo "Cleaning up shared handle\n";
});

$ch1 = curl_init('https://api.example.com/v1');
curl_setopt($ch1, CURLOPT_SHARE, $sh);
curl_setopt($ch1, CURLOPT_RETURNTRANSFER, true);

$ch2 = curl_init('https://api.example.com/v2');
curl_setopt($ch2, CURLOPT_SHARE, $sh);
curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);

$results = [
    curl_exec($ch1),
    curl_exec($ch2)
];

curl_close($ch1);
curl_close($ch2);

This example configures multiple shared data types and adds advanced options.
We set user data and a cleanup callback. The shared handle efficiently manages
resources between two API requests.

## Best Practices

- **Naming:** Use descriptive names for persistent handles.

- **Cleanup:** Explicitly close handles when no longer needed.

- **Thread Safety:** Configure sharing options carefully in threads.

- **Resource Limits:** Monitor memory usage with many handles.

- **Error Handling:** Check for handle creation failures.

## Source

[PHP curl_share_init_persistent Documentation](https://www.php.net/manual/en/function.curl-share-init-persistent.php)

This tutorial covered the PHP curl_share_init_persistent function
with practical examples showing its usage for efficient HTTP requests.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP cURL tutorials](/php/#php-curl).