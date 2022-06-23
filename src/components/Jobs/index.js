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
import {BsSearch} from 'react-icons/bs'
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
    jobsData: {},
    searchInput: '',
    isSearchFilterApplied: false,
    employmentTypesFilterList: [],
    salaryRangeList: [],
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
        this.getJobsByTypeFilter(),
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
        this.getJobsByTypeFilter(),
      )
      //   this.getJobsByTypeFilter() // <== for debugging
    }
  }

  onSelectingSalaryRangeFilter = event => {
    if (event.target.checked === true) {
      this.setState(
        prevState => ({
          salaryRangeList: [...prevState.salaryRangeList, event.target.value],
        }),
        this.getJobsBySalaryRangeFilter,
      )
      //   this.getJobsBySalaryRangeFilter(event.target.value)
      //   this.getJobsBySalaryRangeFilter()
    } else {
      this.setState(
        prevState => ({
          salaryRangeList: prevState.salaryRangeList.includes(
            event.target.value,
          )
            ? prevState.salaryRangeList.filter(
                eachItem => eachItem !== event.target.value,
              )
            : prevState.salaryRangeList,
        }),
        this.getJobsBySalaryRangeFilter,
      )
      //   this.getJobsBySalaryRangeFilter() // <== for debugging
    }
  }

  getJobsByTypeFilter = () => {
    const {employmentTypesFilterList} = this.state
    console.log({employmentTypesFilterList}) // TODO: this is one step behind. Need to fix the delay.
    // const jwtToken = Cookies.get('jwt_token')
    // const yo = queryParams
    // const typeIdsList = employmentTypesList.map(
    //   eachEmploymentType => eachEmploymentType.employmentTypeId,
    // )
    // const str = typeIdsList.join()
    // console.log(str)
    // const url = `https://apis.ccbp.in/jobs?employment_type=FULLTIME,PARTTIME&minimum_package=1000000&search=`
    // const options = {
    //   method: 'GET',
    //   headers: {
    //     Authorization: `Bearer ${jwtToken}`,
    //   },
    // }
    // const response = await fetch(url, options)
    // const data = await response.json()
    // console.log(data)
  }

  getJobsBySalaryRangeFilter = async () => {
    // const {salaryRangeList} = this.state
    // console.log({salaryRangeList})
    // const jwtToken = Cookies.get('jwt_token')
    // const yo = queryParams
    // const typeIdsList = employmentTypesList.map(
    //   eachEmploymentType => eachEmploymentType.employmentTypeId,
    // )
    // const str = typeIdsList.join()
    // console.log(str)
    // console.log(yo)
    // const url = `https://apis.ccbp.in/jobs?employment_type=FULLTIME,PARTTIME&minimum_package=1000000&search=`
    // const options = {
    //   method: 'GET',
    //   headers: {
    //     Authorization: `Bearer ${jwtToken}`,
    //   },
    // }
    // const response = await fetch(url, options)
    // const data = await response.json()
    // console.log(data)
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
              <li className="type-of-employment-list-item">
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
              <li className="salary-range-list-item">
                <input
                  type="radio"
                  className="filter-input"
                  name="salaryRange"
                  id={eachSalaryRange.salaryRangeId}
                  value={eachSalaryRange.label}
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
          {this.selectJobsViewByStatus()}
        </div>
      </div>
    )
  }

  renderJobCard = jobData => (
    <div className="job-post-card-container">
      <div className="job-post-card-header-container">
        <img src={jobData.companyLogoUrl} alt="logo" className="company-logo" />
        <div className="job-post-card-header-text-container">
          <h1 className="job-post-card-header-title">{jobData.title}</h1>
          <p className="job-post-card-header-rating">
            <star>star</star> {jobData.rating}
          </p>
        </div>
      </div>
      <div className="job-post-card-details-container">
        <div className="job-post-card-details-1">
          <div className="job-post-card-details-1-1">
            <p className="job-post-card-place">
              <icon>location</icon> {jobData.location}
            </p>
            <p className="job-post-card-type-of-job">
              <icon>bag</icon> {jobData.employmentType}
            </p>
          </div>
          <p className="job-post-card-salary">{jobData.packagePerAnnum}</p>
        </div>

        <hr className="h-line" />
        <h1 className="job-post-card-description-title">Description</h1>
        <p className="job-post-card-description">{jobData.jobDescription}</p>
      </div>
    </div>
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
    // {this.renderProfileView()}
  }
}

export default Jobs
