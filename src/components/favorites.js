import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Card, Grid, GridColumn, Image, Label, Transition } from 'semantic-ui-react';
import { withRouter, useHistory } from 'react-router-dom';
import Clock from 'react-live-clock';
import { fetchWeather, weatherSelector } from '../slices/weather';
import { preferencesSelector } from '../slices/preferences';
import { generateFlag } from '../utils/utilitiesFuncs';
import FavoriteButton from './favoriteButton';
import WeatherIcon from './weatherIcon';
import weatherModesDict from '../utils/weatherModesDict';

const ct = require('countries-and-timezones');


const Favorites = () => {
  const { favorites } = useSelector(weatherSelector)
  const dispatch = useDispatch()
  const history = useHistory()

  const onFavoriteClick = (e, loc) => {
    if (e.target.innerHTML === 'Remove') e.stopPropagation()
    else {
      dispatch(fetchWeather({ locationKey: loc.locationKey, cityName: loc.cityName, countryName: loc.countryName, countryCode: loc.countryCode }))
      history.push('/')
    }
  }

  return (
    <>
      <Grid centered padded>
        {favorites.map((item) => (
          <Grid.Column key={item.location.locationKey} width={3}>
            <Card raised onClick={(e) => onFavoriteClick(e, item.location)}>
              <Grid centered verticalAlign="middle" padded="vertically">
                <Grid.Row columns={2} centered textAlign="center">
                  <div>
                    {item.location.cityName}
                    {'    '}
                    <Image avatar src={generateFlag(item.location.countryCode)} />
                  </div>
                </Grid.Row>
                <Grid.Row>
                  <WeatherIcon mode={weatherModesDict[item.todayWeather.WeatherIcon]} size={50} />
                </Grid.Row>
                <Grid.Row><Clock format="HH:mm:ss" ticking timezone={ct.getCountry(item.location.countryCode).timezones[0]} /></Grid.Row>
                <Grid.Row><FavoriteButton page="favorites" id={item.location.locationKey} /></Grid.Row>
              </Grid>
            </Card>
          </Grid.Column>
        ))}
        {!favorites.length && <Label size="huge">No favorites</Label>}
      </Grid>
    </>
  )
}

export default withRouter(Favorites);
