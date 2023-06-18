const checkbox = document.getElementById("checkbox");

// Verifica daca e salvat in  LS
const isDark = localStorage.getItem("darkMode") === "true";
if (isDark) {
  document.body.classList.add("dark");
  checkbox.checked = true;
}
 
checkbox.addEventListener("change", () => {
  document.body.classList.toggle("dark");
  const isDarkMode = document.body.classList.contains("dark");
  
  // Salvează setarea in LS
  localStorage.setItem("darkMode", isDarkMode.toString());
});
