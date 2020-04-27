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
    leads(distance);
    handleVibration(distance);
}


window.addEventListener('deviceorientation', handleOrientation);


function leads(distance){
  if (distance < 10) {
        ball.style.backgroundColor = "red";
        ball.style.boxShadow = "0 0 140px 90px red";
        where.innerHTML = "warm";
      }
      else if (distance > 10 && distance < 20){
        ball.style.backgroundColor = "orange"; 
        ball.style.boxShadow = "0 0 140px 90px orange";
        where.innerHTML = "warmer";
      }
      else if (distance > 20){
        ball.style.backgroundColor = "blue";
        ball.style.boxShadow = "0 0 140px 90px blue";
        where.innerHTML = "cold";
      }
}

window.addEventListener('getLeads', handleDistance);

function handleVibration(distance){
  window.navigator = window.navigator || {};
      if (navigator.vibrate === undefined) {
          document.getElementById('unsupported').classList.remove('hidden');
          ['pattern', 'stop'].forEach(function(elementId) {
            document.getElementById(elementId).setAttribute('disabled', 'disabled');
          });
      } else {
          document.getElementById('pattern').addEventListener('click', function() {
            if (distance <10) {
              navigator.vibrate([50, 25, 50, 25, 50]);
            }
            else if (distance > 10 && distance < 20) {
              navigator.vibrate([50, 300, 50, 300, 50]);
            }
            else if (distance > 20 && distance < 57) {
              navigator.vibrate([50, 1000, 50, 1000, 50]);
            }
            
          });
          document.getElementById('stop').addEventListener('click', function() {
            navigator.vibrate(0);
          });
      }
}
