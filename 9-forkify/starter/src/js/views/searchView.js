import { dom } from './base';

export const getInput = () => dom.searchInput.value;

export const clearInput = () => {dom.searchInput.value = ''}

export const clearResults = () => {dom.searchResultList.innerHTML = ''}

const renderRecipe = recipe => {
  const markup = `
    <li>
      <a class="results__link" href="#${recipe.recipe_id}">
        <figure class="results__fig">
          <img src="${recipe.image_url}" alt="${recipe.title}">
        </figure>
        <div class="results__data">
          <h4 class="results__name">${recipe.title}</h4>
          <p class="results__author">${recipe.publisher}</p>
        </div>
      </a>
    </li>
  `;
  dom.searchResultList.insertAdjacentHTML('beforeend', markup);
}

export const renderResults = recipes => {
  recipes.forEach(renderRecipe)
}
