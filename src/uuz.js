var player_uuz = cc.Sprite.extend({
    _currentRotation:0,
    _currentState:null,
    walk_prefix:"data_character_yuyuko_walkFront00",
    back_prefix:"data_character_yuyuko_walkBack00",
    //start index
    spriteFrameIndex:0,
    zOrder:99,  
    front_animate:null,
    back_animate:null, 
    speed:20, 
    step:0,
    ctor:function(){
        //this is important
        this._super();
        _currentState = new uuz.idleState();
		
		var cache = cc.SpriteFrameCache.getInstance();
        cache.addSpriteFrames(s_Walk_plist, s_Walk);

        this.initWithSpriteFrameName(this.walk_prefix + "0.png");
        this.setPosition(new cc.Point(300,300));
        this.setScale(0.5);
        this.setTag(this.zOrder);

        var animFrames = [];
        // set frame
        for (var i = 0; i < 5; i++) {
           var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(this.walk_prefix + i +".png");
           animFrames.push(frame); 
        };

        //move to the state_machine
        var animFrames2 = [];
        for (var i = 0; i < 5; i++) {
           var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(this.back_prefix + i +".png");
           animFrames2.push(frame); 
        };

        //animate 第二个参数是帧率？
        var walkfront = cc.Animation.create(animFrames, 0.1);
        self.front_animate = cc.Animate.create(walkfront);
        
        var walkback = cc.Animation.create(animFrames2, 0.1);
        self.back_animate = cc.Animate.create(walkback)


        //init animate
        this.runAction(cc.RepeatForever.create(self.front_animate));
        //this.schedule(this.shoot, 1 / 6);

        //this.initBornSprite();
        //this.born();        


    },
    update:function(dt){
        //this.setRotation(this._currentRotation);
        var pos = this.getPosition();
        var move = 0
        if (g_var.KEYS[cc.KEY.left]){
            console.log('left')
            move = -1 * dt * this.speed ;
        }else if(g_var.KEYS[cc.KEY.right]){
            console.log('right')
            move = dt * this.speed ;
        }
         
        this.setPosition(pos.x + move, pos.y);
    },
    handleKey:function(e)
    {
       //handle sprit move
       // this._jetSprite.handleKey(e);
       var current_position = this.getPosition();
       //console.log(current_position) 
       if(e == cc.KEY.right && this.step != 1){
         //this.setPosition()
         //stop other Action
         this.step = 1;
         //this.setPosition(current_position.x + this.speed, current_position.y)
         this.stopAllActions(); 
         this.runAction(cc.RepeatForever.create(self.front_animate));
       }else if (e == cc.KEY.left && this.step != -1){
         this.stopAllActions();
         this.step = -1;
         //this.setPosition(current_position.x - this.speed, current_position.y)
         this.runAction(cc.RepeatForever.create(self.back_animate));
       }  
    },
    handleTouch:function(touchLocation)
    {
        
        //if(touchLocation.x < 300)
        //    this._currentRotation = 0;
        //else
        //    this._currentRotation = 180;
    },
    handleTouchMove:function(touchLocation){
        // Gross use of hardcoded width,height params.
        /*
        var angle = Math.atan2(touchLocation.x-300,touchLocation.y-300);

        angle = angle * (180/Math.PI);
        this._currentRotation = angle;
        */
    },
    move:function(p){
       
    }
});




var uuz = {
   'idleState':function idleState() {  
	    this.name = "Base";  
	    this.sayName = function() {  
	        alert(this.name);  
	    }  
	},


}