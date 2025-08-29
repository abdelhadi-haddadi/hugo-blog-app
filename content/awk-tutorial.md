+++
title = "AWK tutorial"
date = 2025-08-29T20:03:02.067+01:00
draft = false
description = "AWK tutorial teaches the basics of AWK. AWK is a pattern scanning and processing language."
image = ""
imageBig = ""
categories = ["lang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# AWK tutorial

last modified October 18, 2023

This is AWK tutorial. It covers the basics of the AWK tool.

## AWK

AWK is a pattern-directed scanning and processing language. An AWK program
consists of a set of actions to be taken against streams of textual data. AWK
extensively uses regular expressions. It is a standard feature of most Unix-like
operating systems.

AWK was created at Bell Labs in the 1977. Its name is derived from the family
names of its authors – Alfred Aho, Peter Weinberger, and Brian Kernighan.

There are two major implementations of AWK. The traditional Unix AWK and the
newer GAWK. GAWK is the GNU Project's implementation of the AWK programming 
language. GAWK has several extensions to the original AWK. 

## AWK program

An AWK program consists of a sequence of pattern-action statements and optional
function definitions. It processes text files. AWK is a line oriented language.
It divides a file into lines called *records*. Each line is broken up
into a sequence of *fields*. The fields are accessed by special
variables: $1 reads the first field, $2 the second and so on. The $0 variable
refers to the whole record.

The structure of an AWK program has the following form:

pattern { action }

The pattern is a test that is performed on each of the records. If the condition
is met then the action is performed. Either pattern or action can be omitted,
but not both. The default pattern matches each line and the default action is to
print the record.

awk -f program-file [file-list]
awk program [file-list]

An AWK program can be run in two basic ways: a) the program is read from a
separate file; the name of the program follows the -f option, b)
the program is specified on the command line enclosed by quote characters.

## AWK one-liners

AWK one-linears are simple one-shot programs run from the command line. Let us
have the following text file:

words.txt
  

storeroom
tree
cup
store
book
cloud
existence
ministerial
falcon
town
sky
top
bookworm
bookcase
war

We want to print all words included in the words.txt file that are
longer than five characters.

$ awk 'length($1) &gt; 5 {print $0}' words.txt
storeroom
existence
ministerial
falcon
bookworm
bookcase

The AWK program is placed between two single quote characters. The first is the
pattern; we specify that the length of the record is greater that five. The
length function returns the length of the string. The
$1 variable refers to the first field of the record; in our case
there is only one field per record. The action is placed between curly brackets.

$ awk 'length($1) &gt; 5' words.txt
storeroom
existence
ministerial
falcon
bookworm
bookcase

As we have specified earlier, the action can be omitted. In such a case a
default action is performed — printing of the whole record.

$ awk 'length($1) == 3' words.txt
cup
sky
top
war

We print all words that have three characters.

$ awk '!(length($1) == 3)' words.txt
storeroom
tree
store
book
cloud
existence
ministerial
falcon
town
bookworm
bookcase

With the ! operator, we can negate the condition; we print all
lines that do not have three characters.

$ awk '(length($1) == 3) || (length($1) == 4)' words.txt
tree
cup
book
town
sky
top
war

We combined two conditions with the || operator.

$ awk 'length($1) &gt; 0  {print $1, "has", length($1), "chars"}' words.txt
storeroom has 9 chars
tree has 4 chars
cup has 3 chars
store has 5 chars
book has 4 chars
cloud has 5 chars
existence has 9 chars
ministerial has 11 chars
falcon has 6 chars
town has 4 chars
sky has 3 chars
top has 3 chars
bookworm has 8 chars
bookcase has 8 chars
war has 3 chars

This AWK command prints the length of each of the words. If we separate
print arguments with a comma, AWK adds a space character.

$ grep book words.txt
book
bookworm
bookcase
$ grep book words.txt -n
5:book
13:bookworm
14:bookcase

The grep command is used for locating text patterns inside files.

$ awk '/book/ {print}' words.txt
book
bookworm
bookcase
$ awk '/book/ {print NR ":" $0}' words.txt
5:book
13:bookworm
14:bookcase

These are AWK equivalents of the above grep commands. The NR
variable gives the total number of records/lines being processed.

Next we apply conditions on numbers.

scores.txt
  

Peter 89
Lucia 95
Thomas 76
Marta 67
Joe 92
Alex 78
Sophia 90
Alfred 65
Kate 46

We have a file with scores of students.

$ awk '$2 &gt;= 90 { print $0 }' scores.txt
Lucia 95
Joe 92
Sophia 90

We print all students with scores 90+.

$ awk '$2 &gt;= 90 { print }' scores.txt
Lucia 95
Joe 92
Sophia 90

If we omit an argument for the print function, the $0
is assumed.

$ awk '$2 &gt;= 90' scores.txt
Lucia 95
Joe 92
Sophia 90

A missing { action } means print the matching line.

$ awk '{ if ($2 &gt;= 90) print }' scores.txt
Lucia 95
Joe 92
Sophia 90

Instead of a pattern, we can also use an if condition in the action.

$ awk '{sum += $2} END { printf("The average score is %.2f\n", sum/NR) }' scores.txt
The average score is 77.56

This command calculates the average score. In the action block, we calculate
the sum of scores. In the END block, we print the average score.
We format the output with the built-in printf function. The
%.2f is a format specifier; each specifier begins with the
% character. The .2 is the precision -- the number of
digits after the decimal point. The f expects a floating point
value. The \n is not a part of the specifier; it is a newline
character. It prints a newline after the string is shown on the terminal.

## AWK working with pipes

AWK can receive input and send output to other commands via the pipe.

$ echo -e "1 2 3 5\n2 2 3 8" | awk '{print $(NF)}'
5
8

In this case, AWK receives output from the echo command.
It prints the values of last column.

$ awk -F: '$7 ~ /bash/ {print $1}' /etc/passwd | wc -l
3

Here, the AWK program sends data to the wc command via the pipe.
In the AWK program, we find out those users who use bash. Their names are
passed to the wc command which counts them. In our
case, there are three users using bash.

## AWK fields

AWK reads files line by line. Each line or record can be separated into fields.
The FS variable stores the field separator, which is a space by
default.

$ ls -l
total 132
drwxr-xr-x  2 jano7  jano7     512 Feb 11 16:02 data
-rw-r--r--  1 jano7  jano7  110211 Oct 12  2019 sid.jpg
-rw-r--r--  1 jano7  jano7       5 Jul 22 20:21 some.txt
-rw-r--r--  1 jano7  jano7     226 Apr 23 16:56 thermopylae.txt
-rw-r--r--  1 jano7  jano7     365 Aug  4 10:22 users.txt
-rw-r--r--  1 jano7  jano7      24 Jul 21 21:03 words.txt
-rw-r--r--  1 jano7  jano7      30 Jul 22 21:20 words2.txt

We have these files in the current working directory.

$ ls -l | awk '{print $6 " " $9}'

Feb data
Oct sid.jpg
Jul some.txt
Apr thermopylae.txt
Aug users.txt
Jul words.txt
Jul words2.txt

We redirect the output of the ls command to AWK. We print the sixth
and ninth columns of the output.

users.txt
  

John Doe, gardener, London, M, 11/23/1982
Jane Doe, teacher, London, F, 10/12/1988
Peter Smith, programmer, New York, M, 9/18/2000
Joe Brown, driver, Portland, M, 1/1/1976
Jack Smith, physician, Manchester, M, 2/27/1983
Lucy Black, accountant, Birmingham, F, 5/5/1998
Martin Porto, actor, Los Angeles, M, 4/30/1967
Sofia Harris, interpreter, Budapest, F, 8/18/1993

In the users.txt file, we have a few users. The fields are now
separated with a comma character.

$ awk -F, '{print $1 " is a(n)" $2}' users.txt
John Doe is a(n) gardener
Jane Doe is a(n) teacher
Peter Smith is a(n) programmer
Joe Brown is a(n) driver
Jack Smith is a(n) physician
Lucy Black is a(n) accountant
Martin Porto is a(n) actor
Sofia Harris is a(n) interpreter

We print the first and the second column of the file. We specify the field
separator with the -F option.

$ awk 'BEGIN {FS=","}  {print $3}' users.txt
London
London
New York
Portland
Manchester
Birmingham
Los Angeles
Budapest

The field separator can be also set in the program. We set the FS
variable to comma inside the BEGIN block, which is executed once at the
beginning of the program execution.

$ awk 'BEGIN {FS=","}  {print $3}' users.txt | uniq
London
New York
Portland
Manchester
Birmingham
Los Angeles
Budapest

We pass the output to the uniq command to get distinct values.

$ awk -F, '$4 ~ "F"  {print $1}' users.txt
Jane Doe
Lucy Black
Sofia Harris

We print all females. We use the ~ operator to match against a
pattern.

$ awk '{print "The", NR". record has", length($0), "characters"}' users.txt
The 1. record has 41 characters
The 2. record has 40 characters
The 3. record has 47 characters
The 4. record has 40 characters
The 5. record has 47 characters
The 6. record has 47 characters
The 7. record has 46 characters
The 8. record has 49 characters

The command prints the number of characters for each record. The $0
stands for the whole line.

$ awk -F, '{print $NF, $(NF-1)}' users.txt
11/23/1982  M
10/12/1988  F
9/18/2000  M
1/1/1976  M
2/27/1983  M
5/5/1998  F
4/30/1967  M
8/18/1993  F

The $NF is the last field, the $(NF-1) is the second
last field.

$ awk -F, '{ if ($4 ~ "M") {m++} else {f++} } END {printf "users: %d\nmales: %d\nfemales: %d\n", m+f, m, f}' users.txt
users: 8
males: 5
females: 3

The command prints the number of users, males, and females. When the command is
becoming too complex, it is better to put it inside a file.

males_females.awk
  

{
    if ($4 ~ "M") {

        m++
    } else {

        f++
    }
}

END {
    printf "users: %d\nmales: %d\nfemales: %d\n", m+f, m, f
}

The first block delimited by {} is executed for each line of the
file. We count all records that have and don't have M in the 4th field. The
numbers are stored in the m and f variables. The
END block is executed once in the end of the program. There we
print the number of users, males, and females. The printf function
allows us to create formatted strings.

$ awk -F, -f males_females.awk users.txt
users: 8
males: 5
females: 3

AWK reads the program from the file followed by the -f option.

## AWK regular expressions

Regular expressions are often applied on AWK fields. The ~ is the
regular expression match operator. It checks if a string matches the provided
regular expression.

$ awk '$1 ~ /^[b,c]/ {print $1}' words.txt
cup
book
cloud
bookworm
bookcase

In this command we print all the words that begin with b or c character. The
regular expression is placed between two slash characters.

$ awk '$1 ~ /[e,n]$/ {print $1}' words.txt
tree
store
existence
falcon
town
bookcase

This command prints all words that end with e or n.

$ awk '$1 ~ /\&lt;...\&gt;/ {print $1}' words.txt
cup
sky
top
war

The command prints all words that have three characters. The doc (.) stands
for any character and the \&lt; \&gt; characters are word boundaries.

$ awk '$1 ~ /\&lt;...\&gt;/ || $1 ~ /\&lt;....\&gt;/ {print $1}' words.txt
tree
cup
book
town
sky
top
war

We combine two condition with the or (||) operator. The AWK command prints all
words that have either three of four characters.

$ awk '$1 ~ /store|room|book/' words.txt
storeroom
store
book
bookworm
bookcase

With the alternation operator (|), we print fields that contain either of the
specified wores.

$ awk '$1 ~ /^book(worm|case)?$/' words.txt
book
bookworm
bookcase

Applying a subpattern with , we print fields that include words
book, bookwor, or bookcase. The ? tells that the subpattern may or
may not be there.

The match is a built-in string manipulation function. It tests if
the given string contains a regular expression pattern. The first parameter is
the string, the second is the regex pattern. It is similar to the ~
operator.

$ awk 'match($0, /^[c,b]/)' words.txt
brown
craftsmanship
book
beautiful
computer

The program prints those lines that begin with c or b. The regular expression is
placed between two slash characters.

The match function sets the RSTART variable;
it is the index of the start of the matching pattern.

$ awk 'match($0, /i/) {print $0 " has i character at " RSTART}' words.txt
craftsmanship has i character at 12
beautiful has i character at 6
existence has i character at 3
ministerial has i character at 2

The program prints those words that contain the i character. In addition, it
prints the first occurrence of the character.

## AWK built-in variables

AWK provides important built-in variables.

Variable nameDescription
FSfield separator (default space)
NF# of fields in the current record
NRcurrent record/line number
$0whole line
$nn-th field
FNRcurrent record number in the current file
RSinput record separator (default newline)
OFSoutput field separator (default blank)
ORSoutput record separator (default newline)
OFMToutput format for numbers (default %.6g)
SUBSEPseparates multiple subscripts (default 034)
ARGCargument count
ARGVarray of arguments
FILENAMEthe name of the current input file
RSTARTindex of the start of the matching pattern
RLENGTHthe length of the string matched by the match function
CONVFMTconversion format used when converting numbers (default %.6g)

The table lists common AWK variables.

$ awk 'NR % 2 == 0 {print}' words.txt
tree
store
cloud
ministerial
town
top
bookcase

The above program prints each second record of the words.txt file.
Modulo dividing the NR variable we get an even line.

Say we want to print the line numbers of the file.

$ awk '{print NR, $0}' words.txt
1 storeroom
2 tree
3 cup
4 store
5 book
6 cloud
7 existence
8 ministerial
9 falcon
10 town
11 sky
12 top
13 bookworm
14 bookcase
15 war

Again, we use the NR variable. We skip the pattern, therefore, the
action is peformed on each line. The $0 variable refers to the
whole record.

$ echo -e "cup\nbill\ncoin" &gt; words1.txt
$ echo -e "cloud\nbreath\nrank" &gt; words2.txt

We create two text files with some words.

$ awk '{ print $1, "is at line", FNR, "in", FILENAME }' words1.txt words2.txt
cup is at line 1 in words1.txt
bill is at line 2 in words1.txt
coin is at line 3 in words1.txt
cloud is at line 1 in words2.txt
breath is at line 2 in words2.txt
rank is at line 3 in words2.txt

We print where each word is located; we include the line number and the
filename. The difference between the NR and FNR
variables is that the former counts lines in all files while the latter counts
lines always in the current file.

For the following example, we have this C source file.

source.c
  

1  #include &lt;stdio.h&gt;
2
3  int main(void) {
4
5      char *countries[5] = { "Germany", "Slovakia", "Poland",
6              "China", "Hungary" };
7
8      size_t len = sizeof(countries) / sizeof(*countries);
9
10     for (size_t i=0; i &lt; len; i++) {
11
12         printf("%s\n", countries[i]);
13     }
14 }

We have a source file with line numbers. Our task is to remove the numbers from
the text.

$ awk '{print substr($0, 4)}' source.c
#include &lt;stdio.h&gt;

int main(void) {

    char *countries[5] = { "Germany", "Slovakia", "Poland",
            "China", "Hungary" };

    size_t len = sizeof(countries) / sizeof(*countries);

    for (size_t i=0; i &lt; len; i++) {

        printf("%s\n", countries[i]);
    }
}

We use the substr function. It prints a substring from the given
string. We apply the function on each line, skipping the first three characters.
In other words, we print each record from the fourth character till its end.

$ awk '{print substr($0, 4) &gt;&gt; "source2.c"}' source.c

We redirect the output to a new file.

The NF is the number of fields in the current record.

values.txt
  

2 3 1 34 21 12
43 21 11 2 11 33 12
43 72 91 90 32 14
34 87 22 12 75 2 42 13
75 23 1 42 41 94 4 32
2 1 6 2 1 3 1 4
53 13 52 84 14 14 63
3 2 5 76 31 45

We have a file of values.

$ awk 'NF == 6' values.txt
2 3 1 34 21 12
43 72 91 90 32 14
3 2 5 76 31 45

We print records that have six fields.

$ awk '{print "line", NR, "has", NF, "values"}' values.txt
line 1 has 6 values
line 2 has 7 values
line 3 has 6 values
line 4 has 8 values
line 5 has 8 values
line 6 has 8 values
line 7 has 7 values
line 8 has 6 values

This command prints the number of values for each line.

calc_sum.awk
  

{
    for (i = 1; i&lt;=NF; i++) {

        sum += $i
    }

    print "line", NR, "sum:", sum

    sum = 0
}

The program calculates the sum of values for each line.

for (i = 1; i&lt;=NF; i++) {

    sum += $i
}

This is a classic for loop. We go through each of the fields in the record and 
add the value to the sum variable. The += is a 
compound addition operator.

$ awk -f calc_sum.awk values.txt
line 1 sum: 73
line 2 sum: 133
line 3 sum: 342
line 4 sum: 287
line 5 sum: 312
line 6 sum: 20
line 7 sum: 293
line 8 sum: 162

The following is an alternative solution using the split function.

calc_sum2.awk
  

{
    split($0, vals)

    for (idx in vals) {

        sum += vals[idx]
    }

    print "line", NR, "sum:", sum

    sum = 0
}

The program calculates the sum of values for each line.

split($0, vals)

The split function splits the given string into an array; the
default separator for elements of the record is FS.

for (idx in vals) {

    sum += vals[idx]
}

We go through the array and calculate the sum. In each of the loop cycles, the 
idx variable is set to the current index of the array.

$ awk -f calc_sum2.awk values.txt
line 1 sum: 73
line 2 sum: 133
line 3 sum: 342
line 4 sum: 287
line 5 sum: 312
line 6 sum: 20
line 7 sum: 293
line 8 sum: 162

## BEGIN and END blocks

BEGIN and END are blocks that are executed before and
after all records have been read. These two keywords are followed by curly
brackets where we specify statements to be executed.

$ awk 'BEGIN { print "Unix time: ", systime()}'
Unix time: 1628156179

The BEGIN block is executed before the first input line is
processed. We print the Unix time, utilizing the systime function.
The function is a gawk extension function.

$ awk 'BEGIN { print "Today is", strftime("%Y-%m-%d") }'
Today is 2021-08-05

The program prints the current date. The strftime is a GAWK 
extension.

$ echo "1,2,3,4,5" | awk '{ split($0,a,",");for (idx in a) {sum+=a[idx]} } END {print sum}'
15

The program splits the line into an array of numbers with the split
function. We go over the array elements and calculate their sum. In the
END block, we print the sum.

thermopylae.txt
  

The Battle of Thermopylae was fought between an alliance of Greek city-states,
led by King Leonidas of Sparta, and the Persian Empire of Xerxes I over the
course of three days, during the second Persian invasion of Greece.

We want to count the number of lines, words, and characters in the file.

$ wc thermopylae.txt
4      38     226 thermopylae.txt

To count the number of lines, words, and characters in a file, we have the
wc command.

count_words.txt
  

{
    words += NF
    chars += length + 1 # include newline character
}
END { print NR, words, chars }

The first part of the program is executed for each line of the file. The
END block is run at the end of the program.

$ awk -f count_words.awk thermopylae.txt
4 38 226

```
$ cat words.txt
brown
tree
craftsmanship
book
beautiful
existence
ministerial
computer
town
$ cat words2.txt
pleasant
curly
storm
hering
immune

```

We want to know the number of lines in those two lines.

$ awk 'END {print NR}' words.txt words2.txt
14

We pass two files to the AWK program. AWK sequentially processes the
file names received on the command line.
The block following the END keyword is executed
at the end of the program; we print the NR variable
which holds the line number of the last processed line.

$ awk 'BEGIN {srand()} {lines[NR] = $0} END { r=int(rand()*NR + 1); print lines[r]}' words.txt
tree

The above program prints a random line from the words.txt file.
The srand function seeds the random number generator.
The function has to be executed only once. In the main part of the program,
we store the current record into the lines array.
In the end, we compute a random number between 1 and NR
and print the randomly chosen line from the array structure.

## AWK playing with words dictionary

In the following examples, we create a couple of AWK programs that work with
an English dictionary. On Unix systems, a dictionary is located in
/usr/share/dict/words file.

$ awk 'length($1) == 10 { n++ } END {print n}' /usr/share/dict/words
30882

This command prints the number of words in the given dictionary that have ten
characters. In the action block, we increase the n variable for
each match. In the END block, we print the final number.

$ awk '$1 ~ /^w/ &amp;&amp; length($1) == 4 { n++; if (n&lt;15) {print} else {exit} }' /usr/share/dict/words
waag
waar
wabe
wace
wack
wade
wadi
waeg
waer
waff
waft
wage
waif
waik

This command prints the first fifteen words that begin with 'w' and have four
letters. The exit statement terminates the AWK program.

$ awk '$1 ~ /^w.*r$/ { n++; if (n&lt;15) {print} } END {print n}' /usr/share/dict/words
waar
wabber
wabster
wacker
wadder
waddler
wader
wadmaker
wadsetter
waer
wafer
waferer
wafermaker
wafter
417

The command prints the first fifteen words that begin with 'w' and end in 'r'.
In the end, it prints the total number of such words in the file.

Palindrome is a word, number, phrase, or other sequence of characters
which reads the same backward as forward, such as madam or racecar.

palindromes.awk
  

{
    for (i=length($0); i!=0; i--) {

        r = r substr($0, i, 1)
    }

    if (length($0) &gt; 1 &amp;&amp; $0 == r) {

        print
        n++
    }

    r = ""
}

END {

    printf "There are %d palindromes\n", n
}

The program finds all palindromes. The algorithm is that the original word must
equal to a reversed word.

for (i=length($0); i!=0; i--) {

    r = r substr($0, i, 1)
}

Using a for loop, we reverse the given string. The substr function
returns a subtring; the first parameter is the string, the second is the
beginning position, and the last is the length of the substring. To concatenate
strings in AWK, we simply separate them by a space character.

if (length($0) &gt; 1 &amp;&amp; $0 == r) {

    print
    n++
}

The length of the word must be greater than 1; we don't count single letters
as palindromes. If the reversed word is equal to the original word, we print it
and increase the n variable.

r = ""

We reset the r variable.

END {

    printf "There are %d palindromes\n", n
}

In the end, we print the number of palindromes in the file.

palindromes2.awk
  

{
    if (length($0) == 1) {next}

    rev = reverse($0)

    if ($0 == rev) {
        print
        n++
    }
}

END {

    printf "There are %d palindromes\n", n
}

function reverse(word) {
    r = ""

    for (i=length(word); i!=0; i--) {
        r = r substr(word, i, 1)
    }

    return r
}

To improve the readability of the program, we create a custom
reverse function.

## AWK ARGC and ARGV variables

Next, we work with ARGC and ARGV variables.

$ awk 'BEGIN { print ARGC, ARGV[0], ARGV[1]}' words.txt
2 awk words.txt

The program prints the number of arguments of the AWK program and the first
two arguments. ARGC is the number of command line arguments;
in our case there are two arguments including the AWK itself.
ARGV is an array of command line arguments.  The array is indexed
from 0 to ARGC - 1.

FS is an input field separator, a space by default. NF
is the number of fields in the current input record.

For the following program, we use this file:

$ cat values
2, 53, 4, 16, 4, 23, 2, 7, 88
4, 5, 16, 42, 3, 7, 8, 39, 21
23, 43, 67, 12, 11, 33, 3, 6

We have three lines of comma-separated values.

stats.awk
  

BEGIN {

    FS=","
    max = 0
    min = 10**10
    sum = 0
    avg = 0
}

{
    for (i=1; i&lt;=NF; i++) {

        sum += $i

        if (max &lt; $i) {
            max = $i
        }

        if (min &gt; $i) {
            min = $i
        }

        printf("%d ",  $i)
    }
}

END {

    avg = sum / NF
    printf("\n")
    printf("Min: %d, Max: %d, Sum: %d, Average: %d\n", min, max, sum, avg)
}

The program counts the basic statistics from the provided values.

FS=","

The values in the file are separated by the comma character; therefore, we
set the FS variable to comma character.

max = 0
min = 10**10
sum = 0
avg = 0

We define default values for the maximum, minimum, sum, and average. AWK
variables are dynamic; their values are either floating-point numbers or
strings, or both, depending upon how they are used.

{
    for (i=1; i&lt;=NF; i++) {

        sum += $i

        if (max &lt; $i) {
            max = $i
        }

        if (min &gt; $i) {
            min = $i
        }

        printf("%d ",  $i)
    }
}

In the main part of the script, we go through each line and
calculate the maximum, minumum, and the sum of the values.
The NF is used to determine the number of values
per line.

END {

    avg = sum / NF
    printf("\n")
    printf("Min: %d, Max: %d, Sum: %d, Average: %d\n", min, max, sum, avg)
}

In the end part of the script, we calculate the average and print
the calculations to the console.

$ awk -f stats.awk values
2 53 4 16 4 23 2 7 88 4 5 16 42 3 7 8 39 21 23 43 67 12 11 33 3 6
Min: 2, Max: 88, Sum: 542, Average: 67

The FS variable can be specified as a command line option with
the -F flag.

$ awk -F: '{print $1, $7}' /etc/passwd | head -7
root /bin/bash
daemon /usr/sbin/nologin
bin /usr/sbin/nologin
sys /usr/sbin/nologin
sync /bin/sync
games /usr/sbin/nologin
man /usr/sbin/nologin

The example prints the first (the user name) and the seventh field (user's shell)
from the system /etc/passwd file. The head command is used
to print only the first seven lines. The data in the /etc/passwd file
is separated by a colon. So the colon is given to the -F option.

The RS is the input record separator, by default a newline.

$ echo "Jane 17#Tom 23#Mark 34" | awk 'BEGIN {RS="#"} {print $1, "is", $2, "years old"}'
Jane is 17 years old
Tom is 23 years old
Mark is 34 years old

In the example, we have relevant data separated by the # character. The RS
is used to strip them. AWK can receive input from other commands like echo.

## AWK GET request

AWK can make HTTP requests. We use the getline function and
the /inet/tcp/0/ file.

get_page.awk
  

BEGIN {

    site = "webcode.me"

    server = "/inet/tcp/0/" site "/80"
    print "GET / HTTP/1.0" |&amp; server
    print "Host: " site |&amp; server
    print "\r\n\r\n" |&amp; server

    while ((server |&amp; getline line) &gt; 0 ) {

        content = content line "\n"
    }

    close(server)
    print content
}

The program makes a GET request to the webcode.me page and reads its response.

print "GET / HTTP/1.0" |&amp; server

The |&amp; operator starts a coprocess, which allows a two-way
communication.

while ((server |&amp; getline line) &gt; 0 ) {

    content = content line "\n"
}

With the getline function, we read the response from the server.

## Passing variables to AWK

AWK has the -v option which is used to assign values to variables.

$ awk -v today=$(date +%Y-%m-%d) 'BEGIN { print "Today is", today }'
Today is 2021-08-05

We pass the output of the date command to the today
variable, which can be then accessed in the AWK program.

thermopylae.txt
  

The Battle of Thermopylae was fought between an alliance of Greek city-states,
led by King Leonidas of Sparta, and the Persian Empire of Xerxes I over the
course of three days, during the second Persian invasion of Greece.

mygrep.awk
  

```
{
    for (i=1; i&lt;=NF; i++) {

        field = $i

        if (field ~ word) {

            c = index($0, field)
            print NR "," c, $0
            next
        }
    }
}

```

The example simulates the grep utility. It finds the provided
word and prints its line and the its starting index. (The program finds only
the first occurrence of the word.) The word variable
is passed to the program using the -v option.

$ awk -v word=the -f mygrep.awk thermopylae.txt 
2,37 led by King Leonidas of Sparta, and the Persian Empire of Xerxes I over the
3,30 course of three days, during the second Persian invasion of Greece.

We have looked for the "the" word in the thermopylae.txt file.

## Word frequency

Next, we calculate the word frequency of the Bible.

$ wget https://raw.githubusercontent.com/janbodnar/data/main/the-king-james-bible.txt

We download the King James Bible. 

$ file the-king-james-bible.txt 
the-king-james-bible.txt: UTF-8 Unicode (with BOM) text

When we examine the text, we can see that is is UTF-8 Unicode text with 
Byte order mark. The BOM must be taken into account in the AWK proram.

word_freq.awk
  

{
    if (NR == 1) { 
        sub(/^\xef\xbb\xbf/,"")
    }

    gsub(/[,;!()*:?.]*/, "")
    
    for (i = 1; i &lt;= NF; i++) {

        if ($i ~ /^[0-9]/) { 
            continue
        }

        w = $i
        words[w]++
    }
} 

END {

    for (idx in words) {

        print idx, words[idx]
    }
}

We calculate how many times a word is present in the book.

if (NR == 1) { 
    sub(/^\xef\xbb\xbf/,"")
}

From the first line, we remove the BOM character. If we did not remove the BOM,
the very first word (The in our case) would contain it and would be thus
recognized as a unique word.

gsub(/[,;!()*:?.]*/, "")

From the current record, we remove punctuation characters such as comma and
colon. Otherwise, text such as the and the, would be considered as two distinct
words.

The gsub function globally replaces the given regular expression
with the specified string; since the string is empty, it means that they are
deleted. If the string where the substitutions should take place is not
specified, the $0 is assumed.

for (i = 1; i &lt;= NF; i++) {

    if ($i ~ /^[0-9]/) { 
        continue
    }

    w = $i
    words[w]++
}

In the for loop, we go over the fields of the current line. Bible text is
preceded with verses; these we do not want to include. So if the first field
begins with a digit, we skip the current cycle with the continue
keyword. The words is an array of words. Each index is a word 
from the text. The values correspoinding to the indexes are frequencies. 
Each time a word is encountered, its value is incremented.

END {

    for (idx in words) {

        print idx, words[idx]
    }
}

In the end, we go through the words and print their indexes (words) and values 
(frequencies).

$ awk -f word_freq.awk the-king-james-bible.txt &gt; bible_words.txt

We run the program and redirect the output to the file. 

$ sort -nr -k 2 bible_words.txt | head
the 62103
and 38848
of 34478
to 13400
And 12846
that 12576
in 12331
shall 9760
he 9665
unto 8942

We sort the data and print the first ten most frequent words.

PROCINFO is a special, built-in array which can influence the AWK 
program. For instance, it can determine the way the array is traversed. It is 
a GAWK extension.

freq_top.awk
  

{
    if (NR == 1) { 
        sub(/^\xef\xbb\xbf/,"")
    }

    gsub(/[,;!()*:?.]*/, "")

    for (i = 1; i &lt;= NF; i++) {

        if ($i ~ /[0-9]/) {
            continue
        }
    
        w = $i
        words[w]++
    }
} 

END {

    PROCINFO["sorted_in"] = "@val_num_desc"
    
    for (idx in words) {

        print idx, words[idx]
    }
}

With PROCINFO["sorted_in"] = "@val_num_desc", we traverse the array
by comparing the values in descending order.

$ awk -f freq_top.awk the-king-james-bible.txt | head
the 62103
and 38848
of 34478
to 13400
And 12846
that 12576
in 12331
shall 9760
he 9665
unto 8942

## Spell checking

We create an AWK program for spell checking.

spellcheck.awk
  

BEGIN {
    count = 0

    i = 0
    while (getline myword &lt;"/usr/share/dict/words") {
        dict[i] = myword
        i++
    }
}

{
    for (i=1; i&lt;=NF; i++) {

        field = $i

        if (match(field, /[[:punct:]]$/)) {
            field = substr(field, 0, RSTART-1)
        }

        mywords[count] = field
        count++
    }
}

END {

    for (w_i in mywords) {
        for (w_j in dict) {
            if (mywords[w_i] == dict[w_j] ||
                        tolower(mywords[w_i]) == dict[w_j]) {
                delete mywords[w_i]
            }
        }
    }

    for (w_i in mywords) {
        if (mywords[w_i] != "") {
            print mywords[w_i]
        }
    }
}

The script compares the words of the provided text file against
a dictionary. Under the standard /usr/share/dict/words
path we can find an English dictionary; each word is on
a separate line.

BEGIN {
    count = 0

    i = 0
    while (getline myword &lt;"/usr/share/dict/words") {
        dict[i] = myword
        i++
    }
}

Inside the BEGIN block, we read the words from the dictionary
into the dict array. The getline command reads a
record from the given file name; the record is stored in the
$0 variable.

{
    for (i=1; i&lt;=NF; i++) {

        field = $i

        if (match(field, /[[:punct:]]$/)) {
            field = substr(field, 0, RSTART-1)
        }

        mywords[count] = field
        count++
    }
}

In the main part of the program, we place the words of
the file that we are spell checking into the mywords
array. We remove any punctuation marks (like commas or dots) from
the endings of the words.

END {

    for (w_i in mywords) {
        for (w_j in dict) {
            if (mywords[w_i] == dict[w_j] ||
                        tolower(mywords[w_i]) == dict[w_j]) {
                delete mywords[w_i]
            }
        }
    }
...
}

We compare the words from the mywords array against the dictionary
array. If the word is in the dictionary, it is removed with the
delete command. Words that begin a sentence start with an uppercase
letter; therefore, we also check for a lowercase alternative utilizing the
tolower function.

for (w_i in mywords) {
    if (mywords[w_i] != "") {
        print mywords[w_i]
    }
}

Remaining words have not been found in the dictionary; they are
printed to the console.

$ awk -f spellcheck.awk text
consciosness
finaly

We have run the program on a text file; we have found two misspelled
words. Note that the program takes some time to finish.

## Rock-paper-scissors

Rock-paper-scissors is a popular hand game in which each player simultaneously
forms one of three shapes with an outstretched hand. We create this game
in AWK.

rock_scissors_paper.awk
  

# This program creates a rock-paper-scissors game.

BEGIN {

    srand()

    opts[1] = "rock"
    opts[2] = "paper"
    opts[3] = "scissors"

    do {

        print "1 - rock"
        print "2 - paper"
        print "3 - scissors"
        print "9 - end game"

        ret = getline &lt; "-"

        if (ret == 0 || ret == -1) {
            exit
        }

        val = $0

        if (val == 9) {
            exit
        } else if (val != 1 &amp;&amp; val != 2 &amp;&amp; val != 3) {
            print "Invalid option"
            continue
        } else {
            play_game(val)
        }

    } while (1)
}

function play_game(val) {

    r = int(rand()*3) + 1

    print "I have " opts[r] " you have "  opts[val]

    if (val == r) {
        print "Tie, next throw"
        return
    }

    if (val == 1 &amp;&amp; r == 2) {

        print "Paper covers rock, you loose"
    } else if (val == 2 &amp;&amp; r == 1) {

        print "Paper covers rock, you win"
    } else if (val == 2 &amp;&amp; r == 3) {

        print "Scissors cut paper, you loose"
    } else if (val == 3 &amp;&amp; r == 2) {

        print "Scissors cut paper, you win"
    } else if (val == 3 &amp;&amp; r == 1) {

        print "Rock blunts scissors, you loose"
    } else if (val == 1 &amp;&amp; r == 3) {

        print "Rock blunts scissors, you win"
    }
}

We play the game against the computer, which chooses its options
randomly.

srand()

We seed the random number generator with the srand function.

opts[1] = "rock"
opts[2] = "paper"
opts[3] = "scissors"

The three options are stored in the opts array.

do {

    print "1 - rock"
    print "2 - paper"
    print "3 - scissors"
    print "9 - end game"
...

The cycle of the game is controlled by the do-while loop.
First, the options are printed to the terminal.

ret = getline &lt; "-"

if (ret == 0 || ret == -1) {
    exit
}

val = $0

A value, our choice, is read from the command line using the getline command;
the value is stored in the val variable.

if (val == 9) {
    exit
} else if (val != 1 &amp;&amp; val != 2 &amp;&amp; val != 3) {
    print "Invalid option"
    continue
} else {
    play_game(val)
}

We exit the program if we choose option 9. If the value is outside the printed
menu options, we print an error message and start a new loop with the
continue command. If we have choosen one of the three options
correctly, we call the play_game function.

r = int(rand()*3) + 1

A random value from 1..3 is chosen with the rand function. This is
the choice of the computer.

if (val == r) {
    print "Tie, next throw"
    return
}

In case both players choose the same option there is a tie. We return from
the function and a new loop is started.

if (val == 1 &amp;&amp; r == 2) {

    print "Paper covers rock, you loose"
} else if (val == 2 &amp;&amp; r == 1) {
...

We compare the chosen values of the players and print the result
to the console.

$ awk -f rock_scissors_paper.awk
1 - rock
2 - paper
3 - scissors
9 - end game
1
I have scissors you have rock
Rock blunts scissors, you win
1 - rock
2 - paper
3 - scissors
9 - end game
3
I have paper you have scissors
Scissors cut paper, you win
1 - rock
2 - paper
3 - scissors
9 - end game

A sample run of the game.

## Marking keywords

In the following example, we mark Java keywords in a source file.

mark_keywords.awk
  

# the program adds tags around Java keywords
# it works on keywords that are separate words

BEGIN {

    # load java keywords
    i = 0
    while (getline kwd &lt;"javakeywords2") {
        keywords[i] = kwd
        i++
    }
}

{
    mtch = 0
    ln = ""
    space = ""

    # calculate the beginning space
    if (match($0, /[^[:space:]]/)) {
        if (RSTART &gt; 1) {
            space = sprintf("%*s", RSTART, "")
        }
    }

    # add the space to the line
    ln = ln space

    for (i=1; i &lt;= NF; i++) {

        field = $i

        # go through keywords
        for (w_i in keywords) {

            kwd = keywords[w_i]

            # check if a field is a keyword
            if (field == kwd) {
                mtch = 1
            }
        }

        # add tags to the line
        if (mtch == 1) {
            ln = ln  "&lt;kwd&gt;" field  "&lt;/kwd&gt; "
        } else {
            ln = ln field " "
        }

        mtch = 0
    }

    print ln
}

The program adds &lt;kwd&gt; and &lt;/kwd&gt; tags around each of the keywords
that it recognizes. This is a basic example; it works on keywords that are
separate words. It does not address the more complicated structures.

# load java keywords
i = 0
while (getline kwd &lt;"javakeywords2") {
    keywords[i] = kwd
    i++
}

We load Java keywords from a file; each keyword is on a separate line.
The keywords are stored in the keywords array.

# calculate the beginning space
if (match($0, /[^[:space:]]/)) {
    if (RSTART &gt; 1) {
        space = sprintf("%*s", RSTART, "")
    }
}

Using regular expression, we calculate the space at the beginning
of the line if any. The space is a string variable equaling
to the width of the space at the current line. The space is calculated
in order to keep the indentation of the program.

# add the space to the line
ln = ln space

The space is added to the ln variable. In AWK, we use
a space to add strings.

for (i=1; i &lt;= NF; i++) {

field = $i
...
}

We go through the fields of the current line; the field in question
is stored in the field variable.

# go through keywords
for (w_i in keywords) {

    kwd = keywords[w_i]

    # check if a field is a keyword
    if (field == kwd) {
        mtch = 1
    }
}

In a for loop, we go through the Java keywords and check if
a field is a Java keyword.

# add tags to the line
if (mtch == 1) {
    ln = ln  "&lt;kwd&gt;" field  "&lt;/kwd&gt; "
} else {
    ln = ln field " "
}

If there is a keyword, we attach the tags around the keyword; otherwise
we just append the field to the line.

print ln

The constructed line is printed to the console.

$ awk -f markkeywords2.awk program.java
&lt;kwd&gt;package&lt;/kwd&gt; com.zetcode;

&lt;kwd&gt;class&lt;/kwd&gt; Test {

     &lt;kwd&gt;int&lt;/kwd&gt; x = 1;

     &lt;kwd&gt;public&lt;/kwd&gt; &lt;kwd&gt;void&lt;/kwd&gt; exec1() {

         System.out.println(this.x);
         System.out.println(x);
     }

     &lt;kwd&gt;public&lt;/kwd&gt; &lt;kwd&gt;void&lt;/kwd&gt; exec2() {

         &lt;kwd&gt;int&lt;/kwd&gt; z = 5;

         System.out.println(x);
         System.out.println(z);
     }
}

&lt;kwd&gt;public&lt;/kwd&gt; &lt;kwd&gt;class&lt;/kwd&gt; MethodScope {

     &lt;kwd&gt;public&lt;/kwd&gt; &lt;kwd&gt;static&lt;/kwd&gt; &lt;kwd&gt;void&lt;/kwd&gt; main(String[] args) {

         Test ts = &lt;kwd&gt;new&lt;/kwd&gt; Test();
         ts.exec1();
         ts.exec2();
     }
}

A sample run on a small Java program.

This was AWK tutorial.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.