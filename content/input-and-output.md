+++
title = "Input & output"
date = 2025-08-29T20:03:16.017+01:00
draft = false
description = "This chapter of the Tcl tutorial covers input & output in Tcl. It covers Tcl commands related to input and output, including puts, flush, gets, format, glob, pwd, cd, and eof."
image = ""
imageBig = ""
categories = ["lang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../procedures/)

# Input &amp; output

last modified October 18, 2023

In this chapter, we work with input and output operations in Tcl.
Tcl has several commands for doing io. We cover a few of them. 

Tcl uses objects called channels to read and write data. The channels
can be created using the open or socket command.
There are three standard channels available to Tcl scripts
without explicitly creating them. They are automatically opened
by the OS for each new application. They are stdin,
stdout and stderr. The standard input, 
stdin, is used by the scripts to read data. The standard
output, stdout, is used by scripts to write data. The
standard error, stderr, is used by scripts to write error
messages. 

In the first example, we work with the puts
command. It has the following synopsis:

puts ?-nonewline? ?channelId? string

The channelId is the channel where we want to write text. The
channelId is optional. If not specified, the default stdout is
assumed.

#!/usr/bin/tclsh

puts "Message 1"
puts stdout "Message 2"
puts stderr "Message 3"

The puts command writes text to the channel. 

puts "Message 1"

If we do not specify the channelId, we write to stdout by default.

puts stdout "Message 2"

This line does the same thing as the previous one. We only have
explicitly specified the channelId. 

puts stderr "Message 3"

We write to the standard error channel. The error messages
go to the terminal by default. 

$ ./printing.tcl 
Message 1
Message 2
Message 3

Example output. 

## The read command

The read command is used to read data from a channel. 
The optional argument specifies the number of characters to read.
If omitted, the command reads all of the data from the channel up 
to the end.

#!/usr/bin/tclsh

set c [read stdin 1]

while {$c != "q"} {

    puts -nonewline "$c"
    set c [read stdin 1]
}

The script reads a character from the standard input channel and
then writes it to the standard output until it encounters the 
q character. 

set c [read stdin 1]

We read one character from the standard input channel (stdin). 

while {$c != "q"} {

We continue reading characters until the q is pressed.

## The gets command

The gets command reads the next line from the channel, returns everything in the 
line up to (but not including) the end-of-line character.

#!/usr/bin/tclsh

puts -nonewline "Enter your name: "
flush stdout
set name [gets stdin]

puts "Hello $name"

The script asks for input from the user and then
prints a message.

puts -nonewline "Enter your name: "

The puts command is used to print messages to the
terminal. The -nonewline option supresses the new line
character.

flush stdout

Tcl buffers output internally, so characters written with puts
may not appear immediately on the output file or device. 
The flush command forces the output to appear immediately.

set name [gets stdin]

The gets command reads a line from a channel. 

$ ./hello.tcl
Enter your name: Jan
Hello Jan

Sample output of the script. 

## The pwd and cd commands

Tcl has pwd and cd commands, similar to 
shell commands. The pwd command returns the current working
directory and the cd command is used to change the working
directory. 

#!/usr/bin/tclsh

set dir [pwd]

puts $dir

cd ..

set dir [pwd]
puts $dir

In this script, we print the current working directory.
Then we change the working directory and print the working directory
again. 

set dir [pwd]

The pwd command returns the current working directory.

cd ..

We change the working directory to the parent of the current directory.
We use the cd command. 

$ ./cwd.tcl 
/home/janbodnar/prog/tcl/io
/home/janbodnar/prog/tcl

Sample output. 

## The glob command

Tcl has a glob command which returns the
names of the files that match a pattern.

#!/usr/bin/tclsh

set files [glob *.tcl]

foreach file $files {

    puts $file
}

The script prints all files with the .tcl extension to the
console. 

set files [glob *.tcl]

The glob command returns a list of files
that match the *.tcl pattern. 

foreach file $files {

    puts $file
}

We go through the list of files and print each item of the list
to the console.

$ ./globcmd.tcl 
attributes.tcl
allfiles.tcl
printing.tcl
hello.tcl
read.tcl
files.tcl
globcmd.tcl
write2file.tcl
cwd.tcl
readfile.tcl
isfile.tcl
addnumbers.tcl

This is a sample output of the globcmd.tcl script.

## Working with files

The file command manipulates file names and attributes.
It has plenty of options.

#!/usr/bin/tclsh

puts [file volumes]
[file mkdir new]

The script prints the system's mounted volues and creates a new
directory. 

puts [file volumes]

The file volumes command returns the absolute paths to the 
volumes mounted on the system. 

[file mkdir new]

The file mkdir creates a directory called new.

$ ./voldir.tcl 
/
$ ls -d */
doc/  new/  tmp/

On a Linux system, there is one mounted volume—the root directory.
The ls command confirms the creation of the new directory.

In the following code example, we are going to check if
a file name is a regular file or a directory. 

#!/usr/bin/tclsh

set files [glob *]

foreach fl $files {

    if {[file isfile $fl]} {
        
        puts "$fl is a file"
    } elseif { [file isdirectory $fl]} {
        
        puts "$fl is a directory"
    }
}

We go through all file names in the current working directory
and print whether it is a file or a directory. 

set files [glob *]

Using the glob command we create a list of 
file and directory names of a current directory. 

if {[file isfile $fl]} {

We execute the body of the if command if the file name in question 
is a file.

} elseif { [file isdirectory $fl]} {

The file isdirectory command determines,
whether a file name is a directory. Note that on Unix,
a directory is a special case of a file. 

The puts command can be used to write to 
files.

#!/usr/bin/tclsh

set fp [open days w]

set days {Monday Tuesday Wednesday Thursday Friday Saturday Sunday}

puts $fp $days
close $fp

In the script, we open a file for writing. We write days of a week to
a file.

set fp [open days w]

We open a file named days for writing. The open
command returns a channel id. 

set days {Monday Tuesday Wednesday Thursday Friday Saturday Sunday}

This data is going to be written to the file. 

puts $fp $days

We used the channel id returned by the open command to
write to the file. 

close $fp

We close the opened channel. 

$ ./write2file.tcl
$ cat days 
Monday Tuesday Wednesday Thursday Friday Saturday Sunday

We run the script and check the contents of the days file. 

In the following script, we are going to read data
from a file. 

$ cat languages 
Python
Tcl
Visual Basic
Perl
Java
C
C#
Ruby
Scheme

We have a simple file called languages in a directory. 

#!/usr/bin/tclsh

set fp [open languages r]
set data [read $fp]

puts -nonewline $data

close $fp

We read data from the supplied file, read its contents
and print the data to the terminal.

set fp [open languages r]

We create a channel by opening the languages 
file in a read-only mode.

set data [read $fp]

If we do not provide a second parameter to the read
command, it reads all data from the file until the end of the file. 

puts -nonewline $data

We print the data to the console. 

$ ./readfile.tcl 
Python
Tcl
Visual Basic
Perl
Java
C
C#
Ruby
Scheme

Sample run of the readfile.tcl script. 

The eof command checks for end-of-line of
a supplied channel. 

#!/usr/bin/tclsh

set fp [open languages]

while {![eof $fp]} {
    puts [gets $fp]
}

close $fp

We use the eof command to read the contents of
a file.

while {![eof $fp]} {
    puts [gets $fp]
}

The loop continues until the eof returns true if
it encounters the end of a file. Inside the body, we use the
gets command to read a line from the file.

$ ./readfile2.tcl 
Python
Tcl
Visual Basic
Perl
Java
C
C#
Ruby
Scheme

Sample run of the readfile2.tcl script. 

The next script performs some additional file operations. 

#!/usr/bin/tclsh

set fp [open newfile w]

puts $fp "this is new file"
flush $fp

file copy newfile newfile2
file delete newfile

close $fp

We open a file and write some text to it. The file is copied. The
original file is then deleted. 

file copy newfile newfile2

The file copy command copies a file. 

file delete newfile

The original file is deleted with the file delete command.

In the final example, we work with file attributes.

#!/usr/bin/tclsh

set files [glob *]

set mx 0

foreach fl $files {
    
    set len [string length $fl]

    if { $len &gt; $mx} {
        
        set mx $len
    }
}

set fstr "%-$mx\s %-s"
puts [format $fstr Name Size]

set fstr "%-$mx\s %d bytes"
foreach fl $files {

    set size [file size $fl]

    puts [format $fstr $fl $size]

}

The script creates two columns. In the first column, we have
the name of the file. In the second column, we display 
the size of the file. 

foreach fl $files {
    
    set len [string length $fl]

    if { $len &gt; $mx} {
        
        set mx $len
    }
}

In this loop, we find out the most lengthy file name. 
This will be used when formatting the output columns. 

set fstr "%-$mx\s %-s"
puts [format $fstr Name Size]

Here we print the headers of the columns. 
To format the data, we use the format command. 

set fstr "%-$mx\s %d bytes"
foreach fl $files {

    set size [file size $fl]

    puts [format $fstr $fl $size]

}

We go through the list of files and print each file name and its
size. The file size command determines the size of
the file. 

$ ./attributes.tcl 
Name           Size
attributes.tcl 337 bytes
newfile2       17 bytes
allfiles.tcl   75 bytes
printing.tcl   83 bytes
languages      51 bytes
hello.tcl      109 bytes
days           57 bytes
read.tcl       113 bytes
files.tcl      140 bytes
globcmd.tcl    82 bytes
write2file.tcl 134 bytes
doc            4096 bytes
cwd.tcl        76 bytes
tmp            4096 bytes
readfile.tcl   98 bytes
isfile.tcl     219 bytes

Sample run. 

In this chapter, we have covered Input/Output operations in Tcl. 

[Contents](..)  
[Previous](../procedures/)