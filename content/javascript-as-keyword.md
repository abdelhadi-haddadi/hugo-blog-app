+++
title = "JavaScript as keyword"
date = 2025-08-29T20:01:06.772+01:00
draft = false
description = "Learn how to use the 'as' keyword in JavaScript for type assertions and aliases, with examples and explanations."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript as keyword

last modified April 16, 2025

In this article we show how to use the as keyword for type assertions
and aliases in JavaScript and TypeScript.

## The as keyword

The as keyword is primarily used in TypeScript for type assertions.
It tells the compiler to treat a value as a specific type, overriding its
inferred type. This is useful when you know more about a value's type than
TypeScript does.

In JavaScript, the as keyword is used in import statements to create
aliases for imported modules. It helps avoid naming conflicts and improves code
readability by providing more meaningful names.

Type assertions with as don't perform any runtime type checking or
conversion. They're purely a way to tell the TypeScript compiler how to treat a
value during static type checking.

## Basic type assertion with as

The following example demonstrates basic type assertion using the as
keyword in TypeScript.

main.ts
  

let someValue: unknown = "this is a string";
let strLength: number = (someValue as string).length;

console.log(strLength);

Here we have a value of type unknown that we know is actually a
string. We use as to assert its type as string to access the length
property. Without the assertion, TypeScript would show a type error.

$ tsc main.ts &amp;&amp; node main.js
16

## Type assertion with interfaces

The as keyword is often used with interfaces for type assertions.

main.ts
  

interface Person {
    name: string;
    age: number;
}

let obj: unknown = { name: "John", age: 30 };
let person = obj as Person;

console.log(person.name, person.age);

This example shows how to assert an unknown object as a specific interface type.
We define a Person interface and then assert that our unknown object conforms to
this interface. This allows us to safely access the object's properties.

$ tsc main.ts &amp;&amp; node main.js
John 30

## Import aliasing with as

In JavaScript, as can create aliases for imported modules.

main.js
  

import { reallyLongModuleName as shortName } from './module.js';

shortName.doSomething();

Here we import a module with a long name and create a shorter alias for it using
as. This makes the code more readable and easier to work with.
Import aliases are particularly useful when dealing with naming conflicts.

## Type assertion with DOM elements

A common use case for as is asserting types of DOM elements.

main.ts
  

const inputElement = document.getElementById('myInput') as HTMLInputElement;
inputElement.value = 'Hello, TypeScript!';

When working with DOM elements, TypeScript doesn't know their specific types.
We use as to assert that an element is of a particular type (like
HTMLInputElement) to access type-specific properties. This is safer than type
casting with angle brackets.

## Non-null assertion with as

The as keyword can be combined with non-null assertions.

main.ts
  

function getLength(text: string | null): number {
    return (text as string).length;
}

console.log(getLength("Hello"));

This example demonstrates asserting a potentially null value as non-null. We know
the function will be called with a string, so we use as to tell
TypeScript to treat it as such. Be cautious with this pattern as it can lead to
runtime errors if the value is actually null.

$ tsc main.ts &amp;&amp; node main.js
5

## Multiple type assertions

Sometimes you need to chain type assertions to get to the desired type.

main.ts
  

let value: unknown = "Hello World";
let str = (value as any) as string;

console.log(str.toUpperCase());

In this case, we first assert the unknown type to any, then to
string. This is sometimes necessary when TypeScript's type system
is too restrictive. However, this pattern should be used sparingly as it
bypasses type safety.

$ tsc main.ts &amp;&amp; node main.js
HELLO WORLD

## Type assertion vs type casting

It's important to understand that as is not the same as type casting.

main.ts
  

let num: any = "123";
let strNum = num as string;
let actualNum = Number(num);

console.log(typeof strNum, typeof actualNum);

This example shows the difference between type assertion and actual type
conversion. The as keyword doesn't change the runtime value - it
only affects type checking. To actually convert types, you need to use proper
type conversion functions.

$ tsc main.ts &amp;&amp; node main.js
string number

## Source

[TypeScript type assertions](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions)

In this article we have demonstrated how to use the as keyword for type assertions
and import aliases in JavaScript and TypeScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)