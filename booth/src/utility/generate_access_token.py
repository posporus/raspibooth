def generate_access_token(file_id: str, password: str, token_part_length=5):
    full_string = file_id + password
    token_parts = [
        full_string[i : i + token_part_length]
        for i in range(0, len(full_string), token_part_length)
    ]

    return "-".join(token_parts)