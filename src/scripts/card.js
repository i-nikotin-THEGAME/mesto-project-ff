import { deletePlace, putLike, deleteLike } from '../scripts/api.js';

// Функция создания карточки
// Каждый ревьюер делает замечание по своему. 
// Но сейчас я исправляю код в соответствии с Вашими замечаниями
export function createCard(dataCard, handleDeleteCard, handleLike, elCardImg) {
    const cardTemplate = document.querySelector('#card-template').content;
    const nodeCard = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = nodeCard.querySelector('.card__image');
    const cardTitle = nodeCard.querySelector('.card__title');
    const cardBtnDelete = nodeCard.querySelector('.card__delete-button');
    const cardBtnLike = nodeCard.querySelector('.card__like-button');
    const likeCounter = nodeCard.querySelector('.card__like-button__counter');

    cardImage.src = dataCard.card.link;
    cardImage.alt = dataCard.card.name;
    cardTitle.textContent = dataCard.card.name;
    cardBtnLike.id = dataCard.card._id;
    cardBtnDelete.id = dataCard.card._id;

    cardBtnDelete.remove();
    cardBtnLike.addEventListener('click', () => handleLike(cardBtnLike, likeCounter));
    cardImage.addEventListener('click', elCardImg);
    likeCounter.textContent = dataCard.card.likes.length;

    const hasLikesIdProfileId = dataCard.card.likes.some((likes) => likes._id === dataCard.profileId);
    if (hasLikesIdProfileId) {
        cardBtnLike.classList.toggle('card__like-button_is-active')
    }

    const hasOwnerIdProfileId = dataCard.card.owner._id === dataCard.profileId
    // console.log(dataCard.profileId)
    if (hasOwnerIdProfileId) {
        cardImage.after(cardBtnDelete)
        cardBtnDelete.addEventListener('click', handleDeleteCard);
    }

    return nodeCard;
};

// Функция удаления карточки
export function handleDeleteCard(evt) {
    deletePlace(evt.target.id)
        .then((res) => {
            evt.target.closest('.places__item').remove()
        })
        .catch((err) => {
            console.log('Ошибка. Запрос не выполнен: ', err);
        });
};

// Функция добавления лайка
export function handleLike(cardBtnLike, likeCounter) {
    if (!cardBtnLike.classList.contains('card__like-button_is-active')) {
        putLike(cardBtnLike.id)
            .then((res) => {
                cardBtnLike.classList.toggle('card__like-button_is-active');
                likeCounter.textContent = res.likes.length
            })
            .catch((err) => {
                console.log('Ошибка. Запрос не выполнен: ', err);
            })
    } else {
        deleteLike(cardBtnLike.id)
            .then((res) => {
                cardBtnLike.classList.toggle('card__like-button_is-active');
                likeCounter.textContent = res.likes.length
            })
            .catch((err) => {
                console.log('Ошибка. Запрос не выполнен: ', err);
            })
    }
};