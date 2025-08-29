+++
title = "PHP include Statement"
date = 2025-08-29T20:04:27.627+01:00
draft = false
description = "PHP include tutorial shows how to use the include keyword in PHP. Learn file inclusion with practical examples."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP include Statement

last modified April 16, 2025

The PHP include statement allows inserting the content of one PHP
file into another before execution. This enables code reuse and modular
programming. Included files share the same variable scope as the including file.

## Basic Definitions

The include statement includes and evaluates the specified file.
If the file is not found, PHP emits a warning but continues execution.

Related statements are require, include_once, and
require_once. Require stops execution if the file is missing.

The *_once variants prevent multiple inclusions of the same file. This avoids
function redefinitions and variable reassignments from duplicate includes.

## Basic File Inclusion

This example demonstrates including a simple header file in a main page.

index.php
  

&lt;?php

declare(strict_types=1);

include 'header.php';

echo "&lt;main&gt;Welcome to our website!&lt;/main&gt;";

include 'footer.php';

header.php
  

```
&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;My Website&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;header&gt;
    &lt;h1&gt;Website Header&lt;/h1&gt;
&lt;/header&gt;

```

The main file includes both header and footer files. The included files become
part of the final output. This allows consistent headers/footers across pages.
Path can be relative or absolute.

## Including Configuration Files

This example shows including a configuration file with settings and constants.

config.php
  

&lt;?php

declare(strict_types=1);

const DB_HOST = 'localhost';
const DB_NAME = 'mydb';
const DB_USER = 'admin';
const DB_PASS = 'secret';

app.php
  

```
&lt;?php

declare(strict_types=1);

include 'config.php';

$connection = new PDO(
    "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME,
    DB_USER,
    DB_PASS
);

echo "Connected to database: " . DB_NAME;

```

The config file defines database constants. The main app file includes it to
access these settings. This centralizes configuration management. Changes only
need to be made in one file.

## Including Function Libraries

This example demonstrates including a file containing reusable functions.

functions.php
  

&lt;?php

declare(strict_types=1);

function formatDate(string $date): string
{
    return date('F j, Y', strtotime($date));
}

function sanitizeInput(string $input): string
{
    return htmlspecialchars(trim($input));
}

profile.php
  

```
&lt;?php

declare(strict_types=1);

include 'functions.php';

$userInput = "   &lt;script&gt;alert('xss')&lt;/script&gt;   ";
$cleanInput = sanitizeInput($userInput);

$joinDate = '2023-04-15';
echo "Member since: " . formatDate($joinDate);

```

The functions file contains utility functions. The profile page includes it to
use these functions. This promotes code reuse across multiple pages. Functions
become available to the including file.

## Conditional Includes

This example shows how to include files based on certain conditions.

page.php
  

&lt;?php

declare(strict_types=1);

$userRole = 'admin';

if ($userRole === 'admin') {
    include 'admin-menu.php';
} else {
    include 'user-menu.php';
}

echo "&lt;div class='content'&gt;Main page content&lt;/div&gt;";

admin-menu.php
  

```
&lt;nav&gt;
    &lt;a href='dashboard.php'&gt;Dashboard&lt;/a&gt;
    &lt;a href='users.php'&gt;Manage Users&lt;/a&gt;
    &lt;a href='settings.php'&gt;Settings&lt;/a&gt;
&lt;/nav&gt;

```

The page includes different menu files based on user role. This allows dynamic
content inclusion. The condition determines which file gets included. All
variables are available to included files.

## Include Path Configuration

This example demonstrates setting include paths and using absolute paths.

setup.php
  

&lt;?php

declare(strict_types=1);

// Add directory to include path
set_include_path(get_include_path() . PATH_SEPARATOR . '/var/www/includes');

// Now can include files from that directory
include 'utilities.php';

// Or use absolute path
include __DIR__ . '/templates/header.php';

echo "Application initialized";

The script configures additional include paths. Files can then be included from
these paths without full paths. __DIR__ provides the current
directory. This makes includes more portable across environments.

## Include vs Require

This example compares include and require statements and their behavior.

compare.php
  

&lt;?php

declare(strict_types=1);

// Will emit warning but continue execution
include 'nonexistent.php';
echo "This still executes after include failure";

// Will halt execution with fatal error
require 'nonexistent.php';
echo "This line won't be reached";

Include emits warnings for missing files but continues. Require stops execution
for missing files. Choose based on file importance. Critical files should use
require. Optional files can use include.

## Include_once Example

This example demonstrates using include_once to prevent multiple inclusions.

init.php
  

&lt;?php

declare(strict_types=1);

function initializeApp() {
    echo "Application initialized\n";
}

initializeApp();

main.php
  

```
&lt;?php

declare(strict_types=1);

include_once 'init.php';
include_once 'init.php'; // Won't be included again

echo "Main application code";

```

The init.php file contains initialization code. Main.php includes it twice but
with include_once. The second inclusion is skipped. This prevents function
redefinition errors. Useful for files that should only load once.

## Best Practices

- **Security:** Validate file paths to prevent directory traversal.

- **Organization:** Keep included files in a dedicated directory.

- **Performance:** Use opcache for frequently included files.

- **Error Handling:** Check if critical files exist before including.

- **Naming:** Use clear naming conventions for included files.

## Source

[PHP include Documentation](https://www.php.net/manual/en/function.include.php)

This tutorial covered PHP file inclusion with practical examples showing
include usage in various scenarios and best practices.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).