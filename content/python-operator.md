+++
title = "Python operator"
date = 2025-08-29T20:09:01.210+01:00
draft = false
description = "Python operator tutorial shows how to work with operators in Python. We define various types of operators and create expressions using operators."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python operator

last modified January 29, 2024

In this article we cover Python operators.

An *operator* is a special symbol which indicates a certain process is
carried out. Operators in programming languages are taken from mathematics.
Applications work with data. The operators are used to process data.

In Python, we have several types of operators:

- Arithmetic operators

- Boolean operators

- Relational operators

- Bitwise operators

An operator may have one or two operands. An *operand* is one of the
inputs (arguments) of an operator. Those operators that work with only one
operand are called *unary operators*. Those who work with two operands
are called binary operators.

The + and - signs can be addition and subtraction operators as well as unary sign
operators. It depends on the situation.

&gt;&gt;&gt; 2
2
&gt;&gt;&gt; +2
2
&gt;&gt;&gt;

The plus sign can be used to indicate that we have a positive number. But
it is mostly not used. The minus sign changes the sign of a value.

&gt;&gt;&gt; a = 1
&gt;&gt;&gt; -a
-1
&gt;&gt;&gt; -(-a)
1

Multiplication and addition operators are examples of binary operators.
They are used with two operands.

&gt;&gt;&gt; 3 * 3
9
&gt;&gt;&gt; 3 + 3
6

## Python assignment operator

The assignment operator = assigns a value to a variable.
In mathematics, the = operator has a different meaning. In
an equation, the = operator is an equality operator. The
left side of the equation is equal to the right one.

&gt;&gt;&gt; x = 1
&gt;&gt;&gt; x
1

Here we assign a number to an x variable.

&gt;&gt;&gt; x = x + 1
&gt;&gt;&gt; x
2

The previous expression does not make sense in mathematics. But it is legal in
programming. The expression means that we add 1 to the x variable.
The right side is equal to 2 and 2 is assigned to x.

&gt;&gt;&gt; a = b = c = 4
&gt;&gt;&gt; print(a, b, c)
4 4 4

It is possible to assign a value to multiple variables.

&gt;&gt;&gt; 3 = y
  File "&lt;stdin&gt;", line 1
SyntaxError: can't assign to literal

This code example results in syntax error. We cannot assign a
value to a literal.

## Python arithmetic operators

The following is a table of arithmetic operators in Python programming language.

SymbolName

+Addition
-Subtraction
*Multiplication
/Division
//Integer division
%Modulo
**Power

The following example shows arithmetic operations.

arithmetic.py
  

#!/usr/bin/python

# arithmetic.py

a = 10
b = 11
c = 12

add = a + b + c
sub = c - a
mult = a * b
div = c / 3

power = a ** 2

print(add, sub, mult, div)
print(power)

All these are known operators from mathematics.

$ ./arithmetic.py
33 2 110 4.0
100

There are three operators dealing with division.

division.py
  

#!/usr/bin/python

# division.py

print(9 / 3)
print(9 / 4)
print(9 // 4)
print(9 % 4)

The example demonstrates division operators.

print(9 / 4)

This results in 2.25. In Python 2.x, the / operator was an integer division
operator. This has changed in Python 3. In Python 3, the / operator returns a
decimal number.

print(9 // 4)

The // operator is an integer operator in Python 3.

print(9 % 4)

The % operator is called the modulo operator. It finds the
remainder of division of one number by another. 9 % 4, 9 modulo 4
is 1, because 4 goes into 9 twice with a remainder of 1.

$ ./division.py
3.0
2.25
2
1

```
&gt;&gt;&gt; 'return' + 'of' + 'the' + 'king'
'returnoftheking'

```

The addition operator can be used to concatenate strings as well.

&gt;&gt;&gt; 3 + ' apples'
Traceback (most recent call last):
  File "&lt;stdin&gt;", line 1, in &lt;module&gt;
TypeError: unsupported operand type(s) for +: 'int' and 'str'

We cannot add integers and strings. This results in a TypeError.

&gt;&gt;&gt; str(3) + ' apples'
'3 apples'

For the example to work, we must convert the number to a string using the
str function.

On the other hand, the multiplication operator can be used with a
string and a number.

&gt;&gt;&gt; 'dollar ' * 5
'dollar dollar dollar dollar dollar '

## Python Boolean operators

In Python, we have and, or and not
boolean operators. With boolean operators we perform logical operations. These
are most often used with if and while keywords.

andop.py
  

#!/usr/bin/python

# andop.py

print(True and True)
print(True and False)
print(False and True)
print(False and False)

This example shows the logical and operator. The logical and operator evaluates
to True only if both operands are True.

$ ./andop.py
True
False
False
False

The logical or operator evaluates to True if either of the operands
is True.

orop.py
  

#!/usr/bin/python

# orop.py

print(True or True)
print(True or False)
print(False or True)
print(False or False)

If one of the sides of the operator is True, the outcome of the
operation is True.

$ ./orop.py
True
True
True
False

The *negation* operator not makes True
False and False True.

negation.py
  

#!/usr/bin/python

# negation.py

print(not False)
print(not True)
print(not ( 4 &lt; 3 ))

The example shows the not operator in action.

$ ./negation.py
True
False
True

And, or operators are short circuit evaluated. *Short circuit evaluation*
means that the second argument is only evaluated if the first argument does not
suffice to determine the value of the expression: when the first argument of and
evaluates to false, the overall value must be false; and when the first argument
of or evaluates to true, the overall value must be true.

The following example demonstrates the short curcuit evaluation.

short_circuit.py
  

#!/usr/bin/python

# short_circuit.py

x = 10
y = 0

if (y != 0 and x/y &lt; 100):
      print("a small value")

The first part of the expression evaluates to False. The second
part of the expression is not evaluated. Otherwise, we would get a
ZeroDivisionError.

## Python relational operators

Relational operators are used to compare values. These operators always result
in a boolean value.

SymbolMeaning

&lt;strictly less than
&lt;=less than or equal to
&gt;greater than
&gt;=greater than or equal to
==equal to
!=not equal to
isobject identity
is notnegated object identity

The above table shows Python relational operators.

&gt;&gt;&gt; 3 &lt; 4
True
&gt;&gt;&gt; 4 == 3
False
&gt;&gt;&gt; 4 &gt;= 3
True

As we already mentioned, the relational operators return boolean values:
True or False.

Notice that the relational operators are not limited to numbers. We can use them
for other objects as well. Although they might not always be meaningful.

&gt;&gt;&gt; "six" == "six"
True
&gt;&gt;&gt; 'a' &lt; 'b'
True

We can compare string objects, too.

&gt;&gt;&gt; 'a' &lt; 'b'

What exactly happens here? Computers do not know characters or strings. For
them, everything is just a number. Characters are special numbers stored in
specific tables, like ASCII.

&gt;&gt;&gt; 'a' &gt; 6
Traceback (most recent call last):
  File "&lt;stdin&gt;", line 1, in &lt;module&gt;
TypeError: unorderable types: str() &gt; int()

It is not possible to use relational operators on different data types.
This code leads to a TypeError.

compare.py
  

#!/usr/bin/python

# compare.py

print('a' &lt; 'b')

print("a is:", ord('a'))
print("b is:", ord('b'))

Internally, the a and b characters are numbers. So when we compare two characters,
we compare their stored numbers. The built-in ord function
returns the ASCII value of a single character.

$ ./compare.py
True
a is: 97
b is: 98

In fact, we compare two numbers: 97 and 98.

&gt;&gt;&gt; "ab" &gt; "aa"
True

Say we have a string with more characters. If the first characters are equal, we
compare the next ones. In our case, the b character at the second position has a
greater value than the a character. That is why "ab" string is greater than "aa"
string. Comparing strings in such a way does not make much sense, of course. But
it is technically possible.

## Python object identity operators

The object identity operators, is and not is, check
if its operatos are the same object.

object_identity.py
  

#!/usr/bin/python

# object_identity.py

print(None == None)
print(None is None)

print(True is True)

print([] == [])
print([] is [])

print("Python" is "Python")

The == operator tests for equality while the is
operator tests for object identity. Whether we are talking about the same
object. Note that more variables may refer to the same object.

$ ./object_identity.py
True
True
True
True
False
True

The output might be surprising for you. In Python language, there is only one
None and one True object. That's why True
is equal and also identical to True. There is only one truth out
there, anyway. The empty list [] is equal to another empty list []. But they are
not identical. Python has put them into two different memory locations. They are
two distinct objects. Hence the is operator returns False.

On the other hand, "Python" is "Python" returns True. This is
because of optimization: if two string literals are equal, they have been put to
same memory location. Since a string is an immutable entity, no harm can be
done.

## Python membership operators

The membership operators, in and not in, test for
membership in a sequence, such as strings, lists, or tuples.

membership.py
  

#!/usr/bin/python

# membership.py

items = ("coin", "book", "pencil", "spoon", "paper")

if "coin" in items:
    print("There is a coin in the tuple")
else:
    print("There is no coin in the tuple")

if "bowl" not in items:
    print("There is no bowl in the tuple")
else:
    print("There is a bowl in the tuple")

With the membership operators, we test if a item is present in a tuple.

if "coin" in items:

With the in operator, we check if "coin"
is present in the items tuple.

if "bowl" not in items:

With the not in operator, we check if "bowl"
is not present in the items tuple.

$ ./membership.py
There is a coin in the tuple
There is no bowl in the tuple

## Python ternary operator

A ternary operator is a simple terse conditional assignment statement.

exp1 if condition else exp2

If condition is true, exp1 is evaluated and the result is returned. If the
condition is false, exp2 is evaluated and its result is returned.

ternary.py
  

#!/usr/bin/python

# ternary.py

age = 31

adult = True if age &gt;= 18 else False

print("Adult: {0}".format(adult))

In many countries the adulthood is based on your age. You are adult if you are
older than a certain age. This is a situation for a ternary operator.

adult = True if age &gt;= 18 else False

First the condition is evaluated. If the age is greater or equal to 18,
True is returned. If not, the value following the else
keyword is returned. The returned value is then assigned to the
adult variable.

$ ./ternary.py
Adult: True

A 31 years old person is adult.

## Python bitwise operators

Decimal numbers are natural to humans. Binary numbers are native to computers.
Binary, octal, decimal or hexadecimal symbols are only notations of the same
number. Bitwise operators work with bits of a binary number. We have binary
logical operators and shift operators. Bitwise operators are seldom used in
higher level languages like Python.

SymbolMeaning

~bitwise negation
^bitwise exclusive or
&amp;bitwise and
|bitwise or
&lt;&lt;left shift
&gt;&gt;right shift

The *bitwise negation operator* changes each 1 to 0 and 0 to 1.

&gt;&gt;&gt; ~7
-8
&gt;&gt;&gt; ~-8
7

The operator reverts all bits of a number 7. One of the bits also determines,
whether the number is negative or not. If we negate all the bits one more time,
we get number 7 again.

The *bitwise and operator* performs bit-by-bit comparison between two
numbers. The result for a bit position is 1 only if both corresponding bits in
the operands are 1.

     00110
  &amp;  00011
   = 00010

The first number is a binary notation of 6, the second is 3 and the
final result is 2.

&gt;&gt;&gt; 6 &amp; 3
2
&gt;&gt;&gt; 3 &amp; 6
2

The *bitwise or operator* performs bit-by-bit comparison between two
numbers. The result for a bit position is 1 if either of the corresponding bits
in the operands is 1.

     00110
  |  00011
   = 00111

The result is 00110 or decimal 7.

&gt;&gt;&gt; 6 | 3
7

The *bitwise exclusive or operator* performs bit-by-bit comparison
between two numbers. The result for a bit position is 1 if one or the other (but
not both) of the corresponding bits in the operands is 1.

     00110
  ^  00011
   = 00101

The result is 00101 or decimal 5.

&gt;&gt;&gt; 6 ^ 3
5

As we mentioned, bitwise operators are seldom used in Python and other high
level languages. Yet there are some situations, where they are used. One example
is a *mask*. A mask is a specific bit pattern. It determines whether some
property is set or not.

Let's have an example from GUI programming.

bitwise_or.py
  

#!/usr/bin/python

# bitwise_or.py

import wx

app = wx.App()
window = wx.Frame(None, style=wx.MAXIMIZE_BOX | wx.RESIZE_BORDER
	| wx.SYSTEM_MENU | wx.CAPTION |	 wx.CLOSE_BOX)
window.Show(True)

app.MainLoop()

This is a small example of a wxPython code. The wx.MAXIMIZE_BOX,
wx.RESIZE_BORDER, wx.SYSTEM_MENU, wx.CAPTION,
and wx.CLOSE_BOX are constants. The bitwise or operator
adds all these constants to the mask. In our case, all these properties are
set using the bitwise or operator and applied to the wx.Frame widget.

Finally, we also have bitwise shift operators. The *bitwise shift operators*
shift bits to the right or left.

number &lt;&lt; n : multiply number 2 to the nth power
number &gt;&gt; n : divide number by 2 to the nth power

These operators are also called arithmetic shift.

     00110
  &gt;&gt; 00001
   = 00011

We shift each of the bits of number six to the right. It is equal to dividing
the six by 2. The result is 00011 or decimal 3.

&gt;&gt;&gt; 6 &gt;&gt; 1
3

```
     00110
  &lt;&lt; 00001
   = 01100

```

We shift each of the bits of number six to the left. It is equal to multiplying
the number six by 2. The result is 01100 or decimal 12.

&gt;&gt;&gt; 6 &lt;&lt; 1
12

## Python compound assignment operators

The compound assignment operators consist of two operators. They are
shorthand operators.

&gt;&gt;&gt; i = 1
&gt;&gt;&gt; i = i + 1
&gt;&gt;&gt; i
2
&gt;&gt;&gt; i += 1
&gt;&gt;&gt; i
3

The += compound operator is one of these shorthand operators.

Other compound operators are:

-=   *=   /=   //=   %=   **=   &amp;=   |=   ^=   &gt;&gt;=   &lt;&lt;=

## Python operator precedence

The *operator precedence* tells us which operators are evaluated first.
The precedence level is necessary to avoid ambiguity in expressions.

What is the outcome of the following expression, 28 or 40?

3 + 5 * 5

Like in mathematics, the multiplication operator has a higher precedence than
addition operator. So the outcome is 28.

(3 + 5) * 5

To change the order of evaluation, we can use square brackets. Expressions
inside square brackets are always evaluated first.

The following list shows operator precedence in Python.

unary +  -  ~
**
*  /  %
+  -
&gt;&gt;  &lt;&lt;
&amp;
^
|
&lt;  &lt;=  ==  &gt;=  &gt;  !=  is
not
and
or

The operators on the same row have the same level of precedence. The
precedence grows from bottom to top.

precedence.py
  

#!/usr/bin/python

# precedence.py

print(3 + 5 * 5)
print((3 + 5) * 5)

print(2 ** 3 * 5)
print(not True or True)
print(not (True or True))

In this code example, we show some common expressions. The outcome of
each expression is dependent on the precedence level.

print(2 ** 3 * 5)

The power operator has higher precedence than the multiplication operator.
First, the 2 ** 3 is evaluated, which returns 8. Then the outcome
is multiplied by 5 and the result is 40.

print(not True or True)

In this case, the not operator has a higher precedence. First, the
first True value is negated to False, then the
or operator combines False and True,
which gives True in the end.

$ ./precedence.py
28
40
40
True
False

The relational operators have a higher precedence than logical operators.

positive.py
  

#!/usr/bin/python

# positive.py

a = 1
b = 2

if (a &gt; 0 and b &gt; 0):
   print("a and b are positive integers")

The and operator awaits two boolean values. If one of the operands
would not be a boolean value, we would get a syntax error. In Python, the
relational operators are evaluated before the logical and.

$ ./positive.py
a and b are positive integers

## Python associativity rule

Sometimes the precedence is not satisfactory to determine the outcome of
an expression. There is another rule called *associativity*. The associativity
of operators determines the order of evaluation of operators with the *same*
precedence level.

9 / 3 * 3

What is the outcome of this expression, 9 or 1? The multiplication, deletion,
and the modulo operator are left to right associated. So the expression is
evaluated this way: (9 / 3) * 3 and the result is 9.

Arithmetic, boolean, relational and bitwise operators are all left
to right associated.

On the other hand, the assignment operator is right associated.

&gt;&gt;&gt; a = b = c = d = 0
&gt;&gt;&gt; a, b, c, d
(0, 0, 0, 0)

If the association was left to right, the previous expression would not be possible.

The compound assignment operators are right to left associated.

&gt;&gt;&gt; j = 0
&gt;&gt;&gt; j *= 3 + 1
&gt;&gt;&gt; j
0

You might expect the result to be 1. But the actual result is 0. Because of the
associativity. The expression on the right is evaluated first and then the
compound assignment operator is applied.

## Source

[Python expressions - language reference](https://docs.python.org/3/reference/expressions.html)

In this article we have talked about operators in Python.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).