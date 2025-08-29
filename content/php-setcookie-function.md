+++
title = "PHP setcookie Function"
date = 2025-08-29T20:06:20.548+01:00
draft = false
description = "PHP setcookie function tutorial shows how to handle cookies in PHP. Learn setcookie with practical examples for user preferences, authentication, and tracking."
image = ""
imageBig = ""
categories = ["php-network"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP setcookie Function

last modified April 4, 2025

The PHP setcookie function creates cookies to store small amounts
of data on the client's browser. Cookies are essential for sessions, user
preferences, and tracking.

## Basic Definition

setcookie defines a cookie to be sent along with HTTP headers.
Cookies are stored client-side and sent back with subsequent requests.

Syntax: setcookie(string $name, string $value = "", int $expires = 0, string $path = "", string $domain = "", bool $secure = false, bool $httponly = false): bool.
Returns true if successful, false otherwise. Must be called before output.

## Basic Cookie Example

This example demonstrates setting a simple cookie with just name and value.

basic_cookie.php
  

&lt;?php

declare(strict_types=1);

setcookie("username", "john_doe");

echo "Cookie 'username' has been set with value 'john_doe'";

This creates a cookie named "username" with value "john_doe". The cookie will
expire when the browser closes. Simple cookies work for temporary storage.

## Cookie with Expiration Time

This shows how to set a cookie that persists for a specific duration.

expiring_cookie.php
  

&lt;?php

declare(strict_types=1);

$expire = time() + (86400 * 30); // 30 days
setcookie("user_preference", "dark_mode", $expire);

echo "Cookie will expire in 30 days";

The expiration is set using Unix timestamp. Here, we add 30 days worth of
seconds to current time. Persistent cookies survive browser restarts.

## Secure and HttpOnly Cookie

This example creates a secure cookie that's only accessible via HTTP.

secure_cookie.php
  

&lt;?php

declare(strict_types=1);

setcookie(
    "session_id",
    "abc123xyz",
    time() + 3600,
    "/",
    "",
    true,  // Secure - only over HTTPS
    true   // HttpOnly - no JavaScript access
);

echo "Secure session cookie set";

Secure flag ensures cookie only transmits over HTTPS. HttpOnly prevents
JavaScript access, improving security against XSS attacks.

## Cookie with Path and Domain

This demonstrates setting cookie scope with path and domain parameters.

scoped_cookie.php
  

&lt;?php

declare(strict_types=1);

setcookie(
    "language",
    "en_US",
    time() + (86400 * 365),
    "/blog/",      // Only accessible under /blog/
    ".example.com" // Accessible on all subdomains
);

echo "Language cookie set for blog subdirectory";

Path restricts cookie to specific directory. Domain allows cookie access
across subdomains. Useful for large applications with multiple sections.

## Deleting a Cookie

This example shows how to properly delete a cookie by setting past expiration.

delete_cookie.php
  

&lt;?php

declare(strict_types=1);

// Set expiration to past time
setcookie("username", "", time() - 3600);

echo "Cookie 'username' has been deleted";

To delete a cookie, set its expiration to a past timestamp. The browser
will then remove it. Must use same path/domain as original cookie.

## Best Practices

- **Security:** Always use Secure and HttpOnly for sensitive cookies

- **Size Limit:** Keep cookies under 4KB (browser limit)

- **Sensitive Data:** Avoid storing sensitive information

- **Validation:** Always validate cookie data before use

- **Alternatives:** Consider sessions for server-side storage

## Source

[PHP setcookie Documentation](https://www.php.net/manual/en/function.setcookie.php)

This tutorial covered the PHP setcookie function with practical
examples for cookie handling in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Network Functions](/php/#php-network).