export function markupTemplate({ largeImageURL, webformatURL, tags, likes, views, comments, downloads }) {
    return `<div class="photo-card">
    <a href="${largeImageURL}" target="_blank" rel="noopener noreferrer" class="galery-item">
        <img src="${webformatURL}" alt="${tags}" title="${tags}" loading="lazy" />
    </a>
    <div class="info">
        <p class="info-item">
            <b>Likes</b>
            ${likes}
        </p>
        <p class="info-item">
            <b>Views</b>
            ${views}
        </p>
        <p class="info-item">
            <b>Comments</b>
            ${comments}
        </p>
        <p class="info-item">
            <b>Downloads</b>
            ${downloads}
        </p>
    </div>
</div>`
};