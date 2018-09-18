## Window Opener

A small javaScript utility to make sure that `window.open` actually opens **same domain** windows at the size you requested.

### Why

Opening a window with a set viewport is notoriously difficult across all the different browsers, and they usually end up 20px or so too short.

### How

It opens a new window as per usual, but then checks the `innerHeight` and `innerWidth` match the initial request, and adjusts the window size accordingly.

### Wont

Unfortunately it will not run cross domain due to same origin security policies.

## Installation  
### NPM
````bash
npm install window-opener --save
````
### YARN
````bash
yarn add window-opener
````
### Bower
````bash
bower install window-opener --save
````
### Manual
Include the file in your project.
````html
<script type="text/javascript" src="window-opener.js"></script>
````

## Usage

### Browser
````html
<script type="text/javascript" src="window-opener.js"></script>
<script>
    windowOpener.open('http://www.domain.com', '_blank', 'width=500px, height=500px');
</script>

````

### Require
````javascript
define(['path/to/window-opener'], function (windowOpener) {
    windowOpener.open('http://www.domain.com', '_blank', 'width=500px, height=500px');
});

````

## Demo
[A super simple demo](demo/index.html)

## API

### open( url, windowName, [windowFeatures] )
This is exactly the same as `window.open`

### wrap()
Wraps the native `window.open` method with `windowOpener.open`, meaning you don't have to update any of your code.

````javascript
windowOpener.wrap();

...

// all window.open calls now run via windowOpener.open
window.open('http://www.domain.com', '_blank', 'width=500px, height=500px');


````

### unWrap()
Restores the native `window.open` method


