+++
title = "Ruby arrays"
date = 2025-08-29T20:03:07.814+01:00
draft = false
description = "In this part of the Ruby tutorial we cover arrays. Arrays are ordered collections of objects."
image = ""
imageBig = ""
categories = ["lang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../flowcontrol/)
[Next](../hashes/)

# Ruby arrays

last modified October 18, 2023

In this part of the Ruby tutorial, we cover arrays. Arrays are ordered
collections of objects.

## Ruby array definition

A variable can hold only one item at a time. Arrays can hold multiple items.
These items are called elements of the array. Arrays can hold objects of any
data type. Each element can be referred to by an index. Arrays are zero based.
The index of the first element is zero.

Note that Ruby arrays are very different from arrays in languages
like C, C++, or Java.

simple_array.rb
  

#!/usr/bin/ruby

nums = [1, 2, 3, 4, 5]

nums.each do |num|
    puts num
end

Our first example creates an array of five integers. The elements of the
array are printed to the console.

nums = [1, 2, 3, 4, 5]

This line creates an array of five integers. The elements are separated by
commas and placed between square brackets.

nums.each do |num|
    puts num
end

We go through the array with the each method and print each element
to the console.

$ ./simple_array.rb
1
2
3
4
5

## Ruby array creation

An array in Ruby is an object. Arrays can be instantiated with the
new method.

array_new.rb
  

#!/usr/bin/ruby

nums = Array.new

nums.push 1
nums.push 2
nums.push 3
nums.push 4
nums.push 5

puts nums

In the script we first create a nums array. Then
we add five integers to it.

nums = Array.new

An array object is created.

nums.push 1

The push method appends an item to the end
of the array.

We continue with the array object creation using the new
method.

array_new2.rb
  

#!/usr/bin/ruby

a1 = Array.new
a2 = Array.new 3
a3 = Array.new 6, "coin"
a4 = Array.new [11]
a5 = Array.new (15) {|e| e * e}

puts [a1, a2, a3, a4, a5].inspect

The new method of the Array class may take
some options.

a1 = Array.new

An empty array is created. We are supposed to fill it with
data later on.

a2 = Array.new 3

Here we create an array of three nil objects.

a3 = Array.new 6, "coin"

An array containing six "coin" strings is created. The first
option is the size of the array. The second option is the object
to fill the array.

a4 = Array.new [11]

The fourth array will have one item.

a5 = Array.new (15) {|e| e * e}

We create an array with 15 elements. Each element is created
in the block. There we compute a sequence of squared integers.

puts [a1, a2, a3, a4, a5].inspect

We put all our arrays into one array. Arrays may be put into other
arrays. Then we call the inspect method on the array.
This will call the method on all its elements. The
inspect method returns the string representation of
the array. This is useful when we need to quickly check the contents
of an array.

$ ./array_new2.rb
[[], [nil, nil, nil], ["coin", "coin", "coin", "coin", "coin", "coin"],
[11], [0, 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196]]

We can see the contents of all the arrays created.

The following script shows various ways to create arrays in Ruby.

create_array.rb
  

#!/usr/bin/ruby

integers = [1, 2, 3, 4, 5]
animals = %w( donkey dog cat dolphin eagle )
weights = Array.new
weights &lt;&lt; 4.55 &lt;&lt; 3.22 &lt;&lt; 3.55 &lt;&lt; 8.55 &lt;&lt; 3.23

puts integers.inspect
puts animals.inspect
puts weights.inspect

We create three arrays of integers, strings, and decimals.

integers = [1, 2, 3, 4, 5]

This line creates an array having 5 integers.
This is the classic array creation. The elements of the array are put between
square brackets and separated by commas.

animals = %w( donkey dog cat dolphin eagle )

The code line creates a string array with five elements.
In this mode, we save some typing. We do not use the commas
and double quotes.

weights = Array.new
weights &lt;&lt; 4.55 &lt;&lt; 3.22 &lt;&lt; 3.55 &lt;&lt; 8.55 &lt;&lt; 3.23

In the third way, there are two steps. First we create an Array
object, then we initialize it with data. This is a formal array creation.
The above ways were in fact shorthands for this notation.

puts integers.inspect

The inspect method prints the string representation of
the array to the terminal.

$ ./create_array.rb
[1, 2, 3, 4, 5]
["donkey", "dog", "cat", "dolphin", "eagle"]
[4.55, 3.22, 3.55, 8.55, 3.23]

Array items are not limited to numbers and strings. Arrays can contain all Ruby
data types.

array_objects.rb
  

#!/usr/bin/ruby

class Empty

end

nums = [1, 2, 3, 4, 5]

various = [1, -1, "big", 3.4, Empty.new, nums, :two]

puts various.inspect

We put various Ruby objects inside the various array.

various = [1, -1, "big", 3.4, Empty.new, nums, :two]

The array contains numbers, a string, a custom object,
another array and a symbol.

$ ./array_objects.rb
[1, -1, "big", 3.4, #&lt;Empty:0x987f704&gt;, [1, 2, 3, 4, 5], :two]

Running the arrayobjects.rb example, we receive this output.

The last example showed a nested array; an array within another array.
In Ruby, it is possible to nest arrays into arrays.

nested_arrays.rb
  

#!/usr/bin/ruby

numbers = [1, 2, 3, [2, 4, 6, [11, 12]]]

puts numbers.length
puts numbers[0], numbers[1]

puts numbers[3][0]
puts numbers[3][1]

puts numbers[3][3][0]
puts numbers[3][3][1]

puts numbers.flatten!.inspect

The array [11, 12] is nested within the [2, 4, 6, ...] array, which
is also nested in the [1, 2, 3, ...] array.

puts numbers.length

The length method returns 4. The inner array is counted
as one element.

puts numbers[0], numbers[1]

The [] characters serve in this context the purpose of accessing
array elements. The above line returns the first and the second element (numbers
1 and 2) of the numbers array. The numbers within the square brackets are
indexes to the array. The first index is 0, which returns the first element.

puts numbers[3][0]
puts numbers[3][1]

Here we access elements from the nested array. The [3] grabs the
fourth element, which is an array, [2, 4, 6, [11, 12]]. The
[3][0] returns the first element of the inner array, which is number
2 in our case. In a similar fashion, the [3][1] returns the second
element of the inner array, the number 4.

puts numbers[3][3][0]
puts numbers[3][3][1]

Now we go even deeper. We access the elements of the innermost array.
The [3][3] return the [11, 12] array. And from
this array we get the first (11) and the second (12) element.

puts numbers.flatten!.inspect

The flatten! method flattens the array. It takes all elements from
the inner arrays and creates a new one, without any inner arrays.

$ ./nested_arrays.rb
4
1
2
2
4
11
12
[1, 2, 3, 2, 4, 6, 11, 12]

## Ruby printing array contents

A common job is to print array elements to to console.
We have several ways to accomplish this task.

print_array1.rb
  

#!/usr/bin/ruby

integers = [1, 2, 3, 4, 5]

puts integers
puts integers.inspect

integers.each do |e|
    puts e
end

In this script, we print all the elements of an array three times.

puts integers

The array as a parameter to the puts or print method
is the simplest way to print the contents of the array. Each element is printed
on a separate line.

puts integers.inspect

Using the inspect method, the output is more readable. The line
prints the string representation of the array to the terminal.

integers.each do |e|
    puts e
end

The each method calls a block once for each element in array,
passing that element as a parameter. We simply use the puts
method on each element.

$ ./print_array1.rb
1
2
3
4
5
[1, 2, 3, 4, 5]
1
2
3
4
5

The array is printed three times to the console.

In the second example, we provide additional two ways to print array elements.

print_array2.rb
  
 
#!/usr/bin/ruby

integers = [1, 2, 3, 4, 5]

integers.length.times do |idx|
    puts integers[idx]
end

integers.each_with_index do |num, idx|
    puts "value #{num} has index #{idx}"
end

In the first case, we use the combination of the length and
times methods. In the second case, we use the each_with_index
method.

integers.length.times do |idx|
    puts integers[idx]
end

The length method returns the size of the array. The times
method iterates the following block length times, passing in values from 0 to length-1.
These numbers serve as indexes to the array in question.

integers.each_with_index do |num, idx|
    puts "value #{num} has index #{idx}"
end

The each_with_index iterates the array and passes the element
and its index to the given block. This way we can easily print the element
and its index in one shot.

$ ./print_array2.rb
1
2
3
4
5
value 1 has index 0
value 2 has index 1
value 3 has index 2
value 4 has index 3
value 5 has index 4

## Ruby reading array elements

In this section, we read data from the arrays.

retrieval.rb
  

#!/usr/bin/ruby

lts = %w{ a b c d e f g h}

puts lts.first
puts lts.last
puts lts.at(3)

In the first example, we show three simple methods for data
retrieval.

puts lts.first
puts lts.last

The first method reads the first element of the array.
The last method reads the last element of the array.

puts lts.at(3)

The at method returns the array element having a
specific index. This line reads the fourth element of the array.

$ ./retrieval.rb
a
h
d

The [] characters can be used to access data. This is the
traditional way of accessing data in arrays, used by many other programming
languages. It saves some typing.

retrieval2.rb
  

#!/usr/bin/ruby

lts = %w{ a b c d e f g h }

puts lts[0]
puts lts[-1]
puts lts[0, 3].inspect
puts lts[2..6].inspect
puts lts[2...6].inspect

We show five examples of reading data using the [] characters.

puts lts[0]
puts lts[-1]

We get the first and the last item of the array. We put the index
number of an item between the [] characters.
The first item has index 0, the last item has index -1.

puts lts[0, 3].inspect

When we have two numbers between the square brackets, the first is
the start index and the second is the length. In this code line,
we return 3 elements starting from index 0. Note that the inspect
method is optional and it is only used to produce more readable output.

puts lts[2..6].inspect
puts lts[2...6].inspect

We can use range operator inside the square brackets. In the first line
we read elements from index 2 to 6, in the second line elements from
2 to 5.

Next we demonstrate the values_at method. The advantage
of this method is that we can place multiple indexes between the
[] characters to get various elements.

retrieval3.rb
  

#!/usr/bin/ruby

lts = %w{ a b c d e f g h}

puts lts.values_at(1..5).inspect
puts lts.values_at(1, 3, 5).inspect
puts lts.values_at(1, 3, 5, 6, 8).inspect
puts lts.values_at(-1, -3).inspect

The values_at method returns an array containing the
elements which corresponding to the given selector(s). The inspect
method is optional. It is used to get a more readable output.

puts lts.values_at(1..5).inspect

This code line returns elements which have indexes 1 to 5.

puts lts.values_at(1, 3, 5).inspect

Here we read elements with indexes 1, 3 and 5.

puts lts.values_at(1, 3, 5, 6, 8).inspect

We put as many indexes as we want. If there is no
element with the specific index, we get nil.

puts lts.values_at(-1, -3).inspect

Negative indexes return elements from the end of the
array.

$ ./retrieval3.rb
["b", "c", "d", "e", "f"]
["b", "d", "f"]
["b", "d", "f", "g", nil]
["h", "f"]

We use the fetch method to read data
from an array.

retrieval4.rb
  

#!/usr/bin/ruby

lts = [0, 1, 2, 3, 4, 5, 6]

puts lts.fetch(0)
puts lts.fetch(-2)
puts lts.fetch(8, 'undefined')
puts lts.fetch(8) { |e| -2 * e }

We show several forms of using the fetch method.

puts lts.fetch(0)
puts lts.fetch(-2)

The first line prints the first element from the array. The second
line prints the second element from the end of the array.

puts lts.fetch(8, 'undefined')

The third form of the fetch method returns the element
with the given index. If the index lies outside the array elements, the
method returns the default value, 'undefined' in our case. Without the
second parameter, the fetch method throws an
IndexError.

puts lts.fetch(8) { |e| -2 * e }

In the last form of the fetch method, we have a block.
In case a value with a given index is not found, the method returns
a value of invoking the block, passing in the index.

$ ./retrieval4.rb
0
5
undefined
-16

We show the usage of the take and
take_while methods.

retrieval5.rb
  

#!/usr/bin/ruby

lts = %w{ a b c d e f g h}

puts lts.take(4).inspect

lts2 = lts.take_while { |e| e &lt; 'f' }
puts lts2.inspect

The take n method returns the first n
elements of the array. The take_while method passes
elements to the block until the block returns nil or false,
then stops iterating and returns an array of all prior elements.

puts lts.take(4).inspect

Here we return the first four elements of the array.

lts2 = lts.take_while { |e| e &lt; 'f' }
puts lts2.inspect

Here we create a new array from the original array. In the new array
we have all characters that come before the 'f' character.

$ ./retrieval5.rb
["a", "b", "c", "d"]
["a", "b", "c", "d", "e"]

Here we see the output of the retrieval5.rb program.

The slice method is identical to the []
characters. The method returns one or more elements from the array.

retrieval6.rb
  

#!/usr/bin/ruby

lts = %w{ a b c d e f g h}

puts lts.slice(0)
puts lts.slice(-1)
puts lts.slice(0, 3).inspect
puts lts.slice(2..6).inspect
puts lts.slice(2...6).inspect

We present five examples of the slice method.

puts lts.slice(0)
puts lts.slice(-1)

These forms of the slice method return one array
element. The first code line returns the first element, the second
line returns the last element of lts array.

puts lts.slice(0, 3).inspect

The first parameter is the start index and the second parameter is
the length. In this code line, we return 3 elements starting from index 0.

puts lts.slice(2..6).inspect
puts lts.slice(2...6).inspect

We can use range operator with the slice method. In the first line we
read elements from index 2 to 6, in the second line elements from 2 to 5.

$ ./retrieval6.rb
a
h
["a", "b", "c"]
["c", "d", "e", "f", "g"]
["c", "d", "e", "f"]

The slice method returns portions of the array,
one or more elements of the array.

It is possible to select a random value from an array. Ruby has a
sample method for this.

random_values.rb
  

#!/usr/bin/ruby

lts = %w{ a b c d e f g h}

puts lts.sample
puts lts.sample(3).inspect

The sample method comes in two forms.
In the first form, we select a random element. In the
second form, we select n random elements from the array.

$ ./random_values.rb
b
["c", "f", "d"]
$ ./random_values.rb
d
["c", "d", "e"]

Running the example twice gives different results.

## Ruby array operations

In the following examples, we introduce several Ruby array methods.

add_arrays.rb
  

#!/usr/bin/ruby

num1 = [1, 2, 3, 4, 5]
num2 = [6, 7, 8, 9, 10]

puts num1 + num2
puts num1.concat num2

We have two arrays. We add these two arrays.

puts num1 + num2
puts num1.concat num2

There are two ways to add arrays. We can use the + operator
or the concat method. The result is the same.

Ruby has plenty of methods for working with arrays. For example,
the length method returns the number of elements
in the array.

basic_methods.rb
  

#!/usr/bin/ruby

lts = %w{ a b c d e f}

puts lts.inspect
puts "Array has #{lts.length} elements"
puts "The first element is #{lts.first}"
puts "The last element is #{lts.last}"

puts lts.eql? lts.dup
puts lts.eql? lts.dup.delete_at(0)

lts.clear
puts lts.inspect
puts lts.empty?

In the above script, we introduce seven new methods.

puts "Array has #{lts.length} elements"

The length method determines the size of the array.

puts "The first element is #{lts.first}"
puts "The last element is #{lts.last}"

Here we get the first and the last element of the array.

puts lts.eql? lts.dup

The eql? method figures out if two arrays are
equal. In our case the line returns true. The dup
method creates a shallow copy of an object. It is inherited from
the Object parent.

puts lts.eql? lts.dup.delete_at(0)

The delete_at method deletes the first element
of the array. This time the two arrays do not equal.

lts.clear

The clear method deletes all elements from the
array.

puts lts.empty?

The empty? method checks, whether the array is
empty. In our case the code line returns true, because we have
just deleted all its elements.

$ ./basic_methods.rb
["a", "b", "c", "d", "e", "f"]
Array has 6 elements
The first element is a
The last element is f
true
false
[]
true

Some Ruby array methods end with an exclamation mark. This is a Ruby idiom. The
exclamation mark tells the programmer that the method will modify data. The
exclamation mark itself does not have any effect. It is merely a naming
convention.

two_types.rb
  

#!/usr/bin/ruby

chars = %w{a b c d e}

reversed_chars = chars.reverse
puts reversed_chars.inspect
puts chars.inspect

reversed_chars = chars.reverse!
puts reversed_chars.inspect
puts chars.inspect

Ruby has, among others, two similar methods, the reverse method
and reverse! method. These two methods change the order of
the elements, they reverse it. The difference is that the reverse
method returns a reversed array and leaves the original array intact, while
the reverse! method both modifies the contents of the original array.

$ ./two_types.rb
["e", "d", "c", "b", "a"]
["a", "b", "c", "d", "e"]
["e", "d", "c", "b", "a"]
["e", "d", "c", "b", "a"]

We can clearly see that the first two arrays are different. The third
and fourth arrays are same.

A few other methods will be presented in the coming code example.

other_methods.rb
  

#!/usr/bin/ruby

numbers = [1, 2, 2, 2, 3, 4, 5, 8, 11]

puts numbers.index 2
puts numbers.index 11
puts numbers.rindex 2

puts numbers.include? 3
puts numbers.include? 10

puts numbers.join '-'
puts numbers.uniq!.inspect

We introduce additional five methods.

puts numbers.index 2
puts numbers.index 11

The index method returns the index of the
array element. It returns the index of the first element
from the left. The first line returns 1, which is the index
of the first 2 in the array. There is only one 11 in the array
and its index is 8.

puts numbers.rindex 2

The rindex returns the index of the first element
from the right. In our case, the rightmost 2 has index 3.

puts numbers.include? 3
puts numbers.include? 10

The include? method checks if an element is present
in the array. The first line returns true; 3 is present.
The second line returns false; there is no 10 in our array.
By convention, Ruby methods ending with question mark return a boolean value.
Again, the question mark has no effect on the array. It is merely a hint
for the programmer.

puts numbers.join '-'

The join method returns a string created from the
array elements, separated by a provided separator.

puts numbers.uniq!.inspect

The uniq! method removes duplicate elements from
the array. We have three times number 2 in the array. After the
method call, there will be only one 2 left.

$ ./other_methods.rb
1
8
3
true
false
1-2-2-2-3-4-5-8-11
[1, 2, 3, 4, 5, 8, 11]

Notice the product of the join method.
It is a string in which the numbers of the array are joined by
the - character.

## Ruby modifying arrays

In this section, we look closer at the methods that modify an array.
Basically, we do various insertion and deletion operations on the arrays.

insertion.rb
  

#!/usr/bin/ruby

lts = []

lts.insert 0, 'E', 'F', 'G'
lts.push 'H'
lts.push 'I', 'J', 'K'
lts &lt;&lt; 'L' &lt;&lt; 'M'
lts.unshift 'A', 'B', 'C'
lts.insert(3, 'D')

puts lts.inspect

We start with an empty array. We build the array using different
insertion methods.

lts.insert 0, 'E', 'F', 'G'

The insert method inserts three elements into the
lts array. The first letter has index 0, the second 1 and the third 2.

lts.push 'H'
lts.push 'I', 'J', 'K'

The push method appends the elements to the array.
We can append one or more elements.

lts &lt;&lt; 'L' &lt;&lt; 'M'

The &lt;&lt; is a synonym for the push method. It appends
an element to the array. This operator/method can be called in a chain.

lts.unshift 'A', 'B', 'C'

The unshift method prepends elements to the front of the array.

lts.insert(3, 'D')

In this case, the insert method inserts the 'D' character at
a specific index.

$ ./insertion.rb
["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M"]

Using the above mentioned array insertion methods, we have built this
array of uppercase letters.

There are several methods for deleting array elements.

deletion.rb
  

#!/usr/bin/ruby

lts = %w{ a b c d e f g h}

lts.pop
lts.pop

puts lts.inspect

lts.shift
lts.shift

puts lts.inspect

lts.delete_at(0)
lts.delete('d')

puts lts.inspect

puts lts.clear
puts lts.inspect

In this script we demonstrate five methods that
delete elements from an array.

lts = %w{ a b c d e f g h}

We have an array of 8 elements.

lts.pop

The pop method removes the last element from the
array.

lts.shift

The shift method removes the first element from the array.

lts.delete_at(0)

The delete_at deletes an element at a specific
position. We delete the first element of the remaining elements.

puts lts.clear

The clear method clears all the elements from the array.

lts.delete('d')

The delete method deletes a specific item from the array.

$ ./deletion.rb
["a", "b", "c", "d", "e", "f"]
["c", "d", "e", "f"]
["e", "f"]
[]

Here we see the output of the example.

So far we have worked with methods (with an exception of the clear
method) that modified an array by adding or deleting an item a time. Ruby has
methods that affect multiple array items at once.

delete_if.rb
  

#!/usr/bin/ruby

nms = [2, -1, -4, 0, 4, 3, -2, 3, 5]

nms.delete_if { |x| x &lt; 0 }

puts nms.inspect

The example introduces a delete_if method that deletes all items
that meet a condition presented in the block.

nms.delete_if { |x| x &lt; 0 }

This line deletes all negative numbers from the array.

$ ./delete_if.rb
[2, 0, 4, 3, 3, 5]

We have dropped all negative numbers from the nms array.

We present another two methods that process multiple array items.

modify_array.rb
  

#!/usr/bin/ruby

lts = %w{ a b c d e f g}

puts lts.inspect

lts.reject! do |e|
    e =~ /[c-y]/
end

puts lts.inspect

lts.replace(["x", "y", "z"])
puts lts.inspect

We use two methods, the reject! method and the
replace method.

lts.reject! do |e|
    e =~ /[c-y]/
end

The reject! method removes all array items that meet a specific
condition inside the block. In our case, we delete all letters that comply with
the regular expression; any letter from c to y. The =~ operator
matches strings against regular expressions.

lts.replace(["x", "y", "z"])

The replace method will replace items with other given items. It
truncates or expands the array if necessary.

$ ./modify_array.rb
["a", "b", "c", "d", "e", "f", "g"]
["a", "b"]
["x", "y", "z"]

## Ruby set operations

In this section, we present set operations applicable on Ruby arrays. In
mathematics a set is a is a collection of distinct objects.

set_operations.rb
  

#!/usr/bin/ruby

A = [1, 2, 3, 4, 5]
B = [4, 5, 6, 7, 8]

union = A | B
isect = A &amp; B
diff1  = A - B
diff2  = B - A
sdiff = (A - B) | (B - A)

puts "Union of arrays: #{union}"
puts "Intersection of arrays: #{isect}"
puts "Difference of arrays A - B: #{diff1}"
puts "Difference of arrays B - A: #{diff2}"
puts "Symmetric difference of arrays: #{sdiff}"

In the above script, we demonstrate several set operations,
union, intersection, difference and symmetric difference.

nums1 = [1, 2, 3, 4, 5]
nums2 = [4, 5, 6, 7, 8]

We define two arrays of integers. Both are sets, because each element
in the array is presented only once. The two arrays have two numbers in
common, the 4 and 5.

union = nums1 | nums2

This operation is a union of two arrays. The two arrays are added. Each element
in the final array is presented only once.

isect = A &amp; B

The above operations is intersection of two sets. The outcome is an array
having elements which are present in both arrays. In our case, 4 and 5.

diff1  = A - B
diff2  = B - A

Here we have two difference operations, also called complements. In the first line,
we get all elements that are present in A and not present in B. In the second line,
we get all elements which are members of B and not A.

sdiff = (A - B) | (B - A)

Here we have a symmetric difference. A symmetric difference gives elements that
are either in A or in B, but not in both sets.

$ ./set_operations.rb
Union of arrays: [1, 2, 3, 4, 5, 6, 7, 8]
Intersection of arrays: [4, 5]
Difference of arrays A - B: [1, 2, 3]
Difference of arrays B - A: [6, 7, 8]
Symmetric difference of arrays: [1, 2, 3, 6, 7, 8]

## Ruby array select, collect, map methods

In the next example, we present three methods: the select,
collect and map method.

mass.rb
  

#!/usr/bin/ruby

nums = [1, 3, 2, 6, 7, 12, 8, 15]

selected = nums.select do |e|
    e &gt; 10
end

puts selected.inspect

collected = nums.collect do |e|
    e &lt; 10
end

puts collected.inspect

mapped = nums.map do |e|
    e * 2
end

puts mapped.inspect

All these methods execute mass operations on the elements of an array.

selected = nums.select do |e|
    e &gt; 10
end

In the above code, we create a new array using the select
method. For the newly created array, we choose elements that comply with
the condition inside the block. In our case, we select all elements that
are greater than 10.

collected = nums.collect do |e|
    e &lt; 10
end

The collect method works a bit differently. It invokes
the appended block for each element and returns the value from the
block. The new array contains true, false values.

mapped = nums.map do |e|
    e * 2
end

The map method works the same as the collect method.
In the above lines we create a new array from the existing array. Each
element is multiplied by 2.

$ ./mass.rb
[12, 15]
[true, true, true, true, true, false, true, false]
[2, 6, 4, 12, 14, 24, 16, 30]

These are the newly created arrays.

## Ruby array ordering elements

Finally, we be ordering elements in our array.

ordering.rb
  

#!/usr/bin/ruby

planets = %w{ Mercury Venus Earth Mars Jupiter
                Saturn Uranus Neptune Pluto }

puts "#{planets.sort}"
puts "#{planets.reverse}"
puts "#{planets.shuffle}"

The example uses three Ruby array methods to reorganize elements
in the array.

puts "#{planets.sort}"

The sort method alphabetically sorts the array elements.

puts "#{planets.reverse}"

The reverse method returns a new array with all elements
in a reverse order.

puts "#{planets.shuffle}"

The shuffle method randomly reorganizes the array elements.

$ ./ordering.rb
["Earth", "Jupiter", "Mars", "Mercury", "Neptune", "Pluto", "Saturn", ...]
["Pluto", "Neptune", "Uranus", "Saturn", "Jupiter", "Mars", "Earth", ...]
["Earth", "Jupiter", "Mercury", "Saturn", "Mars", "Venus", "Uranus", ...]

This is a sample output of the code example.

In this chapter, we worked with Ruby arrays.

[Contents](..)
[Previous](../flowcontrol/)
[Next](../hashes/)