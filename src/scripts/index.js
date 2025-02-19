import '../pages/index.css';
import { initialCards } from '../scripts/cards.js';
import { openPopup, closePopup} from '../scripts/modal.js';
import { createCard, deleteCard, setLike} from '../scripts/card.js';

// DOM узлы
const placesForCards = document.querySelector('.places__list');

const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddNewCard = document.querySelector('.popup_type_new-card');
const popupViewImage = document.querySelector('.popup_type_image');
const elPopupImage = popupViewImage.querySelector('.popup__image');
const elPopupCaption = popupViewImage.querySelector('.popup__caption');

const titleProfile = document.querySelector('.profile__title');
const descriptionProfile = document.querySelector('.profile__description');

const btnEditProfile = document.querySelector('.profile__edit-button');
const btnAddCard = document.querySelector('.profile__add-button');

const formEditProfile = document.forms.editProfile;
const formNewPlace = document.forms.newPlace;

// Функция получения данных для открытия попапа с изображением
function getDataPopupImage (evt) {
    openPopup(popupViewImage);
    elPopupImage.src = evt.target.src;
    elPopupImage.alt = evt.target.alt;
    elPopupCaption.textContent = evt.target.alt;
};

// Функции для кнопки Сохранить
function handleFormSubmitEditProfile(evt) {
    evt.preventDefault();
    titleProfile.textContent = formEditProfile.elements.name.value;
    descriptionProfile.textContent = formEditProfile.elements.description.value;
    closePopup(popupEditProfile);
};

function handleFormSubmitNewCard(evt) {
    evt.preventDefault();
    const dataNewPlace = {name: formNewPlace.elements.placeName.value, link: formNewPlace.elements.link.value};
    closePopup(popupAddNewCard);
    placesForCards.prepend(createCard(dataNewPlace, deleteCard, setLike, getDataPopupImage))
};

// Слушатель кнопки редактирования профиля
btnEditProfile.addEventListener('click', function() {
    openPopup(popupEditProfile);
    formEditProfile.elements.name.focus();
    formEditProfile.elements.name.value = titleProfile.textContent;
    formEditProfile.elements.description.value = descriptionProfile.textContent;
    popupEditProfile.addEventListener('submit', handleFormSubmitEditProfile);
});

// Слушатель кнопки добавления карточки
btnAddCard.addEventListener('click', function() {
    openPopup(popupAddNewCard);
    formNewPlace.reset();
    formNewPlace.elements.placeName.focus();
    popupAddNewCard.addEventListener('submit', handleFormSubmitNewCard);
});

// Создаем карточки при загрузке страницы
initialCards.forEach(setDiCarte => {
    placesForCards.append(createCard(setDiCarte, deleteCard, setLike, getDataPopupImage))
});