import {Component} from 'react'

import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', failureText: ''}

  getUserName = event => {
    this.setState({username: event.target.value})
  }

  getPassword = event => {
    this.setState({password: event.target.value})
  }

  loginSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    this.setState({failureText: ''})
    const {history} = this.props
    history.replace('/')
  }

  loginFailure = errorMsg => {
    this.setState({
      failureText: `*${errorMsg}`,
      username: '',
      password: '',
    })
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.loginSuccess(data.jwt_token)
    } else {
      this.loginFailure(data.error_msg)
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const {failureText, username, password} = this.state
    return (
      <div className="bg-container">
        <div className="container">
          <div className="imageContainer">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              className="imageLogo"
              alt="website logo"
            />
          </div>
          <form className="formLogin" onSubmit={this.submitForm}>
            <label htmlFor="input1" className="lab1">
              USERNAME
            </label>
            <div>
              <input
                id="input1"
                placeholder="Username"
                className="inputEle"
                type="text"
                value={username}
                onChange={this.getUserName}
              />
            </div>

            <label htmlFor="input2" className="lab1">
              PASSWORD
            </label>
            <div>
              <input
                id="input2"
                placeholder="Password"
                className="inputEle"
                type="password"
                value={password}
                onChange={this.getPassword}
              />
            </div>
            <button type="submit" className="loginButton">
              Login
            </button>
          </form>
          <p className="failtext"> {failureText} </p>
        </div>
      </div>
    )
  }
}

export default Login
