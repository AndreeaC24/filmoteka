const clearGallery = () => {
  const galleryElement = document.querySelector('.movie__gallery');
  if (galleryElement) {
    galleryElement.innerHTML = '';
  }
};
const resetPage = () => {
  clearGallery();
  document.getElementById('pagination').innerHTML = '';
};

export { clearGallery, resetPage };
