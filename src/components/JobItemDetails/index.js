import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const JobItemDetails = () => (
  <div className="job-item-details-bg-container">
    <Header />
    <div className="job-item-details-main-container">
      <div className="job-item-details-card-container">
        <div className="job-item-details-card-header">
          <img src="" alt="" className="job-item-details-card-header-logo" />
          <div>
            <h1 className="job-item-details-card-header-title">Company Name</h1>
            <p className="job-item-details-card-header-rating">
              <AiFillStar /> 4
            </p>
          </div>
        </div>
        <div className="job-item-details-card-details-container">
          <div className="job-item-details-card-details-container-1">
            <p className="job-item-details-card-details-container-1-content">
              <MdLocationOn /> Delhi
            </p>
            <p className="job-item-details-card-details-container-1-content">
              <BsFillBriefcaseFill /> Internship
            </p>
          </div>
          <p className="job-item-details-card-details-container-1-salary">
            10LPA
          </p>
        </div>
        <hr className="h-line" />
        <div className="job-item-details-card-description-title-container">
          <p className="job-item-details-card-description-title">Description</p>
          <Link to="/" className="job-item-details-card-details-link">
            Visit
            <icon className="job-item-details-card-details-link-icon" />
          </Link>
        </div>
        <p className="job-item-details-card-description">Description</p>
        <p className="job-item-details-card-description-title">Skills</p>
        <div className="job-item-details-card-skills-container">
          <img src="" alt="" className="job-item-details-card-skill-item" />
          <img src="" alt="" className="job-item-details-card-skill-item" />
          <img src="" alt="" className="job-item-details-card-skill-item" />
          <img src="" alt="" className="job-item-details-card-skill-item" />
          <img src="" alt="" className="job-item-details-card-skill-item" />
          <img src="" alt="" className="job-item-details-card-skill-item" />
        </div>
        <p className="job-item-details-card-description-title">
          Life at Company
        </p>
        <p className="job-item-details-card-description">Description</p>
        <img src="" alt="" className="job-item-details-card-image" />
      </div>

      <h1 className="job-item-details-sub-heading">Similar Jobs</h1>

      <ul className="job-item-details-similar-jobs-list-container">
        <li className="job-item-details-card-container job-item-details-similar-jobs-list-item-container">
          <div className="job-item-details-card-header">
            <img src="" alt="" className="job-item-details-card-header-logo" />
            <div>
              <h1 className="job-item-details-card-header-title">
                Company Name
              </h1>
              <p className="job-item-details-card-header-rating">
                <AiFillStar /> 4
              </p>
            </div>
          </div>
          <p className="job-item-details-card-description-title">Description</p>
          <p className="job-item-details-card-description">Description</p>
          <div className="job-item-details-card-details-container-1">
            <p className="job-item-details-card-details-container-1-content">
              <MdLocationOn /> Delhi
            </p>
            <p className="job-item-details-card-details-container-1-content">
              <BsFillBriefcaseFill /> Internship
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
)

export default JobItemDetails
