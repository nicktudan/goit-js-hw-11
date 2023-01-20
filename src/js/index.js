import '../css/styles.css';
// import { fetchImages } from './fetchImages';
import NewsApiService from './fetchImages';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { markupTemplate } from './markupTemplate';
import LoadMoreBtn from './load-more-btn';


const refs = {
    searchForm: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more'),
};

const inputValue = new NewsApiService();
// const loadMoreBtn = new LoadMoreBtn({
//     selector: '[data-action="load-more"}',
//     hidden: true,
// });

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
    e.preventDefault();
    cleanGallery();
    // const searchQuery = refs.searchForm.value.trim();
    // if (searchQuery === '') {
    //     return;
    // }
    // fetchImages(input.value);
    inputValue.searchQuery = e.currentTarget.elements.searchQuery.value.trim();
    inputValue.resetPage();
    inputValue.fetchImages().then(appendGalleryMarkup);
}

function onLoadMore() {
    inputValue.fetchImages().then(appendGalleryMarkup);
}


function appendGalleryMarkup(images) {
    console.log(images, 'images');
    const markup = markupTemplate(images);
    refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function cleanGallery() {
    refs.gallery.innerHTML = '';
}