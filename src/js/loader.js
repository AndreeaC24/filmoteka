export function showLoader() {
    var loader = document.getElementById("loader");
    if (loader) {
      loader.style.display = "flex"; 
    }
  }
  
export  function hideLoader() {
    var loader = document.getElementById("loader");
    if (loader) {
      setTimeout(function() {
        loader.style.display = "none";
      }, 1000);  
    }
  }
 
  
  