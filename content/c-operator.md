+++
title = "C# operator"
date = 2025-08-29T19:51:11.870+01:00
draft = false
description = "C# operator tutorial covers operators and expressions of the C# language. Expressions are constructed from operands and operators. The operators of an expression indicate which operations to apply to the operands."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# operator

last modified July 5, 2023

 

In this article we cover C# operators.

Expressions are constructed from operands and operators. The operators of an
expression indicate which operations to apply to the operands. The order of
evaluation of operators in an expression is determined by the
*precedence* and *associativity* of the operators.

An *operator* is a special symbol which indicates a certain process is
carried out. Operators in programming languages are taken from mathematics.
Programmers work with data. The operators are used to process data. An
*operand* is one of the inputs (arguments) of an operator.

## C# operator list

The following table shows a set of operators used in the C# language.

  
    Category
    Symbol
  
  
    Sign operators
    +   -
  
  
    Arithmetic
    +   -   *   /   %
  
  
    Logical (boolean and bitwise)
    &amp;   |   ^   !   ~   &amp;&amp;   ||   true   false
  
  
    String concatenation
    +
  
  
    Increment, decrement
    ++ --
  
  
    Shift
    &lt;&lt; &gt;&gt;
  
  
    Relational
    ==   !=   &lt;   &gt;   &lt;=   &gt;=
  
  
    Assignment
    =   +=   -=   *=   /=   %=  &amp;=  |=   ^=  ??=  &lt;&lt;=   &gt;&gt;= 
  
  
    Member access
    .  ?.
  
  
    Indexing
    []  ?[]
  
  
    Cast
    
  
  
    Ternary
    ?:
  
  
    Delegate concatenation and removal
    +  -
  
  
    Object creation
    new
  
  
    Type information
    as   is   sizeof   typeof   
  
  
    Overflow exception control
    checked unchecked
  
  
    Indirection and address
    *   -&gt;   []   &amp;
  
  
    Lambda
    =&gt;
  

An operator usually has one or two operands. Those operators that work
with only one operand are called *unary operators*.
Those who work with two operands are called *binary operators*.
There is also one ternary operator ?:, which works with three operands.

Certain operators may be used in different contexts. For example the + operator.
From the above table we can see that it is used in different cases.
It adds numbers, concatenates strings or delegates; indicates the sign
of a number. We say that the operator is *overloaded*.

## C# unary operators

C# unary operators include: +, -, ++, --, cast operator (), and negation !.

### C# sign operators

There are two sign operators: + and -. They are
used to indicate or change the sign of a value.

Program.cs
  

Console.WriteLine(2);
Console.WriteLine(+2);
Console.WriteLine(-2);

The + and - signs indicate the sign of a value.
The plus sign can be used to indicate that we have a positive number. It can be
omitted and it is mostly done so.

Program.cs
  

int a = 1;
Console.WriteLine(-a);
Console.WriteLine(-(-a));

The minus sign changes the sign of a value.

$ dotnet run
-1
1

### C# increment and decrement operators

Incrementing or decrementing a value by one is a common task in
programming. C# has two convenient operators for this: ++
and --.

x++;
x = x + 1;
...
y--;
y = y - 1;

The above two pairs of expressions do the same.

Program.cs
  

int x = 6;

x++;
x++;

Console.WriteLine(x);

x--;
Console.WriteLine(x);

In the above example, we demonstrate the usage of both operators.

int x = 6;

x++;
x++;

We initiate the x variable to 6. Then we increment
x two times. Now the variable equals to 8.

x--;

We use the decrement operator. Now the variable equals to 7.

$ dotnet run
8
7

### C# explicit cast operator

The explicit cast operator () can be used to cast a type to
another type. Note that this operator works only on certain types.

Program.cs
  

float val = 3.2f;
int num = (int) val;

Console.WriteLine(num);

In the example, we explicitly cast a float type to int.

### Negation operator

The negation operator (!) reverses the meaning of its operand.

Program.cs
  

var isValid = false;

if (!isValid)
{
    Console.WriteLine("The option is not valid");
}

In the example, we build a negative condition: it is executed if the inverse
of the expression is valid.

## C# assignment operator

The assignment operator = assigns a value to a variable.
A *variable* is a placeholder for a value. In mathematics, the
= operator has a different meaning. In an equation, the
= operator is an equality operator. The left
side of the equation is equal to the right one.

int x = 1;

Here we assign a number to the x variable.

x = x + 1;

The previous expression does not make sense in mathematics. But it is
legal in programming. The expression adds 1 to the x
variable. The right side is equal to 2 and 2 is assigned to x.

3 = x;

This code example results in syntax error. We cannot assign a value to
a literal.

## C# concatenating strings

The + operator is also used to concatenate strings.

Program.cs
  

Console.WriteLine("Return " + "of " + "the king.");

We join three strings together using string concatenation operator.

$ dotnet run
Return of the king.

## C# arithmetic operators

The following is a table of arithmetic operators in C#.

SymbolName

+Addition
-Subtraction
*Multiplication
/Division
%Remainder

The following example shows arithmetic operations.

Project.cs
  

int a = 10;
int b = 11;
int c = 12;

int add = a + b + c;
int sb = c - a;
int mult = a * b;
int div = c / 3;
int rem = c % a;

Console.WriteLine(add);
Console.WriteLine(sb);
Console.WriteLine(mult);
Console.WriteLine(div);
Console.WriteLine(rem);

In the preceding example, we use addition, subtraction, multiplication,
division, and remainder operations. This is all familiar from the mathematics.

int rem = c % a;

The % operator is called the remainder or the modulo operator.
It finds the remainder of division of one number by another. For example,
9 % 4, 9 modulo 4 is 1, because 4 goes into 9 twice with a
remainder of 1.

$ dotnet run
33
2
110
4
2

Next we show the distinction between integer and floating point division.

Program.cs
  

int c = 5 / 2;
Console.WriteLine(c);

double d = 5 / 2.0;
Console.WriteLine(d);

In the preceding example, we divide two numbers.

int c = 5 / 2;
Console.WriteLine(c);

In this code, we have done integer division. The returned value
of the division operation is an integer. When we divide two integers
the result is an integer.

double d = 5 / 2.0;
Console.WriteLine(d);

If one of the values is a double or a float, we perform a
floating point division. In our case, the second operand
is a double so the result is a double.

$ dotnet run
2
2.5

## C# Boolean operators

In C#, we have three logical operators. The bool keyword is
used to declare a Boolean value.

SymbolName

&amp;&amp;logical and
||logical or
!negation

Boolean operators are also called logical.

Program.cs
  

int x = 3;
int y = 8;

Console.WriteLine(x == y);
Console.WriteLine(y &gt; x);

if (y &gt; x)
{
    Console.WriteLine("y is greater than x");
}

Many expressions result in a boolean value. Boolean values are used
in conditional statements.

Console.WriteLine(x == y);
Console.WriteLine(y &gt; x);

Relational operators always result in a boolean value. These two lines
print false and true.

if (y &gt; x)
{
    Console.WriteLine("y is greater than x");
}

The body of the if statement is executed only if the condition
inside the parentheses is met. The y &gt; x returns true, so the message
"y is greater than x" is printed to the terminal.

The true and false keywords represent boolean
literals in C#.

Program.cs
  

bool a = true &amp;&amp; true;
bool b = true &amp;&amp; false;
bool c = false &amp;&amp; true;
bool d = false &amp;&amp; false;

Console.WriteLine(a);
Console.WriteLine(b);
Console.WriteLine(c);
Console.WriteLine(d);

Example shows the logical and operator.
It evaluates to true only if both operands are true.

$ dotnet run
True
False
False
False

Only one expression results in True.

The logical or || operator evaluates to true,
if either of the operands is true.

Program.cs
  

bool a = true || true;
bool b = true || false;
bool c = false || true;
bool d = false || false;

Console.WriteLine(a);
Console.WriteLine(b);
Console.WriteLine(c);
Console.WriteLine(d);

If one of the sides of the operator is true, the outcome of
the operation is true.

$ dotnet run
True
True
True
False

Three of four expressions result in true.

The negation operator ! makes true false and false true.

Program.cs
  

Console.WriteLine(!true);
Console.WriteLine(!false);
Console.WriteLine(!(4 &lt; 3));

The example shows the negation operator in action.

$ dotnet run
False
True
True

The ||, and &amp;&amp; operators
are short circuit evaluated. *Short circuit evaluation* means
that the second argument is only evaluated if the first argument does not
suffice to determine the value of the expression: when the first argument of the
logical and evaluates to false, the overall value must be false; and when the
first argument of logical or evaluates to true, the overall value must be true.
Short circuit evaluation is used mainly to improve performance.

An example may clarify this a bit more.

Program.cs
  

Console.WriteLine("Short circuit");

if (One() &amp;&amp; Two())
{
    Console.WriteLine("Pass");
}

Console.WriteLine("#############");

if (Two() || One())
{
    Console.WriteLine("Pass");
}

bool One()
{
    Console.WriteLine("Inside one");

    return false;
}

bool Two()
{
    Console.WriteLine("Inside two");

    return true;
}

We have two methods in the example. They are used as operands in boolean
expressions. 

if (One() &amp;&amp; Two())
{
    Console.WriteLine("Pass");
}

The One method returns false. The short circuit
&amp;&amp; does not evaluate the second method. It is not necessary. Once an
operand is false, the result of the logical conclusion is always
false. Only "Inside one" is only printed to the console.

Console.WriteLine("#############");

if (Two() || One())
{
    Console.WriteLine("Pass");
}

In the second case, we use the || operator and use the
Two method as the first operand. In this case, "Inside two" and
"Pass" strings are printed to the terminal. It is again not necessary to
evaluate the second operand, since once the first operand evaluates to
true, the logical or is always true.

$ dotnet run
Short circuit
Inside one
#############
Inside two
Pass

## C# relational operators

Relational operators are used to compare values. These operators always
result in boolean value.

SymbolMeaning

&lt;less than
&lt;=less than or equal to
&gt;greater than
&gt;=greater than or equal to
==equal to
!=not equal to

Relational operators are also called comparison
operators.

Program.cs
  

Console.WriteLine(3 &lt; 4);
Console.WriteLine(3 == 4);
Console.WriteLine(4 &gt;= 3);
Console.WriteLine(4 != 3);

In the code example, we have four expressions. These expressions compare integer
values. The result of each of the expressions is either true or false.
In C# we use == to compare numbers. Some languages
like Ada, Visual Basic, or Pascal use = for comparing numbers.

## C# bitwise operators

Decimal numbers are natural to humans. Binary numbers are native to computers.
Binary, octal, decimal, or hexadecimal symbols are only notations of the same
number. Bitwise operators work with bits of a binary number. Bitwise operators
are seldom used in higher level languages like C#.

SymbolMeaning

~bitwise negation
^bitwise exclusive or
&amp;bitwise and
|bitwise or

The *bitwise negation operator* changes each 1 to 0 and 0 to 1.

Console.WriteLine(~ 7); // prints -8
Console.WriteLine(~ -8); // prints 7

The operator reverts all bits of a number 7. One of the bits also determines,
whether the number is negative or not. If we negate all the bits one more
time, we get number 7 again.

The *bitwise and operator* performs bit-by-bit comparison between
two numbers. The result for a bit position is 1 only if both corresponding
bits in the operands are 1.

      00110
   &amp;  00011
   =  00010

The first number is a binary notation of 6, the second is 3,
and the result is 2.

Console.WriteLine(6 &amp; 3); // prints 2
Console.WriteLine(3 &amp; 6); // prints 2

The *bitwise or operator* performs bit-by-bit comparison
between two numbers. The result for a bit position is 1 if either
of the corresponding bits in the operands is 1.

     00110
   | 00011
   = 00111

The result is 00110 or decimal 7.

Console.WriteLine(6 | 3); // prints 7
Console.WriteLine(3 | 6); // prints 7

The *bitwise exclusive or operator* performs bit-by-bit
comparison between two numbers.
The result for a bit position is 1 if one or the other (but not both)
of the corresponding bits in the operands is 1.

      00110
   ^  00011
   =  00101

The result is 00101 or decimal 5.

Console.WriteLine(6 ^ 3); // prints 5
Console.WriteLine(3 ^ 6); // prints 5

## C# compound assignment operators

The compound assignment operators consist of two operators.
They are shorthand operators.

a = a + 3;
a += 3;

The += compound operator is one of these shorthand operators.
The above two expressions are equal. Value 3 is added to the a variable.

Other compound operators are:

-=   *=   /=   %=   &amp;=   |=   &lt;&lt;=   &gt;&gt;=

Program.cs
  

```
int a = 1;
a = a + 1;

Console.WriteLine(a);

a += 5;
Console.WriteLine(a);

a *= 3;
Console.WriteLine(a);

```

In the example, we use two compound operators.

int a = 1;
a = a + 1;

The a variable is initiated to one. 1 is added to the variable
using the non-shorthand notation.

a += 5;

Using a += compound operator, we add 5 to the
a variable. The statement is equal to a = a + 5;.

a *= 3;

Using the *= operator, the a is multiplied by 3.
The statement is equal to a = a * 3;.

$ dotnet run
2
7
21

## C# new operator

The new operator is used to create objects and invoke constructors.

Program.cs
  

var b = new Being();
Console.WriteLine(b);

var vals = new int[] { 1, 2, 3, 4, 5 };
Console.WriteLine(string.Join(" ", vals));

class Being
{
    public Being()
    {
        Console.WriteLine("Being created");
    }
}

In the example, we create a new custom object and a array of integers
utilizing the new operator.

public Being()
{
    Console.WriteLine("Being created");
}

This is a constructor. It is called at the time of the object creation.

$ dotnet run
Being created
Being
1 2 3 4 5

## C# access operator

The access operator [] is used with
arrays, indexers, and attributes.

Program.cs
  

var vals = new int[] { 2, 4, 6, 8, 10 };
Console.WriteLine(vals[0]);

var domains = new Dictionary()
{
    { "de", "Germany" },
    { "sk", "Slovakia" },
    { "ru", "Russia" }
};

Console.WriteLine(domains["de"]);

oldMethod();

[Obsolete("Don't use OldMethod, use NewMethod instead", false)]
void oldMethod()
{
    Console.WriteLine("oldMethod()");
}

void newMethod()
{
    Console.WriteLine("newMethod()");
}

In the example, we use the [] operator to get an element of an
array, value of a dictionary pair, and activate a built-in attribute.

var vals = new int[] { 2, 4, 6, 8, 10 };
Console.WriteLine(vals[0]);

We define an array of integers. We get the first element with vals[0].

var domains = new Dictionary&lt;string, string&gt;()
{
    { "de", "Germany" },
    { "sk", "Slovakia" },
    { "ru", "Russia" }
};

Console.WriteLine(domains["de"]);

A dictionary is created. With domains["de"], we get the value of
the pair that has the "de" key.

[Obsolete("Don't use OldMethod, use NewMethod instead", false)]
public static void oldMethod()
{
    Console.WriteLine("oldMethod()");
}

We active the built-in Obsolete attribute. The attribute
issues a warning.

When we run the program, it produces the warning: 
warning CS0618: 'oldMethod()' is obsolete: 'Don't use OldMethod, use NewMethod instead'.

## C# index from end operator ^

The index from end operator ^ indicates the element position from the end of a
sequence. For instance, ^1 points to the last element of a sequence
and ^n points to the element with offset length - n.

Program.cs
  

int[] vals = { 1, 2, 3, 4, 5 };

Console.WriteLine(vals[^1]);
Console.WriteLine(vals[^2]);

var word = "gray falcon";

Console.WriteLine(word[^1]);

In the example, we apply the operator on an array and a string.

int[] vals = { 1, 2, 3, 4, 5 };

Console.WriteLine(vals[^1]);
Console.WriteLine(vals[^2]);

We print the last and the last but one element of the array.

var word = "gray falcon";

Console.WriteLine(word[^1]);

We print the last letter of the word.

$ dotnet run
5
4
n

## C# range operator ..

The .. operator specifies the start and end of a range of indices
as its operands. The left-hand operand is an inclusive start of a range. The
right-hand operand is an exclusive end of a range.

x.. is equivalent to x..^0
..y is equivalent to 0..y
.. is equivalent to 0..^0

Operands of the .. operator can be omitted to get an open-ended
range.

Program.cs
  

int[] vals = { 1, 2, 3, 4, 5, 6, 7 };

var slice1 = vals[1..4];
Console.WriteLine("[{0}]", string.Join(", ", slice1));

var slice2 = vals[..^0];
Console.WriteLine("[{0}]", string.Join(", ", slice2));

In the example, we use the .. operator to get array slices.

var range1 = vals[1..4];
Console.WriteLine("[{0}]", string.Join(", ", range1));

We create an array slice from index 1 till index 4; the last index 4
is not included.

var slice2 = vals[..^0];
Console.WriteLine("[{0}]", string.Join(", ", slice2));

Here we esentially create a copy of the array.

$ dotnet run
[2, 3, 4]
[1, 2, 3, 4, 5, 6, 7]

## C# type information

Now we concern ourselves with operators that work with types.

The sizeof operator is used to obtain the size
in bytes for a value type. The typeof is
used to obtain the System.Type object for a type.

Program.cs
  

Console.WriteLine(sizeof(int));
Console.WriteLine(sizeof(float));
Console.WriteLine(sizeof(Int32));

Console.WriteLine(typeof(int));
Console.WriteLine(typeof(float));

We use the sizeof and typeof operators.

$ dotnet run
4
4
4
System.Int32
System.Single

We can see that the int type is an alias for System.Int32
and the float is an alias for the System.Single type.

The is operator checks if an object is compatible with a given
type.

Program.cs
  

Base _base = new Base();
Derived derived = new Derived();

Console.WriteLine(_base is Base);
Console.WriteLine(_base is Object);
Console.WriteLine(derived is Base);
Console.WriteLine(_base is Derived);

class Base { }
class Derived : Base { }

We create two objects from user defined types.

class Base {}
class Derived : Base {}

We have a Base and a Derived class.
The Derived class inherits from the Base class.

Console.WriteLine(_base is Base);
Console.WriteLine(_base is Object);

Base equals Base and so the first line
prints True. The Base is also compatible with Object
type. This is because each class inherits from the mother of all classes —
the Object class.

Console.WriteLine(derived is Base);
Console.WriteLine(_base is Derived);

The derived object is compatible with the Base class
because it explicitly inherits from the Base class. On
the other hand, the _base object has nothing to do with
the Derived class.

$ dotnet run
True
True
True
False

The as operator is used to perform conversions between compatible
reference types. When the conversion is not possible, the operator returns null.
Unlike the cast operation which raises an exception.

Program.cs
  

object[] objects = new object[6];
objects[0] = new Base();
objects[1] = new Derived();
objects[2] = "ZetCode";
objects[3] = 12;
objects[4] = 1.4;
objects[5] = null;

for (int i = 0; i &lt; objects.Length; i++)
{
    string s = objects[i] as string;
    Console.Write("{0}:", i);

    if (s != null)
    {
        Console.WriteLine(s);
    }
    else
    {
        Console.WriteLine("not a string");
    }
}

class Base { }
class Derived : Base { }

In the above example, we use the as operator to
perform casting.

string s = objects[i] as string;

We try to cast various types to the string type. But only
once the casting is valid.

$ dotnet run
0:not a string
1:not a string
2:ZetCode
3:not a string
4:not a string
5:not a string

## C# operator precedence

The *operator precedence* tells us which operators are evaluated first.
The precedence level is necessary to avoid ambiguity in expressions.

What is the outcome of the following expression, 28 or 40?

3 + 5 * 5

Like in mathematics, the multiplication operator has a higher
precedence than addition operator. So the outcome is 28.

(3 + 5) * 5

To change the order of evaluation, we can use parentheses.
Expressions inside parentheses are always evaluated first.

The following table shows common C# operators ordered by
precedence (highest precedence first):

  
    Operator(s)
    Category
    Associativity
  
  
    Primary
    x.y  x?.y, x?[y] f(x)  a[x]  x++  x--  new  typeof  default  checked  unchecked
    Left
  
  
    Unary
    +  -  !  ~  ++x  --x  (T)x
    Left
  
  
    Multiplicative
    * / %
    Left
  
  
    Additive
    + -
    Left
  
  
    Shift
    &lt;&lt; &gt;&gt;
    Left
  
  
    Equality
    == !=
    Right
  
  
    Logical AND
    &amp;
    Left
  
  
    Logical XOR
    ^
    Left
  
  
    Logical OR
    |
    Left
  
  
    Conditional AND
    &amp;&amp;
    Left
  
  
    Conditional OR
    ||
    Left
  
  
    Null Coalescing
    ??
    Left
  
  
    Ternary
    ?:
    Right
  
  
    Assignment
    =  *=  /=  %=  +=  -=  &lt;&lt;=  &gt;&gt;=  &amp;=  ^=  |=  ??=  =&gt;
    Right
  

Operators on the same row of the table have the same precedence.

Program.cs
  

Console.WriteLine(3 + 5 * 5);
Console.WriteLine((3 + 5) * 5);

Console.WriteLine(! true | true);
Console.WriteLine(! (true | true));

In this code example, we show a few expressions. The outcome of each expression
is dependent on the precedence level.

Console.WriteLine(3 + 5 * 5);

This line prints 28. The multiplication operator has a higher precedence
than addition. First, the product of 5*5 is calculated,
then 3 is added.

Console.WriteLine(! true | true);

In this case, the negation operator has a higher precedence. First,
the first true value is negated to false, then the | operator
combines false and true, which gives true in the end.

$ dotnet run
28
40
True
False

## C# associativity rule

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

Arithmetic, boolean, relational, and bitwise operators are all left
to right associated.

On the other hand, the assignment operator is right associated.

Program.cs
  

int a, b, c, d;
a = b = c = d = 0;

Console.WriteLine("{0} {1} {2} {3}", a, b, c, d);

int j = 0;
j *= 3 + 1;

Console.WriteLine(j);

In the example, we have two cases where the associativity rule
determines the expression.

int a, b, c, d;
a = b = c = d = 0;

The assignment operator is right to left associated.
If the associativity was left to right, the previous expression
would not be possible.

int j = 0;
j *= 3 + 1;

The compound assignment operators are right to left associated.
We might expect the result to be 1. But the actual result is 0.
Because of the associativity. The expression on the right is
evaluated first and than the compound assignment operator is applied.

$ dotnet run
0 0 0 0
0

## C# null-conditional operator

A *null-conditional operator* applies a member access, ?.,
or element access,  ?[], operation to its operand only if that
operand evaluates to non-null. If the operand evaluates to null,
the result of applying the operator is null.

Program.cs
  

var users = new List&lt;User&gt;() { new User("John Doe", "gardener"), new User(null, null),
        new User("Lucia Newton", "teacher") };

users.ForEach(user =&gt; Console.WriteLine(user.Name?.ToUpper()));

record User(string? Name, string? Occupation);

In the example, we have a User class with two members: Name
and Occupation. We access the name member of the
objects with the help of the ?. operator.

var users = new List&lt;User&gt;() { new User("John Doe", "gardener"), new User(null, null),
        new User("Lucia Newton", "teacher") };

We have a list of users. One of them is initialized with null values.

users.ForEach(user =&gt; Console.WriteLine(user.Name?.ToUpper()));

We use the ?. to access the Name member and call
the ToUpper method. The ?. prevents the
System.NullReferenceException by not calling the
ToUpper on the null value.

$ dotnet run
JOHN DOE

LUCIA NEWTON

In the following example, we use the ?[] operator. The operator 
allows to place null values into a collection.

Program.cs
  

int?[] vals = { 1, 2, 3, null, 4, 5 };

int i = 0;

while (i &lt; vals.Length)
{
    Console.WriteLine(vals[i]?.GetType());
    i++;
}

In this example, we have a null value in an array. 
We prevent the System.NullReferenceException by applying 
the ?. operator on the array elements.

## C# null-coalescing operator

The null-coalescing operator ?? is used to define a default value
for a nullable type. It returns the left-hand operand if it is not
null; otherwise it returns the right operand. When we work with databases, we
often deal with absent values. These values come as nulls to the program. This
operator is a convenient way to deal with such situations.

Program.cs
  

int? x = null;
int? y = null;

int z = x ?? y ?? -1;

Console.WriteLine(z);

An example program for null-coalescing operator.

int? x = null;
int? y = null;

Two nullable int types are initiated to null.
The int? is a shorthand for Nullable&lt;int&gt;.
It allows to have null values assigned to int types.

int z = x ?? y ?? -1;

We want to assign a value to z variable. But it must not
be null. This is our requirement. We can easily use the
null-coalescing operator for that. In case both x and y
variables are null, we assign -1 to z.

$ dotnet run
-1

## C# null-coalescing assignment operator

The null-coalescing assignment operator ??= assigns the value of
its right-hand operand to its left-hand operand only if the left-hand operand
evaluates to null. The ??= operator does not evaluate
its right-hand operand if the left-hand operand evaluates to non-null. It is
available in C# 8.0 and later.

Program.cs
  

List&lt;int&gt; vals = null;

vals ??= new List&lt;int&gt;() {1, 2, 3, 4, 5, 6};
vals.Add(7);
vals.Add(8);
vals.Add(9);

Console.WriteLine(string.Join(", ", vals));

vals ??= new List&lt;int&gt;() {1, 2, 3, 4, 5, 6};

Console.WriteLine(string.Join(", ", vals));

In the example, we use the null-coalescing assignment operator on a list 
of integer values.

List&lt;int&gt; vals = null;

First, the list is assigned to null.

vals ??= new List&lt;int&gt;() {1, 2, 3, 4, 5, 6};

We use the ??= to assign a new list object to the variable.
Since it is null, the list is assigned.

vals.Add(7);
vals.Add(8);
vals.Add(9);

Console.WriteLine(string.Join(", ", vals));

We add some values to the list and print its contents.

vals ??= new List&lt;int&gt;() {1, 2, 3, 4, 5, 6};

We try to assign a new list object to the variable. Since the variable 
is not null anymore, the list is not assigned.

$ dotnet run
1, 2, 3, 4, 5, 6, 7, 8, 9
1, 2, 3, 4, 5, 6, 7, 8, 9

## C# ternary operator

The ternary operator ?: is a conditional operator. It is a
convenient operator for cases where we want to pick up one of two values,
depending on the conditional expression.

cond-exp ? exp1 : exp2

If cond-exp is true, exp1 is evaluated and the result is returned. If the
cond-exp is false, exp2 is evaluated and its result is returned.

Program.cs
  

int age = 31;

bool adult = age &gt;= 18 ? true : false;

Console.WriteLine("Adult: {0}", adult);

In most countries the adulthood is based on your age. You are adult if you are
older than a certain age. This is a situation for a ternary operator.

bool adult = age &gt;= 18 ? true : false;

First the expression on the right side of the assignment operator is evaluated.
The first phase of the ternary operator is the condition expression evaluation.
So if the age is greater or equal to 18, the value following the ?
character is returned. If not, the value following the : character
is returned. The returned value is then assigned to the adult variable.

$ dotnet run
Adult: True

A 31 years old person is adult.

## C# Lambda operator

The =&gt; token is called the lambda operator. It is an operator
taken from functional languages. This operator can make the code shorter and
cleaner. On the other hand, understanding the syntax may be tricky. Especially
if a programmer never used a functional language before.

Wherever we can use a delegate, we also can use a lambda expression. A
definition for a lambda expression is: a lambda expression is an anonymous
function that can contain expressions and statements. On the left side we have a
group of data and on the right side an expression or a block of statements.
These statements are applied on each item of the data.

In lambda expressions we do not have a return keyword. The last statement is
automatically returned. And we do not need to specify types for our parameters.
The compiler will guess the correct parameter type. This is called type
inference.

Program.cs
  

var list = new List&lt;int&gt;() { 3, 2, 1, 8, 6, 4, 7, 9, 5 };

var subList = list.FindAll(val =&gt; val &gt; 3);

foreach (int i in subList)
{
    Console.WriteLine(i);
}

We have a list of integer numbers. We print all numbers that are
greater than 3.

var list = new List&lt;int&gt;() { 3, 2, 1, 8, 6, 4, 7, 9, 5 };

We have a generic list of integers.

var subList = list.FindAll(val =&gt; val &gt; 3);

Here we use the lambda operator. The FindAll method takes a
predicate as a parameter. A predicate is a special kind of a delegate that
returns a boolean value. The predicate is applied for all items of the list. The
val is an input parameter specified without a type. We could
explicitly specify the type but it is not necessary. 

The compiler will expect an int type. The val is a
current input value from the list. It is compared if it is greater than 3 and a
boolean true or false is returned. Finally, the FindAll will
return all values that met the condition. They are assigned to the sublist
collection.

foreach (int i in subList)
{
    Console.WriteLine(i);
}

The items of the sublist collection are printed to the terminal.

$ dotnet run
8
6
4
7
9
5

Values from the list of integers that are greater than 3.

Program.cs
  

var nums = new List&lt;int&gt;() { 3, 2, 1, 8, 6, 4, 7, 9, 5 };

var nums2 = nums.FindAll( delegate(int i) {
        return i &gt; 3;
    }
);

foreach (int i in nums2)
{
    Console.WriteLine(i);
}

This is the same example. We use a anonymous delegate instead
of a lambda expression.

## C# calculating prime numbers

We are going to calculate prime numbers.

Program.cs
  

int[] nums = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 
    14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28 };

Console.Write("Prime numbers: ");

foreach (int num in nums)
{
    if (num == 1) continue;

    if (num == 2 || num == 3)
    {
        Console.Write(num + " ");
        continue;
    }

    int i = (int) Math.Sqrt(num);
    bool isPrime = true;

    while (i &gt; 1)
    {
        if (num % i == 0)
        {
            isPrime = false;
        }
        i--;
    }

    if (isPrime)
    {
        Console.Write(num + " ");
    }
}

Console.Write('\n');

In the above example, we deal with many various operators. A prime number (or a
prime) is a natural number that has exactly two distinct natural number
divisors: 1 and itself. We pick up a number and divide it by numbers, from 1 up
to the picked up number. Actually, we do not have to try all smaller numbers; we
can divide by numbers up to the square root of the chosen number. The formula
will work. We use the remainder division operator.

int[] nums = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 
    14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28 };

We calculate primes from these numbers.

if (num == 1) continue;

By definition, 1 is not a prime

if (num == 2 || num == 3)
{
    Console.Write(num + " ");
    continue;
}

We skip the calculations for 2 and 3: they are primes. Note the
usage of the equality and conditional or operators. The ==
has a higher precedence than the || operator.
So we do not need to use parentheses.

int i = (int) Math.Sqrt(num);

We are OK if we only try numbers smaller than the square root of a number in
question. It was mathematically proven that it is sufficient to take into 
account values up to the square root of the number in question.

while (i &gt; 1)
{
    ...
    i--;
}

This is a while loop. The i is the calculated square root of the
number. We use the decrement operator to decrease the i by one each loop cycle.
When the i is smaller than 1, we terminate the loop. For example, we have number
9. The square root of 9 is 3. We divide the 9 number by 3 and 2. 

if (num % i == 0)
{
    isPrime = false;
}

This is the core of the algorithm. If the remainder division operator returns 0
for any of the i values then the number in question is not a prime.

## Source

[C# operators and expressions](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/)

In this article we covered C# operators.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).