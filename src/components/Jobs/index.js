import {BsSearch} from 'react-icons/bs'
import {Component} from 'react'
import Header from '../Header'
import './index.css'

class Jobs extends Component {
  render() {
    return (
      <div className="jobs-bg-container">
        <Header />
        <div className="jobs-main-container">
          <div className="search-container">
            <input
              type="search"
              placeholder="Search"
              className="search-input"
            />
            <button type="button" className="search-icon-btn">
              <BsSearch className="search-icon" />
            </button>
          </div>
          <div className="profile-card-container">
            <img src="" alt="profile" className="profile-img" />
            <h1 className="profile-card-title">Rahul Attuluri</h1>
            <p className="profile-card-description">
              Lead Software Developer and AI-ML expert
            </p>
          </div>
          <hr className="h-line" />
          <ul className="type-of-employment-list-container">
            <li className="type-of-employment-list-item">
              <input
                type="checkbox"
                className="filter-input"
                name="fullTime"
                id="fullTime"
              />
              <label className="filter-label" htmlFor="fullTime">
                FullTime
              </label>
            </li>
            <li className="type-of-employment-list-item">
              <input
                type="checkbox"
                className="filter-input"
                name="fullTime"
                id="fullTime"
              />
              <label className="filter-label" htmlFor="fullTime">
                FullTime
              </label>
            </li>
            <li className="type-of-employment-list-item">
              <input
                type="checkbox"
                className="filter-input"
                name="fullTime"
                id="fullTime"
              />
              <label className="filter-label" htmlFor="fullTime">
                FullTime
              </label>
            </li>
            <li className="type-of-employment-list-item">
              <input
                type="checkbox"
                className="filter-input"
                name="fullTime"
                id="fullTime"
              />
              <label className="filter-label" htmlFor="fullTime">
                FullTime
              </label>
            </li>
            <li className="type-of-employment-list-item">
              <input
                type="checkbox"
                className="filter-input"
                name="fullTime"
                id="fullTime"
              />
              <label className="filter-label" htmlFor="fullTime">
                FullTime
              </label>
            </li>
            <li className="type-of-employment-list-item">
              <input
                type="checkbox"
                className="filter-input"
                name="fullTime"
                id="fullTime"
              />
              <label className="filter-label" htmlFor="fullTime">
                FullTime
              </label>
            </li>
          </ul>
          <hr className="h-line" />
          <ul className="salary-range-list-container">
            <li className="salary-range-list-item">
              <input
                type="radio"
                className="filter-input"
                name="10LPA"
                id="10LPA"
              />
              <label className="filter-label" htmlFor="10LPA">
                10 LPA and above
              </label>
            </li>
            <li className="salary-range-list-item">
              <input
                type="radio"
                className="filter-input"
                name="10LPA"
                id="10LPA"
              />
              <label className="filter-label" htmlFor="10LPA">
                10 LPA and above
              </label>
            </li>
            <li className="salary-range-list-item">
              <input
                type="radio"
                className="filter-input"
                name="10LPA"
                id="10LPA"
              />
              <label className="filter-label" htmlFor="10LPA">
                10 LPA and above
              </label>
            </li>
            <li className="salary-range-list-item">
              <input
                type="radio"
                className="filter-input"
                name="10LPA"
                id="10LPA"
              />
              <label className="filter-label" htmlFor="10LPA">
                10 LPA and above
              </label>
            </li>
            <li className="salary-range-list-item">
              <input
                type="radio"
                className="filter-input"
                name="10LPA"
                id="10LPA"
              />
              <label className="filter-label" htmlFor="10LPA">
                10 LPA and above
              </label>
            </li>
            <li className="salary-range-list-item">
              <input
                type="radio"
                className="filter-input"
                name="10LPA"
                id="10LPA"
              />
              <label className="filter-label" htmlFor="10LPA">
                10 LPA and above
              </label>
            </li>
          </ul>
          <div className="job-post-card-container">
            <div className="job-post-card-header-container">
              <img src="" alt="" className="company-logo" />
              <div className="job-post-card-header-text-container">
                <h1 className="job-post-card-header-title">Devops Engineer</h1>
                <p className="job-post-card-header-rating">
                  <star>star</star> 4
                </p>
              </div>
            </div>
            <div className="job-post-card-details-container">
              <div className="job-post-card-details-1">
                <div className="job-post-card-details-1-1">
                  <p className="job-post-card-place">
                    <icon>location</icon> Delhi
                  </p>
                  <p className="job-post-card-type-of-job">
                    <icon>bag</icon> Internship
                  </p>
                </div>
                <p className="job-post-card-salary">10LPA</p>
              </div>

              <hr className="h-line" />
              <h1 className="job-post-card-description-title">Description</h1>
              <p className="job-post-card-description">
                Description Description
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
