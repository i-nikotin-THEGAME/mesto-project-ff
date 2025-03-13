import '../pages/index.css';
import { getInitialCards, getInitialEditProfile, patchEditProfile, patchNewCard, patchLinkAvatar } from '../scripts/api.js';
import { openPopup, closePopup } from '../scripts/modal.js';
import { createCard, handleDeleteCard, handleLike } from '../scripts/card.js';
import { enableValidation, clearValidation } from '../scripts/validation.js'

// DOM узлы
const placesForCards = document.querySelector('.places__list');
const popups = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddNewCard = document.querySelector('.popup_type_new-card');
const popupUpdateAvatar = document.querySelector('.popup_type_update-avatar')
const popupViewImage = document.querySelector('.popup_type_image');
const elPopupImage = popupViewImage.querySelector('.popup__image');
const elPopupCaption = popupViewImage.querySelector('.popup__caption');
const avatarProfile = document.querySelector('.profile__image');
const titleProfile = document.querySelector('.profile__title');
const descriptionProfile = document.querySelector('.profile__description');

const btnEditProfile = document.querySelector('.profile__edit-button');
const btnAddCard = document.querySelector('.profile__add-button');
const btnNewAvatar = document.querySelector('.profile__image-edit');

const formEditProfile = document.forms.editProfile;
const formNewPlace = document.forms.newPlace;
const formNewAvatar = document.forms.updateAvatarLink;

const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
    inputValidationPatternTypeText: /^[A-Za-zА-Яа-яËё\s-]+$/
};

// Функция получения данных для открытия попапа с изображением
function getDataPopupImage(evt) {
    openPopup(popupViewImage);
    elPopupImage.src = evt.target.src;
    elPopupImage.alt = evt.target.alt;
    elPopupCaption.textContent = evt.target.alt;
};

// Функция для кнопки Сохранить сведения о профиле
function handleFormSubmitEditProfile() {
    const DateProfile = {
        name: formEditProfile.elements.name.value,
        about: formEditProfile.elements.description.value
    };
    formEditProfile.elements.submitButton.textContent = 'Сохранение...'
    patchEditProfile(DateProfile)
        .then((res) => {
            titleProfile.textContent = res.name;
            descriptionProfile.textContent = res.about;
            closePopup(popupEditProfile);
        })
        .catch((err) => {
            console.log('Ошибка. Запрос не выполнен: ', err);
        })
        .finally(() => {
            formEditProfile.elements.submitButton.textContent = 'Сохранить'
        });
};

// Функции для Новой карточки
function handleFormSubmitNewCard() {
    const dataNewPlace = {
        name: formNewPlace.elements.placeName.value,
        link: formNewPlace.elements.link.value
    };
    formNewPlace.elements.submitButton.textContent = 'Сохранение...'
    patchNewCard(dataNewPlace)
        .then((card) => {
            placesForCards.prepend(createCard({ card, profileId: card.owner._id }, handleDeleteCard, handleLike, getDataPopupImage))
            closePopup(popupAddNewCard);
        })
        .catch((err) => {
            console.log('Ошибка. Запрос не выполнен: ', err);
        })
        .finally(() => {
            formNewPlace.elements.submitButton.textContent = 'Сохранить'
        });
};

// Функция сохранения ссылки на новый аватар
function handleFormSubmitUpdateAvatar() {
    const dataNewLinkAvatar = formNewAvatar.elements.updateAvatarLink.value;
    console.log(dataNewLinkAvatar)
    formNewAvatar.elements.submitButton.textContent = 'Сохранение...'
    patchLinkAvatar(dataNewLinkAvatar)
        .then((res) => {
            avatarProfile.style.backgroundImage = `url(${res.avatar})`
            closePopup(popupUpdateAvatar);
        })
        .catch((err) => {
            console.log('Ошибка. Запрос не выполнен: ', err);
        })
        .finally(() => {
            formNewAvatar.elements.submitButton.textContent = 'Сохранить'
        });
};

// Слушатели кнопок попапов
formEditProfile.addEventListener('submit', handleFormSubmitEditProfile);
formNewPlace.addEventListener('submit', handleFormSubmitNewCard);
formNewAvatar.addEventListener('submit', handleFormSubmitUpdateAvatar);

// Слушатель кнопки редактирования профиля
btnEditProfile.addEventListener('click', () => {
    clearValidation(popupEditProfile, validationConfig);
    openPopup(popupEditProfile);
    formEditProfile.elements.name.focus();
    formEditProfile.elements.name.value = titleProfile.textContent;
    formEditProfile.elements.description.value = descriptionProfile.textContent;
});

// Слушатель изменения аватара
btnNewAvatar.addEventListener('click', () => {
    clearValidation(popupUpdateAvatar, validationConfig);
    openPopup(popupUpdateAvatar);
    formNewAvatar.reset();
    formNewAvatar.elements.updateAvatarLink.focus();
});

// Слушатель кнопки добавления карточки
btnAddCard.addEventListener('click', () => {
    clearValidation(popupAddNewCard, validationConfig);
    openPopup(popupAddNewCard);
    formNewPlace.reset();
    formNewPlace.elements.placeName.focus();
});

// Слушатель для закрытия попапа по "Крестику" и по оверлею
popups.forEach((popup) => {
    popup.classList.add('popup_is-animated');
    popup.addEventListener('mousedown', function (evt) {
        if (evt.target.classList.contains('popup__close')) {
            closePopup(popup);
        };
        if (evt.target === popup) {
            closePopup(evt.target);
        };
    });
});

// Заполняем страницу карточками и данными пользователя при загрузке страницы
Promise.all([getInitialEditProfile(), getInitialCards()])
    .then(([profile, cards]) => {
        avatarProfile.style.backgroundImage = `url(${profile.avatar})`
        titleProfile.textContent = profile.name
        descriptionProfile.textContent = profile.about
        cards.forEach(card => {
            placesForCards.append(createCard({ card, profileId: profile._id }, handleDeleteCard, handleLike, getDataPopupImage))
            // console.log({ card, profileId: profile._id })
        });
    })
    .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
    });

enableValidation(validationConfig);