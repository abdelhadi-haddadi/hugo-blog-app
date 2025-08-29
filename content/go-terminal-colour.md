+++
title = "Go terminal colour"
date = 2025-08-29T19:56:23.323+01:00
draft = false
description = "Learn how to add color to terminal output in Go using ANSI escape codes and popular libraries like fatih/color and aurora."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go terminal colour

last modified April 11, 2024

In this article we show how to output terminal coloured output.

In the past, it was not possible to display colour in terminal on Windows. This
has changed with the introduction of the modern Windows terminal application.

To display coloured output, we will use special escape sequences. We also use 
fatih/color and aurora packages.

## Escape sequences

ANSI escape sequences are a standard for signaling to control cursor location,
colour, font styling, and other options on terminal emulators. 

main.go
  

package main

import (
    "fmt"
)

func main() {

    msg := "an old falcon"

    reset := "\033[0m"
    bold := "\033[1m"
    underline := "\033[4m"
    strike := "\033[9m"
    italic := "\033[3m"

    cRed := "\033[31m"
    cGreen := "\033[32m"
    cYellow := "\033[33m"
    cBlue := "\033[34m"
    cPurple := "\033[35m"
    cCyan := "\033[36m"
    cWhite := "\033[37m"

    fmt.Println(msg)

    fmt.Println(cRed + msg)
    fmt.Println(cGreen + msg)
    fmt.Println(cYellow + msg)
    fmt.Println(cBlue + msg)
    fmt.Println(cPurple + msg)
    fmt.Println(cWhite + msg)
    fmt.Println(cCyan + msg + reset)

    fmt.Println(bold + msg)
    fmt.Println(italic + msg + reset)
    fmt.Println(strike + msg + reset)
    fmt.Println(underline + msg + reset)
    fmt.Println(msg)
}

In the program, we display a message in colour and in common styles such bold
and italic.

reset := "\033[0m"

The reset signal is used to terminate the current colour or style signal.

bold := "\033[1m"
underline := "\033[4m"
strike := "\033[9m"
italic := "\033[3m"

These are four common text styles defined with escape codes.

cRed := "\033[31m"
cGreen := "\033[32m"
cYellow := "\033[33m"
cBlue := "\033[34m"
cPurple := "\033[35m"
cCyan := "\033[36m"
cWhite := "\033[37m"

These are codes for basic colours.

fmt.Println(cRed + msg)
fmt.Println(cGreen + msg)
fmt.Println(cYellow + msg)

To display a text in colour, we preced the text with the escape sequences.

fmt.Println(bold + msg)
fmt.Println(italic + msg + reset)

The escape sequences can be combined. The first message is displayed in bold
style. Since it is not terminated with the reset code, the next one is displayed 
in bold and italic.

## Terminal colour with faith/color

The faith/color package lets use use colourized outputs in terms of
ANSI Escape codes. It is essentially an easy-to-use wrapper over the codes. The
package has various ways to set the terminal colour output.

main.go
  

package main

import (
    "fmt"

    "github.com/fatih/color"
)

func main() {

    msg := "an old falcon"
    fmt.Println(msg)

    color.Set(color.FgHiBlue)

    fmt.Println(msg)
    fmt.Println(msg)

    color.Unset()

    fmt.Println(msg)
}

In the program, we use Set and Unset functions to 
delimit the area where the output is set to a specific colour.

color.Set(color.FgHiBlue)

We set the colour to blue.

color.Unset()

We unset the colour. After the function call, the output returned to the default
colour.

In the next example, we use built-in functions to display text in colour.

main.go
  

package main

import (
    "fmt"

    "github.com/fatih/color"
)

func main() {

    color.Green("%d old falcons", 4)
    color.Red("%d old falcons", 3)
    color.Yellow("%d old falcon", 1)

    fmt.Println()

    red := color.New(color.FgRed, color.BgHiWhite, color.Bold, color.Italic, color.Underline)
    msg := "an old falcon"
    red.Println(msg)
}

We print a few messages in colour.

color.Green("%d old falcons", 4)
color.Red("%d old falcons", 3)
color.Yellow("%d old falcon", 1)

These are three built-in functions to display messages in green, red and yellow.

red := color.New(color.FgRed, color.BgHiWhite, color.Bold, color.Italic, color.Underline)
msg := "an old falcon"
red.Println(msg)

We can combine various styles. In addition to foreground colours, we can also
set background colours.

## Terminal colour with aurora

Aurora is the most complex package for ANSI colour codes. It directly supports
Printf/Sprintf methods.

main.go
  

package main

import (
    "fmt"

    "github.com/logrusorgru/aurora/v4"
)

func main() {

    msg := " an old falcon "

    fmt.Println(aurora.Gray(0, msg).BgGray(23))
    fmt.Println(aurora.Gray(3, msg).BgGray(19))
    fmt.Println(aurora.Gray(7, msg).BgGray(15))
    fmt.Println(aurora.Gray(11, msg).BgGray(13))
    fmt.Println(aurora.Gray(15, msg).BgGray(7))
    fmt.Println(aurora.Gray(19, msg).BgGray(3))
    fmt.Println(aurora.Gray(23, msg).BgGray(0))
}

In the program, we display message in shades of gray colours.

fmt.Println(aurora.Gray(0, msg).BgGray(23))

We chain two functions calls: Gray and BgGray. The
first sets the foreground colour, the second the background colour. The index 
is a value from 0 to 24.

We can use Aurora functions with Printf and Sprintf
functions.

main.go
  

package main

import (
    "fmt"

    "github.com/logrusorgru/aurora/v4"
)

func main() {

    msg := "an old falcon"

    fmt.Println(msg, aurora.BrightBlue("in the sky"))
    fmt.Printf("%s in the sky\n", aurora.Bold(aurora.BrightBlue(msg)))
    fmt.Println(aurora.Sprintf(aurora.Blue("John Doe is a %s"), aurora.Green("gardener")))
}

The program shows how to display coloured text with Printf and
Sprintf functions.

ColorIndex is index of pre-defined 8-bit foreground or background
colours from 0 to 255.

    - 0 - 7 - standard colours

    - 8 - 15 - high intensity colours

    - 16 - 231 - 216 basic colours

    - 232 - 255 - grayscale colours

main.go
  

package main

import (
    "fmt"

    "github.com/logrusorgru/aurora/v4"
)

func main() {

    msg := "an old falcon"

    for i := 1; i &lt;= 255; i++ {
        fmt.Printf("%3d %s %s\n", i, aurora.Index(aurora.ColorIndex(i), msg),
            aurora.BgIndex(aurora.ColorIndex(i), msg))
    }
}

In the program, we show 255 combinations of foregroud and background text
colours.

## Source

[Go aurora - Github page](https://github.com/logrusorgru/aurora)

In this article we have created coloured output in terminal applications in
Golang. We used ANSI escape codes and two libraries.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).