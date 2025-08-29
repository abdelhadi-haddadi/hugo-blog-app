+++
title = "Kotlin expect Keyword"
date = 2025-08-29T20:02:31.684+01:00
draft = false
description = "Kotlin expect keyword tutorial shows how to use expect/actual declarations in Kotlin Multiplatform projects. Learn about platform-specific implementations with examples."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin expect Keyword

last modified April 19, 2025

Kotlin Multiplatform projects use the expect and actual
keywords to define platform-specific implementations. The expect
keyword declares an API that must be implemented for each target platform.

## Basic Definitions

The expect keyword marks a declaration that is expected to have
platform-specific implementations. It's paired with actual
declarations in platform modules. This mechanism enables sharing common code
while allowing platform differences.

## Basic expect/actual Function

The simplest use case is declaring an expected function that each platform must
implement. The common module defines the expected signature and return type.

CommonModule.kt
  

package com.zetcode.common

expect fun getPlatformName(): String

JvmModule.kt
  

```
package com.zetcode.jvm

actual fun getPlatformName(): String = "JVM"

```

The common module declares an expected function getPlatformName.
The JVM module provides the actual implementation. Other platforms would have
their own implementations. The compiler ensures all expected declarations have
actual implementations.

## expect/actual Class

Classes can also be declared with expect and implemented
differently on each platform. The common module defines the expected interface
while platform modules provide implementations.

CommonModule.kt
  

package com.zetcode.common

expect class PlatformTimer {
    fun start()
    fun stop()
    fun getCurrentTime(): Long
}

JvmModule.kt
  

```
package com.zetcode.jvm

import java.time.Instant

actual class PlatformTimer {
    private var running = false
    private var startTime: Instant? = null
    
    actual fun start() {
        running = true
        startTime = Instant.now()
    }
    
    actual fun stop() {
        running = false
    }
    
    actual fun getCurrentTime(): Long {
        return Instant.now().toEpochMilli() - 
            (startTime?.toEpochMilli() ?: 0)
    }
}

```

The common module declares an expected PlatformTimer class with
three methods. The JVM implementation uses Java's Instant class.
Other platforms would use their native timing mechanisms while maintaining the
same interface.

## expect/actual Property

Properties can be declared with expect and implemented differently
on each platform. This is useful for platform-specific constants or values.

CommonModule.kt
  

package com.zetcode.common

expect val platformLineSeparator: String

JvmModule.kt
  

```
package com.zetcode.jvm

actual val platformLineSeparator: String = System.lineSeparator()

```

NativeModule.kt
  

```
package com.zetcode.native

actual val platformLineSeparator: String = "\n"

```

The common module expects a line separator property. The JVM implementation uses
System.lineSeparator while the native implementation uses a simple
newline character. This allows platform-appropriate behavior while maintaining a
consistent API.

## expect/actual Object

Singleton objects can be declared with expect and implemented
differently on each platform. This is useful for platform-specific services.

CommonModule.kt
  

package com.zetcode.common

expect object PlatformService {
    fun initialize()
    fun getVersion(): String
    fun shutdown()
}

JvmModule.kt
  

```
package com.zetcode.jvm

actual object PlatformService {
    private var initialized = false
    
    actual fun initialize() {
        // JVM-specific initialization
        initialized = true
    }
    
    actual fun getVersion(): String {
        return System.getProperty("java.version")
    }
    
    actual fun shutdown() {
        // JVM-specific cleanup
        initialized = false
    }
}

```

The common module declares an expected singleton object with three methods. The JVM
implementation uses Java system properties and maintains initialization state.
Other platforms would provide their own implementations while keeping the same
interface.

## expect/actual with Default Implementation

An expected declaration can provide a default implementation that platforms can
optionally override. This reduces boilerplate when platforms share behavior.

CommonModule.kt
  

package com.zetcode.common

expect class FileHandler {
    fun readFile(path: String): String
    fun writeFile(path: String, content: String)
    
    fun fileExists(path: String): Boolean {
        // Default implementation
        return try {
            readFile(path)
            true
        } catch (e: Exception) {
            false
        }
    }
}

JvmModule.kt
  

```
package com.zetcode.jvm

import java.io.File

actual class FileHandler {
    actual fun readFile(path: String): String {
        return File(path).readText()
    }
    
    actual fun writeFile(path: String, content: String) {
        File(path).writeText(content)
    }
    
    // Inherits default fileExists implementation
}

```

The common module declares FileHandler with two abstract methods and
one default implementation. The JVM module implements the abstract methods using
Java's File class and inherits the default fileExists
implementation. Platforms can override defaults when needed.

## expect/actual Enum Class

Enum classes can be declared with expect and implemented differently
on each platform. This allows platform-specific enum entries or behaviors.

CommonModule.kt
  

package com.zetcode.common

expect enum class PlatformType {
    DESKTOP, MOBILE, WEB, EMBEDDED;
    
    abstract fun getDisplayName(): String
}

JvmModule.kt
  

```
package com.zetcode.jvm

actual enum class PlatformType {
    DESKTOP {
        override fun getDisplayName() = "Java Desktop"
    },
    MOBILE {
        override fun getDisplayName() = "Android"
    },
    WEB {
        override fun getDisplayName() = "JVM Web"
    },
    EMBEDDED {
        override fun getDisplayName() = "JVM Embedded"
    };
    
    actual override fun getDisplayName(): String
}

```

The common module declares an expected enum with an abstract method. The JVM
implementation provides platform-specific display names for each enum entry. Other
platforms would implement their own versions with appropriate display names.

## expect/actual Interface

Interfaces can be declared with expect and implemented differently
on each platform. This is useful for platform-specific functionality behind a
common interface.

CommonModule.kt
  

package com.zetcode.common

expect interface PlatformStorage {
    fun saveData(key: String, value: String)
    fun loadData(key: String): String?
    fun clearData(key: String)
}

JvmModule.kt
  

```
package com.zetcode.jvm

import java.util.prefs.Preferences

actual class PlatformStorageImpl : PlatformStorage {
    private val prefs = Preferences.userRoot()
    
    actual override fun saveData(key: String, value: String) {
        prefs.put(key, value)
    }
    
    actual override fun loadData(key: String): String? {
        return prefs.get(key, null)
    }
    
    actual override fun clearData(key: String) {
        prefs.remove(key)
    }
}

```

The common module declares an expected storage interface. The JVM implementation
uses Java's Preferences API. Other platforms would use their native
storage mechanisms while maintaining the same interface contract.

## Best Practices for expect/actual

**Minimize platform-specific code:** Keep most code in the common
module and only use expect/actual for essential differences.
**Maintain consistent APIs:** Ensure all actual implementations
follow the same contract as their expect declarations.
**Use default implementations:** Provide defaults when possible
to reduce platform implementation work.
**Document platform differences:** Clearly document any
behavioral differences between platform implementations.
**Test each platform:** Verify that all actual implementations
behave correctly on their target platforms.

## Source

[Kotlin Multiplatform Documentation](https://kotlinlang.org/docs/multiplatform-connect-to-apis.html)

This tutorial covered Kotlin's expect keyword in depth, showing how
it enables multiplatform development. We explored various declaration types and
their platform-specific implementations. Proper use of expect/actual allows
sharing code while handling platform differences cleanly.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).