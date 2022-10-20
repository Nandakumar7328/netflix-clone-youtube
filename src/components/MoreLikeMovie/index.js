import MovieContext from '../../context/MovieContext'
import './index.css'

const MoreLikeMovie = props => (
  <MovieContext.Consumer>
    {value => {
      const {username} = value
      console.log('username from popular', {username})
      const {likedMovieDetails} = props
      const {posterPath, title} = likedMovieDetails

      return (
        <li className="liked-li">
          <img src={posterPath} alt={title} className="more-liked-poster" />
        </li>
      )
    }}
  </MovieContext.Consumer>
)

export default MoreLikeMovie
