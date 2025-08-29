+++
title = "Python FactoryBoy"
date = 2025-08-29T20:08:29.555+01:00
draft = false
description = "Python tutorial on the FactoryBoy library, covering basic and advanced usage for generating test data with practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python FactoryBoy

last modified March 11, 2025

The FactoryBoy library in Python is a powerful tool for generating
test data. It allows you to create model instances with realistic, randomized,
or predefined data, making it ideal for testing and development. This tutorial
covers basic and advanced usage of FactoryBoy with practical
examples.

FactoryBoy is particularly useful for creating fixtures, populating
databases, and generating test cases for unit and integration tests.

## Installation

To use FactoryBoy, you need to install it first. You can install it
using pip:

pip install factory_boy

## Basic Usage

This example generates test data for a customer in an e-commerce system.

basic_factory.py
  

import factory

class Customer:
    def __init__(self, full_name, email, phone):
        self.full_name = full_name
        self.email = email
        self.phone = phone

class CustomerFactory(factory.Factory):
    class Meta:
        model = Customer

    full_name = factory.Faker("name")
    email = factory.Faker("email")
    phone = factory.Faker("phone_number")

customer = CustomerFactory()
print(f"Customer: {customer.full_name}, Email: {customer.email}, Phone: {customer.phone}")

In this practical example, the CustomerFactory creates
Customer instances with realistic data for an e-commerce platform.
The Faker provider generates random full names, emails, and phone
numbers, mimicking real customer profiles.

This is useful for testing features like user registration or order processing
without manually crafting test data. The factory simplifies setup for unit
tests by providing consistent, varied inputs, saving time and reducing errors
in test preparation.

## Using with Django Models

This example creates test users for a Django-based blog application.

django_factory.py
  

import factory
from django.contrib.auth.models import User

class BlogUserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User

    username = factory.Faker("user_name")
    email = factory.Faker("email")
    first_name = factory.Faker("first_name")
    last_name = factory.Faker("last_name")
    is_active = True

user = BlogUserFactory()
print(f"Blog User: {user.username}, Email: {user.email}, Active: {user.is_active}")

Here, the BlogUserFactory generates User instances for
a Django blog app. It uses DjangoModelFactory to integrate with
Django's ORM, creating users with random usernames, emails, and names, plus a
fixed is_active status.

This is practical for testing authentication, permissions, or post creation in
a blog system. By setting is_active=True, the factory ensures users
are ready for login tests, while Faker provides diverse data to simulate real
user scenarios.

## Customizing Factory Behavior

This example generates discounted products for an online store's test suite.

custom_factory.py
  

import factory

class Product:
    def __init__(self, name, original_price):
        self.name = name
        self.original_price = original_price

class ProductFactory(factory.Factory):
    class Meta:
        model = Product

    name = factory.Faker("catch_phrase")
    original_price = factory.Faker("pydecimal", left_digits=3, right_digits=2, positive=True)

    @factory.post_generation
    def apply_sale(self, create, extracted, **kwargs):
        if extracted:
            self.original_price *= 0.85  # Apply 15% discount

sale_product = ProductFactory(apply_sale=True)
print(f"Product on Sale: {sale_product.name}, Price: ${sale_product.original_price}")

In this scenario, the ProductFactory creates Product
instances with catchy names and prices. The post_generation hook
apply_sale optionally applies a 15% discount, simulating a sale
event in an online store.

This customization is valuable for testing pricing logic or promotional
features. By using apply_sale=True, developers can generate
discounted products on demand, ensuring test coverage for both regular and sale
prices without duplicating factory definitions.

## Using Sequences

This example generates unique invoice numbers for an accounting system.

sequence_factory.py
  

import factory

class Invoice:
    def __init__(self, invoice_number, client_name):
        self.invoice_number = invoice_number
        self.client_name = client_name

class InvoiceFactory(factory.Factory):
    class Meta:
        model = Invoice

    invoice_number = factory.Sequence(lambda n: f"INV-{n:04d}")
    client_name = factory.Faker("company")

invoice1 = InvoiceFactory()
invoice2 = InvoiceFactory()
print(f"Invoice 1: {invoice1.invoice_number}, Client: {invoice1.client_name}")
print(f"Invoice 2: {invoice2.invoice_number}, Client: {invoice2.client_name}")

The InvoiceFactory generates Invoice objects with
unique invoice numbers (e.g., INV-0001, INV-0002) using
factory.Sequence. The client names are random company names from
Faker, simulating real billing data.

This is ideal for testing financial systems where invoices must have distinct
identifiers. The sequence ensures no duplicates, mimicking a production
environment, while Faker adds variety to client names for comprehensive test
scenarios.

## Using SubFactories

This example creates test data for a student and their enrolled course.

subfactory_example.py
  

import factory

class Course:
    def __init__(self, title, code):
        self.title = title
        self.code = code

class Student:
    def __init__(self, name, course):
        self.name = name
        self.course = course

class CourseFactory(factory.Factory):
    class Meta:
        model = Course

    title = factory.Faker("job")  # Using job titles as course names
    code = factory.Sequence(lambda n: f"CS{n:03}")

class StudentFactory(factory.Factory):
    class Meta:
        model = Student

    name = factory.Faker("name")
    course = factory.SubFactory(CourseFactory)

student = StudentFactory()
print(f"Student: {student.name}, Course: {student.course.title} ({student.course.code})")

In this example, the CourseFactory generates Course
objects with job-like titles and unique codes (e.g., CS001). The
StudentFactory uses a SubFactory to link each
Student to a Course, simulating enrollment in an
educational system.

This is practical for testing student management systems or course registration
features. The subfactory approach ensures relational data consistency, allowing
developers to test interactions between students and courses without manually
creating related objects.

## Generating Test Orders with Items

This example creates test orders with associated items for an e-commerce test suite.

order_items_factory.py
  

import factory

class Item:
    def __init__(self, name, quantity):
        self.name = name
        self.quantity = quantity

class Order:
    def __init__(self, order_id, items):
        self.order_id = order_id
        self.items = items

class ItemFactory(factory.Factory):
    class Meta:
        model = Item

    name = factory.Faker("word")
    quantity = factory.Faker("pyint", min_value=1, max_value=10)

class OrderFactory(factory.Factory):
    class Meta:
        model = Order

    order_id = factory.Sequence(lambda n: f"ORD-{n:05}")
    items = factory.List([factory.SubFactory(ItemFactory) for _ in range(2)])

order = OrderFactory()
print(f"Order ID: {order.order_id}")
for item in order.items:
    print(f"Item: {item.name}, Quantity: {item.quantity}")

The ItemFactory generates Item objects with random
names and quantities (1-10). The OrderFactory creates
Order instances with unique order IDs and a fixed list of two items
using factory.List and SubFactory.

This is highly practical for testing order processing or inventory management
in e-commerce applications. The factory simulates a realistic order with
multiple items, allowing developers to test order totals, stock updates, or
checkout flows efficiently.

By fixing the item count at two, the example keeps output manageable, but the
approach can be extended to variable lengths for more complex test cases,
enhancing flexibility in test design.

## Factory with Lazy Attributes for Dynamic Data

This example generates test tickets with dynamic resolution times for a support system.

lazy_attribute_factory.py
  

import factory
from datetime import datetime, timedelta

class SupportTicket:
    def __init__(self, ticket_id, issue, created_at, resolved_at):
        self.ticket_id = ticket_id
        self.issue = issue
        self.created_at = created_at
        self.resolved_at = resolved_at

class SupportTicketFactory(factory.Factory):
    class Meta:
        model = SupportTicket

    ticket_id = factory.Sequence(lambda n: f"TICKET-{n:03}")
    issue = factory.Faker("sentence")
    created_at = factory.Faker("date_time_this_year")
    resolved_at = factory.LazyAttribute(lambda obj: obj.created_at + timedelta(days=factory.Faker("pyint", min_value=1, max_value=7).generate()))

ticket = SupportTicketFactory()
print(f"Ticket: {ticket.ticket_id}, Issue: {ticket.issue}")
print(f"Created: {ticket.created_at}, Resolved: {ticket.resolved_at}")

The SupportTicketFactory creates SupportTicket
instances with unique ticket IDs, random issues, and dynamic timestamps. The
created_at field uses Faker for a date this year, while
resolved_at is calculated with LazyAttribute to be 1-7
days after creation.

This is useful for testing support ticket workflows, such as response times or
resolution tracking. The lazy attribute ensures the resolved time is logically
consistent with the creation time, simulating real ticket lifecycles without
hardcoding values.

The try-catch block isn't needed here since no exceptions are
thrown, but the factory's dynamic nature makes it adaptable for testing time-based
features or reporting in a helpdesk application.

## Best Practices for FactoryBoy

- **Use for Test Data:** Use FactoryBoy to generate realistic test data for unit and integration tests.

- **Customize Factories:** Customize factories to match your application's data requirements.

- **Use Sequences for Uniqueness:** Use sequences to ensure unique values for fields like IDs or usernames.

- **Leverage SubFactories:** Use subfactories to create related objects and maintain data consistency.

## Source

[FactoryBoy Documentation](https://factoryboy.readthedocs.io/en/stable/)

In this article, we have explored various examples of using the Python
FactoryBoy library for generating test data, including basic usage,
Django integration, customization, sequences, and subfactories.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).