import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Checkbox, Dropdown, Header, Label, Menu } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux';
import { weatherSelector } from '../slices/weather';
import { preferencesSelector, toggleDarkMode, toggleDegreeUnit } from '../slices/preferences';
import MenuToggle from './menuToggle';

const NavBar = () => {
  const history = useHistory()
  const { pathname } = history.location
  const { favorites } = useSelector(weatherSelector)
  const { degreeUnit, darkMode } = useSelector(preferencesSelector)
  const dispatch = useDispatch()

  const options = [
    { value: 'degree', children: <MenuToggle name="Degree Unit" optA="&#8451;" optB="&#8457;" checked={degreeUnit === 'F'} onClick={() => dispatch(toggleDegreeUnit())} /> },
    { value: 'dark', children: <MenuToggle name="Dark Mode" optA="Off" optB="On" checked={darkMode} onClick={() => dispatch(toggleDarkMode())} /> }];

  return (
    <Menu borderless stackable>
      <Menu.Item
        name="Home"
        active={pathname === '/'}
        onClick={() => history.push('/')}
      />
      <Menu.Item
        name="Favorites"
        active={pathname === '/favorites'}
        onClick={() => history.push('/favorites')}
      >
        Favorites
        <Label>{favorites.length}</Label>
      </Menu.Item>
      <Menu.Item style={{ paddingLeft: '20%' }}>
        <Header style={{ margin: '0em', paddingRight: '1em' }}>Weatherolo</Header>
        <p>weather for heroes</p>
      </Menu.Item>
      <Menu.Menu position="right">
        <Dropdown
          item
          simple
          text="Preferences"
          direction="right"
          options={options}
        />
      </Menu.Menu>
    </Menu>
  )
}

export default NavBar;
