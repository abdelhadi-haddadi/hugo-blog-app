+++
title = "PHP curl_share_setopt Function"
date = 2025-08-29T20:05:35.814+01:00
draft = false
description = "PHP curl_share_setopt function tutorial shows how to configure shared cURL handles in PHP. Learn curl_share_setopt with practical examples."
image = ""
imageBig = ""
categories = ["php-curl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP curl_share_setopt Function

last modified April 11, 2025

The PHP curl_share_setopt function sets options for a cURL share handle. 
It allows multiple cURL handles to share data like cookies and DNS cache. 
This improves performance when making multiple requests to the same server.

## Basic Definition

The curl_share_setopt function configures a shared cURL handle. 
It takes three parameters: the share handle, the option to set, and the value. 
The function returns TRUE on success or FALSE on failure.

Syntax: curl_share_setopt(CurlShareHandle $share_handle, int $option, mixed $value): bool. 
The share handle must be created with curl_share_init(). 
Always clean up with curl_share_close().

## Sharing DNS Cache

This example demonstrates how to share DNS cache between multiple cURL handles.

share_dns.php
  

&lt;?php

declare(strict_types=1);

$sh = curl_share_init();
curl_share_setopt($sh, CURLSHOPT_SHARE, CURL_LOCK_DATA_DNS);

$ch1 = curl_init("https://example.com/api/v1");
curl_setopt($ch1, CURLOPT_SHARE, $sh);
curl_setopt($ch1, CURLOPT_RETURNTRANSFER, true);

$ch2 = curl_init("https://example.com/api/v2");
curl_setopt($ch2, CURLOPT_SHARE, $sh);
curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);

$mh = curl_multi_init();
curl_multi_add_handle($mh, $ch1);
curl_multi_add_handle($mh, $ch2);

do {
    curl_multi_exec($mh, $running);
} while ($running &gt; 0);

curl_multi_remove_handle($mh, $ch1);
curl_multi_remove_handle($mh, $ch2);
curl_multi_close($mh);
curl_share_close($sh);

We create a share handle and configure it to share DNS cache. Two cURL handles 
are then associated with this share handle. The DNS resolution is performed 
only once and cached for subsequent requests.

## Sharing Cookies

This example shows how to share cookies between multiple cURL sessions.

share_cookies.php
  

&lt;?php

declare(strict_types=1);

$sh = curl_share_init();
curl_share_setopt($sh, CURLSHOPT_SHARE, CURL_LOCK_DATA_COOKIE);

$ch1 = curl_init("https://example.com/login");
curl_setopt($ch1, CURLOPT_SHARE, $sh);
curl_setopt($ch1, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch1, CURLOPT_COOKIEJAR, "/tmp/cookies.txt");

$response = curl_exec($ch1);
curl_close($ch1);

$ch2 = curl_init("https://example.com/profile");
curl_setopt($ch2, CURLOPT_SHARE, $sh);
curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch2, CURLOPT_COOKIEFILE, "/tmp/cookies.txt");

$response = curl_exec($ch2);
curl_close($ch2);

curl_share_close($sh);

We configure the share handle to share cookies. The first request stores 
cookies in a file, and the second request uses those cookies. This maintains 
session state between requests.

## Sharing SSL Session

This example demonstrates sharing SSL session data to improve HTTPS performance.

share_ssl.php
  

&lt;?php

declare(strict_types=1);

$sh = curl_share_init();
curl_share_setopt($sh, CURLSHOPT_SHARE, CURL_LOCK_DATA_SSL_SESSION);

$ch1 = curl_init("https://secure.example.com/api1");
curl_setopt($ch1, CURLOPT_SHARE, $sh);
curl_setopt($ch1, CURLOPT_RETURNTRANSFER, true);

$ch2 = curl_init("https://secure.example.com/api2");
curl_setopt($ch2, CURLOPT_SHARE, $sh);
curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);

$mh = curl_multi_init();
curl_multi_add_handle($mh, $ch1);
curl_multi_add_handle($mh, $ch2);

do {
    curl_multi_exec($mh, $running);
} while ($running &gt; 0);

curl_multi_remove_handle($mh, $ch1);
curl_multi_remove_handle($mh, $ch2);
curl_multi_close($mh);
curl_share_close($sh);

We share SSL session data between two HTTPS requests to the same server. 
This avoids repeating the SSL handshake for subsequent connections. 
It significantly improves performance for multiple HTTPS requests.

## Multiple Shared Resources

This example shows how to share multiple types of data simultaneously.

multiple_share.php
  

&lt;?php

declare(strict_types=1);

$sh = curl_share_init();
curl_share_setopt($sh, CURLSHOPT_SHARE, CURL_LOCK_DATA_DNS | CURL_LOCK_DATA_COOKIE | CURL_LOCK_DATA_SSL_SESSION);

$ch1 = curl_init("https://api.example.com/v1/users");
curl_setopt($ch1, CURLOPT_SHARE, $sh);
curl_setopt($ch1, CURLOPT_RETURNTRANSFER, true);

$ch2 = curl_init("https://api.example.com/v1/products");
curl_setopt($ch2, CURLOPT_SHARE, $sh);
curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);

$mh = curl_multi_init();
curl_multi_add_handle($mh, $ch1);
curl_multi_add_handle($mh, $ch2);

do {
    curl_multi_exec($mh, $running);
} while ($running &gt; 0);

curl_multi_remove_handle($mh, $ch1);
curl_multi_remove_handle($mh, $ch2);
curl_multi_close($mh);
curl_share_close($sh);

We share DNS cache, cookies, and SSL session data between two requests. 
The bitwise OR operator combines multiple sharing options. This provides 
maximum performance benefits for repeated API calls.

## Error Handling

This example demonstrates proper error handling with shared cURL handles.

error_handling.php
  

&lt;?php

declare(strict_types=1);

$sh = curl_share_init();
if ($sh === false) {
    die("Failed to initialize share handle");
}

if (!curl_share_setopt($sh, CURLSHOPT_SHARE, CURL_LOCK_DATA_DNS)) {
    die("Failed to set share option");
}

$ch = curl_init("https://example.com");
if ($ch === false) {
    curl_share_close($sh);
    die("Failed to initialize cURL handle");
}

curl_setopt($ch, CURLOPT_SHARE, $sh);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
if ($response === false) {
    echo "cURL Error: " . curl_error($ch);
} else {
    echo $response;
}

curl_close($ch);
curl_share_close($sh);

We implement comprehensive error checking for all cURL operations. 
Each function call is verified, and resources are properly cleaned up. 
This prevents memory leaks and provides better debugging information.

## Best Practices

- **Resource Management:** Always close share handles after use.

- **Error Checking:** Verify all cURL function return values.

- **Appropriate Sharing:** Only share what's needed for security.

- **Multi-threading:** Share handles are thread-safe in PHP.

- **Performance:** Use sharing for repeated same-server requests.

## Source

[PHP curl_share_setopt Documentation](https://www.php.net/manual/en/function.curl-share-setopt.php)

This tutorial covered the PHP curl_share_setopt function with 
practical examples showing its usage for optimizing multiple cURL requests.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP cURL tutorials](/php/#php-curl).