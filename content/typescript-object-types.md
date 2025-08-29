+++
title = "TypeScript Object Types"
date = 2025-08-29T20:14:32.711+01:00
draft = false
description = "Comprehensive TypeScript tutorial on converting object types with practical examples and best practices."
image = ""
imageBig = ""
categories = ["typescript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# TypeScript Object Types

last modified March 5, 2025

TypeScript enhances JavaScript by adding static types to objects. Object types 
define the structure of objects, ensuring type safety. This tutorial explores 
object type conversion with practical examples.

## Basic Object Type

TypeScript allows defining object types using interfaces or type aliases. This 
example shows a basic object type.

basic_object.ts
  

type User = {
    name: string;
    age: number;
};

const user: User = { name: "Alice", age: 25 };
console.log(user);  // Output: { name: 'Alice', age: 25 }

In this example, the User type is defined using a type alias with
two properties: name of type string and
age of type number. The variable user is
then assigned an object that conforms to this type. TypeScript checks at compile
time that the object matches the defined structure, ensuring type safety. The
console.log statement outputs the object as expected.

## Optional Properties

Properties can be marked as optional using the ? symbol. This 
allows flexibility in object structure.

optional_properties.ts
  

type Product = {
    id: number;
    name: string;
    price?: number;
};

const product: Product = { id: 1, name: "Laptop" };
console.log(product);  // Output: { id: 1, name: 'Laptop' }

Here, the Product type includes an optional price
property, indicated by the ? symbol. This means that an object of
type Product must have id and name, but
price can be omitted. In the example, the product
object is created without a price, and TypeScript allows this
flexibility while still enforcing the required properties. The output shows the
object without the optional property.

## Readonly Properties

Properties can be marked as readonly to prevent modification after 
initialization.

readonly_properties.ts
  

type Config = {
    readonly apiKey: string;
    readonly endpoint: string;
};

const config: Config = { apiKey: "12345", endpoint: "/api" };
// config.apiKey = "67890";  // Error: Cannot assign to 'apiKey'

In this example, the Config type uses the readonly
modifier for both apiKey and endpoint. Once the
config object is initialized, these properties cannot be changed.
The commented-out line demonstrates that attempting to reassign
apiKey results in a TypeScript error, enforcing immutability. This
is useful for ensuring that critical configuration values remain constant
throughout the program.

## Nested Objects

Objects can contain nested objects. TypeScript ensures type safety for nested 
structures.

nested_objects.ts
  

type Address = {
    city: string;
    zipCode: string;
};

type Person = {
    name: string;
    address: Address;
};

const person: Person = {
    name: "Bob",
    address: { city: "New York", zipCode: "10001" }
};
console.log(person);  // Output: { name: 'Bob', address: { city: 'New York', zipCode: '10001' } }

This example demonstrates nested object types. The Address type
defines a structure with city and zipCode, which is
then used as a property type within the Person type. The
person object includes a nested address object that
conforms to the Address type. TypeScript ensures that the nested
structure is correctly typed, and the output reflects the full object hierarchy.

## Intersection Types

Intersection types combine multiple types into one. This is useful for extending 
object types.

intersection_types.ts
  

type Name = { name: string };
type Age = { age: number };

type Person = Name &amp; Age;

const person: Person = { name: "Alice", age: 25 };
console.log(person);  // Output: { name: 'Alice', age: 25 }

Intersection types are created using the &amp; operator, combining the
Name and Age types into a single Person
type. This means that a Person must have all properties from both
types—name and age. The person object
satisfies this requirement, and TypeScript enforces that both properties are
present. The output shows the combined object as expected.

## Union Types

Union types allow an object to be one of several types. This provides 
flexibility in object structure.

union_types.ts
  

type Car = { type: "car"; wheels: number };
type Bike = { type: "bike"; pedals: number };

type Vehicle = Car | Bike;

const vehicle: Vehicle = { type: "car", wheels: 4 };
console.log(vehicle);  // Output: { type: 'car', wheels: 4 }

Union types, denoted by the | operator, allow the
Vehicle type to be either a Car or a
Bike. Each type has a distinguishing type property and
its own unique properties (wheels for Car,
pedals for Bike). In this case, the
vehicle object conforms to the Car type, and
TypeScript ensures it matches one of the allowed types. The output reflects the
chosen type.

## Type Assertion

Type assertions allow overriding TypeScript's inferred type. Use this with 
caution to ensure type safety.

type_assertion.ts
  

const data: any = { name: "Alice", age: 25 };
const user = data as { name: string; age: number };
console.log(user);  // Output: { name: 'Alice', age: 25 }

Type assertions are used here to cast the any-typed
data variable into a specific object type with name
and age properties. The as keyword tells TypeScript to
treat data as the specified type, bypassing its usual type
inference. This can be risky if the actual structure doesn't match, but in this
case, it works because data has the expected properties. The output
confirms the object's structure.

## Index Signatures

Index signatures allow objects to have dynamic property names. This is useful 
for dictionaries or maps.

index_signatures.ts
  

type Dictionary = {
    [key: string]: number;
};

const scores: Dictionary = { math: 90, science: 85 };
console.log(scores);  // Output: { math: 90, science: 85 }

The Dictionary type uses an index signature, [key: string]: number, which allows any string key to map to a number value. This is ideal for objects where property names are not known in advance, such as a key-value store. The scores object assigns numbers to the keys math and science, and TypeScript ensures all values are numbers. The output shows the resulting dictionary-like object.

## Mapped Types

Mapped types transform object properties. This is useful for creating new types 
from existing ones.

mapped_types.ts
  

type ReadonlyUser = {
    readonly [K in keyof User]: User[K];
};

const readonlyUser: ReadonlyUser = { name: "Alice", age: 25 };
// readonlyUser.name = "Bob";  // Error: Cannot assign to 'name'

Mapped types allow the creation of a new type, ReadonlyUser, by transforming the properties of the existing User type (defined earlier). The keyof User operator gets all keys from User (name and age), and the readonly modifier is applied to each. The resulting readonlyUser object cannot have its properties modified, as shown by the commented-out error. This is a powerful way to enforce immutability dynamically.

## Best Practices

- **Use Interfaces:** Prefer interfaces for object types

- **Type Safety:** Validate object structures at compile time

- **Avoid Any:** Minimize use of any for better type safety

- **Readonly:** Use readonly for immutable properties

- **Documentation:** Add comments to describe complex types

## Source

[TypeScript Object Types Documentation](https://www.typescriptlang.org/docs/handbook/2/objects.html)

This tutorial covered TypeScript object types with practical examples. Use 
these patterns to write safer, more maintainable code.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all TypeScript tutorials](/all/#typescript).