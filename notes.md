# decrypting problem
I think i need to write a seperate test server for testing decrypting functions.
Will setup a simple html file with javascript, with oak server and this library: https://deno.land/x/ts_serve@v1.4.4
Then writing tests that uses puppeteer.

- [ ] set up simple server that serves a folder and uses ts_serve
- [ ] writing a simple html and a ts file that does the decryption
- [ ] write tests that asserts if everything works as expected. i think i can use my existing test data.

---
consider usind marionette for e2e browser tests.
https://fresh.deno.dev/docs/integrations#fresh_marionette


---
zipping video files instead of concatanate them.
- [x] function for convert .h264 to .mp4
- [ ] funciton for zipping the video files and append metadata.
- [ ] change postprocess according to use above functions.


---
The great clean up
checking tests for eache python module
- encryption/
    - [ ] test_encrypt_file.py
    - [ ] test_encrypt.py
    - [ ] test_generate_key_from_password.py
- hardware/
    - [ ] test_camera_picamera.py
    - [ ] test_button_start.py
    - [ ] test_led_strip_ringlight.py
    - [ ] test_printer_simple.py
- postprocessing/
    - [ ] test_convert_files_to_mp4
    - [ ] test_postprocess.py
    - [ ] test_write_metadata_json.py
    - [ ] test_zip_files.py
- uploader: tba
- utility/
    - [ ] test_load_config.py
    - [ ] test_random_string.py
- [ ] test_booth_runner.py
- [ ] test_independent_hardware.py
