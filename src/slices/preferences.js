import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  degreeUnit: localStorage.degreeUnit ? localStorage.degreeUnit : 'C',
  darkMode: localStorage.darkMode ? JSON.parse(localStorage.darkMode) : false,
}

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    toggleDegreeUnit: (state) => {
      if (state.degreeUnit === 'C') {
        state.degreeUnit = 'F'
        localStorage.degreeUnit = 'F'
      } else {
        state.degreeUnit = 'C'
        localStorage.degreeUnit = 'C'
      }
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode
      localStorage.darkMode = state.darkMode
    }
  }
})

export const { toggleDegreeUnit, toggleDarkMode } = preferencesSlice.actions

export const preferencesSelector = (state) => state.preferences

export default preferencesSlice.reducer
