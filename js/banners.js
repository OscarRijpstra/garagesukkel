const banners = document.getElementById('banners');

let currentbanner = 0;

function newBanner(){
    banners.children[currentbanner].classList.remove('new');
    banners.children[currentbanner].classList.add('old');
    banners.children[currentbanner + 1 >= banners.children.length ? 0 : currentbanner + 1].classList.add('new');
    
    banners.children[currentbanner].addEventListener('transitionend', removeEvent);

    function removeEvent(){
        banners.children[currentbanner].removeEventListener('transitionend', removeEvent)
        banners.children[currentbanner].classList.remove('old');
        currentbanner + 1 >= banners.children.length ? currentbanner = 0 : currentbanner++;
    }
}

setInterval(newBanner, 3000);