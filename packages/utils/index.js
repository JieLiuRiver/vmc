var Tween = {
		linear: function (t, b, c, d){
			return c*t/d + b;
		},
		easeIn: function(t, b, c, d){
			return c*(t/=d)*t + b;
		},
		easeOut: function(t, b, c, d){
			return -c *(t/=d)*(t-2) + b;
		},
		easeBoth: function(t, b, c, d){
			if ((t/=d/2) < 1) {
				return c/2*t*t + b;
			}
			return -c/2 * ((--t)*(t-2) - 1) + b;
		},
		easeInStrong: function(t, b, c, d){
			return c*(t/=d)*t*t*t + b;
		},
		easeOutStrong: function(t, b, c, d){
			return -c * ((t=t/d-1)*t*t*t - 1) + b;
		},
		easeBothStrong: function(t, b, c, d){
			if ((t/=d/2) < 1) {
				return c/2*t*t*t*t + b;
			}
			return -c/2 * ((t-=2)*t*t*t - 2) + b;
		},
		elasticIn: function(t, b, c, d, a, p){
			if (t === 0) { 
				return b; 
			}
			if ( (t /= d) == 1 ) {
				return b+c; 
			}
			if (!p) {
				p=d*0.3; 
			}
			if (!a || a < Math.abs(c)) {
				a = c; 
				var s = p/4;
			} else {
				var s = p/(2*Math.PI) * Math.asin (c/a);
			}
			return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		},
		elasticOut: function(t, b, c, d, a, p){
			if (t === 0) {
				return b;
			}
			if ( (t /= d) == 1 ) {
				return b+c;
			}
			if (!p) {
				p=d*0.3;
			}
			if (!a || a < Math.abs(c)) {
				a = c;
				var s = p / 4;
			} else {
				var s = p/(2*Math.PI) * Math.asin (c/a);
			}
			return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
		},    
		elasticBoth: function(t, b, c, d, a, p){
			if (t === 0) {
				return b;
			}
			if ( (t /= d/2) == 2 ) {
				return b+c;
			}
			if (!p) {
				p = d*(0.3*1.5);
			}
			if ( !a || a < Math.abs(c) ) {
				a = c; 
				var s = p/4;
			}
			else {
				var s = p/(2*Math.PI) * Math.asin (c/a);
			}
			if (t < 1) {
				return - 0.5*(a*Math.pow(2,10*(t-=1)) * 
						Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
			}
			return a*Math.pow(2,-10*(t-=1)) * 
					Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
		},
		backIn: function(t, b, c, d, s){
			if (typeof s == 'undefined') {
			   s = 1.70158;
			}
			return c*(t/=d)*t*((s+1)*t - s) + b;
		},
		backOut: function(t, b, c, d, s){
			if (typeof s == 'undefined') {
				s = 2.70158;  //回缩的距离
			}
			return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
		}, 
		backBoth: function(t, b, c, d, s){
			if (typeof s == 'undefined') {
				s = 1.70158; 
			}
			if ((t /= d/2 ) < 1) {
				return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
			}
			return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
		},
		bounceIn: function(t, b, c, d){
			return c - Tween['bounceOut'](d-t, 0, c, d) + b;
		},       
		bounceOut: function(t, b, c, d){
			if ((t/=d) < (1/2.75)) {
				return c*(7.5625*t*t) + b;
			} else if (t < (2/2.75)) {
				return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
			} else if (t < (2.5/2.75)) {
				return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
			}
			return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
		},      
		bounceBoth: function(t, b, c, d){
			if (t < d/2) {
				return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
			}
			return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
		}
};
function mScroll(wrap, callBack){
	var child = wrap.children[0]; 
	var startPoint = 0;
	var startY = 0;
	var minY = wrap.clientHeight - child.offsetHeight;
	var step = 1;
	var lastY = 0; 
	var lastTime = 0;
	var lastDis = 0;
	var lastTimeDis = 1;
	var isMove = true;
	var isFirst = true;
	cssTransform(child,"translateZ",0.01);
	wrap.addEventListener(
		'touchstart', 
		function(e) {
			minY = wrap.clientHeight - child.offsetHeight;
			clearInterval(child.scroll);
			if(callBack&&callBack.start){
				callBack.start();
			}
			startPoint = {pageY:e.changedTouches[0].pageY,pageX:e.changedTouches[0].pageX};
			startY = cssTransform(child,"translateY");
			step = 1;
			lastY = startPoint.pageY;
			lastTime = new Date().getTime();
			lastDis = 0;
			lastTimeDis = 1;
			isMove = true;
			isFirst = true;
		}
	);
	wrap.addEventListener(
		'touchmove', 
		function(e) {
			if(!isMove) {
				return ;
			}
			var nowPoint = e.changedTouches[0];
			var disX = nowPoint.pageX - startPoint.pageX;
			var disY = nowPoint.pageY - startPoint.pageY;
			if(isFirst) {
				isFirst = false;
				if(Math.abs(disY) < Math.abs(disX)) {
					isMove = false;
					return ;
				}
			}
			var t = startY + disY;
			var nowTime = new Date().getTime();
			if(t > 0) {
				step = 1-t / wrap.clientHeight; 
				t = parseInt(t*step);
			}
			if(t < minY) {
				var over = minY - t; 
				step = 1-over / wrap.clientHeight;
				over = parseInt(over*step);
				t = minY - over;
			}
			lastDis = nowPoint.pageY - lastY; 
			lastTimeDis = nowTime - lastTime; 
			lastY = nowPoint.pageY;
			lastTime = nowTime;
			cssTransform(child,"translateY",t);
			if(callBack&&callBack.in){
				callBack.in();
			}
		}
	);
	wrap.addEventListener(
		'touchend', 
		function (){
			var speed = (lastDis/lastTimeDis)*120; 
			speed = isNaN(speed)?0:speed;
			var t = cssTransform(child,"translateY");
			var target = t + speed; 
			var type = "easeOut";
			var time = Math.abs(speed*.9);
			time = time<300?300:time;
			if(target > 0) {
				target = 0;
				type ="backOut";
			}
			if(target < minY) {
				target = minY;
				type ="backOut";
			}
			move(target,time,type);
			if(callBack&&callBack.end){
				callBack.end();
			}
		}
	);
	/*
		start 手指按下
		in 滑动中
		end 手指抬起
		over 滑动结束
	*/
	function move(target,time,type) {
		var t = 0;
		var b = cssTransform(child,"translateY");
		var c = target - b;
		var d = Math.ceil(time/20);
		clearInterval(child.scroll);
		child.scroll = setInterval(
			function() {
				t++;
				if(t > d) {
					clearInterval(child.scroll);
					if(callBack&&callBack.over){
						callBack.over();
					}
				} else {
					var top = Tween[type](t,b,c,d);
					cssTransform(child,"translateY",top);
					if(callBack&&callBack.in){
						callBack.in();
					}
				}
			},20
		);
	}
}
function TouchEevent(obj){
	var _this = this;
	this.obj = obj;
	for(var i=0; i<this.obj.length; i++){
		this.obj[i].touches={x:0,y:0};
		this.obj[i].isMove = false;
		this.obj[i].index = i;
		this.obj[i].addEventListener("touchstart",
			function(e){
				_this.fnStart(e,this.index);
			},
			false
		);
		this.obj[i].addEventListener("touchmove",
			function(e){
				this.isMove = true;
			},
			false
		);
		this.obj[i].addEventListener("touchend",
			function(e){
				_this.fnEnd(e,this.index);
			},
			false
		);
	}
}
TouchEevent.prototype = {
	fnStart: function(e,index){
		this.obj[index].touches={x:e.changedTouches[0].pageX,y:e.changedTouches[0].pageY};
		this.obj[index].isMove = false;
	},
	fnEnd: function(e,index){
		var nowTouches = {x:e.changedTouches[0].pageX,y:e.changedTouches[0].pageY};
		var disX = nowTouches.x -this.obj[index].touches.x;
		var disY = nowTouches.y - this.obj[index].touches.y;
		if(disX != 0 || disY != 0){
			if(this.swipe){
				this.swipe.call(this.obj[index]);
			}
			if(disX > 10 && this.swipeRight){
					this.swipeRight.call(this.obj[index]);
			}
			if(disX < -10 && this.swipeLeft){
				this.swipeLeft.call(this.obj[index]);
			}
			if(disY < -10 && this.swipeUp){
					this.swipeUp.call(this.obj[index]);
			}
			if(disY > 10 && this.swipeDown){
				this.swipeDown.call(this.obj[index]);
			}
		}
		if(!this.obj[index].isMove && this.tap){
			this.tap.call(this.obj[index],e);
		}
	},
	tap: function(fn){
		this.tap = fn;
	},
	swipe: function(fn){
		this.swipe = fn;
	},
	swipeLeft: function(fn){
		this.swipeLeft = fn;
	},
	swipeRight: function(fn){
		this.swipeRight = fn;
	},
	swipeUp: function(fn){
		this.swipeUp = fn;
	},
	swipeDown: function(fn){
		this.swipeDown = fn;
	}
};
function getDistance(p1, p2) {
    var x = p2.pageX - p1.pageX,
        y = p2.pageY - p1.pageY;
    return Math.sqrt((x * x) + (y * y));
}
function getAngle(p1, p2) {
    var x = p1.pageX - p2.pageX,
        y = p1.pageY- p2.pageY;
    return Math.atan2(y, x) * 180 / Math.PI;
}
function MSetGesture(el){
	var obj = {};
	var isGesTure = false;
	var startPinter = [];
	el.addEventListener("touchstart",
		function(e){
			if(e.touches.length >= 2){
				isGesTure = true;
				startPinter = e.touches;
				obj.gesturestart&&obj.gesturestart.call(el);
			}
		},
		false
	);
	document.addEventListener("touchmove",
		function(e){
			if(e.touches.length >= 2&&isGesTure){
				var nowPinter = e.touches;
				var scale = getDistance(nowPinter[0], nowPinter[1]) / getDistance(startPinter[0], startPinter[1]);
				var rotate =  getAngle(nowPinter[0], nowPinter[1]) -  getAngle(startPinter[0], startPinter[1]) 
				e.scale = scale; 
				e.rotation = rotate;
				obj.gesturemove&&obj.gesturemove.call(el,e);
			}
		},
		false
	)
	document.addEventListener("touchend",
		function(){
			if(isGesTure){
				isGesTure = false
				obj.gestureend&&obj.gestureend.call(el);
			}
		},
		false
	);
	return obj;
}
function MTouch(obj){
	if(typeof obj == "string"){
		obj = document.querySelectorAll(obj);
	}
	if(typeof obj.length == "number")
	{
		return new TouchEevent(obj);
	}
	return new TouchEevent([obj]);
}
function cssTransform(el,attr,val) {
	if(!el.transform){
		el.transform = {};
	}
	if(arguments.length>2) {
		el.transform[attr] = val;
		var sVal = "";
		for(var s in el.transform){
			switch(s) {
				case "rotate":
				case "skewX":
				case "skewY":
					sVal +=s+"("+el.transform[s]+"deg) ";
					break;
				case "translateX":
				case "translateY":
				case "translateZ":
					sVal +=s+"("+el.transform[s]+"px) ";
					break;
				case "scaleX":
				case "scaleY":
				case "scale":
					sVal +=s+"("+el.transform[s]+") ";
					break;	
			}
			el.style.WebkitTransform = el.style.transform = sVal;
		}
	} else {
		val  = el.transform[attr];
		if(typeof val == "undefined" ) {
			if(attr == "scale" || attr == "scaleX" || attr == "scaleY"  ) {
				val = 1;
			} else {
				val = 0;
			}
		}
		return val;
	}
}
function css(element, attr , val){
	if(attr=='scale'|| attr=='rotate'|| attr=='rotateX'|| attr=='rotateY'|| attr=='rotateZ'|| attr=='scaleX'|| attr=='scaleY'|| attr=='translateY'|| attr=='translateX'|| attr=='translateZ' || attr=='skewX' || attr=='skewY'||attr=='skewZ'){
		return setTransform(element, attr , val);
	}
	if(arguments.length == 2){
		var val = element.currentStyle?element.currentStyle[attr]:getComputedStyle(element)[attr];
		if(attr=='opacity'){
			val = Math.round(val*100);
		}
		return parseFloat(val);
	} else {
		switch(attr){
			case 'width':
			case 'height':
			case 'paddingLeft':
			case 'paddingTop':
			case 'paddingRight':
			case 'paddingBottom':
			case 'borderWidth':
			case 'borderLeftWidth':
			case 'borderRightWidth':
			case 'borderTopWidth':
			case 'borderBottomWidth':
				val = val < 0 ? 0 : val;
			case 'left':
			case 'top':
			case 'marginLeft':
			case 'marginTop':
			case 'marginRight':
			case 'marginBottom':
				element.style[attr] = val +"px";
				break;
			case 'opacity':
				element.style.filter= "alpha(opacity:"+val+")";
				element.style.opacity= val/100;
				break;	
			default:
				element.style[attr]=val;	
		}
	}
}
function setTransform() {
	if(!element["transform"]){
		element["transform"] = {};
	}
	if(typeof val == "undefined"){
		val = element["transform"][attr];
		if(typeof val == "undefined"){
			val = 0;
			element["transform"][attr] = 0;
		}
		return parseFloat(val);
	} else {
		var str = "";
		element["transform"][attr] = val;
		for(var s in element["transform"])	 {
			switch(s){
				case 'skewX':
				case 'skewY':
				case 'skewZ':
				case 'rotate':
				case 'rotateX':
				case 'rotateY':
				case 'rotateZ':
					str += s+"("+element["transform"][s]+"deg) ";
					break;
				case 'translateX':
				case 'translateY':
				case 'translateZ':	
					str += s+"("+element["transform"][s]+"px) ";
					break;
				default:
					str += s+"("+element["transform"][s]/100+") ";
			}
		}
		element.style.MozTransform = element.style.msTransform  = element.style.WebkitTransform = element.style.transform = str;
	}
}
function getScrollTop(element) {
	return 'scrollTop' in element ? element.scrollTop : element.pageYOffset;
}
export default {
	clone(obj) {
		var objNeed;
	    if( obj instanceof Array ){
	        objNeed  = [];
	        var len = obj.length;
	        for( let i=0;i < len;i++ ){
	            objNeed[i] = this.clone( obj[i] );
	        }
	        return objNeed;
	    }else if( obj instanceof Object ){
	        objNeed = {};
	        for( let attr in obj ){
	            objNeed[attr] = this.clone( obj[attr] );
	        }
	        return objNeed;
	    }else {
	        return obj;
	    }
	},
	setTransform,
	mScroll,
	css,
	MTween(el, target, time, type, callBack){
		var t = 0;
		var b = {};
		var c = {};
		var d = time / 20;
		for(var s in target){ 
			b[s] = css(el, s); 
			c[s] = target[s] - b[s];
		}
		clearInterval(el.timer); 
		el.timer = setInterval(
			function(){
				t++;
				if(t>=d){
					clearInterval(el.timer);
					callBack&&callBack.call(el);
				}
				for(var s in b){
					var val = (Tween[type](t,b[s],c[s],d)).toFixed(2);
					css(el, s, val);
				}
			},
			20
		);
	},
	MTouch,
	getDistance,
	getAngle,
	MSetGesture,
	getScrollTop
}