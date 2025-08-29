+++
title = "Linux sed Command"
date = 2025-08-29T20:03:31.833+01:00
draft = false
description = "Complete guide to Linux sed command with 20 practical examples covering substitution, deletion, transformations and advanced text processing"
image = ""
imageBig = ""
categories = ["linux"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Linux sed Command

last modified April 2, 2025

The sed (stream editor) command is a powerful text processing tool
in Linux that performs basic and advanced text transformations on an input
stream. It reads text line by line, applies specified operations, and outputs
the results. This guide covers sed fundamentals with 20 practical examples
ranging from basic substitutions to advanced text manipulation. Mastering sed
enables efficient batch editing of files and streams without manual
intervention.

## Basic sed Syntax

The basic syntax of sed is sed [options] 'commands' [input-file].
Sed operates on each line of input, applying one or more editing commands. By
default, sed outputs to stdout without modifying the input file. This example
shows fundamental sed usage patterns.

basic_syntax.sh
# 1. Simple text substitution (replace first occurrence per line)
echo "hello world" | sed 's/hello/hi/'
# Output: hi world

# 2. Editing file in-place (with backup)
sed -i.bak 's/foo/bar/' file.txt

# 3. Multiple commands
echo "hello world" | sed -e 's/hello/hi/' -e 's/world/there/'
# Output: hi there

# 4. Using different delimiters
echo "path/to/file" | sed 's|/|_|g'
# Output: path_to_file

# 5. Print only modified lines (-n with p flag)
seq 1 5 | sed -n 's/3/three/p'
# Output: three

Example 1 shows basic substitution syntax s/pattern/replacement/.
Example 2 demonstrates in-place file editing with backup. Example 3 combines
multiple commands with -e. Example 4 uses alternative delimiters
for readability. Example 5 shows how to suppress default output and print only
modified lines.

## Text Substitution Examples

Substitution is sed's most common operation, using the s command.
These examples demonstrate various substitution techniques with different flags
and patterns. Mastering substitutions enables powerful text transformations.

substitution_examples.sh
# 6. Global replacement (all occurrences)
echo "hello hello world" | sed 's/hello/hi/g'
# Output: hi hi world

# 7. Replace only 2nd occurrence
echo "one two two three" | sed 's/two/2/2'
# Output: one two 2 three

# 8. Case-insensitive substitution
echo "Hello hello HELLO" | sed 's/hello/hi/i'
# Output: hi hello HELLO

# 9. Using groups in replacement
echo "John Doe" | sed 's/\([^ ]*\) \([^ ]*\)/\2, \1/'
# Output: Doe, John

# 10. Using &amp; in replacement (matched pattern)
echo "123 abc" | sed 's/[0-9]*/&amp; &amp;/'
# Output: 123 123 abc

Example 6 shows global replacement with g flag. Example 7 replaces
only the 2nd occurrence. Example 8 demonstrates case-insensitive matching with
i. Example 9 uses grouping to reorder names. Example 10 shows how
&amp; represents the matched text.

## Line Selection and Deletion

Sed can select specific lines by number or pattern before applying operations.
These examples demonstrate line addressing and deletion techniques. Precise line
selection is essential for targeted text processing.

line_selection.sh
# 11. Delete lines containing pattern
seq 1 5 | sed '/3/d'
# Output: 1 2 4 5

# 12. Delete lines NOT containing pattern
seq 1 5 | sed '/3/!d'
# Output: 3

# 13. Delete specific line number
seq 1 5 | sed '3d'
# Output: 1 2 4 5

# 14. Delete range of lines (2-4)
seq 1 5 | sed '2,4d'
# Output: 1 5

# 15. Delete from line to end of file
seq 1 5 | sed '3,$d'
# Output: 1 2

Example 11 deletes lines matching a pattern. Example 12 inverts the match with
!. Example 13 deletes by line number. Example 14 shows range
deletion. Example 15 deletes from line 3 to end ($).

## Advanced Transformations

Sed supports advanced text transformations including multi-line operations, hold
space manipulation, and conditional execution. These examples demonstrate sed's
powerful editing capabilities for complex tasks.

advanced_operations.sh
# 16. Append text after match
echo -e "line1\nline2" | sed '/line1/a\appended text'
# Output:
# line1
# appended text
# line2

# 17. Insert text before match
echo -e "line1\nline2" | sed '/line2/i\inserted text'
# Output:
# line1
# inserted text
# line2

# 18. Change entire line
echo -e "old1\nold2" | sed '/old1/c\new line'
# Output:
# new line
# old2

# 19. Transform specific characters (like tr)
echo "hello" | sed 'y/abcdefghij/0123456789/'
# Output: 74llo

# 20. Multi-line pattern matching (N command)
echo -e "line1\nline2\nline3" | sed '/line1/{N;s/line1\nline2/replaced/}'
# Output:
# replaced
# line3

Example 16 appends text after matches. Example 17 inserts before matches.
Example 18 replaces entire lines. Example 19 transforms characters like
tr. Example 20 demonstrates multi-line operations with
N.

## Practical sed Scripts

These practical examples solve real-world text processing problems using sed.
They combine multiple techniques to demonstrate sed's versatility in production
scenarios.

practical_scripts.sh
# 21. Remove blank lines
echo -e "line1\n\nline2" | sed '/^$/d'
# Output:
# line1
# line2

# 22. Remove leading whitespace
echo "    text" | sed 's/^[ \t]*//'
# Output: text

# 23. Remove trailing whitespace
echo "text    " | sed 's/[ \t]*$//'
# Output: text

# 24. Remove HTML tags
echo "&lt;p&gt;Hello &lt;b&gt;world&lt;/b&gt;&lt;/p&gt;" | sed 's/&lt;[^&gt;]*&gt;//g'
# Output: Hello world

# 25. Number lines (like nl)
echo -e "one\ntwo\nthree" | sed '=' | sed 'N;s/\n/ /'
# Output:
# 1 one
# 2 two
# 3 three

Example 21 strips empty lines. Examples 22-23 trim whitespace. Example 24
removes HTML tags. Example 25 numbers lines by combining two sed commands.

## sed with Regular Expressions

Sed's true power comes from combining its commands with regular expressions.
These examples demonstrate sophisticated pattern matching and replacement
techniques.

regex_examples.sh
# 26. Match whole words only
echo "cart part smart" | sed 's/\bpart\b/replace/g'
# Output: cart replace smart

# 27. Extract text between patterns
echo "before [extract] after" | sed 's/.*\[\([^]]*\)\].*/\1/'
# Output: extract

# 28. Convert DOS line endings (CRLF to LF)
sed 's/\r$//' dosfile.txt &gt; unixfile.txt

# 29. Convert lowercase to uppercase
echo "hello" | sed 's/.*/\U&amp;/'
# Output: HELLO

# 30. Format phone numbers
echo "Call 1234567890" | sed 's/\([0-9]\{3\}\)\([0-9]\{3\}\)\([0-9]\{4\}\)/(\1) \2-\3/'
# Output: Call (123) 456-7890

Example 26 matches whole words. Example 27 extracts text between brackets.
Example 28 converts line endings. Example 29 uppercases text. Example 30 formats
phone numbers with capture groups.

## sed Branching and Flow Control

Sed provides branching commands for complex flow control in editing scripts.
These examples demonstrate conditional operations and loops in sed.

branching_examples.sh
# 31. Skip lines containing pattern
echo -e "include\nskip\ninclude" | sed '/skip/b; s/include/replaced/'
# Output:
# replaced
# skip
# replaced

# 32. Multiple commands on matched lines
echo -e "line1\nspecial\nline2" | sed '/special/{s/line/xxx/;p;d}'
# Output:
# line1
# xxxspecial
# line2

# 33. Conditional replacement (only if another match exists)
sed '/start/,/end/ s/foo/bar/' file.txt

# 34. Label and branch example
echo -e "a\nb\na\nc" | sed ':top; /a/{s/a/x/; b top}'
# Output:
# x
# b
# x
# c

# 35. Quit after first match
seq 1 10 | sed '/5/q'
# Output: 1 2 3 4 5

Example 31 skips processing for matched lines. Example 32 applies multiple
commands to matches. Example 33 shows range-based substitution. Example 34
demonstrates labels and branching. Example 35 quits after first match.

## sed Hold and Pattern Space

Sed maintains a pattern space (current line) and hold space (temporary storage)
for advanced text manipulation. These examples demonstrate multi-line processing
techniques.

hold_space_examples.sh
# 36. Reverse file lines (tac)
seq 1 3 | sed '1!G;h;$!d'
# Output:
# 3
# 2
# 1

# 37. Double space lines
echo -e "a\nb\nc" | sed 'G'
# Output:
# a
#
# b
#
# c

# 38. Join pairs of lines
echo -e "a\nb\nc\nd" | sed 'N;s/\n/ /'
# Output:
# a b
# c d

# 39. Print duplicate lines only
echo -e "a\nb\na\nc" | sed -n '$!N; /^\(.*\)\n\1$/p; D'
# Output: a

# 40. Number non-empty lines
echo -e "a\n\nb\nc" | sed '/./=' | sed '/./N; s/\n/ /'
# Output:
# 1 a
# 3 b
# 4 c

Example 36 reverses file lines. Example 37 double spaces lines. Example 38 joins
line pairs. Example 39 finds duplicates. Example 40 numbers only non-empty
lines. These demonstrate sed's advanced buffer manipulation.

## Best Practices

Test sed commands with sample input before applying to important files. Use
-e for complex scripts to improve readability. Precede in-place
edits (-i) with backups during development. Comment complex sed
scripts with # for future maintenance. Consider using
perl or awk for extremely complex text processing
tasks.

## Source References

Learn more from these resources: 
[GNU sed Manual](https://www.gnu.org/software/sed/manual/sed.html),
[sed Man Page](https://linux.die.net/man/1/sed),
and [sed &amp; awk Book](https://www.oreilly.com/library/view/sed-awk/1565922255/).

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Linux tutorials](/all/#linux).