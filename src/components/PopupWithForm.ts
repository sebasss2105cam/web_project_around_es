import { Popup } from "./Popup";

export interface FormValues {
  [key: string]: string;
}

export class PopupWithForm extends Popup {
  private _formElement: HTMLFormElement;
  private _handleFormSubmit: (data: FormValues) => void;

  constructor(
    selector: string,
    handleFormSubmit: (data: FormValues) => void
  ) {
    super(selector);

    this._formElement = this._popupElement.querySelector(
      ".popup__form"
    ) as HTMLFormElement;

    this._handleFormSubmit = handleFormSubmit;
  }

  private _getInputValues(): FormValues {
    const inputs = Array.from(
      this._formElement.querySelectorAll(".popup__input")
    ) as HTMLInputElement[];

    const values: FormValues = {};

    inputs.forEach((input) => {
      values[input.name] = input.value;
    });

    return values;
  }

  public setEventListeners(): void {
    super.setEventListeners();

    this._formElement.addEventListener(
      "submit",
      (evt: SubmitEvent) => {
        evt.preventDefault();

        this._handleFormSubmit(
          this._getInputValues()
        );
      }
    );
  }

  public close(): void {
    super.close();
    this._formElement.reset();
  }
}