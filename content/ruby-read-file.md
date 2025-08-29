+++
title = "Ruby read file"
date = 2025-08-29T20:11:28.498+01:00
draft = false
description = "Ruby read file tutorial shows how to read files in Ruby language. We read text and binary files."
image = ""
imageBig = ""
categories = ["ruby"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Ruby read file

last modified October 18, 2023

In this article we show how to read files in Ruby language. We read text and
binary files. ZetCode has also a concise
[Ruby tutorial](/lang/rubytutorial/).

Ruby has File and IO classes to work with files.

stones.txt
  

Garnet
Topaz
Opal
Amethyst
Ruby
Jasper
Pyrite
Malachite
Quartz

This is the stones.txt file.

## Ruby read file into string

The File.read file reads the whole file into a string. Since this
method reads the whole content into memory, it is only suitable for smaller
files. The File.read ensures the file is closed before returning.

read_into_string.rb
  

#!/usr/bin/ruby

fname = 'stones.txt'

content = File.read(fname)
p content
puts content

The example reads the stones.txt into a string.

$ ./read_into_string.rb
Garnet
Topaz
Opal
Amethyst
Ruby
Jasper
Pyrite
Malachite
Quartz
"Garnet\nTopaz\nOpal\nAmethyst\nRuby\nJasper\nPyrite\nMalachite\nQuartz"

This is the output.

## Ruby read file with File.foreach

The File.foreach opens a file, calls the given block for each
line it reads, and closes the file afterwards. This is an effective and very
simple way of reading a file in Ruby. It can be used for large files.

foreach_fun.rb
  

#!/usr/bin/ruby

fname = 'stones.txt'

File.foreach(fname) { |line| puts line }

In the example, we read the stones.txt file line by line.

## Ruby read file into array with File.readlines

The File.readlines method reads the whole file into an array of
lines. The method automatically closes the file for us. Since the method reads 
the whole file at once, it is suitable for smaller files.

read_lines.rb
  

#!/usr/bin/ruby

fname = 'stones.txt'

lines = File.readlines(fname)
puts lines
p lines

The example reads the contents of the stones.txt file into the
array.

$ ./read_lines.rb
Garnet
Topaz
Opal
Amethyst
Ruby
Jasper
Pyrite
Malachite
Quartz
["Garnet\n", "Topaz\n", "Opal\n", "Amethyst\n", "Ruby\n", "Jasper\n",
    "Pyrite\n", "Malachite\n", "Quartz"]

This is the output.

## Ruby read binary file with File.binread

The File.binread method reads binary files. It closes the file
before returning

read_binary.rb
  

#!/usr/bin/ruby

fname = 'favicon.ico'

data = File.binread(fname)
data2 = data.unpack('H*')[0]

i = 0

data3 = data2.scan /.{1,2}/

data3.each do |e|

    print "#{e} "

    i += 1

    if i % 15 == 0 then
        puts
    end
end

puts

In the example, we read a small image with File.binread. We 
transform the data into hexadecimal values with unpack. Then we 
output the hexadecimal values in fifteen columns of two hexadecimal values.

$ ./read_binary.rb
00 00 01 00 01 00 10 10 00 00 00 00 00 00 68
05 00 00 16 00 00 00 28 00 00 00 10 00 00 00
20 00 00 00 01 00 08 00 00 00 00 00 00 01 00
00 00 00 00 00 00 00 00 00 00 01 00 00 00 00
00 00 00 00 00 00 ff ff ff 00 4d 45 3d 00 00
00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
...

In this article we have showed how to read file in Ruby language.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.