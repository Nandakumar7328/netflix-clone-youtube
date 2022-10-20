import {Link} from 'react-router-dom'
import MovieContext from '../../context/MovieContext'
import './index.css'

const ItemSearch = props => (
  <MovieContext.Consumer>
    {value => {
      const {username} = value
      console.log('username from popular', {username})
      const {itemDetailsSearch} = props
      const {posterPath, title, id} = itemDetailsSearch

      return (
        <li className="li-container" key={id}>
          <Link to={`/movies/${id}`} key={id}>
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

export default ItemSearch
