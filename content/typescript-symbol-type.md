+++
title = "TypeScript Symbol Type"
date = 2025-08-29T20:14:33.863+01:00
draft = false
description = "TypeScript tutorial on the Symbol type, covering its creation, usage, and practical examples."
image = ""
imageBig = ""
categories = ["typescript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# TypeScript Symbol Type

last modified February 25, 2025

The Symbol type in TypeScript is a primitive data type that
represents a unique and immutable value. Symbols are often used as unique
identifiers for object properties, ensuring that they do not conflict with other
properties. This tutorial covers the creation, usage, and practical examples of
the Symbol type in TypeScript.

Symbols are unique and immutable values that can be used as identifiers for
object properties. They are created using the Symbol() function,
and each symbol is guaranteed to be unique, even if they have the same
description. Symbols are often used to create private or non-enumerable
properties in objects.

## Creating Symbols

This example demonstrates how to create and use symbols in TypeScript.

creating_symbols.ts
  

const symbol1 = Symbol();
const symbol2 = Symbol("description");

console.log(symbol1);  // Output: Symbol()
console.log(symbol2);  // Output: Symbol(description)

The Symbol() function creates a new unique symbol. An optional
description can be provided as an argument, which is useful for debugging but
does not affect the uniqueness of the symbol.

## Using Symbols as Object Properties

This example demonstrates how to use symbols as unique keys for object properties.

symbol_properties.ts
  

const idSymbol = Symbol("id");

let user = {
    name: "Alice",
    [idSymbol]: 12345
};

console.log(user[idSymbol]);  // Output: 12345

Symbols can be used as keys for object properties. This ensures that the
property does not conflict with other properties, even if they have the same
name. The symbol key is accessed using square brackets.

## Symbols and Iteration

This example demonstrates how symbols are treated during object iteration.

symbol_iteration.ts
  

const idSymbol = Symbol("id");

let user = {
    name: "Alice",
    age: 30,
    [idSymbol]: 12345
};

for (let key in user) {
    console.log(key);  // Output: name, age
}

console.log(Object.keys(user));  // Output: ["name", "age"]

Symbol properties are not included in standard object iteration methods like
for...in or Object.keys(). This makes symbols useful
for creating private or hidden properties.

## Global Symbol Registry

This example demonstrates how to use the global symbol registry to create and share symbols.

global_symbols.ts
  

const globalSymbol1 = Symbol.for("globalId");
const globalSymbol2 = Symbol.for("globalId");

console.log(globalSymbol1 === globalSymbol2);  // Output: true

The Symbol.for() method creates or retrieves a symbol from the
global symbol registry. Symbols created with the same key are identical, making
them useful for sharing across different parts of the code.

## Well-Known Symbols

This example demonstrates how to use well-known symbols to customize object behavior.

well_known_symbols.ts
  

let obj = {
    [Symbol.toStringTag]: "CustomObject"
};

console.log(obj.toString());  // Output: [object CustomObject]

Well-known symbols are predefined symbols that allow you to customize the
behavior of objects. For example, Symbol.toStringTag can be used to
customize the output of the toString() method.

## Unique symbols

Unique symbols are symbols that are guaranteed to be unique across your
codebase. The unique symbol type ensures that each symbol you create has a
unique identity, even if they have the same description. They are particularly
useful when you want to create properties on objects that won't collide with any
other property keys.

unique_symbols.ts
  

const uniqueSymbol1: unique symbol = Symbol("unique1");
const uniqueSymbol2: unique symbol = Symbol("unique2");

let obj = {
    [uniqueSymbol1]: "Value for uniqueSymbol1",
    [uniqueSymbol2]: "Value for uniqueSymbol2"
};

console.log(obj[uniqueSymbol1]);
console.log(obj[uniqueSymbol2]);

The provided code demonstrates the use of unique symbols.

## Well-Known Symbols

Well-known symbols are built-in symbols that represent internal behaviors or
properties of objects. They are pre-defined by the ECMAScript specification and
can be used to change or customize how objects behave in certain operations.
These symbols include Symbol.iterator,
Symbol.asyncIterator, Symbol.match,
Symbol.replace, and others.

## Symbol.iterator

Symbol.iterator is a well-known symbol used to define the default
iterator for an object. An object that has a Symbol.iterator
property is considered iterable, meaning it can be used in constructs like
for...of loops, the spread operator, and other iteration-related
operations. The value associated with Symbol.iterator is a function
that returns an iterator object. This iterator object must conform to the
iteration protocol, which involves having a next() method that
returns an object with value and done properties.

it_sym.ts
  

const Grades = {
    values: ['A', 'B', 'C', 'D', 'E', 'F', 'FX'],
    [Symbol.iterator]: function* () {
        for (let value of this.values) {
            yield value;
        }
    }
};

for (let value of Grades) {
    console.log(value); 
}

The code defines an object Grades with an array values
containing grade letters. It also defines a custom iterator using the
Symbol.iterator symbol, which is a generator function that yields
each grade in the values array. This makes the Grades
object iterable. When using a for...of loop on Grades,
the custom iterator is invoked, and each grade is logged to the console
sequentially. 

## Symbol.match

Symbol.match is a well-known symbol that allows customizing the
behavior of the String.prototype.match method. By implementing the
Symbol.match method on an object, you can control how that object
is used for matching strings.

match_sym.ts
  

class CustomMatcher {
    [Symbol.match](str: string) {
        return str.includes("TypeScript");
    }
}

const result = "I love TypeScript!".match(new CustomMatcher());
console.log(result); // Output: true

The provided code defines a class CustomMatcher with a custom
implementation of the Symbol.match method, which checks if a given
string contains the substring "TypeScript". An instance of this class is then
used with the match method of the string 
"I love TypeScript!", invoking the custom Symbol.match method. 

## Symbol.split

Symbol.split is a well-known symbol that allows developers to
customize the behavior of the String.prototype.split
method. By implementing the Symbol.split method on an object, you
can define how that object will split a string when used as the argument to the
split method. Essentially, it allows you to control the logic for
splitting a string based on custom criteria.

This well-known symbol provides a way to extend or override the default
behavior of splitting strings, giving you more flexibility in how string
manipulation is performed in your code. When the split method is
called on a string with an object that has a Symbol.split method,
JavaScript will use this custom method to determine how the string should be
split into an array of substrings.

split_sym.ts
  

class CustomSplitter {
    [Symbol.split](str: string) {
        return str.split(new RegExp(/[,;]+/));
    }
}

const result = "1,2,3;4,5,6;7;8".split(new CustomSplitter());
console.log(result); // Output: [ "1", "2", "3", "4", "5", "6", "7", "8" ]

The provided TypeScript code defines a class CustomSplitter with a
custom implementation of the Symbol.split method, which splits the
given string either by a comma or a semicolon. An instance of this class is
then used with the split method of the provided string, 
invoking the custom Symbol.split method.

## Best Practices for Using Symbols

- **Use for Unique Identifiers:** Use symbols to create unique identifiers for object properties to avoid conflicts.

- **Leverage Global Symbols:** Use the global symbol registry to share symbols across different parts of the code.

- **Customize Object Behavior:** Use well-known symbols to customize the behavior of objects.

- **Document Symbol Usage:** Clearly document the purpose of symbols to improve code readability.

## Source

[TypeScript Symbols Documentation](https://www.typescriptlang.org/docs/handbook/symbols.html)

In this article, we have explored the TypeScript Symbol type and demonstrated its usage through practical examples.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all TypeScript tutorials](/all/#typescript).