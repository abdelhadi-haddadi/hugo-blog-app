+++
title = "JavaScript Canvas miterLimit Tutorial"
date = 2025-08-29T19:49:41.719+01:00
draft = false
description = "Learn how to use JavaScript Canvas miterLimit property effectively with examples and detailed explanations. Enhance your web development skills with this step-by-step tutorial."
image = ""
imageBig = ""
categories = ["canvas-api"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript Canvas miterLimit Tutorial

last modified April 3, 2025

In this article, we explore the Canvas miterLimit property in JavaScript. This
property controls how sharp corners are rendered when using miter line joins.
Understanding miterLimit is crucial for professional-quality line drawings.

## Basic Definition

The miterLimit property specifies how far the miter join can extend beyond the
normal line width. It only applies when lineJoin is set to 'miter'. The default
value is 10.0.

When two lines meet at a sharp angle, the miter join can become very long.
miterLimit prevents excessively long joins by converting them to bevel joins
when the limit is exceeded.

## Default miterLimit Behavior

This example shows the default miterLimit behavior with a sharp angle.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Default miterLimit&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    ctx.lineJoin = 'miter';
    ctx.lineWidth = 10;
    ctx.strokeStyle = 'blue';
    
    ctx.beginPath();
    ctx.moveTo(50, 150);
    ctx.lineTo(150, 50);
    ctx.lineTo(250, 150);
    ctx.stroke();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This code draws a V-shape with miter line joins. The default miterLimit of 10
allows the sharp corner to extend significantly beyond the line width.

The miter join creates a pointed corner where the two lines meet. The length
of this point is automatically calculated based on the angle between lines.

## Setting a Small miterLimit

This example demonstrates what happens when miterLimit is set too small.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Small miterLimit&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="300" height="200"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    ctx.lineJoin = 'miter';
    ctx.miterLimit = 2;
    ctx.lineWidth = 10;
    ctx.strokeStyle = 'red';
    
    ctx.beginPath();
    ctx.moveTo(50, 150);
    ctx.lineTo(150, 50);
    ctx.lineTo(250, 150);
    ctx.stroke();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

With miterLimit set to 2, the sharp corner exceeds this limit and is converted
to a bevel join. This prevents the miter from becoming too long.

The miterLimit value represents the maximum allowed ratio of miter length to
line width. When exceeded, the join automatically switches to bevel style.

## Comparing Different miterLimit Values

This example compares three different miterLimit values side by side.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;miterLimit Comparison&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="500" height="300"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    function drawAngle(x, limit) {
        ctx.lineJoin = 'miter';
        ctx.miterLimit = limit;
        ctx.lineWidth = 10;
        ctx.strokeStyle = 'green';
        
        ctx.beginPath();
        ctx.moveTo(x, 200);
        ctx.lineTo(x + 100, 100);
        ctx.lineTo(x + 200, 200);
        ctx.stroke();
        
        ctx.fillText('miterLimit: ' + limit, x + 30, 230);
    }
    
    drawAngle(50, 1);
    drawAngle(200, 5);
    drawAngle(350, 10);
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This code draws three identical angles with different miterLimit values. The
first uses 1 (becomes bevel), the second 5 (moderate miter), and third 10.

You can clearly see how higher miterLimit values allow longer pointed corners.
The first example converts to bevel because 1 is too restrictive for this angle.

## miterLimit with Various Angles

This example shows how miterLimit affects different angle sizes.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;miterLimit with Angles&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="600" height="400"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    
    function drawAngle(x, y, angle, limit) {
        const radians = angle * Math.PI / 180;
        const length = 100;
        
        ctx.lineJoin = 'miter';
        ctx.miterLimit = limit;
        ctx.lineWidth = 8;
        ctx.strokeStyle = 'purple';
        
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + length * Math.cos(radians/2), 
                  y - length * Math.sin(radians/2));
        ctx.lineTo(x + length * Math.cos(radians/2) * 2, y);
        ctx.stroke();
        
        ctx.fillText(angle + '°', x + length * Math.cos(radians/2), y + 20);
    }
    
    // Draw angles from 10° to 170° in 20° increments
    for (let i = 0; i &lt; 9; i++) {
        const angle = 10 + i * 20;
        drawAngle(50 + i * 60, 150, angle, 4);
    }
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example draws angles from 10° to 170° with a fixed miterLimit of 4. The
sharper angles (smaller numbers) will exceed this limit and convert to bevel.

You can observe how the miter join becomes longer as the angle becomes more
acute. At about 30°, the miterLimit is exceeded and the join becomes beveled.

## Practical miterLimit Application

This example shows a practical use case for adjusting miterLimit.

index.html
    

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Practical miterLimit&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;canvas id="myCanvas" width="500" height="300"&gt;&lt;/canvas&gt;

&lt;script&gt;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Without miterLimit control
    ctx.lineJoin = 'miter';
    ctx.lineWidth = 15;
    ctx.strokeStyle = 'rgba(255,0,0,0.5)';
    
    ctx.beginPath();
    ctx.moveTo(50, 100);
    ctx.lineTo(150, 50);
    ctx.lineTo(250, 100);
    ctx.lineTo(350, 50);
    ctx.lineTo(450, 100);
    ctx.stroke();
    
    // With miterLimit control
    ctx.lineJoin = 'miter';
    ctx.miterLimit = 4;
    ctx.lineWidth = 15;
    ctx.strokeStyle = 'rgba(0,0,255,0.5)';
    
    ctx.beginPath();
    ctx.moveTo(50, 200);
    ctx.lineTo(150, 150);
    ctx.lineTo(250, 200);
    ctx.lineTo(350, 150);
    ctx.lineTo(450, 200);
    ctx.stroke();
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

This example compares two zigzag lines - one with default miterLimit and one
with miterLimit set to 4. The first line has extremely long miter joins.

The second line maintains pointed corners but prevents excessive length. This
demonstrates how miterLimit can improve the appearance of complex paths.

## Source

[MDN Canvas miterLimit Documentation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/miterLimit)

In this article, we have explored the miterLimit property in depth. This often
overlooked property is essential for controlling the appearance of sharp corners
in your canvas drawings.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Canvas tutorials](/all/#canvas).