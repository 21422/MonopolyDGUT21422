// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },

        Land:{
            default: null,
        },
        player:{
            default: null,
            type: cc.Node
        },
        user:{
            default: null,
        },

        Game:{
            default: null,
            type: cc.Node
        },

        manager: null,

        photo1:{
            default: null,
            type: cc.SpriteFrame
        },
        photo2:{
            default: null,
            type: cc.SpriteFrame
        },
        photo3:{
            default: null,
            type: cc.SpriteFrame
        },
        photo4:{
            default: null,
            type: cc.SpriteFrame
        },


    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    levelUP:function () {
        this.Land.isLevelUp = true;
        var sprite = this.Land.getComponent(cc.Sprite);
        this.user.showMoney(-this.Land.levelMoney);
        switch(this.Land.node.landType)
        {
            case 1:
                this.Land.node.giveMoney = 200;
                sprite.spriteFrame = this.photo1;
                break;
            case 2:
                this.Land.node.giveMoney = 400;
                 sprite.spriteFrame =this.photo2;
                 break;
            case 3:
                 this.Land.node.giveMoney = 600;
                sprite.spriteFrame = this.photo3;
                 break;
            case 4:
                this.Land.node.giveMoney = 800;
                sprite.spriteFrame = this.photo4;
        }
        //玩家行动结束
        this.manager.roundU = true;
        
    },

    hide:function () {
        this.node.parent.active = false;
        //玩家行动结束
        this.manager.roundU = true;
    },

    start () {
        this.user = this.player.getComponent('User');
        this.Game = cc.find('Controller');
        this.manager = this.Game.getComponent('Manager');
    },

    // update (dt) {},
});
