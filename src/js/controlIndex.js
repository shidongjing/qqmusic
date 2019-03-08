(function($,root){
    function ControlIndex(len){
        this.nowIndex = 0;
        this.len = len;
    }
    ControlIndex.prototype = {
        prev:function(){
            // if (this.nowIndex == 0) {
            //     this.nowIndex = this.len - 1;
            // } else {
            //     this.nowIndex--;
            // }
            // return this.nowIndex
            return this.getIndex(-1)
        },
        next:function(){
            // if (this.nowIndex == this.len - 1) {
            //     this.nowIndex = 0
            // } else {
            //     this.nowIndex++;
            // }
            // return this.nowIndex
            return this.getIndex(1)
        },
        getIndex:function(val){
            var index = this.nowIndex;
            var len = this.len;
            var curIndex = (index + val + len) % len;
            this.nowIndex = curIndex;
            return curIndex;
        }
    }
    root.ControlIndex = ControlIndex;
}(window.Zepto,window.player || (window.player = {})))