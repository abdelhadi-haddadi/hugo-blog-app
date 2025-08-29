+++
title = "Kotlin suspend Keyword"
date = 2025-08-29T20:02:55.247+01:00
draft = false
description = "Kotlin suspend keyword tutorial shows how to write suspending functions in Kotlin coroutines. Learn about coroutine basics, suspending functions, and async programming with examples."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin suspend Keyword

last modified April 19, 2025

Kotlin's coroutines provide a powerful way to write asynchronous code. The
suspend keyword marks functions that can pause execution without
blocking threads. This tutorial explores suspending functions in depth with
practical examples.

## Basic Definitions

The suspend keyword marks a function as suspending. Such functions
can pause execution and resume later without blocking threads. They can only be
called from coroutines or other suspending functions. Suspending functions are
central to Kotlin's coroutine system.

## Basic Suspending Function

A simple suspending function demonstrates the basic syntax. The function can
perform long-running operations without blocking the calling thread. It uses the
delay function from Kotlin's coroutine library.

BasicSuspend.kt
  

package com.zetcode

import kotlinx.coroutines.*

suspend fun greet() {
    delay(1000)
    println("Hello from suspend function!")
}

fun main() = runBlocking {
    greet()
    println("Done")
}

This example shows a simple suspending function greet. The
runBlocking coroutine builder creates a coroutine context. The
function pauses for 1 second using delay then prints a message.

## Suspending Function with Parameters

Suspending functions can accept parameters like regular functions. They can also
return values. This makes them flexible for various asynchronous operations. The
example shows a suspending function that processes input.

SuspendWithParams.kt
  

package com.zetcode

import kotlinx.coroutines.*

suspend fun processData(data: String): String {
    delay(500)
    return "Processed: $data"
}

fun main() = runBlocking {
    val result = processData("Kotlin")
    println(result) // Output: Processed: Kotlin
}

The processData function takes a String parameter and returns a
processed version after a delay. The runBlocking coroutine builder
allows calling this suspending function from regular code.

## Sequential Suspending Calls

Suspending functions can call other suspending functions sequentially. The
execution pauses at each suspending point. This creates readable asynchronous
code that looks like synchronous code.

SequentialCalls.kt
  

package com.zetcode

import kotlinx.coroutines.*

suspend fun fetchUser(): String {
    delay(1000)
    return "User123"
}

suspend fun fetchPosts(user: String): List&lt;String&gt; {
    delay(1000)
    return listOf("Post1", "Post2")
}

fun main() = runBlocking {
    val user = fetchUser()
    val posts = fetchPosts(user)
    println("$user has posts: $posts")
}

This example shows two suspending functions called sequentially. First
fetchUser runs, then fetchPosts uses its result.
The total execution time is about 2 seconds, but the code remains clean.

## Parallel Execution with async

Suspending functions can run in parallel using async. This is
useful for independent operations that can execute concurrently. The
await function suspends until results are ready.

ParallelExecution.kt
  

package com.zetcode

import kotlinx.coroutines.*

suspend fun fetchProfile(): String {
    delay(800)
    return "Profile Data"
}

suspend fun fetchNotifications(): List&lt;String&gt; {
    delay(600)
    return listOf("Notification1", "Notification2")
}

fun main() = runBlocking {
    val profileDeferred = async { fetchProfile() }
    val notificationsDeferred = async { fetchNotifications() }
    
    val profile = profileDeferred.await()
    val notifications = notificationsDeferred.await()
    
    println("$profile with $notifications")
}

Here, two suspending functions run in parallel using async. The total
execution time is about 800ms (the longest operation) instead of 1400ms. The
await calls suspend until both operations complete.

## Suspending Functions with try-catch

Suspending functions can use standard Kotlin error handling. Exceptions work the
same way as in regular functions. This makes error handling in coroutines
familiar and straightforward.

SuspendTryCatch.kt
  

package com.zetcode

import kotlinx.coroutines.*

suspend fun riskyOperation(): String {
    delay(500)
    if (Math.random() &gt; 0.5) {
        throw RuntimeException("Operation failed!")
    }
    return "Success"
}

fun main() = runBlocking {
    try {
        val result = riskyOperation()
        println(result)
    } catch (e: Exception) {
        println("Caught: ${e.message}")
    }
}

The riskyOperation function might throw an exception. We wrap the
call in a try-catch block like with regular functions. The exception handling
works the same way in suspending functions.

## Suspending Lambda Expressions

Lambda expressions can also be marked as suspending. This allows writing
asynchronous code blocks that can be passed around. The example shows a suspending
lambda used with withContext.

SuspendLambda.kt
  

package com.zetcode

import kotlinx.coroutines.*

suspend fun performOperation(block: suspend () -&gt; Unit) {
    println("Operation starting")
    block()
    println("Operation complete")
}

fun main() = runBlocking {
    performOperation {
        delay(1000)
        println("Middle of operation")
    }
}

The performOperation function accepts a suspending lambda. The
lambda can contain suspending calls like delay. This pattern is
common in coroutine-based libraries.

## Coroutine Context in Suspending Functions

Suspending functions have access to the coroutine context. They can check or
modify it using coroutineContext. This is useful for structured
concurrency and context propagation.

CoroutineContext.kt
  

package com.zetcode

import kotlinx.coroutines.*

suspend fun printContextInfo() {
    println("Running in ${coroutineContext[CoroutineName]?.name}")
    println("Dispatcher: ${coroutineContext[CoroutineDispatcher]}")
}

fun main() = runBlocking(CoroutineName("MainCoroutine")) {
    printContextInfo()
}

The printContextInfo function accesses the coroutine context. It
prints the coroutine name and dispatcher. The context is passed from the parent
coroutine to suspending functions.

## Best Practices for Suspending Functions

**Keep them focused:** Each suspending function should do one
thing well, like regular functions.
**Name them appropriately:** Use names that indicate they might
suspend execution.
**Handle cancellation:** Make sure long-running operations check
for cancellation.
**Document suspension points:** Note where functions might
suspend in documentation.
**Consider context:** Be aware of the coroutine context your
function will run in.

## Source

[Kotlin Coroutines Documentation](https://kotlinlang.org/docs/coroutines-basics.html)

This tutorial covered Kotlin's suspend keyword in depth, showing how
to write and use suspending functions. We explored various scenarios including
sequential and parallel execution, error handling, and context awareness. Proper
use of suspending functions makes asynchronous code cleaner and more maintainable.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).