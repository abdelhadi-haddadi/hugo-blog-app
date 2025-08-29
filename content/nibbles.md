+++
title = "Nibbles"
date = 2025-08-29T19:57:34.496+01:00
draft = false
description = "This part of the Tcl/Tk tutorial presents Nibbles game clone."
image = "images/nibbles.png"
imageBig = "images/nibbles.png"
categories = ["gui"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../drawing/)

# Nibbles

last modified October 18, 2023

In this part of the Tcl/Tk tutorial, we create a Nibbles game clone.

*Nibbles* is an older classic video game. It was first created in late 70s.
Later it was brought to PCs. In this game the player controls a snake.
The objective is to eat as many apples as possible. Each time the snake eats an apple,
its body grows. The snake must avoid the walls and its own body.

## Development

The size of each of the joints of a snake is 10px. The snake is controlled with
the cursor keys. Initially, the snake has three joints.
The game starts immediately. When the game is finished,
we display "Game Over" message in the center of the window.

We use the canvas widget to create the game. The objects in the
game are images. We use canvas commands to create image items. We use canvas commands
to find items on the canvas using tags and to do collision detection.

nibbles.tcl
  

#!/usr/bin/wish

# ZetCode Tcl/Tk tutorial
#
# This is simple Nibbles game clone.
#
# Author: Jan Bodnar
# Website: www.zetcode.com

package require Img

set WIDTH 300
set HEIGHT 300
set DELAY 100
set DOT_SIZE 10
set ALL_DOTS [expr $WIDTH * $HEIGHT / ($DOT_SIZE * $DOT_SIZE)]
set RAND_POS 27

canvas .c -width $WIDTH -height $HEIGHT -background black
pack .c

proc initGame {} {

    set ::left false
    set ::right true
    set ::up false
    set ::down false
    set ::inGame true
    set dots 3
    set ::apple_x 100
    set ::apple_y 190

    for {set i 0} {$i&lt;$dots} {incr i} {
        set x($i) [expr 50 - $i * 10]
        set y($i) 50
    }

    set ::idot [image create photo img1 -file "dot.png"]
    set ::ihead [image create photo img2  -file "head.png"]
    set ::iapple [image create photo img3 -file "apple.png"]

    createObjects
    locateApple

    bind . "&lt;Key&gt;" "onKeyPressed %K"

    after $::DELAY onTimer
}

proc createObjects {} {

    .c create image $::apple_x $::apple_y \
        -image $::iapple -tag apple -anchor nw
    .c create image 50 50 -image $::ihead -tag head -anchor nw
    .c create image 30 50 -image $::idot -tag dot -anchor nw
    .c create image 40 50 -image $::idot -tag dot -anchor nw
}

proc checkApple {} {

    set apple [.c find withtag apple]
    set head [.c find withtag head]

    set l [.c bbox head]
    set overlap [eval .c find overlapping $l]

    foreach over $overlap {

        if {$over == $apple} {
            set crd [.c coords $apple]
            set x [lindex $crd 0]
            set y [lindex $crd 1]
            .c create image $x $y -image $::idot -anchor nw -tag dot
            locateApple
        }
    }
}

proc doMove {} {

    set dots [.c find withtag dot]
    set head [.c find withtag head]
    set items [concat $dots $head]

    set z 0

    while {$z &lt; [expr [llength $items] - 1]} {

        set c1 [.c coords [lindex $items $z]]
        set c2 [.c coords [lindex $items [expr $z+1]]]

        .c move [lindex $items $z] [expr [lindex $c2 0]  - [lindex $c1 0] ] \
            [expr [lindex $c2 1]  - [lindex $c1 1] ]
        incr z
    }

    if { [string compare $::left true] == 0} {
        .c move head -$::DOT_SIZE 0
    }

    if {[string compare $::right true] == 0} {
        .c move head $::DOT_SIZE 0
    }

    if {[string compare $::up true] == 0} {
        .c move head 0 -$::DOT_SIZE
    }

    if {[string compare $::down true] == 0} {
        .c move head 0 $::DOT_SIZE
    }
}

proc checkCollisions {} {

    set dots [.c find withtag dot]
    set head [.c find withtag head]

    set l [.c bbox head]
    set overlap [eval .c find overlapping $l]

    foreach dot $dots {

        foreach over $overlap {
            if {$over == $dot} {
                 set ::inGame false
            }
        }
    }

    set x1 [lindex $l 0]
    set y1 [lindex $l 1]

    if {$x1 &lt; 0} {
         set ::inGame false
    }

    if {$x1 &gt; [expr $::WIDTH - $::DOT_SIZE]} {
         set ::inGame false
    }

    if {$y1 &lt; 0} {
        set ::inGame false
    }

    if {$y1 &gt; [expr $::HEIGHT - $::DOT_SIZE]} {
        set ::inGame false
    }
}

proc locateApple {} {

    set apple [.c find withtag apple]
    .c delete lindex apple 0

    set r [expr round(rand() * $::RAND_POS)]
    set ::apple_x [expr $r * $::DOT_SIZE]
    set r [expr round(rand() * $::RAND_POS)]
    set ::apple_y [expr $r * $::DOT_SIZE]

    .c create image $::apple_x $::apple_y -anchor nw \
        -image $::iapple -tag apple
}

proc onKeyPressed {key} {

    set a1 [ expr [string compare $key Left] == 0]
    set a2 [ expr [string compare $::right true] != 0]

    if { $a1 &amp;&amp; $a2 } {

        set ::left true
        set ::up false
        set ::down false
    }

    set b1 [ expr [string compare $key Right] == 0]
    set b2 [ expr [string compare $::left true] != 0]

    if {  $b1 &amp;&amp; $b2 } {

        set ::right true
        set ::up false
        set ::down false
    }

    set c1 [ expr [string compare $key Up] == 0]
    set c2 [ expr [string compare $::down true] != 0]

    if { $c1 &amp;&amp; $c2 } {

        set ::up true
        set ::left false
        set ::right false
    }

    set d1 [ expr [string compare $key Down] == 0]
    set d2 [ expr [string compare $::up true] != 0]

    if { $d1 &amp;&amp; $d2 }  {

        set ::down true
        set ::left false
        set ::right false
    }
}

proc onTimer {} {

    if {$::inGame} {
        checkCollisions
        checkApple
        doMove
        after $::DELAY onTimer
    } else {
        gameOver
    }
}

proc gameOver {} {

   .c delete all

   set x [ expr [winfo width .] / 2 ]
   set y [ expr [winfo height .] / 2]

   .c create text $x $y  -text "Game over" -fill white
}

initGame

wm title . "Nibbles"
wm geometry . +150+150

First we define some constants used in our game.

The WIDTH and HEIGHT constants determine
the size of the Board. The DELAY constant determines the speed of the game.
The DOT_SIZE is the size of the apple and the dot
of the snake. The ALL_DOTS constant defines the maximum number of
possible dots on the Board. The RAND_POS constant is used to calculate
a random position of an apple.

The initGame procedure initializes variables, loads
images and starts a timeout procedure.

set ::idot [image create photo img1 -file "dot.png"]
set ::ihead [image create photo img2  -file "head.png"]
set ::iapple [image create photo img3 -file "apple.png"]

In these lines, we load our images. There are three images in the Nibbles game.
The head, the dot, and the apple.

createObjects
locateApple

The createObjects procedure creates items on the canvas. The
locateApple puts an apple randomly on the canvas.

bind . "&lt;Key&gt;" "onKeyPressed %K"

We bind the keyboard events to the onKeyPressed procedure. The game is
controlled with keyboard cursor keys. The %K is a Tk symbolic name for the
pressed key. It is passed to the onKeyPressed procedure.

proc createObjects {} {

    .c create image $::apple_x $::apple_y \
        -image $::iapple -tag apple -anchor nw
    .c create image 50 50 -image $::ihead -tag head -anchor nw
    .c create image 30 50 -image $::idot -tag dot -anchor nw
    .c create image 40 50 -image $::idot -tag dot -anchor nw
}

In the createObjects procedure, we create game objects on the canvas.
These are canvas items. They are given initial x, y coordinates. The
-image option provides the image to be displayed. The -anchor
option is set to nw; this way the coordinates of the canvas item are the top-left points
of the items. This is important if we want to be able to display images next
to the borders of the root window. If you do not understant what we mean, try
to delete the anchor option. The -tag option is used to identify
items on the canvas. One tag may be used for multiple canvas items.

The checkApple procedure checks if the snake has hit
the apple object. If so, we add another snake joint and call the
locateApple.

set apple [.c find withtag apple]
set head [.c find withtag head]

The find withtag command finds an item on the canvas
using its tag. We need two items. The head of the snake and the apple.

set l [.c bbox head]
set overlap [eval .c find overlapping $l]

The bbox command returns the bounding box points of an
item. The find overlapping command finds colliding
items for the given coordinates.

foreach over $overlap {

    if {$over == $apple} {
        set crd [.c coords $apple]
        set x [lindex $crd 0]
        set y [lindex $crd 1]
        .c create image $x $y -image $::idot -anchor nw -tag dot
        locateApple
    }
}

If the apple collides with the head, we create a new dot item at
the coordinates of the apple object. We call the locateApple procedure,
which deletes the old apple item from the canvas and creates and randomly
positions a new one.

In the doMove procedure we have the key algorithm of the game.
To understand it, look at how the snake is moving. You control the head of the snake.
You can change its direction with the cursor keys. The rest of the joints move
one position up the chain. The second joint moves where the first was,
the third joint where the second was etc.

set z 0

while {$z &lt; [expr [llength $items] - 1]} {

    set c1 [.c coords [lindex $items $z]]
    set c2 [.c coords [lindex $items [expr $z+1]]]

    .c move [lindex $items $z] [expr [lindex $c2 0]  - [lindex $c1 0] ] \
        [expr [lindex $c2 1]  - [lindex $c1 1] ]
    incr z
}

This code moves the joints up the chain.

if { [string compare $::left true] == 0} {
    .c move head -$::DOT_SIZE 0
}

Move the head to the left.

In the checkCollisions procedure, we determine if the snake
has hit itself or one of the walls.

set l [.c bbox head]
set overlap [eval .c find overlapping $l]

foreach dot $dots {

    foreach over $overlap {
        if {$over == $dot} {
              set ::inGame false
        }
    }
}

We finish the game if the snake hits one of its joints with the head.

if {$y1 &gt; [expr $::HEIGHT - $::DOT_SIZE]} {
    set ::inGame false
}

We end the game if the snake hits the bottom of the Board.

The locateApple procedure locates a new apple randomly
on the board and deletes the old one.

set apple [.c find withtag apple]
.c delete lindex apple 0

Here we find and delete the apple that was eaten by the snake.

set r [expr round(rand() * $::RAND_POS)]

We get a random number from 0 to RAND_POS - 1.

set ::apple_x [expr $r * $::DOT_SIZE]
...
set ::apple_y [expr $r * $::DOT_SIZE]

These lines set the x, y coordinates of the apple
object.

In the onKeyPressed procedure we determine the keys that were pressed.

set a1 [ expr [string compare $key Left] == 0]
set a2 [ expr [string compare $::right true] != 0]

if { $a1 &amp;&amp; $a2 } {

    set ::left true
    set ::up false
    set ::down false
    }

If we hit the left cursor key, we set left variable to
true. This variable is used in the doMove procedure
to change the coordinates of the snake object. Notice also that
when the snake is heading to the right, we cannot turn immediately
to the left.

proc onTimer {} {

    if {$::inGame} {
        checkCollisions
        checkApple
        doMove
        after $::DELAY onTimer
    } else {
        gameOver
    }
}

Every DELAY ms, the onTimer procedure is called. If
we are in the game, we call three procedures that build the logic of the game.
Otherwise the game is finished. The timer is based on the after command
which calls a procedure after DELAY ms only once. To repeteadly call
the timer, we recursively call the onTimer procedure.

proc gameOver {} {

   .c delete all

   set x [ expr [winfo width .] / 2 ]
   set y [ expr [winfo height .] / 2]

   .c create text $x $y  -text "Game over" -fill white
}

If the game is over, we delete all items on the canvas. Then we
draw "Game Over" in the center of the screen.

![nibbles.png](images/nibbles.png)

Figure: Nibbles

This was the Nibbles computer game created with Tcl/Tk.

[Contents](..)
[Previous](../drawing/)