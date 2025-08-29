+++
title = "PHP PDOStatement::errorInfo Method"
date = 2025-08-29T20:06:32.737+01:00
draft = false
description = "Access detailed error messages using the PHP PDOStatement::errorInfo method for better debugging."
image = ""
imageBig = ""
categories = ["php-pdo"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP PDOStatement::errorInfo Method

last modified April 19, 2025

The PDOStatement::errorInfo method retrieves extended error information
about the last operation performed by a PDOStatement object.

## Basic Definition

PDOStatement::errorInfo returns an array of error information about the
last operation performed by this statement handle. The array contains
three fields.

Syntax: public PDOStatement::errorInfo(): array. The returned
array contains SQLSTATE error code, driver-specific error code, and
driver-specific error message.

## Basic Usage Example

This shows how to use errorInfo after a failed SQL operation.

pdo_errorinfo_basic.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_SILENT);
    
    $stmt = $pdo-&gt;prepare('SELECT * FROM non_existent_table');
    $stmt-&gt;execute();
    
    if ($stmt-&gt;errorCode() !== '00000') {
        $errorInfo = $stmt-&gt;errorInfo();
        echo "SQLSTATE: {$errorInfo[0]}\n";
        echo "Driver Code: {$errorInfo[1]}\n";
        echo "Error Message: {$errorInfo[2]}\n";
    }
} catch (PDOException $e) {
    echo "Connection error: " . $e-&gt;getMessage();
}

This attempts to query a non-existent table. We use errorInfo to get
detailed error information. The array contains SQLSTATE, driver code,
and error message.

## Error Handling with Prepared Statements

This demonstrates errorInfo with a prepared statement that fails.

pdo_errorinfo_prepared.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_SILENT);
    
    $stmt = $pdo-&gt;prepare('INSERT INTO users (invalid_column) VALUES (?)');
    $stmt-&gt;execute(['John Doe']);
    
    if ($stmt-&gt;errorCode() !== '00000') {
        $errorInfo = $stmt-&gt;errorInfo();
        echo "Error occurred:\n";
        print_r($errorInfo);
    }
} catch (PDOException $e) {
    echo "Connection error: " . $e-&gt;getMessage();
}

This tries to insert into a non-existent column. errorInfo provides
detailed error information. The array output shows all three error
components.

## Comparing errorInfo and errorCode

This shows the difference between errorInfo and errorCode methods.

pdo_errorinfo_vs_errorcode.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_SILENT);
    
    $stmt = $pdo-&gt;prepare('SELECT invalid_column FROM users');
    $stmt-&gt;execute();
    
    echo "errorCode: " . $stmt-&gt;errorCode() . "\n";
    echo "errorInfo:\n";
    print_r($stmt-&gt;errorInfo());
} catch (PDOException $e) {
    echo "Connection error: " . $e-&gt;getMessage();
}

This compares the simple error code with detailed error information.
errorCode returns just the SQLSTATE while errorInfo provides complete
error details.

## Transaction Error Handling

This demonstrates using errorInfo within a transaction context.

pdo_errorinfo_transaction.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_SILENT);
    
    $pdo-&gt;beginTransaction();
    
    $stmt1 = $pdo-&gt;prepare('UPDATE accounts SET balance = balance - ? WHERE id = ?');
    $stmt1-&gt;execute([100, 1]);
    
    $stmt2 = $pdo-&gt;prepare('UPDATE invalid_table SET balance = balance + ? WHERE id = ?');
    $stmt2-&gt;execute([100, 2]);
    
    if ($stmt2-&gt;errorCode() !== '00000') {
        $errorInfo = $stmt2-&gt;errorInfo();
        echo "Transaction failed:\n";
        print_r($errorInfo);
        $pdo-&gt;rollBack();
    } else {
        $pdo-&gt;commit();
    }
} catch (PDOException $e) {
    echo "Connection error: " . $e-&gt;getMessage();
}

This shows transaction error handling with errorInfo. The second
statement fails due to invalid table. We roll back the transaction
after checking the error.

## Multiple Statement Error Handling

This demonstrates handling errors from multiple statements.

pdo_errorinfo_multiple.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_SILENT);
    
    $statements = [
        'SELECT * FROM users',
        'SELECT * FROM non_existent_table',
        'SELECT invalid_column FROM users'
    ];
    
    foreach ($statements as $sql) {
        $stmt = $pdo-&gt;query($sql);
        if ($stmt-&gt;errorCode() !== '00000') {
            echo "Error in statement: $sql\n";
            print_r($stmt-&gt;errorInfo());
            echo "\n";
        }
    }
} catch (PDOException $e) {
    echo "Connection error: " . $e-&gt;getMessage();
}

This executes multiple statements and checks each for errors. For
failed statements, we output the SQL and error information using
errorInfo.

## Error Info with Different Database Drivers

This shows how errorInfo varies between different database drivers.

pdo_errorinfo_drivers.php
  

&lt;?php

declare(strict_types=1);

$configs = [
    'mysql' =&gt; 'mysql:host=localhost;dbname=testdb',
    'sqlite' =&gt; 'sqlite:/path/to/database.sqlite'
];

foreach ($configs as $driver =&gt; $dsn) {
    try {
        $pdo = new PDO($dsn, 'user', 'password');
        $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_SILENT);
        
        $stmt = $pdo-&gt;prepare('SELECT * FROM non_existent_table');
        $stmt-&gt;execute();
        
        echo "Driver: $driver\n";
        print_r($stmt-&gt;errorInfo());
        echo "\n";
    } catch (PDOException $e) {
        echo "Connection error ($driver): " . $e-&gt;getMessage() . "\n";
    }
}

This compares errorInfo output from MySQL and SQLite drivers. Each
driver may provide different error codes and messages for the same
error condition.

## Custom Error Handling Wrapper

This creates a wrapper function for consistent error handling.

pdo_errorinfo_wrapper.php
  

&lt;?php

declare(strict_types=1);

function executeStatement(PDO $pdo, string $sql, array $params = []): array {
    $stmt = $pdo-&gt;prepare($sql);
    $stmt-&gt;execute($params);
    
    if ($stmt-&gt;errorCode() !== '00000') {
        $errorInfo = $stmt-&gt;errorInfo();
        return [
            'success' =&gt; false,
            'error' =&gt; [
                'sqlstate' =&gt; $errorInfo[0],
                'code' =&gt; $errorInfo[1],
                'message' =&gt; $errorInfo[2]
            ]
        ];
    }
    
    return ['success' =&gt; true, 'data' =&gt; $stmt-&gt;fetchAll()];
}

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_SILENT);
    
    $result = executeStatement($pdo, 'SELECT * FROM non_existent_table');
    
    if (!$result['success']) {
        echo "Query failed:\n";
        print_r($result['error']);
    }
} catch (PDOException $e) {
    echo "Connection error: " . $e-&gt;getMessage();
}

This creates a reusable function that standardizes error handling.
The function returns a consistent structure whether the query succeeds
or fails, using errorInfo for detailed error reporting.

## Best Practices

- **Check errorCode first:** Before calling errorInfo, verify an error occurred.

- **Log complete errors:** Store all three parts of errorInfo for debugging.

- **Use consistently:** Apply the same error handling pattern throughout.

- **Combine with exceptions:** Use errorInfo with exception handling.

- **Document error codes:** Maintain documentation of common error codes.

## Source

[PHP PDOStatement::errorInfo Documentation](https://www.php.net/manual/en/pdostatement.errorinfo.php)

This tutorial covered the PDOStatement::errorInfo method with practical
examples showing different error handling scenarios in database operations.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP PDO Functions](/php/#php-pdo).