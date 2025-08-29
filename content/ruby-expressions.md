+++
title = "Ruby expressions"
date = 2025-08-29T20:03:08.957+01:00
draft = false
description = "In this part of the Ruby tutorial, we cover expressions. Expressions are constructed from operands and operators."
image = ""
imageBig = ""
categories = ["lang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../strings/)
[Next](../flowcontrol/)

# Ruby expressions

last modified October 18, 2023

In this part of the Ruby tutorial, we cover expressions.

Expressions are constructed from operands and operators. The operators of
an expression indicate which operations to apply to the operands.
The order of evaluation of operators in an expression is determined by the
*precedence* and *associativity* of the operators.

An *operator* is a special symbol which indicates
a certain process is carried out. Operators in programming languages are
taken from mathematics. Programmers work with data. The operators are used
to process data. An *operand* is one of the inputs
(arguments) of an operator.

## Ruby operators

The following table shows common Ruby operators ordered by
precedence (highest precedence first):

  
    Category
    Symbol
  
  
    Resolution, access operators
    :: .
  
  
    Array operators
    [ ] [ ]=
  
  
    Exponentiation
    **
  
  
    Not, complement, unary plus, minus
    ! ~ + -
  
  
    Multiply, divide, modulo
    * / %
  
  
    Addition, substraction
    + -
  
  
    Shift operators
    &lt;&lt; &gt;&gt;
  
  
    Bitwise and
    &amp;
  
  
    Bitwise or, logical or
    ^ |
  
  
    Relational operators
    &gt;  &gt;=  &lt;  &lt;=
  
  
    Bitwise or, logical or
    ^ |
  
  
    Equality, pattern match operators
    &lt;=&gt; == === != =~ !~
  
  
    Logical and
    &amp;&amp;
  
  
    Logical or
    ||
  
  
    Range operators
    .. ...
  
  
    Ternary
    ?:
  
  
    Assignment operators
    =   +=   -=   *=  **= /=   %=   &amp;=   |=
    ^=   &lt;&lt;=   &gt;&gt;= ||= &amp;&amp;=
  
  
    Alternate negation
    not
  
  
    Alternate logical or, and 
    or and
  

Operators on the same row of the table have the same precedence.

An operator usually has one or two operands. Those operators that work
with only one operand are called *unary operators*.
Those who work with two operands are called *binary operators*.
There is also one ternary operator ?:, which works with
three operands.

Certain operators may be used in different contexts. For example the + operator.
From the above table we can see that it is used in different cases.
It adds numbers, concatenates strings, indicates the sign
of a number. We say that the operator is *overloaded*.

## Ruby sign operators

There are two sign operators: + and -.
They are used to indicate or change the sign of a value.

sign_operators.rb
  

#!/usr/bin/ruby

puts +2
puts -2

The + and - signs indicate the sign of a value. The plus sign can be used to
indicate that we have a positive number. It can be omitted and it is mostly done
so.

In the following example, we work with a minus sign.

minus_oper.rb
  

#!/usr/bin/ruby

a = 1

puts a
puts -(a)
puts -(-(a))

The minus sign changes the sign of a value.

$ ./minus_oper.rb
1
-1
1

## Ruby assignment operator

The assignment operator = assigns a value to a variable. A *variable*
is a placeholder for a value. In mathematics, the = operator has
a different meaning. In an equation, = operator is an equality
operator. The left side of the equation is equal to the right one.

x = 1
puts x # prints 1

Here we assign a number to the x variable.

x = x + 1
puts x # prints 2

The previous expression does not make sense in mathematics. But it is
legal in programming. The expression adds 1 to the x variable.
The right side is equal to 2 and 2 is assigned to x.

3 = x;

This code example results in syntax error. We cannot assign a value to a literal.

## Ruby resolution, member access operators

These two operators have the highest precedence level in the hierarchy
of the operators. Which means that they are always evaluated first.

resolution.rb
  

#!/usr/bin/ruby

class MyMath
    Pi = 3.1415926535
end

module People
    Name = "People"
end

puts MyMath::Pi
puts People::Name

In the first example, we present the :: namespace resolution
operator. It allows to access a constant, module, or class defined inside
another class or module. It is used to provide namespaces so that method and
class names don't conflict with other classes by different authors.

class MyMath
    Pi = 3.1415926535
end

module People
    Name = "People"
end

We have a simple module and a class. Each has one constant defined.

puts MyMath::Pi
puts People::Name

We use the :: operator to access constants from both.

$ ./resolution.rb
3.1415926535
People

The dot . operator is a member access operator. It is used to
call methods of objects.

member_access.rb
  

#!/usr/bin/ruby

class Person

   def initialize name, age
       @name = name
       @age = age
   end

   def info
       "#{@name} is #{@age} years old"
   end

end

p = Person.new "Jane", 17
puts p.info

puts "ZetCode".reverse

In our example, we have two objects. One user defined and one
predefined. We use the dot operator to work with these objects.

p = Person.new "Jane", 17
puts p.info

In these two lines, the dot operator calls two methods: new and info.

puts "ZetCode".reverse

A string is a built-in object, which has a reverse method. This is being called.

$ ./member_access.rb
Jane is 17 years old
edoCteZ

## Ruby concatenating strings

In Ruby the + operator is also used to concatenate strings.
When an operator is used in different contexts differently, we say that
it is *overloaded*.

catstrings.rb
  

#!/usr/bin/ruby

puts "Return " + "of " + "the " + "King"
puts "Return ".+"of ".+ "the ".+"King"

We join three strings together using string concatenation operator.

puts "Return " + "of " + "the " + "King"

We join four strings using + operator.

puts "Return ".+"of ".+ "the ".+"King"

Under the hood, the + operator is a Ruby method. The string
literal is an object. We call a method of an object using the access
. operator.

$ ./catstrings.rb
Return of the King
Return of the King

And this is what we get, when we run the catstrings.rb program.

## Ruby increment, decrement operators

Ruby has no such operators.

x++;
x = x + 1;
...
y--;
y = y - 1;

These are increment, decrement operators in C.

If you are familiar with Java, C, C++, you know these operators. They are not
available in Ruby. Python language does not have them too.

## Ruby arithmetic operators

The following is a table of arithmetic operators in Ruby.

SymbolName

+Addition
-Subtraction
*Multiplication
/Division
%Remainder
**Power

In the next example, we use arithmetic operations.

arithmetic.rb
  

#!/usr/bin/ruby

a = 10
b = 11
c = 12

puts a + b + c
puts c - a
puts a * b
puts c / 3
puts c % a
puts c ** a

In the preceding example, we use addition, subtraction, multiplication, division
and remainder operations. This is all familiar from the mathematics.

puts c % a

The % operator is called the remainder or the modulo operator. It finds the
remainder of division of one number by another. For example, 9 % 4,
9 modulo 4 is 1, because 4 goes into 9 twice with a remainder of 1.

$ ./arithmetic.rb
33
2
110
4
2
61917364224

Next we show the distinction between integer and floating point division.

division.rb
  

#!/usr/bin/ruby

puts 5 / 2

puts 5 / 2.0
puts 5.0 / 2
puts 5.to_f / 2

In the preceding example, we divide two numbers.

puts 5 / 2

Both operands in the expression are integers. We have done integer division.
The returned value of the division operation is an integer. When we divide
two integers the result is an integer.

puts 5 / 2.0
puts 5.0 / 2
puts 5.to_f / 2

If one of the values is a a float (or both), we perform a
floating point division. A floating point
value has a decimal point. We can also call a to_f
method to convert an integer to a float.

$ ./division.rb
2
2.5
2.5
2.5

Here we see the result of the division.rb program.

Ruby has other ways to perform divisions. These are available as method
calls.

division2.rb
  

#!/usr/bin/ruby

puts 5.div 2.0
puts 5.fdiv 2
puts 5.quo 2
puts 5.0.quo 2.0

In the above example, we have a div, a fdiv and
a quo methods.

puts 5.div 2.0

The div method always performs integer division. Even if the operands
are floating point values.

puts 5.fdiv 2

The fdiv method always performs float division.

puts 5.quo 2
puts 5.0.quo 2.0

The quo method performs the most accurate division.
It returns a float if either operand is float, otherwise rational.

$ ./division2.rb
2
2.5
5/2
2.5

## Ruby Boolean operators

In Ruby, we have the following logical operators.
Boolean operators are also called logical.

SymbolName

&amp;&amp;logical and
||logical or
!negation

Boolean operators deal with truth values. Ruby has additional alternative
boolean operators. These are and, or &amp;
not. They do the same except for the thing that they have a
lower precedence level. This duplicity is taken from the Perl language,
where there was a need for boolean operators with a lower precedence.

boolean_operators.rb
  

#!/usr/bin/ruby

x = 3
y = 8

puts x == y
puts y &gt; x

if y &gt; x then
    puts "y is greater than x"
end

Many expressions result in a boolean value. Boolean values are used
in conditional statements.

puts x == y
puts y &gt; x

Relational operators always result in a boolean value. These two lines
print false and true.

if y &gt; x then
    puts "y is greater than x"
end

The body of the if statement is executed only if the condition
inside the parentheses is met. The expression x &gt; y returns true,
so the message "y is greater than x" is printed to the terminal.

The next example shows the logical and operator.

and_operator.rb
  

#!/usr/bin/ruby

puts true &amp;&amp; true
puts true &amp;&amp; false
puts false &amp;&amp; true
puts false &amp;&amp; false

The and operator evaluates to true only if both
operands are true.

$ ./and_operator.rb
true
false
false
false

Only one of the expressions results in true.

The logical or || operator evaluates to true if either
of the operands is true.

or_operator.rb
  

#!/usr/bin/ruby

puts true || true
puts true || false
puts false || true
puts false || false

If one of the sides of the operator is true, the outcome of
the operation is true.

$ ./or_operator.rb
true
true
true
false

Three expressions result in a boolean true.

The negation ! makes true false and false true.

negation.rb
  

#!/usr/bin/ruby

puts !0
puts !1
puts !true
puts !false

puts ! (4&lt;3)
puts ! "Ruby".include?("a")

The example shows the negation operator in action.

$ ./negation.rb
false
false
false
true
true
true

The ||, and &amp;&amp; operators are short circuit
evaluated. *Short circuit evaluation* means that the second argument is
only evaluated if the first argument does not suffice to determine the value of
the expression: when the first argument of the logical and evaluates to false,
the overall value must be false; and when the first argument of logical or
evaluates to true, the overall value must be true. Short circuit evaluation is
used mainly to improve performance.

An example may clarify this a bit more.

short_circuit.rb
  

#!/usr/bin/ruby

def one
    puts "Inside one"
    false
end

def two
    puts "Inside two"
    true
end

puts "Short circuit"

if one &amp;&amp; two
    puts "Pass"
end

puts "##############################"

if two || one
    puts "Pass"
end

We have two methods in the example. They are used as operands
in boolean expressions. We see if they are called or not.

if one &amp;&amp; two
    puts "Pass"
end

The one method returns false. The short circuit &amp;&amp;
does not evaluate the second method. It is not necessary. Once an operand is
false, the result of the logical conclusion is always
false. Only "Inside one" is only printed to the console.

puts "##############################"

if two || one
    puts "Pass"
end

In the second case, we use the || operator and use the two
method as the first operand. In this case, "Inside two" and "Pass" strings
are printed to the terminal. It is again not necessary to evaluate the second
operand, since once the first operand evaluates to true, the
logical or is always true.

$ ./short_circuit.rb
Short circuit
Inside one
##############################
Inside two
Pass

We see the result of the shortcircuit.rb program.

## Ruby elational Operators

Relational operators are used to compare values. These operators always
result in boolean value.

    
        SymbolMeaning
    
    
        &lt;less than
    
    
        &lt;=less than or equal to
    
    
        &gt;
        greater than
    
    
        &gt;=greater than or equal to
    

Relational operators are also called comparison
operators.

relational.rb
  

#!/usr/bin/ruby

p 3 &lt; 4
p 3 &gt; 5
p 3 &gt;= 3

The 3 &lt; 4 expression returns true, since 3 is smaller than 4.
The 3 &gt; 5 expression returns false because it is not true
that 3 is greater than 5.

## Ruby bitwise operators

Decimal numbers are natural to humans. Binary numbers are native to computers.
Binary, octal, decimal, or hexadecimal symbols are only notations of the same
number. Bitwise operators work with bits of a binary number.

SymbolMeaning

~bitwise negation
^bitwise exclusive or
&amp;bitwise and
|bitwise or
&lt;&lt;left shift
&gt;&gt;right shift

Bitwise operators are seldom used in higher level languages like Ruby.

bitwise.rb
  

#!/usr/bin/ruby

puts ~ 7   # prints -8
puts ~ -8  # prints 7

puts 6 &amp; 3  # prints 2
puts 3 &amp; 6  # prints 2

puts 6 ^ 3  # prints 5
puts 3 ^ 6  # prints 5

puts 6 | 3  # prints 7
puts 3 | 6  # prints 7

puts 6 &lt;&lt; 1  # prints 12
puts 1 &lt;&lt; 6  # prints 64

puts 6 &gt;&gt; 1  # prints 3
puts 1 &gt;&gt; 6  # prints 0

In the above code example, we show all 6 operators.

puts ~ 7   # prints -8
puts ~ -8  # prints 7

The *bitwise negation operator* changes each 1 to 0 and 0 to 1.
The operator reverts all bits of a number 7. One of the bits also determines,
whether the number is negative or not. If we negate all the bits one more
time, we get number 7 again.

puts 6 &amp; 3  # prints 2
puts 3 &amp; 6  # prints 2

The *bitwise and operator* performs bit-by-bit comparison between
two numbers. The result for a bit position is 1 only if both corresponding
bits in the operands are 1.

puts 6 ^ 3  # prints 5
puts 3 ^ 6  # prints 5

The *bitwise exclusive or operator* performs bit-by-bit comparison
between two numbers. The result for a bit position is 1 if one or the other (but
not both) of the corresponding bits in the operands is 1.

puts 6 | 3  # prints 7
puts 3 | 6  # prints 7

The *bitwise or operator* performs bit-by-bit comparison between two
nubmers. The result for a bit position is 1 if either of the corresponding bits
in the operands is 1.

puts 6 &lt;&lt; 1  # prints 12
puts 1 &lt;&lt; 6  # prints 64

puts 6 &gt;&gt; 1  # prints 3
puts 1 &gt;&gt; 6  # prints 0

The *bitwise shift operators* shift bits to the right or left.
These operators are also called arithmetic shift. 

## Ruby compound assignment operators

The compound assignment operators consist of two operators.
They are shorthand operators.

compound.rb
  

#!/usr/bin/ruby

a = 0

a = a + 1
a += 1
puts a

b = 0

b = b - 8
b -= 8
puts b

The += and -= compound operators are one of these
shorthand operators. They are less readable than the full expressions but
experienced programmers often use them.

a = a + 1
a += 1

These two lines do the same; they add 1 to the a variable.

Other compound operators are:

-=   *=  **=  /=   %=   &amp;=   |=   &lt;&lt;=   &gt;&gt;=

## Ruby operator precedence

The *operator precedence* tells us which operators are evaluated first.
The precedence level is necessary to avoid
ambiguity in expressions.

What is the outcome of the following expression, 28 or 40?

3 + 5 * 5

Like in mathematics, the multiplication operator has a higher
precedence than addition operator. So the outcome is 28.

(3 + 5) * 5

To change the order of evaluation, we can use parentheses. Expressions inside
parentheses are always evaluated first.

precedence.rb
  

#!/usr/bin/ruby

puts 3 + 5 * 5
puts (3 + 5) * 5

puts ! true | true
puts ! (true | true)

In this code example, we show some common expressions. The outcome of each
expression is dependent on the precedence level.

puts 3 + 5 * 5

This line prints 28. The multiplication operator has a higher precedence
than addition. First the product of 5*5 is calculated. Then 3 is added.

puts ! true | true

In this case, the negation operator has a higher precedence. First,
the first true value is negated to false, than the | operator
combines false and true, which gives true in the end.

$ ./precedence.rb
28
40
true
false

## Ruby associativity

Sometimes the precedence is not satisfactory to determine the outcome
of an expression. There is another rule called
*associativity*. The associativity of operators determines
the order of evaluation of operators with the *same*
precedence level.

9 / 3 * 3

What is the outcome of this expression, 9 or 1? The multiplication,
deletion and the modulo operator are left to right associated.
So the expression is evaluated this way: (9 / 3) * 3
and the result is 9.

Arithmetic, boolean, relational and bitwise operators are all left
to right associated.

On the other hand, the assignment operator is right associated.

a = b = c = d = 0
print a, b, c, d # prints 0000

If the association was left to right, the previous expression would not be
possible.

The compound assignment operators are right to left associated.

j = 0
j *= 3 + 1
puts j

You might expect the result to be 1. But the actual result is 0, because of the
associativity. The expression on the right is evaluated first and then the
compound assignment operator is applied.

## Ruby range operators

Ruby has two range operators. They are used to quickly create a range
of objects. Most often a range of numbers or letters.

The .. range operator (two dots) creates an inclusive range.
The ... operator (three dots) creates an exclusive range, where
the high value of the range is excluded.

range_operator.rb
  

#!/usr/bin/ruby

p (1..3).to_a
p (1...3).to_a

p ('a' .. 'l').to_a

In the example, we use both range operators to create a range of numbers
and characters.

p (1..3).to_a
p (1...3).to_a

These two lines create two ranges using both range operators. The range
objects are converted to arrays. The first range has values 1, 2, and 3 while
the second range has values 1 and 2.

p ('a' .. 'l').to_a

Here we use the .. range operator to create an array of
letters from 'a' to 'l'.

$ ./range_operator.rb
[1, 2, 3]
[1, 2]
["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l"]

## Ruby ternary operator

The ternary operator ?: is a conditional operator. It is a
convenient operator for cases where we want to pick up one of two values,
depending on the conditional expression.

cond-exp ? exp1 : exp2

If cond-exp is true, exp1 is evaluated and the result is returned. If
the cond-exp is false, exp2 is evaluated and its result is returned.

ternary.rb
  

#!/usr/bin/ruby

age = 32

adult = age &gt;= 18 ? true : false

if adult then
    puts "Adult"
else
    puts "Not adult"
end

In most countries the adulthood is based on your age.
You are adult if you are older than a certain age.
In such a situation we can use a ternary operator.

adult = age &gt;= 18 ? true : false

First, the expression on the right side of the assignment operator
is evaluated. The first phase of the ternary operator
is the condition expression evaluation. So if the age is greater
or equal to 18, the value following the ? character is returned.
If not, the value following the : character is returned.
The returned value is then assigned to the adult variable.

$ ./ternary.rb
Adult

A 32 years old person is adult.

## Calculating prime numbers

We are going to calculate prime numbers.

primes.rb
  

#!/usr/bin/ruby

nums = (4..50).to_a

puts "Prime numbers:"

print "2 3 "

nums.each do |i|

    not_prime = false

    (2..Math.sqrt(i).ceil).each do |j|
        not_prime = true if i % j == 0
    end

    print i, " " unless not_prime

end

puts

In the above example, we deal with several operators. A prime number (or a
prime) is a natural number that has exactly two distinct natural number
divisors: 1 and itself. We pick up a number and divide it by numbers, from 2 up
to the picked up number. Actually, we don't have to try all smaller numbers, we
can divide by numbers up to the square root of the chosen number. The formula
will work. At the core, of the algorithm we use the remainder division operator,
called also a modulo operator.

nums = (4..50).to_a

We calculate primes from these numbers.

print "2 3 "

We skip the calculations for the 2, 3 numbers. They
are primes.

not_prime = false

The not_prime is a flag to indicate that the chosen number is not
a prime. We assume that the chosen number is a prime, untill it is proven
otherwise later.

(2..Math.sqrt(i).ceil).each do |j|
    not_prime = true if i % j == 0
end

We are OK if we only modulo divide by numbers smaller than the square root of a
number in question. If the remainder division operator returns 0 for any of the
i values, then the number in question is not a prime.

print i, " " unless not_prime

We print the number if the not_prime flag is not set.

The above example was meant to demonstrate several operators. There is in fact
an easier way to calculate prime numbers. Ruby has a module for calculating
primes.

primes2.rb
  

#!/usr/bin/ruby

require 'prime'

Prime.each(50) do |i|
    print i, " "
end

puts

An example calculating prime numbers up to 50 using the Ruby prime module.

require 'prime'

We include the prime module.

Prime.each(50) do |i|
    print i, " "
end

We calculate primes up to the upper bound — 50.

$ ./primes2.rb
2 3 5 7 11 13 17 19 23 29 31 37 41 43 47

From this output we see primes between numbers 2 and 50.

In this part of the Ruby tutorial, we covered the expressions.

[Contents](..)
[Previous](../strings/)
[Next](../flowcontrol/)