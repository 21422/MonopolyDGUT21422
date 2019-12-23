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
       //骰子的数字
       dice: 0,

       //UI是否显示
       uiU: null,

       //玩家回合是否结束
       roundU: null,

       //jack回合是否结束
       roundJ: null,

       //游戏开始标志
       started:false,
       //游戏结束标志
       end:false,

       player: {
        default: null,
        type: cc.Node
        },

        user: {
            default: null,
        },

         jack: {
             default: null,
            type: cc.Node
        },

        jacky: {
            default: null,
       },
       //jack动画是否可以播放
       jaisEnd:false,

        //购买界面
        buyUI: {
            default: null,
            type: cc.Node
            },

        //预制体
        buyUIPrefab: {
            default: null,
            type: cc.Prefab
            },

        //游戏结算UI
        endUI: {
            default: null,
            type: cc.Node
            },

            endLable: {
                default: null,
                type: cc.Label
            },

        Land:null,
        //骰子
        touzi: {
            default: null,
            type: cc.Node
            },
        anim:null,

        //骰子1
        touzi1: {
            default: null,
            type: cc.Node
            },
        anim1:null,
        //地图上各土地坐标集合
        map:null,

        //用户走路的路数
        Ustep:0,

        //jack走路的路数
        Jstep:0,

        /*home是否给予过金钱 */
        //player
        pIsMoney:true,
         //jack
         jIsMoney:true,

          /*是否被强制遣返 */
        //player
        pIsBack:false,
        //jack
        jIsBack:false,

         /*医院 */
        //player
        pIsHos:false,
        //jack
        jIsHos:false,

        //开始界面
        StartUI: {
            default: null,
            type: cc.Node
            },
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    IntiMap:function () {
        this.map = new Array(32);
        this.map[1] = {x:340,y:95,};
        this.map[2] = {x:390,y:95,};
        this.map[3] = {x:440,y:95,};
        this.map[4] = {x:490,y:95,};
        this.map[5] = {x:540,y:95,};
        this.map[6] = {x:590,y:95,};
        this.map[7] = {x:640,y:95,};
        this.map[8] = {x:690,y:95,};
        this.map[9] = {x:690,y:145,};
        this.map[10] = {x:690,y:195,};
        this.map[11] = {x:690,y:245,};
        this.map[12] = {x:690,y:295,};
        this.map[13] = {x:690,y:345,};
        this.map[14] = {x:690,y:395,};
        this.map[15] = {x:690,y:445,};
        this.map[16] = {x:690,y:495,};
        this.map[17] = {x:640,y:495,};
        this.map[18] = {x:590,y:495,};
        this.map[19] = {x:540,y:495,};
        this.map[20] = {x:490,y:495,};
        this.map[21] = {x:440,y:495,};
        this.map[22] = {x:390,y:495,};
        this.map[23] = {x:340,y:495,};
        this.map[24] = {x:290,y:495,};
        this.map[25] = {x:290,y:445,};
        this.map[26] = {x:290,y:395,};
        this.map[27] = {x:290,y:345,};
        this.map[28] = {x:290,y:295,};
        this.map[29] = {x:290,y:245,};
        this.map[30] = {x:290,y:195,};
        this.map[31] = {x:290,y:145,};
    },


    start () {
       //this.StepU = false;
       this.user = this.player.getComponent('User');
       //UI显示控制
       this.uiU=true;
       this.roundU = false;
       this.roundJ = false;
       this.started=false;
       this.jacky = this.jack.getComponent('jack');
       this.anim = this.touzi.getComponent(cc.Animation);
       //jack骰子动画
       this.touzi1 = cc.find('touzi1');
       this.anim1 = this.touzi1.getComponent(cc.Animation);

       this.node.Ustep=0;
       this.node.Jstep=0;
       this.IntiMap();

       //home
       this.pIsMoney = true;
       this.jIsMoney = true;

    },

    //玩家按照创建坐标移动
    pMove(dice)
    {
        this.node.Ustep+=dice;
        
        if(this.node.Ustep==32)
        {
            this.node.Ustep=0;
        }
        if(this.node.Ustep>32)
        {
            this.node.Ustep = this.node.Ustep - 32;
            this.user.showMoney(2000);
        }
        if(this.node.Ustep==0)
        {
            this.player.x=290;
            this.player.y=95;
        }
        else
        {
            this.player.x=this.map[this.node.Ustep].x;
            this.player.y=this.map[this.node.Ustep].y;
        }
    },

    //jack按照创建坐标移动
    JMove(dice)
    {
        this.node.Jstep+=dice;
        
        if(this.node.Jstep==32)
        {
            this.node.Jstep=0;
        }
        if(this.node.Jstep>32)
        {
            this.node.Jstep = this.node.Jstep - 32;
            this.jacky.showMoney(2000);
        }
        if(this.node.Jstep==0)
        {
            this.jack.x=240;
            this.jack.y=95;
        }
        else
        {
            this.jack.x=this.map[this.node.Jstep].x;
            this.jack.y=this.map[this.node.Jstep].y;
        }
        //console.log("步数："+this.node.Ustep);
    },


    //玩家掷骰子
    UserThrow:function()
    {
        //设置其他角色动画控制脚本
        this.jaisEnd=false;

        //
        if(this.roundJ||!this.started)
        {
            this.node.dice = Math.ceil((Math.random()*6));
            //让玩家的骰子显示
            this.touzi.zIndex = this.touzi1.zIndex+1;
            switch(this.node.dice)
            {
                case 1:
                    this.anim.play('1');
                    break;
                case 2:
                     this.anim.play('2');
                      break;
                case 3:
                     this.anim.play('3');
                      break;
                case 4:
                     this.anim.play('4');
                     break;
                case 5:
                    this.anim.play('5');
                    break;
                case 6:
                    this.anim.play('6');
                    break;
            }
            this.anim.on('finished',this.onAnimStop, this);
            //this.anim.off('finished',function (event) {},this);
        }
    },

    //动画播放结束时调用
    onAnimStop:function () {
        //this.user.PlyaerMove(1);
        this.pMove(this.node.dice);
        this.uiU=true;
        this.roundU = false;
        this.roundJ = false;
        this.started = true;
        if(this.Land!=null)
        {
            this.Land.isSubMoney=false;  
            this.Land.noDo=false; 
        }
        this.pIsMoney=false;
        this.pIsBack = false;
        this.pIsHos = false;

        //测试金钱
        //this.user.node.Money= -100;
    },

    //其他角色行动
    otherThrow:function () {
        if(this.roundU && !this.roundJ)
        {
            this.scheduleOnce(function(){

                if(!this.jaisEnd)
                {
                    this.node.dice = Math.ceil((Math.random()*6));
                    //让jack的骰子在玩家的骰子上面显示
                    this.touzi1.zIndex = this.touzi.zIndex+1;
                    //jack骰子动画播放结束
                    this.jaisEnd=true;
                    switch(this.node.dice)
                    {
                        case 1:
                            this.anim1.play('1');
                            break;
                        case 2:
                             this.anim1.play('2');
                              break;
                        case 3:
                             this.anim1.play('3');
                              break;
                        case 4:
                             this.anim1.play('4');
                             break;
                        case 5:
                            this.anim1.play('5');
                            break;
                        case 6:
                            this.anim1.play('6');
                            break;
                    }
                    this.anim1.on('finished',this.JAnimStop, this);
                }
       
            },1.5);
           
            
        }
    },

    //动画播放结束时调用
    JAnimStop:function () {
            this.JMove(this.node.dice);
            if(this.Land!=null)
            {
                this.Land.Rjack=false;  
                this.Land.isSubMoneyJ=false;  
            }
            //jack行动了
            //this.roundJ=true;
            this.jIsMoney=false;
            this.jIsBack = false;
            this.jIsHos = false;
            
    },

    //游戏结束函数
    EndGame:function () {
        //当金钱为负数即破产
        if(this.user.node.money<0||this.jacky.node.money<0){
            this.end=true;
        }
        //有人破产计算排名
        if(this.end){
            this.endUI.active = true;
            this.endUI.zIndex = 100;
            if(this.user.node.money > this.jacky.node.money)
            {
                this.endLable.string = "Winner: Player!!!";
            }
            else
            {
                this.endLable.string = "Winner: Jack!!!";
            }
         }
        
    },

    StartDestroy:function () {
      this.StartUI.destroy(); 
    },

    Quit:function () {
        cc.Game.end();
      },

     update (dt) 
     {      
         if(!this.end)  this.otherThrow();
       this.EndGame();
     },
});
