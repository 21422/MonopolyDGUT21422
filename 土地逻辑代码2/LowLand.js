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

         //当前地段范围
         rectri: {
            default: null,
            type: cc.Rect
            },

        //土地类型
        landType: 1,
        //地段购买所需金钱
        buyMoney: 1000,
        //给予金钱
        giveMoney:100,
        //升级金钱
        levelMoney:500,
        //户主
        owner:0,
        //是否被升级
        isLevelUp:false,

        //玩家是否被扣除金钱
        isSubMoney:false,

         //jack是否被扣除金钱
         isSubMoneyJ:false,

        player: {
            default: null,
            type: cc.Node
            },

        Game:{
            default: null,
            type: cc.Node
        },

        manager: null,
        user: null,

        levelUI:{
            default: null,
            type: cc.Node
            },
            //用于图片更换
            lpyes:null,

        jack: {
            default: null,
            type: cc.Node
            },
         //jack的脚本组件   
        jacky:null,    

        //jack脚本控制
        Rjack:false,

        //player脚本控制
        Rplayer:false,

        //在自己土地上无操作
        noDo:false,

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    //初始化
    IntiTri:function(){
        var rec =new cc.Rect(this.node.x-25,this.node.y-25,50,50);
        this.rectri = rec;
        //console.log(rec);
        this.node.owner=0;
        this.node.landType=1;
        this.node.buyMoney=1000;
        this.node.giveMoney=100;
        this.node.levelMoney=500;

        this.player = cc.find('player');
        this.levelUI = cc.find('TextUI/levelUp');
        this.Game = cc.find('Controller');
        this.manager = this.Game.getComponent('Manager');
        this.user = this.player.getComponent('User');

        this.jack = cc.find('jack');
        this.jacky = this.jack.getComponent('jack');
        this.lpyes = cc.find('TextUI/levelUp/lpyes').getComponent('lpyes');
        //console.log(this.node.x);
        //console.log(this.node.y);
    },


    //玩家进入时主要行为
    coreBehav: function(){
        if(!this.manager.roundU){
        //玩家坐标
        var vec = new cc.Vec2(this.player.x,this.player.y);
        //如果玩家的坐标在土地矩形范围内
        if(this.rectri.contains(vec))
        {
            this.manager.Land = this;
            //土地未被购买
            if(this.node.owner==0)
            { 
                if(this.user.node.money >=this.node.buyMoney)
                {
                     //创建购买UI
                if(this.manager.buyUI==null)
                {
                    this.manager.buyUI = cc.instantiate(this.manager.buyUIPrefab);
                    this.Game.addChild(this.manager.buyUI);
                }
                else
                {
                    if(this.manager.uiU)
                    {
                        this.manager.buyUI.active = true;
                        this.manager.uiU=false;
                    }            
                }
                this.manager.buyUI.getChildByName('byes').getComponent('byes').Land = this;
               // this.buyUI.getChildByName('bno').getComponent().Land = this;
                }
                else
                 {
                        this.noDo=true;
                 }
            } 
            else{
                if(this.node.owner==1)
                {
                     //显示升级UI
                if(!this.isLevelUp && this.user.node.money >=this.node.levelMoney){
                    if(this.manager.uiU)
                    {
                        this.levelUI.active = true;
                        this.manager.uiU=false;
                    }  
                    this.levelUI.getChildByName('lpyes').getComponent('lpyes').Land = this;
                    }
                    else
                    {
                        this.noDo=true;
                    }
                }
                else
                {
                     /*经过其他角色土地*/
                     if(!this.isSubMoney)
                     {
                        //损失金钱
                     this.user.showMoney(-this.node.giveMoney);
                     //拥有该土地的角色得到金钱
                     switch(this.node.owner){
                        case 2:
                         this.jacky.showMoney(this.node.giveMoney);
                         break;
                        }
                        this.isSubMoney = true;
                        this.manager.roundU=true;
                     }
                     
                }
            }
            if(this.noDo) this.manager.roundU=true;
        }

        }
    },
    /*其余角色进入矩阵后的行动 */
    JackBehav:function () {
        var jvec = new cc.Vec2(this.jack.x,this.jack.y);
            if(this.rectri.contains(jvec))
        {
            if(!this.Rjack)
            {
                if(this.node.owner==0)
                {
                    if(this.jacky.node.money >= this.node.buyMoney)
                    {
                        //土地主人变更
                        this.node.owner = 2;
                        //扣除金钱
                        this.jacky.showMoney(-this.node.buyMoney);
                        //土地颜色变更
                        this.node.color = new cc.color(184,227,241,255);
    
                    }
                }
                else
                {
                    if(this.node.owner==2)
                    {
                        if(!this.isLevelUp && this.jacky.node.money >= this.node.levelMoney)
                        {
                            //扣除金钱
                            this.jacky.showMoney(-this.node.levelMoney);
                            //升级标志位
                            this.isLevelUp = true;
                            //金钱变更以及图片修改
                            var sprite = this.node.getComponent(cc.Sprite);
                            switch(this.node.landType)
                            {
                                case 1:
                                    this.node.giveMoney = 200;
                                    sprite.spriteFrame = this.lpyes.photo1;
                                    break;
                                case 2:
                                    this.node.giveMoney = 400;
                                     sprite.spriteFrame =this.lpyes.photo2;
                                     break;
                                case 3:
                                     this.node.giveMoney = 600;
                                    sprite.spriteFrame = this.lpyes.photo3;
                                     break;
                                case 4:
                                    this.node.giveMoney = 800;
                                    sprite.spriteFrame = this.lpyes.photo4;
                            }
                        }
                    }
                    else
                    {
                        /*经过其他角色土地*/
                     if(!this.isSubMoneyJ)
                     {
                        //损失金钱
                        this.jacky.showMoney(-this.node.giveMoney);
                        //拥有该土地的角色得到金钱
                        switch(this.node.owner){
                        case 1:
                         this.user.showMoney(this.node.giveMoney);
                         break;
                        }
                        this.isSubMoneyJ = true;
                     }
                    }         
                }
                this.Rjack = true;
                this.manager.roundJ = true;
            }
           
        }
        
    },

    start () {
       this.IntiTri();

    },

     update (dt) {
        this.coreBehav();
        this.JackBehav();
     },
});
