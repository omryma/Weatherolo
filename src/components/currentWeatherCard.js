import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Card, Grid, GridColumn, GridRow, Image, Item, Label } from 'semantic-ui-react';
import { weatherSelector } from '../slices/weather';
import WeatherIcon from './weatherIcon';
import weatherModesDict from '../utils/weatherModesDict';
import { preferencesSelector } from '../slices/preferences';
import FavoriteButton from './favoriteButton';
import { generateFlag } from '../utils/utilitiesFuncs';

const CurrentWeatherCard = () => {
  const { todayWeather, isLoading, location } = useSelector(weatherSelector)
  const { degreeUnit } = useSelector(preferencesSelector)

  return (
    'Temperature' in todayWeather && (
    <Grid>
      <Grid.Row columns={2}>
        <Grid.Column style={{ textAlign: 'center' }}>
          {/* eslint-disable-next-line react/no-children-prop */}
          <Card raised>
            <Image style={{ padding: '1em' }}>
              <WeatherIcon mode={weatherModesDict[todayWeather.WeatherIcon]} size={84} />
            </Image>
            <Card.Content>
              <Card.Header textAlign="center">{location.cityName}</Card.Header>
              <Card.Meta textAlign="center">{location.countryName}</Card.Meta>
              <Card.Description textAlign="center">
                {(degreeUnit === 'C') ? (
                  <Label size="huge" circular>
                    {todayWeather.Temperature.Metric.Value}
                    {' '}
                    &#8451;
                  </Label>
                ) : (
                  <Label size="huge" circular>
                    {todayWeather.Temperature.Imperial.Value}
                    {' '}
                    &#8457;
                  </Label>
                )}
                <br />
                <Image avatar src={generateFlag(location.countryCode)} />
              </Card.Description>
            </Card.Content>
          </Card>
        </Grid.Column>
        <Grid.Column verticalAlign="middle">
          <FavoriteButton page="home" />
        </Grid.Column>
      </Grid.Row>
    </Grid>

    )
  )
}

export default CurrentWeatherCard
