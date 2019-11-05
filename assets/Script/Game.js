// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html


cc.Class({
    extends: cc.Component,

    properties: {
        winSize: null,
        retryLabel: {
            default: null,
            type: cc.Node
        },
        tapLabel: {
            default: null,
            type: cc.Node
        },
        startLabel: {
            default: null,
            type: cc.Node
        },
        firstPlace: {
            default: null,
            type: cc.Node
        },
        scoreDisplay: {
            default: null,
            type: cc.Label
        },
        highScoreDisplay: {
            default: null,
            type: cc.Label
        },
        scoreNode: {
            default: null,
            type: cc.Node
        },
        highScoreNode: {
            default: null,
            type: cc.Node
        },
        tilePrefab: {
            default: null,
            type: cc.Prefab
        },
        lightPanelPrefab: {
            default: null,
            type: cc.Prefab
        },
        darkPanelPrefab: {
            default: null,
            type: cc.Prefab
        },
        bonusPrefab: {
            default: null,
            type: cc.Prefab
        },
        snowPrefab: {
            default: null,
            type: cc.Prefab
        },
        mainPlayer: {
            default: null,
            type: cc.Node
        },
        mainRightPlayer: {
            default: null,
            type: cc.Node
        },
        
        leftTag: {
            default: null,
            type: cc.ParticleSystem
        },
        rightTag: {
            default: null,
            type: cc.ParticleSystem
        },

        blocksList: [],
        rightDirectX: 75,
        rightDirectY: 37.5,
        leftDirectX: -75,
        leftDirectY: 37.5,
        panelOffsetX: 0,
        panelOffsetY: 56,
        startBlockPositionX: 75,
        startBlockPositionY: -170.5,
        speed: 100.0,
        mainSpeed: 200.0,
        panelHeight: 20, tileHeight: 30,
        opacityLimit: 100, killLimit: 30,
        playerDirection: 0, mainPlayerY: -264, baseIndex: null,
        firstPlaceX: 0, firstPlaceY: -300,
        score: 0, highScore: 0, 
        gameStatus: 0,
        mainPlayerX: 56,
        snowCount: 40 ,
        backAudio: {
            default: null,
            url: cc.AudioClip
        },
        jumpAudio: {
            default: null,
            url: cc.AudioClip
        },
        bonusAudio: {
            default: null,
            url: cc.AudioClip
        },
        fallAudio: {
            default: null,
            url: cc.AudioClip
        },
        isMusicOn: true,
        localMusicID: null,
        on: {
            default: null,
            type: cc.Node
        },
        off: {
            default: null,
            type: cc.Node
        },
        musicNode: {
            default: null,
            type: cc.Node
        }
        /*
        0: ready game
        1: game running
        2: game kill
        3: game over (retry)
        */
    },

    start () {
    },

    ctor:function() {
        //initialize game
    },

    generateSnow: function() {
        for(var i = 0; i < this.snowCount; i ++ ){
            var newSnow = cc.instantiate(this.snowPrefab); 
            newSnow.setLocalZOrder(100000); newSnow.opacity = 70;
            this.node.addChild(newSnow);
        }
    },
    onLoad: function() {

        if (this.isMusicOn) {
            this.localMusicID = cc.audioEngine.playMusic(this.backAudio, true);
        }


        this.winSize = cc.winSize;
        this.winSize.width = 720;
        this.winSize.height = 1280;
        
        var self = this , rect;
        //define touch event
        this.generateSnow();
        
        this.node.on('say-hello', function (event) {
            self.isMusicOn = !self.isMusicOn;
            if(self.isMusicOn){
               // self.isMusicOn = event.isMusicOn;
                self.localMusicID = cc.audioEngine.playMusic(self.backAudio, true);
            }
            else{
             //   self.isMusicOn = event.isMusicOn;
                cc.audioEngine.stopMusic(self.localMusicID);
            }
            
        });

        this.node.on('touchstart', function ( event ) {


           // rect = cc.rect(self.on.x - self.on.getContentSize().width / 2 ,self.on.y - self.on.getContentSize().height / 2 , self.on.getContentSize().width , self.on.getContentSize().height);
            //var mousePoint = cc.p( event.currentTouch._point.x - 900 - 360 ,  event.currentTouch._point.y - 640  );
            
            /*if(cc.rectContainsPoint(rect , mousePoint)){
                self.isMusicOn = !self.isMusicOn;
                if(self.isMusicOn){
                    self.off.opacity = 0;
                    self.on.opacity = 200;
                    self.localMusicID = cc.audioEngine.playMusic(self.backAudio, true);
                }
                else{
                    self.off.opacity = 200;
                    self.on.opacity = 0;
                    cc.audioEngine.stopMusic(self.localMusicID);
                }
                return;
            }*/

            if( self.gameStatus == 0 ) {
                // get ready for game start

                self.setStartLabelAppear(self.gameStatus + 1 , self);
                self.mainPlayer.stopAllActions(); self.firstPlace.stopAllActions();
                self.firstPlace.setPosition(cc.p(self.firstPlaceX , self.firstPlaceY));

                self.gameStatus = 1;
                self.baseIndex = parseInt((self.mainPlayerY + self.winSize.height/2 - self.tileHeight / 2 + self.panelHeight / 2) / self.panelHeight * 3 / 2);

            }
            //if game is running
            else if( self.gameStatus == 1 ) {

                if(self.playerDirection == 0) {

                    self.mainRightPlayer.opacity = 255;
                    self.mainRightPlayer.setPosition(self.mainPlayer.getPosition()); 
                    self.mainPlayer.opacity = 0; self.playerDirection = 1;


                    self.rightTag.node.y = self.mainRightPlayer.y - 15;
                    self.rightTag.node.x = self.mainRightPlayer.x - 5;
                    self.leftTag.node.y = -self.winSize.height;

                    if(self.isMusicOn)
                        cc.audioEngine.playEffect(self.jumpAudio, false);
                }

                else {

                    self.mainPlayer.setPosition(self.mainRightPlayer.getPosition()); 
                    self.mainRightPlayer.opacity = 0;
                    self.mainPlayer.opacity = 255;
                    self.playerDirection = 0;

                    self.leftTag.node.y = self.mainPlayer.y - 21;
                    self.leftTag.node.x = self.mainPlayer.x + 5;
                    self.rightTag.node.y = -self.winSize.height;
                    if(self.isMusicOn)
                        cc.audioEngine.playEffect(self.jumpAudio, false);
                }

            }

            else if( self.gameStatus == 3) {

                self.removeGame();
                self.gameStatus = 0;
                self.setStartLabelAppear(self.gameStatus, self);

            }

        });

        //initialize Component
        this.highScoreDisplay.node.setLocalZOrder(100002);
        this.highScoreNode.setLocalZOrder(100002);
        this.scoreDisplay.node.setLocalZOrder(100003);
        this.scoreNode.setLocalZOrder(100003);
        this.retryLabel.setLocalZOrder(100004);
        this.retryLabel.opacity = 200;

        //console.log(this.winSize);
        /* */
        this.mainPlayerY = this.mainPlayer.y;
        this.mainRightPlayer.setLocalZOrder(99997);
        this.mainRightPlayer.opacity = 0;

        this.leftTag.node.setLocalZOrder(99995);
        this.rightTag.node.setLocalZOrder(99994);
        this.rightTag.node.y = -this.winSize.height;
        
        /* */
        
        this.blocksList.push(this.firstPlace);
        
        this.retryLabel.opacity = 0;
        this.retryLabel.setPosition(cc.p(0, -cc.view.getFrameSize().height/2 - this.retryLabel.getContentSize().height/2)); 
        
        this.setBlock();
    },

    setBlock: function() {
        var prevPosX =0 , prevPosY = 0 , nZOrder = 799, ret , i = 0 , random3 = 0;//, random1, random2
        
        while(1) {

            if(this.blocksList.length > 1){
                if(i == 0){
                    prevPosX = this.blocksList[this.blocksList.length - 1].tile.x;
                    prevPosY = this.blocksList[this.blocksList.length - 1].tile.y;
                }
                
                if(prevPosY + this.leftDirectY + this.panelOffsetY + this.panelHeight / 2 > this.winSize.height / 2)
                    break;
                
                nZOrder =  799 - i * 2;
            }

            var random1 = parseInt(cc.random0To1() * 100) % 2;
        
            //light or dark
            var random2 = parseInt(cc.random0To1() * 100) % 2, i;    
            random3 = parseInt(cc.random0To1() * 100) % 5;

            if(this.blocksList.length == 1){
                prevPosX = this.startBlockPositionX;
                prevPosY = this.startBlockPositionY;
                this.buildBlock(nZOrder, this.startBlockPositionX, this.startBlockPositionY, random2, random3);
            }
            else{
                
                // right
                if(random1 == 0) {

                    ret = this.buildBlock(nZOrder, prevPosX + this.rightDirectX, prevPosY + this.rightDirectY, random2, random3);
                    prevPosX = ret.x;
                    prevPosY = ret.y;

                } 
                // left
                else {

                    ret = this.buildBlock(nZOrder, prevPosX + this.leftDirectX, prevPosY + this.leftDirectY, random2, random3);
                    prevPosX = ret.x;
                    prevPosY = ret.y;

                }
                
                if(prevPosY + this.leftDirectY + this.panelOffsetY + this.panelHeight / 2 + this.opacityLimit > this.winSize.height / 2)
                {
                    //console.log(i);
                    this.blocksList[this.blocksList.length-1].tile.opacity = 120;
                    this.blocksList[this.blocksList.length-1].panel.opacity = 120;
                } 

            }   

            i ++;
        }
    },
    buildBlock: function(nZOrder, posX, posY, nFlag, random3){
        var newTile = cc.instantiate(this.tilePrefab);
            this.node.addChild(newTile);

        if(posX + newTile.getContentSize().width/2 > this.winSize.width / 2){
            posX = posX - this.rightDirectX + this.leftDirectX;
            posY = posY - this.rightDirectY + this.leftDirectY;
        }    
        else if(posX - newTile.getContentSize().width/2 < -this.winSize.width / 2){
            posX = posX - this.leftDirectX + this.rightDirectX;
            posY = posY - this.leftDirectY + this.rightDirectY;
        }
        
        newTile.setPosition(cc.p(posX, posY));
        newTile.setLocalZOrder(nZOrder);

        var newPanel , bonus;
        if(nFlag == 0)
            newPanel = cc.instantiate(this.lightPanelPrefab);
        else
            newPanel = cc.instantiate(this.darkPanelPrefab);    
        if(random3 == 0){
            bonus = cc.instantiate(this.bonusPrefab);
            this.node.addChild(bonus);
        }

        this.node.addChild(newPanel);
        newPanel.setPosition(cc.p(posX + this.panelOffsetX, posY + this.panelOffsetY));
        newPanel.setLocalZOrder(nZOrder + 1);

        
        if(this.blocksList.length < 1){
            this.panelHeight = newPanel.getContentSize().height;
            this.tileHeight = newTile.getContentSize().height;
        }
            

        var obj = {};
        obj.tile = newTile;
        obj.panel = newPanel;
        if(this.blocksList.length > 1)
            obj.index = this.blocksList[this.blocksList.length-1].index + 1;
        else
            obj.index = 1;

        if(random3 == 0){
            bonus.setPosition(cc.p(newPanel.getPositionX() , newPanel.getPositionY() + 10));
            bonus.setLocalZOrder(99991);
            obj.bonus = bonus;
        }

        this.blocksList.push(obj);

        return {
            x: posX,
            y: posY
        }
    },

    checkPosition: function(obj){
        var i , it , A , B , C , D, circleY, circleX, w1 , w2 , w3 , w4, flag , zOrder;
        var save = [];
        var x , y;
        flag = true;
        x = obj.getPositionX();
        y = obj.getPositionY();
        x = Math.round(x);
        y = Math.round(y);

        //console.log(x , y);
        for(i = 0; i < 15; i ++){          
            if(i == 0){
                it = this.firstPlace;
              
                A = cc.p(0,0);
                A.x = it.getPositionX();
                A.y = it.getPositionY() + it.getContentSize().height / 2;

                B = cc.p(0, 0);
                B.x = it.getPositionX() - it.getContentSize().width / 2;
                B.y = A.y - (it.getContentSize().width / 4);

                C = cc.p(0, 0);
                C.x = it.getPositionX();
                C.y = A.y - (it.getContentSize().width / 2);

                D = cc.p(0, 0);
                D.x = it.getPositionX() + it.getContentSize().width / 2;
                D.y = A.y - (it.getContentSize().width / 4);
            }
                
            else{
                it = this.blocksList[i].panel;
                A = cc.p(0,0);
                A.x = it.getPositionX();
                A.y = it.getPositionY() + it.getContentSize().height / 2;

                B = cc.p(0, 0);
                B.x = it.getPositionX() - it.getContentSize().width / 2;
                B.y = it.getPositionY();

                C = cc.p(0, 0);
                C.x = it.getPositionX();
                C.y = it.getPositionY()- it.getContentSize().height / 2;

                D = cc.p(0, 0);
                D.x = it.getPositionX() + it.getContentSize().width / 2;
                D.y = it.getPositionY();
            }
            A.y = A.y.toFixed(2); B.y = B.y.toFixed(2); C.y = C.y.toFixed(2); D.y = D.y.toFixed(2);

            var abs_y = Math.abs(y - B.y);

            var abs_x = Math.abs(D.x - x) > Math.abs(B.x - x) ? Math.abs(B.x - x) : Math.abs(D.x - x);

            if(!(abs_x / 2 >= abs_y && x >= B.x && x <= D.x && y >= C.y && y <= A.y)){
                flag = false;
                
                if(this.blocksList[i].hasOwnProperty('tile')){
                    if( (it.y + it.getContentSize().height / 2) > y)
                        zOrder = it.getLocalZOrder() - 1;
  
                }
                else {
                    if( (it.y - this.panelHeight / 2 < y) && (it.y + this.panelHeight / 2 > y)  && (it.y > y)){
                    
                        zOrder = it.getLocalZOrder();
                    
                    }
                    else if((it.y - this.panelHeight / 2 < y) && (it.y + this.panelHeight / 2 > y)  && (it.y <= y)){
                            zOrder = it.getLocalZOrder() - 2;
                    
                    }
                }
            }
            else{
                flag = true;
                if(this.blocksList[i].hasOwnProperty('index')){
                    if(this.blocksList[i].index != this.score){
                        this.score = this.blocksList[i].index;
                        this.scoreDisplay.string = this.score.toString();
                    }
                        
                }
                
                if(this.blocksList[i].hasOwnProperty('bonus')){
                    
                    
                    if(cc.pDistance(this.blocksList[i].bonus.getPosition() , cc.p(x, y)) < 20  ){
                        if(this.blocksList[i].bonus.opacity != 0){
                            if(this.isMusicOn)
                                cc.audioEngine.playEffect(this.bonusAudio, false);
                            this.blocksList[i].bonus.opacity = 0;
                        }
                    }
                
                }

                break;
            }
        }    
        if(flag == false){
            obj.setLocalZOrder(zOrder);
            this.leftTag.node.y = -this.winSize.height;
            this.rightTag.node.y = -this.winSize.height;
            if(this.isMusicOn)
                cc.audioEngine.playEffect(this.fallAudio, false);
        }
        return flag;
    },
    update: function(delta) {

       var y;

        // only game running can accept this event
        if(this.gameStatus != 1 && this.gameStatus != 2)
            return;
        //update speed of each frame according to the current acceleration direction
        if(this.gameStatus != 2) {
            //console.log(playerDirection)
            if(this.playerDirection == 0){  
                this.mainPlayer.setPosition(cc.p(this.mainPlayer.x - (this.mainSpeed * delta) , this.mainPlayerY));
                this.leftTag.node.x = this.mainPlayer.x + 5;
                
                if(!this.checkPosition(this.mainPlayer)) {  
                    this.gameStatus = 2;
                }
                
            } 
            else {

                this.mainRightPlayer.setPosition(cc.p(this.mainRightPlayer.x + (this.mainSpeed * delta) , this.mainPlayerY));
                this.rightTag.node.x = this.mainRightPlayer.x - 5;

                if(!this.checkPosition(this.mainRightPlayer)){
                
                    this.gameStatus = 2;
                }
                    
                
            }
        }
        else {

            //kill 
            if(this.playerDirection == 0) {
                this.mainPlayer.setPosition(cc.p(this.mainPlayer.x , this.mainPlayer.y - (this.speed * delta * 8)));
                if(this.mainPlayer.y < -this.winSize.height){
                    this.gameOver();
                    this.gameStatus = 3;
                }   
            }
                
            else {
                this.mainRightPlayer.setPosition(cc.p(this.mainRightPlayer.x , this.mainRightPlayer.y - (this.speed * delta * 8)));
                if(this.mainRightPlayer.y < -this.winSize.height){
                    this.gameOver();
                    this.gameStatus = 3;
                }           
            }
                

        }


//        if(this.gameStatus != 1)
  //          return;
        var i = 0 , tempZOrder1 = 0, tempZOrder2 = 0;

        while(i < this.blocksList.length) {

            if(this.gameStatus == 1 && this.blocksList[i].hasOwnProperty('tile') && (this.blocksList[i].tile.y + this.leftDirectY + this.panelOffsetY + this.panelHeight / 2 + this.opacityLimit <= this.winSize.height / 2)){
                
                    this.blocksList[i].tile.opacity = 255;
                    this.blocksList[i].panel.opacity = 255;
                    
            }

            if(this.blocksList[i].hasOwnProperty('tile')){

                if(this.blocksList[i].tile.y - (this.tileHeight / 2) - this.killLimit < -(this.winSize.height / 2)){

                    if(this.gameStatus == 1 && this.blocksList[i].tile.y + (this.tileHeight / 2 + this.panelHeight / 2) < -(this.winSize.height / 2)) { 

                        tempZOrder1 = this.blocksList[i].tile.getLocalZOrder();
                        tempZOrder2 = this.blocksList[i].panel.getLocalZOrder();

                        var tile = this.blocksList[i].tile;
                        var panel = this.blocksList[i].panel;
                        
                        if(this.blocksList[i].hasOwnProperty('bonus')){
                            var bonus = this.blocksList[i].bonus;
                            this.node.removeChild(bonus);
                            bonus.destroy();
                        }

                        this.blocksList.splice(i , 1); 
                     
                        tile.destroy(); panel.destroy();

                        this.blocksList[i].tile.setLocalZOrder(tempZOrder1);
                        this.blocksList[i].panel.setLocalZOrder(tempZOrder2);

                    }
                    else {

                        if(tempZOrder1 != 0 && tempZOrder2 != 0){
                            this.blocksList[i].tile.setLocalZOrder(tempZOrder1 - 2);
                            this.blocksList[i].panel.setLocalZOrder(tempZOrder2 - 2);
                            tempZOrder1 -= 2;
                            tempZOrder2 -= 2;
                        }
                        y = this.blocksList[i].tile.getPositionY() - (this.speed * delta * 2);
                        this.blocksList[i].tile.setPositionY(y);
                        y = this.blocksList[i].panel.getPositionY() - (this.speed * delta * 2);
                        this.blocksList[i].panel.setPositionY(y);

                        if(this.blocksList[i].hasOwnProperty('bonus')){

                            y = this.blocksList[i].bonus.getPositionY() - (this.speed * delta * 2);
                            this.blocksList[i].bonus.setPositionY(y);  

                        }
                    }
                }
                else if(this.gameStatus == 1){

                    if(tempZOrder1 != 0 && tempZOrder2 != 0){
                    
                        this.blocksList[i].tile.setLocalZOrder(tempZOrder1 - 2);
                        this.blocksList[i].panel.setLocalZOrder(tempZOrder2 - 2);
                        tempZOrder1 -= 2;
                        tempZOrder2 -= 2;

                    }
                        y = this.blocksList[i].tile.getPositionY() - (this.speed * delta);
                        this.blocksList[i].tile.setPositionY(y);
                        y = this.blocksList[i].panel.getPositionY() - (this.speed * delta);
                        this.blocksList[i].panel.setPositionY(y);

                        if(this.blocksList[i].hasOwnProperty('bonus')){

                            y = this.blocksList[i].bonus.getPositionY() - (this.speed * delta);
                            this.blocksList[i].bonus.setPositionY(y);  

                        }
                }
                
            }
            else{
                if(this.gameStatus == 1){
                    //this.blocksList[i].y -= this.speed;
                    y = this.blocksList[i].getPositionY() - (this.speed * delta);
                    this.blocksList[i].setPositionY(y);
                }
                
            }
            i ++;
        }

        if(this.gameStatus == 1)
            this.setBlock();

    },
    gameOver: function() {

        this.retryLabel.opacity = 200;
        var easeAction = cc.moveBy(1.0, cc.p(0, cc.view.getFrameSize().height/2 + this.retryLabel.getContentSize().height / 2)).easing(cc.easeBounceOut());
        this.retryLabel.runAction( easeAction );

    },
    removeGame: function() {
        
        var tile , panel , bonus;

        while(this.blocksList.length> 0){
            tile = this.blocksList[i].tile;
            panel = this.blocksList[i].panel;
            if(this.blocksList[i].hasOwnProperty('bonus'))
            {
                bonus = this.blocksList[i].bonus;
                this.node.removeChild(bonus);
            }
            this.node.removeChild(tile);
            this.node.removeChild(panel);
            this.blocksList.splice(0 , 1); 
        }

        this.blocksList.length = 0;
        this.blocksList = null;

        this.retryLabel.opacity = 0;
        this.retryLabel.setPosition(cc.p(0, -cc.view.getFrameSize().height/2 - this.retryLabel.getContentSize().height/2)); 

    },
    setStartLabelAppear: function(nFlag , self){

        if(nFlag == 0){

        if(this.highScore < this.score)
        {
            this.highScore = this.score;
            this.highScoreDisplay.string = this.highScore.toString();
        }
        this.score = 0;
        this.scoreDisplay.string = this.score.toString();

        this.playerDirection = 0;
        this.mainPlayer.setLocalZOrder(99998);
        this.mainPlayer.opacity = 255;
        this.mainRightPlayer.setLocalZOrder(99997);

        this.mainPlayer.setPosition(cc.p(this.mainPlayerX, this.mainPlayerY));
        this.mainRightPlayer.setPosition(cc.p(this.mainPlayerX, this.mainPlayerY));

        /****** */
        this.leftTag.node.setLocalZOrder(99995);
        this.rightTag.node.setLocalZOrder(99994);
        this.leftTag.node.x = this.mainPlayer.x + 5;
        this.leftTag.node.y = this.mainPlayer.y - 21;
        this.rightTag.node.y = -this.winSize.height;
        /****** */

        this.mainRightPlayer.opacity = 0;

          this.startLabel.x = 0 - this.winSize.width;
          this.tapLabel.x = this.node.getContentSize().width/2 + this.winSize.width/2;
          this.startLabel.opacity = 255;
          this.tapLabel.opacity = 255;
          var easeAction = cc.moveBy(1.0, cc.p(this.winSize.width, 0)).easing(cc.easeBounceOut());
          this.startLabel.runAction( easeAction );
            
            this.tapLabel.stopAllActions();
            var easeAction1 = cc.moveBy(1.0, cc.p(-(this.node.getContentSize().width/2 + this.winSize.width/2), 0)).easing(cc.easeBounceOut());


            this.tapLabel.runAction( easeAction1);

            setTimeout(function(){
                var hide_plus = cc.moveBy(0, cc.p(self.winSize.width * 2, 0));
                var hide_minus = cc.moveBy(0, cc.p(-self.winSize.width * 2, 0));

                var actionSeq = cc.repeatForever(cc.sequence(hide_minus, cc.delayTime(0.5), hide_plus, cc.delayTime(0.5)));
                self.tapLabel.runAction(actionSeq);
            } , 2500);

            this.firstPlace.setPosition(cc.p(this.firstPlaceX , this.firstPlaceY));
            var down = cc.moveBy(1.0, cc.p(0, -20));
            var up = cc.moveBy(1.0, cc.p(0, 20));
            var down1 = cc.moveBy(1.0, cc.p(0, -20));
            var up1 = cc.moveBy(1.0, cc.p(0, 20));

            var action = cc.repeatForever(cc.sequence(down , up));
            var action1 = cc.repeatForever(cc.sequence(down1 , up1));
            this.firstPlace.runAction(action);
            this.mainPlayer.runAction(action1);
     
     
     
            this.blocksList = Array();
            this.blocksList[0] = self.firstPlace;                        

            this.setBlock();


        }
        else if(nFlag == 1){
            var daction1 = cc.fadeOut(1.0);
            var daction2 = cc.fadeOut(1.0);
            self.startLabel.runAction( daction2 );
            self.tapLabel.stopAllActions();
            self.tapLabel.runAction( daction1 );
        }
    }
});
