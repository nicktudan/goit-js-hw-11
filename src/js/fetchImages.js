// https://pixabay.com/api/?key=32948391-41e06186a421161778854822b&q=value&image_type =photo&orientation=horizontal&safesearch=true&per_page=40&page=1

import axios from 'axios';

// export async function fetchImages(inputValue, pageNr) {

//     const BASE_URL = 'https://pixabay.com/api/';
//     const API_KEY = '32948391-41e06186a421161778854822b';
//     const filters = `?key=${API_KEY}&q=${inputValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${pageNr}`;

//     return await axios.get(`${BASE_URL}${filters}`).then(response => response.data);
    
// }
// console.log(fetchImages());

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '32948391-41e06186a421161778854822b';

export default class NewsApiService {
    constructor() {
        this.searchQuery = '';
        this.perPage = 200;
        this.page = 1;
        this.totalPage = 0;
        this.loadedNow = 0;
    }

    async fetchImages() {
        try {       
            // console.log(this);
            const filters = `?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${this.perPage}&page=${this.page}`;
            const url = `${BASE_URL}${filters}`;
            this.incrementPage();
            this.resetLoaded();
            // console.log(this);
            return await axios.get(url).then(response => response.data);
        } catch(er)

    }
    

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    resetLoaded() {
        this.loadedNow = 0;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}
