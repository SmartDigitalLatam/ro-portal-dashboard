/* Importing util libraries .*/
import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

/* Importing charts ... */
import PressDif from '../../../graficos/radial/pressDif';
import RejNorm from '../../../graficos/radial/rejNorm';
import VazNormPerm from '../../../graficos/radial/vazNormPerm';

import { ContainerCss } from './styles';

export default function SimpleContainer(url) {
  //console.log(url.url);
  return (
    <ContainerCss>
        <React.Fragment>
        <Container style={{ backgroundColor: '#f3f3f3',width:'100%',borderRadius:'25px' }}>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <PressDif url={url.url}/>
            </Grid>
            <Grid item xs={4}>
              <RejNorm url={url.url}/>
            </Grid>
            <Grid item xs={4}>
              <VazNormPerm url={url.url}/>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
          </Grid>
        </Container>
        </React.Fragment>
    </ContainerCss>
  );
}