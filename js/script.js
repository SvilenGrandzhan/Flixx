// Created variable in global scope
const global = {
  pathname: window.location.pathname,
  search: window.location.search,
  API_KEY: 'e6da4e97035f119e8f32a02bd2fd3344',
  API_URL: 'https://api.themoviedb.org/3/',
}
// af to create a HTML element
const create = (tagName, props) => {
  return Object.assign(document.createElement(tagName), props)
}
// af to append child to parent
const aChild = (parent, child) => {
  parent.appendChild(child)
  return parent
}
// af to add comas to number
const addComasToNumber = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
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
  moviesList.results.forEach((movie) => {
    const div = create('div', {
      className: 'card',
    })
    const link = create('a', {
      href: `movie-details.html?id=${movie.id}`,
    })
    const movieImage = create('img', {
      className: 'card-img-top',
      src: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      alt: `${movie.title}`,
    })
    const cardBodyDiv = create('div', {
      className: 'card-body',
    })
    const h5 = create('h5', {
      className: 'card-title',
      textContent: `${movie.title}`,
    })
    const p = create('p', {
      className: 'card-text',
    })
    const small = create('small', {
      className: 'text-muted',
      textContent: `Release: ${movie.release_date}`,
    })
    // Have the feeling I can optimize this part. Maybe array?
    aChild(div, aChild(link, movieImage))
    aChild(div, aChild(cardBodyDiv, h5))
    aChild(div, aChild(cardBodyDiv, p))
    aChild(div, aChild(cardBodyDiv, small))
    aChild(document.getElementById('popular-movies'), div)
  })
}
// Get popular TV Shows
const getPopularTVShow = async () => {
  const tvShowsList = await fetchData('tv/popular')
  tvShowsList.results.forEach((tvShow) => {
    const div = create('div', {
      className: 'card',
    })
    const link = create('a', {
      href: `tv-details.html?id=${tvShow.id}`,
    })
    const tvShowImage = create('img', {
      // src: 'images/no-image.jpg',
      src: `https://image.tmdb.org/t/p/w500${tvShow.poster_path}`,
      className: 'card-img-top',
      alt: `${tvShow.name}`,
    })
    const cardBodyDiv = create('div', {
      className: 'card-body',
    })
    const h5 = create('h5', {
      className: 'card-title',
      textContent: `${tvShow.name}`,
    })
    const p = create('p', {
      className: 'card-text',
    })
    const small = create('small', {
      className: 'text-muted',
      textContent: `Aired: ${tvShow.first_air_date}`,
    })
    aChild(div, aChild(link, tvShowImage))
    aChild(div, aChild(cardBodyDiv, h5))
    aChild(div, aChild(cardBodyDiv, p))
    aChild(div, aChild(cardBodyDiv, small))
    aChild(document.getElementById('popular-shows'), div)
  })
}
// Get popular Actors
const getPopularActors = async () => {
  const actors = await fetchData('person/popular')
  actors.results.forEach((actor) => {
    console.log(actor)
    const div = create('div', {
      className: 'card',
    })
    const link = create('a', {
      href: `actor-details.html?id=${actor.id}`,
    })
    const actorImage = create('img', {
      src: `https://image.tmdb.org/t/p/w500${actor.profile_path}`,
      className: 'card-img-top',
      alt: `${actor.name}`,
    })
    const cardBodyDiv = create('div', {
      className: 'card-body',
    })
    const h5 = create('h5', {
      className: 'card-title',
      textContent: `${actor.name}`,
    })
    const p = create('p', {
      className: 'card-text',
    })
    const small = create('small', {
      className: 'text-muted',
      textContent: `Popular for ${actor.known_for_department}`,
    })
    aChild(div, aChild(link, actorImage))
    aChild(div, aChild(cardBodyDiv, h5))
    aChild(div, aChild(cardBodyDiv, p))
    aChild(div, aChild(cardBodyDiv, small))
    aChild(document.getElementById('popular-actors'), div)
  })
}

// Get movie detail
const getMovieDetail = async () => {
  const movieId = global.search.split('=')
  const movieDetail = await fetchData(`movie/${movieId[1]}`)
  const divDetailsTop = create('div', {
    className: 'details-top',
  })
  const divTopFirst = create('div', {
    id: 'top-first',
  })
  const image = create('img', {
    src: `https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`,
    className: 'card-img-top',
    alt: `${movieDetail.original_title}`,
  })
  const divTopSecond = create('div', {
    id: 'top-second',
  })
  const h2Top = create('h2', {
    textContent: `${movieDetail.original_title}`,
  })
  const pRating = create('p', {
    id: 'p-rating',
  })
  const i = create('i', {
    className: 'fas fa-star text-primary',
    textContent: ` ${movieDetail.vote_average.toFixed(1)}`,
  })
  const pReleaseDate = create('p', {
    className: 'text-muted',
    textContent: `Release Date: ${movieDetail.release_date}`,
  })
  const pOverview = create('p', {
    textContent: `${movieDetail.overview}`,
  })
  const h5 = create('h5', {
    textContent: 'Genres',
  })
  const ulGenre = create('ul', {
    id: 'ulGenre',
    className: 'list-group',
  })
  const liGenre = create('li', {
    textContent: `${movieDetail.genres[0].name}`,
  })
  const homePage = create('a', {
    href: `${movieDetail.homepage}`,
    target: '_blank',
    className: 'btn',
    textContent: 'Visit Movie Homepage',
  })
  const divDetailsBottom = create('div', {
    className: 'details-bottom',
  })
  const h2Bottom = create('h2', {
    textContent: 'Movie Info',
  })
  const ulInfo = create('ul', {
    id: 'additionalInfo',
  })
  const liInfo = create('li', {
    textContent: `Budget: $${addComasToNumber(movieDetail.budget)}`,
  })
  const span = create('span', {
    className: 'text-secondary',
  })
  const h4 = create('h4', {
    textContent: 'Production Companies :',
  })
  const divCompanies = create('div', {
    textContent: `${movieDetail.production_companies[0].name}`,
  })
  aChild(divDetailsTop, aChild(divTopFirst, image))
  aChild(divDetailsTop, aChild(divTopSecond, h2Top))
  aChild(divDetailsTop, aChild(divTopSecond, pRating))
  aChild(divDetailsTop, aChild(divTopSecond, aChild(pRating, i)))
  aChild(divDetailsTop, aChild(divTopSecond, pReleaseDate))
  aChild(divDetailsTop, aChild(divTopSecond, pOverview))
  aChild(divDetailsTop, aChild(divTopSecond, h5))
  aChild(divDetailsTop, aChild(divTopSecond, aChild(ulGenre, liGenre)))
  aChild(divDetailsTop, aChild(divTopSecond, homePage))
  aChild(divDetailsBottom, h2Bottom)
  aChild(divDetailsBottom, aChild(ulInfo, aChild(liInfo, span)))
  aChild(divDetailsBottom, h4)
  aChild(divDetailsBottom, divCompanies)
  aChild(document.getElementById('movie-details'), divDetailsTop)
  aChild(document.getElementById('movie-details'), divDetailsBottom)
}

//General function for API Get request
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
      getPopularTVShow()
      break
    case '/actors.html':
      getPopularActors()
      break
    case '/search.html':
      console.log(global.pathname)
      break
    case '/movie-details.html':
      getMovieDetail()
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
