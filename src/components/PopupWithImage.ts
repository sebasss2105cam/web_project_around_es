import { Popup } from "./Popup";
import { CardData } from "./Card";

export class PopupWithImage extends Popup {
  private _imageElement: HTMLImageElement;
  private _captionElement: HTMLElement;

  constructor(selector: string) {
    super(selector);

    this._imageElement = this._popupElement.querySelector(
      ".popup__image"
    ) as HTMLImageElement;

    this._captionElement = this._popupElement.querySelector(
      ".popup__caption"
    ) as HTMLElement;
  }

  public open(data: CardData): void {
    this._imageElement.src = data.link;
    this._imageElement.alt = data.name;

    this._captionElement.textContent = data.name;

    super.open();
  }
}