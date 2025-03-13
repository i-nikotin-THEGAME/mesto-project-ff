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

// Из чек-листа следует:
// в файле modal.js описаны функции для работы с модальными окнами: 
// функция открытия модального окна, 
// функция закрытия модального окна, 
// функция-обработчик события нажатия Esc и 
// функция-обработчик события клика по оверлею;

// В данном файле я реализовал поведение модальных окон, это поведение тоже описано в чек-листе.
// Видимо все таки forEach планировался разработчиком в этом модуле.
// Но я исправил все по Вашему замечанию. Так как все таки верно будет?