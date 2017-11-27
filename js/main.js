//游戏初始化
LInit(1000/40,"hotata",750,1202,main);
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
	musicLayer.addChild(new musicBtn(20,20,0.8,0.8,result['music'],'bg'));
}
//加载函数
function loadProgress(pre){
}
//游戏开始
function startGame(result){
	imgList=result;
	videoShow();
}
//视频播放
function videoShow(){
	var browser = {
		versions: function() {
			var u = navigator.userAgent,
				app = navigator.appVersion;
			return { //移动终端浏览器版本信息
				trident: u.indexOf('Trident') > -1, //IE内核
				presto: u.indexOf('Presto') > -1, //opera内核
				webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
				gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
				mobile: !!u.match(/AppleWebKit.*Mobile/i) || !!u.match(/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/), //是否为移动终端
				ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
				android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
				iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
				iPad: u.indexOf('iPad') > -1, //是否iPad
				webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
			};
		}(),
		language: (navigator.browserLanguage || navigator.language).toLowerCase()
	}
	//如果是苹果手机
	if(browser.versions.iPhone || browser.versions.iPad || browser.versions.ios) {
		$('#video').fadeIn();
		document.getElementById('bg').pause();
		$('#video')[0].play();		
		document.getElementById('video').onended=function(){
			$('#video').fadeOut();
			document.getElementById('bg').play();
			homePage();
		};
	}
	//如果是安卓手机
	if(browser.versions.android) {
		$('#videoBack').fadeIn();
		$('#video').fadeIn();
		var vcount = false;
		$('#videoBack img').css('opacity',0.2);
		var vb = setInterval(function(){
			if(vcount==true)
			{
				vcount = false;
				$('#videoBack img').css('opacity',0.1);
			}else{
				vcount = true;
				$('#videoBack img').css('opacity',0.25);
			}
		},500);
		$('#videoBack img').bind('touchstart',function(){
			document.getElementById('bg').pause();
			$('#videoBack').hide();
			$('#video')[0].play();
			$('#hotata').hide();
			document.getElementById('video').onended=function(){
				$('#video').fadeOut(100);
				document.getElementById('bg').play();
				$('#hotata').css('z-index',1000);
				$('#hotata').fadeIn(100,function(){
					homePage();
				});
				
			};
		});
	}
		
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
	gongLayer = new LSprite();
	backLayer.addChild(gongLayer);
	gongLayer.alpha = 0;
	LTweenLite.to(gongLayer,1.0,{alpha:1.0});
	LTweenLite.to(home,1.5,{alpha:0,onComplete:function(){
		home.remove();
		home=null;
	}});
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
			LTweenLite.to(lmap,1.5,{alpha:1}).to(light,0.5,{alpha:1}).to(line,1.5,{alpha:1,onComplete:function(){
				document.getElementById('hj').pause();
				setTimeout(index,500);
				
			},onStart:function(){
				setTimeout(function(){
					document.getElementById('gong').pause();
					document.getElementById('hj').play();
				},500);
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
function award(text,name){
	//$.get
	var awardLayer = new LSprite();
	backLayer.addChild(awardLayer);
	var back = getBitmap(imgList['awardBkg']);
	awardLayer.addChild(back);
	var txt = new setText(0,0,42,text,'#fcda91');
	txt.x = rCenterWidth(txt);
	txt.y = 188;
	awardLayer.addChild(txt);
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
	giftCenter.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
		awardLayer.remove();
		giftsCenter();
	});
	//光
	var alight = getBitmap(imgList['alight']);
	awardLayer.addChild(alight);
	bling(alight,0.5,1,0.6,true);
	//礼物
	var gift = getBitmap(imgList[name]);
	awardLayer.addChild(gift);
	gift.x=rCenterWidth(gift);
	gift.y=275;
}
//扭蛋
function awardGame(){
	backLayer.removeAllChild();
	backLayer.die();
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
	//返回首页
	var backIndex = getButton(imgList['backIndex']);
	tLayer.addChild(backIndex);
	backIndex.y = 1070;
	backIndex.x = 50;
	bigAndSmall(backIndex,2,2,1.0,0.02,0,true);
	backIndex.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
		tLayer.remove();
		index();
	});
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
	
	$.get('json/cishu.json',function(data){
		if(data.has==0)
		{
			//手
			var hand = getBitmap(imgList['hand']);
			hand.x = rCenterWidth(hand);
			hand.y= 780;
			tLayer.addChild(hand);
			var hTween = LTweenLite.to(hand,0.5,{y:740,alpha:0,loop:true,onComplete:function(){
				hand.alpha = 1;
				hand.y = 780;
			}});
		}else{
			popWin("您已成功领取！","分享红利给好友吧!");
		}
		sLayer.addEventListener(LMouseEvent.MOUSE_DOWN,function(){			
			if(data.has==0){
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
				//$.get
				/*
				 * 礼物 是 g1 到  g7排序
				 * 但是现在只要 g5，尴尬
				 */
				setTimeout(function(){
					$.get('json/getGift.json',function(data){
						if(data.id==1)
						{
							award("获得好太太100元代金券","g1");
						}else{
							$('iframe').show();
							$('#hotata').hide();
						}
					})
				},3000);
			}else{
				popWin("您已成功领取！","分享红利给好友吧!");
			}
		});
	});
	
	//礼品中心
	var center = getButton(imgList['center']);
	tLayer.addChild(center);
	center.x = 628;
	center.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
		sLayer.remove();
		giftsCenter();
	});
	
	shareRed.addEventListener(LMouseEvent.MOUSE_DOWN,sharing);
}
//老虎机
function taiger(){
	backLayer.removeAllChild();
	backLayer.die();
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
	
	var shank01 = getBitmap(imgList['shank01']);
	shank01.x = 684;
	shank01.y=314;
	tLayer.addChild(shank01);
	
	var shank02 = getBitmap(imgList['shank02']);
	shank02.x = 684;
	shank02.y=358;
	tLayer.addChild(shank02);
	shank02.alpha = 0;
	//检测是够已经获得红利
	$.get('json/cishu.json',function(data){
		if(data.has==0)
		{
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
				setTimeout(function(){
					award("获得1288元购GW-1561","gift");
					tLayer.remove();
				},2500);
			},1000);
		}else{
			popWin("您已成功领取！","分享红利给好友吧！")
			giftCenter.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
				tLayer.remove();
				giftsCenter();
			});
			shareRed.addEventListener(LMouseEvent.MOUSE_DOWN,sharing);
		}
	})
	
}
//主页
function index(){
	
	var indexLayer = new LSprite();
	backLayer.addChild(indexLayer);
	indexLayer.alpha = 0;
	LTweenLite.to(indexLayer,0.5,{alpha:1,onComplete:function(){
		if(gongLayer)
		{
			gongLayer.remove();
		}
	}});
	var back= getBitmap(imgList['index']);
	indexLayer.addChild(back);
	//领取红利
	var getRed = getButton(imgList['getRed']);
	indexLayer.addChild(getRed);
	getRed.y = 1070;
	getRed.x = 50;
	bigAndSmall(getRed,2,2,1.0,0.02,0,true);
	getRed.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
		indexLayer.die();
		indexLayer.remove();
		taiger();
	});
	//领取礼品
	var getGift = getButton(imgList['getGift']);
	indexLayer.addChild(getGift);
	getGift.y = 1070;
	getGift.x = 382;
	bigAndSmall(getGift,2,2,1.0,0.02,0,true);
	getGift.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
		indexLayer.die();
		indexLayer.remove();
		awardGame();
	});
	//活动说明
	var activity = getButton(imgList['activity']);
	indexLayer.addChild(activity);
	activity.x = 510;
	activity.addEventListener(LMouseEvent.MOUSE_DOWN,activityShow);
	//礼品中心
	var center = getButton(imgList['center']);
	indexLayer.addChild(center);
	center.x = 628;
	center.addEventListener(LMouseEvent.MOUSE_DOWN,giftsCenter);
}
//活动说明
function activityShow(){
	var aLayer = new LSprite();
	backLayer.addChild(aLayer);
	aLayer.graphics.drawRect(0,"#000000",[0,0,LGlobal.width,LGlobal.height],0,"#ffffff");
	aLayer.addEventListener(LMouseEvent.MOUSE_DOWN,setNull);
	//活动背景
	var back= getBitmap(imgList['activityBkg']);
	aLayer.addChild(back);
	//
	var txt = [
		"活动时间：11月20日-11月27日",
		"参与“领取特权”必得好太太优惠券",
		"参与“上市好礼”有机会获得实物礼品",
		"每个活动每个id仅限参与一次",
		"活动范围：中国大陆（不含港澳台地区）",
		"最终解释权归好太太集团所有"
		];
	var texts =[];
	var ty = [236,354,472,595,714,834];
	for(var i=0;i<txt.length;i++)
	{
		aLayer.addChild(new setText(145,ty[i],30,txt[i],"#e2c994"));
	}
	
	var returnIndex = new LSprite();
	aLayer.addChild(returnIndex);
	returnIndex.graphics.drawRect(0,"#000000",[215,1030,320,90],false,"#ffffff");
	returnIndex.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
		index();
		setTimeout(function(){
			aLayer.remove();
		},500);
	});
}
//礼品中心
function giftsCenter(){
	var gLayer = new LSprite();
	backLayer.addChild(gLayer);
	gLayer.graphics.drawRect(0,"#000000",[0,0,LGlobal.width,LGlobal.height],0,"#ffffff");
	gLayer.addEventListener(LMouseEvent.MOUSE_DOWN,setNull);
	//活动背景
	var back= getBitmap(imgList['gBkg']);
	gLayer.addChild(back);
	//测试
	var giftLayers = new LSprite();
	var nullscroll = new LBitmap(new LBitmapData(imgList['null']));//实例化空白条
	var scroll = new LScrollbar(giftLayers,641,830,{back:nullscroll,select:nullscroll,arraw:nullscroll},true,true);//滚动条
	gLayer.addChild(scroll);//添加滚动条
	scroll.x = 55;
	scroll.y = 200;
	/*
	 * 好太太100元代金券     编号为0
	 * 1288元购晾衣架GW-1561 编号为1
	 * 智能垃圾桶 GL-H001D 编号为2
	 * 炫彩简约衣架㆒琥珀金（16个） 编号为3
	 * 好太太抱枕  编号为4
	 * 好太太安迪人偶  编号为5
	 * 好太太智能晾衣机GW-1653 编号为6
	 */
	var gText = ["好太太100元代金券","1288元购晾衣架GW-1561","智能垃圾桶 GL-H001D","炫彩简约衣架㆒琥珀金（16个）","好太太抱枕","好太太安迪人偶 ","好太太智能晾衣机GW-1653"];
	$.get('json/gift.json',function(data){
		for(var i=0;i<data.all.length;i++)
		{
			switch(data.all[i].id)
			{
				case 0:
				case 1:
					giftLayers.addChild(new giftes(data.all[i].id,0,141*i,0,1,gText[data.all[i].id]));
					break;
				case 2:
				case 3:
				case 4:
				case 5:
				case 6:
					giftLayers.addChild(new giftes(data.all[i].id,0,141*i,0,2,gText[data.all[i].id],"订单号："+data.all[i].dan));
					break;
			}
		}
	});
	//null
	var nullLayer = new LSprite();
	gLayer.addChild(nullLayer);
	nullLayer.graphics.drawRect(0,"#000000",[0,1030,LGlobal.width,176],0,"#ffffff");
	nullLayer.addEventListener(LMouseEvent.MOUSE_DOWN,setNull);
	//返回首页
	var returnIndex = new LSprite();
	gLayer.addChild(returnIndex);
	returnIndex.graphics.drawRect(0,"#000000",[42,1040,320,90],false,"#ffffff");
	returnIndex.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
		index();
		setTimeout(function(){
			gLayer.remove();
		},500);
	});
	//附近门店
	var nearlLayer = new LSprite();
	gLayer.addChild(nearlLayer);
	nearlLayer.graphics.drawRect(0,"#000000",[370,1040,320,90],false,"#ffffff");
	nearlLayer.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
		window.location.href="store.html";
	});
}
//通用弹窗
function popWin(text1,text2){
	var popLayer = new LSprite();
	backLayer.addChild(popLayer);
	popLayer.graphics.drawRect(0,"#000000",[0,0,LGlobal.width,LGlobal.height],true,"rgba(0,0,0,0.75)");
	popLayer.addEventListener(LMouseEvent.MOUSE_DOWN,setNull);
	//活动背景
	var popWindow= getBitmap(imgList['popWindow']);
	popWindow.x = rCenterWidth(popWindow);
	popWindow.y = rCenterHeight(popWindow);
	popLayer.addChild(popWindow);
	
	var txt1;
	var txt2;
	if(!text2)
	{
		//确定
		var confirm= getButton(imgList['confirm']);
		confirm.x = rCenterWidth(confirm);
		confirm.y = popWindow.y+230;
		popLayer.addChild(confirm);
		txt1 = new setText(0,0,40,text1,"#fcda91");
		txt1.x = rCenterWidth(txt1);
		txt1.y = popWindow.y+130;
		popLayer.addChild(txt1);
	}else{
		//确定
		var confirm= getButton(imgList['confirm']);
		confirm.x = rCenterWidth(confirm);
		confirm.y = popWindow.y+250;
		popLayer.addChild(confirm);
		txt1 = new setText(0,0,40,text1,"#fcda91");
		txt1.x = rCenterWidth(txt1);
		txt1.y = popWindow.y+100;
		popLayer.addChild(txt1);
		txt2 = new setText(0,0,40,text2,"#fcda91");
		txt2.x = rCenterWidth(txt2);
		txt2.y = popWindow.y+170;
		popLayer.addChild(txt2);
	}
	
	confirm.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
		popLayer.remove();
	});
}
