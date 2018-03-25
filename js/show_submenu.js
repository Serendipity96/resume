!function () {
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
}.call();
