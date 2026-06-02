export class Card {
    constructor(data, templateSelector, handleCardClick) {
        this._data = data;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
    }
    _getTemplate() {
        const template = document.querySelector(this._templateSelector);
        const cardElement = template.content.querySelector(".card");
        return cardElement.cloneNode(true);
    }
    _handleLikeClick(evt) {
        const button = evt.target;
        button.classList.toggle("card__like-button_active");
    }
    _handleDeleteClick() {
        this._element.remove();
    }
    _setEventListeners() {
        const likeButton = this._element.querySelector(".card__like-button");
        const deleteButton = this._element.querySelector(".card__delete-button");
        const image = this._element.querySelector(".card__image");
        likeButton.addEventListener("click", (evt) => this._handleLikeClick(evt));
        deleteButton.addEventListener("click", () => this._handleDeleteClick());
        image.addEventListener("click", () => this._handleCardClick(this._data));
    }
    getView() {
        this._element = this._getTemplate();
        const image = this._element.querySelector(".card__image");
        const title = this._element.querySelector(".card__title");
        image.src = this._data.link;
        image.alt = this._data.name;
        title.textContent = this._data.name;
        this._setEventListeners();
        return this._element;
    }
}
