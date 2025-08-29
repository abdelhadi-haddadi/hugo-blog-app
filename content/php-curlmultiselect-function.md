+++
title = "PHP curl_multi_select Function"
date = 2025-08-29T20:05:31.346+01:00
draft = false
description = "PHP curl_multi_select function tutorial shows how to handle multiple cURL requests in PHP. Learn curl_multi_select with practical examples."
image = ""
imageBig = ""
categories = ["php-curl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP curl_multi_select Function

last modified April 11, 2025

The PHP curl_multi_select function waits for activity on any of the
cURL multi handles. It's used with curl_multi_exec to process
multiple cURL requests efficiently. This function helps avoid busy waiting.

## Basic Definition

The curl_multi_select function waits until there is activity on any
of the cURL multi handles. It returns the number of descriptors contained in
the descriptor sets, or -1 on failure.

Syntax: curl_multi_select(CurlMultiHandle $multi_handle, float $timeout = 1.0): int.
The timeout parameter specifies how long to wait in seconds. A timeout of 0
means immediate return.

## Basic Multiple Request Handling

This example demonstrates basic usage of curl_multi_select with multiple URLs.

basic_multi_select.php
  

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

$active = null;
do {
    $status = curl_multi_exec($mh, $active);
    if ($status &gt; 0) {
        break; // Error occurred
    }
    curl_multi_select($mh); // Wait for activity
} while ($active);

foreach ($handles as $ch) {
    echo curl_multi_getcontent($ch) . "\n";
    curl_multi_remove_handle($mh, $ch);
    curl_close($ch);
}

curl_multi_close($mh);

This code fetches three posts simultaneously. We create individual handles,
add them to the multi handle, then process them. The select call prevents
CPU-intensive busy waiting during execution.

## Custom Timeout Handling

This example shows how to use a custom timeout with curl_multi_select.

custom_timeout.php
  

&lt;?php

declare(strict_types=1);

$urls = [
    "https://httpbin.org/delay/1",
    "https://httpbin.org/delay/2",
    "https://httpbin.org/delay/3"
];

$mh = curl_multi_init();
$handles = [];

foreach ($urls as $url) {
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_multi_add_handle($mh, $ch);
    $handles[] = $ch;
}

$active = null;
$start = microtime(true);

do {
    $status = curl_multi_exec($mh, $active);
    if ($status &gt; 0) {
        break;
    }
    
    // Wait for up to 500ms for activity
    $select = curl_multi_select($mh, 0.5);
    
    if ($select === -1) {
        // Error occurred in select
        usleep(100000); // Sleep briefly to prevent CPU overload
    }
    
} while ($active &amp;&amp; (microtime(true) - $start &lt; 5)); // Max 5 seconds

foreach ($handles as $ch) {
    echo "Response length: " . strlen(curl_multi_getcontent($ch)) . "\n";
    curl_multi_remove_handle($mh, $ch);
    curl_close($ch);
}

curl_multi_close($mh);

We use a 500ms timeout and implement a maximum execution time of 5 seconds.
The code handles the -1 return value from select by sleeping briefly. This
approach provides better control over the execution flow.

## Handling Large Number of Requests

This example demonstrates processing a large number of requests efficiently.

large_requests.php
  

&lt;?php

declare(strict_types=1);

// Generate 10 test URLs
$urls = array_map(function($i) {
    return "https://jsonplaceholder.typicode.com/posts/" . ($i + 1);
}, range(0, 9));

$mh = curl_multi_init();
$handles = [];

// Add all handles at once
foreach ($urls as $url) {
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_multi_add_handle($mh, $ch);
    $handles[$url] = $ch;
}

$active = null;
$processed = 0;

do {
    $status = curl_multi_exec($mh, $active);
    
    if ($status === CURLM_OK) {
        // Wait for activity with 100ms timeout
        $select = curl_multi_select($mh, 0.1);
        
        if ($select &gt; 0) {
            // Process completed requests
            while ($info = curl_multi_info_read($mh)) {
                $ch = $info['handle'];
                $url = array_search($ch, $handles, true);
                
                if ($info['result'] === CURLE_OK) {
                    echo "Completed: $url\n";
                } else {
                    echo "Error: $url - " . curl_error($ch) . "\n";
                }
                
                curl_multi_remove_handle($mh, $ch);
                curl_close($ch);
                $processed++;
            }
        }
    }
} while ($active || $processed &lt; count($urls));

curl_multi_close($mh);

This code efficiently processes 10 requests. We use curl_multi_info_read to
check completed requests individually. The select timeout is set to 100ms for
responsive processing. Completed requests are handled immediately when detected.

## Error Handling and Timeouts

This example shows robust error handling with curl_multi_select.

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

foreach ($urls as $url) {
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 3); // Individual timeout
    curl_multi_add_handle($mh, $ch);
    $handles[] = $ch;
}

$active = null;
$start = time();

do {
    $status = curl_multi_exec($mh, $active);
    
    if ($status &gt; CURLM_OK) {
        echo "Multi error: " . curl_multi_strerror($status) . "\n";
        break;
    }
    
    $select = curl_multi_select($mh, 0.5);
    
    if ($select === -1) {
        echo "Select error occurred\n";
        usleep(100000);
    }
    
    // Global timeout check
    if (time() - $start &gt; 5) {
        echo "Global timeout reached\n";
        break;
    }
    
} while ($active);

foreach ($handles as $ch) {
    $info = curl_getinfo($ch);
    
    if (curl_errno($ch)) {
        echo "Error: " . curl_error($ch) . "\n";
    } else {
        echo "HTTP " . $info['http_code'] . " - " . $info['url'] . "\n";
    }
    
    curl_multi_remove_handle($mh, $ch);
    curl_close($ch);
}

curl_multi_close($mh);

We implement multiple layers of error handling. Each request has a 3-second
timeout, and the entire operation has a 5-second global timeout. We check for
both multi errors and select errors, providing appropriate feedback.

## Advanced Performance Optimization

This example demonstrates performance optimization techniques.

performance_optimization.php
  

&lt;?php

declare(strict_types=1);

$urls = [
    "https://api.example.com/resource1",
    "https://api.example.com/resource2",
    "https://api.example.com/resource3"
];

$mh = curl_multi_init();
$handles = [];

// Configure multi handle for better performance
curl_multi_setopt($mh, CURLMOPT_MAXCONNECTS, 10);
curl_multi_setopt($mh, CURLMOPT_PIPELINING, CURLPIPE_MULTIPLEX);

foreach ($urls as $url) {
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_ENCODING, 'gzip'); // Enable compression
    curl_setopt($ch, CURLOPT_TCP_NODELAY, true); // Disable Nagle's algorithm
    curl_multi_add_handle($mh, $ch);
    $handles[] = $ch;
}

$active = null;
$processed = 0;
$results = [];

do {
    $status = curl_multi_exec($mh, $active);
    
    if ($status === CURLM_OK) {
        // Use 0 timeout for non-blocking check
        $select = curl_multi_select($mh, 0);
        
        if ($select &gt; 0) {
            while ($info = curl_multi_info_read($mh)) {
                $ch = $info['handle'];
                $results[] = [
                    'content' =&gt;  curl_multi_getcontent($ch),
                    'info' =&gt;  curl_getinfo($ch)
                ];
                curl_multi_remove_handle($mh, $ch);
                curl_close($ch);
                $processed++;
            }
        } else {
            // Do other work here if no immediate activity
            usleep(10000); // 10ms delay
        }
    }
} while ($active || $processed &lt; count($urls));

curl_multi_close($mh);

// Process results
foreach ($results as $result) {
    echo "URL: " . $result['info']['url'] . "\n";
    echo "Time: " . $result['info']['total_time'] . "s\n\n";
}

This optimized implementation uses HTTP/2 multiplexing, gzip compression,
and TCP optimizations. We use non-blocking select with a 0 timeout to check
for immediate activity. The code can perform other work while waiting.

## Best Practices

- **Timeout Handling:** Always set reasonable timeouts.

- **Error Checking:** Verify curl_multi_select return values.

- **Resource Cleanup:** Remove and close all handles.

- **Performance:** Use HTTP/2 multiplexing when possible.

- **CPU Usage:** Avoid busy waiting with proper select usage.

## Source

[PHP curl_multi_select Documentation](https://www.php.net/manual/en/function.curl-multi-select.php)

This tutorial covered the PHP curl_multi_select function with
practical examples showing its usage for efficient multiple request handling.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP cURL tutorials](/php/#php-curl).