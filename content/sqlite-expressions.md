+++
title = "SQLite expressions"
date = 2025-08-29T19:52:54.771+01:00
draft = false
description = "In this part of the SQLite tutorial we cover expressions. Various kinds of expressions and operators are described."
image = ""
imageBig = ""
categories = ["db"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../tables/)
[Next](../datamanipulation/)

# SQLite expressions

last modified July 6, 2020 

In this part of the SQLite tutorial, we cover SQLite operators and expressions. 

An expression in a programming language is a combination of values, 
variables, operators, and functions that are interpreted (evaluated) 
according to the particular rules of precedence and of association for
a particular programming language, which computes and then produces 
(returns, in a stateful environment) another value. The expression is
said to evaluate to that value. 

## Literal values

A literal value is a constant of some kind. Literal values may be integers, 
floating point numbers, strings, BLOBs, or NULLs.

sqlite&gt; SELECT 3, 'Wolf', 34.5;
3|Wolf|34.5

Here we return three literals: namely integer, string, and floating point constants. 

sqlite&gt; .nullvalue NULL
sqlite&gt; SELECT NULL;
NULL

The .nullvalue command tells SQLite to show NULL 
values as NULL. SQLite shows empty strings for NULL 
values by default. The NULL value is a literal too. 

sqlite&gt; SELECT quote(x'345eda2348587aeb');
X'345EDA2348587AEB'

BLOB literals are string literals containing hexadecimal data 
and preceded by a single 'x' or 'X' character.

## Operators

*Operators* are used to build expressions. SQL operators 
are very similar to mathematical operators. SQLite supports unary and binary operators.
Binary operators work with two operands, unary work with one. 
An operator may have one or two operands. An *operand* is one of the inputs 
(arguments) of an operator. 

SQLite supports five broad categories of operators:

    - Arithmetic operators

    - Boolean operators

    - Relational operators

    - Bitwise operators

    - Other operators

SQLite supports the following binary operators:

||
*    /    %
+    -
&lt;&lt;   &gt;&gt;   &amp;    |
&lt;    &lt;=   &gt;    &gt;=
=    ==   !=   &lt;&gt;   IS  IS NOT  IN  LIKE  GLOB  BETWEEN  REGEXP
AND   
OR

Operators are arranged according to the precedence. 
The || operator has the highest order of precedence, 
the OR operator the lowest. 

These are the unary prefix operators:

-    +    ~    NOT

The unary + operator is a no-op. It does not do anything. The 
unary - operator changes positive values to negative 
and vice versa. 

sqlite&gt; SELECT -(3-44);
41

 

The result is 41. The other two operators will be discussed later.

### Arithmetic operators

Arithmetic operators understood by SQLite are multiplication, division, 
addition, subtraction, and modulo.

sqlite&gt; SELECT 3*3/9;
1

These are the multiplication and division operators that we know from mathematics. 

sqlite&gt; SELECT 9/2;
4

Similar to C language, this is an integer division.

sqlite&gt; SELECT 9/2.0;
4.5

In order to get a floating point value, one of the operands
must be a floating point number.

sqlite&gt; .nullvalue NULL
sqlite&gt; SELECT 9 / 0;
NULL

Division by zero is not allowed, the expression returns NULL.

sqlite&gt; SELECT 3 + 4 - 1 + 5;
11

We show the addition and subtraction operators. 

sqlite&gt; SELECT 11 % 3;
2

The % operator is called the modulo operator. It finds the 
remainder of division of one number by another. The 11 % 3, 
11 modulo 3 is 2, because 3 goes into 11 three times with a remainder of 2. 

### Boolean operators

With boolean operators we perform logical operations. SQLite has three
boolean operators: AND, OR, and NOT. 
Boolean operators return true or false. In SQLite, 1 is true, 0 is false. 

The AND operator evaluates to true if both operands are true. 

sqlite&gt; SELECT 0 AND 0, 0 AND 1, 1 AND 0, 1 AND 1;
0|0|0|1

The first three operations evaluate to false, the last one to true. 

sqlite&gt; SELECT 3=3 AND 4=4;
1

Both operands are true, so the result is true (1).

The OR operator evaluates to true if at least one of the operands is true. 

sqlite&gt; SELECT 0 OR 0, 0 OR 1, 1 OR 0, 1 OR 1;
0|1|1|1

The first operation evaluates to false, other operations evaluate to true.

The NOT operator is a negation operator. It makes true false 
and false true. 

sqlite&gt; SELECT NOT 1, NOT 0;
0|1
sqlite&gt; SELECT NOT (3=3);
0

### Relational operators

Relational operators are used to compare values. 

SymbolMeaning

&lt;strictly less than
&lt;=less than or equal to
&gt;greater than
&gt;=greater than or equal to
= or ==equal to
!= or &lt;&gt;not equal to

These operators always result in a boolean value. 

sqlite&gt; SELECT 3*3 == 9, 9 = 9;
1|1

Both = and == are equality operators. 

sqlite&gt; SELECT 3 &lt; 4, 3 &lt;&gt; 5, 4 &gt;= 4, 5 != 5;
1|1|1|0

Usage of the relational operators is known from mathematics. 

### Bitwise operators

Decimal numbers are natural to humans. Binary numbers are native 
to computers. Binary, octal, decimal, or hexadecimal symbols are 
only notations of the same number. Bitwise operators work with bits 
of a binary number. We have binary logical 
operators and shift operators.

The *bitwise and operator* performs bit-by-bit comparison 
between two numbers. The result for a bit position is 1 only if both 
corresponding bits in the operands are 1. 

    00110
  &amp; 00011
  = 00010

The first number is a binary notation of 6, the second is 3 and the result is 2. 

sqlite&gt; SELECT 6 &amp; 3;
2
sqlite&gt; SELECT 3 &amp; 6;
2

The *bitwise or operator* performs bit-by-bit comparison between 
two numbers. The result for a bit position is 1 if either of the corresponding 
bits in the operands is 1. 

     00110
  |  00011
   = 00111

The result is 00110 or decimal 7. 

sqlite&gt; SELECT 6 | 3;
7

The *bitwise shift operators* shift bits to the right or left. 

number &lt;&lt; n : multiply number 2 to the nth power
number &gt;&gt; n : divide number by 2 to the nth power

These operators are also called arithmetic shift. 

     00110
 &gt;&gt;  00001
   = 00011

We shift each of the bits of the number six to the right. It is equal to dividing 
the six by 2. The result is 00011 or decimal 3. 

sqlite&gt; SELECT 6 &gt;&gt; 1;
3

```
     00110
  &lt;&lt; 00001
   = 01100

```

We shift each of the bits of the number six to the left. It is equal to multiplying 
the number six by 2. The result is 01100 or decimal 12. 

sqlite&gt; SELECT 6 &lt;&lt; 1;
12

The *bitwise negation operator* changes each 1 to 0 and 0 to 1. It is 
also called the tilda operator.

sqlite&gt; SELECT ~7;
-8
sqlite&gt; SELECT ~-8;
7

The operator inverts all bits of a number, 7. One of the bits also determines
whether the number is negative. If we negate all the bits one more time, we get 
number 7 again. 

## String concatenation

The || operator is a string concatenation operator. 
It simply joins strings. 

sqlite&gt; SELECT 'wolf' || 'hound';
wolfhound

We add two strings.

sqlite&gt; SELECT 'star' || 3;
star3

It is possible to join strings and numbers.

## IN operator

The IN and NOT IN operators take an expression 
on the left and a list of values or a subquery on the right. They check 
if a value is present or not present in the list.

sqlite&gt; SELECT 'Tom' IN ('Tom', 'Frank', 'Jane');
1

Here we check if 'Tom' is in the list of names that follows 
the IN operator. The return value is a boolean value. 

For the following examples, we recapitulate what we have in the Cars table. 

sqlite&gt; SELECT * FROM Cars;
1|Audi|52642
2|Mercedes|57127
3|Skoda|9000
4|Volvo|29000
5|Bentley|350000
6|Citroen|21000
7|Hummer|41400
8|Volkswagen|21600

The IN operator allows us to specify multiple values 
in a WHERE clause.

sqlite&gt; SELECT * FROM Cars WHERE Name IN ('Audi', 'Hummer');
1|Audi|52642
7|Hummer|41400

From the Cars table, we choose cars that are listed after 
the IN operator.

sqlite&gt; SELECT * FROM Cars WHERE Name NOT IN ('Audi', 'Hummer');
2|Mercedes|57127
3|Skoda|9000
4|Volvo|29000
5|Bentley|350000
6|Citroen|21000
8|Volkswagen|21600

With NOT IN operator, we have the reverse operation: all car
names that are not listed.

sqlite&gt; SELECT * FROM Cars WHERE Name IN (SELECT Name FROM Cars WHERE Price &lt; 30000);
3|Skoda|9000
4|Volvo|29000
6|Citroen|21000
8|Volkswagen|21600

The right side of the IN operator can be a subquery.

## LIKE operator

The LIKE operator is used in the WHERE clause 
to search for a specified pattern in a column. A percent symbol (%) in the 
LIKE pattern matches any sequence of zero or more characters in the string. 
An underscore (_) in the pattern matches any single character in the string.

sqlite&gt; SELECT * FROM Cars WHERE Name LIKE 'Vol%';
4|Volvo|29000
8|Volkswagen|21600

Here we select cars whose names begin with 'Vol'. The percent sign (%) matches an arbitrary 
number of characters (including zero characters).

sqlite&gt; SELECT * FROM Cars WHERE Name LIKE '____';
1|Audi|52642

An underscore character (_) matches any single character.
Here we select a car name that has exactly four characters; there 
are four underscores. 

sqlite&gt; SELECT * FROM Cars WHERE Name LIKE '%EN';
6|Citroen|21000
8|Volkswagen|21600

The LIKE operator is case insensitive by default.

sqlite&gt; PRAGMA case_sensitive_like = 1;
sqlite&gt; SELECT * FROM Cars WHERE Name LIKE '%EN';

With PRAGMA case_sensitive_like = 1 statement, we can make
it case sensitive.

## GLOB operator

The GLOB operator is similar to LIKE, but it 
uses the Unix file globbing syntax for its wildcards. Also, GLOB 
is case sensitive, unlike (default) LIKE.

The * wildcard character matches any number of any characters including none and 
the ? matches any single character.

sqlite&gt; SELECT * FROM Cars WHERE Name GLOB '*en';
6|Citroen|21000
8|Volkswagen|21600

Here we have cars whose names end with 'en' characters.  

sqlite&gt; SELECT * FROM Cars WHERE Name GLOB '????';
1|Audi|52642

Here we select a car name that has exactly four characters.

sqlite&gt; SELECT * FROM Cars WHERE Name GLOB '*EN';
sqlite&gt; SELECT * FROM Cars WHERE Name LIKE '%EN';
6|Citroen|21000
8|Volkswagen|21600

These two statements demonstrate that LIKE is case insensitive 
and GLOB is case sensitive.

The [abc] pattern matches one character given in the bracket. 

sqlite&gt; SELECT * FROM Cars WHERE Name GLOB '[VHS]*';
3|Skoda|9000
4|Volvo|29000
7|Hummer|41400
8|Volkswagen|21600

In the example, we select all cars whose names begin with V, H, or S characters.

## BETWEEN operator

The BETWEEN operator is equivalent to a pair of comparisons; 
a BETWEEN b AND c is equivalent to a&gt;=b AND a&lt;=c.

sqlite&gt; SELECT * FROM Cars WHERE Price BETWEEN 20000 AND 55000;
1|Audi|52642
4|Volvo|29000
6|Citroen|21000
7|Hummer|41400
8|Volkswagen|21600

In this SQL statement, we have selected cars that cost between 20000 and 55000 units. 

sqlite&gt; SELECT * FROM Cars WHERE Price &gt; 20000 AND Price &gt; 55000;
1|Audi|52642
4|Volvo|29000
6|Citroen|21000
7|Hummer|41400
8|Volkswagen|21600

This expression is equivalent to the previous one. 

## REGEXP operator

For the REGEXP operator, we need to install additional package.

$ sudo apt-get install sqlite3-pcre

We install sqlite3-pcre, which is Perl-compatible regular expression 
library for SQLite.

sqlite&gt; .load /usr/lib/sqlite3/pcre.so

We load the extension library.

sqlite&gt; SELECT * FROM Cars WHERE Name REGEXP '^.{5}$';
3|Skoda|9000
4|Volvo|29000

The '^.{5}$' regular expression finds car names having exactly
five characters.

### IS and IS NOT operators

The IS and IS NOT operators work like = and != except 
when one or both of the operands are NULL. 

If both operands are NULL, then the IS operator evaluates to 1 (true) 
and the IS NOT operator evaluates to 0 (false). If one operand is NULL 
and the other is not, then the IS operator evaluates to 0 (false) and 
the IS NOT operator is 1 (true). 

sqlite&gt; .nullvalue NULL
sqlite&gt; SELECT NULL = 0;
NULL
sqlite&gt; SELECT NULL IS 0;
0
sqlite&gt; SELECT NULL IS NOT 0;
1

The IS and IS NOT operators are useful when working with NULL
values.

## The CASE expression

With CASE WHEN ELSE it is possible to create conditional expressions. The expression
is ended with the END keyword.
The CASE WHEN ELSE expression in SQLite is similar to if-elseif-else expressions
in programming languages. 

sqlite&gt; CREATE TEMP TABLE Numbers(Val INTEGER);
sqlite&gt; INSERT INTO Numbers VALUES (1), (-3), (3), (0), (-5), (6);

We create a temporary table with some integer values.

sqlite&gt; SELECT Val, CASE WHEN Val&gt;0 THEN 'positive'
   ...&gt; WHEN Val &lt; 0 THEN 'negative'
   ...&gt; ELSE 'zero' END FROM Numbers;
1|positive
-3|negative
3|positive
0|zero
-5|negative
6|positive

The CASE WHEN ELSE expression is used to describe values.

## Precedence

The rules of *operator precedence* specify which operators are evaluated first.
The precedence level is necessary to avoid ambiguity in expressions. 

What is the outcome of the following expression, 28 or 40?

3 + 5 * 5

Like in mathematics, the multiplication operator has a higher 
precedence than addition operator. So the outcome is 28.

(3 + 5) * 5

To change the order of evaluation, we can use parentheses. Expressions inside 
parentheses are always evaluated first.

sqlite&gt; SELECT 3+5*5, (3+5)*5;
28|40

The first expression evaluates to 28 because multiplication operator has a 
higher precedence than addition. In the second example, we have used parentheses to 
change the order of evaluation. So the second expressions evaluates to 40. 

Here we put again the list of operators in SQLite. 

unary + - ~ NOT
||
*    /    %
+    -
&lt;&lt;   &lt;&gt;   &amp;    |
&lt;    &lt;=   &gt;    &gt;=
=    ==   !=   &lt;&gt;   IS  IS NOT  IN  LIKE  GLOB  BETWEEN  REGEXP
AND   
OR

The operators on the same row have the same level of precedence. 
The precedence grows from bottom to top. 

## Associativity

Sometimes precedence is insufficient for determining the outcome of an expression. 
A second set of rules, called rules of associativity, determine the order of evaluation 
of operators with the same precedence level.

9 / 3 * 3

What is the outcome of this expression, 9 or 1? The multiplication, 
deletion and the modulo operator
are left to right associated. So the expression is evaluated this 
way: (9 / 3) * 3 and the result is 9.

sqlite&gt; SELECT 9 / 3 * 3;
9

The associativity rule is left to right. 

Arithmetic, boolean, relational, and bitwise operators are all left 
to right associated. 

In this part of the SQLite tutorial, we have covered the SQLite 
operators and expressions. We have covered precedence and associativity rules
in expressions.

[Contents](..)
[Previous](../tables/)
[Next](../datamanipulation/)