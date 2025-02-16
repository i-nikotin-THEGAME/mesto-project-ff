const popupi = document.querySelectorAll('.popup');

// Функция открытия попапа
export function aprireIPopup (evt) {
    evt.classList.add('popup_is-opened');
    document.addEventListener('keydown', chiaveDelGestore);
};

// Функция закрытия попапа
export function chiudiIPopup (evt) {
    evt.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', chiaveDelGestore);
};

// Функция закрытия попапа по кнопке "Esc"
function chiaveDelGestore (evt) {
    if (evt.key === 'Escape') {
        popupi.forEach((popup) => {
            chiudiIPopup(popup)
        });
    };
};

// Слушатель для закрытия popup
popupi.forEach((popup) => {
    popup.classList.add('popup_is-animated');
    popup.addEventListener('mousedown', function(evt) {
        if (evt.target.classList.contains('popup__close')) {
            chiudiIPopup(popup)
        };
        if (evt.target === popup) {
            chiudiIPopup(evt.target)
        };
    });
});