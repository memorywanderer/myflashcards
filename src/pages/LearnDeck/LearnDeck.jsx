import { useNavigate, Link } from "react-router-dom";
import { useDeck } from "../../components/DeckLayout";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getCards } from "../../features/card/cardSlice";
import { Spinner } from "../../components/Spinner";
import { useEffect, useMemo, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import './LearnDeck.css'

export const LearnDeck = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const deck = useDeck()
  const { user } = useSelector((state) => state.auth)
  const { cards, isError, isLoading, message } = useSelector((state) => state.card)
  const deckCards = useMemo(() => { return cards.filter(card => deck.cards.includes(card._id)) }, [cards])

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (!user) {
      navigate('/login')
    } else {
      dispatch(getCards())
    }
  }, [dispatch, navigate, user, isError])

  const setNextCard = () => {
    setCurrentCardIndex((prevIndex) => {
      return (prevIndex + 1) % deckCards.length
    })
  }

  const setPrevCard = () => {
    setCurrentCardIndex((prevIndex) => {
      return (prevIndex - 1 + deckCards.length) % deckCards.length
    })
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className="learn flashcards__learn">
      <div className="learn__heading">
        <Link to='/decks' className="link learn__link"><FaArrowLeft className="learn__icon learn__icon--left" />Back</Link>
        <h1 className="title learn__title">{deck.name}</h1>
      </div>
      <div className="learn__content">
        <div className="learn__slider slider">
          {deckCards.length > 0 &&
            <div
              className={(isFlipped) ? `card card--flipped` : 'card'}
              onClick={() => setIsFlipped(!isFlipped)}
              key={deckCards[currentCardIndex]._id}
            >
              <div className="card__back">
                <div className="card__content">
                  {deckCards[currentCardIndex].description}

                </div>
              </div>
              <div className="card__front">
                <div className="card__content">
                  {deckCards[currentCardIndex].term}

                </div>
              </div>
            </div>
          }
        </div>
        <div className="learn__actions">
          <button className="btn learn__btn" onClick={setPrevCard}><FaArrowLeft className="learn__icon learn__icon--left" />Prev</button>
          <div className="learn__slides">{currentCardIndex + 1} / {deckCards.length}</div>
          <button className="btn learn__btn" onClick={setNextCard}>Next<FaArrowRight className="learn__icon" /></button>
        </div>
      </div>
    </div>
  )
}