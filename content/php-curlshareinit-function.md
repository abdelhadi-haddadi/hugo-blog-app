+++
title = "PHP curl_share_init Function"
date = 2025-08-29T20:05:34.727+01:00
draft = false
description = "PHP curl_share_init function tutorial shows how to create shared cURL handles in PHP. Learn curl_share_init with practical examples."
image = ""
imageBig = ""
categories = ["php-curl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP curl_share_init Function

last modified April 11, 2025

The PHP curl_share_init function creates a shared cURL handle. It
allows multiple cURL handles to share data like cookies and DNS cache. This can
improve performance when making multiple requests to the same server.

## Basic Definition

The curl_share_init function initializes a shared cURL handle. It
returns a resource that can be used with curl_share_setopt. Shared
handles help reduce overhead when making similar requests.

Syntax: curl_share_init(): CurlShareHandle|false. The function
returns a share handle or FALSE on failure. Always clean up with
curl_share_close() when done.

## Basic Shared Handle Example

This example demonstrates creating a basic shared handle for two cURL requests.

basic_share.php
  

&lt;?php

declare(strict_types=1);

$sh = curl_share_init();
curl_share_setopt($sh, CURLSHOPT_SHARE, CURL_LOCK_DATA_COOKIE);

$ch1 = curl_init("https://example.com/api1");
curl_setopt($ch1, CURLOPT_SHARE, $sh);
curl_setopt($ch1, CURLOPT_RETURNTRANSFER, true);

$ch2 = curl_init("https://example.com/api2");
curl_setopt($ch2, CURLOPT_SHARE, $sh);
curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);

$result1 = curl_exec($ch1);
$result2 = curl_exec($ch2);

curl_close($ch1);
curl_close($ch2);
curl_share_close($sh);

We create a shared handle and configure it to share cookies. Both cURL handles
use the same share handle. This allows them to share cookie data between
requests. Always close all handles when finished.

## Sharing DNS Cache

This example shows how to share DNS cache between multiple cURL handles.

dns_cache.php
  

&lt;?php

declare(strict_types=1);

$sh = curl_share_init();
curl_share_setopt($sh, CURLSHOPT_SHARE, CURL_LOCK_DATA_DNS);

$ch1 = curl_init("https://api.example.com/users");
curl_setopt($ch1, CURLOPT_SHARE, $sh);
curl_setopt($ch1, CURLOPT_RETURNTRANSFER, true);

$ch2 = curl_init("https://api.example.com/posts");
curl_setopt($ch2, CURLOPT_SHARE, $sh);
curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);

$response1 = curl_exec($ch1);
$response2 = curl_exec($ch2);

curl_close($ch1);
curl_close($ch2);
curl_share_close($sh);

We configure the shared handle to share DNS cache. Both requests to the same
domain will benefit from cached DNS lookups. This reduces latency for
subsequent requests to the same server.

## Sharing SSL Session Data

This example demonstrates sharing SSL session data between requests.

ssl_session.php
  

&lt;?php

declare(strict_types=1);

$sh = curl_share_init();
curl_share_setopt($sh, CURLSHOPT_SHARE, CURL_LOCK_DATA_SSL_SESSION);

$ch1 = curl_init("https://secure.example.com/login");
curl_setopt($ch1, CURLOPT_SHARE, $sh);
curl_setopt($ch1, CURLOPT_RETURNTRANSFER, true);

$ch2 = curl_init("https://secure.example.com/profile");
curl_setopt($ch2, CURLOPT_SHARE, $sh);
curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);

$login = curl_exec($ch1);
$profile = curl_exec($ch2);

curl_close($ch1);
curl_close($ch2);
curl_share_close($sh);

We share SSL session data between requests to the same secure domain. This
avoids redundant SSL handshakes for subsequent requests. It's particularly
useful for APIs requiring multiple authenticated requests.

## Sharing Multiple Data Types

This example shows how to share multiple types of data between handles.

multiple_share.php
  

&lt;?php

declare(strict_types=1);

$sh = curl_share_init();
curl_share_setopt($sh, CURLSHOPT_SHARE, CURL_LOCK_DATA_COOKIE | CURL_LOCK_DATA_DNS | CURL_LOCK_DATA_SSL_SESSION);

$ch1 = curl_init("https://api.example.com/auth");
curl_setopt($ch1, CURLOPT_SHARE, $sh);
curl_setopt($ch1, CURLOPT_RETURNTRANSFER, true);

$ch2 = curl_init("https://api.example.com/data");
curl_setopt($ch2, CURLOPT_SHARE, $sh);
curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);

$auth = curl_exec($ch1);
$data = curl_exec($ch2);

curl_close($ch1);
curl_close($ch2);
curl_share_close($sh);

We share cookies, DNS cache, and SSL session data between requests. The bitwise
OR operator combines multiple sharing options. This provides maximum
performance benefits for related requests.

## Error Handling with Shared Handles

This example demonstrates proper error handling when using shared handles.

error_handling.php
  

&lt;?php

declare(strict_types=1);

$sh = curl_share_init();

if ($sh === false) {
    die("Failed to initialize shared handle");
}

if (!curl_share_setopt($sh, CURLSHOPT_SHARE, CURL_LOCK_DATA_COOKIE)) {
    die("Failed to set share option");
}

$ch1 = curl_init("https://api.example.com/endpoint1");
if ($ch1 === false) {
    die("Failed to initialize cURL handle 1");
}

curl_setopt($ch1, CURLOPT_SHARE, $sh);
curl_setopt($ch1, CURLOPT_RETURNTRANSFER, true);

$result = curl_exec($ch1);

if ($result === false) {
    echo "cURL Error: " . curl_error($ch1);
} else {
    echo $result;
}

curl_close($ch1);
curl_share_close($sh);

We implement comprehensive error checking for shared handle creation and
configuration. Each step is verified before proceeding. This ensures robust
error handling in production environments.

## Best Practices

- **Cleanup:** Always close shared handles with curl_share_close.

- **Error Handling:** Check return values of all cURL functions.

- **Sharing Scope:** Only share between related requests.

- **Thread Safety:** Shared handles are not thread-safe.

- **Performance:** Measure benefits before complex sharing.

## Source

[PHP curl_share_init Documentation](https://www.php.net/manual/en/function.curl-share-init.php)

This tutorial covered the PHP curl_share_init function with
practical examples showing its usage for optimizing multiple cURL requests.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP cURL tutorials](/php/#php-curl).