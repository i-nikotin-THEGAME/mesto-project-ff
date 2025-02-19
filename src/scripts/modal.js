const popups = document.querySelectorAll('.popup');
// Можете дать ссылки на материал, который более подробно может описать
// информацию о глобальный переменных и локальных, чтоб детальней понять 
// как это работает?

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
// Лишние операции дают бОльшую нагрузку на работу сайта при работе в больших проектах?

// Лучшей практикой будет считаться написания кода, как сейчас указано?
// Или через установку констанции в увлоии проверки и использованя этой
// константы в функции closePopup? 
        closePopup(document.querySelector('.popup_is-opened'));
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