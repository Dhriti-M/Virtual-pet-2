class Food {

    constructor(foodStock,lastfeed){
    this.foodStock=foodStock;
    this
    this.image = loadImage("images/Milk");
    }

 getFoodStock(){
 var foodref = database.ref('Food');
 foodref.on("value",function(data){
    foodStock=data.val();
 })
 }

 updateFoodStock(food){
     database.ref('/').update({
         Food:food
     })

 }

 decductfood(){

 }


 display(){
 var x=80;
 var y=100;

 imageMode(CENTER);
 image(this.image,720,220,70,70);

 if(this.foodStock!=0){
     for(var i=0;i<this.foodStock;i++){
         if(i%10===0){
             x=80;
             y=y+50;
         }
         image(this.image,x,y,50,50);
     }
    }

}

}


