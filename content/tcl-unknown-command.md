+++
title = "Tcl unknown Command"
date = 2025-08-29T20:13:17.048+01:00
draft = false
description = "Tcl unknown command tutorial shows how to handle unknown commands in Tcl. Learn unknown with practical examples."
image = ""
imageBig = ""
categories = ["tcl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Tcl unknown Command

last modified April 3, 2025

The Tcl unknown command is invoked when the interpreter encounters
an undefined command. It provides a mechanism to handle unknown commands.

## Basic Definition

The unknown command is Tcl's default handler for undefined commands.
It can be redefined to implement custom behavior when unknown commands are called.

Syntax: unknown cmdName ?arg arg ...?. The command receives the
unknown command name and its arguments. It must return a valid Tcl result.

## Default Unknown Behavior

This example shows the default behavior when an unknown command is called.

default_unknown.tcl
  

# This will trigger the unknown command
nonexistent_command

Running this script produces an error because the command doesn't exist and
the default unknown handler reports the error. This demonstrates
Tcl's default behavior.

## Custom Unknown Handler

We can override the unknown command to implement custom behavior.

custom_unknown.tcl
  

proc unknown {args} {
    puts "Unknown command: [lindex $args 0]"
    puts "Arguments: [lrange $args 1 end]"
    return ""
}

# Test the custom handler
test_command arg1 arg2

This defines a custom unknown handler that prints information about
the unknown command and its arguments. The handler prevents the normal error.

## Command Auto-loading

The unknown command can be used to implement command auto-loading.

autoload_unknown.tcl
  

proc unknown {cmd args} {
    if {[file exists "$cmd.tcl"]} {
        source "$cmd.tcl"
        return [eval $cmd $args]
    }
    error "unknown command: $cmd"
}

# This will try to load greet.tcl and execute greet
greet "John"

This handler checks if a file named after the command exists. If found, it loads
the file and executes the command. This pattern is common in Tcl package systems.

## Command Aliasing

The unknown command can be used to create command aliases.

alias_unknown.tcl
  

proc unknown {cmd args} {
    set aliases {
        {hi say_hello}
        {bye say_goodbye}
    }
    
    foreach {alias target} $aliases {
        if {$cmd eq $alias} {
            return [eval $target $args]
        }
    }
    error "unknown command: $cmd"
}

proc say_hello {} { puts "Hello!" }
proc say_goodbye {} { puts "Goodbye!" }

hi
bye

This implements command aliasing through the unknown handler. When
hi or bye are called, they're translated to their
target commands. This shows how to create command synonyms.

## Command Suggestions

The unknown command can suggest similar commands when a command is
not found.

suggest_unknown.tcl
  

proc unknown {cmd args} {
    set commands [info commands]
    set matches [lsearch -all -inline -glob $commands "*${cmd}*"]
    
    if {[llength $matches] &gt; 0} {
        puts "Unknown command: $cmd"
        puts "Did you mean: [join $matches ", "]?"
    } else {
        puts "Unknown command: $cmd"
    }
    return ""
}

# Test with a misspelled command
puuts "Hello"

This handler suggests similar commands when an unknown command is called. It
searches existing commands for names similar to the unknown command. This
provides a user-friendly experience.

## Dynamic Command Creation

The unknown command can dynamically create new commands when they're
first called.

dynamic_unknown.tcl
  

proc unknown {cmd args} {
    if {[string match "print_*" $cmd]} {
        set text [string range $cmd 6 end]
        proc $cmd {} "puts \"$text\""
        return [$cmd]
    }
    error "unknown command: $cmd"
}

# This will dynamically create print_hello
print_hello

This handler creates commands on demand when they follow a specific pattern.
Here, commands starting with print_ are created automatically.
The command's behavior is determined by its name.

## Best Practices

- **Fallback:** Always provide a fallback to the default behavior.

- **Performance:** Keep unknown handlers efficient.

- **Security:** Be careful with dynamic command creation.

- **Clarity:** Document your custom unknown behavior.

- **Testing:** Thoroughly test custom unknown handlers.

 

This tutorial covered the Tcl unknown command with practical
examples showing its usage in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Tcl Tutorials](/tcl/).