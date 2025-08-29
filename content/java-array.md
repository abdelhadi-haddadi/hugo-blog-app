+++
title = "Java array"
date = 2025-08-29T19:58:04.397+01:00
draft = false
description = "Java array tutorial shows how to use arrays in Java. We initialize arrays, access array elements, traverse arrays, work with multidimensional arrays, compare arrays and search for array elements."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java array

last modified February 23, 2024

 

In this article we cover arrays. An array is a container object that holds a
fixed number of values of a single type. The length of an array is established
when the array is created. After creation, its length is fixed.

A scalar variable can hold only one item at a time. Arrays can hold multiple
items. These items are called elements of the array. Arrays store data of the
*same data type*. Each element can be referred to by an index. Arrays are
zero based. The index of the first element is zero.

## Array definition

Arrays are used to store data of our applications. We declare arrays to be of a
certain data type. We specify their length. And we initialize arrays with data.
We have several methods for working with arrays. We can modify the elements,
sort them, copy them or search for them.

int[] ages;
String[] names;
float[] weights;

We have three array declarations. The declaration consists of two parts: the
type of the array and the array name. The type of an array has a data type
that determines the types of the elements within an array (int,
String, float in our case) and a pair of square brackets
[]. The brackets indicate that we have an array.

*Collections* serve a similar purpose like arrays. They are more powerful
than arrays. They will be described later in a separate chapter.

## Initializing arrays

There are several ways how we can initialize an array in Java. In the first
example, an array is created and initialized in two steps.

Main.java
  

import java.util.Arrays;

void main() {

    int[] a = new int[5];

    a[0] = 1;
    a[1] = 2;
    a[2] = 3;
    a[3] = 4;
    a[4] = 5;

    System.out.println(Arrays.toString(a));
}

We create and initialize a numerical array. The contents of the array are
printed to the console.

int[] a = new int[5];

Here we create an array which can contain five elements. The statement allocates
memory for five integers.  The square brackets are used for declaring an array,
the type (int in our case) tells us what type of values the array
will hold. An array is an object and therefore it is created with the
new
keyword.

a[0] = 1;
a[1] = 2;
a[2] = 3;
a[3] = 4;
a[4] = 5;

We initialize the array with some data. This is assignment initialization.
The indexes are in the square brackets. Number 1 is going to be the first
element of the array, number 2 is the second etc.

System.out.println(Arrays.toString(a));

The Arrays class is a helper class which  contains various methods
for manipulating arrays. The toString method returns a string
representation of the contents of the specified array. This method is helpful in
debugging.

$ java Main.java
[1, 2, 3, 4, 5]

We can declare and initialize an array in one statement.

Main.java
  

import java.util.Arrays;

void main() {

    int[] a = new int[] { 2, 4, 5, 6, 7, 3, 2 };

    System.out.println(Arrays.toString(a));
}

This is a modified version of the previous program.

int[] array = new int[] { 2, 4, 5, 6, 7, 3, 2 };

An array is created and initialized in one step. The elements are specified in
curly brackets. We did not specify the length of the array. The compiler will do
it for us.

The one step creation and initialization can be further simplified by only
specifying the numbers between the curly brackets.

Main.java
  

import java.util.Arrays;

void main() {

    int[] a = { 2, 4, 5, 6, 7, 3, 2 };

    System.out.println(Arrays.toString(a));
}

An array of integers is created using the most simple way
of array creation.

int[] a = { 2, 4, 5, 6, 7, 3, 2 };

The new int[] construct can be omitted. The right side of the
statement is an *array literal* notation. It resembles the C/C++ style of
array initialization. Even if we drop the new keyword, the array is
created the same way as in previous two examples. This is just a convenient
shorthand notation.

## Accessing array elements

After the array is created, its elements can be accessed by their index. The
index is a number placed inside square brackets which follow the array name.

Main.java
  

void main() {

    String[] names = {"Jane", "Thomas", "Lucy", "David"};

    System.out.println(names[0]);
    System.out.println(names[1]);
    System.out.println(names[2]);
    System.out.println(names[3]);
}

In the example, we create an array of string names. We access each of the
elements by its index and print them to the terminal.

String[] names = {"Jane", "Thomas", "Lucy", "David"};

An array of strings is created.

System.out.println(names[0]);
System.out.println(names[1]);
System.out.println(names[2]);
System.out.println(names[3]);

Each of the elements of the array is printed to the console. With the
names[0] construct, we refer to the first element of the names
array.

$ java Main.java
Jane
Thomas
Lucy
David

Running the example we get the above output.

It is possible to change the elements of an array. The elements are not
immutable.

Main.java
  

import java.util.Arrays;

void main() {

    int[] vals = { 1, 2, 3 };

    vals[0] *= 2;
    vals[1] *= 2;
    vals[2] *= 2;

    System.out.println(Arrays.toString(vals));
}

We have an array of three integers. Each of the values will be multiplied by
two.

int[] vals = { 1, 2, 3 };

An array of three integers is created.

vals[0] *= 2;
vals[1] *= 2;
vals[2] *= 2;

Using the element access, we multiply each value in the array by two.

$ java Main.java
[2, 4, 6]

## Traversing arrays

We often need to go through all elements of an array. We show two common methods
for traversing an array.

Main.java
  

void main() {

    String[] planets = { "Mercury", "Venus", "Mars", "Earth", "Jupiter",
            "Saturn", "Uranus", "Neptune", "Pluto" };

    for (int i = 0; i &lt; planets.length; i++) {

        System.out.println(planets[i]);
    }

    for (String planet : planets) {

        System.out.println(planet);
    }
}

An array of planet names is created. We use the for loop to print all the
values.

for (int i=0; i &lt; planets.length; i++) {

    System.out.println(planets[i]);
}

In this loop, we utilize the fact that we can get the number of elements from
the array object. The number of elements is stored in the length
constant.

for (String planet : planets) {

    System.out.println(planet);
}

An enhanced for keyword can be used to make the code more compact when
traversing arrays or other collections. In each cycle, the planet variable is
passed the next value from the planets array.

## Passing arrays to methods

In the next example, we pass an array to a method.

Main.java
  

import java.util.Arrays;

void main() {

    int[] a = { 3, 4, 5, 6, 7 };
    int[] r = reverseArray(a);

    System.out.println(Arrays.toString(a));
    System.out.println(Arrays.toString(r));
}

int[] reverseArray(int[] b) {

    int[] c = new int[b.length];

    for (int i = b.length - 1, j = 0; i &gt;= 0; i--, j++) {

        c[j] = b[i];
    }

    return c;
}

The example reorders the elements of an array. For this task, a
reverseArray method is created.

int[] reverseArray(int[] b) {

The reverseArray method takes an array as a parameter and returns
an array. The method takes a copy of the passed array.

int[] c = new int[b.length];

Inside the body of the method, a new array is created; it will contain the newly
ordered elements.

for (int i = b.length - 1, j = 0; i &gt;= 0; i--, j++) {

    c[j] = b[i];
}

In this for loop, we fill the new array with the elements of the copied array.
The elements are reversed.

return c;

The newly formed array is returned back to the caller.

System.out.println(Arrays.toString(a));
System.out.println(Arrays.toString(r));

We print the elements of the original and the reversed array.

$ java Main.java
[3, 4, 5, 6, 7]
[7, 6, 5, 4, 3]

## Multidimensional arrays

So far we have been working with one-dimensional arrays. In Java, we can create
multidimensional arrays. A multidimensional array is an array of arrays. In such
an array, the elements are themselves arrays. In multidimensional arrays, we use
two or more sets of brackets.

Main.java
  

void main() {

    int[][] twodim = new int[][] { { 1, 2, 3 }, { 1, 2, 3 } };

    int d1 = twodim.length;
    int d2 = twodim[1].length;

    for (int i = 0; i &lt; d1; i++) {

        for (int j = 0; j &lt; d2; j++) {

            System.out.println(twodim[i][j]);
        }
    }
}

In this example, we create a two-dimensional array of integers.

int[][] twodim = new int[][] { { 1, 2, 3 }, { 1, 2, 3 } };

Two pairs of square brackets are used to declare a two-dimensional array. Inside
the curly brackets, we have additional two pairs of curly brackets. They
represent two inner arrays.

int d1 = twodim.length;
int d2 = twodim[1].length;

We determine the length of the outer array that
holds other two arrays and the second inner array.

for (int i = 0; i &lt; d1; i++) {

    for (int j = 0; j &lt; d2; j++) {

        System.out.println(twodim[i][j]);
    }
}

Two for loops are used to print all the six values from the two-dimensional
array. The first index of the twodim[i][j] array refers to one of
the inner arrays. The second index refers to the element of the chosen inner
array.

$ java Main.java
1
2
3
1
2
3

In a similar fashion, we create a three-dimensional array of
integers.

Main.java
  

void main() {

    int[][][] n3 = {
            { { 12, 2, 8 }, { 0, 2, 1 } },
            { { 14, 5, 2 }, { 0, 5, 4 } },
            { { 3, 26, 9 }, { 8, 7, 1 } },
            { { 4, 11, 2 }, { 0, 9, 6 } }
    };

    int d1 = n3.length;
    int d2 = n3[0].length;
    int d3 = n3[0][0].length;

    for (int i = 0; i &lt; d1; i++) {

        for (int j = 0; j &lt; d2; j++) {

            for (int k = 0; k &lt; d3; k++) {

                System.out.print(n3[i][j][k] + " ");
            }
        }
    }
}

A variable that holds a three-dimensional array is declared with three pairs of
square brackets. The values are place inside three pairs of curly brackets.

int[][][] n3 = {
    { { 12, 2, 8 }, { 0, 2, 1 } },
    { { 14, 5, 2 }, { 0, 5, 4 } },
    { { 3, 26, 9 }, { 8, 7, 1 } },
    { { 4, 11, 2 }, { 0, 9, 6 } }
};

Three-dimensional array n3 is created. It is an array that has
elements which are themselves arrays of arrays.

int d1 = n3.length;
int d2 = n3[0].length;
int d3 = n3[0][0].length;

We get the length of all three dimensions.

for (int i = 0; i &lt; d1; i++) {

    for (int j = 0; j &lt; d2; j++) {

        for (int k = 0; k &lt; d3; k++) {

            System.out.print(n3[i][j][k] + " ");
        }
    }
}

We need three for loops to traverse a three dimensional array.

$ java Main.java
12 2 8 0 2 1 14 5 2 0 5 4 3 26 9 8 7 1 4 11 2 0 9 6

## Irregular arrays

Arrays that have elements of the same size are called rectangular arrays. It is
possible to create irregular arrays where the arrays have a different size. In
C# such arrays are called *jagged arrays*.

Main.java
  

void main() {

    int[][] ir = new int[][] {
            { 1, 2 },
            { 1, 2, 3 },
            { 1, 2, 3, 4 }
    };

    for (int[] a : ir) {
        for (int e : a) {
            System.out.print(e + " ");
        }
    }
}

This is an example of an irregular array.

int[][] ir = new int[][] {
        { 1, 2 },
        { 1, 2, 3 },
        { 1, 2, 3, 4 }
};

This is a declaration and initialization of an irregular array. The three inner
arrays have 2, 3, and 4 elements.

for (int[] a : ir) {
    for (int e : a) {
        System.out.print(e + " ");
    }
}

The enhanced for loop is used to go through all the
elements of the array.

$ java Main.java
1 2 1 2 3 1 2 3 4

## Array methods

The Arrays class, available in the java.util
package, is a helper class that contains methods for working with arrays. These
methods can be used for modifying, sorting, copying, or searching data. These
methods that we use are static methods of the Array class. (Static
methods are methods that can be called without creating an instance of a class.)

Main.java
  

import java.util.Arrays;

void main() {

    int[] a = { 5, 2, 4, 3, 1 };

    Arrays.sort(a);

    System.out.println(Arrays.toString(a));

    Arrays.fill(a, 8);
    System.out.println(Arrays.toString(a));

    int[] b = Arrays.copyOf(a, 5);

    if (Arrays.equals(a, b)) {

        System.out.println("Arrays a, b are equal");
    } else {

        System.out.println("Arrays a, b are not equal");
    }
}

In the code example, we present five methods of the Arrays class.

import java.util.Arrays;

We will use the shorthand notation for the Arrays class.

int[] a = { 5, 2, 4, 3, 1 };

We have an array of five integers.

Arrays.sort(a);

The sort method sorts the integers in an ascending order.

System.out.println(Arrays.toString(a));

The toString method returns a string representation
of the contents of the specified array.

Arrays.fill(a, 8);

The fill method assigns the specified integer value to
each element of the array.

int[] b = Arrays.copyOf(a, 5);

The copyOf method copies the specified number of elements
to a new array.

if (Arrays.equals(a, b)) {

    System.out.println("Arrays a, b are equal");
} else {

    System.out.println("Arrays a, b are not equal");
}

The equals method compares the two arrays. Two arrays are equal
if they contain the same elements in the same order.

$ java Main.java
[1, 2, 3, 4, 5]
[8, 8, 8, 8, 8]
Arrays a, b are equal

## Comparing arrays

There are two methods for comparing arrays. The equals method and
the deepEquals method. The deepEquals method
also compares references to arrays inside arrays.

Main.java
  

import java.util.Arrays;

void main() {

    int[] a = { 1, 1, 2, 1, 1 };
    int[] b = { 0, 0, 3, 0, 0 };

    int[][] c = {
            { 1, 1, 2, 1, 1 },
            { 0, 0, 3, 0, 0 }
    };

    int[][] d = {
            a,
            b
    };

    System.out.print("equals() method: ");

    if (Arrays.equals(c, d)) {

        System.out.println("Arrays c, d are equal");
    } else {

        System.out.println("Arrays c, d are not equal");
    }

    System.out.print("deepEquals() method: ");

    if (Arrays.deepEquals(c, d)) {

        System.out.println("Arrays c, d are equal");
    } else {

        System.out.println("Arrays c, d are not equal");
    }
}

The example explains the difference between the two methods.

int[] a = { 1, 1, 2, 1, 1 };
int[] b = { 0, 0, 3, 0, 0 };

We have two arrays of integers.

int[][] c = {
    { 1, 1, 2, 1, 1 },
    { 0, 0, 3, 0, 0 }
};

The c array has two inner arrays. The elements of the inner arrays are equal
to the a and b arrays.

int[][] d = {
    a,
    b
};

The d array contains references to a and
b arrays.

System.out.print("equals() method: ");

if (Arrays.equals(c, d)) {

    System.out.println("Arrays c, d are equal");
} else {

    System.out.println("Arrays c, d are not equal");
}

System.out.print("deepEquals() method: ");

if (Arrays.deepEquals(c, d)) {

    System.out.println("Arrays c, d are equal");
} else {

    System.out.println("Arrays c, d are not equal");
}

Now the c and d arrays are compared using both
methods. For the equals method, the arrays are not equal. The
deepEquals method goes deeper in the referenced arrays and
retrieves their elements for comparison. For this method, the c and
d arrays are equal.

$ java Main.java
equals() method: Arrays c, d are not equal
deepEquals() method: Arrays c, d are equal

## Searching arrays

The Arrays class has a simple method for searching elements in an
array. It is called the binarySearch. The method searches for
elements using a binary search algorithm. The binarySearch method
only works on sorted arrays.

Main.java
  

import java.util.Arrays;

void main() {

    String[] planets = { "Mercury", "Venus", "Mars", "Earth", "Jupiter",
            "Saturn", "Uranus", "Neptune", "Pluto" };

    Arrays.sort(planets);

    String p = "Earth";
    int r = Arrays.binarySearch(planets, p);

    String msg = "";

    if (r &gt;= 0) {
        msg = STR."\{p} was found at position \{r} of the sorted array";
    } else {
        msg = STR."\{p} was not found";
    }

    System.out.println(msg);
}

In the example, we search for the "Earth" string in an array of planets.

Arrays.sort(planets);

Since the algorithm only works on sorted arrays, we must sort the array first.

String p = "Earth";

We will be searching for the "Earth" element.

int r = Arrays.binarySearch(planets, p);

The binarySearch method is called. The first parameter is the array
name, the second the element we are looking for. If the element is found, the
return value is greater or equal to zero. In such a case, it is the index of the
element in the sorted array.

if (r &gt;= 0) {
    msg = STR."\{p} was found at position \{r} of the sorted array";
} else {
    msg = STR."\{p} was not found";
}

Depending on the returned value, we create a message.

$ java Main.java
Earth was found at position 0 of the sorted array

## Download image

In the next example, we show how to download an image.

Main.java
  

import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;

void main() throws IOException, URISyntaxException {

    String imageUrl = "https://something.com/favicon.ico";
    String destinationFile = "favicon.ico";

    var url = new URI(imageUrl).toURL();

    try (var is = url.openStream();
            var fos = new FileOutputStream(destinationFile)) {

        byte[] buf = new byte[1024];
        int noOfBytes;

        while ((noOfBytes = is.read(buf)) != -1) {

            fos.write(buf, 0, noOfBytes);
        }
    }
}

The example downloads a small favicon.ico image.

byte[] buf = new byte[1024];

An image is an array of bytes. We create an empty array of byte
values big enough to hold the icon.

while ((noOfBytes = is.read(buf)) != -1) {

    fos.write(buf, 0, noOfBytes);
}

We read the binary data and write it to the file.

## Source

[Java arrays - tutorial](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/arrays.html)

In this article we worked with arrays.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).