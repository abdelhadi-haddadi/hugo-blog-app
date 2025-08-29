+++
title = "PHP PDOStatement::fetchColumn Tutorial"
date = 2025-08-29T20:06:33.820+01:00
draft = false
description = "Explore the PHP PDOStatement::fetchColumn method to retrieve a single column from query results."
image = ""
imageBig = ""
categories = ["php-pdo"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP PDOStatement::fetchColumn Tutorial

last modified April 19, 2025

The PDOStatement::fetchColumn method in PHP retrieves a single column from
the next row of a result set. It's efficient for getting scalar values.

## Basic Definition

PDOStatement::fetchColumn returns a single column from the next row of a
result set. It moves the internal pointer forward after fetching.

Syntax: public PDOStatement::fetchColumn(int $column = 0): mixed.
The optional parameter specifies which column to return (0-indexed).

## Fetching a Single Column Value

This example demonstrates fetching a single value from the first column.

fetch_single.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;query('SELECT COUNT(*) FROM users');
    $count = $stmt-&gt;fetchColumn();
    
    echo "Total users: $count";
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This counts all users in the database. fetchColumn returns the first column
from the first row of the result set. It's perfect for aggregate functions.

## Fetching Specific Column

This shows how to fetch a specific column by its index.

fetch_specific.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;query('SELECT id, name, email FROM users LIMIT 1');
    $email = $stmt-&gt;fetchColumn(2);
    
    echo "User email: $email";
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This fetches the email (third column, index 2) from the first user. Column
indexing starts at 0. The method returns false if no more rows exist.

## Looping Through a Column

This demonstrates iterating through all values in a single column.

fetch_loop.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;query('SELECT name FROM users');
    
    echo "User names:\n";
    while ($name = $stmt-&gt;fetchColumn()) {
        echo "- $name\n";
    }
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This loops through all names in the users table. Each fetchColumn call
moves to the next row. The loop ends when fetchColumn returns false.

## With Prepared Statements

This shows fetchColumn used with prepared statements.

fetch_prepared.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;prepare('SELECT email FROM users WHERE id = ?');
    $stmt-&gt;execute([42]);
    
    $email = $stmt-&gt;fetchColumn();
    
    if ($email !== false) {
        echo "User email: $email";
    } else {
        echo "User not found";
    }
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This safely fetches an email using a prepared statement. We check for false
to handle cases where no user matches the ID. Always validate the return value.

## Fetching Multiple Columns

This demonstrates how to fetch different columns sequentially.

fetch_multiple.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;query('SELECT name, email, created_at FROM users LIMIT 1');
    
    $name = $stmt-&gt;fetchColumn(0);
    $email = $stmt-&gt;fetchColumn(1);
    $date = $stmt-&gt;fetchColumn(2);
    
    echo "Name: $name, Email: $email, Joined: $date";
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This fetches three different columns from the same row. Each fetchColumn
call advances the row pointer, so this approach only works for single-row
results. For multiple rows, use fetch() instead.

## Handling NULL Values

This shows how fetchColumn handles NULL database values.

fetch_null.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;query('SELECT middle_name FROM users WHERE id = 1');
    $middleName = $stmt-&gt;fetchColumn();
    
    if ($middleName === false) {
        echo "User not found";
    } elseif ($middleName === null) {
        echo "No middle name specified";
    } else {
        echo "Middle name: $middleName";
    }
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This demonstrates NULL handling. A NULL database value returns as PHP null.
A missing row returns false. Always check both possibilities when working with
nullable columns.

## Performance Comparison

This compares fetchColumn with fetch for single-column retrieval.

fetch_performance.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Using fetch
    $start = microtime(true);
    $stmt = $pdo-&gt;query('SELECT name FROM users');
    while ($row = $stmt-&gt;fetch(PDO::FETCH_ASSOC)) {
        $name = $row['name'];
    }
    $fetchTime = microtime(true) - $start;
    
    // Using fetchColumn
    $start = microtime(true);
    $stmt = $pdo-&gt;query('SELECT name FROM users');
    while ($name = $stmt-&gt;fetchColumn()) {
        // Just getting the name
    }
    $fetchColumnTime = microtime(true) - $start;
    
    echo "Fetch time: $fetchTime\n";
    echo "fetchColumn time: $fetchColumnTime";
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This benchmarks both methods. fetchColumn is slightly faster for single-column
retrieval as it avoids creating associative arrays. The difference becomes
noticeable with large result sets.

## Best Practices

- **Column Index:** Always specify when not using first column.

- **NULL Handling:** Check for both false and null returns.

- **Single Column:** Use only when you need one column.

- **Performance:** Prefer for large single-column results.

- **Error Checking:** Always verify the return value.

## Source

[PHP fetchColumn Documentation](https://www.php.net/manual/en/pdostatement.fetchcolumn.php)

This tutorial covered the PDOStatement::fetchColumn method with
practical examples showing various usage scenarios and best practices.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP PDO Functions](/php/#php-pdo).