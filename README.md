# Action Photo Booth: Unleashing Creativity One Frame at a Time
Step beyond the ordinary with the Action Photo Booth. Unlike traditional photo booths, our booth captures dynamic short videos, bringing a new dimension of excitement to your memories. But that's not all—our photo booth creates an interactive environment with surprise 'action events', igniting spontaneous reactions and recording them forever.

Designed with festivals, parties, and large gatherings in mind, the Action Photo Booth doesn't just document the moment—it enhances it. Capture your guests' surprise as they're gently showered with confetti or softly illuminated by unexpected light. The result? An unforgettable experience and a unique keepsake video.

Once the Action Photo Booth has recorded its short videos, it gets to work encrypting and uploading them securely to a server. But there's no need to wait around: our booth is equipped with a thermal printer that instantly prints a QR code. Just scan the code to view your video, complete with its own unique encryption key for secure access.

So why settle for ordinary snapshots when you can capture memories in motion? Bring the Action Photo Booth to your next event and let the fun begin!

-ChatGPT 🤣

![Project Diagram](./docs/images/schema.png)


## Installation

<!--  -->

## Development

This repository is organized into two main components, each with its specific role and technology stack:

1. **booth/**
   - Written in **Python**, this component contains the code that runs on the booth. It is responsible for capturing videos and controlling the various actions of the booth.

2. **server/**
   - Developed using **TypeScript** and running in a **Deno** runtime environment, this component serves as the web server for the project. It includes an API for communication with the booth, stores all the data, and serves a client-app.




### Booth Setup

TODO: instead of installing specific dependencies for the pi, the setup script should ask for installed hardware.

The `setup.sh` script automates the setup of this project by creating a virtual Python environment, installing dependencies, and optionally installing additional Raspberry Pi-specific packages based on a command-line argument.

To run the script, follow these steps:

1. **Make the Script Executable:**
   - In your terminal, navigate to the project directory and run:
   ```bash
   chmod +x setup.sh
   ```

2. **Run the Script:**
   - To install the common dependencies, run:
   ```bash
   bash setup.sh
   ```
   - To install both the common and Raspberry Pi-specific dependencies, run:
   ```bash
   bash setup.sh pi
   ```




<!-- ## Setting PYTHONPATH
To make sure everything runs smoothly, you should the `booth/` directory in your `PYTHONPATH`. To do this, navigate to the root directory of this project and run `export PYTHONPATH="$PWD/booth/"` in the terminal. -->

## Task Script Usage

We have a shell script named `tasks.sh` in the root directory of the project that helps to automate some common tasks. Here's how you can use it:

### Running Server Tests

To run server tests, use the following command:

```bash
./tasks.sh server-test [optional file]
```

This command navigates to the `server` directory and runs `deno test --allow-all [optional file]`. If you provide an optional filename, it will run tests only for that file. Otherwise, it will run all tests.

### Running Deno Fresh

To start the Deno fresh server, use the following command:

```bash
./tasks.sh start-server
```

This command navigates to the `server` directory and runs `deno task start`.

### Running Booth Tests

To run booth tests, use the following command:

```bash
./tasks.sh booth-test [optional file]
```

This command navigates to the `booth` directory and runs `python3 -m unittest [optional file]`. If you provide an optional filename, it will run tests only for that file. Otherwise, it will run all tests.

### Making the Script Executable

If the script is not executable, you can make it executable by running the following command:

```bash
chmod +x tasks.sh
```

This command changes the permissions of the `tasks.sh` file to make it executable. After running this command, you can run the script using `./tasks.sh`.

Remember to replace `tasks.sh` with the actual path to the script if you're not in the same directory as the script.


"in some cases, using a unique, non-sensitive attribute like a file ID could be an acceptable compromise."

## Generating Test Content
[more in the docs](./docs/generating_test_content.md)

