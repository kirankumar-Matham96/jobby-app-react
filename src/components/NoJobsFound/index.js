import './index.css'

const NoJobsFound = () => (
  <div className="no-jobs-found-bg-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
      alt="no jobs"
      className="no-jobs-found-image"
    />
    <div className="no-jobs-found-content-container">
      <h1 className="not-fount-title">No Jobs Found</h1>
      <p className="not-fount-description">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  </div>
)

export default NoJobsFound
