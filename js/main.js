//游戏初始化
LInit(1000/40,"hotata",750,1207,main);
//游戏入口主函数
function main(){
    LGlobal.stageScale = LStageScaleMode.EXACT_FIT;//设置全屏变量
    LGlobal.screen(LStage.FULL_SCREEN);//设置全面适应
    backLayer = new LSprite();//创建背景层
    addChild(backLayer);//添加背景层到游戏环境中
    musicLayer = new LSprite();//创建音乐层
    addChild(musicLayer);//添加音乐层到游戏环境中
    LLoadManage.load(loadImg,'',loadImging);
}
//预加载页面
function loadImging(result){
	LLoadManage.load(gameImg,loadProgress,startGame);
}
//加载函数
function loadProgress(pre){
}
//游戏开始
function startGame(result){
	imgList=result;
	homePage();
}
//视频播放
function videoShow(){
	$('#video').fadeIn();
	$('#video')[0].play();
	document.getElementById('video').onended=function(){
		$('#video').fadeOut();
		homePage();
	};	
}
//首页
function homePage(){
	//首页层
	home = new LSprite();
	backLayer.addChild(home);
	//添加背景
	var back = getBitmap(imgList['indexBack']);
	home.addChild(back);
	//logo
	var logo = getBitmap(imgList['logo']);
	home.addChild(logo);
	logo.x=rCenterWidth(logo);
	logo.y=103;
	logo.alpha=0;
	//主题
	var Title = getBitmap(imgList['Title']);
	home.addChild(Title);
	Title.x=rCenterWidth(Title);
	Title.y=257;
	Title.alpha=0;
	//主题1
	var Title1 = getBitmap(imgList['Title1']);
	home.addChild(Title1);
	Title1.x=rCenterWidth(Title1);
	Title1.y=625;
	Title1.alpha=0;
	//主题2
	var Title2 = getBitmap(imgList['Title2']);
	home.addChild(Title2);
	Title2.x=rCenterWidth(Title2);
	Title2.y=712;
	Title2.alpha=0;
	//主题2
	var Title2 = getBitmap(imgList['Title2']);
	home.addChild(Title2);
	Title2.x=rCenterWidth(Title2);
	Title2.y=712;
	Title2.alpha=0;
	//锣的背部
	var gongBottom = getBitmap(imgList['gongBottom']);
	home.addChild(gongBottom);
	gongBottom.x=rCenterWidth(gongBottom);
	gongBottom.y=888;
	gongBottom.alpha=0;
	//锣
	var gong = getBitmap(imgList['gong']);
	home.addChild(gong);
	gong.x=rCenterWidth(gong)+1;
	gong.y=890;
	gong.alpha=0;
	//hit
	var hit = getBitmap(imgList['hit']);
	home.addChild(hit);
	hit.x=350;
	hit.y=970;
	hit.alpha=0;
	//逐层显示
	LTweenLite.to(logo,0.5,{alpha:1.0}).to(Title,0.6,{alpha:1.0}).to(Title1,0.6,{alpha:1.0}).to(Title2,0.6,{alpha:1.0,onComplete:function(){
		LTweenLite.to(gongBottom,0.6,{alpha:1.0}).to(hit,0.6,{alpha:1.0,onComplete:function(){
			bigAndSmall(Title,2,2,1.0,0.02,0,true);
			LTweenLite.to(hit,1.0,{y:950,x:345,scaleX:1.1,sacleY:1.1,rotate:20,loop:true}).to(hit,1.0,{y:970,x:350,rotate:0,scaleX:1.0,sacleY:1.0});
			var hitLayer = new LSprite();
			home.addChild(hitLayer);
			hitLayer.graphics.drawRect(0,"#ed2456",[282,891,185,185],true,'rgba(0,0,0,0)');
			hitLayer.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
				hitLayer.removeEventListener(LMouseEvent.MOUSE_DOWN);
				hitGong();
			});
		}});
		LTweenLite.to(gong,0.6,{alpha:1.0});
	}});	
}
//敲锣
function hitGong(){
	
	//渐变	
	var gongLayer = new LSprite();
	backLayer.addChild(gongLayer);
	gongLayer.alpha = 0;
	LTweenLite.to(gongLayer,2.0,{alpha:1.0});
	LTweenLite.to(home,2.0,{alpha:0});
	var back = getBitmap(imgList['gongBack']);
	gongLayer.addChild(back);
	//大锣
	var gongBig = getBitmap(imgList['gongBig']);
	gongLayer.addChild(gongBig);
	gongBig.x=rCenterWidth(gongBig)+6;
	gongBig.y=535;
	//hit
	var hitBig = getBitmap(imgList['hitBig']);
	gongLayer.addChild(hitBig);
	hitBig.x=350;
	hitBig.y=680;
	var hitTween = LTweenLite.to(hitBig,1.0,{y:660,x:345,scaleX:1.1,sacleY:1.1,rotate:20,loop:true}).to(hitBig,1.0,{y:680,x:350,rotate:0,scaleX:1.0,sacleY:1.0});
	//地图
	var lmap = getBitmap(imgList['map']);
	gongLayer.addChild(lmap);
	lmap.x=29;
	lmap.y=900;
	lmap.alpha=0;
	
	//亮光
	var light = getBitmap(imgList['light']);
	gongLayer.addChild(light);
	light.x=100;
	light.y=895;
	light.alpha = 0;
//	bling(light,1.0,0.4,1.0,true);
	//线
	var line = getBitmap(imgList['line']);
	gongLayer.addChild(line);
	line.x=112;
	line.y=875;
	line.alpha=0
	
	var hitLayer = new LSprite();
	gongLayer.addChild(hitLayer);
	hitLayer.graphics.drawRect(0,"#ed2456",[190,525,370,370],true,'rgba(0,0,0,0)');
	hitLayer.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
		hitLayer.removeEventListener(LMouseEvent.MOUSE_DOWN);
		LTweenLite.remove(hitTween);
		LTweenLite.to(hitBig,0.5,{y:640,x:345,scaleX:1.4,sacleY:1.4,rotate:30}).to(hitBig,0.25,{y:680,x:350,rotate:0,scaleX:1.0,sacleY:1.0,onComplete:function(){
			var g = 4;
			var gongx = gongBig.x;
			var gongs = LTweenLite.to(gongBig,0.1,{x:gongx-g,loop:true}).to(gongBig,0.1,{x:gongx+g,onStart:function(){
				g-=1;
				if(g==0){
					LTweenLite.remove(gongs);
					LTweenLite.to(gongBig,0.05,{x:gongx});
				}
			}});
			document.getElementById('gong').play();
			LTweenLite.to(lmap,1.0,{alpha:1}).to(light,0.5,{alpha:1}).to(line,1.5,{alpha:1,onComplete:function(){
				document.getElementById('gong').pause();
			}});
		}});
	});
	/*
	 * data.number为已敲钟的人数
	 */
	$.get('json/number.json',function(data){
		var numbers = new getNumber(data.number);
		numbers.x = LGlobal.width-numbers.getWidth()-20;
		numbers.y = 20;
		gongLayer.addChild(numbers);
	})
	
}
//分享页面
function sharing(){
	var share = new LSprite();
	backLayer.addChild(share);
	var back = getBitmap(imgList['shareBack']);
	share.addChild(back);
	//金粉
	var jin = getBitmap(imgList['jinGroup']);
	share.addChild(jin);
	jin.y = -140;
	bling(jin,0.5,1.0,0.6,true);
	//logo
	var logo = getBitmap(imgList['logo']);
	share.addChild(logo);
	logo.x=rCenterWidth(logo);
	logo.y=330;
	//分享标题01
	var shareTitle01 = getBitmap(imgList['shareTitle01']);
	share.addChild(shareTitle01);
	shareTitle01.x=rCenterWidth(shareTitle01);
	shareTitle01.y=510;
	bigAndSmall(shareTitle01,2,2,1.0,0.02,0,true);
	//分享标题02
	var shareTitle02 = getBitmap(imgList['shareTitle02']);
	share.addChild(shareTitle02);
	shareTitle02.x=rCenterWidth(shareTitle02);
	shareTitle02.y=608;
	//分享
	var shares = getBitmap(imgList['share']);
	share.addChild(shares);
	shares.x=580;//610
	shares.y=40;//24
	shares.rotate = 15;
	LTweenLite.to(shares,1.0,{x:610,y:10,rotate:0,loop:true}).to(shares,1.0,{x:570,y:40,rotate:15});
	//提示
	var textTip =new setText(0,0,24,"点击关闭分享页","#f5d8a0");
	textTip.x = rCenterWidth(textTip);
	textTip.y = 870;
	share.addChild(textTip);
	bling(textTip,1.0,0.5,0.4,true);
	//关闭分享页
	var closeBack = new LSprite();
	share.addChild(closeBack);
	closeBack.graphics.drawRect(0,"#ffffff",[0,0,LGlobal.width,LGlobal.height],false,"#ffffff");
	closeBack.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
		share.remove();
	});
}
//获奖页面
function award(){
	var awardLayer = new LSprite();
	backLayer.addChild(awardLayer);
	var back = getBitmap(imgList['awardBkg']);
	awardLayer.addChild(back);
	//分享按钮
	var shareRed = getButton(imgList['shareRed']);
	awardLayer.addChild(shareRed);
	shareRed.x=rCenterWidth(shareRed);
	shareRed.y=1015;
	bigAndSmall(shareRed,2,2,1.0,0.02,0,true);
	shareRed.addEventListener(LMouseEvent.MOUSE_DOWN,sharing);
	//中心
	var giftCenter = getButton(imgList['giftCenter']);
	awardLayer.addChild(giftCenter);
	giftCenter.x = rCenterWidth(shareRed);;
	giftCenter.y = 910;
	bigAndSmall(giftCenter,2,2,1.0,0.02,0,true);
	//光
	var alight = getBitmap(imgList['alight']);
	awardLayer.addChild(alight);
	bling(alight,0.5,1,0.6,true);
	//礼物
	var gift = getBitmap(imgList['gift']);
	awardLayer.addChild(gift);
	gift.x=rCenterWidth(gift);
	gift.y=275;
}
//扭蛋
function awardGame(){
	var tLayer = new LSprite();
	backLayer.addChild(tLayer);
	//1288
	var getBkg = getBitmap(imgList['getBkg']);
	tLayer.addChild(getBkg);
	//彩蛋
	var ball = [];
	var ballx = [150,200,110,350,260,375,300,450,490,530];
	var bally = [480,550,555,555,470,470,550,555,480,555];
	var balln = ['ball04','ball01','ball02','ball03','ball07','ball04','ball05','ball02','ball03','ball06'];
	var ballList = [];
	var bn = [4,4,3,4,4,4,4,4,3,3];
	var t = [0.08,0.12,0.12,0.1,0.12,0.08,0.14,0.13,0.12,0.12];
	
	ballList.push([536,400,250,285,102,380]);
	ballList.push([102,280,480,285,536,480]);
	ballList.push([536,340,110,285,102,420]);
	ballList.push([102,440,250,285,536,400]);
	ballList.push([536,400,300,200,102,380]);
	ballList.push([102,380,250,285,536,400]);
	ballList.push([102,380,250,285,536,480]);
	ballList.push([536,400,102,200,102,380]);
	ballList.push([536,285,102,450,102,380]);
	ballList.push([536,285,102,450,102,380]);
	for(var i=0;i<ballx.length;i++)
	{
		ball[i] = new egges(ballx[i],bally[i],imgList[balln[i]],ballList[i],bn[i]);
		tLayer.addChild(ball[i]);
	}
//	扭蛋机
	var back = getBitmap(imgList['egg']);
	tLayer.addChild(back);
	back.y = 169;
	back.x = rCenterWidth(back);
	//摇的左边
	var shankLeft= getBitmap(imgList['shankLeft']);
	shankLeft.x=16;
	shankLeft.y=416;
	tLayer.addChild(shankLeft);
	//礼品中心
	var giftCenter = getButton(imgList['giftCenter']);
	tLayer.addChild(giftCenter);
	giftCenter.y = 1070;
	giftCenter.x = 50;
	bigAndSmall(giftCenter,2,2,1.0,0.02,0,true);
	var shareRed = getButton(imgList['shareRed']);
	tLayer.addChild(shareRed);
	shareRed.y = 1070;
	shareRed.x = 382;
	bigAndSmall(shareRed,2,2,1.0,0.02,0,true);	
	//窗口2
	var wd1= getBitmap(imgList['window1']);
	wd1.x=rCenterWidth(wd1)+4;
	wd1.y=291;
	tLayer.addChild(wd1);
	//摇一摇
	var shank01 = getBitmap(imgList['shank01']);
	shank01.x = 684;
	shank01.y=314;
	tLayer.addChild(shank01);
	var shank02 = getBitmap(imgList['shank02']);
	shank02.x = 684;
	shank02.y=358;
	tLayer.addChild(shank02);
	shank02.alpha = 0;
	//摇奖
	var sLayer = new LSprite();
	tLayer.addChild(sLayer);
	sLayer.graphics.drawRect(0,"#ffffff",[95,688,560,100],false,"#ffffff");
	sLayer.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
		sLayer.removeEventListener(LMouseEvent.MOUSE_DOWN);
		LTweenLite.remove(hTween);
		hand.remove();
		LTweenLite.to(shank02,0.1,{alpha:1.0});
		LTweenLite.to(shank01,0.1,{alpha:0});
		setTimeout(function(){
			LTweenLite.to(shank01,0.1,{alpha:1.0});
			LTweenLite.to(shank02,0.1,{alpha:0});
		},200);
		for(var i=0;i<ballx.length;i++)
		{
			ball[i].play(t[i]);
		}
	});
	//手
	var hand = getBitmap(imgList['hand']);
	hand.x = rCenterWidth(hand);
	hand.y= 780;
	tLayer.addChild(hand);
	var hTween = LTweenLite.to(hand,0.5,{y:740,alpha:0,loop:true,onComplete:function(){
		hand.alpha = 1;
		hand.y = 780;
	}})
	shareRed.addEventListener(LMouseEvent.MOUSE_DOWN,sharing);
}
//老虎机
function taiger(){
	var tLayer = new LSprite();
	backLayer.addChild(tLayer);
	tLayer.graphics.drawRect(0,"#ed2456",[0,0,750,1206],true,'#242629');
	//1288
	var awardGift1 = getBitmap(imgList['awardGift']);
	tLayer.addChild(awardGift1);
	awardGift1.x = rCenterWidth(awardGift1)-3;
	awardGift1.y = 160;
	var awardGift2 = getBitmap(imgList['awardGift']);
	tLayer.addChild(awardGift2);
	awardGift2.x = rCenterWidth(awardGift2)-3;
	awardGift2.y = -500;
	
	
	//背景
	var back = getBitmap(imgList['taiger']);
	tLayer.addChild(back);
	//窗口
	var wd= getBitmap(imgList['window']);
	wd.x=rCenterWidth(wd);
	wd.y=280;
	tLayer.addChild(wd);
	//礼品中心
	var shank01 = getBitmap(imgList['shank01']);
	shank01.x = 684;
	shank01.y=314;
	tLayer.addChild(shank01);
	
	var shank02 = getBitmap(imgList['shank02']);
	shank02.x = 684;
	shank02.y=358;
	tLayer.addChild(shank02);
	shank02.alpha = 0;
	setTimeout(function(){
		LTweenLite.to(shank02,0.1,{alpha:1.0});
		LTweenLite.to(shank01,0.1,{alpha:0});
		LTweenLite.to(awardGift1,0.2,{loop:true,y:820,onComplete:function(){
			awardGift1.y = 160;
		}});
		LTweenLite.to(awardGift2,0.2,{loop:true,y:160,onComplete:function(){
			awardGift2.y = -500;
		}});
		setTimeout(function(){
			LTweenLite.to(shank01,0.1,{alpha:1.0});
			LTweenLite.to(shank02,0.1,{alpha:0});
		},200);
	},1000);
}

