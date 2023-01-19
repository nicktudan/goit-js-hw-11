import '../css/styles.css';
import { fetchImages } from './fetchImages';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { markupTemplate } from './markupTemplate';


const refs = {
    searchForm: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
    // countryInfo: document.querySelector('.country-info'),
};


refs.searchForm.addEventListener('input', onSearch);

function onSearch(e) {
    e.preventDefault();
    cleanGallery();
    const searchQuery = refs.searchForm.value.trim();
    if (searchQuery === '') {
        return;
    }

    fetchImages(searchQuery)

}







function cleanGallery() {
    refs.gallery.innerHTML = '';
}