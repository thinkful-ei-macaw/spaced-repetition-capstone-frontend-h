import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Input, Required, Label } from '../Form/Form'
import AuthApiService from '../../services/auth-api-service'
import Button from '../Button/Button'

class RegistrationForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => { }
  }

  state = { error: null }

  firstInput = React.createRef()

  handleSubmit = ev => {
    ev.preventDefault()
    const { name, username, password } = ev.target
    AuthApiService.postUser({
      name: name.value,
      username: username.value,
      password: password.value,
    })
      .then(user => {
        name.value = ''
        username.value = ''
        password.value = ''
        this.props.onRegistrationSuccess()
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  componentDidMount() {
    this.firstInput.current.focus()
  }

  render() {
    const { error } = this.state
    return (
      <form
        onSubmit={this.handleSubmit}
        className="registration-form"
      >
        <div role='alert'>
          {error && <p>{error}</p>}
        </div>
        <div>
          <Label 
          className='registration-name-input'
          htmlFor='registration-name-input'
          required>
          </Label>
          <Input
            ref={this.firstInput}
            placeholder='Enter your name here'
            id='registration-name-input'
            name='name'
            required
          />
        </div>
        <div>
          <Label 
          className='registration-username-input'
          htmlFor='registration-username-input'
          required>
          </Label>
          <Input
            placeholder='Choose a username'
            id='registration-username-input'
            name='username'
            required
          />
        </div>
        <div>
          <Label 
          className='registration-password-input'
          htmlFor='registration-password-input'
          required>
          </Label>
          <Input
          placeholder='Choose a password'
            id='registration-password-input'
            name='password'
            type='password'
            required
          />
        </div>
        <footer className='registration-footer'>
          <Button 
          className='sign-up'
          type='submit'>
            Sign up
          </Button>
          {' '}
          <Link to='/login'>Already have an account?</Link>
        </footer>
      </form>
    )
  }
}

export default RegistrationForm
