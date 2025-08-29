+++
title = "TypeScript Maps"
date = 2025-08-29T20:14:31.589+01:00
draft = false
description = "Comprehensive TypeScript Map tutorial covering creation, manipulation, and advanced operations for key-value collections."
image = ""
imageBig = ""
categories = ["typescript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# TypeScript Maps

last modified March 15, 2025

TypeScript Maps store key-value pairs while preserving insertion order. Unlike
objects, Maps allow keys of any type and provide built-in methods for efficient
data management. This tutorial covers Map creation, manipulation, and common
operations with practical examples.

## What Are TypeScript Maps?

A Map is a collection of key-value pairs where keys can be any type (objects,
primitives). Maps maintain insertion order and offer methods for adding,
retrieving, and checking elements. They are declared using
Map&lt;K, V&gt; syntax.

## Creating Maps

This example shows how to create and initialize Maps in TypeScript.

creating_maps.ts
  

const userRoles = new Map&lt;number, string&gt;();
userRoles.set(1, 'Admin');
userRoles.set(2, 'Editor');

const productPrices = new Map&lt;string, number&gt;([
    ['Laptop', 999],
    ['Mouse', 29]
]);

console.log(userRoles);    // Map(2) {1 =&gt; 'Admin', 2 =&gt; 'Editor'}
console.log(productPrices); // Map(2) {'Laptop' =&gt; 999, 'Mouse' =&gt; 29}

Maps can be created empty or initialized with an array of key-value pairs.
Type parameters specify key and value types for type safety.

## Adding and Updating Entries

This example demonstrates adding and modifying Map entries.

adding_entries.ts
  

const inventory = new Map&lt;string, number&gt;();
inventory.set('Apples', 50);
inventory.set('Oranges', 30);

// Update quantity
inventory.set('Apples', 45);

console.log(inventory); // Map(2) {'Apples' =&gt; 45, 'Oranges' =&gt; 30}

The set() method adds or updates entries. Existing keys are
overwritten, while new keys are added to the Map.

## Accessing Values

This example shows how to retrieve values from a Map.

accessing_values.ts
  

const capitals = new Map&lt;string, string&gt;([
    ['France', 'Paris'],
    ['Japan', 'Tokyo']
]);

console.log(capitals.get('Japan'));  // Output: Tokyo
console.log(capitals.get('Germany')); // Output: undefined

Use get() to retrieve values by key. Returns undefined
if the key doesn't exist.

## Checking Key Existence

This example demonstrates checking for key presence in a Map.

checking_keys.ts
  

const colors = new Map&lt;string, string&gt;([['red', '#FF0000']]);

console.log(colors.has('red'));   // true
console.log(colors.has('blue'));  // false

The has() method checks if a key exists in the Map, returning a
boolean. Essential to prevent errors when accessing unknown keys.

## Removing Entries

This example shows how to delete entries and clear Maps.

removing_entries.ts
  

const settings = new Map&lt;string, boolean&gt;();
settings.set('darkMode', true);
settings.set('notifications', false);

settings.delete('notifications');
console.log(settings); // Map(1) {'darkMode' =&gt; true}

settings.clear();
console.log(settings); // Map(0) {}

Use delete() to remove specific entries and clear() to
remove all entries. Both modify the Map in place.

## Iterating Maps

This example demonstrates various methods to iterate through Map entries.

iterating_maps.ts
  

const users = new Map&lt;number, string&gt;([
    [101, 'Alice'],
    [102, 'Bob']
]);

// Using for...of with entries()
for (const [id, name] of users.entries()) {
    console.log(`${id}: ${name}`);
}

// Using forEach()
users.forEach((value, key) =&gt; {
    console.log(`${key} -&gt; ${value}`);
});

Maps provide entries(), keys(), and
values() methods for iteration. The forEach() method
offers callback-based iteration.

## Map to Array Conversion

This example converts Map entries to arrays for processing.

map_to_array.ts
  

const scoreboard = new Map&lt;string, number&gt;([
    ['Team A', 3],
    ['Team B', 5]
]);

const entriesArray = Array.from(scoreboard.entries());
const keysArray = Array.from(scoreboard.keys());

console.log(entriesArray); // [['Team A', 3], ['Team B', 5]]
console.log(keysArray);    // ['Team A', 'Team B']

Array.from() converts Map iterables to arrays. Useful for
integrating with array methods like map() or filter().

## Best Practices

- **Type Safety:** Always specify key and value types during Map declaration

- **Key Checks:** Use has() before get() to avoid undefined values

- **Object Keys:** Use objects as keys carefully (references matter, not content)

- **Size Property:** Use size property instead of manual tracking

- **Iteration Order:** Rely on insertion order preservation for ordered data

## Source

[TypeScript Map Documentation](https://www.typescriptlang.org/docs/handbook/iterators-and-generators.html#built-in-types)

This tutorial covered essential Map operations in TypeScript, providing a
foundation for efficient key-value data management in your applications.

## Author

Jan Bodnar is a seasoned developer and technical writer with expertise in
multiple programming languages. He has authored numerous tutorials and books
on software development since 2007, focusing on making complex concepts
accessible to learners.

List [all TypeScript tutorials](/all/#typescript).