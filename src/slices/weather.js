import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  location: {},
  todayWeather: {},
  fiveDaysWeather: [],
  isFetched: false,
  isError: false,
  isLoading: false,
  isDayTime: true,
  favorites: localStorage.weatherFavorites ? JSON.parse(localStorage.weatherFavorites) : []
}

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    getWeather: (state) => {
      state.isLoading = true
      state.isError = false
      state.isFetched = false
    },
    getWeatherSuccess: (state, { payload }) => {
      state.todayWeather = payload.todayWeather
      state.fiveDaysWeather = payload.fiveDaysWeather
      state.location = payload.location
      state.isFetched = true
      state.isLoading = false
      state.isDayTime = payload.todayWeather.IsDayTime
    },
    getWeatherFailure: (state) => {
      state.isError = true
      state.isLoading = false
    },
    addToFavorites: (state, { payload }) => {
      const { todayWeather, location } = payload
      state.favorites.push({ todayWeather, location })
      localStorage.weatherFavorites = JSON.stringify(state.favorites)
    },
    removeFromFavorites: (state, { payload }) => {
      state.favorites = state.favorites.filter((item) => item.location.locationKey !== payload.locationKey)
      localStorage.weatherFavorites = JSON.stringify(state.favorites)
    },
  }
})

export const { getWeather, getWeatherSuccess, getWeatherFailure, addToFavorites, removeFromFavorites } = weatherSlice.actions

export const weatherSelector = (state) => state.weather

export default weatherSlice.reducer

export const fetchWeather = (location) => async dispatch => {
  dispatch(getWeather())
  try {
    const apiKey = 'hqXB1f6tFcH2FG9ngBOOhroEyG8BKrJ6'
    const todayWeatherRes = await fetch(`http://dataservice.accuweather.com/currentconditions/v1/${location.locationKey}?apikey=${apiKey}`)
    const todayWeatherJSON = await todayWeatherRes.json()

    const fiveDaysWeatherRes = await fetch(`http://dataservice.accuweather.com//forecasts/v1/daily/5day/${location.locationKey}?apikey=${apiKey}`)
    const fiveDaysWeatherJSON = await fiveDaysWeatherRes.json()
    // const todayWeatherJSON = [{ LocalObservationDateTime: '2020-05-12T10:35:00+03:00', EpochTime: 1589268900, WeatherText: 'Sunny', WeatherIcon: 1, HasPrecipitation: false, PrecipitationType: null, IsDayTime: true, Temperature: { Metric: { Value: 24.0, Unit: 'C', UnitType: 17 }, Imperial: { Value: 75.0, Unit: 'F', UnitType: 18 } }, MobileLink: 'http://m.accuweather.com/en/il/jerusalem/213225/current-weather/213225?lang=en-us', Link: 'http://www.accuweather.com/en/il/jerusalem/213225/current-weather/213225?lang=en-us' }]
    // const fiveDaysWeatherJSON = { Headline: { EffectiveDate: '2020-05-14T14:00:00+03:00', EffectiveEpochDate: 1589454000, Severity: 4, Text: 'Air quality will be unhealthy for sensitive groups Thursday afternoon through Friday evening', Category: 'air quality', EndDate: '2020-05-16T02:00:00+03:00', EndEpochDate: 1589583600, MobileLink: 'http://m.accuweather.com/en/il/jerusalem/213225/extended-weather-forecast/213225?lang=en-us', Link: 'http://www.accuweather.com/en/il/jerusalem/213225/daily-weather-forecast/213225?lang=en-us' }, DailyForecasts: [{ Date: '2020-05-12T07:00:00+03:00', EpochDate: 1589256000, Temperature: { Minimum: { Value: 59.0, Unit: 'F', UnitType: 18 }, Maximum: { Value: 83.0, Unit: 'F', UnitType: 18 } }, Day: { Icon: 1, IconPhrase: 'Sunny', HasPrecipitation: false }, Night: { Icon: 34, IconPhrase: 'Mostly clear', HasPrecipitation: false }, Sources: ['AccuWeather'], MobileLink: 'http://m.accuweather.com/en/il/jerusalem/213225/daily-weather-forecast/213225?day=1&lang=en-us', Link: 'http://www.accuweather.com/en/il/jerusalem/213225/daily-weather-forecast/213225?day=1&lang=en-us' }, { Date: '2020-05-13T07:00:00+03:00', EpochDate: 1589342400, Temperature: { Minimum: { Value: 62.0, Unit: 'F', UnitType: 18 }, Maximum: { Value: 87.0, Unit: 'F', UnitType: 18 } }, Day: { Icon: 2, IconPhrase: 'Mostly sunny', HasPrecipitation: false }, Night: { Icon: 35, IconPhrase: 'Partly cloudy', HasPrecipitation: false }, Sources: ['AccuWeather'], MobileLink: 'http://m.accuweather.com/en/il/jerusalem/213225/daily-weather-forecast/213225?day=2&lang=en-us', Link: 'http://www.accuweather.com/en/il/jerusalem/213225/daily-weather-forecast/213225?day=2&lang=en-us' }, { Date: '2020-05-14T07:00:00+03:00', EpochDate: 1589428800, Temperature: { Minimum: { Value: 61.0, Unit: 'F', UnitType: 18 }, Maximum: { Value: 86.0, Unit: 'F', UnitType: 18 } }, Day: { Icon: 3, IconPhrase: 'Partly sunny', HasPrecipitation: false }, Night: { Icon: 37, IconPhrase: 'Hazy moonlight', HasPrecipitation: false }, Sources: ['AccuWeather'], MobileLink: 'http://m.accuweather.com/en/il/jerusalem/213225/daily-weather-forecast/213225?day=3&lang=en-us', Link: 'http://www.accuweather.com/en/il/jerusalem/213225/daily-weather-forecast/213225?day=3&lang=en-us' }, { Date: '2020-05-15T07:00:00+03:00', EpochDate: 1589515200, Temperature: { Minimum: { Value: 68.0, Unit: 'F', UnitType: 18 }, Maximum: { Value: 89.0, Unit: 'F', UnitType: 18 } }, Day: { Icon: 3, IconPhrase: 'Partly sunny', HasPrecipitation: false }, Night: { Icon: 37, IconPhrase: 'Hazy moonlight', HasPrecipitation: false }, Sources: ['AccuWeather'], MobileLink: 'http://m.accuweather.com/en/il/jerusalem/213225/daily-weather-forecast/213225?day=4&lang=en-us', Link: 'http://www.accuweather.com/en/il/jerusalem/213225/daily-weather-forecast/213225?day=4&lang=en-us' }, { Date: '2020-05-16T07:00:00+03:00', EpochDate: 1589601600, Temperature: { Minimum: { Value: 72.0, Unit: 'F', UnitType: 18 }, Maximum: { Value: 93.0, Unit: 'F', UnitType: 18 } }, Day: { Icon: 2, IconPhrase: 'Mostly sunny', HasPrecipitation: false }, Night: { Icon: 33, IconPhrase: 'Clear', HasPrecipitation: false }, Sources: ['AccuWeather'], MobileLink: 'http://m.accuweather.com/en/il/jerusalem/213225/daily-weather-forecast/213225?day=5&lang=en-us', Link: 'http://www.accuweather.com/en/il/jerusalem/213225/daily-weather-forecast/213225?day=5&lang=en-us' }] }
    const todayWeather = todayWeatherJSON[0]
    const fiveDaysWeather = fiveDaysWeatherJSON.DailyForecasts
    dispatch(getWeatherSuccess({ todayWeather, fiveDaysWeather, location }))
  } catch (e) {
    dispatch(getWeatherFailure())
  }
}
