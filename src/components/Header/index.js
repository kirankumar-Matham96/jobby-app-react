import {Link} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

const Header = () => (
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
      <Link to="/" className="nav-link">
        <li>
          <BsFillBriefcaseFill className="header-item-icon" />
        </li>
      </Link>
      <Link to="/" className="nav-link">
        <li>
          <FiLogOut className="header-item-icon" />
        </li>
      </Link>
    </ul>
  </nav>
)

export default Header
