const sliderContainer = document.getElementsByClassName('slider'),
sliders = [{name: 'IMG_4533h7oaff', alt: 'voorkant Garage Sukkel'}, {name: 'IMG_4526shkxaj', alt: ''}],
imgExtentions = ['webp', 'wdp' ,'jp2', 'jpg'],
desktopResolutions = [1000, 1200, 1400, 1600, 1800, 2000],
mobileResolutions = [{width: 300, height: 200}, {width: 500, height: 400}, {width: 700, height: 600}, {width:900, height: 800}],
imageLocation = {baseUrl: 'https://res.cloudinary.com/dyubvu51u/image/upload/', cloudName: 'v1562311977'};

let currentslider = 0;

addSliders(sliderContainer[0]);

const renderedSliders = Array.from(document.getElementsByClassName('slider__item'));

setInterval(nextSlider, 6 * 1000);

function addSliders(container) {
    sliders.map((slider, i) => {
        const picture = document.createElement('picture');
        container.appendChild(picture);

        imgExtentions.map((extention) => {
            const sourceDesktop = document.createElement('source');
            picture.appendChild(sourceDesktop);
            sourceDesktop.media = '(min-width: 930px)';
            sourceDesktop.type = 'image/' + extention;

            desktopResolutions.map((resolution, k) => {
                sourceDesktop.srcset += `${imageLocation.baseUrl}c_fill,q_80,w_${resolution},h_800/${imageLocation.cloudName}/${slider.name}.${extention} ${resolution}w`;
                if (k < desktopResolutions.length - 1) sourceDesktop.srcset += ',';
            })

            const sourceMobile = document.createElement('source');
            picture.appendChild(sourceMobile);
            sourceMobile.media = '(max-width: 930px)';
            sourceMobile.type = 'image/' + extention;

            mobileResolutions.map((resolution, k) => {
                sourceMobile.srcset += `${imageLocation.baseUrl}c_fill,q_80,w_${resolution.width},h_${resolution.height}/${imageLocation.cloudName}/${slider.name}.${extention} ${resolution.width}w`;
                if (k < mobileResolutions.length - 1) sourceMobile.srcset += ',';
            })
        })

        const jpgFallback = document.createElement('img');
        picture.appendChild(jpgFallback);
        jpgFallback.src = `${imageLocation.baseUrl}'c_fill,w_1080/${imageLocation.cloudName}/${slider.name}.jpg`;
        jpgFallback.alt = slider.alt;
        jpgFallback.classList.add('slider__item');
        if (i == 0) jpgFallback.classList.add('new');
    })
}

function nextSlider(){
    renderedSliders[currentslider].classList.remove('new');
    renderedSliders[currentslider].classList.add('old');

    const tempSlider = renderedSliders[currentslider];

    function isTransitioned() {
        tempSlider.classList.remove('old');
        tempSlider.removeEventListener('transitionend', isTransitioned);
    }
    
    tempSlider.addEventListener('transitionend', isTransitioned);
    
    currentslider++;
    if (currentslider >= renderedSliders.length) currentslider = 0;
    
    renderedSliders[currentslider].classList.add('new');

    console.log(1);
}