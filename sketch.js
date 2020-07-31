//Create variables here
var dog,happydog,database,foodS,foodstock;
var dogimg,happydogimg;
var foodObj,fedTime,lastFed;
var gameState;
var changingState,readingStock;
var gardenimg,washroomimg,bedroomimg;
function preload()
{
  //load images here
  dogimg=loadImage("images/dogImg.png");
  happydogimg = loadImage("images/dogImg1.png");
  saddogimg = loadImage("images/deadDog.png");
  bedroomimg = loadImage("images/Bed Room.png");
  washroomimg = loadImage("images/Wash Room.png");
  gardenimg = loadImage("images/Garden.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1000, 400);
  readState = database.ref('gameState');
  readState.on("value",function(data){
    gameState = data.val();
  });
  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  dog = createSprite(250,250,20,20);
  dog.addImage("dog",dogimg);
  dog.addImage("happydog",happydogimg);
  dog.scale = 0.5;
  
  

  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(700,125);
  addFood.mousePressed(addFoods);
}

function draw() {  
background(46,139,87);
foodObj.display();

  //add styles here
  if(gameState!="hungry"){
    feed.hide();
    addFood.hide();
    dog.remove();
  }else{
    feed.show();
    addFood.show();
    dog.addImage(saddogimg);
  }
  


  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();

  })

fill(255,255,254);
textSize(15);
if(lastFed>=12){
  text("Last Feed : "+ lastFed%12 + "PM",350,30);
}else if(lastFed==0){
  text("Last Feed : 12 AM",350,30);
}else{
  text("Last Feed : "+ lastFed + "AM",350,30);
}
currentTime = hour();
if(currentTime==(lastFed+1)){
  update("Playing");
  foodObj.garden();
}else if(currentTime==(lastFed+2)){
  update("Sleeping");
  foodObj.bedroom();
}else if(currentTime>(lastFed+2)&& currentTime<=(lastFed+4)){
  update("Bathing");
  foodObj.washroom();
}else{
  update("Hungry")
  foodObj.display();
}

function update(state){
  database.ref('/').update({
    gameState:state
  });
}
drawSprites();
}
function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}


function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
function feedDog(){
  dog.changeImage("happydog",happydogimg);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}