// Функция создания карточки 
export function creareUnaCarta (setDiCarte, pulsanteCestinoEliminaScheda, pulsanteMiPiace, nodoIllustrata) {
    const cartaTemplate = document.querySelector('#card-template');
    const nodoCarta = cartaTemplate.content.cloneNode(true);
    const cartaIllustrata = nodoCarta.querySelector('.card__image');
    const cartaTesto = nodoCarta.querySelector('.card__title');
    
    cartaIllustrata.src = setDiCarte.link;
    cartaIllustrata.alt = setDiCarte.name;
    cartaTesto.textContent = setDiCarte.name;
    
    nodoCarta.querySelector('.card__delete-button').addEventListener('click', pulsanteCestinoEliminaScheda);
    nodoCarta.querySelector('.card__like-button').addEventListener('click', pulsanteMiPiace);
    cartaIllustrata.addEventListener('click', nodoIllustrata);
    
    return nodoCarta;
};

// Функция удаления карточки
export function rimuovereLaCarta (evt) {
    evt.target.closest('.places__item').remove()
};

// Функция добавления лайка
export function mettereCome (evt) {
    evt.target.classList.toggle('card__like-button_is-active');
};