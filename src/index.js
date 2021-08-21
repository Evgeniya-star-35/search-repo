import './sass/main.scss';
import axios from 'axios';
import LoadMoreBtn from './js/loadMoreBtn';
const refs = {
  form: document.querySelector('#search-form'),
  input: document.querySelector('.input'),
  container: document.querySelector('.container'),
//   more: document.querySelector('[data-action="load-more"]')
}

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

let currentPage = 1



const gitRepoHandlerSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
  const value = refs.input.value;
  axios.get(`https://api.github.com/search/repositories?q=${value}&client_id=67684cabc84f94f0938e&client_secret=782ea639550c1b5d986bdd8129813652ed04c92c&page=${currentPage}`)
      .then(result => {
        //   console.log(result.data.items);
          clearContainer();
          loadMoreBtn.disable();
          loadMoreBtn.show();
          renderGitRepositories(result.data.items);
          form.reset();
          loadMoreBtn.enable();
      })
  .then(() => currentPage++)
  .catch((err) => console.log(err))
}

function createGitRepo ({clone_url,name}) {
    const link = `<a href ='${clone_url}' target="blank">
    <p>${name}</p>
  </a>
`
refs.container.insertAdjacentHTML('beforeend', link)
}



function renderGitRepositories(arr) {
    arr.forEach(el => createGitRepo(el));
}

function clearContainer () {
    refs.container.innerHTML = "";
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
    renderGitRepositories();
  } catch (error) {
    console.log(error);
  }
}
refs.form.addEventListener('submit', gitRepoHandlerSubmit);
loadMoreBtn.refs.button.addEventListener('click', scrollPage);















