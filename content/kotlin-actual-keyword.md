+++
title = "Kotlin actual Keyword"
date = 2025-08-29T20:02:23.973+01:00
draft = false
description = "Kotlin actual keyword tutorial shows how to implement platform-specific code in Kotlin Multiplatform projects. Learn about expect/actual declarations with examples."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin actual Keyword

last modified April 19, 2025

Kotlin Multiplatform projects use the actual keyword to provide
platform-specific implementations of expected declarations. This tutorial
explores the actual keyword in depth with practical examples.

## Basic Definitions

The actual keyword is part of Kotlin's expect/actual mechanism for
multiplatform development. An expect declaration specifies an API
that must be implemented by platform-specific actual declarations.

## Basic expect/actual Declaration

The simplest use case involves declaring an expected function in common code and
providing actual implementations for each platform. This ensures a consistent
API across platforms.

Common.kt
  

// Common module
expect fun platformName(): String

JvmMain.kt
  

```
// JVM platform
actual fun platformName(): String = "JVM"

```

In this example, the common module declares an expected function platformName.
The JVM platform provides its actual implementation. Other platforms would need
their own actual implementations.

## actual for Properties

The actual keyword can also be used with properties. This allows
platform-specific implementations of properties declared in common code.

Common.kt
  

// Common module
expect val platformVersion: String

NativeMain.kt
  

```
// Native platform
actual val platformVersion: String = "1.0.0-native"

```

Here we declare an expected property in common code and provide a native-specific
implementation. Each platform would need to provide its own actual version of
this property.

## actual for Classes

Entire classes can be declared with expect and implemented with
actual. This is useful for platform-specific implementations of
shared interfaces or abstract classes.

Common.kt
  

// Common module
expect class FileReader(path: String) {
    fun read(): String
    fun close()
}

JsMain.kt
  

```
// JavaScript platform
actual class FileReader actual constructor(path: String) {
    actual fun read(): String {
        // JS-specific implementation
        return "JS file content"
    }
    
    actual fun close() {
        // JS-specific cleanup
    }
}

```

This example shows a platform-agnostic file reader interface declared in common
code with a JavaScript-specific implementation. The actual keyword
marks all parts of the implementation.

## actual with Default Implementations

In some cases, you might want to provide a default implementation in common code
that can be overridden by platform-specific actual implementations when needed.

Common.kt
  

// Common module
expect fun getUUID(): String {
    // Default implementation for most platforms
    return java.util.UUID.randomUUID().toString()
}

NativeMain.kt
  

```
// Native platform
actual fun getUUID(): String {
    // Platform-specific implementation
    return generateNativeUUID()
}

```

Here, most platforms can use the default implementation from common code, while
the native platform provides its own specialized version. This reduces code
duplication while allowing platform customization.

## actual for Typealiases

The actual keyword can be used with typealiases to provide
platform-specific type mappings. This is useful when underlying types differ
across platforms.

Common.kt
  

// Common module
expect class PlatformDate

JvmMain.kt
  

```
// JVM platform
actual typealias PlatformDate = java.util.Date

```

JsMain.kt
  

```
// JavaScript platform
actual typealias PlatformDate = js("Date")

```

This pattern allows using a common PlatformDate type in shared code
while mapping to platform-specific date implementations. Each platform provides
its own actual typealias.

## actual with Objects

Singleton objects can also be declared with expect and implemented
with actual. This is useful for platform-specific services or
managers.

Common.kt
  

// Common module
expect object PlatformTimer {
    fun schedule(delay: Long, task: () -&gt; Unit)
}

AndroidMain.kt
  

```
// Android platform
actual object PlatformTimer {
    actual fun schedule(delay: Long, task: () -&gt; Unit) {
        android.os.Handler().postDelayed(task, delay)
    }
}

```

Here we declare a cross-platform timer API and provide an Android-specific
implementation. Each platform would implement its own version of the timer
functionality while maintaining a consistent API.

## actual for Enums

Enums can be declared with expect and implemented with
actual to allow platform-specific enum entries or behaviors.

Common.kt
  

// Common module
expect enum class Platform {
    ANDROID, IOS, JVM, JS, NATIVE
}

CommonMain.kt
  

```
// Common actual implementation
actual enum class Platform {
    ANDROID, IOS, JVM, JS, NATIVE
}

```

While this example shows a common actual implementation, you could provide
platform-specific versions with additional entries or behaviors if needed. The
actual enum must match the expect declaration's structure.

## Best Practices for actual Declarations

**Match signatures exactly:** Actual declarations must exactly
match their expect counterparts in name, parameters, and return types.
**Document platform differences:** Clearly document any
platform-specific behaviors or limitations in actual implementations.
**Minimize platform-specific code:** Keep as much logic as
possible in common code, using actual only for necessary platform specifics.
**Test each platform:** Ensure you test all actual
implementations as they may behave differently.
**Use meaningful names:** Choose clear names that indicate the
platform-specific nature of actual implementations.

## Source

[Kotlin Multiplatform Documentation](https://kotlinlang.org/docs/multiplatform-connect-to-apis.html)

This tutorial covered Kotlin's actual keyword in depth, showing how
it enables platform-specific implementations in multiplatform projects. We
explored various declaration types including functions, properties, classes, and
objects. Proper use of expect/actual declarations helps create maintainable
cross-platform codebases.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).