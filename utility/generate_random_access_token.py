from src.utility.random_string_with_checksum import random_string_with_checksum
from src.utility.random_string import random_string
from src.utility.generate_access_token import generate_access_token


def generate_random_access_token(
    file_id_length=10, password_length=10, token_part_length=5, checksum_length=3
):
    file_id = random_string_with_checksum(file_id_length, checksum_length)
    password = random_string(password_length)

    return generate_access_token(file_id, password, token_part_length)
