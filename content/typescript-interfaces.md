+++
title = "TypeScript Interfaces"
date = 2025-08-29T20:14:29.352+01:00
draft = false
description = "TypeScript tutorial on interfaces, covering their creation, usage, and practical examples."
image = ""
imageBig = ""
categories = ["typescript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# TypeScript Interfaces

last modified February 25, 2025

Interfaces in TypeScript are used to define the structure of objects. They allow
you to specify the shape of an object, including the properties and methods it
should have. This tutorial covers the creation, usage, and practical examples of
TypeScript interfaces.

Interfaces are a way to define custom types in TypeScript. They describe the
shape of an object, including the names and types of its properties and methods.
Interfaces are purely a compile-time construct and do not generate any
JavaScript code.

## Basic Interface

This example demonstrates how to create and use a basic interface.

basic_interface.ts
  

interface Person {
    name: string;
    age: number;
}

let user: Person = {
    name: "Alice",
    age: 30
};

console.log(user);  // Output: { name: "Alice", age: 30 }

The Person interface defines the structure of an object with
name and age properties. The user object
conforms to this interface.

## Optional Properties

This example demonstrates how to define optional properties in an interface.

optional_properties.ts
  

interface Person {
    name: string;
    age?: number;  // Optional property
}

let user1: Person = {
    name: "Alice"
};

let user2: Person = {
    name: "Bob",
    age: 25
};

console.log(user1);  // Output: { name: "Alice" }
console.log(user2);  // Output: { name: "Bob", age: 25 }

The age property is marked as optional using the ?
symbol. This allows objects to omit the age property while still
conforming to the Person interface.

## Readonly Properties

This example demonstrates how to define readonly properties in an interface.

readonly_properties.ts
  

interface Person {
    readonly id: number;
    name: string;
}

let user: Person = {
    id: 1,
    name: "Alice"
};

// user.id = 2;  // Error: Cannot assign to 'id' because it is a read-only property.
console.log(user);  // Output: { id: 1, name: "Alice" }

The id property is marked as readonly, meaning it cannot be
modified after the object is created. This ensures immutability for specific
properties.

## Function Types in Interfaces

This example demonstrates how to define function types in an interface.

function_types.ts
  

interface GreetFunction {
    (name: string): string;
}

let greet: GreetFunction = (name) =&gt; {
    return `Hello, ${name}!`;
};

console.log(greet("Alice"));  // Output: Hello, Alice!

The GreetFunction interface defines a function type that takes a
string parameter and returns a string. The
greet function conforms to this interface.

## Extending Interfaces

This example demonstrates how to extend an interface to create a new interface.

extending_interfaces.ts
  

interface Person {
    name: string;
    age: number;
}

interface Employee extends Person {
    employeeId: number;
}

let employee: Employee = {
    name: "Alice",
    age: 30,
    employeeId: 12345
};

console.log(employee);  // Output: { name: "Alice", age: 30, employeeId: 12345 }

The Employee interface extends the Person interface,
adding an employeeId property. This allows for reusable and modular
type definitions.

## Indexable Types

This example demonstrates how to define indexable types in an interface.

indexable_types.ts
  

interface StringArray {
    [index: number]: string;
}

let fruits: StringArray = ["Apple", "Banana", "Cherry"];

console.log(fruits[0]);  // Output: Apple

The StringArray interface defines an indexable type where the index
is a number and the value is a string. This allows for
array-like structures with type safety.

## Best Practices for Using Interfaces

- **Use Descriptive Names:** Choose meaningful names for interfaces to improve code readability.

- **Keep Interfaces Small:** Define small, focused interfaces to promote reusability and modularity.

- **Leverage Extensibility:** Use interface inheritance to create reusable and modular type definitions.

- **Document Interfaces:** Add comments or documentation to explain the purpose of custom interfaces.

## Source

[TypeScript Interfaces Documentation](https://www.typescriptlang.org/docs/handbook/interfaces.html)

In this article, we have explored TypeScript interfaces and demonstrated their
usage through practical examples.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all TypeScript tutorials](/all/#typescript).