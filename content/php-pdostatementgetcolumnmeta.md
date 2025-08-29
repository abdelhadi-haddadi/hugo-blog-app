+++
title = "PHP PDOStatement::getColumnMeta"
date = 2025-08-29T20:06:34.941+01:00
draft = false
description = "PHP PDO tutorial shows how to work with databases using PDO in PHP. Learn PDO with practical examples."
image = ""
imageBig = ""
categories = ["php-pdo"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP PDOStatement::getColumnMeta

last modified April 19, 2025

The PDOStatement::getColumnMeta method retrieves metadata for a column in a
result set. It provides information about column name, type, and other details.

## Basic Definition

PDOStatement::getColumnMeta returns an associative array containing metadata
about a column in a result set. The method accepts a zero-based column index.

Syntax: PDOStatement::getColumnMeta(int $column). Returns an array
of metadata or false on failure. Not all drivers support this method.

## Basic Column Metadata

This example shows how to get basic metadata for the first column in a result set.

basic_metadata.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;query('SELECT id, name, email FROM users LIMIT 1');
    $meta = $stmt-&gt;getColumnMeta(0);
    
    echo "Column 0 Metadata:\n";
    print_r($meta);
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This retrieves metadata for the first column (index 0) in the result set. The
output includes column name, native_type, flags, table, and other information.

## Getting All Columns Metadata

This demonstrates how to get metadata for all columns in a result set.

all_columns_meta.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;query('SELECT id, name, email, created_at FROM users LIMIT 1');
    $columnCount = $stmt-&gt;columnCount();
    
    for ($i = 0; $i &lt; $columnCount; $i++) {
        $meta = $stmt-&gt;getColumnMeta($i);
        echo "Column $i: {$meta['name']} ({$meta['native_type']})\n";
    }
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This loops through all columns using columnCount() and gets metadata for each.
It displays each column's name and native data type from the database.

## Checking Column Flags

This example shows how to check column flags like primary key or not null.

column_flags.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;query('SELECT id, name FROM users LIMIT 1');
    $meta = $stmt-&gt;getColumnMeta(0);
    
    if (in_array('primary_key', $meta['flags'])) {
        echo "Column {$meta['name']} is a primary key\n";
    }
    
    if (in_array('not_null', $meta['flags'])) {
        echo "Column {$meta['name']} cannot be null\n";
    }
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This checks the flags array in the column metadata to determine if the column
is a primary key or has a NOT NULL constraint. Different drivers may return
different flags.

## Getting Table Name for Column

This demonstrates how to get the source table name for a result set column.

table_name.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;query('SELECT u.id, u.name, p.title FROM users u JOIN posts p ON u.id = p.user_id');
    $meta = $stmt-&gt;getColumnMeta(2);
    
    if (isset($meta['table'])) {
        echo "Column {$meta['name']} comes from table {$meta['table']}\n";
    } else {
        echo "Table information not available\n";
    }
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This gets the table name for the third column in a JOIN query result. Note that
not all database drivers may provide table information in the metadata.

## Handling Unsupported Drivers

This shows how to handle cases where getColumnMeta is not supported.

unsupported_driver.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('sqlite::memory:');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $pdo-&gt;exec('CREATE TABLE test (id INTEGER PRIMARY KEY, name TEXT)');
    $stmt = $pdo-&gt;query('SELECT * FROM test');
    
    $meta = $stmt-&gt;getColumnMeta(0);
    if ($meta === false) {
        echo "getColumnMeta not supported by SQLite driver\n";
    } else {
        print_r($meta);
    }
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This tests if getColumnMeta is supported by the SQLite driver. The method
returns false for unsupported drivers. Always check the return value.

## Working with Different Data Types

This example examines how different data types appear in column metadata.

data_types.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;query('SELECT id, name, salary, created_at FROM users LIMIT 1');
    
    for ($i = 0; $i &lt; $stmt-&gt;columnCount(); $i++) {
        $meta = $stmt-&gt;getColumnMeta($i);
        echo "{$meta['name']}: {$meta['native_type']} (len: {$meta['len']})\n";
    }
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This displays the native type and length for each column. Different database
systems may report types differently (e.g., INT vs INTEGER).

## Building a Dynamic Result Processor

This shows how to use column metadata to process results dynamically.

dynamic_processor.php
  

&lt;?php

declare(strict_types=1);

function processResults(PDOStatement $stmt): void {
    $columnCount = $stmt-&gt;columnCount();
    $columns = [];
    
    // Get metadata for all columns
    for ($i = 0; $i &lt; $columnCount; $i++) {
        $columns[$i] = $stmt-&gt;getColumnMeta($i);
    }
    
    // Process each row
    while ($row = $stmt-&gt;fetch(PDO::FETCH_ASSOC)) {
        foreach ($row as $col =&gt; $value) {
            $index = array_search($col, array_column($columns, 'name'));
            $type = $columns[$index]['native_type'];
            
            echo "{$col} ({$type}): " . htmlspecialchars($value) . "\n";
        }
        echo "---\n";
    }
}

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;query('SELECT id, name, email FROM users LIMIT 5');
    processResults($stmt);
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This function uses column metadata to process results without knowing the
structure in advance. It displays each column's name, type, and value.

## Best Practices

- **Check Support:** Verify driver supports getColumnMeta.

- **Error Handling:** Always check for false return value.

- **Column Indexes:** Remember they are zero-based.

- **Performance:** Cache metadata if used repeatedly.

- **Driver Differences:** Be aware of varying implementations.

## Source

[PHP getColumnMeta Documentation](https://www.php.net/manual/en/pdostatement.getcolumnmeta.php)

This tutorial covered the PDOStatement::getColumnMeta method with practical
examples showing how to retrieve and use column metadata in PHP applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP PDO Functions](/php/#php-pdo).