$(function () {
  $('.selectpicker').select
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
  $('.selectpicker').on('change', saveSelectedGenres);
  $('#clear-filters').on('click', () => {
    clearFilters();
  });


  $(document).on('click ', '#search-button', getImdbData);

  populateSelectYearsRaiting(true);
  populateSelectYearsRaiting();
  populateFilterGenres();
});


// END Document Ready

var apiKeyMovieDb = 'api_key=2ec82d3fc6c5da1102cd5979cf39b152';
var selectedGenres = [];

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

  if (selectedGenres.length > 0) {
    let handledSelectedGenres = selectedGenres.join(',');
    console.log(handledSelectedGenres);
    urlmoviedb = getUrl(handledSelectedGenres, 'genres');
  }
  console.log(urlmoviedb);

  $('.posters-container ul.view-as').html('');

  $.getJSON(urlmoviedb, function (response) {

    if (response) {
      let data = response.results;
      console.log(data);
      

      for (let object of data) {
        if (tvSeasonNumber) {
          filterBySeason(object, tvSeasonNumber);
          break;
        }

        if (object.poster_path) {
          fillThePosterCardHtml(object);
        }
      }
    }
  });
  clearFilters();
}

function getDataById(object, callback, filterBySeason = null) {
  let linkType = getLinkType();
  let url = 'https://api.themoviedb.org/3/' + linkType + '/' + object.id + '?' + apiKeyMovieDb;
  let data = null;

  if (filterBySeason) {
    url = 'https://api.themoviedb.org/3/' + linkType + '/' + object.id + '/season/' + filterBySeason + '?' + apiKeyMovieDb;
  }

  $.getJSON(url).done(function (response) {
    // console.log(response);
    data = response;
    callback(data);
  });
}

function filterBySeason(object, tvSeasonNumber) {
  getDataById(object, function (response) {
    console.log(response);
    let episodes = response.episodes;
    episodes.forEach(function (object) {
      getEpisodesCard(object);
    });
  }, tvSeasonNumber);
}

function fillThePosterCardHtml(object) {
  getMovieCardDiv(object);
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
  clearFilters();
}

function handleMovieTitle(title, maxLength) {
  let max = maxLength;
  let tot, str; 

  str = typeof title !== "undefined" ? title : '';
  tot = str.length;

  tot >= 35 ? $('.title-movie').css('font-size', '1.10rem') : '';
  
  str = (tot <= max) ? str : str.substring(0, (max + 1)) + "...";

  return str;
}

function populateSelectYearsRaiting(years = false) {

  let html = '<option value="0">Choose...</option>';
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

    $('.selectpicker').selectpicker('refresh');

  });
}

function saveSelectedGenres() {
  selectedGenres = $(this).val();

  console.log(selectedGenres);
}

function sortBy() {
  let selectedOption = $(this).val();
  let filter = '';
  let firstClass = $(this).attr('class').split(' ')[0];
  clearFilters(firstClass);
  $('.posters-container ul.view-as').html('');

  if ($(this).hasClass('filter-year')) {
    filter = 'year';
  } else if ($(this).hasClass('filter-imdbRaiting')) {
    filter = 'raiting';
  } else {
    filter = 'genres'
  }

  let url = getUrl(selectedOption, filter);

  $.getJSON(url, function (response) {
    let data = response.results;
    data.forEach(function (object) {
      getMovieCardDiv(object);
    });
  });

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
      url = 'https://api.themoviedb.org/3/discover/' + linkType + apiKeyMovieDb + '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&primary_release_year=' + selectedOptions;
      break;
    case 'raiting':
      url = 'https://api.themoviedb.org/3/discover/' + linkType + apiKeyMovieDb + '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&vote_average.gte=' + selectedOptions;
      break;
    case 'genres':
      url = 'https://api.themoviedb.org/3/discover/' + linkType + apiKeyMovieDb + '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=' + selectedOptions;
      break;
  }

  return url;
}

function clearFilters(filterType = '') {
  if (filterType) {
    if (filterType == 'filter-year') {
      $('.filter-imdbRaiting').val(0);
    } 
    else {
      $('.filter-year').val(0);
    } 
  } else {
    $('.filter-imdbRaiting').val(0);
    $('.filter-year').val(0);
  }

  $('#movieTitle').val('');
  $('#tvSerieTitle').val('');
  $('#tvSerieSeason').val('');
  $('.selectpicker').val('default').selectpicker("refresh");
}










