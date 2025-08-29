+++
title = "PHP Behat Library"
date = 2025-08-29T20:04:10.231+01:00
draft = false
description = "PHP Behat tutorial shows how to use the Behat library for Behavior-Driven Development (BDD) in PHP. Learn to write and run tests with practical examples."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP Behat Library

last modified March 19, 2025

Behat is a Behavior-Driven Development (BDD) framework for PHP. It lets you
write readable tests to define app behavior. This guide covers setup, feature
writing, and test execution with real-world examples.

## Installation

Install Behat and Brick Math for decimals using Composer in your project dir:

composer require --dev behat/behat brick/math

This adds Behat and Brick Math as dev dependencies to your PHP project.

## Initializing Behat

Initialize Behat in your project by running this command:

vendor/bin/behat --init

This sets up the directory structure and config files for Behat.

## Writing a Feature

Behat uses Gherkin syntax for readable behavior specs. Create feature files
in the features dir for practical e-commerce examples.

features/cart.feature
  

Feature: Shopping Cart
  As a customer
  To manage my purchases
  I want to add items to my cart and see the total

  Scenario: Add item to cart
    Given I have an empty cart
    When I add a "Laptop" costing 999.99
    Then the cart total should be 999.99

  Scenario: Add multiple items to cart
    Given I have an empty cart
    When I add a "Mouse" costing 29.99
    And I add a "Keyboard" costing 59.99
    Then the cart total should be 89.98

This feature tests the shopping cart functionality of an e-commerce app. It
defines two scenarios: adding a single item and adding multiple items.

The first scenario ensures a single item ("Laptop") updates the total
correctly to 999.99. The second tests adding a "Mouse" and "Keyboard",
verifying the total sums to 89.98, simulating real shopping behavior.

features/login.feature
  

Feature: User Login
  As a registered user
  To access my account
  I want to log in with my credentials

  Scenario: Successful login
    Given I am on the login page
    When I enter username "user1" and password "pass123"
    Then I should be logged in successfully

This feature tests user authentication, a key part of most web apps. It
focuses on a successful login scenario with predefined credentials.

It starts by placing the user on the login page, then simulates entering a
username and password. The final step checks if login succeeds, mimicking a
common user flow in secure systems.

features/order.feature
  

Feature: Order Processing
  As a customer
  To complete my purchase
  I want to process my cart into an order

  Scenario: Process cart to order
    Given I have an empty cart
    And I add a "Book" costing 19.99
    When I process the order
    Then the order total should be 19.99

This feature tests the order creation process in an e-commerce app. It
verifies that items in the cart can be turned into a finalized order.

The scenario starts with an empty cart, adds a "Book" priced at 19.99, and
then processes it into an order. It checks that the order total matches the
cart total, ensuring accurate transaction completion.

These features test cart management, user login, and order processing.

## Defining Step Definitions

Step definitions are PHP methods linking Gherkin steps to code. Edit the
context class in features/bootstrap with strict types and decimals.

features/bootstrap/FeatureContext.php
  

&lt;?php

declare(strict_types=1);

use Behat\Behat\Context\Context;
use Brick\Math\BigDecimal;

class FeatureContext implements Context
{
    private array $cart = [];
    private BigDecimal $total;
    private bool $isLoggedIn = false;
    private string $currentPage = '';
    private ?BigDecimal $orderTotal = null;

    /** @Given I have an empty cart */
    public function iHaveAnEmptyCart(): void
    {
        $this-&gt;cart = [];
        $this-&gt;total = BigDecimal::zero();
    }

    /** @When I add a :item costing :price */
    public function iAddItemCosting(string $item, string $price): void
    {
        $cost = BigDecimal::of($price);
        $this-&gt;cart[] = ['item' =&gt; $item, 'price' =&gt; $cost];
        $this-&gt;total = $this-&gt;total-&gt;plus($cost);
    }

    /** @Then the cart total should be :expected */
    public function theCartTotalShouldBe(string $expected): void
    {
        $expectedTotal = BigDecimal::of($expected);
        if (!$this-&gt;total-&gt;isEqualTo($expectedTotal)) {
            throw new Exception("Expected $expectedTotal, got $this-&gt;total");
        }
    }

    /** @Given I am on the login page */
    public function iAmOnTheLoginPage(): void
    {
        $this-&gt;currentPage = 'login';
        $this-&gt;isLoggedIn = false;
    }

    /** @When I enter username :username and password :password */
    public function iEnterUsernameAndPassword(
        string $username,
        string $password
    ): void {
        if ($this-&gt;currentPage !== 'login') {
            throw new Exception('Not on login page');
        }
        $this-&gt;isLoggedIn = $username === 'user1' &amp;&amp; $password === 'pass123';
    }

    /** @Then I should be logged in successfully */
    public function iShouldBeLoggedInSuccessfully(): void
    {
        if (!$this-&gt;isLoggedIn) {
            throw new Exception('Login failed');
        }
    }

    /** @When I process the order */
    public function iProcessTheOrder(): void
    {
        $this-&gt;orderTotal = $this-&gt;total;
        $this-&gt;cart = [];
        $this-&gt;total = BigDecimal::zero();
    }

    /** @Then the order total should be :expected */
    public function theOrderTotalShouldBe(string $expected): void
    {
        $expectedTotal = BigDecimal::of($expected);
        if ($this-&gt;orderTotal === null || !$this-&gt;orderTotal-&gt;isEqualTo($expectedTotal)) {
            throw new Exception("Expected $expectedTotal, got $this-&gt;orderTotal");
        }
    }
}

This context class defines all steps for the three features using strict
types and BigDecimal for precision. It maintains state with properties like
cart, total, and login status.

The iHaveAnEmptyCart method resets the cart and total to zero,
preparing for new items. It uses an empty array for the cart and
zero for the total, ensuring a clean slate.

The iAddItemCosting method adds an item and its price to the
cart. It converts the price string to a BigDecimal, stores the item in an
array, and updates the total with precise addition via plus.

The theCartTotalShouldBe method checks if the cart total matches
the expected value. It converts the expected string to BigDecimal and uses
isEqualTo for an exact comparison, throwing an error if they differ.

The iAmOnTheLoginPage method simulates navigating to the login
page. It sets the current page to "login" and ensures the user isn't logged
in, providing context for the login steps.

The iEnterUsernameAndPassword method handles login attempts. It
checks if the user is on the login page, then verifies the credentials
against hardcoded values ("user1", "pass123") for simplicity.

The iShouldBeLoggedInSuccessfully method confirms login success.
It throws an exception if the login flag isn't true, ensuring the
authentication logic worked as expected.

The iProcessTheOrder method converts the cart total to an order
total. It stores the current total, then resets the cart and total,
mimicking a real checkout process.

The theOrderTotalShouldBe method verifies the order total. It
checks if the order total exists and matches the expected BigDecimal value,
throwing an error if either check fails.

This context uses strict types and BigDecimal for precise cart and order calcs,
plus login logic.

## Running Behat Tests

Execute your Behat tests with this command:

vendor/bin/behat

This runs all feature files in features and shows results.

## Using Hooks

Hooks let you run code around scenarios. Use them for setup or cleanup, like
logging test starts in a professional setting.

hooks_example.php
  

&lt;?php

declare(strict_types=1);

use Behat\Behat\Context\Context;

class FeatureContext implements Context
{
    private string $logFile = 'test.log';

    /** @BeforeScenario */
    public function beforeScenario(): void
    {
        file_put_contents($this-&gt;logFile, "Test started\n", FILE_APPEND);
    }

    /** @AfterScenario */
    public function afterScenario(): void
    {
        file_put_contents($this-&gt;logFile, "Test ended\n", FILE_APPEND);
    }
}

This logs test start and end times to a file for auditing purposes.

## Best Practices for Behat

**Write Clear Scenarios:** Use concise, descriptive steps
for clarity.
**Reuse Step Definitions:** Share steps across features to
reduce redundancy.
**Use Hooks Wisely:** Manage resources like logs or DBs
with hooks.
**Integrate with CI/CD:** Add Behat to CI pipelines for
early bug detection.

## Source

[Behat Documentation](https://docs.behat.org/en/latest/)

This tutorial showed how to use Behat for BDD in PHP. It provides a way to
write clear tests that align with business needs, aiding collaboration.

## Author

My name is Jan Bodnar, a passionate coder with years of experience. I've
written programming articles since 2007, totaling over 1400 and 8 e-books.
I have eight years of teaching programming.

List [all PHP tutorials](/php/).