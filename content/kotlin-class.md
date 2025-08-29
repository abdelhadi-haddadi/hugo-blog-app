+++
title = "Kotlin class"
date = 2025-08-29T20:02:26.175+01:00
draft = false
description = "Kotlin classes tutorial shows how to work with classes in Kotlin language. A class is a blueprint for an object in Kotlin."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin class

last modified January 29, 2024

This article shows how to work with classes in Kotlin language. A class is a
blueprint for an object in Kotlin.

There are three widely used programming paradigms: procedural programming,
functional programming, and object-oriented programming. Kotlin supports all
of them. In object-oriented programming, we solve complex probles using objects.

Object-oriented programming (OOP) is a programming paradigm that uses
objects and their interactions to design applications and computer programs.

## Kotlin class

Objects are created from classes. A class is a blueprint for an object; it
shares common properties and behaviour in form of members and member functions.

In Kotlin, a class is declared with the class keyword.

The class declaration consists of the class name, the class header (specifying
its type parameters, the primary constructor etc.) and the class body. The class
body is specified inside two curly braces. Both the header and the body are
optional. If the class has no body, curly braces can be omitted.

## Kotlin simple class example

In the following example, we create a simple object from a class.

SimpleClass.kt
  

package com.zetcode

class Simple {

    private val name = "Simple"
    fun info() = "This is $name class"
}

fun main() {

    val s = Simple()
    println(s)
    println(s.info())
}

In the example, we declare a Simple class and later create an
object from it.

class Simple {

    private val name = "Simple"
    fun info() = "This is $name class"
}

A class in Kotlin is created with the class keyword. Inside our
class, we have one property (member) and one function.

val s = Simple()

A new object is created from the Simple class. In Kotlin, we don't
use the new keyword to create an instance.

println(s.info())

Using the dot operator, we call the object's info function.

com.zetcode.Simple@3cd1a2f1
This is Simple class

## Kotlin empty class

In the following example, we create two empty classes.

EmptyClass.kt
  

package com.zetcode

class Being {}
class Empty

fun main() {

    val b = Being()
    println(b)

    val e = Empty()
    println(e)
}

An empty class has no members or member functions. The curly brackets can be
omitted.

## Kotlin primary constructor

A Kotlin class can have a primary constructor and one or more secondary
constructors. The primary constructor is part of the class header: it goes
after the class name (and optional type parameters).

class User constructor(name: String, email: String) {  }

Here we use the constructor keyword.

class User (name: String, email: String) {  }

If the primary constructor does not have any annotations or visibility
modifiers (such as public), the constructor keyword can be omitted.

The primary constructor cannot contain any code. The initialization code can be
placed in initializer blocks, they are created with the init
keyword.

PrimaryConstructor.kt
  

package com.zetcode

//class User constructor (_name: String, _email: String) {
class User(name: String, email: String) {

    private val name = name
    private val email = email

    override fun toString(): String {

        return "User $name has email $email"
    }
}

fun main() {

    val u = User("Peter Novak", "pnovak47@gmail.com")
    println(u)
}

In the example, we have a User class with a primary constructor.
We have two members and one overriden function.

User Peter Novak has email pnovak47@gmail.com

## Kotlin open class

Kotlin classes are final by default. Other classes cannot inherit from a final
class. To make a class inheritable, we mark it with the open
keyword.

OpenClass.kt
  

package com.zetcode

open class Being(private val alive: Boolean = true) {

    fun isAlive(): Boolean {

        return alive
    }
}

class Dog(val name: String): Being() {

    fun bark(): String {

        return "woof-woof"
    }
}

fun main() {

    val d = Dog("Rusty")

    println(d.bark())
    println(d.name)
    println(d.isAlive())
}

We have an open Being class. The Dog class inherits
from Being.

println(d.isAlive())

We can call the isAlive function on the Dog class,
because it was inherited from its parent Being class.

woof-woof
Rusty
true

## Kotlin data class

Some classes are desinged to hold data. With data classes, we can considerably
reduce the boilerplate code. Compiler automatically creates the equals,
hashCode, toString, and copy functions.

A data class in Kotlin is created with the data keyword.

The data classes must follow a couple of rules. The primary constructor needs
to have at least one parameter. All primary constructor parameters must be
marked as val or var. The data classes cannot be abstract, open, sealed or
inner.

DataClass.kt
  

package com.zetcode

data class User(val name: String, val email: String)

fun main() {

    val u = User("Peter Novak", "pnovak47@gmail.com")
    println(u)

    println(u.name)
    println(u.email)

    val (name, email) = u;
    println("$name $email")

    val u2 = User("Peter Novak", "pnovak47@gmail.com")

    println(u == u2)
    println(u === u2)
}

In the example, we have one data class: User.

data class User(val name: String, val email: String)

A data class is prefixed with the data keyword.

val u = User("Peter Novak", "pnovak47@gmail.com")
println(u)

Here we call the toString method, which has been created for us.

val (name, email) = u;
println("$name $email")

We can extract the properties from the data class using desctructuring
declaration.

User(name=Peter Novak, email=pnovak47@gmail.com)
Peter Novak
pnovak47@gmail.com
Peter Novak pnovak47@gmail.com
true
false

## Kotlin nested class

A nested class is declared inside another class.

NestedClass.kt
  

package com.zetcode

class Outer {

    val name = "Outer"
    fun show() = "the name: $name"

    class Nested {
        val name = "Nested"
        fun show() = "the name: $name"
    }
}

fun main() {

    println(Outer().show())
    println(Outer.Nested().show())
}

In order to access the nested class, we specify the name of its outer class.
So the show function of the nested class is invoked like this:
Outer.Nested().show. A nested class cannot access the members
of the outer class.

## Kotlin inner class

Inner classes are created with the inner keyword. Unlike nested
classes, they can access the members of their outer classes.

InnerClass.kt
  

package com.zetcode

class Outer {

    val name1 = "Outer"
    fun show() = "the name: $name1"

    inner class Inner {

        val name2 = "Inner"
        fun show() = "data: $name2 and $name1"
    }
}

fun main() {

    println(Outer().show())
    println(Outer().Inner().show())
}

In the example, we have one inner class. Its show function outputs
the name1 member of the Outer class.

## Kotlin abstract class

An abstract class, member, or member function is created with the
abstract keyword. If a class inherits from an abstract class, it
must implement all its abstract members and member functions. The implemented
members and member functions must be prefixed with the override
keyword. We cannot create an instance from an abstract class. Abstract classes
are implicitly open, since they are useless if they don't have any concrete
subclasses.

An abstract class is conceptually similar to an interface. Unlike an interface,
an abstract class can have state. While a class can implement multiple
interfaces, it can inherit only from one abstract class.

Abstract classes are used when building a hierarchy of classes; they serve as
a grouping of some shared functionality for related classes.

AbstractClass.kt
  

package com.zetcode

abstract class Shape() {

    abstract var w: Int
    abstract var h: Int

    abstract fun area(): Int

    fun info(): String {
        return "width: $w; height: $h"
    }
}

class Rectangle(override var w: Int, override var h: Int): Shape() {

    override fun area(): Int {
        return w * h;
    }
}

fun main() {

    val r = Rectangle(5, 6)
    println(r.area())
    println(r.info());
}

In the example, we have an abstract Shape class. It is not possible
to create a shape, because it is too generic. We can only create a descendant of
a shape; for instance, a rectangle.

abstract var w: Int
abstract var h: Int

abstract fun area(): Int

Here we have two abstract variables and an abstract function. We must provide
an implementation for them in the subclass.

## Kotlin sealed class

A sealed class is used for representing restricted class hierarchies. A value
can have one of the types from a limited set, but cannot have any other type.
Sealed classes are more powerful enum classes.

**Note:** in some languages, such as C# or Scala, a sealed class is
a class which prohibits inheritance.

Sealed classes are abstract and can have abstract members; this means that they
cannot be instantiated directly. Sealed classes cannot have public constructors
(The constructors are private by default). Sealed classes can have subclasses,
but they must either be in the same file or nested inside of the sealed class
declaration.

SealedClass.kt
  

package com.zetcode

sealed class Shape
class Circle(var radius: Float) : Shape()
class Square(var width: Int) : Shape()
class Rectangle(var width: Int, var height: Int) : Shape()

fun getArea(e: Shape) =
    when (e) {
        is Circle -&gt; println("Circle area is ${Math.PI * e.radius * e.radius}")
        is Square -&gt; println("Square area is ${e.width * e.width}")
        is Rectangle -&gt; println("Rectangle area is ${e.width * e.height}")
    }

fun main() {

    val circle = Circle(7f)
    val square = Square(5)
    val rectangle = Rectangle(8, 6)

    getArea(circle)
    getArea(square)
    getArea(rectangle)
}

In the example, we have a sealed Shape class. It has three subclasses:
Circle, Square, and Rectangle.

fun getArea(e: Shape) =
    when (e) {
        is Circle -&gt; println("Circle area is ${Math.PI * e.radius * e.radius}")
        is Square -&gt; println("Square area is ${e.width * e.width}")
        is Rectangle -&gt; println("Rectangle area is ${e.width * e.height}")
    }

The getArea function calculates the area for a shape. Note that 
the else statement is not needed, since the compiler knows that 
the list of options is exhaustive.

Circle area is 153.93804002589985
Square area is 25
Rectangle area is 48

SealedClass2.kt
  

```
package com.zetcode

sealed class Shape {
    class Circle(var radius: Float) : Shape()
    class Square(var width: Int) : Shape()
    class Rectangle(var width: Int, var height: Int) : Shape()
}

fun getArea(e: Shape) =
    when (e) {
        is Shape.Circle -&gt; println("Circle area is ${Math.PI * e.radius * e.radius}")
        is Shape.Square -&gt; println("Square area is ${e.width * e.width}")
        is Shape.Rectangle -&gt; println("Rectangle area is ${e.width * e.height}")
    }

fun main() {

    val circle = Shape.Circle(7f)
    val square = Shape.Square(5)
    val rectangle = Shape.Rectangle(8, 6)

    getArea(circle)
    getArea(square)
    getArea(rectangle)
}

```

In this example, the subclasses are nested inside the Shape class.

## Source

[Kotlin classes - language reference](https://kotlinlang.org/docs/classes.html)

In this article we have covered classes in Kotlin.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).