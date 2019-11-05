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
        
        this.node.x = 0 - cc.view.getFrameSize().width;

        this.node.opacity = 255;

        this.node.setLocalZOrder(100000);
        this.appearAction();

    },
    appearAction: function() {
        var easeAction = cc.moveBy(1.0, cc.p(cc.view.getFrameSize().width, 0)).easing(cc.easeBounceOut());
        this.node.runAction( easeAction );
    },
    start () {
    },
    update: function(dt) {
        //update speed of each frame according to the current acceleration direction
    },
    // update (dt) {},
});
