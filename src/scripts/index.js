import '../pages/index.css';
import { initialCards } from '../scripts/cards.js';
import { aprireIPopup, chiudiIPopup} from '../scripts/modal.js';
import { creareUnaCarta, rimuovereLaCarta, mettereCome} from '../scripts/card.js';

// DOM узлы
const elencoCarta = document.querySelector('.places__list');

const popupModifica = document.querySelector('.popup_type_edit');
const popupNuovaMappa = document.querySelector('.popup_type_new-card');
const popupImmagine = document.querySelector('.popup_type_image');

const nomeDiInput = document.querySelector('.profile__title');
const descrizioneDiInput = document.querySelector('.profile__description');

const pulsanteDiModifica = document.querySelector('.profile__edit-button');
const pulsanteAggiungiCarta = document.querySelector('.profile__add-button');

const moduloModificaProfilo = document.forms.editProfile;
const moduloNuovoPosto = document.forms.newPlace;

// Функция получения данных для открытия попапа с изображением
function gestoreClicImmagine (evt) {
    aprireIPopup(popupImmagine);
    const popupConImmagine = popupImmagine.querySelector('.popup__image');
    const popupConImmagineDescrizione = popupImmagine.querySelector('.popup__caption');
    
    popupConImmagine.src = evt.target.src;
    popupConImmagineDescrizione.textContent = evt.target.alt;
};

// Функция для кнопки Сохранить
function gestireModuloInvia(evt) {
    evt.preventDefault();
    if (evt.target.closest('.popup_type_edit')) {
        nomeDiInput.textContent = moduloModificaProfilo.elements.name.value;
        descrizioneDiInput.textContent = moduloModificaProfilo.elements.description.value;
        chiudiIPopup(evt.target.closest('.popup'))
    };
    if (evt.target.closest('.popup_type_new-card')) {
        const nuovaCarta = {name: moduloNuovoPosto.elements.placeName.value, link: moduloNuovoPosto.elements.link.value};
        
        initialCards.unshift(nuovaCarta);
        chiudiIPopup(evt.target.closest('.popup'));
        elencoCarta.prepend(creareUnaCarta(initialCards[0], rimuovereLaCarta, mettereCome, gestoreClicImmagine))
    };
};

// Слушатель кнопки редактирования профиля
pulsanteDiModifica.addEventListener('click', function(evt) {
    aprireIPopup(popupModifica);
    moduloModificaProfilo.elements.name.focus();
    moduloModificaProfilo.elements.name.value = nomeDiInput.textContent;
    moduloModificaProfilo.elements.description.value = descrizioneDiInput.textContent;
    popupModifica.addEventListener('submit', gestireModuloInvia);
});

// Слушатель кнопки добавления карточки
pulsanteAggiungiCarta.addEventListener('click', function(evt) {
    aprireIPopup(popupNuovaMappa);
    moduloNuovoPosto.reset();
    moduloNuovoPosto.elements.placeName.focus();
    popupNuovaMappa.addEventListener('submit', gestireModuloInvia);
});

// Создаем карточки при загрузке страницы
initialCards.forEach(setDiCarte => {
    elencoCarta.append(creareUnaCarta(setDiCarte, rimuovereLaCarta, mettereCome, gestoreClicImmagine))
});