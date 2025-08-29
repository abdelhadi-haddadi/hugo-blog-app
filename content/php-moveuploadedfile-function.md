+++
title = "PHP move_uploaded_file Function"
date = 2025-08-29T20:06:00.372+01:00
draft = false
description = "PHP move_uploaded_file function tutorial shows how to handle file uploads in PHP. Learn move_uploaded_file with practical examples."
image = ""
imageBig = ""
categories = ["php-filesystem"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP move_uploaded_file Function

last modified April 3, 2025

The PHP move_uploaded_file function moves an uploaded file to a new
location. It's essential for handling file uploads securely in web applications.

## Basic Definition

The move_uploaded_file function moves an uploaded file to a specified
destination. It checks that the file was uploaded via HTTP POST for security.

Syntax: move_uploaded_file(string $from, string $to): bool. Returns
true on success, false on failure. The function ensures safe file handling.

## Basic File Upload Example

This shows a complete file upload form and processing with move_uploaded_file.

basic_upload.php
  

&lt;?php

declare(strict_types=1);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $uploadDir = 'uploads/';
    $uploadFile = $uploadDir . basename($_FILES['userfile']['name']);
    
    if (move_uploaded_file($_FILES['userfile']['tmp_name'], $uploadFile)) {
        echo "File uploaded successfully.";
    } else {
        echo "File upload failed.";
    }
}
?&gt;

&lt;form enctype="multipart/form-data" method="POST"&gt;
    &lt;input type="file" name="userfile"&gt;
    &lt;button type="submit"&gt;Upload&lt;/button&gt;
&lt;/form&gt;

This example shows a complete file upload process. The form submits to itself,
and PHP moves the file if the upload was successful. Always check the request
method before processing.

## Secure File Upload with Validation

This example adds security checks before moving the uploaded file.

secure_upload.php
  

&lt;?php

declare(strict_types=1);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $uploadDir = 'uploads/';
    $allowedTypes = ['image/jpeg', 'image/png'];
    $maxSize = 2 * 1024 * 1024; // 2MB
    
    $file = $_FILES['userfile'];
    
    if (!in_array($file['type'], $allowedTypes)) {
        die("Invalid file type.");
    }
    
    if ($file['size'] &gt; $maxSize) {
        die("File too large.");
    }
    
    $filename = uniqid() . '_' . basename($file['name']);
    $uploadFile = $uploadDir . $filename;
    
    if (move_uploaded_file($file['tmp_name'], $uploadFile)) {
        echo "File uploaded securely.";
    } else {
        echo "Upload failed.";
    }
}
?&gt;

This adds type checking, size limits, and filename sanitization. Using uniqid()
prevents filename collisions. Always validate uploads before processing them.

## Multiple File Uploads

Handling multiple file uploads with move_uploaded_file in a loop.

multi_upload.php
  

&lt;?php

declare(strict_types=1);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $uploadDir = 'uploads/';
    
    foreach ($_FILES['userfiles']['tmp_name'] as $key =&gt; $tmpName) {
        if ($_FILES['userfiles']['error'][$key] !== UPLOAD_ERR_OK) {
            continue;
        }
        
        $filename = basename($_FILES['userfiles']['name'][$key]);
        $uploadFile = $uploadDir . $filename;
        
        if (move_uploaded_file($tmpName, $uploadFile)) {
            echo "File {$filename} uploaded.&lt;br&gt;";
        }
    }
}
?&gt;

&lt;form enctype="multipart/form-data" method="POST"&gt;
    &lt;input type="file" name="userfiles[]" multiple&gt;
    &lt;button type="submit"&gt;Upload&lt;/button&gt;
&lt;/form&gt;

This handles multiple files uploaded at once. The form uses array notation in the
input name and the multiple attribute. Each file is processed individually.

## Custom Destination Filename

Creating custom filenames for uploaded files while maintaining security.

custom_filename.php
  

&lt;?php

declare(strict_types=1);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $uploadDir = 'uploads/';
    $file = $_FILES['userfile'];
    
    // Get file extension
    $ext = pathinfo($file['name'], PATHINFO_EXTENSION);
    
    // Generate safe filename
    $filename = 'user_upload_' . time() . '.' . $ext;
    $uploadFile = $uploadDir . $filename;
    
    if (move_uploaded_file($file['tmp_name'], $uploadFile)) {
        echo "File saved as {$filename}";
    }
}
?&gt;

This generates a custom filename while preserving the original extension. The
time() function helps create unique names. Always maintain the file extension
for proper handling.

## Error Handling and Reporting

Proper error handling for file upload operations with move_uploaded_file.

error_handling.php
  

&lt;?php

declare(strict_types=1);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $uploadDir = 'uploads/';
    
    if (!is_dir($uploadDir) &amp;&amp; !mkdir($uploadDir, 0755, true)) {
        die("Cannot create upload directory.");
    }
    
    if (!is_writable($uploadDir)) {
        die("Upload directory not writable.");
    }
    
    $file = $_FILES['userfile'];
    
    switch ($file['error']) {
        case UPLOAD_ERR_OK:
            break;
        case UPLOAD_ERR_INI_SIZE:
        case UPLOAD_ERR_FORM_SIZE:
            die("File too large.");
        default:
            die("Upload error.");
    }
    
    $uploadFile = $uploadDir . basename($file['name']);
    
    if (!move_uploaded_file($file['tmp_name'], $uploadFile)) {
        die("Failed to move uploaded file.");
    }
    
    echo "Upload successful.";
}
?&gt;

This example checks directory permissions and handles various upload errors. It
validates the upload directory exists and is writable before attempting to move
files. Comprehensive error handling prevents security issues.

## Best Practices

- **Validate Input:** Check file types, sizes, and names.

- **Secure Storage:** Store uploads outside web root when possible.

- **Permissions:** Set correct directory permissions (0755).

- **Error Handling:** Handle all possible upload errors.

- **Filename Safety:** Generate safe filenames for storage.

## Source

[PHP move_uploaded_file Documentation](https://www.php.net/manual/en/function.move-uploaded-file.php)

This tutorial covered the PHP move_uploaded_file function with
practical examples showing secure file upload handling in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Filesystem functions](/php/#php-fs).