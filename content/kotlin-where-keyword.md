+++
title = "Kotlin where Keyword"
date = 2025-08-29T20:03:00.898+01:00
draft = false
description = "Kotlin where keyword tutorial shows how to apply multiple constraints to generic type parameters in Kotlin. Learn about type parameter constraints with examples."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin where Keyword

last modified April 19, 2025

Kotlin's generic type system allows constraining type parameters with multiple
requirements. The where keyword specifies these constraints. This
tutorial explores the where keyword in depth with practical examples.

## Basic Definitions

The where keyword in Kotlin applies multiple constraints to generic
type parameters. It's used when a type parameter must satisfy several conditions.
Constraints can include class/interface implementations and other type relations.

## Single Constraint with where

The simplest use of where applies one constraint to a type parameter.
This is equivalent to using a colon syntax but demonstrates the basic structure.

SingleConstraint.kt
  

package com.zetcode

interface Printable {
    fun print()
}

class Document : Printable {
    override fun print() = println("Printing document")
}

fun &lt;T&gt; printItem(item: T) where T : Printable {
    item.print()
}

fun main() {
    val doc = Document()
    printItem(doc) // Output: Printing document
}

Here we define a generic function printItem that requires its type
parameter T to implement Printable. The where clause enforces this
constraint. The Document class satisfies this requirement.

## Multiple Constraints on Single Type

The where keyword shines when you need multiple constraints on one
type parameter. This example requires a type to implement two interfaces.

MultipleConstraints.kt
  

package com.zetcode

interface Serializable {
    fun serialize(): String
}

interface Deserializable {
    fun deserialize(data: String)
}

class Config : Serializable, Deserializable {
    override fun serialize() = "Config data"
    override fun deserialize(data: String) = println("Loading: $data")
}

fun &lt;T&gt; processData(item: T) where T : Serializable, T : Deserializable {
    val data = item.serialize()
    item.deserialize(data)
}

fun main() {
    val config = Config()
    processData(config) // Output: Loading: Config data
}

The processData function requires its type parameter T to implement
both Serializable and Deserializable. The Config class meets these requirements,
so we can call the function with a Config instance.

## Constraints on Multiple Type Parameters

where can constrain multiple type parameters in a single declaration.
This is useful when types need to relate to each other in specific ways.

MultiTypeConstraints.kt
  

package com.zetcode

interface Producer&lt;out T&gt; {
    fun produce(): T
}

interface Consumer&lt;in T&gt; {
    fun consume(item: T)
}

fun &lt;T, U&gt; transform(
    producer: Producer&lt;T&gt;,
    consumer: Consumer&lt;U&gt;
) where T : U, U : Number {
    val item = producer.produce()
    consumer.consume(item)
}

class IntProducer : Producer&lt;Int&gt; {
    override fun produce() = 42
}

class NumberConsumer : Consumer&lt;Number&gt; {
    override fun consume(item: Number) = println("Consumed: $item")
}

fun main() {
    transform(IntProducer(), NumberConsumer()) // Output: Consumed: 42
}

This example shows constraints on two type parameters T and U. T must be a
subtype of U, and U must be a subtype of Number. The transform function can only
be called with types satisfying these relationships.

## Class with where Constraints

The where keyword can also be used with class declarations to
constrain their type parameters. This ensures all class methods have access to
the constrained types.

ClassConstraints.kt
  

package com.zetcode

interface Identifiable {
    val id: String
}

interface Timestamped {
    val timestamp: Long
}

class Repository&lt;T&gt;(private val items: List&lt;T&gt;) where T : Identifiable, T : Timestamped {
    fun findById(id: String): T? = items.find { it.id == id }
    
    fun getRecent(): List&lt;T&gt; {
        val now = System.currentTimeMillis()
        return items.filter { now - it.timestamp &lt; 3600000 }
    }
}

data class LogEntry(
    override val id: String,
    override val timestamp: Long,
    val message: String
) : Identifiable, Timestamped

fun main() {
    val logs = listOf(
        LogEntry("1", System.currentTimeMillis() - 1000, "Started"),
        LogEntry("2", System.currentTimeMillis() - 7200000, "Old entry")
    )
    
    val repo = Repository(logs)
    println(repo.findById("1")?.message) // Output: Started
    println(repo.getRecent().size)       // Output: 1
}

The Repository class requires its type parameter T to implement both Identifiable
and Timestamped. This allows the class methods to safely access id and timestamp
properties. LogEntry satisfies these constraints.

## Combining Class and Function Constraints

When both class and function have where constraints, they combine to
create even stricter type requirements. This provides fine-grained control over
generic types.

CombinedConstraints.kt
  

package com.zetcode

interface Named {
    val name: String
}

interface Priced {
    val price: Double
}

class Store&lt;T&gt; where T : Named {
    private val items = mutableListOf&lt;T&gt;()
    
    fun addItem(item: T) = items.add(item)
    
    fun &lt;U&gt; findCheaperThan(maxPrice: Double): List&lt;U&gt; 
        where U : T, U : Priced {
        return items.filterIsInstance&lt;U&gt;().filter { it.price &lt;= maxPrice }
    }
}

data class Product(
    override val name: String,
    override val price: Double
) : Named, Priced

fun main() {
    val store = Store&lt;Named&gt;()
    store.addItem(Product("Laptop", 999.99))
    store.addItem(Product("Mouse", 25.50))
    
    val affordable = store.findCheaperThan&lt;Product&gt;(100.0)
    println(affordable.map { it.name }) // Output: [Mouse]
}

The Store class constrains T to Named, while its findCheaperThan method further
requires U to be both a subtype of T and implement Priced. This ensures we can
access both name and price properties in the filtered results.

## Recursive Type Constraints

where clauses can express recursive type constraints, where a type
parameter must relate to itself in specific ways. This is useful for comparison
operations.

RecursiveConstraints.kt
  

package com.zetcode

interface Comparable&lt;in T&gt; {
    fun compareTo(other: T): Int
}

fun &lt;T&gt; max(a: T, b: T): T where T : Comparable&lt;T&gt; {
    return if (a.compareTo(b) &gt;= 0) a else b
}

data class Version(val major: Int, val minor: Int) : Comparable&lt;Version&gt; {
    override fun compareTo(other: Version): Int {
        return when {
            major != other.major -&gt; major - other.major
            else -&gt; minor - other.minor
        }
    }
}

fun main() {
    val v1 = Version(2, 5)
    val v2 = Version(2, 7)
    println(max(v1, v2)) // Output: Version(major=2, minor=7)
}

The max function requires T to implement Comparable&lt;T&gt;, meaning instances of T
can be compared to other instances of T. Version satisfies this constraint by
implementing compareTo for Version objects.

## Complex Multiple Type Relationships

The most powerful use of where establishes complex relationships
between multiple type parameters. This example shows a data processor with
multiple constraints.

ComplexRelationships.kt
  

package com.zetcode

interface Entity&lt;ID&gt; {
    val id: ID
}

interface Repository&lt;E, ID&gt; where E : Entity&lt;ID&gt;, ID : Comparable&lt;ID&gt; {
    fun save(entity: E): E
    fun findById(id: ID): E?
}

data class User(
    override val id: String,
    val name: String
) : Entity&lt;String&gt;

class UserRepository : Repository&lt;User, String&gt; {
    private val storage = mutableMapOf&lt;String, User&gt;()
    
    override fun save(entity: User): User {
        storage[entity.id] = entity
        return entity
    }
    
    override fun findById(id: String) = storage[id]
}

fun main() {
    val repo = UserRepository()
    val user = repo.save(User("123", "Alice"))
    println(repo.findById("123")?.name) // Output: Alice
}

This example establishes that E must be an Entity&lt;ID&gt; and ID must be
Comparable&lt;ID&gt;. The UserRepository implements this interface with String as ID
and User as E. String is Comparable, and User implements Entity&lt;String&gt;.

## Best Practices for where Clauses

**Use for multiple constraints:** The where keyword
is most valuable when you need multiple constraints on type parameters.
**Improve readability:** where often makes complex
generic declarations more readable than inline constraints.
**Consider type safety:** Well-designed constraints catch type
errors at compile time rather than runtime.
**Balance flexibility:** Avoid over-constraining types unless
necessary for your implementation.
**Document constraints:** Complex constraints should be well
documented to help other developers understand requirements.

## Source

[Kotlin Generics Documentation](https://kotlinlang.org/docs/generics.html)

This tutorial covered Kotlin's where keyword in depth, showing how
to apply multiple constraints to generic type parameters. We explored various
scenarios from simple to complex type relationships. Proper use of constraints
can make your generic code more type-safe while maintaining flexibility.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).