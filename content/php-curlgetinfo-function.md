+++
title = "PHP curl_getinfo Function"
date = 2025-08-29T20:05:27.997+01:00
draft = false
description = "PHP curl_getinfo function tutorial shows how to get information about cURL transfers in PHP. Learn curl_getinfo with practical examples."
image = ""
imageBig = ""
categories = ["php-curl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP curl_getinfo Function

last modified April 11, 2025

The PHP curl_getinfo function retrieves information about a cURL
transfer. It provides details like response codes, timings, and other metadata.
This is useful for debugging and logging HTTP requests.

## Basic Definition

The curl_getinfo function returns information about the last cURL
transfer. It accepts a cURL handle and an optional info parameter. Without the
second parameter, it returns all available information as an array.

Syntax: curl_getinfo(CurlHandle $handle, ?int $option = null): mixed.
The function should be called after curl_exec. Different options
return specific pieces of information about the transfer.

## Getting Basic Request Information

This example shows how to get basic information about a cURL request.

basic_info.php
  

&lt;?php

declare(strict_types=1);

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://jsonplaceholder.typicode.com/posts/1");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
$info = curl_getinfo($ch);

echo "HTTP Code: " . $info['http_code'] . "\n";
echo "Total Time: " . $info['total_time'] . " seconds\n";
echo "URL: " . $info['url'] . "\n";

curl_close($ch);

This code fetches information about a GET request. We retrieve the HTTP status
code, total request time, and final URL. The info array contains many other
useful metrics about the transfer.

## Checking Specific Information

This example demonstrates how to get specific pieces of information.

specific_info.php
  

&lt;?php

declare(strict_types=1);

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://jsonplaceholder.typicode.com/posts");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);

$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$contentType = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
$size = curl_getinfo($ch, CURLINFO_SIZE_DOWNLOAD);

echo "HTTP Status: $httpCode\n";
echo "Content Type: $contentType\n";
echo "Download Size: $size bytes\n";

curl_close($ch);

We fetch specific information using constant options. CURLINFO_HTTP_CODE gets
the response status, CURLINFO_CONTENT_TYPE gets the content type header, and
CURLINFO_SIZE_DOWNLOAD gets the downloaded size. This is more efficient than
getting the full info array.

## Measuring Request Timings

This example shows how to measure different timing metrics of a request.

timing_info.php
  

&lt;?php

declare(strict_types=1);

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://jsonplaceholder.typicode.com/users");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
$info = curl_getinfo($ch);

echo "Name Lookup Time: " . $info['namelookup_time'] . "s\n";
echo "Connect Time: " . $info['connect_time'] . "s\n";
echo "Pretransfer Time: " . $info['pretransfer_time'] . "s\n";
echo "Start Transfer Time: " . $info['starttransfer_time'] . "s\n";
echo "Total Time: " . $info['total_time'] . "s\n";

curl_close($ch);

We measure different timing aspects of the request. Name lookup time is DNS
resolution, connect time is TCP handshake, pretransfer is until transfer
starts, and start transfer is until first byte. These help identify bottlenecks.

## Checking Redirect Information

This example demonstrates how to get information about redirects.

redirect_info.php
  

&lt;?php

declare(strict_types=1);

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "http://example.com"); // Redirects to https
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);

$response = curl_exec($ch);
$info = curl_getinfo($ch);

echo "Final URL: " . $info['url'] . "\n";
echo "Redirect Count: " . $info['redirect_count'] . "\n";
echo "Redirect Time: " . $info['redirect_time'] . "s\n";
echo "Original URL: " . $info['original_url'] . "\n";

curl_close($ch);

We track redirect information for a URL that redirects. The final URL shows
where we ended up, redirect_count shows how many hops, and redirect_time
shows total time spent on redirects. FOLLOWLOCATION must be enabled for this.

## Getting SSL Certificate Information

This example shows how to retrieve SSL certificate details.

ssl_info.php
  

&lt;?php

declare(strict_types=1);

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://example.com");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

$response = curl_exec($ch);
$info = curl_getinfo($ch);

echo "SSL Verify Result: " . $info['ssl_verify_result'] . "\n";
echo "SSL Version: " . $info['ssl_version'] . "\n";
echo "Certificate Info:\n";
print_r(curl_getinfo($ch, CURLINFO_CERTINFO));

curl_close($ch);

We retrieve SSL/TLS information about the secure connection. ssl_verify_result
shows certificate verification status, ssl_version shows the protocol version.
CURLINFO_CERTINFO returns detailed certificate information as an array.

## Best Practices

- **Call Timing:** Always call after curl_exec for accurate data.

- **Specific Options:** Use specific options for better performance.

- **Error Checking:** Verify curl_exec success before getting info.

- **Logging:** Useful for debugging and monitoring requests.

- **Performance:** Avoid getting full info array if not needed.

## Source

[PHP curl_getinfo Documentation](https://www.php.net/manual/en/function.curl-getinfo.php)

This tutorial covered the PHP curl_getinfo function with practical
examples showing how to retrieve various metrics about cURL transfers.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP cURL tutorials](/php/#php-curl).