# Code.org Tools

### Password Hider
Code.org compleltly lacks features to hide the input of textboxs, to fix I developed a simple script that can be used to hide what the user is entering. <a href="https://studio.code.org/projects/applab/vWDmwx9A3KwcT9HndDwlVHap_pCWW7qJyJPoV9efDXg">https://studio.code.org/projects/applab/vWDmwx9A3KwcT9HndDwlVHap_pCWW7qJyJPoV9efDXg</a> This app shows a working example of the script alongside the short 30 lines required to run it.
### Image to Hexadecimal
Unit 2 Lesson 4 on AP Computer Science Principles on Code.org requires one to encode an image into a long string of hexadecimal pixels. This process takes way to long so for that class I build <a href="https://studio.code.org/projects/applab/tOhbX4IqHn4JUC8hH_PtcCWbW09RQJSor7v72pZF_ok">https://studio.code.org/projects/applab/tOhbX4IqHn4JUC8hH_PtcCWbW09RQJSor7v72pZF_ok</a> to steamline the process.

### Importing External Javascript Libraries
Some javascript libraries can be loaded into code.org, it just requires that they don't interact with DOM and that they only use functions allowed by code.org. Loading these resources only requires a few lines of code
```javascript
var sha256 = undefined;

startWebRequest("https://raw.githubusercontent.com/emn178/js-sha256/master/src/sha256.js", function(status, type, content) {
  eval(content);
  console.log(sha256('Hi there'));
});
```
Above is an example of loading js-sha256. Notice a few things, the first one being raw.githubusercontent.com. The startWebRequest only allows a few domains to be loaded from and raw.githubusercontent.com is one of them. If required just push any javascript libraries into a github repo. The second important thing being the "var sha256" at the top, make sure to define the variable that the library would be using so that the variable can be called and interacted with later. A working example is <a href="https://studio.code.org/projects/applab/PB9-bYEGm1oqLnhEgrUDZjxVYuc9LPdUiS3QSLgKcsg">https://studio.code.org/projects/applab/PB9-bYEGm1oqLnhEgrUDZjxVYuc9LPdUiS3QSLgKcsg</a> a sha256 hashing app

### Sprite Management
The code.org applab has no easy way to manage or move around objects if one wanted to make a game. To fix this I created a short (120 line) class for controlling sprites. A working example is found <a href="https://studio.code.org/projects/applab/tDDQKOfNXctC9k9OozXX_qRtwsP32lvGwL7a-X_rOus">https://studio.code.org/projects/applab/tDDQKOfNXctC9k9OozXX_qRtwsP32lvGwL7a-X_rOus</a>. Interacting with the created sprite is fairly simple.
```javascript
var player = new sprite("player", {
    name: "herohamp"
});
```
The breakdown of this function is simple, it sets the variable player equal to a new Sprite. This new sprite controls the GUI element with the ID of "player", as shown by the first argument of the new Sprite call. The next is an object of variables for the sprite. This are not used by the sprite class itself, but for the programmer if they want to store bits of data inside each sprite.

Interacting with the sprite is made to be as simple as possible, there are 4 variables that the programmer can interact with, the x, y, width, and height of the sprite. All of these can simply be accessed by calling the sprite.x, sprite.y, etc. These values can also be written to via sprite.x = 50. This is much simplier than the code.org method for interacting with these as it requires setting the x, y, width, and height all at the same time.

There are also a few other functions for interacting with the sprite. The .hide function hides the sprite and the .show function shows it. The .contain function is passed two arrays with x and y cordinates and limits the sprite to being in that box.
```javascript
player.constrain([0, 0], [320, 550]);
```
The .colCheck function is used to check collision between two Sprites. To use this you pass the sprite you want to check collision.
```javascript
var col = player.colCheck(platform, "tblr");
if (col.hit == "b"){
  if (player.ym > 0){
    player.ym = 1;
    player.onGround = true;
  }
}
```
This above script checks to see if the player is touching the platform sprite. Then it sees if the collision is on the bottom of the player, by accessing the returned value from.colCheck.


