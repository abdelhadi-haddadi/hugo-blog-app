+++
title = "PHP PDOStatement::columnCount"
date = 2025-08-29T20:06:31.615+01:00
draft = false
description = "PHP PDO tutorial shows how to work with databases using PDO in PHP. Learn PDO with practical examples."
image = ""
imageBig = ""
categories = ["php-pdo"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP PDOStatement::columnCount

last modified April 19, 2025

The PDOStatement::columnCount method returns the number of columns in
the result set represented by a PDOStatement object. This is useful
for dynamic result processing.

## Basic Definition

PDOStatement::columnCount returns an integer representing the number
of columns in a result set. It works after executing a SELECT query.

Syntax: public PDOStatement::columnCount(): int. The method
takes no parameters and returns the column count or zero if no result set.

## Basic columnCount Example

This shows the simplest usage of columnCount with a SELECT query.

basic_column_count.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;query('SELECT id, name, email FROM users');
    $columnCount = $stmt-&gt;columnCount();
    
    echo "The result set contains {$columnCount} columns";
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This connects to a database and executes a SELECT query. columnCount
returns 3 since we selected id, name, and email columns. Always check
for errors with try-catch.

## columnCount with Prepared Statements

This demonstrates columnCount with a prepared statement.

prepared_column_count.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;prepare('SELECT * FROM products WHERE price &gt; ?');
    $stmt-&gt;execute([50]);
    
    echo "Product result set has {$stmt-&gt;columnCount()} columns";
    
    while ($row = $stmt-&gt;fetch(PDO::FETCH_ASSOC)) {
        print_r($row);
    }
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This uses a prepared statement with a parameter. columnCount works after
execute(). The SELECT * means it returns all columns from the table.
The actual count depends on the table structure.

## columnCount with JOIN Queries

This shows columnCount with a query that joins multiple tables.

join_column_count.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $sql = 'SELECT u.name, o.order_date, o.total 
            FROM users u 
            JOIN orders o ON u.id = o.user_id';
    
    $stmt = $pdo-&gt;query($sql);
    echo "Joined result has {$stmt-&gt;columnCount()} columns";
    
    // Display column names
    for ($i = 0; $i &lt; $stmt-&gt;columnCount(); $i++) {
        $meta = $stmt-&gt;getColumnMeta($i);
        echo "Column {$i}: {$meta['name']}\n";
    }
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This JOIN query returns 3 columns from two tables. We use columnCount
to get the total columns and then display each column name using
getColumnMeta. This helps when processing unknown result structures.

## columnCount with Empty Results

This demonstrates columnCount behavior when no rows are returned.

empty_column_count.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;query('SELECT id, title FROM articles WHERE id = 999');
    
    if ($stmt-&gt;rowCount() === 0) {
        echo "No rows found, but column count is: {$stmt-&gt;columnCount()}";
    } else {
        while ($row = $stmt-&gt;fetch()) {
            print_r($row);
        }
    }
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

Even when no rows match the query (rowCount is 0), columnCount still
returns the number of columns that would be in the result set. Here
it returns 2 for id and title columns.

## Dynamic Result Processing

This shows how to use columnCount for processing unknown result sets.

dynamic_processing.php
  

&lt;?php

declare(strict_types=1);

function processResult(PDOStatement $stmt): void {
    $columnCount = $stmt-&gt;columnCount();
    
    echo "Processing {$columnCount} columns:\n";
    
    while ($row = $stmt-&gt;fetch(PDO::FETCH_NUM)) {
        for ($i = 0; $i &lt; $columnCount; $i++) {
            echo "Column {$i}: {$row[$i]} | ";
        }
        echo "\n";
    }
}

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;query('SELECT * FROM products LIMIT 3');
    processResult($stmt);
    
    $stmt = $pdo-&gt;query('SELECT id, name FROM users LIMIT 2');
    processResult($stmt);
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

The processResult function works with any query by using columnCount
to determine how many columns to process. FETCH_NUM returns indexed
arrays matching the column positions. This approach handles varying
result structures.

## columnCount with Different Fetch Modes

This demonstrates that columnCount is unaffected by fetch mode.

fetch_mode_column_count.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;query('SELECT id, name, email, created_at FROM users');
    
    echo "Initial column count: {$stmt-&gt;columnCount()}\n";
    
    // Change fetch mode - doesn't affect columnCount
    $stmt-&gt;setFetchMode(PDO::FETCH_OBJ);
    echo "After FETCH_OBJ: {$stmt-&gt;columnCount()}\n";
    
    $stmt-&gt;setFetchMode(PDO::FETCH_ASSOC);
    echo "After FETCH_ASSOC: {$stmt-&gt;columnCount()}\n";
    
    $stmt-&gt;setFetchMode(PDO::FETCH_NUM);
    echo "After FETCH_NUM: {$stmt-&gt;columnCount()}\n";
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

Changing the fetch mode with setFetchMode doesn't affect columnCount.
The method always returns the actual number of columns in the result
set regardless of how you choose to fetch the data.

## columnCount with Different Query Types

This shows columnCount behavior with non-SELECT queries.

non_select_column_count.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // SELECT query
    $stmt = $pdo-&gt;query('SELECT * FROM users LIMIT 1');
    echo "SELECT column count: {$stmt-&gt;columnCount()}\n";
    
    // INSERT query
    $stmt = $pdo-&gt;query('INSERT INTO users (name) VALUES ("Test")');
    echo "INSERT column count: {$stmt-&gt;columnCount()}\n";
    
    // UPDATE query
    $stmt = $pdo-&gt;query('UPDATE users SET name = "Test2" WHERE id = 1');
    echo "UPDATE column count: {$stmt-&gt;columnCount()}\n";
    
    // SHOW query
    $stmt = $pdo-&gt;query('SHOW TABLES');
    echo "SHOW column count: {$stmt-&gt;columnCount()}\n";
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

columnCount returns the number of columns in a result set. For SELECT
and SHOW queries this will be positive. For INSERT, UPDATE, DELETE it
returns 0 since these don't produce result sets. Always check the value.

## Best Practices

- **Check Before Use:** Verify columnCount &gt; 0 before processing.

- **Combine with getColumnMeta:** For detailed column information.

- **Use with Dynamic Queries:** When the result structure is unknown.

- **Error Handling:** Always wrap in try-catch blocks.

- **Performance:** No significant overhead for calling columnCount.

## Source

[PHP PDOStatement::columnCount Documentation](https://www.php.net/manual/en/pdostatement.columncount.php)

This tutorial covered the PDOStatement::columnCount method with practical
examples showing its usage in different database scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP PDO Functions](/php/#php-pdo).