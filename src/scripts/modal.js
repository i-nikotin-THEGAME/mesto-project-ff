const popups = document.querySelectorAll('.popup');
const activePopup = document.querySelector('.popup_is-opened');

// Функция открытия попапа
export function openPopup (evt) {
    evt.classList.add('popup_is-opened');
    document.addEventListener('keydown', listenEsc);
};

// Функция закрытия попапа
export function closePopup (evt) {
    evt.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', listenEsc);
};

// Функция закрытия попапа по кнопке "Esc"
function listenEsc (evt) {
    if (evt.key === 'Escape') {
// Использозвание forEach тут для единообразия кода, т.к. такой же метод 
// использовался и для закрытия popup по крестику или по оверлею.
// Следовал задаче: Дайте пользователям возможность закрывать 
// ЛЮБОЙ попап нажатием на клавишу Esc
        closePopup(activePopup);
    };
};

// Слушатель для закрытия popup
popups.forEach((popup) => {
    popup.classList.add('popup_is-animated');
    popup.addEventListener('mousedown', function(evt) {
        if (evt.target.classList.contains('popup__close')) {
            closePopup(popup);
        };
        if (evt.target === popup) {
            closePopup(evt.target);
        };
    });
});