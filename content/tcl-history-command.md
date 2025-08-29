+++
title = "Tcl history Command"
date = 2025-08-29T20:13:01.277+01:00
draft = false
description = "Tcl history command tutorial shows how to work with command history in Tcl. Learn history with practical examples."
image = ""
imageBig = ""
categories = ["tcl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Tcl history Command

last modified April 3, 2025

The Tcl history command provides access to previously executed
commands. It's essential for interactive Tcl sessions and debugging. The
command allows recalling, re-executing, and managing command history.

## Basic Definition

The history command maintains a list of previously executed
commands. Each command is assigned an event number for reference. The history
list has a configurable maximum size.

Syntax: history ?option? ?arg arg ...?. With no arguments, it
returns the current history list. Options modify history behavior.

## Viewing Command History

The simplest use shows the command history list with event numbers.

basic_history.tcl
  

puts "Hello"
set x 10
expr {$x * 2}
history

After executing several commands, history displays them with
event numbers. The output shows the command sequence with their positions.

## Re-executing Commands

Commands can be re-executed using their event numbers with history redo.

history_redo.tcl
  

set name "Alice"
puts "Hello $name"
history redo 1

This re-executes the first command (set name "Alice") using its event number.
The command runs again as if typed at the prompt. Note event numbers may vary.

## Using Relative Event Numbers

Negative numbers reference commands relative to the current position.

history_relative.tcl
  

set a 5
set b 10
expr {$a + $b}
history redo -2

Here, -2 refers to the command two positions back (set a 5).
Relative numbers are useful for quick access to recent commands.

## Searching History

The history command can search for commands containing a pattern.

history_search.tcl
  

set user "Bob"
set count 42
set filename "data.txt"
history search "set"

This finds all commands containing "set". The output shows matching commands
with their event numbers. Useful for finding specific operations.

## Clearing History

The history list can be cleared using the clear option.

history_clear.tcl
  

puts "Test 1"
puts "Test 2"
history clear
history

After clearing, history shows an empty list. This is useful when
starting a new sequence of commands. Note some implementations may keep recent.

## Changing History Size

The maximum number of remembered commands can be adjusted.

history_size.tcl
  

history keep 50
puts "New history size set to 50"

This limits history to 50 commands. Older commands are discarded as new ones
are added. The default is usually 20 commands in most implementations.

## Best Practices

- **Interactive Use:** Most valuable in interactive sessions.

- **Event Numbers:** Check numbers with plain history first.

- **Scripts:** History may not work the same in script files.

- **Security:** Be cautious with sensitive commands in history.

- **Customization:** Adjust size based on your needs.

 

This tutorial covered the Tcl history command with practical
examples showing its usage in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Tcl Tutorials](/tcl/).