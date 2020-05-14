import { combineReducers } from 'redux'

import preferencesReducer from './preferences'
import weatherReducer from './weather';

const rootReducer = combineReducers({
  preferences: preferencesReducer,
  weather: weatherReducer
})

export default rootReducer
