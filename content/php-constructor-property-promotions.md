+++
title = "PHP Constructor Property Promotions"
date = 2025-08-29T20:04:16.040+01:00
draft = false
description = "PHP Constructor Property Promotions tutorial shows how to use constructor property promotions in PHP."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP Constructor Property Promotions

last modified March 11, 2025

In this article, we explore PHP's constructor property promotions, introduced in
PHP 8. This feature simplifies class property declaration and initialization in
constructors.

Constructor property promotions allow you to declare and initialize class
properties directly in the constructor parameters. This reduces boilerplate code
and makes class definitions more concise.

## Basic Syntax

The syntax combines property declaration and initialization in the constructor:

main.php
    

&lt;?php

declare(strict_types=1);

class Customer {
    public function __construct(
        private string $fullName,
        private int $customerId
    ) {}
}

In this example, $fullName and $customerId are
declared as private properties and initialized directly in the constructor,
streamlining the definition of a Customer class for an e-commerce
system.

## Basic Usage

This example models a product in an online store with promoted properties.

main.php
    

&lt;?php

declare(strict_types=1);

class Product {
    public function __construct(
        private string $name,
        private float $price
    ) {}

    public function getDetails(): string {
        return "Product: $this-&gt;name, Price: $this-&gt;price";
    }
}

$product = new Product("Laptop", 999.99);
echo $product-&gt;getDetails();

Here, the Product class uses constructor property promotions to
define a product with a name and price, typical attributes in an online store.
The properties are automatically assigned when a new Product object
is created with values like "Laptop" and 999.99.

This approach eliminates the need to declare $name and
$price separately and assign them in the constructor body, reducing
repetitive code. The getDetails method demonstrates how these
properties can be accessed to display product information, making the class both
concise and functional for practical use.

## Mixed Properties

This example represents an order with both promoted and non-promoted properties.

main.php
    

&lt;?php

declare(strict_types=1);

class Order {
    private string $orderDate;

    public function __construct(
        private int $orderId,
        private float $total,
        string $orderDate
    ) {
        $this-&gt;orderDate = $orderDate;
    }

    public function getSummary(): string {
        return "Order ID: $this-&gt;orderId, Total: $this-&gt;total, Date: $this-&gt;orderDate";
    }
}

$order = new Order(1001, 49.99, "2025-03-11");
echo $order-&gt;getSummary();

In this scenario, the Order class models an e-commerce order. The
$orderId and $total are promoted properties, directly
declared and initialized in the constructor, while $orderDate is a
traditional property assigned manually.

This mix is practical when some properties require additional processing (e.g.,
validation or formatting) that can't be handled by promotion alone. Here,
$orderDate might later be validated as a date, but
$orderId and $total are straightforward, benefiting
from the concise promotion syntax.

## Default Values

This example defines a guest user with default values for a login system.

main.php
    

&lt;?php

declare(strict_types=1);

class User {
    public function __construct(
        private string $username = "guest",
        private int $loginCount = 0
    ) {}

    public function getProfile(): string {
        return "Username: $this-&gt;username, Logins: $this-&gt;loginCount";
    }
}

$guest = new User();
echo $guest-&gt;getProfile();

The User class uses constructor property promotions with default
values to represent a guest user in a login system. If no arguments are
provided, $username defaults to "guest" and
$loginCount to 0, simulating an unregistered user's profile.

This is useful for applications where default states are common, such as guest
access in a website. The defaults reduce the need for additional factory methods
or manual instantiation with fallback values, making the code cleaner and more
intuitive for testing or quick setup.

## Readonly Properties

This example models an immutable invoice record for a billing system.

main.php
    

&lt;?php

declare(strict_types=1);

class Invoice {
    public function __construct(
        private readonly string $invoiceNumber,
        private readonly float $amount
    ) {}

    public function getDetails(): string {
        return "Invoice: $this-&gt;invoiceNumber, Amount: $this-&gt;amount";
    }
}

$invoice = new Invoice("INV-001", 150.75);
echo $invoice-&gt;getDetails();

In this example, the Invoice class uses readonly with
promoted properties to create an immutable billing record. Once set,
$invoiceNumber and $amount cannot be modified,
ensuring data integrity after creation.

This is ideal for financial systems where invoices must remain unchanged once
issued. The combination of promotion and readonly simplifies the
class definition while enforcing immutability, reducing the risk of accidental
data alteration in production code.

## Union Types

This example represents a customer with a flexible ID type in a CRM system.

main.php
    

&lt;?php

declare(strict_types=1);

class Customer {
    public function __construct(
        private string|int $customerId,
        private string $contactName
    ) {}

    public function getContactInfo(): string {
        return "Customer ID: $this-&gt;customerId, Contact: $this-&gt;contactName";
    }
}

$customer = new Customer("CUST123", "Jane Smith");
echo $customer-&gt;getContactInfo();

The Customer class uses a union type (string|int) for
$customerId, allowing it to accept either a numeric or string ID,
which is common in CRM systems with legacy or mixed data sources. The
$contactName remains a simple string.

This flexibility is practical when integrating with external systems that use
different ID formats. Constructor property promotions keep the syntax concise,
while union types ensure the class can handle varied inputs without additional
logic, enhancing adaptability.

## Nullable Properties

This example models an employee with an optional department in an HR system.

main.php
    

&lt;?php

declare(strict_types=1);

class Employee {
    public function __construct(
        private string $name,
        private ?string $department = null
    ) {}

    public function getEmployeeInfo(): string {
        $dept = $this-&gt;department ?? "Not assigned";
        return "Employee: $this-&gt;name, Department: $dept";
    }
}

$employee = new Employee("Alice Brown");
echo $employee-&gt;getEmployeeInfo();

In this HR scenario, the Employee class uses a nullable promoted
property $department, defaulting to null if
unspecified. This reflects cases where an employee might not yet be assigned to
a department.

This is practical for systems tracking staff allocation, where some data might
be optional at creation. The nullable type combined with promotion simplifies
the class structure, and the getEmployeeInfo method handles the
null case gracefully, improving usability.

## Multiple Constructors

This example provides alternative constructors for a subscription in a service app.

main.php
    

&lt;?php

declare(strict_types=1);

class Subscription {
    public function __construct(
        private string $plan,
        private float $monthlyFee
    ) {}

    public static function createFreeTrial(): self {
        return new self("Trial", 0.0);
    }

    public function getPlanDetails(): string {
        return "Plan: $this-&gt;plan, Fee: $$this-&gt;monthlyFee/month";
    }
}

$freeSubscription = Subscription::createFreeTrial();
echo $freeSubscription-&gt;getPlanDetails();

The Subscription class uses constructor property promotions for
$plan and $monthlyFee, and includes a static method
createFreeTrial to instantiate a free trial subscription. This is
common in subscription-based services like streaming or SaaS platforms.

This approach allows flexible object creation—either custom plans via the
constructor or a predefined trial via the static method. It keeps the code DRY
(Don't Repeat Yourself) by reusing the promoted properties, enhancing
maintainability and readability.

## Inheritance

This example extends a base class for a premium user in a membership system.

main.php
    

&lt;?php

declare(strict_types=1);

class Member {
    public function __construct(
        protected string $memberName,
        protected int $joinYear
    ) {}
}

class PremiumMember extends Member {
    public function __construct(
        string $memberName,
        int $joinYear,
        private string $membershipLevel
    ) {
        parent::__construct($memberName, $joinYear);
    }

    public function getMembershipInfo(): string {
        return "Name: $this-&gt;memberName, Joined: $this-&gt;joinYear, Level: $this-&gt;membershipLevel";
    }
}

$premium = new PremiumMember("Bob Wilson", 2023, "Gold");
echo $premium-&gt;getMembershipInfo();

The Member base class uses promoted properties for
$memberName and $joinYear, while
PremiumMember extends it, adding a $membershipLevel
property. The child class constructor calls the parent's to initialize inherited
properties.

This is practical for membership systems where a base class defines common
attributes, and subclasses add specific features. Constructor property
promotions streamline the base class, while inheritance ensures code reuse,
making it efficient to model tiered membership levels.

## Constructor with Validation

This example validates a booking's details in a reservation system.

main.php
    

&lt;?php

declare(strict_types=1);

class Booking {
    public function __construct(
        private string $guestName,
        private int $roomNumber,
        private string $checkInDate
    ) {
        if ($roomNumber &lt; 1 || $roomNumber &gt; 500) {
            throw new ValueError("Room number must be between 1 and 500.");
        }
    }

    public function getBookingInfo(): string {
        return "Guest: $this-&gt;guestName, Room: $this-&gt;roomNumber, Check-in: $this-&gt;checkInDate";
    }
}

try {
    $booking = new Booking("Emma Lee", 501, "2025-04-01");
    echo $booking-&gt;getBookingInfo();
} catch (ValueError $e) {
    echo "Error: " . $e-&gt;getMessage();
}

The Booking class uses promoted properties for
$guestName, $roomNumber, and
$checkInDate, with validation logic in the constructor to ensure
the room number is within a valid range (1-500). If invalid, it throws a
ValueError.

This is practical for hotel or event reservation systems where input constraints
are critical. Combining promotion with validation keeps the class concise yet
robust, reducing boilerplate while enforcing business rules at object creation.

The try-catch block demonstrates error handling, ensuring the
system can gracefully handle invalid inputs (e.g., room 501), making it suitable
for production use where data integrity matters.

## Complex Object with Array Property

This example models a shopping cart with an array of items.

main.php
    

&lt;?php

declare(strict_types=1);

class ShoppingCart {
    public function __construct(
        private string $cartId,
        private array $items
    ) {}

    public function getCartSummary(): string {
        $itemCount = count($this-&gt;items);
        return "Cart ID: $this-&gt;cartId, Items: $itemCount";
    }
}

$cart = new ShoppingCart("CART-XYZ", ["Shirt", "Pants", "Shoes"]);
echo $cart-&gt;getCartSummary();

The ShoppingCart class uses promoted properties to define a
$cartId and an array of $items, representing a user's
cart in an e-commerce application. The constructor directly assigns these values
upon instantiation.

This is useful for managing shopping carts where items are stored as an array, a
common structure in online retail. The promotion feature keeps the code
succinct, avoiding separate property declarations and assignments, while
supporting complex types like arrays.

The getCartSummary method shows how to work with the promoted array
property, providing a simple count of items. This approach is
extensible—additional logic (e.g., calculating totals) could be added without
altering the constructor's clean design.

## Source

[PHP Constructor Property Promotions - Documentation](https://www.php.net/manual/en/language.oop5.decon.php)

In this article, we explored PHP's constructor property promotions, a feature that simplifies class property declaration and initialization.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).