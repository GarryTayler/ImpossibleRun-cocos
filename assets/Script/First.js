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
        visible: true
    },
    onLoad: function() {
        
        this.node.active = this.visible;
        this.node.setLocalZOrder(99990);

        var down = cc.moveBy(1.0, cc.p(0, -20));
        var up = cc.moveBy(1.0, cc.p(0, 20));
        
        var action = cc.repeatForever(cc.sequence(down , up));
        this.node.runAction(action);
    },
    start () {

    },
    update: function(dt){
        //console.log(dt);
        /*console.log(this.accel);
        this.diff += this.accel;
        this.node.y = this.firstPosY + parseInt(this.diff);
        console.log(this.firstPosY + '--' + parseInt(this.diff));
        if(this.diff <= (-this.limitDiff) || this.diff >= 0){
            this.accel = -this.accel;
            if(this.accel > 0)
                this.firstPosY += this.limitDiff;
            else
                this.firstPosY -= this.limitDiff;
        }*/
            
        
    }
    // update (dt) {},
});
