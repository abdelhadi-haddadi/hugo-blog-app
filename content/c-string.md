+++
title = "C++ string"
date = 2025-08-27T23:22:40.259+01:00
draft = false
description = "C++ string tutorial shows how to work with strings in C++. In C++, a string is a sequence of characters."
image = ""
imageBig = ""
categories = ["cpp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C++ string

last modified January 9, 2023

C++ string tutorial shows how to work with strings in C++. 

A string is a sequence of characters. C++ has the std::string
type to represent strings.

The characters in a string literal must be enclosed between double quotation
marks.

## C++ string access characters

To access the characters of a string, we can use the [] operator
or the at method. In addition, the front method 
accesses the first character and the back the last character.

access.cpp
  

#include &lt;iostream&gt;

using std::cout;
using std::endl;
using std::string;

int main() {

    string msg = "an old falcon";

    cout &lt;&lt; msg.at(4) &lt;&lt; endl;
    cout &lt;&lt; msg[5] &lt;&lt; endl;
    cout &lt;&lt; msg.front() &lt;&lt; endl;
    cout &lt;&lt; msg.back() &lt;&lt; endl;

    return 0;
}

In the example, we access characters of a string. 

$ ./access 
l
d
a

## C++ string concatenate

The + operator is used to concatenate strings.

concat.cpp
  

#include &lt;iostream&gt;

using std::string;
using std::cin;
using std::cout;
using std::endl;

int main() {

    string name, msg;

    cout &lt;&lt; "Enter your name: ";
    getline(cin, name);

    msg = "Hello " + name + "!";

    cout &lt;&lt; msg &lt;&lt; endl;

    return 0;
}

With the getline method, we read the input from a user and 
concatenate it with other strings to form a message.

$ ./concat 
Enter your name: Jan
Hello Jan!  

## C++ string to int

The stoi function converts a string to a signed integer. 

str2int.cpp
  

#include &lt;iostream&gt;
#include &lt;string&gt;

using std::string;
using std::cout;
using std::endl;
using std::stoi;

int main () {

    string str1 = "12";
    string str2 = "18.97";
    string str3 = "4 foxes";

    int val1 = stoi(str1);
    int val2 = stoi(str2);
    int val3 = stoi(str3);

    cout &lt;&lt; val1 &lt;&lt; endl;
    cout &lt;&lt; val2 &lt;&lt; endl;
    cout &lt;&lt; val3 &lt;&lt; endl;

    return 0;
}

We convert three strings to integers.

$ ./str2int
12
18
4

## C++ string modify

C++ has several methods to modify strings.

modify.cpp
  

#include &lt;iostream&gt;

using std::string;
using std::cout;
using std::endl;

int main() {

    string msg = "an old";

    msg.append(" falcon");

    cout &lt;&lt; msg &lt;&lt; endl;

    msg.push_back('.');

    cout &lt;&lt; msg &lt;&lt; endl;

    msg.pop_back();

    cout &lt;&lt; msg &lt;&lt; endl;

    msg.erase(0, 3);

    cout &lt;&lt; msg &lt;&lt; endl;

    msg.insert(4, "gray ");

    cout &lt;&lt; msg &lt;&lt; endl;

    msg.replace(9, 6, "eagle");

    cout &lt;&lt; msg &lt;&lt; endl;

    msg.clear();

    cout &lt;&lt; msg.size() &lt;&lt; endl;

    return 0;
}

In the example, the initial string is modified with append,
push_back, pop_back, erase,
insert, replace, and clear methods.

$ ./modify 
an old falcon
an old falcon.
an old falcon
old falcon
old gray falcon
old gray eagle
0

## C++ string compare

Strings are compared with the compare method.

comparing.cpp
  

#include &lt;iostream&gt;

using std::string;
using std::cout;
using std::endl;

int main() {

    string word1 = "blue";
    string word2 = "blues";

    if (word1.compare(word2) == 0) {

        cout &lt;&lt; "words are equal" &lt;&lt; endl;
    } else {

        cout &lt;&lt; "words are not equal" &lt;&lt; endl;
    }

    if (word1.compare(0, 4, word2, 0, 4) == 0) {

        cout &lt;&lt; "words are equal" &lt;&lt; endl;
    } else {

        cout &lt;&lt; "words are not equal" &lt;&lt; endl;
    }

    return 0;
}

We compare two words. In the second case, we specify the range of characters to 
compare.

$ ./comparing 
words are not equal
words are equal

## C++ substring

The substr function returns a substring.

substring.cpp
  

#include &lt;iostream&gt;
#include &lt;string&gt;

using std::string;
using std::cout;
using std::endl;

int main() {

    string word = "an old falcon";

    cout &lt;&lt; word.substr(0, 2) &lt;&lt; endl;
    cout &lt;&lt; word.substr(3, 3) &lt;&lt; endl;
    cout &lt;&lt; word.substr(7, 6) &lt;&lt; endl;

    return 0;
}

We get three substrings of the initial string.

$ ./substring 
an
old
falcon

## C++ string loop

We can use while and for loops to go over a string.

looping.cpp
  

#include &lt;iostream&gt;

using std::cout;
using std::endl;
using std::string;

int main() {

    string msg = "an old falcon";

    int i = 0;

    while (i &lt; msg.size()) {

        cout &lt;&lt; msg[i] &lt;&lt; " ";
        i++;
    }

    cout &lt;&lt; endl;

    for (const auto &amp;c : msg) {

        cout &lt;&lt; c &lt;&lt; " ";
    }

    cout &lt;&lt; endl;

    for (auto it = msg.begin(); it != msg.end(); it++) {

        cout &lt;&lt; *it &lt;&lt; " ";
    }

    cout &lt;&lt; endl;

    for (string::size_type i = 0; i &lt; msg.size(); i++) {
        std::cout &lt;&lt; msg.at(i) &lt;&lt; " ";
    }

    cout &lt;&lt; endl;

    return 0;
}

We loop over a string and print its characters. We use the classic while and 
for loops and the for-range loop.

$ ./looping 
a n   o l d   f a l c o n 
a n   o l d   f a l c o n 
a n   o l d   f a l c o n 
a n   o l d   f a l c o n 

## C++ string find/rfind

The find searches the string for the first occurrence of the
specified string while the rfind searches for the last occurrence.

finding.cpp
  

#include &lt;iostream&gt;

using std::string;
using std::cout;
using std::endl;

int main() {

    string text = "I saw a red fox yesterday; a red old fox.";

    int pos1 = text.find("fox");
    int pos2 = text.rfind("fox");
    int pos3 = text.find("fox", 15);

    cout &lt;&lt; pos1 &lt;&lt; endl;
    cout &lt;&lt; pos2 &lt;&lt; endl;
    cout &lt;&lt; pos3 &lt;&lt; endl;

    return 0;
}

We use the find and rfind methods to look for the 
"fox" string. The methods return the indexes of the character positions.

int pos3 = text.find("fox", 15);

The overloaded find method specifies the position where the search
starts.

$ ./finding 
12
37
37

## C++ read file

In the following example, we read a text file.

words.txt
  

wind
sky
blue
water
falcon
rock
wood
cup
cloud
war

We have a list of words in the file.

read_file.cpp
  

#include &lt;iostream&gt;
#include &lt;fstream&gt;
#include &lt;string&gt;

using std::string;
using std::cout;
using std::cerr;
using std::endl;
using std::getline;
using std::ifstream;

int main() {

    ifstream filename("words.txt");

    if (filename.is_open()) {

        string line;
        while (getline(filename, line)) {

            cout &lt;&lt; line &lt;&lt; endl;
        }

        filename.close();
    } else {
        cerr &lt;&lt; "Unable to open file";
    }

    return 0;
}

We read a file line by line and print each line to the console.

$ ./read_file 
wind
sky
blue
water
falcon
rock
wood
cup
cloud
war

## C++ string starts_with

The starts_with method checks if the string starts with the given
prefix. The method was included in C++20.

starts_with.cpp
  

#include &lt;iostream&gt;
#include &lt;fstream&gt;

using std::string;
using std::cout;
using std::cerr;
using std::endl;
using std::getline;
using std::ifstream;

int main() {

    ifstream filename("words.txt");

    if (filename.is_open()) {

        string line;
        while (getline(filename, line)) {

            if (line.starts_with('w')) {
                cout &lt;&lt; line &lt;&lt; endl;
            }
        }

        filename.close();
    } else {
        cerr &lt;&lt; "Unable to open file";
    }

    return 0;
}

We read the words from the words.txt file and print those that 
start with 'w'.

$ ./starts_with 
wind
water
wood
war

## C++ string ends_with

The ends_with method checks if the string ends with the given
suffix. The method was included in C++20.

ends_with.cpp
  

#include &lt;iostream&gt;
#include &lt;sstream&gt;

using std::string;
using std::cout;
using std::endl;
using std::getline;
using std::istringstream;

int main() {

    string words = "wind\nsky\blue\nwater\nfalcon\nrock\nwood\ncup\ncloud\nwar";
    istringstream data(words);

    for (string line; getline(data, line);) {

        if (line.ends_with('d')) {
            cout &lt;&lt; line &lt;&lt; endl;
        }
    }

    return 0;
}

We have a large string of words delimited by newline characters. We transform
the string to a stream and read the words with getline. We print
those that end with 'd'.

$ ./ends_with 
wind
wood
cloud

In this article, we have worked with strings in C++.