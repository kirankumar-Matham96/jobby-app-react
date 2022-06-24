import './index.css'

const JobFailureView = props => {
  const {onRetryGetJobs} = props

  return (
    <div className="jobs-failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobs-failure-view-image"
      />
      <div className="jobs-failure-view-content-container">
        <h1 className="jobs-failure-view-title">Oops! Something Went Wrong</h1>
        <p className="jobs-failure-view-description">
          We cannot seem to find the page you are looking for.
        </p>
        <button
          type="button"
          className="job-failure-retry-button"
          onClick={onRetryGetJobs}
        >
          Retry
        </button>
      </div>
    </div>
  )
}

export default JobFailureView
