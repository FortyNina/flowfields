

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

  video.size(width/scl, height/scl);

  video.loadPixels();  
  loadPixels();
  
  for(let y = 0; y < video.height; y++){ 
    for(let x = 0; x < video.width; x++){
     var index = (x + y * video.width) * 4;
      var r =  video.pixels[index+0];
      var g = video.pixels[index+1];
      var b = video.pixels[index+2];
      
      var bright = (r+g+b) / 3;
      var w = map(bright, 0, 255, 0 , scl) / 2;


    

    }

  }  

}


