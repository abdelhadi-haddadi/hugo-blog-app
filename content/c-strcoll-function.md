+++
title = "C strcoll function"
date = 2025-08-29T19:50:08.319+01:00
draft = false
description = "Learn locale-aware string comparison in C with this comprehensive strcoll tutorial. Explore usage, practical examples, and best practices for international string operations."
image = ""
imageBig = ""
categories = ["clang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C strcoll function

last modified April 8, 2025

String comparison is fundamental in C programming, and strcoll
provides locale-aware comparison capabilities. This tutorial covers
strcoll in depth, including its syntax, usage, and locale
dependencies. We'll explore practical examples and discuss when to use it
instead of strcmp. Understanding strcoll helps create
programs that work correctly across different language settings.

## What Is strcoll?

The strcoll function compares two strings according to the current
locale. It's declared in string.h and takes two string pointers.
Unlike strcmp, it respects locale-specific collation rules.
strcoll returns an integer indicating the strings' relationship.
For security, prefer strcoll over strcmp when locale
matters.

## Basic strcoll Usage

This example demonstrates basic string comparison using strcoll.

basic_compare.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;
#include &lt;locale.h&gt;

int main() {
    setlocale(LC_ALL, "");
    const char *str1 = "apple";
    const char *str2 = "banana";

    int result = strcoll(str1, str2);

    if (result &lt; 0) {
        printf("'%s' comes before '%s'\n", str1, str2);
    } else if (result &gt; 0) {
        printf("'%s' comes after '%s'\n", str1, str2);
    } else {
        printf("Strings are equal\n");
    }

    return 0;
}

Here, strcoll compares two strings alphabetically. The
setlocale call initializes the program's locale settings.
The function returns a negative value if str1 comes before str2, zero if
equal, or positive if str1 comes after. This basic example shows the
standard alphabetical comparison behavior.

## Locale-Specific Comparison

This example shows how strcoll behaves differently with various
locales.

locale_compare.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;
#include &lt;locale.h&gt;

int main() {
    const char *str1 = "äbc";
    const char *str2 = "abc";

    // Compare with C locale
    setlocale(LC_ALL, "C");
    printf("C locale: %d\n", strcoll(str1, str2));

    // Compare with German locale
    setlocale(LC_ALL, "de_DE.utf8");
    printf("German locale: %d\n", strcoll(str1, str2));

    return 0;
}

This code demonstrates how locale affects string comparison. In the C locale,
umlauts may sort differently than in German. The German locale properly handles
'ä' as a distinct letter that sorts after 'a'. Always set the appropriate
locale before using strcoll for international text.

## Sorting Strings with strcoll

This example demonstrates sorting an array of strings using strcoll.

string_sort.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;
#include &lt;locale.h&gt;

#define COUNT 5

int compare(const void *a, const void *b) {
    return strcoll(*(const char **)a, *(const char **)b);
}

int main() {
    setlocale(LC_ALL, "");
    const char *words[COUNT] = {"čaj", "auto", "bůh", "dům", "cedr"};

    qsort(words, COUNT, sizeof(char *), compare);

    printf("Sorted words:\n");
    for (int i = 0; i &lt; COUNT; i++) {
        printf("%s\n", words[i]);
    }

    return 0;
}

This code sorts Czech words correctly using strcoll in the
comparison function for qsort. The locale is set to the system
default, which should handle Czech characters properly. The comparison function
casts the void pointers to string pointers before passing them to
strcoll. This approach works for any locale-specific sorting.

## Case-Insensitive Comparison

This example shows how to perform case-insensitive comparison with
strcoll.

case_compare.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;
#include &lt;locale.h&gt;
#include &lt;ctype.h&gt;

int strcasecoll(const char *a, const char *b) {
    char a_lower[256], b_lower[256];
    size_t i;

    for (i = 0; a[i] &amp;&amp; i &lt; sizeof(a_lower) - 1; i++) {
        a_lower[i] = tolower(a[i]);
    }
    a_lower[i] = '\0';

    for (i = 0; b[i] &amp;&amp; i &lt; sizeof(b_lower) - 1; i++) {
        b_lower[i] = tolower(b[i]);
    }
    b_lower[i] = '\0';

    return strcoll(a_lower, b_lower);
}

int main() {
    setlocale(LC_ALL, "");
    const char *str1 = "Zebra";
    const char *str2 = "apple";

    int result = strcasecoll(str1, str2);

    if (result &lt; 0) {
        printf("'%s' comes before '%s'\n", str1, str2);
    } else if (result &gt; 0) {
        printf("'%s' comes after '%s'\n", str1, str2);
    } else {
        printf("Strings are equal\n");
    }

    return 0;
}

This implementation creates a case-insensitive version of strcoll.
It first converts strings to lowercase, then compares them. Buffer sizes are
checked to prevent overflows. Note that this approach may not handle all locale-
specific case conversions perfectly. For production code, consider more robust
solutions.

## Comparing Strings with Numeric Values

This example demonstrates how strcoll handles strings containing
numbers.

numeric_compare.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;
#include &lt;locale.h&gt;

int main() {
    setlocale(LC_ALL, "");
    const char *versions[] = {"file1.txt", "file10.txt", "file2.txt"};
    
    printf("Standard comparison:\n");
    for (int i = 0; i &lt; 2; i++) {
        int res = strcoll(versions[i], versions[i+1]);
        printf("%s vs %s: %d\n", versions[i], versions[i+1], res);
    }

    setlocale(LC_COLLATE, "en_US.utf8");
    printf("\nNumeric-aware comparison:\n");
    for (int i = 0; i &lt; 2; i++) {
        int res = strcoll(versions[i], versions[i+1]);
        printf("%s vs %s: %d\n", versions[i], versions[i+1], res);
    }

    return 0;
}

This code compares filename strings containing numbers. Some locales support
numeric-aware sorting where "file10.txt" comes after "file2.txt". The example
shows both standard and numeric-aware comparison results. Note that numeric
sorting behavior depends on locale support. For reliable numeric sorting,
consider specialized comparison functions.

## Best Practices for Using strcoll

- **Set locale properly:** Always initialize locale before using strcoll.

- **Handle null pointers:** Check strings aren't NULL before comparison.

- **Consider performance:** strcoll can be slower than strcmp.

- **Use for user-facing text:** Prefer strcoll when sorting strings for display.

- **Test with target locales:** Verify behavior with all supported locales.

## Source

[C strcoll Documentation](https://en.cppreference.com/w/c/string/byte/strcoll)

This tutorial has explored the strcoll function, from basic usage to
locale-specific behaviors. For internationalized applications, strcoll
provides correct string comparison according to cultural conventions. Always
consider your application's specific needs when choosing comparison functions.

## Author

My name is Jan Bodnar, and I'm a dedicated programmer with a deep passion for
coding. Since 2007, I've been sharing my expertise through over 1,400 articles
and 8 e-books. With more than a decade of teaching experience, I strive to make
programming accessible and engaging.

List [C Standard Library](/all/#clang-std).