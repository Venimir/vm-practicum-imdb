

function getMovieCardDiv(object) {

    let title = object.title ? object.title : object.name;
    let year = object.release_date ? object.release_date : object.first_air_date;
    let imdbId = '';

    getDataById(object, function (response) {
        if (response) {
            imdbId = response.imdb_id;
            let handledMovieTitle = handleMovieTitle(title, 42);
            let handleMovieOverview = handleMovieTitle(object.overview, 270);
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
                '<td>' + dateFormat(new Date(year), 'mmmm d, yyyy') + '</td>' +  
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
                '<tr class="overview" title="' + object.overview + '">' +
                '<td class="overview" colspan="2">' + handleMovieOverview + '</td>' +
                '</tr>' +
                '</table>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>';

            $('.posters-container ul.view-as').append(movieContainer);
        }
    });
}

function getEpisodesCard(object) {
let handledEpisodeTitle = handleMovieTitle(object.name, 42);
let handleEpisodeOverview = handleMovieTitle(object.overview, 200);


let episodeCardDiv = '<li>' +
'<div class="card text-white bg-dark mb-3">' +
'<div class="card-header">Season ' + object.season_number + ' Episode '+ object.episode_number +'</div>' +
'<div class="card-body">' +
  '<h6>' + dateFormat(new Date(object.first_air_date, 'mmmm d, yyyy'))  + '</h6>' +
  '<h5 class="card-title">Episode Name</h5>' +
  '<h4>'+ handledEpisodeTitle +'</h4>' +
  '<p class="card-text">'+ handleEpisodeOverview +'</p>' +
'</div>'+
'</div>' +
'</li>';

$('.posters-container ul.view-as').append(episodeCardDiv);
}