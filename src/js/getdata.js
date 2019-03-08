var root = window.player,
    nowIndex = 0,
    len,
    dataList, //ajax data保存到全局
    audio,
    status, //状态 play or pause; 
    deg = 0,
    rootate, //iframanimation  名称  解除时候用
    AudioMessage = root.AudioMessage,
    controlIndex = root.ControlIndex,
    Process = root.Process,
    endtime; //进度条后面时间显示  //ss:mm

//初始化
function getData(url) {
    $.ajax({
        type: 'GET',
        url: url,
        success: function (data) {
            // var likeList;
            dataList = data;
            len = data.length;
            root.playList(data);
            // likeList = data.filter(ele => {
            //     if (ele.isLike) {
            //         return 'ture'
            //     }
            // });
            controlIndex = new controlIndex(len);
            audio = new AudioMessage('..' + dataList[nowIndex].audio);
            endtime = new Process(dataList[nowIndex].duration);
            status = audio.status;
            audio.getAudio();
            root.rander(data[nowIndex]);
            
        },
        error: function () {
            console.log('error')
        }
    })
}
//播放按钮 设置
$('.but').find('li').eq(2).bind('touchstart', function (e) {
    e.preventDefault();
    $(this).toggleClass('icon-pause');
    if (status == 'pause') {
        audio.play();
        root.start();
        rotated();
        status = 'play';
    } else {
        audio.pause();
        root.stop();
        cancelAnimationFrame(rootate);
        status = 'pause';


    }
})
window.requestAnimationFrame = (function () {
    return (window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60)
        })
}());

// requestAnimationFrame方法封装

function rotated() {
    cancelAnimationFrame(rootate);
    var playtime;
    if (!playtime) {
        playtime = new Date().getTime();
    }
    if (playtime == endtime) {

    }
    rootate = requestAnimationFrame(function () {
        rotated();
    })
    deg += 0.5;
    $('.img-box').css({
        'transform': `rotateZ(${deg}deg)`,
    })

}
//动画旋转

// rotated(requestAnimationFrame)
//按钮事件
$('.but').on('touchstart', function (e) {
    if (e.target.className == 'icon-like') {
        $('.but').find('li').eq(0).addClass('icon-like-solid');
        dataList.forEach(ele => {
            if (ele.song == $('.name').html()) {
                ele.isLike = true;
            }
        }) //爱心按钮 
    } else if (e.target.className == 'icon-like icon-like-solid') {
        $('.but').find('li').eq(0).removeClass('icon-like-solid');
        dataList.forEach(ele => {
            if (ele.song == $('.name').html()) {
                ele.isLike = false;
            }
        }) //爱心按钮 
    } else if (e.target.className == 'icon-list') {
        $('.play-list').css('display','block');

    } else if (e.target.className == 'icon-prev') {
        nowIndex = controlIndex.prev();
        root.rander((dataList[nowIndex]))
        endtime = new Process(dataList[nowIndex].duration);
        playchange()
    }
})
$('.icon-next').on('touchstart', function (e) {
    iconNext();

})

function iconNext() { //播放下一首函数
    nowIndex = controlIndex.next();
    root.rander((dataList[nowIndex]));
    endtime = new Process(dataList[nowIndex].duration);
    playchange();
}

function moveLine() {
    var maxW = $('.line-wap').offset().width;
    var len = 0;
    var startX = $('.dot').offset().left;
    var percent;

    function move(e) {
        var cliX = e.changedTouches[0].clientX;
        len = len < 0 ? 0 : len;
        len = len >= maxW ? maxW : len;
        len = cliX - startX;
        percent = len / maxW;
        percent = len / maxW;
        root.upData(percent);
    }

    function moveup(e) {
        var upTime = new Date().getTime();
        if (upTime - downTime > 100) {
            var time = dataList[nowIndex].duration;
            audio.playTo(percent * time);
            root.start(percent);
            rotated();
            status = 'play';
            $('.but').find('li').eq(2).addClass('icon-pause');
            if (Math.ceil(percent * 100) / 100 >= 1) {
                root.upData(0);
            }
        }
    }
    $('.dot').on('touchstart', function (e) {
        downTime = new Date().getTime();
        $(this).on('touchmove', move);
        $('.line-wap').on('touchend', moveup);
    })

}

function playchange() { //切歌

    audio.pause();
    $('.img-box').css({
        'transform': `rotateZ(0deg)`,
    })

    cancelAnimationFrame(rootate);

    audio = new AudioMessage('..' + dataList[nowIndex].audio);

    audio.getAudio();
    if (status == 'play') {
        audio.play();
        rotated()
        root.start();
    } else {
        audio.pause();
        root.stop();
        cancelAnimationFrame(rootate);
    }
}
function playListClick(){
    $('.play-list').on('touchstart',function(e){
        nowIndex = $(e.target).attr('data');
        root.rander((dataList[nowIndex]));
        endtime = new Process(dataList[nowIndex].duration);
        status = 'play';
        playchange();
        $(this).css('display','none')
    });
}
$('.header').on('touchstart',function(e){
    $('.play-list').css('display','none')
})
root.iconNext = iconNext;
root.playchange = playchange;
getData('../mock/data.json')
playListClick();
moveLine();