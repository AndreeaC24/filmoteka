var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},i={},l=e.parcelRequired76b;null==l&&((l=function(e){if(e in t)return t[e].exports;if(e in i){var l=i[e];delete i[e];var a={id:e,exports:{}};return t[e]=a,l.call(a.exports,a,a.exports),a.exports}var n=Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(e,t){i[e]=t},e.parcelRequired76b=l);var a=l("bTcpz");function n(e){let{cover:t,title:i,genre:l,year:a,vote_average:n}=e,d="";n<5?d="red-vote":n>5&&(d="green-vote");let o=`
      <div class="movie__gallery__items ${d}">
      <ul class="movie__gallery__details">
      <li class="movie__gallery__details--img">
          <img src="${t}" alt="${i}" />
        </li> 
        <li class="movie__gallery__details--title">${i}</li>
        <li class="movie__gallery__details--genres">${l}</li>
        <li class="movie__gallery__details--year">${a}</li> 
        </ul>
        <span class="movie__gallery__vote">${n}</span>
      </div>
  `;return o}var d=l("lQVoc"),o=l("gjiCh"),a=l("bTcpz");const s=document.getElementById("savedMoviesList"),r=document.getElementById("queueMoviesList"),c=document.querySelector(".header__menu__list__item.header__navigation__menu--selected"),_=document.querySelector(".header__menu__list__item:not(.header__navigation__menu--selected)");c.addEventListener("click",()=>{s.style.display="flex",r.style.display="none",c.classList.add("header__navigation__menu--selected"),_.classList.remove("header__navigation__menu--selected")}),_.addEventListener("click",()=>{s.style.display="none",r.style.display="flex",_.classList.add("header__navigation__menu--selected"),c.classList.remove("header__navigation__menu--selected")});const u=async()=>{try{(0,a.initializeModal)(),function(){let e=document.getElementById("savedMoviesList"),t=JSON.parse(localStorage.getItem("savedData"));t&&Array.isArray(t)&&t.forEach(t=>{if(t.watched){let i=document.createElement("li");i.classList.add("save-movie__items"),i.setAttribute("data-id",t.id);let l=n(t);i.innerHTML=l,i.addEventListener("click",()=>{(0,a.openModal)(t.id),(0,a.initializeModal)()}),e.appendChild(i)}})}(),function(){let e=document.getElementById("queueMoviesList"),t=JSON.parse(localStorage.getItem("savedData"));t&&Array.isArray(t)&&t.forEach(t=>{if(t.queue){let i=document.createElement("li");i.classList.add("queue-movie__items"),i.setAttribute("data-id",t.id);let l=n(t);i.innerHTML=l,i.addEventListener("click",()=>{(0,a.openModal)(t.id),(0,a.initializeModal)()}),e.appendChild(i)}})}(),(0,o.showLoader)(),(0,o.hideLoader)();let e=document.querySelector(".library__container");0===s.childElementCount&&0===r.childElementCount?e.style.display="flex":e.style.display="none",document.addEventListener("DOMContentLoaded",function(){window.location.pathname.includes("library.html")&&window.innerWidth>=768&&(document.querySelector(".footer__container").style.bottom="0")})}catch(e){console.error("Error",e)}};(0,d.getGalleryElement)(),u();
//# sourceMappingURL=library.ef5ae727.js.map