// @todo: Темплейт карточки
const cartaTemplate = document.querySelector('#card-template');

// @todo: DOM узлы
const contenuto = document.querySelector('.content');
const elencoCarta = document.querySelector('.places__list');

// @todo: Функция создания карточки
function creareUnaCarta (setDiCarte, pulsanteCestinoEliminaScheda) {
    const nodoCarta = cartaTemplate.content.cloneNode(true);
    const cartaIllustrata = nodoCarta.querySelector('.card__image');
    cartaIllustrata.src = setDiCarte.link;
    cartaIllustrata.alt = setDiCarte.name;
    nodoCarta.querySelector('.card__title').textContent = setDiCarte.name;
    nodoCarta.querySelector('.card__delete-button').addEventListener('click', pulsanteCestinoEliminaScheda);
    nodoCarta.querySelector('.card__like-button').addEventListener('click', evt => {
        evt.target.classList.toggle('card__like-button_is-active');
    });
    return nodoCarta;
};

// @todo: Функция удаления карточки
function rimuovereLaCarta (pulsanteCestinoEliminaScheda) {
    pulsanteCestinoEliminaScheda.target.closest('.places__item').remove()
};

// @todo: Вывести карточки на страницу
initialCards.forEach(setDiCarte => {
    elencoCarta.append(creareUnaCarta(setDiCarte, rimuovereLaCarta))
});