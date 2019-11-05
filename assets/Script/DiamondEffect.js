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
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

        //var random1 = parseInt(cc.random0To1() * 100) % 2;
        var random1 = (cc.random0To1() + 1);

        this.node.setLocalZOrder(10);

        var down = cc.moveBy(random1, cc.p(0, -20));
        var up = cc.moveBy(random1, cc.p(0, 20));
        
        var action = cc.repeatForever(cc.sequence(down , up));
        this.node.runAction(action);
    },

    // update (dt) {},
});
