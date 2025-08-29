+++
title = "Java operator"
date = 2025-08-29T20:00:04.068+01:00
draft = false
description = "Java operator tutorial shows how to work with operators in Java. We mention various types of operators and describe precedence and associativity rules in expressions."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java operator

last modified January 27, 2024

 

In this article we show how to work with operators in Java. 

An *operator* is a special symbol which indicates a certain process is
carried out. Operators in programming languages are taken from mathematics.
Programmers work with data. The operators are used to process data. An
*operand* is one of the inputs (arguments) of an operator.

Expressions are constructed from operands and operators. The operators of an
expression indicate which operations to apply to the operands. The order of
evaluation of operators in an expression is determined by the
*precedence* and *associativity* of the operators.

An operator usually has one or two operands. Those operators that work with only
one operand are called *unary operators*. Those who work with two
operands are called *binary operators*. There is also one ternary
operator ?: which works with three operands.

Certain operators may be used in different contexts. For example the
+ operator. It can be used in different cases. It adds numbers,
concatenates strings, or indicates the sign of a number. We say that the
operator is *overloaded*.

## Java sign operators

There are two sign operators: + and -. They are used
to indicate or change the sign of a value.

com/zetcode/SignOperators.java
  

package com.zetcode;

public class SignOperators {

    public static void main(String[] args) {

        System.out.println(2);
        System.out.println(+2);
        System.out.println(-2);
    }
}

The + and - signs indicate the sign of a value.
The plus sign can be used to signal that we have a positive number. It
can be omitted and it is mostly done so.

com/zetcode/MinusSign.java
  

package com.zetcode;

public class MinusSign {

    public static void main(String[] args) {

        int a = 1;

        System.out.println(-a);
        System.out.println(-(-a));
    }
}

The minus sign changes the sign of a value.

## Java assignment operator

The assignment operator = assigns a value to a variable. A
*variable* is a placeholder for a value. In mathematics, the = operator
has a different meaning. In an equation, the = operator is an
equality operator. The left side of the equation is equal to the right one.

int x = 1;

Here we assign a number to the x variable.

x = x + 1;

This expression does not make sense in mathematics, but it is legal in
programming. The expression adds 1 to the x variable. The right side is equal to
2 and 2 is assigned to x.

3 = x;

This code line results in syntax error. We cannot assign a value to a literal.

## Java concatenating strings

In Java the + operator is also used to concatenate strings.

com/zetcode/ConcatenateStrings.java
  

package com.zetcode;

public class ConcatenateStrings {

    public static void main(String[] args) {

        System.out.println("Return " + "of " + "the king.");
        System.out.println("Return".concat(" of").concat(" the king."));
    }
}

We join three strings together.

System.out.println("Return " + "of " + "the king.");

Strings are joined with the + operator.

System.out.println("Return".concat(" of").concat(" the king."));

An alternative method for concatenating strings is the concat
method.

$ java ConcatenateStrings.java
Return of the king.
Return of the king.

## Java increment and decrement operators

Incrementing or decrementing a value by one is a common task in
programming. Java has two convenient operators for this: ++
and --.

x++;
x = x + 1;
...
y--;
y = y - 1;

The above two pairs of expressions do the same.

com/zetcode/IncDec.java
  

package com.zetcode;

public class IncDec {

    public static void main(String[] args) {

        int x = 6;

        x++;
        x++;

        System.out.println(x);

        x--;
        System.out.println(x);
    }
}

In the above example, we demonstrate the usage of both operators.

int x = 6;

x++;
x++;

We initiate the x variable to 6. Then we increment
x two times. Now the variable equals to 8.

x--;

We use the decrement operator. Now the variable equals to 7.

$ java IncDec.java
8
7

And here is the output of the example.

## Java arithmetic operators

The following is a table of arithmetic operators in Java.

SymbolName

+Addition
-Subtraction
*Multiplication
/Division
%Remainder

The following example shows arithmetic operations.

com/zetcode/Arithmetic.java
  

package com.zetcode;

public class Arithmetic {

    public static void main(String[] args) {

        int a = 10;
        int b = 11;
        int c = 12;

        int add = a + b + c;
        int sb = c - a;
        int mult = a * b;
        int div = c / 3;
        int rem = c % a;

        System.out.println(add);
        System.out.println(sb);
        System.out.println(mult);
        System.out.println(div);
        System.out.println(rem);
    }
}

In the preceding example, we use addition, subtraction, multiplication,
division, and remainder operations. This is all familiar from the mathematics.

int rem = c % a;

The % operator is called the remainder or the modulo operator.
It finds the remainder of division of one number by another. For example,
9 % 4, 9 modulo 4 is 1, because 4 goes into 9 twice with a
remainder of 1.

$ java Arithmetic.java
33
2
110
4
2

Next we show the distinction between integer and floating
point division.

com/zetcode/Division.java
  

package com.zetcode;

public class Division {

    public static void main(String[] args) {

        int c = 5 / 2;
        System.out.println(c);

        double d = 5 / 2.0;
        System.out.println(d);
    }
}

In the preceding example, we divide two numbers.

int c = 5 / 2;

In this code, we have done integer division. The returned value of the division
operation is an integer. When we divide two integers the result is an integer.

double d = 5 / 2.0;

If one of the values is a double or a float, we perform a floating point
division. In our case, the second operand is a double so the result is a double.

$ java Division.java
2
2.5

We see the result of the program.

## Java Boolean operators

In Java we have three logical operators. The boolean keyword
is used to declare a Boolean value.

SymbolName

&amp;&amp;logical and
||logical or
!negation

Boolean operators are also called logical.

com/zetcode/BooleanOperators.java
  

package com.zetcode;

public class BooleanOperators {

    public static void main(String[] args) {

        int x = 3;
        int y = 8;

        System.out.println(x == y);
        System.out.println(y &gt; x);

        if (y &gt; x) {

            System.out.println("y is greater than x");
        }
    }
}

Many expressions result in a boolean value. For instance, boolean values are
used in conditional statements.

System.out.println(x == y);
System.out.println(y &gt; x);

Relational operators always result in a boolean value. These two lines
print false and true.

if (y &gt; x) {

    System.out.println("y is greater than x");
}

The body of the if statement is executed only if the condition
inside the parentheses is met. The y &gt; x returns true, so the message
"y is greater than x" is printed to the terminal.

The true and false keywords represent
boolean literals in Java.

com/zetcode/AndOperator.java
  

package com.zetcode;

public class AndOperator {

    public static void main(String[] args) {

        boolean a = true &amp;&amp; true;
        boolean b = true &amp;&amp; false;
        boolean c = false &amp;&amp; true;
        boolean d = false &amp;&amp; false;

        System.out.println(a);
        System.out.println(b);
        System.out.println(c);
        System.out.println(d);
    }
}

The code example shows the logical and (&amp;&amp;) operator.
It evaluates to true only if both operands are true.

$ java AndOperator.java
true
false
false
false

Only one expression results in true.

The logical or (||) operator evaluates to true
if either of the operands is true.

com/zetcode/OrOperator.java
  

package com.zetcode;

public class OrOperator {

    public static void main(String[] args) {

        boolean a = true || true;
        boolean b = true || false;
        boolean c = false || true;
        boolean d = false || false;

        System.out.println(a);
        System.out.println(b);
        System.out.println(c);
        System.out.println(d);
    }
}

If one of the sides of the operator is true, the outcome of
the operation is true.

$ java OrOperator.java
true
true
true
false

Three of four expressions result in true.

The negation operator ! makes true false and false true.

com/zetcode/Negation.java
  

package com.zetcode;

public class Negation {

    public static void main(String[] args) {

        System.out.println(! true);
        System.out.println(! false);
        System.out.println(! (4 &lt; 3));
    }
}

The example shows the negation operator in action.

$ java Negation.java
false
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

com/zetcode/ShortCircuit.java
  

package com.zetcode;

public class ShortCircuit {

    public static boolean One() {

        System.out.println("Inside one");
        return false;
    }

    public static boolean Two() {

        System.out.println("Inside two");
        return true;
    }

    public static void main(String[] args) {

        System.out.println("Short circuit");

        if (One() &amp;&amp; Two()) {

            System.out.println("Pass");
        }

        System.out.println("#############");

        if (Two() || One()) {

            System.out.println("Pass");
        }
    }
}

We have two methods in the example. They are used as operands
in boolean expressions. We will see if they are called.

if (One() &amp;&amp; Two()) {

    System.out.println("Pass");
}

The One method returns false. The short circuit &amp;&amp; does not
evaluate the second method. It is not necessary. Once an operand is false, the
result of the logical conclusion is always false. Only "Inside one" is only
printed to the console.

if (Two() || One()) {

    System.out.println("Pass");
}

In the second case, we use the || operator and use the
Two method as the first operand. In this case, "Inside two" and
"Pass" strings are printed to the terminal. It is again not necessary to
evaluate the second operand, since once the first operand evaluates to true, the
logical or is always true.

$ java ShortCircuit.java
Short circuit
Inside one
#############
Inside two
Pass

We see the result of the program.

## Java relational operators

Relational operators are used to compare values. These operators always
result in a boolean value.

SymbolMeaning

&lt;less than
&lt;=less than or equal to
&gt;greater than
&gt;=greater than or equal to
==equal to
!=not equal to

Relational operators are also called comparison operators.

com/zetcode/Relational.java
  

package com.zetcode;

public class Relational {

    public static void main(String[] args) {

        System.out.println(3 &lt; 4);
        System.out.println(3 == 4);
        System.out.println(4 &gt;= 3);
        System.out.println(4 != 3);
    }
}

In the code example, we have four expressions. These expressions compare
integer values. The result of each of the expressions is either true or false.
In Java we use the == to compare numbers. (Some languages like
Ada, Visual Basic, or Pascal use = for comparing numbers.)

## Java bitwise operators

Decimal numbers are natural to humans. Binary numbers are native to computers.
Binary, octal, decimal, or hexadecimal symbols are only notations of a number.
Bitwise operators work with bits of a binary number. Bitwise operators are
seldom used in higher level languages like Java.

SymbolMeaning

~bitwise negation
^bitwise exclusive or
&amp;bitwise and
|bitwise or

The *bitwise negation operator* changes each 1 to 0 and 0 to 1.

System.out.println(~7); // prints -8
System.out.println(~ -8); // prints 7

The operator reverts all bits of a number 7. One of the bits also determines
whether the number is negative or not. If we negate all the bits one more time,
we get number 7 again.

The *bitwise and operator* performs bit-by-bit comparison between two
numbers. The result for a bit position is 1 only if both corresponding bits in
the operands are 1.

      00110
   &amp;  00011
   =  00010

The first number is a binary notation of 6, the second is 3 and the result is 2.

System.out.println(6 &amp; 3); // prints 2
System.out.println(3 &amp; 6); // prints 2

The *bitwise or operator* performs bit-by-bit comparison between
two numbers. The result for a bit position is 1 if either of the
corresponding bits in the operands is 1.

     00110
   | 00011
   = 00111

The result is 00110 or decimal 7.

System.out.println(6 | 3); // prints 7
System.out.println(3 | 6); // prints 7

The *bitwise exclusive or operator* performs bit-by-bit comparison
between two numbers. The result for a bit position is 1 if one or the
other (but not both) of the corresponding bits in the operands is 1.

      00110
   ^  00011
   =  00101

The result is 00101 or decimal 5.

System.out.println(6 ^ 3); // prints 5
System.out.println(3 ^ 6); // prints 5

## Java compound assignment operators

Compound assignment operators are shorthand operators which
consist of two operators.

a = a + 3;
a += 3;

The += compound operator is one of these shorthand operators.
The above two expressions are equal. Value 3 is added to the
a variable.

Other compound operators are:

-=   *=   /=   %=   &amp;=   |=   &lt;&lt;=   &gt;&gt;=

The following example uses two compound operators.

com/zetcode/CompoundOperators.java
  

package com.zetcode;

public class CompoundOperators {

    public static void main(String[] args) {

        int a = 1;
        a = a + 1;

        System.out.println(a);

        a += 5;
        System.out.println(a);

        a *= 3;
        System.out.println(a);
    }
}

We use the += and *= compound operators.

int a = 1;
a = a + 1;

The a variable is initiated to one. Value 1 is added to the
variable using the non-shorthand notation.

a += 5;

Using a += compound operator, we add 5 to the a variable.
The statement is equal to a = a + 5;.

a *= 3;

Using the *= operator, the a is multiplied by 3. The statement
is equal to a = a * 3;.

$ java CompoundOperators.java
2
7
21

## Java instanceof operator

The instanceof operator compares an object to a specified type.

com/zetcode/InstanceofOperator.java
  

package com.zetcode;

class Base {}
class Derived extends Base {}

public class InstanceofOperator {

    public static void main(String[] args) {

        Base b = new Base();
        Derived d = new Derived();

        System.out.println(d instanceof Base);
        System.out.println(b instanceof Derived);
        System.out.println(d instanceof Object);
    }
}

In the example, we have two classes: one base and one derived from
the base.

System.out.println(d instanceof Base);

This line checks if the variable d points to the class that is an
instance of the Base class. Since the Derived
class inherits from the Base class, it is also an instance of the
Base class too. The line prints true.

System.out.println(b instanceof Derived);

The b object is not an instance of the Derived class.
This line prints false.

System.out.println(d instanceof Object);

Every class has Object as a superclass. Therefore, the
d object is also an instance of the Object class.

$ java InstanceofOperator.java
true
false
true

## Java lambda operator

Java 8 introduced the lambda operator (-&gt;).

(parameters) -&gt; expression
(parameters) -&gt; { statements; }

This is the basic syntax for a lambda expression in Java. Lambda expression
allow to create more concise code in Java.

The declaration of the type of the parameter is optional; the compiler can infer
the type from the value of the parameter. For a single parameter the parentheses
are optional; for multiple parameters, they are required. 

The curly braces are optional if there is only one statement in an expression
body. Finally, the return keyword is optional if the body has a single
expression to return a value; curly braces are required to indicate that the
expression returns a value.

com/zetcode/LambdaExpression.java
  

package com.zetcode;

import java.util.Arrays;

public class LambdaExpression {

    public static void main(String[] args) {

        String[] words = { "kind", "massive", "atom", "car", "blue" };

        Arrays.sort(words, (String s1, String s2) -&gt; (s1.compareTo(s2)));

        System.out.println(Arrays.toString(words));
    }
}

In the example, we define an array of strings. The array is sorted using
the Arrays.sort method and a lambda expression.

$ java LambdaExpression.java
[atom, blue, car, kind, massive]

Lambda expressions are used primarily to define an inline implementation of a
functional interface, i.e., an interface with a single method only.
Interfaces are abstract types that are used to enforce a contract.

com/zetcode/LambdaExpression2.java
  

package com.zetcode;

interface GreetingService {

    void greet(String message);
}

public class LambdaExpression2 {

    public static void main(String[] args) {

        GreetingService gs = (String msg) -&gt; {
            System.out.println(msg);
        };

        gs.greet("Good night");
        gs.greet("Hello there");
    }
}

In the example, we create a greeting service with the help
of a lambda expression.

interface GreetingService {

    void greet(String message);
}

Interface GreetingService is created. All objects implementing
this interface must implement the greet method.

GreetingService gs = (String msg) -&gt; {
    System.out.println(msg);
};

We create an object that implements GreetingService with
a lambda expression. The object has a method that prints a message to the console.

gs.greet("Good night");

We call the object's greet method, which prints a give message
to the console.

$ java LambdaExpression2.java
Good night
Hello there

There are some common functional interfaces, such as Function,
Consumer, or Supplier.

com/zetcode/LambdaExpression3.java
  

package com.zetcode;

import java.util.function.Function;

public class LambdaExpression3 {

    public static void main(String[] args) {

        Function&lt;Integer, Integer&gt; square = (Integer x) -&gt; x * x;
        System.out.println(square.apply(5));
    }
}

The example uses a lambda expression to compute squares of integers.

Function&lt;Integer, Integer&gt; square = (Integer x) -&gt; x * x;
System.out.println(square.apply(5));

Function is a function that accepts one argument and produces a
result. The operation of the lamda expression produces a square of the given
integer.

## Java double colon operator

The double colon operator (::) is used to create a reference to a method.

com/zetcode/DoubleColonOperator.java
  

package com.zetcode;

import java.util.function.Consumer;

public class DoubleColonOperator {

    private static void greet(String msg) {

        System.out.println(msg);
    }

    public static void main(String[] args) {

        Consumer&lt;String&gt; f = DoubleColonOperator::greet;
        f.accept("Hello there");
    }
}

In the code example, we create a reference to a static method
with the double colon operator.

private static void greet(String msg) {

    System.out.println(msg);
}

We have a static method that prints a greeting to the console.

Consumer&lt;String&gt; f = DoubleColonOperator::greet;

Consumer is a functional interface that represents an
operation that accepts a single input argument and returns no result.
With the double colon operator, we create a reference to the
greet method.

f.accept("Hello there");

We perform the functional operation with the accept method.

## Java operator precedence

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

## Java operators precedence list

The following table shows common Java operators ordered by
precedence (highest precedence first):

  
    Operator
    Meaning
    Associativity
  
  
    [] () .
    array access, method invoke, object member access
    Left-to-right
  
  
    ++ -- + -
    increment, decrement, unary plus and minus
    Right-to-left
  
  
    ! ~ (type) new
    negation, bitwise NOT, type cast, object creation
    Right-to-left
  
  
    * / %
    multiplication, division, modulo
    Left-to-right
  
  
    + - 
    addition, subtraction
    Left-to-right
  
  
    +
    string concatenation
    Left-to-right
  
  
    &lt;&lt; &gt;&gt; &gt;&gt;&gt;
    shift
    Left-to-right
  
  
    &lt; &lt;= &gt; &gt;=
    relational
    Left-to-right
  
  
    instanceof
    type comparison
    Left-to-right
  
  
    == !=
    equality
    Left-to-right
  
  
    &amp;
    bitwise AND
    Left-to-right
  
  
    ^
    bitwise XOR
    Left-to-right
  
  
    |
    bitwise OR
    Left-to-right
  
  
    &amp;&amp;
    logical AND
    Left-to-right
  
  
    ||
    logical OR
    Left-to-right
  
  
    ? :
    ternary
    Right-to-left
  
  
    =
    simple assignment
    Right-to-left
  
  
    += -=  *= /= %=  &amp;=
    compound assignment
    Right-to-left
  
  
    ^=  |= &lt;&lt;= &gt;&gt;= &gt;&gt;&gt;=
    compound assignment
    Right-to-left
  

Table: Operator precedence and associativity

Operators on the same row of the table have the same precedence. If we use
operators with the same precedence, then the associativity rule is applied.

com/zetcode/Precedence.java
  

package com.zetcode;

public class Precedence {

    public static void main(String[] args) {

        System.out.println(3 + 5 * 5);
        System.out.println((3 + 5) * 5);

        System.out.println(! true | true);
        System.out.println(! (true | true));
    }
}

In this code example, we show a few expressions.
The outcome of each expression is dependent on the precedence level.

System.out.println(3 + 5 * 5);

This line prints 28. The multiplication operator has a higher precedence
than addition. First, the product of 5*5 is calculated,
then 3 is added.

System.out.println(! true | true);

In this case, the negation operator has a higher precedence than the
bitwise OR. First, the initial true value is negated to false, then the
| operator combines false and true, which gives true in the end.

$ java Precedence.java
28
40
true
false

## Java associativity rule

Sometimes the precedence is not satisfactory to determine the outcome
of an expression. There is another rule called
*associativity*. The associativity of operators determines
the order of evaluation of operators with the same precedence level.

9 / 3 * 3

What is the outcome of this expression, 9 or 1? The multiplication, deletion,
and the modulo operator are left to right associated. So the expression is
evaluated this way: (9 / 3) * 3 and the result is 9.

Arithmetic, boolean, relational, and bitwise operators are all left to right
associated. The assignment operators, ternary operator, increment, decrement,
unary plus and minus, negation, bitwise NOT, type cast, object creation
operators are right to left associated.

com/zetcode/Associativity.java
  

package com.zetcode;

public class Associativity {

    public static void main(String[] args) {

        int a, b, c, d;
        a = b = c = d = 0;

        String str = String.format("%d %d %d %d", a, b, c, d);
        System.out.println(str);

        int j = 0;
        j *= 3 + 1;
        System.out.println(j);
    }
}

In the example, we have two cases where the associativity rule determines the
expression.

int a, b, c, d;
a = b = c = d = 0;

The assignment operator is right to left associated. If the associativity was
left to right, the previous expression would not be possible.

int j = 0;
j *= 3 + 1;

The compound assignment operators are right to left associated. We might expect
the result to be 1. But the actual result is 0. Because of the associativity.
The expression on the right is evaluated first and then the compound assignment
operator is applied.

$ java Associativity.java
0 0 0 0
0

## Java ternary operator

The ternary operator ?: is a conditional operator. It is a
convenient operator for cases where we want to pick up one of two values,
depending on the conditional expression.

cond-exp ? exp1 : exp2

If cond-exp is true, exp1 is evaluated and the result is returned. If the
cond-exp is false, exp2 is evaluated and its result is returned.

com/zetcode/TernaryOperator.java
  

package com.zetcode;

public class TernaryOperator {

    public static void main(String[] args) {

        int age = 31;

        boolean adult = age &gt;= 18 ? true : false;

        System.out.println(String.format("Adult: %s", adult));
    }
}

In most countries the adulthood is based on the age. You are adult if you are
older than a certain age. This is a situation for a ternary operator.

boolean adult = age &gt;= 18 ? true : false;

First the expression on the right side of the assignment operator is evaluated.
The first phase of the ternary operator is the condition expression evaluation.
So if the age is greater or equal to 18, the value following the ?
character is returned. If not, the value following the : character
is returned. The returned value is then assigned to the adult variable.

$ java TernaryOperator.java
Adult: true

A 31 years old person is adult.

## Calculating prime numbers

In the following example, we are going to calculate prime numbers.

com/zetcode/PrimeNumbers.java
  

package com.zetcode;

public class PrimeNumbers {

    public static void main(String[] args) {

        int[] nums = { 0, 1, 2, 3, 4, 5, 6, 7, 8,
            9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
            19, 20, 21, 22, 23, 24, 25, 26, 27, 28 };

        System.out.print("Prime numbers: ");

        for (int num : nums) {

            if (num == 0 || num == 1) {
                continue;
            }

            if (num == 2 || num == 3) {

                System.out.print(num + " ");
                continue;
            }

            int i = (int) Math.sqrt(num);

            boolean isPrime = true;

            while (i &gt; 1) {

                if (num % i == 0) {

                    isPrime = false;
                }

                i--;
            }

            if (isPrime) {

                System.out.print(num + " ");
            }
        }

        System.out.print('\n');
    }
}

In the above example, we deal with several operators. A prime number (or a
prime) is a natural number that has exactly two distinct natural number
divisors: 1 and itself. We pick up a number and divide it by numbers from 1 to
the selected number. Actually, we do not have to try all smaller numbers; we can
divide by numbers up to the square root of the chosen number. The formula will
work. We use the remainder division operator.

int[] nums = { 0, 1, 2, 3, 4, 5, 6, 7, 8,
    9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
    19, 20, 21, 22, 23, 24, 25, 26, 27, 28 };

We will calculate primes from these numbers.

if (num == 0 || num == 1) {
    continue;
}

Values 0 and 1 are not considered to be primes.

if (num == 2 || num == 3) {

    System.out.print(num + " ");
    continue;
}

We skip the calculations for 2 and 3. They are primes. Note the usage of the
equality and conditional or operators. The == has a higher
precedence than the || operator. So we do not need to use parentheses.

int i = (int) Math.sqrt(num);

We are OK if we only try numbers smaller than the square root of
a number in question.

while (i &gt; 1) {
    ...
    i--;
}

This is a while loop. The i is the calculated square root
of the number. We use the decrement operator to decrease i
by one each loop cycle. When i is smaller than 1, we terminate the loop.
For example, we have number 9. The square root of 9 is 3. We will divide
the 9 number by 3 and 2. This is sufficient for our calculation.

if (num % i == 0) {

    isPrime = false;
}

If the remainder division operator returns 0 for any of the i values,
then the number in question is not a prime.

In this article we covered Java expressions. We mentioned various types of
operators and described precedence and associativity rules in expressions.

## Source

[Java operators - tutorial](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/operators.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).