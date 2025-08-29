+++
title = "PHP Superglobals"
date = 2025-08-29T20:04:47.261+01:00
draft = false
description = "PHP Superglobals tutorial shows how to use built-in superglobal variables in PHP."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP Superglobals

last modified April 5, 2025

PHP superglobals are built-in variables that are always available in all scopes.
They provide access to various types of data like form inputs, server info, and
session data. Superglobals are essential for web development in PHP.

## Basic Definition

Superglobals are predefined variables in PHP that are accessible from any scope.
They start with $_ followed by their name in uppercase letters. These variables
are automatically populated by PHP with relevant data.

The main superglobals are $_GET, $_POST, $_REQUEST, $_SERVER, $_SESSION, $_COOKIE,
$_FILES, $_ENV, and $GLOBALS. Each serves a specific purpose in web applications.

## $_GET - Handling URL Parameters

The $_GET superglobal collects data sent to the script via URL
parameters.

get_example.php
    

&lt;?php

// URL: get_example.php?name=John&amp;age=25

if (isset($_GET['name'])) {
    echo "Hello, " . htmlspecialchars($_GET['name']) . "!&lt;br&gt;";
}

if (isset($_GET['age'])) {
    echo "You are " . (int)$_GET['age'] . " years old.";
}

This example shows how to access URL parameters using $_GET. The
htmlspecialchars function prevents XSS attacks by escaping HTML
characters. The (int) cast ensures age is treated as a number.

$_GET is commonly used for search filters, pagination, and other non-sensitive
data that can be bookmarked or shared via URL.

## $_POST - Handling Form Submissions

The $_POST superglobal collects data sent via HTTP POST method,
typically from forms.

post_example.php
    

&lt;?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';
    
    echo "Username: " . htmlspecialchars($username) . "&lt;br&gt;";
    echo "Password: " . htmlspecialchars($password);
}
?&gt;

&lt;form method="post"&gt;
    Username: &lt;input type="text" name="username"&gt;&lt;br&gt;
    Password: &lt;input type="password" name="password"&gt;&lt;br&gt;
    &lt;input type="submit" value="Submit"&gt;
&lt;/form&gt;

This demonstrates handling form data with $_POST. The null
coalescing operator (??) provides default values if fields are empty. Always
validate and sanitize user input before processing.

$_POST is preferred for sensitive data and form submissions as the
data isn't visible in the URL.

## $_SERVER - Server and Execution Environment Info

$_SERVER contains information about the server and current request.

server_example.php
    

&lt;?php

echo "Server Name: " . $_SERVER['SERVER_NAME'] . "&lt;br&gt;";
echo "Server Software: " . $_SERVER['SERVER_SOFTWARE'] . "&lt;br&gt;";
echo "User IP Address: " . $_SERVER['REMOTE_ADDR'] . "&lt;br&gt;";
echo "Request Method: " . $_SERVER['REQUEST_METHOD'] . "&lt;br&gt;";
echo "Script Name: " . $_SERVER['SCRIPT_NAME'] . "&lt;br&gt;";

This displays various server and request information. $_SERVER is useful for
logging, debugging, and conditional logic based on the request environment.

Common uses include detecting HTTPS, getting the request URI, or identifying the
user's IP address. Note that some values can be spoofed by clients.

## $_SESSION - Managing User Sessions

$_SESSION stores persistent user data across multiple page requests.

session_example.php
    

&lt;?php
session_start();

// Set session data
$_SESSION['username'] = 'john_doe';
$_SESSION['last_visit'] = date('Y-m-d H:i:s');

// Access session data
echo "Welcome back, " . $_SESSION['username'] . "&lt;br&gt;";
echo "Your last visit was: " . $_SESSION['last_visit'];

// Unset specific session variable
unset($_SESSION['last_visit']);

// Destroy entire session
// session_destroy();

This shows basic session management. session_start must be called
before accessing $_SESSION. Session data persists until the browser
is closed or the session is destroyed.

Sessions are commonly used for user authentication, shopping carts, and
maintaining state across page views.

## $_COOKIE - Working with HTTP Cookies

$_COOKIE contains HTTP cookies sent by the client.

cookie_example.php
    

&lt;?php

// Set a cookie that expires in 1 hour
setcookie('user_preference', 'dark_mode', time() + 3600, '/');

// Access cookie
if (isset($_COOKIE['user_preference'])) {
    echo "Your preference: " . $_COOKIE['user_preference'];
} else {
    echo "No preference set.";
}

// Delete cookie
// setcookie('user_preference', '', time() - 3600, '/');

This demonstrates setting and accessing cookies. Cookies are stored on the client
side and sent with each request. They're useful for remembering user preferences.

Cookies have expiration dates and can be deleted by setting an expired timestamp.
Always sanitize cookie data as it can be modified by users.

## $_FILES - Handling File Uploads

$_FILES contains information about uploaded files via HTTP POST.

file_upload.php
    

&lt;?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $uploadDir = 'uploads/';
    $uploadFile = $uploadDir . basename($_FILES['file']['name']);
    
    if (move_uploaded_file($_FILES['file']['tmp_name'], $uploadFile)) {
        echo "File uploaded successfully.&lt;br&gt;";
        echo "Name: " . $_FILES['file']['name'] . "&lt;br&gt;";
        echo "Size: " . ($_FILES['file']['size'] / 1024) . " KB&lt;br&gt;";
        echo "Type: " . $_FILES['file']['type'] . "&lt;br&gt;";
    } else {
        echo "File upload failed.";
    }
}
?&gt;

&lt;form method="post" enctype="multipart/form-data"&gt;
    Select file: &lt;input type="file" name="file"&gt;&lt;br&gt;
    &lt;input type="submit" value="Upload"&gt;
&lt;/form&gt;

This handles file uploads. The form must have enctype="multipart/form-data".
move_uploaded_file moves the file from temp storage to a permanent
location.

Always validate file types and sizes for security. $_FILES contains
name, type, size, tmp_name (temporary path), and error code for each uploaded
file.

## $_REQUEST - Combined GET, POST, and COOKIE Data

$_REQUEST merges data from $_GET, $_POST,
and $_COOKIE (configurable in php.ini).

request_example.php
    

&lt;?php

// URL: request_example.php?color=blue
// Or form submission with color field

$color = $_REQUEST['color'] ?? 'white';
echo "Selected color: " . htmlspecialchars($color);

// Better to use specific superglobals for clarity:
// $color = $_GET['color'] ?? $_POST['color'] ?? 'white';

$_REQUEST provides a way to access input data without knowing the method.
However, it's often better to use $_GET or $_POST
directly for clarity and security.

The order of variables in $_REQUEST is determined by the
request_order setting in php.ini (default: GP - GET then POST).

## $_ENV - Environment Variables

$_ENV contains environment variables, useful for configuration.

env_example.php
    

&lt;?php

// Set in .htaccess or server config:
// SetEnv DB_HOST localhost

echo "Database Host: " . ($_ENV['DB_HOST'] ?? 'not set') . "&lt;br&gt;";
echo "PHP Version: " . ($_ENV['PHP_VERSION'] ?? 'unknown');

// Alternative: getenv()
// echo "Database Host: " . getenv('DB_HOST');

$_ENV is populated from the environment PHP is running in. It's often used for
storing sensitive configuration like database credentials.

Environment variables can be set in server configuration files or .env files
(using libraries like vlucas/phpdotenv).

## $GLOBALS - Accessing All Global Variables

$GLOBALS references all variables available in global scope.

globals_example.php
    

&lt;?php

$siteName = "My Website";
$version = "1.0";

function displayInfo() {
    echo "Welcome to " . $GLOBALS['siteName'] . "&lt;br&gt;";
    echo "Version: " . $GLOBALS['version'];
}

displayInfo();

// Generally better to pass variables as parameters:
// function displayInfo($siteName, $version) { ... }

$GLOBALS provides access to global variables from any scope. However, using
global variables is generally discouraged in favor of passing variables explicitly.

The superglobals themselves are also available in $GLOBALS (e.g.,
$GLOBALS['_GET']).

## Best Practices

- **Validation:** Always validate and sanitize superglobal data.

- **Specificity:** Prefer $_GET/$_POST over $_REQUEST for clarity.

- **Security:** Escape output to prevent XSS attacks.

- **Sessions:** Regenerate session IDs after login.

- **Files:** Restrict allowed file types for uploads.

- **Cookies:** Use HttpOnly and Secure flags for sensitive cookies.

- **Environment:** Store sensitive data in $_ENV, not in code.

## Source

[PHP Superglobals Documentation](https://www.php.net/manual/en/language.variables.superglobals.php)

This tutorial covered PHP superglobals with practical examples showing their
usage in different scenarios. Superglobals are essential for web development.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).