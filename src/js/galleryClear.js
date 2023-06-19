const clearGallery = () => {
  const galleryElement = document.querySelector('.gallery');
  if (galleryElement) {
    galleryElement.innerHTML = '';
  }
};

export { clearGallery };
