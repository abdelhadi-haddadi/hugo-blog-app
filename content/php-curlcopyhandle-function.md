+++
title = "PHP curl_copy_handle Function"
date = 2025-08-29T20:05:25.763+01:00
draft = false
description = "PHP curl_copy_handle function tutorial shows how to copy cURL handles in PHP. Learn curl_copy_handle with practical examples."
image = ""
imageBig = ""
categories = ["php-curl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP curl_copy_handle Function

last modified April 11, 2025

The PHP curl_copy_handle function creates a copy of a cURL handle.
This is useful when you need to make similar requests with slight modifications.
The copied handle retains all options from the original.

## Basic Definition

The curl_copy_handle function duplicates a cURL handle. It returns
a new cURL handle with the same settings. Both handles can be used independently.

Syntax: curl_copy_handle(CurlHandle $handle): CurlHandle|false. The
function takes one parameter - the handle to copy. It returns a new handle or
false on failure.

## Basic Handle Copy

This example demonstrates how to create a basic copy of a cURL handle.

basic_copy.php
  

&lt;?php

declare(strict_types=1);

$ch = curl_init("https://jsonplaceholder.typicode.com/posts/1");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$ch_copy = curl_copy_handle($ch);

$response1 = curl_exec($ch);
$response2 = curl_exec($ch_copy);

echo "Original response: " . $response1 . "\n";
echo "Copied response: " . $response2;

curl_close($ch);
curl_close($ch_copy);

We create a cURL handle and set its options. Then we make a copy using
curl_copy_handle. Both handles are executed independently.
Each handle must be closed separately when no longer needed.

## Modifying Copied Handle

This example shows how to modify options on a copied handle.

modified_copy.php
  

&lt;?php

declare(strict_types=1);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://jsonplaceholder.typicode.com/posts/1");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$ch_copy = curl_copy_handle($ch);
curl_setopt($ch_copy, CURLOPT_URL, "https://jsonplaceholder.typicode.com/posts/2");

$response1 = curl_exec($ch);
$response2 = curl_exec($ch_copy);

echo "Original (post 1): " . $response1 . "\n";
echo "Copy (post 2): " . $response2;

curl_close($ch);
curl_close($ch_copy);

We create a base handle and copy it. Then we modify the URL in the copied
handle to fetch a different resource. This demonstrates how copied handles
can be customized while keeping shared configuration.

## Handling POST Requests

This example demonstrates copying a handle configured for POST requests.

post_copy.php
  

&lt;?php

declare(strict_types=1);

$ch = curl_init("https://jsonplaceholder.typicode.com/posts");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, [
    'title' =&gt;  'Original Post',
    'body' =&gt;  'Original content',
    'userId' =&gt;  1
]);

$ch_copy = curl_copy_handle($ch);
curl_setopt($ch_copy, CURLOPT_POSTFIELDS, [
    'title' =&gt;  'Copied Post',
    'body' =&gt;  'Modified content',
    'userId' =&gt;  2
]);

$response1 = curl_exec($ch);
$response2 = curl_exec($ch_copy);

echo "Original response: " . $response1 . "\n";
echo "Copied response: " . $response2;

curl_close($ch);
curl_close($ch_copy);

We create a POST request handle and copy it. The copied handle keeps the POST
configuration but we change the data being sent. This is useful for batch
operations with similar requests.

## Error Handling with Copied Handles

This example shows proper error handling when working with copied handles.

error_handling.php
  

&lt;?php

declare(strict_types=1);

$ch = curl_init("https://invalid.url.example");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 5);

$ch_copy = curl_copy_handle($ch);

$response1 = curl_exec($ch);
if ($response1 === false) {
    echo "Original handle error: " . curl_error($ch) . "\n";
}

curl_setopt($ch_copy, CURLOPT_URL, "https://jsonplaceholder.typicode.com/posts/1");
$response2 = curl_exec($ch_copy);

if ($response2 === false) {
    echo "Copied handle error: " . curl_error($ch_copy) . "\n";
} else {
    echo "Copied handle success: " . $response2;
}

curl_close($ch);
curl_close($ch_copy);

We create a handle with an invalid URL and copy it. The original handle fails
but we modify the copied handle to use a valid URL. Each handle's errors are
handled independently. This shows the isolation between copied handles.

## Performance Comparison

This example compares creating new handles versus copying existing ones.

performance.php
  

&lt;?php

declare(strict_types=1);

// Method 1: Create new handles each time
$start1 = microtime(true);
for ($i = 0; $i &lt; 10; $i++) {
    $ch = curl_init("https://jsonplaceholder.typicode.com/posts/$i");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_exec($ch);
    curl_close($ch);
}
$time1 = microtime(true) - $start1;

// Method 2: Copy a base handle
$start2 = microtime(true);
$base = curl_init();
curl_setopt($base, CURLOPT_RETURNTRANSFER, true);

for ($i = 0; $i &lt; 10; $i++) {
    $ch = curl_copy_handle($base);
    curl_setopt($ch, CURLOPT_URL, "https://jsonplaceholder.typicode.com/posts/$i");
    curl_exec($ch);
    curl_close($ch);
}
curl_close($base);
$time2 = microtime(true) - $start2;

echo "New handles each time: " . $time1 . " seconds\n";
echo "Copied handles: " . $time2 . " seconds\n";
echo "Difference: " . ($time1 - $time2) . " seconds";

We compare two approaches to making multiple similar requests. The first creates
new handles each time. The second copies a base handle. Copying is generally
faster for multiple similar requests as it avoids repeated initialization.

## Best Practices

- **Base Configuration:** Use copied handles for shared settings.

- **Resource Management:** Close all handles when done.

- **Error Handling:** Check each handle's execution separately.

- **Performance:** Copy handles for batch operations.

- **Isolation:** Changes to copies don't affect originals.

## Source

[PHP curl_copy_handle Documentation](https://www.php.net/manual/en/function.curl-copy-handle.php)

This tutorial covered the PHP curl_copy_handle function with practical
examples showing its usage for efficient cURL handle management.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP cURL tutorials](/php/#php-curl).