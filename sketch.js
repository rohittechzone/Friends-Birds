const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot;
var bg;

var gameState = "onSling";

function preload() {
    backgroundImg = loadImage("sprites/bg.png");
}

function setup(){
    var canvas = createCanvas(displayWidth, displayHeight - 800);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground((displayWidth - 20)/2,height,displayWidth-20,20);
    platform = new Ground(150, height-95, 300, 170);

    box1 = new Box(displayWidth - 520,displayHeight - 110,70,70);
    box2 = new Box(displayWidth - 280,displayHeight - 110,70,70);
    pig1 = new Pig(displayWidth - 410,displayHeight - 80);
    log1 = new Log(displayWidth - 405,displayHeight - 170,300, PI/2);

    box3 = new Box(displayWidth - 520,displayHeight - 180,70,70);
    box4 = new Box(displayWidth - 280,displayHeight - 180,70,70);
    pig3 = new Pig(displayWidth - 410,displayHeight - 195);

    log3 =  new Log(displayWidth - 410,displayHeight - 250,300, PI/2);

    box5 = new Box(displayWidth - 410,displayHeight - 270,70,70);
    log4 = new Log(displayWidth - 480,displayHeight - 310,150, PI/7);
    log5 = new Log(displayWidth - 330,displayHeight - 310,150, -PI/7);

    bird = new Bird(displayWidth/8,height-340);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:displayWidth/8, y:height-340});
}

function draw(){
    background(backgroundImg);
    Engine.update(engine);
    //strokeWeight(4);
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
    //log6.display();
    slingshot.display(); 
    getTime();   
}

function mouseDragged(){
    if (gameState!=="launched"){
        Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
    }
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32 ){
        slingshot.attach(bird.body);
        gameState = "onSling";
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