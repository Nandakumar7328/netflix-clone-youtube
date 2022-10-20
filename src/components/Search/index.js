import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {HiOutlineSearch} from 'react-icons/hi'
import ItemSearch from '../ItemSearch'
import Header from '../Header'
import MovieContext from '../../context/MovieContext'
import Footer from '../Footer'
import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  inprogress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Search extends Component {
  state = {
    inputSearch: '',
    apiStatusSearch: apiStatusConstant.initial,
    searchData: [],
  }

  componentDidMount() {
    this.onSearchMovies()
  }

  onSearchMovies = async () => {
    this.setState({apiStatusSearch: apiStatusConstant.inprogress})
    const {inputSearch} = this.state
    const url = `https://apis.ccbp.in/movies-app/movies-search?search=${inputSearch}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const updateData = data.results.map(eachData => ({
        id: eachData.id,
        backDropPath: eachData.backdrop_path,
        overview: eachData.overview,
        posterPath: eachData.poster_path,
        title: eachData.title,
      }))
      this.setState({
        searchData: updateData,
        apiStatusSearch: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStatusSearch: apiStatusConstant.failure})
    }
  }

  onChangeInput = event => {
    this.setState({inputSearch: event.target.value})
  }

  onClickInput = event => {
    if (event.key === 'Enter') {
      this.onSearchMovies()
    }
  }

  noResultFound = () => {
    const {inputSearch} = this.state

    return (
      <div className="loader-container-popular">
        <img
          src="https://res.cloudinary.com/duv0mhzrm/image/upload/v1665899176/Group_7394_sbq8sj.png"
          alt="no movies"
          className="error-image"
        />
        <p className="error-popular-para">
          Your search for {inputSearch} did not find any matches.
        </p>
      </div>
    )
  }

  renderInSuccessViewOfSearch = () => {
    const {searchData} = this.state
    if (searchData.length === 0) {
      return this.noResultFound()
    }

    return (
      <div className="popular-list-container">
        <ul className="popular-ul-container">
          {searchData.map(eachSearch => (
            <ItemSearch key={eachSearch.id} itemDetailsSearch={eachSearch} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoadingViewOfSearch = () => (
    <div className="loader-container-popular" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderInFailureViewOfSearch = () => (
    <div className="loader-container-popular">
      <img
        src="https://res.cloudinary.com/duv0mhzrm/image/upload/v1665899171/Background-Complete_wschfx.png"
        alt="failure view"
        className="error-image"
      />
      <p className="error-popular-para">
        Something went wrong, Please try again.
      </p>
      <button
        type="button"
        className="btn-popular"
        onClick={this.onSearchMovies}
      >
        Try Again
      </button>
    </div>
  )

  renderSearchData = () => {
    const {apiStatusSearch} = this.state

    switch (apiStatusSearch) {
      case apiStatusConstant.inprogress:
        return this.renderLoadingViewOfSearch()
      case apiStatusConstant.success:
        return this.renderInSuccessViewOfSearch()
      case apiStatusConstant.failure:
        return this.renderInFailureViewOfSearch()
      default:
        return null
    }
  }

  render() {
    const {inputSearch} = this.state
    return (
      <MovieContext.Consumer>
        {value => {
          const {username} = value
          console.log('username from Home', {username})

          return (
            <div className="popular-container" testid="searchRoute">
              <Header />
              <div className="searchContainer">
                <input
                  type="search"
                  className="search-input"
                  value={inputSearch}
                  placeholder="Search"
                  onKeyDown={this.onClickInput}
                  onChange={this.onChangeInput}
                />
                <button
                  type="button"
                  className="btn-search"
                  testid="searchButton"
                  onClick={this.onSearchMovies}
                >
                  <HiOutlineSearch className="search-icon-clicked" />
                </button>
              </div>

              {this.renderSearchData()}
              <Footer />
            </div>
          )
        }}
      </MovieContext.Consumer>
    )
  }
}

export default Search
