import '../css/styles.css';
import NewsApiService from './fetchImages';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { markupTemplate } from './markupTemplate';
import LoadMoreBtn from './load-more-btn';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const refs = {
    searchForm: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
};

const newsApiService = new NewsApiService();

const loadMoreBtn = new LoadMoreBtn({
    selector: '[data-action="load-more"]',
    hidden: true,
});

// console.log(loadMoreBtn);

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchImages);

function onSearch(e) {
    e.preventDefault();
    cleanGallery();
    newsApiService.searchQuery = e.currentTarget.elements.searchQuery.value.trim();

    if (newsApiService.searchQuery === '') {
        Notify.failure('Please, enter text!');
        return;
    }

    loadMoreBtn.show();
    newsApiService.resetPage();
    fetchImages();
}

function fetchImages() {
    loadMoreBtn.disable();

    newsApiService.fetchImages().then(foundData => {
        newsApiService.totalPage = Math.ceil(foundData.totalHits / newsApiService.perPage);
        newsApiService.loadedNow += foundData.hits.length;
        
        if (foundData.hits.length === 0) {
            loadMoreBtn.hide();
            Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            return;
        }

        if (newsApiService.page === 2) {
            Notify.success(`Hooray! We found ${foundData.totalHits} images.`);
        }

        if (newsApiService.totalPage + 1 === newsApiService.page) {
            loadMoreBtn.hide();
            Notify.info('We are sorry, but you have reached the end of search results.');
        }

        Notify.success(`Loaded ${newsApiService.loadedNow} images.`);

        appendGalleryMarkup(foundData.hits);
        loadMoreBtn.enable();
        lightbox.refresh();
    });
}

function appendGalleryMarkup(images) {
    console.log(images, 'images');
    const markup = images.map(markupTemplate).join('');
    // const markup = markupTemplate(images);
    refs.gallery.insertAdjacentHTML('beforeend', markup);
    smoothScroll()
}

function cleanGallery() {
    refs.gallery.innerHTML = '';
}

function smoothScroll() {
    const { height: cardHeight } = document
        .querySelector(".gallery")
        .firstElementChild.getBoundingClientRect();

    window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
    });
}

let lightbox = new SimpleLightbox('.gallery a', {
    captions: false,
    doubleTapZoom: false,
    scrollZoom: false,
});



// 1. У відповіді бекенд повертає властивість
// totalHits - загальна кількість зображень,
//     які відповідають критерію пошуку(для безкоштовного акаунту).
// Якщо користувач дійшов до кінця колекції, ховай кнопку
// і виводь повідомлення з текстом
// "We're sorry, but you've reached the end of search results."

// 2. Після першого запиту з кожним новим пошуком отримувати
// повідомлення, в якому буде написано, скільки всього 
// знайшли зображень(властивість totalHits).Текст повідомлення
//     - "Hooray! We found totalHits images."

// 3. Якщо бекенд повертає порожній масив, значить нічого
//  підходящого не було знайдено.У такому разі показуй 
//  повідомлення з текстом
// "Sorry, there are no images matching your search query. 
// Please try again."
// Для повідомлень використовуй бібліотеку notiflix.