+++
title = "Python rich"
date = 2025-08-29T20:10:18.658+01:00
draft = false
description = "Python rich tutorial shows how to create rich text and formatting in the terminal."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python rich

last modified January 29, 2024

In this article we create rich text and advanced formatting in the terminal 
using the Python rich library.

The rich module allows us to add colours, emojis, tables, columns, or progress
bars. We can do syntax highlighting, pretty printing. It supports the markdown 
syntax. 

Rich works with Jupyter notebooks out of the box. On Windows, the new Windows
Terminal supports the more advanced formatting options.

$ pip install rich

We install the library with pip.

## Python rich simple example

The following is a simple example that uses rich.

simple.py
  

#!/usr/bin/python

from datetime import date
from rich import print
from rich import print as rprint

print("[italic red]an old falcon[/italic red]")
rprint("[italic blue]an old falcon[/italic blue]")

print("{ 'name': 'John Doe', 'occupation': 'gardener' }")
print(date.today())

In the example, we display coloured text.

from rich import print
from rich import print as rprint

From the module, we import two functions: print and
rprint. The functions are identical. We can use rprint
if we do not want to hide the built-in print function. For more
advanced options, we can use the Console object.

print("[italic red]an old falcon[/italic red]")

We print a message in cursive red. The formatting instructions are placed
between the pairs of [] characters.

print("{ 'name': 'John Doe', 'occupation': 'gardener' }")
print(date.today())

The rich automatically highlights JSON data and datetime in ISO8601 format.

## Python rich Text

Instead of specifying the formatting options in the print function, 
we can use the Text object. It encapsulates a text with colour and 
style.

rich_text.py
  

#!/usr/bin/python

from rich.console import Console
from rich.text import Text

txt = Text('''Python is a general-purpose, dynamic, object-oriented \
programming language. The design purpose of the Python language \
emphasizes programmer productivity and code readability.''', style='italic')

console = Console()
console.print(txt)

The example prints a message to the terminal. The text is in italic.

txt = Text('''Python is a general-purpose, dynamic, object-oriented \
programming language. The design purpose of the Python language \
emphasizes programmer productivity and code readability.''', style='italic')

A text object is created. We specify a style option.

## Python rich rule

A rule is a horizontal line with an optional center title.

rules.py
  

#!/usr/bin/python

from rich.console import Console

console = Console()

console.rule('Python', style='blue')
console.print('''Python is a general-purpose, dynamic, object-oriented\
programming language. The design purpose of the Python language\
emphasizes programmer productivity and code readability.''')
console.print()

console.rule('F#', style='red')
console.print('''F# is a universal programming language for writing succinct,\
robust and performant code.''')
console.print()

console.rule('Go')
console.print('''Go is an open source programming language that makes it easy to\
build simple, reliable, and efficient software. Go is a statically\
typed, compiled programming language.''')

In the program, we create three horizontal lines.

console.rule('Python', style='blue')

We can specify style for the rule.

## Python rich panel

A panel is a console renderable that draws a border around its contents.

simple_panel.py
  

#!/usr/bin/python

from rich.panel import Panel
from rich.console import Console

pnl1 = Panel("[bold yellow]an old falcon", expand=False, border_style="blue")
pnl2 = Panel.fit("[bold yellow]an old falcon", border_style="blue")

console = Console()
console.print(pnl1)
console.print(pnl2)

The program creates a panel with a coloured text. The panel has a blue border.

pnl1 = Panel("[bold yellow]an old falcon", expand=False, border_style="blue")
pnl2 = Panel.fit("[bold yellow]an old falcon", border_style="blue")

We create two panels with text. By default, the panels are expanded. We can turn 
it off with the expand option, or use the fit method.

## Python rich Padding

With Padding, we can place spacing around content.

padding.py
  

#!/usr/bin/python

from rich import print
from rich.padding import Padding
from rich.panel import Panel

p = Padding("Hello", (2, 4), style="on blue", expand=False)
print(p)

pnl = Panel.fit(Padding("old falcon", (8, 4)))
print(pnl)

In the program, we add space around text.

p = Padding("Hello", (2, 4), style="on blue", expand=False)
print(p)

The second parameter are the padding dimensions: top, right, bottom, and left.
We can eigher specify all four values or the first two values.

pnl = Panel.fit(Padding("old falcon", (8, 4)))
print(pnl)

We place a padded text into a panel.

## Python rich Columns

Display renderables can be placed into columns for neat positionings.

words.txt
  

cup
snow
falcon
eagle
forest
war
water
atom
lamp
pen 
pencil
book
phone
chart
car 
cloud
print 
dog
nose
horse
stream
sum
nail
boot
atom
wind
storm

We have a list of words.

cols.py
  

#!/usr/bin/python

from rich.console import Console
from rich.columns import Columns
from rich.panel import Panel

console = Console()

with open('words.txt', 'r') as f:
    words = f.readlines()

    console.print(Columns([Panel(line, border_style='blue')
                  for line in words], align='center'))

In the program, we read words from a file and place them into panels. The panels 
are placed into columns. Rich arranges the columns based on the current size 
of the terminal.

console.print(Columns([Panel(line, border_style='blue')
              for line in words], align='center'))

We can align the renderables inside columns with the align option. 

## Python rich Group

Renderables can be placed into groups.

groups.py
  

#!/usr/bin/python

from rich import print
from rich.console import group
from rich.panel import Panel

@group()
def get_panels():
    yield Panel.fit("an old falcon", style="on blue")
    yield Panel.fit("a long stormy night", style="on deep_sky_blue4")

print(Panel.fit(get_panels()))

from rich.console import Group

g = Group(
    Panel.fit("an old falcon", style="on blue"),
    Panel.fit("a long stormy night", style="on deep_sky_blue4"),
)

print(Panel.fit(g))

In the example, we create two groups. We add two panels to each group.

@group()
def get_panels():
    yield Panel.fit("an old falcon", style="on blue")
    yield Panel.fit("a long stormy night", style="on deep_sky_blue4")

print(Panel.fit(get_panels()))

In the first case, we build a group with a decorator.

g = Group(
    Panel.fit("an old falcon", style="on blue"),
    Panel.fit("a long stormy night", style="on deep_sky_blue4"),
)

print(Panel.fit(g))

In the second case, we use the Group object.

## Python rich Table

More complex tabular data can be displayed in a Table.

table.py
  

#!/usr/bin/python

from rich import box
from rich.console import Console
from rich.table import Table
from datetime import date

now = f'{date.today()}'
table = Table(title='Users', box=box.MINIMAL, caption=now, caption_justify='left')

table.add_column('Name', style='cyan')
table.add_column('Occupation', style='grey69')
table.add_column('Date of birth', justify='right', style='green')

table.add_row('John Doe', 'gardener', '12/5/1997')
table.add_row('Jane Doe', 'teacher', '5/16/1983')
table.add_row('Robert Smith', 'driver', '4/2/2001')
table.add_row('Maria Smith', 'cook', '9/21/1976')

console = Console()
console.print(table, justify='center')

The example displayes users in a table.

table = Table(title='Users', box=box.MINIMAL, caption=now, caption_justify='left')

A Table object is created. We provide a title, header box style,
and caption. The caption is left-justified.

table.add_column('Name', style='cyan')
table.add_column('Occupation', style='grey69')
table.add_column('Date of birth', justify='right', style='green')

We add columns to the table with add_column. Each column data is 
displayed in a different colour. The third column is also right-justified.

table.add_row('John Doe', 'gardener', '12/5/1997')
table.add_row('Jane Doe', 'teacher', '5/16/1983')
table.add_row('Robert Smith', 'driver', '4/2/2001')
table.add_row('Maria Smith', 'cook', '9/21/1976')

We add four rows with add_row.

console = Console()
console.print(table, justify='center')

The table is printed. The whole table is centered.

In the next example, we display BTC OHLCV data in a table. The example uses 
the ccxt module to fetch data from the Binance exchange.

btc_ohlcv.py
  

#!/usr/bin/python

import asyncio
import ccxt.async_support as ccxt

from rich import box
from rich.console import Console
from rich.table import Table
from datetime import datetime

async def tickers():

    binance = ccxt.binance()
    data = await binance.fetch_ohlcv('BTC/USDT', '1d', limit=20)
    await binance.close()

    now = f'{datetime.today()}'
    table = Table(title='Binance - BTC/USDT', box=box.ASCII,
                  caption=now, caption_justify='left')

    table.add_column('Date', justify='center', style='steel_blue')
    table.add_column('Open')
    table.add_column('High')
    table.add_column('Low')
    table.add_column('Close')
    table.add_column('Volume', justify='right', style='cadet_blue')

    for e in data:
        d = datetime.utcfromtimestamp(e[0]/1000.0)
        table.add_row(f'{d:%m/%d/%Y}', f'{e[1]:.2f}', f'{e[2]:.2f}',
                      f'{e[3]:.2f}', f'{e[4]:.2f}', f'{e[5]:.5f}')

    console = Console()
    console.print(table)

asyncio.run(tickers())

The display the open, high, low, close, volume values of BTC for the last 20
days.

## Python rich markdown

Markdown is a lightweight markup language for creating formatted text. Rich 
supports the markdown language.

pattern_match.md
  

# Match expressions

The match expression provides branching control that is based on  
the comparison of an expression with a set of patterns.  

## String constant 

```F#
open System
open System.Globalization

printf "What is the capital of Slovakia?: "

let name = Console.ReadLine() 
let lowered = name.ToLower()
let capital = CultureInfo.CurrentCulture.TextInfo.ToTitleCase lowered

let msg = match capital with
            | "Bratislava" -&gt; "correct answer"
            | _ -&gt; "wrong answer"

printfn $"{msg}"
```

We have a short markdown example. It contains headers and a F# source code
listing.

markdown.py
  

#!/usr/bin/python

from rich.console import Console
from rich.markdown import Markdown

with open('pattern_match.md', 'r') as f:

    data = f.read()

    console = Console()
    md = Markdown(data)
    console.print(md)

The program reads the markdown from the file and passes the data to the 
Markdown object. The markdown is then printed to the console.

## Python rich syntax

Rich can provide syntax highlighting for multiple languages.

filter.fsx
  

open System

type User =
    { FirstName: string
      LastName: string
      Salary: int }

let users = [
    
        { FirstName="Robert"; LastName="Novak"; Salary=1770 };
        { FirstName="John"; LastName="Doe";  Salary=1230 };
        { FirstName="Lucy"; LastName="Novak";  Salary=670 };
        { FirstName="Ben"; LastName="Walter";  Salary=2050 };
        { FirstName="Robin"; LastName="Brown";  Salary=2300 };
        { FirstName="Amy"; LastName="Doe";  Salary=1250 };
        { FirstName="Joe"; LastName="Draker";  Salary=1190 };
        { FirstName="Janet"; LastName="Doe";  Salary=980 };
        { FirstName="Peter"; LastName="Novak";  Salary=990 };
        { FirstName="Albert"; LastName="Novak";  Salary=1930 }
]

let avg = users |&gt; List.averageBy (fun user -&gt; float user.Salary)
let users2 = users |&gt; List.filter (fun user -&gt; user.Salary &gt; int avg)

users2 |&gt; List.iter Console.WriteLine

We have a F# code example.

syntax.py
  

#!/usr/bin/python

from rich.console import Console
from rich.syntax import Syntax

stx = Syntax.from_path("filter.fsx", theme="nord-darker", line_numbers=True)

console = Console()
console.print(stx)

We read the F# code from the file and provide syntax highlighting in the output.
We use the nord-darker theme and enable line numbers. It
autodetects the used language.

## Source

[Python rich documentation](https://rich.readthedocs.io/en/stable/introduction.html)

In this article we have created rich text and formatting in Python using the 
rich module.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).