import { deletePlace, putLike, deleteLike } from '../scripts/api.js';

// Функция создания карточки 
export function createCard(dataCard, btnDelete, btnLike, elCardImg) {
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

    cardBtnDelete.remove();
    cardBtnLike.addEventListener('click', btnLike);
    cardImage.addEventListener('click', elCardImg);
    likeCounter.textContent = dataCard.card.likes.length;

    const hasLikesIdOwnerIid = dataCard.card.likes.some((likes) => likes._id === dataCard.profile._id);
    if (hasLikesIdOwnerIid) {
        cardBtnLike.classList.toggle('card__like-button_is-active')
    }

    if (dataCard.card.owner._id === dataCard.profile._id) {
        cardImage.after(cardBtnDelete)
        cardBtnDelete.addEventListener('click', btnDelete);
        cardBtnDelete.id = dataCard.card._id;
    }

    return nodeCard;
};

// Функция удаления карточки
export function deleteCard(evt) {
    deletePlace(evt.target.id)
        .then((res) => {
            evt.target.closest('.places__item').remove()
        })
        .catch((err) => {
            console.log('Ошибка. Запрос не выполнен: ', err);
        });
};

// Функция добавления лайка
export function setLike(evt) {
    if (!evt.target.classList.contains('card__like-button_is-active')) {
        putLike(evt.target.id)
            .then((res) => {
                evt.target.classList.toggle('card__like-button_is-active');
                evt.target.nextElementSibling.textContent = res.likes.length
            })
            .catch((err) => {
                console.log('Ошибка. Запрос не выполнен: ', err);
            })
    } else {
        deleteLike(evt.target.id)
            .then((res) => {
                evt.target.classList.toggle('card__like-button_is-active');
                evt.target.nextElementSibling.textContent = res.likes.length
            })
            .catch((err) => {
                console.log('Ошибка. Запрос не выполнен: ', err);
            })
    }
};