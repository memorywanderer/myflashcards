import { Link } from "react-router-dom";
import { DeckForm } from "../../components/DeckForm";
import { useDeck } from "../../components/DeckLayout";
import './EditDeck.css'
import { FaArrowLeft } from "react-icons/fa";

export const EditDeck = () => {
  const deck = useDeck()
  return (
    <div className="edit flashcarsd__edit">
      <div className="edit__heading">
        <Link to='/decks' className="link edit__link"><FaArrowLeft className="learn__icon learn__icon--left" />Back</Link>
        <h1 className="title edit__title">Edit Deck {deck.name}</h1>
      </div>
      <DeckForm deck={deck} />
    </div>
  );
}