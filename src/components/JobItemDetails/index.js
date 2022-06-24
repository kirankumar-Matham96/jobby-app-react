import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn, MdOpenInNew} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {Component} from 'react'
import LoadingView from '../LoadingView'
import Header from '../Header'
import JobFailureView from '../JobFailureView'
import './index.css'
import SimilarJobItem from '../SimilarJobItem'

const apiStatusConstants = {
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
}

class JobItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobDetails: [],
    similarJobs: [],
  }

  componentDidMount = () => {
    this.getJobData()
  }

  getJobData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    try {
      const response = await fetch(url, options)
      const jobData = await response.json()

      if (response.ok) {
        const updatedJobData = {
          jobDetails: jobData.job_details,
          similarJobs: jobData.similar_jobs,
        }

        const updatedJobDetails = {
          id: updatedJobData.jobDetails.id,
          companyLogoUrl: updatedJobData.jobDetails.company_logo_url,
          companyWebsiteUrl: updatedJobData.jobDetails.company_website_url,
          employmentType: updatedJobData.jobDetails.employment_type,
          jobDescription: updatedJobData.jobDetails.job_description,
          lifeAtCompany: updatedJobData.jobDetails.life_at_company,
          location: updatedJobData.jobDetails.location,
          packagePerAnnum: updatedJobData.jobDetails.package_per_annum,
          rating: updatedJobData.jobDetails.rating,
          skills: updatedJobData.jobDetails.skills,
          title: updatedJobData.jobDetails.title,
        }

        const updatedSimilarJobs = updatedJobData.similarJobs.map(eachJob => ({
          companyLogoUrl: eachJob.company_logo_url,
          employmentType: eachJob.employment_type,
          id: eachJob.id,
          jobDescription: eachJob.job_description,
          location: eachJob.location,
          rating: eachJob.rating,
          title: eachJob.title,
        }))

        this.setState({
          apiStatus: apiStatusConstants.success,
          jobDetails: updatedJobDetails,
          similarJobs: updatedSimilarJobs,
        })
      } else {
        this.setState({apiStatus: apiStatusConstants.failure})
      }
    } catch (err) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => <LoadingView />

  renderSuccessView = () => {
    const {jobDetails, similarJobs} = this.state
    return (
      <div className="job-item-details-main-container">
        <div className="job-item-details-card-container">
          <div className="job-item-details-card-header">
            <img
              src={jobDetails.companyLogoUrl}
              alt="job details company logo"
              className="job-item-details-card-header-logo"
            />
            <div>
              <h1 className="job-item-details-card-header-title">
                {jobDetails.title}
              </h1>
              <div className="rating-container job-post-card-header-rating-container">
                <AiFillStar className="rating-star small-icons" />{' '}
                <p className="job-item-details-card-header-rating">
                  {jobDetails.rating}
                </p>
              </div>
            </div>
          </div>
          <div className="job-item-details-card-details-container">
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
            <p className="job-item-details-card-details-container-1-salary">
              {jobDetails.packagePerAnnum}
            </p>
          </div>
          <hr className="h-line" />
          <div className="job-item-details-card-description-title-container">
            <h1 className="job-item-details-card-description-title">
              Description
            </h1>
            <a
              href={jobDetails.companyWebsiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="job-item-details-card-details-link"
            >
              <button type="button" className="external-link-button">
                Visit
                <MdOpenInNew className="job-item-details-card-details-link-icon" />
              </button>
            </a>
          </div>
          <p className="job-item-details-card-description">
            {jobDetails.jobDescription}
          </p>
          <h1 className="job-item-details-card-description-title">Skills</h1>
          <ul className="job-item-details-card-skills-container">
            {jobDetails.skills.map(eachSkill => (
              <li
                key={eachSkill.name}
                className="job-item-details-card-skill-item"
              >
                <img
                  src={eachSkill.image_url}
                  alt={eachSkill.name}
                  className="job-item-details-card-skill-item-image"
                />
                <p className="job-item-details-card-skill-item-title">
                  {eachSkill.name}
                </p>
              </li>
            ))}
          </ul>
          <div>
            <h1 className="job-item-details-card-description-title">
              Life at Company
            </h1>
            <div className="job-life-container">
              <p className="job-item-details-card-description">
                {jobDetails.lifeAtCompany.description}
              </p>
              <img
                src={jobDetails.lifeAtCompany.image_url}
                alt="life at company"
                className="job-item-details-card-image"
              />
            </div>
          </div>
        </div>

        <h1 className="job-item-details-sub-heading">Similar Jobs</h1>

        <ul className="job-item-details-similar-jobs-list-container">
          {similarJobs.map(eachJob => (
            <SimilarJobItem jobDetails={eachJob} />
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => <JobFailureView onRetryGetJobs={this.getJobData} />

  renderMainPageView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="job-item-details-bg-container">
        <Header />
        {this.renderMainPageView()}
      </div>
    )
  }
}

export default JobItemDetails
