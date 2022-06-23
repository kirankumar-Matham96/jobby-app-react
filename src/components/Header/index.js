import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="header-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        alt="website logo"
        className="website-logo"
      />
      <ul className="header-items-list-container">
        <Link to="/" className="nav-link">
          <li>
            <AiFillHome className="header-item-icon" />
          </li>
        </Link>
        <Link to="/jobs/" className="nav-link">
          <li>
            <BsFillBriefcaseFill className="header-item-icon" />
          </li>
        </Link>
        <li>
          <button
            type="button"
            onClick={onClickLogout}
            className="logout-button"
          >
            <FiLogOut className="header-item-icon" />
          </button>
        </li>
      </ul>
    </nav>
  )
}
export default withRouter(Header)
