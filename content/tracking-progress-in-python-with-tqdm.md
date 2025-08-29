+++
title = "Tracking Progress in Python with tqdm"
date = 2025-08-29T20:11:05.843+01:00
draft = false
description = "Complete guide to tracking progress in Python using the tqdm library with practical examples and use cases."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Tracking Progress in Python with tqdm

last modified March 31, 2025

The tqdm library in Python provides an easy way to add progress bars to your
loops and tasks. This tutorial covers its installation, basic usage, and
advanced features with practical examples for various scenarios.

Tracking progress is essential for long-running operations, whether you're
processing files, training models, or iterating over large datasets. We'll
explore how tqdm simplifies this with minimal code changes.

## Installation and Basic Setup

First, install tqdm using pip and import it in your Python script.

tqdm_install.py
  

# Install via pip
# pip install tqdm

from tqdm import tqdm
import time

# Basic loop with progress bar
for i in tqdm(range(100)):
    time.sleep(0.1)  # Simulate work

To use tqdm, install it with pip install tqdm. The basic usage
wraps any iterable with tqdm(), instantly adding a progress bar.
In this example, we simulate work with time.sleep to see the bar
update. The output shows a dynamic bar with percentage, iteration count, and
estimated time remaining, all automatically handled by tqdm.

## Customizing the Progress Bar

You can customize tqdm's appearance and behavior with parameters.

tqdm_custom.py
  

from tqdm import tqdm
import time

# Custom description and bar format
for i in tqdm(range(100), desc="Processing", bar_format="{l_bar}{bar}| {n_fmt}/{total_fmt}"):
    time.sleep(0.05)

The desc parameter adds a prefix to the progress bar, while
bar_format lets you define the layout. Here, we show only the bar
and iteration counts, omitting extra stats. This is useful for tailored
displays in specific applications, keeping the output clean and focused.

## Tracking File Processing

Use tqdm to monitor file operations like reading lines.

tqdm_file.py
  

from tqdm import tqdm

# Process a file line by line
with open('large_file.txt', 'r') as f:
    total_lines = sum(1 for _ in f)  # Count lines
    f.seek(0)  # Reset file pointer
    for line in tqdm(f, total=total_lines, desc="Reading file"):
        pass  # Process line here

For file operations, tqdm can track progress by setting the total
parameter. Here, we pre-count the lines to give an accurate progress bar.
This is ideal for scripts processing large files, providing feedback on how
much work remains without guessing completion time.

## Nested Loops with tqdm

Handle multiple progress bars for nested iterations.

tqdm_nested.py
  

from tqdm import tqdm
import time

# Nested loops with separate bars
for i in tqdm(range(5), desc="Outer"):
    for j in tqdm(range(10), desc="Inner", leave=False):
        time.sleep(0.1)

Tqdm supports nested loops by creating multiple bars. The leave=False
option removes the inner bar after completion, keeping the output tidy.
This is perfect for multi-step processes like grid searches or simulations,
showing progress at each level clearly.

## Manual Progress Updates

Update progress manually for non-iterable tasks.

tqdm_manual.py
  

from tqdm import tqdm
import time

# Manual control of progress
with tqdm(total=100, desc="Manual Task") as pbar:
    for i in range(10):
        time.sleep(0.2)
        pbar.update(10)  # Update by 10 units

For tasks without natural iterables, use tqdm as a context manager. The
update() method increments the bar manually. This example
simulates a task split into 10 chunks, updating by 10% each time. It's great
for custom workflows like API calls or downloads.

## Progress with List Comprehension

Track progress in list comprehensions using tqdm.

tqdm_listcomp.py
  

from tqdm import tqdm
import time

# List comprehension with progress
result = [x * 2 for x in tqdm(range(100), desc="Computing")]
time.sleep(0.1)  # Simulate work after

Wrap the iterable in a list comprehension with tqdm to add a
progress bar. Note that additional work after the comprehension won't be
tracked unless moved inside. This keeps Python's concise syntax while adding
visibility, useful for quick data transformations.

## Integration with Pandas

Use tqdm with Pandas for data processing tasks.

tqdm_pandas.py
  

import pandas as pd
from tqdm import tqdm

# Enable tqdm for pandas
tqdm.pandas()

# Process DataFrame rows
df = pd.DataFrame({'a': range(1000)})
df['b'] = df['a'].progress_apply(lambda x: x * 2)

Tqdm integrates with Pandas via tqdm.pandas(). The
progress_apply method tracks operations on DataFrame rows or
columns. Here, we double each value in column 'a' with a progress bar. This
is invaluable for data analysis tasks with large datasets, showing progress
without changing your Pandas workflow.

## Best Practices

**Set total when known:** Improves ETA accuracy

**Use desc for clarity:** Label what’s being tracked

**Handle nested bars:** Use leave=False for inner loops

**Test output:** Ensure bars fit your terminal size

**Avoid overuse:** Reserve for significant operations

## Source References

[Official tqdm Documentation](https://tqdm.github.io/)

[Python time Docs](https://docs.python.org/3/library/time.html)

[Pandas Documentation](https://pandas.pydata.org/docs/)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).