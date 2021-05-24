var backImage,backgr;
var player, player_running;
var ground,ground_img;

var END =0;
var PLAY =1;
var gameState = PLAY;

var banana_img, banana;

var bananaGroup;

var score = 0;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  banana_img = loadImage("banana2.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  bananaGroup = new Group();
  
}

function draw() { 
  background(0);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

    spawnBanana();

  if(player.isTouching(bananaGroup)){
    player.scale += 0.04;
    score = score+1;
    bananaGroup.destroyEach();
  }

  drawSprites();

  textSize(15);
  fill("white")
  text("score " + ": " +score, 700, 20,);

  if(score === 5){
    gameState = END;
  }

  }
  
  else if(gameState === END){
    background("yellow")
    textSize(50);
    fill("red");
    text("Game Over", 280 ,210)
    score.visible = false;
    monkey.visible = false;
    bananaGroup.visible = false;
  }
  

}


function spawnBanana(){
  if(frameCount % 200 === 0){
    banana = createSprite(850, Math.round(random(20, 200)), 10,10);
    banana.addImage(banana_img)
    banana.velocityX = -4;
    banana.scale= 5;
    banana.lifetime = 300;
    bananaGroup.add(banana)
  }
}

