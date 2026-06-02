export class Popup {
  protected _popupElement: HTMLElement;

  constructor(selector: string) {
    this._popupElement = document.querySelector(
      selector
    ) as HTMLElement;
  }

  private _handleEscClose = (
    evt: KeyboardEvent
  ): void => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  public open(data?: unknown): void {
  this._popupElement.classList.add("popup_is-opened");

  document.addEventListener(
    "keydown",
    this._handleEscClose
  );
}

  public close(): void {
    this._popupElement.classList.remove(
      "popup_is-opened"
    );

    document.removeEventListener(
      "keydown",
      this._handleEscClose
    );
  }

  public setEventListeners(): void {
    const closeButton = this._popupElement.querySelector(
      ".popup__close"
    ) as HTMLButtonElement;

    closeButton.addEventListener("click", () => {
      this.close();
    });

    this._popupElement.addEventListener(
      "click",
      (evt) => {
        if (evt.target === this._popupElement) {
          this.close();
        }
      }
    );
  }
}