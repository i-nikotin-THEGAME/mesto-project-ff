// Функция создания карточки 
export function createCard (dataCard, btnDelete, btnLike, elCardImg) {
    const cardTemplate = document.querySelector('#card-template').content;
    const nodeCard = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = nodeCard.querySelector('.card__image');
    const cardTitle = nodeCard.querySelector('.card__title');
    
    cardImage.src = dataCard.link;
    cardImage.alt = dataCard.name;
    cardTitle.textContent = dataCard.name;
    
    nodeCard.querySelector('.card__delete-button').addEventListener('click', btnDelete);
    nodeCard.querySelector('.card__like-button').addEventListener('click', btnLike);
    cardImage.addEventListener('click', elCardImg);
    
    return nodeCard;
};

// Функция удаления карточки
export function deleteCard (evt) {
    evt.target.closest('.places__item').remove()
};

// Функция добавления лайка
export function setLike (evt) {
    evt.target.classList.toggle('card__like-button_is-active');
};