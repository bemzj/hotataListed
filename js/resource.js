var url="";
//加载页面的图片
var loadImg = [

]
//加载的图片的资源
var gameImg = [
	{path:url+'img/address.png',type:'img',name:'address'},//地址
	{path:url+'img/go.png',type:'img',name:'go'},//去
	{path:url+'img/gong.png',type:'img',name:'gong'},//锣
	{path:url+'img/gongBottom.png',type:'img',name:'gongBottom'},//锣的底部
	{path:url+'img/hit.png',type:'img',name:'hit'},//敲
	{path:url+'img/indexBack.jpg',type:'img',name:'indexBack'},//首页背景
	{path:url+'img/back.jpg',type:'img',name:'back'},//首页背景
	{path:url+'img/shareBack.jpg',type:'img',name:'shareBack'},//首页背景
	{path:url+'img/logo.png',type:'img',name:'logo'},//logo
	{path:url+'img/Title.jpg',type:'img',name:'Title'},//首页标题1
	{path:url+'img/Title1.png',type:'img',name:'Title1'},//首页标题2
	{path:url+'img/Title2.png',type:'img',name:'Title2'},//首页标题3
	{path:url+'img/shareTitle01.png',type:'img',name:'shareTitle01'},//分享标题
	{path:url+'img/share.png',type:'img',name:'share'},//箭头
	{path:url+'img/shareTitle02.png',type:'img',name:'shareTitle02'},//分享标题
	{path:url+'img/jinGroup.png',type:'img',name:'jinGroup'},//金粉
	{path:url+'img/gongBack.jpg',type:'img',name:'gongBack'},//锣的背景
	{path:url+'img/gongBig.png',type:'img',name:'gongBig'},//大锣
	{path:url+'img/hitBig.png',type:'img',name:'hitBig'},//大敲
	{path:url+'img/map.png',type:'img',name:'map'},//地图
	{path:url+'img/light.png',type:'img',name:'light'},//光
	{path:url+'img/line.png',type:'img',name:'line'},//线
	{path:url+'img/awardBkg.jpg',type:'img',name:'awardBkg'},//奖品背景
	{path:url+'img/alight.png',type:'img',name:'alight'},//光
	{path:url+'img/gift.png',type:'img',name:'gift'},//礼物
	{path:url+'img/shareRed.png',type:'img',name:'shareRed'},//分享
	{path:url+'img/getBkg.jpg',type:'img',name:'getBkg'},//摇奖背景
	{path:url+'img/giftCenter.png',type:'img',name:'giftCenter'},//礼品中心
	{path:url+'img/taiger.png',type:'img',name:'taiger'},//摇奖背景
	{path:url+'img/awardGift.png',type:'img',name:'awardGift'},//1288
	{path:url+'img/window.png',type:'img',name:'window'},//窗口
	{path:url+'img/window1.png',type:'img',name:'window1'},//窗口
	{path:url+'img/shank01.png',type:'img',name:'shank01'},//摇一摇
	{path:url+'img/shank02.png',type:'img',name:'shank02'},//摇一摇
	{path:url+'img/egg.png',type:'img',name:'egg'},//摇蛋机
	{path:url+'img/shankLeft.png',type:'img',name:'shankLeft'},//摇蛋机
	{path:url+'img/ball01.png',type:'img',name:'ball01'},//彩蛋
	{path:url+'img/ball02.png',type:'img',name:'ball02'},//彩蛋
	{path:url+'img/ball03.png',type:'img',name:'ball03'},//彩蛋
	{path:url+'img/ball04.png',type:'img',name:'ball04'},//彩蛋
	{path:url+'img/ball05.png',type:'img',name:'ball05'},//彩蛋
	{path:url+'img/ball06.png',type:'img',name:'ball06'},//彩蛋
	{path:url+'img/ball07.png',type:'img',name:'ball07'},//彩蛋
	{path:url+'img/hand.png',type:'img',name:'hand'},//手
	{path:url+'img/nBkg.png',type:'img',name:'nBkg'},//数字背景
	{path:url+'img/submit.png',type:'img',name:'submit'},//手
	{path:url+'img/confirm.png',type:'img',name:'confirm'},//确定
	{path:url+'img/popWindow.png',type:'img',name:'popWindow'},//弹窗
];
//全局变量
var backLayer,musicLayer,loadLayer,imgList,home;
//egges
function egges(x,y,name,arr,n){
	base(this,LSprite,[]);
	var self = this;
	self.x = x;
	self.y = y;
	self.bitmap = getBitmap(name);
	self.addChild(self.bitmap);
	self.arr = arr;
	self.n = n;
}
egges.prototype.play=function(time){
	var self = this;
	var sx = self.x;
	var sy = self.y;
	if(self.n == 4)
	{
		LTweenLite.to(self,time,{x:self.arr[0],y:self.arr[1],loop:true}).to(self,time,{x:self.arr[2],y:self.arr[3]}).to(self,time,{x:self.arr[4],y:self.arr[5]}).to(self,time,{x:sx,y:sy});
	}else{
		LTweenLite.to(self,time,{x:self.arr[0],y:self.arr[1],loop:true}).to(self,time,{x:self.arr[2],y:self.arr[3]}).to(self,time,{x:sx,y:sy});
	}
	
}
//数学
function num(x,y,text){
	base(this,LSprite,[]);
	var self = this;
	self.x = x;
	self.y = y;
	self.bitmap = getBitmap(imgList['nBkg']);
	self.addChild(self.bitmap);	
	self.text = new setText(3,3,42,text,'#f9eec6',true);
	self.addChild(self.text);
}
//获取人数
function getNumber(str){
	base(this,LSprite,[]);
	var self = this;
	var mystr = str.toString().split('');
	console.log(mystr);
	self.addChild(new setText(0,3,36,"已有",'#f9eec6',true));
	for(var i=0;i<mystr.length;i++)
	{
		self.addChild(new num(82+36*i,0,mystr[i]));
	}
	self.addChild(new setText(82+36*i,3,36,"人敲钟",'#f9eec6',true));
	
}