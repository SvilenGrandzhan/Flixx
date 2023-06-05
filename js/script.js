// Created variable in global scope
const global = {
  pathname: window.location.pathname,
  API_KEY: 'e6da4e97035f119e8f32a02bd2fd3344',
  API_URL: 'https://api.themoviedb.org/3/',
}

//Function to highlight selected category
const highlightSelected = () => {
  document.querySelectorAll('.nav-link').forEach((li) => {
    // Compared href attribute to page pathname
    if (li.getAttribute('href') === global.pathname) {
      // Added new class 'Active' to highlight selected
      li.classList.add('active')
    }
  })
}
// Get popular movies
const getPopularMovies = async () => {
  const moviesList = await fetchData('movie/popular')
  console.log(moviesList.results[0].poster_path)
  moviesList.results.forEach((movie) => {
    const div = document.createElement('div')
    div.classList.add('card')
    div.innerHTML = `
      <a href="movie-details.html?id=${movie.id}">
        <img
          src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
          class="card-img-top"
          alt="${movie.title}"
        />
      </a>
      <div class="card-body">
        <h5 class="card-title">${movie.title}</h5>
        <p class="card-text">
        <small class="text-muted">Release: ${movie.release_date}</small>
        </p>
      </div>
    `
    document.getElementById('popular-movies').appendChild(div)
  })
}

//Made GET API request for popular movies
const fetchData = async (reference) => {
  const response = await fetch(
    `${global.API_URL}${reference}?api_key=${global.API_KEY}&language=en-US`
  )
  const data = await response.json()
  return data
}

// Used switch to create routing for every page
const init = () => {
  switch (global.pathname) {
    case '/index.html':
    case '/':
      getPopularMovies()
      break
    case '/shows.html':
      console.log(global.pathname)
      break
    case '/actors.html':
      console.log(global.pathname)
      break
    case '/search.html':
      console.log(global.pathname)
      break
    case '/movie-details.html':
      console.log(global.pathname)
      break
    case '/tv-details.html':
      console.log(global.pathname)
      break
    case '/actor-details.html':
      console.log(global.pathname)
      break
  }
  // Added it to initial function -> DOM content load
  highlightSelected()
}

// Added routing to DOM loading
document.addEventListener('DOMContentLoaded', init)
