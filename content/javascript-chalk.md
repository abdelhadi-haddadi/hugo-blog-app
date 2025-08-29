+++
title = "JavaScript chalk"
date = 2025-08-29T20:01:11.230+01:00
draft = false
description = "Learn how to style text in JavaScript using the Chalk module, with examples and explanations."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript chalk

last modified last modified October 18, 2023

 

In this article we show how to style text in JavaScript using the chalk
module.

The chalk is a Node.js module which is used for styling the format
of text and allows us to create our own themes.

Note that the terminal may not support all of the features of the chalk module.

## JS chalk simple example

The following example is a simple demonstration of the chalk module.

simple.js
  

import chalk from 'chalk';

console.log(chalk.blue('an old falcon'));
console.log(chalk.keyword('steelblue')('an old falcon'));
console.log(chalk.keyword('khaki').bold('an old falcon'));

We print three coloured texts to the terminal.

console.log(chalk.blue('an old falcon'));

With chalk.blue, we output text in blue colour.

console.log(chalk.keyword('steelblue')('an old falcon'));

With keyword, we can use a name of the colour.

console.log(chalk.keyword('khaki').bold('an old falcon'));

The chalk supports chainable API; the text is shown in bold khaki.

## JS chalk basic text colours

The chalk module has functions for basic text colours.

basic_colours.js
  

import chalk from 'chalk';

console.log(chalk.red('An old falcon'));
console.log(chalk.blue('An old falcon'));
console.log(chalk.green('An old falcon'));
console.log(chalk.cyan('An old falcon'));
console.log(chalk.white('An old falcon'));
console.log(chalk.redBright('An old falcon'));
console.log(chalk.greenBright('An old falcon'));

In the example, we output text in basic colours.

console.log(chalk.red('An old falcon'));

We output text in red colour.

console.log(chalk.redBright('An old falcon'));

Here we output text in bright red colour.

## JS chalk background colours

We can change the colour of the text background.

bg_colours.js
  

import chalk from 'chalk';

console.log(chalk.bgRed('An old falcon'));
console.log(chalk.bgBlue('An old falcon'));
console.log(chalk.bgWhite.blue('An old falcon'));
console.log(chalk.bgWhiteBright.red('An old falcon'));
console.log(chalk.bgHex('#456323')('An old falcon'));

In the example, we change the background colour of the output.

console.log(chalk.bgRed('An old falcon'));

With bgRed, we change the background colour to red.

console.log(chalk.bgWhite.blue('An old falcon'));

We change the background colour to white. Since the default text colour is also
white, we change it to blue.

console.log(chalk.bgHex('#456323')('An old falcon'));

We can select our custom background colour with bgHex.

## JS chalk colour modes

In chalk, we can use several colour modes.

colour_modes.js
  

import chalk from 'chalk';

console.log(chalk.rgb(232, 34, 122)('An old falcon'));
console.log(chalk.hex('#943255')('An old falcon'));
console.log(chalk.ansi(245)('An old falcon'));
console.log(chalk.hsv(125, 8, 61)('An old falcon'));

In the example, we use the RGB, HEX, ANSI, and HSV modes.

## JS chalk modifiers

The chalk supports several modifiers including bold, italic, and underline.

modifiers.js
  

import chalk from 'chalk';

console.log(chalk.bold('An old falcon'));
console.log(chalk.dim('An old falcon'));
console.log(chalk.italic('An old falcon'));
console.log(chalk.underline('An old falcon'));
console.log(chalk.inverse('An old falcon'));
console.log(chalk.strikethrough('An old falcon'));

console.log('----------------------');

console.log(chalk.bold.italic('An old falcon'));
console.log(chalk.dim.italic('An old falcon'));

The example uses several chalk modifiers. These can be also combined.
For instance, chalk.bold.italic creates a bold and italic text.

## JS chalk template literals

The chalk module can be used within template literals. Template literals are
string literals allowing embedded expressions. The expressions in the
placeholders and the text between the backticks (` `). 

template_literals.js
  

import chalk from 'chalk';

console.log(`${chalk.red('old falcon')}`);
console.log(`${chalk.blue('old falcon')}`);
console.log(`${chalk.dim.underline('old falcon')}`);

In the example, we output three lines using chalk and JS template literals.

## JS chalk tagged template literals

Tagged template literals are more advanced form of template literals.

tagged_template_literals.js
  

import chalk from 'chalk';

console.log(chalk`{red old falcon}`);
console.log(chalk`{blue old falcon}`);
console.log(chalk`{dim.underline old falcon}`);

The example uses the chalk module in conjunction with the tagged template
literals.

## Source

[JS chalk GitHub page](https://github.com/chalk/chalk)

In this article we have styled text in JavaScript with the chalk module.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)