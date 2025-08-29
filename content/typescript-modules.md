+++
title = "TypeScript Modules"
date = 2025-08-29T20:14:31.598+01:00
draft = false
description = "Comprehensive TypeScript modules tutorial covering syntax, import/export, namespaces, and advanced patterns with practical coding examples."
image = ""
imageBig = ""
categories = ["typescript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# TypeScript Modules

last modified March 3, 2025

Modules in TypeScript organize code into reusable, maintainable units. They 
use import and export statements to share code 
between files. This tutorial explores module syntax, default exports, and 
namespaces with practical examples.

## Basic Module Syntax

Modules allow exporting and importing variables, functions, and classes. This 
example demonstrates basic module usage.

mathUtils.ts
  

export function add(a: number, b: number): number {
    return a + b;
}

export function subtract(a: number, b: number): number {
    return a - b;
}

main.ts
  

```
import { add, subtract } from './mathUtils';

console.log(add(10, 5));      // Output: 15
console.log(subtract(10, 5)); // Output: 5

```

The mathUtils module exports two functions. The main 
module imports and uses them.

## Default Exports

A module can have one default export. Default exports simplify imports.

logger.ts
  

export default function log(message: string): void {
    console.log(`[LOG]: ${message}`);
}

main.ts
  

```
import log from './logger';

log("This is a log message.");  // Output: [LOG]: This is a log message.

```

Default exports are imported without curly braces and can have any name.

## Namespace Imports

Namespace imports group multiple exports under a single name.

mathUtils.ts
  

export function add(a: number, b: number): number {
    return a + b;
}

export function subtract(a: number, b: number): number {
    return a - b;
}

main.ts
  

```
import * as MathUtils from './mathUtils';

console.log(MathUtils.add(10, 5));      // Output: 15
console.log(MathUtils.subtract(10, 5)); // Output: 5

```

Namespace imports are useful for organizing related functions.

## Re-exporting Modules

Modules can re-export other modules to create a single entry point.

mathUtils.ts
  

export function add(a: number, b: number): number {
    return a + b;
}

export function subtract(a: number, b: number): number {
    return a - b;
}

index.ts
  

```
export { add, subtract } from './mathUtils';

```

main.ts
  

```
import { add, subtract } from './index';

console.log(add(10, 5));      // Output: 15
console.log(subtract(10, 5)); // Output: 5

```

Re-exporting simplifies imports by consolidating exports in one file.

## Dynamic Imports

Dynamic imports load modules asynchronously at runtime.

mathUtils.ts
  

export function add(a: number, b: number): number {
    return a + b;
}

main.ts
  

```
async function loadModule() {
    const mathUtils = await import('./mathUtils');
    console.log(mathUtils.add(10, 5));  // Output: 15
}

loadModule();

```

Dynamic imports are useful for code splitting and lazy loading.

## Namespaces

Namespaces group related code and avoid global scope pollution.

mathUtils.ts
  

namespace MathUtils {
    export function add(a: number, b: number): number {
        return a + b;
    }
}

export { MathUtils };

main.ts
  

```
import { MathUtils } from './mathUtils';

console.log(MathUtils.add(10, 5));  // Output: 15

```

Namespaces are an alternative to modules for organizing code.

## Best Practices

- **Use Modules:** Prefer modules over namespaces for modern apps

- **Single Responsibility:** Keep modules focused on one task

- **Default Exports:** Use default exports for single-purpose modules

- **Dynamic Imports:** Use dynamic imports for performance optimization

- **Re-exporting:** Consolidate exports in an index.ts file

## Source

[TypeScript Modules Documentation](https://www.typescriptlang.org/docs/handbook/modules.html)

This tutorial covered TypeScript modules with practical examples. Implement 
these patterns to write modular, maintainable code.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all TypeScript tutorials](/all/#typescript).