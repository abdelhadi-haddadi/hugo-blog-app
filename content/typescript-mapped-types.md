+++
title = "TypeScript Mapped Types"
date = 2025-08-29T20:14:30.500+01:00
draft = false
description = "Learn TypeScript mapped types with practical examples. Understand how to transform existing types into new ones for flexible, reusable code."
image = ""
imageBig = ""
categories = ["typescript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# TypeScript Mapped Types

last modified March 5, 2025

Mapped types in TypeScript allow you to create new types by transforming the
properties of an existing type. They are powerful tools for type manipulation,
enabling flexible and reusable type definitions. This tutorial explores mapped
types with practical examples.

Mapped types use the { [P in K]: T } syntax to iterate over a set
of keys (K) and define new property types (T) based on
an existing type. Combined with features like keyof, they enable
dynamic type transformations while maintaining type safety.

## Basic Mapped Type

A basic mapped type transforms all properties of an existing type into a new
type with a uniform modification.

basic_mapped_type.ts
  

type User = {
    name: string;
    age: number;
};

type ReadonlyUser = {
    readonly [K in keyof User]: User[K];
};

const user: ReadonlyUser = { name: "Alice", age: 25 };
// user.name = "Bob"; // Error: Cannot assign to 'name' because it is read-only
console.log(user.name); // Output: Alice

In this example, ReadonlyUser is a mapped type that iterates over
the keys of User (name and age) using
keyof User and applies the readonly modifier to each
property, preserving their original types (User[K]). 

The resulting type ensures user cannot be modified after
initialization—attempting user.name = "Bob" triggers a compile-time
error. The output, "Alice," confirms the property's value. This demonstrates how
mapped types can systematically transform properties, here enforcing
immutability, which is useful for protecting data integrity.

## Optional Properties

Mapped types can make all properties of an existing type optional.

optional_properties.ts
  

type Person = {
    name: string;
    age: number;
    city: string;
};

type OptionalPerson = {
    [P in keyof Person]?: Person[P];
};

const person: OptionalPerson = { name: "Bob" };
console.log(person); // Output: { name: "Bob" }

The OptionalPerson mapped type uses ? to make all
properties of Person optional. It iterates over keyof
Person (name, age, city) and
applies the optional modifier while retaining the original types
(Person[P]). This allows person to omit
age and city without errors, unlike the required
structure of Person. 

    

The output, { name: "Bob" }, shows this flexibility. This
transformation is ideal for scenarios like partial updates or forms where not
all fields are mandatory, showcasing mapped types' ability to adapt strict
types.

## Type Transformation

Mapped types can transform property types, such as converting all properties to a different type.

type_transformation.ts
  

type Config = {
    timeout: number;
    retries: number;
};

type StringConfig = {
    [K in keyof Config]: string;
};

const config: StringConfig = { timeout: "5000", retries: "3" };
console.log(config.timeout); // Output: 5000

Here, StringConfig transforms all properties of Config
from number to string. The mapped type iterates over
keyof Config (timeout, retries) and
redefines each property's type as string, ignoring the original
Config[K] types. The config object thus accepts string
values, and TypeScript enforces this—timeout: 5000 would fail. 

The output, "5000," reflects the transformed type. This illustrates how mapped
types can overhaul property types, useful for adapting data formats (e.g.,
string-based configurations) while maintaining structural consistency.

## Filtering Properties

Mapped types can filter properties based on conditions using conditional types.

filter_properties.ts
  

type Item = {
    id: number;
    name: string;
    price: number;
};

type NumbersOnly&lt;T&gt; = {
    [K in keyof T]: T[K] extends number ? T[K] : never;
};

const item: NumbersOnly&lt;Item&gt; = { id: 1, name: never, price: 100 };
// TypeScript errors if `name` is not `never`: Type 'string' 
// is not assignable to type 'never'
console.log(item.price); // Output: 100

The NumbersOnly mapped type filters Item properties,
keeping only those with number types. It uses a conditional type
(T[K] extends number ? T[K] : never) within the mapping: for each
key in keyof Item, if the property type is number
(e.g., id, price), it retains it; otherwise (e.g.,
name: string), it becomes never. 

The item object must assign never to
name, effectively excluding it in practice, while id
and price remain usable. The output, 100, confirms
price's inclusion. This shows how mapped types can selectively
refine types, though never properties are typically omitted in
real-world usage for cleaner objects.

## Mapped Type with Union

Mapped types can operate over union types to generate new types for each member.

union_mapped_type.ts
  

type Keys = "name" | "age";

type Flags = {
    [K in Keys]: boolean;
};

const flags: Flags = { name: true, age: false };
console.log(flags.name); // Output: true

The Flags mapped type iterates over the union Keys
("name" | "age"), creating a type with each key mapped to
boolean. Unlike keyof, which works with object types,
here the keys are explicitly defined as a union, producing { name:
boolean, age: boolean }. 

The flags object adheres to this structure, allowing boolean values
for each key. The output, true, reflects flags.name.
This approach is handy for creating flag-like objects or dictionaries from
predefined key sets, demonstrating mapped types' flexibility with unions beyond
object-based keys.

## Combining Modifiers

Mapped types can combine multiple modifiers, such as readonly and ?.

combined_modifiers.ts
  

type Product = {
    name: string;
    price: number;
};

type OptionalReadonlyProduct = {
    readonly [K in keyof Product]?: Product[K];
};

const product: OptionalReadonlyProduct = { name: "Laptop" };
// product.name = "Tablet"; // Error: Cannot assign to 'name' because it is read-only
console.log(product.name); // Output: Laptop

The OptionalReadonlyProduct mapped type applies both
readonly and ? to Product's properties.
It iterates over keyof Product (name,
price), making each property optional (?) and
immutable (readonly) while keeping the original types
(Product[K]). 

The product object can omit price and cannot modify
name after initialization, as shown by the error comment. The
output, "Laptop," confirms the value. This combination is useful for defining
flexible, immutable data structures, such as optional configuration objects that
shouldn't change once set.

## Utility Types with Mapped Types

TypeScript's built-in utility types often use mapped types for common transformations.

utility_mapped_type.ts
  

type User = {
    name: string;
    age: number;
};

const partialUser: Partial&lt;User&gt; = { name: "Alice" };
const pickedUser: Pick&lt;User, "name"&gt; = { name: "Bob" };

console.log(partialUser.name); // Output: Alice
console.log(pickedUser.name);  // Output: Bob

This example uses Partial and Pick, two utility types
built on mapped types. Partial maps over keyof
User (name, age), adding ? to make
properties optional, allowing partialUser to omit age.

Pick&lt;User, "name"&gt; maps only the specified key
("name"), creating a type with just that property, so
pickedUser includes only name. The outputs, "Alice"
and "Bob," reflect these transformed types. These utilities leverage mapped
types internally, simplifying common patterns like partial objects or property
selection, saving developers from writing custom mappings.

## Conditional Mapped Types

Mapped types can incorporate conditional logic to transform properties dynamically.

conditional_mapped_type.ts
  

type Data = {
    id: number;
    name: string;
    active: boolean;
};

type StringToNumber&lt;T&gt; = {
    [K in keyof T]: T[K] extends string ? number : T[K];
};

const transformed: StringToNumber&lt;Data&gt; = { id: 1, name: 42, active: true };
console.log(transformed.name); // Output: 42

The StringToNumber mapped type conditionally transforms
Data properties: for each key in keyof Data, if the
property type extends string (name), it becomes
number; otherwise, it retains its original type (id:
number, active: boolean). The transformed
object reflects this—name must be a number (42), while
id and active stay unchanged. 

The output, 42, confirms the transformation. This advanced use of mapped types
with conditionals enables selective type changes, useful for data normalization
or API response mapping.

## Mapped Type with Template Literal Keys

Mapped types can use template literal types to generate new keys dynamically.

template_literal_mapped_type.ts
  

type Event = "click" | "hover";

type EventHandlers = {
    [K in `on${Capitalize&lt;Event&gt;}`]: () =&gt; void;
};

const handlers: EventHandlers = {
    onClick: () =&gt; console.log("Clicked"),
    onHover: () =&gt; console.log("Hovered")
};

handlers.onClick(); // Output: Clicked

The EventHandlers mapped type uses a template literal to transform
the Event union ("click" | "hover") into keys like
onClick and onHover. The Capitalize
utility capitalizes each event, and the mapping assigns a function type
(() =&gt; void) to each key. 

The handlers object adheres to this, defining methods for each
generated key. Calling onClick logs "Clicked," as shown. This
technique is powerful for creating dynamic APIs (e.g., event systems) from
simple unions, leveraging mapped types' ability to manipulate keys creatively.

## Best Practices

**Use Mapped Types for Transformations:** Apply mapped types to
systematically modify existing types, enhancing reusability without redundant
definitions.
**Leverage Keyof for Safety:** Pair keyof with
mapped types to ensure all properties are accounted for, maintaining type
consistency.
**Combine with Utilities:** Use built-in utilities like
Partial or Pick for common transformations before
writing custom mapped types.
**Keep Conditions Clear:** When using conditional types in
mappings, ensure logic is straightforward to avoid overly complex or unreadable
types.
**Document Complex Mappings:** Add comments to explain
intricate mapped types (e.g., with template literals or conditionals) for team
comprehension.
**Test Transformed Types:** Verify objects against mapped types
with varied inputs to ensure transformations meet expectations.
**Avoid Overuse:** Reserve mapped types for scenarios requiring
dynamic transformation, opting for simpler types when modifications are
minimal.

## Source

[TypeScript Mapped Types Documentation](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)

This tutorial covered TypeScript mapped types with practical examples. Use these
techniques to create flexible, reusable, and type-safe code transformations.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all TypeScript tutorials](/all/#typescript).