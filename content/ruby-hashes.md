+++
title = "Ruby hashes"
date = 2025-08-29T20:03:10.217+01:00
draft = false
description = "In this part of the Ruby tutorial, we cover hashes. A hash is a collection of key-value pairs."
image = ""
imageBig = ""
categories = ["lang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../arrays/)
[Next](../oop/)

# Ruby hashes

last modified October 18, 2023

In this part of the Ruby tutorial we work with Ruby hashes.

## Ruby hash definition

Ruby *hash* is a collection of key-value pairs. It is similar to an array.
Unlike arrays, hashes can have arbitrary objects as indexes. Arrays have can only
have integers. Hashes enumerate their values in the order that the corresponding
keys were inserted. Hashes are sometimes called associated arrays.

Hashes are powerful collections. They have many methods that programmers
can use to do their work.

## Ruby hash creation

A hash can be created in two basic ways: with the new keyword
or with the hash literal.

create_hash.rb
  

#!/usr/bin/ruby

names = Hash.new
names[1] = "Jane"
names[2] = "Thomas"

puts names

The first script creates a hash and adds two key-value pairs into the
hash object.

names = Hash.new

A hash object is created.

names[1] = "Jane"
names[2] = "Thomas"

We add two pairs of values to the hash. The numbers 1, 2 are the keys
to the hash. The keys are placed inside the square brackets.
The names are the values that belong to the keys.

puts names

The puts method prints the string representation of the
hash to the console. It is also the string literal of the hash.

$ ./create_hash.rb
{1=&gt;"Jane", 2=&gt;"Thomas"}

From the output we can see the literal representation of the names hash.
A hash is bounded by curly brackets. The keys and the values are paired
with the =&gt; characters.

A store method can be used to initialize the hash with
some values. It can be use instead of the square brackets.

create_hash2.rb
  

#!/usr/bin/ruby

names = Hash.new
names.store(1, "Jane")
names.store(2, "Thomas")
names.store(3, "Rebecca")

puts names

We have a similar script. This time we use the store
method. The method associates the given key with the given value
and stores the pair in the hash.

names.store(1, "Jane")

The first parameter of the store method is the key and the
second parameter is the value.

In the third script, we create a hash with the hash literal notation.
The values are bound by the curly brackets. And the key-value pairs
are associated with the =&gt; characters.

create_hash3.rb
  

#!/usr/bin/ruby

domains = { "de" =&gt; "Germany",
            "sk" =&gt; "Slovakia",
            "hu" =&gt; "Hungary",
            "us" =&gt; "United States",
            "no" =&gt; "Norway"
          }

puts domains["de"]
puts domains["sk"]

We create a domains hash with 5 pairs. This time both
keys and values are string types.

domains = { "de" =&gt; "Germany",
            "sk" =&gt; "Slovakia",
            "hu" =&gt; "Hungary",
            "us" =&gt; "United States",
            "no" =&gt; "Norway"
}

This is a hash literal notation. The key-value pairs are put between the curly
brackets. The items are separated by the comma character. And the keys are
associated with values using the =&gt; characters combination.

puts domains["de"]

Here we print the domain value name associated with the "de" key.

$ ./create_hash3.rb
Germany
Slovakia

## Ruby basic work with hashes

In this section, we present some methods for the very basic work with Ruby
hashes.

basic_work.rb
  

#!/usr/bin/ruby

names = Hash.new

names[1] = "Jane"
names[2] = "Thomas"
names[3] = "Robert"
names[4] = "Julia"
names[5] = "Rebecca"

puts "The size of the hash is #{names.size}"

puts names.keys.inspect
puts names.values.inspect

In the above Ruby script, we create a hash with five values.
We introduce three hash methods.

puts "The size of the hash is #{names.size}"

The size method returns the size of the hash.
It is a synonym for the length method.

puts names.keys.inspect
puts names.values.inspect

The keys method returns all keys of the hash. In a similar fashion,
the values method returns all the values of the hash. The returned
data is in the form of an array. To have a more readable output, we also call
the inspect method on the returned arrays.

$ ./basic_work.rb
The size of the hash is 5
[1, 2, 3, 4, 5]
["Jane", "Thomas", "Robert", "Julia", "Rebecca"]

We see the output of the example. Note that the output of the last
two methods are two arrays.

The second example of the section presents three distinct hash methods.

basic_work2.rb
  

#!/usr/bin/ruby

names1 = Hash.new

names1[1] = "Jane"
names1[2] = "Thomas"
names1[3] = "Robert"
names1[4] = "Julia"
names1[5] = "Rebecca"

names2 = names1.dup

puts names1.eql? names2

puts names1.empty?
names1.clear
puts names1.empty?

The Ruby script creates a names hash. It calls three hash
methods on the object.

names2 = names1.dup

We create a duplicate of the hash by calling the dup
method. The method is inherited by the hash from the parent object.

puts names1.eql? names2

The eql? method compares two hash objects. In our case
the hashes are equal and the line prints true.

puts names1.empty?

The empty? method checks whether the hash is empty or not.
The line print false because the names1 hash has five items.

names1.clear
puts names1.empty?

The clear method deletes all items from the hash. The successive
call of the empty? method returns true.

$ ./basic_work2.rb
true
false
true

We have methods that can determine whether a key or a value is present in the
hash.

is_present.rb
  

#!/usr/bin/ruby

domains = { :de =&gt; "Germany", :sk =&gt; "Slovakia",
            :no =&gt; "Norway", :us =&gt; "United States"
          }

puts domains.has_key? :de
puts domains.include? :no
puts domains.key? :me
puts domains.member? :sk

puts domains.has_value? "Slovakia"
puts domains.value? "Germany"

We create a domains hash with four pairs. The keys are symbols. Symbols are
often used as keys, because they are more efficient.

puts domains.has_key? :de
puts domains.include? :no
puts domains.key? :me
puts domains.member? :sk

Here we have four methods that determine whether a key is in the hash.
They all do the same; they are synonyms.

puts domains.has_value? "Slovakia"
puts domains.value? "Germany"

These two methods check if the two strings are inside the hash.

$ ./is_present.rb
true
true
false
true
true
true

In the final example of the section, we read values from the hash.

reading.rb
  

#!/usr/bin/ruby

stones = { 1 =&gt; "garnet", 2 =&gt; "topaz",
           3 =&gt; "opal", 4 =&gt; "amethyst"
         }

puts stones.fetch 1
puts stones[2]
puts stones.values_at 1, 2, 3

The Ruby script presents three hash methods for reading values of
a hash.

puts stones.fetch 1

The fetch method reads a value for a given key.

puts stones[2]

Square brackets can be used to get a value. In our case, the line
prints "topaz" to the console.

puts stones.values_at 1, 2, 3

The values_at method can be used to get multiple values
at one step. The method returns an array of the values for the given
keys.

$ ./reading.rb
garnet
topaz
garnet
topaz
opal

## Ruby hash iteration

There are several methods that can be used to loop through a Ruby hash.

looping.rb
  

#!/usr/bin/ruby

stones = { 1 =&gt; "garnet", 2 =&gt; "topaz",
           3 =&gt; "opal", 4 =&gt; "amethyst"
         }

stones.each { |k, v| puts "Key: #{k}, Value: #{v}" }
stones.each_key { |key| puts "#{key}" }
stones.each_value { |val| puts "#{val}" }
stones.each_pair { |k, v| puts "Key: #{k}, Value: #{v}" }

In the above example, we present four methods. We use them to display all keys,
values and both keys and values of a hash.

stones.each { |k, v| puts "Key: #{k}, Value: #{v}" }

The each method calls the given block for each
key in the hash, passing key-value pair as parameter.

stones.each_key { |key| puts "#{key}" }

We use the each_key method to loop throug all
keys of a hash. They are printed to the console.

stones.each_value { |val| puts "#{val}" }

The each_value can be used to loop throug
the values of a hash.

stones.each_pair { |k, v| puts "Key: #{k}, Value: #{v}" }

The each_pair method is a synonym for the each method. 
We loop through the keys and values of the stones hash.

$ ./looping.rb
Key: 1, Value: garnet
Key: 2, Value: topaz
Key: 3, Value: opal
Key: 4, Value: amethyst
1
2
3
4
garnet
topaz
opal
amethyst
Key: 1, Value: garnet
Key: 2, Value: topaz
Key: 3, Value: opal
Key: 4, Value: amethyst

The output shows the keys and values, keys, values of the stones hash.

## Ruby deleting pairs in hash

In the following examples, we concern ourselves with methods that delete
pairs from the hashes. This includes methods that delete individual pairs as
well as methods that can delete multiple key-values at one step.

delete_items.rb
  

#!/usr/bin/ruby

names = Hash.new

names[1] = "Jane"
names[2] = "Thomas"
names[3] = "Robert"
names[4] = "Julia"
names[5] = "Rebecca"

names.delete 4
names.shift

puts names

In the script we have two methods: delete and shift.
The delete method removes and returns a value for a specified key.
The shift method deletes the first pair from the hash. It also returns
the removed pair as an array.

names.delete 4

Here we delete a pair 4 =&gt; "Julia".

names.shift

This code line removes the first pair, namely 1 =&gt; "Jane".

$ ./delete_items.rb
{2=&gt;"Thomas", 3=&gt;"Robert", 5=&gt;"Rebecca"}

In the output we can see the pairs of the hash that are left.

The reject and the delete_if methods can
remove multiple pairs from a hash. The methods delete pairs that
return true for the given condition in the block. There is an important
distinction between the two methods. The reject method
works on a copy of a hash while the delete_if works on
the original hash.

delete_if.rb
  

#!/usr/bin/ruby

names1 = Hash.new

names1[1] = "Jane"
names1[2] = "Thomas"
names1[3] = "Robert"
names1[4] = "Julia"
names1[5] = "Rebecca"

puts names1.reject { |k, v| v =~ /R.*/ }
puts names1
puts names1.delete_if { |k, v| k &lt;= 3 }
puts names1

The example deletes multiple pairs using the previously mentioned
methods.

puts names1.reject { |k, v| v =~ /R.*/ }

The reject method removes all values that fit the
regular expression in the block. The modified hash is returned and
the original hash is not changed.

puts names1

The output of this line confirms that the original hash was intact.

puts names1.delete_if { |k, v| k &lt;= 3 }

In this case, we delete all pairs, for which the key is lower or
equal to 3. The method modifies the original hash.

$ ./delete_if.rb
{1=&gt;"Jane", 2=&gt;"Thomas", 4=&gt;"Julia"}
{1=&gt;"Jane", 2=&gt;"Thomas", 3=&gt;"Robert", 4=&gt;"Julia", 5=&gt;"Rebecca"}
{4=&gt;"Julia", 5=&gt;"Rebecca"}
{4=&gt;"Julia", 5=&gt;"Rebecca"}

## Ruby adding elements to hashes

Ruby's merge and update methods add (key, value) pairs to hashes.
Ruby has methods for hash addition.

adding.rb
  

#!/usr/bin/ruby

names1 = Hash.new

names1[1] = "Jane"
names1[2] = "Thomas"

names2 = Hash.new

names2[3] = "Robert"
names2[4] = "Julia"

names = names1.merge names2
puts names

names = names1.update names2
puts names

In the Ruby script, we create two hashes. Then we apply
merge and update methods on them.

names = names1.merge names2
puts names

The names1 and names2 hashes are combined.
The result is assigned to the names hash. We print the newly created hash.

$ ./adding.rb
{1=&gt;"Jane", 2=&gt;"Thomas", 3=&gt;"Robert", 4=&gt;"Julia"}
{1=&gt;"Jane", 2=&gt;"Thomas", 3=&gt;"Robert", 4=&gt;"Julia"}

As we can see, the final hashes contain pairs from the names1 and
names2 hashes.

## Ruby merge and merge! methods of hash

In the final section, we recap a common Ruby idiom. Several Ruby methods have
counterparts that end with an exclamation point. This mark, which has no
syntactic significance, indicates that a method modifies the object on which
that method is called.

merging.rb
  

#!/usr/bin/ruby

names1 = Hash.new

names1[1] = "Jane"
names1[2] = "Thomas"

names2 = Hash.new

names2[3] = "Robert"
names2[4] = "Julia"

names = names1.merge names2
puts names
puts names1

names = names1.merge! names2
puts names
puts names1

We demonstrate the difference on the merge
and merge! methods.

names = names1.merge names2

The merge does not modify the names1 hash. It works
on its copy.

names = names1.merge! names2

The merge! method works on the original hash. The names1
hash is changed.

$ ./merging.rb
{1=&gt;"Jane", 2=&gt;"Thomas", 3=&gt;"Robert", 4=&gt;"Julia"}
{1=&gt;"Jane", 2=&gt;"Thomas"}
{1=&gt;"Jane", 2=&gt;"Thomas", 3=&gt;"Robert", 4=&gt;"Julia"}
{1=&gt;"Jane", 2=&gt;"Thomas", 3=&gt;"Robert", 4=&gt;"Julia"}

In this chapter, we worked with Ruby hashes.

[Contents](..)
[Previous](../arrays/)
[Next](../oop/)