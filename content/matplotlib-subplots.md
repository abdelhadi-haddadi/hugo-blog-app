+++
title = "Matplotlib Subplots"
date = 2025-08-29T20:03:36.344+01:00
draft = false
description = "Python tutorial on Matplotlib subplots, covering how to create and customize subplots with practical examples."
image = ""
imageBig = ""
categories = ["matplotlib"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Matplotlib Subplots

last modified February 25, 2025

Matplotlib is a powerful Python library for creating static, animated, and
interactive visualizations. Subplots allow you to display multiple plots in a
single figure. This tutorial covers how to create and customize subplots using
Matplotlib.

Subplots are ideal for comparing multiple datasets or visualizing different
aspects of the same dataset. Matplotlib provides a flexible and easy-to-use
interface for creating subplots with customizations.

## Basic Subplots

This example demonstrates how to create a basic 2x2 grid of subplots.

basic_subplots.py
  

import matplotlib.pyplot as plt
import numpy as np

# Data
x = np.linspace(0, 10, 100)

# Create a 2x2 grid of subplots
fig, axs = plt.subplots(2, 2)

# Plot data in each subplot
axs[0, 0].plot(x, np.sin(x))
axs[0, 0].set_title("Sine Wave")

axs[0, 1].plot(x, np.cos(x))
axs[0, 1].set_title("Cosine Wave")

axs[1, 0].plot(x, np.tan(x))
axs[1, 0].set_title("Tangent Wave")

axs[1, 1].plot(x, np.exp(x))
axs[1, 1].set_title("Exponential Curve")

# Adjust layout
plt.tight_layout()

# Display the figure
plt.show()

The code example uses the matplotlib.pyplot library to create a 2x2
grid of subplots displaying different mathematical functions. First, it
generates 100 evenly spaced points between 0 and 10 using
numpy.linspace. 

It then creates a figure with four subplots (axs) and plots a sine
wave, cosine wave, tangent wave, and exponential curve on each of the subplots,
respectively, while also adding titles to each plot. Finally, it adjusts the
layout of the figure to ensure the plots do not overlap and displays the figure
using plt.show.

    

## Customizing Subplots

This example demonstrates how to customize subplots with shared axes, titles, and
labels.

custom_subplots.py
  

import matplotlib.pyplot as plt
import numpy as np

# Data
x = np.linspace(0, 10, 100)

# Create a 2x1 grid of subplots with shared X-axis
fig, axs = plt.subplots(2, 1, sharex=True)

# Plot data in each subplot
axs[0].plot(x, np.sin(x), color="blue")
axs[0].set_title("Sine Wave")
axs[0].set_ylabel("Amplitude")

axs[1].plot(x, np.cos(x), color="red")
axs[1].set_title("Cosine Wave")
axs[1].set_xlabel("X-axis")
axs[1].set_ylabel("Amplitude")

# Adjust layout
plt.tight_layout()

# Display the figure
plt.show()

The sharex=True parameter ensures that the subplots share the same
X-axis. Titles and labels are added using set_title,
set_xlabel, and set_ylabel.

## Uneven Subplots

This example demonstrates how to create subplots with uneven layouts using
GridSpec.

uneven_subplots.py
  

import matplotlib.pyplot as plt
import numpy as np
from matplotlib.gridspec import GridSpec

# Data
x = np.linspace(0, 10, 100)

# Create a figure with uneven subplots
fig = plt.figure()
gs = GridSpec(2, 2, figure=fig)

# Create subplots
ax1 = fig.add_subplot(gs[0, :])  # Top row, full width
ax2 = fig.add_subplot(gs[1, 0])  # Bottom left
ax3 = fig.add_subplot(gs[1, 1])  # Bottom right

# Plot data in each subplot
ax1.plot(x, np.sin(x))
ax1.set_title("Sine Wave")

ax2.plot(x, np.cos(x))
ax2.set_title("Cosine Wave")

ax3.plot(x, np.tan(x))
ax3.set_title("Tangent Wave")

# Adjust layout
plt.tight_layout()

# Display the figure
plt.show()

The example creates a figure with three subplots arranged unevenly using
the GridSpec module from Matplotlib. The top row subplot spans the
full width of the figure and displays a sine wave, labeled "Sine Wave." The
bottom row contains two subplots: the left subplot shows a cosine wave, labeled
"Cosine Wave," while the right subplot displays a tangent wave, labeled "Tangent Wave." 

The tight_layout function is used to adjust the spacing
between subplots for a cleaner appearance. The resulting figure visually
represents the mathematical functions sine, cosine, and tangent across the
x-axis ranging from 0 to 10.

## Subplots with Different Sizes

This example demonstrates how to create subplots with different sizes using
subplot2grid.

different_sized_subplots.py
  

import matplotlib.pyplot as plt
import numpy as np

# Data
x = np.linspace(0, 10, 100)

# Create a figure with subplots of different sizes
plt.figure()

# First subplot (large)
ax1 = plt.subplot2grid((3, 3), (0, 0), colspan=3)
ax1.plot(x, np.sin(x))
ax1.set_title("Sine Wave")

# Second subplot (small)
ax2 = plt.subplot2grid((3, 3), (1, 0), colspan=2)
ax2.plot(x, np.cos(x))
ax2.set_title("Cosine Wave")

# Third subplot (small)
ax3 = plt.subplot2grid((3, 3), (1, 2), rowspan=2)
ax3.plot(x, np.tan(x))
ax3.set_title("Tangent Wave")

# Fourth subplot (small)
ax4 = plt.subplot2grid((3, 3), (2, 0))
ax4.plot(x, np.exp(x))
ax4.set_title("Exponential Curve")

# Fifth subplot (small)
ax5 = plt.subplot2grid((3, 3), (2, 1))
ax5.plot(x, np.log(x + 1))
ax5.set_title("Logarithmic Curve")

# Adjust layout
plt.tight_layout()

# Display the figure
plt.show()

The subplot2grid function allows for subplots of different sizes by
specifying the grid layout and the position of each subplot.

## Subplots with Labels and Titles

This example demonstrates how to create a grid of subplots with labels and titles.

subplots_with_labels.py
  

import matplotlib.pyplot as plt
import numpy as np

fig, axs = plt.subplots(3, 3, figsize=(15, 8), sharex=True, sharey=True)

for i, ax in enumerate(axs.flat):
    ax.scatter(*np.random.normal(size=(2, 200)))
    ax.set_title(f'Title {i+1}')

# Set labels
plt.setp(axs[-1, :], xlabel='x axis label')
plt.setp(axs[:, 0], ylabel='y axis label')

plt.savefig('subplots.png')

The plt.setp function is used to set labels for the X and Y axes
of the subplots. Each subplot is given a unique title.

## Sharing X Axis

This example demonstrates how to create subplots that share the X axis.

sharing_x_axis.py
  

import matplotlib.pyplot as plt

data = {'FreeBSD': 4, 'NetBSD': 1, 'Linux': 12, 'Windows': 6, 'Apple': 2}
keys = list(data.keys())
vals = list(data.values())

fig, axs = plt.subplots(3, 1, figsize=(4, 10), sharex=True)
axs[0].bar(keys, vals)
axs[1].scatter(keys, vals)
axs[2].plot(keys, vals)

fig.suptitle('Operating systems in lab')
plt.savefig('subplots.png')

The sharex=True parameter ensures that all subplots share the same
X axis. The fig.suptitle function adds a title to the entire
figure.

## Creating Each Subplot Separately

This example demonstrates how to create each subplot separately using the
subplot function.

separate_subplots.py
  

import matplotlib.pyplot as plt
import numpy as np

x = np.array([0, 1, 2, 3])
y = np.array([6, 8, 2, 11])

plt.subplot(2, 3, 1)
plt.plot(x, y)

x = np.array([0, 1, 2, 3])
y = np.array([15, 25, 35, 45])

plt.suptitle('Subplots')

plt.subplot(2, 3, 2)
plt.plot(x, y)

x = np.array([0, 1, 2, 3])
y = np.array([2, 9, 11, 11])

plt.subplot(2, 3, 3)
plt.plot(x, y)

x = np.array([0, 1, 2, 3])
y = np.array([11, 22, 33, 55])

plt.subplot(2, 3, 4)
plt.plot(x, y)

x = np.array([0, 1, 2, 3])
y = np.array([13, 18, 11, 10])

plt.subplot(2, 3, 5)
plt.plot(x, y)

x = np.array([0, 1, 2, 3])
y = np.array([10, 20, 30, 40])

plt.subplot(2, 3, 6)
plt.plot(x, y)

plt.savefig('subplots2.png')

The subplot function is used to create each subplot individually.
The suptitle function adds a title to the entire figure.

## Best Practices for Subplots

- **Use tight_layout:** This ensures that subplots do not overlap.

- **Share Axes When Appropriate:** Use sharex or sharey to align axes for better comparison.

- **Label Subplots Clearly:** Add titles and axis labels to make each subplot understandable.

- **Use GridSpec for Complex Layouts:** For uneven or complex layouts, use GridSpec or subplot2grid.

## Source

[Matplotlib Subplots Documentation](https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.subplots.html)

In this article, we have explored how to create and customize subplots using
Matplotlib, including basic subplots, shared axes, uneven layouts, and
different-sized subplots.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/all/#python).