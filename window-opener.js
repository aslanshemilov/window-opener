
/**
 * window-opener
 * Simply wrapper for the core window.open function that ensures the opened window is 
 * the size you actually asked for in the first place.
 * 
 * Many browsers handle the sizing differently, and usually you dont get all your viewport in view
 */
(function() {
  'use strict';
  
   const nativeOpen = window.open;
   const api = {
 
   /**
    * Open a new window and ensure it is the size you actually asked for in the first place
    */
   open:function (...args) {
     
     const features = {};
 
     if(args[2]) {
       // parse the features list
       args[2].split(',').forEach( kv => {
         var k, v;
         [k, v] = kv.split('=');
         features[k]=v;
       });
     }
 
     // open the window with native method, proxying all args
     const win = nativeOpen.apply(window, args);
 
     // If we had a width or height, then set those again when the window is open
     if(features.width || features.height) {
       win.addEventListener('load', () => {
         const deltaX = features.width ? parseInt(features.width) - win.innerWidth : 0;
         const deltaY = features.height ? parseInt(features.height) - win.innerHeight : 0;
         win.resizeBy(deltaX, deltaY); 
       }, {
         once:true
       });
     }
   
     return win;
   },
 
   /**
    * By default window.open is wrapped and replaced by open
    * If you want to restore the original window.open function then call
    * windowOpener.unWrap();
    * 
    */
   unWrap : function () {
     window.open = nativeOpen;    
   },
 
   /**
    * Wrap the native window.open method with open, to fix
    * sizing issues
    */
   wrap : function() {
     window.open = api.open;    
   }
 };
 
   // By default we wrap the window prototype so this is drop in lib to fix the sizing issues.
   api.wrap();
 
   if (typeof module != 'undefined') {
     module.exports = api;
   } else {
     window.windowOpener = api;
   }
 
 }());