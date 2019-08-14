import axios from 'axios';

export default class Search {
  constructor(query) {
    this.query = query
  }

  async getResult() {
    const key = '48e32e2ca002797f6c524537c6930a86';
    try {
      const result = await axios(`https://www.food2fork.com/api/search?key=${key}&${this.query}`);
      this.result = result.data.recipes;
      console.log(result);
    } catch (error) {
      alert(error);
    }
  }
}

