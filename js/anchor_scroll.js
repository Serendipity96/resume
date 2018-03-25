!function () {
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
}.call();
