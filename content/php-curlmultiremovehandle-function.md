+++
title = "PHP curl_multi_remove_handle Function"
date = 2025-08-29T20:05:31.343+01:00
draft = false
description = "PHP curl_multi_remove_handle function tutorial shows how to remove cURL handles from multi handles. Learn with practical examples."
image = ""
imageBig = ""
categories = ["php-curl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP curl_multi_remove_handle Function

last modified April 11, 2025

The PHP curl_multi_remove_handle function removes a cURL handle from
a multi handle. It's used in concurrent request processing to manage individual
handles within a multi-handle context.

## Basic Definition

The curl_multi_remove_handle function removes a standard cURL handle
from a multi handle. This is typically done after the handle has completed its
request. The function returns 0 on success or CURLM_* error codes.

Syntax: curl_multi_remove_handle(CurlMultiHandle $multi_handle, CurlHandle $handle): int.
Both handles must be valid and initialized. Always remove handles before closing
them to prevent resource leaks.

## Basic Multi Handle Removal

This example demonstrates the basic usage of removing a handle from a multi handle.

basic_removal.php
  

&lt;?php

declare(strict_types=1);

$mh = curl_multi_init();
$ch1 = curl_init('https://api.example.com/data1');
$ch2 = curl_init('https://api.example.com/data2');

curl_multi_add_handle($mh, $ch1);
curl_multi_add_handle($mh, $ch2);

// Execute the multi handle
$running = null;
do {
    curl_multi_exec($mh, $running);
} while ($running &gt; 0);

// Remove handles after completion
curl_multi_remove_handle($mh, $ch1);
curl_multi_remove_handle($mh, $ch2);

curl_multi_close($mh);
curl_close($ch1);
curl_close($ch2);

This code creates a multi handle and adds two cURL handles. After executing all
requests, it properly removes each handle before closing them. This prevents
resource leaks and ensures clean cleanup.

## Selective Handle Removal

This example shows how to selectively remove handles based on response status.

selective_removal.php
  

&lt;?php

declare(strict_types=1);

$mh = curl_multi_init();
$handles = [];

for ($i = 1; $i &lt;= 5; $i++) {
    $ch = curl_init("https://jsonplaceholder.typicode.com/posts/$i");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_multi_add_handle($mh, $ch);
    $handles[] = $ch;
}

do {
    curl_multi_exec($mh, $running);
    curl_multi_select($mh);
} while ($running &gt; 0);

foreach ($handles as $handle) {
    $httpCode = curl_getinfo($handle, CURLINFO_HTTP_CODE);
    if ($httpCode === 200) {
        $response = curl_multi_getcontent($handle);
        echo "Success: " . substr($response, 0, 50) . "...\n";
    }
    curl_multi_remove_handle($mh, $handle);
    curl_close($handle);
}

curl_multi_close($mh);

We create multiple requests and process them concurrently. After completion, we
check each response status and only output successful ones. All handles are
properly removed and closed regardless of status.

## Error Handling with Removal

This example demonstrates proper error handling when removing handles.

error_handling.php
  

&lt;?php

declare(strict_types=1);

$mh = curl_multi_init();
$ch1 = curl_init('https://invalid.url');
$ch2 = curl_init('https://jsonplaceholder.typicode.com/posts/1');

curl_multi_add_handle($mh, $ch1);
curl_multi_add_handle($mh, $ch2);

do {
    curl_multi_exec($mh, $running);
    curl_multi_select($mh);
} while ($running &gt; 0);

// Process and remove handles
$handles = [$ch1, $ch2];
foreach ($handles as $handle) {
    $errno = curl_errno($handle);
    if ($errno !== 0) {
        echo "Error: " . curl_error($handle) . "\n";
    } else {
        echo "Success: " . substr(curl_multi_getcontent($handle), 0, 50) . "...\n";
    }
    
    $result = curl_multi_remove_handle($mh, $handle);
    if ($result !== CURLM_OK) {
        echo "Warning: Failed to remove handle (" . curl_multi_strerror($result) . ")\n";
    }
    curl_close($handle);
}

curl_multi_close($mh);

We handle both successful and failed requests. The code checks for cURL errors
and also verifies the removal operation was successful. This ensures robust
error handling in production environments.

## Dynamic Handle Management

This example shows dynamic addition and removal of handles during execution.

dynamic_management.php
  

&lt;?php

declare(strict_types=1);

$mh = curl_multi_init();
$activeHandles = 0;

function addRequest($mh, &amp;$activeHandles, $url) {
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_multi_add_handle($mh, $ch);
    $activeHandles++;
    return $ch;
}

// Initial requests
$ch1 = addRequest($mh, $activeHandles, 'https://jsonplaceholder.typicode.com/posts/1');
$ch2 = addRequest($mh, $activeHandles, 'https://jsonplaceholder.typicode.com/posts/2');

do {
    curl_multi_exec($mh, $running);
    
    // Check for completed requests
    while ($info = curl_multi_info_read($mh)) {
        if ($info['msg'] === CURLMSG_DONE) {
            $handle = $info['handle'];
            echo "Completed: " . curl_getinfo($handle, CURLINFO_EFFECTIVE_URL) . "\n";
            
            curl_multi_remove_handle($mh, $handle);
            curl_close($handle);
            $activeHandles--;
            
            // Add new request when one completes
            if ($activeHandles &lt; 2) {
                $newId = rand(3, 10);
                addRequest($mh, $activeHandles, "https://jsonplaceholder.typicode.com/posts/$newId");
            }
        }
    }
    
    curl_multi_select($mh);
} while ($activeHandles &gt; 0);

curl_multi_close($mh);

This code maintains a pool of active requests. When a request completes, it's
removed and a new one is added. This pattern is useful for rate-limited APIs
or when processing large numbers of URLs.

## Complex Multi Handle Scenario

This example demonstrates a complex scenario with different request types.

complex_scenario.php
  

&lt;?php

declare(strict_types=1);

$mh = curl_multi_init();
$handles = [];

// Create GET requests
for ($i = 1; $i &lt;= 3; $i++) {
    $ch = curl_init("https://jsonplaceholder.typicode.com/posts/$i");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_multi_add_handle($mh, $ch);
    $handles[] = ['type' =&gt;  'GET', 'handle' =&gt;  $ch];
}

// Create POST request
$postData = json_encode(['title' =&gt;  'foo', 'body' =&gt;  'bar', 'userId' =&gt;  1]);
$ch = curl_init("https://jsonplaceholder.typicode.com/posts");
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER =&gt;  true,
    CURLOPT_POST =&gt;  true,
    CURLOPT_POSTFIELDS =&gt;  $postData,
    CURLOPT_HTTPHEADER =&gt;  ['Content-Type: application/json']
]);
curl_multi_add_handle($mh, $ch);
$handles[] = ['type' =&gt;  'POST', 'handle' =&gt;  $ch];

// Process all requests
do {
    curl_multi_exec($mh, $running);
    curl_multi_select($mh);
} while ($running &gt; 0);

// Process responses and clean up
foreach ($handles as $item) {
    $ch = $item['handle'];
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    
    echo "{$item['type']} request to " . curl_getinfo($ch, CURLINFO_EFFECTIVE_URL);
    echo " returned $httpCode\n";
    
    curl_multi_remove_handle($mh, $ch);
    curl_close($ch);
}

curl_multi_close($mh);

This example mixes GET and POST requests in the same multi handle. Each request
is tracked with its type for proper processing. After execution, all handles
are properly removed and closed, demonstrating comprehensive resource management.

## Best Practices

- **Always Remove Handles:** Remove before closing to prevent leaks.

- **Check Removal Result:** Verify curl_multi_remove_handle success.

- **Order Matters:** Remove handles before closing them.

- **Error Handling:** Check both execution and removal errors.

- **Resource Tracking:** Keep track of handles in complex scenarios.

## Source

[PHP curl_multi_remove_handle Documentation](https://www.php.net/manual/en/function.curl-multi-remove-handle.php)

This tutorial covered the PHP curl_multi_remove_handle function with
practical examples showing its usage in various concurrent request scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP cURL tutorials](/php/#php-curl).