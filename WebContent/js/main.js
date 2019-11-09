$(function () {
  $('input[type="text"]').focus(function () {
    this.value = "";
  });
  $('input[type="text"]').keypress(function (e) {
    if (e.which == 13) {
      console.log('enter');

      getImdbData();
      return false;
    }
  });
  $(document).on('click ', '#search-button', getImdbData);
});



// Grid/List buttons
var $gridButton = jQuery('a.view.grid');
var $listButton = jQuery('a.view.list');
var $items = jQuery('ul.view-as');

$listButton.on('click', function () {
  $gridButton.removeClass('on');
  $listButton.addClass('on');
  $items.removeClass('grid').addClass('list');
});

$gridButton.on('click', function () {
  $listButton.removeClass('on');
  $gridButton.addClass('on');
  $items.removeClass('list').addClass('grid');
});
// End 

var apiKeyMovieDb = 'api_key=2ec82d3fc6c5da1102cd5979cf39b152';

function getImdbData() {
  let titleMovie = $('#movieTitle').val();
  let arrayOfStrings = titleMovie.split(' ');
  let title = arrayOfStrings.join('+');
  let movieTitle = '&query=' + title;
  let movieYear = '&y=' + $('#movieYear').val();
  console.log(movieYear, titleMovie);

  let urlmoviedb = 'https://api.themoviedb.org/3/search/movie?' + apiKeyMovieDb + movieTitle;
  console.log(urlmoviedb);

  $('.posters-container ul.view-as').html('');
  $('.toggle').css('display', 'block');

  $.getJSON(urlmoviedb, function (response) {
    // console.log(response);
    if (response) {
      let data = response.results;

      $.each(data, function (index, object) {
        // console.log(index, object);
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
    // console.log(response);
    let imdbId = '';
    if (response) {
      imdbId = response.imdb_id;
    }
    let linkToImdbMovie = imdbId ? 'https://www.imdb.com/title/' + imdbId : '#';
    let movieContainer = '<li>' +
      '<div class="wrapper">' +
      '<div class="container">' +
      '<div class="top">' +
      '<a href="' + linkToImdbMovie + '" target="_blank">' +
      '<img src="http://image.tmdb.org/t/p/w185' + object.poster_path + '" alt="">' +
      '</a>' +
      '</div>' +
      '<div class="bottom">' +
      '<div class="details">' +
      '<h5>' + object.title + '</h5>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '<div class="inside">' +
      '<div class="icon"><i class="fa fa-info-circle fa-2x"></i></div>' +
      '<div class="contents">' +
      '<table>' +
      '<tr>' +
      '<th>Width</th>' +
      '<th>Height</th>' +
      '</tr>' +
      '<tr>' +
      '<td>3000mm</td>' +
      '<td>4000mm</td>' +
      '</tr>' +
      '<tr>' +
      '<th>Something</th>' +
      '<th>Something</th>' +
      '</tr>' +
      '<tr>' +
      '<td>200mm</td>' +
      '<td>200mm</td>' +
      '</tr>' +
      '<tr>' +
      '<th>Something</th>' +
      '<th>Something</th>' +
      '</tr>' +
      '<tr>' +
      '<td>200mm</td>' +
      '<td>200mm</td>' +
      '</tr>' +
      '</table>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</li>';
    $('.posters-container ul.view-as').append(movieContainer);
  });

}







