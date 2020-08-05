
//Based on Daniel Schiffman's video: https://www.youtube.com/watch?v=BjoM9oKOAKY

//summary
//Constructor for a particle object. many of this objects are drawn
//on the screen to create the stringy effect
function Particle(max, weight){
  this.pos = createVector(random(width),random(height));
  this.vel = createVector(0,0);
  this.acc = createVector(0,0);
  this.maxSpeed = max;
  this.strkWeight = weight
  this.colorNum = 0;

  this.prevPos = this.pos.copy();

  //Update the velocity, acceleration, and posiiton of the particle
  //do this each frame you want the particle to move
  this.update = function(){
       this.updatePrev();
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  //apply a force to the acceleration (probably based on flow field in this case)
  this.applyForce = function(force){
    this.acc.add(force);
  }

  //draw the particle on the screen
  this.show = function(){
    if(this.colorNum == 0) stroke(col1);
    else{
      stroke(col2);
    }
    strokeWeight(weight);
    line(this.pos.x,this.pos.y, this.prevPos.x, this.prevPos.y);

  }

  //update the previosu position of this particle
  //currently used as the second vector for drawing the line
  this.updatePrev = function(){
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;

  }

  //make the particle wrap around the edges of the screen
  this.edges = function(){
    if(this.pos.x > width) {
      this.pos.x = 0;
      this.updatePrev();
    }
    if(this.pos.x < 0) {
      this.pos.x = width;
      this.updatePrev();
    }
    if(this.pos.y > height) {
      this.pos.y = 0;
      this.updatePrev();

    }
    if(this.pos.y < 0) {
      this.pos.y = height;
      this.updatePrev();
    }
  }

//based on my x,y pos, scale myself to a grid of columns and rows, and apply the force
  this.follow = function(field){
    var x = floor(this.pos.x / size);
    var y = floor(this.pos.y / size);
    var index = (x + y * c);
    var force = field[index];
    this.applyForce(force);
  }

  //update the color of this particle (currently can be one of two colors.)
  this.setCol = function(){
    var rand = random(0,10);
    if(rand < 5) this.colorNum = 1;
  }


}

