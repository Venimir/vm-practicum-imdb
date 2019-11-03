$(document).ready(function(){
  $('.nav-container').load('./navigation.html');
});

function getImdbData() {

let apiKey = 'apikey=de0b8436';
// let movieTitle = 't=' + $('#movieTitle').val();
// let movieYear = 'y=' + $('#movieYear').val();
let movieTitle = '&s=Game of Thrones';
let movieYear = 'y=';
// let isTvSeries = $('#isTvSeries').prop();

let urlMovies = 'http://www.omdbapi.com/?'+ apiKey + movieTitle;
console.log(urlMovies);


$.getJSON(urlMovies, function(response) {
  console.log(response);
});
}