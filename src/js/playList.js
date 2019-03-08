(function($,root){
    function playList(dataList){
        var list = '';
        dataList.forEach(function(ele,index){
            list += `<li data = ${index}>${ele.song}</li>`
            console.log(list)

        })
        // console.log(list)
        $('.play-list ul').append(list);

    }
    
    root.playList = playList;
})(window.Zepto,window.player || (window.player = {}))