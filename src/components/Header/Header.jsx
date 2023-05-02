import { Link, useNavigate } from "react-router-dom"
import { FaSignInAlt, FaSignOutAlt, FaUser, FaPlus } from 'react-icons/fa'
import { useDispatch, useSelector } from "react-redux"
import { logout, reset } from "../../features/auth/authSlice"

import './Header.css'

export const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  const { user } = useSelector((state) => state.auth)

  return (
    <header className="header flashcards__header">
      <Link className="header__logo" to='/'>
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect y="16.9706" width="24" height="24" transform="rotate(-45 0 16.9706)" fill="#409CFF" />
        </svg>
        My flashcards
      </Link>
      <nav className="header__nav">
        <ul className="header__menu">
          {user
            ? (<><li className="header__item">
              <button className="btn" onClick={onLogout}><FaSignOutAlt className="header__icon" /> Log out</button>
            </li>

            </>
            ) : (
              <>
                <li className="header__item">
                  <Link
                    className="link header__link"
                    to='/login'>
                    <FaSignInAlt className="header__icon" />
                    Login
                  </Link>
                </li>
              </>
            )}

        </ul>
      </nav>

    </header>
  )
}