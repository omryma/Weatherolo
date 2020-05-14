import React, { useState, useEffect } from 'react'
import { Button, Icon } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { weatherSelector, removeFromFavorites, addToFavorites } from '../slices/weather';

const FavoriteButton = ({ page, id }) => {
  const { todayWeather, location, favorites } = useSelector(weatherSelector)
  const { locationKey } = location
  const dispatch = useDispatch()
  const history = useHistory()
  const { pathname } = history.location

  const checkIfFavorite = () => {
    if (favorites.length > 0) {
      if (pathname === '/favorites') return true //In case its button from 'Favorites' page
      return favorites.some((item) => item.location.locationKey === locationKey) //In case its button from 'Home' page
    }
    return false //In case favorites is empty OR the city is not in favorites
  }

  const [isFavorite, setFavor] = useState(checkIfFavorite())

  useEffect(() => {
    setFavor(checkIfFavorite())
  }, [favorites, location])

  const handleFavorite = () => {
    if (isFavorite) {
      if (pathname === '/favorites') dispatch(removeFromFavorites({ locationKey: id }))
      else dispatch(removeFromFavorites({ locationKey }))
    } else {
      dispatch(addToFavorites({ todayWeather, location }))
    }
  }

  const getIcon = () => (page === 'home' ? (isFavorite ? 'heart' : 'heart outline') : 'remove circle')

  return (
    <Button animated="vertical" color="red" onClick={() => handleFavorite()} size={page === 'home' ? 'huge' : 'medium'} circular style={{ width: '10em' }}>
      <Button.Content hidden name="fav">{isFavorite ? 'Remove' : 'Add to favorites'}</Button.Content>
      <Button.Content visible>
        <Icon name={getIcon()} />
      </Button.Content>
    </Button>
  )
}

export default FavoriteButton
