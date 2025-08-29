+++
title = "PHP curl_multi_add_handle Function"
date = 2025-08-29T20:05:29.117+01:00
draft = false
description = "PHP curl_multi_add_handle function tutorial shows how to execute multiple cURL requests in PHP. Learn curl_multi_add_handle with practical examples."
image = ""
imageBig = ""
categories = ["php-curl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP curl_multi_add_handle Function

last modified April 11, 2025

The PHP curl_multi_add_handle function adds a cURL handle to a set
of cURL handles. It's used to perform multiple HTTP requests simultaneously.
This enables efficient parallel processing of web requests.

## Basic Definition

The curl_multi_add_handle function adds a standard cURL handle to
a multi handle. It returns 0 on success, or one of the CURLM_XXX errors.

Syntax: curl_multi_add_handle(CurlMultiHandle $multi_handle, CurlHandle $handle): int.
The multi handle must be created with curl_multi_init(). Always
remove handles with curl_multi_remove_handle() when done.

## Basic Multiple GET Requests

This example demonstrates how to execute multiple GET requests in parallel.

basic_multi_get.php
  

&lt;?php

declare(strict_types=1);

$urls = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2',
    'https://jsonplaceholder.typicode.com/posts/3'
];

$mh = curl_multi_init();
$handles = [];

foreach ($urls as $url) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_multi_add_handle($mh, $ch);
    $handles[] = $ch;
}

$running = null;
do {
    curl_multi_exec($mh, $running);
    curl_multi_select($mh);
} while ($running &gt; 0);

foreach ($handles as $ch) {
    echo curl_multi_getcontent($ch) . "\n";
    curl_multi_remove_handle($mh, $ch);
    curl_close($ch);
}

curl_multi_close($mh);

This code fetches three posts simultaneously. We create individual cURL handles
for each URL and add them to the multi handle. The loop processes all requests
until completion. Finally, we retrieve and output each response.

## Handling Responses with Callbacks

This example shows how to process responses as they complete using callbacks.

callback_responses.php
  

&lt;?php

declare(strict_types=1);

$urls = [
    'https://jsonplaceholder.typicode.com/users/1',
    'https://jsonplaceholder.typicode.com/users/2',
    'https://jsonplaceholder.typicode.com/users/3'
];

$mh = curl_multi_init();
$handles = [];

foreach ($urls as $i =&gt;  $url) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_PRIVATE, $i); // Store index
    curl_multi_add_handle($mh, $ch);
    $handles[$i] = $ch;
}

do {
    $status = curl_multi_exec($mh, $running);
    if ($running) {
        curl_multi_select($mh);
    }
    
    while ($info = curl_multi_info_read($mh)) {
        $ch = $info['handle'];
        $index = curl_getinfo($ch, CURLINFO_PRIVATE);
        $content = curl_multi_getcontent($ch);
        
        echo "Response $index: " . substr($content, 0, 50) . "...\n";
        
        curl_multi_remove_handle($mh, $ch);
        curl_close($ch);
    }
} while ($running &amp;&amp; $status == CURLM_OK);

curl_multi_close($mh);

We process responses as they become available using curl_multi_info_read.
Each handle stores its index via CURLOPT_PRIVATE. This allows us to track
which request each response belongs to. Responses are processed immediately.

## POST Requests with Different Data

This example demonstrates parallel POST requests with different data payloads.

multi_post.php
  

&lt;?php

declare(strict_types=1);

$posts = [
    ['title' =&gt;  'First Post', 'body' =&gt;  'Content 1', 'userId' =&gt;  1],
    ['title' =&gt;  'Second Post', 'body' =&gt;  'Content 2', 'userId' =&gt;  2],
    ['title' =&gt;  'Third Post', 'body' =&gt;  'Content 3', 'userId' =&gt;  3]
];

$mh = curl_multi_init();
$handles = [];

foreach ($posts as $i =&gt;  $post) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'https://jsonplaceholder.typicode.com/posts');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($post));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json'
    ]);
    curl_setopt($ch, CURLOPT_PRIVATE, $i);
    curl_multi_add_handle($mh, $ch);
    $handles[$i] = $ch;
}

do {
    $status = curl_multi_exec($mh, $running);
    if ($running) {
        curl_multi_select($mh);
    }
    
    while ($info = curl_multi_info_read($mh)) {
        $ch = $info['handle'];
        $index = curl_getinfo($ch, CURLINFO_PRIVATE);
        $response = curl_multi_getcontent($ch);
        
        echo "Post $index created: " . $response . "\n";
        
        curl_multi_remove_handle($mh, $ch);
        curl_close($ch);
    }
} while ($running &amp;&amp; $status == CURLM_OK);

curl_multi_close($mh);

We send three different POST requests in parallel. Each request has unique
JSON data. The responses are processed as they complete. We maintain the
association between requests and responses using CURLOPT_PRIVATE.

## Error Handling in Parallel Requests

This example shows proper error handling for multiple concurrent requests.

error_handling.php
  

&lt;?php

declare(strict_types=1);

$urls = [
    'https://jsonplaceholder.typicode.com/posts/1', // Valid
    'https://jsonplaceholder.typicode.com/nonexistent', // 404
    'https://invalid-url.example.com' // Invalid
];

$mh = curl_multi_init();
$handles = [];

foreach ($urls as $i =&gt;  $url) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_PRIVATE, $i);
    curl_setopt($ch, CURLOPT_FAILONERROR, true);
    curl_multi_add_handle($mh, $ch);
    $handles[$i] = $ch;
}

do {
    $status = curl_multi_exec($mh, $running);
    if ($running) {
        curl_multi_select($mh);
    }
    
    while ($info = curl_multi_info_read($mh)) {
        $ch = $info['handle'];
        $index = curl_getinfo($ch, CURLINFO_PRIVATE);
        
        if ($info['result'] !== CURLE_OK) {
            echo "Request $index failed: " . curl_error($ch) . "\n";
        } else {
            $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            if ($httpCode &gt;= 400) {
                echo "Request $index returned HTTP $httpCode\n";
            } else {
                echo "Request $index succeeded\n";
            }
        }
        
        curl_multi_remove_handle($mh, $ch);
        curl_close($ch);
    }
} while ($running &amp;&amp; $status == CURLM_OK);

curl_multi_close($mh);

We demonstrate handling different types of errors in parallel requests.
CURLOPT_FAILONERROR helps detect HTTP errors. We check both cURL errors
and HTTP status codes. Each error is properly associated with its request.

## Limiting Concurrent Requests

This example shows how to limit the number of concurrent requests.

concurrency_limit.php
  

&lt;?php

declare(strict_types=1);

$urls = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2',
    'https://jsonplaceholder.typicode.com/posts/3',
    'https://jsonplaceholder.typicode.com/posts/4',
    'https://jsonplaceholder.typicode.com/posts/5'
];

$maxConcurrent = 2; // Maximum concurrent requests
$mh = curl_multi_init();
$activeHandles = [];
$allHandles = [];
$processed = 0;

while ($processed &lt; count($urls)) {
    // Add new handles until we reach max concurrent or run out of URLs
    while (count($activeHandles) &lt; $maxConcurrent &amp;&amp; $processed &lt; count($urls)) {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $urls[$processed]);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_PRIVATE, $processed);
        curl_multi_add_handle($mh, $ch);
        $activeHandles[] = $ch;
        $allHandles[$processed] = $ch;
        $processed++;
    }
    
    // Process active handles
    do {
        $status = curl_multi_exec($mh, $running);
        if ($running) {
            curl_multi_select($mh);
        }
        
        while ($info = curl_multi_info_read($mh)) {
            $ch = $info['handle'];
            $index = curl_getinfo($ch, CURLINFO_PRIVATE);
            
            if ($info['result'] === CURLE_OK) {
                echo "Request $index completed: " . 
                    substr(curl_multi_getcontent($ch), 0, 30) . "...\n";
            }
            
            // Remove completed handle from active list
            $key = array_search($ch, $activeHandles, true);
            if ($key !== false) {
                unset($activeHandles[$key]);
            }
            
            curl_multi_remove_handle($mh, $ch);
            curl_close($ch);
        }
    } while ($running &amp;&amp; $status == CURLM_OK);
}

curl_multi_close($mh);

We maintain a pool of active handles limited to $maxConcurrent. As requests
complete, new ones are added to the pool. This prevents overwhelming servers
with too many simultaneous requests. The approach is useful for large batches.

## Best Practices

- **Handle Limits:** Don't add too many handles at once.

- **Error Checking:** Verify curl_multi_add_handle return value.

- **Resource Cleanup:** Always remove and close handles.

- **Concurrency:** Limit simultaneous requests when needed.

- **Timeouts:** Set CURLOPT_TIMEOUT for each handle.

## Source

[PHP curl_multi_add_handle Documentation](https://www.php.net/manual/en/function.curl-multi-add-handle.php)

This tutorial covered the PHP curl_multi_add_handle function with
practical examples showing parallel request processing in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP cURL tutorials](/php/#php-curl).