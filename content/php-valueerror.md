+++
title = "PHP ValueError"
date = 2025-08-29T20:04:50.930+01:00
draft = false
description = "PHP ValueError tutorial shows how to handle ValueError in PHP."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP ValueError

last modified March 11, 2025

In this article, we explore the ValueError in PHP. A
ValueError is thrown when a function receives an argument of the
correct type but with an invalid value. This exception is commonly used in
strictly typed PHP code to enforce value constraints.

## Basic Definition

A ValueError is a built-in exception in PHP that is thrown when a
function receives an argument with an invalid value. It is often used in
conjunction with strict type declarations to ensure that values meet specific
criteria.

## Basic ValueError

This example validates a discount percentage in an e-commerce system.

main.php
    

&lt;?php

declare(strict_types=1);

function applyDiscount(float $price, float $discount): float
{
    if ($discount &lt; 0 || $discount &gt; 100) {
        throw new ValueError("Discount must be between 0 and 100.");
    }
    return $price * (1 - $discount / 100);
}

try {
    echo applyDiscount(50.0, 150.0);
} catch (ValueError $e) {
    echo "Caught ValueError: " . $e-&gt;getMessage();
}

In this practical scenario, the applyDiscount function calculates a
discounted price. It throws a ValueError if the discount percentage
is outside the valid range of 0 to 100, which is a common business rule in
e-commerce applications.

The try-catch block catches the exception and outputs an error
message. This approach ensures that invalid discounts don't silently produce
incorrect results, improving reliability in pricing logic.

$ php main.php
Caught ValueError: Discount must be between 0 and 100.

## Invalid Array Key

This example retrieves an order item from a shopping cart by index.

main.php
    

&lt;?php

declare(strict_types=1);

function getCartItem(array $cart, int $index): string
{
    if ($index &lt; 0 || $index &gt;= count($cart)) {
        throw new ValueError("Invalid cart item index.");
    }
    return $cart[$index];
}

try {
    $cart = ["Shirt", "Pants", "Shoes"];
    echo getCartItem($cart, 3);
} catch (ValueError $e) {
    echo "Caught ValueError: " . $e-&gt;getMessage();
}

Here, the getCartItem function fetches an item from a shopping cart
array based on an index. It throws a ValueError if the index is
negative or exceeds the array's length, preventing out-of-bounds access.

This is useful in e-commerce or inventory systems where you need to ensure that
item retrieval stays within valid bounds. The try-catch block
handles the error gracefully, informing the user of the invalid input rather
than crashing or returning undefined results.

$ php main.php
Caught ValueError: Invalid cart item index.

## Invalid Enum Value

This example validates a payment status in a transaction system.

main.php
    

&lt;?php

declare(strict_types=1);

enum PaymentStatus: string
{
    case Pending = 'pending';
    case Completed = 'completed';
}

function processPayment(PaymentStatus $status): void
{
    echo "Processing payment with status: " . $status-&gt;value;
}

try {
    processPayment(PaymentStatus::from('failed'));
} catch (ValueError $e) {
    echo "Caught ValueError: " . $e-&gt;getMessage();
}

In this example, we define a PaymentStatus enum with valid values
for a payment system. The processPayment function expects a
PaymentStatus enum value, and PHP throws a ValueError
automatically when PaymentStatus::from() receives an invalid value
like "failed".

This is practical for financial applications where payment states must be
strictly controlled. The try-catch block catches the error, allowing
the system to handle invalid statuses gracefully without proceeding with
incorrect data.

$ php main.php
Caught ValueError: "failed" is not a valid backing value for enum PaymentStatus

## Invalid Date

This example validates a booking date for a reservation system.

main.php
    

&lt;?php

declare(strict_types=1);

function bookDate(string $date): DateTime
{
    $dateTime = DateTime::createFromFormat('Y-m-d', $date);
    if (!$dateTime || $dateTime-&gt;format('Y-m-d') !== $date) {
        throw new ValueError("Invalid or non-existent date.");
    }
    return $dateTime;
}

try {
    echo bookDate('2025-04-31')-&gt;format('Y-m-d');
} catch (ValueError $e) {
    echo "Caught ValueError: " . $e-&gt;getMessage();
}

The bookDate function creates a DateTime object from a
date string in "Y-m-d" format. It throws a ValueError if the date is
invalid (e.g., April 31 doesn't exist) or doesn't match the expected format,
ensuring only valid dates are processed.

This is a realistic scenario for hotel or event booking systems where invalid
dates could disrupt scheduling. The additional check with
format('Y-m-d') ensures the parsed date matches the input, catching
edge cases like non-existent dates.

The try-catch block provides feedback to the user or system, preventing
silent failures and ensuring robust date handling.

$ php main.php
Caught ValueError: Invalid or non-existent date.

## Invalid Integer Range

This example sets a product quantity in an inventory system.

main.php
    

&lt;?php

declare(strict_types=1);

function setStockQuantity(int $quantity): void
{
    if ($quantity &lt; 0 || $quantity &gt; 1000) {
        throw new ValueError("Stock quantity must be between 0 and 1000.");
    }
    echo "Stock set to: " . $quantity;
}

try {
    setStockQuantity(-5);
} catch (ValueError $e) {
    echo "Caught ValueError: " . $e-&gt;getMessage();
}

In this example, the setStockQuantity function enforces a valid
range for product stock (0 to 1000). It throws a ValueError if the
quantity is negative or exceeds the maximum allowed, which is practical for
inventory management.

This ensures that stock levels remain realistic and prevents errors like
negative inventory, which could confuse order processing. The
try-catch block catches the exception, allowing the system to
respond appropriately rather than proceeding with invalid data.

$ php main.php
Caught ValueError: Stock quantity must be between 0 and 1000.

## Invalid String Length

This example validates a product code in a catalog system.

main.php
    

&lt;?php

declare(strict_types=1);

function setProductCode(string $code): void
{
    if (strlen($code) &lt; 3 || strlen($code) &gt; 10) {
        throw new ValueError("Product code must be 3-10 characters.");
    }
    echo "Product code set to: " . $code;
}

try {
    setProductCode("AB");
} catch (ValueError $e) {
    echo "Caught ValueError: " . $e-&gt;getMessage();
}

The setProductCode function ensures that a product code is between
3 and 10 characters long, a common requirement in catalog or SKU systems. It
throws a ValueError if the length constraint is violated.

This is useful for maintaining consistent product identifiers in a database or
e-commerce platform. The try-catch block handles the exception,
providing clear feedback to prevent invalid codes from being saved.

$ php main.php
Caught ValueError: Product code must be 3-10 characters.

## Invalid Email Format

This example validates an email during user registration.

main.php
    

&lt;?php

declare(strict_types=1);

function registerUser(string $email): void
{
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new ValueError("Invalid email address format.");
    }
    echo "User registered with email: " . $email;
}

try {
    registerUser("user@.com");
} catch (ValueError $e) {
    echo "Caught ValueError: " . $e-&gt;getMessage();
}

In this scenario, the registerUser function validates an email
address using PHP's filter_var function. It throws a
ValueError if the email format is invalid, ensuring only proper
email addresses are accepted.

This is a critical check in user registration workflows to prevent malformed
data from entering a system. The try-catch block catches the error,
allowing the application to prompt the user to correct their input.

$ php main.php
Caught ValueError: Invalid email address format.

## Invalid File Size Limit

This example enforces a file upload size limit in a media system.

main.php
    

&lt;?php

declare(strict_types=1);

function uploadFile(int $sizeInBytes): void
{
    $maxSize = 5 * 1024 * 1024; // 5MB
    if ($sizeInBytes &lt;= 0 || $sizeInBytes &gt; $maxSize) {
        throw new ValueError("File size must be between 1 byte and 5MB.");
    }
    echo "File of $sizeInBytes bytes uploaded.";
}

try {
    uploadFile(6 * 1024 * 1024); // 6MB
} catch (ValueError $e) {
    echo "Caught ValueError: " . $e-&gt;getMessage();
}

The uploadFile function checks if a file's size is within an
acceptable range (1 byte to 5MB). It throws a ValueError if the size
is invalid, such as zero, negative, or exceeding the limit.

This is practical for file upload systems where size restrictions protect server
storage and ensure usability. The try-catch block handles the
exception, informing the user or system of the violation without crashing.

By defining a clear limit (5MB here), the function enforces a policy that could
be adjusted based on application needs, making it adaptable for real-world use.

$ php main.php
Caught ValueError: File size must be between 1 byte and 5MB.

## Invalid Currency Code

This example validates a currency code in a payment gateway.

main.php
    

&lt;?php

declare(strict_types=1);

function setCurrency(string $code): void
{
    $validCurrencies = ['USD', 'EUR', 'GBP'];
    if (!in_array($code, $validCurrencies)) {
        throw new ValueError("Invalid currency code.");
    }
    echo "Currency set to: " . $code;
}

try {
    setCurrency('JPY');
} catch (ValueError $e) {
    echo "Caught ValueError: " . $e-&gt;getMessage();
}

In this example, the setCurrency function ensures that a currency
code matches a predefined list of supported currencies. It throws a
ValueError if the code isn't valid, such as "JPY" in this case.

This is useful in payment processing systems where only specific currencies are
accepted. The in_array check provides a simple yet effective way to
validate input against a whitelist.

The try-catch block catches the error, allowing the application to
reject unsupported currencies and prompt the user to choose a valid option,
enhancing data integrity in financial operations.

$ php main.php
Caught ValueError: Invalid currency code.

## Source

[PHP ValueError - Documentation](https://www.php.net/manual/en/class.valueerror.php)

In this article, we have shown how to handle ValueError in PHP.
This exception is useful for enforcing value constraints in strictly typed code.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).