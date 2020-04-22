$(document).ready(function () {
            navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;

            // Determine if vibration is supported in this web browser
            if (!navigator.vibrate) {
                $('#supported').hide();
                return;
            }

            $('#unsupported').hide();

            // One second vibration
            $('#one').click(function () {
                navigator.vibrate(1000);
                console.log("One second vibration");
            });

            // Vibration pattern
            $('#pattern').click(function () {
                navigator.vibrate([500, 100, 250, 100, 1000]);
                console.log("Vibration pattern");
            });

            // 10 second vibration
            $('#ten').click(function () {
                navigator.vibrate(10000);
                console.log("10 second vibration");
            });

            // Stop all vibrations
            $('#stop').click(function () {
                navigator.vibrate(0);
                console.log("Stop all vibrations");
            });
        });



    init();
    var count = 0;
    
    function init() {
        //Device Orientation
      if (window.DeviceOrientationEvent) {
        document.getElementById("doEvent").style.fontWeight = "bold";
        document.getElementById("doEvent").innerHTML = "DeviceOrientation";
        // Listen for the deviceorientation event and handle the raw data
        window.addEventListener('deviceorientation', function(eventData) {
          // gamma is the left-to-right tilt in degrees, where right is positive
          var tiltLR = eventData.gamma;
          
          // beta is the front-to-back tilt in degrees, where front is positive
          var tiltFB = eventData.beta;
          
          // alpha is the compass direction the device is facing in degrees
          var dir = eventData.alpha
          
          // call our orientation event handler
          deviceOrientationHandler(tiltLR, tiltFB, dir);
          }, false);
      } else {
        document.getElementById("doEvent").innerHTML = "Not supported on your device or browser.  Sorry."
      }

      //device motion
      if ((window.DeviceMotionEvent) || ('listenForDeviceMovement' in window)) {
        document.getElementById("dmEvent").style.fontWeight = "bold";
        document.getElementById("dmEvent").innerHTML = "DeviceOrientation";
        window.addEventListener('devicemotion', deviceMotionHandler, false);
      } else {
        document.getElementById("dmEvent").innerHTML = "Not supported on your device or browser.  Sorry."
      }
    }
  var x = 4;
  var y = 5;
    function deviceOrientationHandler(tiltLR, tiltFB, dir) {
      document.getElementById("doTiltLR").innerHTML = Math.round(tiltLR);
      document.getElementById("doTiltFB").innerHTML = Math.round(tiltFB);
      document.getElementById("doDirection").innerHTML = Math.round(dir);
      if (Math.round(tiltLR) && Math.round(tiltFB) == x, y) {
        document.getElementById("winner").style.display = "block";
      }
      
      // Apply the transform to the image
/*      var logo = document.getElementById("main");
      logo.style.webkitTransform = "rotate("+ tiltLR +"deg) rotate3d(1,0,0, "+ (tiltFB*-1)+"deg)";
      logo.style.MozTransform = "rotate("+ tiltLR +"deg)";
      logo.style.transform = "rotate("+ tiltLR +"deg) rotate3d(1,0,0, "+ (tiltFB*-1)+"deg)";*/
    }

    function deviceMotionHandler(eventData) {
      var info, xyz = "[X, Y, Z]";

      // Grab the acceleration including gravity from the results
      var acceleration = eventData.acceleration;
      info = xyz.replace("X", round(acceleration.x));
      info = info.replace("Y", round(acceleration.y));
      info = info.replace("Z", round(acceleration.z));
      document.getElementById("moAccel").innerHTML = info;

      // Grab the acceleration including gravity from the results
      acceleration = eventData.accelerationIncludingGravity;
      info = xyz.replace("X", round(acceleration.x));
      info = info.replace("Y", round(acceleration.y));
      info = info.replace("Z", round(acceleration.z));
      document.getElementById("moAccelGrav").innerHTML = info;

      // Grab the acceleration including gravity from the results
/*      var rotation = eventData.rotationRate;
      info = xyz.replace("X", round(rotation.alpha));
      info = info.replace("Y", round(rotation.beta));
      info = info.replace("Z", round(rotation.gamma));
      document.getElementById("moRotation").innerHTML = info;*/

      info = eventData.interval;
      //info = info * 10;
      document.getElementById("moInterval").innerHTML = info;
    }

    function round(val) {
      var amt = 10;
      return Math.round(val * amt) /  amt;
    }
    
    
    // Some other fun rotations to try...
    //var rotation = "rotate3d(0,1,0, "+ (tiltLR*-1)+"deg) rotate3d(1,0,0, "+ (tiltFB*-1)+"deg)";
    //var rotation = "rotate("+ tiltLR +"deg) rotate3d(0,1,0, "+ (tiltLR*-1)+"deg) rotate3d(1,0,0, "+ (tiltFB*-1)+"deg)";
