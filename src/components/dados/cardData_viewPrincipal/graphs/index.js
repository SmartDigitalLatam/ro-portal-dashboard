/* Importing util libraries .*/
import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

/* Importing charts ... */
import VazaoNormalizadaPermeado from '../../../graficos/radial/vazNormPerm';
import RejeicaoNormalizadaDeSal from '../../../graficos/radial/rejNorm';
import PressaoDiferencial from '../../../graficos/radial/pressDif';

import { ContainerCss } from './styles';

export default function SimpleContainer(url) {
  //console.log(url.url);
  return (
    <ContainerCss>
        <React.Fragment>
        <Container style={{ backgroundColor: '#f3f3f3',width:'100%',borderRadius:'25px' }}>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <VazaoNormalizadaPermeado url={url.url}/>
            </Grid>
            <Grid item xs={4}>
              <RejeicaoNormalizadaDeSal url={url.url}/>
            </Grid>
            <Grid item xs={4}>
              <PressaoDiferencial url={url.url}/>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
          </Grid>
        </Container>
        </React.Fragment>
    </ContainerCss>
  );
}