+++
title = "PHP is_uploaded_file Function"
date = 2025-08-29T20:05:57.009+01:00
draft = false
description = "PHP is_uploaded_file function tutorial shows how to validate file uploads in PHP. Learn secure file upload handling with practical examples."
image = ""
imageBig = ""
categories = ["php-filesystem"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP is_uploaded_file Function

last modified April 3, 2025

The PHP is_uploaded_file function checks if a file was uploaded via
HTTP POST. It's a crucial security measure when handling file uploads in PHP.

## Basic Definition

The is_uploaded_file function verifies a file exists and was
uploaded via HTTP POST. It helps prevent security vulnerabilities in file uploads.

Syntax: is_uploaded_file(string $filename): bool. Returns true if
the file exists and was uploaded via POST, false otherwise.

## Basic File Upload Validation

This example shows basic validation of an uploaded file using
is_uploaded_file.

basic_upload.php
  

&lt;?php

declare(strict_types=1);

if ($_SERVER['REQUEST_METHOD'] === 'POST' &amp;&amp; isset($_FILES['userfile'])) {
    $tmpName = $_FILES['userfile']['tmp_name'];
    
    if (is_uploaded_file($tmpName)) {
        echo "File was uploaded via HTTP POST.";
    } else {
        echo "Potential file upload attack!";
    }
}

This checks if the temporary file was actually uploaded via POST. Always use this
before moving uploaded files to prevent security issues.

## Secure File Upload Handling

This demonstrates a complete secure file upload process with validation.

secure_upload.php
  

&lt;?php

declare(strict_types=1);

if ($_SERVER['REQUEST_METHOD'] === 'POST' &amp;&amp; isset($_FILES['document'])) {
    $uploadDir = __DIR__ . '/uploads/';
    $tmpName = $_FILES['document']['tmp_name'];
    $targetPath = $uploadDir . basename($_FILES['document']['name']);
    
    if (!is_uploaded_file($tmpName)) {
        die("Invalid file upload detected.");
    }
    
    if (move_uploaded_file($tmpName, $targetPath)) {
        echo "File uploaded successfully.";
    } else {
        echo "File upload failed.";
    }
}

This combines is_uploaded_file with move_uploaded_file
for secure handling. Always verify the file before moving it to its destination.

## Multiple File Upload Validation

This example shows how to validate multiple uploaded files at once.

multi_upload.php
  

&lt;?php

declare(strict_types=1);

if ($_SERVER['REQUEST_METHOD'] === 'POST' &amp;&amp; !empty($_FILES['photos'])) {
    foreach ($_FILES['photos']['tmp_name'] as $key =&gt; $tmpName) {
        if (!is_uploaded_file($tmpName)) {
            echo "File {$key} failed validation.";
            continue;
        }
        
        // Process valid files here
        echo "File {$key} is valid.";
    }
}

When handling multiple files, validate each one individually. This prevents
malicious files from being processed along with legitimate ones.

## File Type Restriction

Combine is_uploaded_file with file type checking for better security.

type_check.php
  

&lt;?php

declare(strict_types=1);

$allowedTypes = ['image/jpeg', 'image/png'];

if ($_SERVER['REQUEST_METHOD'] === 'POST' &amp;&amp; isset($_FILES['avatar'])) {
    $tmpName = $_FILES['avatar']['tmp_name'];
    $fileType = $_FILES['avatar']['type'];
    
    if (!is_uploaded_file($tmpName)) {
        die("Invalid file upload.");
    }
    
    if (!in_array($fileType, $allowedTypes, true)) {
        die("Only JPEG and PNG images are allowed.");
    }
    
    // Process the valid image
    echo "Image uploaded successfully.";
}

This checks both the upload validity and file type. Always use strict comparison
when checking against allowed types to prevent type juggling issues.

## Advanced Security Check

This example demonstrates comprehensive upload security checks.

advanced_check.php
  

&lt;?php

declare(strict_types=1);

function isSafeUpload(array $file): bool {
    if (!isset($file['tmp_name'], $file['error'])) {
        return false;
    }
    
    if ($file['error'] !== UPLOAD_ERR_OK) {
        return false;
    }
    
    if (!is_uploaded_file($file['tmp_name'])) {
        return false;
    }
    
    // Additional checks can be added here
    return true;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' &amp;&amp; isset($_FILES['resume'])) {
    if (isSafeUpload($_FILES['resume'])) {
        echo "File passed all security checks.";
    } else {
        echo "File upload rejected by security checks.";
    }
}

This combines multiple security checks into one validation function. It verifies
the upload error code along with the upload method for comprehensive protection.

## Best Practices

- **Always Validate:** Never trust user uploads without validation.

- **Use With move_uploaded_file:** Combine with this function for security.

- **Check Error Codes:** Verify UPLOAD_ERR_OK before validation.

- **Limit File Size:** Check $_FILES['file']['size'] against limits.

- **Sanitize Names:** Clean filenames before storage.

## Common Mistakes

- **Skipping Validation:** Not using is_uploaded_file at all.

- **Trusting Filenames:** Using $_FILES['file']['name'] directly.

- **No Size Checks:** Allowing excessively large files.

- **Insecure Storage:** Placing uploads in web-accessible locations.

## Source

[PHP is_uploaded_file Documentation](https://www.php.net/manual/en/function.is-uploaded-file.php)

This tutorial covered the PHP is_uploaded_file function with
practical examples showing secure file upload validation in PHP.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Filesystem functions](/php/#php-fs).