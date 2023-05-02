import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { cardService } from "./cardService"

const initialState = {
  cards: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: ''
}

const handleError = (error, thunkAPI) => {
  const message = (
    error.response &&
    error.response.data &&
    error.response.data.message) &&
    error.message ||
    error.toString()
  return thunkAPI.rejectWithValue(message)
}

export const getCards = createAsyncThunk(
  'card/get',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await cardService.getCards(token)
    } catch (error) {
      handleError(error, thunkAPI)
    }
  }
)

export const createCard = createAsyncThunk(
  'card/create',
  async (card, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await cardService.createCard(card, token)
    } catch (error) {
      handleError(error, thunkAPI)
    }
  }
)
export const updateCard = createAsyncThunk(
  'card/update',
  async ({ id, card }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await cardService.updateCard({ id, card }, token)
    } catch (error) {
      handleError(error, thunkAPI)
    }
  }
)

export const deleteCard = createAsyncThunk(
  'card/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await cardService.deleteCard(id, token)
    } catch (error) {
      handleError(error, thunkAPI)
    }
  }
)

const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = false
    }
  },
  extraReducers: (builder) => {
    builder
      // Get Cards
      .addCase(
        getCards.pending,
        (state) => {
          state.isLoading = true
        }
      )
      .addCase(
        getCards.fulfilled,
        (state, action) => {
          state.isSuccess = true
          state.isLoading = false
          state.cards = action.payload
        }
      )
      .addCase(
        getCards.rejected,
        (state, action) => {
          state.isError = true
          state.isLoading = false
          state.cards = []
          state.message = action.payload
        }
      )
      // Create Card
      .addCase(
        createCard.pending,
        (state) => {
          state.isLoading = true
        }
      )
      .addCase(
        createCard.fulfilled,
        (state, action) => {
          state.isSuccess = true
          state.isLoading = false
          state.cards.push(action.payload)
        }
      )
      .addCase(createCard.rejected,
        (state, action) => {
          state.isError = true
          state.isLoading = false
          state.cards = []
          state.message = action.payload
        }
      )
      // Update Card
      .addCase(
        updateCard.pending,
        (state) => {
          state.isLoading = true
        }
      )
      .addCase(
        updateCard.fulfilled,
        (state, action) => {
          state.isSuccess = true
          state.isLoading = false
          state.cards = state.cards.map(card => {
            if (card._id === action.payload.id) {
              return action.payload
            }
            return card
          })
        }
      )
      .addCase(
        updateCard.rejected,
        (state, action) => {
          state.isError = true
          state.isLoading = false
          state.cards = []
          state.message = action.payload
        }
      )
      // Delete Card
      .addCase(
        deleteCard.pending,
        (state) => {
          state.isLoading = true
        }
      )
      .addCase(
        deleteCard.fulfilled,
        (state, action) => {
          state.isSuccess = true
          state.isLoading = false
          state.cards = state.cards.filter(card => {
            return action.payload.id !== card._id
          })
        }
      )
      .addCase(
        deleteCard.rejected,
        (state, action) => {
          state.isError = true
          state.isLoading = false
          state.cards = []
          state.message = action.payload
        }
      )
  }
})

export const { reset } = cardSlice.actions
export default cardSlice.reducer