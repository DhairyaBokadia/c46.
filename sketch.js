var ground, stone, stone_img,cannon ,cannon_img, castle,castle_img;
var boat1_img,boat2_img,boat3_img,cannonBall_img,cannon_img,cannonBall_grp,boat_grp;
var rand, gamestate, gameover, score;

function preload(){
 stone_img=loadImage("stone.png")
 cannon_img=loadImage("cannon.png")
 boat1_img=loadImage("boat1.png")
 boat2_img=loadImage("boat2.png")
 boat3_img=loadImage("boat3.png")
 castle_img=loadImage("castle.png")
 cannonBall_img=loadImage("cannon ball.png")
}

function setup (){
  createCanvas(displayWidth-30,displayHeight-150);
  ground=createSprite(width/2,height,width,20);

  stone = createSprite(width/3,ground.y-50,10,10);
  stone.addImage(stone_img)
  stone.debug=true
  stone.setCollider("circle",0,0,50)

  cannon=createSprite(width/3,stone.y-50,10,10)
  cannon.addImage(cannon_img)
  cannon.scale=0.5
  cannon.debug=true

  castle=createSprite(170,ground.y-270)
  castle.addImage(castle_img)
  castle.scale=1.2

  gameover=createSprite(width/2,height/2,40,40)

  cannonBall_grp=new Group ();
  boat_grp=new Group();

  score=0;

  gamestate="play";
}

function draw (){
  background("lightblue");

  textSize(40)
  fill ("red")
  text ("score :"+score,width/2,50)

  if (gamestate=="play") {
    spawnBoats();

    if(keyWentDown("space")){
      spawnCannonball();
    }

    if (cannonBall_grp.isTouching(boat_grp)) {
      boat_grp.destroyEach();
      cannonBall_grp.destroyEach();

      score=score+5;
    }
  }

  else if(gamestate=="end"){
      console.log("end")
      boat_grp.setVelocityXEach(0)
      boat_grp.setLifetimeEach(-1)
  }

 if (boat_grp.isTouching(castle)) {
   gamestate="end"
 }
  cannon.collide(stone);
  stone.collide(ground);

  drawSprites();
}

function spawnBoats(){
  if (frameCount%300==0){
    var boat=createSprite(width,cannon.y,10,10);
    boat.velocityX=-2
    boat.debug=true
    rand=Math.round(random(1,3))
    switch(rand){
      case 1:boat.addImage(boat1_img)
      break;

      case 2:boat.addImage(boat2_img);
      boat.scale=0.5
      break;

      case 3:boat.addImage(boat3_img);
      boat.scale=0.5
      break;

      default:break
    }
    boat.lifetime = -width/boat.velocityX;
    boat_grp.add(boat)
  }
  
}

function spawnCannonball(){
  var cannonBall=createSprite(cannon.x+150,cannon.y-50)
  cannonBall.velocityX=2
  cannonBall.addImage(cannonBall_img)
  cannonBall.scale=0.2
  cannonBall.debug=true
  cannonBall_grp.add(cannonBall)
}