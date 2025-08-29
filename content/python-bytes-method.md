+++
title = "Python __bytes__ Method"
date = 2025-08-29T20:08:02.710+01:00
draft = false
description = "Complete guide to Python's __bytes__ method covering object serialization, binary representation, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python __bytes__ Method

Last modified April 8, 2025

This comprehensive guide explores Python's __bytes__ method, the
special method that returns a bytes representation of an object. We'll cover
basic usage, serialization, binary data handling, and practical examples.

## Basic Definitions

The __bytes__ method returns a bytes object representing the
object's value. It's called by the built-in bytes() function.

Key characteristics: it takes no parameters (except self), must return a bytes
object, and is used for serialization or binary representation of objects.
Unlike __str__, it focuses on binary data rather than text.

## Basic __bytes__ Implementation

Here's a simple implementation showing how __bytes__ converts an
object to its binary representation. This is the foundation for more complex
examples.

basic_bytes.py
  

class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __bytes__(self):
        return bytes([self.x, self.y])

p = Point(3, 4)
print(bytes(p))  # b'\x03\x04'

This example converts a Point object to a bytes object containing its
coordinates. The __bytes__ method packs the x and y values into
a bytes object using the bytes() constructor.

The output shows the two bytes representing the coordinates 3 and 4 in
hexadecimal format. This is a simple but effective binary representation.

## Serializing Complex Objects

__bytes__ can serialize more complex objects by combining multiple
values into a structured binary format. This is useful for network transmission
or file storage.

complex_serialization.py
  

import struct

class Person:
    def __init__(self, name, age, height):
        self.name = name
        self.age = age
        self.height = height
    
    def __bytes__(self):
        name_bytes = self.name.encode('utf-8')
        return struct.pack(
            f'I{len(name_bytes)}sIf',
            len(name_bytes),
            name_bytes,
            self.age,
            self.height
        )

person = Person("Alice", 30, 1.75)
print(bytes(person))  # Binary representation

This example uses the struct module to create a packed binary
representation of a Person object. It handles variable-length strings by
including the length prefix.

The format string I{len(name_bytes)}sIf specifies: unsigned int
for length, bytes for name, unsigned int for age, and float for height.
This creates a well-defined binary structure.

## Network Protocol Implementation

__bytes__ is particularly useful for implementing network protocols
where objects need to be converted to specific binary formats for transmission.

network_protocol.py
  

class NetworkPacket:
    def __init__(self, packet_type, sequence, payload):
        self.packet_type = packet_type
        self.sequence = sequence
        self.payload = payload
    
    def __bytes__(self):
        header = bytes([
            self.packet_type,
            (self.sequence &gt;&gt; 8) &amp; 0xFF,
            self.sequence &amp; 0xFF,
            len(self.payload)
        ])
        return header + self.payload

packet = NetworkPacket(1, 256, b'Hello')
print(bytes(packet))  # b'\x01\x01\x00\x05Hello'

This NetworkPacket class implements a simple protocol header followed by
payload data. The header contains type, sequence number (as two bytes),
and payload length.

The __bytes__ method carefully constructs the binary representation
by packing the header fields and concatenating the payload. This format could
be sent over a network connection.

## Custom Binary File Format

__bytes__ can be used to create objects that know how to serialize
themselves into custom binary file formats, enabling efficient storage.

binary_file_format.py
  

class BMPHeader:
    def __init__(self, width, height):
        self.width = width
        self.height = height
        self.file_size = 54 + (width * height * 3)
    
    def __bytes__(self):
        return (
            b'BM' +                     # Signature
            self.file_size.to_bytes(4, 'little') +
            bytes(4) +                  # Reserved
            (54).to_bytes(4, 'little') + # Pixel data offset
            (40).to_bytes(4, 'little') + # DIB header size
            self.width.to_bytes(4, 'little') +
            self.height.to_bytes(4, 'little') +
            (1).to_bytes(2, 'little') + # Planes
            (24).to_bytes(2, 'little') + # Bits per pixel
            bytes(24)                   # Padding
        )

header = BMPHeader(800, 600)
with open('image.bmp', 'wb') as f:
    f.write(bytes(header))

This example creates a simplified BMP file header. The __bytes__
method constructs the binary format by combining various fields with specific
byte ordering and padding.

Each field is converted to bytes with the correct size and endianness. The
result can be written directly to a file to create a valid (though empty)
BMP image file.

## Versioned Serialization

More complex systems can use __bytes__ to implement versioned
serialization, where the binary format changes based on version requirements.

versioned_serialization.py
  

class Config:
    VERSION = 2
    
    def __init__(self, settings):
        self.settings = settings
    
    def __bytes__(self):
        if self.VERSION == 1:
            return self._v1_serialize()
        else:
            return self._v2_serialize()
    
    def _v1_serialize(self):
        return b'\x01' + b','.join(
            f"{k}={v}".encode('ascii') for k, v in self.settings.items()
        )
    
    def _v2_serialize(self):
        items = []
        for k, v in self.settings.items():
            key = k.encode('utf-8')
            val = str(v).encode('utf-8')
            items.append(len(key).to_bytes(2, 'big') + key +
                     len(val).to_bytes(2, 'big') + val)
        return b'\x02' + b''.join(items)

config = Config({'width': 1024, 'height': 768})
print(bytes(config))  # Version 2 binary format

This Config class implements two versions of binary serialization. Version 1
uses a simple comma-separated format, while Version 2 uses length-prefixed
UTF-8 strings for better international support.

The __bytes__ method acts as a dispatcher, choosing the
appropriate serialization method based on the VERSION class attribute.
This pattern allows for format evolution while maintaining backward
compatibility.

## Best Practices

- **Consistent format:** Maintain a stable binary format for serialized data

- **Document format:** Clearly document your binary representation

- **Consider endianness:** Be explicit about byte ordering

- **Handle versioning:** Include version markers for format evolution

- **Error handling:** Validate data can be converted to bytes

## Source References

- [Python __bytes__ Documentation](https://docs.python.org/3/reference/datamodel.html#object.__bytes__)

- [Python struct Module Docs](https://docs.python.org/3/library/struct.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).