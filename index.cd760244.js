document.addEventListener("DOMContentLoaded",()=>{let e=0,l=document.querySelector(".scroll"),n=()=>{0===window.scrollY&&clearInterval(e),window.scroll(0,window.scrollY-50)};l.addEventListener("click",()=>{e=setInterval(n,6.66)})});
//# sourceMappingURL=index.cd760244.js.map
