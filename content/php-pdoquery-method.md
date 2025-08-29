+++
title = "PHP PDO::query Method"
date = 2025-08-29T20:06:28.286+01:00
draft = false
description = "Understand the PHP PDO::query method for executing SQL queries and fetching results with ease."
image = ""
imageBig = ""
categories = ["php-pdo"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP PDO::query Method

last modified April 19, 2025

The PDO::query method executes an SQL statement and returns a result set as
a PDOStatement object. It's ideal for SELECT statements that don't require
parameters.

## Basic Definition

PDO::query executes an SQL statement in a single function call. It returns
the result set as a PDOStatement object. The method is suitable for one-off
queries.

Syntax: public PDO::query(string $query, ?int $fetchMode = null): PDOStatement|false.
The $query parameter contains the SQL to execute. $fetchMode optionally sets
the fetch mode.

## Basic SELECT Query

This example demonstrates a simple SELECT query using PDO::query.

pdo_query_basic.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;query('SELECT id, name, email FROM users');
    
    foreach ($stmt as $row) {
        echo "ID: {$row['id']}, Name: {$row['name']}, Email: {$row['email']}\n";
    }
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This executes a SELECT query and iterates through the results. The query
method returns a PDOStatement object. We can directly iterate over it
using foreach.

## Query with Fetch Mode

This shows how to specify a fetch mode directly in the query method.

pdo_query_fetch_mode.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;query('SELECT id, name FROM users', PDO::FETCH_ASSOC);
    
    while ($row = $stmt-&gt;fetch()) {
        echo "ID: {$row['id']}, Name: {$row['name']}\n";
    }
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

Here we specify PDO::FETCH_ASSOC as the fetch mode. This makes the fetch
method return results as associative arrays. The mode applies to all
subsequent fetches.

## Query with Object Fetch Mode

This demonstrates fetching results as objects using PDO::query.

pdo_query_object.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;query('SELECT id, name FROM users', PDO::FETCH_OBJ);
    
    while ($user = $stmt-&gt;fetch()) {
        echo "ID: {$user-&gt;id}, Name: {$user-&gt;name}\n";
    }
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

Using PDO::FETCH_OBJ makes fetch return stdClass objects. We access
properties with the object operator (-&gt;). This is useful for OOP code.

## Query with Fetch All

This example shows how to retrieve all results at once using fetchAll.

pdo_query_fetch_all.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;query('SELECT id, name, email FROM users');
    $users = $stmt-&gt;fetchAll(PDO::FETCH_ASSOC);
    
    foreach ($users as $user) {
        echo "ID: {$user['id']}, Name: {$user['name']}\n";
    }
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

fetchAll retrieves all rows at once into an array. This is convenient for
small result sets. For large datasets, consider fetching rows one by one.

## Query with Column Count

This demonstrates getting column information from a query result.

pdo_query_column_count.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;query('SELECT id, name, email FROM users');
    
    echo "Column count: " . $stmt-&gt;columnCount() . "\n";
    
    for ($i = 0; $i &lt; $stmt-&gt;columnCount(); $i++) {
        $meta = $stmt-&gt;getColumnMeta($i);
        echo "Column {$i}: {$meta['name']} ({$meta['native_type']})\n";
    }
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

columnCount returns the number of columns in the result set. getColumnMeta
provides metadata about each column. This is useful for dynamic processing.

## Query with Single Row

This shows how to retrieve just a single row from a query result.

pdo_query_single_row.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;query('SELECT name, email FROM users WHERE id = 1');
    $user = $stmt-&gt;fetch(PDO::FETCH_ASSOC);
    
    if ($user) {
        echo "Name: {$user['name']}, Email: {$user['email']}\n";
    } else {
        echo "User not found\n";
    }
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

When you only need one row, fetch retrieves just that row. This is more
efficient than fetchAll for single-row results. Always check if the result
exists.

## Query with Row Count

This demonstrates getting the number of rows returned by a query.

pdo_query_row_count.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;query('SELECT id, name FROM users');
    $rowCount = $stmt-&gt;rowCount();
    
    echo "Number of rows: $rowCount\n";
    
    if ($rowCount &gt; 0) {
        foreach ($stmt as $row) {
            echo "ID: {$row['id']}, Name: {$row['name']}\n";
        }
    }
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

rowCount returns the number of rows affected by the last statement. For
SELECT statements, it may not work with all database drivers. Check your
driver's documentation.

## Best Practices

- **Use for Simple Queries:** PDO::query is best for static SQL.

- **Prepared Statements:** Use prepare/execute for user input.

- **Error Handling:** Always use try-catch with PDO operations.

- **Fetch Modes:** Choose the most appropriate for your needs.

- **Resource Cleanup:** Let PDO close statements automatically.

## Source

[PHP PDO::query Documentation](https://www.php.net/manual/en/pdo.query.php)

This tutorial covered the PDO::query method with practical examples showing
different ways to execute and process SQL queries in PHP.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP PDO Functions](/php/#php-pdo).