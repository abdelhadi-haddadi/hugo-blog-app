+++
title = "PHP include_once Statement"
date = 2025-08-29T20:04:27.630+01:00
draft = false
description = "PHP include_once tutorial shows how to use file inclusion in PHP. Learn include_once with practical examples."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP include_once Statement

last modified April 16, 2025

The PHP include_once statement includes and evaluates the specified
file during script execution. It prevents multiple inclusions of the same file.
This is useful for including files like headers, footers, or configuration.

## Basic Definitions

The include_once statement includes a file only once, even if called
multiple times. It emits a warning if the file cannot be found but continues
execution.

Unlike include, include_once checks if the file was
previously included. This prevents function redefinitions and variable value
overwrites.

Syntax: include_once 'filename.php';. The file path can be absolute
or relative. PHP searches include paths if a relative path is given.

## Basic include_once Usage

This example demonstrates including a configuration file using include_once.

config.php
  

&lt;?php
// Database configuration
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', 'secret');
define('DB_NAME', 'mydb');

index.php
  

```
&lt;?php

include_once 'config.php';

echo "Database host: " . DB_HOST;

```

The code includes config.php once and uses its constants. If included multiple
times, it won't redefine constants. This prevents "already defined" errors.
The path is relative to the current script.

## Including Functions

This example shows how to include a file containing function definitions.

functions.php
  

&lt;?php

function calculateTotal(float $price, int $quantity): float
{
    return $price * $quantity;
}

order.php
  

```
&lt;?php

include_once 'functions.php';

$total = calculateTotal(12.99, 3);
echo "Order total: $" . $total;

```

The code includes functions.php to access its functions. Using include_once
prevents function redefinition errors. The function becomes available in the
including script's scope.

## Including HTML Templates

This example demonstrates including HTML header and footer files.

header.php
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;My Website&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;header&gt;
        &lt;h1&gt;Welcome to My Site&lt;/h1&gt;
    &lt;/header&gt;

footer.php
  

```
    &lt;footer&gt;
        &lt;p&gt;© 2025 My Website&lt;/p&gt;
    &lt;/footer&gt;
&lt;/body&gt;
&lt;/html&gt;

```

page.php
  

```
&lt;?php

include_once 'header.php';
?&gt;
    &lt;main&gt;
        &lt;p&gt;This is the main content of the page.&lt;/p&gt;
    &lt;/main&gt;
&lt;?php
include_once 'footer.php';

```

The code builds a complete HTML page by including header and footer. Using
include_once ensures these files are included exactly once. This pattern is
common in template-based PHP applications.

## Preventing Multiple Inclusions

This example shows how include_once prevents multiple inclusions of the same file.

counter.php
  

&lt;?php

$counter = 0;

test.php
  

```
&lt;?php

include_once 'counter.php';
$counter++;
include_once 'counter.php'; // Won't execute again
$counter++;

echo "Counter value: " . $counter; // Outputs 2

```

The code demonstrates that counter.php is included only once. The second
include_once is ignored. Without include_once, $counter would reset to 0.
This behavior prevents variable reinitialization.

## Conditional Inclusion

This example shows using include_once within conditional statements.

admin_functions.php
  

&lt;?php

function adminDashboard()
{
    echo "Admin dashboard loaded.";
}

user.php
  

```
&lt;?php

$isAdmin = true;

if ($isAdmin) {
    include_once 'admin_functions.php';
    adminDashboard();
} else {
    echo "Regular user view.";
}

```

The code conditionally includes admin functions only for admin users. The
include_once ensures the file is included once if needed. This pattern is
useful for role-based functionality.

## Including from Different Directories

This example demonstrates including files from different directory levels.

/lib/database.php
  

&lt;?php

function dbConnect()
{
    echo "Database connected.";
}

/public/index.php
  

```
&lt;?php

include_once __DIR__ . '/../lib/database.php';

dbConnect();

```

The code uses __DIR__ to create an absolute path to the included file. This
ensures the file can be found regardless of the working directory. Path
resolution is important in larger applications.

## Error Handling with include_once

This example shows how to handle missing files with include_once.

missing_file.php
  

&lt;?php

if (@include_once 'nonexistent.php') {
    echo "File included successfully.";
} else {
    echo "File not found, using fallback.";
    // Fallback code here
}

The code uses the @ operator to suppress the warning. It checks the return
value of include_once to handle failures gracefully. This approach is better
than letting PHP emit warnings.

## Best Practices

- **Use for dependencies:** Include files with functions/classes once.

- **Path resolution:** Use absolute paths with __DIR__ for reliability.

- **Error handling:** Check return values when files might be missing.

- **Organization:** Keep included files in a dedicated directory.

- **Performance:** Use require_once for critical files that must exist.

## Source

[PHP include_once Documentation](https://www.php.net/manual/en/function.include-once.php)

This tutorial covered PHP include_once with practical examples showing file
inclusion patterns, path handling, and error management in PHP applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).