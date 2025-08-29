+++
title = "Kotlin Nullable Values"
date = 2025-08-29T20:02:45.015+01:00
draft = false
description = "Kotlin Nullable Values tutorial shows how to handle nulls in Kotlin. Learn about nullable types, safe calls, the Elvis operator, and more with examples."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin Nullable Values

last modified March 22, 2025

Kotlin's type system tames the wild beast of null pointer exceptions, splitting
types into nullable and non-nullable camps. This tutorial dives into wrangling
nulls with safe calls, the Elvis operator, and more, all through practical,
real-world examples that keep your code crash-free.

## Nullable Types

By default, Kotlin locks variables to non-null values—add a ? to
unlock null as an option. It's like a safety switch you flip when
null might sneak in.

NullableTypes.kt
  

fun main() {
    var username: String = "Alice"  // Locked: no null allowed
    // username = null  // Error: Null can't crash this party

    var email: String? = "bob@site.com"  // Unlocked: null's welcome
    email = null  // All good here

    println(email)  // Output: null
}

username stays non-null, while email embraces
null with ?. Think user profiles—emails might be
optional, but usernames are mandatory. Kotlin enforces that split at compile
time.

## Safe Calls

The safe call operator (?.) tiptoes around null,
grabbing properties or methods only if the object exists—otherwise, it shrugs
and returns null, no tantrums thrown.

SafeCalls.kt
  

fun main() {
    val bio: String? = null
    val charCount = bio?.length

    println(charCount)  // Output: null
}

bio?.length checks a nullable bio without risking a crash. Picture
a social media app—some users skip bios, and ?. keeps the app
humming, returning null instead of exploding.

## Elvis Operator

The Elvis operator (?:) swoops in with a fallback when a nullable
value turns up empty, keeping your code on track with a default.

ElvisOperator.kt
  

fun main() {
    val nickname: String? = null
    val displayName = nickname ?: "Guest"

    println(displayName)  // Output: Guest
}

nickname ?: "Guest" picks "Guest" if nickname is
null. Imagine a forum—users without nicknames get a friendly
default, courtesy of Elvis's smooth rescue.

## Safe Casts

The safe cast operator (as?) tries a type switch without drama—if
it flops, you get null instead of a ClassCastException.

SafeCasts.kt
  

fun main() {
    val input: Any = "42"
    val count: Int? = input as? Int

    println(count)  // Output: null
}

input as? Int attempts to cast a string to an integer, safely
failing to null. Think parsing user input—numbers might arrive as
text, and as? keeps the pipeline flowing without crashing.

## Non-Null Assertion

The non-null assertion (!!) slams the door on null,
forcing a nullable into a non-null type—but if null sneaks through,
it's a NullPointerException explosion.

NonNullAssertion.kt
  

fun main() {
    val token: String? = null
    val length = token!!.length  // Boom! NullPointerException

    println(length)  // Never reached
}

token!!.length bets on token being non-null—here, it
loses big. Use this in an auth system only if you're 100% sure the token's
there; otherwise, it's a ticking bomb.

## Nullable Collections

Collections can cradle nullable types, and tools like filterNotNull
sweep out the nulls, leaving only the good stuff.

NullableCollections.kt
  

fun main() {
    val scores: List = listOf(95, null, 87, null, 91)
    val validScores = scores.filterNotNull()

    println(validScores)  // Output: [95, 87, 91]
}

filterNotNull purges null from scores.
Picture a quiz app—some answers might be ungraded (null), and this cleans the
list for a final tally, no fuss.

## Let Function with Nullable Types

The let function dances with nullables, running a block only if
the value's present—think of it as a bouncer letting only non-nulls into the
club.

LetFunction.kt
  

fun main() {
    val address: String? = "123 Main St"
    address?.let {
        println("Shipping to: $it")  // Output: Shipping to: 123 Main St
    }

    val noAddress: String? = null
    noAddress?.let {
        println("Shipping to: $it")  // No output
    }
}

address?.let processes only non-null addresses. In an e-commerce
checkout, this ensures shipping details get handled only when they exist—safe
and selective.

## Chaining Safe Calls

Safe calls can chain, navigating nested nullables like a pro, returning
null if any link breaks.

ChainingSafeCalls.kt
  

data class User(val profile: Profile?)
data class Profile(val city: String?)

fun main() {
    val user: User? = User(null)
    val cityLength = user?.profile?.city?.length

    println(cityLength)  // Output: null
}

user?.profile?.city?.length digs through layers, bailing at the
first null. In a travel app, this fetches a city's name length
only if the user and profile exist—safe and slick.

## Null-Coalescing with Multiple Fallbacks

The Elvis operator can stack fallbacks, picking the first non-null value in a
pinch, like a backup plan with a backup plan.

NullCoalescing.kt
  

fun main() {
    val primaryPhone: String? = null
    val backupPhone: String? = null
    val defaultPhone = "N/A"
    val contact = primaryPhone ?: backupPhone ?: defaultPhone

    println(contact)  // Output: N/A
}

primaryPhone ?: backupPhone ?: defaultPhone hunts for a valid
phone, landing on "N/A". In a contact manager, this ensures you've always got
something to show, no matter how sparse the data.

## Combining Let and Elvis

Mixing let and ?: crafts a tight null-handling flow,
processing non-nulls with a fallback for the rest.

LetAndElvis.kt
  

fun main() {
    val coupon: String? = null
    val discount = coupon?.let { it.toInt() } ?: 0

    println("Discount: $discount%")  // Output: Discount: 0%
}

coupon?.let { it.toInt() } ?: 0 converts a coupon code to an
integer if it's there, else defaults to 0. In a shopping cart, this applies a
discount only if the code's valid—clean and crash-proof.

## Best Practices for Handling Nullable Values

**Lean on Safe Calls:** Use ?. to sidestep null
traps—why risk a crash when you can glide?
**Set Smart Defaults:** Tap ?: to plug in fallbacks,
keeping your app humming when data's shy.
**Shun !!:** Dodge !! unless you're
dead certain—crashes aren't cool.
**Unleash let:** Wield let to gatekeep
nulls, running code only for the VIPs (non-nulls).

## Source

[Kotlin Null Safety Documentation](https://kotlinlang.org/docs/null-safety.html)

This tutorial peeled back Kotlin's null safety magic, showcasing tools like
safe calls and let through practical lenses. With these tricks,
you'll dodge null disasters and keep your code steady as a rock.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).