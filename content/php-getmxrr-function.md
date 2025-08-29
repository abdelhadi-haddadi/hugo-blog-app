+++
title = "PHP getmxrr Function"
date = 2025-08-29T20:06:12.822+01:00
draft = false
description = "PHP getmxrr function tutorial shows how to check MX records in PHP. Learn getmxrr with practical examples for email server validation."
image = ""
imageBig = ""
categories = ["php-network"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP getmxrr Function

last modified April 4, 2025

The PHP getmxrr function retrieves MX records for a given host.
It's essential for email server validation and configuration checks.

## Basic Definition

getmxrr gets the MX (Mail Exchange) records for a hostname.
MX records specify mail servers responsible for accepting email messages.

Syntax: getmxrr(string $hostname, array &amp;$hosts, array &amp;$weights = null): bool.
Returns true if records exist, false otherwise. Requires DNS server access.

## Basic MX Record Check

This example checks if a domain has MX records and displays them.

basic_mx_check.php
  

&lt;?php

declare(strict_types=1);

$domain = "example.com";
$mxhosts = [];
$weights = [];

if (getmxrr($domain, $mxhosts, $weights)) {
    echo "MX records for $domain:\n";
    foreach ($mxhosts as $i =&gt; $host) {
        echo "$host (priority: {$weights[$i]})\n";
    }
} else {
    echo "No MX records found for $domain";
}

This checks for MX records and displays each mail server with its priority.
Lower priority numbers indicate preferred mail servers.

## Email Domain Validation

This demonstrates validating an email domain by checking MX records.

email_validation.php
  

&lt;?php

declare(strict_types=1);

function isValidEmailDomain($email) {
    $parts = explode('@', $email);
    if (count($parts) != 2) return false;
    
    $domain = $parts[1];
    return getmxrr($domain, $mxhosts);
}

$email = "user@example.com";
echo isValidEmailDomain($email) ? "Valid email domain" : "Invalid email domain";

This function splits the email to extract the domain, then checks for MX
records. This is more reliable than simple format validation.

## Getting MX Records with Priorities

This example retrieves and sorts MX records by their priority values.

sorted_mx_records.php
  

&lt;?php

declare(strict_types=1);

$domain = "example.com";
$mxhosts = [];
$weights = [];

if (getmxrr($domain, $mxhosts, $weights)) {
    $records = array_combine($mxhosts, $weights);
    asort($records);
    
    echo "Sorted MX records for $domain:\n";
    foreach ($records as $host =&gt; $priority) {
        echo "Priority $priority: $host\n";
    }
} else {
    echo "No MX records found for $domain";
}

This combines hosts and weights into an array, sorts by priority, and displays
the results. Sorting helps identify the preferred mail servers.

## Checking Multiple Domains

This shows how to check MX records for multiple domains in one operation.

multiple_domains.php
  

&lt;?php

declare(strict_types=1);

$domains = ["example.com", "google.com", "nonexistent.test"];
$results = [];

foreach ($domains as $domain) {
    $results[$domain] = getmxrr($domain, $mxhosts) ? 
        "Has MX records" : "No MX records";
}

print_r($results);

This checks multiple domains at once and stores the results in an array.
Batch processing is efficient when validating multiple email domains.

## Advanced Email Validation

This combines MX record checking with additional email validation steps.

advanced_email_check.php
  

&lt;?php

declare(strict_types=1);

function validateEmail($email) {
    // Basic format check
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        return false;
    }
    
    // Extract domain
    $domain = substr(strrchr($email, "@"), 1);
    
    // Check MX records
    if (!getmxrr($domain, $mxhosts)) {
        // Fallback to A record check
        return checkdnsrr($domain, "A");
    }
    
    return true;
}

$email = "user@example.com";
echo validateEmail($email) ? "Valid email" : "Invalid email";

This comprehensive validation checks email format, MX records, and falls back
to A records if no MX records exist. Provides robust email validation.

## Best Practices

- **Caching:** Cache MX record results to reduce DNS queries

- **Error Handling:** Handle DNS query failures gracefully

- **Timeout:** Consider setting timeout for DNS queries

- **Validation:** Combine with other validation methods

- **Fallback:** Check A records if no MX records exist

## Source

[PHP getmxrr Documentation](https://www.php.net/manual/en/function.getmxrr.php)

This tutorial covered the PHP getmxrr function with practical
examples for email validation and MX record checking.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Network Functions](/php/#php-network).