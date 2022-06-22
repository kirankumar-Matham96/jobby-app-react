import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {Component} from 'react'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmittingForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const {history} = this.props
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const jwtToken = await response.json()
      Cookies.set('jwt_token', jwtToken)
      history.replace('/')
    } else {
      console.log(await response.json())
    }

    this.setState({username: '', password: ''})
  }

  render() {
    const {username, password} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-bg-container">
        <div className="login-card-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo-login"
          />
          <form className="form-container" onSubmit={this.onSubmittingForm}>
            <label className="label" htmlFor="username">
              USERNAME
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="input"
              placeholder="Username"
              value={username}
              onChange={this.onChangeUsername}
            />
            <label className="label" htmlFor="password">
              PASSWORD
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="input"
              placeholder="Password"
              value={password}
              onChange={this.onChangePassword}
            />
            <button className="button" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
