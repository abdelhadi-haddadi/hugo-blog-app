+++
title = "PHP Property Hooks"
date = 2025-08-29T20:04:39.286+01:00
draft = false
description = "PHP Property Hooks tutorial shows how to use property hooks to define custom behavior for property access and modification in PHP 8.4."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP Property Hooks

last modified February 15, 2025

In this article, we show how to use property hooks in PHP 8.4.
Property hooks are a new feature that allows developers to define custom
behavior for property access and modification. This feature provides greater
control over how properties are read and written, enabling more robust and
maintainable code.

Property hooks are particularly useful for enforcing validation, logging, or
other custom logic when accessing or modifying properties.

## Main Features of PHP Property Hooks

    - **Custom Getter Logic:** Define custom behavior when reading a property.

    - **Custom Setter Logic:** Define custom behavior when writing to a property.

    - **Validation:** Enforce validation rules when setting property values.

    - **Logging:** Log property access or modification for debugging or auditing purposes.

    - **Encapsulation:** Encapsulate property access logic within the class, improving code organization.

## Basic Usage of Property Hooks

The following example demonstrates how to define and use property hooks in PHP
8.4.

main.php
    

&lt;?php

class Product
{
    private string $name;

    // Property hook for getting the name
    public function __get(string $property): mixed
    {
        return match ($property) {
            'name' =&gt; strtoupper($this-&gt;name),
            default =&gt; null,
        };
    }

    // Property hook for setting the name
    public function __set(string $property, mixed $value): void
    {
        match ($property) {
            'name' =&gt; $this-&gt;setName($value),
            default =&gt; null,
        };
    }

    private function setName(string $value): void
    {
        if (strlen($value) &lt; 3) {
            throw new Exception("Name must be at least 3 characters long.");
        }
        $this-&gt;name = $value;
    }
}

$product = new Product();
$product-&gt;name = "Laptop"; // Set the name
echo $product-&gt;name;       // Get the name (outputs in uppercase)

In this program, the __get and __set methods are used
to define custom behavior for accessing and modifying the name
property. The __get method converts the name to uppercase when
accessed, and the __set method enforces a minimum length
requirement.

$ php main.php
LAPTOP

## Validation with Property Hooks

The following example demonstrates how to use property hooks to enforce validation rules when setting property values.

main.php
    

&lt;?php

class User
{
    private int $age;

    // Property hook for setting the age
    public function __set(string $property, mixed $value): void
    {
        match ($property) {
            'age' =&gt; $this-&gt;setAge($value),
            default =&gt; null,
        };
    }

    // Property hook for getting the age
    public function __get(string $property): mixed
    {
        return match ($property) {
            'age' =&gt; $this-&gt;age,
            default =&gt; null,
        };
    }

    private function setAge(int $value): void
    {
        if ($value &lt; 0 || $value &gt; 120) {
            throw new Exception("Age must be between 0 and 120.");
        }
        $this-&gt;age = $value;
    }
}

$user = new User();
$user-&gt;age = 25; // Valid age
echo $user-&gt;age; // Outputs: 25

// $user-&gt;age = 150; // Throws an exception

In this program, the __set method enforces a validation rule for the age property, ensuring that the value is between 0 and 120. The __get method allows reading the age property.

$ php main.php
25

## Logging with Property Hooks

The following example demonstrates how to use property hooks to log property access and modification.

main.php
    

&lt;?php

class Account
{
    private float $balance = 0.0;

    // Property hook for getting the balance
    public function __get(string $property): mixed
    {
        return match ($property) {
            'balance' =&gt; $this-&gt;getBalance(),
            default =&gt; null,
        };
    }

    // Property hook for setting the balance
    public function __set(string $property, mixed $value): void
    {
        match ($property) {
            'balance' =&gt; $this-&gt;setBalance($value),
            default =&gt; null,
        };
    }

    private function getBalance(): float
    {
        echo "Balance accessed: {$this-&gt;balance}\n";
        return $this-&gt;balance;
    }

    private function setBalance(float $value): void
    {
        echo "Balance updated from {$this-&gt;balance} to $value\n";
        $this-&gt;balance = $value;
    }
}

$account = new Account();
$account-&gt;balance = 100.0; // Logs: Balance updated from 0 to 100
echo $account-&gt;balance;    // Logs: Balance accessed: 100

In this program, the __get and __set methods log
access and modification of the balance property. This is useful for
debugging or auditing purposes.

$ php main.php
Balance updated from 0 to 100
Balance accessed: 100
100

## Source

[PHP Property Hooks - Documentation](https://www.php.net/manual/en/language.oop5.properties.php)

In this article, we have shown how to use property hooks in PHP 8.4 to define custom behavior for property access and modification. Property hooks are a powerful tool for enforcing validation, logging, and encapsulating property logic.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of programming experience. I have been writing programming articles since 2007. So far, I have written over 1400 articles and 8 e-books. I have over eight years of experience in teaching programming.

List [all PHP tutorials](/php/).