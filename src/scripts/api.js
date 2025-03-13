const apiConfig = {
    baseUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-33/",
    headers: {
        authorization: 'ac47939a-c107-4906-89a8-0e52b056e2d1',
        'Content-Type': 'application/json'
    }
};

const checkResponse = (res) => {
    // console.log(res)
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
};

// Загрузка карточек с сервера GET
export const getInitialCards = () => {
    return fetch(`${apiConfig.baseUrl}cards`, {
        headers: apiConfig.headers
    })
        .then(checkResponse);
};

export const getInitialEditProfile = () => {
    return fetch(`${apiConfig.baseUrl}users/me`, {
        headers: apiConfig.headers
    })
        .then(checkResponse);
};

// Редактирование профиля PATCH
export const patchEditProfile = (newDateProfile) => {
    return fetch(`${apiConfig.baseUrl}users/me`, {
        method: "PATCH",
        headers: apiConfig.headers,
        body: JSON.stringify({
            name: newDateProfile.name,
            about: newDateProfile.about,
        })
    })
        .then(checkResponse);
};

// Добавление новой карточки POST
export const patchNewCard = (newPlace) => {
    return fetch(`${apiConfig.baseUrl}cards`, {
        method: "POST",
        headers: apiConfig.headers,
        body: JSON.stringify({
            name: newPlace.name,
            link: newPlace.link,
        })
    })
        .then(checkResponse);
};

// Удаление карточки DELETE
export const deletePlace = (idBtnDelete) => {
    return fetch(`${apiConfig.baseUrl}cards/${idBtnDelete}`, {
        method: "DELETE",
        headers: apiConfig.headers
    })
        .then(checkResponse);
};

// Постановка лайка PUT
export const putLike = (idImage) => {
    return fetch(`${apiConfig.baseUrl}cards/likes/${idImage}`, {
        method: "PUT",
        headers: apiConfig.headers
    })
        .then(checkResponse);
};

// Снятие лайка DELETE
export const deleteLike = (idImage) => {
    return fetch(`${apiConfig.baseUrl}cards/likes/${idImage}`, {
        method: "DELETE",
        headers: apiConfig.headers
    })
        .then(checkResponse);
};

// Обновление аватара пользователя PATCH
export const patchLinkAvatar = (linkAvatar) => {
    return fetch(`${apiConfig.baseUrl}users/me/avatar`, {
        method: "PATCH",
        headers: apiConfig.headers,
        body: JSON.stringify({
            avatar: linkAvatar
        })
    })
        .then(checkResponse);
};