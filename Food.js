class Food{
    constructor(){
       this.foodStock=0;
        this.lastFed;
        this.image = loadImage("images/Milk.png");
    }

    getFoodStock(){
  return this.foodStock
    }

    updateFoodStock(stock){
     
        this.foodStock= stock
    
    }

    deductFood(){
    if(this.foodStock>0){
        this.foodStock = this.foodStock-1;
    }
    }
    getFedTime(lastFed){
        this.lastFed=lastFed;
    }

    bedroom(){
        background(bedroomimg,550,500);
     }
     
     garden(){
         background(gardenimg,550,500);
     }
     
     washroom(){
         background(washroomimg,550,500);
     }
 

    display(){
        var x=400,y=100;

        imageMode(CENTER);
        image(this.image,720,220,70,70);

        if(this.foodStock!=0){
            for(var i=0;i<this.foodStock;i++){
                if(i%10==0){
                    x=400;
                    y=y+50;
                }
                image(this.image,x,y,50,50);
                x=x+30;
            }
        }
        
    }
}