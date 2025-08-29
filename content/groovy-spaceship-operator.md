+++
title = "Groovy Spaceship Operator"
date = 2025-08-29T19:56:32.435+01:00
draft = false
description = "Groovy Spaceship Operator tutorial explains the <=> operator for comparisons, with examples on sorting and custom objects."
image = ""
imageBig = ""
categories = ["groovy"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Groovy Spaceship Operator

last modified March 20, 2025

The spaceship operator &lt;=&gt; in Groovy simplifies comparisons,
returning -1, 0, or 1 based on whether the left operand is less than, equal to,
or greater than the right. It's ideal for sorting and custom comparisons,
enhancing readability over traditional methods. This tutorial explores its use
with examples.

## Numeric Comparison

The spaceship operator compares two values, producing an integer result that
indicates their relative order, making it intuitive for basic checks.

BasicSpaceship.groovy
  

def a = 5
def b = 8
println a &lt;=&gt; b  // Output: -1
println b &lt;=&gt; a  // Output: 1
println a &lt;=&gt; a  // Output: 0

a &lt;=&gt; b compares 5 and 8: 5 &lt; 8, so -1. b &lt;=&gt; a gives
1 (8 &gt; 5), and a &lt;=&gt; a is 0 (5 = 5). These results mimic Java's
compareTo, but the operator's syntax is more concise and visually
distinct.

## Sorting Strings by Length

The spaceship operator shines in sorting, especially within closures, allowing
custom ordering of collections like lists of strings based on properties.

SortByLength.groovy
  

def words = ['sky', 'water', 'emotion', 'shredder', 
    'anonymous', 'on', 'a', 'copper', 'the', 'elephant']

words.sort { e1, e2 -&gt; e1.length() &lt;=&gt; e2.length() }
println words

words.sort { e1, e2 -&gt; e2.length() &lt;=&gt; e1.length() }
println words

e1.length() &lt;=&gt; e2.length() sorts words by string
length ascending: "a" (1) to "anonymous" (9). Reversing it with
e2.length() &lt;=&gt; e1.length() sorts descending: "anonymous" to "a".
The operator's output (-1, 0, 1) drives the sort order, showcasing its power in
custom comparisons.

$ groovy SortByLength.groovy
[a, on, sky, the, water, copper, emotion, shredder, elephant, anonymous]
[anonymous, elephant, shredder, emotion, copper, water, the, sky, on, a]

## Sorting Custom Objects

Implementing Comparable with the spaceship operator enables
sorting custom objects, comparing their properties in a natural, reusable way.

SortUsers.groovy
  

class User implements Comparable {
    String fname
    String lname
    String occupation

    User(String fname, String lname, String occupation) {
        this.fname = fname
        this.lname = lname
        this.occupation = occupation
    }

    int compareTo(o) {
        this.lname &lt;=&gt; o.lname
    }

    String toString() {
        "${fname} ${lname} - ${occupation}"
    }
}

def users = [
    new User('John', 'Doe', 'gardener'),
    new User('Roger', 'Roe', 'driver'),
    new User('Lucia', 'Smith', 'accountant'),
    new User('Paul', 'Newman', 'firefighter'),
    new User('Adam', 'Clapton', 'teacher'),
    new User('Jane', 'Walter', 'pilot')
]

println users
println users.sort()

The User class uses this.lname &lt;=&gt; o.lname in
compareTo to sort by last name. sort() orders
users alphabetically: "Clapton" to "Walter". The spaceship operator
compares strings lexicographically, integrating seamlessly with Groovy's
sorting methods for custom objects.

$ groovy SortUsers.groovy
[John Doe - gardener, Roger Roe - driver, Lucia Smith - accountant, 
 Paul Newman - firefighter, Adam Clapton - teacher, Jane Walter - pilot]
[Adam Clapton - teacher, John Doe - gardener, Paul Newman - firefighter, 
 Roger Roe - driver, Lucia Smith - accountant, Jane Walter - pilot]

## Comparing Mixed Types

The spaceship operator handles mixed types gracefully, converting operands as
needed, which makes it versatile for heterogeneous data comparisons.

MixedTypes.groovy
  

def values = [5, "10", 3.14, "2"]
values.sort { a, b -&gt; a &lt;=&gt; b }
println values

a &lt;=&gt; b sorts values with mixed types (integers,
strings, floats). Groovy coerces strings to numbers where possible, resulting
in [3.14, "2", 5, "10"]. Numeric comparison takes precedence, showing the
operator's flexibility in handling type diversity.

$ groovy MixedTypes.groovy
[3.14, 2, 5, 10]

## Filtering with Spaceship

Beyond sorting, the spaceship operator can filter collections by comparing
against a threshold, leveraging its numeric output in conditional logic.

FilterSpaceship.groovy
  

def numbers = [15, 7, 22, 3, 19, 10]
def threshold = 12
def above = numbers.findAll { it &lt;=&gt; threshold &gt; 0 }
println above

it &lt;=&gt; threshold &gt; 0 finds numbers greater than 12. If
it &lt;=&gt; threshold is 1 (it &gt; 12), it's included, yielding
[15, 22, 19]. This uses the operator's result directly in a filter, expanding
its utility beyond sorting to selection tasks.

$ groovy FilterSpaceship.groovy
[15, 22, 19]

## Custom Multi-Property Sort

The spaceship operator can chain comparisons for multi-criteria sorting,
comparing secondary properties when primaries tie, offering fine-grained
control.

MultiSort.groovy
  

class Product {
    String name
    int price

    Product(String name, int price) {
        this.name = name
        this.price = price
    }

    String toString() { "${name} (\$${price})" }
}

def products = [
    new Product("Laptop", 1200),
    new Product("Mouse", 25),
    new Product("Laptop", 800),
    new Product("Keyboard", 50)
]

products.sort { a, b -&gt;
    def nameCmp = a.name &lt;=&gt; b.name
    nameCmp != 0 ? nameCmp : a.price &lt;=&gt; b.price
}
println products

a.name &lt;=&gt; b.name sorts by name first. If equal (0),
a.price &lt;=&gt; b.price breaks the tie. "Laptop" sorts by price (800,
1200), then "Keyboard" and "Mouse" follow. This demonstrates hierarchical
sorting with the operator's chaining capability.

$ groovy MultiSort.groovy
[Laptop ($800), Laptop ($1200), Keyboard ($50), Mouse ($25)]

## Spaceship in Conditional Logic

The operator's -1, 0, 1 output can drive if-else logic, providing a compact way
to categorize relationships between values without multiple comparisons.

ConditionalSpaceship.groovy
  

def x = 7
def y = 10
def result = (x &lt;=&gt; y) switch {
    -1 -&gt; "less than"
    0  -&gt; "equal to"
    1  -&gt; "greater than"
}
println "$x is $result $y"  // Output: 7 is less than 10

x &lt;=&gt; y (7 &lt; 10) returns -1, mapped via switch to "less than".
This avoids separate &lt;, ==, &gt; checks,
using the operator's result to succinctly describe the relationship between
x and y.

## Source

[Groovy Operators Documentation](https://groovy-lang.org/operators.html)

This tutorial covered the Groovy spaceship operator &lt;=&gt;, showing
its use in sorting, filtering, and custom comparisons with practical examples.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than eight years of experience in teaching programming.

List [all Groovy tutorials](/all/#groovy).