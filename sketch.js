var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey;
var monkeyAnimation;
var ground;

var survivalTime;
var banana;
var bananaImg;
var bananaGroup;
var obstacle;
var obstacleImg;
var obstaclesGroup;

function preload() {
  monkeyAnimation = loadAnimation(
    "monkey_0.png",
    "monkey_01.png",
    "monkey_02.png",
    "monkey_03.png",
    "monkey_04.png",
    "monkey_05.png",
    "monkey_06.png",
    "monkey_07.png",
    "monkey_08.png"
  );
  bananaImg = loadImage("banana.png");
  monkey_image = loadImage("monkey_08.png");
  obstacleImg = loadImage("obstacle.png");
  bgImage = loadImage("jungle.jpg");
}

function setup() {
  createCanvas(displayWidth - 20, displayHeight - 110);

  monkey = createSprite(50, 300, 20, 20);
  monkey.addAnimation("running", monkeyAnimation);
  monkey.scale = 0.15;

  ground = createSprite(
    displayWidth / 2,
    displayHeight - 200,
    displayWidth,
    10
  );
  ground.depth = -10;
  ground.visible = false;

  obstaclesGroup = createGroup();
  bananaGroup = createGroup();

  camera.position.x = displayWidth / 2;
  camera.position.y = displayHeight / 2;

  survivalTime = 0;
}

function draw() {
  background(bgImage);

  stroke("black");
  fill("black");

  if (gameState === PLAY) {
    if (keyDown("space") && monkey.y >= 290) {
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8;

    if (bananaGroup.isTouching(monkey)) {
      bananaGroup.destroyEach();
    }

    survivalTime = Math.ceil(frameCount / frameRate());

    text(
      "Survival Time : " + survivalTime,
      displayWidth - 300,
      displayHeight / 6
    );

    spawnBanana();
    spawnObstacle();

    if (obstaclesGroup.isTouching(monkey)) {
      gameState = END;
    }
  } else if (gameState === END) {
    ground.velocityX = 0;
    monkey.velocityY = 0;

    textSize(100);
    text("GAME OVER", 500, 500);
    textSize();

    obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);

    obstaclesGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
  }

  monkey.collide(ground);

  drawSprites();
}

function spawnBanana() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(600, displayHeight / 2 - 50, 10, 10);
    var rand = Math.round(random(400, 280));
    banana.addImage(bananaImg);
    banana.velocityX = -6;
    banana.lifetime = 100;
    banana.scale = 0.15;

    bananaGroup.add(banana);
  }
}

function spawnObstacle() {
  if (frameCount % 200 === 0) {
    var obstacle = createSprite(600, displayHeight - 225, 10, 40);
    var rand = Math.round(random(80, 120));
    obstacle.addImage(obstacleImg);
    obstacle.velocityX = -6;
    obstacle.scale = 0.15;
    obstacle.lifetime = 100;
    obstacle.depth = 10;
    obstacle.setCollider("circle", 0, 0, 150);

    obstaclesGroup.add(obstacle);
  }
}
