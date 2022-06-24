import Header from '../Header'
import './index.css'

const Home = props => {
  const onClickFindJobButton = () => {
    const {history} = props
    history.push('/jobs')
  }

  return (
    <div className="home-bg-container">
      <Header />
      <div className="home-main-container">
        <div className="home-text-container">
          <h1 className="main-heading">Find The Job That Fits Your Life</h1>
          <p className="home-description">
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job that fits your abilities and
            potential.
          </p>
          <button
            type="button"
            onClick={onClickFindJobButton}
            className="find-jobs-button"
          >
            Find Jobs
          </button>
        </div>
      </div>
    </div>
  )
}
export default Home
