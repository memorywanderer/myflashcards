import { createCollection, updateCollection } from "../../features/collection/collectionSlice"
import { useNavigate, Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect, useCallback } from "react"
import { createCard } from "../../features/card/cardSlice"
import { Spinner } from "../../components/Spinner"
import { toast } from "react-toastify"
import { FaTrash, FaArrowLeft } from "react-icons/fa"

import './NewDeck.css'

export const NewDeck = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user } = useSelector(state => state.auth)
  const { isLoading } = useSelector(state => state.collection)

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user])

  // Set cards to edit
  const [cardForms, setCardForms] = useState([{
    term: '',
    description: ''
  }])


  // Handle collection form 
  const [collectionFormData, setCollectionFormData] = useState({
    name: '',
    description: ''
  })

  const { name, description } = collectionFormData

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
  }, [cardForms])

  // Add a new card to collection
  const handleAddForm = () => {
    setCardForms(prevForms => {
      return [...prevForms, { term: '', description: '' }]
    })
  }

  const handleDeleteCard = (index) => {
    setCardForms(prevForms => {
      return prevForms.filter((_, i) => index !== i)
    })
  }

  // Update collection with new and updated cards
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const newDeck = await dispatch(createCollection({
        collection: {
          name: collectionFormData.name,
          description: collectionFormData.description
        }
      }))

      let createdCards = []
      console.log('New deck cardForms', cardForms)
      if (cardForms.length > 0) {

        createdCards = await Promise.all(cardForms.map(async (card) => {
          const newCard = await dispatch(createCard({
            term: card.term,
            description: card.description,
            collectionRef: newDeck.payload._id
          }))

          return newCard
        }))
      }
      console.log('New deck created cards', createdCards)

      await dispatch(updateCollection({
        id: newDeck.payload._id,
        collectionData: {
          cards: [...createdCards.map(card => card.payload._id)]
        }
      }))
      toast.success('Deck created successfully')
      navigate('/decks')
    } catch (error) {
      console.error(error)
    }

  }

  if (isLoading) {
    return <Spinner />
  }
  return (
    <div className="new flashcards__new">
      <div className="heading new__heading">
        <Link to='/decks' className="link new__link"><FaArrowLeft className="learn__icon learn__icon--left" />Back</Link>
        <h1 className="title">New deck</h1>
      </div>
      <form className="form flashcards__form" onSubmit={handleSubmit}>
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
            <div className="form__card" key={index}>
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

              <button className="btn btn--right" type="button" onClick={e => handleDeleteCard(index)}><FaTrash /></button>

            </div>
          ))}
          <button className='btn' type='button' onClick={handleAddForm}>Add card</button>
        </div>

        <button className='btn form__btn btn--primary' type="submit">Save</button>
      </form>
    </div>
  )
}