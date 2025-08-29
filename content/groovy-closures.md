+++
title = "Groovy Closures"
date = 2025-08-29T19:56:27.867+01:00
draft = false
description = "Master Groovy closures with this tutorial. Learn how to use closures for functional programming and reusable code blocks."
image = ""
imageBig = ""
categories = ["groovy"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Groovy Closures

last modified March 22, 2025

Closures in Groovy are dynamic, reusable code blocks you can assign to
variables, pass around, or execute on demand. More versatile than Java's lambda
expressions, they blend functional programming with Groovy's expressive syntax.
This tutorial explores how to craft and wield closures through practical,
real-world examples.

## Defining a Closure

A closure is sculpted within curly braces {}, optionally taking
parameters and returning values. As first-class citizens, closures can be
stored, shared, and invoked like any variable, unlocking a world of flexible
logic.

SimpleClosure.groovy
  

def welcome = { name -&gt; "Welcome, $name, to our site!" }

println welcome("Alice")

Here, welcome is a closure that greets a user by name,
using Groovy's string interpolation for a polished message. Imagine this in a
web app, personalizing a login banner for each visitor with minimal fuss.

## Closures as Method Arguments

Closures shine when passed to methods, injecting custom behavior into reusable
functions. This makes your code adaptable, letting you swap logic without
rewriting the core structure.

ClosureAsArgument.groovy
  

def scheduleTasks(int count, Closure task) {
    count.times { task(it + 1) }
}

scheduleTasks(3) { taskNum -&gt;
    println "Task $taskNum scheduled for today"
}

scheduleTasks takes a count and a closure, running the closure for
each iteration via times. Here, it schedules numbered tasks,
mimicking a to-do app where closures define what each task entails—flexible and
straightforward.

## Closures with Multiple Parameters

Closures can juggle multiple parameters, making them handy for operations
needing more than one input, from calculations to data transformations.

MultiParamClosure.groovy
  

def calculateTax = { price, rate -&gt; price * (1 + rate) }

println calculateTax(100, 0.08)

calculateTax computes a total with tax, taking price
and rate. This could power an e-commerce checkout, quickly figuring
taxed prices without cluttering your code with a full method definition.

## Closures as Return Values

Methods can craft and return closures, enabling higher-order functions that
generate tailored logic on the fly—perfect for creating reusable tools.

ClosureAsReturnValue.groovy
  

def discountFactory(int percent) {
    { price -&gt; price * (1 - percent / 100) }
}

def tenOff = discountFactory(10)
println tenOff(50)

discountFactory returns a closure applying a percentage discount.
tenOff discounts 10%, handy for a retail system where different
sales events need custom discount calculators without repeated code.

## Closures and Collections

Closures pair beautifully with collections, streamlining tasks like filtering,
transforming, or aggregating data with concise, expressive syntax.

ClosureWithCollections.groovy
  

def sales = [25.50, 19.99, 45.00, 10.75, 60.20]

def withTax = sales.collect { it * 1.07 }
println withTax

def highSales = sales.findAll { it &gt; 20 }
println highSales

collect applies a 7% tax to each sale, while findAll
filters sales over $20. Picture this in a sales dashboard, crunching daily
figures or spotlighting big transactions with minimal effort.

## Closures and Scope

Closures capture their surrounding scope, accessing outer variables even after
their creation context fades. This “memory” makes them potent for stateful
logic.

ClosureScope.groovy
  

def counter = 0
def increment = { counter++ }

increment(); increment()
println "Count: $counter"

increment modifies counter from its outer scope,
acting like a click tracker in a web app. Each call updates the shared state,
showing how closures bridge local and persistent data effortlessly.

## Currying Closures

Currying transforms a multi-parameter closure into a specialized version with
some arguments preset, streamlining repetitive tasks with preconfigured logic.

CurryingClosure.groovy
  

def logEvent = { level, msg -&gt; println "[$level] $msg" }
def logInfo = logEvent.curry("INFO")

logInfo("User logged in")

logEvent logs with a level and message; logInfo locks
the level to "INFO". This fits a logging system where info-level logs are
common, sparing you from repeating the level each time.

## Closures and Delegation

Closures can delegate method calls to another object, dynamically routing
behavior to a designated “helper” for adaptive, context-driven execution.

ClosureDelegation.groovy
  

class Notifier {
    String notify(String user) { "Alert sent to $user" }
}

def alert = { notify("Alice") }
alert.delegate = new Notifier()
alert.resolveStrategy = Closure.DELEGATE_FIRST

println alert()

alert delegates notify to a Notifier
instance, set by delegate and DELEGATE_FIRST. This
could trigger notifications in a monitoring system, letting closures tap into
external logic dynamically.

## Closure for Validation

Closures can enforce rules, making them ideal for validating data before
processing, with reusable logic tailored to specific needs.

ValidationClosure.groovy
  

def isValidEmail = { email -&gt;
    email =~ /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
}

def email = "user@domain.com"
println isValidEmail(email) ? "Valid email" : "Invalid email"

isValidEmail checks if an email matches a regex pattern, returning
a boolean. Useful in a signup form, this closure ensures email validity before
submission, keeping validation concise and portable.

## Closure for Event Handling

Closures excel as event handlers, responding to triggers with custom actions,
perfect for UI or system interactions.

EventClosure.groovy
  

def onClick = { event -&gt;
    println "Button clicked at ${new Date()} by $event.user"
}

def simulateClick = { Closure handler -&gt;
    handler([user: "Alice"])
}

simulateClick(onClick)

onClick logs a button click with a timestamp and user, passed to
simulateClick. This mirrors a GUI framework where closures handle
user actions, blending timing and context effortlessly.

## Closure Composition

Closures can be composed, chaining transformations for powerful, modular data
pipelines, like processing user input step-by-step.

ComposeClosure.groovy
  

def trim = { it.trim() }
def capitalize = { it.capitalize() }
def formatName = trim &gt;&gt; capitalize

println formatName("  alice  ")

formatName combines trim and capitalize
using the &gt;&gt; operator, cleaning and formatting a name. Ideal for
a form processor, this shows how closures can stack operations neatly.

## Best Practices for Using Closures

**Capture Reusable Logic:** Wrap common tasks in closures for
easy reuse across your app, like formatting or validation.
**Master Collections:** Harness closures with methods like
collect or findAll to process data elegantly.
**Simplify with Currying:** Pre-set parameters via currying to
craft focused tools from general-purpose closures.
**Delegate Smartly:** Use delegation to connect closures with
objects, adapting behavior without hardcoding dependencies.

## Source

[Groovy Closures Documentation](https://groovy-lang.org/closures.html)

This tutorial unpacked Groovy closures, revealing their power as flexible,
functional code blocks. Through practical examples, we've seen how they
transform coding tasks, from data handling to event management, with elegance
and ease.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Groovy tutorials](/all/#groovy).