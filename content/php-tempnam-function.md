+++
title = "PHP tempnam Function"
date = 2025-08-29T20:06:07.213+01:00
draft = false
description = "PHP tempnam function tutorial shows how to create temporary files in PHP. Learn tempnam with practical examples."
image = ""
imageBig = ""
categories = ["php-filesystem"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP tempnam Function

last modified April 3, 2025

The PHP tempnam function creates a temporary file with a unique name.
It's useful for creating temporary storage that won't conflict with existing files.

## Basic Definition

The tempnam function creates a file with a unique name in the
specified directory. It returns the path to the newly created file.

Syntax: tempnam(string $directory, string $prefix): string|false. The
function returns false on failure. The created file is empty and has 0600 permissions.

## Basic tempnam Example

This shows the simplest usage of tempnam to create a temporary file.

basic_tempnam.php
  

&lt;?php

declare(strict_types=1);

$tempFile = tempnam(sys_get_temp_dir(), 'TMP_');

echo "Temporary file created: " . $tempFile;

This creates a temporary file in the system temp directory with 'TMP_' prefix.
The file is automatically assigned a unique name to prevent collisions.

## Custom Directory Example

You can specify a custom directory for the temporary file creation.

custom_directory.php
  

&lt;?php

declare(strict_types=1);

$customDir = '/var/tmp/';
$tempFile = tempnam($customDir, 'APP_');

if ($tempFile !== false) {
    echo "Custom temp file: " . $tempFile;
} else {
    echo "Failed to create temp file";
}

Here we create a temp file in '/var/tmp/' with 'APP_' prefix. Always check the
return value as the function may fail if directory doesn't exist or isn't writable.

## Writing to Temporary File

This example shows how to write data to the created temporary file.

write_temp_file.php
  

&lt;?php

declare(strict_types=1);

$tempFile = tempnam(sys_get_temp_dir(), 'DATA_');

if ($tempFile !== false) {
    file_put_contents($tempFile, "Temporary data storage\n");
    echo "Data written to: " . $tempFile;
    
    // Remember to clean up when done
    unlink($tempFile);
}

We create a temp file and write data to it. Note we manually delete the file
when done. Temporary files aren't automatically removed by PHP.

## Secure Temporary File Handling

This example demonstrates secure handling of temporary files with error checking.

secure_tempnam.php
  

&lt;?php

declare(strict_types=1);

$tempDir = sys_get_temp_dir();
if (!is_writable($tempDir)) {
    throw new RuntimeException("Temp directory not writable");
}

$tempFile = tempnam($tempDir, 'SEC_');
if ($tempFile === false) {
    throw new RuntimeException("Failed to create temp file");
}

try {
    // Use the temp file
    file_put_contents($tempFile, "Sensitive data");
    // Process the file...
} finally {
    if (file_exists($tempFile)) {
        unlink($tempFile);
    }
}

This shows robust temp file handling with directory checks, error handling, and
guaranteed cleanup. The finally block ensures file deletion even if errors occur.

## Temp File with Specific Extension

This example creates a temp file with a specific extension by renaming.

temp_with_extension.php
  

&lt;?php

declare(strict_types=1);

$tempFile = tempnam(sys_get_temp_dir(), 'TMP_');
$newName = $tempFile . '.txt';

if (rename($tempFile, $newName)) {
    echo "Created temp file with extension: " . $newName;
    // Remember to clean up
    unlink($newName);
} else {
    unlink($tempFile);
    echo "Failed to rename temp file";
}

We first create a temp file then rename it to add an extension. If renaming
fails, we clean up the original temp file to avoid leaving unused files.

## Best Practices

- **Clean up:** Always delete temp files when done.

- **Error handling:** Check return values for failures.

- **Permissions:** Verify directory is writable first.

- **Security:** Use proper permissions (0600 by default).

- **Atomicity:** tempnam guarantees unique file creation.

## Source

[PHP tempnam Documentation](https://www.php.net/manual/en/function.tempnam.php)

This tutorial covered the PHP tempnam function with practical
examples showing its usage for creating temporary files securely.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Filesystem functions](/php/#php-fs).