import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
const API_KEY = "48286639-c5b13cd121e9f124dcf0b461d";
const URL = `https://pixabay.com/api/?key=${API_KEY}`;
    
    
let lightbox;
    
function showLoader() {
    document.getElementById('loaderOverlay').classList.add('active');
    document.getElementById('loader').classList.remove('loader-hidden');
}
    
function hideLoader() {
    document.getElementById('loaderOverlay').classList.remove('active');
    document.getElementById('loader').classList.add('loader-hidden');
}
    
document.querySelector('.searchForm').addEventListener('submit', (e) => {
    e.preventDefault();
    showLoader();
    
    let gallery = document.querySelector('.gallery');
        gallery.innerHTML = '';
    let searchParam = document.querySelector('.search-input').value;
    let params = new URLSearchParams({
    q: searchParam,
        orientation: 'horizontal',
            safesearch: true,
        image_type: "photo",
               per_page: 40
    });
      
    fetch(`${URL}&${params}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network Error: ' + response.statusText);
          }
          return response.json();
        })
        .then(data => {
        
          if (data.hits.length === 0) {
            iziToast.warning({
              message: "Sorry, there are no images matching your search query. Please try again!",
              position: "topRight"
            });
            return;
          }
          
          
          gallery.innerHTML = data.hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => 
            `<li class="gallery-item">
              <a class="gallery-link" href="${largeImageURL}">
                <img
                  class="gallery-image"
                  src="${webformatURL}"
                  alt="${tags}"
                  title="${tags}"
                />
                <ul class="img-information">
                  <li>
                    <span class="img-information-title">Likes</span>
                    <span class="img-information-content">${likes}</span>
                  </li>
                  <li>
                    <span class="img-information-title">View</span>
                    <span class="img-information-content">${views}</span>
                  </li>
                  <li>
                    <span class="img-information-title">Comments</span>
                    <span class="img-information-content">${comments}</span>
                  </li>
                  <li>
                    <span class="img-information-title">Downloads</span>
                    <span class="img-information-content">${downloads}</span>
                  </li>
                </ul>
              </a>
            </li>`
          ).join('');
          
          if (lightbox) {
            lightbox.destroy();
          }
          
          lightbox = new SimpleLightbox('.gallery a', {
            captions: true,
            captionSelector: 'img',
            captionType: 'attr',
            captionsData: 'title',
            captionPosition: 'bottom',
            captionDelay: 250,
            closeText: '×',
            navText: ['&larr;', '&rarr;'],
            overlayOpacity: 0.9,
            spinner: true,
            alertError: false
          });
          
          lightbox.refresh();
        })
        .catch(error => {
          iziToast.error({
            title: 'Hata',
            message: `Something went wrong: ${error.message}`,
            position: 'topRight'
          });
          console.error('Error:', error);
        })
        .finally(() => {
          hideLoader();
        });
    });