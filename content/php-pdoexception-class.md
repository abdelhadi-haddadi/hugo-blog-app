+++
title = "PHP PDOException Class"
date = 2025-08-29T20:06:27.194+01:00
draft = false
description = "PHP PDOException tutorial shows how to handle database errors using PDOException in PHP. Learn error handling with practical examples."
image = ""
imageBig = ""
categories = ["php-pdo"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP PDOException Class

last modified April 19, 2025

The PHP PDOException class represents errors raised by PDO (PHP Data Objects).
It provides detailed information about database operation failures.

## Basic Definition

PDOException extends the standard PHP Exception class. It adds database-specific
error information. This includes SQLSTATE error codes and driver-specific codes.

PDO throws PDOException when configured with PDO::ERRMODE_EXCEPTION. This is
the recommended error handling mode for PDO operations in modern PHP.

## Connection Error Handling

This example shows how to handle database connection errors with PDOException.

pdo_connection_error.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=wrong_host;dbname=nonexistent_db', 
                  'invalid_user', 'wrong_password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Connection failed: " . $e-&gt;getMessage() . "\n";
    echo "SQLSTATE code: " . $e-&gt;getCode() . "\n";
    echo "Driver-specific code: " . $e-&gt;errorInfo[1] . "\n";
}

This attempts a connection with invalid credentials. The catch block handles
the PDOException. It shows the error message, SQLSTATE code, and driver code.

## Query Execution Error

This demonstrates handling errors during SQL query execution.

pdo_query_error.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Table doesn't exist
    $stmt = $pdo-&gt;query('SELECT * FROM nonexistent_table');
} catch (PDOException $e) {
    echo "Query failed: " . $e-&gt;getMessage() . "\n";
    print_r($e-&gt;errorInfo);
}

This tries to query a non-existent table. The PDOException provides detailed
error information through getMessage() and errorInfo. errorInfo contains an
array of error details.

## Transaction Error Handling

This shows how to handle errors during database transactions.

pdo_transaction_error.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $pdo-&gt;beginTransaction();
    
    // Valid query
    $pdo-&gt;exec("UPDATE accounts SET balance = balance - 100 WHERE user_id = 1");
    
    // Invalid query - will throw exception
    $pdo-&gt;exec("UPDATE nonexistent_table SET value = 1");
    
    $pdo-&gt;commit();
} catch (PDOException $e) {
    $pdo-&gt;rollBack();
    echo "Transaction failed: " . $e-&gt;getMessage() . "\n";
    echo "Error code: " . $e-&gt;errorInfo[0] . "\n";
}

This demonstrates transaction error handling. The second query fails, triggering
a rollback. The catch block shows the error message and SQLSTATE code.

## Prepared Statement Error

This example handles errors in prepared statements.

pdo_prepared_error.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Column doesn't exist
    $stmt = $pdo-&gt;prepare('SELECT invalid_column FROM users WHERE id = :id');
    $stmt-&gt;execute(['id' =&gt; 1]);
    
    $user = $stmt-&gt;fetch();
} catch (PDOException $e) {
    echo "Prepared statement error: " . $e-&gt;getMessage() . "\n";
    echo "Error info: " . print_r($e-&gt;errorInfo, true) . "\n";
}

This attempts to select a non-existent column. The PDOException provides the
error details. errorInfo contains the SQLSTATE, driver code, and error message.

## Custom Exception Handling

This demonstrates creating a custom exception handler for PDO operations.

pdo_custom_handler.php
  

&lt;?php

declare(strict_types=1);

function handlePdoException(PDOException $e): void {
    $errorMsg = "Database Error:\n";
    $errorMsg .= "Message: " . $e-&gt;getMessage() . "\n";
    $errorMsg .= "Code: " . $e-&gt;getCode() . "\n";
    $errorMsg .= "File: " . $e-&gt;getFile() . "\n";
    $errorMsg .= "Line: " . $e-&gt;getLine() . "\n";
    
    error_log($errorMsg, 3, 'pdo_errors.log');
    echo "A database error occurred. Please try again later.";
}

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Invalid query
    $pdo-&gt;query('SELECT * FROM nonexistent_table');
} catch (PDOException $e) {
    handlePdoException($e);
}

This creates a custom handler function for PDOException. It logs detailed error
information to a file and shows a user-friendly message. This is good practice
for production environments.

## Multiple Exception Types

This shows handling different database exception types separately.

pdo_multiple_exceptions.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Could be any PDO operation
    $pdo-&gt;query('INVALID SQL SYNTAX');
} catch (PDOException $e) {
    switch ($e-&gt;errorInfo[0]) {
        case '42S02': // Base table or view not found
            echo "Database table not found. Please contact support.";
            break;
        case '42000': // Syntax error
            echo "SQL syntax error detected.";
            break;
        case 'HY000': // General error
            echo "A general database error occurred.";
            break;
        default:
            echo "An unexpected database error occurred.";
    }
    
    error_log($e-&gt;getMessage());
}

This handles different SQLSTATE error codes differently. It provides specific
messages for table not found, syntax errors, and general errors. All errors
are logged for debugging.

## Error Information Methods

This demonstrates various methods to get error information from PDOException.

pdo_error_methods.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Invalid operation
    $pdo-&gt;exec('DROP TABLE nonexistent_table');
} catch (PDOException $e) {
    echo "Standard Exception methods:\n";
    echo "Message: " . $e-&gt;getMessage() . "\n";
    echo "Code: " . $e-&gt;getCode() . "\n";
    echo "File: " . $e-&gt;getFile() . "\n";
    echo "Line: " . $e-&gt;getLine() . "\n";
    echo "Trace: " . $e-&gt;getTraceAsString() . "\n";
    
    echo "\nPDO-specific methods:\n";
    print_r($e-&gt;errorInfo);
}

This shows all available error information methods. Standard Exception methods
provide basic error details. PDO-specific errorInfo gives database-specific
codes and messages. This is useful for debugging complex issues.

## Best Practices

- **Always use try-catch:** For all PDO database operations.

- **Set ERRMODE_EXCEPTION:** Makes error handling consistent.

- **Log detailed errors:** But show user-friendly messages.

- **Handle specific errors:** When different actions are needed.

- **Clean up resources:** In finally blocks when necessary.

## Source

[PHP PDOException Documentation](https://www.php.net/manual/en/class.pdoexception.php)

This tutorial covered the PHP PDOException class with practical examples showing
how to handle different database error scenarios effectively.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP PDO Functions](/php/#php-pdo).