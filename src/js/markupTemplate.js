export function markupTemplate({ largeImageURL, webformatURL, tags, likes, views, comments, downloads }) {
    return `<div class="photo-card">
    <a href="${largeImageURL}" target="_blank" rel="noopener noreferrer">
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


// У відповіді буде масив зображень, що задовольнили критерії параметрів запиту. 
// Кожне зображення описується об'єктом, з якого тобі цікаві тільки наступні властивості:
// •	webformatURL - посилання на маленьке зображення для списку карток.
// •	largeImageURL - посилання на велике зображення.
// •	tags - рядок з описом зображення. Підійде для атрибуту alt.
// •	likes - кількість лайків.
// •	views - кількість переглядів.
// •	comments - кількість коментарів.
// •	downloads - кількість завантажень.