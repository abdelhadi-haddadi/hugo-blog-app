+++
title = "Dart Operators"
date = 2025-08-29T19:52:09.210+01:00
draft = false
description = "Operators in Dart tutorial explains Dart operators. We show how to use operators to create expressions."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart Operators

last modified June 4, 2025

This tutorial explores Dart operators, demonstrating how they are used to
create expressions for processing data.

An *operator* is a symbol that triggers a specific operation on its
operands. Inspired by mathematics, operators in programming manipulate data.
An *operand* is an input to an operator, typically a value or variable.

Expressions combine operands and operators, with the operators defining the
operations to perform. The evaluation order is governed by operator
*precedence* and *associativity*, ensuring predictable results.

Operators are classified by the number of operands they take. Unary
operators use one operand, while *binary operators* use two.
Some operators, like +, are *overloaded*, performing
different tasks (e.g., adding numbers or concatenating strings) based on
context.

## Dart Minus Sign Operator

The minus sign operator - negates a value, reversing its sign.

main.dart
  

void main() {
  int a = 1;

  print(-a);
  print(-(-a));
}

This example shows the minus sign operator negating a value and then
reversing it back to its original sign.

$ dart main.dart
-1
1

## Dart Assignment Operator

The assignment operator = stores a value in a variable. Unlike
in mathematics, where = denotes equality, in programming it
assigns the right-side value to the left-side variable.

int x = 1;

This assigns the value 1 to the variable x.

x = x + 1;

This increments x by 1, resulting in x equaling 2.
Such expressions are valid in programming but not in mathematics.

3 = x;

This is invalid, as literals like 3 cannot be assigned values, causing a
syntax error.

Dart's null-aware assignment operator ??= assigns a value to a
variable only if it is null, ensuring safe initialization.

main.dart
  

void main() {
  int? x;
  x ??= 6;
  print(x);

  x ??= 3;
  print(x);
}

Since x is initially null, 6 is assigned. The
second assignment is ignored because x is no longer
null.

$ dart main.dart
6
6

### Dart Increment and Decrement Operators

The increment (++) and decrement (--) operators
add or subtract 1 from a variable, offering a concise way to update values.

main.dart
  

void main() {
  var x = 6;

  x++;
  x++;

  print(x);

  x--;
  print(x);
}

This example increments x twice from 6 to 8, then decrements
it to 7, demonstrating both operators.

$ dart main.dart
8
7

These operators can be prefix or postfix, affecting when the value is
updated relative to its use, which may lead to subtle differences in
behavior.

main.dart
  

void main() {
  var r1 = increase(3);
  print(r1);

  var r2 = increase2(3);
  print(r2);
}

int increase(int x) {
  return ++x;
}

int increase2(int x) {
  return x++;
}

The prefix ++x increments before returning, yielding 4. The
postfix x++ returns the original value before incrementing,
yielding 3.

$ dart main.dart
4
3

## Dart Compound Assignment Operators

Compound assignment operators combine an operation with assignment, providing
a shorthand for common updates like addition or multiplication.

a = a + 3;
a += 3;

Both expressions add 3 to a, with += being the
shorthand form. Other compound operators include -=,
*=, /=, ~/=, %=,
&amp;=, |=, ^=, &lt;&lt;=, and
&gt;&gt;=.

main.dart
  

void main() {
  var a = 1;
  a = a + 1;
  print(a);

  a += 5;
  print(a);

  a *= 3;
  print(a);
}

This example shows standard addition, followed by compound addition and
multiplication, resulting in a being updated to 2, 7, and 21.

$ dart main.dart
2
7
21

## Dart Arithmetic Operators

Arithmetic operators perform mathematical operations on numeric operands,
including addition, subtraction, multiplication, and division.

  SymbolName
  +Addition
  -Subtraction
  *Multiplication
  /Division
  ~/Integer division
  %Remainder

The table above lists the arithmetic operators in Dart

main.dart
  

void main() {
  var a = 10;
  var b = 11;
  var c = 12;
  var add = a + b + c;
  var sb = c - a;
  var mult = a * b;
  var div = c / 3;
  var rem = c % a;

  print(add);
  print(sb);
  print(mult);
  print(div);
  print(rem);
}

This example demonstrates addition, subtraction, multiplication, division,
and remainder operations, with % computing the modulo (e.g., 12
% 10 = 2).

$ dart main.dart
33
2
110
4.0
2

The / operator returns a double, while ~/ returns
an integer, distinguishing floating-point and integer division.

main.dart
  

void main() {
  var c = 5 / 2;
  print(c);

  var d = 5 ~/ 2;
  print(d);
}

This shows / returning 2.5 (double) and ~/
returning 2 (integer) for 5 divided by 2.

$ dart main.dart
2.5
2

## Dart Boolean Operators

Boolean operators, also called logical operators, manipulate boolean values
to control program flow, often in conditional statements.

  SymbolName
  &amp;&amp;Logical AND
  ||Logical OR
  !Negation

The table above lists the boolean operators in Dart.

main.dart
  

void main() {
  var x = 3;
  var y = 8;

  print(x == y);
  print(y &gt; x);

  if (y &gt; x) {
    print("y is greater than x");
  }
}

This example uses comparison operators to produce boolean results, which
drive an if statement, printing a message when true.

$ dart main.dart
false
true
y is greater than x

The logical AND (&amp;&amp;) operator returns true only if both
operands are true.

main.dart
  

void main() {
  var a = true &amp;&amp; true;
  var b = true &amp;&amp; false;
  var c = false &amp;&amp; true;
  var d = false &amp;&amp; false;

  print(a);
  print(b);
  print(c);
  print(d);
}

This demonstrates &amp;&amp;, with only the first case yielding true.

$ dart main.dart
true
false
false
false

The logical OR (||) operator returns true if at least one
operand is true.

main.dart
  

void main() {
  var a = true || true;
  var b = true || false;
  var c = false || true;
  var d = false || false;

  print(a);
  print(b);
  print(c);
  print(d);
}

Three of the four cases yield true, as only both false operands result in
false.

$ dart main.dart
true
true
true
false

The negation operator ! inverts a boolean value.

main.dart
  

void main() {
  print(!true);
  print(!false);
  print(!(4 &lt; 3));
}

This shows ! flipping true to false and evaluating an
expression to true.

$ dart main.dart
false
true
true

## Dart Comparison Operators

Comparison operators, also known as relational operators, compare values and
return a boolean result, essential for decision-making in code.

  SymbolMeaning
  &lt;Less than
  &lt;=Less than or equal to
  &gt;Greater than
  &gt;=Greater than or equal to
  ==Equal to
  !=Not equal to

The table above lists the comparison operators in Dart.

main.dart
  

void main() {
  print(3 &lt; 4);
  print(3 == 4);
  print(4 &gt;= 3);
  print(4 != 3);
}

This example compares integers using == for equality (unlike
some languages that use =), yielding boolean results.

$ dart main.dart
true
false
true
true

## Dart Bitwise Operators

Bitwise operators manipulate binary representations of numbers, performing
bit-by-bit operations, useful for low-level tasks like flag management.

  SymbolMeaning
  &amp;Bitwise AND
  |Bitwise OR
  ^Bitwise XOR
  ~Bitwise NOT
  &lt;&lt;Left shift
  &gt;&gt;Right shift

The bitwise AND (&amp;) yields 1 only when both corresponding bits
are 1.

      00110
   &amp;  00011
   =  00010

For 6 (00110) and 3 (00011), the result is 2 (00010).

main.dart
  

void main() {
  print(6 &amp; 3);
}

```
$ dart main.dart
2

```

The bitwise OR (|) yields 1 if either bit is 1.

      00110
   |  00011
   =  00111

For 6 and 3, the result is 7 (00111).

main.dart
  

void main() {
  print(6 | 3);
}

```
$ dart main.dart
7

```

The bitwise XOR (^) yields 1 if exactly one bit is 1.

      00110
   ^  00011
   =  00101

For 6 and 3, the result is 5 (00101).

main.dart
  

void main() {
  print(6 ^ 3);
}

```
$ dart main.dart
5

```

## Dart Ternary Operator

The ternary operator ?: provides a concise conditional
expression, evaluating one of two expressions based on a boolean condition.

condition ? expr1 : expr2

If the condition is true, expr1 is evaluated; otherwise,
expr2 is evaluated.

main.dart
  

void main() {
  var age = 18;

  var isAdult = (age &gt;= 18) ? true : false;

  if (isAdult) {
    print("he is adult");
  } else {
    print("he is minor");
  }
}

This uses the ternary operator to set isAdult based on age,
then prints a message using an if statement.

$ dart main.dart
he is adult

## Dart Spread Operator

The spread operator ... inserts all elements of a collection
into another, simplifying list, set, or map construction.

main.dart
  

void main() {
  var vals = [1, 2, 3];
  var vals2 = [...vals, 4, 5, 6];

  print(vals);
  print(vals2);
}

This expands vals into vals2, adding more
elements to create a new list.

$ dart main.dart
[1, 2, 3]
[1, 2, 3, 4, 5, 6]

## Dart Cascade Operator

The cascade operator .. allows multiple operations on the same
object, enhancing code fluency and readability.

main.dart
  

class User {
  var fname;
  var lname;
  var occupation;
  String toString() {
    return "$fname $lname is a $occupation";
  }
}

void main() {
  var u = User()
    ..fname = "John"
    ..lname = "Doe"
    ..occupation = "gardener";

  print(u);
}

This initializes a User object's properties using cascades,
then prints its string representation.

$ dart main.dart
John Doe is a gardener

## Dart is &amp; is! Operators

The is and is! operators check an object's type at
runtime, returning true if the type matches or does not match,
respectively.

main.dart
  

class Base {}

class Derived extends Base {}

void main() {
  var b = Base();
  var d = Derived();

  print(d is Base);
  print(d is! Base);
  print(b is Derived);
  print(d is Object);
  print(d is! Object);
}

This checks type relationships, showing inheritance and object type
properties.

$ dart main.dart
true
false
false
true
false

## Dart Null-Aware Operators

Dart's null-aware operators, like ?? and ??=,
handle null values safely, providing defaults or conditional assignments to
prevent null-related errors.

main.dart
  

void main() {
  String? name;
  
  // Null-coalescing operator
  String displayName = name ?? "Guest";
  print(displayName);
  
  // Null-aware assignment
  name ??= "Anonymous";
  print(name);
  
  name ??= "User";
  print(name);
}

The ?? operator provides a default if name is
null, while ??= assigns a value only if the variable is null,
leaving it unchanged otherwise.

$ dart main.dart
Guest
Anonymous
Anonymous

## Dart Conditional Member Access Operator

The conditional member access operator ?. safely accesses
properties or methods of an object, returning null if the object is null,
avoiding runtime errors.

main.dart
  

void main() {
  String? text;
  
  // Conditional member access
  int? length = text?.length;
  print(length);
  
  text = "Hello";
  length = text?.length;
  print(length);
}

This safely accesses the length property, returning null when
text is null and the actual length when non-null.

$ dart main.dart
null
5

## Dart Type Cast Operator

The type cast operator as converts an object to a specific type
at runtime, throwing an exception if the cast is invalid, useful for working
with dynamic or interface types.

main.dart
  

void main() {
  var value = "Dart";
  
  // Type cast
  String text = value as String;
  print(text.toUpperCase());
  
  // Safe cast with is check
  if (value is String) {
    String safeText = value as String;
    print(safeText.length);
  }
}

This casts value to a String, allowing String-specific
operations, and demonstrates a safe cast with a type check.

$ dart main.dart
DART
4

## Dart Operator Precedence

Operator precedence determines the order in which operators are evaluated,
resolving ambiguities in expressions to ensure consistent results.

main.dart
  

void main() {
  print(3 + 5 * 6);
  print((3 + 5) * 6);

  print(!true || true);
  print(!(true || true));
}

Multiplication has higher precedence than addition, so 5 * 6
is evaluated first, yielding 33. Parentheses override this, yielding 48.
Negation precedes ||, affecting logical outcomes.

$ dart main.dart
33
48
true
false

## Dart Operator Precedence Table

The following table lists the operator precedence in Dart, from highest to
lowest. Operators with higher precedence are evaluated before those with lower
precedence. Operators on the same row have equal precedence and are evaluated
according to associativity rules.

PrecedenceOperator(s)Description

1 (highest)[], (), ., ?.Member access, function call
2++, --, ~Postfix increment/decrement, bitwise NOT
3++, --, +, -, !Prefix increment/decrement, unary plus/minus, logical NOT
4*, /, %, ~/Multiplicative
5+, -Additive
6&gt;&gt;, &lt;&lt;Bitwise shift
7&gt;, &lt;, &gt;=, &lt;=, is, is!Relational, type test
8==, !=Equality
9&amp;Bitwise AND
10^Bitwise XOR
11|Bitwise OR
12&amp;&amp;Logical AND
13||Logical OR
14??Null-coalescing
15? :Conditional (ternary)
16=, +=, -=, *=, /=, %=, ~/=, &amp;=, |=, ^=, &lt;&lt;=, &gt;&gt;=, ??=Assignment
17 (lowest),Comma

Refer to this table to understand how Dart evaluates complex expressions and to
avoid unexpected results due to operator precedence.

## Associativity Rule

Associativity determines the evaluation order for operators with equal
precedence. Most operators, like / and *, are
left-to-right, while assignment and unary operators are right-to-left.

main.dart
  

void main() {
  print(9 / 3 * 3);

  var j = 0;
  j *= 3 + 1;
  print(j);
}

The expression 9 / 3 * 3 evaluates left-to-right as
(9 / 3) * 3, yielding 9. The compound assignment
*= is right-to-left, so 3 + 1 is evaluated first,
then multiplied by j.

$ dart main.dart
9.0
0

## Source

[Dart operators - language reference](https://dart.dev/language/operators)

This tutorial covered Dart operators, their roles in expressions, and how
precedence and associativity shape evaluation.

## Author

My name is Jan Bodnar, a passionate programmer with extensive experience.
Since 2007, I have authored over 1,400 articles and 8 e-books, with more
than ten years of teaching programming.

List [all Dart tutorials](/dart/).