window.View = function (selector) {
    if(selector.length === 1){
        return document.querySelector(selector)
    }else{
        return document.querySelectorAll(selector)
    }

}