/*

Title:		jQMeter: a jQuery Progress Meter Plugin
Author:		Gerardo Larios
Version:	0.1.2
Website:	http://www.gerardolarios.com/plugins-and-tools/jqmeter
License: 	Dual licensed under the MIT and GPL licenses.

*/
!function(e)
{e.fn.extend({
    jQMeter:function(t){
        t&&"object"==typeof t&&(t=e.extend({},
            e.jQMeter.defaults,t)),
            this.each(function(){
                new e.jQMeter(this,t)})}}),
    e.jQMeter=function(t,r){
        if(goal=parseInt(r.goal.replace(/\D/g,"")),
        raised=parseInt(r.raised),
        width=r.width,height=r.height,bgColor=r.bgColor,barColor=r.barColor,meterOrientation=r.meterOrientation,animationSpeed=r.animationSpeed,counterSpeed=r.counterSpeed,displayTotal=r.displayTotal,total=raised/goal*100,total<=0&&(total=0),
        "vertical"==meterOrientation?(e(t).html('<div class="therm outer-therm vertical"><div class="therm inner-therm vertical"><img class="coinPgrs"  src="img/coins.png"></img><span class="skorAngka" style="display:none;">'+raised+'</span></div></div>'),
        e(t).children(".outer-therm").attr("style","width:"+width+";height:"+height+";background-color:"+bgColor+";margin-top:20px;margin-bottom:13px"),e(t).children(".outer-therm").children(".inner-therm").attr("style","background-color:"+barColor+";height:"+(total-(3.33))+"%;width:100%"),e(t).children(".outer-therm").children(".inner-therm").animate({height:total+"%"},animationSpeed)):(e(t).html('<div class="therm outer-therm"><div class="skor"><img class="coinPgrsAtas"  src="img/coins.png"></img><span style="padding:0;text-orientation:left;">'+raised+'</span></div><div class="therm inner-therm"></div></div>'),e(t).children(".outer-therm").attr("style","width:"+width+";height:"+height+";background-color:"+bgColor),
        e(t).children(".outer-therm").children(".inner-therm").attr("style","background-color:"+barColor+";height:"+height+";width:"+(total-(3.33))+"%"),e(t).children(".outer-therm").children(".inner-therm").animate({width:total+"%"},animationSpeed)),displayTotal){var i=parseInt(height),n=i/2-13+"px 10px";"horizontal"!=meterOrientation&&(n="2px 0"),e(t).children(".outer-therm").children(".inner-therm").children().show(),e(t).children(".outer-therm").children("span").css("padding",n),e({Counter:(raised-333)}).animate({Counter:e(t).children(".outer-therm").children().text()},{duration:counterSpeed,easing:"swing",step:function(){e(t).children(".outer-therm").children().children("span").text(Math.ceil(this.Counter)+"")}})}e(t).append("<style>.therm{height:30px;border-radius:5px;}.outer-therm{margin:0px 0;} span {color: #fff;display: inline-block;float: right;font-family: Trebuchet MS;font-size: 20px;font-weight: bold;}span{width:60%;text-align:left;}.vertical.outer-therm{position:relative;}.vertical.inner-therm{position:absolute;bottom:0;}</style>")},e.jQMeter.defaults={width:"100%",height:"50px",bgColor:"#444",barColor:"#bfd255",meterOrientation:"horizontal",animationSpeed:2e3,counterSpeed:2e3,displayTotal:!0}}(jQuery);
