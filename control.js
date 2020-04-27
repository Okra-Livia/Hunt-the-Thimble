var ball = document.querySelector(".ball");
var room = document.querySelector(".room");
var output = document.querySelector(".output");

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
//hur ofta körs den? keff pga startar om varje gång som den uppdateras??
  //kör som separat grej vibben eller?

    var dx = thimble[0] - location [0];
    var dy = thimble[1] - location [1]; 

    var distance = Math.round(Math.sqrt(Math.pow(dy, 2) + Math.pow(dx, 2))); 
    console.log(distance);

    output.innerHTML += "Distance to thimble: " + distance + "\n";

    if (distance < 10) {
          ball.style.backgroundColor = "red";
        }
        else if (distance > 10 && distance < 20){
          ball.style.backgroundColor = "purple"; 
        }
        else if (distance > 20 && distance < 50){
          ball.style.backgroundColor = "blue";
        }

 /*  var gradient = [
  { start: [181,0,0], stop: [138,228,255] }]
  var start = */
  //vibration(distance);
}

//window.addEventListener("distanceFromGoal", handleDistance);

$(document).ready(function (distance) {
    navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;

    // Determine if vibration is supported in this web browser
    if (!navigator.vibrate) {
        $('#supported').hide();
        return;
    }

    $('#unsupported').hide();

    // Vibration pattern
    $('#pattern').click(function () {
      if (distance < 10) {
          document.getElementById("kallt").style.display = "none";
          document.getElementById("varmare").style.display = "none";
          document.getElementById("varmt").style.display = "block";
          navigator.vibrate([20, 25, 20, 25, 20]);
        }
        else if (distance > 10 && distance < 20){
          document.getElementById("varmt").style.display = "none";
          document.getElementById("kallt").style.display = "none";
          document.getElementById("varmare").style.display = "block";
          navigator.vibrate([50, 300, 50, 300, 50]);
        }
        else if (distance > 20 && distance < 50){
          document.getElementById("varmt").style.display = "none";
          document.getElementById("varmare").style.display = "none";
          document.getElementById("kallt").style.display = "block";
          navigator.vibrate([50, 1000, 50, 1000, 50]);
        }
        console.log("Vibration pattern");
    });

    // Stop all vibrations
    $('#stop').click(function () {
        navigator.vibrate(0);
        console.log("Stop all vibrations");
    });
        });


window.addEventListener("deviceorientation", handleOrientation);
