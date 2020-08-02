

//scale of grid, or how many rows* cols elements there are
var scl = 10;






var video;





function setup() {
  createCanvas(640, 480);
  //background(0);


  
  pixelDensity(1);
  video = createCapture(VIDEO, callbackgo);  
}

var go = false;
function callbackgo(){
  go = true;
}


function draw() {    
 
 
  if(go){
   drawPixels();
  }

  
}






function drawPixels(){
  var yOffset = 0;

  video.size(width/scl, height/scl);

  video.loadPixels();  
  loadPixels();
  
  for(let y = 0; y < video.height; y++){ 
    var xOffset = 0;
    for(let x = 0; x < video.width; x++){
     var index = (x + y * video.width) * 4;
      var r =  video.pixels[index+0];
      var g = video.pixels[index+1];
      var b = video.pixels[index+2];
      
      var bright = (r+g+b) / 3;
      var w = map(bright, 0, 255, 0 , scl) / 2;


       var angle = w ;
      
       xOffset += inc;
       var v = p5.Vector.fromAngle(angle);
       v.setMag(1);
       flowFieldCam[index] = v;
      


      fill(angle);
      stroke(col1);
      push();
      translate(x*scl,y*scl);
      rotate(v.heading());
      strokeWeight(1);
      //line(0,0,scl,0);
      pop();
      
      // noStroke();
      // rectMode(CENTER);
      // fill(255);
      // ellipse(x*scl, y*scl, w, w);    
      xOffset += inc;

    }
    yOffset += inc;

  }  

}


