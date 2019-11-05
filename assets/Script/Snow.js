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
        screenWidth : 720,
        screenHeight : 1280,
        speedX: 0,
        speedY: 0,
        minSpeedX: 2, 
        minSpeedY: 4,
        xLimit: 3, 
        yLimit: 6,
        xSpeed: 0,
        ySpeed: 0
    },
    ctor:function() {
        //initialize gam
        
        

    },
    onLoad: function() {
        this.screenWidth = 720;
        this.screenHeight = 1280;
        this.init();
    },
    start () {

    },
    init: function(){
        this.node.y = this.screenHeight / 2;
        this.node.x = (cc.random0To1() * this.screenWidth - this.screenWidth / 2);
        this.ySpeed = (cc.random0To1() * this.yLimit) + this.minSpeedY;
        this.xSpeed = (cc.random0To1() * this.xLimit) + this.minSpeedX;
        if(cc.random0To1() <= 0.5)
            this.xSpeed = -this.xSpeed;
    },
    update: function(delta) {
        this.node.y -= this.ySpeed;
        this.node.x -= this.xSpeed;
        if(this.node.y < -this.screenHeight / 2 || this.node.x < -this.screenWidth / 2 || this.node.x > this.screenWidth / 2)
            this.init();
    }
});
