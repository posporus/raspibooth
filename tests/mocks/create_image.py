#!/usr/bin/env python3

from PIL import Image
from pathlib import Path


def createImage(width: int, height: int, fp: str or Path):
    color = generate_random_color()
    img = Image.new("RGB", (width, height), color)
    img.save(fp)

import random

def generate_random_color():
    """Generate a random color as an RGB tuple."""
    return tuple(random.randint(0, 255) for _ in range(3))