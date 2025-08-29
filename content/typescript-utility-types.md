+++
title = "TypeScript Utility Types"
date = 2025-08-29T20:14:37.226+01:00
draft = false
description = "Learn TypeScript utility types with practical examples. Understand how to use built-in utilities for common type manipulations."
image = ""
imageBig = ""
categories = ["typescript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# TypeScript Utility Types

last modified March 5, 2025

TypeScript utility types are built-in tools that simplify common type
manipulations. They provide a concise way to transform, extract, or modify
existing types without writing custom type definitions from scratch. This
tutorial explores a selection of utility types with practical examples to
demonstrate their utility and versatility.

Utility types like Partial, Pick, and
ReturnType leverage TypeScript's advanced features—such as mapped
types, conditional types, and inference—to address frequent typing needs. They
are globally available in TypeScript, requiring no imports, and are designed to
enhance productivity and type safety in a wide range of scenarios, from object
manipulation to function analysis.

## Partial

The Partial&lt;T&gt; utility makes all properties of a type optional.

partial.ts
  

interface User {
    name: string;
    age: number;
}

const partialUser: Partial&lt;User&gt; = { name: "Alice" };
console.log(partialUser.name); // Output: Alice

The Partial&lt;User&gt; utility transforms the User
interface into a type where name and age are optional
({ name?: string; age?: number }). This allows
partialUser to omit age without a type error, unlike
the original User which requires both properties. 

The output, "Alice," confirms the name property is accessible while
age remains undefined but valid. This utility is ideal for
scenarios like form updates or API payloads where only some fields are provided,
simplifying partial object definitions.

## Pick

The Pick&lt;T, K&gt; utility creates a type by selecting specific
properties from an existing type.

pick.ts
  

interface Product {
    id: number;
    name: string;
    price: number;
}

const pickedProduct: Pick&lt;Product, "id" | "name"&gt; = { id: 1, name: "Laptop" };
console.log(pickedProduct.name); // Output: Laptop

Pick&lt;Product, "id" | "name"&gt; constructs a new type with only
the id and name properties from Product,
resulting in { id: number; name: string }. The
pickedProduct object excludes price, and including it
(e.g., price: 100) would cause a type error. 

The output, "Laptop," shows the selected property in use. This utility is useful
for creating subsets of types, such as when passing only relevant fields to a
function or component, enhancing type precision and reducing boilerplate.

## Omit

The Omit&lt;T, K&gt; utility creates a type by excluding specific
properties from an existing type.

omit.ts
  

interface Item {
    id: number;
    name: string;
    category: string;
}

const omittedItem: Omit&lt;Item, "category"&gt; = { id: 1, name: "Book" };
console.log(omittedItem.name); // Output: Book

Omit&lt;Item, "category"&gt; generates a type from
Item without the category property, yielding {
id: number; name: string }. The omittedItem object adheres
to this, excluding category, and adding it (e.g., category:
"Books") would fail type checking. The output, "Book," confirms the
retained name property. This utility complements Pick
by allowing exclusion rather than inclusion, making it handy for removing
sensitive or irrelevant fields from an object type.

## Readonly

The Readonly&lt;T&gt; utility makes all properties of a type read-only.

readonly.ts
  

interface Config {
    host: string;
    port: number;
}

const config: Readonly&lt;Config&gt; = { host: "localhost", port: 8080 };
// config.host = "example.com"; // Error: Cannot assign to 'host' because it is read-only
console.log(config.host); // Output: localhost

Readonly&lt;Config&gt; transforms Config into {
readonly host: string; readonly port: number }, preventing property
modifications after initialization. The config object can be
defined but not altered—attempting config.host = "example.com"
triggers a compile-time error, as shown in the comment. The output, "localhost,"
reflects the immutable value. This utility is perfect for defining constants or
protecting data structures from unintended changes, enhancing code reliability
in scenarios like configuration management.

## Required

The Required&lt;T&gt; utility makes all optional properties of a
type required.

required.ts
  

interface OptionalUser {
    name?: string;
    age?: number;
}

const requiredUser: Required&lt;OptionalUser&gt; = { name: "Bob", age: 30 };
console.log(requiredUser.age); // Output: 30

Required&lt;OptionalUser&gt; converts OptionalUser's
optional properties (name?: string, age?: number) into
mandatory ones ({ name: string; age: number }). The
requiredUser object must include both name and
age—omitting either (e.g., { name: "Bob" }) results in
a type error. 

The output, 30, confirms age's presence. This utility
is valuable for enforcing completeness, such as ensuring all fields are provided
in a finalized data structure after an optional phase.

## Record

The Record&lt;K, T&gt; utility creates a type with keys of type
K and values of type T.

record.ts
  

type Status = "success" | "error" | "pending";

const statusMessages: Record&lt;Status, string&gt; = {
    success: "Operation completed",
    error: "Something went wrong",
    pending: "In progress"
};

console.log(statusMessages.success); // Output: Operation completed

Record&lt;Status, string&gt; constructs a type where each key from
the Status union ("success" | "error" | "pending")
maps to a string value, resulting in { success: string;
error: string; pending: string }. The statusMessages object
must define all keys with string values, and missing a key (e.g., omitting
pending) would fail type checking. 

The output, "Operation completed," shows the success value. This
utility excels at creating dictionaries or lookup tables with type-safe keys and
values, streamlining mappings like status codes to messages.

## ReturnType

The ReturnType&lt;T&gt; utility extracts the return type of a function type.

returntype.ts
  

function getName(): string {
    return "Alice";
}

type NameType = ReturnType&lt;typeof getName&gt;;
const name: NameType = "Bob";
console.log(name); // Output: Bob

ReturnType&lt;typeof getName&gt; infers the return type of
getName, which is string, using typeof to
capture the function's type. The NameType alias becomes
string, allowing name to be assigned any string value
like "Bob." The output, "Bob," confirms this. This utility is powerful for
deriving types from functions without manually specifying them, useful in
scenarios like typing function results in higher-order functions or callbacks.

## Exclude

The Exclude&lt;T, U&gt; utility removes types from a union that are
assignable to another type.

exclude.ts
  

type Status = "success" | "error" | "pending" | "loading";

type NonErrorStatus = Exclude&lt;Status, "error" | "loading"&gt;;
const status: NonErrorStatus = "success";
console.log(status); // Output: success

Exclude&lt;Status, "error" | "loading"&gt; filters the
Status union ("success" | "error" | "pending" |
"loading"), removing "error" and "loading",
leaving "success" | "pending". The status variable can
be "success" or "pending", but assigning
"error" would fail. 

The output, "success," reflects a valid value. This utility is great for
narrowing unions, such as excluding error states from a status type for specific
logic branches.

## Extract

The Extract&lt;T, U&gt; utility keeps only the types from a union
that are assignable to another type.

extract.ts
  

type Event = "click" | "hover" | "scroll" | string;

type MouseEvent = Extract&lt;Event, "click" | "hover"&gt;;
const event: MouseEvent = "click";
console.log(event); // Output: click

Extract&lt;Event, "click" | "hover"&gt; retains only
"click" and "hover" from the Event union
("click" | "hover" | "scroll" | string), as they match the
specified types, resulting in "click" | "hover". The
event variable can be either, but "scroll" or a random
string like "focus" would fail (despite string in the
original union). 

    

The output, "click," confirms a valid extracted value. This
utility is useful for isolating specific subsets of a union, like mouse-related
events from a broader event type.

## NonNullable

The NonNullable&lt;T&gt; utility removes null and
undefined from a type.

nonnullable.ts
  

type Value = string | null | undefined;

const safeValue: NonNullable&lt;Value&gt; = "Hello";
console.log(safeValue); // Output: Hello

NonNullable&lt;Value&gt; strips null and
undefined from the Value union (string | null |
undefined), leaving string. The safeValue
variable must be a string—assigning null or undefined
fails type checking. 

The output, "Hello," reflects this non-nullable constraint. This utility is
essential for ensuring values are defined, such as after null checks or when
working with APIs where nullability is resolved, enhancing type safety in
critical operations.

## Best Practices

**Use Utilities for Common Patterns:** Leverage utility types
like Partial or Pick for frequent transformations to
avoid redundant custom types.
**Combine Utilities:** Chain utilities (e.g.,
Pick&lt;Partial&lt;T&gt;, K&gt;) for complex transformations,
maximizing their flexibility.
**Match Use Case to Utility:** Select the right utility (e.g.,
Omit vs. Pick) based on whether inclusion or exclusion
is clearer for your intent.
**Document Usage:** Comment on why a utility is applied (e.g.,
"Making fields optional for partial updates") to clarify intent for
maintainers.
**Test Type Constraints:** Verify objects or values against
utility-typed variables to ensure they enforce the expected structure or
constraints.
**Avoid Over-Reliance:** Use utilities judiciously, falling
back to explicit types when their simplicity outweighs utility complexity in
niche cases.

## Source

[TypeScript Utility Types Documentation](https://www.typescriptlang.org/docs/handbook/utility-types.html)

This tutorial covered TypeScript utility types with practical examples. Use these built-in tools to streamline type manipulations and enhance code safety.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all TypeScript tutorials](/all/#typescript).