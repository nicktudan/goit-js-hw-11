// https://pixabay.com/api/?key=32948391-41e06186a421161778854822b&q=value&image_type =photo&orientation=horizontal&safesearch=true&per_page=40&page=1

import axios from 'axios';

export async function fetchImages(inputValue, pageNr) {

    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '32948391-41e06186a421161778854822b';
    const filters = `?key=${API_KEY}&q=${inputValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${pageNr}`;

    // return fetch(`${BASE_URL}name/${name}${filters}`)
    //     .then(response => {
    //         if (!response.ok) {
    //             throw new Error(response.statusText);
    //         }
    //         return response.json();
    //     });
    return await axios.get(`${BASE_URL}${filters}`).then(response => response.data);
}
