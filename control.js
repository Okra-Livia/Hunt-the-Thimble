var ball = document.querySelector(".ball");
var room = document.querySelector(".room");
var output = document.querySelector(".output");
var where = document.getElementById("where");

var maxX = room.clientWidth - ball.clientWidth;
var maxY = room.clientHeight - ball.clientHeight;

var thimble = [0, 0];

function handleOrientation(event) {
  var x = event.gamma;  // In degree in the range [-180,180]
  var y = event.beta; // In degree in the range [-90,90]

  // We constrain the x value to the range [-40,40]
  if (x >  40) { x =  40};
  if (x < -40) { x =  -40};
  if (y >  40) { y =  40};
  if (y < -40) { y =  -40};

  var location = [x, y];

  ball.style.top  = (maxY*(y+40)/80) + "px";
  ball.style.left = (maxX*(x+40)/80) + "px";

  output.innerHTML = "Location: " + Math.round(location[0]) + ", " + Math.round(location[1]) + "\n";
  
  handleDistance(location);

}

function handleDistance(location){
    var dx = thimble[0] - location [0];
    var dy = thimble[1] - location [1]; 

    var distance = Math.round(Math.sqrt(Math.pow(dy, 2) + Math.pow(dx, 2))); 

    output.innerHTML += "Distance to thimble: " + distance + "\n";
 
}

function leads(distance){
  if (distance < 10) {
        ball.style.backgroundColor = "red";
        where.innerHTML = "varmt";
      }
      else if (distance > 10 && distance < 20){
        ball.style.backgroundColor = "purple"; 
        where.innerHTML = "varmare";
      }
      else if (distance > 20){
        ball.style.backgroundColor = "blue";
        where.innerHTML = "kallt";
      }
}


window.addEventListener('deviceorientation', handleOrientation);


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
