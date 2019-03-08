var path = require('path');
    (function($,root){
        function ronderImg(src){
            var img = new Image();
            // src = "../source/song_1.jpg"
            // src = require('src');
            img.src = '..' + src;
            img.onload = function(){
                // $('body').css('background-image','url('+src+")");
                $('.header img').attr('src',src);
                root.blurImg(img,$('body'));
            }  

        }
        function runderInfo(data){
           let micName = `<div class="music-name">
                <h2 class='name'>${data.song}</h2>
                <h4>${data.singer}</h4>
                <h4>${data.album}</h4>
            </div>`;
            $('article').html('').append(micName);
        }
        function runderIsLike(data){
            if(data.isLike){
                $('.but').find('li').eq(0).addClass('icon-like-solid');
            }else{
                $('.but').find('li').eq(0).removeClass('icon-like-solid');
            }   
        }
        function rander(index){
            ronderImg(index.image);
            runderInfo(index);
            runderIsLike(index);
        }
        root.rander = rander;
        // window.ronderImg = ronderImg;
        // window.runderInfo = runderInfo;
        // window.runderIsLike = runderIsLike;
    })(window.Zepto,window.player || (window.player = {}))



