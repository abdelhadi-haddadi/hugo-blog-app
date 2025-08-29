+++
title = "PHP curl_multi_info_read Function"
date = 2025-08-29T20:05:30.233+01:00
draft = false
description = "PHP curl_multi_info_read function tutorial shows how to read information about completed cURL handles. Learn curl_multi_info_read with examples."
image = ""
imageBig = ""
categories = ["php-curl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP curl_multi_info_read Function

last modified April 11, 2025

The PHP curl_multi_info_read function reads information about
completed cURL handles. It's used with curl_multi_exec to process multiple
transfers in parallel. This function helps track completed requests.

## Basic Definition

The curl_multi_info_read function reads information from the multi
handle about completed transfers. It returns an array of information or FALSE.

Syntax: curl_multi_info_read(CurlMultiHandle $multi_handle, int &amp;$queued_messages = null): array|false.
The function must be called repeatedly until it returns FALSE.

## Basic Multiple Requests

This example demonstrates how to execute multiple cURL requests in parallel.

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

while ($info = curl_multi_info_read($mh)) {
    $ch = $info['handle'];
    $content = curl_multi_getcontent($ch);
    echo "Completed request: " . curl_getinfo($ch, CURLINFO_EFFECTIVE_URL) . "\n";
    echo "Status: " . $info['result'] . "\n";
    echo "Response length: " . strlen($content) . " bytes\n\n";
    curl_multi_remove_handle($mh, $ch);
    curl_close($ch);
}

curl_multi_close($mh);

This code executes three requests in parallel. We use curl_multi_info_read to
get information about completed requests. The result contains the handle and
status code. We clean up handles after processing.

## Handling Errors in Multiple Requests

This example shows how to handle errors when processing multiple requests.

error_handling.php
  

&lt;?php

declare(strict_types=1);

$urls = [
    "https://jsonplaceholder.typicode.com/posts/1",
    "https://invalid.url.xyz",
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

while ($info = curl_multi_info_read($mh)) {
    $ch = $info['handle'];
    $url = array_search($ch, $handles, true);
    
    if ($info['result'] !== CURLE_OK) {
        echo "Error for $url: " . curl_error($ch) . "\n";
    } else {
        $content = curl_multi_getcontent($ch);
        echo "Success for $url: " . strlen($content) . " bytes\n";
    }
    
    curl_multi_remove_handle($mh, $ch);
    curl_close($ch);
}

curl_multi_close($mh);

We process multiple URLs including an invalid one. The info array contains a
result code we check for errors. For failed requests, we output the error
message. Successful requests show the response length.

## Processing Responses with Callbacks

This example demonstrates using callbacks to process completed requests.

callback_processing.php
  

&lt;?php

declare(strict_types=1);

function process_response(array $info, $content) {
    $url = curl_getinfo($info['handle'], CURLINFO_EFFECTIVE_URL);
    $code = curl_getinfo($info['handle'], CURLINFO_HTTP_CODE);
    
    echo "URL: $url\n";
    echo "Status: $code\n";
    echo "Content length: " . strlen($content) . "\n";
    echo "cURL result: " . $info['result'] . "\n\n";
}

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

while ($info = curl_multi_info_read($mh)) {
    $content = curl_multi_getcontent($info['handle']);
    process_response($info, $content);
    curl_multi_remove_handle($mh, $info['handle']);
    curl_close($info['handle']);
}

curl_multi_close($mh);

We define a callback function to process each completed request. The callback
receives the info array and response content. This approach helps organize
complex response handling logic. Cleanup is performed after processing.

## Tracking Progress of Multiple Requests

This example shows how to track progress while executing multiple requests.

progress_tracking.php
  

&lt;?php

declare(strict_types=1);

$urls = [
    "https://jsonplaceholder.typicode.com/posts/1",
    "https://jsonplaceholder.typicode.com/posts/2",
    "https://jsonplaceholder.typicode.com/posts/3"
];

$mh = curl_multi_init();
$handles = [];
$completed = 0;
$total = count($urls);

foreach ($urls as $url) {
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_NOPROGRESS, false);
    curl_multi_add_handle($mh, $ch);
    $handles[] = $ch;
}

do {
    $status = curl_multi_exec($mh, $active);
    
    // Check for completed requests
    while ($info = curl_multi_info_read($mh)) {
        $completed++;
        echo "Completed $completed of $total requests\n";
        curl_multi_remove_handle($mh, $info['handle']);
        curl_close($info['handle']);
    }
    
    if ($active) {
        curl_multi_select($mh);
    }
} while ($active &amp;&amp; $status == CURLM_OK);

curl_multi_close($mh);
echo "All requests completed\n";

We track the number of completed requests during execution. The info_read
function is called within the loop to detect completions. This provides real-
time feedback about progress. The total count helps users understand completion.

## Processing Large Numbers of Requests

This example demonstrates handling a large batch of requests efficiently.

batch_processing.php
  

&lt;?php

declare(strict_types=1);

// Generate 100 sample URLs
$urls = array_map(function($i) {
    return "https://jsonplaceholder.typicode.com/posts/" . ($i + 1);
}, range(0, 99));

$mh = curl_multi_init();
$handles = [];
$batchSize = 10;
$results = [];

// Process in batches to avoid overwhelming the system
for ($i = 0; $i &lt; count($urls); $i += $batchSize) {
    $batch = array_slice($urls, $i, $batchSize);
    
    // Add batch to multi handle
    foreach ($batch as $url) {
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_multi_add_handle($mh, $ch);
        $handles[$url] = $ch;
    }
    
    // Execute batch
    do {
        $status = curl_multi_exec($mh, $active);
        if ($active) {
            curl_multi_select($mh);
        }
    } while ($active &amp;&amp; $status == CURLM_OK);
    
    // Process completed requests
    while ($info = curl_multi_info_read($mh)) {
        $ch = $info['handle'];
        $url = array_search($ch, $handles, true);
        $results[$url] = [
            'status' =&gt;  $info['result'],
            'content' =&gt;  curl_multi_getcontent($ch)
        ];
        curl_multi_remove_handle($mh, $ch);
        curl_close($ch);
        unset($handles[$url]);
    }
}

curl_multi_close($mh);

echo "Processed " . count($results) . " requests\n";
echo "Success rate: " . 
    (count(array_filter($results, fn($r) =&gt;  $r['status'] === CURLE_OK)) / 
    count($results) * 100 . "%\n";

We process 100 requests in batches of 10 for better resource management. Each
batch is executed and processed before moving to the next. Results are stored
for later analysis. This approach prevents system overload with large request
sets.

## Best Practices

- **Error Checking:** Always check the result code in the info array.

- **Resource Cleanup:** Remove and close handles after processing.

- **Batch Processing:** Process large request sets in batches.

- **Progress Feedback:** Provide progress updates for long operations.

- **Memory Management:** Free resources promptly to avoid leaks.

## Source

[PHP curl_multi_info_read Documentation](https://www.php.net/manual/en/function.curl-multi-info-read.php)

This tutorial covered the PHP curl_multi_info_read function with
practical examples showing parallel request processing and result handling.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP cURL tutorials](/php/#php-curl).