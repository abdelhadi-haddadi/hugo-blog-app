+++
title = "PHP curl_share_errno Function"
date = 2025-08-29T20:05:34.731+01:00
draft = false
description = "PHP curl_share_errno function tutorial shows how to get error numbers from shared cURL handles. Learn curl_share_errno with practical examples."
image = ""
imageBig = ""
categories = ["php-curl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP curl_share_errno Function

last modified April 11, 2025

The PHP curl_share_errno function returns the last error number for
a shared cURL handle. It's used with cURL share handles to identify errors in
shared resource operations. This helps in debugging multi-handle scenarios.

## Basic Definition

The curl_share_errno function returns an integer representing the
last error number for a shared cURL handle. It takes a cURL share handle as its
only parameter and returns 0 if no error occurred.

Syntax: curl_share_errno(CurlShareHandle $share_handle): int. The
share handle must be created with curl_share_init(). This function
is useful for error checking in multi-handle cURL operations.

## Basic Shared Handle Error Check

This example demonstrates checking for errors in a basic shared cURL handle.

basic_error_check.php
  

&lt;?php

declare(strict_types=1);

$sh = curl_share_init();

// Attempt to set an invalid option
$result = curl_share_setopt($sh, 9999, CURLSHOPT_SHARE);

$errno = curl_share_errno($sh);

if ($errno !== 0) {
    echo "Shared cURL error: " . $errno . "\n";
    echo "Error message: " . curl_share_strerror($errno) . "\n";
} else {
    echo "No errors in shared handle\n";
}

curl_share_close($sh);

This code creates a shared handle and attempts to set an invalid option. We then
use curl_share_errno to check for errors. The error number and
message are displayed if an error occurred. Always close shared handles.

## Sharing Cookies Between Handles

This example shows error checking when sharing cookies between cURL handles.

cookie_sharing.php
  

&lt;?php

declare(strict_types=1);

$sh = curl_share_init();
$ch1 = curl_init();
$ch2 = curl_init();

// Share cookies between handles
$result = curl_share_setopt($sh, CURLSHOPT_SHARE, CURL_LOCK_DATA_COOKIE);

$errno = curl_share_errno($sh);
if ($errno !== 0) {
    die("Failed to share cookies: " . curl_share_strerror($errno));
}

curl_setopt($ch1, CURLOPT_SHARE, $sh);
curl_setopt($ch2, CURLOPT_SHARE, $sh);

// Perform requests...

curl_share_close($sh);
curl_close($ch1);
curl_close($ch2);

We create a shared handle to share cookies between two cURL handles. After
setting the share option, we check for errors using curl_share_errno.
This ensures the sharing was configured correctly before using the handles.

## Sharing DNS Cache

This example demonstrates error handling when sharing DNS cache between handles.

dns_sharing.php
  

&lt;?php

declare(strict_types=1);

$sh = curl_share_init();

// Share DNS cache
if (!curl_share_setopt($sh, CURLSHOPT_SHARE, CURL_LOCK_DATA_DNS)) {
    $errno = curl_share_errno($sh);
    die("DNS sharing failed: " . curl_share_strerror($errno));
}

$ch = curl_init();
curl_setopt($ch, CURLOPT_SHARE, $sh);
curl_setopt($ch, CURLOPT_URL, "https://example.com");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);

if ($response === false) {
    echo "Request failed: " . curl_error($ch);
}

curl_close($ch);
curl_share_close($sh);

This code shares DNS cache between handles to improve performance. We check the
share operation success and use curl_share_errno if it fails. The
shared handle is then used with a regular cURL handle for a request.

## Multi-threaded Sharing

This example shows error checking in a multi-threaded sharing scenario.

threaded_sharing.php
  

&lt;?php

declare(strict_types=1);

$sh = curl_share_init();

// Share both cookies and DNS cache
$options = [
    CURLSHOPT_SHARE =&gt; CURL_LOCK_DATA_COOKIE | CURL_LOCK_DATA_DNS
];

foreach ($options as $opt =&gt; $value) {
    if (!curl_share_setopt($sh, $opt, $value)) {
        $errno = curl_share_errno($sh);
        throw new RuntimeException(
            "Share option failed: " . curl_share_strerror($errno)
        );
    }
}

// Use the shared handle in multiple threads...

curl_share_close($sh);

We configure a shared handle for both cookies and DNS cache sharing. Each setopt
call is checked for success, with curl_share_errno providing
detailed error information if needed. This is crucial for robust multi-threaded
applications.

## Complete Sharing Example

This example demonstrates a complete sharing scenario with full error handling.

complete_sharing.php
  

&lt;?php

declare(strict_types=1);

function create_shared_handle() {
    $sh = curl_share_init();
    if ($sh === false) {
        throw new RuntimeException("Failed to create share handle");
    }

    // Configure sharing options
    $shareOptions = [
        CURLSHOPT_SHARE =&gt; CURL_LOCK_DATA_COOKIE | CURL_LOCK_DATA_SSL_SESSION
    ];

    foreach ($shareOptions as $opt =&gt; $value) {
        if (!curl_share_setopt($sh, $opt, $value)) {
            $errno = curl_share_errno($sh);
            curl_share_close($sh);
            throw new RuntimeException(
                "Share option failed: " . curl_share_strerror($errno)
            );
        }
    }

    return $sh;
}

try {
    $sh = create_shared_handle();
    
    $ch1 = curl_init();
    curl_setopt_array($ch1, [
        CURLOPT_URL =&gt; "https://api.example.com/login",
        CURLOPT_SHARE =&gt; $sh,
        CURLOPT_RETURNTRANSFER =&gt; true
    ]);
    
    // More handles and requests...
    
    curl_share_close($sh);
} catch (RuntimeException $e) {
    echo "Error: " . $e-&gt;getMessage() . "\n";
}

This complete example shows proper error handling throughout the shared handle
lifecycle. We check for creation errors, configuration errors, and use
curl_share_errno to get specific error codes. The shared handle is
properly cleaned up in all cases.

## Best Practices

- **Error Checking:** Always check curl_share_errno after operations.

- **Resource Cleanup:** Close share handles with curl_share_close.

- **Thread Safety:** Be cautious with sharing in multi-threaded apps.

- **Combined Options:** Check each share option separately.

- **Error Messages:** Use curl_share_strerror for readable errors.

## Source

[PHP curl_share_errno Documentation](https://www.php.net/manual/en/function.curl-share-errno.php)

This tutorial covered the PHP curl_share_errno function with
practical examples showing its usage in shared cURL handle scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP cURL tutorials](/php/#php-curl).