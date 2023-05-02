import { useEffect, useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { register, reset } from '../../features/auth/authSlice'
import { toast } from 'react-toastify'
import loginImg from '../../assets/brooke-cagle-LCcFI_26diA-unsplash.jpg'
import './Register.css'
import { Spinner } from '../../components/Spinner'

export const Register = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password2: ''
  })
  const { firstName, lastName, email, password, password2 } = formData
  const { isSuccess, isError, user, message, isLoading } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }
    dispatch(reset())
  }, [isSuccess, isError, user, message, isLoading])

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
    if (password !== password2) {
      toast.error('Passwords do not match')
    } else {
      const userData = {
        firstName,
        lastName,
        email,
        password,
        password2
      }
      dispatch(register(userData))
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className='register flashcards__register'>
      <section className='heading register__heading'>
        <h1 className='title register__title'>
          <FaUser className='register__icon' />Register
        </h1>
        <p className='descr register__descr'>Please create an account</p>
      </section>
      <section className="register__content">
        <div className="register__left">

          <div className='form register__form'>
            <form onSubmit={handleOnSubmit}>
              <div className='form__group'>
                <input
                  className='form__input'
                  type="text"
                  name='firstName'
                  onChange={handleOnChange}
                  value={firstName}
                  placeholder='Your first name'
                  required
                />
                <label className='form__label' htmlFor='firstName'>Your first name</label>
              </div>
              <div className='form__group'>
                <input
                  className='form__input'
                  type="text"
                  name='lastName'
                  onChange={handleOnChange}
                  value={lastName}
                  placeholder='Your last name'
                  required
                />
                <label className='form__label' htmlFor='lastName'>Your last name</label>
              </div>
              <div className='form__group'>
                <input
                  className='form__input'
                  type="text"
                  name='email'
                  onChange={handleOnChange}
                  value={email}
                  placeholder='Your email'
                  required
                />
                <label className='form__label' htmlFor='lastName'>Your email</label>
              </div>
              <div className='form__group'>
                <input
                  className='form__input'
                  type="password"
                  name='password'
                  onChange={handleOnChange}
                  value={password}
                  placeholder='Your password'
                  required
                />
                <label className='form__label' htmlFor='password'>Your password</label>
              </div>
              <div className='form__group'>
                <input
                  className='form__input'
                  type="password"
                  name='password2'
                  onChange={handleOnChange}
                  value={password2}
                  placeholder='Confirm password'
                  required
                />
                <label className='form__label' htmlFor='password2'>Confirm password</label>
              </div>

              <button
                className='btn btn--primary register__btn'
                type='submit'
              >
                Register
              </button>

            </form>
            <div className="form__bottom">
              <span>Already have an account?</span>
              <Link
                className="form__link"
                to='/login'>
                Log in
              </Link>
            </div>

          </div>
        </div>
        <div className="register__image">
          <img src={loginImg} alt="A women is studying" />
        </div>
      </section>
    </div>
  )
}