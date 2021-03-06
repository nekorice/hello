/****************************************************************************
 Copyright (c) 2010-2012 cocos2d-x.org
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011      Zynga Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/


var Helloworld = cc.Layer.extend({
    isMouseDown:false,
    helloImg:null,
    helloLabel:null,
    circle:null,
    walk_prefix:"data_character_yuyuko_walkFront0",
    back_prefix:"data_character_yuyuko_walkBack0",
    sprite:null,
    //start index
    spriteFrameIndex:0,

    init:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask director the window size
        var size = cc.Director.getInstance().getWinSize();

        // add a "close" icon to exit the progress. it's an autorelease object
        
        /*
        var closeItem = cc.MenuItemImage.create(
            "res/CloseNormal.png",
            "res/CloseSelected.png",
            function () {
                history.go(-1);
            },this);
        closeItem.setAnchorPoint(0.5, 0.5);
        */
        //var menu = cc.Menu.create(closeItem);
        //menu.setPosition(0,0);
        //this.addChild(menu, 1);
        //closeItem.setPosition(size.width - 20, 20);

        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        this.helloLabel = cc.LabelTTF.create("Hello World", "Arial", 38);
        // position the label on the center of the screen
        this.helloLabel.setPosition(size.width / 2, 0);
        // add the label as a child to this layer
        //this.addChild(this.helloLabel, 5);
        
        //静态的不经常更新的层
        //var lazyLayer = cc.Layer.create();
        //this.addChild(lazyLayer);

        // add "HelloWorld" splash screen"
        /*
        this.sprite = cc.Sprite.create("res/HelloWorld.png");
        this.sprite.setPosition(size.width / 2, size.height / 2);
        this.sprite.setScale(0.5);
        this.sprite.setRotation(180);

        lazyLayer.addChild(this.sprite, 0);

        var rotateToA = cc.RotateTo.create(2, 0);
        var scaleToA = cc.ScaleTo.create(2, 1, 1);

        this.sprite.runAction(cc.Sequence.create(rotateToA, scaleToA));
        this.helloLabel.runAction(cc.Spawn.create(cc.MoveBy.create(2.5, cc.p(0, size.height - 40)),cc.TintTo.create(2.5,255,125,0)));
        */
        this.setTouchEnabled(true);
        this.setKeyboardEnabled(true);

        //tiled map test
        var tileMap = cc.TMXTiledMap.create(s_tmx);
        this._tileMap = tileMap;
        //this.addChild(this._tileMap, 1, 0);

        this.sprite = new player_uuz();
        this.sprite._tmx = this._tileMap;
        this.addChild(this.sprite, this.sprite.zOrder);
        
        this.scheduleUpdate();
        this.schedule(this.update);
        /* 
        var cache = cc.SpriteFrameCache.getInstance();
        cache.addSpriteFrames(s_Walk_plist, s_Walk);

        this.sprite = cc.Sprite.createWithSpriteFrameName(this.walk_prefix + "00.png");
        this.sprite.setPosition(new cc.Point(300,300));
        this.sprite.setScale(1);
        this.addChild(this.sprite, 2, 0);        
        */


        // 获得对象层
        /*
        var objectLayer = tileMap.getObjectGroup("Objects");
        var array = objectLayer.getObjects();
        var spawnPoint = array[0];
        var objX = spawnPoint["x"];
        var objY = spawnPoint["y"];
        var width = spawnPoint["width"];
        var height = spawnPoint["height"]; 
        */
       
        //this._jetSprite = new JetSprite();
        
        //this.setPosition(new cc.Point(0,0));
        
        //this.addChild(this._jetSprite);
        /*
        this._jetSprite.setPosition(new cc.Point(size.width/2,size.height/2));
        this._jetSprite.scheduleUpdate();
        this.schedule(this.update);
        */
        
        //var layer1 = cc.LayerColor.create(
        //    new cc.Color4B(128, 128, 128, 255), 600, 600);
        //var jetSprite = cc.Sprite.create("res/jet.png");

        //layer1.setPosition(new cc.Point(0.0,0.0));
        //layer1.addChild(jetSprite);

        //var size = cc.Director.getInstance().getWinSize();
        //jetSprite.setPosition(new cc.Point(size.width/2,size.height/2));
        //jetSprite.setScale(0.1);
        //this.addChild(layer1);        
        //lazyLayer.addChild(this._jetSprite);
        //lazyLayer.addChild(jetSprite)
        return true;
    },
    // a selector callback
    menuCloseCallback:function (sender) {
        cc.Director.getInstance().end();
    },
    onTouchesBegan:function (touches, event) {
        this.isMouseDown = true;
    },
    onTouchesMoved:function (touches, event) {
        if (this.isMouseDown) {
            if (touches) {
                //this.circle.setPosition(touches[0].getLocation().x, touches[0].getLocation().y);
                //this._jetSprite.handleTouchMove(touches[0].getLocation());
            }
        }
    },
    update:function(dt){
        //sprite.update
        //设定每一帧
        this.sprite.update(dt);

    },
    //for key
    onKeyDown:function(e){
       //handle sprit move
       this.sprite.handleKey(e);
       g_var.KEYS[e] = true;
       /*
       if(e == cc.KEY.left || e == cc.KEY.right){
            
            var prevPrefix = this.spriteFrameNamePrefix;
            if(e == cc.KEY.left)
                this.spriteFrameNamePrefix = this.back_prefix;
            else
                this.spriteFrameNamePrefix = this.walk_prefix;
            if(prevPrefix !== this.spriteFrameNamePrefix)
                this.spriteFrameIndex = 0;
            

            if(this.spriteFrameIndex > 5)
                this.spriteFrameIndex = 0;
            var indexAsString;
            if(this.spriteFrameIndex < 10)
                indexAsString = "0" + this.spriteFrameIndex.toString();
            else
                indexAsString = this.spriteFrameIndex.toString();

            this.removeChild(this.sprite);
            this.sprite  = cc.Sprite.createWithSpriteFrameName(
                this.spriteFrameNamePrefix + indexAsString + ".png"
            );

            this.sprite.setPosition(new cc.Point(300,300));
            this.sprite.setScale(1);
            this.addChild(this.sprite, 2, 0);
            this.spriteFrameIndex++;
        }
        */
    },
    onKeyUp:function (e) {
         g_var.KEYS[e] = false;
    },    
    onTouchesEnded:function (touches, event) {
        this.isMouseDown = false;
        //this._jetSprite.handleTouch(touches[0].getLocation());

    },
    onTouchesCancelled:function (touches, event) {
        console.log("onTouchesCancelled");
    }
});


var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new Helloworld();
        
        this.addChild(layer);
        layer.init();
    }
});

