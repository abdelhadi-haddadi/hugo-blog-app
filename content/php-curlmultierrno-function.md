+++
title = "PHP curl_multi_errno Function"
date = 2025-08-29T20:05:29.107+01:00
draft = false
description = "PHP curl_multi_errno function tutorial shows how to handle errors in cURL multi sessions in PHP. Learn curl_multi_errno with practical examples."
image = ""
imageBig = ""
categories = ["php-curl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP curl_multi_errno Function

last modified April 11, 2025

The PHP curl_multi_errno function returns the last error number for
a cURL multi handle. It's used to identify errors in asynchronous cURL operations.
This function helps diagnose issues in parallel HTTP requests.

## Basic Definition

The curl_multi_errno function returns an integer containing the last
error number for a cURL multi handle. It returns 0 (CURLM_OK) if no error occurred.

Syntax: curl_multi_errno(CurlMultiHandle $multi_handle): int. The
multi handle must be created with curl_multi_init(). Always check
this after multi operations to detect potential issues.

## Basic Multi Handle Error Check

This example demonstrates checking for errors after initializing a multi handle.

basic_error_check.php
  

&lt;?php

declare(strict_types=1);

$mh = curl_multi_init();

if ($mh === false) {
    die("Failed to initialize multi handle");
}

$errno = curl_multi_errno($mh);

if ($errno !== CURLM_OK) {
    echo "Multi handle error: " . curl_multi_strerror($errno);
} else {
    echo "Multi handle initialized successfully";
}

curl_multi_close($mh);

This code initializes a cURL multi handle and checks for errors. We use
curl_multi_strerror to get a human-readable error message.
The example shows basic error handling for multi handle initialization.

## Error Handling in Multi Execution

This example shows how to check for errors during multi handle execution.

multi_exec_error.php
  

&lt;?php

declare(strict_types=1);

$urls = [
    "https://example.com",
    "https://nonexistent.example",
    "https://another.example"
];

$mh = curl_multi_init();
$handles = [];

foreach ($urls as $url) {
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_multi_add_handle($mh, $ch);
    $handles[] = $ch;
}

do {
    $status = curl_multi_exec($mh, $active);
    $errno = curl_multi_errno($mh);
    
    if ($errno !== CURLM_OK) {
        echo "Multi error: " . curl_multi_strerror($errno);
        break;
    }
    
    usleep(10000);
} while ($active &amp;&amp; $status === CURLM_OK);

foreach ($handles as $ch) {
    curl_multi_remove_handle($mh, $ch);
    curl_close($ch);
}

curl_multi_close($mh);

We create multiple cURL handles and add them to a multi handle. During execution,
we continuously check for errors using curl_multi_errno. The loop
breaks if an error occurs, preventing further execution of faulty requests.

## Handling Specific Error Codes

This example demonstrates handling specific error codes from curl_multi_errno.

specific_errors.php
  

&lt;?php

declare(strict_types=1);

$mh = curl_multi_init();

// Intentionally cause an error by adding a non-curl handle
$fakeHandle = fopen('php://temp', 'r');
curl_multi_add_handle($mh, $fakeHandle);

$errno = curl_multi_errno($mh);

switch ($errno) {
    case CURLM_OK:
        echo "No error occurred";
        break;
    case CURLM_BAD_HANDLE:
        echo "Error: Invalid multi handle (CURLM_BAD_HANDLE)";
        break;
    case CURLM_BAD_EASY_HANDLE:
        echo "Error: Invalid easy handle (CURLM_BAD_EASY_HANDLE)";
        break;
    case CURLM_OUT_OF_MEMORY:
        echo "Error: Out of memory (CURLM_OUT_OF_MEMORY)";
        break;
    case CURLM_INTERNAL_ERROR:
        echo "Error: Internal error (CURLM_INTERNAL_ERROR)";
        break;
    default:
        echo "Unknown error occurred: $errno";
}

if (is_resource($fakeHandle)) {
    fclose($fakeHandle);
}

curl_multi_close($mh);

We intentionally cause an error by adding a non-cURL handle to the multi handle.
The code then checks the specific error code and provides appropriate handling.
This demonstrates how to respond differently to various cURL multi errors.

## Error Handling in Parallel Requests

This example shows comprehensive error handling for parallel requests.

parallel_errors.php
  

&lt;?php

declare(strict_types=1);

$urls = [
    "https://valid.example.com",
    "https://invalid.example",
    "https://timeout.example.com"
];

$mh = curl_multi_init();
$handles = [];

foreach ($urls as $i =&gt;  $url) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    curl_multi_add_handle($mh, $ch);
    $handles[$i] = $ch;
}

$active = null;
do {
    $mrc = curl_multi_exec($mh, $active);
    
    if ($mrc !== CURLM_OK) {
        $errno = curl_multi_errno($mh);
        echo "Multi error: " . curl_multi_strerror($errno);
        break;
    }
    
    // Check for individual handle errors
    while ($info = curl_multi_info_read($mh)) {
        if ($info['result'] !== CURLE_OK) {
            $handle = $info['handle'];
            $errno = curl_errno($handle);
            echo "Handle error: " . curl_strerror($errno) . "\n";
        }
    }
    
    usleep(10000);
} while ($active);

foreach ($handles as $ch) {
    curl_multi_remove_handle($mh, $ch);
    curl_close($ch);
}

curl_multi_close($mh);

This example performs parallel requests with comprehensive error handling. We check
both multi handle errors and individual handle errors. The code demonstrates how
to handle different types of errors that might occur during parallel execution.

## Combining with curl_multi_strerror

This example shows how to combine curl_multi_errno with curl_multi_strerror.

with_strerror.php
  

&lt;?php

declare(strict_types=1);

function executeMultiRequests(array $urls): void {
    $mh = curl_multi_init();
    $handles = [];
    
    foreach ($urls as $url) {
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_multi_add_handle($mh, $ch);
        $handles[] = $ch;
    }
    
    $active = null;
    do {
        $status = curl_multi_exec($mh, $active);
        
        if ($status !== CURLM_OK) {
            $errno = curl_multi_errno($mh);
            $errorMsg = curl_multi_strerror($errno);
            throw new RuntimeException("cURL multi error: $errorMsg ($errno)");
        }
        
        usleep(10000);
    } while ($active);
    
    foreach ($handles as $ch) {
        $content = curl_multi_getcontent($ch);
        echo "Content length: " . strlen($content) . "\n";
        curl_multi_remove_handle($mh, $ch);
        curl_close($ch);
    }
    
    curl_multi_close($mh);
}

try {
    executeMultiRequests([
        "https://example.com",
        "https://example.org"
    ]);
} catch (RuntimeException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

We wrap the multi handle operations in a function that throws exceptions on errors.
The curl_multi_strerror provides a human-readable error message.
This approach creates cleaner error handling for complex multi-request scenarios.

## Best Practices

- **Check after operations:** Always check curl_multi_errno after multi handle operations.

- **Combine with strerror:** Use curl_multi_strerror for readable error messages.

- **Handle specific codes:** Implement specific handling for different error codes.

- **Clean up resources:** Always remove handles and close multi handles.

- **Check individual handles:** Also check for errors in individual easy handles.

## Source

[PHP curl_multi_errno Documentation](https://www.php.net/manual/en/function.curl-multi-errno.php)

This tutorial covered the PHP curl_multi_errno function with practical
examples showing its usage for error handling in parallel cURL operations.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP cURL tutorials](/php/#php-curl).