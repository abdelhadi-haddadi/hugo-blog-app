+++
title = "C# Windows Forms tutorial"
date = 2025-08-29T19:51:36.773+01:00
draft = false
description = "Learn C# Windows Forms programming with this comprehensive tutorial. Master GUI development using WinForms and build powerful desktop applications."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# Windows Forms tutorial

last modified May 13, 2025

 

Our C# Windows Forms tutorial provides a hands-on introduction to GUI
programming with C# and Windows Forms. Rather than relying on Form designers,
we’ll manually build our applications from the ground up to deepen your
understanding of the framework.

## Windows Forms

Windows Forms, often referred to as WinForms, is a graphical user interface
(GUI) framework included in Microsoft's .NET Framework. It simplifies desktop
application development by providing a rich set of controls and functionality
for creating user-friendly interfaces.

With Windows Forms, developers can design visually appealing applications that
are easy to deploy and maintain. Additionally, Windows Forms applications offer
enhanced security compared to traditional Windows-based applications.

In December 2018, Microsoft announced that Windows Forms would become an
open-source project on GitHub, licensed under MIT. This release made Windows
Forms accessible on the .NET Core framework, though it remains exclusive to
Windows platforms.

## Building Windows Forms applications

We will be using .NET Core to create Windows Forms applications.

$ dotnet new winforms -o MyApp

A new template for the Windows Forms application is created with the
dotnet new winforms command.

$ dotnet run

The application is run with the dotnet run command.

## Windows Forms simple example

In the first example, we display a simple window on the screen.

$ dotnet new winforms -o First

We create the template of the Windows Forms application. The command also
generates Form1.Designer.cs and Form1.cs files.
We will not use them and they can be safely deleted.

Program.cs
  

using System.Windows.Forms;
using System.Drawing;

namespace First;

public class MyForm : Form
{
    public MyForm()
    {
        InitComponents();
    }

    private void InitComponents()
    {
        Text = "First application";
        ClientSize = new Size(800, 450);
        CenterToScreen();
    }

    [STAThread]
    static void Main()
    {
        Application.SetHighDpiMode(HighDpiMode.SystemAware);
        Application.EnableVisualStyles();
        Application.Run(new MyForm());
    }
}

The example displays a main window on the screen. The window is centered.

using System.Windows.Forms;
using System.Drawing;

We use the Windows Forms and Drawing namespaces.

public class MyForm : Form
{
...
}

In Windows Forms, any window or a dialog is a Form. This control is a basic
container whose purpose is to display other child controls. The
MyForm inherits from a form. This way it becomes a form itself.

public MyForm()
{
    InitComponents();
}

As a good programming practice, the form initialization is delegated to the
InitComponents method.

private void InitComponents()
{
    Text = "First application";
    ClientSize = new Size(800, 450);
    CenterToScreen();
}

Text and Size are properties of a form. Changing these
properties, we modify our form control. The first line displays text "First
application" in the titlebar of the form control. The second line sets the size
of the client area of the form. The CenterToScreen method centers
the form on the screen.

[STAThread]
static void Main()
{
...
}

The Main method is an entry point to the application.
Windows Forms applications must declare the [STAThread] attribute;
otherwise, the controls might not work correctly. This tells to use single-threaded
apartment model instead of multi-threaded.

Application.SetHighDpiMode(HighDpiMode.SystemAware);

With the SetHighDpiMode method, we ensure that our application
looks good on any display resolution.

Application.EnableVisualStyles();

The EnableVisualStyles method enables visual styles. The
application will use the built-in Windows theming to style controls instead of
the classic Windows look and feel.

Application.Run(new MyForm());

The Run method starts the application. It begins running a
standard application message loop on the current thread, and makes the specified
form visible.

## Windows Forms Centering Example

This example shows how to center a Windows Forms application window on the
screen. Centering the main window provides a better user experience and
ensures the application is easily visible when launched.

Program.cs
  

using System.Windows.Forms;
using System.Drawing;

namespace CenteredApp;

public class MyForm : Form
{
    public MyForm()
    {
        Text = "Centered App";
        ClientSize = new Size(400, 250);
        CenterToScreen();
    }

    [STAThread]
    static void Main()
    {
        Application.SetHighDpiMode(HighDpiMode.SystemAware);
        Application.EnableVisualStyles();
        Application.Run(new MyForm());
    }
}

The CenterToScreen method centers the window on the screen
when the application starts. This is a simple way to make your app appear
in the middle of the user's display.

## Windows Forms tooltips

A tooltip is a small rectangular pop-up window that displays a brief
description of a control's purpose when the user rests the pointer on the
control.

Program.cs
  

using System.Drawing;
using System.Windows.Forms;

namespace Tooltips;

public class MyForm : Form
{
    private FlowLayoutPanel flowPanel;

    public MyForm()
    {
        InitComponents();
    }

    private void InitComponents()
    {
        Text = "Tooltips";
        ClientSize = new Size(800, 450);

        flowPanel = new FlowLayoutPanel();

        var ftip = new ToolTip();
        ftip.SetToolTip(flowPanel, "This is a FlowLayoutPanel");

        flowPanel.Dock = DockStyle.Fill;
        flowPanel.BorderStyle = BorderStyle.FixedSingle;

        var button = new Button();
        button.Text = "Button";
        button.AutoSize = true;

        var btip = new ToolTip();
        btip.SetToolTip(button, "This is a Button Control");

        var button2 = new Button();
        button2.Text = "Button 2";
        button2.AutoSize = true;

        flowPanel.Controls.Add(button);
        flowPanel.Controls.Add(button2);
        Controls.Add(flowPanel);

        CenterToScreen();
    }

    [STAThread]
    static void Main()
    {
        Application.SetHighDpiMode(HighDpiMode.SystemAware);
        Application.EnableVisualStyles();
        Application.Run(new MyForm());
    }
}

The code example creates a tooltip for two controls: one Button
control and the Form control.

flowPanel = new FlowLayoutPanel();

We place two buttons on the FlowLayoutPanel. It dynamically lays out its
contents horizontally or vertically. (The default dimension is vertical.)

var ftip = new ToolTip();
ftip.SetToolTip(flowPanel, "This is a FlowLayoutPanel");

We create a new tooltip. With the SetToolTip, we assign the
tooltip to the FlowLayoutPanel control.

flowPanel.Dock = DockStyle.Fill;

The FlowLayoutPanel fills the entire area of the form control.

var button = new Button();
button.Text = "Button";
button.AutoSize = true;

A new Button control is created. We set its text with
the Text property and size it automatically to fit the text
size.

var btip = new ToolTip();
btip.SetToolTip(button, "This is a Button Control");

A tooltip is added to the first Button control.

flowPanel.Controls.Add(button);
flowPanel.Controls.Add(button2);
Controls.Add(flowPanel);

The buttons are added to the flow panel and the flow panel is added
to the form.

## Windows Forms Quit button

Button control represents a Windows button control. It can be
clicked by using the mouse, Enter key, or Spacebar if the
button has focus.

Program.cs
  

using System.Windows.Forms;
using System.Drawing;

namespace QuitButton;

class MyForm : Form
{
    private FlowLayoutPanel flowPanel = new();

    public MyForm()
    {
        InitComponents();
    }

    private void InitComponents()
    {
        Text = "Quit button";
        ClientSize = new Size(800, 450);

        flowPanel = new FlowLayoutPanel();

        flowPanel.Dock = DockStyle.Fill;
        flowPanel.BorderStyle = BorderStyle.FixedSingle;

        var button = new Button();
        button.Margin = new Padding(10, 10, 0, 0);

        button.Text = "Quit";
        button.AutoSize = true;
        button.Click += (_, _) =&gt; Close();

        flowPanel.Controls.Add(button);
        Controls.Add(flowPanel);

        CenterToScreen();
    }

    [STAThread]
    static void Main()
    {
        Application.SetHighDpiMode(HighDpiMode.SystemAware);
        Application.EnableVisualStyles();
        Application.Run(new MyForm());
    }
}

The example creates a Quit button control; the application terminates when
we click on the button.

var button = new Button();
button.Margin = new Padding(10, 10, 0, 0);

The button has some margin around its borders. We add some space to the
left and above the button control.

button.Click += (_, _) =&gt; Close();

We plug an event handler to the Click event. When we click on the
button, the application is closed with the Close method. Since 
we do not work with the sender object and event arguments, we use discards.

## Windows Forms Label

Label is a simple control for displaying text or images. It does
not receive focus.

Program.cs
  

using System.Drawing;
using System.Windows.Forms;

namespace LabelEx;

public class MyForm : Form
{
    public MyForm()
    {
        InitUI();
    }

    private void InitUI()
    {
        string text = @"
Spending my time
Watching the days go by
Feeling so small, I stare at the wall
Hoping that you think of me too
I'm spending my time

I try to call but I don't know what to tell you
I leave a kiss on your answering machine
Oh, help me please, is there someone who can make me
Wake up from this dream?
";

        var font = new Font("Serif", 10);

        var lyrics = new Label();
        lyrics.Parent = this;
        lyrics.Text = text;
        lyrics.Font = font;
        lyrics.Location = new Point(10, 10);
        lyrics.AutoSize = true;

        CenterToScreen();

        Text = "Label";
        AutoSize = true;
        CenterToScreen();
    }

    [STAThread]
    static void Main()
    {
        Application.SetHighDpiMode(HighDpiMode.SystemAware);
        Application.EnableVisualStyles();
        Application.Run(new MyForm());
    }
}

The example displays lyrics using the Label control.

var font = new Font("Serif", 10);

We use this font to display the text.

var lyrics = new Label();
lyrics.Parent = this;
lyrics.Text = text;
lyrics.Font = font;
lyrics.Location = new Point(10, 10);
lyrics.AutoSize = true;

The label control is created. It is located at the x=10, y=10
coordinate on the form.

Text = "Label";
AutoSize = true;
CenterToScreen();

The main window is automatically sized to fit the lyrics.

## Windows Forms CheckBox

CheckBox is a control that has two states: on and off. It is a box
with a label or an image. If the CheckBox is checked, it is
represented by a tick in a box.

Program.cs
  

using System.Windows.Forms;
using System.Drawing;

namespace CheckBoxEx;

class MyForm : Form
{
   private FlowLayoutPanel FlowPanel = new();

    public MyForm()
    {
        InitUI();
    }

    private void InitUI()
    {
        Text = "CheckBox";
        ClientSize = new Size(450, 250);

        FlowPanel = new FlowLayoutPanel();

        var pad = new Padding(20);

        var cb = new CheckBox();
        cb.Margin = pad;
        cb.Parent = this;
        cb.Text = "Show Title";
        cb.AutoSize = true;
        cb.Checked = true;

        cb.CheckedChanged += new EventHandler(OnChanged);

        FlowPanel.Controls.Add(cb);
        Controls.Add(FlowPanel);

        CenterToScreen();
    }

    void OnChanged(object sender, EventArgs e)
    {
        if (((CheckBox )sender).Checked)
        {
            Text = "CheckBox";
        }
        else
        {
            Text = "";
        }
    }

    [STAThread]
    static void Main()
    {
        Application.SetHighDpiMode(HighDpiMode.SystemAware);
        Application.EnableVisualStyles();
        Application.Run(new MyForm());
    }
}

The code example shows or hides the title of the window depending on its state.

var pad = new Padding(20);

cb = new CheckBox();
cb.Margin = pad;
cb.Parent = this;
cb.Text = "Show Title";
cb.AutoSize = true;
cb.Checked = true;

When the application starts, we show the title. And we set the
CheckBox control to checked state.

cb.CheckedChanged += new EventHandler(OnChanged);

When we click on the CheckBox control, the
CheckedChanged event is triggered.

void OnChanged(object sender, EventArgs e)
{
    if (((CheckBox )sender).Checked)
    {
        Text = "CheckBox";
    }
    else
    {
        Text = "";
    }
}

Depending on the value of the Checked property, we toggle the title
of the window.

## Windows Forms simple menu

A menubar is a collection of menus. A menu groups commands of an application.

Program.cs
  

using System.Drawing;
using System.Windows.Forms;

namespace MenuEx;

class MyForm : Form
{
    public MyForm()
    {
        Text = "Simple menu";

        var ms = new MenuStrip();
        ms.Parent = this;

        var fileMenuItem = new ToolStripMenuItem("&amp;File");
        var exitMenuItem = new ToolStripMenuItem("&amp;Exit", 
            null, (_, _) =&gt; Close());

        exitMenuItem.ShortcutKeys = Keys.Control | Keys.X;
        fileMenuItem.DropDownItems.Add(exitMenuItem);

        ms.Items.Add(fileMenuItem);
        MainMenuStrip = ms;
        ClientSize = new Size(450, 300);

        CenterToScreen();
    }

    [STAThread]
    static void Main()
    {
        Application.SetHighDpiMode(HighDpiMode.SystemAware);
        Application.EnableVisualStyles();
        Application.Run(new MyForm());
    }
}

In our example, we have a menubar and one menu. Inside a menu there is one menu
item. If we select the menu item, application is closed.

The application can be closed also by using the Ctrl+X
shorcut or by pressing Alt, F, E keys.

var ms = new MenuStrip();

MenuStrip creates a menu system for our form. We add
ToolStripMenuItem objects to the MenuStrip that represent
the individual menu commands in the menu structure. Each ToolStripMenuItem
can be a command for your application or a parent menu for other submenu items.

var fileMenuItem = new ToolStripMenuItem("&amp;File");

Here we create a menu with the ToolStripMenuItem.

var exitMenuItem = new ToolStripMenuItem("&amp;Exit", 
    null, (_, _) =&gt; Close());

This line creates the exit menu item.

exitMenuItem.ShortcutKeys = Keys.Control | Keys.X;

We provide a shortcut for the exit menu item.

fileMenuItem.DropDownItems.Add(exitMenuItem);

The exit menu item is added to the drop down items of the menu object.

ms.Items.Add(fileMenuItem);

Here we add the menu object into the menu strip.

MainMenuStrip = ms;

The MenuStrip is plugged into the form. In other words,
the menubar is added to the main window of the application.

## Windows Forms painting rectangles

Painting is done with  the painting API provided by the Windows Forms. The
painting is done within a method, that we plug into the Paint
event.

Program.cs
  

using System.Drawing;

using System.Windows.Forms;

namespace RectanglesEx;

class Program : Form
{
    public Program()
    {
        InitUI();
    }

    private void InitUI()
    {
        Text = "Rectangles";
        Paint += new PaintEventHandler(OnPaint);

        ClientSize = new Size(550, 450);
        CenterToScreen();
    }

    void OnPaint(object sender, PaintEventArgs e)
    {
        Graphics g = e.Graphics;

        g.FillRectangle(Brushes.Sienna, 10, 15, 90, 60);
        g.FillRectangle(Brushes.Green, 130, 15, 90, 60);
        g.FillRectangle(Brushes.Maroon, 250, 15, 90, 60);
        g.FillRectangle(Brushes.Chocolate, 10, 105, 90, 60);
        g.FillRectangle(Brushes.Gray, 130, 105, 90, 60);
        g.FillRectangle(Brushes.Coral, 250, 105, 90, 60);
        g.FillRectangle(Brushes.Brown, 10, 195, 90, 60);
        g.FillRectangle(Brushes.Teal, 130, 195, 90, 60);
        g.FillRectangle(Brushes.Goldenrod, 250, 195, 90, 60);
    }

    [STAThread]
    static void Main()
    {
        Application.SetHighDpiMode(HighDpiMode.SystemAware);
        Application.EnableVisualStyles();
        Application.Run(new Program());
    }
}

We draw nine rectangles with nine different colours.

Paint += new PaintEventHandler(OnPaint);

Paint events are delivered to the OnPaint method.

void OnPaint(object sender, PaintEventArgs e)
{
    ...
}

This is the signature of the OnPaint method.

Graphics g = e.Graphics;

In order to paint on the form, we must get the Graphics object.
Painting on a form is actually calling various methods of the
Graphics object.

g.FillRectangle(Brushes.Sienna, 10, 15, 90, 60);

The FillRectagle method fills a specified rectangle with a brush.
A brush can be a colour or a pattern. There are some predefined colours
available. We can get them from the Brushes
enumeration. The last four values are the x, y values of the topleft point and
the width and height of the rectangle.

## Windows Forms Message Boxes

Message boxes are commonly used in Windows Forms applications to display
information, warnings, errors, or to prompt the user for confirmation. The
MessageBox class provides static methods to show different types of
message dialogs with various buttons and icons.

Program.cs
  

using System.Windows.Forms;
using System.Drawing;

namespace MessageBoxEx;

class MyForm : Form
{
    public MyForm()
    {
        Text = "MessageBox demo";
        ClientSize = new Size(400, 200);
        CenterToScreen();

        var btn = new Button();
        btn.Text = "Show Message Boxes";
        btn.AutoSize = true;
        btn.Click += (s, e) =&gt; ShowMessages();
        Controls.Add(btn);
    }

    private void ShowMessages()
    {
        MessageBox.Show("This is an information message.", "Info");
        MessageBox.Show("This is a warning message.", "Warning", 
            MessageBoxButtons.OK, MessageBoxIcon.Warning);
        MessageBox.Show("This is an error message.", "Error", 
            MessageBoxButtons.OK, MessageBoxIcon.Error);
        var result = MessageBox.Show("Do you want to continue?", 
            "Question", MessageBoxButtons.YesNo, MessageBoxIcon.Question);

        if (result == DialogResult.Yes)
        {
            MessageBox.Show("You chose Yes.");
        }
        else
        {
            MessageBox.Show("You chose No.");
        }
    }

    [STAThread]
    static void Main()
    {
        Application.SetHighDpiMode(HighDpiMode.SystemAware);
        Application.EnableVisualStyles();
        Application.Run(new MyForm());
    }
}

This example demonstrates how to display different types of message boxes: an
information message, a warning, an error, and a question dialog with Yes/No
options. The MessageBox class allows you to customize the dialog's
title, buttons, and icon, making it a versatile tool for user interaction and
feedback in your applications.

## Source

[Windows Forms documentation](https://learn.microsoft.com/en-us/dotnet/desktop/winforms/?view=netdesktop-8.0)

In this article we have created simple GUI applications in C# and Windows Forms.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).