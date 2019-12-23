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

        code:1,

        //自身所有金钱
        money:6000,

        moneyUI:{
            default: null,
            type: cc.Label
        },

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    showMoney:function (money) {
        this.node.money = this.node.money + money;
        this.moneyUI.string = "玩家："+this.node.money+"元";
    },

    start () {
        this.node.code=1;
        this.node.money=6000;
    },

    PlyaerMove : function(dice)
    {
       // console.log(this.node.x);
       // console.log(this.node.y);
       
        if(this.node.y==95&&this.node.x<690&&this.node.x>=290)
        {
            this.node.x+=dice*50;
        }
        else if(this.node.x==690&&this.node.y<495&&this.node.y>=95)
        {
            this.node.y+=dice*50;
        }
        else if(this.node.y==495&&this.node.x>295&&this.node.x<=690)
        {
            this.node.x-=dice*50;
        }
        else if(this.node.x==290&&this.node.y>95&&this.node.y<=495)
        {
            this.node.y-=dice*50;
        }
        //console.log(this.node.x);
        //console.log(this.node.y);
    },

    // update (dt) {},
});
