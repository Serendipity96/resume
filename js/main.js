//添加offset类
var specialTags = document.querySelectorAll('[data-x]');
for (var i = 0; i < specialTags.length; i++) {
    specialTags[i].classList.add('offset');
}

findClosest();
//menu slide
window.onscroll = function () {
    if (window.scrollY > 0) {
        topNavBar.classList.add('sticky');
    } else {
        topNavBar.classList.remove('sticky');
    }
    findClosest();
};


function findClosest() {
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

//判断什么时候展示子菜单
var liTags = document.querySelectorAll('nav.menu ul li');
for (var i = 0; i < liTags.length; i++) {
    liTags[i].onmouseenter = function (ev) {
        ev.currentTarget.classList.add('active');
    };
    liTags[i].onmouseleave = function (ev) {
        ev.currentTarget.classList.remove('active');
    };
}

//锚点滚动动画
var aTags = document.querySelectorAll('nav.menu ul li a');

function animate(time) {
    requestAnimationFrame(animate);
    TWEEN.update(time);
}

requestAnimationFrame(animate);

for (var i = 0; i < aTags.length; i++) {
    aTags[i].onclick = function (ev) {
        ev.preventDefault();//阻止默认事件
        var a = ev.currentTarget;//获取a标签
        // console.log(a.href);a.href有http协议
        var href = a.getAttribute('href');//用户写什么，就获取什么
        var element = document.querySelector(href);
        var top = element.offsetTop;//获取元素距离顶部的距离

        var currentTop = window.scrollY;
        var targetTop = top - 100;
        var coords = {y: currentTop};
        var tween = new TWEEN.Tween(coords)
            .to({y: targetTop}, 1000)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .onUpdate(function () {
                window.scrollTo(0, coords.y);
            })
            .start();
    }
}