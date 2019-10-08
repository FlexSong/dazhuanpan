var OS_IPHONE="iPhone",OS_IPOD="iPod",OS_IPAD="iPad",OS_ANDROID="Android",OS_WINDOWS_PHONE="Windows Phone",OS_BLACK_BERRY="BlackBerry",NONE="none",UNDEFINED="undefined";function LEvent(type){this.eventType=type;this._ll_preventDefault=false}var LGlobal=(function(){function LGlobal(){throw"LGlobal cannot be instantiated"}LGlobal.webAudio=true;LGlobal.childList=new Array();LGlobal.dragList=new Array();LGlobal.window=window;(function(n){LGlobal.isOldFirefox=(function(un){var i=un.toLowerCase().indexOf("firefox");if(i<0){return false}var v=un.substring(i+8,un.length);return parseFloat(v)<39})(n);if(n.indexOf(OS_IPHONE)>0){LGlobal.os=OS_IPHONE;LGlobal.canTouch=true;LGlobal.ios=true}else{if(n.indexOf(OS_IPOD)>0){LGlobal.os=OS_IPOD;LGlobal.canTouch=true;LGlobal.ios=true}else{if(n.indexOf(OS_IPAD)>0){LGlobal.os=OS_IPAD;LGlobal.ios=true;LGlobal.canTouch=true}else{if(n.indexOf(OS_ANDROID)>0){LGlobal.os=OS_ANDROID;LGlobal.canTouch=true;LGlobal.android=true;var i=n.indexOf(OS_ANDROID);if(parseInt(n.substr(i+8,1))>3){LGlobal.android_new=true}}else{if(n.indexOf(OS_WINDOWS_PHONE)>0){LGlobal.os=OS_WINDOWS_PHONE;LGlobal.canTouch=true}else{if(n.indexOf(OS_BLACK_BERRY)>0){LGlobal.os=OS_BLACK_BERRY;LGlobal.canTouch=true}}}}}}LGlobal.mobile=LGlobal.canTouch})(navigator.userAgent);LGlobal.setDebug=function(v){LGlobal.traceDebug=v};return LGlobal})();function init(s,c,w,h,f,t){LGlobal.speed=s}var LInit=init;function base(d,b,a){var p=null,o=d.constructor.prototype,h={};if(d.constructor.name=="Object"){console.warn("When you use the extends. You must make a method like 'XX.prototype.xxx=function(){}'. but not 'XX.prototype={xxx:function(){}}'.")}if(typeof d.__ll__parent__==UNDEFINED){d.__ll__parent__=[];d.__ll__parent__=[]}d.__ll__parent__.push(b.prototype);for(p in o){h[p]=1}for(p in b.prototype){if(!h[p]){o[p]=b.prototype[p]}}if(o.toString==Object.prototype.toString){o.toString=LObject.prototype.toString}b.apply(d,a)}var LExtends=base;function getTimer(){return(new Date()).getTime()-LGlobal.startTimer}var LObject=(function(){function LObject(){this.type="LObject";this.objectIndex=++LGlobal.objectIndex;this.objectindex=this.objectIndex}return LObject})();var LEventDispatcher=(function(){function LEventDispatcher(){var s=this;LExtends(s,LObject,[]);s._eventList=new Array()}var p={addEventListener:function(type,listener){this._eventList.push({listener:listener,type:type})},removeEventListener:function(type,listener){var s=this,i,length;length=s._eventList.length;for(i=0;i<length;i++){if(!s._eventList[i]){continue}if(type==s._eventList[i].type&&(!listener||s._eventList[i].listener==listener)){s._eventList.splice(i,1);return}}},removeAllEventListener:function(){this._eventList=[]},dispatchEvent:function(event){return false},hasEventListener:function(type,listener){var s=this,i,length=s._eventList.length;for(i=0;i<length;i++){if(!s._eventList[i]){continue}if(type==s._eventList[i].type){if(typeof listener==UNDEFINED||listener==s._eventList[i].listener){return true}}}return false}};for(var k in p){LEventDispatcher.prototype[k]=p[k]}return LEventDispatcher})();var LWebAudio=(function(){function LWebAudio(){var s=this;LExtends(s,LEventDispatcher,[]);s.currentTime=0;s.currentStart=0;s.currentSave=0;s.length=0;s.loopStart=0;s.loopEnd=0;s.loopIndex=0;s.loopLength=1;s.playing=false;s.volume=1;LSound.Container.add(s)}LWebAudio.container=[];LWebAudio.containerCount=0;try{LWebAudio.audioTag=new Audio()}catch(e){console.warn("ReferenceError:Can't find variable:Audio");LWebAudio.audioTag={canPlayType:function(){return false}}}LWebAudio._context=null;var p={getWebAudio:function(){var data;if(LWebAudio.containerCount>0){data=LWebAudio.container.shift()}else{if(typeof AudioContext!==UNDEFINED){try{data=new AudioContext()}catch(e){LWebAudio.containerCount=LWebAudio.container.length;data=LWebAudio.container.shift()}}else{if(typeof webkitAudioContext!==UNDEFINED){try{data=new webkitAudioContext()}catch(e){LWebAudio.containerCount=LWebAudio.container.length;data=LWebAudio.container.shift()}}else{throw"AudioContext not supported.:("}}}if(!data.createGainNode){data.createGainNode=data.createGain}LWebAudio.container.push(data);return data},onload:function(data){var s=this;if(Object.prototype.toString.apply(data)!=="[object AudioBuffer]"){s.load(data);return}if(!s.data){s.data=s.getWebAudio()}s.buffer=data;s.length=s.buffer.duration;var e=new LEvent(LEvent.COMPLETE);e.currentTarget=s;e.target=s.buffer;s.dispatchEvent(e)},_onended:function(){var s=this;s.dispatchEvent(LEvent.SOUND_COMPLETE);s.close();if(++s.loopIndex<s.loopLength){s.play(s.currentStart,undefined,s.currentTimeTo)}},load:function(u){var s=this;if(typeof u!=="string"){if(Object.prototype.toString.apply(u)=="[object AudioBuffer]"){s.onload(u)}else{if(Object.prototype.toString.apply(u)=="[object ArrayBuffer]"){if(!s.data){s.data=s.getWebAudio()}s.data.decodeAudioData(u,s.onload.bind(s),function(error){throw"AudioContext decodeAudioData error:"+error.toString()})}}return}var a,b,c,k,d,q={"mov":["quicktime"],"3gp":["3gpp"],"midi":["midi"],"mid":["midi"],"ogv":["ogg"],"m4a":["acc"],"mp3":["mpeg"],"wav":["wav","x-wav","wave"],"wave":["wav","x-wav","wave"],"aac":["mp4","aac"]};
a=u.split(",");for(k=0;k<a.length;k++){b=a[k].split(".");d=b[b.length-1];if(q[d]){d=q[d]}else{d=[d]}c=d.some(function(element,index,array){return LWebAudio.audioTag.canPlayType(s._type+"/"+element)});if(c){LAjax.responseType=LAjax.ARRAY_BUFFER;LAjax.progress=function(e){var event=new LEvent(LEvent.PROGRESS);event.currentTarget=s;event.target=e.currentTarget;event.loaded=e.loaded;event.total=e.total;event.responseURL=e.responseURL;s.dispatchEvent(event)};LAjax.get(a[k],{},s.onload.bind(s),function(request){var event=new LEvent(LEvent.ERROR);event.currentTarget=s;event.target=request;event.responseURL=request.responseURL;s.dispatchEvent(event)});return}else{console.warn("Not support "+b[b.length-1]+":"+a[k]);var e=new LEvent(LEvent.COMPLETE);e.currentTarget=e.target=s;s.dispatchEvent(e)}}},getCurrentTime:function(){var s=this;if(s.playing){return s.data.currentTime-s.currentSave+s.currentTime}else{return s.currentSave}},setVolume:function(v){var s=this;s.volume=v;if(s.playing){s.volumeNode.gain.value=v}},getVolume:function(){return this.volume},play:function(c,l,to){var s=this;if(s.length==0){return}if(typeof l!==UNDEFINED){s.loopIndex=0;s.loopLength=l}if(typeof c!==UNDEFINED){s.currentTime=c;s.currentStart=c}if(typeof to!==UNDEFINED){s.currentTimeTo=to>s.length?s.length:to}else{s.currentTimeTo=s.length}s.data.loop=false;s.playing=true;if(s.timeout){clearTimeout(s.timeout);delete s.timeout}s.timeout=setTimeout(s._onended.bind(s),(s.currentTimeTo-s.currentTime)*1000);s.bufferSource=s.data.createBufferSource();s.bufferSource.buffer=s.buffer;s.volumeNode=s.data.createGainNode();s.volumeNode.gain.value=s.volume;s.volumeNode.connect(s.data.destination);s.bufferSource.connect(s.volumeNode);s.currentSave=s.data.currentTime;if(s.bufferSource.start){s.bufferSource.start(0,s.currentTime,s.length-s.currentTime)}else{s.bufferSource.noteGrainOn(0,s.currentTime,s.length-s.currentTime)}},playSegment:function(c,seg,l){this.playTo(c,c+seg,l)},playTo:function(c,to,l){this.play(c,l,to)},stop:function(){var s=this;if(!s.playing){return}if(s.timeout){clearTimeout(s.timeout);delete s.timeout}if(s.bufferSource.stop){s.bufferSource.stop(0)}else{s.bufferSource.noteOff(0)}s.currentSave=s.getCurrentTime();s.currentTime=s.currentSave;s.playing=false},close:function(){var s=this;if(!s.playing){return}if(s.timeout){clearTimeout(s.timeout);delete s.timeout}if(s.bufferSource.stop){s.bufferSource.stop(0)}else{s.bufferSource.noteOff(0)}s.playing=false;s.currentTime=0;s.currentSave=0},ll_check:function(){var s=this;if(!s.playing){return}if(s.currentTimeTo<s.data.currentTime-s.currentSave+LSound.Container.time*0.001){s._onended()}},die:function(){LSound.Container.remove(this)}};for(var k in p){LWebAudio.prototype[k]=p[k]}return LWebAudio})();var LSound=(function(){function LSound(u){var s=this;s.type="LSound";s._type="audio";if(LSound.webAudioEnabled&&LGlobal.webAudio){LExtends(s,LWebAudio,[])}else{LExtends(s,LMedia,[]);try{s.data=new Audio()}catch(e){console.warn("ReferenceError:Can't find variable:Audio");s.data={}}s.data.loop=false;s.data.autoplay=false}if(u){s.load(u)}}LSound.TYPE_SOUND="sound";LSound.webAudioEnabled=false;var protocol=location.protocol;if(protocol=="http:"||protocol=="https:"){if(typeof AudioContext!==UNDEFINED){try{LWebAudio._context=new AudioContext()}catch(e){}}else{if(typeof webkitAudioContext!==UNDEFINED){try{LWebAudio._context=new webkitAudioContext()}catch(e){}}}if(LWebAudio._context){LWebAudio.container.push(LWebAudio._context);LSound.webAudioEnabled=true}}LSound.Container={ll_save:0,time:0,list:[],ll_show:function(){var c=LSound.Container;var t=(new Date()).getTime();c.time=t-(c.ll_save?c.ll_save:t);c.ll_save=t;var l=c.list;for(var i=l.length-1;i>=0;i--){if(l[i]){l[i].ll_check()}}},add:function(obj){if(LSound.Container.list.indexOf(obj)>=0){return}LSound.Container.list.push(obj)},remove:function(obj){var l=LSound.Container.list;for(var i=l.length-1;i>=0;i--){if(l[i].objectIndex==obj.objectIndex){l.splice(i,1);break}}},stopOther:function(obj){var l=LSound.Container.list;for(var i=l.length-1;i>=0;i--){if(l[i].objectIndex!=obj.objectIndex){l[i].stop()}}}};LGlobal.childList.push(LSound.Container);return LSound})();var LAjax=(function(){function LAjax(){this.responseType=null;window.BlobBuilder=window.BlobBuilder||window.WebKitBlobBuilder||window.MozBlobBuilder||window.MSBlobBuilder;this.canUseBlob=window.Blob||window.BlobBuilder;var protocol=location.protocol;this.local=!(protocol=="http:"||protocol=="https:")}LAjax.prototype={TEXT:"text",JSON:"json",ARRAY_BUFFER:"arraybuffer",BLOB:"blob",get:function(url,data,oncomplete,onerror){this.getRequest("GET",url,data,oncomplete,onerror)},post:function(url,data,oncomplete,onerror){this.getRequest("POST",url,data,oncomplete,onerror)},getRequest:function(t,url,d,oncomplete,err){var s=this,k,data="",a="";s.err=err;var ajax=s.getHttp();if(!ajax){return}if(d){for(k in d){data+=(a+k+"="+d[k]);a="&"}}if(t.toLowerCase()=="get"&&data.length>0){url+=((url.indexOf("?")>=0?"&":"?")+data);
data=null}ajax.onerror=function(e){if(err){err(e);err=null}};var progress=s.progress;s.progress=null;ajax.addEventListener("progress",function(e){if(e.currentTarget.status==404){if(err){err(e.currentTarget);err=null}}else{if(e.currentTarget.status==200){if(progress){progress(e)}}}},false);ajax.open(t,url,true);if(s.responseType){if(s.responseType==s.JSON){try{ajax.responseType=s.responseType}catch(e){ajax.responseType=s.TEXT;ajax._responseType="json"}}else{ajax.responseType=s.responseType}s.responseType=s.TEXT}ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");ajax.onreadystatechange=function(e){var request=e.currentTarget;if(request.readyState==4){if(request.status>=200&&request.status<300||request.status===304){if(oncomplete){if(request._responseType==s.JSON){request._responseType=s.TEXT;oncomplete(JSON.parse(request.responseText))}else{if(request.responseType==s.ARRAY_BUFFER||request.responseType==s.BLOB||request.responseType==s.JSON){oncomplete(request.response)}else{if(request.responseText.length>0){oncomplete(request.responseText)}else{oncomplete(null)}}}}}else{if(err){err(request);err=null}}}};ajax.send(data)},getHttp:function(){if(typeof XMLHttpRequest!=UNDEFINED){return new XMLHttpRequest()}try{return new ActiveXObject("Msxml2.XMLHTTP")}catch(e){try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(e){if(!this.err){this.err(e)}}}return false}};return new LAjax()})();

$(function(){
document.body.addEventListener('touchmove', function (e) {
  e.preventDefault();
}, {passive: false}); 
$(document).on("visibilitychange", function(a) {
    var e = "hidden"in document ? "hidden" : "webkitHidden"in document ? "webkitHidden" : "mozHidden"in document ? "mozHidden" : null
    if(document[e]){
        SyAll(0);
    }else {
        SyAll(1);
    }
})
});


var musicKV = {};
var bSYin = true;
var syCache = {};
function iniSY(){
    for (var mu in musicArr){
        musicKV[mu] = new LSound();
        musicKV[mu].load(musicArr[mu]);
    }
}
function SyAll(n){
    if(n == 1){
        for (var k in syCache){
            if (!musicKV[k].playing){
                musicKV[k].play();
            }
        }
        syCache = {};
    }else {
        syCache = {};
        for (var k in musicKV){
            if (musicKV[k].playing){
                syCache[k] = k;
                musicKV[k].stop();
            }
        }
    }
}
function SYin(k,n){
    if (undefined===musicKV[k]){
        p(k+' 不存在');
        return;
    }
    if (undefined===n || n ==1){
        musicKV[k].play(0,1);
    }else if(n == 2){
        if (!musicKV[k].playing){
            musicKV[k].play(0, 100000);
        }
    }else if(n == 0){
        if (musicKV[k].playing){
            musicKV[k].stop();
        }
    }
}

var pww = window.innerWidth;
var pwh = window.innerHeight;
var jfen = 0, cfen = 0,sjian = 0,currtime = 0;
var c_jfen = 10, c_cfen = 0, c_sjian = 30, c_currtime = 0;

function ctc(n){
    if (2==n){
        $('.tc2').hide();
    }else {    
        $('.tc').hide();
    }
}
function tc(s,art){
    if (s == '活动说明' || s == '排行榜'){
        $('.tc2 .tcxx').hide();
        $('.tc2').show();
    }else {    
        $('.tc .tcxx').hide();
        $('.tc').show();
    }
    $('.tcxx[s="'+s+'"]').show();
}

function now(n) {  //当前秒数
    if (undefined === n || n <= 0) {
        var d = new Date;
    } else {
        var d = new Date(n * 1000);
    }
    return Math.ceil(d.getTime() / 1000);
}
function now_m(n) {  //当前微秒
    if (undefined === n || n <= 0) {
        var d = new Date;
    } else {
        var d = new Date(n * 1000);
    }
    return d.getTime();
}