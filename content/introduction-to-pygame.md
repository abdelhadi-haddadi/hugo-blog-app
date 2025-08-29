+++
title = "Introduction to Pygame"
date = 2025-08-29T20:07:22.288+01:00
draft = false
description = "Python tutorial on Pygame, covering the basics of setting up a game window and handling events with practical examples."
image = ""
imageBig = ""
categories = ["pygame"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Introduction to Pygame

last modified February 25, 2025

Pygame is a popular Python library for creating 2D games and multimedia
applications. It provides tools for handling graphics, sound, and user input,
making it an excellent choice for beginners in game development. This tutorial
covers the basics of setting up a Pygame window and handling events.

Pygame is built on top of the SDL (Simple DirectMedia Layer) library, which
provides low-level access to audio, keyboard, mouse, and display hardware. With
Pygame, you can create games and interactive applications with ease.

## Installing Pygame

Before using Pygame, you need to install it. You can install Pygame using pip:

install_pygame.sh
  

pip install pygame

Once installed, you can start creating games with Pygame.

## Setting Up a Pygame Window

This example demonstrates how to create a basic Pygame window.

basic_window.py
  

import pygame

# Initialize Pygame
pygame.init()

# Set up the display
screen = pygame.display.set_mode((800, 600))
pygame.display.set_caption("Pygame Window")

# Main loop
running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # Fill the screen with a color
    screen.fill((0, 0, 0))

    # Update the display
    pygame.display.flip()

pygame.quit()

The pygame.init function initializes all Pygame modules. The
pygame.display.set_mode function creates a window of the specified
size. The main loop handles events and updates the display.

## Handling Events

This example demonstrates how to handle keyboard and mouse events in Pygame.

event_handling.py
  

import pygame

# Initialize Pygame
pygame.init()

# Set up the display
screen = pygame.display.set_mode((800, 600))
pygame.display.set_caption("Event Handling")

# Main loop
running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        elif event.type == pygame.KEYDOWN:
            if event.key == pygame.K_ESCAPE:
                running = False
            print(f"Key pressed: {pygame.key.name(event.key)}")
        elif event.type == pygame.MOUSEBUTTONDOWN:
            print(f"Mouse button pressed at: {event.pos}")

    # Fill the screen with a color
    screen.fill((0, 0, 0))

    # Update the display
    pygame.display.flip()

pygame.quit()

The pygame.event.get function retrieves all events from the event
queue. Keyboard and mouse events are handled using pygame.KEYDOWN
and pygame.MOUSEBUTTONDOWN.

## Drawing Shapes

This example demonstrates how to draw shapes on the screen.

drawing_shapes.py
  

import pygame

# Initialize Pygame
pygame.init()

# Set up the display
screen = pygame.display.set_mode((800, 600))
pygame.display.set_caption("Drawing Shapes")

# Main loop
running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # Fill the screen with a color
    screen.fill((255, 255, 255))

    # Draw a rectangle
    pygame.draw.rect(screen, (255, 0, 0), (100, 100, 200, 150))

    # Draw a circle
    pygame.draw.circle(screen, (0, 255, 0), (400, 300), 75)

    # Draw a line
    pygame.draw.line(screen, (0, 0, 255), (700, 100), (700, 500), 5)

    # Update the display
    pygame.display.flip()

pygame.quit()

The pygame.draw.rect, pygame.draw.circle, and
pygame.draw.line functions are used to draw shapes on the screen.

## Bouncing ball

In the next example, we create a bouncing ball animation.

anim_ball.py
  

import pygame

# Initialize Pygame
pygame.init()

# Set up the display
screen = pygame.display.set_mode((800, 600))
pygame.display.set_caption("Bouncing Ball")

# Ball properties
ball_color = (255, 255, 255)
ball_radius = 20
ball_x = 400
ball_y = 300
ball_x_speed = 5

clock = pygame.time.Clock()

ball_y_speed = 5

# Main loop
running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # Ball movement
    ball_x += ball_x_speed
    ball_y += ball_y_speed

    # Bounce off the walls
    if ball_x + ball_radius &gt; 800 or ball_x - ball_radius &lt; 0:
        ball_x_speed *= -1
    if ball_y + ball_radius &gt; 600 or ball_y - ball_radius &lt; 0:
        ball_y_speed *= -1

    # Fill the screen with a color
    screen.fill((0, 0, 0))

    # Draw the ball
    pygame.draw.circle(screen, ball_color, (int(ball_x), int(ball_y)), ball_radius)

    clock.tick(60)
    
    # Update the display
    pygame.display.flip()

pygame.quit()

The ball's properties are defined, including its color, radius, initial
position, and speed. The main loop of the program runs while the
running variable is True. Within this loop, it checks
for events (like quitting the program) and updates the ball's position based on
its speed. If the ball hits the edge of the window, it bounces back by reversing
its speed.

The screen is then filled with a black color, and the ball is drawn at its
updated position using pygame.draw.circle. The program ensures
that the display updates at a rate of 60 frames per second by using
clock.tick(60), and finally, the display is updated with
pygame.display.flip. When the main loop ends, Pygame is quit with
pygame.quit.

## Best Practices for Pygame

- **Initialize Pygame Properly:** Always call pygame.init at the start of your program.

- **Handle Events Efficiently:** Use the event loop to handle user input and other events.

- **Use Double Buffering:** Use pygame.display.flip to update the display efficiently.

- **Clean Up Resources:** Call pygame.quit to clean up resources when your program ends.

## Source

[Pygame Documentation](https://www.pygame.org/docs/)

In this article, we have explored the basics of Pygame, including setting up a
window, handling events, drawing shapes, and moving a ball.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/all/#python).