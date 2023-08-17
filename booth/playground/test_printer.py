from escpos.printer import Serial

""" 9600 Baud, 8N1, Flow Control Enabled """

def test_printer():
    p = Serial(devfile='/dev/serial0',
            baudrate=9600,
            bytesize=8,
            parity='N',
            stopbits=1,
            timeout=1.00,
            dsrdtr=True)

    p.text("Thank you for choosing\nRaspiBooth!\n")
    p.cut()
    return True

if __name__ == "__main__":
    test_printer()