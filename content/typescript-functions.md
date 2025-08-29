+++
title = "TypeScript Functions"
date = 2025-08-29T20:14:28.221+01:00
draft = false
description = "Comprehensive TypeScript functions tutorial covering syntax, type annotations, arrow functions, and advanced patterns with practical coding examples."
image = ""
imageBig = ""
categories = ["typescript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# TypeScript Functions

last modified February 24, 2025

Functions in TypeScript encapsulate reusable code blocks with precise type
annotations, ensuring robust and predictable code. They extend the capabilities
of JavaScript functions by incorporating parameter types, return types, and
advanced patterns. By defining the types of input and output, TypeScript
functions reduce the likelihood of runtime errors and enhance code readability
and maintainability.

## Key Advantages

Type Annotations: By explicitly defining the types of parameters and return
values, TypeScript functions help catch type-related errors at compile-time,
resulting in more predictable code execution.

IntelliSense Support: TypeScript provides enhanced IntelliSense in IDEs,
offering auto-completion and documentation for function parameters and return
types, boosting development efficiency.

Function Overloading: TypeScript allows function overloading, enabling the
creation of multiple function signatures for a single function name, thereby
enhancing flexibility in handling different scenarios.

## Basic Function Syntax

TypeScript functions use type annotations for parameters and return values. 
This example calculates a rectangle's area with explicit types.

basic_function.ts
  

function getRectangleArea(length: number, width: number): number {
    return length * width;
}

console.log(getRectangleArea(8, 5)); // Output: 40

The getRectangleArea function takes two parameters, 
length and width, both typed as number. 
It returns their product, explicitly typed as number. 
TypeScript ensures that only numbers are passed and returned.

Calling getRectangleArea("8", 5) would fail at compile time due to 
type mismatch. The output, 40, confirms the calculation. This shows how type 
annotations enforce safety and clarity in basic functions.

## Function Expressions

Function expressions assign functions to variables with type annotations. 
This example formats a user ID with a typed variable.

function_expression.ts
  

const generateUserId: (prefix: string, id: number) =&gt; string = 
    function(prefix, id) {
        return `${prefix}-${id.toString().padStart(4, '0')}`;
    };

console.log(generateUserId("USR", 42)); // Output: USR-0042

The generateUserId variable is typed as a function taking a 
string and a number, returning a string. 
The function pads the ID with zeros for consistency.

TypeScript infers parameter types within the body, avoiding redundancy. 
Passing 42, "USR" would error due to type mismatch. The output, 
"USR-0042," shows the formatted result. This pattern is useful for named 
function assignments with explicit type safety.

## Arrow Functions

Arrow functions offer a concise syntax with full type support. This example 
computes a circle's circumference using an arrow function.

arrow_function.ts
  

const getCircumference = (radius: number): number =&gt;
    2 * Math.PI * radius;

console.log(getCircumference(3)); // Output: 18.84955592153876

The getCircumference arrow function takes a radius of 
type number and returns a number. It uses 
Math.PI for precision in the calculation.

TypeScript allows omitting the return type if it's inferable, but it's 
included here for clarity. Passing a string like "3" would fail. 
The output, approximately 18.85, confirms the result. Arrow functions are 
ideal for concise, type-safe expressions.

## Anonymous Functions

Anonymous functions are unnamed and often used inline. This example filters 
an array with an anonymous function as a callback.

anonymous_function.ts
  

const numbers: number[] = [1, 2, 3, 4, 5, 6];
const odds = numbers.filter(function(value: number): boolean {
    return value % 2 !== 0;
});

console.log(odds); // Output: [1, 3, 5]

The anonymous function inside filter takes a 
value typed as number and returns a 
boolean. It checks if the number is odd.

TypeScript infers the context from numbers being 
number[], but explicit types add clarity. The output, 
[1, 3, 5], shows odd numbers. Anonymous functions are handy for one-off logic.

## Optional Parameters

Optional parameters, marked with ?, allow flexibility in function 
calls. This example builds a message with an optional greeting.

optional_params.ts
  

function buildMessage(name: string, greeting?: string): string {
    return greeting ? `${greeting}, ${name}!` : `Hi, ${name}!`;
}

console.log(buildMessage("Emma", "Hello")); // Output: Hello, Emma!
console.log(buildMessage("Liam"));          // Output: Hi, Liam!

The buildMessage function requires name but makes 
greeting optional with ?. It defaults to "Hi" if 
greeting is undefined, using a ternary operator.

TypeScript ensures greeting, if provided, is a string. 
Omitting it is valid, while passing a number would error. The outputs show both 
cases: "Hello, Emma!" and "Hi, Liam!". This is useful for customizable 
functions with optional inputs.

## Default Parameters

Default parameters provide fallback values when arguments are omitted. This 
example calculates a discounted price with a default rate.

default_params.ts
  

function calculateDiscountedPrice(price: number, rate: number = 0.15): number {
    return price * (1 - rate);
}

console.log(calculateDiscountedPrice(200));     // Output: 170
console.log(calculateDiscountedPrice(200, 0.25)); // Output: 150

The calculateDiscountedPrice function sets rate to 
0.15 by default. It applies the discount to price, returning a 
number. TypeScript infers rate as 
number from the default.

Calling it with one argument uses the default, while two arguments override it. 
Passing a string like "0.15" would fail. Outputs are 170 (15% off) 
and 150 (25% off). This simplifies function calls with common defaults.

## Rest Parameters

Rest parameters gather variable arguments into a typed array. This example 
averages a list of grades.

rest_params.ts
  

function averageGrades(...grades: number[]): number {
    const sum = grades.reduce((acc, grade) =&gt; acc + grade, 0);
    return grades.length ? sum / grades.length : 0;
}

console.log(averageGrades(88, 92, 76, 95)); // Output: 87.75

The averageGrades function uses ...grades to collect 
numbers into a number[]. It computes the average, handling the 
empty case with a fallback of 0.

TypeScript enforces that all arguments are numbers—passing a string like 
"90" would error. The output, 87.75, is the average of four 
grades. Rest parameters are great for functions with variable input counts.

## Function Overloading

Function overloading defines multiple signatures for one implementation. This 
example processes different input types distinctly.

function_overload.ts
  

function transformValue(value: string): string;
function transformValue(value: number): number;
function transformValue(value: string | number): string | number {
    return typeof value === "string" ? value.repeat(2) : value + 10;
}

console.log(transformValue("Hi")); // Output: HiHi
console.log(transformValue(5));    // Output: 15

The transformValue function has two overload signatures: one for 
string returning string, one for number 
returning number. The implementation handles both with a union 
type, repeating strings or adding 10 to numbers.

TypeScript ensures calls match a signature—transformValue(true) 
would fail. Outputs are "HiHi" (string repeated) and 15 (number increased). 
Overloading refines type checking for multi-type functions.

## Generic Functions

Generic functions use type parameters for reusable logic. This example swaps 
two values of any type.

generic_function.ts
  

function swap&lt;T&gt;(a: T, b: T): [T, T] {
    return [b, a];
}

console.log(swap&lt;number&gt;(10, 20));    // Output: [20, 10]
console.log(swap&lt;string&gt;("a", "b"));  // Output: ["b", "a"]

The swap function uses a generic type T for its 
parameters and return tuple. It works with any type, specified explicitly or 
inferred by TypeScript.

Calls with number and string produce [20, 10] and 
["b", "a"]. Mixing types like swap(10, "a") errors due to type 
mismatch. Generics enable flexible, type-safe reusable functions.

## Function Type Aliases

Type aliases define reusable function signatures. This example uses an alias 
for a callback.

type_alias_function.ts
  

type FilterCallback = (value: number, index: number) =&gt; boolean;

function filterNumbers(arr: number[], callback: FilterCallback): number[] {
    return arr.filter(callback);
}

const evens = filterNumbers([1, 2, 3, 4], (n) =&gt; n % 2 === 0);
console.log(evens); // Output: [2, 4]

The FilterCallback alias defines a function type taking a 
number and index, returning a boolean. 
The filterNumbers function uses it for its callback parameter.

The callback filters even numbers, producing [2, 4]. A callback like 
(n: string) =&gt; true would error due to type mismatch. This 
approach ensures consistent function signatures across uses.

## Async Functions

Async functions return promises with typed results. This example fetches a 
user name asynchronously.

async_function.ts
  

async function fetchUserName(id: number): Promise&lt;string&gt; {
    const response = await Promise.resolve(`User${id}`);
    return response;
}

(async () =&gt; {
    const name = await fetchUserName(1);
    console.log(name); // Output: User1
})();

The fetchUserName function is async, returning a 
Promise. It simulates fetching with 
Promise.resolve, resolving to a string.

The IIFE awaits the result, logging "User1". Returning a number would error due 
to the Promise type. Async functions are key for typed 
asynchronous operations.

## Generator Functions

Generator functions yield values lazily using function* syntax. 
This example generates a sequence of Fibonacci numbers.

generator_function.ts
  

function* fibonacciSequence(limit: number): Generator {
    let a = 0, b = 1;
    for (let i = 0; i &lt; limit; i++) {
        yield a;
        [a, b] = [b, a + b];
    }
}

const fib = fibonacciSequence(5);
console.log([...fib]); // Output: [0, 1, 1, 2, 3]

The fibonacciSequence function is a generator, typed with 
Generator. It yields numbers up to a limit, 
using a loop to compute Fibonacci values.

Each yield pauses execution, returning the current value. 
The spread operator collects the first 5 values into [0, 1, 1, 2, 3]. 
TypeScript ensures yielded values are numbers, enhancing type safety.

## Best Practices

- **Define Return Types Explicitly:** Use explicit return types for clarity in complex functions.

- **Focus on Single Responsibility:** Ensure each function performs one clear task.

- **Minimize Parameter Count:** Keep parameters below 4; use objects for more inputs.

- **Favor Arrow Functions:** Use arrow functions for concise callbacks and consistent this.

- **Enforce Type Safety:** Validate parameter types and handle edge cases like null.

- **Use Generics Wisely:** Apply generics for reusable logic, avoiding over-complication.

- **Leverage Type Aliases:** Define function signatures with aliases for reusability.

## Source

[TypeScript Functions Documentation](https://www.typescriptlang.org/docs/handbook/functions.html)

This tutorial covered TypeScript functions with practical examples. Implement 
these patterns to write safer, more maintainable code.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all TypeScript tutorials](/all/#typescript).