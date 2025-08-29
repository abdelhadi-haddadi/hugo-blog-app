+++
title = "Kotlin external Keyword"
date = 2025-08-29T20:02:32.836+01:00
draft = false
description = "Kotlin external keyword tutorial shows how to declare platform-specific declarations in Kotlin. Learn about native interoperability with examples."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin external Keyword

last modified April 19, 2025

Kotlin's external keyword enables interoperability with native code.
It marks declarations that are implemented outside Kotlin. This tutorial explores
the external keyword in depth with practical examples.

## Basic Definitions

The external keyword in Kotlin indicates that a declaration is
implemented in platform-specific code. It's used for JNI (Java Native Interface)
and JavaScript interoperability. The actual implementation must be provided
externally.

## Basic external Function

The simplest use of external is to declare a function implemented
in native code. The function body is omitted as it's provided externally.

NativeFunction.kt
  

package com.zetcode

external fun helloFromNative()

fun main() {
    helloFromNative()
}

Here we declare an external function without implementation. The
actual native code would be written in C/C++ and linked via JNI. The Kotlin
code can call it like any other function.

## external with JNI

When working with JNI, external marks functions implemented in C/C++.
The function names must follow JNI naming conventions for proper linking.

JNIFunction.kt
  

package com.zetcode

external fun nativeAdd(a: Int, b: Int): Int

fun main() {
    System.loadLibrary("nativeLib")
    val sum = nativeAdd(5, 7)
    println("Sum from native: $sum")
}

This example shows a native function that adds two integers. The corresponding
C function would be named Java_com_zetcode_JNIFunction_nativeAdd.
The library is loaded before calling the native function.

## external Properties

Properties can also be marked as external. The getter and setter
must be implemented in native code. This is useful for accessing native state.

NativeProperty.kt
  

package com.zetcode

external var nativeCounter: Int

fun main() {
    System.loadLibrary("nativeLib")
    nativeCounter = 10
    println("Counter value: $nativeCounter")
}

Here we declare an external property that's backed by native code.
The native implementation must provide both getter and setter functions. The
property behaves like a regular Kotlin property.

## external Class

Entire classes can be marked as external. All members of such
classes must be external as well. This is common for JNI wrappers.

NativeClass.kt
  

package com.zetcode

external class NativeMath {
    fun add(a: Int, b: Int): Int
    fun subtract(a: Int, b: Int): Int
}

fun main() {
    System.loadLibrary("nativeLib")
    val math = NativeMath()
    println("5 + 3 = ${math.add(5, 3)}")
    println("5 - 3 = ${math.subtract(5, 3)}")
}

This external class declares methods implemented in native code. The
native implementation must provide all declared methods. The class can be used
like any regular Kotlin class.

## JavaScript Interop

When targeting JavaScript, external is used to access JavaScript
APIs from Kotlin code. The declarations map directly to JavaScript objects.

JSInterop.kt
  

package com.zetcode

external fun alert(message: String)

external val document: dynamic

fun main() {
    alert("Hello from Kotlin/JS!")
    document.getElementById("demo").innerHTML = "Updated"
}

In Kotlin/JS, external declarations map to JavaScript APIs. Here we
declare the alert function and document object. The
dynamic type allows flexible access to JavaScript properties.

## external Companion Object

Companion objects can be marked as external to provide native
implementations for static methods. This is useful for utility functions.

NativeCompanion.kt
  

package com.zetcode

class NativeUtils {
    companion object {
        external fun getSystemTime(): Long
    }
}

fun main() {
    System.loadLibrary("nativeLib")
    val time = NativeUtils.getSystemTime()
    println("System time: $time")
}

This example shows an external companion object function. The native
implementation would be a static JNI function. The function is called through
the companion object like a static method.

## external with Platform Libraries

The external keyword can be used with platform-specific libraries.
This example demonstrates accessing a Windows API function.

WindowsAPI.kt
  

package com.zetcode

external fun MessageBoxA(
    hWnd: Int,
    text: String,
    caption: String,
    uType: Int
): Int

fun main() {
    System.loadLibrary("user32")
    MessageBoxA(0, "Hello from Kotlin", "Message", 0)
}

Here we declare the Windows MessageBoxA API as external.
The function is loaded from user32.dll. This demonstrates platform-specific
interoperability in Kotlin.

## Best Practices for external

**Use sparingly:** Only use external when necessary
for interoperability.
**Document thoroughly:** Clearly document native requirements
and calling conventions.
**Handle errors:** Implement proper error handling for native
calls.
**Consider alternatives:** Evaluate Kotlin multiplatform libraries
before using native code.
**Test thoroughly:** Native code can cause crashes - test
extensively.

## Source

[Kotlin Native Interop Documentation](https://kotlinlang.org/docs/native-interop.html)

This tutorial covered Kotlin's external keyword in depth, showing
its use for JNI, JavaScript, and platform interoperability. We explored various
scenarios including functions, properties, classes, and companion objects.
Proper use of external enables powerful native integration.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).