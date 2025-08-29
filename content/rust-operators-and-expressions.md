+++
title = "Rust operators and expressions"
date = 2025-08-29T20:11:37.508+01:00
draft = false
description = "Rust operators and expressions tutorial shows how to use operators and expressions in Rust."
image = ""
imageBig = ""
categories = ["rust"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Rust operators and expressions

last modified February 19, 2025

In this article we show how to use operators and expressions in Rust.

Expressions are made up of operands and operators. Operators specify the
operations to be performed on the operands. The sequence in which operators are
evaluated within an expression is determined by their precedence and
associativity.

An operator is a symbol that represents a specific action. In programming
languages, operators are derived from mathematical concepts. Programmers handle
data, and operators are used to manipulate this data. An operand is an input (or
argument) that an operator acts upon.

## Unary operators

Unary operators operate on a single operand. Here are the unary operators in
Rust:

  - (-) Negation (used to negate numbers)

  - (!) Logical NOT (used to invert boolean values)

  - (*) Dereference (used to access the value a pointer points to)

  - (&amp;) Borrow (used to take a reference to a value)

  - (&amp;mut) Mutable Borrow (used to take a mutable reference to a value)

main
  

fn main() {
    println!("{}", 2);
    println!("{}", -2);

    let a = 1;
    println!("{}", -a);
    println!("{}", -(-a));

    let is_married = false;
    println!("{}", !is_married);
}

The example presents the unary minus and the logical not operators.

## Arithmetic operators

Arithmetic operators are used to perform mathematical operations on numbers.

main.rs
  

fn main() {
    let a = 10;
    let b = 20;

    println!("Addition: {}", a + b);
    println!("Subtraction: {}", a - b);
    println!("Multiplication: {}", a * b);
    println!("Division: {}", a / b);
    println!("Modulo: {}", a % b);
}

The program defines two integer variables. The arithmetic operators are
applied on the variables.

println!("Addition: {}", a + b);

The addition operator.

println!("Subtraction: {}", a - b);

The subtraction operator.

println!("Multiplication: {}", a * b);

The multiplication operator.

println!("Division: {}", a / b);

The division operator.

println!("Modulo: {}", a % b);

The modulo operator.

$ cargo run -q
Addition: 30
Subtraction: -10
Multiplication: 200
Division: 0
Modulo: 10

## Comparison operators

Comparison operators are used to compare two values. They return a boolean
value.

The following example demonstrates the comparison operators in Rust.

main.rs
  

fn main() {
    let a = 10;
    let b = 20;

    println!("Equal: {}", a == b);
    println!("Not equal: {}", a != b);
    println!("Greater: {}", a &gt; b);
    println!("Less: {}", a &lt; b);
    println!("Greater or equal: {}", a &gt;= b);
    println!("Less or equal: {}", a &lt;= b);
}

The program defines two integer variables. The comparison operators are
applied on the variables.

println!("Equal: {}", a == b);

The equality operator.

println!("Not equal: {}", a != b);

The inequality operator.

println!("Greater: {}", a &gt; b);

The greater than operator.

println!("Less: {}", a &lt; b);

The less than operator.

println!("Greater or equal: {}", a &gt;= b);

The greater than or equal operator.

println!("Less or equal: {}", a &lt;= b);

The less than or equal operator is used in the sixth line.

$ cargo run -q
Equal: false
Not equal: true
Greater: false
Less: true
Greater or equal: false
Less or equal: true

## Logical operators

Logical operators are used to combine boolean values.

The following example demonstrates the logical operators in Rust.

main.rs
  

fn main() {
    let a = true;
    let b = false;

    println!("And: {}", a &amp;&amp; b);
    println!("Or: {}", a || b);
    println!("Not: {}", !a);
}

The program defines two boolean variables. The logical operators are
applied on the variables.

println!("And: {}", a &amp;&amp; b);

The logical AND operator.

println!("Or: {}", a || b);

The logical OR operator.

println!("Not: {}", !a);

The logical NOT operator.

$ cargo run -q
And: false
Or: true
Not: false

## Compound assignment operators

Compound assignment operators are used to perform arithmetic and
assignment operations.

The following example demonstrates the compound assignment operators in Rust.

main.rs
  

fn main() {
    let mut a = 10;

    a += 5;
    println!("Addition: {}", a);

    a -= 5;
    println!("Subtraction: {}", a);

    a *= 5;
    println!("Multiplication: {}", a);

    a /= 5;
    println!("Division: {}", a);

    a %= 5;
    println!("Modulo: {}", a);
}

The program defines a mutable integer variable. The compound assignment
operators are applied on the variable.

a += 5;

The addition compound assignment operator.

a -= 5;

The subtraction compound assignment operator.

a *= 5;

The multiplication compound assignment operator.

a /= 5;

The division compound assignment operator.

a %= 5;

The modulo compound assignment operator.

$ cargo run -q
Addition: 15
Subtraction: 10
Multiplication: 50
Division: 10
Modulo: 0

## Expressions

An expression is a combination of values, variables, and operators that
evaluates to a value.

The following example demonstrates expressions in Rust.

main.rs
  

fn main() {
    let x = 10;
    let y = 20;

    let result = if x &lt; y { x } else { y };

    println!("Result: {}", result);
}

The program defines two integer variables. An if expression is used to
evaluate the variables.

let result = if x &lt; y { x } else { y };

The if expression evaluates the condition and returns the value of the
variable x or y.

$ cargo run -q
Result: 10

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Rust tutorials](/all/#rust).