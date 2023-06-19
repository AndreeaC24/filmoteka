  document.addEventListener('DOMContentLoaded', function() {
    var toggleLink = document.getElementById("toggleLink");
    var hiddenDiv = document.getElementById("hiddenDiv");
  
    toggleLink.addEventListener("click", function(event) {
      event.preventDefault(); // Previne acțiunea implicită a link-ului
  
      if (hiddenDiv.style.display === "flex") {
        hiddenDiv.style.display = "none";
      } else {
        hiddenDiv.style.display = "flex";
        hiddenDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
  
  