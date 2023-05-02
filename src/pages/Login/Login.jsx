import { useState, useEffect } from 'react'
import { FaSignInAlt, FaUser } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { login, reset } from '../../features/auth/authSlice'
import { Spinner } from '../../components/Spinner'
import { toast } from 'react-toastify'
import loginImg from '../../assets/brooke-cagle-LCcFI_26diA-unsplash.jpg'

import './Login.css'

export const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const { email, password } = formData
  const { user, isLoading, isSuccess, isError, message } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess || user) {
      navigate('/decks')
    }
    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => {
      return {
        ...prevState,
        [name]: value
      }
    })
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password
    }
    dispatch(login(userData))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className='login flashcards__login'>
      <section className='login__heading'>
        <h1 className='title login__title'>
          <FaUser className='login__icon' />Login
        </h1>
        <p className='descr  login__descr'>Please, log in to your account</p>
      </section>
      <section className="login__content">
        <div className="login__left">
          <div className='form login__form'>
            <form onSubmit={handleOnSubmit}>
              <div className='form__group'>
                <input
                  className='form__input'
                  type="text"
                  name='email'
                  onChange={handleOnChange}
                  value={email}
                  placeholder='Your email'
                />
                <label className='form__label' htmlFor="email">Your email</label>
              </div>
              <div className='form__group'>
                <input
                  className='form__input'
                  type="password"
                  name='password'
                  onChange={handleOnChange}
                  value={password}
                  placeholder='Your password'
                />
                <label className='form__label' htmlFor="password">Your password</label>
              </div>
              <div className='form-group'>
                <button className='btn btn--primary login__btn' type='submit'>Login</button>
              </div>
            </form>
            <div className="form__bottom">
              <span>Don't have an account?</span>
              <Link
                className="form__link"
                to='/register'>
                Create an account
              </Link>
            </div>

          </div>
        </div>

        <div className="login__image">
          <img src={loginImg} alt="A women is studying" />
        </div>
      </section>
    </div>
  )
}