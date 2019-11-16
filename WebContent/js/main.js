$(function () {

  // $('.selectpicker').selectpicker('refresh');

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

  $('.filter-year').on('change', sortBy);

  $('.filter-imdbRaiting').on('change', sortBy);

  $('.selectpicker').on('change', sortByGenres);

  $(document).on('click ', '#search-button', getImdbData);

  populateSelectYearsRaiting(true);
  populateSelectYearsRaiting();
  populateFilterGenres();
});
// END Document Ready

var apiKeyMovieDb = 'api_key=2ec82d3fc6c5da1102cd5979cf39b152';

function getImdbData() {
  let titleMovie = $('#movieTitle').val();
  let titleTv = $('#tvSerieTitle').val();
  let temporaryTitle = titleMovie ? titleMovie : titleTv;
  let arrayOfStrings = temporaryTitle.split(' ');
  let stringTitle = arrayOfStrings.join('+');
  let handledTitle = '&query=' + stringTitle;
  let tvSeasonNumber = $('#tvSerieSeason').val();
  let linkType = getLinkType(true);
  let pageResults = linkType == 'tv?' && tvSeasonNumber ? '&page=1' : '';

  let urlmoviedb = 'https://api.themoviedb.org/3/search/' + linkType + apiKeyMovieDb + handledTitle + pageResults;
  console.log(urlmoviedb);

  $('.posters-container ul.view-as').html('');

  $.getJSON(urlmoviedb, function (response) {
    if (response) {
      let data = response.results;
      console.log(data[0]);

      $.each(data, function (index, object) {
        if (object.poster_path) {
          fillTheHtml(object);
        }
      });
    }
  });
}

function getDataById(object) {
  let linkType = getLinkType();
  let url = 'https://api.themoviedb.org/3/' + linkType + '/' + object.id + '?' + apiKeyMovieDb;
  $.getJSON(url, function(response) {
    return response;
  });
}

function fillTheHtml(object) {
  // let linkType = getLinkType();
  // let url = 'https://api.themoviedb.org/3/' + linkType + '/' + object.id + '?' + apiKeyMovieDb;
  let title = object.title ? object.title : object.name;
  let year = object.release_date ? object.release_date : object.first_air_date;

  // $.getJSON(url, function (response) {
    let imdbId = '';
    let response = getDataById(object)
    if (response) {
      imdbId = response.imdb_id;
    }

    let handledMovieTitle = handleMovieTitle(title, 42);
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
      '<td>' + year + '</td>' +
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
  // });
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

function handleMovieTitle(title, maxLength) {
  let max = maxLength;
  let tot, str;

  str = typeof title !== "undefined" ? title : '';
  tot = str.length;
  str = (tot <= max) ? str : str.substring(0, (max + 1)) + "...";

  return str;
}

function populateSelectYearsRaiting(years = false) {

  let html = '<option selected>Choose...</option>';
  let iStart = ''
  let iEnd = '';
  let selectClass = '';

  if (years) {
    iStart = new Date().getFullYear();
    iEnd = 1960
    selectClass = '.filter-year'
  } else {
    iStart = 10;
    iEnd = 1
    selectClass = '.filter-imdbRaiting';
  }

  for (var i = iStart; i >= iEnd; i--) {
    html += '<option value="' + i + '">' + i + '</option><br>';
  }

  $(selectClass).html(html);
}

function populateFilterGenres() {
  let html = '';
  let url = 'https://api.themoviedb.org/3/genre/movie/list?api_key=2ec82d3fc6c5da1102cd5979cf39b152&language=en-US';
  $.getJSON(url, (response) => {
    let data = response.genres;
    data.forEach((object, index) => {
      html += '<option value="' + object.id + '">' + object.name + '</option>';
    });

    $('.selectpicker').html(html);

  });
}

function sortByGenres() {
  let selected = [];

  $(this).find("option:selected").each(function (key, value) {
    selected.push(value.innerHTML);
  });
  console.log(selected);

  let url = getUrl();

  return url;
}

function sortBy() {

  let selectedOPtion = $(this).val();
  let filter = '';

  if ($(this).hasClass('filter-year')) {
    filter = 'year';
  } else if ($(this).hasClass('filter-imdbRaiting')) {
    filter = 'raiting';
  } else {
    filter = 'genres'
  }

  let url = getUrl(selectedOPtion, filter);

  console.log(url);
  console.log(selectedOPtion);

  // $.getJSON(url, function(response) {

  // });

}

function getLinkType(symbol = false) {
  let activeTab = $('.navbar-nav').find('li.active');
  let filterType = activeTab.attr('id');
  let questionSymbol = symbol ? '?' : '';
  let linkType = filterType == 'movies' ? 'movie' + questionSymbol : 'tv' + questionSymbol;

  return linkType;
}

function getUrl(selectedOptions, filter) {
  let url = '';

  let linkType = getLinkType(true);

  switch (filter) {
    case 'year':
      url = 'https://api.themoviedb.org/3/discover/' + linkType + apiKeyMovieDb + '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=50&primary_release_year=' + selectedOPtion;
      break;
    case 'raiting':
      url = 'https://api.themoviedb.org/3/discover/' + linkType + apiKeyMovieDb + '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=50&vote_average.lte=' + selectedOPtion;
      break;
    case 'genres':
      url = 'https://api.themoviedb.org/3/discover/' + linkType + apiKeyMovieDb + '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=50&with_genres=' + selectedOptions;
      break;
  }

  return url;
}










