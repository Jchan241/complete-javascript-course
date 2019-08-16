// Global app controller
// import Search from './models/Search';
import Search from './models/Search';
import Recipe from './models/Recipe';
import { dom, renderLoader, clearLoader } from './views/base';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';

const state = {}

const controlSearch = async () => {
  const query = searchView.getInput();
  // console.log(query);

  if (query) {
    state.search = new Search(query);
    searchView.clearInput();
    searchView.clearResults();
    // console.log(dom.searchRes);
    renderLoader(dom.searchResult);


    try {
      await state.search.getResult();

      clearLoader();
      searchView.renderResults(state.search.result)
    } catch (error) {
      alert(error);
      clearLoader();
    }
    // console.log(state.search.result);
  }
}

dom.searchForm.addEventListener('submit', event => {
  event.preventDefault();
  controlSearch();
})


const controlRecipe = async () => {
  const id = window.location.hash.replace('#', '');

  if (id) {

    recipeView.clearRecipe

    renderLoader(dom.recipe);

    state.recipe = new Recipe(id);




    try {
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();

      state.recipe.calcTime();
      state.recipe.calcServings();

      clearLoader();

      recipeView.renderRecipe(state.recipe);
      // console.log(state.recipe);
    } catch (error) {
      alert(error);
    }
  }
}

dom.searchResultPages.addEventListener('click', event => {
  const btn = event.target.closest('.btn-inline');
  // console.log(btn);
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage)
    // console.log(goToPage);
  }
});

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));
