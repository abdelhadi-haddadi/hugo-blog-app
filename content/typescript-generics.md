+++
title = "TypeScript Generics"
date = 2025-08-29T20:14:29.373+01:00
draft = false
description = "Learn TypeScript generics with practical examples. Understand how to create reusable, type-safe components using generics."
image = ""
imageBig = ""
categories = ["typescript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# TypeScript Generics

last modified March 5, 2025

Generics in TypeScript enable creating reusable, type-safe components. They
allow you to define functions, classes, and interfaces that work with multiple
types. This tutorial explores generics with practical examples.

Generics are placeholders for types. They allow you to write flexible and
reusable code without sacrificing type safety. Generics are defined using angle
brackets ().

## Basic Generic Function

This example shows a simple generic function that returns the input value.

basic_generic.ts
  

function identity&lt;T&gt;(arg: T): T {
    return arg;
}

console.log(identity&lt;number&gt;(42));  // Output: 42
console.log(identity&lt;string&gt;("Hello"));  // Output: Hello

In this example, the identity function uses a generic type
T, allowing it to accept and return any type specified at the call
site. By explicitly providing number or string in
angle brackets, we define what T represents for each call.
TypeScript ensures type safety by matching the argument and return types, and
the output reflects the input values unchanged. This demonstrates how generics
enable type flexibility without losing compile-time checks.

## Generic Arrays

Generics can be used with arrays to ensure type safety. This example
demonstrates a generic function that processes arrays.

generic_array.ts
  

function reverseArray&lt;T&gt;(arr: T[]): T[] {
    return arr.reverse();
}

console.log(reverseArray&lt;number&gt;([1, 2, 3]));  // Output: [3, 2, 1]
console.log(reverseArray&lt;string&gt;(["a", "b", "c"]));  // Output: ["c", "b", "a"]

The reverseArray function uses a generic type T to
specify the type of elements in the input array T[] and returns an
array of the same type. When called with a number array or a string array,
TypeScript enforces that all elements match the specified type T.
The reverse() method is applied, and the output shows the reversed
arrays. This illustrates how generics maintain type consistency across array
operations.

## Generic Interfaces

Interfaces can also use generics. This example defines a generic interface for
key-value pairs.

generic_interface.ts
  

interface KeyValuePair&lt;K, V&gt; {
    key: K;
    value: V;
}

const pair: KeyValuePair&lt;string, number&gt; = { key: "age", value: 30 };
console.log(pair);  // Output: { key: "age", value: 30 }

The KeyValuePair interface uses two generic types, K
for the key and V for the value, making it reusable for any
key-value combination. In this instance, string is assigned to
K and number to V, creating a specific
type for the pair object. TypeScript ensures the object adheres to
this structure, and the output displays the key-value pair as defined. This
shows how generic interfaces provide reusable type definitions.

## Generic Classes

Classes can use generics to create reusable components. This example shows a
generic stack class.

generic_class.ts
  

class Stack&lt;T&gt; {
    private items: T[] = [];

    push(item: T): void {
        this.items.push(item);
    }

    pop(): T | undefined {
        return this.items.pop();
    }
}

const numberStack = new Stack&lt;number&gt;();
numberStack.push(1);
numberStack.push(2);
console.log(numberStack.pop());  // Output: 2

The Stack class uses a generic type T to define the
type of items it can hold. The items array is typed as
T[], and methods like push and pop
operate on this type. When instantiated as Stack, it only
accepts numbers, ensuring type safety. The example pushes two numbers and pops
the last one, with the output showing 2. This highlights how
generic classes enable type-specific reusable data structures.

## Generic Constraints

Constraints limit the types that can be used with generics. This example ensures
the generic type has a length property.

generic_constraints.ts
  

interface Lengthwise {
    length: number;
}

function logLength&lt;T extends Lengthwise&gt;(arg: T): void {
    console.log(arg.length);
}

logLength("Hello");  // Output: 5
logLength([1, 2, 3]);  // Output: 3

The logLength function uses a generic type T
constrained by extends Lengthwise, meaning T must have
a length property of type number. This allows the
function to work with strings and arrays (both of which have
length) but not with incompatible types like numbers. The output
shows the length of a string (5) and an array (3), demonstrating how constraints
ensure type compatibility while retaining flexibility.

## Generic Utility Types

TypeScript provides built-in utility types like Partial and
Readonly. This example demonstrates their usage.

utility_types.ts
  

interface User {
    name: string;
    age: number;
}

const partialUser: Partial&lt;User&gt; = { name: "John" };
const readonlyUser: Readonly&lt;User&gt; = { name: "Jane", age: 25 };

console.log(partialUser);  // Output: { name: "John" }
console.log(readonlyUser);  // Output: { name: "Jane", age: 25 }

This example uses TypeScript's built-in generic utility types.
Partial makes all properties of User optional,
so partialUser can omit age.
Readonly makes all properties read-only, preventing
modification after initialization of readonlyUser. TypeScript
enforces these constraints at compile time, and the output shows the resulting
objects. This showcases how utility types simplify common type transformations.

## Generic Functions with Multiple Types

Generics can handle multiple types. This example shows a function that combines
two values of different types.

multiple_types.ts
  

function merge&lt;T, U&gt;(obj1: T, obj2: U): T &amp; U {
    return { ...obj1, ...obj2 };
}

const result = merge({ name: "Alice" }, { age: 30 });
console.log(result);  // Output: { name: "Alice", age: 30 }

The merge function uses two generic types, T and
U, to represent the types of two input objects. It returns an
intersection type T &amp; U, combining their properties using the
spread operator. In this case, T is inferred as { name:
string } and U as { age: number }, resulting in
a merged object. The output shows the combined properties, illustrating how
multiple generic types enable flexible object composition.

## Generic Default Types

Generics can have default types. This example defines a generic function with a
default type.

default_types.ts
  

function createArray&lt;T = string&gt;(length: number, value: T): T[] {
    return Array(length).fill(value);
}

console.log(createArray(3, "a"));  // Output: ["a", "a", "a"]
console.log(createArray&lt;number&gt;(3, 1));  // Output: [1, 1, 1]

The createArray function uses a generic type T with a
default of string. If no type is specified, T defaults
to string, as seen in the first call. When explicitly set to
number in the second call, it overrides the default. The function
creates an array of the specified length filled with the given value, and the
output reflects this for both cases. This shows how default types enhance
usability when a common type is expected.

## Generic Type Aliases

Type aliases can be generic, providing a way to define reusable type patterns.
This example shows a generic type alias for a result type.

generic_type_alias.ts
  

type Result&lt;T&gt; = { success: true; value: T } | { success: false; error: string };

const successResult: Result&lt;number&gt; = { success: true, value: 42 };
const errorResult: Result&lt;string&gt; = { success: false, error: "Not found" };

console.log(successResult);  // Output: { success: true, value: 42 }
console.log(errorResult);   // Output: { success: false, error: "Not found" }

The Result type alias uses a generic type T to define
a union of success and error cases. For successResult,
T is number, representing a successful result with a
value. For errorResult, T is string, but
the error case uses a fixed error property. TypeScript ensures each
object matches one of the union's shapes, and the output reflects the two
possible states. This demonstrates how generic type aliases create flexible,
reusable type definitions.

## Generic Conditional Types

Conditional types allow generics to adapt based on conditions. This example
extracts the return type of a function.

conditional_types.ts
  

type ReturnType&lt;T&gt; = T extends (...args: any[]) =&gt; infer R ? R : never;

function greet(): string {
    return "Hello";
}

type GreetReturn = ReturnType&lt;typeof greet&gt;;
const message: GreetReturn = "Hello";
console.log(message);  // Output: Hello

The ReturnType generic type uses a conditional type with
infer R to extract the return type of a function. If T
is a function, it infers R as the return type; otherwise, it's
never. Applied to the greet function (via typeof
greet), it resolves to string. The GreetReturn
type is thus string, allowing message to be assigned
"Hello". The output confirms this, showing how conditional types enable dynamic
type inference.

## Generic Factory Functions

Factory functions can use generics to create instances of varying types. This
example creates objects based on a constructor.

factory_functions.ts
  

class Animal {
    constructor(public name: string) {}
}

class Car {
    constructor(public model: string) {}
}

function createInstance&lt;T&gt;(ctor: new (arg: string) =&gt; T, arg: string): T {
    return new ctor(arg);
}

const dog = createInstance(Animal, "Dog");
const sedan = createInstance(Car, "Sedan");

console.log(dog.name);    // Output: Dog
console.log(sedan.model); // Output: Sedan

The createInstance function uses a generic type T and
takes a constructor function (new (arg: string) =&gt; T) and an
argument. It creates an instance of T using the provided
constructor. Here, Animal and Car classes are
instantiated with specific arguments, and TypeScript ensures the returned
instances match the expected types. The output shows the properties of the
created objects, demonstrating how generic factory functions support type-safe
object creation.

## Best Practices

**Use Generics Judiciously:** Employ generics only when they
enhance type safety or code reusability, avoiding unnecessary complexity in
simple scenarios where specific types suffice.
**Document Generic Types Clearly:** Include detailed comments
or type annotations to explain the purpose and constraints of generic
parameters, especially for complex or nested generic types.
**Apply Constraints Effectively:** Use type constraints (e.g.,
extends) to limit generic types to those that meet specific
requirements, ensuring compatibility and reducing runtime errors.
**Test with Diverse Types:** Thoroughly test generic functions,
classes, and interfaces with a variety of types (e.g., primitives, objects,
arrays) to verify flexibility and correctness.
**Prefer Specific Names for Type Parameters:** Use descriptive
names like TKey or TValue instead of generic
T when multiple type parameters are involved, improving
readability.
**Avoid Overly Broad Generics:** Refrain from using unbounded
generics (e.g.,  without constraints) when possible, as they can
weaken type safety and lead to unexpected behavior.
**Leverage Utility Types:** Utilize built-in generic utility
types like Partial, Pick, or ReturnType
to simplify common patterns and reduce boilerplate code.
**Combine Generics with Interfaces:** Pair generics with
interfaces to define reusable contracts, ensuring consistent structure across
different implementations while maintaining type safety.

## Source

[TypeScript Generics Documentation](https://www.typescriptlang.org/docs/handbook/generics.html)

This tutorial covered TypeScript generics with practical examples. Use generics
to write flexible, reusable, and type-safe code.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all TypeScript tutorials](/all/#typescript).