+++
title = "TypeScript type Keyword"
date = 2025-08-29T20:14:36.092+01:00
draft = false
description = "TypeScript tutorial on the type keyword, covering its usage for creating custom types and type aliases with practical examples."
image = ""
imageBig = ""
categories = ["typescript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# TypeScript type Keyword

last modified February 25, 2025

The type keyword in TypeScript is used to create custom types or
type aliases. It allows you to define reusable and complex types, making your
code more readable and maintainable. This tutorial covers the usage of the
type keyword with practical examples.

The type keyword is used to create type aliases, which are custom
names for existing types or combinations of types. Type aliases can represent
primitive types, object types, union types, intersection types, and more. They
do not create new types but provide a way to refer to existing types with a
custom name.

## Creating Basic Type Aliases

This example demonstrates how to create a basic type alias for a primitive type.

basic_type_alias.ts
  

type Age = number;

let userAge: Age = 25;
console.log(userAge);  // Output: 25

The Age type alias is created for the number type.
This makes the code more readable and allows for easier changes if the type
needs to be updated.

## Creating Object Type Aliases

This example demonstrates how to create a type alias for an object type.

object_type_alias.ts
  

type User = {
    name: string;
    age: number;
    isActive: boolean;
};

let user: User = {
    name: "Alice",
    age: 30,
    isActive: true
};

console.log(user);  // Output: { name: "Alice", age: 30, isActive: true }

The User type alias defines the structure of an object with
specific properties. This makes it easier to define and reuse the structure of
user objects.

## Creating Union Type Aliases

This example demonstrates how to create a type alias for a union type.

union_type_alias.ts
  

type ID = string | number;

let userId: ID = "12345";
let productId: ID = 67890;

console.log(userId);    // Output: 12345
console.log(productId); // Output: 67890

The ID type alias is created for a union type that can be either a
string or a number. This allows for flexible type
definitions.

## Creating Function Type Aliases

This example demonstrates how to create a type alias for a function type.

function_type_alias.ts
  

type GreetFunction = (name: string) =&gt; string;

let greet: GreetFunction = (name) =&gt; {
    return `Hello, ${name}!`;
};

console.log(greet("Alice"));  // Output: Hello, Alice!

The GreetFunction type alias defines a function type that takes a
string parameter and returns a string. This makes it
easier to define and use functions with the same signature.

## Creating Tuple Type Aliases

This example demonstrates how to create a type alias for a tuple type.

tuple_type_alias.ts
  

type Point = [number, number];

let coordinates: Point = [10, 20];
console.log(coordinates);  // Output: [10, 20]

The Point type alias defines a tuple type that represents a pair of
numbers. This makes it easier to work with coordinate pairs or similar data
structures.

## Creating Intersection Type Aliases

This example demonstrates how to create a type alias for an intersection type.

intersection_type_alias.ts
  

type Person = {
    name: string;
    age: number;
};

type Employee = {
    employeeId: number;
};

type EmployeeDetails = Person &amp; Employee;

let employee: EmployeeDetails = {
    name: "Alice",
    age: 30,
    employeeId: 12345
};

console.log(employee);  // Output: { name: "Alice", age: 30, employeeId: 12345 }

The EmployeeDetails type alias combines the Person and
Employee types using the intersection operator (&amp;).
This allows you to create a new type that includes all properties from both
types.

## Best Practices for Using the type Keyword

- **Use Descriptive Names:** Choose meaningful names for type aliases to improve code readability.

- **Reuse Common Types:** Create type aliases for commonly used types to avoid repetition.

- **Combine Types:** Use type aliases to combine and simplify complex type definitions.

- **Document Types:** Add comments or documentation to explain the purpose of custom type aliases.

## Source

[The type Keyword Documentation](https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-aliases)

In this article, we have explored the TypeScript type keyword and
demonstrated its usage through practical examples.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all TypeScript tutorials](/all/#typescript).