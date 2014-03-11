!function($){
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

}(jQuery)