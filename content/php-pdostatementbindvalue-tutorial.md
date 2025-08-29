+++
title = "PHP PDOStatement::bindValue Tutorial"
date = 2025-08-29T20:06:30.508+01:00
draft = false
description = "Understand the PHP PDOStatement::bindValue method for binding values directly to query parameters."
image = ""
imageBig = ""
categories = ["php-pdo"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP PDOStatement::bindValue Tutorial

last modified April 19, 2025

The PDOStatement::bindValue method binds a value to a parameter in a prepared
statement. It is essential for secure database operations in PHP.

## Basic Definition

PDOStatement::bindValue binds a value to a parameter in a SQL statement.
Unlike bindParam, it binds the value at the time of calling bindValue.

Syntax: PDOStatement::bindValue(string|int $param, mixed $value, int $type = PDO::PARAM_STR).
The param can be named (:name) or positional (?). The type specifies data type.

## Basic bindValue Usage

This shows the simplest way to use bindValue with a prepared statement.

bind_value_basic.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;prepare('SELECT * FROM users WHERE id = :id');
    $stmt-&gt;bindValue(':id', 5, PDO::PARAM_INT);
    $stmt-&gt;execute();
    
    $user = $stmt-&gt;fetch();
    if ($user) {
        echo "User found: {$user['name']}";
    }
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This binds an integer value to a named parameter. The third parameter specifies
the data type as integer. The value is bound when bindValue is called.

## Binding Multiple Values

Demonstrates binding multiple values to different parameter types.

bind_value_multiple.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;prepare('INSERT INTO products (name, price, active) VALUES (?, ?, ?)');
    $stmt-&gt;bindValue(1, 'Laptop', PDO::PARAM_STR);
    $stmt-&gt;bindValue(2, 999.99, PDO::PARAM_STR);
    $stmt-&gt;bindValue(3, true, PDO::PARAM_BOOL);
    $stmt-&gt;execute();
    
    echo "Product added successfully";
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This binds three different value types to positional parameters. Note that
floats should use PARAM_STR. Boolean values use PARAM_BOOL.

## Binding NULL Values

Shows how to properly bind NULL values to database columns.

bind_value_null.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;prepare('UPDATE users SET middle_name = :middle WHERE id = :id');
    $stmt-&gt;bindValue(':middle', null, PDO::PARAM_NULL);
    $stmt-&gt;bindValue(':id', 10, PDO::PARAM_INT);
    $stmt-&gt;execute();
    
    echo "Record updated with NULL value";
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

To bind NULL values, use PDO::PARAM_NULL as the type parameter. This ensures
the database receives a proper NULL value rather than an empty string.

## Binding Large Strings

Demonstrates binding large text values to database columns.

bind_value_large_string.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $largeText = file_get_contents('large_document.txt');
    
    $stmt = $pdo-&gt;prepare('INSERT INTO documents (title, content) VALUES (:title, :content)');
    $stmt-&gt;bindValue(':title', 'User Manual', PDO::PARAM_STR);
    $stmt-&gt;bindValue(':content', $largeText, PDO::PARAM_LOB);
    $stmt-&gt;execute();
    
    echo "Large document stored successfully";
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

For large strings or binary data, use PDO::PARAM_LOB. This handles the data
as a large object, which is more efficient for memory usage.

## Binding Dates

Shows how to properly bind date values to database columns.

bind_value_date.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $birthDate = new DateTime('1990-05-15');
    $formattedDate = $birthDate-&gt;format('Y-m-d');
    
    $stmt = $pdo-&gt;prepare('INSERT INTO employees (name, birth_date) VALUES (:name, :date)');
    $stmt-&gt;bindValue(':name', 'Alice Johnson', PDO::PARAM_STR);
    $stmt-&gt;bindValue(':date', $formattedDate, PDO::PARAM_STR);
    $stmt-&gt;execute();
    
    echo "Employee record created with date";
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

Dates should be formatted as strings in the database's expected format.
The example uses Y-m-d format which is standard for MySQL dates.

## Binding Arrays

Demonstrates a technique for binding arrays to IN clauses.

bind_value_array.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $ids = [3, 7, 12, 15];
    $placeholders = rtrim(str_repeat('?,', count($ids)), ',');
    
    $stmt = $pdo-&gt;prepare("SELECT * FROM products WHERE id IN ($placeholders)");
    
    foreach ($ids as $index =&gt; $id) {
        $stmt-&gt;bindValue($index + 1, $id, PDO::PARAM_INT);
    }
    
    $stmt-&gt;execute();
    $products = $stmt-&gt;fetchAll();
    
    echo "Found " . count($products) . " products";
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

PDO doesn't directly support array binding. This creates placeholders
dynamically and binds each array element separately. The index starts at 1.

## Binding with Different Data Types

Shows binding various PHP data types to their corresponding SQL types.

bind_value_data_types.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;prepare('INSERT INTO test_data (int_val, float_val, bool_val, str_val) VALUES (?, ?, ?, ?)');
    
    $stmt-&gt;bindValue(1, 42, PDO::PARAM_INT);
    $stmt-&gt;bindValue(2, 3.14159, PDO::PARAM_STR); // Float as string
    $stmt-&gt;bindValue(3, false, PDO::PARAM_BOOL);
    $stmt-&gt;bindValue(4, 'Hello World', PDO::PARAM_STR);
    
    $stmt-&gt;execute();
    
    echo "Data with different types inserted";
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This demonstrates binding different PHP types to SQL parameters. Note that
floats should be bound as strings to avoid precision issues.

## Best Practices

- **Always specify data types:** Don't rely on automatic type detection.

- **Use named parameters:** They make code more readable.

- **Validate before binding:** Ensure data matches expected format.

- **Reuse statements:** Prepare once, bind/execute multiple times.

- **Close statements:** When done to free resources.

## Source

[PHP bindValue Documentation](https://www.php.net/manual/en/pdostatement.bindvalue.php)

This tutorial covered the PDOStatement::bindValue method with
practical examples showing different binding scenarios and data types.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP PDO Functions](/php/#php-pdo).