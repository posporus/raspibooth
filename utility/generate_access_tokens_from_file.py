from src.utility.generate_access_token import generate_access_token
import json


def generate_access_tokens_from_file(
    file: str = "../shared_test_files/test_archives/test_data.json",
    token_part_length: int = 5,
) -> str:
    """
    Generates access tokens from a JSON file.

    :param file: The path to the JSON file
    :param token_part_length: The length of each part of the token
    :return: A string containing the access tokens, separated by newlines
    """
    # Load the JSON file
    with open(file, "r") as f:
        data = json.load(f)

    # Generate access tokens for each item in the list
    tokens = [
        generate_access_token(item["fileId"], item["password"], token_part_length)
        for item in data
    ]

    # Join the tokens into a single string, with one token per line
    return "\n".join(tokens)
