+++
title = "Matplotlib Bar Charts"
date = 2025-08-29T20:03:34.027+01:00
draft = false
description = "Python tutorial on Matplotlib bar charts, covering basic and advanced bar charts with practical examples."
image = ""
imageBig = ""
categories = ["matplotlib"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Matplotlib Bar Charts

last modified February 25, 2025

Matplotlib is a powerful Python library for creating static, animated, and
interactive visualizations. Bar charts are one of the most common types of
charts used to compare categorical data. This tutorial covers how to create
various types of bar charts using Matplotlib.

Bar charts are ideal for visualizing discrete data, such as counts or
percentages across categories. Matplotlib provides a flexible and easy-to-use
interface for creating bar charts with customizations.

## Basic Bar Chart

This example demonstrates how to create a basic bar chart.

basic_bar_chart.py
  

import matplotlib.pyplot as plt

# Data
categories = ['A', 'B', 'C', 'D']
values = [10, 20, 15, 25]

# Create a bar chart
plt.bar(categories, values)

# Add labels and title
plt.xlabel("Categories")
plt.ylabel("Values")
plt.title("Basic Bar Chart")

# Display the chart
plt.show()

The plt.bar() function is used to create a bar chart. The
plt.show() function displays the chart.

## Horizontal Bar Chart

This example shows how to create a horizontal bar chart.

horizontal_bar_chart.py
  

import matplotlib.pyplot as plt

# Data
categories = ['A', 'B', 'C', 'D']
values = [10, 20, 15, 25]

# Create a horizontal bar chart
plt.barh(categories, values)

# Add labels and title
plt.xlabel("Values")
plt.ylabel("Categories")
plt.title("Horizontal Bar Chart")

# Display the chart
plt.show()

The plt.barh() function is used to create a horizontal bar chart.

## Grouped Bar Chart

This example demonstrates how to create a grouped bar chart.

grouped_bar_chart.py
  

import matplotlib.pyplot as plt
import numpy as np

# Data
categories = ['A', 'B', 'C', 'D']
values1 = [10, 20, 15, 25]
values2 = [15, 25, 20, 30]

# Set the width of the bars
bar_width = 0.35

# Create positions for the bars
x = np.arange(len(categories))

# Create grouped bars
plt.bar(x - bar_width/2, values1, width=bar_width, label="Group 1")
plt.bar(x + bar_width/2, values2, width=bar_width, label="Group 2")

# Add labels, title, and legend
plt.xlabel("Categories")
plt.ylabel("Values")
plt.title("Grouped Bar Chart")
plt.xticks(x, categories)
plt.legend()

# Display the chart
plt.show()

The np.arange() function is used to create positions for the bars.
The width parameter controls the width of the bars.

## Stacked Bar Chart

This example shows how to create a stacked bar chart.

stacked_bar_chart.py
  

import matplotlib.pyplot as plt

# Data
categories = ['A', 'B', 'C', 'D']
values1 = [10, 20, 15, 25]
values2 = [15, 25, 20, 30]

# Create stacked bars
plt.bar(categories, values1, label="Group 1")
plt.bar(categories, values2, bottom=values1, label="Group 2")

# Add labels, title, and legend
plt.xlabel("Categories")
plt.ylabel("Values")
plt.title("Stacked Bar Chart")
plt.legend()

# Display the chart
plt.show()

The bottom parameter is used to stack the second group of bars on
top of the first group.

## Customizing Bar Charts

This example demonstrates how to customize bar charts with colors, edge colors,
and patterns.

custom_bar_chart.py
  

import matplotlib.pyplot as plt

# Data
categories = ['A', 'B', 'C', 'D']
values = [10, 20, 15, 25]

# Create a bar chart with custom styles
plt.bar(categories, values, color="skyblue", edgecolor="black", hatch="/")

# Add labels and title
plt.xlabel("Categories")
plt.ylabel("Values")
plt.title("Custom Bar Chart")

# Display the chart
plt.show()

The color, edgecolor, and hatch
parameters are used to customize the appearance of the bars.

## Best Practices for Bar Charts

- **Label Axes Clearly:** Always label the X and Y axes to make the chart understandable.

- **Use Legends:** Add legends when plotting multiple groups to differentiate them.

- **Choose Appropriate Colors:** Use contrasting colors for multiple groups to improve readability.

- **Limit Categories:** Avoid cluttering the chart with too many categories.

## Source

[Matplotlib Bar Chart Documentation](https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.bar.html)

In this article, we have explored various types of bar charts using Matplotlib,
including basic, horizontal, grouped, stacked, and custom bar charts.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/all/#python).