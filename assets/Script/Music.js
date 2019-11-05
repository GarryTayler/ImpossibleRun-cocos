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

        on: {
            default: null,
            type: cc.Node
        },
        off: {
            default: null,
            type: cc.Node
        },
        game: {
            default: null,
            serializable: false
        },
        isMusicOn: true

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
    },
    onLoad: function() {
        var self = this;

//        this.node.addChild(this.on);
//        this.node.addChild(this.off);

        this.on.setLocalZOrder(85000); this.on.opacity = 200;
        this.off.setLocalZOrder(85000); this.off.opacity = 0;

        this.node.on('touchstart', function ( event ) {

            if(self.isMusicOn){
                self.off.opacity = 200;
                self.on.opacity = 0;
                self.isMusicOn = false;
        
                self.node.getParent().emit('say-hello', {
                    isMusicOn: false,
                });
            }
            else{
                self.off.opacity = 0;
                self.on.opacity = 200;
                self.isMusicOn = true;
          
                self.node.getParent().emit('say-hello', {
                    isMusicOn: true,
                });
            }
        });
    }
    // update (dt) {},
});
