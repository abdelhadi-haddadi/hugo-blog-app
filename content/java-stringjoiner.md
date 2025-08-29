+++
title = "Java StringJoiner"
date = 2025-08-29T20:00:36.938+01:00
draft = false
description = "Learn how to join strings efficiently in Java using StringJoiner and Collectors.joining. This tutorial covers examples, best practices, and performance insights for handling string concatenation in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java StringJoiner

last modified May 31, 2025

 

This article explores StringJoiner in Java, a useful class for
efficiently constructing delimited strings.

StringJoiner helps format sequences of characters by inserting a
delimiter between elements. Additionally, it allows customization with an
optional prefix and suffix, making it ideal for structured text formatting.

One important detail about StringJoiner is that it only inserts the
delimiter between elements, but not at the end of the sequence. This means the
last element will not have an extra trailing delimiter, ensuring clean and
correct formatting without unnecessary characters.

Internally, StringJoiner is leveraged by the
String.join method, providing a simple and efficient way to
concatenate strings.

## Using StringJoiner

The following example joins numbers with the StringJoiner class.

Main.java
  

void main() {

    var joined = new StringJoiner(",");

    joined.add("1");
    joined.add("2");
    joined.add("3");
    joined.add("4");
    joined.add("5");

    System.out.println(joined);
}

The example concatenates five numbers and prints the final string to the console.

var joined = new StringJoiner(",");

A new instance of the StringJoiner class is created. The comma
character is used as a delimiter.

joined.add("1");
joined.add("2");
joined.add("3");
joined.add("4");
joined.add("5");

Five values are added with the add method.

System.out.println(join);

The StringJoiner is converted to a string and printed to the
console.

$ java Main.java
1,2,3,4,5

## The String.join method

In the second example, we join strings with the String.join
method.

Main.java
  

void main() {

    var joined = String.join("/", "2024", "7", "1");
    System.out.println(joined);
}

The String.join method internally uses the StringJoiner.

var joined = String.join("/", "2024", "7", "1");

A date is concatenated with the String.join method.

$ java Main.java
2016/8/5

## Joining list

The third example concatenates elements of a list.

Main.java
  

void main() {

    var words = List.of("Today", "is", "a", "beautiful", "day");
    var joined = String.join(" ", words);

    System.out.println(joined);
}

A list can be passed as an argument to the String.join method.

var joined = String.join(" ", words);

The elements of the list are joined with a single space character.

$ java Main.java
Today is a beautiful day

## Reading CSV file

The following example reads numbers from a CSV file and later joins them with a
StringJoiner. 

data.csv
  

13,24,35,16,50

This is the numbers.csv file.

Main.java
  

void main() throws FileNotFoundException {

    var fileName = "data.csv";

    StringJoiner joined;

    try (var scanner = new Scanner(new File(fileName))) {
        scanner.useDelimiter(",");

        joined = new StringJoiner("|");

        while (scanner.hasNext()) {

            joined.add(scanner.next());
        }
    }

    System.out.println(joined);
}

The example reads CSV file, containing numbers, and joins them with a
StringJoiner using a different delimiter.

try (var scanner = new Scanner(new File(fileName))) {
    scanner.useDelimiter(",");

The values are read with the Scanner class. The numbers are
separated by a comma character so we set the comma delimiter with the
useDelimiter method.

var joined = new StringJoiner("|");

A StringJoiner class is instantiated with a "|" delimiter.

while (scanner.hasNext()) {

    join.add(scanner.next());
}

We retrieve the values with the scanner and concatenate them with the joiner.

## Writing CSV file

The next example writes numbers to a CSV file.

Main.java
  

void main() throws IOException {

    var fileName = "data.csv";
    var joined = new StringJoiner(",");

    joined.add("21");
    joined.add("43");
    joined.add("54");
    joined.add("76");
    joined.add("98");

    var newFile = new File(fileName);
    boolean created = newFile.createNewFile();

    if (created) {
        try (var pw = new PrintWriter(newFile)) {

            pw.write(joined.toString());
        }
    }
}

The example joins five numbers with a StringJoiner and writes the
concatendated string to a CSV file.

var joined = new StringJoiner(",");

joined.add("21");
joined.add("43");
joined.add("54");
joined.add("76");
joined.add("98");

Five numbers are concatenated with the StringJoiner. The numbers
are separated with a comma character.

var newFile = new File(fileName);
boolean created = newFile.createNewFile();

A new file object is created in the current working directory.

if (created) {
    try (var pw = new PrintWriter(newFile)) {

        pw.write(joined.toString());
    }
}

The joined values are written to the file.

## The Collectors.joining method

Tthe Collectors.joining method returns a Collector
that concatenates the input elements, separated by the specified delimiter, in
encounter order.

Main.java
  

void main() {

    Stream&lt;String&gt; stream = Stream.of("Jan", "Peter", "Robert");

    String names = stream.collect(Collectors.joining(" "));
    System.out.println(names);
}

The example uses the stream API to concatenate three names.

$ java Main.java
Jan Peter Robert

## Source

[Java StringJoiner - language reference](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/StringJoiner.html)

In this article we have covered StringJoiner and
Collectors.joining.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).