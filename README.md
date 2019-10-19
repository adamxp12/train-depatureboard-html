# train-depatureboard-html
A web based train depature board. intended for Raspberry PI's with tiny 3.5" screens for desktop based departure boards on cheap.

Originally developed as a gift idea for my boyfriend who loves trains. He saw a off the shelf version of this that was kind of expensive. probably worth it given the shear effort this has taken and this is supposed to be eassier code wise as it does not use OLED/LED Matrix displays. just pure HTML to display on a TFT/LCD. the are some python code snipets on github but these are really made for dedicated OLED screens. the OLED screens cost more than the Raspberry PI and dont come with any casing. the Python code can run as a window using pygame but it would not fit my 480x320 screen.

Thus I started work on this. its got simple goals. a responsive version of that python code. sure it wont ever work on a "cheap" OLED screen. but it sure does work on one of them cheap 3.5" Waveshare LCD's that just snap onto the raspberry PI. you can buy them for £10 with a case. add a raspberry PI and boom. instantly on a winner.

This code is provided as is. Simply edit the js/config.js file to suit your needs. 
