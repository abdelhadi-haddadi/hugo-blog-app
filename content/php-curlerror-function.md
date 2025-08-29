+++
title = "PHP curl_error Function"
date = 2025-08-29T20:05:26.914+01:00
draft = false
description = "PHP curl_error function tutorial shows how to handle cURL errors in PHP. Learn curl_error with practical examples."
image = ""
imageBig = ""
categories = ["php-curl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP curl_error Function

last modified April 11, 2025

The PHP curl_error function returns a string containing the last
error for the current cURL session. It's essential for debugging failed cURL
requests. The function provides human-readable error messages when cURL
operations fail.

## Basic Definition

The curl_error function retrieves the last error message from a
cURL session. It returns a clear text error message or an empty string if no
error occurred. The function takes a cURL handle as its only parameter.

Syntax: curl_error(CurlHandle $handle): string. Always call this
function after a cURL operation fails. It provides more details than just
checking for FALSE from curl_exec.

## Basic Error Handling

This example demonstrates basic error handling with curl_error when a request
fails due to an invalid URL.

basic_error.php
  

&lt;?php

declare(strict_types=1);

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://nonexistent.example.com");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);

if ($response === false) {
    echo "cURL Error: " . curl_error($ch);
} else {
    echo $response;
}

curl_close($ch);

This code attempts to connect to a non-existent domain. When curl_exec fails,
we use curl_error to get the specific error message. The error might indicate
DNS resolution failure or connection timeout.

## Error Handling with HTTP Status

This example shows how to combine curl_error with HTTP status code checking.

http_status.php
  

&lt;?php

declare(strict_types=1);

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://httpbin.org/status/404");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FAILONERROR, true);

$response = curl_exec($ch);

if ($response === false) {
    $error = curl_error($ch);
    $errno = curl_errno($ch);
    echo "Error ($errno): $error";
} else {
    echo "Response: " . $response;
}

curl_close($ch);

We request a 404 status endpoint and set CURLOPT_FAILONERROR to treat HTTP
errors as cURL errors. We get both the error message and error number for
better debugging. This helps distinguish between different types of failures.

## Timeout Error Handling

This example demonstrates handling timeout errors with curl_error.

timeout_error.php
  

&lt;?php

declare(strict_types=1);

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://httpbin.org/delay/10");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 2);

$response = curl_exec($ch);

if ($response === false) {
    echo "cURL Error: " . curl_error($ch);
} else {
    echo $response;
}

curl_close($ch);

We set a short timeout (2 seconds) for a request that takes 10 seconds. When
the timeout occurs, curl_exec returns FALSE. curl_error provides details about
the timeout. This is useful for detecting slow or unresponsive servers.

## SSL Certificate Error Handling

This example shows how to handle SSL certificate verification errors.

ssl_error.php
  

&lt;?php

declare(strict_types=1);

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://expired.badssl.com");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

$response = curl_exec($ch);

if ($response === false) {
    echo "SSL Error: " . curl_error($ch);
} else {
    echo $response;
}

curl_close($ch);

We attempt to connect to a site with an expired SSL certificate. With
CURLOPT_SSL_VERIFYPEER enabled, this fails. curl_error provides details
about the SSL verification failure. Always verify SSL certificates in
production for security.

## Comprehensive Error Handling

This example demonstrates comprehensive error handling with multiple checks.

comprehensive_error.php
  

&lt;?php

declare(strict_types=1);

function fetchUrl($url) {
    $ch = curl_init();
    
    curl_setopt_array($ch, [
        CURLOPT_URL =&gt;  $url,
        CURLOPT_RETURNTRANSFER =&gt;  true,
        CURLOPT_TIMEOUT =&gt;  5,
        CURLOPT_FOLLOWLOCATION =&gt;  true,
        CURLOPT_SSL_VERIFYPEER =&gt;  true
    ]);

    $response = curl_exec($ch);
    
    if ($response === false) {
        $error = curl_error($ch);
        $errno = curl_errno($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        
        curl_close($ch);
        return "Request failed (HTTP $httpCode, cURL $errno): $error";
    }
    
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode &gt;= 400) {
        return "HTTP Error $httpCode: " . $response;
    }
    
    return $response;
}

echo fetchUrl("https://httpbin.org/status/500");

This comprehensive example checks for cURL errors, HTTP status codes, and
provides detailed error information. We use curl_getinfo to get the HTTP
status code even when curl_exec fails. This approach provides maximum
debugging information.

## Best Practices

- **Always Check Errors:** Never assume curl_exec succeeded.

- **Combine with curl_errno:** Use error codes for programmatic handling.

- **Log Errors:** Record errors for debugging production issues.

- **User-Friendly Messages:** Translate technical errors for end users.

- **Clean Resources:** Always close cURL handles after use.

## Source

[PHP curl_error Documentation](https://www.php.net/manual/en/function.curl-error.php)

This tutorial covered the PHP curl_error function with practical
examples showing its usage for various error handling scenarios in cURL.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP cURL tutorials](/php/#php-curl).