import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Chart from 'react-google-charts'
import { Divider, Grid, GridRow, Header } from 'semantic-ui-react';
import { weatherSelector } from '../slices/weather';
import WeatherIcon from './weatherIcon';
import weatherModesDict from '../utils/weatherModesDict';
import { preferencesSelector } from '../slices/preferences';

const ForecastChart = () => {
  const { fiveDaysWeather } = useSelector(weatherSelector)
  const { degreeUnit } = useSelector(preferencesSelector)

  const [chartData, setChartData] = useState([])

  const FrntToCels = (value) => Math.floor((value - 32) * (5 / 9))

  useEffect(() => {
    setChartData([['Date', 'Minimum', 'Maximum'], ...fiveDaysWeather.map(({ Date, Temperature }) => (degreeUnit === 'F'
      ? [Date.split('T')[0], Temperature.Minimum.Value, Temperature.Maximum.Value]
      : [Date.split('T')[0], FrntToCels(Temperature.Minimum.Value), FrntToCels(Temperature.Maximum.Value)]))])
  }, [degreeUnit])

  return (
    <Grid>
      <Grid.Row centered style={{ paddingBottom: '1em' }}>
        <Header>5 Days Forecast</Header>
      </Grid.Row>
      <Grid.Row columns={5} style={{ paddingLeft: '4em' }}>
        {fiveDaysWeather.map(({ Day }) => (
          <Grid.Column key={Day.Date}>
            <WeatherIcon mode={weatherModesDict[Day.Icon]} />
          </Grid.Column>
        ))}
      </Grid.Row>
      <Grid.Row style={{ padding: '0px' }}>
        <Chart
          width="600px"
          height="180px"
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data={chartData}
          options={{
            // chart: {
            //   title: 'Box Office Earnings in First Two Weeks of Opening',
            //   subtitle: 'in millions of dollars (USD)',
            // },
            chartArea: { width: '92%', height: '70%' },
            animation: {
              startup: true,
              easing: 'out',
              duration: 1000,
            },
            legend: { position: 'none' }
          }}
        />
      </Grid.Row>
    </Grid>
  )
}

export default ForecastChart
