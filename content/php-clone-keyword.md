+++
title = "PHP clone Keyword"
date = 2025-08-29T20:04:14.920+01:00
draft = false
description = "PHP clone keyword tutorial shows how to use object cloning in PHP. Learn cloning with practical examples."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP clone Keyword

last modified April 16, 2025

The PHP clone keyword creates a copy of an object. Unlike simple
assignment, clone creates a new object with copied property values. This is
essential for working with object references in PHP.

## Basic Definitions

The clone keyword performs a shallow copy of an object. It creates
a new object instance with the same property values. References within the
object remain references in the clone.

PHP calls the __clone magic method after cloning completes. You
can override this method to customize cloning behavior. This allows deep copies
or other post-cloning operations.

Syntax: $clone = clone $object;. The clone operator creates a new
object with the same class and properties. The original and clone are distinct
objects in memory.

## Basic Object Cloning

This example demonstrates the simplest use of the clone keyword.

basic_clone.php
  

&lt;?php

class Book {
    public $title;
    
    public function __construct($title) {
        $this-&gt;title = $title;
    }
}

$book1 = new Book("PHP Essentials");
$book2 = clone $book1;

$book2-&gt;title = "Advanced PHP";

echo $book1-&gt;title; // Outputs: PHP Essentials
echo $book2-&gt;title; // Outputs: Advanced PHP

The code creates a Book object and clones it. Changing the clone's property
doesn't affect the original. Both objects exist independently in memory.
This shows basic cloning behavior.

## Shallow Copy Behavior

This example demonstrates how clone performs a shallow copy of object properties.

shallow_copy.php
  

&lt;?php

class Author {
    public $name;
}

class Book {
    public $title;
    public $author;
    
    public function __construct($title, $authorName) {
        $this-&gt;title = $title;
        $this-&gt;author = new Author();
        $this-&gt;author-&gt;name = $authorName;
    }
}

$book1 = new Book("PHP Guide", "John Doe");
$book2 = clone $book1;

$book2-&gt;author-&gt;name = "Jane Smith";

echo $book1-&gt;author-&gt;name; // Outputs: Jane Smith

The clone copies the author reference, not the Author object itself. Both books
share the same Author instance. This is the default shallow copy behavior.
Changes to referenced objects affect both copies.

## Implementing __clone()

This example shows how to use __clone() to create a deep copy.

deep_clone.php
  

&lt;?php

class Author {
    public $name;
}

class Book {
    public $title;
    public $author;
    
    public function __construct($title, $authorName) {
        $this-&gt;title = $title;
        $this-&gt;author = new Author();
        $this-&gt;author-&gt;name = $authorName;
    }
    
    public function __clone() {
        $this-&gt;author = clone $this-&gt;author;
    }
}

$book1 = new Book("PHP Patterns", "Mike Brown");
$book2 = clone $book1;

$book2-&gt;author-&gt;name = "Sarah Johnson";

echo $book1-&gt;author-&gt;name; // Outputs: Mike Brown
echo $book2-&gt;author-&gt;name; // Outputs: Sarah Johnson

The __clone() method clones the Author object when Book is cloned. This creates
a true deep copy where all objects are duplicated. Now changes to the clone's
author don't affect the original.

## Cloning with Private Properties

This example demonstrates cloning objects with private properties.

private_properties.php
  

&lt;?php

class User {
    private $username;
    private $password;
    
    public function __construct($username, $password) {
        $this-&gt;username = $username;
        $this-&gt;password = $password;
    }
    
    public function getUsername() {
        return $this-&gt;username;
    }
    
    public function setUsername($username) {
        $this-&gt;username = $username;
    }
}

$user1 = new User("admin", "secret123");
$user2 = clone $user1;

$user2-&gt;setUsername("editor");

echo $user1-&gt;getUsername(); // Outputs: admin
echo $user2-&gt;getUsername(); // Outputs: editor

The clone copies private properties just like public ones. The cloned object
gets its own copies of all properties. Access modifiers don't affect cloning
behavior. The clone is a complete copy of the original.

## Cloning with Inheritance

This example shows how cloning works with inherited classes.

inheritance_clone.php
  

&lt;?php

class Animal {
    protected $name;
    
    public function __construct($name) {
        $this-&gt;name = $name;
    }
    
    public function __clone() {
        echo "Cloning Animal\n";
    }
}

class Dog extends Animal {
    private $breed;
    
    public function __construct($name, $breed) {
        parent::__construct($name);
        $this-&gt;breed = $breed;
    }
    
    public function __clone() {
        parent::__clone();
        echo "Cloning Dog\n";
    }
}

$dog1 = new Dog("Max", "Labrador");
$dog2 = clone $dog1;

When cloning a child class, both the parent and child __clone() methods are
called. The parent method should be explicitly called if needed. All properties
from both classes are copied. The output shows both clone methods executing.

## Cloning with Magic Methods

This example demonstrates cloning an object with other magic methods.

magic_methods.php
  

&lt;?php

class Product {
    private $name;
    private static $count = 0;
    
    public function __construct($name) {
        $this-&gt;name = $name;
        self::$count++;
    }
    
    public function __clone() {
        $this-&gt;name = "Clone of " . $this-&gt;name;
        self::$count++;
    }
    
    public static function getCount() {
        return self::$count;
    }
}

$p1 = new Product("Laptop");
$p2 = clone $p1;

echo Product::getCount(); // Outputs: 2
echo $p2-&gt;getName(); // Outputs: Clone of Laptop

The example shows cloning interacting with static properties and other methods.
The __clone() method can modify properties during cloning. Static properties
are shared among all instances. The count tracks both original and cloned objects.

## Cloning with Complex Objects

This example demonstrates cloning an object with multiple nested objects.

complex_clone.php
  

&lt;?php

class Address {
    public $street;
    public $city;
}

class Person {
    public $name;
    public $address;
    
    public function __construct($name, $street, $city) {
        $this-&gt;name = $name;
        $this-&gt;address = new Address();
        $this-&gt;address-&gt;street = $street;
        $this-&gt;address-&gt;city = $city;
    }
    
    public function __clone() {
        $this-&gt;address = clone $this-&gt;address;
    }
}

$person1 = new Person("Alice", "123 Main St", "Springfield");
$person2 = clone $person1;

$person2-&gt;name = "Bob";
$person2-&gt;address-&gt;street = "456 Oak Ave";

echo $person1-&gt;address-&gt;street; // Outputs: 123 Main St
echo $person2-&gt;address-&gt;street; // Outputs: 456 Oak Ave

The Person class contains an Address object. The __clone() method ensures a
deep copy of the Address. Without it, both Persons would share the same
Address instance. This pattern is common for complex object graphs.

## Best Practices

- **Deep Copying:** Implement __clone() for objects with references.

- **Performance:** Be mindful of cloning large object graphs.

- **Immutable Objects:** Consider making objects immutable instead.

- **Documentation:** Document cloning behavior in your classes.

- **Testing:** Test cloned objects thoroughly for correct behavior.

## Source

[PHP Object Cloning Documentation](https://www.php.net/manual/en/language.oop5.cloning.php)

This tutorial covered PHP object cloning with practical examples showing clone
keyword usage in various scenarios. Understanding cloning is essential for
proper object-oriented programming in PHP.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).