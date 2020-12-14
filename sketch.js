//Create variables here
var  dog;
var dogImage,dogImage2;
var happyDog;
var database;
var add;
var foodS;
var foodStock;
var fedTime;
var foodObject;
var feed;
var lastFed
var milk; 
var milk1;
var milkImage;
var milkImage1;

function preload(){
  //load images here
  dogImage=loadImage("images/dogImg.png");
  dogImage2=loadImage("images/dogImg1.png");
  milkImage=loadImage("images/milk.png");
  milkImage1=loadImage("images/milk1.png");
}

function setup() {
  database = firebase.database();
  
	createCanvas(800, 700);

  foodobject=new Food(); 

  feed=createButton("Feed");
  feed.position(700,95);
  feed.mousePressed(feedDog);
  feed.mouseReleased(dogs)

  add=createButton("add food");
  add.position(600,95);
  add.mousePressed(addfoods);

  dog=createSprite(459,250);
  dog.addImage(dogImage);
  dog.scale = 0.15;

  milk1=createSprite(425,285);
  milk1.addImage(milkImage1);
  milk1.scale = 0.03
  milk1.visibility = true;


  foodStock = database.ref('food');
    foodStock.on("value", readStock);

  }


function draw() {  
  background("forestgreen");

  foodobject.display();

  fill("black")
  textSize(35)
  text("Virtual Pet",50,25)

  fill(255,255,254);
  textSize(20);
  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
  lastFed = data.val()  
  });
  if(lastFed>=12){
  text("Last Feed: "+ lastFed%12+ "PM",350,30);  
  }else if(lastFed==0){
  text("Last Feed:12 AM",350,30);    
  }else{
  text("Last Feed: "+ lastFed+ "AM",350,30);    
  }

  if(foodS == 0){
    dog.addImage(dogImage);
    foodS = 0;
  }

  drawSprites();

}

function readStock(data){
  foodS = data.val();
  foodobject.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(dogImage2);
  milk1.visibility = false;
  foodobject.updateFoodStock(foodobject.getFoodStock()-1);
  database.ref('/').update({
  food:foodobject.getFoodStock(),
  FeedTime:hour(),
  })
}


function addfoods(){
  dog.addImage(dogImage);
  foodS++;
  database.ref('/').update({
  food:foodS
  })
}
function dogs(){
  dog. addImage(dogImage);
  milk1.visibility = true;
}
