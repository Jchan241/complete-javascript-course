// const box6 = {
//   color: 'green',
//   position: 1,
//   clickMe: function() {

//     document.querySelector('.green').addEventListener('click', () => {
//       const str = `This is box number ${this.position} and it is ${this.color}`
//       alert(str);
//     })
//   }
// }

// box6.clickMe();


/////////////////////////////////
// CODING CHALLENGE

/*

Suppose that you're working in a small town administration, and you're in charge of two town elements:
1. Parks
2. Streets

It's a very small town, so right now there are only 3 parks and 4 streets. All parks and streets have a name and a build year.

At an end-of-year meeting, your boss wants a final report with the following:
1. Tree density of each park in the town (forumla: number of trees/park area)
***2. Average age of each town's park (forumla: sum of all ages/number of parks)
***3. The name of the park that has more than 1000 trees
4. Total and average length of the town's streets
5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal

All the report data should be printed to the console.

HINT: Use some of the ES6 features: classes, subclasses, template strings, default parameters, maps, arrow functions, destructuring, etc.

*/

class Element {
  constructor (name, buildYear) {
    this.name = name;
    this.buildYear = buildYear;
  }
}

class Park extends Element {
  constructor (name, buildYear, area, trees) {
    super(name, buildYear);
    this.area = area;
    this.trees = trees;
  }

  treeDensity() {
    return this.trees / this.area;
  }
}

class Street extends Element {
  constructor (name, buildYear, length, size) {
    super(name, buildYear);
    this.length = length;
    this.size = size;
  }

  classifyStreet() {
    const classification = new Map();
    classification.set(1, 'tiny');
    classification.set(2, 'small');
    classification.set(3, 'normal');
    classification.set(4, 'big');
    classification.set(5, 'huge');

    console.log(`${this.name} is ${classification.get(this.size)}`)
  };
}

const allParks = [new Park('Green Park', 1987, 0.2, 215),
                 new Park('National Park', 1894, 2.9, 3541),
                 new Park('Oak Park', 1953, 0.4, 949)];

const allStreets = [new Street('Ocean Avenue', 1999, 1.1, 4),
                   new Street('Evergreen Street', 2008, 2.7, 2),
                   new Street('4th Street', 2015, 0.8),
                   new Street('Sunset Boulevard', 1982, 2.5, 5)];

function avgAge(streets, parks) {
  let ages = [];
  let allAges = 0;

  streets.forEach((street) => {
    ages.push(new Date().getFullYear() - street.buildYear);
  });

  ages.forEach((age) => allAges += age);

  console.log(`Average age of each town's park is ${allAges / parks.length}`);
};

function forrest(parks) {
  parks.forEach((park) => {
    if (park.trees > 1000) {
      console.log(`parks with more than 1000 trees is ${park.name}`);
    }
  });
  parks.forEach((park) => console.log(`${park.name}'s tree density is ${park.treeDensity()}`));
};

function streetStats(streets) {
    let totalLength = 0;

    streets.forEach((street) => totalLength += street.length);
    console.log(`total length of the town's streets is ${totalLength}`);
    console.log(`Average length of the streets ${totalLength / streets.length}`);
}


function report(streets, parks) {
  avgAge(streets, parks);
  forrest(parks);
  streetStats(streets);
}

report(allStreets, allParks);







