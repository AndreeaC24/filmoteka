const e=document.getElementById("checkbox"),t="true"===localStorage.getItem("darkMode");t&&(document.body.classList.add("dark"),e.checked=!0),e.addEventListener("change",()=>{document.body.classList.toggle("dark");let e=document.body.classList.contains("dark");localStorage.setItem("darkMode",e.toString())});
//# sourceMappingURL=index.ea3ee9a9.js.map
