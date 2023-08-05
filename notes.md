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