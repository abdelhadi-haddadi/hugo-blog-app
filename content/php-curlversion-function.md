+++
title = "PHP curl_version Function"
date = 2025-08-29T20:05:38.023+01:00
draft = false
description = "PHP curl_version function tutorial shows how to get cURL version information in PHP. Learn curl_version with practical examples."
image = ""
imageBig = ""
categories = ["php-curl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP curl_version Function

last modified April 11, 2025

The PHP curl_version function returns information about the cURL
version. It provides details about installed cURL features and capabilities.
This helps determine available protocols and SSL support.

## Basic Definition

The curl_version function returns an associative array with cURL
version data. It accepts an optional age parameter to specify data version.
The function requires no cURL handle.

Syntax: curl_version(int $age = CURLVERSION_NOW): array|false. It
returns FALSE on failure. The array contains version numbers, features, and
protocols. Always check the return value.

## Basic Version Information

This example demonstrates how to get basic cURL version information.

basic_version.php
  

&lt;?php

declare(strict_types=1);

$version = curl_version();

if ($version === false) {
    echo "Failed to get cURL version";
} else {
    echo "cURL version: " . $version['version'] . "\n";
    echo "SSL version: " . $version['ssl_version'] . "\n";
    echo "Libz version: " . $version['libz_version'] . "\n";
}

This code retrieves basic cURL version details. We check for failure first.
Then we display the cURL version, SSL version, and libz version. These are
common fields available in most installations.

## Checking Available Protocols

This example shows how to check which protocols are supported by cURL.

protocols_check.php
  

&lt;?php

declare(strict_types=1);

$version = curl_version();

if ($version === false) {
    echo "Failed to get cURL version";
} else {
    echo "Supported protocols:\n";
    foreach ($version['protocols'] as $protocol) {
        echo "- $protocol\n";
    }
}

We retrieve the version info and display supported protocols. The 'protocols'
field contains an array of strings. This helps determine what URL schemes can
be used with cURL. Common protocols include HTTP, HTTPS, and FTP.

## Checking SSL Support

This example demonstrates how to verify SSL/TLS support in cURL.

ssl_support.php
  

&lt;?php

declare(strict_types=1);

$version = curl_version();

if ($version === false) {
    echo "Failed to get cURL version";
} else {
    $ssl_supported = ($version['features'] &amp; CURL_VERSION_SSL) !== 0;
    echo "SSL support: " . ($ssl_supported ? "Yes" : "No") . "\n";
    
    $https_supported = in_array('https', $version['protocols'], true);
    echo "HTTPS support: " . ($https_supported ? "Yes" : "No") . "\n";
}

We check both SSL capability and HTTPS protocol support. The features field
contains bitmask flags. CURL_VERSION_SSL indicates SSL support. We also verify
HTTPS is in protocols list. Both checks are recommended for secure connections.

## Checking Feature Flags

This example shows how to check various cURL feature flags.

feature_flags.php
  

&lt;?php

declare(strict_types=1);

$version = curl_version();

if ($version === false) {
    echo "Failed to get cURL version";
} else {
    $features = $version['features'];
    
    echo "IPv6 support: " . (($features &amp; CURL_VERSION_IPV6) ? "Yes" : "No") . "\n";
    echo "HTTP2 support: " . (($features &amp; CURL_VERSION_HTTP2) ? "Yes" : "No") . "\n";
    echo "GSS-Negotiate: " . (($features &amp; CURL_VERSION_GSSNEGOTIATE) ? "Yes" : "No") . "\n";
    echo "Debug enabled: " . (($features &amp; CURL_VERSION_DEBUG) ? "Yes" : "No") . "\n";
}

We examine several feature flags from the version data. Each flag is checked
using bitwise AND with the features bitmask. This reveals advanced capabilities
like IPv6, HTTP/2, and debugging support. Useful for feature detection.

## Complete Version Information

This example displays all available version information in a formatted way.

complete_info.php
  

&lt;?php

declare(strict_types=1);

$version = curl_version();

if ($version === false) {
    echo "Failed to get cURL version";
} else {
    echo "Complete cURL version information:\n";
    echo str_repeat("-", 40) . "\n";
    
    foreach ($version as $key =&gt;  $value) {
        if (is_array($value)) {
            echo "$key: " . implode(", ", $value) . "\n";
        } else {
            echo "$key: $value\n";
        }
    }
}

This code displays all available version information. Array values are joined
with commas for readability. The output includes version numbers, host info,
features, and protocols. Useful for debugging and system information.

## Best Practices

- **Error Checking:** Always verify the return value.

- **Feature Detection:** Check flags before using features.

- **Protocol Verification:** Confirm needed protocols exist.

- **SSL Validation:** Ensure SSL support for HTTPS.

- **Version Comparison:** Compare versions for compatibility.

## Source

[PHP curl_version Documentation](https://www.php.net/manual/en/function.curl-version.php)

This tutorial covered the PHP curl_version function with practical
examples showing how to check cURL capabilities and version information.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP cURL tutorials](/php/#php-curl).