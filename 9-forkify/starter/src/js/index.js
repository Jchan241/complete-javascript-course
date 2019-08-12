// Global app controller
// import Search from './models/Search';
import Search from './models/Search'

const state = {}

const search = new Search('chicken');
console.log(search);
search.getResult();
