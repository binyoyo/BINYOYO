
$(function(){
	var $navA = $(".nav a");
	var navScroll=[];
	$navA.each(function(){
		var top=$($(this).attr("href")).offset().top;
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
	$navA.click(function(b){
		if ($("html, body").is(":animated"))
                return false;

		$navA.removeClass("active");
		var d = $(this), e = $(d.attr("href"));
		b.preventDefault();
		d.addClass("active");
		e.gettop(600);
		
		});
    
	$(window).on("resize", function() {
        $(".nav:visible").length && $navA.filter(".active").triggerHandler("click");

        navScroll=[];
		$navA.each(function(){
			var top=$($(this).attr("href")).offset().top;
			navScroll.push(top);
			})
        
        })
})