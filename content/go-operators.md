+++
title = "Go operators"
date = 2025-08-29T19:55:31.359+01:00
draft = false
description = "Learn about operators in Go. Includes examples of arithmetic, logical, and comparison operators."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go operators

last modified April 11, 2024

In this article we cover Go operators. We show how to use operators to create
expressions.

An *operator* is a special symbol which indicates a certain process is
carried out. Operators in programming languages are taken from mathematics.
Programmers work with data. The operators are used to process data. An
*operand* is one of the inputs (arguments) of an operator.

Expressions are constructed from operands and operators. The operators of an
expression indicate which operations to apply to the operands. The order of
evaluation of operators in an expression is determined by the
*precedence* and *associativity* of the operators.

An operator usually has one or two operands. Those operators that work
with only one operand are called *unary operators*.
Those who work with two operands are called *binary operators*.

Certain operators may be used in different contexts. For instance the
+ operator can be used in different cases: it adds numbers,
concatenates strings, or indicates the sign of a number. We say that the
operator is *overloaded*.

## Go sign operators

There are two sign operators: + and -. They are used to
indicate or change the sign of a value.

sign_operators.go
  

package main

import "fmt"

func main() {

    fmt.Println(2)
    fmt.Println(+2)
    fmt.Println(-2)
}

The + and - signs indicate the sign of a value. The
plus sign can be used to signal that we have a positive number. It can be
omitted and it is in most cases done so.

minus_sign.go
  

package main

import "fmt"

func main() {

    var a = 1

    fmt.Println(-a)
    fmt.Println(-(-a))
}

The minus sign changes the sign of a value.

## Go assignment operator

The assignment operator = assigns a value to a variable. A
*variable* is a placeholder for a value. In mathematics, the = operator
has a different meaning. In an equation, the = operator is an
equality operator. The left side of the equation is equal to the right one.

var x = 1

Here we assign a number to the x variable.

x = x + 1

This expression does not make sense in mathematics, but it is legal in
programming. The expression adds 1 to the x variable. The right
side is equal to 2 and 2 is assigned to x.

3 = x

This code line leads to a syntax error. We cannot assign a value to a literal.

x := 2

Go has a short variable declaration operator :=; it declares a
variable and assigns a value in one step. The x := 2 is equal
to var x = 2.

### Go increment and decrement operators

We often increment or decrement a value by one in programming. Go has two
convenient operators for this: ++ and --.

x++ //  x = x + 1
y-- // y = y - 1

inc_dec.go
  

```
package main

import "fmt"

func main() {

    x := 6

    x++
    x++

    fmt.Println(x)

    x--
    fmt.Println(x)
}

```

In the above example, we demonstrate the usage of both operators.

x := 6

x++
x++

We initiate the x variable to 6. Then we increment
x two times. Now the variable equals to 8.

x--

We use the decrement operator. Now the variable equals to 7.

$ go run inc_dec.go
8
7

## Go compound assignment operators

The compound assignment operators consist of two operators. They are shorthand
operators.

a = a + 3
a += 3

The += compound operator is one of these shorthand operators.
The above two expressions are equal. Value 3 is added to the a variable.

Other compound operators include:

-=   *=   /=   %=   &amp;=   |=   &lt;&lt;=   &gt;&gt;=

compound_operators.go
  

```
package main

import "fmt"

func main() {

    var a int = 1
    a = a + 1

    fmt.Println(a)

    a += 5
    fmt.Println(a)

    a *= 3
    fmt.Println(a)
}

```

In the code example, we use two compound operators.

var a int = 1
a = a + 1

The a variable is initiated to one. 1 is added to the
variable using the non-shorthand notation.

a += 5

Using a += compound operator, we add 5 to the
a variable. The statement is equal to a = a + 5.

a *= 3

Using the *= operator, the a is multiplied by 3.
The statement is equal to a = a * 3.

$ go run compound_operators.go
2
7
21

## Go arithmetic operators

The following is a table of arithmetic operators in Go.

SymbolName

+Addition
-Subtraction
*Multiplication
/Division
%Remainder

The following example shows arithmetic operations.

arithmetic.go
  

package main

import "fmt"

func main() {

    var a = 10
    var b = 11
    var c = 12

    var add = a + b + c
    var sb = c - a
    var mult = a * b
    var div = c / 3
    var rem = c % a

    fmt.Println(add)
    fmt.Println(sb)
    fmt.Println(mult)
    fmt.Println(div)
    fmt.Println(rem)
}

In the preceding example, we use addition, subtraction, multiplication,
division, and remainder operations. This is all familiar from the mathematics.

var rem = c % a

The % operator is called the remainder or the modulo operator.
It finds the remainder of division of one number by another. For example,
9 % 4, 9 modulo 4 is 1, because 4 goes into 9 twice with a
remainder of 1.

$ go run arithmetic.go
33
2
110
4
2

Next we will show the distinction between integer and floating
point division.

division.go
  

package main

import "fmt"

func main() {

    c := 5 / 2
    fmt.Println(c)

    d := 5 / 2.0
    fmt.Println(d)
}

In the preceding example, we divide two numbers.

c := 5 / 2
fmt.Println(c)

In this code, we have done integer division. The returned value of the division
operation is an integer. When we divide two integers the result is an integer.

d := 5 / 2.0
fmt.Println(d)

If one of the values is a double or a float, we perform a floating point
division. In our case, the second operand is a double so the result is a double.

$ go run division.go
2
2.5

## Go Boolean operators

In Go we have three logical operators.

SymbolName

&amp;&amp;logical and
||logical or
!negation

Boolean operators are also called logical.

boolean_exp.go
  

package main

import "fmt"

func main() {

    var x = 3
    var y = 8

    fmt.Println(x == y)
    fmt.Println(y &gt; x)

    if y &gt; x {

        fmt.Println("y is greater than x")
    }
}

Many expressions result in a boolean value. For instance, boolean values are
used in conditional statements.

fmt.Println(x == y)
fmt.Println(y &gt; x)

Relational operators always result in a boolean value. These two lines print
false and true.

if y &gt; x {

    fmt.Println("y is greater than x")
}

The body of the if statement is executed only if the condition
inside the parentheses is met. The y &gt; x returns true, so the
message "y is greater than x" is printed to the terminal.

The true and false keywords represent boolean literals
in Go.

and_operator.go
  

package main

import "fmt"

func main() {

    var a = true &amp;&amp; true
    var b = true &amp;&amp; false
    var c = false &amp;&amp; true
    var d = false &amp;&amp; false

    fmt.Println(a)
    fmt.Println(b)
    fmt.Println(c)
    fmt.Println(d)
}

The code example shows the logical and (&amp;&amp;) operator.
It evaluates to true only if both operands are true.

$ go run and_operator.go
true
false
false
false

Only one expression results in true.

The logical or (||) operator evaluates to true
if either of the operands is true.

or_operator.go
  

package main

import "fmt"

func main() {

    var a = true || true
    var b = true || false
    var c = false || true
    var d = false || false

    fmt.Println(a)
    fmt.Println(b)
    fmt.Println(c)
    fmt.Println(d)
}

If one of the sides of the operator is true, the outcome of the operation is
true.

$ go run or_operator.go
true
true
true
false

Three of four expressions result in true.

The negation operator ! makes true false and false true.

negation_operator.go
  

package main

import "fmt"

func main() {

    fmt.Println(!true)
    fmt.Println(!false)
    fmt.Println(!(4 &lt; 3))
}

The example shows the negation operator in action.

$ go run negation_operator.go
false
true
true

## Go comparison operators

Comparison operators are used to compare values. These operators always result
in a boolean value.

SymbolMeaning

&lt;less than
&lt;=less than or equal to
&gt;greater than
&gt;=greater than or equal to
==equal to
!=not equal to

comparison operators are also called relational operators.

comparison_operators.go
  

package main

import "fmt"

func main() {

    fmt.Println(3 &lt; 4)
    fmt.Println(3 == 4)
    fmt.Println(4 &gt;= 3)
    fmt.Println(4 != 3)
}

In the code example, we have four expressions. These expressions compare
integer values. The result of each of the expressions is either true or false.
In Go we use the == to compare numbers. (Some languages like
Ada, Visual Basic, or Pascal use = for comparing numbers.)

## Go bitwise operators

Decimal numbers are natural to humans. Binary numbers are native to computers.
Binary, octal, decimal, or hexadecimal symbols are only notations of the same
number. Bitwise operators work with bits of a binary number.

SymbolMeaning

^bitwise exclusive or
&amp;bitwise and
|bitwise or
&amp;^bit clear (and not)
&lt;&lt;left shift
&gt;&gt;right shift

The *bitwise and operator* performs bit-by-bit comparison between
two numbers. The result for a bit position is 1 only if both corresponding
bits in the operands are 1.

      00110
   &amp;  00011
   =  00010

The first number is a binary notation of 6, the second is 3, and the result is
2.

fmt.Println(6 &amp; 3) // prints 2
fmt.Println(3 &amp; 6) // prints 2

The *bitwise or operator* performs bit-by-bit comparison between two
numbers. The result for a bit position is 1 if either of the corresponding bits
in the operands is 1.

     00110
   | 00011
   = 00111

The result is 00110 or decimal 7.

fmt.Println(6 | 3) // prints 7
fmt.Println(3 | 6) // prints 7

The *bitwise exclusive or operator* performs bit-by-bit comparison
between two numbers. The result for a bit position is 1 if one or the other (but
not both) of the corresponding bits in the operands is 1.

      00110
   ^  00011
   =  00101

The result is 00101 or decimal 5.

fmt.Println(6 ^ 3) // prints 5
fmt.Println(3 ^ 6) // prints 5

## Go pointer operators

In Go, the &amp; is an address of operator and the *
is a pointer indirection operator.

pointer_op.go
  

package main

import "fmt"

func main() {

    var count int = 4
    fmt.Println(count)

    var pv = &amp;count
    *pv = 3
    fmt.Println(pv)
    fmt.Println(*pv)
}

In the code example, we demonstrate the two operators.

var count int = 4

An integer variable is defined.

var pv = &amp;count

We get the address of the count variable; we create a pointer to
the variable.

*pv = 3

Via the pointer dereference, we modify the value of count.

fmt.Println(*pv)

Again, via pointer dereference, we print the value to which the pointer refers.

$ go run pointer_op.go
4
0xc0000140f8
3

## Go channel operator

A channels is a typed conduit through which we can send and receive values with
the channel operator &lt;-.

channel_op.go
  

package main

import "fmt"

func main() {

    messages := make(chan string)

    go func() { messages &lt;- "hello" }()

    msg := &lt;-messages
    fmt.Println(msg)
}

The example presents the channel operator.

go func() { messages &lt;- "hello" }()

We send a value to the channel.

msg := &lt;-messages

We receive a value from the channel.

## Go operator precedence

The *operator precedence* tells us which operators are evaluated first.
The precedence level is necessary to avoid ambiguity in expressions.

What is the outcome of the following expression, 28 or 40?

3 + 5 * 5

Like in mathematics, the multiplication operator has a higher precedence than
addition operator. So the outcome is 28.

(3 + 5) * 5

To change the order of evaluation, we can use parentheses. Expressions inside
parentheses are always evaluated first. The result of the above expression is
40.

operator_precedence.go
  

package main

import "fmt"

func main() {

    fmt.Println(3 + 5*5)
    fmt.Println((3 + 5) * 5)

    fmt.Println(!true || true)
    fmt.Println(!(true || true))
}

In this code example, we show a few expressions. The outcome of each expression
is dependent on the precedence level.

fmt.Println(3 + 5*5)

This line prints 28. The multiplication operator has a higher precedence
than addition. First, the product of 5 * 5 is calculated,
then 3 is added.

fmt.Println((3 + 5) * 5)

The evaluation of the expression can be altered by using round brackets. In this
case, the 3 + 5 is evaluated and later the value is multiplied by
5. This line prints 40.

fmt.Println(!true || true)

In this case, the negation operator has a higher precedence than the bitwise or.
First, the initial true value is negated to false, then the
| operator combines false and true, which gives true in the end.

$ go run precedence.go 
28
40
true
false

## Associativity rule

Sometimes the precedence is not satisfactory to determine the outcome of an
expression. There is another rule called *associativity*. The
associativity of operators determines the order of evaluation of operators with
the same precedence level.

9 / 3 * 3

What is the outcome of this expression, 9 or 1? The multiplication,
deletion, and the modulo operator are left to right associated.
So the expression is evaluated this way: (9 / 3) * 3
and the result is 9.

Arithmetic, boolean and relational operators are left to right associated. The
ternary operator, increment, decrement, unary plus and minus, negation, bitwise
not, type cast, object creation operators are right to left associated.

associativity.go
  

package main

import "fmt"

func main() {

    var j = 0

    j *= 3 + 1

    fmt.Println(j)
}

In the code example, we the associativity rule determines the outcome of
the expression.

var j = 0

j *= 3 + 1

The compound assignment operators are right to left associated. We might expect
the result to be 1. But the actual result is 0. Because of the associativity.
The expression on the right is evaluated first and then the compound assignment
operator is applied.

## Source

[The Go Programming Language Specification](https://go.dev/ref/spec)

In this article we have covered Go operators.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).