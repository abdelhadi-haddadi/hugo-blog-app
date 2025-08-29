+++
title = "PHP PDO::errorCode Method"
date = 2025-08-29T20:06:23.872+01:00
draft = false
description = "PHP PDO tutorial shows how to work with databases using PDO in PHP. Learn PDO with practical examples."
image = ""
imageBig = ""
categories = ["php-pdo"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP PDO::errorCode Method

last modified April 19, 2025

The PDO::errorCode method retrieves the SQLSTATE error code for the last operation.
It provides a standardized way to check for database operation errors in PDO.

## Basic Definition

PDO::errorCode returns a five-character SQLSTATE code or null if no operation.
SQLSTATE is an ANSI SQL standard for database error codes. The method applies to
the database handle, not individual statements.

Syntax: public PDO::errorCode(): ?string. The method takes no parameters
and returns a string or null. It doesn't throw exceptions.

## Basic errorCode Example

This shows the simplest usage of errorCode to check for errors.

pdo_errorcode_basic.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_SILENT);
    
    // Deliberate error - table doesn't exist
    $pdo-&gt;query("SELECT * FROM non_existent_table");
    
    $errorCode = $pdo-&gt;errorCode();
    if ($errorCode !== '00000') {
        echo "Error occurred: $errorCode";
    }
} catch (PDOException $e) {
    echo "Connection error: " . $e-&gt;getMessage();
}

This demonstrates basic error checking with errorCode. We set ERRMODE_SILENT to
prevent exceptions. The code checks if errorCode differs from '00000' (success).

## errorCode with Different Error Types

This example shows errorCode responses to different error conditions.

pdo_errorcode_types.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_SILENT);
    
    // Syntax error
    $pdo-&gt;exec("SELECT FROM users");
    echo "Syntax error: " . $pdo-&gt;errorCode() . "\n";
    
    // Non-existent table
    $pdo-&gt;exec("SELECT * FROM no_such_table");
    echo "Table error: " . $pdo-&gt;errorCode() . "\n";
    
    // Valid query
    $pdo-&gt;exec("SELECT 1");
    echo "Success: " . $pdo-&gt;errorCode() . "\n";
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This shows different error codes for different error types. Syntax errors and
missing tables return different SQLSTATE codes. Successful queries return '00000'.

## errorCode vs errorInfo

This compares errorCode with the more detailed errorInfo method.

pdo_errorcode_vs_errorinfo.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_SILENT);
    
    $pdo-&gt;exec("SELECT FROM users"); // Syntax error
    
    echo "errorCode: " . $pdo-&gt;errorCode() . "\n";
    
    $errorInfo = $pdo-&gt;errorInfo();
    echo "errorInfo: \n";
    print_r($errorInfo);
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

errorCode returns just the SQLSTATE while errorInfo provides an array with the
SQLSTATE, driver-specific error code, and error message. errorInfo is more
detailed but errorCode is simpler for basic checks.

## errorCode with Transactions

This demonstrates using errorCode to check transaction status.

pdo_errorcode_transaction.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_SILENT);
    
    $pdo-&gt;beginTransaction();
    
    $pdo-&gt;exec("UPDATE accounts SET balance = balance - 100 WHERE user_id = 1");
    if ($pdo-&gt;errorCode() !== '00000') {
        $pdo-&gt;rollBack();
        echo "First update failed";
        exit;
    }
    
    $pdo-&gt;exec("UPDATE accounts SET balance = balance + 100 WHERE user_id = 999");
    if ($pdo-&gt;errorCode() !== '00000') {
        $pdo-&gt;rollBack();
        echo "Second update failed";
        exit;
    }
    
    $pdo-&gt;commit();
    echo "Transaction completed successfully";
} catch (PDOException $e) {
    $pdo-&gt;rollBack();
    echo "Error: " . $e-&gt;getMessage();
}

This uses errorCode to check each step in a transaction. If any operation fails,
the transaction is rolled back. This ensures data consistency when errors occur.

## Database-Specific Error Codes

This shows how errorCode works with different database systems.

pdo_errorcode_databases.php
  

&lt;?php

declare(strict_types=1);

// MySQL error
try {
    $mysql = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $mysql-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_SILENT);
    $mysql-&gt;exec("SELECT FROM users"); // Syntax error
    echo "MySQL error: " . $mysql-&gt;errorCode() . "\n";
} catch (PDOException $e) {}

// SQLite error
try {
    $sqlite = new PDO('sqlite::memory:');
    $sqlite-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_SILENT);
    $sqlite-&gt;exec("SELECT FROM non_existent");
    echo "SQLite error: " . $sqlite-&gt;errorCode() . "\n";
} catch (PDOException $e) {}

Different database systems may return different SQLSTATE codes for similar errors.
The errorCode method provides a standardized way to check these across databases.

## errorCode in Prepared Statements

This shows errorCode usage with prepared statements.

pdo_errorcode_prepared.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_SILENT);
    
    $stmt = $pdo-&gt;prepare("INSERT INTO users (name, email) VALUES (?, ?)");
    $stmt-&gt;execute(['John Doe']); // Missing second parameter
    
    if ($pdo-&gt;errorCode() !== '00000') {
        echo "Prepare/execute error: " . $pdo-&gt;errorCode() . "\n";
        print_r($pdo-&gt;errorInfo());
    }
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This demonstrates checking for errors in prepared statement execution. The example
shows how to handle parameter count mismatches using errorCode and errorInfo.

## Custom Error Handling with errorCode

This shows implementing custom error handling using errorCode.

pdo_errorcode_custom.php
  

&lt;?php

declare(strict_types=1);

function handlePdoError(PDO $pdo): void {
    $errorCode = $pdo-&gt;errorCode();
    
    if ($errorCode === '00000') return;
    
    $errorMap = [
        '42S02' =&gt; 'Table not found',
        '42000' =&gt; 'Syntax error',
        '23000' =&gt; 'Integrity constraint violation'
    ];
    
    $message = $errorMap[$errorCode] ?? "Database error ($errorCode)";
    echo "Error: $message\n";
}

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_SILENT);
    
    $pdo-&gt;exec("SELECT FROM users"); // Will trigger error
    
    handlePdoError($pdo);
} catch (PDOException $e) {
    echo "Connection error: " . $e-&gt;getMessage();
}

This implements a custom error handler that maps SQLSTATE codes to friendly
messages. The handler checks errorCode and provides appropriate responses.

## Best Practices

- **Combine with errorInfo:** For detailed error diagnostics.

- **Check after operations:** Verify success after each call.

- **Use constants:** For common SQLSTATE codes in checks.

- **Document codes:** Maintain a list of expected error codes.

- **Consider exceptions:** ERRMODE_EXCEPTION may be simpler.

## Source

[PHP PDO::errorCode Documentation](https://www.php.net/manual/en/pdo.errorcode.php)

This tutorial covered the PDO::errorCode method with practical examples showing
how to implement error checking in different database operation scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP PDO Functions](/php/#php-pdo).