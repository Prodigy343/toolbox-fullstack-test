import { createSlice } from '@reduxjs/toolkit'

const filesSlice = createSlice({
  name: 'files',
  initialState: {
    items: [],
    fileNames: [],
    selected: '',
    loading: true,
    error: null
  },
  reducers: {
    setSelected: (state, action) => {
      state.selected = action.payload
    },
    setFileNames: (state, action) => {
      state.fileNames = action.payload
    },
    loadStart: (state) => {
      state.loading = true
    },
    loadSuccess: (state, action) => {
      state.items = action.payload
      state.loading = false
      state.error = null
    },
    loadFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    }
  }
})

export const { setSelected, setFileNames, loadStart, loadSuccess, loadFailure } = filesSlice.actions
export default filesSlice.reducer
