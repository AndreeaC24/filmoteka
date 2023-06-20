document.addEventListener("DOMContentLoaded",()=>{let e=0,l=document.querySelector(".scroll"),n=()=>{0===window.scrollY&&clearInterval(e),window.scroll(0,window.scrollY-50)};l.addEventListener("click",()=>{e=setInterval(n,16.66)})});
//# sourceMappingURL=index.6caeb04d.js.map
