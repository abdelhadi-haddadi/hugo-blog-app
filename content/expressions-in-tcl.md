+++
title = "Expressions in Tcl"
date = 2025-08-29T20:03:14.815+01:00
draft = false
description = "In this chapter of the Tcl tutorial, we cover expressions. In this chapter we work with set, incr, and expr Tcl commands."
image = ""
imageBig = ""
categories = ["lang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../basiccommands/)
[Next](../flowcontrol/)

# Expressions in Tcl

last modified October 18, 2023

In this part of the Tcl tutorial, we talk about expressions.
In Tcl language the expressions are not built into the core language. 
Rather, the expressions are evaluated with the expr command. 

Expressions are constructed from operands and operators. The operators of 
an expression indicate which operations to apply to the operands. 
The order of evaluation of operators in an expression is determined by the 
*precedence* and *associativity* of the operators.

An *operator* is a special symbol which indicates 
a certain process is carried out. Operators in programming languages are 
taken from mathematics. Programmers work with data. The operators are used 
to process data. An *operand* is one of the inputs 
(arguments) of an operator.

The following table shows a set of operators used in the Tcl language:

 
   
    Category 
    Symbol
   
   
    Sign, bit-wise, logical NOT
    -  +  ~  !     
   
  
    Exponentiation 
    ** 
   
   
    Arithmetic
    +   -   *   /   %     
   
  
    Shift 
    &lt;&lt; &gt;&gt; 
   
  
    Relational
    ==   !=   &lt;   &gt;   &lt;=   &gt;= 
   
  
    String comparison
    eq ne 
   
  
    List
    in ni 
   
   
    Bitwise 
    &amp;   |   ^ 
  
   
    Boolean 
    &amp;&amp;   || 
  
  
    Ternary
    ?: 
   

 

An operator usually has one or two operands. Those operators that work 
with only one operand are called *unary operators*. 
Those which work with two operands are called *binary operators*. 
There is also one ternary operator ?:, which works with three operands.

## Basic operators

Basic operators are commonly used operators. These are sign operators, arithmetic
operators, modulo, and exponentiation operators. 

#!/usr/bin/tclsh

puts [expr +2]
puts [expr -2]
puts [expr -(-2)]
puts [expr 2+2]
puts [expr 2-2]
puts [expr 2*2]
puts [expr 2/2]
puts [expr 2/2.0]
puts [expr 2 % 2]
puts [expr 2 ** 2]

The above example shows the usage of common operators in Tcl. 

puts [expr +2]

In this code line we use the plus sign operator. It has no effect on
the number. It merely indicates that the number is positive. It can 
be omitted and most of the time it is. 

puts [expr -2]
puts [expr -(-2)]

The minus operator is compulsory. It says that the number is negative. 
The minus operator changes the sign of the number. In the second line,
the minus operator changes -2 to positive 2. 

puts [expr 2+2]
puts [expr 2-2]
puts [expr 2*2]
puts [expr 2/2]

The above lines show common arithmetic operators in use. 

puts [expr 2 % 2]

The % is the modulo or remainder operator. It finds the remainder of 
division of one number by another. The expression 2 % 2, 
2 modulo 2 is 0 because 2 goes into 2 once with the remainder of 0. 
So the code line prints zero to the console. 

puts [expr 2 ** 2]

This is the exponentiation operator. The code line prints 4 to the
console. 

$ ./exp.tcl
2
-2
2
4
0
4
1
1.0
0
4

## The division operator

Beginning programmers are often confused by division operation.
In many programming languages there are two kinds of division operations:
integer and non-integer. This applies for the Tcl as well. 

% expr 3/2
1
% expr 3/2.0
1.5

Note the difference between the integer and floating point division.
When at least one of the operands is a floating point number, the result is 
a floating point value too. The result is more exact. If both operands
are integers, the result is an integer too. 

## The assignment and increment operators

There is no assignment operator = and no increment and decrement
(++ and --) operators in Tcl. These operators are 
common in other computer languages. Instead of that, Tcl has commands. 

% set a 5
5
% incr a  
6
% incr a
7
% incr a -1
6

The above code shows what commands are used to implement the missing
operators. 

% set a 5

In Python, we would do a = 5. In Tcl, we set a value to 
a variable using the set command. 

% incr a  
6

In C, Java and many other languages, we would increment a variable by
one this way: a++;. In Tcl, we use the incr
command. By default, the value is incremented by 1. 

% incr a -1
6

The above code shows how to decrement a variable by one, which is
accomplished by the -- decrement operator in C-based languages.

## Boolean operators

In Tcl, we have the following logical operators: 

SymbolName

&amp;&amp;logical and
||logical or
!negation

Boolean operators are also called logical. 

#!/usr/bin/tclsh

set x 3
set y 8

puts [expr $x == $y]
puts [expr $y &gt; $x]

if {$y &gt; $x} {

    puts "y is greater than x"
}

Many expressions result in a boolean value. Boolean values are used
in conditional statements. 

puts [expr $x == $y]
puts [expr $y &gt; $x]

Relational operators always result in a boolean value. These two lines
print 0 and 1. In Tcl, 0 is false and any nonzero value is true.

if {$y &gt; $x} {

    puts "y is greater than x"
}

The body of the if command is executed only if the condition 
inside the parentheses is met. The $y &gt; $x returns true, so 
the message "y is greater than x" is printed to the terminal. 

#!/usr/bin/tclsh

puts [expr 0 &amp;&amp; 0]
puts [expr 0 &amp;&amp; 1]
puts [expr 1 &amp;&amp; 0]
puts [expr 1 &amp;&amp; 1]

This example shows the logical and &amp;&amp; operator. 
It evaluates to true only if both operands are true.

$ ./andoperator.tcl 
0
0
0
1

The logical or || operator evaluates to true 
if either of the operands is true.

#!/usr/bin/tclsh

puts [expr 0 || 0]
puts [expr 0 || 1]
puts [expr 1 || 0]
puts [expr 1 || 1]

If one of the sides of the operator is true, the outcome of 
the operation is true. 

$ ./oroperator.tcl 
0
1
1
1

The negation operator ! makes true false and false true. 

#!/usr/bin/tclsh

puts [expr ! 0]
puts [expr ! 1]
puts [expr ! (4&lt;3)]

The example shows the negation operator in action.

$ ./not.tcl 
1
0
1

The || and &amp;&amp; operators 
are short circuit evaluated. *Short circuit evaluation* means 
that the second argument is only evaluated if the first argument does 
not suffice to determine the value of the expression: when the first 
argument of the logical and evaluates to false, the overall value must
be false; and when the first argument of logical or evaluates to true, 
the overall value must be true.
Short circuit evaluation is used mainly to improve performance. 

An example may clarify this a bit more.  

#!/usr/bin/tclsh

proc One {} {
    
    puts "Inside one"
    return false
}

proc Two {} {

    puts "Inside two"
    return true
}

puts "Short circuit"

if { [One] &amp;&amp; [Two] } {

    puts "Pass"
}

puts "###################"

if { [Two] || [One] } {

    puts "Pass"
}

We have two procedures in the example. (Procedures and conditionals will be described
later.) They are used as operands in boolean expressions. We see if they are called or not.

if { [One] &amp;&amp; [Two] } {

    puts "Pass"
}

The One procedure returns false. The short circuit  &amp;&amp;
does not evaluate the second procedure. It is not necessary.
Once an operand is false, the result of the logical conclusion is always
false. Only "Inside one" is printed to the console. 

puts "###################"

if { [Two] || [One] } {

    puts "Pass"
}

In the second case, we use the || operator and use the Two
procedure as the first operand. In this case, "Inside two" and "Pass" 
strings are printed to the terminal. It is again not necessary to evaluate the second
operand, since once the first operand evaluates to true, the 
logical or is always true.

$ ./shortcircuit.tcl
Short circuit
Inside one
###################
Inside two
Pass

Result of the shorcircuit.tcl script.

## Relational operators

Relational operators are used to compare values. These operators always 
result in boolean value. In Tcl 0 stands for false and 1 for true.
Relational operators are also called comparison operators.

SymbolMeaning

&lt;less than
&lt;=less than or equal to
&gt;greater than
&gt;=greater than or equal to
==equal to
!=not equal to

The table presents six Tcl relational expressions.

#!/usr/bin/tclsh

puts [expr 3 &lt; 4]
puts [expr 3 == 4]
puts [expr 4 &gt;= 3]
puts [expr 4 != 3]

In Tcl we use the == operator to compare numbers. Some languages
like Ada, Visual Basic, or Pascal use = for comparing numbers.

$ ./rel.tcl
1
0
1
1

The example prints four boolean values. 

## Bitwise operators

Decimal numbers are natural to humans. Binary numbers are native to computers. 
Binary, octal, decimal, and hexadecimal symbols are only notations of the same number. 
Bitwise operators work with bits of a binary number. Bitwise operators are seldom 
used in higher level languages like Tcl. 

SymbolMeaning

~bitwise negation
^bitwise exclusive or
&amp;bitwise and
|bitwise or

The *bitwise negation operator* changes each 1 to 0 and 0 to 1. 

% puts [expr ~7] 
-8
% puts [expr ~-8]
7

The operator reverts all bits of 7. One of the bits also determines 
whether the number is negative. If we negate all the bits one more 
time, we get number 7 again. 

The *bitwise and operator* performs bit-by-bit comparison between two numbers. 
The result for a bit position is 1 only if both corresponding bits in the operands are 1. 

      00110
   &amp;  00011
   =  00010

The first number is a binary notation of 6, the second is 3, and the result is 2. 

% puts [expr 6 &amp; 3]
2
% puts [expr 3 &amp; 6]
2

The *bitwise or operator* performs bit-by-bit comparison between two numbers. 
The result for a bit position is 1 if either of the corresponding bits in the operands is 1. 

     00110
   | 00011
   = 00111

The result is 00110 or decimal 7. 

% puts [expr 6 | 3]
7
% puts [expr 3 | 6]
7

The *bitwise exclusive or operator* performs bit-by-bit comparison 
between two numbers. The result for a bit position is 1 if one or the other 
(but not both) of the corresponding bits in the operands is 1. 

      00110
   ^  00011
   =  00101

The result is 00101 or decimal 5. 

% puts [expr 6 ^ 3]
5
% puts [expr 3 ^ 6]
5

## The expansion operator

The expansion operator, {*}, makes each item in a list an individual 
argument of the current command. A list is a basic Tcl data structure; it is 
covered in a later chapter.

#!/usr/bin/tclsh

set nums {1 2 3 4 5 6}
puts $nums
puts [tcl::mathfunc::max {*}$nums]
puts [tcl::mathfunc::min {*}$nums]

The expansion operator is used with two mathematical functions.

set nums {1 2 3 4 5 6}

A numerical list called nums is created. A list is an ordered
collection of values.

puts $nums

The contents of the list are printed to the terminal.

puts [tcl::mathfunc::max {*}$nums]

The tcl::mathfunc::max is a standard mathematical function. 
It does not process lists. The numbers should be passed as individual 
arguments. The expansion operator transforms a list of items into 
individual items.

$ ./expansion.tcl 
1 2 3 4 5 6
6
1

Example output.

## Operator precedence

The *operator precedence* tells us which operators are evaluated first. 
The precedence level is necessary to avoid
ambiguity in expressions. 

What is the outcome of the following expression, 28 or 40?

 3 + 5 * 5

Like in mathematics, the multiplication operator has a higher 
precedence than addition operator. So the outcome is 28.

(3 + 5) * 5

We use parentheses to change the order of evaluation.
Expressions inside parentheses are always evaluated first. 

The following table shows common Tcl operators ordered by
precedence (highest precedence first):

 

 
   
    Category 
    Symbol
    Associativity
   
   
    Sign, bit-wise, logical NOT
    -  +  ~  !     
    Left 
   
  
    Exponentiation 
    **
    Left  
   
   
    Arithmetic
    +   -   *   /   %     
    Left 
   
  
    Shift 
    &lt;&lt; &gt;&gt; 
    Left 
   
  
    Relational
    ==   !=   &lt;   &gt;   &lt;=   &gt;= 
    Left 
   
  
    String comparison
    eq ne 
    Left 
   
  
    List
    in ni 
    Left 
   
   
    Bitwise 
    &amp;   |   ^ 
    Left 
  
   
    Boolean 
    &amp;&amp;   || 
    Left 
  
  
    Ternary
    ?: 
    Right 
   

 
 

Operators on the same row of the table have the same precedence.

 

!/usr/bin/tclsh

puts [expr 3 + 5 * 5]
puts [expr (3 + 5) * 5]

puts [expr ! 1 || 1]
puts [expr ! (1 || 1)]

In this code example, we show some common expressions. 
The outcome of each expression depends on the precedence level.

puts [expr 3 + 5 * 5]

This line prints 28. The multiplication operator has a higher precedence
than addition. First, the product of 5*5 is calculated, then 3 is added. 

puts [expr (3 + 5) * 5]

Round brackets can be used to change the precedence level. In the above 
expression, 3 is added to 5 and the result is multiplied by 5. 

puts [expr ! 1 || 1]

In this case, the negation operator has a higher precedence. First, 
the first true (1) value is negated to false (0), than the 
|| operator combines false and true, which gives true in the end. 

$ ./precedence.tcl 
28
40
1
0

Output.

## Associativity

Sometimes the precedence is not satisfactory to determine the outcome 
of an expression. There is another rule called
*associativity*. The associativity of operators determines 
the order of evaluation of operators with the *same*
precedence level. 

9 / 3 * 3

What is the outcome of this expression, 9 or 1? The multiplication, 
deletion, and the modulo operators are left to right associated. 
So the expression is evaluated this way: (9 / 3) * 3 
and the result is 9.

Arithmetic, boolean, relational, and bitwise operators are all left 
to right associated. 

The ternary operator is right associated. 

## The ternary operator

The ternary operator ?: is a conditional operator. It is a 
convenient operator for cases where we want to pick up one of two values, 
depending on the conditional expression.

cond-exp ? exp1 : exp2

If cond-exp is true, exp1 is evaluated and the result is returned. If
the cond-exp is false, exp2 is evaluated and its result is returned.

#!/usr/bin/tclsh

set age 32
set adult [expr $age &gt;= 18 ? true : false]

puts "Adult: $adult"

In most countries the adulthood is based on your age.
You are adult if you are older than a certain age.
This is a situation for a ternary operator.

set adult [expr $age &gt;= 18 ? true : false]

First, the expression on the right side of the assignment
operator is evaluated. The first phase of the ternary operator
is the condition expression evaluation. So if the age is greater
or equal to 18, the value following the ? character is returned.
If not, the value following the : character is returned.
The returned value is then assigned to the adult variable.

$ ./ternary.tcl
Adult: true

A 32 years old person is adult.

## Calculating prime numbers

We are going to calculate prime numbers. Some of the features
(lists, loops) will be covered later in the tutorial.

#!/usr/bin/tclsh

# primes.tcl

set nums { 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16
    17 18 19 20 21 22 23 24 25 26 27 28 29 30 31
}

puts "Prime numbers:"

foreach num $nums {

    if { $num==1 } { continue }

    if { $num==2 || $num==3 } {

        puts -nonewline "$num "
        continue
    }

    set i [expr int(sqrt($num))]
    set isPrime true

    while { $i &gt; 1 } {

        if { $num % $i == 0 } {

            set isPrime false
        }

        incr i -1
    }

    if { $isPrime } {

        puts -nonewline "$num "
    }
}

puts ""

In the above example, we deal with many various operators. A prime 
number (or a prime) is a natural number greater than 1 that has exactly two distinct 
natural number divisors: 1 and itself. We pick up a number and divide 
it by numbers, from 1 up to the picked up number. Actually, we don't have
to try all smaller numbers, we can divide by numbers up to the square
root of the chosen number. The formula will work. We use the remainder 
division operator. 

set nums { 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16
    17 18 19 20 21 22 23 24 25 26 27 28 29 30 31
}

We calculate primes from this list of integers. 

if { $num==1 } { continue }

By definition, 1 is not a prime. The continue command skips
to the next iteration of the loop. 

if { $num==2 || $num==3 } {

    puts -nonewline "$num "
    continue
}

We skip the calculations for the 2 and 3. They are primes and do not require further
computations. Note the usage of the equality and conditional or
operators. The == has a higher precedence than the 
|| operator. So we don not need to use parentheses.

set i [expr int(sqrt($num))]

We are OK if we only try numbers smaller than the square root of
a number in question. 

while { $i &gt; 1 } {

    if { $num % $i == 0 } {

        set isPrime false
    }

    incr i -1
}

In this while loop, the i is the calculated square root
of the number. We use the incr command to 
to decrease i by one each loop cycle. When the i is smaller than
1, the loop is ended. For example, we have number 9.
The square root of 9 is 3. We divide the 9 number by
3 and 2. This is sufficient for our calculation.

if { $isPrime } {
      
    puts -nonewline "$num "
}

If the remainder division operator returns 0 for any of the i values, 
then the number in question is not a prime.

$ ./primes.tcl 
Prime numbers:
2 3 5 7 11 13 17 19 23 29 31 

In this part of the Tcl tutorial, we covered Tcl expressions. 

[Contents](..) 
[Previous](../basiccommands/)
[Next](../flowcontrol/)