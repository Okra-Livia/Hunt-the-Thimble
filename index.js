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

/*if ((window.DeviceMotionEvent) {
  window.addEventListener('devicemotion', deviceMotionHandler, false);
} else {
  document.getElementById("dmEvent").innerHTML = "Not supported."
}*/

function deviceMotionHandler(eventData) {
  var info, xyz = "[X, Y, Z]";

  // Grab the acceleration from the results
  var acceleration = eventData.acceleration;
  info = xyz.replace("X", acceleration.x);
  info = info.replace("Y", acceleration.y);
  info = info.replace("Z", acceleration.z);
  document.getElementById("moAccel").innerHTML = info;

  // Grab the acceleration including gravity from the results
  acceleration = eventData.accelerationIncludingGravity;
  info = xyz.replace("X", acceleration.x);
  info = info.replace("Y", acceleration.y);
  info = info.replace("Z", acceleration.z);
  document.getElementById("moAccelGrav").innerHTML = info;

  // Grab the rotation rate from the results
  var rotation = eventData.rotationRate;
  info = xyz.replace("X", rotation.alpha);
  info = info.replace("Y", rotation.beta);
  info = info.replace("Z", rotation.gamma);
  document.getElementById("moRotation").innerHTML = info;

  // // Grab the refresh interval from the results
  info = eventData.interval;
  document.getElementById("moInterval").innerHTML = info;       
}


/*deviceMotionEvent.DeviceMotionEvent()
window.addEventListener('devicemotion', function(event) {
    var acceleration = deviceMotionEvent.acceleration;
    console.log(acceleration);
    console.log(event.acceleration.x + ' m/s2');
});*/

