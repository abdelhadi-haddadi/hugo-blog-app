+++
title = "PHP curl_escape Function"
date = 2025-08-29T20:05:26.916+01:00
draft = false
description = "PHP curl_escape function tutorial shows how to encode URL strings in PHP cURL. Learn curl_escape with practical examples."
image = ""
imageBig = ""
categories = ["php-curl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP curl_escape Function

last modified April 11, 2025

The PHP curl_escape function URL-encodes a given string. It's part
of the cURL extension and is used to properly encode strings for use in URLs.
This function replaces unsafe ASCII characters with a % followed by two hex digits.

## Basic Definition

The curl_escape function encodes a string for use in a URL. It
returns the encoded string or FALSE on failure. The function requires an active
cURL handle and the string to encode.

Syntax: curl_escape(CurlHandle $handle, string $string): string|false.
The handle must be created with curl_init(). Always close the handle
with curl_close() after use.

## Basic String Encoding

This example demonstrates basic URL encoding of a simple string.

basic_encoding.php
  

&lt;?php

declare(strict_types=1);

$ch = curl_init();

$string = "Hello World!";
$encoded = curl_escape($ch, $string);

echo "Original: " . $string . "\n";
echo "Encoded: " . $encoded . "\n";

curl_close($ch);

This code encodes a simple string containing spaces and punctuation. The space
character is converted to %20, and the exclamation mark becomes %21. The output
shows both original and encoded versions.

## Encoding Query Parameters

This example shows how to properly encode query parameters for a URL.

query_parameters.php
  

&lt;?php

declare(strict_types=1);

$ch = curl_init();

$search = "PHP &amp; MySQL";
$encodedSearch = curl_escape($ch, $search);

$url = "https://example.com/search?q=" . $encodedSearch;
echo "Encoded URL: " . $url . "\n";

curl_close($ch);

We encode a search query containing spaces and special characters. The &amp; symbol
is converted to %26, and spaces become %20. This ensures the URL remains valid
and properly formatted when sent to the server.

## Encoding Path Segments

This example demonstrates encoding path segments for a URL.

path_segments.php
  

&lt;?php

declare(strict_types=1);

$ch = curl_init();

$category = "Programming Books";
$title = "PHP 8 Essentials";

$url = "https://example.com/" . 
       curl_escape($ch, $category) . "/" . 
       curl_escape($ch, $title);
       
echo "Encoded URL: " . $url . "\n";

curl_close($ch);

We encode multiple path segments containing spaces. Each segment is encoded
separately to maintain proper URL structure. Spaces in path segments are
converted to %20, ensuring the URL remains valid.

## Comparing with urlencode

This example compares curl_escape with PHP's built-in urlencode function.

compare_urlencode.php
  

&lt;?php

declare(strict_types=1);

$ch = curl_init();

$string = "user@example.com";

$curlEncoded = curl_escape($ch, $string);
$phpEncoded = urlencode($string);

echo "curl_escape: " . $curlEncoded . "\n";
echo "urlencode: " . $phpEncoded . "\n";

curl_close($ch);

We encode the same string with both functions to see differences. curl_escape
encodes the @ symbol as %40, while urlencode keeps it unchanged. curl_escape is
more aggressive in encoding special characters.

## Encoding Complex Strings

This example shows encoding of a complex string with various special characters.

complex_string.php
  

&lt;?php

declare(strict_types=1);

$ch = curl_init();

$complexString = "Price: $19.99 (50% off!) #deal";
$encoded = curl_escape($ch, $complexString);

echo "Original: " . $complexString . "\n";
echo "Encoded: " . $encoded . "\n";

curl_close($ch);

We encode a string containing spaces, dollar signs, percentages, parentheses,
and a hash symbol. Each special character is properly encoded for URL use. The
result shows how curl_escape handles various character types.

## Best Practices

- **Handle Initialization:** Always create a cURL handle first.

- **Error Checking:** Verify the function doesn't return FALSE.

- **Resource Cleanup:** Close handles with curl_close.

- **Context Matters:** Use for URLs, not form data encoding.

- **Special Characters:** Test with your specific use case.

## Source

[PHP curl_escape Documentation](https://www.php.net/manual/en/function.curl-escape.php)

This tutorial covered the PHP curl_escape function with practical
examples showing its usage for URL encoding in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP cURL tutorials](/php/#php-curl).