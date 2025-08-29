+++
title = "PHP curl_errno Function"
date = 2025-08-29T20:05:26.911+01:00
draft = false
description = "PHP curl_errno function tutorial shows how to get cURL error numbers in PHP. Learn curl_errno with practical examples."
image = ""
imageBig = ""
categories = ["php-curl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP curl_errno Function

last modified April 11, 2025

The PHP curl_errno function returns the last error number for a
cURL session. It's essential for error handling in cURL operations. The function
helps identify specific issues when HTTP requests fail.

## Basic Definition

The curl_errno function returns an integer representing the last
cURL error. It takes a cURL handle as its only parameter. Returns 0 if no error
occurred.

Syntax: curl_errno(CurlHandle $handle): int. The handle must be a
valid cURL resource. Always call this after a failed cURL operation to get the
specific error code.

## Basic Error Handling

This example shows basic error handling with curl_errno and curl_error.

basic_error.php
  

&lt;?php

declare(strict_types=1);

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://nonexistent.example.com");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);

if ($response === false) {
    $errno = curl_errno($ch);
    $error = curl_error($ch);
    echo "cURL Error ($errno): $error";
} else {
    echo $response;
}

curl_close($ch);

This code attempts to connect to a non-existent domain. When the request fails,
we use curl_errno to get the error code and curl_error for the message. This
helps diagnose connection issues.

## Handling Specific Errors

This example demonstrates handling specific cURL error numbers.

specific_errors.php
  

&lt;?php

declare(strict_types=1);

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://example.com:81"); // Invalid port
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 5);

$response = curl_exec($ch);

if ($response === false) {
    $errno = curl_errno($ch);
    
    switch ($errno) {
        case CURLE_COULDNT_CONNECT:
            echo "Connection failed (Error $errno)";
            break;
        case CURLE_OPERATION_TIMEDOUT:
            echo "Request timed out (Error $errno)";
            break;
        default:
            echo "cURL Error ($errno): " . curl_error($ch);
    }
}

curl_close($ch);

We intentionally use an invalid port to trigger a connection error. The switch
statement handles specific error codes differently. CURLE_COULDNT_CONNECT (7)
indicates connection failure.

## SSL Certificate Verification Error

This example shows how to handle SSL certificate verification errors.

ssl_error.php
  

&lt;?php

declare(strict_types=1);

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://self-signed.badssl.com");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

$response = curl_exec($ch);

if ($response === false) {
    $errno = curl_errno($ch);
    
    if ($errno === CURLE_SSL_CACERT || $errno === CURLE_SSL_CERTPROBLEM) {
        echo "SSL Certificate Error ($errno): " . curl_error($ch);
    } else {
        echo "Other cURL Error ($errno): " . curl_error($ch);
    }
}

curl_close($ch);

We attempt to connect to a site with a self-signed certificate. With SSL
verification enabled, this triggers a certificate error. We specifically check
for SSL-related error codes (60 and 58).

## Timeout Error Handling

This example demonstrates handling timeout errors with curl_errno.

timeout_error.php
  

&lt;?php

declare(strict_types=1);

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://httpbin.org/delay/10");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 3); // 3 second timeout

$response = curl_exec($ch);

if ($response === false) {
    $errno = curl_errno($ch);
    
    if ($errno === CURLE_OPERATION_TIMEDOUT) {
        echo "Request timed out after 3 seconds (Error $errno)";
    } else {
        echo "cURL Error ($errno): " . curl_error($ch);
    }
}

curl_close($ch);

We set a short timeout and request a delayed response. When the timeout occurs,
curl_errno returns CURLE_OPERATION_TIMEDOUT (28). This helps distinguish timeout
errors from other types of failures.

## Checking Multiple Error Conditions

This example shows comprehensive error checking with multiple conditions.

multiple_errors.php
  

&lt;?php

declare(strict_types=1);

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://httpbin.org/status/404");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FAILONERROR, true); // Consider HTTP errors as failures

$response = curl_exec($ch);

if ($response === false) {
    $errno = curl_errno($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    
    if ($errno === 0 &amp;&amp; $httpCode &gt;= 400) {
        echo "HTTP Error: $httpCode";
    } else {
        echo "cURL Error ($errno): " . curl_error($ch);
    }
}

curl_close($ch);

We combine curl_errno with HTTP status code checking. CURLOPT_FAILONERROR makes
cURL fail on HTTP status &gt;= 400. Note that HTTP errors might return errno 0,
requiring additional status code checks.

## Best Practices

- **Check after execution:** Always call curl_errno after curl_exec.

- **Combine with curl_error:** Use both for complete error info.

- **Specific handling:** Handle important errors specifically.

- **HTTP status codes:** Check these even when errno is 0.

- **Documentation:** Refer to cURL error constants for meanings.

## Source

[PHP curl_errno Documentation](https://www.php.net/manual/en/function.curl-errno.php)

This tutorial covered the PHP curl_errno function with practical
examples showing its usage for various error handling scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP cURL tutorials](/php/#php-curl).