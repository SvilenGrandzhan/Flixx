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
//Arrow function to get the id of target element
const getId = async (category) => {
  const id = global.search.split('=')
  const detail = await fetchData(`${category}/${id[1]}`)
  // const detail = response.json()
  // console.log(detail)
  return detail
}
// Arrow function for background picture
const backgroundPic = (type, backgroundPath) => {
  // Need to find a way to do it with Create function
  const backgroundDiv = document.createElement('div')
  backgroundDiv.className = 'background-div'
  backgroundDiv.style.backgroundImage = `url(${backgroundPath})`
  aChild(document.querySelector(`#${type}-details`), backgroundDiv)
}

// Get popular movies
const getPopularMovies = async () => {
  // const moviesList = await fetchData('movie/popular')
  const moviesList = await fetchData('movie/top_rated')
  moviesList.results.forEach((movie) => {
    const div = create('div', {
      className: 'card',
    })
    const link = create('a', {
      href: `movie-details.html?id=${movie.id}`,
    })
    const movieImgSrc =
      movie.poster_path == null
        ? 'images/no-image.jpg'
        : `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    const movieImage = create('img', {
      className: 'card-img-top',
      src: movieImgSrc,
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
    // Challenge 2 : Have the feeling I can optimize this part. Maybe array?
    aChild(div, aChild(link, movieImage))
    aChild(div, aChild(cardBodyDiv, h5))
    aChild(div, aChild(cardBodyDiv, p))
    aChild(div, aChild(cardBodyDiv, small))
    aChild(document.getElementById('popular-movies'), div)
  })
}
// Get popular TV Shows
const getPopularTVShow = async () => {
  // const tvShowsList = await fetchData('tv/popular')
  const tvShowsList = await fetchData('tv/top_rated')
  console.log(tvShowsList.results)
  tvShowsList.results.forEach((tvShow) => {
    const div = create('div', {
      className: 'card',
    })
    const link = create('a', {
      href: `tv-details.html?id=${tvShow.id}`,
    })
    const tvShowImgSrc =
      tvShow.poster_path == null
        ? 'images/no-image.jpg'
        : `https://image.tmdb.org/t/p/w500${tvShow.poster_path}`

    const tvShowImage = create('img', {
      src: tvShowImgSrc,
      className: 'card-img-top',
      alt: `${tvShow.name}`,
    })
    const cardBodyRatingDiv = create('div', {
      className: 'card-body-rating',
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
    const cardRatingDiv = create('div', {
      id: 'card-rating',
      className: 'card-rating',
    })
    const spanRating = create('span', {
      id: 'progress-value',
      className: 'progress-value',
      textContent: '0%',
    })
    aChild(div, aChild(link, tvShowImage))
    aChild(div, aChild(cardBodyRatingDiv, cardBodyDiv))
    aChild(cardBodyRatingDiv, aChild(cardBodyDiv, h5))
    aChild(cardBodyRatingDiv, aChild(cardBodyDiv, p))
    aChild(cardBodyRatingDiv, aChild(cardBodyDiv, small))
    aChild(cardBodyRatingDiv, aChild(cardRatingDiv, spanRating))
    aChild(document.getElementById('popular-shows'), div)
  })
  // Circler Progress Bar
  let speed = 10
  let progressStartValue = 0
  let progressEndValue = 99
  let progressValue = document.getElementById('progress-value')
  let circularProgress = document.getElementById('card-rating')
  let progress = setInterval(() => {
    progressStartValue++
    progressValue.textContent = `${progressStartValue}%`
    circularProgress.style.background = `conic-gradient(rgb(0,128,0) ${
      progressStartValue * 3.6
    }deg, #fff 0deg)`
    if (progressStartValue == progressEndValue) {
      clearInterval(progress)
    }
  }, speed)
}

// Get popular Actors
const getPopularActors = async () => {
  const actors = await fetchData('person/popular')
  console.log(actors)
  actors.results.forEach((actor) => {
    const div = create('div', {
      className: 'card',
    })
    const link = create('a', {
      href: `actor-details.html?id=${actor.id}`,
    })
    const ActorImgSrc =
      actor.profile_path == null
        ? 'images/no-image.jpg'
        : `https://image.tmdb.org/t/p/w500${actor.profile_path}`
    const actorImage = create('img', {
      src: ActorImgSrc,
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
  // calling getId and passing movie as category
  const movieDetails = await getId('movie')
  console.log(movieDetails)
  backgroundPic(
    'movie',
    `https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`
  )
  const divDetailsTop = create('div', {
    className: 'details-top',
  })
  const divTopFirst = create('div', {
    id: 'top-first',
  })
  const movieDetailsImgSrc =
    movieDetails.poster_path == null
      ? 'images/no-image.jpg'
      : `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`
  const image = create('img', {
    src: movieDetailsImgSrc,
    className: 'card-img-top',
    alt: `${movieDetails.original_title}`,
  })
  const divTopSecond = create('div', {
    id: 'top-second',
  })
  const h2Top = create('h2', {
    textContent: `${movieDetails.original_title}`,
  })
  const pRating = create('p', {
    id: 'p-rating',
  })
  const i = create('i', {
    className: 'fas fa-star text-primary',
  })
  const pReleaseDate = create('p', {
    className: 'text-muted',
    textContent: `Release Date: ${movieDetails.release_date}`,
  })
  const pOverview = create('p', {
    textContent: `${movieDetails.overview}`,
  })
  const h5 = create('h5', {
    textContent: 'Genres',
  })
  const ulGenre = create('ul', {
    id: 'ulGenre',
    className: 'list-group',
  })
  const liGenre = create('li', {
    textContent: `${movieDetails.genres[0].name}`,
  })
  const homePage = create('a', {
    href: `${movieDetails.homepage}`,
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
    id: 'liInfo',
  })
  const span = create('span', {
    className: 'text-secondary',
    textContent: 'Budget:',
  })
  const h4 = create('h4', {
    textContent: 'Production Companies :',
    className: 'text-secondary',
  })
  const divCompanies = create('div', {
    textContent: `${movieDetails.production_companies[0].name}`,
  })
  aChild(divDetailsTop, aChild(divTopFirst, image))
  aChild(divDetailsTop, aChild(divTopSecond, h2Top))
  aChild(divDetailsTop, aChild(divTopSecond, pRating))
  aChild(divDetailsTop, aChild(divTopSecond, aChild(pRating, i)))
  i.after(` ${movieDetails.vote_average.toFixed(1)}`)
  aChild(divDetailsTop, aChild(divTopSecond, pReleaseDate))
  aChild(divDetailsTop, aChild(divTopSecond, pOverview))
  aChild(divDetailsTop, aChild(divTopSecond, h5))
  aChild(divDetailsTop, aChild(divTopSecond, aChild(ulGenre, liGenre)))
  aChild(divDetailsTop, aChild(divTopSecond, homePage))
  aChild(divDetailsBottom, h2Bottom)
  aChild(divDetailsBottom, aChild(ulInfo, aChild(liInfo, span)))
  aChild(divDetailsBottom, h4)
  aChild(divDetailsBottom, divCompanies)
  span.after(` $${addComasToNumber(movieDetails.budget)}`)
  aChild(document.getElementById('movie-details'), divDetailsTop)
  aChild(document.getElementById('movie-details'), divDetailsBottom)
}

//Get TV show details
const getTvShowDetails = async () => {
  const tvShowDetails = await getId('tv')
  console.log(tvShowDetails)
  backgroundPic(
    'show',
    `https://image.tmdb.org/t/p/original${tvShowDetails.backdrop_path}`
  )
  const divDetailsTop = create('div', {
    className: 'details-top',
  })
  const divTopFirst = create('div', {
    id: 'top-fist',
  })
  const tvShowDetailsImgSrv =
    tvShowDetails.poster_path == null
      ? 'images/no-image.jpg'
      : `https://image.tmdb.org/t/p/w500${tvShowDetails.poster_path}`
  const image = create('img', {
    src: tvShowDetailsImgSrv,
    className: ' card-img-top',
    alt: `${tvShowDetails.original_name}`,
  })
  const divTopSecond = create('div', {
    id: 'top-second',
  })
  const h2Top = create('h2', {
    id: 'shown-name',
    textContent: `${tvShowDetails.original_name}`,
  })
  const pRating = create('p', {
    id: 'p-rating',
  })
  const i = create('i', {
    className: 'fas fa-star text-primary',
  })
  const pReleaseDate = create('p', {
    id: 'p-release-date',
    className: 'text-muted',
    textContent: `Release Date: ${tvShowDetails.first_air_date}`,
  })
  const pOverview = create('p', {
    id: 'p-overview',
    textContent: `${tvShowDetails.overview}`,
  })
  const h5 = create('h5', {
    textContent: 'Genres',
  })
  const ulGenre = create('ul', {
    id: 'ul-genre',
    className: 'list-group',
  })
  const liGenre = create('li', {
    textContent: `${tvShowDetails.genres[0].name}`,
  })
  const a = create('a', {
    href: `${tvShowDetails.homepage}`,
    target: '_blank',
    className: 'btn',
    textContent: 'Visit Show Homepage',
  })
  const divDetailsBottom = create('div', {
    className: 'details-bottom',
  })
  const h2Bottom = create('h2', {
    id: 'show-info',
    textContent: 'Show Info',
  })
  const ulInfo = create('ul', {
    id: 'additional-info',
  })
  const liInfo = create('li', {})
  const span = create('span', {
    className: 'text-secondary',
    textContent: 'Number of Episodes: ',
  })
  const h4 = create('h4', {
    textContent: 'Production Companies:',
    className: 'text-secondary',
  })
  const divCompanies = create('div', {
    id: 'companies-list',
    className: 'list-group',
    textContent: `${tvShowDetails.production_companies[0].name}`,
  })
  aChild(divDetailsTop, aChild(divTopFirst, image))
  aChild(divDetailsTop, aChild(divTopSecond, h2Top))
  aChild(divDetailsTop, aChild(divTopSecond, aChild(pRating, i)))
  i.after(` ${tvShowDetails.vote_average.toFixed(1)}`)
  aChild(divDetailsTop, aChild(divTopSecond, pReleaseDate))
  aChild(divDetailsTop, aChild(divTopSecond, pOverview))
  aChild(divDetailsTop, aChild(divTopSecond, h5))
  aChild(divDetailsTop, aChild(divTopSecond, aChild(ulGenre, liGenre)))
  aChild(divDetailsTop, aChild(divTopSecond, a))
  aChild(divDetailsBottom, h2Bottom)
  aChild(divDetailsBottom, aChild(ulInfo, aChild(liInfo, span)))
  span.after(` ${tvShowDetails.number_of_episodes}`)
  aChild(divDetailsBottom, h4)
  aChild(divDetailsBottom, divCompanies)
  aChild(document.getElementById('show-details'), divDetailsTop)
  aChild(document.getElementById('show-details'), divDetailsBottom)
}

//Get actor details
const getActorDetails = async () => {
  const actorDetails = await getId('person')
  console.log(actorDetails)
  const actorDetailsImgSrc =
    actorDetails.profile_path == null
      ? 'images/no-image.jpg'
      : `https://image.tmdb.org/t/p/w500${actorDetails.profile_path}`
  // Challenge 1 To find a way to do it without repeating
  const actorDetailsBackGImgSrc =
    actorDetails.profile_path == null
      ? 'images/no-image.jpg'
      : `https://image.tmdb.org/t/p/original${actorDetails.profile_path}`
  backgroundPic('actor', `${actorDetailsBackGImgSrc}`)
  const gender = actorDetails.gender == 2 ? 'Male' : 'Female'
  const divDetailsTop = create('div', {
    className: 'details-top',
  })
  const divTopFirst = create('div', {
    id: 'top-first',
  })
  const image = create('img', {
    src: actorDetailsImgSrc,
    className: 'card-img-top',
    alt: `${actorDetails.name}`,
  })
  const divTopSecond = create('div', {
    id: 'top-second',
  })
  const h2Top = create('h2', {
    textContent: `${actorDetails.name}`,
  })
  const pRating = create('p', {
    id: 'p-rating',
  })
  const i = create('i', {
    className: 'fas fa-star text-primary',
  })
  const pBio = create('p', {
    id: 'p-bio',
    textContent: `${actorDetails.biography}`,
  })
  const h4 = create('h4', {
    textContent: 'Known for',
  })
  const ulKnown = create('ul', {
    id: 'ul-known-for',
    className: 'list-group',
  })
  const liKnown = create('li', {
    textContent: `${actorDetails.known_for_department}`,
  })
  const link = create('a', {
    href: `https://www.imdb.com/name/${actorDetails.imdb_id}`,
    target: '_blank',
    className: 'btn',
    textContent: 'Visit IMDB Page',
  })
  const divDetailsBottom = create('div', {
    className: 'details-bottom',
  })
  const h2Bottom = create('h2', {
    textContent: 'Actor Info',
  })
  const ulInfo = create('ul', {
    id: 'ul-info',
  })
  const liGender = create('li', {})
  const span = create('span', {
    className: 'text-secondary',
    textContent: 'Gender: ',
  })
  aChild(divDetailsTop, aChild(divTopFirst, image))
  aChild(divDetailsTop, aChild(divTopSecond, h2Top))
  aChild(divDetailsTop, aChild(divTopSecond, aChild(pRating, i)))
  i.after(` ${actorDetails.popularity.toFixed(0)}`)
  aChild(divDetailsTop, aChild(divTopSecond, pBio))
  aChild(divDetailsTop, aChild(divTopSecond, h4))
  aChild(divDetailsTop, aChild(divTopSecond, aChild(ulKnown, liKnown)))
  aChild(divDetailsTop, aChild(divTopSecond, link))
  aChild(divDetailsBottom, h2Bottom)
  aChild(divDetailsBottom, aChild(ulInfo, aChild(liGender, span)))
  span.after(gender)
  document.getElementById('actor-details').appendChild(divDetailsTop)
  document.getElementById('actor-details').appendChild(divDetailsBottom)
}

//General function for API Get request
const fetchData = async (reference) => {
  const response = await fetch(
    `${global.API_URL}${reference}?api_key=${global.API_KEY}&language=en-US&sort_by=vote_average.desc`
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
      getTvShowDetails()
      break
    case '/actor-details.html':
      getActorDetails()
      break
  }
  // Added it to initial function -> DOM content load
  highlightSelected()
}

// Added routing to DOM loading
document.addEventListener('DOMContentLoaded', init)
