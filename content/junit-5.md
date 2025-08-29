+++
title = "JUnit 5"
date = 2025-08-29T19:59:43.627+01:00
draft = false
description = "JUnit 5 tutorial shows how to do testing in Java with JUnit. JUnit 5 is the most popular testing framework in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JUnit 5

last modified January 27, 2024

 

JUnit 5 tutorial shows how to do testing in Java with JUnit.

## Java JUnit 5

JUnit 5 is the most popular testing framework in Java. JUnit 5 consists of 
three modules: JUnit Platform, JUnit Jupiter, and JUnit Vintage. 

The JUnit Platform is a foundation for launching JUnit 5 tests. It provides
integration with various IDEs and build tools. JUnit Jupiter is the core API for
writing tests. JUnit Vintage is for backward compatibility with JUnit 3 and
JUnit 4 tests.

## JUnit 5 Maven dependencies and plugin

In the examples of this tutorial, we use the following Maven dependencies:

&lt;dependency&gt;
    &lt;groupId&gt;org.junit.jupiter&lt;/groupId&gt;
    &lt;artifactId&gt;junit-jupiter-engine&lt;/artifactId&gt;
    &lt;version&gt;5.3.2&lt;/version&gt;
    &lt;scope&gt;test&lt;/scope&gt;
&lt;/dependency&gt;

&lt;dependency&gt;
    &lt;groupId&gt;org.junit.jupiter&lt;/groupId&gt;
    &lt;artifactId&gt;junit-jupiter-params&lt;/artifactId&gt;
    &lt;version&gt;5.3.2&lt;/version&gt;
    &lt;scope&gt;test&lt;/scope&gt;
&lt;/dependency&gt;

We use the junit-jupiter-engine and junit-jupiter-params
dependencies.

&lt;plugin&gt;
    &lt;artifactId&gt;maven-surefire-plugin&lt;/artifactId&gt;
    &lt;version&gt;3.0.0-M1&lt;/version&gt;
&lt;/plugin&gt;

The Surefire Plugin is used during the test phase of the build lifecycle to
execute the unit tests of an application.

We can use Maven or the tools of the IDE to run tests. IDEs have shortcuts 
to create test classes for us; for instance, IntelliJ IDEA has Ctrl 
+ Shift + T to generate a test class for us.

## JUnit 5 annotations

The core of the JUnit 5 API are the annotations. For example, the @Test
annotation is used to mark a test method. The @ParameterizedTest 
denotes that a method is a parameterized test. The @RepeatedTest
denotes that a method is a test template for a repeated test. 

## JUnit 5 @BeforeAll

The @BeforeAll annotation denotes that the annotated method should
be executed before all @Test, @RepeatedTest, 
@ParameterizedTest, and @TestFactory methods in the 
current class. It is executed only once.

main/java/com/zetcode/utils/MathUtils.java
  

package com.zetcode.utils;

import java.util.List;
import java.util.stream.Collectors;

public class MathUtils {

    public static Integer sum(List&lt;Integer&gt; vals) {

        var sum = vals.stream().reduce(Integer::sum);

        return sum.get();
    }

    public static List&lt;Integer&gt; positive(List&lt;Integer&gt; vals) {

        return vals.stream().filter(val -&gt; val &gt; 0).collect(Collectors.toList());

    }

    public static List&lt;Integer&gt; negative(List&lt;Integer&gt; vals) {

        return vals.stream().filter(val -&gt; val &lt; 0).collect(Collectors.toList());
    }
}

We have a MathUtils helper class with three methods; we create 
test cases for this helper class.

test/java/com/zetcode/utils/MathUtilsTest.java
  

package com.zetcode.utils;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

class MathUtilsTest {

    private static List&lt;Integer&gt; vals;

    @BeforeAll
    static void setup() {

        vals = List.of(2, 1, -2, 3, -1, 0, -1);
    }

    @Test
    @DisplayName("testing sum of values")
    void sumTest() {

        var sum = MathUtils.sum(vals);

        assertEquals(Integer.valueOf(2), sum);
    }

    @Test
    @DisplayName("should get positive values")
    void positiveTest() {

        var positiveValues = MathUtils.positive(vals);

        assertEquals(positiveValues, List.of(2, 1, 3));
    }

    @Test
    @DisplayName("should get negative values")
    void negativeTest() {

        var negativeValues = MathUtils.negative(vals);

        assertEquals(negativeValues, List.of(-2, -1, -1));
    }
}

MathUtilsTest is a test class for the MathUtils helper
class.

@BeforeAll
static void setup() {

    vals = List.of(2, 1, -2, 3, -1, 0, -1);
}

Before the three test methods, the setup method is executed. It 
creates a list of values for our tests.

@Test
@DisplayName("testing sum of values")
void sumTest() {

    var sum = MathUtils.sum(vals);

    assertEquals(Integer.valueOf(2), sum);
}

In the sumTest method we test that the MathUtils.sum
method calculate the correct value. With the assertEquals method 
we assert that the computed value is equal to 2. The @DisplayName
annotation is used in IDEs such as IntelliJ IDEA to give names to the tests
in their tools.

$ mvn test 
...
[INFO] 
[INFO] -------------------------------------------------------
[INFO]  T E S T S
[INFO] -------------------------------------------------------
[INFO] Running com.zetcode.utils.MathUtilsTest
[INFO] Tests run: 3, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.07 s - in com.zetcode.utils.MathUtilsTest
[INFO] 
[INFO] Results:
[INFO] 
[INFO] Tests run: 3, Failures: 0, Errors: 0, Skipped: 0
[INFO] 
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------

This is a sample output of the tests.

## JUnit 5 @BeforeEach

The @BeforeEach annotation denotes that the annotated method should
be executed before each @Test, @RepeatedTest, 
@ParameterizedTest, and @TestFactory methods in the 
current class. It is executed only once.

main/java/com/zetcode/bag/ColorBag.java
  

package com.zetcode.bag;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class ColorBag {

    private Set&lt;String&gt; colors = new HashSet&lt;&gt;();

    public void add(String color) {

        colors.add(color);
    }

    public void remove(String color) {

        colors.remove(color);
    }

    public List&lt;String&gt; toList() {

        return new ArrayList&lt;&gt;(colors);
    }

    public boolean contains(String color) {

        return colors.contains(color);
    }

    public int size() {

        return colors.size();
    }
}

We have a ColorBag to test. 

test/java/com/zetcode/bag/ColorBagTest.java
  

package com.zetcode.bag;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.Collections;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class ColorBagTest {

    private ColorBag colorBag;

    @BeforeEach
    void setupEach() {

        colorBag = new ColorBag();
        colorBag.add("red");
        colorBag.add("green");
        colorBag.add("yellow");
        colorBag.add("blue");
        colorBag.add("magenta");
        colorBag.add("brown");
    }

    @Test
    @DisplayName("added color value should be in bag")
    void add() {

        var newColor = "pink";
        colorBag.add(newColor);

        assertTrue(colorBag.contains(newColor),
                "failure - added colour not it the bag");
    }

    @Test
    @DisplayName("removed color should not be in bag")
    void remove() {

        var color = "green";
        colorBag.remove(color);

        assertFalse(colorBag.contains(color),
                "failure - removed color still in bag");
    }

    @Test
    @DisplayName("color bag should be transformed into List")
    void toList() {

        var myList = Arrays.asList("red","green", "yellow",
                "blue", "magenta", "brown");
        var colorList = colorBag.toList();

        Collections.sort(myList);
        Collections.sort(colorList);

        assertEquals(colorList, myList,
                "failure - color bag not transformed into List");
    }

    @Test
    @DisplayName("size of a color bag should match")
    void size() {

        int bagSize = colorBag.size();

        assertEquals(6, bagSize,
                "failure - size of bag does not match");
    }
}

The method annotated with @BeforeEach will be run before each 
of the methods. For different context, we use different assertions: 
assertEquals, assertTrue, and assertFalse.

@BeforeEach
void setupEach() {

    colorBag = new ColorBag();
    colorBag.add("red");
    colorBag.add("green");
    colorBag.add("yellow");
    colorBag.add("blue");
    colorBag.add("magenta");
    colorBag.add("brown");
}

Since we are modifying the ColorBag object in the test methods, 
we create a fresh ColorBag before each of the methods.

## JUnit 5 @ParameterizedTest

Parameterized tests are created with @ParameterizedTest.

main/java/com/zetcode/utils/StringUtils.java
  

package com.zetcode.utils;

public class StringUtils {

    public static boolean isPalindrome(String text) {

        var cleaned = text.replaceAll("\\s+", "").toLowerCase();
        var plain = new StringBuilder(cleaned);

        var reversed = plain.reverse().toString();

        return reversed.equals(cleaned);
    }
}

We have StringUtils's isPalindrome method to 
test.

test/java/com/zetcode/utils/StringUtilsTest.java
  

package com.zetcode.utils;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import static org.junit.jupiter.api.Assertions.assertTrue;

class StringUtilsTest {

    @ParameterizedTest
    @ValueSource(strings = { "racecar", "radar", "level", "refer", "deified", "civic" })
    void isPalindrome(String word) {

        assertTrue(StringUtils.isPalindrome(word));
    }

}

The @ValueSource annotation specifies a String array as the source 
of the arguments for the test method.

$ mvn test
...
[INFO] -------------------------------------------------------
[INFO]  T E S T S
[INFO] -------------------------------------------------------
[INFO] Running com.zetcode.utils.StringUtilsTest
[INFO] Tests run: 6, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.107 s - in com.zetcode.utils.StringUtilsTest
[INFO] 
[INFO] Results:
[INFO] 
[INFO] Tests run: 6, Failures: 0, Errors: 0, Skipped: 0
[INFO] 

Maven reports six test runs. The test method was run for each of the words 
in the source.

## JUnit 5 @RepeatedTest

Repeated tests are run with the @RepeatedTest annotation.
We specify the total number of repetitions desired. 

main/java/com/zetcode/sort/MySelectionSort.java
  

package com.zetcode.sort;

public class MySelectionSort {

    public static int[] doSort(int[] arr){

        for (int i = 0; i &lt; arr.length; i++)
        {
            int idx = i;

            for (int j = i + 1; j &lt; arr.length; j++) {

                if (arr[j] &lt; arr[idx]) {
                    idx = j;
                }
            }

            int smallerNumber = arr[idx];

            arr[idx] = arr[i];
            arr[i] = smallerNumber;
        }

        return arr;
    }
}

We have a selection sort algorithm to test. 

test/java/com/zetcode/sort/MySelectionSortTest.java
  

package com.zetcode.sort;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.RepeatedTest;
import org.junit.jupiter.api.RepetitionInfo;

import java.util.Arrays;
import java.util.Random;

import static org.junit.jupiter.api.Assertions.assertEquals;

class MySelectionSortTest {

    private final int N = 10;

    private int[] vals = new int[N];

    @BeforeEach
    void beforeEach(RepetitionInfo info) {

        System.out.printf("Test #%d%n", info.getCurrentRepetition());

        var r = new Random(System.nanoTime());

        for (int i=0; i &lt; N; i++) {

            vals[i] = r.nextInt(100);
        }
    }

    @RepeatedTest(value = 40, name = "#{displayName} {currentRepetition}/{totalRepetitions}")
    @DisplayName("should sort values")
    void doSort() {

        System.out.println(Arrays.toString(vals));

        var sorted = MySelectionSort.doSort(vals);
        Arrays.sort(vals);

        System.out.println(Arrays.toString(sorted));

        assertEquals(sorted, vals);
    }
}

We are running the test forty times.

@BeforeEach
void beforeEach(RepetitionInfo info) {

    System.out.printf("Test #%d%n", info.getCurrentRepetition());

    var r = new Random(System.nanoTime());

    for (int i=0; i &lt; N; i++) {

        vals[i] = r.nextInt(100);
    }
}

Before each test run, we randomly create forty values and place them into 
the array.

@RepeatedTest(value = 40, name = "#{displayName} {currentRepetition}/{totalRepetitions}")
@DisplayName("should sort values")
void doSort() {

    System.out.println(Arrays.toString(vals));

    var sorted = MySelectionSort.doSort(vals);
    Arrays.sort(vals);

    System.out.println(Arrays.toString(sorted));

    assertEquals(sorted, vals);
}

In the test method, we compare the results of our sorting method to an existing 
algorithm in Arrays.sort. The @RepeatedTest annotation 
has three placeholders: the {displayName} is the display name of 
the method; the {currentRepetition} is the current repetition 
count; the {totalRepetitions} is the total number of repetitions.

## Source

[JUnit 5 User Guide](https://junit.org/junit5/docs/current/user-guide/)

In this article we have covered the basics of JUnit 5 testing framework.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).