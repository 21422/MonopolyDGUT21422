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
         //当前地段范围
         rectri: {
            default: null,
            type: cc.Rect
            },

        //给予金钱
        giveMoney:2000,

        Game:{
            default: null,
            type: cc.Node
        },

        manager: null,

        player: {
            default: null,
            type: cc.Node
            },

        user:null,

        jack: {
            default: null,
            type: cc.Node
            },

        jacky:null,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        var rec =new cc.Rect(this.node.x-25,this.node.y-25,50,50);
        this.rectri = rec;
        this.node.giveMoney=2000;
        this.Game = cc.find('Controller');
        this.manager = this.Game.getComponent('Manager');
        this.player = cc.find('player');
        this.user = this.player.getComponent('User');
        this.jack = cc.find('jack');
        this.jacky = this.jack.getComponent('jack');
    },

     update (dt) 
     {
        var vec = new cc.Vec2(this.player.x,this.player.y);
        //如果玩家的坐标在土地矩形范围内
        if(this.rectri.contains(vec))
        {
            if(!this.manager.pIsHos)
            {
               this.user.showMoney(-500);
                this.manager.pIsHos=true;
                this.manager.roundU=true;
            }
        }
        var jvec = new cc.Vec2(this.jack.x,this.jack.y);
        if(this.rectri.contains(jvec))
        {
            if(!this.manager.jIsHos)
            {
                this.jacky.showMoney(-500);
                this.manager.jIsHos=true;
                this.manager.roundJ=true;
            }
        }
     },
});
