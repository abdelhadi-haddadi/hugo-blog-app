+++
title = "PHP PDOStatement::bindColumn Tutorial"
date = 2025-08-29T20:06:30.511+01:00
draft = false
description = "Master the PHP PDOStatement::bindColumn method to bind SQL query result columns for streamlined data retrieval."
image = ""
imageBig = ""
categories = ["php-pdo"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP PDOStatement::bindColumn Tutorial

last modified April 19, 2025

The PDOStatement::bindColumn method in PHP binds a PHP variable to a column
in the result set. This allows direct access to column values through
variables as rows are fetched.

## Basic Definition

PDOStatement::bindColumn binds a PHP variable to a column in the result set.
The variable will automatically be updated with the column's value when
fetching rows.

Syntax: PDOStatement::bindColumn(mixed $column, mixed &amp;$param, int $type = PDO::PARAM_STR, int $maxlen = 0, mixed $driverdata = null): bool.

The $column can be a column number (1-indexed) or name. $param is the PHP
variable to bind. $type specifies the data type for the parameter.

## Basic Column Binding

This example shows how to bind columns to variables for a simple query.

pdo_bindcolumn_basic.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;prepare('SELECT id, name, email FROM users');
    $stmt-&gt;execute();
    
    $stmt-&gt;bindColumn('id', $id);
    $stmt-&gt;bindColumn('name', $name);
    $stmt-&gt;bindColumn('email', $email);
    
    while ($stmt-&gt;fetch(PDO::FETCH_BOUND)) {
        echo "ID: $id, Name: $name, Email: $email\n";
    }
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This binds three columns to variables. When fetch(PDO::FETCH_BOUND) is called,
the variables are automatically updated. The column names are used to specify
which columns to bind.

## Binding by Column Number

This demonstrates binding columns using their numeric positions instead of names.

pdo_bindcolumn_numbers.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;prepare('SELECT id, name FROM users');
    $stmt-&gt;execute();
    
    $stmt-&gt;bindColumn(1, $id);
    $stmt-&gt;bindColumn(2, $name);
    
    while ($stmt-&gt;fetch(PDO::FETCH_BOUND)) {
        echo "ID: $id, Name: $name\n";
    }
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

Columns are bound by their position in the result set (1-indexed). The first
column is id (position 1), the second is name (position 2). This approach
works even if column names change.

## Specifying Data Types

This shows how to specify data types when binding columns to variables.

pdo_bindcolumn_types.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;prepare('SELECT id, name, salary FROM users');
    $stmt-&gt;execute();
    
    $stmt-&gt;bindColumn('id', $id, PDO::PARAM_INT);
    $stmt-&gt;bindColumn('name', $name, PDO::PARAM_STR);
    $stmt-&gt;bindColumn('salary', $salary, PDO::PARAM_STR); // Using STR for decimal
    
    while ($stmt-&gt;fetch(PDO::FETCH_BOUND)) {
        echo "ID: $id (".gettype($id)."), Name: $name (".gettype($name)."), Salary: $salary\n";
    }
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

The third parameter specifies the data type. PDO::PARAM_INT ensures the id is
an integer. PDO::PARAM_STR is used for strings. For decimal numbers, STR is
often used as there's no specific decimal type.

## Binding to Class Properties

This demonstrates binding columns to properties of an object.

pdo_bindcolumn_class.php
  

&lt;?php

declare(strict_types=1);

class User {
    public $id;
    public $name;
    public $email;
}

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;prepare('SELECT id, name, email FROM users');
    $stmt-&gt;execute();
    
    $user = new User();
    
    $stmt-&gt;bindColumn('id', $user-&gt;id, PDO::PARAM_INT);
    $stmt-&gt;bindColumn('name', $user-&gt;name, PDO::PARAM_STR);
    $stmt-&gt;bindColumn('email', $user-&gt;email, PDO::PARAM_STR);
    
    while ($stmt-&gt;fetch(PDO::FETCH_BOUND)) {
        echo "User: {$user-&gt;id}, {$user-&gt;name}, {$user-&gt;email}\n";
    }
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

Columns are bound to properties of a User object. Each fetch updates the object's
properties. This approach is useful when working with object-oriented code.

## Using Different Fetch Modes

This shows how bindColumn works with different fetch modes.

pdo_bindcolumn_fetchmodes.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;prepare('SELECT id, name FROM users');
    $stmt-&gt;execute();
    
    $stmt-&gt;bindColumn(1, $id);
    $stmt-&gt;bindColumn(2, $name);
    
    // FETCH_BOUND updates bound variables
    while ($stmt-&gt;fetch(PDO::FETCH_BOUND)) {
        echo "Bound: ID: $id, Name: $name\n";
    }
    
    // Regular fetch doesn't update bound variables
    $stmt-&gt;execute();
    while ($row = $stmt-&gt;fetch(PDO::FETCH_ASSOC)) {
        echo "Regular: ID: {$row['id']}, Name: {$row['name']}\n";
    }
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

Bound variables are only updated when using PDO::FETCH_BOUND. Regular fetch
methods like FETCH_ASSOC don't affect bound variables. The example shows both
approaches for comparison.

## Binding Only Specific Columns

This demonstrates binding only some columns while fetching others normally.

pdo_bindcolumn_partial.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;prepare('SELECT id, name, email, created_at FROM users');
    $stmt-&gt;execute();
    
    $stmt-&gt;bindColumn('name', $name);
    $stmt-&gt;bindColumn('email', $email);
    
    while ($row = $stmt-&gt;fetch(PDO::FETCH_BOUND)) {
        echo "Name: $name, Email: $email\n";
        echo "Full row: ";
        print_r($row);
    }
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

Only name and email columns are bound to variables. The other columns are still
available in the $row array. This shows you can mix bound columns with regular
fetching.

## Binding with Maximum Length

This shows how to use the maxlen parameter to limit the size of returned data.

pdo_bindcolumn_maxlen.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;prepare('SELECT id, name, bio FROM users');
    $stmt-&gt;execute();
    
    $stmt-&gt;bindColumn('name', $name, PDO::PARAM_STR, 20);
    $stmt-&gt;bindColumn('bio', $bio, PDO::PARAM_STR, 100);
    
    while ($stmt-&gt;fetch(PDO::FETCH_BOUND)) {
        echo "Name (max 20 chars): $name\n";
        echo "Bio preview (max 100 chars): " . substr($bio, 0, 30) . "...\n";
    }
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

The fourth parameter limits the maximum length of data returned for each column.
The name is limited to 20 characters, bio to 100. This can be useful for
large text fields where you only need a preview.

## Best Practices

- **Use meaningful variable names:** Match column names when possible.

- **Specify data types:** Especially for numbers to avoid string conversion.

- **Consider memory usage:** Binding is efficient for large result sets.

- **Combine with other fetch methods:** When you need both bound variables and full rows.

- **Error handling:** Always check for errors after binding.

## Source

[PHP bindColumn Documentation](https://www.php.net/manual/en/pdostatement.bindcolumn.php)

This tutorial covered the PDOStatement::bindColumn method with practical
examples showing different ways to use it in database operations.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP PDO Functions](/php/#php-pdo).