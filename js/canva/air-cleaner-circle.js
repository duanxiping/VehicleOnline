var dpr;
var r = 0;
var x = 0;
var y = 0;
var airNum;
var airText;
var intervalId;
var initCanvas = function(canvas, context, width, height, rotateTime, airNums, airTexts) {
	dpr = window.devicePixelRatio = 2; //获取设备像素比
	airNum = airNums;
	airText = airTexts;
	if(canvas) {
		canvas.width = width * dpr;
		canvas.height = height * dpr;
		canvas.style.width = width + "px";
		canvas.style.height = height + "px";
	}
	r = (width * dpr - 10 * dpr) / 2;
	x = width * dpr / 2;
	y = height * dpr / 2;
	//重新设置圆心
	context.translate(x, y);
	drawNotChange(context);
	//圆周运动的速度
	console.log('旋转时间----------------'+rotateTime);
	if(rotateTime != 0){
		if(intervalId){
			clearInterval(intervalId);
		}
		intervalId = setInterval(function() {
			run(context, width, height);
		}, rotateTime);
	}else{
		if(intervalId){
			clearInterval(intervalId);
		}
		run(context, width, height);
	}
	
}

var time = 0; //定义圆周运动的执行次数
function run(cxt, width, height) {
	cxt.clearRect(-x, -y, width * dpr, height * dpr);
	drawNotChange(cxt);
	cxt.save(); //将当前以左上角坐标为(0,0)的上下文环境进行保存，这样是为了在接下来中要进行画布偏移后，可以进行还原当前的环境
	cxt.rotate(time * 8 * Math.PI / 180); //设定每次旋转的度数
	cxt.fillStyle = '#7DEFF5';
	cxt.beginPath();
	cxt.arc(0, y - 10 * dpr, 2 * dpr, 0, 2 * Math.PI, false);
	cxt.closePath();
	cxt.fill();
	cxt.restore(); //将当前为(x,y)的点还原为（0,0）,其实在save中就是将上下文环境保存到栈中，在restore下面对其进行还原
	time += 1;
	//		clearInterval(intervalId);
}

//绘制不变因素
function drawNotChange(context) {
	drawGradient(context);
	textPoint(context);
	context.beginPath();
	context.lineWidth = 0.5 * dpr;
	context.strokeStyle = "#40FAC8";
	context.arc(0, 0, r - 5 * dpr, 0, 2 * Math.PI);
	context.stroke();
	context.save();
}

function drawGradient(cont) {
	cont.beginPath();
	cont.lineWidth = 15 * dpr;
	cont.arc(0, 0, r - 20 * dpr, 0, 2 * Math.PI);
	var my_gradient = cont.createLinearGradient(-x + 40 * dpr, -y + 40 * dpr, x - 40 * dpr, y - 40 * dpr);
	my_gradient.addColorStop(0, "#1AE8BA");
	my_gradient.addColorStop(0.5, "#AB8EF9");
	my_gradient.addColorStop(1, "#0BE71C");
	cont.strokeStyle = my_gradient;
	cont.stroke();
	cont.save();
}
//文字内容和刻度
function textPoint(cont) {
	cont.beginPath();
	cont.fillStyle = '#81CCAF';
	cont.textAlign = 'center';
	cont.font = "" + 40 * dpr + "px Microsoft YaHei";
	cont.fillText(airNum, 0, -r + 95 * dpr);
	cont.fillStyle = '#858B85';
	cont.font = "" + 12 * dpr + "px Microsoft YaHei";
	cont.fillText(airText, 0, r - 70 * dpr);
	for(var i = 0; i < 92; i++) {
		cont.beginPath();
		cont.lineWidth = 3.5 * dpr;
		cont.moveTo(0, -y + 33 * dpr);
		cont.lineTo(0, -y + 16 * dpr);
		cont.strokeStyle = "white";
		cont.stroke();
		cont.rotate(Math.PI / 46);
		cont.closePath();
	}
}