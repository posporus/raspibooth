from escpos.printer import Serial

""" 9600 Baud, 8N1, Flow Control Enabled """
p = Serial(devfile='/dev/serial0',
           baudrate=9600,
           bytesize=8,
           parity='N',
           stopbits=1,
           timeout=1.00,
           dsrdtr=True)

p.text("Thank you for choosing\nRaspiBooth!\n")
#images not working very well :(
#p.image("./tmp/picture.png", impl='bitImageRaster')
p.qr("http://www.posporus.de", size=6)
p.cut()