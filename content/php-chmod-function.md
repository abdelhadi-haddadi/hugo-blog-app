+++
title = "PHP chmod Function"
date = 2025-08-29T20:05:39.118+01:00
draft = false
description = "PHP chmod function tutorial shows how to change file permissions in PHP. Learn chmod with practical examples."
image = ""
imageBig = ""
categories = ["php-filesystem"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP chmod Function

last modified April 3, 2025

The PHP chmod function changes file permissions on Unix-like systems.
It allows setting read, write, and execute permissions for owner, group, and others.

## Basic Definition

The chmod function attempts to change the mode of specified file.
It takes two parameters: the filename and the permission mode in octal format.

Syntax: chmod(string $filename, int $mode): bool. Returns true on
success or false on failure. The mode should be an octal number (like 0755).

## Basic chmod Example

This shows the simplest usage of chmod to set file permissions.

basic_chmod.php
  

&lt;?php

declare(strict_types=1);

$file = "example.txt";
$result = chmod($file, 0644);

if ($result) {
    echo "Permissions changed successfully";
} else {
    echo "Failed to change permissions";
}

This sets permissions to 644 (owner read/write, group/others read-only). The
function returns true if successful, false otherwise. Always check the return.

## Setting Executable Permissions

This example makes a file executable by the owner while keeping other permissions.

executable_chmod.php
  

&lt;?php

declare(strict_types=1);

$script = "backup.sh";
$result = chmod($script, 0750);

if ($result) {
    echo "Script is now executable by owner";
} else {
    echo "Failed to make script executable";
}

The mode 0750 gives owner full permissions (read/write/execute), group read and
execute, and no permissions for others. The leading 0 indicates octal notation.

## Directory Permissions

chmod can also change permissions for directories, not just files.

directory_chmod.php
  

&lt;?php

declare(strict_types=1);

$dir = "uploads";
$result = chmod($dir, 0775);

if ($result) {
    echo "Directory permissions updated";
} else {
    echo "Failed to update directory permissions";
}

This sets 775 permissions (full for owner/group, read/execute for others).
Directories typically need execute permission to allow accessing their contents.

## Restrictive Permissions

This example shows how to set very restrictive permissions for sensitive files.

restrictive_chmod.php
  

&lt;?php

declare(strict_types=1);

$config = "database.ini";
$result = chmod($config, 0600);

if ($result) {
    echo "Config file now has strict permissions";
} else {
    echo "Failed to secure config file";
}

Mode 0600 gives read/write to owner only, with no permissions for group/others.
This is common for sensitive files like configuration files with passwords.

## Relative Path Handling

This example demonstrates handling relative paths with chmod.

relative_path.php
  

&lt;?php

declare(strict_types=1);

$relativeFile = "../logs/app.log";
$result = chmod($relativeFile, 0664);

if ($result) {
    echo "Log file permissions updated";
} else {
    echo "Failed to update log file permissions";
}

chmod works with relative paths. However, the PHP process must have
permission to change the target file's permissions for it to succeed.

## Best Practices

- **Security:** Avoid overly permissive settings like 0777.

- **Error Handling:** Always check the return value.

- **Octal Notation:** Use leading 0 for octal modes.

- **File Ownership:** Ensure PHP has permission to change modes.

- **Cross-platform:** Note Windows limitations.

## Source

[PHP chmod Documentation](https://www.php.net/manual/en/function.chmod.php)

This tutorial covered the PHP chmod function with practical examples
showing how to change file permissions in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Filesystem functions](/php/#php-fs).