import Header from '../Header'
import './index.css'

const NotFound = () => (
  <div className="not-found-bg-container">
    <Header />
    <div className="not-found-main-container">
      <div className="not-found-message-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
          alt="not found"
          className="not-found-sm-img"
        />
        <h1 className="not-fount-title">Page Not Found</h1>
        <p className="not-fount-description">
          {`we're sorry, the page you requested could not be found`}
        </p>
      </div>
    </div>
  </div>
)

export default NotFound
