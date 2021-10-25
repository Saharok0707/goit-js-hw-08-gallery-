const galleryItems = [
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
        description: 'Hokkaido Flower',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
        description: 'Container Haulage Freight',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
        description: 'Aerial Beach View',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
        description: 'Flower Blooms',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
        description: 'Alpine Mountains',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
        description: 'Mountain Lake Sailing',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
        description: 'Alpine Spring Meadows',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
        description: 'Nature Landscape',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
        description: 'Lighthouse Coast Sea',
    },
];
const refs = {
    galleryRef: document.querySelector('ul.js-gallery'),
    modalRef: document.querySelector('div.lightbox'),
    closeBtnRef: document.querySelector('button[data-action="close-lightbox"]'),
    modalImgRef: document.querySelector('img.lightbox__image'),
    overlayRef: document.querySelector('div.lightbox__overlay'),
};

const createGalleryElementMarkup = function (galleryElements) {
    return galleryElements
        .map(({ original, preview, description }) => {
            return `<li class="gallery__item">
        <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
    </a>
</li>`;
        })
        .join('');
};
const renderGalleryMarkup = function (galleryMarkup, galleryRef) {
    galleryRef.insertAdjacentHTML('beforeend', galleryMarkup);
};

const onGalleryLinkClick = function (e) {
    e.preventDefault();
};

const onGalleryElementClick = function (e) {
    if (!e.target.classList.contains('gallery__image')) return;
    refs.modalRef.classList.add('is-open');
    refs.modalImgRef.src = e.target.dataset.source;

    document.addEventListener('keydown', onBtnPressed);
    refs.closeBtnRef.addEventListener('click', oncloseBtnClick);
    refs.overlayRef.addEventListener('click', onOverlayClick);
};

const PreventLinkOpening = function (links) {
    links.forEach(link => link.addEventListener('click', onGalleryLinkClick));
};

const closeModal = function () {
    refs.modalRef.classList.remove('is-open');
    refs.modalImgRef.src = '';

    document.removeEventListener('keydown', onBtnPressed);
    refs.closeBtnRef.removeEventListener('click', oncloseBtnClick);
    refs.overlayRef.removeEventListener('click', onOverlayClick);
};

const oncloseBtnClick = function () {
    closeModal();
};

const onOverlayClick = function () {
    closeModal();
};

const getCurrentIndex = function () {
    for (let i = 0; i < galleryItems.length; i += 1) {
        if (galleryItems[i].original === refs.modalImgRef.src) {
            return i;
        }
    }
};

const onArrowLeftClick = function () {
    const currentIndex = getCurrentIndex() - 1;
    refs.modalImgRef.src =
        currentIndex === -1
            ? galleryItems[galleryItems.length - 1].original
            : galleryItems[currentIndex].original;
};

const onArrowRightClick = function () {
    const currentIndex = getCurrentIndex() + 1;
    refs.modalImgRef.src =
        currentIndex === galleryItems.length
            ? galleryItems[0].original
            : galleryItems[currentIndex].original;
};

const onBtnPressed = function (e) {
    switch (e.key) {
        case 'Escape':
            closeModal();
            break;
        case 'ArrowLeft':
            onArrowLeftClick();
            break;
        case 'ArrowRight':
            onArrowRightClick();
    }
};

renderGalleryMarkup(createGalleryElementMarkup(galleryItems), refs.galleryRef);

const galleryLinksRef = document.querySelectorAll('a.gallery__link');
PreventLinkOpening(galleryLinksRef);

refs.galleryRef.addEventListener('click', onGalleryElementClick);