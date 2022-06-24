import './index.css'

const ProfileFailureView = props => {
  const {onRetryProfile} = props
  return (
    <div className="profile-failure-view-container">
      <button
        type="button"
        className="profile-failure-retry-button"
        onClick={onRetryProfile}
      >
        Retry
      </button>
    </div>
  )
}

export default ProfileFailureView
