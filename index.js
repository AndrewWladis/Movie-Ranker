const params = new URLSearchParams(window.location.search);
const apiKey = 'k_gudabspt';
const movie1h1 = document.getElementById('movie1h1');
const movie2h1 = document.getElementById('movie2h1');
const movie1p = document.getElementById('movie1rating');
const movie2p = document.getElementById('movie2rating');
const bodyText = document.getElementById('bodyText');
const year1 = document.getElementById('year1');
const year2 = document.getElementById('year2');
const spinner = document.getElementById('loading');

let movie1rating;
let movie2rating;
let apiJSONResponse1;
let apiJSONResponse2;
let inTheatersRes;

let movie1 = params.get('movie1');
let movie2 = params.get('movie2');

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

const getJSON = async function load(url) {
    const response = await fetch(url);
    return response.json();
}

const start = async function(url) {
    // get movie id
    apiJSONResponse1  = await getJSON(`https://imdb-api.com/en/API/Search/${apiKey}/${movie1}`);
    apiJSONResponse2  = await getJSON(`https://imdb-api.com/en/API/Search/${apiKey}/${movie2}`);

    const movie1id = apiJSONResponse1.results[0].id;
    const movie2id = apiJSONResponse2.results[0].id;
    
    // get title
    const movie1Name = apiJSONResponse1.results[0].title;
    const movie2Name = apiJSONResponse2.results[0].title;

    movie1h1.innerHTML = movie1Name;
    movie2h1.innerHTML = movie2Name;

    // get rotten tomatoes
    movie1ratingres  = await getJSON(`https://imdb-api.com/en/API/Ratings/${apiKey}/${movie1id}`);
    movie2ratingres  = await getJSON(`https://imdb-api.com/en/API/Ratings/${apiKey}/${movie2id}`);
    

    const movie1ratingRT = movie1ratingres.rottenTomatoes;
    const movie2ratingRT = movie2ratingres.rottenTomatoes;

    // get imdb
    const movie1ratingIMDB = movie1ratingres.imDb * 10;
    const movie2ratingIMDB = movie2ratingres.imDb * 10;

    // get metacritic
    const movie1ratingMC = movie1ratingres.metacritic;
    const movie2ratingMC = movie2ratingres.metacritic;

    //get year
    const year1res = apiJSONResponse1.results[0].description;
    const year2res = apiJSONResponse2.results[0].description;

    year1.innerHTML = year1res;
    year2.innerHTML = year2res;

    // score
    let score1 = Math.round((+movie1ratingRT + +movie1ratingIMDB + +movie1ratingMC) / 3);
    let score2 = Math.round((+movie2ratingRT + +movie2ratingIMDB + +movie2ratingMC) / 3);
    
    if (movie1Name == 'Monsters University') {
        score1 = 100;
    } else if (movie2Name == 'Monsters University') {
        score2 = 100;
    }
    
    movie1p.innerHTML = score1;
    movie2p.innerHTML = score2;

    if (score1 > score2) {
        movie1p.style.color = "#49FF33"
        movie2p.style.color = "#FE4646"
        bodyText.innerHTML = `${movie1Name} is better than ${movie2Name}`;
        bodyText.style.color = "#FFFFFF"
    } else if (score1 < score2) {
        movie2p.style.color = "#49FF33"
        movie1p.style.color = "#FE4646"
        bodyText.innerHTML = `${movie2Name} is better than ${movie1Name}`;
        bodyText.style.color = "#FFFFFF"
    } else if (score1 === score2) {
        movie1p.style.color = "#EEFE46"
        movie2p.style.color = "#EEFE46"
        bodyText.innerHTML = `${movie1Name} is as good as ${movie2Name}`;
        bodyText.style.color = "#EEFE46"
    };
    console.log(movie1ratingRT, movie1ratingIMDB, movie1ratingMC)
    spinner.remove()
}

start()