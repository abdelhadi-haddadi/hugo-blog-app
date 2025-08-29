+++
title = "MySQL expressions"
date = 2025-08-29T20:03:45.357+01:00
draft = false
description = "In this part of the MySQL tutorial, we cover MySQL expressions."
image = ""
imageBig = ""
categories = ["mysql"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../tables/)
[Next](../datamanipulation/)

# MySQL expressions

last modified January 10, 2023 

In this part of the MySQL tutorial, we will cover expressions. 

An expression in a programming language is a combination of values, 
variables, operators, and functions that are interpreted (evaluated) 
according to the particular rules of precedence and of association for
a particular programming language, which computes and then produces 
(returns, in a stateful environment) another value. The expression is
said to evaluate to that value. 

## Literal values

A literal value is a constant of some kind. 
Literal values may be strings, numbers, hexadecimal values, boolean values, 
and NULL.

mysql&gt; SELECT 3, 'Wolf', 34.5, 0x34, 0+b'10111';
+---+------+------+------+------------+
| 3 | Wolf | 34.5 | 0x34 | 0+b'10111' |
+---+------+------+------+------------+
| 3 | Wolf | 34.5 | 4    |         23 |
+---+------+------+------+------------+

Here we return five literals. Namely an integer, a string a floating point a
hexadecimal number and a binary value. The hexadecimal value is preceded by 
0x, which is a standard in programming languages. The binary value 
is preceded by a b character and written inside single quotes. 
To display a printable value, we add a zero to the binary notation.

mysql&gt; SELECT NULL, \N;
+------+------+
| NULL | NULL |
+------+------+
| NULL | NULL |
+------+------+

This is the NULL value. It is an absence of a value.
A synonym for NULL is \N.

mysql&gt; SELECT TRUE, FALSE;
+------+-------+
| TRUE | FALSE |
+------+-------+
|    1 |     0 |
+------+-------+

MySQL also recognises boolean TRUE, FALSE values. 
They may be written in any letter case. 

mysql&gt; SELECT '2011-01-11', '23:33:01', '98/11/31/ 14:22:20';
+------------+----------+--------------------+
| 2011-01-11 | 23:33:01 | 98/11/31/ 14:22:20 |
+------------+----------+--------------------+
| 2011-01-11 | 23:33:01 | 98/11/31/ 14:22:20 |
+------------+----------+--------------------+

MySQL database supports various date and time literals. 

## Variables

A variable is a symbolic name associated with a value.
This value may be changed over time. Variables in MySQL
are preceded by the @ character.

mysql&gt; SET @name = 'Jane';

mysql&gt; SELECT @name;
+-------+
| @name |
+-------+
| Jane  |
+-------+

We set a variable and show its contents afterwards.

## Operators

*Operators* are used to build expressions. SQL operators are 
very similar to mathematical operators. There are two kinds of operators. 
Binary and unary. Binary operators work with two operands, unary work with one. 
An operator may have one or two operands. An *operand* is one of 
the inputs (arguments) of an operator. 

We have several types of operators:

- Arithmetic operators

- Boolean operators

- Relational operators

- Bitwise operators

- Other operators

### Unary operators

We will show some unary operators.

mysql&gt; SELECT +3, 3;
+---+---+
| 3 | 3 |
+---+---+
| 3 | 3 |
+---+---+

The + is a no-op. It does not do anything. 

mysql&gt; SELECT -(3-44);
+---------+
| -(3-44) |
+---------+
|      41 |
+---------+

 

The - unary operator changes positive values
to negative and vice versa. 

mysql&gt; SELECT NOT (3&gt;9);
+-----------+
| NOT (3&gt;9) |
+-----------+
|         1 |
+-----------+

 

The NOT operator negates a value. The result of the 
3&gt;9 comparison is false and the negation operator negates 
it to true.

### Arithmetic operators

Common arithmetic operators are: multiplication, division, integer division, 
addition, subtraction, and modulo. 

mysql&gt; SELECT 3 + 4 - 5;
+-----------+
| 3 + 4 - 5 |
+-----------+
|         2 |
+-----------+

Addition and subtraction operators. 

mysql&gt; SELECT 3*3/9;
+--------+
| 3*3/9  |
+--------+
| 1.0000 |
+--------+

These are multiplication and division operators that we 
know from mathematics. 

mysql&gt; SELECT 9/2, 9 DIV 2;
+--------+---------+
| 9/2    | 9 DIV 2 |
+--------+---------+
| 4.5000 |       4 |
+--------+---------+

The above SQL statement shows the difference between the division 
and integer division operators. The first returns a floating point number, 
the second returns an integer.

mysql&gt; SELECT 11 % 3;
+--------+
| 11 % 3 |
+--------+
|      2 |
+--------+

The % operator is called the modulo operator. It finds the remainder 
of division of one number by another. The 11 % 3, 11 modulo 3 is 2, 
because 3 goes into 11 three times with a remainder of 2. 

### Logical operators

With logical operators we perform boolean operations. MySQL understands
these logical operators: AND, OR and NOT
and XOR. Logical operators return TRUE or 
FALSE. In MySQL, 1 is true, 0 is false. 

The AND operator evaluates to true if both operands are true. 

mysql&gt; SELECT FALSE AND FALSE, FALSE AND TRUE,
    -&gt; TRUE AND FALSE, TRUE AND TRUE;
+-----------------+----------------+----------------+---------------+
| FALSE AND FALSE | FALSE AND TRUE | TRUE AND FALSE | TRUE AND TRUE |
+-----------------+----------------+----------------+---------------+
|               0 |              0 |              0 |             1 |
+-----------------+----------------+----------------+---------------+

The first three operations evaluate to false, the last one to true. 

mysql&gt; SELECT 3=3 AND 4=4;
+-------------+
| 3=3 AND 4=4 |
+-------------+
|           1 |
+-------------+

Both operands are true, so the result is true (1).

The OR operator evaluates to true if at least one 
of the operands is true. 

mysql&gt; SELECT FALSE OR FALSE, FALSE OR TRUE, 
    -&gt; TRUE OR FALSE, TRUE OR TRUE;
+----------------+---------------+---------------+--------------+
| FALSE OR FALSE | FALSE OR TRUE | TRUE OR FALSE | TRUE OR TRUE |
+----------------+---------------+---------------+--------------+
|              0 |             1 |             1 |            1 |
+----------------+---------------+---------------+--------------+

The first operation evaluates to false, other operations evaluate to true.

The XOR operator evaluates to true if exactly one of the 
operands is true.

mysql&gt; SELECT FALSE XOR FALSE, FALSE XOR TRUE,
    -&gt; TRUE XOR FALSE, TRUE XOR TRUE;
+-----------------+----------------+----------------+---------------+
| FALSE XOR FALSE | FALSE XOR TRUE | TRUE XOR FALSE | TRUE XOR TRUE |
+-----------------+----------------+----------------+---------------+
|               0 |              1 |              1 |             0 |
+-----------------+----------------+----------------+---------------+

Two of the operations result in true.

The NOT operator is negation operator. It makes true false and 
false true. 

mysql&gt; SELECT NOT TRUE, NOT FALSE;
+----------+-----------+
| NOT TRUE | NOT FALSE |
+----------+-----------+
|        0 |         1 |
+----------+-----------+

mysql&gt; SELECT NOT (3=3);
+-----------+
| NOT (3=3) |
+-----------+
|         0 |
+-----------+

### Relational operators

Relational operators are used to compare values. These operators always 
result in boolean value. 

mysql&gt; SELECT 3*3=9, 9=9;
+-------+-----+
| 3*3=9 | 9=9 |
+-------+-----+
|     1 |   1 |
+-------+-----+

The = is the equality operator. 

mysql&gt; SELECT 3 &lt; 4, 3 &lt;&gt; 5, 4 &lt;= 4, 5 != 5;
+-------+--------+--------+--------+
| 3 &lt; 4 | 3 &lt;&gt; 5 | 4 &lt;= 4 | 5 != 5 |
+-------+--------+--------+--------+
|     1 |      1 |      1 |      0 |
+-------+--------+--------+--------+

Usage of the relational operators is known from mathematics. 

### Bitwise operators

Decimal numbers are natural to humans. Binary numbers are native to computers. 
Binary, octal, decimal or hexadecimal symbols are only notations of the 
same number. Bitwise operators work with bits of a binary number. 
We have binary logical operators and shift operators.

The *bitwise and operator* performs bit-by-bit comparison between two numbers. 
The result for a bit position is 1 only if both corresponding bits in the operands are 1. 

     
    00110
  &amp; 00011
  = 00010

The first number is a binary notation of 6, the second is 3 and the 
result is 2. 

mysql&gt; SELECT 6 &amp; 3, 3 &amp; 6;
+-------+-------+
| 6 &amp; 3 | 3 &amp; 6 |
+-------+-------+
|     2 |     2 |
+-------+-------+

The *bitwise or operator* performs bit-by-bit comparison between two numbers.
The result for a bit position is 1 if either of the corresponding bits in the operands is 1. 

    
     00110
  |  00011
   = 00111

The result is 00110 or decimal 7. 

mysql&gt; SELECT 6 | 3, 3 | 6;
+-------+-------+
| 6 | 3 | 3 | 6 |
+-------+-------+
|     7 |     7 |
+-------+-------+

The *bitwise shift operators* shift bits to the right or left. 

number &lt;&lt; n : multiply number 2 to the nth power
number &gt;&gt; n : divide number by 2 to the nth power

These operators are also called arithmetic shift. 

     00110
 &gt;&gt;  00001
   = 00011

We shift each of the bits of number six to the right. It is equal to dividing 
the six by 2. The result is 00011 or decimal 3. 

mysql&gt; SELECT 6 &gt;&gt; 1;
+--------+
| 6 &gt;&gt; 1 |
+--------+
|      3 |
+--------+

```
     00110
  &lt;&lt; 00001
   = 01100

```

We shift each of the bits of number six to the left. It is equal to multiplying 
the number six by 2. The result is 01100 or decimal 12. 

mysql&gt; SELECT 6 &lt;&lt; 1;
+--------+
| 6 &lt;&lt; 1 |
+--------+
|     12 |
+--------+

### Other operators

There are some other operators left. These include IS,
IN, LIKE, REGEXP, BETWEEN. 

The IS operator tests if an operand is a boolean value.

mysql&gt; SET @running = FALSE;
mysql&gt; SELECT @running IS FALSE;
+-------------------+
| @running IS FALSE |
+-------------------+
|                 1 |
+-------------------+

We set a variable to boolean false. We check if the variable is 
FALSE using the IS operator.

We can use the IN operator in two cases. 

mysql&gt; SELECT 'Tom' IN ('Tom', 'Frank', 'Jane');
+-----------------------------------+
| 'Tom' IN ('Tom', 'Frank', 'Jane') |
+-----------------------------------+
|                                 1 |
+-----------------------------------+

Here we check if the string value 'Tom' is in the list of names, 
following the IN operator. The return is a boolean value. 

For the following example recapitulates what we have in the 
Cars table. 

mysql&gt; SELECT * FROM Cars;
+----+------------+--------+
| Id | Name       | Cost   |
+----+------------+--------+
|  1 | Audi       |  52642 |
|  2 | Mercedes   |  57127 |
|  3 | Skoda      |   9000 |
|  4 | Volvo      |  29000 |
|  5 | Bentley    | 350000 |
|  6 | Citroen    |  21000 |
|  7 | Hummer     |  41400 |
|  8 | Volkswagen |  21600 |
+----+------------+--------+

In the second case, the IN operator allows you 
to specify multiple values in a WHERE clause.

mysql&gt; SELECT * FROM Cars Where Name IN ('Audi', 'Hummer');
+----+--------+-------+
| Id | Name   | Cost  |
+----+--------+-------+
|  1 | Audi   | 52642 |
|  7 | Hummer | 41400 |
+----+--------+-------+

From the Cars table we choose cars that are listed 
after the IN operator.

The LIKE operator is used in a WHERE 
clause to search for a specified pattern in a column.

mysql&gt; SELECT * FROM Cars WHERE Name LIKE 'Vol%';
+----+------------+-------+
| Id | Name       | Cost  |
+----+------------+-------+
|  4 | Volvo      | 29000 |
|  8 | Volkswagen | 21600 |
+----+------------+-------+

Here we select cars, whose names begin with 'Vol'.

mysql&gt; SELECT * FROM Cars WHERE Name LIKE '____';
+----+------+-------+
| Id | Name | Cost  |
+----+------+-------+
|  1 | Audi | 52642 |
+----+------+-------+

Here we select a car name that has exactly four characters. 
There are four underscores. 

The LIKE operator only provides simple pattern matching. 
The REGEXP operator is more powerful. It provides pattern 
matching with regular expressions. RLIKE is a synonym for 
REGEXP.

mysql&gt; SELECT * FROM Cars WHERE Name REGEXP 'e.$';
+----+------------+--------+
| Id | Name       | Cost   |
+----+------------+--------+
|  2 | Mercedes   |  57127 |
|  5 | Bentley    | 350000 |
|  6 | Citroen    |  21000 |
|  7 | Hummer     |  41400 |
|  8 | Volkswagen |  21600 |
+----+------------+--------+

Here we have cars, whose last but one character is 'e'.

mysql&gt; SELECT * FROM Cars WHERE Name REGEXP '^.e.*e.$';
+----+----------+--------+
| Id | Name     | Cost   |
+----+----------+--------+
|  2 | Mercedes |  57127 |
|  5 | Bentley  | 350000 |
+----+----------+--------+

We select cars, whose second and last but one characters is 'e'.

The BETWEEN operator is equivalent to a pair of comparisons. 
The a BETWEEN b AND c is equivalent to 
a&gt;=b AND a&lt;=c.

mysql&gt; SELECT * FROM Cars WHERE Cost BETWEEN 20000 AND 55000;
+----+------------+-------+
| Id | Name       | Cost  |
+----+------------+-------+
|  1 | Audi       | 52642 |
|  4 | Volvo      | 29000 |
|  6 | Citroen    | 21000 |
|  7 | Hummer     | 41400 |
|  8 | Volkswagen | 21600 |
+----+------------+-------+

In this SQL statement, we have selected cars, which cost between 
20000 and 55000 units. 

## Precedence

The *operator precedence* tells us which operators are 
evaluated first. The precedence level is necessary to avoid
ambiguity in expressions. 

What is the outcome of the following expression, 28 or 40?

3 + 5 * 5

Like in mathematics, the multiplication operator has a higher precedence 
than addition operator. So the outcome is 28.

(3 + 5) * 5

To change the order of evaluation, we can use square brackets. 
Expressions inside square brackets are always evaluated first. 

mysql&gt; SELECT 3+5*5, (3+5)*5;
+-------+---------+
| 3+5*5 | (3+5)*5 |
+-------+---------+
|    28 |      40 |
+-------+---------+

The first expression evaluates to 28, because the multiplication 
operator has a higher precedence, than the addition one. In the 
second example, we have used square brackets to change the order of
precedence. So the second expressions evaluates to 40. 

## Associativity

Sometimes the precedence is not satisfactory to determine the outcome 
of an expression. There is another rule called
*associativity*. The associativity of operators determines the 
order of evaluation of operators with the *same* precedence level. 

9 / 3 * 3

What is the outcome of this expression, 9 or 1? The multiplication, deletion, 
and the modulo operator are left to right associated. So the expression is 
evaluated this way: (9 / 3) * 3 and the result is 9.

mysql&gt; SELECT 9 / 3 * 3;
+-----------+
| 9 / 3 * 3 |
+-----------+
|    9.0000 |
+-----------+

The associativity rule is left to right. 

mysql&gt; SELECT 0 AND 0 OR 1;
+--------------+
| 0 AND 0 OR 1 |
+--------------+
|            1 |

The associativity rule is again left to right. If it was right to left, 
the result would be 0.

Arithmetic, boolean, relational, and bitwise operators are all left 
to right associated. 

In this part of the MySQL tutorial, we have covered the MySQL expressions. 

[Contents](..)
[Previous](../tables/)
[Next](../datamanipulation/)