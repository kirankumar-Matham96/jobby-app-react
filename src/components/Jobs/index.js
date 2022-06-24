import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import {BsSearch, BsFillBriefcaseFill} from 'react-icons/bs'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {Component} from 'react'
import Header from '../Header'
import LoadingView from '../LoadingView/index'
import ProfileFailureView from '../ProfileFailureView'
import JobFailureView from '../JobFailureView'
import NoJobsFound from '../NoJobsFound'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
}

class Jobs extends Component {
  state = {
    profileApiStatus: apiStatusConstants.initial,
    jobsApiStatus: apiStatusConstants.initial,
    profileData: {},
    jobsData: [],
    searchInput: '',
    employmentTypesFilterList: [],
    salaryRangeFilter: '',
  }

  componentDidMount = () => {
    this.getProfileData()
    this.getJobsData()
  }

  getProfileData = async () => {
    this.setState({
      profileApiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    try {
      const response = await fetch(url, options)
      const data = await response.json()

      if (response.ok) {
        const updatedProfileDetails = {
          name: data.profile_details.name,
          profileImageUrl: data.profile_details.profile_image_url,
          shortBio: data.profile_details.short_bio,
        }
        this.setState({
          profileData: updatedProfileDetails,
          profileApiStatus: apiStatusConstants.success,
        })
      } else {
        this.setState({
          profileApiStatus: apiStatusConstants.failure,
        })
      }
    } catch (err) {
      this.setState({
        profileApiStatus: apiStatusConstants.failure,
      })
    }
  }

  getJobsData = async () => {
    this.setState({jobsApiStatus: apiStatusConstants.inProgress})
    const {
      searchInput,
      employmentTypesFilterList,
      salaryRangeFilter,
    } = this.state

    const jwtToken = Cookies.get('jwt_token')
    let url
    if (
      searchInput === '' &&
      employmentTypesFilterList.length === 0 &&
      salaryRangeFilter === ''
    ) {
      url = `https://apis.ccbp.in/jobs?employment_type=&minimum_package=&search=`
    } else if (
      searchInput !== '' &&
      employmentTypesFilterList.length === 0 &&
      salaryRangeFilter === ''
    ) {
      url = `https://apis.ccbp.in/jobs?employment_type=&minimum_package=&search=${searchInput}`
    } else if (
      searchInput === '' &&
      employmentTypesFilterList.length !== 0 &&
      salaryRangeFilter === ''
    ) {
      url = `https://apis.ccbp.in/jobs?employment_type=${employmentTypesFilterList.join()}&minimum_package=&search=`
    } else if (
      searchInput === '' &&
      employmentTypesFilterList.length === 0 &&
      salaryRangeFilter !== ''
    ) {
      url = `https://apis.ccbp.in/jobs?employment_type=&minimum_package=${parseInt(
        salaryRangeFilter,
      )}&search=`
    } else if (
      searchInput !== '' &&
      employmentTypesFilterList.length !== 0 &&
      salaryRangeFilter === ''
    ) {
      url = `https://apis.ccbp.in/jobs?employment_type=${employmentTypesFilterList.join()}&minimum_package=&search=${searchInput}`
    } else if (
      searchInput !== '' &&
      employmentTypesFilterList.length === 0 &&
      salaryRangeFilter !== ''
    ) {
      url = `https://apis.ccbp.in/jobs?employment_type=&minimum_package=${parseInt(
        salaryRangeFilter,
      )}&search=${searchInput}`
    } else if (
      searchInput === '' &&
      employmentTypesFilterList.length !== 0 &&
      salaryRangeFilter !== ''
    ) {
      url = `https://apis.ccbp.in/jobs?employment_type=${employmentTypesFilterList.join()}&minimum_package=${parseInt(
        salaryRangeFilter,
      )}&search=`
    } else if (
      searchInput !== '' &&
      employmentTypesFilterList.length !== 0 &&
      salaryRangeFilter !== ''
    ) {
      url = `https://apis.ccbp.in/jobs?employment_type=${employmentTypesFilterList.join()}&minimum_package=${parseInt(
        salaryRangeFilter,
      )}&search=${searchInput}`
    }

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    try {
      const response = await fetch(url, options)
      const data = await response.json()

      if (response.ok) {
        this.setState({
          jobsData: data.jobs.map(eachJobData => ({
            companyLogoUrl: eachJobData.company_logo_url,
            employmentType: eachJobData.employment_type,
            id: eachJobData.id,
            jobDescription: eachJobData.job_description,
            location: eachJobData.location,
            packagePerAnnum: eachJobData.package_per_annum,
            rating: eachJobData.rating,
            title: eachJobData.title,
          })),
          jobsApiStatus: apiStatusConstants.success,
        })
      } else {
        this.setState({
          jobsApiStatus: apiStatusConstants.failure,
        })
      }
    } catch (err) {
      this.setState({
        jobsApiStatus: apiStatusConstants.failure,
      })
    }
  }

  onSearchInputChange = event => {
    if (event.key === 'Enter') {
      this.onSearchForResults()
    } else {
      this.setState({searchInput: event.target.value})
    }
  }

  onSearchForResults = () => {
    this.getJobsData()
  }

  renderLoadingView = () => <LoadingView />

  onSelectingEmploymentTypeFilter = event => {
    if (event.target.checked === true) {
      this.setState(
        prevState => ({
          employmentTypesFilterList: [
            ...prevState.employmentTypesFilterList,
            event.target.value,
          ],
        }),
        this.getJobsData,
      )
    } else {
      this.setState(
        prevState => ({
          employmentTypesFilterList: prevState.employmentTypesFilterList.includes(
            event.target.value,
          )
            ? prevState.employmentTypesFilterList.filter(
                eachItem => eachItem !== event.target.value,
              )
            : prevState.employmentTypesFilterList,
        }),
        this.getJobsData,
      )
    }
  }

  onSelectingSalaryRangeFilter = event => {
    if (event.target.checked === true) {
      this.setState(
        {
          salaryRangeFilter: event.target.value,
        },
        this.getJobsData,
      )
    } else {
      this.setState(
        {
          salaryRangeFilter: '',
        },
        this.getJobsData,
      )
    }
  }

  renderMainPageView = () => {
    const {searchInput} = this.state

    return (
      <div className="jobs-bg-container">
        <Header />
        <div className="jobs-main-container">
          <div className="search-container-sm">
            <input
              type="search"
              placeholder="Search"
              className="search-input"
              value={searchInput}
              onChange={this.onSearchInputChange}
              onKeyDown={this.onSearchInputChange}
            />
            <button
              type="button"
              testid="searchButton"
              className="search-icon-btn"
              onClick={this.onSearchForResults}
            >
              <BsSearch className="search-icon" />
            </button>
          </div>

          <div className="profile-and-filter-section">
            {this.selectProfileViewByStatus()}
            <hr className="h-line" />
            <h1 className="filter-list-title">Type of Employment</h1>
            <ul className="type-of-employment-list-container">
              {employmentTypesList.map(eachEmploymentType => (
                <li
                  className="type-of-employment-list-item"
                  key={eachEmploymentType.employmentTypeId}
                >
                  <input
                    type="checkbox"
                    className="filter-input"
                    name={eachEmploymentType.employmentTypeId}
                    id={eachEmploymentType.employmentTypeId}
                    onClick={this.onSelectingEmploymentTypeFilter}
                    value={eachEmploymentType.employmentTypeId}
                  />
                  <label
                    className="filter-label"
                    htmlFor={eachEmploymentType.employmentTypeId}
                  >
                    {eachEmploymentType.label}
                  </label>
                </li>
              ))}
            </ul>
            <hr className="h-line" />
            <h1 className="filter-list-title">Salary Range</h1>
            <ul className="salary-range-list-container">
              {salaryRangesList.map(eachSalaryRange => (
                <li
                  className="salary-range-list-item"
                  key={eachSalaryRange.salaryRangeId}
                >
                  <input
                    type="radio"
                    className="filter-input"
                    name="salaryRange"
                    id={eachSalaryRange.salaryRangeId}
                    value={`${eachSalaryRange.label.slice(0, 2)}00000`}
                    onClick={this.onSelectingSalaryRangeFilter}
                  />
                  <label
                    className="filter-label"
                    htmlFor={eachSalaryRange.salaryRangeId}
                  >
                    {eachSalaryRange.label}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className="jobs-main-display-container">
            <div className="search-container-lg">
              <input
                type="search"
                placeholder="Search"
                className="search-input"
                value={searchInput}
                onChange={this.onSearchInputChange}
                onKeyDown={this.onSearchInputChange}
              />
              <button
                type="button"
                className="search-icon-btn"
                onClick={this.onSearchForResults}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>

            <ul className="jobs-list-container">
              {this.selectJobsViewByStatus()}
            </ul>
          </div>
        </div>
      </div>
    )
  }

  renderJobCard = jobData => (
    <li className="job-post-card-container" key={jobData.id}>
      <Link to={`/jobs/${jobData.id}`} className="job-card-link">
        <div className="job-post-card-header-container">
          <img
            src={jobData.companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div className="job-post-card-header-text-container">
            <h1 className="job-post-card-header-title">{jobData.title}</h1>
            <div className="job-post-card-header-rating-container">
              <AiFillStar className="rating-star small-icons" />
              <p className="job-post-card-header-rating">{jobData.rating}</p>
            </div>
          </div>
        </div>
        <div className="job-post-card-details-container">
          <div className="job-post-card-details-1">
            <div className="job-post-card-details-1-1">
              <div className="job-post-card-type-place-container">
                <MdLocationOn className="small-icons" />
                <p className="job-post-card-place">{jobData.location}</p>
              </div>
              <div className="job-post-card-type-place-container">
                <BsFillBriefcaseFill className="small-icons" />
                <p className="job-post-card-type-of-job">
                  {jobData.employmentType}
                </p>
              </div>
            </div>
            <p className="job-post-card-salary">{jobData.packagePerAnnum}</p>
          </div>

          <hr className="h-line" />
          <h1 className="job-post-card-description-title">Description</h1>
          <p className="job-post-card-description">{jobData.jobDescription}</p>
        </div>
      </Link>
    </li>
  )

  renderJobsSuccessView = () => {
    const {jobsData} = this.state
    return jobsData.length !== 0 ? (
      jobsData.map(eachJobData => this.renderJobCard(eachJobData))
    ) : (
      <NoJobsFound />
    )
  }

  renderJobsFailureView = () => (
    <JobFailureView onRetryGetJobs={this.getJobsData} />
  )

  renderProfileSuccessView = () => {
    const {profileData} = this.state
    return (
      <div className="profile-card-container">
        <img
          src={profileData.profileImageUrl}
          alt="profile"
          className="profile-img"
        />
        <h1 className="profile-card-title">{profileData.name}</h1>
        <p className="profile-card-description">{profileData.shortBio}</p>
      </div>
    )
  }

  renderProfileFailureView = () => (
    <ProfileFailureView onRetryProfile={this.getProfileData} />
  )

  selectProfileViewByStatus = () => {
    const {profileApiStatus} = this.state

    switch (profileApiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderProfileSuccessView()
      case apiStatusConstants.failure:
        return this.renderProfileFailureView()
      default:
        return null
    }
  }

  selectJobsViewByStatus = () => {
    const {jobsApiStatus} = this.state

    switch (jobsApiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderJobsSuccessView()
      case apiStatusConstants.failure:
        return this.renderJobsFailureView()
      default:
        return null
    }
  }

  render() {
    return this.renderMainPageView()
  }
}

export default Jobs
