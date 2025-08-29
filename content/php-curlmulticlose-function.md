+++
title = "PHP curl_multi_close Function"
date = 2025-08-29T20:05:29.095+01:00
draft = false
description = "PHP curl_multi_close function tutorial shows how to close multiple cURL handles in PHP. Learn curl_multi_close with practical examples."
image = ""
imageBig = ""
categories = ["php-curl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP curl_multi_close Function

last modified April 11, 2025

The PHP curl_multi_close function closes a set of cURL handles.
It's used to clean up resources after executing multiple cURL requests
simultaneously. This function is part of PHP's cURL multi interface.

## Basic Definition

The curl_multi_close function closes a cURL multi handle and
frees all associated resources. It takes a cURL multi handle created with
curl_multi_init() as its only parameter.

Syntax: curl_multi_close(CurlMultiHandle $multi_handle): void.
After calling this function, the multi handle cannot be used anymore.
Always close multi handles when done to prevent memory leaks.

## Basic Multiple Requests

This example demonstrates making multiple requests and closing the handles.

basic_multi.php
  

&lt;?php

declare(strict_types=1);

$urls = [
    "https://jsonplaceholder.typicode.com/posts/1",
    "https://jsonplaceholder.typicode.com/posts/2",
    "https://jsonplaceholder.typicode.com/posts/3"
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
    if ($active) {
        curl_multi_select($mh);
    }
} while ($active &amp;&amp; $status == CURLM_OK);

foreach ($handles as $ch) {
    echo curl_multi_getcontent($ch) . "\n";
    curl_multi_remove_handle($mh, $ch);
    curl_close($ch);
}

curl_multi_close($mh);

This code fetches three posts simultaneously. We create individual handles,
add them to the multi handle, and execute them. After getting the content,
we properly clean up all resources.

## Handling Errors in Multiple Requests

This example shows error handling with multiple cURL requests.

error_handling.php
  

&lt;?php

declare(strict_types=1);

$urls = [
    "https://jsonplaceholder.typicode.com/posts/1",
    "https://invalid.url",
    "https://jsonplaceholder.typicode.com/posts/3"
];

$mh = curl_multi_init();
$handles = [];

foreach ($urls as $url) {
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    curl_multi_add_handle($mh, $ch);
    $handles[$url] = $ch;
}

do {
    $status = curl_multi_exec($mh, $active);
    if ($active) {
        curl_multi_select($mh);
    }
} while ($active &amp;&amp; $status == CURLM_OK);

foreach ($handles as $url =&gt;  $ch) {
    if (curl_errno($ch)) {
        echo "Error for $url: " . curl_error($ch) . "\n";
    } else {
        echo "Success for $url\n";
    }
    curl_multi_remove_handle($mh, $ch);
    curl_close($ch);
}

curl_multi_close($mh);

We intentionally include an invalid URL to demonstrate error handling.
Each handle is checked for errors after execution. The multi handle is
properly closed after processing all requests.

## Parallel API Requests

This example shows how to fetch data from multiple APIs in parallel.

parallel_apis.php
  

&lt;?php

declare(strict_types=1);

$apis = [
    "users" =&gt;  "https://jsonplaceholder.typicode.com/users/1",
    "posts" =&gt;  "https://jsonplaceholder.typicode.com/posts/1",
    "comments" =&gt;  "https://jsonplaceholder.typicode.com/comments/1"
];

$mh = curl_multi_init();
$handles = [];

foreach ($apis as $name =&gt;  $url) {
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_multi_add_handle($mh, $ch);
    $handles[$name] = $ch;
}

do {
    $status = curl_multi_exec($mh, $active);
    if ($active) {
        curl_multi_select($mh);
    }
} while ($active &amp;&amp; $status == CURLM_OK);

$results = [];
foreach ($handles as $name =&gt;  $ch) {
    $results[$name] = json_decode(curl_multi_getcontent($ch), true);
    curl_multi_remove_handle($mh, $ch);
    curl_close($ch);
}

curl_multi_close($mh);

print_r($results);

We fetch data from three different API endpoints simultaneously.
The results are stored in an associative array with meaningful keys.
All handles are properly cleaned up after processing the responses.

## Setting Custom Headers for Multiple Requests

This example demonstrates setting custom headers for multiple requests.

multi_headers.php
  

&lt;?php

declare(strict_types=1);

$urls = [
    "https://api.example.com/resource1",
    "https://api.example.com/resource2"
];

$headers = [
    'Authorization: Bearer abc123',
    'Content-Type: application/json'
];

$mh = curl_multi_init();
$handles = [];

foreach ($urls as $url) {
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_multi_add_handle($mh, $ch);
    $handles[] = $ch;
}

do {
    $status = curl_multi_exec($mh, $active);
    if ($active) {
        curl_multi_select($mh);
    }
} while ($active &amp;&amp; $status == CURLM_OK);

foreach ($handles as $ch) {
    echo curl_multi_getcontent($ch) . "\n";
    curl_multi_remove_handle($mh, $ch);
    curl_close($ch);
}

curl_multi_close($mh);

We set the same custom headers for all requests in the multi handle.
The headers include authorization and content type. After processing,
we properly clean up all cURL resources.

## Performance Comparison: Sequential vs Parallel

This example compares sequential and parallel request execution.

performance.php
  

&lt;?php

declare(strict_types=1);

$urls = array_fill(0, 5, "https://jsonplaceholder.typicode.com/posts/1");

// Sequential requests
$start = microtime(true);
foreach ($urls as $url) {
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_exec($ch);
    curl_close($ch);
}
$sequential = microtime(true) - $start;

// Parallel requests
$start = microtime(true);
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
    if ($active) {
        curl_multi_select($mh);
    }
} while ($active &amp;&amp; $status == CURLM_OK);

foreach ($handles as $ch) {
    curl_multi_remove_handle($mh, $ch);
    curl_close($ch);
}

curl_multi_close($mh);
$parallel = microtime(true) - $start;

echo "Sequential: " . $sequential . " seconds\n";
echo "Parallel: " . $parallel . " seconds\n";

This code demonstrates the performance benefit of parallel requests.
We measure execution time for both approaches. The multi handle is
properly closed after the parallel execution completes.

## Best Practices

- **Resource Cleanup:** Always close multi handles with curl_multi_close.

- **Error Handling:** Check individual handles for errors after execution.

- **Memory Management:** Remove handles from multi handle when done.

- **Timeouts:** Set CURLOPT_TIMEOUT for individual handles.

- **Concurrency:** Limit the number of simultaneous requests.

## Source

[PHP curl_multi_close Documentation](https://www.php.net/manual/en/function.curl-multi-close.php)

This tutorial covered the PHP curl_multi_close function with practical
examples showing its usage for parallel HTTP request scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP cURL tutorials](/php/#php-curl).