+++
title = "TypeScript Type Guards"
date = 2025-08-29T20:14:34.956+01:00
draft = false
description = "Comprehensive TypeScript type guards tutorial covering syntax, practical examples, and advanced techniques for type narrowing."
image = ""
imageBig = ""
categories = ["typescript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# TypeScript Type Guards

last modified March 3, 2025

Type guards in TypeScript are techniques to narrow down the type of a variable
within a specific block of code. They ensure type safety by allowing conditional
logic based on runtime checks. This tutorial explores type guards with practical
examples.

Type guards are expressions that perform runtime checks to determine the type
of a variable. They help TypeScript infer more specific types within a block.
Common type guards include typeof, instanceof, and
custom type predicates.

## Using typeof

The typeof operator checks the type of primitive values like
strings, numbers, and booleans.

typeof_guard.ts
  

function printValue(value: string | number): void {
    if (typeof value === "string") {
        console.log(`String: ${value}`);
    } else {
        console.log(`Number: ${value}`);
    }
}

printValue("Hello");  // Output: String: Hello
printValue(42);       // Output: Number: 42

## Using instanceof

The instanceof operator checks if an object is an instance of a
specific class.

instanceof_guard.ts
  

class Dog {
    bark(): void {
        console.log("Woof!");
    }
}

class Cat {
    meow(): void {
        console.log("Meow!");
    }
}

function handleAnimal(animal: Dog | Cat): void {
    if (animal instanceof Dog) {
        animal.bark();
    } else {
        animal.meow();
    }
}

handleAnimal(new Dog());  // Output: Woof!
handleAnimal(new Cat());  // Output: Meow!

## Custom Type Predicates

Custom type predicates allow defining your own type guard functions. They return
a boolean and use the is keyword.

custom_predicate.ts
  

interface Bird {
    fly(): void;
}

interface Fish {
    swim(): void;
}

function isBird(animal: Bird | Fish): animal is Bird {
    return (animal as Bird).fly !== undefined;
}

function handleAnimal(animal: Bird | Fish): void {
    if (isBird(animal)) {
        animal.fly();
    } else {
        animal.swim();
    }
}

handleAnimal({ fly: () =&gt; console.log("Flying!") });  // Output: Flying!
handleAnimal({ swim: () =&gt; console.log("Swimming!") });  // Output: Swimming!

## Using in Operator

The in operator checks if a property exists in an object.

in_operator.ts
  

interface Car {
    drive(): void;
}

interface Boat {
    sail(): void;
}

function handleVehicle(vehicle: Car | Boat): void {
    if ("drive" in vehicle) {
        vehicle.drive();
    } else {
        vehicle.sail();
    }
}

handleVehicle({ drive: () =&gt; console.log("Driving!") });  // Output: Driving!
handleVehicle({ sail: () =&gt; console.log("Sailing!") });  // Output: Sailing!

## Union Types with Literals

Type guards can narrow down union types with literal values.

literal_guard.ts
  

type Status = "success" | "error";

function handleStatus(status: Status): void {
    if (status === "success") {
        console.log("Operation succeeded!");
    } else {
        console.log("Operation failed!");
    }
}

handleStatus("success");  // Output: Operation succeeded!
handleStatus("error");    // Output: Operation failed!

## Null Checks

Type guards can handle nullable types by checking for null or
undefined.

null_check.ts
  

function printLength(value: string | null): void {
    if (value === null) {
        console.log("Value is null");
    } else {
        console.log(`Length: ${value.length}`);
    }
}

printLength(null);        // Output: Value is null
printLength("Hello");     // Output: Length: 5

## Type Guards with Arrays

Type guards can narrow down types within arrays.

array_guard.ts
  

function processArray(arr: (string | number)[]): void {
    arr.forEach(item =&gt; {
        if (typeof item === "string") {
            console.log(`String: ${item}`);
        } else {
            console.log(`Number: ${item}`);
        }
    });
}

processArray(["apple", 42, "banana", 100]);  // Output: String: apple, Number: 42, String: banana, Number: 100

## Type Guards with Objects

Type guards can distinguish between object types based on their properties.

object_guard.ts
  

interface Square {
    size: number;
}

interface Circle {
    radius: number;
}

function calculateArea(shape: Square | Circle): number {
    if ("size" in shape) {
        return shape.size * shape.size;
    } else {
        return Math.PI * shape.radius * shape.radius;
    }
}

console.log(calculateArea({ size: 5 }));          // Output: 25
console.log(calculateArea({ radius: 3 }));        // Output: 28.274333882308138

## Type Guards with Classes

Type guards can differentiate between class instances.

class_guard.ts
  

class Rectangle {
    constructor(public width: number, public height: number) {}
}

class Triangle {
    constructor(public base: number, public height: number) {}
}

function calculateArea(shape: Rectangle | Triangle): number {
    if (shape instanceof Rectangle) {
        return shape.width * shape.height;
    } else {
        return (shape.base * shape.height) / 2;
    }
}

console.log(calculateArea(new Rectangle(4, 5)));  // Output: 20
console.log(calculateArea(new Triangle(3, 6)));   // Output: 9

## Combining Type Guards

Multiple type guards can be combined for complex type narrowing.

combined_guards.ts
  

function processValue(value: string | number | boolean): void {
    if (typeof value === "string") {
        console.log(`String: ${value}`);
    } else if (typeof value === "number") {
        console.log(`Number: ${value}`);
    } else {
        console.log(`Boolean: ${value}`);
    }
}

processValue("Hello");  // Output: String: Hello
processValue(42);       // Output: Number: 42
processValue(true);     // Output: Boolean: true

## Best Practices

- **Use Type Guards Early:** Narrow types as soon as possible.

- **Combine Guards:** Use multiple guards for complex logic.

- **Leverage Custom Predicates:** Create reusable type guards.

- **Handle Edge Cases:** Account for null and undefined.

- **Keep Guards Simple:** Avoid overly complex type guards.

## Source

[Creating Types from Types](https://www.typescriptlang.org/docs/handbook/2/types-from-types.html)

This tutorial covered TypeScript type guards with practical examples. Use these
techniques to write safer and more maintainable code.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all TypeScript tutorials](/all/#typescript).