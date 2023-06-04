var myHeaders = new Headers();
myHeaders.append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNDU4Nzg2MDk1YjJkZjJmNmNiNWYwOTZjMmVmZmZiYiIsInN1YiI6IjY0N2EwNGIwMTc0OTczMDExODcwNDllOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.inggwGEjOdTVVM1RZsthXmYYuQSl4pcWaVES7LuN_6A');

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow',
};

async function getData() {
  try {
    let response = await fetch('https://api.themoviedb.org/3/movie/now_playing', requestOptions);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

async function renderData() {
  let data = await getData();
  let moviesHtml = '';
  let topMovies = data.results.reverse();
  console.log(topMovies);
  topMovies.forEach((movie) => {
    let releaseDate = new Date(movie.release_date);
    releaseDate = releaseDate.getMonth() + 1 + '/' + releaseDate.getDate() + '/' + releaseDate.getFullYear();
    let movieHtml = `<div class="movie" id="${movie.id}"><img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"></img><h2>${movie.title}</h2><p>Released: ${releaseDate}</p></div>`;
    moviesHtml += movieHtml;
  });
  let movieList = document.querySelector('#movie-list');
  movieList.innerHTML = moviesHtml;
  const movieElements = document.querySelectorAll('.movie');
  movieElements.forEach((movieElement) => {
    movieElement.addEventListener('click', () => {
      rerouteToTrailer(movieElement.id);
    });
  });
}

renderData();

async function getTrailer(movieId) {
  try {
    let response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos`, requestOptions);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

async function rerouteToTrailer(movieId) {
  let videos = await getTrailer(movieId);
  let key = videos.results[videos.results.length - 1].key;
  window.location.href = `https://www.youtube.com/watch?v=${key}`;
}
