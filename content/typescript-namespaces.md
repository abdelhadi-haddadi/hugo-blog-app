+++
title = "TypeScript Namespaces"
date = 2025-08-29T20:14:32.693+01:00
draft = false
description = "TypeScript tutorial on namespaces, covering their creation, usage, and practical examples for organizing code."
image = ""
imageBig = ""
categories = ["typescript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# TypeScript Namespaces

last modified February 26, 2025

Namespaces in TypeScript are a way to organize code into logical groups and
prevent naming collisions. They are particularly useful in large applications
where multiple modules or components might have similar names. This tutorial
covers the creation, usage, and practical examples of TypeScript namespaces.

Namespaces allow us to group related code into a single container. They help
avoid global scope pollution by encapsulating variables, functions, classes, and
interfaces within a named scope. Namespaces can be nested and split across
multiple files for better organization.

## Creating a Namespace

This example demonstrates how to create and use a simple namespace.

basic_namespace.ts
  

namespace MyNamespace {
    export const message = "Hello from MyNamespace!";

    export function greet(name: string) {
        return `Hello, ${name}!`;
    }
}

console.log(MyNamespace.message);  // Output: Hello from MyNamespace!
console.log(MyNamespace.greet("Alice"));  // Output: Hello, Alice!

The namespace keyword is used to define a namespace. The
export keyword makes the variables, functions, or classes
accessible outside the namespace. In this example, message and
greet are exported and can be accessed using the namespace name.

## Nested Namespaces

This example demonstrates how to create nested namespaces.

nested_namespace.ts
  

namespace OuterNamespace {
    export namespace InnerNamespace {
        export const message = "Hello from InnerNamespace!";
    }
}

console.log(OuterNamespace.InnerNamespace.message);  // Output: Hello from InnerNamespace!

Namespaces can be nested to create a hierarchical structure. In this example,
InnerNamespace is nested inside OuterNamespace. The
message variable is accessed using the fully qualified namespace
path.

## Splitting Namespaces Across Files

This example demonstrates how to split a namespace across multiple files.

file1.ts
  

namespace MyNamespace {
    export const message = "Hello from file1!";
}

file2.ts
  

```
/// &lt;reference path="file1.ts" /&gt;

namespace MyNamespace {
    export function greet(name: string) {
        return `Hello, ${name}!`;
    }
}

console.log(MyNamespace.message);  // Output: Hello from file1!
console.log(MyNamespace.greet("Alice"));  // Output: Hello, Alice!

```

Namespaces can be split across multiple files using the 
/// &lt;reference path="..." /&gt; directive. This allows you to
organize large namespaces into smaller, more manageable files. In this example,
file1.ts and file2.ts contribute to the same
namespace.

## Using Namespaces with Modules

This example demonstrates how to use namespaces alongside ES modules.

namespace_with_modules.ts
  

namespace MyNamespace {
    export const message = "Hello from MyNamespace!";
}

export default MyNamespace;

main.ts
  

```
import MyNamespace from "./namespace_with_modules";

console.log(MyNamespace.message);  // Output: Hello from MyNamespace!

```

Namespaces can be exported and imported using ES modules. In this example, the
MyNamespace namespace is exported from
namespace_with_modules.ts and imported into main.ts.
This allows you to use namespaces in a modular codebase.

## Best Practices for Using Namespaces

- **Use for Logical Grouping:** Use namespaces to group related code and avoid global scope pollution.

- **Prefer Modules for Large Projects:** For large projects, consider using ES modules instead of namespaces for better modularity and tooling support.

- **Keep Namespaces Small:** Avoid creating overly large namespaces; split them across files if necessary.

- **Document Namespaces:** Add comments or documentation to explain the purpose of namespaces and their contents.

## Source

[TypeScript Namespaces Documentation](https://www.typescriptlang.org/docs/handbook/namespaces.html)

In this article, we have explored TypeScript namespaces and demonstrated their
usage through practical examples.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all TypeScript tutorials](/all/#typescript).