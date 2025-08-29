+++
title = "Basic Linux commands"
date = 2025-08-29T20:03:22.810+01:00
draft = false
description = "Basic Linux commands tutorial is an introduction to basic Linux commands on the shell. The tutorial presents a variety of basic Linux commands."
image = ""
imageBig = ""
categories = ["linux"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Basic Linux commands

last modified October 18, 2023

This article is an introduction to basic Linux commands on the shell. The
tutorial presents a variety of basic Linux commands.

At the beginning, we assume an empty directory.

## pwd command

We start in our home directory. The pwd command prints the current
working directory of the user.

$ pwd
/home/jano/Documents/prog/linux/basic-commands

## clear command

The clear command clears the terminal screen. Instead of this
command, we can use the Ctrl + L shortcut.

$ clear

## whoami command

The whoami command prints the user name. This command is useful
when administrators are logged into multiple boxes.

$ whoami
jano

## hostname command

The hostname gives the name of the host. The hostname is the name
of the machine on then network.

$ hostname
andromeda

## date command

The date command prints the current local date.

$ date
So&nbsp; 7.&nbsp;január&nbsp;2023,&nbsp;12:46:30&nbsp;CET

The command prints the current local datetime.

$ date -u
So&nbsp; 7.&nbsp;január&nbsp;2023,&nbsp;11:48:20&nbsp;UTC

This command prints the current datetime in UTC.

$ date +%Y
2023
$ date +%F
2023-01-07

We print the date in the specified format.

$ date +%s
1673092327

This is the Unix time--the number of seconds that have elapsed since 00:00:00
UTC on 1 January 1970.

## uptime command

$ uptime
04:39:18 up 45 min,  1 user,  load average: 0.00, 0.01, 0.00

The uptime command tells how long the system is up.

## man command

The man command gives us the manual for the command. There we can
find all the options for the command.

$ man date

## cal command

The cal command gives us the calendar.

$ cal
    Január 2023
Ne Po Ut St Št Pi So
 1  2  3  4  5  6  7
 8  9 10 11 12 13 14
15 16 17 18 19 20 21
22 23 24 25 26 27 28
29 30 31

```
$ cal -3
    December 2022          Január 2023           Február 2023
Ne Po Ut St Št Pi So  Ne Po Ut St Št Pi So  Ne Po Ut St Št Pi So
          1  2  3   1  2  3  4  5  6  7            1  2  3  4
4  5  6  7  8  9 10   8  9 10 11 12 13 14   5  6  7  8  9 10 11
11 12 13 14 15 16 17  15 16 17 18 19 20 21  12 13 14 15 16 17 18
18 19 20 21 22 23 24  22 23 24 25 26 27 28  19 20 21 22 23 24 25
25 26 27 28 29 30 31  29 30 31              26 27 28

```

With the -3 option, we get three months: the current, previous, and
next.

## arch command

The arch command gives the machine architecture.

$ arch
x86_64

```
$ arch --help
Usage: arch [OPTION]...
Print machine architecture.

        --help     display this help and exit
        --version  output version information and exit
...

```

Most commands have the --help option which gives a short help
information about a command.

## uname command

The uname command gives system information. The -a
option lists all information.

$ uname
Linux
$ uname -a
Linux andromeda 5.15.0-56-generic #62-Ubuntu SMP Tue Nov 22 19:54:14 UTC 2022 x86_64 x86_64 x86_64 GNU/Linux

## who command

The who command lists users who are currently logged in.

$ who
jano     tty7         2023-01-07 10:04 (:0)

We have one logged user.

## w command

$ w
12:56:24 up  2:55,  1 user,  load average: 0,54, 0,50, 0,46
USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
jano     tty7     :0               10:04    2:55m  4:41   0.18s xfce4-session

The w command shows who is logeed in and what the users are doing.

## echo command

The echo command prints a line of text to the terminal.

$ echo an old falcon
an old falcon

We print a small message.

$ echo "an old falcon" | sed 's/falcon/wolf/'
an old wolf

The sed command is used to transform text. We change the falcon
word to wolf in the text string.

$ echo $LANG $PWD
en_US.UTF-8 /home/jano/Documents/prog/linux/basic-commands
$ echo $SHELL $RANDOM $HOSTNAME
/bin/bash 15604 andromeda

Here we print a couple of environment variables.

## printf command

With the printf command, we can output formatted strings.

$ printf "%s is %d years old\n" Jane 17
Jane is 17 years old

We build a message with printf.

## ping command

The ping command is used to check the network connectivity.

$ ping webcode.me
PING webcode.me (46.101.248.126) 56(84) bytes of data.
64 bytes from 46.101.248.126 (46.101.248.126): icmp_seq=1 ttl=54 time=29.2 ms
64 bytes from 46.101.248.126 (46.101.248.126): icmp_seq=2 ttl=54 time=27.9 ms
...

The ping continuously sends requests until we terminate it with
Ctrl + C.

$ ping -c 4 webcode.me
PING webcode.me (46.101.248.126) 56(84) bytes of data.
64 bytes from 46.101.248.126 (46.101.248.126): icmp_seq=1 ttl=54 time=32.1 ms
64 bytes from 46.101.248.126 (46.101.248.126): icmp_seq=2 ttl=54 time=34.6 ms
64 bytes from 46.101.248.126 (46.101.248.126): icmp_seq=3 ttl=54 time=33.4 ms
64 bytes from 46.101.248.126 (46.101.248.126): icmp_seq=4 ttl=54 time=37.9 ms

--- webcode.me ping statistics ---
4 packets transmitted, 4 received, 0% packet loss, time 3004ms
rtt min/avg/max/mdev = 32.100/34.497/37.876/2.145 ms

With the -c option, we specify the amout of requests sent. 

## df command

The df command reports the file system disk space usage.

$ df -h
Filesystem      Size  Used Avail Use% Mounted on
tmpfs           1,6G  3,5M  1,6G   1% /run
/dev/nvme0n1p2  468G  194G  251G  44% /
tmpfs           7,8G   14M  7,7G   1% /dev/shm
tmpfs           5,0M  4,0K  5,0M   1% /run/lock
tmpfs           7,8G     0  7,8G   0% /run/qemu
/dev/nvme0n1p1  511M  5,3M  506M   2% /boot/efi
tmpfs           1,6G  140K  1,6G   1% /run/user/1000

The -h option shows the size in human-readable format, that is in
in powers of 1024.

## type command

There are two kinds of commands: shell builtins and external commands. The
type command can be used to gives the command type.

$ type echo who
echo is a shell builtin
who is hashed (/usr/bin/who)

We check echo and who commands.

## history command

The history gives the history of the user commands typed.

$ history
...
2017  man date
2018  date %F
2019  man date
2020  date -u
2021  man date
2022  date +%Y
2023  date +%F
2024  date +%s
2025  cal
2026  cal -3
2027  uname -a
2028  who
2029  w
2030  ping webcode.me
2031  df -h
2032  ping
2033  man ping
2034  ping -c 4 webcode.me
2035  man ping
2036  history
...

We show a partial list of executed commands.

## curl command

The curl command can be used to generate HTTP requests.

$ curl webcode.me
&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;My html page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

    &lt;p&gt;
        Today is a beautiful day. We go swimming and fishing.
    &lt;/p&gt;

    &lt;p&gt;
         Hello there. How are you?
    &lt;/p&gt;

&lt;/body&gt;
&lt;/html&gt;

We generate a GET request to a web page; we get a HTML document printed to the
console.

$  curl -I webcode.me
HTTP/1.1 200 OK
Server: nginx/1.6.2
Date: Sat, 07 Jan 2023 12:05:49 GMT
Content-Type: text/html
Content-Length: 394
Last-Modified: Sun, 23 Jan 2022 10:39:25 GMT
Connection: keep-alive
ETag: "61ed305d-18a"
Accept-Ranges: bytes

With the -I option, we generate a HEAD request, which returns the
header of the document containing some metadata.

## wget command

The wget is a non-interactive network retriever.

$ wget -q webcode.me/words.txt
$ wget -q webcode.me/thermopylae.txt

With the wget command, we dowload two small text files. The
-q (quiet) option supresses the output of the command.

$ ls
thermopylae.txt  words.txt

## ls command

The ls command lists the contents of the current directory; we have
two files.

$ ls -l
total 8
-rw-rw-r-- 1 jano jano 226 júl 26  2021 thermopylae.txt
-rw-rw-r-- 1 jano jano 140 júl 26  2021 words.txt

With the -l we get a long listing format. We get additional
information including file permissions, ownership, size, and date of last
modification.

## wc command

The wc command counts the number of lines, words, and bytes in the
file.

$ wc thermopylae.txt
4  38 226 thermopylae.txt

The thermopylae.txt file has 4 lines, 38 words, and 226 bytes.

$ wc -l thermopylae.txt
4 thermopylae.txt
$ wc -w thermopylae.txt
38 thermopylae.txt
$ wc -c thermopylae.txt
226 thermopylae.txt

We can get the information separately with the corresponding options.

## cat command

The cat command concatenates files and prints them on the console.
The command is often used to display the contents of small files.

$ cat thermopylae.txt
The Battle of Thermopylae was fought between an alliance of Greek city-states,
led by King Leonidas of Sparta, and the Persian Empire of Xerxes I over the
course of three days, during the second Persian invasion of Greece.

We show the contents of the thermopylae.txt file.

## cp command

The cp command is used to copy files and directories.

$ cp thermopylae.txt thermopylae2.txt

With the cp command, we create a copy of the thermopylae.txt file.
The new file is called thermopylae2.txt.

$ echo "The battle took place simultaneously with the naval battle at Artemisium." &gt;&gt; thermopylae2.txt

With the echo command and the &gt;&gt; operator, we append a new
line to the thermopylae2.txt file.

$ cat thermopylae2.txt
The Battle of Thermopylae was fought between an alliance of Greek city-states,
led by King Leonidas of Sparta, and the Persian Empire of Xerxes I over the
course of three days, during the second Persian invasion of Greece.

The battle took place simultaneously with the naval battle at Artemisium.

We check the contents of the file with cat; it contains the new
line.

## diff command

The diff command compares the two text files line by line.

$ diff thermopylae.txt thermopylae2.txt
4a5
&gt; The battle took place simultaneously with the naval battle at Artemisium.

The output tells that the 5th line from the second file must be appended to
the 4th line to make the files identical. Lines preceded by a &lt; are
lines from the first file. Lines preceded by &gt; are lines from the second
file. The special characters are a (add), d (delete), and c (change).

## head command

The head command prints the first n lines (defaults to ten) of each
file to standard output.

$ head words.txt
sky
blue
falcon
rock
wood
forest
book
small
tension
war

The head command prints the first ten lines of a file.

$ head -n 3 words.txt 
sky
blue
falcon

With the -n option, we can specify the number of lines to display.

$ head -n 3 words.txt thermopylae.txt 
==&gt; words.txt &lt;==
sky
blue
falcon

==&gt; thermopylae.txt &lt;==
The Battle of Thermopylae was fought between an alliance of Greek city-states, 
led by King Leonidas of Sparta, and the Persian Empire of Xerxes I over the 
course of three days, during the second Persian invasion of Greece.

We can specify multiple files.

## tail command

The tail command prints the last n lines (defaults to ten) of each
file to standard output.

$ tail words.txt
pen
purple
bow
rock
falcon
owl
bear
wolf
fox
storm

The tail command prints the last ten lines.

$ head -4 words.txt
sky
blue
falcon
rock
$ tail -3 words.txt
wolf
fox
storm

We can specify how many first/last lines to output.

## mkdir command

The mkdir command creates a new directory.

$ mkdir docs

We create a new directory called docs.

$ ls -F
docs/  thermopylae2.txt  thermopylae.txt  words.txt

The -F option appends indicators to the files; the /
tells that docs is a directory.

## mv command

The mv command moves or renames files and directories.

$ mv thermopylae2.txt docs/

The mv command moves the given file to the directory.

**Note: **
Some commands may not installed on our machine by default. For instance on
Debian Linux, we need to install the tree command explicitly
via the apt command.

$ ls docs/
thermopylae2.txt

We list the contents of the docs directory; it contains one file.

Some commands may not installed on our machine by default. For instance on
Debian Linux, we need to install the tree command explicitly
via the apt command.

## apt command

The apt provides a high-level commandline interface for the package
management system. 

$ sudo apt install tree

The apt is a Debian-specific package manager. Here we also assume
that the sudo command is installed on the system and the user can
run sudo command.

## tree command

The tree command lists the contents of the current directory in
a tree-like format.

$ tree
.
├── docs
│&nbsp;&nbsp; └── thermopylae2.txt
├── thermopylae.txt
└── words.txt

1 directory, 3 files

We can see the files and directories that we have created so far.

## touch command

The touch command updates the access and modification times of each
file to the current time. It the file does not exist, it is created.

$ touch vals.txt
$ ls -s vals.txt
0 vals.txt

With touch, we create an empty file called vals.txt. The 
ls-s command prints the size of the file. We can see that it is
empty.

$ echo -e "8\n9\n11\n12\n7\n6\n3\n2\n4\n1\n5" &gt;&gt; vals.txt
$ cat vals.txt
8
9
11
12
7
6
3
2
4
1
5

We insert 11 numbers into the vals.txt file with echo.
The -e option of echo evaluates backslash escapes.

$ ls -l vals.txt 
-rw-rw-r-- 1 jano jano 24 jan  7 13:24 vals.txt

Now the file has 24 bytes.

$ cat -E vals.txt
8$
9$
11$
12$
7$
6$
3$
2$
4$
1$
5$

There are 13 characters in the file and 11 newline characters; 13 and 11 is 24.
The -E option of cat prints the $ at newline
characters.

$ ls -l vals.txt | awk '{print $5}'
24

We can use the awk command to print only the size information; we
output the fifth column of the row.

## sort command

The sort command sorts lines of text files.

$ sort words.txt | head
bear
blue
book
bow
cloud
cup
falcon
falcon
forest
fox

The sort command sorts the lines of text files. In our example, we sort the
words and print the first ten lines.

$ sort -r words.txt | head
wood
wolf
water
warm
war
tension
storm
snow
small
sky

With the -r option, we sort in reverse order.

$ sort -n vals.txt
1
2
3
4
5
6
7
8
9
11
12

With the -n option, we sort the values numerically.

$ awk '{ print $0, "has", length($0), "chars"}' words.txt
sky has 3 chars
blue has 4 chars
falcon has 6 chars
rock has 4 chars
wood has 4 chars
forest has 6 chars
book has 4 chars
small has 5 chars
tension has 7 chars
war has 3 chars
water has 5 chars
warm has 4 chars
cup has 3 chars
...

The awk is a very complex command. Here we print the length of each
of the words in the words.txt file. The $0 is the
entire input record, one line from the file. The length function
gives the size of the given record.

$ ls
docs  thermopylae.txt  vals.txt  words.txt

At this moment, we have these files.

## rm command

The rm command removes files or directories.

$ rm *.txt

We remove all text files with the rm command.

$ rm docs/thermopylae2.txt
$ rmdir docs/

We remove a directory with rmdir command. The directory must be
empty before being deleted. We can also use the rm -rf command
to delete a directory in one go. Note that this command is dangerous and should
be used cautiosly.

$ ls

The directory is empty.

In this article we have presented basic Linux shell commands.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Linux tutorials](/all/#linux).