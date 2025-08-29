+++
title = "PHP curl_multi_init Function"
date = 2025-08-29T20:05:31.328+01:00
draft = false
description = "PHP curl_multi_init function tutorial shows how to execute multiple cURL requests in parallel. Learn curl_multi_init with practical examples."
image = ""
imageBig = ""
categories = ["php-curl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP curl_multi_init Function

last modified April 11, 2025

The PHP curl_multi_init function creates a multi cURL handle. 
It allows processing multiple cURL handles asynchronously. This is useful 
for making parallel HTTP requests efficiently.

## Basic Definition

The curl_multi_init function initializes a new multi cURL handle. 
It returns a resource that can be used with other curl_multi functions. 
This handle manages multiple individual cURL handles.

Syntax: curl_multi_init(): CurlMultiHandle. The function takes 
no parameters and returns a multi cURL handle. Always clean up with 
curl_multi_close() when done.

## Basic Parallel Requests

This example demonstrates making two parallel HTTP GET requests.

basic_parallel.php
  

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
    curl_multi_select($mh);
} while ($running &gt; 0);

foreach ($handles as $ch) {
    echo curl_multi_getcontent($ch) . "\n";
    curl_multi_remove_handle($mh, $ch);
    curl_close($ch);
}

curl_multi_close($mh);

This code fetches two posts simultaneously. We create individual handles 
for each URL and add them to the multi handle. The loop processes all 
requests until completion. Finally, we retrieve and output the responses.

## Handling Responses with Callbacks

This example shows how to process responses as they complete using callbacks.

callback_processing.php
  

&lt;?php

declare(strict_types=1);

$urls = [
    "https://jsonplaceholder.typicode.com/users/1",
    "https://jsonplaceholder.typicode.com/users/2",
    "https://jsonplaceholder.typicode.com/users/3"
];

$mh = curl_multi_init();
$handles = [];

foreach ($urls as $i =&gt;  $url) {
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HEADER, false);
    curl_multi_add_handle($mh, $ch);
    $handles[$i] = $ch;
}

$processed = 0;
do {
    curl_multi_exec($mh, $running);
    while ($info = curl_multi_info_read($mh)) {
        $ch = $info['handle'];
        $content = curl_multi_getcontent($ch);
        $index = array_search($ch, $handles, true);
        
        echo "Response $index: " . substr($content, 0, 50) . "...\n";
        $processed++;
        
        curl_multi_remove_handle($mh, $ch);
        curl_close($ch);
    }
    if ($running) {
        curl_multi_select($mh);
    }
} while ($running || $processed &lt; count($urls));

curl_multi_close($mh);

We process responses as they become available using curl_multi_info_read. 
Each completed request triggers our callback logic. This approach is more 
efficient than waiting for all requests to finish. We track processed 
requests to ensure we handle all responses.

## Setting Timeouts for Parallel Requests

This example demonstrates setting individual timeouts for parallel requests.

timeout_handling.php
  

&lt;?php

declare(strict_types=1);

$urls = [
    ["url" =&gt;  "https://httpbin.org/delay/2", "timeout" =&gt;  3],
    ["url" =&gt;  "https://httpbin.org/delay/5", "timeout" =&gt;  1]
];

$mh = curl_multi_init();
$handles = [];

foreach ($urls as $i =&gt;  $item) {
    $ch = curl_init($item['url']);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, $item['timeout']);
    curl_multi_add_handle($mh, $ch);
    $handles[$i] = $ch;
}

$running = null;
do {
    curl_multi_exec($mh, $running);
    curl_multi_select($mh);
} while ($running &gt; 0);

foreach ($handles as $i =&gt;  $ch) {
    $errno = curl_errno($ch);
    if ($errno === CURLE_OPERATION_TIMEDOUT) {
        echo "Request $i timed out\n";
    } else {
        echo "Request $i completed: " . 
             substr(curl_multi_getcontent($ch), 0, 30) . "...\n";
    }
    curl_multi_remove_handle($mh, $ch);
    curl_close($ch);
}

curl_multi_close($mh);

We set different timeouts for each request. The second request will timeout 
after 1 second while the first completes successfully. We check for timeout 
errors using curl_errno. This pattern is useful for handling slow responses.

## Processing Large Number of URLs

This example shows how to efficiently process many URLs with concurrency control.

batch_processing.php
  

&lt;?php

declare(strict_types=1);

function fetchUrls(array $urls, int $concurrency = 5): array {
    $mh = curl_multi_init();
    $results = [];
    $active = [];
    
    // Initialize first batch
    for ($i = 0; $i &lt; min($concurrency, count($urls)); $i++) {
        $ch = curl_init($urls[$i]);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_multi_add_handle($mh, $ch);
        $active[$i] = true;
    }
    
    $nextUrl = $concurrency;
    $processed = 0;
    
    do {
        curl_multi_exec($mh, $running);
        curl_multi_select($mh);
        
        while ($info = curl_multi_info_read($mh)) {
            $ch = $info['handle'];
            $index = array_search($ch, $active, true);
            
            if ($index !== false) {
                $results[$index] = curl_multi_getcontent($ch);
                curl_multi_remove_handle($mh, $ch);
                curl_close($ch);
                $processed++;
                
                // Add next URL if available
                if ($nextUrl &lt; count($urls)) {
                    $ch = curl_init($urls[$nextUrl]);
                    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                    curl_multi_add_handle($mh, $ch);
                    $active[$nextUrl] = $ch;
                    $nextUrl++;
                }
            }
        }
    } while ($running || $processed &lt; count($urls));
    
    curl_multi_close($mh);
    return $results;
}

$urls = array_fill(0, 20, "https://jsonplaceholder.typicode.com/posts/1");
$results = fetchUrls($urls, 5);

echo "Fetched " . count($results) . " responses\n";

This implementation processes URLs in batches to control concurrency. 
We maintain a pool of active connections and replace completed ones. 
The function returns all responses in order. This approach prevents 
overloading servers with too many simultaneous requests.

## Error Handling in Parallel Requests

This example demonstrates comprehensive error handling for parallel requests.

error_handling.php
  

&lt;?php

declare(strict_types=1);

$urls = [
    "https://valid.example.com/api",
    "https://invalid.example.com/api",
    "https://timeout.example.com/api"
];

$mh = curl_multi_init();
$handles = [];

foreach ($urls as $i =&gt;  $url) {
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 5);
    curl_setopt($ch, CURLOPT_FAILONERROR, true);
    curl_multi_add_handle($mh, $ch);
    $handles[$i] = [
        'handle' =&gt;  $ch,
        'url' =&gt;  $url
    ];
}

$running = null;
do {
    curl_multi_exec($mh, $running);
    curl_multi_select($mh);
} while ($running &gt; 0);

foreach ($handles as $i =&gt;  $item) {
    $ch = $item['handle'];
    $errno = curl_errno($ch);
    
    if ($errno) {
        echo "Request $i failed (" . $item['url'] . "): " . 
             curl_error($ch) . "\n";
    } else {
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        if ($httpCode &gt;= 200 &amp;&amp; $httpCode &lt; 300) {
            echo "Request $i succeeded: " . 
                 substr(curl_multi_getcontent($ch), 0, 50) . "...\n";
        } else {
            echo "Request $i returned HTTP $httpCode\n";
        }
    }
    
    curl_multi_remove_handle($mh, $ch);
    curl_close($ch);
}

curl_multi_close($mh);

We implement robust error checking for each request. The code checks for 
cURL errors, HTTP status codes, and timeouts. Each failure is logged with 
details about what went wrong. Successful responses are processed normally.

## Best Practices

- **Concurrency Control:** Limit simultaneous connections.

- **Error Handling:** Check both cURL and HTTP errors.

- **Resource Cleanup:** Always remove and close handles.

- **Timeout Settings:** Set reasonable timeouts per request.

- **Memory Management:** Process responses as they arrive.

## Source

[PHP curl_multi_init Documentation](https://www.php.net/manual/en/function.curl-multi-init.php)

This tutorial covered the PHP curl_multi_init function with 
practical examples showing parallel request processing. The examples 
demonstrated various real-world scenarios and best practices.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP cURL tutorials](/php/#php-curl).