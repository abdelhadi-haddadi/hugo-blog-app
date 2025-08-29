+++
title = "TypeScript Enums"
date = 2025-08-29T20:14:28.201+01:00
draft = false
description = "TypeScript tutorial on enums, covering their creation, manipulation, and common usage with practical examples."
image = ""
imageBig = ""
categories = ["typescript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# TypeScript Enums

last modified February 24, 2025

TypeScript enums are a way to define a set of named constants. They are useful
for improving code readability and maintainability. This article covers the
creation, manipulation, and common usage of TypeScript enums with practical
examples.

TypeScript enums are a way to define a set of named constants. They are defined
using the enum keyword.

## Defining Enums

This example demonstrates how to define enums in TypeScript.

defining_enums.ts
  

enum Colors {
    Red,
    Green,
    Blue
}

console.log(Colors.Red);  // Output: 0
console.log(Colors.Green); // Output: 1
console.log(Colors.Blue);  // Output: 2

Enums can be defined using the enum keyword followed by a set of
named constants. The first constant is assigned a value of 0, and each subsequent
constant is incremented by 1.

## Enum Members

Enum members can be explicitly assigned values.

enum_members.ts
  

enum Colors {
    Red = 1,
    Green,
    Blue
}

console.log(Colors.Red);  // Output: 1
console.log(Colors.Green); // Output: 2
console.log(Colors.Blue);  // Output: 3

In this example, the Red member is explicitly assigned a value of
1. The Green and Blue members are assigned values
incremented from the previous member.

## Enum Types

Enum members can be used as types.

enum_types.ts
  

enum Colors {
    Red,
    Green,
    Blue
}

let color: Colors = Colors.Red;
console.log(color);  // Output: 0

Enum members can be used as types for variables. In this example, the color
variable is assigned a value of Colors.Red.

## Enum Constants

Enum constants can be accessed using their name.

enum_constants.ts
  

enum Colors {
    Red,
    Green,
    Blue
}

console.log(Colors[0]);  // Output: "Red"
console.log(Colors[1]); // Output: "Green"
console.log(Colors[2]); // Output: "Blue"

Enum constants can be accessed using their index.

## Computed Enum Members

Enum members can be computed.

computed_enum_members.ts
  

enum Colors {
    Red = 1,
    Green = 2,
    Blue = 4
}

console.log(Colors.Red | Colors.Green);  // Output: 3

In this example, the Blue member is explicitly assigned a value of
4. The Red and Green members are assigned values
incremented from the previous member. The bitwise OR operator is used to combine
enum members.

## Best Practices for Using Enums

- **Use Enums for Named Constants:** Enums are useful for improving code readability and maintainability when dealing with named constants.

- **Explicitly Assign Enum Members:** Explicitly assign enum members to ensure predictable values.

- **Use Enum Members as Types:** Enum members can be used as types for variables.

- **Use Enum Constants:** Enum constants can be accessed using their name.

- **Handle Edge Cases:** Always check for edge cases like invalid enum members.

## Source

[TypeScript Enums Documentation](https://www.typescriptlang.org/docs/handbook/enums.html)

In this article, we have explored TypeScript enums and demonstrated their usage
through practical examples.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all TypeScript tutorials](/all/#typescript).