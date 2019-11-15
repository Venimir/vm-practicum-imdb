$(function () {

  $('ul.navbar-nav li').on('click', changeFilters);

  $('input[type="text"]').focus(function () {
    this.value = "";
  });

  $('input[type="text"]').keypress(function (e) {
    if (e.which == 13) {
      getImdbData();
      return false;
    }
  });

  $('#additionalOptions').on('change', function () {
    console.log('sdfsdfds');
    
  });

  $(document).on('click ', '#search-button', getImdbData);

  populateSelectYearsRaiting(true);
  populateSelectYearsRaiting();
  populateFilterGenres();
});
// END Document ready

// END Document Ready

var apiKeyMovieDb = 'api_key=2ec82d3fc6c5da1102cd5979cf39b152';

function getImdbData() {
  let titleMovie = $('#movieTitle').val();
  let arrayOfStrings = titleMovie.split(' ');
  let title = arrayOfStrings.join('+');
  let movieTitle = '&query=' + title;
  let movieYear = '&y=' + $('#movieYear').val();
  let urlmoviedb = 'https://api.themoviedb.org/3/search/movie?' + apiKeyMovieDb + movieTitle;
  console.log(urlmoviedb);

  $('.posters-container ul.view-as').html('');

  $.getJSON(urlmoviedb, function (response) {
    if (response) {
      let data = response.results;
      console.log(data);

      $.each(data, function (index, object) {
        if (object.poster_path) {
          fillTheHtml(object);
        }
      });
    }
  });
}

function fillTheHtml(object) {

  let url = 'https://api.themoviedb.org/3/movie/' + object.id + '?' + apiKeyMovieDb;

  $.getJSON(url, function (response) {
    let imdbId = '';
    if (response) {
      imdbId = response.imdb_id;
    }
    let handledMovieTitle = handleMovieTitle(object.title, 42);
    let handleMovieOverview = handleMovieTitle(object.overview, 280);
    let linkToImdbSite = imdbId ? 'https://www.imdb.com/title/' + imdbId : '#';
    let movieContainer = '<li>' +
      '<div class="wrapper">' +
      '<div class="container">' +
      '<div class="top">' +
      '<a href="' + linkToImdbSite + '" target="_blank">' +
      '<img src="http://image.tmdb.org/t/p/w185' + object.poster_path + '" alt="">' +
      '</a>' +
      '</div>' +
      '<div class="bottom">' +
      '<div class="details"  title="' + handledMovieTitle + '">' +
      '<h5 class="title-movie">' + handledMovieTitle + '</h5>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '<div class="inside">' +
      '<div class="icon"><i class="fa fa-info-circle fa-2x"></i></div>' +
      '<div class="contents">' +
      '<table>' +
      '<tr class="tr-head">' +
      '<th>Year</th>' +
      '<th>Imdb Raiting</th>' +
      '</tr>' +
      '<tr>' +
      '<td>' + object.release_date + '</td>' +
      '<td>' +
      '<div class="imdbRatingStyle">' +
      '<span>' +
      '<img src="https://ia.media-imdb.com/images/G/01/imdb/plugins/rating/images/imdb_38x18.png" alt=""/>' +
      '<span class="rating">' + object.vote_average + '<span class="ofTen">/10</span></span>' +
      '</span>' +
      '</div>' +
      '</td>' +
      '</tr>' +
      '<tr class="tr-head">' +
      '<th>Something</th>' +
      '<th>Something</th>' +
      '</tr>' +
      '<tr>' +
      '<td>200mm</td>' +
      '<td>200mm</td>' +
      '</tr>' +
      '<tr class="tr-head">' +
      '<th colspan="2">Movie Overview</th>' +
      '</tr>' +
      '<tr class="overview" title="' + handleMovieOverview + '">' +
      '<td class="overview" colspan="2">' + handleMovieOverview + '</td>' +
      '</tr>' +
      '</table>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</li>';
    $('.posters-container ul.view-as').append(movieContainer);
  });
}

function changeFilters() {
  $(this).parent().find('li.active').removeClass('active');
  $(this).addClass('active');

  if ($(this).attr('id') == "tv-series") {
    $('#movie-filters').addClass('hidden');
    $('#tv-series-filters').removeClass('hidden');
  } else {
    $('#tv-series-filters').addClass('hidden');
    $('#movie-filters').removeClass('hidden');
  }
}

function populateSelectYearsRaiting(years = false) {

  let html = '';
  let iStart = ''
  let iEnd = '';
  let selectId = '';

  if (years) {
    iStart = new Date().getFullYear();
    iEnd = 1960
    selectId = '#filter-year'
  } else {
    iStart = 10;
    iEnd = 1
    selectId = '#filter-imdbRaiting';
  }

  for (var i = iStart; i >= iEnd; i--) {
    html += '<option class="dropdown-item" value="' + i + '">' + i + '</option>';
  }

  $(selectId).html(html);
}

function populateFilterGenres() {
  let html = '';
  let url = 'https://api.themoviedb.org/3/genre/movie/list?api_key=2ec82d3fc6c5da1102cd5979cf39b152&language=en-US';
  $.getJSON(url, (response) => {
    let data = response.genres;
    data.forEach((object, index) => {
      html += '<option class="dropdown-item" value="' + object.id + '">' + object.name + '</option>';
    });
    $('#filter-genre').html(html);
  });
}
function sortBy() {
  console.log('sdfsdfds');
  
  let elementId = $(this).attr('id');
  let selectedOPtion = $(this).val();
  console.log(selectedOPtion, elementId);
  
}










