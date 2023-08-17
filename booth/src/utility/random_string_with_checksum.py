import string
import random

characters = string.ascii_letters + string.digits

def random_string_with_checksum(password_length: int, checksum_length: int = 3) -> str:
    """
    Generates a string of a given length consisting of human easily readable characters.
    The last few characters are a checksum of the rest of the string.
    
    :param password_length: Length of the entire string including the checksum
    :param checksum_length: Length of the checksum part
    :return: A random string with a checksum
    """
    
    if checksum_length >= password_length:
        raise ValueError("Checksum length should be less than password length")
    
    # Generate the random part of the string
    random_part = "".join(random.choice(characters) for i in range(password_length - checksum_length))
    
    # Calculate the checksum
    checksum_value = sum(ord(char) for char in random_part) % (10 ** checksum_length)
    checksum_str = str(checksum_value).zfill(checksum_length)
    
    # Concatenate the random part and the checksum
    return random_part + checksum_str
