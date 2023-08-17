## Generating Test Content

This section describes how to generate test content, including raw test videos and encrypted test videos.

### Recording Raw Test Videos

You can record raw test videos using a Raspberry Pi camera. The videos are saved in the H.264 format.

#### Usage

You can run the script from the command line with the following syntax:

```bash
python record_raw_test_video.py [-w width] [-ht height] [-f fps] [-d duration] [-n num-recordings] [-r rotation]
```

All options are optional. If you don't specify an option, the script will use the default value.

#### Options

- `-w`, `--width`: The width of the video in pixels. The default is 480.

- `-ht`, `--height`: The height of the video in pixels. The default is 640.

- `-f`, `--fps`: The frames per second. The default is 30.

- `-d`, `--duration`: The duration of the video in milliseconds. The default is 1000.

- `-n`, `--num-recordings`: The number of recordings to make. The default is 4.

- `-r`, `--rotation`: The rotation of the camera in degrees. The default is 90.

#### Example

To record a 640x480 video at 30 frames per second for 2 seconds, with a rotation of 180 degrees, and make 5 recordings, you would run the script like this:

```bash
python record_raw_test_video.py -w 640 -ht 480 -f 30 -d 2000 -n 5 -r 180
```

#### Output

The script saves the recorded videos in the `shared_test_files/` directory. The filename of each video includes the width, height, frames per second, duration, and rotation.

### Generating Encrypted Test Videos

You can generate encrypted test videos using the `generate_encrypted_test_videos.py` script. This script uses the encryption module of the booth to generate test files. The generated files can be used for testing client decryption.

#### Usage

You can run the script from the command line with the following syntax:

```bash
python generate_encrypted_test_videos.py num_testfiles [-w]
```

Replace `num_testfiles` with the number of test files you want to generate. The `-w` option is optional and can be used to wipe the output directory before generating new files.

#### Output

The script saves the encrypted test videos in the `shared_test_files/encrypted_test_videos/` directory. It also generates a `test_data.json` file that contains the file ID, password, salt, and key for each test file.

### Generating Encrypted Test Videos

This script allows you to generate encrypted test videos using the encryption module of the booth. The generated files can be used for testing client decryption.

#### Usage

You can run the script from the command line with the following syntax:

```bash
python generate_encrypted_test_videos.py num_testfiles [-w]
```

Replace `num_testfiles` with the number of test files you want to generate. The `-w` option is optional and can be used to wipe the output directory before generating new files.

#### Options

- `num_testfiles`: The number of test files to generate. This argument is required.

- `-w`, `--wipe`: If specified, the output directory will be wiped before generating new files. This option is optional.

#### Example

To generate 10 test files and wipe the output directory before generating new files, you would run the script like this:

```bash
python generate_encrypted_test_videos.py 10 -w
```

#### Output

The script saves the encrypted test videos in the `shared_test_files/encrypted_test_videos/` directory. It also generates a `test_data.json` file that contains the following information for each test file:

- `fileId`: A randomly generated string that serves as the unique identifier for the test file.
- `password`: A randomly generated string that is used as the password for encryption.
- `salt`: A string derived from the fileId that is used as the salt for encryption.
- `key`: The encryption key generated from the password and salt. This key is necessary for decrypting the test files.

This information is necessary for decrypting the test files. The `test_data.json` file allows you to keep track of the encryption details for each test file without having to remember or manually record them.