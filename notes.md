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
- [x] funciton for zipping the video files and append metadata.
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
- hardware_mocks
    - [ ] camera_mock.py
    - [ ] test_camera_mock.py
    - [ ] button_mock.py
    - [ ] test_button_mock.py
    - [ ] printer_mock.py
    - [ ] test_printer_mock.py
    - [ ] led_strip_mock.py
    - [ ] test_led_strip_mock.py
- postprocessing/
    - [ ] test_convert_files_to_mp4
    - [ ] test_postprocess.py
    - [ ] test_write_metadata_json.py
    - [ ] test_zip_files.py
- uploader: tba
- utility/
    - [ ] test_load_config.py
    - [ ] test_random_string.py
- hardware_isolated
    - [ ] test_isolated_hardware.py
- [ ] test_booth_runner.py


# plus

Uberspace mit Github syncen
- https://matthias-andrasch.eu/2021/tutorial-webseite-mittels-github-actions-deployment-zu-uberspace-uebertragen-rsync/

# Readme

## Development Status
### Milestone 1
- [x] picamera for video revording
- [x] ws281x ringlight as status light and flash
- [x] hardware start button
- [ ] simple thermal printer for printing qr code and/or token
- [x] simple server api w/ auth mechanism
- [x] client web app for viesing videos
- [x] AES-256 e2e encryption
- [x] url w/ fileId and encryption password
- [x] alternative: access token
- [x] fileId checksum to validate in browser
- [x] programable timeline using Yaml files
- [ ] multithreading
- [ ] email subsctiption to get informed on upload
- [ ] optional safe credentials in localStorage
- [ ] build a small (wall mounded) prototype
- [ ] testing on a party
- [ ] setup script for configuring python project under different conditions

### Milestone 2
- [ ] DMX for controlling lights and actions
- [ ] building custom, simple dmx devices
- [ ] Multi channel audio output
- [ ] writin concepts for "action photo sessions"
- [ ] record/produce audio
- [ ] browser notification to get informed on upload
- [ ] build an actual photo booth prototype
- [ ] bring this to another party!

## Development
## Securit