import React from 'react'
import { Grid, Placeholder } from 'semantic-ui-react';

const MyPlaceHolder = () => (
  <Grid centered columns={2}>
    <Grid.Column textAlign="center">
      <Placeholder.Line length="full" />
    </Grid.Column>
    <Grid.Row centered>
      <Grid.Column>
        <Placeholder style={{ height: 300, width: 300 }} />
      </Grid.Column>
    </Grid.Row>
    <Grid.Column width={8} style={{ paddingTop: '2em' }}>
      <Placeholder>
      <Placeholder.Line length="full" />
      <Placeholder.Line length="very long" />
      <Placeholder.Line length="full" />
      <Placeholder.Line length="very long" />
      <Placeholder.Line length="very long" />
      </Placeholder>
    </Grid.Column>
  </Grid>

)

export default MyPlaceHolder
