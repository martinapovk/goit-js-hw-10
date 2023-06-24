import { fetchBreeds, fetchCatByBreed } from './cat-api';

import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import './css/styles.css';
import Notiflix from 'notiflix';

const selectCatRef = document.querySelector('select.breed-select');
const catInfoRef = document.querySelector('.cat-info');
const loaderRef = document.querySelector('p.loader');

showLoader();

fetchBreeds()
  .then(data => fillSelect(data))
  //   .catch(() => errorRef.classList.add('error--show'))
  .catch(error => {
    Notiflix.Report.failure(
      'Error',
      'Oops! Something went wrong! Try reloading the page!',
      'OK'
    );
  })
  .finally(() => showLoader(false));

selectCatRef.addEventListener('change', e => {
  addMarkupToPage(e.target.value);
});

function fillSelect(data) {
  selectCatRef.innerHTML = makeOptionMarkup(data);

  showSelect();

  new SlimSelect({
    select: '.breed-select',
  });
}

function makeOptionMarkup(data) {
  return data
    .map(item => `<option value="${item.id}">${item.name}</option>`)
    .join('');
}

function createCatMarkup(url, name, description, temperament) {
  return `<img class = "cat_img" src="${url}" alt="${name}" width = "400"/>
      <div class = "all_description">
      <h2>${name}</h2>
      <p>${description}</p>
      <p>Temperament: ${temperament}</p>
      </div>`;
}

function addMarkupToPage(breedId) {
  catInfoRef.innerHTML = '';
  showLoader();
  fetchCatByBreed(breedId)
    .then(({ breeds: [cat], url }) => {
      catInfoRef.innerHTML = createCatMarkup(
        url,
        cat.name,
        cat.description,
        cat.temperament
      );
    })
    // .catch(() => {
    //   errorRef.classList.add('error--show');
    // })
    .catch(error => {
      Notiflix.Report.failure(
        'Error',
        'Oops! Something went wrong! Try reloading the page!',
        'OK'
      );
    })
    .finally(() => showLoader(false));
}

function showLoader(isShow = true) {
  loaderRef.style.display = isShow ? 'block' : 'none';
}

function showSelect(isShow = true) {
  selectCatRef.style.display = isShow ? 'inline-block' : 'none';
}
