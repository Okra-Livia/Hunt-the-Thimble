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

    
    function init() {
      if ((window.DeviceMotionEvent) || ('listenForDeviceMovement' in window)) {
        window.addEventListener('devicemotion', deviceMotionHandler, false);
      } else {
        document.getElementById("dmEvent").innerHTML = "Not supported on your device or browser.  Sorry."
      }
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
      var rotation = eventData.rotationRate;
      info = xyz.replace("X", round(rotation.alpha));
      info = info.replace("Y", round(rotation.beta));
      info = info.replace("Z", round(rotation.gamma));
      document.getElementById("moRotation").innerHTML = info;

      info = eventData.interval;
      document.getElementById("moInterval").innerHTML = info;
    }

    function round(val) {
      var amt = 10;
      return Math.round(val * amt) /  amt;
    }


/*deviceMotionEvent.DeviceMotionEvent()
window.addEventListener('devicemotion', function(event) {
    var acceleration = deviceMotionEvent.acceleration;
    console.log(acceleration);
    console.log(event.acceleration.x + ' m/s2');
});*/

