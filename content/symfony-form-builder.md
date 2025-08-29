+++
title = "Symfony form builder"
date = 2025-08-29T20:12:43.424+01:00
draft = false
description = "Symfony form builder tutorial shows how to create HTML forms with form builders in Symfony 7.2."
image = ""
imageBig = ""
categories = ["symfony"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Symfony form builder

last modified March 3, 2025

Symfony form builder tutorial shows how to create HTML forms with form builders
in Symfony 7.2. To create forms without form builders, look at
[Symfony form tutorial](/symfony/form/).

## Symfony

Symfony is a set of reusable PHP components and a PHP framework
for web projects. Symfony was published as free software in 2005. Symfony was
heavily inspired by the Spring Framework.

## HTML form

HTML forms are used for interaction between a user and a web site or
application. They allow users to send data to the web site. An HTML Form is
made of one or more widgets. Those widgets can be text fields, select boxes,
buttons, checkboxes, or radio buttons. The widgets are often paired with a
label that describes their purpose.

## Symfony Form component

The Symfony Form component allows us to create, process and reuse HTML forms.
Symfony documentation uses the term *form type* to refer to single form fields
(e.g. &lt;input type="text"&gt;), groups of single form fields, and
the entire &lt;form&gt; tag. There are predefined form types such
as PasswordType, MoneyType, or TextType;
developers can create their own form types as well.

## Symfony form builder example

In the following example, we create an HTML form with a Symfony form
builder. The data from the form is processed by a Symfony controller.

$ symfony new myform

With symfony CLI, we create a new Symfony skeleton project.

$ cd myform

We go to the project directory.

$ composer require annotations twig form validator security-csrf

We install the following packages: annotations, twig,
form, validator, and security-csrf.

src/Form/Note.php
  

&lt;?php

namespace App\Form;

use Symfony\Component\Validator\Constraints as Assert;

class Note
{
    #[Assert\NotBlank]
    public ?string $message = '';

    #[Assert\NotBlank]
    #[Assert\Type(\DateTime::class)]
    public ?\DateTime $created = null;

    public function __construct()
    {
        $this-&gt;created = new \DateTime();
    }
}

The Note consists of two attributes: message string and created datetime.
The created datetime is going to be filled with the current datetime.

#[Assert\NotBlank]
public ?string $message = '';

The NotBlank assertion ensures that the message must not be blank.

src/Form/NoteFormType.php
  

&lt;?php

namespace App\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class NoteFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            -&gt;add('message', TextType::class, ['help' =&gt; 'Enter your Message'])
            -&gt;add('created', DateTimeType::class, ['widget' =&gt; 'single_text'])
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver-&gt;setDefaults([
            'csrf_field_name' =&gt; '_token',
        ]);
    }
}

We define the NoteFormType. It consists of two built-in types:
TextType, and DateTimeType.

$builder
    -&gt;add('message', TextType::class, ['help' =&gt; 'Enter your Message'])
    -&gt;add('created', DateTimeType::class, ['widget' =&gt; 'single_text'])
;

With the form builder, we add two built-in form types to the note form type. Each
subtype can be customized with various options, such as help or
single_text.

public function configureOptions(OptionsResolver $resolver)
{
    $resolver-&gt;setDefaults([
        'csrf_field_name' =&gt; '_token',
    ]);
}

Furthermore, we can customize the note form type in the configureOptions
function. By default, the form builder sets up the CSFR protection. For instance,
with the csrf_field_name, we can customize the name of the CSRF field used.

src/Controller/NoteController.php
  

&lt;?php

namespace App\Controller;

use App\Form\Note;
use App\Form\NoteFormType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class NoteController extends AbstractController
{
    #[Route('/note', name: 'note')]
    public function index(Request $request): Response
    {
        $note = new Note();
        $noteForm = $this-&gt;createForm(NoteFormType::class, $note);
        $noteForm-&gt;handleRequest($request);

        if ($noteForm-&gt;isSubmitted() &amp;&amp; $noteForm-&gt;isValid()) {

            $data = $noteForm-&gt;getData();
            $message = $data-&gt;message;
            $created = $data-&gt;created-&gt;format('Y-m-d h:i:s');

            return $this-&gt;redirectToRoute('success',
                ['message' =&gt; $message, 'created' =&gt; $created]);
        }

        return $this-&gt;render('note/index.html.twig', [
            'note_form' =&gt; $noteForm-&gt;createView()
        ]);
    }
}

Following the Symfony best practices, the controller both displays the form and
processes the form.

$note = new Note();
$noteForm = $this-&gt;createForm(NoteFormType::class, $note);

The form is created with the createForm function. It is passed the
form type as the first parameter.

$noteForm-&gt;handleRequest($request);

The handleRequest function checks if the form submitted any data.
If not, the data is loaded from the request and validated. The form is marked to
be submitted.

if ($noteForm-&gt;isSubmitted() &amp;&amp; $noteForm-&gt;isValid()) {

We check if the form has been submitted and if the data passed the validation.

$data = $noteForm-&gt;getData();
$message = $data-&gt;message;
$created = $data-&gt;created-&gt;format('Y-m-d h:i:s');

return $this-&gt;redirectToRoute('success',
    ['message' =&gt; $message, 'created' =&gt; $created]);

We retrieve the data and redirect to the success route.

**Note: ** Redirection after form submission is a best practice
to avoid multiple submissions.

return $this-&gt;render('note/index.html.twig', [
    'note_form' =&gt; $noteForm-&gt;createView()
]);

The render function either generates the initial form or the
form with possible errors.

src/Controller/SuccessController.php
  

&lt;?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class SuccessController extends AbstractController
{
    #[Route('/success', name: 'success')]
    public function index(Request $request): Response
    {
        $message = $request-&gt;query-&gt;get("message");
        $created = $request-&gt;query-&gt;get("created");

        return $this-&gt;render('success/index.html.twig',
            ['message' =&gt; $message, 'created' =&gt; $created]);
    }
}

The SuccessController sends the data to the appropriate Twig view.

templates/note/index.html.twig
  

{% form_theme note_form 'bootstrap_5_layout.html.twig' %}

{% extends 'base.html.twig' %}

{% block title %}Note form{% endblock %}

{% block body %}

    &lt;div class="container"&gt;

        {{ form_start(note_form) }}

        {{ form_widget(note_form) }}

        &lt;input type="submit" value="Submit" class="btn btn-success"&gt;

        {{ form_end(note_form) }}

    &lt;/div&gt;

{% endblock %}

This Twig template file contains the form. The form is rendered with the
form_start, form_widget, and form_end
directives. Theming is applied with the form_theme directive.

{% form_theme note_form 'bootstrap_5_layout.html.twig' %}

Form themes can be applied globally via configuration or locally with the
form_theme directive. Here we use the built-in Bootstrap 5 theme.

templates/success/index.html.twig
  

{% extends 'base.html.twig' %}

{% block title %}Success{% endblock %}

{% block body %}

&lt;p&gt;
    Form successfully submitted.
&lt;/p&gt;

&lt;p&gt;
    {{ message }} at {{ created }}
&lt;/p&gt;

{% endblock %}

This is the view to display the submitted data.

templates/base.html.twig
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;{% block title %}Welcome!{% endblock %}&lt;/title&gt;
    {% block stylesheets %}
         &lt;link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"
              integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous"&gt;
    {% endblock %}
&lt;/head&gt;
&lt;body&gt;
{% block body %}{% endblock %}
{% block javascripts %}{% endblock %}
&lt;/body&gt;
&lt;/html&gt;

The base.html.twig template contains code that is shared
by other template files. It now uses Bootstrap 5 for styling.

$ symfony serve

We run the application and navigate to localhost:8000/note.

In this tutorial we have generated a form with Symfony form builder.

List [all Symfony tutorials](/all/#symfony).