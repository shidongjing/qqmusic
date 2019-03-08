import { Transform } from "stream";
//
(function ($, root) {
    var duration = 0,
        startTime = 0,
        percent,
        lastPer = 0,
        iframeId,
        stopTime = 0;
    function Process(dura) {
        upData(0);
        lastPer = 0;
        this.m = Math.floor(dura / 60);
        this.s = dura - this.m * 60;
        if(this.s < 10){
            this.s = '0'+ this.s;   
        }
        if(this.m < 10){
            this.m = '0' + this.m
        }
        this.dura = `${this.m}:${this.s}`;
        $('.endstime').html(this.dura);
        duration = dura;
        return dura
    }
    function start(precentage) {
        lastPer = precentage === undefined ? lastPer : precentage; 
        startTime = new Date().getTime();
        function iframe() {
            cancelAnimationFrame(iframeId);
            var curTime = new Date().getTime();
            // console.log(duration)
            // console.log(lastPer)
            // console.log((curTime - startTime)/(duration * 1000))
            percent = lastPer + (curTime - startTime)/(duration * 1000); 
            if(percent < 1){
                iframeId = requestAnimationFrame(iframe)
            }else{
                cancelAnimationFrame(iframeId);
                setTimeout(() => {
                    $(document.body).find(".icon-next").trigger("touchstart");
                }, 1000);
            }
        }
        iframe()
    }
    
    function stop(next) {
        cancelAnimationFrame(iframeId);
        stopTime = new Date().getTime();
        lastPer = (stopTime - startTime)/(duration * 1000) + lastPer;
      
    }

    function upData(percent) {

        var startTime = Math.floor(duration * percent);
        var m = Math.floor(startTime / 60);
        var s = startTime - m * 60;
        if(s < 10){
            s = '0'+ s;   
        }
        if(m < 10){
            m = '0' + m
        }
        startTime = `${m}:${s}`
        $('.startTime').html(startTime);
        var perx = Math.ceil((percent -1)*100) + '%';
        if(perx == '100%'){
            nowIndex = controlIndex.next()
            root.rander((dataList[nowIndex]))
            playchange();
            endtime = new Process(dataList[nowIndex].duration);  
        }
        $('.line-insert').css('transform',`translateX(${perx})`);
        
    }
    Process.prototype = {
        clear: function () {
  
        }
    }
    root.Process = Process;
    root.start = start;
    root.stop = stop;
    root.upData = upData;
}(window.Zepto, window.player || (window.player = {})))