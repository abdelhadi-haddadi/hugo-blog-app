+++
title = "F# regular expressions"
date = 2025-08-29T19:54:34.038+01:00
draft = false
description = "Understand regular expressions in F#. This tutorial provides insights into pattern matching and regex usage in F#."
image = ""
imageBig = ""
categories = ["fsharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# F# regular expressions

last modified May 1, 2025

In this article we show how to work with regular expressions in F#.

## Regular expressions

Regular expressions, often abbreviated as regex or regexp, are powerful tools
used for text searching, pattern matching, and advanced text manipulation. They
allow developers to define complex search patterns using a combination of
literal characters and special symbols. Regular expressions are widely supported
in various tools such as grep and sed, text editors
like vi and Emacs, and programming languages including
Python, JavaScript, and F#.

In the .NET ecosystem, regular expressions are supported through a robust
built-in API located in the System.Text.RegularExpressions
namespace. This API provides a comprehensive set of classes and methods for
working with regular expressions, enabling developers to perform tasks such as
pattern matching, text replacement, and string splitting with ease.

A regular expression defines a search pattern for strings, which can range from
simple text matches to highly complex patterns involving quantifiers, groups,
and assertions. The Regex class in .NET represents an immutable
regular expression and serves as the primary entry point for regex operations.
It includes methods like IsMatch for checking if a string matches a
pattern, Replace for substituting matched text, and
Split for dividing strings based on a pattern. These capabilities
make regular expressions an indispensable tool for text processing and data
validation tasks.

## F# isMatch

The isMatch method indicates whether the regular expression finds a
match in the input string.

main.fsx
  

open System.Text.RegularExpressions

let words =
    [ "Seven"
      "even"
      "Maven"
      "Amen"
      "eleven" ]

let rx = Regex(@".even", RegexOptions.Compiled)

words
|&gt; List.map
    (fun e -&gt;
        if rx.IsMatch(e) then
            printfn $"{e} matches"
        else
            printfn $"{e} does not match")

In the example, we have five words in a list. We check which words match the
.even regular expression.

let words =
    [ "Seven"
      "even"
      "Maven"
      "Amen"
      "eleven" ]

We define a list of words.

let rx = Regex(@".even", RegexOptions.Compiled)

We create the .even regular expression. The
RegexOptions.Compiled option specifies that the regular expression
is compiled to an assembly. This yields faster execution but increases startup
time. The dot (.) metacharacter stands for any single character in the text.

words
|&gt; List.map
    (fun e -&gt;
        if rx.IsMatch(e) then
            printfn $"{e} matches"
        else
            printfn $"{e} does not match")

We apply the given lambda function to the elements of the list. The
IsMatch method returns true if the word matches the regular
expression.

λ dotnet fsi main.fsx
Seven matches
even does not match
Maven does not match
Amen does not match
eleven matches

## F# regex alternations

The alternation operator | enables to create a regular expression with several
choices.

main.fsx
  

open System.Text.RegularExpressions

let users = ["Jane"; "Thomas"; "Robert";
    "Lucy"; "Beky"; "John"; "Peter"; "Andy"]

let rx = Regex("Jane|Beky|Robert", RegexOptions.Compiled)
users |&gt; List.filter rx.IsMatch |&gt; List.iter (printfn "%s")

There are nine names in the list.

let rx = Regex("Jane|Beky|Robert", RegexOptions.Compiled)

The regular expression looks for "Jane", "Beky", or "Robert" strings. 

users |&gt; List.filter rx.IsMatch |&gt; List.iter (printfn "%s")

We filter the list by applying the IsMatch on each element of the
list and then print all the matched values.

λ dotnet fsi main.fsx
Jane
Robert
Beky

## F# regex Matches

The Matches method searches an input string for all occurrences of
a regular expression and returns all the matches.

main.fsx
  

open System.Text.RegularExpressions

let content =
    @"Foxes are omnivorous mammals belonging to several genera
of the family Canidae. Foxes have a flattened skull, upright triangular ears,
a pointed, slightly upturned snout, and a long bushy tail. Foxes live on every
continent except Antarctica. By far the most common and widespread species of
fox is the red fox."

let found =
    seq {
        for m in Regex.Matches(content, "(?i)fox(es)?") do
            yield m.Value, m.Index
    }

found
|&gt; Seq.iter (fun (e, idx) -&gt; printfn "%s at %d" e idx)

In the example, we look for all occurrences of the fox word.

let found =
    seq {
        for m in Regex.Matches(content, "(?i)fox(es)?") do
            yield m.Value, m.Index
    }

We match the content string against the specified regular expression. The regex
is case insensitive and may include its plural form. A sequence of matched
values and their indexes is created.

found
|&gt; Seq.iter (fun (e, idx) -&gt; printfn "%s at %d" e idx)

We iterate over the sequence and print the found matches and their indexes.

λ dotnet fsi main.fsx
Foxes at 0
Foxes at 80
Foxes at 194
fox at 292
fox at 307

## F# regex word boundaries

The metacharacter \b is an anchor which matches at a position that
is called a word boundary. It allows to search for whole words.

main.fsx
  

open System.Text.RegularExpressions

let text = "This island is beautiful"

let rx = Regex(@"\bis\b", RegexOptions.Compiled)

let matches =
    rx.Matches(text)
    |&gt; Seq.map (fun m -&gt; m.Value, m.Index)

matches
|&gt; Seq.iter (fun (e, idx) -&gt; printfn "%s at %d" e idx)

We look for the is word, but not for This and island words.

let rx = Regex(@"\bis\b", RegexOptions.Compiled)

With two \b metacharacters, we search for the is whole word.

λ dotnet fsi main.fsx
is at 12

## F# regex currency symbols

The \p{Sc} regular expresion can be used to look for currency
symbols.

main.fsx
  

open System
open System.Text.RegularExpressions

Console.OutputEncoding = Text.Encoding.UTF8

let content = @"Currency symbols: ฿ Thailand bath, ₹  Indian rupee,
    ₾ Georgian lari, $ Dollar, € Euro, ¥ Yen, £ Pound Sterling";

let pattern = @"\p{Sc}";

let rx = Regex(pattern, RegexOptions.Compiled)
let matches = rx.Matches(content)
              |&gt; Seq.map (fun m -&gt; m.Value, m.Index)

matches
|&gt; Seq.iter (fun (e, idx) -&gt; printfn "%s at %d" e idx)

In the program, we look for currency symbols. 

λ dotnet fsi main.fsx
฿ at 18
₹ at 35
₾ at 57
$ at 74
€ at 84
¥ at 92
£ at 99

## F# regex capturing groups

Round brackets are used to create capturing groups. This allows us to apply a
quantifier to the entire group or to restrict alternation to a part of the
regular expression. 

main.fsx
  

open System.Text.RegularExpressions

let sites =
    [ "webcode.me"
      "zetcode.com"
      "spoznaj"
      "freebsd.org"
      "netbsd.org" ]

let rx =
    Regex(@"(\w+)\.(\w+)", RegexOptions.Compiled)

let check e =
    let m = rx.Match(e)
    (m.Value, m.Groups[1], m.Groups[2])

let found = sites |&gt; List.map check

printfn "%A" found

    In the program, we divide the domain names into two parts by using groups. 

let rx =
    Regex(@"(\w+)\.(\w+)", RegexOptions.Compiled)

We define two groups with parentheses. 

let check e =
    let m = rx.Match(e)
    (m.Value, m.Groups[1], m.Groups[2])

The Value attribute returns the whole matched string; it is equal
to the match.Groups[0]. The groups are accessed via the
Groups property. 

λ dotnet fsi main.fsx
[("webcode.me", webcode, me); ("zetcode.com", zetcode, com); ("", , );
 ("freebsd.org", freebsd, org); ("netbsd.org", netbsd, org)]

## Active patterns

We can use regular expression with active patterns and match expression.
*Active patterns* are named partitions of input data which can be used
later in a pattern matching expression.

main.fsx
  

open System.Text.RegularExpressions

let (|RegEx|_|) p i =
    let m = Regex.Match(i, p)

    if m.Success then
        Some m.Groups
    else
        None

let checkrgx (msg) =
    match msg with
    | RegEx @"\d+" g -&gt; printfn "Digit: %A" g
    | RegEx @"\w+" g -&gt; printfn "Word : %A" g
    | _ -&gt; printfn "Not recognized"

checkrgx "an old falcon"
checkrgx "1984"
checkrgx "3 hawks"

In the example, we use active patterns and regular expression in pattern
matching. 

let (|RegEx|_|) p i =
    let m = Regex.Match(i, p)

    if m.Success then
        Some m.Groups
    else
        None

We define RegEx name which matches the pattern agains the given
input.

let checkrgx (msg) =
    match msg with
    | RegEx @"\d+" g -&gt; printfn "Digit: %A" g
    | RegEx @"\w+" g -&gt; printfn "Word : %A" g
    | _ -&gt; printfn "Not recognized"

The defined name is used in the match expression.

λ dotnet fsi main.fsx
Word : seq [an]
Digit: seq [1984]
Digit: seq [3]

In this article we have worked with regular expressions in F#.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.