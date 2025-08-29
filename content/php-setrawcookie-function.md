+++
title = "PHP setrawcookie Function"
date = 2025-08-29T20:06:20.537+01:00
draft = false
description = "PHP setrawcookie function tutorial shows how to set raw cookies in PHP. Learn setrawcookie with practical examples for secure cookie handling."
image = ""
imageBig = ""
categories = ["php-network"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP setrawcookie Function

last modified April 4, 2025

The PHP setrawcookie function sends a raw cookie without URL encoding.
It's useful when you need precise control over cookie values.

## Basic Definition

setrawcookie defines a cookie to be sent along with HTTP headers.
Unlike setcookie, it doesn't URL encode the cookie value.

Syntax: setrawcookie(string $name, string $value = "", array $options = []): bool.
Must be called before any output is sent to the browser.

## Basic Raw Cookie Example

This example demonstrates setting a simple raw cookie with a name and value.

basic_raw_cookie.php
  

&lt;?php

declare(strict_types=1);

setrawcookie("user_token", "abc123XYZ!@#");
echo "Raw cookie set successfully";

The cookie value remains exactly as provided, with no URL encoding applied.
Special characters like !@# are preserved in their original form.

## Cookie with Expiration Time

This shows how to set a raw cookie with a specific expiration time.

expiring_raw_cookie.php
  

&lt;?php

declare(strict_types=1);

$expire = time() + 3600; // 1 hour from now
setrawcookie("session_id", "raw_value_!@#", [
    'expires' =&gt; $expire
]);
echo "Cookie will expire in 1 hour";

The expiration is set using the 'expires' option in the options array.
The cookie will automatically expire after the specified timestamp.

## Secure and HttpOnly Cookie

This example creates a secure, HttpOnly raw cookie for enhanced security.

secure_raw_cookie.php
  

&lt;?php

declare(strict_types=1);

setrawcookie("auth_token", "secure!raw#value", [
    'secure' =&gt; true,
    'httponly' =&gt; true,
    'samesite' =&gt; 'Strict'
]);
echo "Secure HttpOnly cookie set";

The 'secure' flag ensures the cookie is only sent over HTTPS.
HttpOnly prevents JavaScript access, and SameSite restricts cross-site usage.

## Domain and Path Restricted Cookie

This demonstrates setting a raw cookie restricted to specific domain and path.

domain_path_cookie.php
  

&lt;?php

declare(strict_types=1);

setrawcookie("preferences", "dark_theme=true", [
    'domain' =&gt; '.example.com',
    'path' =&gt; '/settings',
    'expires' =&gt; time() + 86400
]);
echo "Domain and path restricted cookie set";

The cookie will only be sent to example.com and its subdomains.
It's further restricted to URLs under the /settings path.

## Cookie with Special Characters

This example shows how setrawcookie preserves special characters in values.

special_chars_cookie.php
  

&lt;?php

declare(strict_types=1);

$rawValue = "user@domain.com|token=ABC123!*()";
setrawcookie("user_data", $rawValue);
echo "Cookie with special characters set without encoding";

The raw value containing @, |, =, and !*() is preserved exactly.
With setcookie, these would be URL encoded, changing the value.

## Best Practices

- **Security:** Always use secure and HttpOnly flags for sensitive cookies

- **Timing:** Call before any output to avoid headers already sent errors

- **Validation:** Sanitize values since they aren't URL encoded

- **Size Limit:** Keep under 4KB browser limit for cookie size

## Source

[PHP setrawcookie Documentation](https://www.php.net/manual/en/function.setrawcookie.php)

This tutorial covered the PHP setrawcookie function with practical
examples for setting raw cookies in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Network Functions](/php/#php-network).