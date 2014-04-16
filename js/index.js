$(function(){
	//对jQuery扩展了两个函数方便自己使用
	$.fn.extend({
		//scroll 将body的scrollTop置为响应元素$("this")的top
		gettop:function(speed){
			var $a=$("body,html"),b=$(this).offset().top;
			speed=speed||500;
			return $a.animate({scrollTop:b},speed)
		},
		//mousewheel响应鼠标滚轮事件
		mousewheel: function(b) {
            return this.each(function() {
                function c(a) {
                    a = a || window.event, "detail" in a && (a.wheelDelta = -a.detail), "cancelBubble" in a && (a.stopPropagation = function() {
                        a.cancelBubble = !0
                    }), "returnValue" in a && (a.preventDefault = function() {
                        a.returnValue = !1
                    }), b.call(d, a)
                }
                var d = ($(this), this);
                window.addEventListener ? (this.addEventListener("DOMMouseScroll", c, !1), this.addEventListener("mousewheel", c, !1)) : this.attachEvent("onmousewheel", c)
    			})
        	}
    })

	var $navA = $(".nav a"),$header=$(".header"),$overlay=$('.overlay');
	var windowheight=$(window).height();
	$overlay.css('height',windowheight);
	//点击进入首页
	$(".loging").on("click",function(a){
		$overlay.animate({opacity:"0",display:"none"},1000)
			    .hide(1000);
		$("body").css('overflow','auto');
		a.preventDefault();
	})
	var navScroll=[];
	$navA.each(function(){
		var top=$($(this).attr("title")).offset().top;
		navScroll.push(top);
	})
	$(window).scroll(function(){
		var nowTop=$(window).scrollTop();
		var length=navScroll.length;
		var index;
		if(nowTop+60 > navScroll[length-1]){
                index = length;
        }else{
             	for(var i=0;i<length;i++){
                    if(nowTop+60 <= navScroll[i]){
                        index = i;
                        break;
                        }
                    }
        }
        if ($("html, body").is(":animated"))
                return false;
        $navA.removeClass("active");
        $navA.eq(index-1).addClass("active");
	})

    //窗口大小变化或者转屏后重新录入offsetTop
	var resizeTimer = null;

	$(window).on("resize", function() {
        if (resizeTimer) {
            clearTimeout(resizeTimer)
        }
        resizeTimer = setTimeout(function(){
            navScroll=[];
			$navA.each(function(){
				var top=$($(this).attr("title")).offset().top;
				navScroll.push(top);
			})
        }, 400);     
    })
})
