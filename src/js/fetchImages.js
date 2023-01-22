import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
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
            const filters = `?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${this.perPage}&page=${this.page}`;
            this.incrementPage();
            this.resetLoaded();

            const response = await axios.get(filters);
            return response.data;
        } catch (error) {
            throw new Error(error);
        }
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
