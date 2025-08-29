+++
title = "PHP PDO::exec Method"
date = 2025-08-29T20:06:24.992+01:00
draft = false
description = "Learn how to use the PHP PDO::exec method to execute non-prepared SQL queries and optimize database operations."
image = ""
imageBig = ""
categories = ["php-pdo"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP PDO::exec Method

last modified April 19, 2025

The PDO::exec method executes an SQL statement and returns the number
of affected rows. It's useful for INSERT, UPDATE, DELETE, and other
statements that don't return result sets.

## Basic Definition

PDO::exec executes an SQL statement in a single function call. It
returns the number of rows affected by the statement. For SELECT
statements, use PDO::query instead.

Syntax: public PDO::exec(string $statement): int|false.
The method returns false on failure. Always check the return value.

## Basic PDO::exec Usage

This shows the simplest usage of PDO::exec to create a table.

pdo_exec_create.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('sqlite:mydatabase.db');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $count = $pdo-&gt;exec("CREATE TABLE users (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE
    )");
    
    echo "Table created successfully";
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This creates a new SQLite database table. The exec method returns 0
for CREATE TABLE statements since no rows are affected. Always use
try-catch for error handling.

## Inserting Data with PDO::exec

This demonstrates inserting data into a table using PDO::exec.

pdo_exec_insert.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $count = $pdo-&gt;exec("INSERT INTO users (name, email) 
        VALUES ('John Doe', 'john@example.com'),
               ('Jane Smith', 'jane@example.com')");
    
    echo "Inserted $count rows";
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This inserts two rows into the users table. The exec method returns
the number of affected rows (2 in this case). Note this approach
is vulnerable to SQL injection with user input.

## Updating Data with PDO::exec

This shows how to update records using PDO::exec.

pdo_exec_update.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $count = $pdo-&gt;exec("UPDATE users SET email = 'newjohn@example.com' 
        WHERE name = 'John Doe'");
    
    if ($count &gt; 0) {
        echo "Updated $count rows";
    } else {
        echo "No rows updated";
    }
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This updates email addresses for users named 'John Doe'. The method
returns the number of updated rows. Always check if rows were actually
modified.

## Deleting Data with PDO::exec

This demonstrates deleting records from a table.

pdo_exec_delete.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $count = $pdo-&gt;exec("DELETE FROM users WHERE email LIKE '%example.com'");
    
    echo "Deleted $count rows";
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This deletes all users with example.com email addresses. The LIKE
operator matches patterns. The method returns the number of deleted
rows. Use caution with DELETE statements.

## Using PDO::exec with Transactions

This shows PDO::exec within a transaction for atomic operations.

pdo_exec_transaction.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $pdo-&gt;beginTransaction();
    
    $pdo-&gt;exec("UPDATE accounts SET balance = balance - 100 WHERE user_id = 1");
    $pdo-&gt;exec("UPDATE accounts SET balance = balance + 100 WHERE user_id = 2");
    
    $pdo-&gt;commit();
    echo "Transaction completed successfully";
} catch (PDOException $e) {
    $pdo-&gt;rollBack();
    echo "Transaction failed: " . $e-&gt;getMessage();
}

This performs a money transfer between accounts atomically. Both
updates succeed or fail together. Always use rollBack in catch
blocks to maintain data consistency.

## PDO::exec with DDL Statements

This demonstrates using PDO::exec for database schema modifications.

pdo_exec_ddl.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $pdo-&gt;exec("ALTER TABLE users ADD COLUMN age INT");
    $pdo-&gt;exec("CREATE INDEX idx_email ON users(email)");
    
    echo "Database schema modified successfully";
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This adds a new column to the users table and creates an index.
DDL statements (CREATE, ALTER, DROP) typically return 0 rows
affected. These operations are often not transactional.

## Security Considerations with PDO::exec

This highlights the security risks of using PDO::exec with user input.

pdo_exec_security.php
  

&lt;?php

declare(strict_types=1);

// UNSAFE EXAMPLE - DO NOT USE IN PRODUCTION
try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $name = $_GET['name']; // User input - potential SQL injection!
    $count = $pdo-&gt;exec("DELETE FROM users WHERE name = '$name'");
    
    echo "Deleted $count rows";
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

// SAFE ALTERNATIVE USING PREPARED STATEMENTS
try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;prepare("DELETE FROM users WHERE name = ?");
    $stmt-&gt;execute([$_GET['name']]);
    
    echo "Deleted " . $stmt-&gt;rowCount() . " rows";
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

The first example is vulnerable to SQL injection attacks. Never directly
interpolate user input into SQL. Always use prepared statements with bound
parameters for user-supplied data.

## Best Practices

- **Avoid User Input:** Never use PDO::exec with user input directly.

- **Error Handling:** Always use try-catch blocks.

- **Check Return Values:** Verify affected rows count.

- **Transactions:** Use for multiple related operations.

- **Prepared Statements:** Preferred for data modification.

## Source

[PHP PDO::exec Documentation](https://www.php.net/manual/en/pdo.exec.php)

This tutorial covered the PDO::exec method with practical examples
showing its usage in different database operations.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP PDO Functions](/php/#php-pdo).