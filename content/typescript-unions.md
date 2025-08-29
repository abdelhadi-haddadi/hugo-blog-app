+++
title = "TypeScript Unions"
date = 2025-08-29T20:14:36.087+01:00
draft = false
description = "TypeScript tutorial on unions, covering their creation, manipulation, and common operations with practical examples."
image = ""
imageBig = ""
categories = ["typescript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# TypeScript Unions

last modified February 24, 2025

Unions in TypeScript allow a variable to be one of several types. They are
declared using the | operator. Unions provide flexibility and
power in type checking, making it possible to write more robust code.

Unions in TypeScript are a way to define a variable that can be one of several
types. For example, a variable can be either a string or a number.

## Declaring Unions

This example demonstrates how to declare a union in TypeScript.

declaring_unions.ts
  

let value: string | number = "Hello";
value = 10;

console.log(value);  // Output: 10

The value variable is declared to be of type string or
number. It is initially assigned the string value "Hello",
but can later be assigned the number value 10.

## Union Narrowing

TypeScript uses a process called union narrowing to determine the actual type
of a union variable.

union_narrowing.ts
  

function printValue(value: string | number) {
    if (typeof value === "string") {
        console.log(value.length);
    } else {
        console.log(value);
    }
}

printValue("Hello");  // Output: 5
printValue(10);       // Output: 10

In this example, the printValue function takes a union argument.
By checking the type of value using typeof, TypeScript
narrows down the possible types, allowing us to call methods specific to that
type.

## Union Operators

TypeScript provides several operators for working with unions.

### Intersection

The intersection operator (∧) combines multiple types into a single type.

intersection_operator.ts
  

interface Person {
    name: string;
    age: number;
}

interface Developer {
    language: string;
}

type Programmer = Person &amp; Developer;

let programmer: Programmer = {
    name: "Jan",
    age: 35,
    language: "TypeScript"
};

### Distributive Conditional Types

Distributive conditional types apply a type operation to each member of a
union.

Distributive union types apply a conditional type to each member of a union type
individually, and then combine the results back into a union type. This is
achieved through conditional types using the extends keyword.

distributive_conditional_types.ts
  

type MyUnion = number | boolean | string;

type ToArray&lt;T&gt; = T extends any ? T[] : never;

type MyUnionArray = ToArray&lt;MyUnion&gt;;

const numberArray: MyUnionArray = [1, 2, 3]; 
const booleanArray: MyUnionArray = [true, false]; 
const stringArray: MyUnionArray = ["a", "b", "c"]; 

console.log(numberArray); 
console.log(booleanArray);
console.log(stringArray); 

In this example, the ToArray conditional type transforms each
member of the MyUnion union type into an array of that member type. The
resulting MyUnionArray type will be number[] | boolean[] | string[], 
meaning it can be an array of numbers, booleans, or strings.

### Mapped Types

Mapped types apply a type transformation to each property of an object type.

mapped_types.ts
  

type ReadOnly&lt;T&gt; = {
    readonly [P in keyof T]: T[P];
};

interface Person {
    name: string;
    age: number;
}

type ReadOnlyPerson = ReadOnly&lt;Person&gt;;

let person: ReadOnlyPerson = {
    name: "Jan",
    age: 35
};

person.name = "John";  // Error: Cannot assign to 'name' because it is a read-only property.

## Best Practices for Using Unions

- **Use Union Narrowing:** Utilize TypeScript's union narrowing feature to determine the actual type of a union variable.

- **Prefer Specific Types:** Avoid unions when possible, as they can make code harder to understand and maintain.

- **Use Union Operators:** Leverage TypeScript's union operators, such as intersection and mapped types, for powerful type manipulation.

- **Handle Edge Cases:** Always check for edge cases when working with unions, as they can introduce unexpected behavior.

## Source

[TypeScript Unions and Intersections Documentation](https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html)

In this article, we have explored TypeScript unions and demonstrated their usage
through practical examples.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all TypeScript tutorials](/all/#typescript).