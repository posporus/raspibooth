from base64 import urlsafe_b64encode, urlsafe_b64decode
def is_valid_aes256_key(key):
    return isinstance(key, bytes) and len(key) == 32