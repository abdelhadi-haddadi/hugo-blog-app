+++
title = "Java Palindrome"
date = 2025-08-29T20:00:05.179+01:00
draft = false
description = "Java Palindrome tutorial shows how to create a function in Java that identifies a palidrome. A palindrome is a word, number, phrase, or other sequence of characters which reads the same backward as forward, such as madam or racecar."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Palindrome

last modified July 10, 2024

 

In this article we show how to create a function in Java that identifies a
palidrome.

Palindrome is a word, number, phrase, or other sequence of characters
which reads the same backward as forward, such as madam or racecar.

In this article we show several ways to check if a string is a palidrome in Java.

## Java Palindrome with StringBuilder

The StringBuilder's reverse method 
causes this character sequence to be replaced by the reverse of the sequence.

Main.java
  

void main() {

    System.out.println(isPalindrome("radar"));
    System.out.println(isPalindrome("kayak"));
    System.out.println(isPalindrome("forest"));
}

boolean isPalindrome(String original) {

    String reversed = new StringBuilder(original).reverse().toString();
    return original.equals(reversed);
}

In the example, we pass the original string to the StringBuilder
and reverse it. Then we compare the reversed string to the original with 
equals.

## Java Palindrome with for loop and charAt

The String's charAt method returns the char value at 
the specified index. An index ranges from 0 to length() - 1.

Main.java
  

void main() {

    System.out.println(isPalindrome("radar"));
    System.out.println(isPalindrome("kayak"));
    System.out.println(isPalindrome("forest"));
}

boolean isPalindrome(String original) {

    String reversed = "";

    int len = original.length();
    for (int i = len - 1; i &gt;= 0; i--) {
        
        reversed = reversed + original.charAt(i);
    }

    return original.equals(reversed);
}

In the example, we build the reversed string with a for loop that goes from 
the end of the original string. We get the current character with charAt.

int len = original.length();

We get the number of characters in the original string with length.

for (int i = len - 1; i &gt;= 0; i--) {
        
    reversed = reversed + original.charAt(i);
}

We build the reversed string by taking the characters from the end of the
original string with charAt.

## Using toCharArray method

The String's toCharArray converts the string to a new 
character array.

Main.java
  

void main() {

    System.out.println(isPalindrome("radar"));
    System.out.println(isPalindrome("kayak"));
    System.out.println(isPalindrome("forest"));
}

boolean isPalindrome(String original) {

    char[] data = original.toCharArray();

    int i = 0;
    int j = data.length - 1;

    while (j &gt; i) {

        if (data[i] != data[j]) {
            return false;
        }

        ++i;
        --j;
    }
    
    return true;
}

In the example, we turn the original string to an array of characters. In a
while loop, we start to compare the characters from the both sides of the
string; starting with the leftmost and rightmost characters. We go until the
middle of the string.

## Using Stack

The Stack is a last-in-first-out (LIFO) collection.

Main.java
  

import java.util.Stack;

void main() {

    System.out.println(isPalindrome("radar"));
    System.out.println(isPalindrome("kayak"));
    System.out.println(isPalindrome("forest"));
}

boolean isPalindrome(String original) {

    char[] data = original.toCharArray();

    Stack&lt;Character&gt; stack = new Stack&lt;&gt;();
    for (char c: data) {

        stack.push(c);
    }

    char[] data2 = new char[data.length];

    int len = stack.size();

    for (int i = 0; i &lt; len; i++) {

        data2[i] = stack.pop();
    }

    var reversed = new String(data2);
    
    return original.equals(reversed);
}

The example uses the Java Stack container to build a reversed
string.

char[] data = original.toCharArray();

First, we turn the string to an array of characters with toCharArray.

Stack&lt;Character&gt; stack = new Stack&lt;&gt;();

for (char c: data) {

    stack.push(c);
}

In the second step, we push the characters to the stack. 

char[] data2 = new char[data.length];

This array will hold the reversed characters.

for (int i = 0; i &lt; len; i++) {

    data2[i] = stack.pop();
}

We get the reversed string now by popping the characters from the stack.

var reversed = new String(data2);
    
return original.equals(reversed);

We create the reversed string from the array and compare it with the original 
string using equals.

## Source

[Palindrome](https://en.wikipedia.org/wiki/Palindrome)

In this article we have check if a string is a palindrome. We have created 
various algorithms to check a palindrome. 

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).