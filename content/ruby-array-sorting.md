+++
title = "Ruby Array Sorting"
date = 2025-08-29T20:11:31.885+01:00
draft = false
description = "Complete guide to sorting arrays in Ruby covering basic to advanced techniques"
image = ""
imageBig = ""
categories = ["ruby"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Ruby Array Sorting

last modified April 2, 2025

Ruby provides powerful methods for sorting arrays with simple syntax. This guide
explores basic to advanced sorting techniques, custom comparisons, and
performance considerations. Learn to sort numbers, strings, objects, and
complex data structures efficiently. Mastering array sorting is essential for
effective Ruby programming.

## Basic Array Sorting

Ruby's sort method is the simplest way to sort arrays. It works
naturally with numbers and strings, returning a new sorted array. The original
array remains unchanged unless you use sort!. This example shows
basic sorting of numeric and string arrays. Understanding these fundamentals is
key to more advanced sorting techniques.

basic_sorting.rb
numbers = [3, 1, 4, 1, 5, 9, 2, 6]
strings = ["apple", "banana", "cherry", "date"]

sorted_numbers = numbers.sort
sorted_strings = strings.sort

puts "Original numbers: #{numbers}"
puts "Sorted numbers: #{sorted_numbers}"

puts "\nOriginal strings: #{strings}"
puts "Sorted strings: #{sorted_strings}"

# In-place sorting
numbers.sort!
puts "\nAfter sort!: #{numbers}"

# Additional example: Mixed case strings
mixed_case = ["Apple", "banana", "Cherry"]
puts "\nMixed case sort: #{mixed_case.sort}"

The sort method arranges numbers in ascending order and strings
alphabetically. Notice that uppercase letters sort before lowercase in Ruby's
default string comparison. The original array remains intact unless you use the
bang version sort! which modifies it directly. 

For numeric arrays, sorting is straightforward with elements ordered from
smallest to largest. String sorting follows ASCII/Unicode order, which affects
mixed-case comparisons. The example shows that "Apple" comes before "banana"
because uppercase 'A' has a lower ASCII value than lowercase 'b'.

## Reverse Sorting

Ruby provides two ways to sort arrays in descending order: using
sort.reverse or the sort_by method with negation.
This example demonstrates both approaches for numbers and strings. Reverse
sorting is common in real-world applications like displaying top scores.
Understanding these techniques expands your sorting toolkit.

reverse_sorting.rb
numbers = [5, 2, 8, 3, 1]
words = ["zebra", "apple", "monkey", "banana"]

# Method 1: sort then reverse
desc_numbers = numbers.sort.reverse
desc_words = words.sort.reverse

# Method 2: sort_by with negation
desc_numbers2 = numbers.sort_by { |n| -n }
desc_words2 = words.sort_by { |w| -w.downcase.ord }

puts "Descending numbers (method 1): #{desc_numbers}"
puts "Descending numbers (method 2): #{desc_numbers2}"

puts "\nDescending words (method 1): #{desc_words}"
puts "Descending words (method 2): #{desc_words2}"

# Additional example: Sorting dates in reverse
dates = [2023, 2021, 2025, 2020]
puts "\nDescending years: #{dates.sort.reverse}"

The first method chains sort with reverse, which is
clear but creates an intermediate array. The second uses sort_by
with a negated value, more efficient for large arrays. For strings, method 2
requires careful handling of case sensitivity. 

Reverse sorting dates or years follows the same pattern as numbers. The example
shows that 2025 comes before 2021 in descending order. Choose the method that
best fits your specific use case and performance requirements.

## Custom Sorting with Blocks

Ruby allows custom sorting logic using blocks with sort and
sort_by. This enables sorting by any criteria, including complex
object attributes. The block should return -1, 0, or 1 for comparison. This
example demonstrates sorting by string length and custom numeric conditions.
Custom sorting is powerful for specialized ordering needs.

custom_sorting.rb
fruits = ["apple", "banana", "cherry", "date", "elderberry"]

# Sort by string length
length_sorted = fruits.sort_by { |fruit| fruit.length }
puts "Sorted by length: #{length_sorted}"

# Custom numeric sort
numbers = [42, 17, 99, 23, 56]
custom_sorted = numbers.sort do |a, b|
  if a.even? &amp;&amp; b.odd?
    -1
  elsif a.odd? &amp;&amp; b.even?
    1
  else
    a &lt;=&gt; b
  end
end

puts "\nEven numbers first: #{custom_sorted}"

# Additional example: Sort by last character
last_char_sorted = fruits.sort_by { |fruit| fruit[-1] }
puts "\nSorted by last character: #{last_char_sorted}"

The sort_by method is often cleaner for simple transformations like
string length, using a single value for comparison. The full sort
block provides complete control when you need complex conditional logic, as shown
in the even/odd number example. 

Ruby's spaceship operator (&lt;=&gt;) returns -1, 0, or 1 based on the
comparison, which is useful in custom sorts. The example demonstrates sorting
fruits by their last character, showing the flexibility of Ruby's sorting
methods. These techniques work with any objects that can be compared.

## Sorting Hashes and Complex Objects

Sorting collections of hashes or objects requires specifying which attributes to
compare. Ruby's sort_by shines here by extracting comparison keys.
This example shows sorting an array of hashes by multiple fields. Similar
techniques apply to custom objects with attribute accessors. Mastering this
enables sorting real-world data structures.

hash_sorting.rb
people = [
  { name: "Alice", age: 30, city: "New York" },
  { name: "Bob", age: 25, city: "Chicago" },
  { name: "Charlie", age: 25, city: "Boston" }
]

# Sort by single field
age_sorted = people.sort_by { |person| person[:age] }
puts "Sorted by age:"
age_sorted.each { |p| puts "#{p[:name]} (#{p[:age]})" }

# Sort by multiple fields
multi_sorted = people.sort_by { |person| [person[:age], person[:city]] }
puts "\nSorted by age then city:"
multi_sorted.each { |p| puts "#{p[:name]}, #{p[:age]}, #{p[:city]}" }

# Additional example: Case-insensitive name sort
name_sorted = people.sort_by { |person| person[:name].downcase }
puts "\nSorted by name (case-insensitive):"
name_sorted.each { |p| puts p[:name] }

Sorting hashes by a single key is straightforward with sort_by,
extracting the relevant value. For multi-field sorting, return an array of values
in priority order - Ruby compares arrays element by element. The example shows
25-year-olds sorted by city after age. 

Case-insensitive sorting requires normalizing strings with
downcase. This technique works for any string-based comparison
where case shouldn't matter. The same principles apply when sorting arrays of
objects using their accessor methods instead of hash keys.

## Case-Insensitive String Sorting

Ruby's default string sorting is case-sensitive, which often isn't what users
expect. This example demonstrates proper case-insensitive sorting techniques.
We'll compare naive approaches with robust solutions. Proper string sorting is
essential for user-facing applications. These methods ensure consistent ordering
regardless of case.

case_insensitive.rb
words = ["Apple", "banana", "apple", "Banana", "cherry"]

# Problematic approach (still case-sensitive)
naive_sort = words.sort
puts "Naive sort: #{naive_sort}"

# Correct case-insensitive sort
proper_sort = words.sort_by { |w| w.downcase }
puts "\nCase-insensitive sort: #{proper_sort}"

# Alternative with sort block
proper_sort2 = words.sort { |a, b| a.casecmp(b) }
puts "\nUsing casecmp: #{proper_sort2}"

# Additional example: Mixed strings with numbers
mixed = ["file1", "File10", "file2", "File3"]
puts "\nNatural sort: #{mixed.sort_by { |s| s.downcase }}"

The naive approach fails because uppercase letters have lower ASCII values than
lowercase letters. The sort_by solution normalizes case before
comparison, while casecmp provides built-in case-insensitive
comparison. Both methods properly interleave "Apple" and "apple". 

For mixed strings with numbers (like "File2" vs "File10"), simple case
insensitivity isn't enough - natural sorting algorithms are needed. The example
shows this limitation, where "File10" appears before "File3" alphabetically.
More advanced techniques are required for true natural sorting.

## Sorting with Schwartzian Transform

The Schwartzian Transform optimizes expensive sorting operations by caching
comparison keys. Ruby's sort_by implements this automatically. This
example compares direct sorting with Schwartzian-style sorting. The transform
reduces O(n log n) key computations to O(n). This technique is valuable for
complex sorts.

schwartzian.rb
require 'benchmark'

books = [
  "War and Peace",
  "The Great Gatsby",
  "Moby Dick",
  "To Kill a Mockingbird"
]

# Expensive operation to simulate complex key calculation
def title_key(title)
  sleep(0.01) # Simulate expensive computation
  title.gsub(/^(A|An|The)\s+/i, '').downcase
end

# Without optimization
time1 = Benchmark.measure do
  sorted1 = books.sort { |a, b| title_key(a) &lt;=&gt; title_key(b) }
  puts "\nDirect sort (slow): #{sorted1}"
end

# With Schwartzian Transform (sort_by)
time2 = Benchmark.measure do
  sorted2 = books.sort_by { |title| title_key(title) }
  puts "\nSchwartzian sort (fast): #{sorted2}"
end

puts "\nTimings:"
puts "Direct sort: #{time1.real.round(2)}s"
puts "Schwartzian: #{time2.real.round(2)}s"

# Additional example: Sorting by word count
puts "\nSorted by word count: #{books.sort_by { |t| t.split.size }}"

The direct sort calls the expensive title_key method O(n log n)
times, while sort_by calls it just O(n) times. The benchmark shows
the dramatic performance difference - Schwartzian can be orders of magnitude
faster. This optimization matters most with costly key computations. 

Ruby's sort_by automatically implements the Schwartzian Transform,
making it the preferred choice for complex sorts. The example also shows sorting
by word count, another case where sort_by excels. Always consider
using sort_by when the comparison key requires computation.

## Custom Objects Sorting

Sorting custom objects in Ruby requires defining comparison logic. This can be
done by implementing the spaceship operator (&lt;=&gt;) or using
sort_by. This example shows both approaches for a Person class.
Consistent object sorting enables cleaner code in object-oriented applications.
These patterns work for any custom classes.

object_sorting.rb
class Person
  attr_reader :name, :age

  def initialize(name, age)
    @name = name
    @age = age
  end

  # Implement spaceship operator for default sorting
  def &lt;=&gt;(other)
    age &lt;=&gt; other.age
  end

  def to_s
    "#{name} (#{age})"
  end
end

people = [
  Person.new("Alice", 32),
  Person.new("Bob", 25),
  Person.new("Charlie", 40)
]

# Sort using &lt;=&gt;
age_sorted = people.sort
puts "Sorted by age (&lt;=&gt;):"
puts age_sorted

# Sort by name using sort_by
name_sorted = people.sort_by { |person| person.name }
puts "\nSorted by name (sort_by):"
puts name_sorted

# Additional example: Reverse sort by age
reverse_age = people.sort_by { |person| -person.age }
puts "\nReverse age sort:"
puts reverse_age

Implementing &lt;=&gt; enables natural sorting with sort,
making objects behave like built-in types. The example sorts Person objects by
age using this operator. sort_by offers more flexibility without
modifying the class, as shown in the name sorting example. 

Reverse sorting objects works the same as with primitives - either negate the
sort key or chain with reverse. The example demonstrates reverse
age sorting using a negated key. Choose the approach that best fits your class
design and usage patterns.

## Stable Sorting

A stable sort preserves the relative order of equal elements. Ruby's default
sorting is not guaranteed stable, but we can implement stable sorting when
needed. This example demonstrates a stable sort implementation. Stable sorting
is important when secondary characteristics should maintain order. The solution
works for any comparable elements.

stable_sort.rb
# Ruby's default sort isn't guaranteed stable
items = [
  {value: 5, order: 1},
  {value: 3, order: 2},
  {value: 5, order: 3},
  {value: 2, order: 4}
]

# Regular sort might not preserve order for equal values
unstable = items.sort_by { |item| item[:value] }
puts "Unstable sort (order might change):"
unstable.each { |item| puts "Value: #{item[:value]}, Original order: #{item[:order]}" }

# Stable sort implementation
def stable_sort(array)
  array.each_with_index.sort_by { |x, i| [x[:value], i] }.map(&amp;:first)
end

stable = stable_sort(items)
puts "\nStable sort (original order preserved):"
stable.each { |item| puts "Value: #{item[:value]}, Original order: #{item[:order]}" }

# Additional example: Stable sort with strings
words = ["banana", "apple", "cherry", "Apple"]
stable_words = words.each_with_index.sort_by { |w, i| [w.downcase, i] }.map(&amp;:first)
puts "\nStable case-insensitive sort: #{stable_words}"

The stable sort implementation adds the original index as a secondary sort key,
ensuring elements with equal values retain their relative positions. This is
achieved by sorting on an array of [value, original_index]. The example shows
that items with value 5 keep their original 1, 3 order. 

This technique works for any sorting criteria, including case-insensitive string
sorting as shown in the additional example. The stable version properly
maintains the original order of "apple" and "Apple" while sorting
case-insensitively. Implement stable sorting whenever element order matters
beyond the primary key.

## Performance Considerations

Sorting performance varies based on algorithm and data characteristics. Ruby's
default sort uses quicksort for most cases. This example benchmarks different
sorting approaches. Understanding performance helps choose the right method for
large datasets. These measurements guide optimization decisions in real
applications.

performance.rb
require 'benchmark'

# Generate large dataset
large_array = Array.new(100_000) { rand(1..100_000) }

Benchmark.bm(15) do |x|
  x.report("sort:") { large_array.sort }
  x.report("sort_by:") { large_array.sort_by { |n| n } }
  x.report("reverse sort:") { large_array.sort.reverse }
  x.report("sort! (in-place):") { large_array.dup.sort! }
end

# Additional example: Pre-sorted array
sorted_array = (1..100_000).to_a
Benchmark.bm(15) do |x|
  x.report("sorted sort:") { sorted_array.sort }
  x.report("shuffled sort:") { sorted_array.shuffle.sort }
end

The benchmark shows that sort and sort_by have
similar performance for simple numeric sorting. In-place sorting with
sort! can be slightly faster by avoiding array duplication.
Reverse sorting adds minimal overhead to the base sort operation. 

Pre-sorted arrays sort faster than random ones due to algorithm optimizations.
The example demonstrates that Ruby's sort implementation detects nearly-sorted
data. For critical performance needs, consider specialized data structures or
algorithms beyond Ruby's built-in methods.

## Advanced: Implementing Custom Sort Algorithms

While Ruby's built-in methods suffice for most needs, implementing sort
algorithms demonstrates computer science fundamentals. This example shows
bubble sort and merge sort implementations in Ruby. Understanding these
algorithms deepens your knowledge of sorting. These examples are for education
rather than production use.

custom_algorithms.rb
# Bubble sort (O(n^2))
def bubble_sort(array)
  arr = array.dup
  n = arr.length
  loop do
    swapped = false
    (n-1).times do |i|
      if arr[i] &gt; arr[i+1]
        arr[i], arr[i+1] = arr[i+1], arr[i]
        swapped = true
      end
    end
    break unless swapped
  end
  arr
end

# Merge sort (O(n log n))
def merge_sort(array)
  return array if array.size &lt;= 1

  mid = array.size / 2
  left = merge_sort(array[0...mid])
  right = merge_sort(array[mid..-1])

  merge(left, right)
end

def merge(left, right)
  result = []
  until left.empty? || right.empty?
    result &lt;&lt; (left.first &lt;= right.first ? left.shift : right.shift)
  end
  result + left + right
end

numbers = [5, 3, 8, 1, 9, 4]
puts "Original: #{numbers}"
puts "Bubble sort: #{bubble_sort(numbers)}"
puts "Merge sort: #{merge_sort(numbers)}"
puts "Ruby sort: #{numbers.sort}"

# Additional example: Quick sort
def quick_sort(array)
  return array if array.size &lt;= 1
  pivot = array.delete_at(rand(array.size))
  left, right = array.partition { |x| x &lt; pivot }
  quick_sort(left) + [pivot] + quick_sort(right)
end

puts "\nQuick sort: #{quick_sort(numbers.dup)}"

Bubble sort demonstrates the simplest sorting concept but has poor O(n²)
performance. Merge sort shows a more efficient O(n log n) divide-and-conquer
approach. The example includes helper methods for merging sorted subarrays. 

Quick sort, another O(n log n) algorithm, is often faster in practice due to
locality of reference. The additional example implements it with random pivot
selection. All custom sorts match Ruby's built-in result but serve educational
purposes rather than practical use in most Ruby applications.

## Best Practices

Use sort_by for complex sorts to benefit from Schwartzian Transform
optimization. Implement &lt;=&gt; for natural object sorting when
appropriate. Consider stability requirements and add index keys if needed. For
large datasets, benchmark different approaches to find optimal performance.
Remember that Ruby's built-in methods are highly optimized for most use cases.

## Source References

Learn more from these resources: 
[Ruby Array Documentation](https://ruby-doc.org/core/Array.html),
[Enumerable Module](https://ruby-doc.org/core/Enumerable.html),
and [Sorting Algorithms](https://en.wikipedia.org/wiki/Sorting_algorithm).

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.