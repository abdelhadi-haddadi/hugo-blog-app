+++
title = "PHP PDO::getAvailableDrivers Method"
date = 2025-08-29T20:06:24.984+01:00
draft = false
description = "PHP PDO tutorial shows how to work with databases using PDO in PHP. Learn PDO with practical examples."
image = ""
imageBig = ""
categories = ["php-pdo"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP PDO::getAvailableDrivers Method

last modified April 19, 2025

The PDO::getAvailableDrivers method returns an array of available PDO drivers.
These drivers enable PHP to connect to different database management systems.

## Basic Definition

PDO::getAvailableDrivers is a static method that lists all currently
installed PDO drivers. It requires no parameters and returns an array.

Syntax: public static PDO::getAvailableDrivers(): array.
The returned array contains driver names like mysql, sqlite, pgsql.

## Basic Usage

This example shows the simplest way to use getAvailableDrivers.

basic_usage.php
  

&lt;?php

$drivers = PDO::getAvailableDrivers();

print_r($drivers);

This code retrieves all available PDO drivers and prints them.
The output will vary depending on your PHP installation and
configured database drivers.

## Checking for Specific Driver

This example checks if a specific database driver is available.

check_driver.php
  

&lt;?php

$drivers = PDO::getAvailableDrivers();

if (in_array('mysql', $drivers)) {
    echo "MySQL driver is available";
} else {
    echo "MySQL driver is NOT available";
}

This checks if the MySQL driver is installed before attempting
to connect to a MySQL database. It's good practice to verify
driver availability.

## Listing Drivers with Count

This example lists all available drivers with a count.

list_drivers.php
  

&lt;?php

$drivers = PDO::getAvailableDrivers();

echo "Available PDO drivers (" . count($drivers) . "):\n";

foreach ($drivers as $driver) {
    echo "- $driver\n";
}

This provides a formatted list of all available drivers with
a count. The foreach loop iterates through each driver name.

## Driver Availability Check Function

This creates a reusable function to check driver availability.

driver_check.php
  

&lt;?php

function isDriverAvailable(string $driver): bool {
    return in_array($driver, PDO::getAvailableDrivers());
}

// Usage:
if (isDriverAvailable('sqlite')) {
    echo "SQLite is available for use";
} else {
    echo "SQLite is NOT available";
}

This encapsulates the driver check in a reusable function.
The function returns true if the specified driver is available.

## Conditional Connection Based on Drivers

This shows how to connect to different databases based on available drivers.

conditional_connect.php
  

&lt;?php

$drivers = PDO::getAvailableDrivers();

try {
    if (in_array('mysql', $drivers)) {
        $pdo = new PDO('mysql:host=localhost;dbname=test', 'user', 'pass');
    } elseif (in_array('sqlite', $drivers)) {
        $pdo = new PDO('sqlite:/path/to/database.db');
    } else {
        throw new Exception('No supported database drivers available');
    }
    
    echo "Connected successfully";
} catch (PDOException $e) {
    echo "Connection failed: " . $e-&gt;getMessage();
}

This attempts to connect to MySQL first, then falls back to SQLite.
It throws an exception if no supported drivers are available.

## Generating Driver Options for UI

This generates HTML select options for available database drivers.

driver_options.php
  

&lt;?php

$drivers = PDO::getAvailableDrivers();

echo "&lt;select name='database_driver'&gt;";
foreach ($drivers as $driver) {
    echo "&lt;option value='$driver'&gt;$driver&lt;/option&gt;";
}
echo "&lt;/select&gt;";

This creates a dropdown menu in HTML with all available drivers.
It's useful for configuration interfaces where users select databases.

## Driver Information with Descriptions

This provides more detailed information about each available driver.

driver_info.php
  

&lt;?php

$driverInfo = [
    'mysql' =&gt; 'MySQL database',
    'sqlite' =&gt; 'SQLite 3 database',
    'pgsql' =&gt; 'PostgreSQL database',
    'oci' =&gt; 'Oracle database',
    'sqlsrv' =&gt; 'Microsoft SQL Server'
];

$drivers = PDO::getAvailableDrivers();

echo "Available PDO Drivers:\n";
foreach ($drivers as $driver) {
    $desc = $driverInfo[$driver] ?? 'Unknown database driver';
    echo "- $driver: $desc\n";
}

This enhances the basic driver list with descriptive information.
The array maps driver names to human-readable descriptions.

## Best Practices

- **Check Early:** Verify driver availability before connection attempts.

- **Provide Fallbacks:** Offer alternative databases when possible.

- **User Feedback:** Clearly inform users about missing drivers.

- **Document Requirements:** List needed drivers in your documentation.

- **Error Handling:** Handle missing drivers gracefully in your code.

## Source

[PHP PDO::getAvailableDrivers Documentation](https://www.php.net/manual/en/pdo.getavailabledrivers.php)

This tutorial covered the PDO::getAvailableDrivers method with
practical examples showing different ways to use this functionality in PHP
applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP PDO Functions](/php/#php-pdo).