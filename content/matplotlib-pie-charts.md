+++
title = "Matplotlib Pie Charts"
date = 2025-08-29T20:03:35.167+01:00
draft = false
description = "Python tutorial on Matplotlib pie charts, covering basic and advanced pie charts with practical examples."
image = ""
imageBig = ""
categories = ["matplotlib"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Matplotlib Pie Charts

last modified February 25, 2025

Matplotlib is a powerful Python library for creating static, animated, and
interactive visualizations. Pie charts are used to visualize the proportion of
categories in a dataset. This tutorial covers how to create various types of
pie charts using Matplotlib.

Pie charts are ideal for showing the relative sizes of categories as parts of a
whole. Matplotlib provides a flexible and easy-to-use interface for creating
pie charts with customizations.

## Basic Pie Chart

This example demonstrates how to create a basic pie chart.

basic_pie_chart.py
  

import matplotlib.pyplot as plt

# Data
labels = ['A', 'B', 'C', 'D']
sizes = [15, 30, 45, 10]

# Create a pie chart
plt.pie(sizes, labels=labels)

# Add a title
plt.title("Basic Pie Chart")

# Display the chart
plt.show()

The plt.pie() function is used to create a pie chart. The
labels parameter assigns labels to each slice.

## Customizing Pie Charts

This example demonstrates how to customize pie charts with colors, explode, and
shadow effects.

custom_pie_chart.py
  

import matplotlib.pyplot as plt

# Data
labels = ['A', 'B', 'C', 'D']
sizes = [15, 30, 45, 10]
colors = ['gold', 'lightcoral', 'lightskyblue', 'lightgreen']
explode = (0.1, 0, 0, 0)  # "Explode" the first slice

# Create a pie chart with custom styles
plt.pie(sizes, explode=explode, labels=labels, colors=colors,
        shadow=True, startangle=90)

# Add a title
plt.title("Custom Pie Chart")

# Display the chart
plt.show()

The explode, colors, shadow, and
startangle parameters are used to customize the appearance of the
pie chart.

## Pie Chart with Percentages

This example shows how to display percentages on each slice of the pie chart.

pie_chart_with_percentages.py
  

import matplotlib.pyplot as plt

# Data
labels = ['A', 'B', 'C', 'D']
sizes = [15, 30, 45, 10]

# Create a pie chart with percentages
plt.pie(sizes, labels=labels, autopct='%1.1f%%')

# Add a title
plt.title("Pie Chart with Percentages")

# Display the chart
plt.show()

The autopct parameter is used to display percentages on each slice.

## Donut Chart

This example demonstrates how to create a donut chart.

donut_chart.py
  

import matplotlib.pyplot as plt

# Data
labels = ['A', 'B', 'C', 'D']
sizes = [15, 30, 45, 10]

# Create a pie chart
plt.pie(sizes, labels=labels, startangle=90)

# Draw a circle at the center to create a donut chart
centre_circle = plt.Circle((0, 0), 0.7, color='white')
fig = plt.gcf()
fig.gca().add_artist(centre_circle)

# Add a title
plt.title("Donut Chart")

# Display the chart
plt.show()

The plt.Circle() function is used to draw a white circle at the
center of the pie chart, creating a donut chart.

## Nested Pie Chart

This example demonstrates how to create a nested pie chart.

nested_pie_chart.py
  

import matplotlib.pyplot as plt

# Data for the outer pie
outer_labels = ['A', 'B', 'C', 'D']
outer_sizes = [15, 30, 45, 10]

# Data for the inner pie
inner_labels = ['X', 'Y', 'Z']
inner_sizes = [25, 35, 40]

# Create the outer pie chart
plt.pie(outer_sizes, labels=outer_labels, radius=1.2,
        wedgeprops=dict(width=0.3, edgecolor='w'))

# Create the inner pie chart
plt.pie(inner_sizes, labels=inner_labels, radius=0.8,
        wedgeprops=dict(width=0.4, edgecolor='w'))

# Add a title
plt.title("Nested Pie Chart")

# Display the chart
plt.show()

The radius and wedgeprops parameters are used to
create a nested pie chart.

## Best Practices for Pie Charts

- **Limit Categories:** Use pie charts for datasets with a small number of categories.

- **Use Percentages:** Display percentages to make the chart easier to interpret.

- **Avoid Overlapping Labels:** Ensure labels do not overlap by adjusting the chart size or using legends.

- **Use Explode for Emphasis:** Use the explode parameter to highlight specific slices.

## Source

[Matplotlib Pie Chart Documentation](https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.pie.html)

In this article, we have explored various types of pie charts using Matplotlib,
including basic, customized, donut, and nested pie charts.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/all/#python).