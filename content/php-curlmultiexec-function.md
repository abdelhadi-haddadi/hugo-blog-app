+++
title = "PHP curl_multi_exec Function"
date = 2025-08-29T20:05:30.237+01:00
draft = false
description = "PHP curl_multi_exec function tutorial shows how to execute multiple cURL requests in parallel in PHP. Learn curl_multi_exec with practical examples."
image = ""
imageBig = ""
categories = ["php-curl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP curl_multi_exec Function

last modified April 11, 2025

The PHP curl_multi_exec function executes multiple cURL handles in
parallel. It's used to perform multiple HTTP requests simultaneously, improving
performance when fetching data from multiple sources.

## Basic Definition

The curl_multi_exec function runs the sub-connections of the
current cURL multi handle. It processes each handle asynchronously, enabling
parallel requests. The function returns a cURL code defined in cURL.h.

Syntax: curl_multi_exec(CurlMultiHandle $multi_handle, int &amp;$still_running): int.
The $still_running parameter is filled with the number of still
running handles. The function should be called repeatedly until all handles
complete.

## Basic Parallel Requests

This example demonstrates making two parallel GET requests to different URLs.

basic_parallel.php
  

&lt;?php

declare(strict_types=1);

// Create multiple cURL handles
$ch1 = curl_init();
$ch2 = curl_init();

curl_setopt($ch1, CURLOPT_URL, "https://jsonplaceholder.typicode.com/posts/1");
curl_setopt($ch1, CURLOPT_RETURNTRANSFER, true);

curl_setopt($ch2, CURLOPT_URL, "https://jsonplaceholder.typicode.com/comments/1");
curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);

// Create the multi cURL handle
$mh = curl_multi_init();

// Add the handles
curl_multi_add_handle($mh, $ch1);
curl_multi_add_handle($mh, $ch2);

// Execute the handles
$running = null;
do {
    curl_multi_exec($mh, $running);
    curl_multi_select($mh);
} while ($running &gt; 0);

// Get the responses
$response1 = curl_multi_getcontent($ch1);
$response2 = curl_multi_getcontent($ch2);

// Close the handles
curl_multi_remove_handle($mh, $ch1);
curl_multi_remove_handle($mh, $ch2);
curl_multi_close($mh);

echo "Post 1: " . $response1 . "\n\n";
echo "Comment 1: " . $response2;

This code creates two cURL handles for different API endpoints. We add them to
a multi handle and execute them in parallel. The loop continues until all
requests complete. Finally, we retrieve and display the responses.

## Handling Multiple Responses

This example shows how to properly handle responses from multiple parallel requests.

multiple_responses.php
  

&lt;?php

declare(strict_types=1);

$urls = [
    "https://jsonplaceholder.typicode.com/posts/1",
    "https://jsonplaceholder.typicode.com/comments/1",
    "https://jsonplaceholder.typicode.com/albums/1"
];

$mh = curl_multi_init();
$handles = [];

foreach ($urls as $i =&gt;  $url) {
    $handles[$i] = curl_init();
    curl_setopt($handles[$i], CURLOPT_URL, $url);
    curl_setopt($handles[$i], CURLOPT_RETURNTRANSFER, true);
    curl_multi_add_handle($mh, $handles[$i]);
}

$running = null;
do {
    curl_multi_exec($mh, $running);
    curl_multi_select($mh);
} while ($running &gt; 0);

$responses = [];
foreach ($handles as $i =&gt;  $handle) {
    $responses[$i] = curl_multi_getcontent($handle);
    curl_multi_remove_handle($mh, $handle);
    curl_close($handle);
}

curl_multi_close($mh);

foreach ($responses as $i =&gt;  $response) {
    echo "Response $i: " . substr($response, 0, 100) . "...\n\n";
}

We create multiple cURL handles from an array of URLs. After parallel execution,
we collect all responses in an array. The example demonstrates proper resource
cleanup and shows how to process multiple responses efficiently.

## Error Handling in Parallel Requests

This example demonstrates proper error handling for parallel cURL requests.

error_handling.php
  

&lt;?php

declare(strict_types=1);

$urls = [
    "https://valid.url/api",
    "https://invalid.url/api",
    "https://another.valid.url/api"
];

$mh = curl_multi_init();
$handles = [];

foreach ($urls as $i =&gt;  $url) {
    $handles[$i] = curl_init();
    curl_setopt($handles[$i], CURLOPT_URL, $url);
    curl_setopt($handles[$i], CURLOPT_RETURNTRANSFER, true);
    curl_setopt($handles[$i], CURLOPT_TIMEOUT, 10);
    curl_multi_add_handle($mh, $handles[$i]);
}

$running = null;
do {
    curl_multi_exec($mh, $running);
    curl_multi_select($mh);
} while ($running &gt; 0);

$results = [];
foreach ($handles as $i =&gt;  $handle) {
    $error = curl_error($handle);
    if ($error) {
        $results[$i] = "Error for URL $i: " . $error;
    } else {
        $results[$i] = "Success for URL $i: " . 
            substr(curl_multi_getcontent($handle), 0, 50) . "...";
    }
    curl_multi_remove_handle($mh, $handle);
    curl_close($handle);
}

curl_multi_close($mh);

print_r($results);

This example includes error checking for each request. We check for cURL errors
after execution and store appropriate messages. The timeout option prevents
hanging on unresponsive servers. Results are collected with success/error status.

## Controlling Concurrency

This example shows how to control the number of parallel requests using a queue.

concurrency_control.php
  

&lt;?php

declare(strict_types=1);

$urls = [
    "https://jsonplaceholder.typicode.com/posts/1",
    "https://jsonplaceholder.typicode.com/posts/2",
    "https://jsonplaceholder.typicode.com/posts/3",
    "https://jsonplaceholder.typicode.com/posts/4",
    "https://jsonplaceholder.typicode.com/posts/5"
];

$maxConcurrent = 2; // Maximum parallel requests
$mh = curl_multi_init();
$activeHandles = [];
$allResponses = [];
$currentIndex = 0;

while ($currentIndex &lt; count($urls) || count($activeHandles) &gt; 0) {
    // Add new requests if under limit
    while (count($activeHandles) &lt; $maxConcurrent &amp;&amp; $currentIndex &lt; count($urls)) {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $urls[$currentIndex]);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_multi_add_handle($mh, $ch);
        $activeHandles[$currentIndex] = $ch;
        $currentIndex++;
    }
    
    // Execute the current batch
    $running = null;
    do {
        curl_multi_exec($mh, $running);
        curl_multi_select($mh);
    } while ($running &gt; 0);
    
    // Process completed requests
    foreach ($activeHandles as $i =&gt;  $ch) {
        $info = curl_getinfo($ch);
        if ($info['http_code'] == 200) {
            $allResponses[$i] = substr(curl_multi_getcontent($ch), 0, 50) . "...";
        } else {
            $allResponses[$i] = "Error for URL $i";
        }
        curl_multi_remove_handle($mh, $ch);
        curl_close($ch);
        unset($activeHandles[$i]);
    }
}

curl_multi_close($mh);

print_r($allResponses);

This advanced example implements a queue system to control concurrency. We
process URLs in batches of 2, maintaining optimal performance without
overwhelming servers. Completed requests are processed and removed before
starting new ones.

## Processing Responses as They Complete

This example demonstrates processing responses immediately as they complete.

streaming_processing.php
  

&lt;?php

declare(strict_types=1);

$urls = [
    "https://jsonplaceholder.typicode.com/posts/1",
    "https://jsonplaceholder.typicode.com/comments/1",
    "https://jsonplaceholder.typicode.com/albums/1",
    "https://jsonplaceholder.typicode.com/photos/1",
    "https://jsonplaceholder.typicode.com/todos/1"
];

$mh = curl_multi_init();
$handles = [];

foreach ($urls as $i =&gt;  $url) {
    $handles[$i] = curl_init();
    curl_setopt($handles[$i], CURLOPT_URL, $url);
    curl_setopt($handles[$i], CURLOPT_RETURNTRANSFER, true);
    curl_multi_add_handle($mh, $handles[$i]);
}

$completed = 0;
$total = count($urls);

do {
    $status = curl_multi_exec($mh, $running);
    
    if ($status === CURLM_OK) {
        // Check for completed requests
        while ($info = curl_multi_info_read($mh)) {
            $handle = $info['handle'];
            $index = array_search($handle, $handles, true);
            
            if ($info['result'] === CURLE_OK) {
                $response = curl_multi_getcontent($handle);
                echo "Completed $index: " . substr($response, 0, 50) . "...\n";
            } else {
                echo "Failed $index: " . curl_error($handle) . "\n";
            }
            
            curl_multi_remove_handle($mh, $handle);
            curl_close($handle);
            $completed++;
        }
    }
    
    if ($running) {
        curl_multi_select($mh, 0.1);
    }
} while ($running &gt; 0 || $completed &lt; $total);

curl_multi_close($mh);

This example processes responses as soon as they become available, rather than
waiting for all requests to complete. We use curl_multi_info_read
to detect completed requests. This approach is useful for processing large
numbers of requests with varying response times.

## Best Practices

- **Limit Concurrency:** Control parallel requests to avoid overwhelming servers.

- **Error Handling:** Check each request's status and errors.

- **Resource Cleanup:** Always remove and close handles properly.

- **Timeouts:** Set CURLOPT_TIMEOUT for each handle.

- **Memory Management:** Process responses as they complete for large batches.

## Source

[PHP curl_multi_exec Documentation](https://www.php.net/manual/en/function.curl-multi-exec.php)

This tutorial covered the PHP curl_multi_exec function with practical
examples showing parallel request execution and response handling.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP cURL tutorials](/php/#php-curl).