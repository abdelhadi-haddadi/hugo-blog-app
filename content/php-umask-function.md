+++
title = "PHP umask Function"
date = 2025-08-29T20:06:08.404+01:00
draft = false
description = "PHP umask function tutorial shows how to set file permission masks in PHP. Learn umask with practical examples."
image = ""
imageBig = ""
categories = ["php-filesystem"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP umask Function

last modified April 3, 2025

The PHP umask function sets the default permission mask for files
and directories. It affects permissions of newly created files and directories.

## Basic Definition

The umask function changes the current umask (user mask) value.
It takes an octal value representing permissions to be disabled by default.

Syntax: umask(?int $mask = null): int. The function returns the
previous umask value. Without parameters, it returns current umask without
changing it.

## Basic umask Example

This shows how to set a basic umask and check its effect on file creation.

basic_umask.php
  

&lt;?php

declare(strict_types=1);

$old_mask = umask(0);
echo "Old umask: " . decoct($old_mask) . "\n";

$file = fopen("test.txt", "w");
fclose($file);

$perms = fileperms("test.txt");
echo "File permissions: " . decoct($perms &amp; 0777) . "\n";

umask($old_mask); // Restore original umask
unlink("test.txt");

This sets umask to 0, allowing full permissions (777). The created file will
have permissions based on the umask. We restore the original umask afterward.

## Restrictive umask Example

This demonstrates how a restrictive umask affects new file permissions.

restrictive_umask.php
  

&lt;?php

declare(strict_types=1);

$old_mask = umask(0077); // Remove all group/other permissions
echo "Old umask: " . decoct($old_mask) . "\n";

$file = fopen("secure.txt", "w");
fclose($file);

$perms = fileperms("secure.txt");
echo "File permissions: " . decoct($perms &amp; 0777) . "\n";

umask($old_mask); // Restore original umask
unlink("secure.txt");

With umask 0077, new files will have permissions 600 (rw-------). The umask
value is subtracted from the default permissions (666 for files).

## Directory Creation with umask

This example shows how umask affects directory permissions differently.

directory_umask.php
  

&lt;?php

declare(strict_types=1);

$old_mask = umask(0022); // Common default umask
echo "Old umask: " . decoct($old_mask) . "\n";

mkdir("new_directory");

$perms = fileperms("new_directory");
echo "Directory permissions: " . decoct($perms &amp; 0777) . "\n";

umask($old_mask); // Restore original umask
rmdir("new_directory");

With umask 0022, new directories will have permissions 755 (rwxr-xr-x). The
umask subtracts from default directory permissions (777). Execute bits remain.

## Temporary umask Change

This shows how to temporarily change umask for specific operations.

temporary_umask.php
  

&lt;?php

declare(strict_types=1);

function createSecureFile(string $filename): void {
    $old_mask = umask(0077);
    $file = fopen($filename, "w");
    fclose($file);
    umask($old_mask);
}

createSecureFile("private.txt");
$perms = fileperms("private.txt");
echo "File permissions: " . decoct($perms &amp; 0777) . "\n";

unlink("private.txt");

The function temporarily sets a restrictive umask for file creation. The umask
is automatically restored after file creation, preventing global side effects.

## Checking Current umask

This example demonstrates how to check the current umask without changing it.

check_umask.php
  

&lt;?php

declare(strict_types=1);

$current_umask = umask();
echo "Current umask: " . decoct($current_umask) . "\n";

// Create a test file to see actual permissions
$file = fopen("testfile.txt", "w");
fclose($file);

$perms = fileperms("testfile.txt");
echo "Actual file permissions: " . decoct($perms &amp; 0777) . "\n";

unlink("testfile.txt");

Calling umask() without parameters returns the current umask value. The actual
file permissions will be 666 minus the umask value (for files).

## Best Practices

- **Restore umask:** Always restore original umask after changes.

- **Octal notation:** Use octal numbers (e.g., 077) for clarity.

- **Scope:** Limit umask changes to smallest necessary scope.

- **Security:** Consider security implications of permissions.

- **Document:** Document umask changes in team environments.

## Source

[PHP umask Documentation](https://www.php.net/manual/en/function.umask.php)

This tutorial covered the PHP umask function with practical
examples showing its usage for permission control in filesystem operations.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Filesystem functions](/php/#php-fs).