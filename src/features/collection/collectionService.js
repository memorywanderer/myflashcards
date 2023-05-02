import axios from 'axios'
const API_URL = 'myflashcards-api.up.railway.app/api/collections/'

const getCollections = async (pageNumber, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.get(API_URL + `?page=${pageNumber}`, config)

  return response.data
}

const createCollection = async (collection, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.post(API_URL, collection, config)
  return response.data
}

const updateCollection = async ({ id, collectionData }, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.patch(API_URL + id, collectionData, config)
  return response.data
}

const deleteCollection = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.delete(API_URL + id, config)
  return response.data
}

export const collectionService = {
  getCollections,
  createCollection,
  updateCollection,
  deleteCollection
}