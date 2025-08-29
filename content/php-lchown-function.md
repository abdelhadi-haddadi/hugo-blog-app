+++
title = "PHP lchown Function"
date = 2025-08-29T20:05:59.225+01:00
draft = false
description = "PHP lchown function tutorial shows how to change ownership of symbolic links in PHP. Learn lchown with practical examples."
image = ""
imageBig = ""
categories = ["php-filesystem"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP lchown Function

last modified April 3, 2025

The PHP lchown function changes the owner of a symbolic link. Unlike
chown, it affects the link itself, not the target file.

## Basic Definition

The lchown function changes the owner of a symbolic link. It takes
two parameters: the link path and the new owner's user ID or name.

Syntax: lchown(string $filename, string|int $user): bool. Returns
true on success, false on failure. Requires appropriate filesystem permissions.

## Basic lchown Example

This shows the simplest usage of lchown to change link ownership.

basic_lchown.php
  

&lt;?php

declare(strict_types=1);

$link = "/var/www/html/mylink";
$user = "www-data";

if (lchown($link, $user)) {
    echo "Link ownership changed successfully";
} else {
    echo "Failed to change link ownership";
}

This changes the owner of "mylink" to "www-data". The script must be run with
sufficient privileges to modify file ownership.

## Using User ID Instead of Name

lchown accepts either a username string or numeric user ID.

lchown_uid.php
  

&lt;?php

declare(strict_types=1);

$link = "/tmp/data_link";
$uid = 1001; // Typically found in /etc/passwd

if (lchown($link, $uid)) {
    echo "Link ownership changed to UID $uid";
} else {
    echo "Failed to change link ownership";
}

Here we use a numeric user ID instead of a username. This can be more reliable
when usernames might change but UIDs remain constant.

## Error Handling Example

Proper error handling is important when working with filesystem operations.

lchown_error.php
  

&lt;?php

declare(strict_types=1);

$link = "/var/logs/link_to_log";
$user = "logger";

if (!file_exists($link)) {
    die("Error: Link does not exist");
}

if (!is_link($link)) {
    die("Error: Not a symbolic link");
}

if (!lchown($link, $user)) {
    die("Error: " . error_get_last()['message']);
}

echo "Link ownership changed successfully";

This example includes checks for link existence and type before attempting to
change ownership. It also provides detailed error messages on failure.

## Changing Ownership Recursively

This example shows how to change ownership for multiple links in a directory.

lchown_recursive.php
  

&lt;?php

declare(strict_types=1);

function change_link_owner(string $dir, string $user): void {
    $items = new RecursiveIteratorIterator(
        new RecursiveDirectoryIterator($dir),
        RecursiveIteratorIterator::SELF_FIRST
    );

    foreach ($items as $item) {
        if ($item-&gt;isLink() &amp;&amp; lchown($item-&gt;getPathname(), $user)) {
            echo "Changed owner for: " . $item-&gt;getPathname() . "\n";
        }
    }
}

change_link_owner('/var/www/links', 'www-data');

This recursively processes a directory, changing ownership for all symbolic
links found. It uses PHP's SPL iterators for efficient directory traversal.

## Checking Current Ownership

This example demonstrates checking current ownership before changing it.

lchown_check.php
  

&lt;?php

declare(strict_types=1);

$link = "/usr/local/bin/tool_link";
$new_user = "admin";

$current_uid = fileowner($link);
$current_user = posix_getpwuid($current_uid)['name'];

echo "Current owner: $current_user (UID: $current_uid)\n";

if (lchown($link, $new_user)) {
    $new_uid = fileowner($link);
    $verified_user = posix_getpwuid($new_uid)['name'];
    echo "New owner: $verified_user (UID: $new_uid)\n";
} else {
    echo "Failed to change ownership\n";
}

This script shows the current owner before changing it and verifies the change
afterwards. It uses posix_getpwuid to convert UIDs to usernames.

## Best Practices

- **Privileges:** Script must run with sufficient permissions.

- **Validation:** Always verify link existence and type.

- **Error Handling:** Implement comprehensive error checking.

- **Security:** Sanitize input paths to prevent injection.

- **Testing:** Test in development before production use.

## Source

[PHP lchown Documentation](https://www.php.net/manual/en/function.lchown.php)

This tutorial covered the PHP lchown function with practical
examples showing its usage in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Filesystem functions](/php/#php-fs).