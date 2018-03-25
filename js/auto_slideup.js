!function () {
    //添加offset类
    var specialTags = document.querySelectorAll('[data-x]');
    for (var i = 0; i < specialTags.length; i++) {
        specialTags[i].classList.add('offset');
    }
    findClosestAndRemoveOffset();

    window.onscroll = function () {
        if (window.scrollY > 0) {
            topNavBar.classList.add('sticky');
            console.log(1)
        } else {
            topNavBar.classList.remove('sticky');
        }
        findClosestAndRemoveOffset();
    };
    function findClosestAndRemoveOffset() {
        //菜单栏高亮
        var specialTags = document.querySelectorAll('[data-x]');
        var minIndex = 0;//离窗口顶部最近的元素
        for (var i = 1; i < specialTags.length; i++) {
            if (Math.abs(specialTags[i].offsetTop - window.scrollY) <
                Math.abs(specialTags[minIndex].offsetTop - window.scrollY)
            ){
                minIndex = i;
            }
        }

        specialTags[minIndex].classList.remove('offset');
        var id = specialTags[minIndex].id;
        var a = document.querySelector('a[href="#' + id + '"]');
        var li = a.parentNode;
        var brothersAndMe = li.parentNode.children;
        for(var i=0;i<brothersAndMe.length;i++){
            brothersAndMe[i].classList.remove('highlight');
        }
        li.classList.add('highlight');
    }
}.call();
