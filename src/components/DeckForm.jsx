import { useState, useMemo, useEffect, useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { updateCollection } from "../features/collection/collectionSlice"
import { createCard, deleteCard, getCards, updateCard } from "../features/card/cardSlice"
import { toast } from "react-toastify"
import { FaTrash } from "react-icons/fa"
import { Spinner } from "./Spinner"

export const DeckForm = ({ deck = {} }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { cards, isError, isLoading, message } = useSelector((state) => state.card)
  const { user } = useSelector(state => state.auth)

  // Get cards of current collection
  const currentDeckCards = useMemo(() => {
    return cards.filter(card => deck.cards.includes(card._id))
  }, [cards])

  // Fetch cards from database
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (user === null || user === undefined) {
      navigate('/login')
    } else {
      dispatch(getCards())
    }
  }, [dispatch, navigate, isError, user])

  // Set cards to edit
  const [cardForms, setCardForms] = useState([])

  useEffect(() => {
    setCardForms(currentDeckCards.map(deckCard => {
      return {
        _id: deckCard._id,
        term: deckCard.term,
        description: deckCard.description
      }
    }));
  }, [currentDeckCards]);


  // Handle collection form 
  const [collectionFormData, setCollectionFormData] = useState({
    name: deck.name,
    description: deck.description
  })

  const { name, description } = useMemo(() => collectionFormData, [collectionFormData])

  const handleCollectionChange = useCallback((e) => {
    const { name, value } = e.target
    setCollectionFormData((prevState) => {
      return {
        ...prevState,
        [name]: value
      }
    })
  }, [name, description])

  // Handle card form
  const handleCardChange = useCallback((e, index) => {
    const { name, value } = e.target
    const newForms = [...cardForms]
    newForms[index] = {
      ...newForms[index],
      [name]: value
    }
    setCardForms(newForms)
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  }, [cardForms])


  // Add a new card to collection
  const handleAddForm = () => {
    const newForms = [
      ...cardForms,
      {
        term: '',
        description: ''
      }
    ]
    setCardForms(newForms)
  }

  const handleDeleteCard = (cardId, index) => {
    if (cardId)
      dispatch(deleteCard(cardId))
    // slice from start to index of deleting element, and concat remaining elements
    setCardForms(prevForms => prevForms.slice(0, index).concat(prevForms.slice(index + 1)))
  }

  // Update collection with new and updated cards
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const updatedCards = cardForms.filter(card => card._id)
      const newCards = cardForms.filter(card => !card._id)

      const createdCards = await Promise.all(newCards.map(async (card) => {
        const newCard = await dispatch(createCard({
          term: card.term,
          description: card.description,
          collectionRef: deck._id
        }))

        return newCard
      }))

      if (updatedCards.length > 0) {
        for (const card of updatedCards) {
          dispatch(updateCard({
            id: card._id,
            card: {
              term: card.term,
              description: card.description
            }
          }))
        }
      }

      dispatch(updateCollection({
        id: deck._id,
        collectionData: {
          name: collectionFormData?.name,
          description: collectionFormData?.description,
          cards: [...currentDeckCards.map(card => card._id), ...createdCards.map(card => card.payload._id)]
        }
      }))

      toast.success('Deck saved successfully')
      navigate('/decks')
    } catch (error) {
      console.log(error)
    }

  }

  if (isLoading) {
    return <Spinner />
  }
  return (
    <form className="form edit__form" onSubmit={handleSubmit}>
      <div className="form__group">
        <input
          className='form__input'
          type="text"
          name='name'
          onChange={handleCollectionChange}
          value={name}
          placeholder='Name your collection'
          required
        />
        <label htmlFor="name" className="form__label">Name</label>
      </div>
      <div className="form__group">
        <input
          className='form__input'
          type="text"
          name='description'
          onChange={handleCollectionChange}
          value={description}
          placeholder='Add a description'
        />
        <label htmlFor="description" className="form__label">Description</label>
      </div>
      <div className="form__cards">
        {cardForms.map((card, index) => (
          <div className="form__card" key={card._id || index}>
            <div className="form__title">Card #{index + 1}</div>
            <div className="form__group">
              <textarea
                className='form__input form__input--textarea'
                name='term'
                onChange={(e) => handleCardChange(e, index)}
                value={card.term}
                placeholder='Add a term'
                required
              />
              <label htmlFor="term" className="form__label">Term</label>
            </div>
            <div className="form__group">
              <textarea
                className='form__input form__input--textarea'
                name='description'
                onChange={(e) => handleCardChange(e, index)}
                value={card.description}
                placeholder='Add a description'
                required
              />
              <label htmlFor="description" className="form__label">Description</label>
            </div>

            <button className="btn btn--right" onClick={e => handleDeleteCard(card._id, index)}><FaTrash /></button>

          </div>
        ))}
        <button className='btn' type='button' onClick={handleAddForm}>Add card</button>
      </div>

      <button className='btn form__btn btn--primary' type="submit">Save</button>
    </form>
  )
}