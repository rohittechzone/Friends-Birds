const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var birdImage;
var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot;
var bg;
var rohit,hari,hiruthic,raksan;

var gameState = "onSling";
var drag = "start";
var space = "start";

function preload() {
    backgroundImg = loadImage("sprites/bg.png");
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;
    
    birdImage = "sprites/bird.png";

    rohit = new Rohit(500,20);
    raksan = new Raksan(545,20);
    hari = new Hari(590,20);
    hiruthic = new Hiruthic(635,20);
    
    restart = new Reset(1150,30);
    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bird = new Bird(200,50);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:200, y:50});
}

function draw(){
    background(backgroundImg);
    Engine.update(engine);
    //strokeWeight(4);
    rohit.display();
    raksan.display();
    hari.display();
    hiruthic.display();
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    log3.display();
    box5.display();
    log4.display();
    log5.display();
    bird.display();
    platform.display();
    restart.display();
    //log6.display();
    slingshot.display(); 
    if(drag === "no"){
        slingshot.fly();
        drag = "start";
    }
    else if(drag === "yes"){
        Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
    }
    if(space === "move"){
        bird.body.position.x = 200;
        bird.body.position.y = 50;
        gameState = "onSling";
        setTimeout(function(){
        space = "came";
    },100)
    }
   else if(space === "came"){
       
        slingshot.attach(bird.body);
        space = "start";
   
    }

    getTime();   
}

function mouseDragged(){
    if (gameState !== "launched"){
       drag = "yes";
    }
}


function mouseReleased(){
    drag = "no";
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32){
        gameState = "onSling";
        space = "move";
      //  slingshot.attach(bird.body);
        
    }
}

async function getTime(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();
    var time = responseJSON.datetime;
    var hour = time.slice(11,13);
    console.log(hour);
    if(hour >= 6 && hour < 19){
      bg = "sprites/bg.png";
    }
    else{
      bg = "sprites/bg2.jpg";
    }
    backgroundImg = loadImage(bg);
}
function mousePressed(){
    if(mouseX >= (restart.body.position.x - 25) && mouseX <= (restart.body.position.x + 25) && mouseY >= (restart.body.position.y - 25) && mouseY <= (restart.body.position.y + 25)){
        space = "move";
        bird.trajectory = [];
      
    }
    else if(mouseX >= (rohit.body.position.x - 15) && mouseX <= (rohit.body.position.x + 15) && mouseY >= (rohit.body.position.y - 20) && mouseY <= (rohit.body.position.y + 20)){
        
        birdImage = "sprites/Rohit.png";
        space = "move";
        bird.trajectory = [];
        }
    else if(mouseX >= (raksan.body.position.x - 15) && mouseX <= (raksan.body.position.x + 15) && mouseY >= (raksan.body.position.y - 20) && mouseY <= (raksan.body.position.y + 20)){
        
            birdImage = "sprites/Raksan.png";
            space = "move";
            bird.trajectory = [];
            }
    else if(mouseX >= (hari.body.position.x - 15) && mouseX <= (hari.body.position.x + 15) && mouseY >= (hari.body.position.y - 20) && mouseY <= (hari.body.position.y + 20)){
        
                birdImage = "sprites/Hari.png";
                space = "move";
                bird.trajectory = [];
                }
    else if(mouseX >= (hiruthic.body.position.x - 15) && mouseX <= (hiruthic.body.position.x + 15) && mouseY >= (hiruthic.body.position.y - 20) && mouseY <= (hiruthic.body.position.y + 20)){
        
                    birdImage = "sprites/Hiruthic.png";
                    space = "move";
                    bird.trajectory = [];
                    }
}