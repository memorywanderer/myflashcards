import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteCollection } from '../features/collection/collectionSlice'
import { DeleteDialog } from '../components/DeleteDialog'
import { forwardRef, useState } from 'react'
import { FaPen, FaTrash, FaEllipsisV } from 'react-icons/fa'


export const SingleDeck = forwardRef(({ deck }, ref) => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [showDeckMenu, setShowDeckMenu] = useState(false)

  const dispatch = useDispatch()
  const handleDelete = () => {
    setShowDeleteConfirmation(true)
  }
  const onDeleteDeck = (deckID) => {
    dispatch(deleteCollection(deckID))
  }
  return (
    <>
      <div ref={ref} className='deck flashcards__deck'>
        <div className="deck__top">
          <h2 className='deck__title'>{deck.name}</h2>
          <p className='deck__descr'>{deck.description}</p>
        </div>
        <div className="deck__actions">
          <Link className='link link--primary deck__link' to={`/decks/${deck._id}/learn`} aria-label='Learn deck'>
            Learn deck
          </Link>
          <button className='btn' onClick={() => setShowDeckMenu(!showDeckMenu)} aria-label='Deck settings'><FaEllipsisV /></button>
          <div className={(showDeckMenu) ? 'deck__menu deck__menu--active' : 'deck__menu'}>
            <Link className='link deck__link' to={`/decks/${deck._id}/edit`} aria-label='Edit deck'>
              <FaPen className='deck__icon' />
            </Link>
            <button
              className="btn"
              onClick={handleDelete}
              aria-label='Delete deck'
            >
              <FaTrash className='deck__icon deck__icon--red ' />
            </button>
          </div>

        </div>
      </div>
      <DeleteDialog
        isOpen={showDeleteConfirmation}
        onCancel={() => setShowDeleteConfirmation(false)}
        onConfirm={() => onDeleteDeck(deck._id)}
      />
    </>
  )
})