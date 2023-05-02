import './Dashboard.css'
import { Link, useNavigate } from "react-router-dom"
import landingImg from '../../assets/annie-spratt-xKJUnFwfz3s-unsplash.jpg'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
export const Dashboard = () => {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (user) {
      navigate('/decks')
    }
  }, [user])
  return (
    <div className="landing flashcards__landing">
      <div className="landing__left">
        <h1 className="landing__title">
          Free digital flashcards that made for you
        </h1>
        <p className="landing__subtitle">
          Join and create your first deck, that helps you learn something new, improve grades and reach new goals.
        </p>
        <Link to='/register'>
          <button className="btn btn--primary landing__btn">Sign up for free</button>
        </Link>
      </div>
      <div className="landing__image">
        <img src={landingImg} alt="A girl with a laptop" />
      </div>
    </div>
  )
}