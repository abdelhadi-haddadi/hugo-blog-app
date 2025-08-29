+++
title = "PHP PDOStatement::bindParam Tutorial"
date = 2025-08-29T20:06:30.495+01:00
draft = false
description = "Use the PHP PDOStatement::bindParam method to bind parameters securely to SQL statements."
image = ""
imageBig = ""
categories = ["php-pdo"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP PDOStatement::bindParam Tutorial

last modified April 19, 2025

The PDOStatement::bindParam method binds a PHP variable to a parameter in a
prepared SQL statement. This provides secure parameterized queries.

## Basic Definition

PDOStatement::bindParam binds a variable to a parameter marker in the SQL
statement. The variable is bound by reference and evaluated at execute time.

Syntax: bindParam(string|int $param, mixed &amp;$var, int $type = PDO::PARAM_STR, int $maxLength = null, mixed $driverOptions = null).
The method returns true on success or false on failure.

## Binding Integer Parameter

This example shows how to bind an integer parameter to a prepared statement.

bind_int.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;prepare('SELECT * FROM users WHERE id = :id');
    $id = 5;
    $stmt-&gt;bindParam(':id', $id, PDO::PARAM_INT);
    $stmt-&gt;execute();
    
    $user = $stmt-&gt;fetch();
    if ($user) {
        echo "User found: {$user['name']}";
    }
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This binds an integer parameter to the :id placeholder. PDO::PARAM_INT specifies
the parameter type. The variable $id is bound by reference and evaluated when
execute() is called.

## Binding String Parameter

This demonstrates binding a string parameter to a prepared statement.

bind_string.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;prepare('SELECT * FROM users WHERE name = :name');
    $name = 'John Doe';
    $stmt-&gt;bindParam(':name', $name, PDO::PARAM_STR);
    $stmt-&gt;execute();
    
    $user = $stmt-&gt;fetch();
    if ($user) {
        echo "User found with email: {$user['email']}";
    }
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This binds a string parameter to the :name placeholder. PDO::PARAM_STR is the
default type for string parameters. The variable $name is bound by reference.

## Binding Boolean Parameter

This example shows how to bind a boolean parameter to a prepared statement.

bind_bool.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;prepare('UPDATE settings SET active = :active WHERE user_id = 1');
    $active = true;
    $stmt-&gt;bindParam(':active', $active, PDO::PARAM_BOOL);
    $stmt-&gt;execute();
    
    echo "Setting updated successfully";
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This binds a boolean parameter to the :active placeholder. PDO::PARAM_BOOL
ensures proper boolean handling. The variable $active is bound by reference.

## Binding NULL Parameter

This demonstrates binding a NULL value to a prepared statement parameter.

bind_null.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;prepare('UPDATE users SET middle_name = :middle WHERE id = 1');
    $middle = null;
    $stmt-&gt;bindParam(':middle', $middle, PDO::PARAM_NULL);
    $stmt-&gt;execute();
    
    echo "Middle name set to NULL successfully";
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This binds a NULL value to the :middle placeholder. PDO::PARAM_NULL explicitly
indicates a NULL parameter. The variable $middle is bound by reference.

## Binding Large String with Length

This shows how to bind a large string parameter with specified length.

bind_large_string.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;prepare('INSERT INTO articles (title, content) VALUES (?, ?)');
    $title = "New Article";
    $content = str_repeat("This is a long article content. ", 100);
    
    $stmt-&gt;bindParam(1, $title, PDO::PARAM_STR);
    $stmt-&gt;bindParam(2, $content, PDO::PARAM_STR, strlen($content));
    $stmt-&gt;execute();
    
    echo "Article inserted successfully";
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This binds a large string parameter with specified length. The fourth parameter
sets the maximum length. Positional parameters (?) are used instead of named.

## Binding Output Parameter

This demonstrates binding an output parameter for a stored procedure call.

bind_output.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;prepare('CALL get_user_email(:id, :email)');
    $id = 5;
    $email = '';
    
    $stmt-&gt;bindParam(':id', $id, PDO::PARAM_INT);
    $stmt-&gt;bindParam(':email', $email, PDO::PARAM_STR|PDO::PARAM_INPUT_OUTPUT, 255);
    $stmt-&gt;execute();
    
    echo "User email: $email";
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This binds an output parameter for a stored procedure. PDO::PARAM_INPUT_OUTPUT
indicates the parameter is both input and output. The length is specified.

## Binding Multiple Parameters

This example shows binding multiple parameters of different types.

bind_multiple.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;prepare('INSERT INTO products (name, price, in_stock) VALUES (:name, :price, :stock)');
    
    $name = "New Product";
    $price = 19.99;
    $stock = true;
    
    $stmt-&gt;bindParam(':name', $name, PDO::PARAM_STR);
    $stmt-&gt;bindParam(':price', $price, PDO::PARAM_STR); // Using STR for float
    $stmt-&gt;bindParam(':stock', $stock, PDO::PARAM_BOOL);
    $stmt-&gt;execute();
    
    echo "Product added successfully";
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This binds multiple parameters of different types to a prepared statement.
Note that for float values, PDO::PARAM_STR is typically used. All variables
are bound by reference.

## Best Practices

- **Always use bindParam for security:** Prevents SQL injection.

- **Specify parameter types:** Ensures proper data handling.

- **Use named parameters:** Makes code more readable.

- **Bind by reference:** Variables are evaluated at execute time.

- **Handle errors:** Use try-catch blocks for PDO operations.

## Source

[PHP bindParam Documentation](https://www.php.net/manual/en/pdostatement.bindparam.php)

This tutorial covered the PDOStatement::bindParam method with practical examples
showing different parameter types and use cases.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP PDO Functions](/php/#php-pdo).