import { FormValidator } from "../components/FormValidator.js";
import { UserInfo } from "../components/UserInfo.js";
import { defaultFormConfig } from "../utils/constants.js";
document.addEventListener("DOMContentLoaded", () => {
    const initialCards = [
        {
            name: "Valle de Yosemite",
            link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
        },
        {
            name: "Lago Louise",
            link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
        },
        {
            name: "Montañas Calvas",
            link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
        },
        {
            name: "Latemar",
            link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
        },
        {
            name: "Parque Nacional de la Vanoise",
            link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
        },
        {
            name: "Lago di Braies",
            link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
        },
    ];
    const editButton = document.querySelector(".profile__edit-button");
    const editPopup = document.querySelector("#edit-popup");
    const closeButton = editPopup.querySelector(".popup__close");
    const imagePopup = document.querySelector("#image-popup");
    const popupImage = imagePopup.querySelector(".popup__image");
    const popupCaption = imagePopup.querySelector(".popup__caption");
    const closeImageButton = imagePopup.querySelector(".popup__close");
    const profileTitle = document.querySelector(".profile__title");
    const profileDescription = document.querySelector(".profile__description");
    const nameInput = document.querySelector(".popup__input_type_name");
    const descriptionInput = document.querySelector(".popup__input_type_description");
    const editForm = document.querySelector("#edit-profile-form");
    const userInfo = new UserInfo({
        nameSelector: ".profile__title",
        jobSelector: ".profile__description",
    });
    function openModal(modal) {
        modal.classList.add("popup_is-opened");
        document.addEventListener("keydown", handleEscClose);
    }
    function closeModal(modal) {
        modal.classList.remove("popup_is-opened");
        document.removeEventListener("keydown", handleEscClose);
    }
    function fillProfileForm() {
        const userData = userInfo.getUserInfo();
        nameInput.value = userData.name;
        descriptionInput.value = userData.job;
    }
    function handleOpenEditModal() {
        fillProfileForm();
        openModal(editPopup);
    }
    function handleProfileFormSubmit(evt) {
        evt.preventDefault();
        userInfo.setUserInfo({
            name: nameInput.value,
            job: descriptionInput.value,
        });
        closeModal(editPopup);
    }
    editButton.addEventListener("click", handleOpenEditModal);
    closeButton.addEventListener("click", function () {
        closeModal(editPopup);
    });
    editForm.addEventListener("submit", handleProfileFormSubmit);
    const cardTemplate = document.querySelector("#card-template").content;
    const cardsContainer = document.querySelector(".cards__list");
    function renderCard(name, link, container) {
        const card = getCardElement({ name, link });
        container.prepend(card);
    }
    initialCards.forEach(function (item) {
        renderCard(item.name, item.link, cardsContainer);
    });
    const addButton = document.querySelector(".profile__add-button");
    const newCardPopup = document.querySelector("#new-card-popup");
    const newCardForm = document.querySelector("#new-card-form");
    const cardNameInput = newCardForm.querySelector(".popup__input_type_card-name");
    const cardLinkInput = newCardForm.querySelector(".popup__input_type_url");
    const closeNewCardButton = newCardPopup.querySelector(".popup__close");
    addButton.addEventListener("click", function () {
        openModal(newCardPopup);
    });
    closeNewCardButton.addEventListener("click", function () {
        closeModal(newCardPopup);
    });
    function handleCardFormSubmit(evt) {
        evt.preventDefault();
        const name = cardNameInput.value;
        const link = cardLinkInput.value;
        renderCard(name, link, cardsContainer);
        newCardForm.reset();
        closeModal(newCardPopup);
    }
    newCardForm.addEventListener("submit", handleCardFormSubmit);
    function handleLikeButton(evt) {
        const button = evt.target;
        button.classList.toggle("card__like-button_active");
    }
    function handleImageClick(data) {
        popupImage.src = data.link;
        popupImage.alt = data.name;
        popupCaption.textContent = data.name;
        openModal(imagePopup);
    }
    function handleDeleteCard(evt) {
        const button = evt.target;
        const card = button.closest(".card");
        card.remove();
    }
    function getCardElement(data) {
        const cardElement = cardTemplate
            .querySelector(".card")
            .cloneNode(true);
        const image = cardElement.querySelector(".card__image");
        const title = cardElement.querySelector(".card__title");
        const likeButton = cardElement.querySelector(".card__like-button");
        const deleteButton = cardElement.querySelector(".card__delete-button");
        image.src = data.link;
        image.alt = data.name;
        image.addEventListener("click", function () {
            handleImageClick(data);
        });
        title.textContent = data.name;
        likeButton.addEventListener("click", handleLikeButton);
        deleteButton.addEventListener("click", handleDeleteCard);
        return cardElement;
    }
    closeImageButton.addEventListener("click", function () {
        closeModal(imagePopup);
    });
    const validationConfig = {
        formSelector: ".popup__form",
        inputSelector: ".popup__input",
        submitButtonSelector: ".popup__button",
        inactiveButtonClass: "popup__button_disabled",
        inputErrorClass: "popup__input_type_error",
        errorClass: "popup__error_visible",
    };
    const popups = document.querySelectorAll(".popup");
    popups.forEach(function (popup) {
        popup.addEventListener("click", handleOverlayClick);
    });
    function handleEscClose(evt) {
        if (evt.key === "Escape") {
            const openedPopup = document.querySelector(".popup_is-opened");
            if (openedPopup) {
                closeModal(openedPopup);
            }
        }
    }
    function handleOverlayClick(evt) {
        const popup = evt.target;
        if (popup.classList.contains("popup")) {
            closeModal(popup);
        }
    }
    const addForm = document.querySelector("#new-card-form");
    const editFormValidator = new FormValidator(defaultFormConfig, editForm);
    const addFormValidator = new FormValidator(defaultFormConfig, addForm);
    editFormValidator.enableValidation();
    addFormValidator.enableValidation();
});
