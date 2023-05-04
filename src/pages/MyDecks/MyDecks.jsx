import { useEffect, useState, useMemo, createRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, Link } from "react-router-dom"
import { toast } from "react-toastify"
import { getCollections } from "../../features/collection/collectionSlice"
import { Spinner } from "../../components/Spinner"
import { SingleDeck } from "../SingleDeck"
import { FaPlus } from "react-icons/fa"

import './MyDecks.css'
import { Dropdown } from "../../components/Dropdown/Dropdown"

export const MyDecks = ({
  pageNumber,
  handlePrevPage,
  handleNextPage,
  handleFirstPage,
  handleLastPage
}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector(state => state.auth)
  const { collections, hasMore, totalPages, isError, isLoading, message } = useSelector(state => state.collection)
  const [searchValue, setSearchValue] = useState('')
  const [dropdownValue, setDropdownValue] = useState('newest')

  const filteredCollections = useMemo(() => {
    const filtered = collections.filter(collection => (
      searchValue === '' || collection.name.toLowerCase().includes(searchValue.toLowerCase())
    ));

    return dropdownValue === 'newest' ? filtered.reverse() : filtered;
  }, [searchValue, dropdownValue, collections]);


  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (!user) {
      navigate('/login')
    } else {
      dispatch(getCollections(pageNumber))
    }
  }, [dispatch, navigate, isError, user, pageNumber])


  const handlingSearch = (e) => {
    setSearchValue(e.target.value)
  }

  if (isLoading) {
    return <Spinner />
  }
  return (
    <div className="decks flashcards__decks">
      <div className="decks__heading">
        <h1 className="title decks__title">Hello, {user?.firstName}!</h1>
        <p className="descr decks__descr">What do you want to learn today?</p>
        <form className="form">
          <input
            className="form__input"
            type="search"
            name="search"
            value={searchValue}
            onChange={handlingSearch}
            placeholder="Search for deck"
            autoComplete="off"
          />
        </form>
        <div className="decks__actions">
          <Link to='/new' className="link link--block decks__link">
            <FaPlus className="decks__icon" />
            Create new deck
          </Link>
          <Dropdown value={dropdownValue} onChange={(val) => setDropdownValue(val)} />
        </div>

      </div>

      <div className='decks__content'>
        {filteredCollections.length > 0 ? filteredCollections.map((coll) => {
          return <SingleDeck key={coll._id} deck={coll} />
        }) : (
          <div className="decks__empty">
            <p className="descr decks__descr">You haven't created decks yet</p>
          </div>
        )}
      </div>
      <div className="decks__pagination">
        <button
          className="btn"
          onClick={handleFirstPage}
          disabled={pageNumber === 1}
        >
          First
        </button>
        <button
          className="btn"
          onClick={handlePrevPage}
          disabled={pageNumber === 1}
        >
          Prev
        </button>
        <button
          className="btn btn--primary"
          disabled={!hasMore}
          onClick={handleNextPage}
        >
          Next
        </button>
        <button
          className="btn"
          disabled={!hasMore}
          onClick={() => handleLastPage(totalPages)}
        >
          Last
        </button>
      </div>
    </div>
  )
}