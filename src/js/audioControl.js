(function($,root){
    function AudioMessage(src){
        this.audio = new Audio();
        this.src = src;
        this.status = 'pause';
    }
    AudioMessage.prototype = {
        play:function(){
            this.audio.play();
            this.status = 'play';
        },
        pause:function(){
            this.audio.pause();
            this.status = 'pause';
        },
        getAudio:function(){
            this.audio.src = this.src;
            this.audio.load();
        },
        playTo:function(time){
            this.audio.currentTime = time;
            this.play();
        }
    }
    root.AudioMessage = AudioMessage;
})(window.Zepto,window.player || (window.player = {}))
