

function getMovieCardDiv(object) {

    let title = object.title ? object.title : object.name;
    let year = object.release_date ? object.release_date : object.first_air_date;
    let imdbId = '';
    let genreNames = '';
    
    object.genre_ids.forEach((index) => {
        if ($.inArray(index, genres)) {
            genreNames += genres[index] + ' ';
        }
    });
    
    

    getDataById(object, function (response) {
        if (response) {
            imdbId = response.imdb_id;
            
            let handledMovieTitle = handleMovieTitle(title, 35);
            let handleMovieOverview = handleMovieTitle(object.overview, 270);
            let linkToImdbSite = imdbId ? 'https://www.imdb.com/title/' + imdbId : '#';
            let poster =  object.poster_path ? 'http://image.tmdb.org/t/p/w185' + object.poster_path : 'images/poster_not_available.jpg';
            let movieContainer = '<li>' +
                '<div class="wrapper">' +
                '<div class="container">' +
                '<div class="top">' +
                '<a href="' + linkToImdbSite + '" target="_blank">' +
                '<img src="' + poster + '" alt="">' +
                '</a>' +
                '</div>' +
                '<div class="bottom">' +
                '<div class="details"  title="' + handledMovieTitle + '">' +
                '<h5 class="title-movie">' + handledMovieTitle + '</h5>' +
                '<p class="p-Year">' +  dateFormat(new Date(year), 'mmmm d, yyyy') + '</p>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="inside">' +
                '<div class="icon"><i class="fa fa-info-circle fa-2x"></i></div>' +
                '<div class="contents">' +
                '<table>' +
                '<tr class="tr-head">' +
                '<th class="table-row-header">Release Date</th>' +
                '<th class="table-row-header">Imdb Raiting</th>' +
                '</tr>' +
                '<tr>' +
                '<td>' + dateFormat(new Date(year), 'mmmm d, yyyy') + '</td>' +  
                '<td>' +
                '<div class="imdbRatingStyle">' +
                '<span>' +
                '<img src="https://ia.media-imdb.com/images/G/01/imdb/plugins/rating/images/imdb_38x18.png" alt=""/>' +
                '<span class="rating">' + object.vote_average + '<span class="ofTen">/10</span></span>' +
                '<img src="https://ia.media-imdb.com/images/G/01/imdb/plugins/rating/images/imdb_star_17x17.png" class="star">' +
                '</span>' +
                '</div>' +
                '</td>' +
                '</tr>' +
                '<tr class="tr-head">' +
                '<th class="table-row-header" colspan="2">Genres</th>' +
                '</tr>' +
                '<tr class="genre-names">' +
                '<td class="genre-names" colspan="2">'+ genreNames +'</td>' +
                '</tr>' +
                '<tr class="tr-head">' +
                '<th class="table-row-header" colspan="2">Movie Overview</th>' +
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
let handleEpisodeOverview = handleMovieTitle(object.overview, 240);
let firstAirDate = object.first_air_date ? object.first_air_date : object.air_date;
let episodeCardDiv = '<li>' +
'<div class="card text-white bg-dark mb-3">' +
'<div class="card-header">Season ' + object.season_number + ' Episode '+ object.episode_number +'</div>' +
'<div class="card-body">' +
  '<h6>Release Date: ' + dateFormat(new Date(Date.parse(firstAirDate)), 'mmmm d, yyyy')  + '</h6>' +
  '<h6 class="card-title">Episode Name:</h6>' +
  '<h4>'+ handledEpisodeTitle +'</h4>' +
  '<p class="card-text" title="'+ object.overview +'">'+ handleEpisodeOverview +'</p>' +
'</div>'+
'</div>' +
'</li>';

$('.posters-container ul.view-as').append(episodeCardDiv);
}