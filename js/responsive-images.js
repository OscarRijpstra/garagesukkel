const responsiveImages = Array.from(document.getElementsByClassName('responsive__img'));
const imageHost = 'https://res.cloudinary.com/dyubvu51u/image/upload/';
const cloudName = 'v1562311982';
const folder = 'Garage%20Sukkel';

responsiveImages.map(function (container) {
    const publicID = container.getAttribute('data-public-id');
    const type = container.getAttribute('data-type');
    const alt = container.getAttribute('data-alt') || '';
    const imgClass = container.getAttribute('data-class') || '';

    switch (type) {
        case 'slider':
            renderImage(container, publicID, alt, imgClass, 30, ['webp', 'wdp', 'jp2', 'jpg'], {
                mobile: [
                    [500, 500],
                    [600, 500],
                    [700, 500],
                    [800, 600],
                    [900, 700],
                    [1000, 800],
                    [1100, 900],
                    [1200, 1000]
                ],
                desktop: [
                    [1000, 700],
                    [1100, 700],
                    [1200, 700],
                    [1300, 700],
                    [1400, 700],
                    [1500, 700],
                    [1600, 700],
                    [1700, 700],
                    [1800, 700],
                    [1900, 700],
                    [2000, 700]
                ]
            });
            break;

        case 'vertical-rowimg':
            renderImage(container, publicID, alt, imgClass, 10, ['webp', 'wdp', 'jp2', 'jpg'], {
                mobile: [
                    [500, 700],
                    [600, 800],
                    [700, 900],
                    [800, 1000],
                    [900, 1100],
                    [1000, 1200],
                    [1100, 1300],
                    [1200, 1400]
                ],
                desktop: [
                    [500, 700],
                    [600, 800],
                    [700, 900],
                    [800, 1000],
                    [900, 1100]
                ]
            });
            break;

        case 'horizontal-rowimg-transparant':
            renderImage(container, publicID, alt, imgClass, 30, ['webp', 'png'], {
                mobile: [
                    [700, 500],
                    [800, 600],
                    [900, 700],
                    [1000, 800],
                    [1100, 900],
                    [1200, 1000],
                    [1300, 1100],
                    [1400, 1200],
                ],
                desktop: [
                    [700, 500],
                    [800, 600],
                    [900, 700],
                    [1000, 800],
                    [1100, 900],
                    [1200, 1000],
                    [1300, 1100],
                ]
            });
            break;
    }
})

function renderImage(container, publicID, alt, imgClass, quality, imgExtentions, resolutions) {
    const picture = document.createElement('picture');
    container.appendChild(picture);

    imgExtentions.map(function (extention) {
        if (resolutions.mobile.length) {
            const source = document.createElement('source');
            picture.appendChild(source);
            source.media = '(max-width: 930px)';
            source.type = 'image/' + extention;

            const sourceValue = resolutions.mobile.map(function (resolution) {
                return imageHost + 'q_' + quality + ',c_fill,w_' + resolution[0] + (resolution[1] != 'auto' ? ',h_' + resolution[1] : '') + '/' + cloudName + '/' + folder + '/' + publicID + '.' + extention + ' ' + resolution[0] + 'w';
            });
            source.srcset = sourceValue.join(', ');
        }

        if (resolutions.desktop.length) {
            const source = document.createElement('source');
            picture.appendChild(source);
            source.media = '(min-width: 930px)';
            source.type = 'image/' + extention;

            const sourceValue = resolutions.desktop.map(function (resolution) {
                return imageHost + 'q_' + quality + ',c_fill,w_' + resolution[0] + (resolution[1] != 'auto' ? ',h_' + resolution[1] : '') + '/' + cloudName + '/' + folder + '/' + publicID + '.' + extention + ' ' + resolution[0] + 'w';
            });
            source.srcset = sourceValue.join(', ');
        }
    })

    const img = document.createElement('img');
    if (imgClass) img.classList.add(imgClass);
    picture.appendChild(img);
    img.src = imageHost + 'c_fill,w_900/' + cloudName + '/' + folder + '/' + publicID + '.jpg';
    img.alt = alt;
}