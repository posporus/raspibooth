import secrets

def generate_auth_key(length=32):
    """
    Generate a secure authentication key.

    Parameters:
    - length (int): Length of the authentication key. Default is 32 characters.

    Returns:
    - str: Secure authentication key.
    """
    return secrets.token_hex(length)

if __name__ == "__main__":
    key = generate_auth_key()
    print(key)
