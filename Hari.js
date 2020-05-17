class Hari {
    constructor(x, y) {
      var options = {
    isStatic : true
      }
      this.width = 40;
      this.height = 40;
      this.body = Bodies.rectangle(x,y,this.width,this.height,options)
      
      this.ball_img = loadImage("sprites/Hari.png");
      World.add(world, this.body);
    };
  
    display(){
        var pos = this.body.position;
  
        push();
  
        translate(pos.x, pos.y);
        imageMode(CENTER)
        image(this.ball_img,0, 0, this.width, this.height);
        pop();
     }
    };
  