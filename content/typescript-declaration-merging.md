+++
title = "TypeScript Declaration Merging"
date = 2025-08-29T20:14:27.100+01:00
draft = false
description = "Learn TypeScript declaration merging with practical examples. Understand how to combine declarations for interfaces, namespaces, and more."
image = ""
imageBig = ""
categories = ["typescript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# TypeScript Declaration Merging

last modified March 3, 2025

Declaration merging in TypeScript allows you to combine multiple declarations of
the same name into a single entity. This feature is particularly useful for
extending existing types, such as interfaces or namespaces, without altering
their original definitions. This tutorial explores declaration merging with
practical examples to demonstrate its power and flexibility.

TypeScript supports declaration merging for specific constructs like interfaces,
namespaces, and classes with certain limitations. When two or more declarations
share the same name in the same scope, TypeScript merges them into a unified
type, combining their properties or members. This is a key mechanism for working
with third-party libraries or modular codebases where type definitions need to
evolve or be augmented.

The process is automatic and rule-based: for interfaces, properties are
combined; for namespaces, members are aggregated; and for classes, merging is
more restricted but possible with ambient declarations. This capability enhances
TypeScript's extensibility, allowing developers to adapt types to specific needs
while maintaining type safety.

## Merging Interfaces

Interfaces with the same name are merged into a single interface, combining their properties.

interface_merging.ts
  

interface User {
    name: string;
}

interface User {
    age: number;
}

const user: User = { name: "Alice", age: 25 };
console.log(user.name); // Output: Alice
console.log(user.age);  // Output: 25

In this example, two interface User declarations are defined with
the same name. TypeScript merges them into a single interface equivalent to
{ name: string; age: number }. The properties name and
age are combined, and the resulting User type requires
both when creating an object like user. Omitting either property
(e.g., { name: "Alice" }) would trigger a compile-time error.

The output, "Alice" and 25, confirms that both properties are accessible. This
merging is useful for incrementally building complex types or extending library
interfaces without modifying their source, such as adding optional fields to a
base interface. It showcases how TypeScript handles interface declarations
flexibly while enforcing type safety across merged definitions.

## Adding Optional Properties

Merged interfaces can introduce optional properties to an existing type.

optional_properties.ts
  

interface Product {
    id: number;
    name: string;
}

interface Product {
    price?: number;
}

const product: Product = { id: 1, name: "Laptop" };
console.log(product); // Output: { id: 1, name: "Laptop" }

Here, the Product interface is declared twice: first with required
id and name, then with an optional price
marked by ?. TypeScript merges these into a single
Product type: { id: number; name: string; price?: number
}. The product object satisfies this type without
price, as it's optional, while including price: 100
would also be valid.

The output, { id: 1, name: "Laptop" }, reflects this flexibility.
This pattern is ideal for extending types in a non-breaking way—adding optional
properties doesn't affect existing code relying on the original declaration.
It's commonly used in scenarios like enhancing API response types with
additional, non-mandatory fields.

## Merging with Methods

Interfaces can merge methods alongside properties, creating a unified contract.

method_merging.ts
  

interface Logger {
    log(message: string): void;
}

interface Logger {
    clear(): void;
}

const logger: Logger = {
    log: (message) =&gt; console.log(message),
    clear: () =&gt; console.log("Cleared")
};

logger.log("Hello"); // Output: Hello
logger.clear();      // Output: Cleared

The Logger interface is declared twice: first with a
log method, then with a clear method. TypeScript
merges them into { log(message: string): void; clear(): void }. The
logger object implements this combined interface, providing both
methods. Calling log("Hello") and clear() works as
expected, with outputs "Hello" and "Cleared."

This merging allows you to extend functionality incrementally—for instance,
adding utility methods to a base interface in separate files or modules. It
ensures that implementations must satisfy all merged members, maintaining type
safety while supporting modular design. This is particularly useful in
frameworks where core and optional features are defined separately.

## Merging Namespaces

Namespaces with the same name merge their members, combining variables, functions, or nested types.

namespace_merging.ts
  

namespace Utils {
    export const version = "1.0";
}

namespace Utils {
    export function greet(name: string) {
        return `Hello, ${name}`;
    }
}

console.log(Utils.version);      // Output: 1.0
console.log(Utils.greet("Bob")); // Output: Hello, Bob

Two namespace Utils declarations merge into a single namespace
containing version (a string) and greet (a function).
The export keyword makes these members accessible outside the
namespace. TypeScript combines them automatically, so Utils becomes
{ version: string; greet(name: string): string }. Accessing
Utils.version and calling Utils.greet("Bob") yields
"1.0" and "Hello, Bob," respectively.

This is valuable for organizing code across files—e.g., one file defines
constants, another adds functions, and they merge under the same namespace. It
mimics module augmentation in JavaScript, providing a way to extend global or
library namespaces without conflicts, as long as member names don't overlap with
incompatible types.

## Merging Interfaces with Namespaces

An interface and a namespace with the same name can merge, adding static members to the interface's type.

interface_namespace_merging.ts
  

interface Counter {
    count: number;
}

namespace Counter {
    export function create(initial: number): Counter {
        return { count: initial };
    }
}

const c = Counter.create(5);
console.log(c.count); // Output: 5

The Counter interface defines an instance type { count:
number }, while the Counter namespace adds a static
create function. TypeScript merges them, associating the
namespace's members with the interface's name as static utilities. The
create function returns an object conforming to the interface, and
c.count accesses the instance property, outputting 5.

This pattern is common in libraries like Array in JavaScript, where
the type (array instances) and static methods (e.g., Array.from)
coexist. It's useful for defining factory functions or utilities tied to a type,
enhancing the interface's ecosystem without altering its instance structure.

## Merging Classes with Interfaces

Classes can merge with interfaces to extend their instance types, but not their
static side.

class_interface_merging.ts
  

class Person {
    constructor(public name: string) {}
}

interface Person {
    age: number;
}

const p: Person = new Person("Alice");
p.age = 25;
console.log(p.name); // Output: Alice
console.log(p.age);  // Output: 25

The Person class defines a constructor with a name
property, and the Person interface adds an age
property. TypeScript merges the interface into the class's instance type, so
Person instances have { name: string; age: number }.
The object p can set age post-construction, and both
properties are accessible, outputting "Alice" and 25.

This merging only affects the instance side—static properties or methods in the
interface wouldn't merge into the class's static side. It's a way to extend
class instances with additional fields, often used when retrofitting classes
with library-defined interfaces or when separating concerns (e.g., core class
vs. optional features).

## Merging with Ambient Declarations

Ambient declarations can merge with existing types to extend third-party code.

ambient_merging.ts
  

// Assume this is in a third-party library
declare namespace Settings {
    export const theme: string;
}

// Our extension in a .d.ts file or script
declare namespace Settings {
    export const fontSize: number;
}

console.log(Settings.theme);    // Output: (assumed) dark
console.log(Settings.fontSize); // Output: (assumed) 16

The Settings namespace is initially declared ambiently (e.g., in a
library) with theme. A second ambient declaration merges in
fontSize, resulting in { theme: string; fontSize: number
}. Since this is ambient (no runtime implementation here), outputs are
assumed (e.g., "dark" and 16) based on a hypothetical implementation. TypeScript
ensures type safety across these merged declarations.

This is a cornerstone of TypeScript's extensibility for external code.
Developers can augment global objects (e.g., Window) or library
namespaces in declaration files without touching the original source, making it
ideal for adapting untyped or partially typed JavaScript libraries.

## Merging with Enums

Enums can merge to add new members, extending their set of values.

enum_merging.ts
  

enum Color {
    Red = 1,
    Green = 2
}

enum Color {
    Blue = 3
}

console.log(Color.Red);  // Output: 1
console.log(Color.Blue); // Output: 3

Two enum Color declarations merge into a single enum with members
Red, Green, and Blue. TypeScript combines
their values (1, 2, 3), treating them as one enum. Accessing
Color.Red and Color.Blue yields 1 and 3, respectively.
This is less common but useful for splitting enum definitions across files or
gradually expanding a set of constants.

Unlike interfaces, enum merging requires consistent numeric or string values and
can't redefine existing members' values (e.g., Red = 4 in the
second declaration would conflict). It's a niche feature, often used in large
projects or when extending predefined enum-like structures in libraries.

## Merging with Overloads

Function declarations can merge to create overload signatures for a single implementation.

overload_merging.ts
  

function format(value: string): string;
function format(value: number): string;
function format(value: string | number): string {
    return typeof value === "string" ? value.toUpperCase() : value.toString();
}

console.log(format("hello")); // Output: HELLO
console.log(format(42));      // Output: 42

The format function has two overload signatures merged with its
implementation. The first declaration allows string inputs, the
second number, and the implementation accepts string |
number, handling both cases. TypeScript merges these signatures, enabling
type-specific calls: format("hello") returns "HELLO" (uppercase
string), and format(42) returns "42" (stringified number).

This merging provides a cleaner API than a single union-type signature, as it
narrows the return type expectation for each call (though here, both return
string). It's useful for functions with distinct input behaviors,
like formatting utilities or library APIs, enhancing type checking and IDE
support for callers.

## Best Practices

**Use Merging for Extensibility:** Leverage declaration merging
to extend existing types or libraries without modifying their source code.
**Ensure Compatibility:** Verify merged declarations (e.g.,
property types, method signatures) align to avoid conflicts or unexpected
behavior.
**Prefer Interfaces for Flexibility:** Use interface merging
over other types when possible, as it's the most flexible and widely supported
merging mechanism.
**Document Merges:** Add comments to clarify the intent and
source of merged declarations, especially in multi-file or team projects.
**Test Merged Types:** Validate that merged types behave as
expected with sample instances or function calls, catching errors early.
**Avoid Over-Merging:** Limit merging to necessary extensions,
as excessive merging can obscure type definitions and complicate debugging.
**Use Ambient Declarations Sparingly:** Reserve ambient merging
for third-party integrations, preferring explicit types within your
codebase.

## Source

[TypeScript Declaration Merging Documentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html)

This tutorial covered TypeScript declaration merging with practical examples.
Use these techniques to extend and combine type definitions effectively while
maintaining type safety.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all TypeScript tutorials](/all/#typescript).