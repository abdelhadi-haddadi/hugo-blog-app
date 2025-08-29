+++
title = "PHP curl_unescape Function"
date = 2025-08-29T20:05:36.918+01:00
draft = false
description = "PHP curl_unescape function tutorial shows how to decode URL-encoded strings in PHP. Learn curl_unescape with practical examples."
image = ""
imageBig = ""
categories = ["php-curl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP curl_unescape Function

last modified April 11, 2025

The PHP curl_unescape function decodes URL-encoded strings. It's
part of the cURL extension and provides URL decoding functionality. This
function is useful when working with encoded URLs or query parameters.

## Basic Definition

The curl_unescape function decodes a URL-encoded string. It
returns the decoded string or FALSE on failure. The function requires an
active cURL handle as its first parameter.

Syntax: curl_unescape(CurlHandle $handle, string $string): string|false.
The handle must be created with curl_init(). This function
decodes plus signs (+) to spaces and percent-encoded characters.

## Basic URL Decoding

This example demonstrates basic URL decoding using curl_unescape.

basic_unescape.php
  

&lt;?php

declare(strict_types=1);

$ch = curl_init();
$encoded = "Hello%20World%21%20How%20are%20you%3F";

$decoded = curl_unescape($ch, $encoded);

if ($decoded === false) {
    echo "Decoding failed";
} else {
    echo "Decoded string: " . $decoded;
}

curl_close($ch);

This code decodes a URL-encoded string containing spaces and punctuation.
The %20 sequences become spaces, and %21 becomes an exclamation mark.
Always check the return value for potential failures.

## Decoding Query Parameters

This example shows how to decode URL query parameters with curl_unescape.

query_unescape.php
  

&lt;?php

declare(strict_types=1);

$ch = curl_init();
$query = "name=John%20Doe&amp;age=30&amp;city=New%20York";

$parts = explode("&amp;", $query);

foreach ($parts as $part) {
    list($key, $value) = explode("=", $part);
    $decodedValue = curl_unescape($ch, $value);
    echo "$key: $decodedValue\n";
}

curl_close($ch);

We decode each value in a URL query string separately. The string is split
into key-value pairs, then each value is decoded. This approach is useful
when processing URL parameters from $_GET or $_REQUEST.

## Comparing with urldecode

This example compares curl_unescape with PHP's built-in urldecode function.

compare_unescape.php
  

&lt;?php

declare(strict_types=1);

$ch = curl_init();
$encoded = "price%3D100%24%26discount%3D15%25";

$curl_decoded = curl_unescape($ch, $encoded);
$php_decoded = urldecode($encoded);

echo "curl_unescape: $curl_decoded\n";
echo "urldecode: $php_decoded\n";

curl_close($ch);

Both functions produce the same output for standard URL encoding. However,
curl_unescape requires a cURL handle while urldecode doesn't. The cURL
version might be preferred in cURL-heavy applications for consistency.

## Handling Special Characters

This example demonstrates decoding strings with special characters.

special_chars.php
  

&lt;?php

declare(strict_types=1);

$ch = curl_init();
$encoded = "%E2%82%AC%20100%2C%20%C2%A3100%2C%20%24100";

$decoded = curl_unescape($ch, $encoded);

if ($decoded === false) {
    echo "Failed to decode special characters";
} else {
    echo "Decoded currencies: " . $decoded;
}

curl_close($ch);

We decode a string containing percent-encoded Unicode characters for
different currency symbols. curl_unescape correctly handles UTF-8 encoded
characters, making it suitable for internationalized applications.

## Error Handling

This example shows proper error handling when using curl_unescape.

error_handling.php
  

&lt;?php

declare(strict_types=1);

$ch = curl_init();

// Invalid percent encoding
$invalid = "100% discount";

$result = curl_unescape($ch, $invalid);

if ($result === false) {
    echo "Error: Invalid encoded string\n";
    echo "cURL error: " . curl_error($ch) . "\n";
} else {
    echo "Decoded: $result";
}

curl_close($ch);

We attempt to decode an invalid URL-encoded string. The function returns
FALSE when it encounters malformed percent-encoding. Always check the
return value and handle potential errors appropriately in production code.

## Best Practices

- **Error Checking:** Always verify the return value.

- **Resource Management:** Close cURL handles properly.

- **Input Validation:** Validate encoded strings first.

- **Character Encoding:** Be aware of UTF-8 handling.

- **Performance:** Reuse cURL handles when possible.

## Source

[PHP curl_unescape Documentation](https://www.php.net/manual/en/function.curl-unescape.php)

This tutorial covered the PHP curl_unescape function with practical
examples showing its usage for URL decoding in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP cURL tutorials](/php/#php-curl).