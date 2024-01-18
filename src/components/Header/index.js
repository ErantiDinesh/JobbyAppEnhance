import './index.css'
import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

const Header = props => {
  const getLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <div className="headerContainer">
      <Link to="/" className="LogolInkHome">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          className="headerLogo"
          alt="website logo"
        />
      </Link>
      <ul className="headerUnorder">
        <li className="headListItem">
          <Link to="/" className="LinkHeaderCo">
            Home
          </Link>
        </li>
        <li className="headListItem">
          <Link to="/jobs" className="LinkHeaderCo">
            Jobs
          </Link>
        </li>
      </ul>
      <button type="button" className="buttonLogout" onClick={getLogout}>
        Logout
      </button>
    </div>
  )
}

export default withRouter(Header)
