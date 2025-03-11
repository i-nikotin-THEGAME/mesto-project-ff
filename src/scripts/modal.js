const popups = document.querySelectorAll('.popup');

// Функция открытия попапа
export function openPopup(evt) {
    evt.classList.add('popup_is-opened');
    document.addEventListener('keydown', listenEsc);
};

// Функция закрытия попапа
export function closePopup(evt) {
    evt.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', listenEsc);
};

// Функция закрытия попапа по кнопке "Esc"
function listenEsc(evt) {
    if (evt.key === 'Escape') {
        closePopup(document.querySelector('.popup_is-opened'));
    };
};

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