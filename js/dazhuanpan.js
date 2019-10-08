// 格式化时间
Date.prototype.format = function(fmt) { 
    var o = { 
       "M+" : this.getMonth()+1,                 //月份 
       "d+" : this.getDate(),                    //日 
       "h+" : this.getHours(),                   //小时 
       "m+" : this.getMinutes(),                 //分 
       "s+" : this.getSeconds(),                 //秒 
       "q+" : Math.floor((this.getMonth()+3)/3), //季度 
       "S"  : this.getMilliseconds()             //毫秒 
   }; 
   if(/(y+)/.test(fmt)) {
           fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
   }
    for(var k in o) {
       if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
   return fmt; 
}   
$(document).ready(
    $('.cishu').text(Math.floor((parseInt($('.jifenzhi').text())/30)))
)
var flag = true;
// 点击按钮大转盘开始抽奖
$(".zhizhen").click(function(e){
    if(flag){
        console.log("开始抽奖");
    console.log($('.jifenzhi').text());
    if(parseInt($('.jifenzhi').text())>=30){
        $('.jifenzhi').text(parseInt($('.jifenzhi').text())-30);
      $('.cishu').text(parseInt($('.cishu').text())-1);
    var ranNum = Math.floor(Math.random()*7) //0-6之间的随机数
    var num = ranNum*60+360*5; //求得随机的旋转度数 
    $(".zhuanpan1").css('transform', 'rotate(' + num + 'deg)');
    $(".zhuanpan1").css('transition',"3s");
    //设定旋转变换3秒后执行下面的提示  
    setTimeout(function() {  
        var myDate = new Date();    
        switch(ranNum){
            case 0:
            case 3:    
            case 6:
            // alert('50积分');  
            $('.jifenzhi').text(parseInt($('.jifenzhi').text())+50);
            $('.cishu').text(Math.floor((parseInt($('.jifenzhi').text()))/30));
            $('.dati_p2').text("获得官微50积分");
            $('.dati_box').css("display","block");
            $('.jilukuang ul').append(`<li><span>李磊</span><span>获得官微50积分</span><span>${myDate.format("yyyy-MM-dd hh:mm:ss")}</span></li>`);
            $("#footer_box").append(` <div class="footer1">
                                     <img src="/images/hongtan.png" alt="" class="footer_jiu">
                                    <span>恭喜酒鬼君获得</span> 
                                    <span class="footer_jifen">50积分</span>
                                    <span class="footer_time">1分钟</span>
                                    </div>`)
            break;
            case 1:
            case 4:
            // alert('20积分');
            $('.jifenzhi').text(parseInt($('.jifenzhi').text())+20);
            $('.cishu').text( Math.floor((parseInt($('.jifenzhi').text()))/30));
            $('.dati_p2').text("获得官微20积分");
            $('.dati_box').css("display","block");
            $('.jilukuang ul').append(`<li><span>李磊</span><span>获得官微20积分</span><span>${myDate.format("yyyy-MM-dd hh:mm:ss")}</span></li>`);
            $("#footer_box").append(` <div class="footer1">
                                        <img src="/images/hongtan.png" alt="" class="footer_jiu">
                                        <span>恭喜酒鬼君获得</span> 
                                        <span class="footer_jifen">20积分</span>
                                        <span class="footer_time">1分钟</span>
                                        </div>`)
            break;
            case 2:
            case 5:
            // alert('微信红包');
            $('.hongbao_box').css("display","block");
            $('.jilukuang ul').append(`<li><span>李磊</span><span>获得微信红包</span><span>${myDate.format("yyyy-MM-dd hh:mm:ss")}</span></li>`);
            $("#footer_box").append(` <div class="footer1">
                                        <img src="/images/hongtan.png" alt="" class="footer_jiu">
                                        <span>恭喜酒鬼君获得</span> 
                                        <span class="footer_jifen">获得微信红包</span>
                                        <span class="footer_time">1分钟</span>
           </div>`)
            break;
        }
        $(".zhuanpan1").css('transform', 'rotate(' + 0 + 'deg)');
        $(".zhuanpan1").css('transition',"0s");
    },3800) 
    setTimeout(function(){
        flag=true;
    },3800)
    flag = false;
    }else{
        alert("对不起积分不够");
    }
    
}
    }
    );
//文字轮播

var area =document.getElementById('box');
var con1 = document.getElementById('footer_box');
var con2 = document.getElementById('footer_box1');
con2.innerHTML=con1.innerHTML;
function scrollUp(){
if(area.scrollTop>=con1.offsetHeight){
    area.scrollTop=0;
}else{
    area.scrollTop++
}
}                
var time = 50;
var mytimer=setInterval(scrollUp,time);
console.log(area)
area.onmouseover=function(){
    console.log("456")
    clearInterval(mytimer);
}
area.οnmοuseοut=function(){
    console.log("123")
    mytimer=setInterval(scrollUp,time);
}

function zailaiFunc(){
    $('.hongbao_box').css("display","none");
    $('.dati_box').css("display","none");
}
// 记录弹框
function jiluFunc(){
    $('.jilukuang').css("display","block");

}
$(document).on('mousedown',function(e){
    if(!$(e.target).is($('.jilukuang')) && $(e.target).parent('.jilukuang').length === 0){
    $('.jilukuang').css('display','none');
    }
});