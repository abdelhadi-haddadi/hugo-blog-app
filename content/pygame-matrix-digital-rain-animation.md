+++
title = "Pygame Matrix Digital Rain Animation"
date = 2025-08-29T20:07:23.403+01:00
draft = false
description = "Python tutorial on creating a Matrix digital rain animation using Pygame, with practical examples."
image = ""
imageBig = ""
categories = ["pygame"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Pygame Matrix Digital Rain Animation

last modified February 25, 2025

Pygame is a powerful Python library for creating 2D games and multimedia
applications. In this tutorial, we will create a Matrix-style digital rain
animation using Pygame. This effect mimics the falling green characters seen in
the Matrix movies.

The animation involves rendering random Katakana characters in green, which fall
down the screen like rain. The background fades gradually to create a trailing
effect.

## Setting Up the Animation

This example demonstrates how to create the Matrix digital rain animation.

matrix_animation.py
  

import pygame
import random

# Initialize Pygame
pygame.init()

# Set up the display
WIDTH = 800
HEIGHT = 600
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Matrix Digital Rain")

# Colors
BLACK = (0, 0, 0)
GREEN = (0, 255, 0)
FADE_ALPHA = 13  # Equivalent to rgba(0, 0, 0, 0.05) with 255 scale (0.05 * 255 ≈ 13)

# Font setup
FONT_SIZE = 13
font = pygame.font.SysFont("MS Gothic", FONT_SIZE)

def random_katakana():
    return chr(0x30A0 + int(random.random() * 96))

# Calculate columns based on screen width and font size
COLUMNS = WIDTH // FONT_SIZE

# Adjust font size if it's too big for the screen
if COLUMNS &lt; 10:
    FONT_SIZE = 12
drops = [0] * COLUMNS  # Starting y-position for each column

# Create a surface for fading background
fade_surface = pygame.Surface((WIDTH, HEIGHT), pygame.SRCALPHA)
fade_surface.fill((0, 0, 0, FADE_ALPHA))

# Game loop
clock = pygame.time.Clock()
running = True

while running:
    # Event handling
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # Apply fading background
    screen.blit(fade_surface, (0, 0))

    # Draw and update drops
    for i in range(len(drops)):
        # Randomly select a character
        char = random_katakana()
        x = i * FONT_SIZE  # Calculate x position based on column index
        y = drops[i] * FONT_SIZE  # Calculate y position based on drop position

        # Render character in green with antialiasing
        text = font.render(char, True, GREEN)  # Antialiasing enabled
        text_rect = text.get_rect(topleft=(x, y))
        screen.blit(text, text_rect)

        # Increment drop position
        drops[i] += 1

        # Adjust the reset condition to be slightly more frequent
        if y &gt; HEIGHT and random.random() &gt; 0.95:
            drops[i] = random.randint(-20, 0)
        # Reset drop if it goes off-screen with a small random chance
        if y &gt; HEIGHT and random.random() &gt; 0.975:
            drops[i] = 0

    # Update display
    pygame.display.flip()
    clock.tick(20)  # 20 FPS (~50ms interval like JS setInterval)

# Quit Pygame
pygame.quit()

The program simulates the Matrix effect by using the random_katakana
function to generate random Katakana characters, which fall down the screen with
their positions updated in the drops list. A semi-transparent black
surface, fade_surface, creates a trailing effect by blending over
the screen. The program also listens for the QUIT event to exit
gracefully.

The drops list tracks the vertical position of each column of
characters. The fade_surface creates a fading effect by blending a
semi-transparent black surface over the screen.

## Source

[Pygame Documentation](https://www.pygame.org/docs/)

In this article, we have explored how to create a Matrix-style digital rain
animation using Pygame. This effect is a great way to learn about rendering,
event handling, and animation in Pygame.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/all/#python).