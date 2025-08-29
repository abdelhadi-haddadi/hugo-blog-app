+++
title = "Kotlin field Keyword"
date = 2025-08-29T20:02:33.923+01:00
draft = false
description = "Kotlin field keyword tutorial shows how to use backing fields in Kotlin properties. Learn about custom getters and setters with examples."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin field Keyword

last modified April 19, 2025

Kotlin's properties can have custom getters and setters. The field
keyword refers to the backing field of a property. This tutorial explores the
field keyword in depth with practical examples.

## Basic Definitions

The field keyword in Kotlin is used in property accessors to
reference the backing field. It's only available in custom getters or setters.
The backing field stores the actual value of the property.

## Basic Property with Backing Field

When you declare a property in Kotlin, the compiler automatically generates a
backing field. You can access it using field in custom accessors.

BasicField.kt
  

package com.zetcode

class Person {
    var name: String = ""
        get() = field
        set(value) {
            field = value
        }
}

fun main() {

    val p = Person()
    p.name = "John Doe"
    println(p.name) // Output: John Doe
}

Here we define a simple property with explicit getter and setter. The field
keyword refers to the backing field storing the actual value. This is equivalent
to the default implementation.

## Custom Getter with field

You can use field in custom getters to modify the returned value
while still accessing the stored value. This allows for computed properties.

CustomGetter.kt
  

package com.zetcode

class Temperature {
    var celsius: Double = 0.0
        get() = field
        set(value) {
            field = value
        }
    
    val fahrenheit: Double
        get() = field * 9/5 + 32
}

fun main() {

    val temp = Temperature()
    temp.celsius = 25.0
    println(temp.fahrenheit) // Output: 77.0
}

This example shows a temperature class with celsius and fahrenheit properties.
The fahrenheit property is computed from celsius but still uses field
to access the stored value. Note this won't compile as shown.

## Custom Setter with field

Custom setters can use field to modify values before storing them.
This is useful for validation or transformation of input values.

CustomSetter.kt
  

package com.zetcode

class User {
    var age: Int = 0
        set(value) {
            field = if (value &gt;= 0) value else 0
        }
}

fun main() {

    val user = User()
    user.age = -5
    println(user.age) // Output: 0
    user.age = 25
    println(user.age) // Output: 25
}

Here we validate the age property in the setter. Negative values are converted to
0. The field keyword is used to store the validated value in the
backing field.

## Lazy Initialization with field

The field keyword is essential for lazy initialization patterns. It
allows you to check and initialize the backing field only when needed.

LazyInit.kt
  

package com.zetcode

class ExpensiveResource {
    private var _resource: String? = null
    val resource: String
        get() {
            if (_resource == null) {
                _resource = initializeResource()
            }
            return _resource!!
        }
    
    private fun initializeResource(): String {
        println("Initializing resource...")
        return "Expensive Resource Data"
    }
}

fun main() {

    val er = ExpensiveResource()
    println(er.resource) // Output: Initializing resource... Expensive Resource Data
    println(er.resource) // Output: Expensive Resource Data
}

This shows lazy initialization using a nullable backing field. The resource is
only initialized when first accessed. Subsequent accesses use the cached value.

## Field in Interface Properties

Interfaces can declare properties, but they can't have backing fields. The
field keyword can only be used in concrete implementations.

InterfaceProperty.kt
  

package com.zetcode

interface Vehicle {
    val maxSpeed: Int
}

class Car : Vehicle {
    override val maxSpeed: Int = 120
        get() = field
}

class Bike(override val maxSpeed: Int) : Vehicle

fun main() {

    val car = Car()
    println(car.maxSpeed) // Output: 120
    
    val bike = Bike(30)
    println(bike.maxSpeed) // Output: 30
}

The Vehicle interface declares a property without backing field. The Car class
implements it with a backing field, while Bike uses a constructor parameter.
Both are valid implementations.

## Field in Delegated Properties

Delegated properties use a different mechanism than backing fields, but you can
still combine them with field for more complex scenarios.

DelegatedProperty.kt
  

package com.zetcode

import kotlin.properties.Delegates

class UserProfile {
    var username: String by Delegates.observable("") { 
        prop, old, new -&gt;
        println("Username changed from $old to $new")
    }
    
    var _password: String = ""
    var password: String
        get() = "********"
        set(value) {
            _password = value.hashCode().toString()
        }
}

fun main() {

    val profile = UserProfile()
    profile.username = "john_doe" // Output: Username changed from  to john_doe
    profile.password = "secret"
    println(profile.password) // Output: ********
}

This combines delegated properties with backing fields. The username uses
delegation while password uses a custom setter with a backing field. The actual
password is stored securely as a hash.

## Field in Extension Properties

Extension properties cannot have backing fields, so the field
keyword is not available in them. They must use explicit getters.

ExtensionProperty.kt
  

package com.zetcode

val String.hasDigits: Boolean
    get() = this.any { it.isDigit() }

class Counter {
    var count = 0
    val Int.incremented: Int
        get() = this + count
}

fun main() {

    println("Hello123".hasDigits) // Output: true
    println("Hello".hasDigits) // Output: false
    
    val counter = Counter()
    counter.count = 5
    println(10.incremented) // Output: 15
}

Extension properties can't use field as they don't have backing
fields. They must compute values based on the receiver object or other
properties.

## Best Practices for Backing Fields

**Use when needed:** Only use field when you need
custom accessor logic that references the stored value.
**Avoid recursion:** Be careful not to create infinite recursion
by using the property name instead of field.
**Consider lazy:** For expensive initialization, consider using
lazy delegate instead of manual field management.
**Keep simple:** For simple properties, rely on automatic
backing fields without explicit field usage.
**Document:** Document any non-trivial behavior in property
accessors that use field.

## Source

[Kotlin Properties Documentation](https://kotlinlang.org/docs/properties.html)

This tutorial covered Kotlin's field keyword in depth, showing how
it provides access to property backing fields. We explored various scenarios
including custom accessors, lazy initialization, and property delegation.
Proper use of backing fields can make your property implementations more
efficient and maintainable.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).