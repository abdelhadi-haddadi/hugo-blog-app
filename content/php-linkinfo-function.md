+++
title = "PHP linkinfo Function"
date = 2025-08-29T20:05:59.229+01:00
draft = false
description = "PHP linkinfo function tutorial shows how to check link information in PHP. Learn linkinfo with practical examples."
image = ""
imageBig = ""
categories = ["php-filesystem"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP linkinfo Function

last modified April 3, 2025

The PHP linkinfo function retrieves information about a link. It
returns the st_dev field of the Unix C stat structure for the link.

## Basic Definition

The linkinfo function checks if a path is a link and returns
information about it. It returns 0 or false if the link doesn't exist.

Syntax: linkinfo(string $path): int|false. The function is useful
for verifying symlinks before operations. It works only on Unix-like systems.

## Basic linkinfo Example

This shows the simplest usage of linkinfo to check a symlink.

basic_linkinfo.php
  

&lt;?php

declare(strict_types=1);

$path = "/usr/bin/php";
$linkInfo = linkinfo($path);

if ($linkInfo !== false) {
    echo "Link exists with device ID: " . $linkInfo;
} else {
    echo "Not a link or doesn't exist";
}

This checks if "/usr/bin/php" is a symlink. If it is, it returns the device ID.
The function returns false for regular files or non-existent paths.

## Checking Symlink Validity

We can use linkinfo to verify if a symlink points to a valid target.

check_symlink.php
  

&lt;?php

declare(strict_types=1);

$symlink = "/tmp/mysymlink";

if (linkinfo($symlink) {
    echo "Symlink exists and is valid";
} else {
    echo "Symlink is broken or doesn't exist";
}

This example checks the validity of a symlink. A return value greater than 0
indicates a valid symlink. Broken links return false.

## Comparing Link Information

linkinfo can compare if two paths are on the same filesystem device.

compare_links.php
  

&lt;?php

declare(strict_types=1);

$link1 = "/usr/bin/php";
$link2 = "/usr/local/bin/php";

$info1 = linkinfo($link1);
$info2 = linkinfo($link2);

if ($info1 === $info2) {
    echo "Links are on the same device";
} else {
    echo "Links are on different devices";
}

This compares device IDs of two links. Matching IDs mean they're on the same
device. Different IDs indicate separate filesystems.

## Error Handling

Proper error handling is important when working with linkinfo.

error_handling.php
  

&lt;?php

declare(strict_types=1);

$path = "/nonexistent/link";

try {
    $result = linkinfo($path);
    
    if ($result === false) {
        throw new RuntimeException("Invalid link or path");
    }
    
    echo "Link device ID: " . $result;
} catch (Throwable $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This demonstrates proper error handling. The try-catch block captures any
filesystem-related errors. We also check for false returns explicitly.

## Windows Compatibility Note

linkinfo has limited functionality on Windows systems.

windows_check.php
  

&lt;?php

declare(strict_types=1);

$path = "C:\\Windows\\System32\\cmd.exe";

if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
    echo "linkinfo has limited functionality on Windows";
} else {
    $info = linkinfo($path);
    echo "Link info: " . ($info !== false ? $info : "Not a link");
}

On Windows, linkinfo only checks if the path exists. It doesn't
provide device information. Always check the OS before using this function.

## Best Practices

- **Check OS:** Verify Unix-like system before use.

- **Error Handling:** Always check for false returns.

- **Permissions:** Ensure proper filesystem permissions.

- **Validation:** Validate paths before processing.

- **Alternatives:** Consider is_link() for simple checks.

## Source

[PHP linkinfo Documentation](https://www.php.net/manual/en/function.linkinfo.php)

This tutorial covered the PHP linkinfo function with practical
examples showing its usage in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Filesystem functions](/php/#php-fs).