+++
title = "Python Google translator"
date = 2025-08-29T20:08:37.409+01:00
draft = false
description = "Python Google translator tutorial shows how to translate text in Python with googletrans module."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python Google translator

last modified January 29, 2024

Python Google translator tutorial shows how to translate text in Python with
googletrans module.

Python googletrans is a module to translate text. It uses the
Google Translate Ajax API to detect langauges and translate text.

## Python googletrans list languages

In the first example, we list supported languages. 

languages.py
  

#!/usr/bin/python

import googletrans

print(googletrans.LANGUAGES)

The program lists all supported languages in a Python dictionary.

import googletrans

We import the googletrans module.

print(googletrans.LANGUAGES)

We print the googletrans.LANGUAGES variable.

$ languages.py
{'af': 'afrikaans', 'sq': 'albanian', 'am': 'amharic', 'ar': 'arabic', 'hy': 'armenian', 
'az': 'azerbaijani', 'eu': 'basque', 'be': 'belarusian', 'bn': 'bengali', 'bs': 'bosnian', 
'bg': 'bulgarian', 'ca': 'catalan', 'ceb': 'cebuano', 'ny': 'chichewa', 
'zh-cn': 'chinese (simplified)', 'zh-tw': 'chinese (traditional)', 'co': 'corsican', 
'hr': 'croatian', 'cs': 'czech', 'da': 'danish', ... }

In the output, we can see the supported languages.

## Python googletrans detect langauges

The googletrans can be used to detect languages.

detecting.py
  

#!/usr/bin/python

from googletrans import Translator

text1 = '''
A Római Birodalom (latinul Imperium Romanum) az ókori Róma által létrehozott 
államalakulat volt a Földközi-tenger medencéjében
'''

text2 = '''
Vysoké Tatry sú najvyššie pohorie na Slovensku a v Poľsku a sú zároveň jediným 
horstvom v týchto štátoch s alpským charakterom. 
'''

translator = Translator()

dt1 = translator.detect(text1)
print(dt1)

dt2 = translator.detect(text2)
print(dt2)

In the examples, we have two different texts. We use the detect method
to determine the lanugage of the text.

from googletrans import Translator

We import the Translator, which is used to do translations.

text1 = '''
A Római Birodalom (latinul Imperium Romanum) az ókori Róma által létrehozott 
államalakulat volt a Földközi-tenger medencéjében
'''

text2 = '''
Vysoké Tatry sú najvyššie pohorie na Slovensku a v Poľsku a sú zároveň jediným 
horstvom v týchto štátoch s alpským charakterom. 
'''

These are the two texts to be translated. The first is Hungarian, the second Slovak.

translator = Translator()

An instance of the Translator is created.

dt1 = translator.detect(text1)
print(dt1)

We determine the language of the text with detect
and print the result to the console. The method prints the 
language and the confidence value, which is the probability of the 
correct guess of the language.

$ ./detecting.py
Detected(lang=hu, confidence=1.0)
Detected(lang=sk, confidence=1.0)

The two languages were correctly detected.

## Python googletrans simple translation

The translation is done with the Translator's translate
method.

simple.py
  

#!/usr/bin/python

from googletrans import Translator

translator = Translator()
translated = translator.translate('Бороди́нское сраже́ние')

print(translated.text)

If we do not specify the source and the destination languages, 
googletrans tries to detect the language and translates
it into English.

translated = translator.translate('Бороди́нское сраже́ние')

We translate a Russian text. We get a tranlated object.

print(translated.text)

To get the translation, we print the text field of 
the translated object.

$ ./simple.py
Battle of Borodino

## The source and destination languages

In the following example, we specify the source and the 
destination languages. 

source_dest.py
  

#!/usr/bin/python

from googletrans import Translator

translator = Translator()

translated = translator.translate('svízelná situace', src='cs', dest='hu')

print(translated.text)

The example translates a Czech text into Hungarian.

translated = translator.translate('svízelná situace', src='cs', dest='hu')

The source language is specified with the src option and the 
destination with the dest option. 

$ ./source_dest.py
bizonytalan helyzetben

## Python googletrans translate list

We can translate a list of texts.

translate_list.py
  

#!/usr/bin/python

from googletrans import Translator

translator = Translator()

data = ['Dobrý deň', 'majestátny orol', 'krehká dohoda']

translated = translator.translate(data, src='sk', dest='en')

for trans in translated:
    print(f'{trans.origin} -&gt; {trans.text}')

In the example, we translate three text values in a Python list.

$ ./translate_list.py
Dobrý deň -&gt; Good day
majestátny orol -&gt; majestic eagle
krehká dohoda -&gt; fragile agreement

## Source

[Python Googletrans documentation](https://py-googletrans.readthedocs.io/en/latest/)

In this article we have worked with the Python Google translator.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).