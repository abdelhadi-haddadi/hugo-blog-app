+++
title = "PHP mkdir Function"
date = 2025-08-29T20:06:00.470+01:00
draft = false
description = "PHP mkdir function tutorial shows how to create directories in PHP. Learn mkdir with practical examples."
image = ""
imageBig = ""
categories = ["php-filesystem"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP mkdir Function

last modified April 3, 2025

The PHP mkdir function creates a new directory with specified
permissions. It's essential for filesystem operations in PHP applications.

## Basic Definition

The mkdir function attempts to create the directory specified by
pathname. It returns true on success or false on failure.

Syntax: mkdir(string $directory, int $permissions = 0777, bool $recursive = false, resource $context = null): bool.
The function supports recursive directory creation.

## Basic mkdir Example

This shows the simplest usage of mkdir to create a single directory.

basic_mkdir.php
  

&lt;?php

declare(strict_types=1);

$dir = "new_directory";

if (mkdir($dir)) {
    echo "Directory created successfully";
} else {
    echo "Failed to create directory";
}

This creates "new_directory" in the current working directory. The default
permissions (0777) are used if not specified.

## Specifying Permissions

You can set specific permissions when creating a directory.

mkdir_permissions.php
  

&lt;?php

declare(strict_types=1);

$dir = "secure_dir";
$permissions = 0750; // Owner: rwx, Group: r-x, Others: ---

if (mkdir($dir, $permissions)) {
    echo "Secure directory created";
} else {
    echo "Directory creation failed";
}

This creates a directory with restricted permissions. Note that the actual
permissions may be affected by the umask setting.

## Recursive Directory Creation

The recursive parameter allows creating nested directories in one call.

recursive_mkdir.php
  

&lt;?php

declare(strict_types=1);

$path = "parent/child/grandchild";

if (mkdir($path, 0777, true)) {
    echo "Directory tree created";
} else {
    echo "Failed to create directories";
}

This creates all three directories (parent, child, grandchild) if they don't
exist. Without recursive mode, this would fail if parent didn't exist.

## Checking Directory Existence

It's good practice to check if a directory exists before creating it.

mkdir_exists.php
  

&lt;?php

declare(strict_types=1);

$dir = "new_folder";

if (!file_exists($dir)) {
    if (mkdir($dir)) {
        echo "Directory created";
    } else {
        echo "Creation failed";
    }
} else {
    echo "Directory already exists";
}

This prevents errors when trying to create an existing directory. The
file_exists check is important for robust code.

## Using Context Parameter

The context parameter allows specifying stream context options.

mkdir_context.php
  

&lt;?php

declare(strict_types=1);

$dir = "context_dir";
$context = stream_context_create();

if (mkdir($dir, 0777, false, $context)) {
    echo "Directory created with context";
} else {
    echo "Context creation failed";
}

This shows the basic usage of context, though normally you'd set specific
stream options. Context is rarely needed for local filesystem operations.

## Best Practices

- **Error Handling:** Always check the return value of mkdir.

- **Permissions:** Set appropriate permissions for security.

- **Exists Check:** Verify if directory exists first.

- **Recursive:** Use recursive mode for nested directories.

- **Absolute Paths:** Prefer absolute paths for reliability.

## Source

[PHP mkdir Documentation](https://www.php.net/manual/en/function.mkdir.php)

This tutorial covered the PHP mkdir function with practical
examples showing directory creation in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Filesystem functions](/php/#php-fs).