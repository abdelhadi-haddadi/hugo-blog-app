+++
title = "Tcl after Command"
date = 2025-08-29T20:12:49.053+01:00
draft = false
description = "Tcl after command tutorial shows how to schedule delayed execution in Tcl. Learn after with practical examples."
image = ""
imageBig = ""
categories = ["tcl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Tcl after Command

last modified April 3, 2025

The Tcl after command schedules script execution after a time
delay. It's essential for creating timers and delayed actions in Tcl. The
command works with both milliseconds and script callbacks.

## Basic Definition

The after command delays script execution or returns timer IDs.
It can schedule one-time or repeating events. The command integrates with
Tcl's event loop.

Syntax: after ms ?script?. With one argument, it pauses execution.
With two arguments, it schedules script execution after ms milliseconds.

## Simple Delay

This example shows the basic delay functionality of the after
command.

basic_delay.tcl
  

puts "Start"
after 2000
puts "End"

This script prints "Start", waits 2000 milliseconds (2 seconds), then prints
"End". The after command with one argument pauses execution.

## Scheduled Script Execution

This demonstrates scheduling a script to run after a delay while the main
script continues.

scheduled_script.tcl
  

puts "Main script starts"
after 1000 {puts "Delayed message"}
puts "Main script continues"
vwait forever

The main script starts, schedules a message to appear after 1 second, then
continues. The vwait keeps the event loop running to process
the delayed script.

## Canceling a Scheduled Event

The after cancel command cancels a previously scheduled event
using its ID.

cancel_event.tcl
  

set id [after 3000 {puts "This won't appear"}]
after 1000 {after cancel $id; puts "Event canceled"}
vwait forever

This schedules a message for 3 seconds but cancels it after 1 second. The
after cancel command uses the ID returned by the first after.

## Repeating Timer

This example creates a repeating timer by having the callback reschedule itself.

repeating_timer.tcl
  

proc repeat {} {
    puts "Tick [clock format [clock seconds] -format %T]"
    after 1000 repeat
}
repeat
vwait forever

The repeat procedure prints the current time every second. Each
invocation schedules itself to run again after 1000 milliseconds.

## Multiple Timers

This shows how to manage multiple independent timers with different intervals.

multiple_timers.tcl
  

proc timer1 {} {
    puts "Timer1: [clock seconds]"
    after 1500 timer1
}

proc timer2 {} {
    puts "Timer2: [clock seconds]"
    after 2500 timer2
}

timer1
timer2
vwait forever

Two independent timers run with different intervals (1.5s and 2.5s). Each
timer maintains its own scheduling by calling after in its
callback.

## After with Arguments

This demonstrates passing arguments to a callback procedure using after.

after_with_args.tcl
  

proc callback {msg count} {
    puts "$msg $count"
    incr count
    after 1000 [list callback $msg $count]
}

callback "Count:" 1
vwait forever

The callback procedure receives and increments a counter. The
list command ensures proper argument passing when scheduling
the next execution.

## Best Practices

- **Units:** Remember time is in milliseconds (1000ms = 1s).

- **Event Loop:** Use vwait to keep the event loop running.

- **Memory:** Cancel timers when no longer needed.

- **Arguments:** Use list for callback arguments.

- **Nesting:** Avoid deep nesting of timed callbacks.

 

This tutorial covered the Tcl after command with practical
examples showing timer creation, delayed execution, and event scheduling.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Tcl Tutorials](/tcl/).