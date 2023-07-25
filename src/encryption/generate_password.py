import string
import random

characters = string.ascii_letters + string.digits


def generate_password(password_length: int) -> str:
    '''Generates a password of a given length consisting of human easily readable characters.'''
    return "".join(random.choice(characters) for i in range(password_length))
