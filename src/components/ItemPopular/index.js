import {Link} from 'react-router-dom'
import MovieContext from '../../context/MovieContext'
import './index.css'

const ItemPopular = props => (
  <MovieContext.Consumer>
    {value => {
      const {username} = value
      console.log('username from popular', {username})
      const {itemDetails} = props
      const {posterPath, title, id} = itemDetails

      return (
        <li className="li-container">
          <Link to={`/movies/${id}`}>
            <img
              src={posterPath}
              alt={title}
              className="tending-movie-poster-path"
            />
          </Link>
        </li>
      )
    }}
  </MovieContext.Consumer>
)

export default ItemPopular
