import axios from 'axios';
import { key } from '../config'

export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    try {
      const result = await axios(`https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);
      // console.log(result);
      this.title = result.data.recipe.title;
      this.author = result.data.recipe.publisher;
      this.img = result.data.recipe.image_url;
      this.url = result.data.recipe.source_url;
      this.ingredients = result.data.recipe.ingredients;
    } catch (error) {
      alert(error);
    }
  }

  calcTime() {
    const numIngredients =  this.ingredients.length;
    const periods = Math.ceil(numIngredients / 3);
    this.time = periods * 15;
  }

  calcServings() {
    this.servings = 4;
  }

  parseIngredients() {
    const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'cups', 'pounds']
    const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound']

    const newIngredients = this.ingredients.map(ing => {
      let ingredient = ing.toLowerCase();
      unitsLong.forEach((unit, index) => {
        ingredient = ingredient.replace(unit, unitsShort[index])
      });

      ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');


      const arrIng = ingredient.split(' ');
      const unitIndex = arrIng.findIndex(element => unitsShort.includes(element));

      let objIng;
      if (unitIndex > -1) {
        // there is a unit
        const arrCount = arrIng.slice(0, unitIndex);
        let count;
        if (arrCount.length === 1) {
          count = eval(arrIng[0].replace('-', '+'));
        } else {
          count = eval(arrIng.slice(0, unitIndex).join('+'));
        }

        objIng = {
          count,
          unit: arrIng[unitIndex],
          ingredient: arrIng.slice(unitIndex + 1).join(' ')
        };

      } else if (parseInt(arrIng[0], 10)) {
        // no unit, 1st element is number
        objIng = {
          count: parseInt(arrIng[0], 10),
          unit: '',
          ingredient: arrIng.slice(1).join(' ')
        }

      } else if (unitIndex === -1) {
        // no unit and no number
        objIng = {
          count: 1,
          unit: '',
          ingredient
        }
      }

      return objIng;
    });
    this.ingredients = newIngredients
  }
}
