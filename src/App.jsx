import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { Dashboard } from './pages/Dashboard/Dashboard'
import { Login } from './pages/Login/Login'
import { Register } from './pages/Register/Register'
import { Header } from "./components/Header/Header"
import { MyDecks } from "./pages/MyDecks/MyDecks"
import { NewDeck } from "./pages/NewDeck/NewDeck"
import { EditDeck } from "./pages/EditDeck/EditDeck"
import { DeckLayout } from "./components/DeckLayout"
import { LearnDeck } from './pages/LearnDeck/LearnDeck'
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { useState } from "react"

function App() {
  const [pageNumber, setPageNumber] = useState(1)

  const handlePrevPage = () => {
    pageNumber > 1 && setPageNumber(pageNumber - 1)
  }

  const handleNextPage = () => {
    setPageNumber(pageNumber + 1)
  }
  const handleFirstPage = () => {
    setPageNumber(1)
  }

  const handleLastPage = (pages) => {
    setPageNumber(pages)
  }
  return (
    <>
      <Router>
        <div className="flashcards">
          <Header />
          <div className="container">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/decks" element={
                <MyDecks
                  pageNumber={pageNumber}
                  handlePrevPage={handlePrevPage}
                  handleNextPage={handleNextPage}
                  handleFirstPage={handleFirstPage}
                  handleLastPage={handleLastPage}
                />
              }
              />
              <Route path="/new" element={<NewDeck />} />
              <Route path="/decks/:id" element={<DeckLayout pageNumber={pageNumber} />}>
                <Route path="learn" element={<LearnDeck />} />
                <Route path="edit" element={<EditDeck />} />
              </Route>
              <Route path='*' element={<Navigate to='/' />} />
            </Routes>
          </div>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
