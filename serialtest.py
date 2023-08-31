import serial
import time

# Open the serial port
ser = serial.Serial('/dev/ttyUSB0', 115200, timeout=1)
ser.flush()

# while True:
# Send a command to WLED
# ser.write(b'{"on":"t","v":true}\n')  # Requesting the current state and info in JSON format
ser.write(b'{"ps":"1","v":true}\n')
time.sleep(2)  # Wait for a second
ser.write(b'{"ps":"2","v":true}\n')
time.sleep(2)  # Wait for a second
ser.write(b'{"ps":"2","v":true}\n')
time.sleep(2)  # Wait for a second


# Read the response
if ser.in_waiting > 0:
    line = ser.readline().decode('utf-8').rstrip()
    print(line)  # Print the response from WLED
