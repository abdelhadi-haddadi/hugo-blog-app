+++
title = "Matplotlib Scatter Charts"
date = 2025-08-29T20:03:36.360+01:00
draft = false
description = "Python tutorial on Matplotlib scatter charts, covering basic and advanced scatter plots with practical examples."
image = ""
imageBig = ""
categories = ["matplotlib"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Matplotlib Scatter Charts

last modified February 25, 2025

Matplotlib is a powerful Python library for creating static, animated, and
interactive visualizations. Scatter charts are used to visualize the relationship
between two variables. This tutorial covers how to create various types of
scatter charts using Matplotlib.

Scatter charts are ideal for identifying trends, correlations, and outliers in
data. Matplotlib provides a flexible and easy-to-use interface for creating
scatter charts with customizations.

## Basic Scatter Chart

This example demonstrates how to create a basic scatter chart.

basic_scatter_chart.py
  

import matplotlib.pyplot as plt

# Data
x = [1, 2, 3, 4, 5]
y = [2, 3, 5, 7, 11]

# Create a scatter chart
plt.scatter(x, y)

# Add labels and title
plt.xlabel("X-axis")
plt.ylabel("Y-axis")
plt.title("Basic Scatter Chart")

# Display the chart
plt.show()

The plt.scatter() function is used to create a scatter chart. The
plt.show() function displays the chart.

## Customizing Scatter Charts

This example demonstrates how to customize scatter charts with colors, sizes, and
markers.

custom_scatter_chart.py
  

import matplotlib.pyplot as plt

# Data
x = [1, 2, 3, 4, 5]
y = [2, 3, 5, 7, 11]
sizes = [100, 200, 300, 400, 500]  # Marker sizes
colors = ['red', 'green', 'blue', 'purple', 'orange']  # Marker colors

# Create a scatter chart with custom styles
plt.scatter(x, y, s=sizes, c=colors, alpha=0.6, edgecolors="black")

# Add labels and title
plt.xlabel("X-axis")
plt.ylabel("Y-axis")
plt.title("Custom Scatter Chart")

# Display the chart
plt.show()

The s, c, alpha, and
edgecolors parameters are used to customize the appearance of the
markers.

## Scatter Chart with Color Mapping

This example shows how to use color mapping to represent a third variable.

color_mapping_scatter.py
  

import matplotlib.pyplot as plt
import numpy as np

# Data
x = np.random.rand(50)
y = np.random.rand(50)
colors = np.random.rand(50)  # Third variable for color mapping
sizes = 1000 * np.random.rand(50)  # Third variable for size mapping

# Create a scatter chart with color mapping
plt.scatter(x, y, c=colors, s=sizes, alpha=0.6, cmap="viridis")

# Add a colorbar
plt.colorbar()

# Add labels and title
plt.xlabel("X-axis")
plt.ylabel("Y-axis")
plt.title("Scatter Chart with Color Mapping")

# Display the chart
plt.show()

The cmap parameter is used to apply a colormap to the markers. The
plt.colorbar() function adds a colorbar to the chart.

## Scatter Chart with Regression Line

This example demonstrates how to add a regression line to a scatter chart.

scatter_with_regression.py
  

import matplotlib.pyplot as plt
import numpy as np
from scipy.stats import linregress

# Data
x = [1, 2, 3, 4, 5]
y = [2, 3, 5, 7, 11]

# Create a scatter chart
plt.scatter(x, y)

# Add a regression line
slope, intercept, r_value, p_value, std_err = linregress(x, y)
plt.plot(x, slope * np.array(x) + intercept, color="red", label="Regression Line")

# Add labels, title, and legend
plt.xlabel("X-axis")
plt.ylabel("Y-axis")
plt.title("Scatter Chart with Regression Line")
plt.legend()

# Display the chart
plt.show()

The linregress() function from scipy.stats is used to
calculate the regression line. The plt.plot() function adds the
regression line to the chart.

## 3D Scatter Chart

This example demonstrates how to create a 3D scatter chart.

3d_scatter_chart.py
  

import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
import numpy as np

# Data
x = np.random.rand(50)
y = np.random.rand(50)
z = np.random.rand(50)

# Create a 3D scatter chart
fig = plt.figure()
ax = fig.add_subplot(111, projection="3d")
ax.scatter(x, y, z)

# Add labels and title
ax.set_xlabel("X-axis")
ax.set_ylabel("Y-axis")
ax.set_zlabel("Z-axis")
ax.set_title("3D Scatter Chart")

# Display the chart
plt.show()

The mpl_toolkits.mplot3d module is used to create 3D scatter
charts. The projection="3d" parameter enables 3D plotting.

## Best Practices for Scatter Charts

- **Label Axes Clearly:** Always label the X and Y axes to make the chart understandable.

- **Use Color Mapping:** Use color mapping to represent a third variable effectively.

- **Choose Appropriate Markers:** Use markers that are easy to distinguish and interpret.

- **Limit Data Points:** Avoid cluttering the chart with too many data points.

## Source

[Matplotlib Scatter Chart Documentation](https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.scatter.html)

In this article, we have explored various types of scatter charts using
Matplotlib, including basic, customized, color-mapped, regression, and 3D
scatter charts.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/all/#python).