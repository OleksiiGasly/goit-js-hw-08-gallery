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

const imagesGallery = document.querySelector('.js-gallery');
const selectedImage = document.querySelector('.js-lightbox');
const modalImage = document.querySelector('.lightbox__image');

const galleryMarkup = createGalleryMarkup(galleryItems);

let currentImage;

// Формирование разметки галлереи
imagesGallery.insertAdjacentHTML('beforeend', galleryMarkup);

function createGalleryMarkup(galleryItems) {
  return galleryItems.map(({ preview, original, description }) => {
    return `
    <li class="gallery__item">
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
    </li>
    `
  })
  .join('');
}

// Клик на элемент галлереи
const onImageClick = evt => {
  evt.preventDefault();
  const isImageEl = evt.target.classList.contains('gallery__image');

  if (!isImageEl) {
    return
  }

  openModal(evt)
}

// Клик на элемент закрытия модалки
const onModalClosingElClick = evt => {
  const closingButton = evt.target.dataset.action === 'close-lightbox';
  const closingArea = evt.target.classList.contains('lightbox__overlay');

  if (!closingButton && !closingArea) {
    return
  }

  closeModal()  
}

// Нажатия кнопок - esc и стрелки
const onKeyPress = evt => {
  if (evt.code === 'Escape') {
    closeModal();
    return;
  }

  if (evt.code === 'ArrowLeft') {
    const preceedingEl = currentImage.closest('li').previousElementSibling;
    const lastEl = currentImage.closest('li').parentNode.lastElementChild;

    if (preceedingEl) {
      const preceedingImage = preceedingEl.querySelector('.gallery__image');
      changeImage(preceedingImage);
    }
    else if (preceedingEl === null) {
      const lastImage = lastEl.querySelector('.gallery__image');
      changeImage(lastImage);
    }
    return
  }

  if (evt.code === 'ArrowRight') {
    const succeedingEl = currentImage.closest('li').nextElementSibling;
    const firstEl = currentImage.closest('li').parentNode.firstElementChild;

    if (succeedingEl) {
      const succeedingImage = succeedingEl.querySelector('.gallery__image');
      changeImage(succeedingImage);
    } 
    else if (succeedingEl === null) {
      const firstImage = firstEl.querySelector('.gallery__image');
      changeImage(firstImage);
    }
    return
  }
}

// Открытие модалки
const openModal = evt => {
  selectedImage.classList.add('is-open');
  modalImage.src = evt.target.dataset.source;
  modalImage.alt = evt.target.getAttribute('alt');
  currentImage = evt.target;

  window.addEventListener('keydown', onKeyPress);
}

// Закрытие модалки
const closeModal = () => {
  selectedImage.classList.remove('is-open');
  modalImage.src = '';
  modalImage.alt = '';

  window.removeEventListener('keydown', onKeyPress);
}

// Переключение картинок
const changeImage = target => {
  modalImage.src = target.dataset.source;
  modalImage.alt = target.getAttribute('alt');
  currentImage = target;
}

imagesGallery.addEventListener('click', onImageClick);
selectedImage.addEventListener('click', onModalClosingElClick);