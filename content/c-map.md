+++
title = "C++ map"
date = 2025-08-29T19:50:23.683+01:00
draft = false
description = "C++ map tutorial shows how to work with a map container in C++. A map is a container which stores key/value pairs."
image = ""
imageBig = ""
categories = ["cpp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C++ map

last modified January 9, 2023

C++ map tutorial shows how to work with a map container in C++.

A map is a container which stores key/value pairs. A map is called an 
associative container, dictionary, or hash in other programming langauges.

Values in maps are referenced by their key and not by their absolute position in
the container. The keys in a map are unique.

## C++ map simple example

The following example shows some simple operations with a map.

simple.cpp
  

#include &lt;iostream&gt;
#include &lt;map&gt;

using std::string;
using std::map;
using std::endl;
using std::cout;

int main() {

    map&lt;int, string&gt; stones {
      {1, "citrine"},
      {2, "garnet"},
      {3, "topaz"},
      {4, "opal"},
      {5, "ametyst"}
    };

    cout &lt;&lt; stones.size() &lt;&lt; endl;

    stones.insert({6, "spinel"});

    cout &lt;&lt; stones.size() &lt;&lt; endl;

    for (const auto&amp; stone: stones) {

      cout &lt;&lt; stone.first &lt;&lt; ": " &lt;&lt; stone.second &lt;&lt; endl;
    }

    stones.clear();

    cout &lt;&lt; stones.size() &lt;&lt; endl;
}

We define a map of stones. 

map&lt;int, string&gt; stones {
    {1, "citrine"},
    {2, "garnet"},
    {3, "topaz"},
    {4, "opal"},
    {5, "ametyst"}
};

In the stones map, the keys are integers and the values are
strings.

cout &lt;&lt; stones.size() &lt;&lt; endl;

We get the size of the map with the size method.

stones.insert({6, "spinel"});

A new stone is inserted with the insert method.

for (const auto&amp; stone: stones) {

    cout &lt;&lt; stone.first &lt;&lt; ": " &lt;&lt; stone.second &lt;&lt; endl;
}

We loop over the map with for-range loop.

stones.clear();

All pairs are removed with clear.

$ ./simple 
5
6
1: citrine
2: garnet
3: topaz
4: opal
5: ametyst
6: spinel
0

## C++ map access elements

Values are accessed by their keys via [] operator or
at method. Accessing a key which does not exist throws an
exception.

access.cpp
  

#include &lt;iostream&gt;
#include &lt;map&gt;

using std::string;
using std::map;
using std::endl;
using std::cout;

int main() {

    map&lt;int, string&gt; stones {
      {1, "citrine"},
      {2, "garnet"},
      {3, "topaz"},
      {4, "opal"},
      {5, "ametyst"}
    };

    cout &lt;&lt; stones.at(1) &lt;&lt; endl;
    cout &lt;&lt; stones[4] &lt;&lt; endl;
}

We access two values from the stones map with []
and at.

$ ./access 
citrine
opal

## C++ map update elements

The following example updates values.

updating.cpp
  

#include &lt;iostream&gt;
#include &lt;map&gt;

using std::string;
using std::map;
using std::endl;
using std::cout;

int main() {

    map&lt;int, string&gt; words {
      {1, "sky"},
      {2, "blue"},
      {3, "cup"},
      {4, "nice"},
    };

    words[1] = "skylark";
    words.at(2) = "blues";

    for (const auto &amp;word : words) {

        cout &lt;&lt; "[" &lt;&lt; word.first &lt;&lt; ", " &lt;&lt; word.second &lt;&lt; "]" &lt;&lt; endl;
    }
}

We update values of two pairs in the map using the assignment operator.

$ ./updating 
[1, skylark]
[2, blues]
[3, cup]
[4, nice]

## C++ map erasing element

An element is deleted from a map with the erase method.

erasing.cpp
  

#include &lt;iostream&gt;
#include &lt;map&gt;

using std::string;
using std::map;
using std::endl;
using std::cout;

int main() {

    map&lt;int, string&gt; stones {
      {1, "citrine"},
      {2, "garnet"},
      {3, "topaz"},
      {4, "opal"},
      {5, "ametyst"}
    };

    stones.erase(4);

    for (const auto&amp; stone: stones) {

      cout &lt;&lt; stone.first &lt;&lt; ": " &lt;&lt; stone.second &lt;&lt; endl;
    }
}

We delete a pair which has key 4.

$ ./erasing 
1: citrine
2: garnet
3: topaz
5: ametyst

## C++ map erase_if

The erase_if method deletes all elements for which the given
predicate returns true. The method was introduced in C++20.

erase_if.cpp
  

#include &lt;iostream&gt;
#include &lt;map&gt;

using std::string;
using std::map;
using std::endl;
using std::cout;

int main() {
  
    map&lt;int, string&gt; words {
      {1, "sky"},
      {2, "blue"},
      {3, "cup"},
      {4, "nice"},
      {5, "tall"},
      {6, "car"},
      {7, "top"}
    };

    erase_if(words, [](const auto&amp; e) {
        return (e.second.size() == 3);
    });

    for (const auto &amp;word : words) {

        cout &lt;&lt; "[" &lt;&lt; word.first &lt;&lt; ", " &lt;&lt; word.second &lt;&lt; "]" &lt;&lt; endl;
    }
}

In the example, we remove all words from the map that have three characters.

$ clang++ erase_if.cpp -o erase_if -std=c++20
$ ./erase_if 
[2, blue]
[4, nice]
[5, tall]

## C++ map merge

The merge method merges two maps. The method was introduced in 
C++20.

merging.cpp
  

#include &lt;iostream&gt;
#include &lt;map&gt;

using std::string;
using std::map;
using std::endl;
using std::cout;

int main() {

    map&lt;int, string&gt; words {
      {1, "sky"},
      {2, "blue"},
      {3, "cup"}
    };

    map&lt;int, string&gt; words2 {
      {4, "nice"},
      {5, "tall"},
      {6, "car"},
      {7, "top"}
    };

    words.merge(words2);

    for (const auto &amp;word : words) {

        cout &lt;&lt; "[" &lt;&lt; word.first &lt;&lt; ", " &lt;&lt; word.second &lt;&lt; "]" &lt;&lt; endl;
    }
}

We merge two maps of words.

$ ./merging 
[1, sky]
[2, blue]
[3, cup]
[4, nice]
[5, tall]
[6, car]
[7, top]

## C++ map contains

The contains method checks if there is an element with the
specified key. 

contains.cpp
  

#include &lt;iostream&gt;
#include &lt;map&gt;

using std::string;
using std::map;
using std::endl;
using std::cout;

int main()
{
    map&lt;int, string&gt; stones {
      {1, "citrine"},
      {2, "garnet"},
      {3, "topaz"},
      {4, "opal"},
      {5, "ametyst"}
    };

    for (int x: {2, 3, 7}) {
        if (stones.contains(x)) {
            cout &lt;&lt; x &lt;&lt; ": found" &lt;&lt; endl;
        } else {
            cout &lt;&lt; x &lt;&lt; ": not found" &lt;&lt; endl;
        }
    }
}

The contains method was introduced in C++20.

$ clang++ contains.cpp -o contains -std=c++20
$ ./contains 
2: found
3: found
7: not found

## C++ map loop with while

The following example iterates over a map with while loop.

while_loop.cpp
  

#include &lt;iostream&gt;
#include &lt;map&gt;

using std::cout;
using std::endl;
using std::string;
using std::map;

int main() {

    map&lt;int, string&gt; stones {
      {1, "citrine"},
      {2, "garnet"},
      {3, "topaz"},
      {4, "opal"},
      {5, "ametyst"}
    };

    auto it = stones.cbegin();

    while (it != stones.cend()) {

        cout &lt;&lt; "[" &lt;&lt; it-&gt;first &lt;&lt; ", "
                    &lt;&lt; it-&gt;second &lt;&lt; "]\n";
        it++;
    }

    cout &lt;&lt; endl;

    return 0;
}

The cbegin returns const iterator to the beginning and the 
cend to the end of the map.

$ ./while_loop 
[1, citrine]
[2, garnet]
[3, topaz]
[4, opal]
[5, ametyst]

## C++ map loop with classic for

The following example loops over a map with the classic for form.

classic_for.cpp
  

#include &lt;iostream&gt;
#include &lt;map&gt;

using std::cout;
using std::endl;
using std::string;
using std::map;

int main() {

    map&lt;int, string&gt; stones {
      {1, "citrine"},
      {2, "garnet"},
      {3, "topaz"},
      {4, "opal"},
      {5, "ametyst"}
    };

    for (auto it = stones.cbegin(); it != stones.cend(); it++) {

        cout &lt;&lt; "[" &lt;&lt; it-&gt;first &lt;&lt; ", "
                    &lt;&lt; it-&gt;second &lt;&lt; "]"
                    &lt;&lt; endl;
    }

    cout &lt;&lt; endl;

    return 0;
}

We iterate over stones in the map with classic for loop.

## C++ map loop with for range

The following example loops over map elements with for-range loop.

for_range.cpp
  

#include &lt;iostream&gt;
#include &lt;map&gt;

using std::cout;
using std::endl;
using std::string;
using std::map;

int main() {

    map&lt;int, string&gt; stones {
      {1, "citrine"},
      {2, "garnet"},
      {3, "topaz"},
      {4, "opal"},
      {5, "ametyst"}
    };

    for (const auto &amp;stone : stones) {

        cout &lt;&lt; "[" &lt;&lt; stone.first &lt;&lt; ", " &lt;&lt; stone.second &lt;&lt; "]\n";
    }

    cout &lt;&lt; endl;

    return 0;
}

For-range loop was introduced in C++11.

The next example presents another for-range form.

for_range2.cpp
  

#include &lt;iostream&gt;
#include &lt;map&gt;

using std::cout;
using std::endl;
using std::string;
using std::map;

int main() {

    map&lt;int, string&gt; stones {
      {1, "citrine"},
      {2, "garnet"},
      {3, "topaz"},
      {4, "opal"},
      {5, "ametyst"}
    };

    // decomposition C++17
    for (const auto&amp; [key, value] : stones) {

        cout &lt;&lt; "[" &lt;&lt; key &lt;&lt; ", " &lt;&lt; value &lt;&lt; "]\n";
    }

    cout &lt;&lt; endl;

    return 0;
}

The decomposition operation used in this example was introduced in C++17.

In this article, we have worked with the map container in C++.