(()=>{"use strict";function e(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",n)}function t(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",n)}function n(e){"Escape"===e.key&&t(document.querySelector(".popup_is-opened"))}function o(e,t,n,o){var r=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),c=r.querySelector(".card__image"),a=r.querySelector(".card__title");return c.src=e.link,c.alt=e.name,a.textContent=e.name,r.querySelector(".card__delete-button").addEventListener("click",t),r.querySelector(".card__like-button").addEventListener("click",n),c.addEventListener("click",o),r}function r(e){e.target.closest(".places__item").remove()}function c(e){e.target.classList.toggle("card__like-button_is-active")}document.querySelectorAll(".popup").forEach((function(e){e.classList.add("popup_is-animated"),e.addEventListener("mousedown",(function(n){n.target.classList.contains("popup__close")&&t(e),n.target===e&&t(n.target)}))}));var a=document.querySelector(".places__list"),s=document.querySelector(".popup_type_edit"),d=document.querySelector(".popup_type_new-card"),l=document.querySelector(".popup_type_image"),p=l.querySelector(".popup__image"),i=l.querySelector(".popup__caption"),u=document.querySelector(".profile__title"),m=document.querySelector(".profile__description"),_=document.querySelector(".profile__edit-button"),y=document.querySelector(".profile__add-button"),f=document.forms.editProfile,v=document.forms.newPlace;function k(t){e(l),p.src=t.target.src,p.alt=t.target.alt,i.textContent=t.target.alt}function g(e){e.preventDefault(),u.textContent=f.elements.name.value,m.textContent=f.elements.description.value,t(s)}function q(e){e.preventDefault();var n={name:v.elements.placeName.value,link:v.elements.link.value};t(d),a.prepend(o(n,r,c,k))}_.addEventListener("click",(function(){e(s),f.elements.name.focus(),f.elements.name.value=u.textContent,f.elements.description.value=m.textContent,s.addEventListener("submit",g)})),y.addEventListener("click",(function(){e(d),v.reset(),v.elements.placeName.focus(),d.addEventListener("submit",q)})),[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(e){a.append(o(e,r,c,k))}))})();