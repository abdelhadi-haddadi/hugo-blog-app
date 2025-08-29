+++
title = "PHP PDOStatement::fetchObject Method"
date = 2025-08-29T20:06:34.937+01:00
draft = false
description = "PHP PDO tutorial shows how to work with databases using PDO in PHP. Learn PDO with practical examples."
image = ""
imageBig = ""
categories = ["php-pdo"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP PDOStatement::fetchObject Method

last modified April 19, 2025

The PDOStatement::fetchObject method fetches the next row from a result set
as an object of the specified class. It provides an object-oriented way to
access database records.

## Basic Definition

PDOStatement::fetchObject retrieves the next row from a result set as an
object. It can create instances of a specified class with properties mapped
to column names.

Syntax: public PDOStatement::fetchObject(string $class = "stdClass", array $constructorArgs = []): object|false.
The first parameter is the class name, defaulting to stdClass.

## Basic fetchObject Usage

This shows the simplest way to use fetchObject with the default stdClass.

fetch_object_basic.php
  

&lt;?php

declare(strict_types=1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;query('SELECT id, name, email FROM users LIMIT 1');
    $user = $stmt-&gt;fetchObject();
    
    echo "User: {$user-&gt;name} ({$user-&gt;email})";
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This fetches a single row as a stdClass object. Column names become object
properties. The properties can be accessed using the object operator (-&gt;).

## Fetching into Custom Class

This demonstrates fetching data directly into a custom class instance.

fetch_object_custom_class.php
  

&lt;?php

declare(strict_types=1);

class User {
    public int $id;
    public string $name;
    public string $email;
    
    public function getInfo(): string {
        return "{$this-&gt;name} &lt;{$this-&gt;email}&gt;";
    }
}

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;query('SELECT id, name, email FROM users LIMIT 1');
    $user = $stmt-&gt;fetchObject('User');
    
    echo $user-&gt;getInfo();
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This creates a User object with the database row data. The class must have
properties matching column names. Methods of the class become available.

## With Constructor Arguments

This shows how to pass arguments to the class constructor during fetching.

fetch_object_constructor_args.php
  

&lt;?php

declare(strict_types=1);

class UserProfile {
    public function __construct(
        public int $id,
        public string $name,
        public string $role = 'user'
    ) {}
    
    public function display(): string {
        return "{$this-&gt;name} ({$this-&gt;role})";
    }
}

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;query('SELECT id, name FROM users LIMIT 1');
    $user = $stmt-&gt;fetchObject('UserProfile', ['admin']);
    
    echo $user-&gt;display();
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This passes 'admin' as the role parameter to the constructor. The database
columns map to the remaining constructor parameters. Properties are promoted.

## Fetching Multiple Rows

This demonstrates using fetchObject in a loop to process multiple rows.

fetch_object_multiple_rows.php
  

&lt;?php

declare(strict_types=1);

class Product {
    public int $id;
    public string $name;
    public float $price;
    
    public function formatPrice(): string {
        return '$' . number_format($this-&gt;price, 2);
    }
}

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;query('SELECT id, name, price FROM products');
    
    while ($product = $stmt-&gt;fetchObject('Product')) {
        echo "{$product-&gt;name}: {$product-&gt;formatPrice()}\n";
    }
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This loops through all products, creating a Product object for each row.
The formatPrice method formats the price consistently across all products.

## With Prepared Statements

This combines fetchObject with prepared statements for secure queries.

fetch_object_prepared.php
  

&lt;?php

declare(strict_types=1);

class Customer {
    public int $id;
    public string $name;
    public string $email;
    public DateTime $created_at;
}

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;prepare('SELECT id, name, email, created_at FROM customers WHERE id = ?');
    $stmt-&gt;execute([42]);
    
    $customer = $stmt-&gt;fetchObject('Customer');
    
    if ($customer) {
        $date = $customer-&gt;created_at-&gt;format('Y-m-d');
        echo "Customer {$customer-&gt;name} joined on {$date}";
    }
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This safely fetches a customer by ID using a prepared statement. The
created_at column is automatically converted to a DateTime object.

## Handling NULL Values

This shows how fetchObject handles NULL database values in objects.

fetch_object_null_values.php
  

&lt;?php

declare(strict_types=1);

class Employee {
    public ?int $manager_id = null;
    public string $name;
    public ?string $department = null;
}

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;query('SELECT name, manager_id, department FROM employees LIMIT 1');
    $employee = $stmt-&gt;fetchObject('Employee');
    
    $managerText = $employee-&gt;manager_id ? "Manager ID: {$employee-&gt;manager_id}" : "No manager";
    echo "{$employee-&gt;name}, {$managerText}";
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This properly handles NULL database values by using nullable types. The
properties are initialized to NULL if the database value is NULL.

## Advanced Class Hydration

This demonstrates more complex object hydration with private properties.

fetch_object_advanced_hydration.php
  

&lt;?php

declare(strict_types=1);

class Order {
    private int $id;
    private float $total;
    private DateTimeImmutable $order_date;
    
    public function getId(): int {
        return $this-&gt;id;
    }
    
    public function getTotal(): float {
        return $this-&gt;total;
    }
    
    public function getOrderDate(): DateTimeImmutable {
        return $this-&gt;order_date;
    }
    
    public function getFormattedDate(): string {
        return $this-&gt;order_date-&gt;format('M j, Y');
    }
}

try {
    $pdo = new PDO('mysql:host=localhost;dbname=testdb', 'user', 'password');
    $pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo-&gt;query('SELECT id, total, order_date FROM orders LIMIT 1');
    $order = $stmt-&gt;fetchObject('Order');
    
    echo "Order #{$order-&gt;getId()} on {$order-&gt;getFormattedDate()}";
    echo "Total: $" . number_format($order-&gt;getTotal(), 2);
} catch (PDOException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

This hydrates an Order object with private properties. The class provides
getter methods to access the data. The order_date is converted to DateTimeImmutable.

## Best Practices

- **Type Safety:** Use property types matching database columns.

- **Error Handling:** Always check if fetchObject returns false.

- **Performance:** Consider fetchAll for small result sets.

- **Security:** Use with prepared statements for user input.

- **Hydration:** Add validation in class constructors if needed.

## Source

[PHP fetchObject Documentation](https://www.php.net/manual/en/pdostatement.fetchobject.php)

This tutorial covered the PDOStatement::fetchObject method with practical
examples showing different usage scenarios and best practices.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP PDO Functions](/php/#php-pdo).