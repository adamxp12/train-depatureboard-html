# train-depatureboard-html
A web based train depature board. intended for Raspberry PI's with tiny 3.5" screens for desktop based departure boards on cheap.

Originally developed as a gift idea for my boyfriend who loves trains. He saw a off the shelf version of this that was kind of expensive. probably worth it given the shear effort this has taken and this is supposed to be eassier code wise as it does not use OLED/LED Matrix displays. just pure HTML to display on a TFT/LCD. the are some python code snipets on github but these are really made for dedicated OLED screens. the OLED screens cost more than the Raspberry PI and dont come with any casing. the Python code can run as a window using pygame but it would not fit my 480x320 screen.

Thus I started work on this. its got simple goals. a responsive version of that python code. sure it wont ever work on a "cheap" OLED screen. but it sure does work on one of them cheap 3.5" Waveshare LCD's that just snap onto the raspberry PI. you can buy them for £10 with a case. add a raspberry PI and boom. instantly on a winner. and unlike the OLED screens this is no doubt going to last much longer. as OLED displays are prone to burn in and simply dont last as long as a plain old TFT.

This code is provided as is. Simply edit/copy config.js.example to js/config.js file to suit your needs.

I recomend for the best smoothness you use either a HDMI display or the MHS 3.5" display they can run up to 125Mhz 60fps smooth as butter and dont use unsightly HDMI connectors so can be installed into a case. the cheap 3.5" LCD's can only muster about 21mhz without breaking. 62mhz seems to work but it causes iffy colours. spend the extra money for best results. In therory it will work with the offical raspberry PI LCD though you might need to adust the resolution/size for the bigger screen

You will need an API key from [National Rail](http://realtime.nationalrail.co.uk/OpenLDBWSRegistration)
