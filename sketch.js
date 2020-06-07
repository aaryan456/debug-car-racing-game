var gameState = 0;
var player,playerimg;
var track;
var carImg1,carImg2,carimg3,carImg4,carImg45;
var car,rand;
var carsGroup;
var invisiblegr,invisiblegr2;
var score = 0;
var posY = -5000,posX = -500

function preload(){
  playerimg = loadImage("images/police.jpg");
  carImg1 = loadImage("images/car1.jpg");
  carImg2 = loadImage("images/car2.jpg");
  carImg3 = loadImage("images/car3.jpg");
  carImg4 = loadImage("images/car4.jpg");
  carImg5 = loadImage("images/car5.jpg");
  track = loadImage("images/track.jpg");
  
}

function setup(){
  canvas = createCanvas(displayWidth-20,displayHeight-170);

  player = createSprite(displayWidth/2+100,1200,40,40);
  player.addImage(playerimg);
  player.scale = 2;
  invisiblegr = createSprite(198,displayHeight/2,40,displayHeight*8);
  invisiblegr2 = createSprite(1260,displayHeight/2,40,displayHeight*8);
  

  carsGroup = new Group();
 
}

function draw(){
  
  image(track, 0,-displayHeight*6,displayWidth+100, displayHeight*9);
  camera.position.x = displayWidth/2;
  camera.position.y = player.y-100; 
  if(gameState === 0){
    player.velocityY = 0
    carsGroup.velocityYEach = 0
    text("press the space key to start the game",displayWidth/2,200);
    invisiblegr.visible = false;
  invisiblegr2.visible = false;
  player.collide(invisiblegr);
  player.collide(invisiblegr2);
  player.scale = 0.2
  }
  if(keyDown("space")){
    gameState = 1
  }
  if(gameState===1){
    if(frameCount % 50 === 0 && gameState === 0){
      rand = random(700,1000);
      car.y = player.y-800;
      car.x = rand;
      
      car.collide(invisiblegr);
      car.collide(invisiblegr2);
      
      if(frameCount%2===0){
        car = createSprite(posX,posY,30,30);
      }
      switch(carswap) {
        case 1: car.addImage(carImg1);
                break;
        case 2: car.addImage(carImg2);
                break;
        case 3: car.addImage(carImg3);
                break;
        case 4: car.addImage(carImg4);
                break;
        case 5: car.addImage(carImg5);
                break;
        default: break;
      }
      carswap = Math.round(random(1,5));
      carsGroup.scale = 2;
      carsGroup.velocityYEach = 10;
      carsGroup.add(car);
  
      
     // car.lifetime = -100;
  
      if(player.isTouching(car)){
        gameState = 1;
        player.destroy();
        carsGroup.destroyEach();
        score -= 5;
      }
    }
  fill("brown");
  noStroke();
  textSize(30);
  text("Your Score: "+ score,190,player.y-200);
  invisiblegr.visible = false;
  invisiblegr2.visible = false;
  player.collide(invisiblegr);
  player.collide(invisiblegr2);
  player.scale = 0.2
  
  player.velocityY = -10;

  if(keyDown(LEFT_ARROW)){
    player.x -= 10;
  }
  if(keyDown(RIGHT_ARROW)){
    player.x += 10;
  }
  if(player.y === -4400){
    gameState = 2;
  }
  if(gameState === 2)
    player.velocityY = 0;
    carsGroup.setVelocityYEach(0);
    carsGroup.destroyEach()
    fill("brown");
    noStroke();
    textSize(40);
    text("YOU WIN!!!")
    

  }
  if(frameCount % 50 === 0 && gameState === 1){
    score += 20;
  }

  
  

  drawSprites();
}