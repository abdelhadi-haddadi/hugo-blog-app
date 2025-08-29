+++
title = "PHP PDOStatementInterface"
date = 2025-08-29T20:06:28.283+01:00
draft = false
description = "Learn about PHP PDOStatementInterface interface for extended functionality and flexibility in handling database statements."
image = ""
imageBig = ""
categories = ["php-pdo"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP PDOStatementInterface

last modified April 19, 2025

The PDOStatementInterface in PHP represents prepared statements and their
results. It provides methods to execute queries and fetch data.

## Basic Definition

PDOStatementInterface is an interface that defines methods for prepared
statements. It's implemented by PDOStatement class.

Key methods include execute, fetch,
fetchAll, bindParam, and
bindValue. These handle query execution and result processing.

## Basic PDOStatement Usage

This example shows basic prepared statement usage with PDOStatement.

pdo_basic.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;prepare('SELECT * FROM users WHERE id = ?');
    $stmt-&gt;execute([1]);
    
    $user = $stmt-&gt;fetch(PDO::FETCH_ASSOC);
    print_r($user);
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This creates a prepared statement, executes it with a parameter, and
fetches the result. The fetch method returns data as an associative array.

## Binding Parameters

This demonstrates explicit parameter binding with PDOStatement.

pdo_bind.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;prepare('INSERT INTO products (name, price) VALUES (:name, :price)');
    
    $name = 'Laptop';
    $price = 999.99;
    
    $stmt-&gt;bindParam(':name', $name, PDO::PARAM_STR);
    $stmt-&gt;bindParam(':price', $price, PDO::PARAM_STR);
    
    $stmt-&gt;execute();
    echo "Product inserted successfully";
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This uses bindParam to explicitly bind variables to parameters. The
third parameter specifies the data type. Values are bound by reference.

## Fetching Multiple Rows

This shows how to fetch multiple rows using PDOStatement.

pdo_fetch_all.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;prepare('SELECT * FROM products WHERE price &gt; ?');
    $stmt-&gt;execute([500]);
    
    $products = $stmt-&gt;fetchAll(PDO::FETCH_OBJ);
    
    foreach ($products as $product) {
        echo "{$product-&gt;name}: {$product-&gt;price}\n";
    }
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This fetches all rows matching the condition as objects. fetchAll retrieves
the complete result set at once. FETCH_OBJ returns stdClass objects.

## Column Binding

This demonstrates binding result columns to PHP variables.

pdo_bind_column.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;prepare('SELECT name, email FROM users WHERE id = ?');
    $stmt-&gt;execute([1]);
    
    $stmt-&gt;bindColumn('name', $name);
    $stmt-&gt;bindColumn('email', $email);
    
    if ($stmt-&gt;fetch(PDO::FETCH_BOUND)) {
        echo "Name: $name, Email: $email";
    }
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This binds result columns to variables. When fetch is called with FETCH_BOUND,
the variables are automatically populated. Column names must match the query.

## Row Count

This shows how to get the number of affected rows from a statement.

pdo_row_count.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;prepare('UPDATE products SET price = price * 1.1 WHERE category = ?');
    $stmt-&gt;execute(['Electronics']);
    
    $count = $stmt-&gt;rowCount();
    echo "Updated $count products";
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

rowCount returns the number of rows affected by the last statement. For SELECT
statements, behavior may vary by database driver.

## Fetching Column Metadata

This demonstrates retrieving column information from a result set.

pdo_metadata.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;prepare('SELECT * FROM products LIMIT 1');
    $stmt-&gt;execute();
    
    $meta = $stmt-&gt;getColumnMeta(0);
    print_r($meta);
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

getColumnMeta returns an array with information about a result column. The
information includes name, type, table, and other driver-specific details.

## Setting Fetch Mode

This shows how to set the default fetch mode for a statement.

pdo_fetch_mode.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;prepare('SELECT * FROM users');
    $stmt-&gt;setFetchMode(PDO::FETCH_CLASS, 'User');
    $stmt-&gt;execute();
    
    $users = $stmt-&gt;fetchAll();
    foreach ($users as $user) {
        echo $user-&gt;getName();
    }
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

setFetchMode configures how results will be fetched. This example fetches
into User class instances. The class must be defined before use.

## Best Practices

- **Always use prepared statements** to prevent SQL injection

- **Set error mode to exceptions** for better error handling

- **Close cursors** with closeCursor() when done

- **Use appropriate fetch modes** for your data structure

- **Bind parameters explicitly** for complex queries

## Source

[PHP PDOStatement Documentation](https://www.php.net/manual/en/class.pdostatement.php)

This tutorial covered the PDOStatementInterface with practical examples
showing database operations in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP PDO Functions](/php/#php-pdo).