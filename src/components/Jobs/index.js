/**
 * Filter by search added.
 * Filter by job type and salary range need to be added.
 * Failure views should be added.
 * No jobs view should be added when the filter results are empty.
 * When job item is clicked, it should navigate to the job details page.
 *
 */

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import {BsSearch, BsFillBriefcaseFill} from 'react-icons/bs'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {Component} from 'react'
import Header from '../Header'
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
    isSearchFilterApplied: false, // not necessary
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

    const response = await fetch(url, options)
    const data = await response.json()
    // console.log('profile: ', data)

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
  }

  getJobsData = async () => {
    this.setState({jobsApiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/jobs'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    // console.log(data)

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
  }

  onSearchInputChange = event => {
    if (event.key === 'Enter') {
      this.onSearchForResults()
    } else {
      this.setState({searchInput: event.target.value})
    }
  }

  onSearchForResults = () => {
    this.setState({isSearchFilterApplied: true})
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onSelectingEmploymentTypeFilter = event => {
    if (event.target.checked === true) {
      this.setState(
        prevState => ({
          employmentTypesFilterList: [
            ...prevState.employmentTypesFilterList,
            event.target.value,
          ],
        }),
        this.getJobsByTypeFilter,
      )
      //   this.getJobsByTypeFilter(event.target.value)
      //   this.getJobsByTypeFilter()
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
        this.getJobsByTypeFilter,
      )
      //   this.getJobsByTypeFilter() // <== for debugging
    }
  }

  onSelectingSalaryRangeFilter = event => {
    console.log('salary range selected')
    if (event.target.checked === true) {
      this.setState(
        {
          salaryRangeFilter: event.target.value,
        },
        this.getJobsBySalaryRangeFilter,
      )
      //   this.getJobsBySalaryRangeFilter(event.target.value)
      //   this.getJobsBySalaryRangeFilter()
    } else {
      this.setState(
        {
          salaryRangeFilter: '',
        },
        this.getJobsBySalaryRangeFilter,
      )
      //   this.getJobsBySalaryRangeFilter() // <== for debugging
    }
  }

  getJobsByTypeFilter = async () => {
    this.setState({jobsApiStatus: apiStatusConstants.inProgress})
    const {employmentTypesFilterList} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const queryParams = employmentTypesFilterList.join()
    const url = `https://apis.ccbp.in/jobs?employment_type=${queryParams}&minimum_package=&search=`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
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
      this.setState({jobsApiStatus: apiStatusConstants.failure})
    }
  }

  getJobsBySalaryRangeFilter = async () => {
    this.setState({jobsApiStatus: apiStatusConstants.inProgress})
    const {salaryRangeFilter} = this.state
    // console.log({salaryRangeFilter})
    const jwtToken = Cookies.get('jwt_token')
    const queryParams = salaryRangeFilter
    const url = `https://apis.ccbp.in/jobs?employment_type=&minimum_package=${queryParams}&search=`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
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
      this.setState({jobsApiStatus: apiStatusConstants.failure})
    }
  }

  renderMainPageView = () => {
    const {searchInput} = this.state
    console.log('rendered')

    return (
      <div className="jobs-bg-container">
        <Header />
        <div className="jobs-main-container">
          <div className="search-container">
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
          {this.selectProfileViewByStatus()}
          <hr className="h-line" />
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
          <ul className="jobs-list-container">
            {this.selectJobsViewByStatus()}
          </ul>
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
            alt="logo"
            className="company-logo"
          />
          <div className="job-post-card-header-text-container">
            <h1 className="job-post-card-header-title">{jobData.title}</h1>
            <p className="job-post-card-header-rating">
              <AiFillStar /> {jobData.rating}
            </p>
          </div>
        </div>
        <div className="job-post-card-details-container">
          <div className="job-post-card-details-1">
            <div className="job-post-card-details-1-1">
              <p className="job-post-card-place">
                <MdLocationOn /> {jobData.location}
              </p>
              <p className="job-post-card-type-of-job">
                <BsFillBriefcaseFill /> {jobData.employmentType}
              </p>
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
    const {jobsData, isSearchFilterApplied, searchInput} = this.state
    const jobsDataFilteredWithSearch = jobsData.filter(eachJobData =>
      eachJobData.title.includes(searchInput),
    )
    return isSearchFilterApplied
      ? jobsDataFilteredWithSearch.map(eachJobData =>
          this.renderJobCard(eachJobData),
        )
      : jobsData.map(eachJobData => this.renderJobCard(eachJobData))
  }

  renderJobsFailureView = () => <div>Sorry Failed</div>

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

  renderProfileFailureView = () => <div>Hello</div>

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
