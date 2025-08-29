+++
title = "PHP curl_multi_strerror Function"
date = 2025-08-29T20:05:32.443+01:00
draft = false
description = "PHP curl_multi_strerror function tutorial shows how to get error messages for cURL multi handles. Learn curl_multi_strerror with practical examples."
image = ""
imageBig = ""
categories = ["php-curl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP curl_multi_strerror Function

last modified April 11, 2025

The PHP curl_multi_strerror function returns a string description
of a cURL multi handle error code. It's part of PHP's cURL multi interface
which handles multiple cURL transfers simultaneously.

## Basic Definition

The curl_multi_strerror function provides human-readable error
messages for cURL multi handle error codes. It takes an error code as input
and returns the corresponding error string.

Syntax: curl_multi_strerror(int $error_code): ?string. The function
returns NULL if the error code is invalid. It's available since PHP 7.3.0.

## Basic Error Message Lookup

This example demonstrates how to get an error message for a known cURL multi
error code.

basic_error_lookup.php
  

&lt;?php

declare(strict_types=1);

$errorCode = CURLM_OK;
$errorMessage = curl_multi_strerror($errorCode);

echo "Error code {$errorCode}: {$errorMessage}";

This code looks up the message for CURLM_OK (0), which means no error. The
function returns "No error" for this code. Always check the error code before
displaying messages to users.

## Handling Multi cURL Errors

This example shows how to use curl_multi_strerror in a real multi cURL scenario.

multi_curl_error.php
  

&lt;?php

declare(strict_types=1);

$mh = curl_multi_init();
$ch1 = curl_init("https://example.com");
$ch2 = curl_init("https://nonexistent.domain");

curl_multi_add_handle($mh, $ch1);
curl_multi_add_handle($mh, $ch2);

do {
    $status = curl_multi_exec($mh, $active);
    
    if ($status !== CURLM_OK) {
        echo "cURL multi error: " . curl_multi_strerror($status);
        break;
    }
    
    curl_multi_select($mh);
} while ($active);

curl_multi_remove_handle($mh, $ch1);
curl_multi_remove_handle($mh, $ch2);
curl_multi_close($mh);

We create a multi handle with two cURL requests. One URL is invalid, which may
cause errors. The curl_multi_exec status is checked and the error message is
displayed if needed. Proper cleanup is performed at the end.

## Invalid Error Code Handling

This example demonstrates how the function behaves with invalid error codes.

invalid_error_code.php
  

&lt;?php

declare(strict_types=1);

$invalidCode = 9999;
$errorMessage = curl_multi_strerror($invalidCode);

if ($errorMessage === null) {
    echo "Invalid cURL multi error code: {$invalidCode}";
} else {
    echo "Error message: {$errorMessage}";
}

When an invalid error code is provided, the function returns NULL. This helps
distinguish between valid error messages and unknown error codes. Always check
for NULL when working with dynamic error codes.

## Listing All Known Error Codes

This example shows how to display all known cURL multi error messages.

all_error_messages.php
  

&lt;?php

declare(strict_types=1);

$errorCodes = [
    CURLM_OK,
    CURLM_BAD_HANDLE,
    CURLM_BAD_EASY_HANDLE,
    CURLM_OUT_OF_MEMORY,
    CURLM_INTERNAL_ERROR,
    CURLM_BAD_SOCKET,
    CURLM_UNKNOWN_OPTION,
    CURLM_ADDED_ALREADY
];

foreach ($errorCodes as $code) {
    echo "Code {$code}: " . curl_multi_strerror($code) . "\n";
}

We define an array of known cURL multi error constants and loop through them.
For each code, we display the corresponding error message. This is useful for
debugging or creating documentation.

## Custom Error Handling Wrapper

This example creates a custom function that enhances curl_multi_strerror.

custom_error_wrapper.php
  

&lt;?php

declare(strict_types=1);

function getMultiCurlError(int $code): string {
    $message = curl_multi_strerror($code);
    
    if ($message === null) {
        return "Unknown cURL multi error (code: {$code})";
    }
    
    return "cURL multi error {$code}: {$message}";
}

// Example usage:
$errorCode = CURLM_OUT_OF_MEMORY;
echo getMultiCurlError($errorCode);

We create a wrapper function that provides more detailed error information. It
handles unknown error codes gracefully and formats the output consistently. This
approach centralizes error message handling in your application.

## Best Practices

- **Error Checking:** Always check curl_multi_exec return values.

- **Message Validation:** Verify curl_multi_strerror doesn't return NULL.

- **Logging:** Log both error codes and messages for debugging.

- **Constants:** Use cURL constants instead of hardcoded values.

- **Cleanup:** Properly close multi handles after use.

## Source

[PHP curl_multi_strerror Documentation](https://www.php.net/manual/en/function.curl-multi-strerror.php)

This tutorial covered the PHP curl_multi_strerror function with
practical examples showing its usage in various error handling scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP cURL tutorials](/php/#php-curl).