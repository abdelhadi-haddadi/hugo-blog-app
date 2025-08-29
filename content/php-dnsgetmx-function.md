+++
title = "PHP dns_get_mx Function"
date = 2025-08-29T20:06:10.604+01:00
draft = false
description = "PHP dns_get_mx function tutorial shows how to look up MX records in PHP. Learn dns_get_mx with practical examples for email server validation and configuration."
image = ""
imageBig = ""
categories = ["php-network"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP dns_get_mx Function

last modified April 4, 2025

The PHP dns_get_mx function retrieves MX (Mail Exchange) records
for a given host. It's essential for email server configuration and validation.

## Basic Definition

dns_get_mx gets the MX records for a specified internet hostname.
MX records identify mail servers responsible for accepting email messages.

Syntax: dns_get_mx(string $hostname, array &amp;$hosts, array &amp;$weights = null): bool.
Returns true on success, false on failure. Populates arrays with hosts and weights.

## Basic MX Record Lookup

This example demonstrates the simplest usage of dns_get_mx to get
MX records for a domain.

basic_mx_lookup.php
  

&lt;?php

declare(strict_types=1);

$domain = "example.com";
$mxhosts = [];
$mxweights = [];

if (dns_get_mx($domain, $mxhosts, $mxweights)) {
    echo "MX records for $domain:\n";
    print_r($mxhosts);
} else {
    echo "No MX records found for $domain";
}

This code checks for MX records and prints the mail servers if found.
The function populates the $mxhosts array with server names.

## Displaying MX Records with Priorities

This example shows how to display both MX hosts and their priority weights.

mx_with_weights.php
  

&lt;?php

declare(strict_types=1);

$domain = "gmail.com";
$mxhosts = [];
$mxweights = [];

if (dns_get_mx($domain, $mxhosts, $mxweights)) {
    echo "MX records for $domain:\n";
    foreach ($mxhosts as $key =&gt; $host) {
        echo "Host: $host, Priority: {$mxweights[$key]}\n";
    }
} else {
    echo "No MX records found for $domain";
}

MX records have priorities (weights) that determine the order of mail server
usage. Lower numbers indicate higher priority in email delivery.

## Email Domain Validation

This example creates a function to validate if a domain can receive email by
checking MX records.

email_domain_validator.php
  

&lt;?php

declare(strict_types=1);

function isValidEmailDomain($email): bool {
    $parts = explode('@', $email);
    if (count($parts) != 2) return false;
    
    $domain = $parts[1];
    $mxhosts = [];
    return dns_get_mx($domain, $mxhosts);
}

$email = "user@example.com";
echo isValidEmailDomain($email) ? "Valid domain" : "Invalid domain";

This function splits the email address to extract the domain part. It then
checks if the domain has configured MX records for receiving email.

## Sorting MX Records by Priority

This example demonstrates sorting MX records by their priority weights for
proper mail server selection.

sorted_mx_records.php
  

&lt;?php

declare(strict_types=1);

$domain = "yahoo.com";
$mxhosts = [];
$mxweights = [];

if (dns_get_mx($domain, $mxhosts, $mxweights)) {
    array_multisort($mxweights, $mxhosts);
    echo "Sorted MX records for $domain:\n";
    foreach ($mxhosts as $key =&gt; $host) {
        echo "{$mxweights[$key]}: $host\n";
    }
} else {
    echo "No MX records found for $domain";
}

Mail servers should be contacted in priority order. This code uses
array_multisort to sort hosts by their weights.

## Checking Multiple Domains

This example checks MX records for multiple domains in one operation.

multiple_domains_check.php
  

&lt;?php

declare(strict_types=1);

$domains = ["google.com", "microsoft.com", "example.com"];

foreach ($domains as $domain) {
    $mxhosts = [];
    if (dns_get_mx($domain, $mxhosts)) {
        echo "$domain has ".count($mxhosts)." MX records\n";
    } else {
        echo "$domain has no MX records\n";
    }
}

This batch processing approach is useful when you need to validate multiple
email domains or check mail server configurations for several domains.

## Best Practices

- **Caching:** Cache MX lookups to reduce DNS queries

- **Error Handling:** Handle DNS lookup failures gracefully

- **Timeouts:** Consider setting timeout for DNS queries

- **Validation:** Combine with other email validation methods

- **Security:** Sanitize input to prevent DNS poisoning

## Source

[PHP dns_get_mx Documentation](https://www.php.net/manual/en/function.dns-get-mx.php)

This tutorial covered the PHP dns_get_mx function with practical
examples for MX record lookup and email domain validation scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Network Functions](/php/#php-network).