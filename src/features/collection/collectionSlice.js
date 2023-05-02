import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { collectionService } from "./collectionService"

const initialState = {
  collections: [],
  hasMore: false,
  totalPages: 0,
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

export const getCollections = createAsyncThunk(
  'collection/get',
  async (pageNumber, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await collectionService.getCollections(pageNumber, token)
    } catch (error) {
      handleError(error, thunkAPI)
    }
  }
)

export const createCollection = createAsyncThunk(
  'collection/create',
  async ({ collection }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await collectionService.createCollection(collection, token)
    } catch (error) {
      handleError(error, thunkAPI)
    }
  }
)
export const updateCollection = createAsyncThunk(
  'collection/update',
  async ({ id, collectionData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await collectionService.updateCollection({ id, collectionData }, token)
    } catch (error) {
      handleError(error, thunkAPI)
    }
  }
)

export const deleteCollection = createAsyncThunk(
  'collection/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await collectionService.deleteCollection(id, token)
    } catch (error) {
      handleError(error, thunkAPI)
    }
  }
)

const collectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = false
      state.hasMore = false
      state.totalPages = 0
    }
  },
  extraReducers: (builder) => {
    builder
      // Get collections
      .addCase(
        getCollections.pending,
        (state) => {
          state.isLoading = true
        }
      )
      .addCase(
        getCollections.fulfilled,
        (state, action) => {
          state.isSuccess = true
          state.isLoading = false
          state.collections = action.payload.collections
          state.hasMore = action.payload.hasMore
          state.totalPages = action.payload.totalPages
        }
      )
      .addCase(
        getCollections.rejected,
        (state, action) => {
          state.isError = true
          state.isLoading = false
          state.collections = []
          state.message = action.payload
        }
      )
      // Create collection
      .addCase(
        createCollection.pending,
        (state) => {
          state.isLoading = true
        }
      )
      .addCase(
        createCollection.fulfilled,
        (state, action) => {
          state.isSuccess = true
          state.isLoading = false
          state.collections.push(action.payload)
        }
      )
      .addCase(createCollection.rejected,
        (state, action) => {
          state.isError = true
          state.isLoading = false
          state.collections = []
          state.message = action.payload
        }
      )
      // Update collection
      .addCase(
        updateCollection.pending,
        (state) => {
          state.isLoading = true
        }
      )
      .addCase(
        updateCollection.fulfilled,
        (state, action) => {
          state.isSuccess = true
          state.isLoading = false
          state.collections = state.collections.map(collection => {

            if (collection._id === action.payload._id) {
              return action.payload
            }
            return collection
          })
        }
      )
      .addCase(
        updateCollection.rejected,
        (state, action) => {
          state.isError = true
          state.isLoading = false
          state.collections = []
          state.message = action.payload
        }
      )
      // Delete collection
      .addCase(
        deleteCollection.pending,
        (state) => {
          state.isLoading = true
        }
      )
      .addCase(
        deleteCollection.fulfilled,
        (state, action) => {
          state.isSuccess = true
          state.isLoading = false
          state.collections = state.collections.filter(collection => action.payload.id !== collection._id)
        }
      )
      .addCase(
        deleteCollection.rejected,
        (state, action) => {
          state.isError = true
          state.isLoading = false
          state.collections = []
          state.message = action.payload
        }
      )
  }
})

export const { reset } = collectionSlice.actions
export default collectionSlice.reducer