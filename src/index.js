import './sass/main.scss';
import { notice } from '@pnotify/core';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import NewsApiService from './js/fetchApi';
import LoadMoreBtn from './js/loadMoreBtn';
const refs = {
  form: document.querySelector('#search-form'),
  input: document.querySelector('.input'),
  container: document.querySelector('.container'),
  //   more: document.querySelector('[data-action="load-more"]')
};

const newsApiService = new NewsApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

const gitRepoHandlerSubmit = e => {
  e.preventDefault();
  const form = e.currentTarget;
  newsApiService.query = form.elements.query.value;

  if (newsApiService.query === '') {
    loadMoreBtn.hide();
    error({
      text: 'Please enter something!',
      delay: 2000,
    });
  }
  clearContainer();
  fetchLink();
  loadMoreBtn.show();
  newsApiService.resetPage();
  form.reset();
};

function createGitRepo({ clone_url, name }) {
  const link = `<a href ='${clone_url}' target="blank">
    <p>${name}</p>
  </a>
`;
  refs.container.insertAdjacentHTML('beforeend', link);
}

function renderGitRepositories(arr) {
  arr.forEach(el => createGitRepo(el));
}

function clearContainer() {
  refs.container.innerHTML = '';
}
function fetchLink() {
  loadMoreBtn.disable();

  newsApiService
    .fetchRepo()
    .then(items => {
      renderGitRepositories(items);

      loadMoreBtn.enable();

      if (hits.length === 0) {
        loadMoreBtn.hide();
        noFound();
      }
      onNotice();
    })
    .catch(onError);
}
function noFound() {
  error({
    text: 'No matches found. Please enter another query!',
    delay: 2500,
  });
}

function onNotice() {
  notice({
    title: `Loading... Please wait!`,
    delay: 500,
  });
}
function onError(Error) {
  Error;
}
function scrollPage() {
  try {
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        left: 0,
        behavior: 'smooth',
      });
    }, 1000);
    fetchLink();
  } catch (error) {
    console.log(error);
  }
}
refs.form.addEventListener('submit', gitRepoHandlerSubmit);
loadMoreBtn.refs.button.addEventListener('click', scrollPage);
