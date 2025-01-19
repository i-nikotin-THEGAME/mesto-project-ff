// @todo: Темплейт карточки
const cartaTemplate = document.querySelector('#card-template');

// @todo: DOM узлы
const contenuto = document.querySelector('.content');
const elencoCarta = document.querySelector('.places__list');

// @todo: Функция создания карточки
function creareUnaCarta (unoCarta, rimozione) {
    const nodoCarta = cartaTemplate.content.cloneNode(true);
    nodoCarta.querySelector('.card__image').src = unoCarta.link;
    nodoCarta.querySelector('.card__image').alt = unoCarta.name;
    nodoCarta.querySelector('.card__title').textContent = unoCarta.name;
    nodoCarta.querySelector('.card__delete-button').addEventListener('click', rimozione);
    nodoCarta.querySelector('.card__like-button').addEventListener('click', evt => {
        evt.target.classList.toggle('card__like-button_is-active');
    });
    return nodoCarta;
};

// @todo: Функция удаления карточки
function rimuovereLaCarta (rimozione) {
    rimozione.target.parentElement.remove()
};

// @todo: Вывести карточки на страницу
initialCards.forEach(unoCarta => {
    elencoCarta.append(creareUnaCarta(unoCarta, rimuovereLaCarta))
});