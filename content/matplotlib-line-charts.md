+++
title = "Matplotlib Line Charts"
date = 2025-08-29T20:03:35.156+01:00
draft = false
description = "Python tutorial on Matplotlib line charts, covering basic and advanced line charts with practical examples."
image = ""
imageBig = ""
categories = ["matplotlib"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Matplotlib Line Charts

last modified February 25, 2025

Matplotlib is a powerful Python library for creating static, animated, and
interactive visualizations. Line charts are one of the most common types of
charts used to display data trends over time. This tutorial covers how to create
various types of line charts using Matplotlib.

Line charts are ideal for visualizing continuous data, such as time series or
trends. Matplotlib provides a flexible and easy-to-use interface for creating
line charts with customizations.

## Basic Line Chart

This example demonstrates how to create a basic line chart.

basic_line_chart.py
  

import matplotlib.pyplot as plt

# Data
x = [1, 2, 3, 4, 5]
y = [2, 3, 5, 7, 11]

# Create a line chart
plt.plot(x, y)

# Add labels and title
plt.xlabel("X-axis")
plt.ylabel("Y-axis")
plt.title("Basic Line Chart")

# Display the chart
plt.show()

The plt.plot function is used to create a line chart. The
plt.show function displays the chart.

## Multiple Lines in a Single Chart

This example shows how to plot multiple lines in a single chart.

multiple_lines.py
  

import matplotlib.pyplot as plt

# Data
x = [1, 2, 3, 4, 5]
y1 = [2, 3, 5, 7, 11]
y2 = [1, 4, 6, 8, 10]

# Create multiple lines
plt.plot(x, y1, label="Line 1")
plt.plot(x, y2, label="Line 2")

# Add labels, title, and legend
plt.xlabel("X-axis")
plt.ylabel("Y-axis")
plt.title("Multiple Lines in a Single Chart")
plt.legend()

# Display the chart
plt.show()

The label parameter is used to differentiate between lines. The
plt.legend function adds a legend to the chart.

## Customizing Line Styles

This example demonstrates how to customize line styles, colors, and markers.

custom_line_styles.py
  

import matplotlib.pyplot as plt

# Data
x = [1, 2, 3, 4, 5]
y = [2, 3, 5, 7, 11]

# Create a line chart with custom styles
plt.plot(x, y, linestyle="--", color="green", marker="o", label="Custom Line")

# Add labels, title, and legend
plt.xlabel("X-axis")
plt.ylabel("Y-axis")
plt.title("Custom Line Styles")
plt.legend()

# Display the chart
plt.show()

The linestyle, color, and marker
parameters are used to customize the line's appearance.

## Curved line chart

This example creates a smooth, curved line chart -- specifically a sine wave --
which is often used to represent continuous, periodic data like sound waves,
electrical signals, or cyclical behavior in physics and engineering. 

curved_line_chart.py
  

import numpy as np
import matplotlib.pyplot as plt

t = np.arange(0.0, 3.0, 0.01)
s = np.sin(2.5 * np.pi * t)
plt.plot(t, s)
 
plt.xlabel('time (s)')
plt.ylabel('voltage (mV)')

plt.title('Sine Wave')
plt.grid(True)

plt.savefig('linechart.png')

This example creates a smooth, curved line chart representing a sine wave, often
used to model periodic phenomena like sound waves or electrical signals. Using
numpy, we generate an array t for time values from 0
to 3 seconds in 0.01-second increments, and s calculates the
voltage as a sine wave with a frequency of 2.5 oscillations over 3 seconds. The
plt.plot function draws the wave, while labels, a title, and a
grid make the chart easy to read. Finally, the chart is saved as an image file
called linechart.png for future use.

## Stacked Line Chart

The example visualizes the monthly revenue of two product lines in a company
over a year.

stacked_line_chart.py
  

import matplotlib.pyplot as plt

# Months
months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

# Monthly revenue for two product lines (in $1000s)
product_a = [12, 14, 15, 18, 20, 22, 21, 23, 25, 27, 30, 32]
product_b = [8, 9, 10, 12, 14, 15, 17, 18, 19, 20, 22, 24]

# Total revenue (stacked on top of product A)
total_revenue = [a + b for a, b in zip(product_a, product_b)]

# Plotting revenue for both products
plt.plot(months, product_a, marker='o', label="Product A Revenue")
plt.plot(months, total_revenue, marker='o', label="Total Revenue (A + B)")

# Labels and title
plt.xlabel("Month")
plt.ylabel("Revenue ($1000s)")
plt.title("Monthly Revenue for Product Lines")
plt.legend()

# Display the chart
plt.show()

The total_revenue stacks product_b on top of
product_a.

## Area Chart

This example demonstrates how to create an area chart.

area_chart.py
  

import matplotlib.pyplot as plt

# Data
x = [1, 2, 3, 4, 5]
y = [2, 3, 5, 7, 11]

# Create an area chart
plt.fill_between(x, y, color="skyblue", alpha=0.4)
plt.plot(x, y, color="blue", label="Line")

# Add labels, title, and legend
plt.xlabel("X-axis")
plt.ylabel("Y-axis")
plt.title("Area Chart")
plt.legend()

# Display the chart
plt.show()

The plt.fill_between function is used to fill the area under the
line. The alpha parameter controls the transparency of the fill.

## Step Line Chart

Step charts are great for showing things like price changes over time, inventory
levels, or subscription counts -- anything that stays constant for a while and
then jumps to a new value.

We track monthly subscription count for a service where users join in batches. 

step_line_chart.py
  

import matplotlib.pyplot as plt

# Months
months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

# Subscription count at the end of each month
subscriptions = [100, 150, 150, 200, 250, 300, 300, 350, 400, 400, 450, 500]

# Create a step line chart
plt.step(months, subscriptions, where="mid", label="Subscribers", color="teal")

# Add labels, title, and legend
plt.xlabel("Month")
plt.ylabel("Subscribers")
plt.title("Monthly Subscription Growth")
plt.legend()

# Add grid for clarity
plt.grid(True, linestyle="--", alpha=0.5)

# Display the chart
plt.show()

The plt.step function creates a step line chart. The
where parameter controls the step placement.

On the x-axis, we have the months of the year. On the y-axis, we have
subscription count, which is an example of something that often changes in steps
rather than continuously. The where="mid" makes the step shifts
more visually clear.

## Best Practices for Line Charts

- **Label Axes Clearly:** Always label the X and Y axes to make the chart understandable.

- **Use Legends:** Add legends when plotting multiple lines to differentiate them.

- **Choose Appropriate Colors:** Use contrasting colors for multiple lines to improve readability.

- **Limit Data Points:** Avoid cluttering the chart with too many data points.

## Source

[Matplotlib Line Chart Documentation](https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.plot.html)

In this article, we have explored various types of line charts using Matplotlib,
including basic, multiple, stacked, area, and step line charts.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/all/#python).