export class FormValidator {
  private _config: any;
  private _formElement: HTMLFormElement;
  private _inputList: HTMLInputElement[];
  private _buttonElement: HTMLButtonElement;

  constructor(config: any, formElement: HTMLFormElement) {
    this._config = config;
    this._formElement = formElement;

    this._inputList = Array.from(
      formElement.querySelectorAll(config.inputSelector)
    ) as HTMLInputElement[];

    this._buttonElement = formElement.querySelector(
      config.submitButtonSelector
    ) as HTMLButtonElement;
  }

  private _showInputError(
    inputElement: HTMLInputElement,
    errorMessage: string
  ) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.name}-error`
    ) as HTMLElement;

    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  private _hideInputError(inputElement: HTMLInputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.name}-error`
    ) as HTMLElement;

    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._config.errorClass);
  }

  private _checkInputValidity(inputElement: HTMLInputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(
        inputElement,
        inputElement.validationMessage
      );
    } else {
      this._hideInputError(inputElement);
    }
  }

  private _toggleButtonState() {
    const hasInvalidInput = this._inputList.some(
      (inputElement) => !inputElement.validity.valid
    );

    if (hasInvalidInput) {
      this._buttonElement.classList.add(
        this._config.inactiveButtonClass
      );
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(
        this._config.inactiveButtonClass
      );
      this._buttonElement.disabled = false;
    }
  }

  private _setEventListeners() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  public enableValidation() {
    
    this._setEventListeners();
  }
  public resetValidation() {
  this._inputList.forEach((inputElement) => {
    this._hideInputError(inputElement);
  });

  this._toggleButtonState();
}
}