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
    speed:90, 
    step:0,
    jump:false,
    animate_tag:123,
    jump_tag:339,
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

        //anchor point is in the middle

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
        this.front_animate = cc.RepeatForever.create(cc.Animate.create(walkfront));
        //this.front_animate.tag = this.animate_tag;
        this.front_animate.setTag(this.animate_tag);

        var walkback = cc.Animation.create(animFrames2, 0.1);
        this.back_animate = cc.RepeatForever.create(cc.Animate.create(walkback));
        //this.back_animate.tag = this.animate_tag;
        //this is not working
        this.back_animate.setTag(this.animate_tag);

        //init animate
        this.runAction(this.front_animate);
        //this.schedule(this.shoot, 1 / 6);

        //this.initBornSprite();
        //this.born();        


    },
    update:function(dt){
        //this.setRotation(this._currentRotation);
        //防止移动出边框外
        var size = cc.Director.getInstance().getWinSize();
        var pos = this.getPosition();
        var body = this.getContentSize();
        var move = 0
        var down = 0
        if (g_var.KEYS[cc.KEY.left] && pos.x > body.width/2 ){
            console.log('left')
            move = -1 * dt * this.speed ;
        }else if(g_var.KEYS[cc.KEY.right] &&  pos.x < (size.width - body.width/2)){
            console.log('right')
            move = dt * this.speed ;
        }
        
        if (!this.jump && pos.y > g_var.horizon){
            //check is on the tile

            down = - dt* g_var.gravity; 
        }

        this.upon_tile(this._tmx);

        this.setPosition(pos.x + move, pos.y + down);
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
         //this.stopAllActions();
         this.stopActionByTag(this.animate_tag); 
         //this.stopActionByTag(this.animate_tag); 
         //var action = cc.RepeatForever.create(this.front_animate)
         //action.tag = this.animate_tag
         this.runAction(this.front_animate);
       }else if (e == cc.KEY.left && this.step != -1){
         //this.stopAllActions();
         this.stopActionByTag(this.animate_tag);
         //this.stopActionByTag(this.animate_tag); 
         this.step = -1;
         //this.setPosition(current_position.x - this.speed, current_position.y)
         //var action = cc.RepeatForever.create(this.back_animate);
         //action.tag = this.animate_tag
         this.runAction(this.back_animate);
       }else if ( e == cc.KEY.x && !this.jump){
         //runAction(cc.EaseBackIn.create(cc.MoveTo.create(1.2,cc.p(300,300)))
         //jump state   
         console.log('jump!')
         this.jump = true;
         //var action = cc.EaseSineOut.create(cc.MoveTo.create(1.5, cc.p(current_position.x, current_position.y+200)));
         var action = cc.EaseSineOut.create(cc.MoveTo.create(1.5, cc.p(current_position.x, current_position.y+200)));
         var self = this;
         var se = cc.Sequence.create(action, cc.CallFunc.create(function(){
            self.jump = false;
         }, this));
         se.setTag(this.jump_tag)
         this.runAction(se);
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
    upon_tile:function(tilemap){
        /*
        this = tilemap
        this.obstacles = [];
        var mapWidth = tilemap.getMapSize().width;
        var mapHeight = tilemap.getMapSize().height;
        var tileWidth = tilemap.getTileSize().width;
        var tileHeight = tilemap.getTileSize().height;
        var collidableLayer = this.getLayer("collidable");
        var i, j;
        for (i = 0; i < mapWidth; i++){
            for (j = 0; j < mapHeight; j++){
                var tileCoord = new cc.Point(i, j);
                var gid = collidableLayer.getTileGIDAt(tileCoord);
                if(gid) {
                    var tileXPositon = i * tileWidth;
                    var tileYPosition = (mapHeight * tileHeight) - ((j+1) * tileHeight);
                    var react = cc.rect(tileXPositon, tileYPosition, tileWidth, tileHeight);
                    this.obstacles.push(react);
                }
            }
        } 

        the map is 
        0,0  1,0 x+
        0,1  1,1
        y+
        */
        var mapWidth = tilemap.getMapSize().width;
        var mapHeight = tilemap.getMapSize().height;
        var tileWidth = tilemap.getTileSize().width;
        var tileHeight = tilemap.getTileSize().height;               
        var pos = this.getPosition();
        //get this tile layer
        var line = parseInt(pos.x / tileWidth) + 1;
        var column = mapHeight - parseInt(pos.y / tileHeight);
        console.log(line);
        console.log(column);

        //var collidableLayer = this.getLayer("collidable");
        //var gid = collidableLayer.getTileGIDAt(tileCoord);
        //properties = tilemap.propertiesForGID(gid);
        //properties["Collidable"] == true;
        //return 
        //if return true
    },
    collide:function(){
      
    },
    collide_rect:function(){
        var a = this.getContentSize();
        return cc.rect(p.x - a.width / 2, p.y - a.height / 2, a.width, a.height / 2);
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