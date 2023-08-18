import argparse
from src.utility.random_string_with_checksum import random_string_with_checksum
from src.utility.random_string import random_string


def generate_token(file_id_length, password_length, token_part_length, checksum_length):
    file_id = random_string_with_checksum(file_id_length, checksum_length)
    password = random_string(password_length)

    full_string = file_id + password
    token_parts = [
        full_string[i : i + token_part_length]
        for i in range(0, len(full_string), token_part_length)
    ]

    return "-".join(token_parts)


def main():
    parser = argparse.ArgumentParser(description="Generate Access Tokens")
    parser.add_argument(
        "--file_id_length", type=int, default=10, help="Length of the File ID"
    )
    parser.add_argument(
        "--password_length", type=int, default=10, help="Length of the Password"
    )
    parser.add_argument(
        "--token_part_length",
        type=int,
        default=5,
        help="Length of each part in the token",
    )
    parser.add_argument(
        "--checksum_length",
        type=int,
        default=3,
        help="Length of the checksum in the File ID",
    )
    args = parser.parse_args()

    token = generate_token(
        args.file_id_length,
        args.password_length,
        args.token_part_length,
        args.checksum_length,
    )
    print("Generated Token:", token)


if __name__ == "__main__":
    main()
