+++
title = "PHP curl_multi_getcontent Function"
date = 2025-08-29T20:05:30.229+01:00
draft = false
description = "PHP curl_multi_getcontent function tutorial shows how to get content from multiple cURL handles. Learn curl_multi_getcontent with practical examples."
image = ""
imageBig = ""
categories = ["php-curl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP curl_multi_getcontent Function

last modified April 11, 2025

The PHP curl_multi_getcontent function retrieves content from a
cURL handle when used with the multi interface. It's used to fetch response
data after executing multiple parallel cURL requests.

## Basic Definition

The curl_multi_getcontent function returns the content of a cURL
handle if CURLOPT_RETURNTRANSFER was set. It works with the cURL
multi interface for parallel requests.

Syntax: curl_multi_getcontent(CurlHandle $handle): ?string. The
handle must be part of a multi handle execution. Returns NULL if no content is
available or FALSE on failure.

## Basic Multiple Requests

This example demonstrates making two parallel requests and getting their
contents.

basic_multi.php
  

&lt;?php

declare(strict_types=1);

$urls = [
    "https://jsonplaceholder.typicode.com/posts/1",
    "https://jsonplaceholder.typicode.com/posts/2"
];

$mh = curl_multi_init();
$handles = [];

foreach ($urls as $url) {
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_multi_add_handle($mh, $ch);
    $handles[] = $ch;
}

$running = null;
do {
    curl_multi_exec($mh, $running);
} while ($running);

foreach ($handles as $ch) {
    $content = curl_multi_getcontent($ch);
    echo $content . "\n";
    curl_multi_remove_handle($mh, $ch);
    curl_close($ch);
}

curl_multi_close($mh);

This code creates two parallel requests to fetch posts. We use curl_multi_exec
to process them simultaneously. After execution, we retrieve each response
using curl_multi_getcontent. Always clean up handles properly.

## Handling Multiple JSON Responses

This example shows how to process multiple JSON responses from parallel
requests.

multi_json.php
  

&lt;?php

declare(strict_types=1);

$userIds = [1, 2, 3];
$mh = curl_multi_init();
$handles = [];

foreach ($userIds as $id) {
    $url = "https://jsonplaceholder.typicode.com/users/{$id}";
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_multi_add_handle($mh, $ch);
    $handles[$id] = $ch;
}

$running = null;
do {
    curl_multi_exec($mh, $running);
} while ($running);

$results = [];
foreach ($handles as $id =&gt;  $ch) {
    $content = curl_multi_getcontent($ch);
    $results[$id] = json_decode($content, true);
    curl_multi_remove_handle($mh, $ch);
    curl_close($ch);
}

curl_multi_close($mh);

print_r($results);

We fetch three user records in parallel. Each response is decoded from JSON
and stored in an array. The results maintain association with their original
user IDs. This demonstrates efficient batch processing of API data.

## Error Handling in Multi Requests

This example demonstrates proper error handling for multiple cURL requests.

multi_error.php
  

&lt;?php

declare(strict_types=1);

$urls = [
    "https://jsonplaceholder.typicode.com/posts/1",
    "https://invalid.url",
    "https://jsonplaceholder.typicode.com/comments/1"
];

$mh = curl_multi_init();
$handles = [];

foreach ($urls as $i =&gt;  $url) {
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    curl_multi_add_handle($mh, $ch);
    $handles[$i] = $ch;
}

$running = null;
do {
    curl_multi_exec($mh, $running);
} while ($running);

foreach ($handles as $i =&gt;  $ch) {
    $content = curl_multi_getcontent($ch);
    $error = curl_error($ch);
    
    if ($error) {
        echo "Request {$i} failed: {$error}\n";
    } else {
        echo "Request {$i} succeeded:\n";
        echo substr($content, 0, 100) . "...\n";
    }
    
    curl_multi_remove_handle($mh, $ch);
    curl_close($ch);
}

curl_multi_close($mh);

We process three URLs where one is intentionally invalid. For each request,
we check for errors using curl_error. The example shows how to handle both
successful and failed requests in a batch operation.

## Setting Custom Options for Multi Requests

This example shows how to set different options for each request in a batch.

multi_options.php
  

&lt;?php

declare(strict_types=1);

$requests = [
    [
        'url' =&gt;  'https://jsonplaceholder.typicode.com/posts/1',
        'method' =&gt;  'GET'
    ],
    [
        'url' =&gt;  'https://jsonplaceholder.typicode.com/posts',
        'method' =&gt;  'POST',
        'data' =&gt;  ['title' =&gt;  'foo', 'body' =&gt;  'bar', 'userId' =&gt;  1]
    ]
];

$mh = curl_multi_init();
$handles = [];

foreach ($requests as $req) {
    $ch = curl_init($req['url']);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    
    if ($req['method'] === 'POST') {
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $req['data']);
    }
    
    curl_multi_add_handle($mh, $ch);
    $handles[] = $ch;
}

$running = null;
do {
    curl_multi_exec($mh, $running);
} while ($running);

foreach ($handles as $i =&gt;  $ch) {
    $content = curl_multi_getcontent($ch);
    echo "Response {$i}:\n";
    echo $content . "\n\n";
    curl_multi_remove_handle($mh, $ch);
    curl_close($ch);
}

curl_multi_close($mh);

We execute both GET and POST requests in parallel. Each handle gets configured
with its specific options before being added to the multi handle. This shows
the flexibility of the multi interface for different request types.

## Processing Large Number of Requests

This example demonstrates handling a large batch of requests efficiently.

large_batch.php
  

&lt;?php

declare(strict_types=1);

// Generate 10 URLs to fetch
$urls = array_map(
    fn($id) =&gt;  "https://jsonplaceholder.typicode.com/posts/{$id}",
    range(1, 10)
);

$mh = curl_multi_init();
$handles = [];
$results = [];
$concurrency = 5; // Process 5 at a time

foreach ($urls as $i =&gt;  $url) {
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 15);
    curl_multi_add_handle($mh, $ch);
    $handles[$i] = $ch;
    
    // Process in batches to avoid overwhelming the system
    if (count($handles) % $concurrency === 0) {
        $running = null;
        do {
            curl_multi_exec($mh, $running);
        } while ($running);
        
        // Process completed requests
        foreach ($handles as $j =&gt;  $ch) {
            if (curl_getinfo($ch, CURLINFO_HTTP_CODE) === 200) {
                $results[$j] = curl_multi_getcontent($ch);
            }
            curl_multi_remove_handle($mh, $ch);
            curl_close($ch);
        }
        
        $handles = [];
    }
}

// Process any remaining handles
if (!empty($handles)) {
    $running = null;
    do {
        curl_multi_exec($mh, $running);
    } while ($running);
    
    foreach ($handles as $j =&gt;  $ch) {
        if (curl_getinfo($ch, CURLINFO_HTTP_CODE) === 200) {
            $results[$j] = curl_multi_getcontent($ch);
        }
        curl_multi_remove_handle($mh, $ch);
        curl_close($ch);
    }
}

curl_multi_close($mh);

echo "Fetched " . count($results) . " responses\n";

This example processes 10 URLs in batches of 5 for better resource management.
We check HTTP status codes before storing results. The approach prevents
system overload when dealing with many requests. Results maintain their
original order for easy reference.

## Best Practices

- **Batch Size:** Limit concurrent requests to avoid system overload.

- **Error Handling:** Check both curl_multi_getcontent and curl_error.

- **Resource Cleanup:** Always remove and close handles properly.

- **Timeouts:** Set CURLOPT_TIMEOUT for each handle.

- **Memory:** Process responses in batches for large operations.

## Source

[PHP curl_multi_getcontent Documentation](https://www.php.net/manual/en/function.curl-multi-getcontent.php)

This tutorial covered the PHP curl_multi_getcontent function with
practical examples showing its usage for parallel HTTP request processing.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP cURL tutorials](/php/#php-curl).