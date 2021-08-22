import axios from 'axios';
export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchRepo() {
    return fetch(
      `https://api.github.com/search/repositories?q=${this.searchQuery}&client_id=67684cabc84f94f0938e&client_secret=782ea639550c1b5d986bdd8129813652ed04c92c&page=${this.page}`,
    )
      .then(response => response.json())
      .then(({ items }) => {
        this.incrementPage();
        console.log(items);
        return items;
      });
  }
  // return axios
  //   .get(
  //     `https://api.github.com/search/repositories?q=${this.searchQuery}&client_id=67684cabc84f94f0938e&client_secret=782ea639550c1b5d986bdd8129813652ed04c92c&page=${this.page}`,
  //   )
  //   .then(({ items }) => {
  //     this.incrementPage();
  //     console.log(items);
  //     return items;
  //   })
  //   .catch(error => console.log(error));

  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
}
