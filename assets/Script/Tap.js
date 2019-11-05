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
        
        this.node.setLocalZOrder(99999);
        
        this.node.x = this.node.getContentSize().width/2 + cc.view.getFrameSize().width/2;
        this.node.opacity = 255;
        this.node.stopAllActions();

        var easeAction = cc.moveBy(1.0, cc.p(-(this.node.getContentSize().width/2 + cc.view.getFrameSize().width/2), 0)).easing(cc.easeBounceOut());
        this.node.runAction( easeAction);
        var self = this;

        setTimeout(function(){
            
            var hide_plus = cc.moveBy(0, cc.p(720 * 2, 0));
            var hide_minus = cc.moveBy(0, cc.p(-720 * 2, 0));

            var actionSeq = cc.repeatForever(cc.sequence(hide_minus, cc.delayTime(0.5), hide_plus, cc.delayTime(0.5)));
            self.node.runAction(actionSeq);
        } , 2500);
        
    },

    start () {
    },

    update: function(dt) {
        //update speed of each frame according to the current acceleration direction
    },

    // update (dt) {},
});
