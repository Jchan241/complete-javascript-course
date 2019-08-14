// Global app controller
// import Search from './models/Search';
import Search from './models/Search';
import { dom } from './views/base';
import * as searchView from './views/searchView';

const state = {}

const controlSearch = async () => {
  const query = searchView.getInput();
  // console.log(query);

  if (query) {
    state.search = new Search(query);
    searchView.clearInput();
    searchView.clearResults();

    await state.search.getResult();

    // console.log(state.search.result);

    searchView.renderResults(state.search.result)
  }
}


dom.searchForm.addEventListener('submit', event => {
  event.preventDefault();
  controlSearch();
})

// console.log(search);
// search.getResult();
