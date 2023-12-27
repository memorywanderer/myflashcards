import axios from 'axios'
const API_URL = 'https://myflashcards-api.vercel.app/api/cards/'

const getCards = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.get(API_URL, config)
  return response.data
}

const createCard = async (card, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.post(API_URL, card, config)
  console.log("Response of created card", response)
  return response.data
}

const updateCard = async ({ id, card }, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.patch(API_URL + id, card, config)
  return response.data
}

const deleteCard = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.delete(API_URL + id, config)
  return response.data
}

export const cardService = {
  getCards,
  createCard,
  updateCard,
  deleteCard
}