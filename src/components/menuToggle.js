import React from 'react'
import { Checkbox, Grid, GridColumn, GridRow, Label } from 'semantic-ui-react';

const MenuToggle = ({ name, optA, optB, checked, onClick }) => (
  <Grid centered>
    <GridRow><label>{name}</label></GridRow>
    <GridRow columns={3}>
      <GridColumn><label>{optA}</label></GridColumn>
      <GridColumn style={{ paddingLeft: '0em' }}><Checkbox toggle checked={checked} onChange={onClick} /></GridColumn>
      <GridColumn><div>{optB}</div></GridColumn>
    </GridRow>
  </Grid>
)
export default MenuToggle
