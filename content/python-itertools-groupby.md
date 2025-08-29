+++
title = "Python itertools groupby"
date = 2025-08-29T20:08:37.391+01:00
draft = false
description = "Python tutorial on the itertools groupby function, covering how to group data with practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python itertools groupby

last modified February 25, 2025

The groupby function from Python's itertools module is
used to group data based on a key function. It is particularly useful for
grouping sorted data into meaningful categories. This tutorial covers how to use
groupby with practical examples.

The groupby function requires the data to be sorted by the same key
that will be used for grouping. It returns an iterator that produces consecutive
keys and groups from the iterable.

## Basic Grouping

This example demonstrates how to group data by a single key.

basic_groupby.py
  

from itertools import groupby

# Dataset
data = [
    {'Adventurer': 'Lara', 'Region': 'Forest', 'Treasure': 'Gems', 'Quantity': 5, 'Danger_Level': 'Medium'},
    {'Adventurer': 'Indy', 'Region': 'Desert', 'Treasure': 'Gold', 'Quantity': 10, 'Danger_Level': 'High'},
    {'Adventurer': 'Nathan', 'Region': 'Mountain', 'Treasure': 'Relics', 'Quantity': 3, 'Danger_Level': 'Low'},
    {'Adventurer': 'Lara', 'Region': 'Mountain', 'Treasure': 'Relics', 'Quantity': 8, 'Danger_Level': 'High'},
    {'Adventurer': 'Indy', 'Region': 'Desert', 'Treasure': 'Gold', 'Quantity': 15, 'Danger_Level': 'High'},
    {'Adventurer': 'Nathan', 'Region': 'Forest', 'Treasure': 'Gems', 'Quantity': 4, 'Danger_Level': 'Medium'},
    {'Adventurer': 'Elena', 'Region': 'Mountain', 'Treasure': 'Relics', 'Quantity': 6, 'Danger_Level': 'Low'},
    {'Adventurer': 'Lara', 'Region': 'Desert', 'Treasure': 'Gold', 'Quantity': 12, 'Danger_Level': 'Medium'}
]

# Sort data by Adventurer
data.sort(key=lambda x: x["Adventurer"])

# Group by Adventurer
for key, group in groupby(data, key=lambda x: x["Adventurer"]):
    print(f"Adventurer: {key}")
    for item in group:
        print(item)
    print()

The groupby function groups the data by the Adventurer
key. The data is first sorted by the same key to ensure proper grouping.

## Grouping by Multiple Keys

This example demonstrates how to group data by multiple keys.

groupby_multiple_keys.py
  

from itertools import groupby
from operator import itemgetter

# Dataset
data = [
    {'Adventurer': 'Lara', 'Region': 'Forest', 'Treasure': 'Gems', 'Quantity': 5, 'Danger_Level': 'Medium'},
    {'Adventurer': 'Indy', 'Region': 'Desert', 'Treasure': 'Gold', 'Quantity': 10, 'Danger_Level': 'High'},
    {'Adventurer': 'Nathan', 'Region': 'Mountain', 'Treasure': 'Relics', 'Quantity': 3, 'Danger_Level': 'Low'},
    {'Adventurer': 'Lara', 'Region': 'Mountain', 'Treasure': 'Relics', 'Quantity': 8, 'Danger_Level': 'High'},
    {'Adventurer': 'Indy', 'Region': 'Desert', 'Treasure': 'Gold', 'Quantity': 15, 'Danger_Level': 'High'},
    {'Adventurer': 'Nathan', 'Region': 'Forest', 'Treasure': 'Gems', 'Quantity': 4, 'Danger_Level': 'Medium'},
    {'Adventurer': 'Elena', 'Region': 'Mountain', 'Treasure': 'Relics', 'Quantity': 6, 'Danger_Level': 'Low'},
    {'Adventurer': 'Lara', 'Region': 'Desert', 'Treasure': 'Gold', 'Quantity': 12, 'Danger_Level': 'Medium'}
]

# Sort data by Region and Danger_Level
data.sort(key=itemgetter("Region", "Danger_Level"))

# Group by Region and Danger_Level
for key, group in groupby(data, key=itemgetter("Region", "Danger_Level")):
    print(f"Region: {key[0]}, Danger Level: {key[1]}")
    for item in group:
        print(item)
    print()

The groupby function groups the items in the dataset based on the
specified key. The for loop iterates over each group, where each group consists
of a key and an iterator over the items in that group. Inside the loop, t he
data by the Adventurer key. The data is first sorted by the same
key to ensure proper grouping.

## Aggregating Grouped Data

This example demonstrates how to aggregate data within each group.

aggregate_groupby.py
  

from itertools import groupby

# Dataset
data = [
    {'Adventurer': 'Lara', 'Region': 'Forest', 'Treasure': 'Gems', 'Quantity': 5, 'Danger_Level': 'Medium'},
    {'Adventurer': 'Indy', 'Region': 'Desert', 'Treasure': 'Gold', 'Quantity': 10, 'Danger_Level': 'High'},
    {'Adventurer': 'Nathan', 'Region': 'Mountain', 'Treasure': 'Relics', 'Quantity': 3, 'Danger_Level': 'Low'},
    {'Adventurer': 'Lara', 'Region': 'Mountain', 'Treasure': 'Relics', 'Quantity': 8, 'Danger_Level': 'High'},
    {'Adventurer': 'Indy', 'Region': 'Desert', 'Treasure': 'Gold', 'Quantity': 15, 'Danger_Level': 'High'},
    {'Adventurer': 'Nathan', 'Region': 'Forest', 'Treasure': 'Gems', 'Quantity': 4, 'Danger_Level': 'Medium'},
    {'Adventurer': 'Elena', 'Region': 'Mountain', 'Treasure': 'Relics', 'Quantity': 6, 'Danger_Level': 'Low'},
    {'Adventurer': 'Lara', 'Region': 'Desert', 'Treasure': 'Gold', 'Quantity': 12, 'Danger_Level': 'Medium'}
]

# Sort data by Treasure
data.sort(key=lambda x: x["Treasure"])

# Group by Treasure and calculate total Quantity
for key, group in groupby(data, key=lambda x: x["Treasure"]):
    total_quantity = sum(item["Quantity"] for item in group)
    print(f"Treasure: {key}, Total Quantity: {total_quantity}")

The groupby function groups the data by Treasure, and
the total quantity for each treasure type is calculated using the
sum function.

## Best Practices for Using groupby

- **Sort Data First:** Always sort the data by the same key used for grouping.

- **Use itemgetter for Multiple Keys:** The itemgetter function simplifies sorting and grouping by multiple keys.

- **Avoid Large Datasets:** For very large datasets, consider using libraries like pandas for better performance.

- **Aggregate Data Efficiently:** Use built-in functions like sum, max, or min to aggregate grouped data.

## Source

[Python itertools groupby Documentation](https://docs.python.org/3/library/itertools.html#itertools.groupby)

In this article, we have explored how to use the groupby function
from Python's itertools module to group and aggregate data.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).