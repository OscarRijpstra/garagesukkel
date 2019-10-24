const sliderContainer = document.getElementsByClassName('sliders');
const sliders = Array.from(document.getElementsByClassName('sliders__item'));
let currentslider = 0;

let slideInterval = setInterval(nextSlider, 6 * 1000);

window.addEventListener('blur', () => {
    clearInterval(slideInterval)
    slideInterval = null;
});

window.addEventListener('focus', () => {
    if (!slideInterval) slideInterval = setInterval(nextSlider, 6 * 1000)
});

window.focus();

function nextSlider(){
    sliders[currentslider].classList.remove('new');
    sliders[currentslider].classList.add('old');

    const tempSlider = sliders[currentslider];

    function isTransitioned() {
        tempSlider.classList.remove('old');
        tempSlider.removeEventListener('transitionend', isTransitioned);
    }
    
    tempSlider.addEventListener('transitionend', isTransitioned);
    
    currentslider++;
    if (currentslider >= sliders.length) currentslider = 0;
    
    sliders[currentslider].classList.add('new');
}