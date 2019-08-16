import { dom } from './base';

export const getInput = () => dom.searchInput.value;

export const clearInput = () => {dom.searchInput.value = ''}

export const clearResults = () => {
  dom.searchResultList.innerHTML = '';
  dom.searchResultPages.innerHTML = '';
}

export const limitRecipeTitle = (title, limit = 17) => {
  const newTitle = [];
  if (title.length > limit) {
    title.split(' ').reduce((acc, cur) => {
      if (acc + cur.length <= limit) {
        newTitle.push(cur);
      }
      return acc + cur.length;
    }, 0);

    // return the result
    return `${newTitle.join(' ')} ...`;
  }
  return title;
};

const renderRecipe = recipe => {
  const markup = `
      <a class="results__link" href="#${recipe.recipe_id}">
        <figure class="results__fig">
          <img src="${recipe.image_url}" alt="${recipe.title}">
        </figure>
        <div class="results__data">
          <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
          <p class="results__author">${recipe.publisher}</p>
        </div>
      </a>
  `;
  dom.searchResultList.insertAdjacentHTML('beforeend', markup);
};

const createBtn = (page, type) => `
  <button class="btn-inline results__btn--${type}" data-goto="${type === 'prev' ? page - 1 : page + 1}">
  <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
      <svg class="search__icon">
          <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
      </svg>
  </button>
`;

const renderButtons = (page, numResults, pageResult) => {
  const pages = Math.ceil(numResults / pageResult);

  let button;
  if (page === 1 && pages > 1) {
    button = createBtn(page, 'next');
  } else if (page < pages) {
    button = `
      ${createBtn(page, 'next')}
      ${createBtn(page, 'prev')}
    `;
  } else if (page === pages && pages > 1) {
    button = createBtn(page, 'prev');
  }

  dom.searchResultPages.insertAdjacentHTML('afterbegin', button)
};

export const renderResults = (recipes, page = 1, pageResult = 10) => {
  const start = (page -1) * pageResult;
  const end = page * pageResult;

  recipes.slice(start, end).forEach(renderRecipe);

  renderButtons(page, recipes.length, pageResult);
};
