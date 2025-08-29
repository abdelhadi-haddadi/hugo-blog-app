+++
title = "PHP PDOStatement::errorCode Method"
date = 2025-08-29T20:06:32.733+01:00
draft = false
description = "Use the PHP PDO::errorCode method to retrieve SQL error codes and debug database issues effectively."
image = ""
imageBig = ""
categories = ["php-pdo"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP PDOStatement::errorCode Method

last modified April 19, 2025

The PDOStatement::errorCode method retrieves the SQLSTATE error code
from the last operation on a statement handle. It helps in error handling.

## Basic Definition

PDOStatement::errorCode returns a five-character SQLSTATE code. This code
identifies the type of error that occurred during the last operation.

A value of '00000' means no error occurred. Other values indicate different
types of errors. The method doesn't require parameters and returns a string.

## Basic errorCode Usage

This example shows the simplest way to use errorCode after a statement fails.

pdo_errorcode_basic.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_SILENT);
    
    $stmt = $pdo-&gt;prepare('SELECT * FROM non_existent_table');
    $stmt-&gt;execute();
    
    $errorCode = $stmt-&gt;errorCode();
    if ($errorCode !== '00000') {
        echo "Error occurred: $errorCode";
    }
} catch (PDOException $e) {
    echo "Connection error: " . $e-&gt;getMessage();
}

This code attempts to query a non-existent table. We set ERRMODE_SILENT to
prevent exceptions. The errorCode method captures the SQLSTATE error code.

## errorCode with Invalid Query

This demonstrates errorCode when executing a query with invalid syntax.

pdo_errorcode_syntax.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_SILENT);
    
    $stmt = $pdo-&gt;prepare('SELEC * FROM users'); // Invalid SQL
    $stmt-&gt;execute();
    
    $errorCode = $stmt-&gt;errorCode();
    if ($errorCode !== '00000') {
        echo "SQL Error: $errorCode";
    }
} catch (PDOException $e) {
    echo "Connection error: " . $e-&gt;getMessage();
}

The SQL statement contains a syntax error (SELEC instead of SELECT).
errorCode returns the specific SQLSTATE code for this syntax error.

## errorCode with Parameter Binding

This example shows errorCode usage when parameter binding fails.

pdo_errorcode_binding.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_SILENT);
    
    $stmt = $pdo-&gt;prepare('INSERT INTO users (name, email) VALUES (?, ?)');
    $stmt-&gt;bindValue(1, 'John Doe');
    // Intentionally skip binding the second parameter
    
    $stmt-&gt;execute();
    
    $errorCode = $stmt-&gt;errorCode();
    if ($errorCode !== '00000') {
        echo "Binding Error: $errorCode";
    }
} catch (PDOException $e) {
    echo "Connection error: " . $e-&gt;getMessage();
}

We intentionally skip binding the second parameter to demonstrate how
errorCode captures parameter binding errors. The SQLSTATE code will
indicate the missing parameter.

## errorCode with Transaction

This shows errorCode usage within a transaction when a constraint fails.

pdo_errorcode_transaction.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_SILENT);
    
    $pdo-&gt;beginTransaction();
    
    // First insert succeeds
    $stmt1 = $pdo-&gt;prepare('INSERT INTO users (id, name) VALUES (?, ?)');
    $stmt1-&gt;execute([1, 'John']);
    
    // Second insert fails due to duplicate ID
    $stmt2 = $pdo-&gt;prepare('INSERT INTO users (id, name) VALUES (?, ?)');
    $stmt2-&gt;execute([1, 'Jane']);
    
    $errorCode = $stmt2-&gt;errorCode();
    if ($errorCode !== '00000') {
        echo "Duplicate entry error: $errorCode";
        $pdo-&gt;rollBack();
    }
} catch (PDOException $e) {
    echo "Connection error: " . $e-&gt;getMessage();
}

The second insert violates a primary key constraint. errorCode captures
this specific error, allowing us to handle it appropriately in the code.

## errorCode with Different Database Systems

This example demonstrates errorCode behavior with SQLite versus MySQL.

pdo_errorcode_multidb.php
  

&lt;?php

declare(strict_types=1);

// MySQL example
try {
    $mysql = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $mysql-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_SILENT);
    
    $stmt = $mysql-&gt;prepare('SELECT * FROM non_existent_table');
    $stmt-&gt;execute();
    
    echo "MySQL error code: " . $stmt-&gt;errorCode() . "\n";
} catch (PDOException $e) {
    echo "MySQL connection error: " . $e-&gt;getMessage();
}

// SQLite example
try {
    $sqlite = new PDO('sqlite:test.db');
    $sqlite-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_SILENT);
    
    $stmt = $sqlite-&gt;prepare('SELECT * FROM non_existent_table');
    $stmt-&gt;execute();
    
    echo "SQLite error code: " . $stmt-&gt;errorCode() . "\n";
} catch (PDOException $e) {
    echo "SQLite connection error: " . $e-&gt;getMessage();
}

Different database systems may return different SQLSTATE codes for similar
errors. This example shows how to handle errors consistently across systems.

## errorCode vs errorInfo

This compares errorCode with the more detailed errorInfo method.

pdo_errorcode_vs_errorinfo.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_SILENT);
    
    $stmt = $pdo-&gt;prepare('INSERT INTO non_existent_table (name) VALUES (?)');
    $stmt-&gt;execute(['Test']);
    
    // Get just the SQLSTATE code
    $errorCode = $stmt-&gt;errorCode();
    echo "Error Code: $errorCode\n";
    
    // Get full error information
    $errorInfo = $stmt-&gt;errorInfo();
    echo "Full Error Info:\n";
    print_r($errorInfo);
} catch (PDOException $e) {
    echo "Connection error: " . $e-&gt;getMessage();
}

errorCode returns just the SQLSTATE code, while errorInfo returns an array
with the code, driver-specific error code, and error message. Use errorCode
for simple checks and errorInfo for detailed diagnostics.

## Practical Error Handling with errorCode

This shows a practical approach to handling different error codes.

pdo_errorcode_handling.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_SILENT);
    
    $stmt = $pdo-&gt;prepare('INSERT INTO users (email) VALUES (?)');
    $stmt-&gt;execute(['invalid_email']); // Assuming email has validation
    
    $errorCode = $stmt-&gt;errorCode();
    
    switch ($errorCode) {
        case '00000':
            echo "Success! Record inserted.\n";
            break;
        case '23000': // Integrity constraint violation
            echo "Error: Duplicate or invalid data.\n";
            break;
        case '42000': // Syntax error or access violation
            echo "Error: SQL syntax problem.\n";
            break;
        case 'HY000': // General error
            echo "Error: General database error.\n";
            break;
        default:
            echo "Unknown error occurred: $errorCode\n";
    }
} catch (PDOException $e) {
    echo "Connection error: " . $e-&gt;getMessage();
}

This demonstrates a practical way to handle different error codes using a
switch statement. Each SQLSTATE code can trigger specific error handling
logic appropriate for the application.

## Best Practices

- **Check error codes:** Always verify operations succeeded.

- **Combine with exceptions:** Use both for robust error handling.

- **Document error codes:** Note which codes your app handles.

- **Test error scenarios:** Ensure your code handles them properly.

- **Use constants:** For common SQLSTATE codes in your code.

## Source

[PHP PDOStatement::errorCode Documentation](https://www.php.net/manual/en/pdostatement.errorcode.php)

This tutorial covered the PDOStatement::errorCode method with practical
examples showing its usage in different database error scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP PDO Functions](/php/#php-pdo).