import '../pages/index.css';
import { getInitialCards, getInitialEditProfile, patchEditProfile, patchNewCard, patchLinkAvatar } from '../scripts/api.js';
import { openPopup, closePopup } from '../scripts/modal.js';
import { createCard, deleteCard, setLike } from '../scripts/card.js';
import { enableValidation, clearValidation, validationConfig } from '../scripts/validation.js'

// DOM узлы
const placesForCards = document.querySelector('.places__list');

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

// Функция получения данных для открытия попапа с изображением
function getDataPopupImage(evt) {
    openPopup(popupViewImage);
    elPopupImage.src = evt.target.src;
    elPopupImage.alt = evt.target.alt;
    elPopupCaption.textContent = evt.target.alt;
};

// Функции для кнопки Сохранить сведения о профиле
function handleFormSubmitEditProfile() {
    const DateProfile = {
        name: formEditProfile.elements.name.value,
        about: formEditProfile.elements.description.value
    };
    patchEditProfile(DateProfile)
        .then((res) => {
            titleProfile.textContent = res.name;
            descriptionProfile.textContent = res.about;
            closePopup(popupEditProfile);
        })
        .catch((err) => {
            console.log('Ошибка. Запрос не выполнен: ', err);
        });
};

// Функции для Новой карточки
function handleFormSubmitNewCard() {
    const dataNewPlace = {
        name: formNewPlace.elements.placeName.value,
        link: formNewPlace.elements.link.value
    };
    formNewPlace.elements.submitButton.textContent = 'Сохранение...'
    Promise.all([getInitialEditProfile(), patchNewCard(dataNewPlace)])
        .then(([profile, card]) => {
            placesForCards.prepend(createCard({ profile, card }, deleteCard, setLike, getDataPopupImage))
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

// Слушатель кнопки редактирования профиля
btnEditProfile.addEventListener('click', function () {
    clearValidation(popupEditProfile, validationConfig);
    openPopup(popupEditProfile);
    formEditProfile.elements.name.focus();
    formEditProfile.elements.name.value = titleProfile.textContent;
    formEditProfile.elements.description.value = descriptionProfile.textContent;
    popupEditProfile.addEventListener('submit', handleFormSubmitEditProfile)
});

// Слушатель изменения аватара
btnNewAvatar.addEventListener('click', function () {
    clearValidation(popupUpdateAvatar, validationConfig);
    openPopup(popupUpdateAvatar);
    formNewAvatar.reset();
    formNewAvatar.elements.updateAvatarLink.focus();
    popupUpdateAvatar.addEventListener('submit', handleFormSubmitUpdateAvatar)
});

// Слушатель кнопки добавления карточки
btnAddCard.addEventListener('click', function () {
    clearValidation(popupAddNewCard, validationConfig);
    openPopup(popupAddNewCard);
    formNewPlace.reset();
    formNewPlace.elements.placeName.focus();
    popupAddNewCard.addEventListener('submit', handleFormSubmitNewCard);
});

// Заполняем страницу карточками и данными пользователя при загрузке страницы
Promise.all([getInitialEditProfile(), getInitialCards()])
    .then(([profile, cards]) => {
        avatarProfile.style.backgroundImage = `url(${profile.avatar})`
        titleProfile.textContent = profile.name
        descriptionProfile.textContent = profile.about
        cards.forEach(card => {
            placesForCards.append(createCard({ card, profile }, deleteCard, setLike, getDataPopupImage))
        });
    })
    .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
    });

enableValidation(validationConfig);