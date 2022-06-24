import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'

const SimilarJobItem = props => {
  const {jobDetails} = props
  return (
    <li
      className="job-item-details-card-container job-item-details-similar-jobs-list-item-container"
      key={jobDetails.id}
    >
      <div className="job-item-details-card-header job-item-details-similar-jobs-header">
        <img
          src={jobDetails.companyLogoUrl}
          alt="similar job company logo"
          className="job-item-details-card-header-logo"
        />
        <div>
          <h1 className="job-item-details-card-header-title">
            {jobDetails.title}
          </h1>

          <div className="rating-container">
            <AiFillStar className="rating-star small-icons" />{' '}
            <p className="job-item-details-card-header-rating">
              {jobDetails.rating}
            </p>
          </div>
        </div>
      </div>
      <h1 className="job-item-details-card-description-title job-item-details-similar-jobs-title">
        Description
      </h1>
      <p className="job-item-details-card-description job-item-details-similar-jobs-description">
        {jobDetails.jobDescription}
      </p>
      <div className="job-item-details-card-details-container-1">
        <div className="job-item-details-card-details-container-1-content-container">
          <MdLocationOn className="job-item-details-card-icon" />
          <p className="job-item-details-card-details-container-1-content">
            {jobDetails.location}
          </p>
        </div>
        <div className="job-item-details-card-details-container-1-content-container">
          <BsFillBriefcaseFill className="job-item-details-card-icon" />
          <p className="job-item-details-card-details-container-1-content">
            {jobDetails.employmentType}
          </p>
        </div>
      </div>
    </li>
  )
}
export default SimilarJobItem
