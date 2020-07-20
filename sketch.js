//Create variables here
var dog, happyDog, database, foodS, FoodStock;
var feed,addFood,foodObj;
var lastFeed,fedTime;

function preload()
{
  //load images here
  dog_img=loadImage("images/dog.png");
  happydog_img=loadImage("images/happydog.png");
  

 
  
}

function setup() {
  createCanvas(1000, 700);
  

  database=firebase.database();

  dog=createSprite(800,200,10,10);
  dog.addImage(dog_img);
  dog.scale=0.2;

  Foodstock=database.ref("Food");
  Foodstock.on("value",readStock);

feed=createButton("Feed the Dog");
feed.position(700,65);
feed.mousePressed(feedDog);

addFood=createButton("ADD Food");
addFood.position(800,65);
addFood.mousePressed(addFoods);

foodObj = new Food();

fedTime=database.ref('FeedTime');
fedTime.on("value",function(data){
  lastFeed=data.val();
})


}


function draw() {  
  background(46,139,87);
  

  /*if(keyWentDown(UP_ARROW)){
        writeStock(foodS);
        dog.addImage(happydog_img);
  }

  if(keyWentUp(UP_ARROW)){
        writeStock(foodS);
        dog.addImage(dog_img);
   }*/

   // to display sprites 
   drawSprites();
    
   fill("white");
   text("FoodStock : " + foodS,100,100);
   /*text("Press UP_ARROW key to feed Drago Milk!!",200,100);*/


  

          fill(255,255,254);
          textSize(15);
          if(lastFeed>=12){
            text("Last Feed : ",lastFeed%12 + "PM", 350 ,30);
        }
        else if (lastFeed===0){
          text("Last Feed : 12 AM",350,30);
        }
        else {
        text ("Last Feed : " + lastFeed + "AM",350,30);
        }


foodObj.display();

}//draw ends 


// to read stock value 
function readStock(data){
  foodS=data.val();
}


// to display stock value 
function writeStock(x){
  if(x <= 0){
    x=0;
  }
  else{
    x=x-1;
  }

  database.ref('/').update({
    
    
    food:x
             })
}

//fuction to update foodstock and last feed time 
function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock();
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}



