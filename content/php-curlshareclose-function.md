+++
title = "PHP curl_share_close Function"
date = 2025-08-29T20:05:34.736+01:00
draft = false
description = "PHP curl_share_close function tutorial shows how to close cURL shared handles in PHP. Learn curl_share_close with practical examples."
image = ""
imageBig = ""
categories = ["php-curl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP curl_share_close Function

last modified April 11, 2025

The PHP curl_share_close function closes a cURL share handle. It's
used to clean up shared resources between multiple cURL handles. This function
frees all memory associated with the share handle.

## Basic Definition

The curl_share_close function closes a cURL share handle created
with curl_share_init(). It takes the share handle as its only
parameter and returns nothing.

Syntax: curl_share_close(CurlShareHandle $share_handle): void. After
calling this function, the share handle cannot be used anymore. Always close
share handles when done to free resources.

## Basic Shared Handle Usage

This example demonstrates creating and closing a basic cURL share handle.

basic_share_close.php
  

&lt;?php

declare(strict_types=1);

$sh = curl_share_init();

// Configure shared options
curl_share_setopt($sh, CURLSHOPT_SHARE, CURL_LOCK_DATA_COOKIE);

// Use the share handle with multiple cURL handles...

curl_share_close($sh);

This code creates a share handle, sets it to share cookies between handles,
and then closes it. The share handle would typically be used with multiple
cURL handles before closing.

## Sharing Cookies Between Handles

This example shows how to share cookies between multiple cURL handles.

cookie_sharing.php
  

&lt;?php

declare(strict_types=1);

$sh = curl_share_init();
curl_share_setopt($sh, CURLSHOPT_SHARE, CURL_LOCK_DATA_COOKIE);

$ch1 = curl_init();
curl_setopt($ch1, CURLOPT_URL, "https://example.com/login");
curl_setopt($ch1, CURLOPT_SHARE, $sh);

$ch2 = curl_init();
curl_setopt($ch2, CURLOPT_URL, "https://example.com/profile");
curl_setopt($ch2, CURLOPT_SHARE, $sh);

// Execute requests...

curl_close($ch1);
curl_close($ch2);
curl_share_close($sh);

We create a share handle to share cookies between two cURL handles. This allows
the second request to maintain the session from the first. All handles and the
share handle are properly closed.

## Sharing DNS Cache

This example demonstrates sharing DNS cache between multiple requests.

dns_sharing.php
  

&lt;?php

declare(strict_types=1);

$sh = curl_share_init();
curl_share_setopt($sh, CURLSHOPT_SHARE, CURL_LOCK_DATA_DNS);

$ch1 = curl_init();
curl_setopt($ch1, CURLOPT_URL, "https://api.example.com/v1/users");
curl_setopt($ch1, CURLOPT_SHARE, $sh);

$ch2 = curl_init();
curl_setopt($ch2, CURLOPT_URL, "https://api.example.com/v1/posts");
curl_setopt($ch2, CURLOPT_SHARE, $sh);

// Execute requests...

curl_close($ch1);
curl_close($ch2);
curl_share_close($sh);

The share handle is configured to share DNS cache between requests. This can
improve performance when making multiple requests to the same domain. All
resources are properly cleaned up.

## Sharing Multiple Data Types

This example shows how to share multiple data types between handles.

multi_share.php
  

&lt;?php

declare(strict_types=1);

$sh = curl_share_init();
curl_share_setopt($sh, CURLSHOPT_SHARE, CURL_LOCK_DATA_COOKIE | CURL_LOCK_DATA_DNS | CURL_LOCK_DATA_SSL_SESSION);

$ch1 = curl_init();
curl_setopt($ch1, CURLOPT_URL, "https://secure.example.com");
curl_setopt($ch1, CURLOPT_SHARE, $sh);

$ch2 = curl_init();
curl_setopt($ch2, CURLOPT_URL, "https://secure.example.com/profile");
curl_setopt($ch2, CURLOPT_SHARE, $sh);

// Execute requests...

curl_close($ch1);
curl_close($ch2);
curl_share_close($sh);

We share cookies, DNS cache, and SSL sessions between handles. This is useful
for maintaining sessions and improving performance. The bitwise OR operator
combines multiple sharing options.

## Error Handling with Shared Handles

This example demonstrates proper error handling with shared handles.

error_handling.php
  

&lt;?php

declare(strict_types=1);

$sh = curl_share_init();

if ($sh === false) {
    die("Failed to initialize share handle");
}

if (!curl_share_setopt($sh, CURLSHOPT_SHARE, CURL_LOCK_DATA_COOKIE)) {
    curl_share_close($sh);
    die("Failed to set share option");
}

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://example.com");
curl_setopt($ch, CURLOPT_SHARE, $sh);

// Execute request...

if (curl_errno($ch)) {
    echo "cURL error: " . curl_error($ch);
}

curl_close($ch);
curl_share_close($sh);

We check for errors when creating and configuring the share handle. If any
operation fails, we clean up resources before exiting. This prevents resource
leaks in case of errors.

## Best Practices

- **Cleanup:** Always close share handles when done.

- **Error Handling:** Check for errors when creating handles.

- **Sharing Scope:** Only share what's needed for performance.

- **Thread Safety:** Share handles are not thread-safe.

- **Lifetime:** Keep share handle alive while in use.

## Source

[PHP curl_share_close Documentation](https://www.php.net/manual/en/function.curl-share-close.php)

This tutorial covered the PHP curl_share_close function with
practical examples showing its usage for shared cURL resources.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP cURL tutorials](/php/#php-curl).