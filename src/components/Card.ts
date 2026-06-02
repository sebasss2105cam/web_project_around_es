export interface CardData {
  name: string;
  link: string;
}
export class Card {
  private _data: CardData;
  private _templateSelector: string;
  private _handleCardClick: (data: CardData) => void;
  private _element!: HTMLElement;

  constructor(
    data: CardData,
    templateSelector: string,
    handleCardClick: (data: CardData) => void
  ) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

private _getTemplate(): HTMLElement {
  const template = document.querySelector(
    this._templateSelector
  ) as HTMLTemplateElement;

  const cardElement = template.content.querySelector(".card");

  return cardElement!.cloneNode(true) as HTMLElement;
}
private _handleLikeClick(evt: Event): void {
  const button = evt.target as HTMLElement;

  button.classList.toggle("card__like-button_active");
}
private _handleDeleteClick(): void {
  this._element.remove();
}
private _setEventListeners(): void {
  const likeButton = this._element.querySelector(
    ".card__like-button"
  ) as HTMLButtonElement;

  const deleteButton = this._element.querySelector(
    ".card__delete-button"
  ) as HTMLButtonElement;

  const image = this._element.querySelector(
    ".card__image"
  ) as HTMLImageElement;

  likeButton.addEventListener("click", (evt) =>
    this._handleLikeClick(evt)
  );

  deleteButton.addEventListener("click", () =>
    this._handleDeleteClick()
  );

  image.addEventListener("click", () =>
    this._handleCardClick(this._data)
  );
}
public getView(): HTMLElement {
  this._element = this._getTemplate();

  const image = this._element.querySelector(
    ".card__image"
  ) as HTMLImageElement;

  const title = this._element.querySelector(
    ".card__title"
  ) as HTMLElement;

  image.src = this._data.link;
  image.alt = this._data.name;

  title.textContent = this._data.name;

  this._setEventListeners();

  return this._element;
}
}