function Particle(max, weight){
  this.pos = createVector(random(width),random(height));
  this.vel = createVector(0,0);
  this.acc = createVector(0,0);
  this.maxSpeed = max;
  this.strkWeight = weight
  this.colorNum = 0;

  this.prevPos = this.pos.copy();


  this.update = function(){
       this.updatePrev();
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);

  }

  this.applyForce = function(force){
    this.acc.add(force);
  }

  this.show = function(){
    if(this.colorNum == 0) stroke(col1);
    else{
      stroke(col2);
    }
    strokeWeight(weight);
    line(this.pos.x,this.pos.y, this.prevPos.x, this.prevPos.y);

    //point(this.pos.x,this.pos.y);
  }

  this.updatePrev = function(){
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;

  }

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
    var x = floor(this.pos.x / scl);
    var y = floor(this.pos.y / scl);
    var index = (x + y * c);
    var force = field[index];
    this.applyForce(force);


  }

  this.setCol = function(){
    var rand = random(0,10);
    if(rand < 5) this.colorNum = 1;
  }


}

