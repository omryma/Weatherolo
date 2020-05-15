import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, GridColumn, GridRow, Modal } from 'semantic-ui-react';
import { fetchWeather, getWeatherFailure, weatherSelector } from '../slices/weather';
import SearchBar from './SearchBar';
import CurrentWeatherCard from './currentWeatherCard';
import ForecastChart from './forecastChart';
import { autoCompleteLocation, getLocation } from '../utils/fetchers';
import MyPlaceHolder from './myPlaceHolder';
import ErrorMessage from './ErrorMessage';

const unidecode = require('unidecode-plus');

const Home = () => {
  const dispatch = useDispatch()
  const { isLoading, isError, location } = useSelector(weatherSelector)

  useEffect(() => {
    const getUserLocationWeather = async () => {
      const locationByIp = await getLocation()
      if (locationByIp.status === 'success') {
        const autoComp = await autoCompleteLocation(unidecode(locationByIp.city)) //In case of accented letters
        if (autoComp.length > 0) {
          const res = autoComp[0]
          dispatch(fetchWeather({ locationKey: res.Key, cityName: res.LocalizedName, countryName: res.Country.LocalizedName, countryCode: res.Country.ID
          }))
        } else dispatch(fetchWeather({ locationKey: 215854, cityName: 'Tel Aviv', countryName: 'Israel', countryCode: 'IL' })) //If location detection was failed
      } else dispatch(fetchWeather({ locationKey: 215854, cityName: 'Tel Aviv', countryName: 'Israel', countryCode: 'IL' })) //If location detected but location key fetch was failed
    }
    if (Object.keys(location).length === 0) getUserLocationWeather()
  }, [])

  return (

    isLoading
      ? <MyPlaceHolder />
      : (isError ? <ErrorMessage />
        : (
          <Grid centered columns={2}>
            <Grid.Column textAlign="center">
              <SearchBar />
            </Grid.Column>
            <Grid.Row centered>
              <Grid.Column>
                <CurrentWeatherCard />
              </Grid.Column>
            </Grid.Row>
            <Grid.Column width={8} style={{ paddingTop: '2em' }}>
              <ForecastChart />
            </Grid.Column>
          </Grid>
        )
      )

  )
}

export default withRouter(Home);
