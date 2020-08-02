

//SETTINGS - to be added as DOM elements later :)
//how fast the flowfield vectors change
var flowFieldEvolveRate = .00001;

//noise intensity
var inc = .05;

//scale of grid, or how many rows* cols elements there are
var scl = 10;

//number of particles that are affected by flow field
var numParticles = 100;

//how thick the particles are
var particleWeight = .2;

//how fast the particles go
var particleSpeed = 5;


//--------------------------------------------------------------------------------
var c, r;

var col0, col1, col2, col3;

var zOffset = 0;

var particles = [numParticles];
var flowField = [];

var videoFeed;

var colorTimer = 3000;






function setup() {
  createCanvas(500, 400);
  c = floor(width/scl);
  r = floor(height/scl);

  flowField = [c * r];
  
  col0 = getRandomColor();
  col1 = getRandomColor();
  col2 = getRandomColor();
  col3 = getRandomColor();

  for(var i = 0; i< numParticles;i ++){
    particles[i] = new Particle(particleSpeed, particleWeight);
    particles[i].setCol();
  }

  background(col0);

    

}

function draw() {

  //background(col0);

  colorTimer --;
  if(colorTimer < 0){
    colorTimer = 3000;
    setNewColors();
  }
   setFlowField();
   setParticles();

}


function setFlowField(){

  var yOffset = 0;

  for (var y = 0; y < r; y++) {
    var xOffset = 0;
    for(var x = 0;x < c; x++){
      var index = (x + y * c);
      var angle = noise(xOffset, yOffset, zOffset) * TWO_PI;
      
      xOffset += inc;
      var v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      flowField[index] = v;


      fill(angle);
      stroke(col1);
      push();
      translate(x*scl,y*scl);
      rotate(v.heading());
      strokeWeight(1);
      //line(0,0,scl,0);
      pop();

      xOffset += inc;
    }
    yOffset += inc;
    zOffset += flowFieldEvolveRate;

  }
}


function setParticles(){
  for(var i = 0; i< particles.length;i++){
    particles[i].follow(flowField);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }
}


function getRandomColor(){
  var col = [random(255),random(255),random(255)];
  return col;
}


function getColorFromBrightness(brightness){
  if(brightness/255 < .25){
    return col0;
  }
  if(brightness/255 < .5){
    return col1;
  }
  if(brightness/255 < .75){
    return col2;
  }
  return col3;
}

function setNewColors(){
  col0 = getRandomColor();
  col1 = getRandomColor();
  col2 = getRandomColor();
}





