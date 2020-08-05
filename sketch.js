
//Based on Daniel Schiffman's video: https://www.youtube.com/watch?v=BjoM9oKOAKY

//SETTINGS - to be added as DOM elements later :)
//how fast the flowfield vectors change
var flowFieldEvolveRate = .00001;

//noise intensity
var inc = .05;

//scale of grid, or how many rows* cols elements there are
var size = 10;

//number of particles that are affected by flow field
var numParticles = 100;

//how thick the particles are
var particleWeight = .2;

//how fast the particles go
var particleSpeed = 5;
//--------------------------------------------------------------------------------

//DOM-----------------------------------------------------------------------------

var randomizeButton;
var backColorPicker;
var col1ColorPicker;
var col2ColorPicker;

//--------------------------------------------------------------------------------

var c, r;
var backCol, col1, col2, col3, prevBackCol;
var zOffset = 0;
var particles = [numParticles];
var flowField = [];
var videoFeed;
var colorTimer = 3000;




function setup() {
  createCanvas(500, 400);

  //Set initial random colors when first loaded
  backCol = getRandomColor();
  prevBackCol = getRandomColor();
  col1 = getRandomColor();
  col2 = getRandomColor();
  col3 = getRandomColor();

  //set the number of rows and columns for the flow field
  c = floor(width/size);
  r = floor(height/size);
  flowField = [c * r];
  
  //create particles
  for(var i = 0; i< numParticles;i ++){
    particles[i] = new Particle(particleSpeed, particleWeight);
    particles[i].setCol();
  }

  background(backCol);

  //DOM SETUP---------------------

  randomizeButton = createButton('Randomize !');
  randomizeButton.position(19, 450);
  randomizeButton.mousePressed(randomize);

  backColorPicker = createInput(RGBToHex(int(backCol[0]),int(backCol[1]),int(backCol[2])), 'color');
  backColorPicker.position(19, 475);

  col1ColorPicker = createInput(RGBToHex(int(col1[0]),int(col1[1]),int(col1[2])), 'color');
  col1ColorPicker.position(19, 505);
  
  col2ColorPicker = createInput(RGBToHex(int(col2[0]),int(col2[1]),int(col2[2])), 'color');
  col2ColorPicker.position(19, 535);

  //------------------------------
}

function draw() {

  //background(backCol);

  hexToRGB(col1ColorPicker.value(), col1);
  hexToRGB(col2ColorPicker.value(), col2);
  hexToRGB(backColorPicker.value(), prevBackCol);

  var modified = false;
  for(var i = 0; i<prevBackCol.length;i++){
    if(prevBackCol[i] != backCol[i])
      modified = true;
  }

  if(modified) {
      hexToRGB(backColorPicker.value(), backCol);
      clearScreen();

  }

   setFlowField();
   setParticles();

}

//set each vector in the flow field, based on a  noise value.
function setFlowField(){

  var yOffset = 0;

  for (var y = 0; y < r; y++) {
    var xOffset = 0;
    for(var x = 0;x < c; x++){
      var index = (x + y * c);
      var angle = noise(xOffset, yOffset, zOffset) * TWO_PI ;
      
      xOffset += inc;
      var v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      flowField[index] = v;
    }
    yOffset += inc;
    zOffset += flowFieldEvolveRate;

  }
}

//update each particle
function setParticles(){
  for(var i = 0; i< particles.length;i++){
    particles[i].follow(flowField);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }
}

//return a random color
function getRandomColor(){
  var col = [random(255),random(255),random(255)];
  return col;
}

//based on a brightness, find a cutoff for a random color
function getColorFromBrightness(brightness){
  if(brightness/255 < .25){
    return backCol;
  }
  if(brightness/255 < .5){
    return col1;
  }
  if(brightness/255 < .75){
    return col2;
  }
  return col3;
}

//set new random colors
function setNewColors(){
  backCol = getRandomColor();
  col1 = getRandomColor();
  col2 = getRandomColor();
}

function clearScreen(){
    background(backCol);

}

//randomize the colors and flow field. clear the screen
function randomize(){
  setNewColors();

  backColorPicker = createInput(RGBToHex(int(backCol[0]),int(backCol[1]),int(backCol[2])), 'color');
  backColorPicker.position(19, 475);

  col1ColorPicker = createInput(RGBToHex(int(col1[0]),int(col1[1]),int(col1[2])), 'color');
  col1ColorPicker.position(19, 505);
  

  col2ColorPicker = createInput(RGBToHex(int(col2[0]),int(col2[1]),int(col2[2])), 'color');
  col2ColorPicker.position(19, 535);
  clearScreen();

  zOffset = random(200,1000);
  
}

//convert a hex string into and array of r,g,b
function hexToRGB(hexNum, arr) {
    hexNum = hexNum.replace('#', '');

    arr[0] = unhex(hexNum.substring(0,2));
    arr[1] = unhex(hexNum.substring(2,4));
    arr[2] = unhex(hexNum.substring(4,6));
}

//convert an R,g,b integers into a hex string
function RGBToHex(r,g,b){
  var c = color(int(r),int(g),int(b));
  var hx = "#" + hex(r,2) + hex(g,2) + hex(b,2);
  print(hx);
  return hx;
}

//get the background color from the color picker and clear the screen
function refreshBackground(){
    hexToRGB(backColorPicker.value(), backCol);
    clearScreen();

  
}





