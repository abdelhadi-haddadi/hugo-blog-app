+++
title = "TypeScript Mixins"
date = 2025-08-29T20:14:31.584+01:00
draft = false
description = "Comprehensive TypeScript mixins tutorial covering syntax, implementation, and practical examples for reusable code patterns."
image = ""
imageBig = ""
categories = ["typescript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# TypeScript Mixins

last modified March 3, 2025

Mixins in TypeScript are reusable code patterns that allow combining multiple 
classes or objects into a single class. They enable composition over inheritance,
promoting flexible and maintainable code. This tutorial explores mixin syntax,
implementation, and practical examples.

## Basic Mixin Syntax

Mixins are implemented using functions that extend a base class. This example 
shows a simple mixin pattern.

basic_mixin.ts
  

type Constructor = new (...args: any[]) =&gt; {};

function Timestamped&lt;TBase extends Constructor&gt;(Base: TBase) {
    return class extends Base {
        timestamp = Date.now();
    };
}

class User {
    constructor(public name: string) {}
}

const TimestampedUser = Timestamped(User);
const user = new TimestampedUser("Alice");
console.log(user.timestamp);  // Output: Current timestamp

The Timestamped mixin adds a timestamp property to 
any class it extends. This promotes code reuse without inheritance.

## Multiple Mixins

Multiple mixins can be combined to create complex classes. This example 
demonstrates combining two mixins.

multiple_mixins.ts
  

function Loggable&lt;TBase extends Constructor&gt;(Base: TBase) {
    return class extends Base {
        log(message: string) {
            console.log(`[LOG]: ${message}`);
        }
    };
}

class User {
    constructor(public name: string) {}
}

const LoggableTimestampedUser = Loggable(Timestamped(User));
const user = new LoggableTimestampedUser("Bob");
user.log("User created");  // Output: [LOG]: User created
console.log(user.timestamp);  // Output: Current timestamp

The Loggable mixin adds logging functionality, while 
Timestamped adds a timestamp. Both are combined seamlessly.

## Mixin with Methods

Mixins can include methods to extend class behavior. This example adds a method 
to calculate age.

mixin_with_methods.ts
  

function Aged&lt;TBase extends Constructor&gt;(Base: TBase) {
    return class extends Base {
        getAge(birthYear: number): number {
            return new Date().getFullYear() - birthYear;
        }
    };
}

class User {
    constructor(public name: string) {}
}

const AgedUser = Aged(User);
const user = new AgedUser("Charlie");
console.log(user.getAge(1990));  // Output: Age based on birth year

The Aged mixin adds a getAge method to calculate 
the user's age based on their birth year.

## Mixin with Properties

Mixins can also add properties to classes. This example adds a role 
property.

mixin_with_properties.ts
  

function RoleBased&lt;TBase extends Constructor&gt;(Base: TBase) {
    return class extends Base {
        role: string = "User";
    };
}

class User {
    constructor(public name: string) {}
}

const RoleBasedUser = RoleBased(User);
const user = new RoleBasedUser("Diana");
console.log(user.role);  // Output: User

The RoleBased mixin adds a role property with a 
default value of "User".

## Mixin with Overrides

Mixins can override existing methods or properties. This example overrides a 
method in the base class.

mixin_with_overrides.ts
  

function OverrideGreeting&lt;TBase extends Constructor&gt;(Base: TBase) {
    return class extends Base {
        greet() {
            return `Hello, ${this.name}!`;
        }
    };
}

class User {
    constructor(public name: string) {}
    greet() {
        return `Hi, ${this.name}!`;
    }
}

const OverrideUser = OverrideGreeting(User);
const user = new OverrideUser("Eve");
console.log(user.greet());  // Output: Hello, Eve!

The OverrideGreeting mixin overrides the greet method 
in the base class, changing its behavior.

## Best Practices

- **Single Responsibility:** Keep mixins focused on one task

- **Type Safety:** Use generics to ensure type compatibility

- **Documentation:** Clearly document mixin behavior

- **Avoid Overuse:** Use mixins sparingly to avoid complexity

- **Testing:** Test mixins independently and in combination

## Source

[TypeScript Mixins Documentation](https://www.typescriptlang.org/docs/handbook/mixins.html)

This tutorial covered TypeScript mixins with practical examples. Use mixins to 
create reusable and maintainable code patterns.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all TypeScript tutorials](/all/#typescript).