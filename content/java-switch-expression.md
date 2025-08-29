+++
title = "Java switch expression"
date = 2025-08-29T20:00:38.052+01:00
draft = false
description = "In this article we show how to work with switch expressions in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java switch expression

last modified May 31, 2025

 

In this article we show how to work with switch expressions in Java.

*Switch expressions* offer a more concise and readable way to write
multi-way branching logic. They are a powerful enhancement for the classic
switch statements. 

Unlike traditional switch statements, the switch expressions can return values.

Java switch expressions support using multiple case labels. These are also
called arms. Each case label is followed by the -&gt; arrow syntax.

The switch expressions must be exhaustive. With the exception of few cases such 
as enumerations, where the compiler can determine all possible options, we must 
use the default arm. It is executed when no other option matches.

Main.java
  

void main() {

    System.out.print("Enter a domain: ");

    try (var sc = new Scanner(System.in)) {

        String domain = sc.nextLine();
        domain = domain.trim().toLowerCase();

        switch (domain) {

            case "us" -&gt; System.out.println("United States");
            case "de" -&gt; System.out.println("Germany");
            case "sk" -&gt; System.out.println("Slovakia");
            case "hu" -&gt; System.out.println("Hungary");
            default -&gt; System.out.println("Unknown");
        }
    }
}

The user is requested to enter a domain name. The domain name is read and stored
in a variable. The variable is tested with the switch keyword against a list of
options. In our program, we have a domain variable. We read a value for the
variable from the command line. 

case "us" -&gt; System.out.println("United States");

We use the case statement to test for the value of the variable. There are
several options. If, for instance, the value equals to "us", the "United States"
string is printed to the console. Once an option matches, no other arms are 
evaluated.

default -&gt; System.out.println("Unknown");

The default branch is executed when the value does not match any 
previous branch.

## Using enumerations

In the next example, we work with enumerations.

Main.java
  

void main() {

    Season season = Season.randomSeason();

    String msg = switch (season) {

        case Season.SPRING -&gt; "Spring";
        case Season.SUMMER -&gt; "Summer";
        case Season.AUTUMN -&gt; "Autumn";
        case Season.WINTER -&gt; "Winter";
    };

    System.out.println(msg);
}

enum Season {
    SPRING,
    SUMMER,
    AUTUMN,
    WINTER;

    public static Season randomSeason() {
        
        var random = new Random();
        int ridx = random.nextInt(Season.values().length);
        return Season.values()[ridx];
    }
}

We define a Season enumeration. The enumeration contains a 
randomSeason method which creates a Season value 
randomly. Depending on the chosen value, we print a message.

var msg = switch (season) {

    case Season.Spring -&gt; "Spring";
    case Season.Summer -&gt; "Summer";
    case Season.Autumn -&gt; "Autumn";
    case Season.Winter -&gt; "Winter";
};

System.out.println(msg);

We check the value against the switch expression. The expression returns the
string representation of the enum. Note that the switch expression is
exhaustive.

## Checking multiple options

We can check multiple options in one branch.

Main.java
  

void main() {

    Grade grade = Grade.randomGrade();

    String msg = switch (grade) {

        case Grade.A, Grade.B, Grade.C, Grade.D, Grade.E, Grade.F -&gt; "passsed";
        case Grade.FX -&gt; "failed";
    };

    System.out.printf("%s - %s", grade - msg");
}

enum Grade {
    A, B, C, D, E, F, FX;

    public static Grade randomGrade() {

        var random = new Random();
        int rdx = random.nextInt(Grade.values().length);
        return Grade.values()[rdx];
    }
}

We have a list of grades. For A throug F grades, we pass the example. For the FX
grade, we fail the exam.

String msg = switch (grade) {

    case Grade.A, Grade.B, Grade.C, Grade.D, Grade.E, Grade.F -&gt; "passsed";
    case Grade.FX -&gt; "failed";
};

We check six options in the first branch. They are separated with a comma.

## Checking types

In the following program, we check the types of values.

Main.java
  

void main() {

    List&lt;Object&gt; objects = List.of("falcon", new BigDecimal(120001212),
            new int[] { 1, 2, 3, 4, 5 }, new String[] { "sky", "blue", "rock" });

    objects.forEach(e -&gt; System.out.println(checkType(e)));
}

String checkType(Object o) {

    return switch (o) {

        case String str -&gt; "String";
        case BigDecimal bd -&gt; "BigDecimal";
        case Integer i -&gt; "Integer";
        case int[] ai -&gt; "Array of integers";
        case String[] as -&gt; "Array of strings";
        default -&gt; "n/a";
    };
}

We have a list of objects of various types. Using switch expression, we
determine the type of each value.

return switch (o) {

    case String str -&gt; "String";
    case BigDecimal bd -&gt; "BigDecimal";
    case Integer i -&gt; "Integer";
    case int[] ai -&gt; "Array of integers";
    case String[] as -&gt; "Array of strings";
    default -&gt; "n/a";
};

After the case keyword, we provide the type. If the type matches, the arm is 
executed and the corresponding string is returned.

## When guards

When guards can be used to apply simple expressions on options. The expressions
can be compined with &amp;&amp; and || operators.

Main.java
  

void main() {

    int[] ages = { 12, 23, 45, 0, 67, 88, 43, 55, -4};

    Arrays.stream(ages).forEach(e -&gt; System.out.printf("%s - %s%n", e, checkAge(e)));
}

String checkAge(Integer age) {

    return switch (age) {

        case Integer i when i &lt; 18 &amp;&amp; i &gt; 0-&gt; "minor";
        case Integer i when i &gt;= 18 &amp;&amp; i &lt; 64 -&gt; "adult";
        case Integer i when i &gt; 64 -&gt; "senior";
        default -&gt; "n/a";
    };
}

We have an array of integers representing ages. We use the switch expression to 
map the values into age categories. 

return switch (age) {

    case Integer i when i &lt; 18 &amp;&amp; i &gt; 0-&gt; "minor";
    case Integer i when i &gt;= 18 &amp;&amp; i &lt; 64 -&gt; "adult";
    case Integer i when i &gt; 64 -&gt; "senior";
    default -&gt; "n/a";
};

After the when keyword, we use the &lt; 18 &amp;&amp; i &gt; 0-&gt;
expression to check if the number falls between 0 and 18.

## Null values

It is possible to check for nulls in switch expressions.

Main.java
  

void main() {

    List&lt;Integer&gt; data = new ArrayList&lt;&gt;();

    data.add(2);
    data.add(5);
    data.add(0);
    data.add(null);
    data.add(-4);
    data.add(6);

    data.forEach(e -&gt; System.out.printf("%s - %s%n", e, checkValue(e)));
}

String checkValue(Integer i) {

    return switch (i) {
        case null -&gt; "null value";
        case 0 -&gt; "zero value";
        case Integer n when n &gt; 0 -&gt; "positive value";
        case Integer n when n &lt; 0 -&gt; "negative value";
        default -&gt; "n/a";
    };
};

We have a list of integers; there is also one null value.

case null -&gt; "null value";

This arm checks if the value is null.

## Record fields

It is possible to check record fields in when guards.

Main.java
  

void main() {

    var points = List.of(Point.of(0, 0), Point.of(-3, -3), Point.of(-3, -3),
            Point.of(12, -1));

    points.forEach(p -&gt; System.out.printf("%s - %s%n", p, checkQuadrant(p)));
}

String checkQuadrant(Point p) {

    return switch (p) {

        case Point(var x, var y) when x == 0 &amp;&amp; y == 0 -&gt; "origin";
        case Point(var x, var y) when x &gt; 0 &amp;&amp; y &gt; 0 -&gt; "Q I";
        case Point(var x, var y) when x &lt; 0 &amp;&amp; y &gt; 0 -&gt; "Q II";
        case Point(var x, var y) when x &lt; 0 &amp;&amp; y &lt; 0 -&gt; "Q III";
        case Point(var x, var y) when x &gt; 0 &amp;&amp; y &lt; 0 -&gt; "Q IV";
        default -&gt; "n/a";
    };
};

record Point(int x, int y) {
    static Point of(int x, int y) {
        return new Point(x, y);
    }
}

We have a list of points of a coordinate system. We map each point to its 
corresponding quadrant.

return switch (p) {

    case Point(var x, var y) when x == 0 &amp;&amp; y == 0 -&gt; "origin";
    case Point(var x, var y) when x &gt; 0 &amp;&amp; y &gt; 0 -&gt; "Q I";
    case Point(var x, var y) when x &lt; 0 &amp;&amp; y &gt; 0 -&gt; "Q II";
    case Point(var x, var y) when x &lt; 0 &amp;&amp; y &lt; 0 -&gt; "Q III";
    case Point(var x, var y) when x &gt; 0 &amp;&amp; y &lt; 0 -&gt; "Q IV";
    default -&gt; "n/a";
};

The record follows the case keyword. After the when
guard, we can work with the fields in expression directly.

## FizzBuzz with Switch Expression

You can use a switch expression with when guards to implement the classic
FizzBuzz problem in a concise and expressive way. This approach leverages
pattern matching and guards to handle multiple conditions cleanly.

Main.java
  

void main() {

    IntStream.range(1, 101).forEach(this::doFizzBuzz);
}

void doFizzBuzz(int e) {

    switch (e) {

        case int n when n % 3 == 0 &amp;&amp; n % 5 == 0 -&gt; System.out.println("FizzBuzz");
        case int n when n % 3 == 0 -&gt; System.out.println("Fizz");
        case int n when n % 5 == 0 -&gt; System.out.println("Buzz");
        default -&gt; System.out.println(e);
    }
}

In this example, the doFizzBuzz method uses a switch expression
with when guards to print "Fizz" for numbers divisible by 3, "Buzz" for numbers
divisible by 5, and "FizzBuzz" for numbers divisible by both. All other numbers
are printed as-is. This demonstrates how switch expressions can simplify complex
conditional logic.

## Source

[Java language - reference](https://docs.oracle.com/en/java/javase/21/)

In this article we were talking about switch expressions in Java.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).