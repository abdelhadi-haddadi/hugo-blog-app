+++
title = "PHP PDO::prepare Method"
date = 2025-08-29T20:06:28.271+01:00
draft = false
description = "Discover the PHP PDO::prepare method to secure SQL queries with prepared statements and bound parameters."
image = ""
imageBig = ""
categories = ["php-pdo"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP PDO::prepare Method

last modified April 19, 2025

The PDO::prepare method is a crucial part of PHP's PDO extension. It prepares
SQL statements for execution and returns a statement object. This tutorial
covers PDO::prepare in depth with practical examples.

## Basic Definition

PDO::prepare prepares an SQL statement for execution. It returns a
PDOStatement object. The SQL can contain zero or more parameter markers.

Syntax: public PDO::prepare(string $statement, array $driver_options = array()): PDOStatement|false.
The statement can include named (:name) or question mark (?) parameters.

## Basic Prepared Statement Example

This shows the simplest usage of PDO::prepare with positional parameters.

basic_prepare.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;prepare("INSERT INTO users (name, email) VALUES (?, ?)");
    $stmt-&gt;execute(['John Doe', 'john@example.com']);
    
    echo "Record inserted successfully";
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This example prepares an INSERT statement with two positional parameters.
The execute method binds values to these parameters. This prevents SQL
injection by separating data from SQL commands.

## Named Parameters Example

Named parameters make SQL statements more readable and maintainable.

named_params.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;prepare("SELECT * FROM users WHERE email = :email");
    $stmt-&gt;execute(['email' =&gt; 'john@example.com']);
    
    $user = $stmt-&gt;fetch();
    if ($user) {
        echo "Found user: {$user['name']}";
    }
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This uses a named parameter :email in the SQL statement. The execute method
takes an associative array where keys match parameter names. Named parameters
are prefixed with a colon in the SQL.

## Binding Parameters Explicitly

bindParam and bindValue offer more control over parameter binding.

explicit_binding.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;prepare("INSERT INTO products (name, price) VALUES (:name, :price)");
    
    $name = "Laptop";
    $price = 999.99;
    
    $stmt-&gt;bindParam(':name', $name, PDO::PARAM_STR);
    $stmt-&gt;bindParam(':price', $price, PDO::PARAM_STR);
    
    $stmt-&gt;execute();
    echo "Product added successfully";
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This demonstrates explicit parameter binding with bindParam. The third
parameter specifies the data type. bindParam binds by reference, while
bindValue binds by value. Both methods provide type safety.

## Prepared Statement with Multiple Executions

Prepared statements can be executed multiple times with different values.

multiple_executions.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;prepare("INSERT INTO orders (product_id, quantity) VALUES (?, ?)");
    
    // First execution
    $stmt-&gt;execute([1, 2]);
    
    // Second execution
    $stmt-&gt;execute([3, 1]);
    
    // Third execution
    $stmt-&gt;execute([5, 3]);
    
    echo "Multiple orders inserted successfully";
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This shows the efficiency of prepared statements for batch operations.
The SQL is parsed and compiled only once. Each execute uses new parameter
values. This pattern is ideal for inserting multiple similar records.

## Fetching Data with Prepared Statements

Prepared statements work with SELECT queries for secure data retrieval.

fetch_data.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;prepare("SELECT id, name, email FROM users WHERE active = :active");
    $stmt-&gt;execute(['active' =&gt; 1]);
    
    $users = $stmt-&gt;fetchAll(PDO::FETCH_ASSOC);
    
    foreach ($users as $user) {
        echo "ID: {$user['id']}, Name: {$user['name']}\n";
    }
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This fetches active users using a prepared statement. fetchAll retrieves
all results at once as associative arrays. The :active parameter ensures
safe value insertion into the query. Always filter user input this way.

## Prepared Statements with LIKE Clause

Special characters in LIKE clauses require careful handling with PDO.

like_clause.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $search = "%smith%";
    $stmt = $pdo-&gt;prepare("SELECT * FROM users WHERE lastname LIKE ?");
    $stmt-&gt;execute([$search]);
    
    $results = $stmt-&gt;fetchAll();
    
    foreach ($results as $row) {
        echo "Found: {$row['firstname']} {$row['lastname']}\n";
    }
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This searches for names containing "smith". The percent signs are part
of the bound parameter, not the SQL. This prevents SQL injection while
allowing wildcard searches. Always add wildcards to the parameter value.

## Transaction with Prepared Statements

Prepared statements work seamlessly with PDO transactions for data integrity.

transaction.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $pdo-&gt;beginTransaction();
    
    $stmt1 = $pdo-&gt;prepare("UPDATE accounts SET balance = balance - ? WHERE id = ?");
    $stmt2 = $pdo-&gt;prepare("UPDATE accounts SET balance = balance + ? WHERE id = ?");
    
    $amount = 100;
    $from = 1;
    $to = 2;
    
    $stmt1-&gt;execute([$amount, $from]);
    $stmt2-&gt;execute([$amount, $to]);
    
    $pdo-&gt;commit();
    echo "Funds transferred successfully";
} catch (PDOException $e) {
    $pdo-&gt;rollBack();
    echo "Transaction failed: " . $e-&gt;getMessage();
}

This demonstrates a secure money transfer using prepared statements in a
transaction. Both updates succeed or fail together. The rollBack undoes
changes if any operation fails. Always use transactions for multi-step
operations.

## Best Practices

- **Always Use Prepared Statements:** For all SQL with parameters.

- **Choose Named Parameters:** For complex queries with many parameters.

- **Specify Parameter Types:** When using bindParam or bindValue.

- **Reuse Statements:** For multiple executions with different values.

- **Error Handling:** Always catch PDOException for database errors.

## Source

[PHP PDO::prepare Documentation](https://www.php.net/manual/en/pdo.prepare.php)

This tutorial covered the PDO::prepare method with practical examples showing
its usage in different database operation scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP PDO Functions](/php/#php-pdo).