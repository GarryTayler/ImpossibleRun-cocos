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
        this.node.active = this.visible;
        var down = cc.moveBy(1.0, cc.p(0, -20));
        var up = cc.moveBy(1.0, cc.p(0, 20));
        var action = cc.repeatForever(cc.sequence(down , up));
        this.node.runAction(action);
    },

    start () {

    },

    // update (dt) {},
});
