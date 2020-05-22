import React from 'react';
import Grid from '@material-ui/core/Grid';
// import Vazao_normalzada_permeado from '../../../graficos/linear/vazao_normalzada_permeado';
// import Pressao_diferencial from '../../../graficos/linear/pressao_diferencial';
// import Rejeicao_normalizada_sal_permeado from '../../../graficos/linear/rejeicao_normalizada_sal_permeado';
import Condutividade_entrada from '../../../graficos/linear/condutividade_entrada';
// import Condutividade_permeado from '../../../graficos/linear/condutividade_permeado';
// import Vazao_entrada from '../../../graficos/linear/vazao_entrada';
// import Vazao_permeado from '../../../graficos/linear/vazao_permeado';

// import { Container } from './styles';
const ip = '192.168.0.162';
const url = `ws://${ip}:4001`


export default function linear_graph_grid() {
  
  return (
    <div>
      <Grid container spacing={2}>
          {/* <Grid item xs={6}>
            <Vazao_normalzada_permeado url={url}/>
          </Grid>
          <Grid item xs={6}>
            <Pressao_diferencial url={url}/>
          </Grid>
          <Grid item xs={6}>
            <Rejeicao_normalizada_sal_permeado url={url}/>
          </Grid> */}
          <Grid item xs={6}>
            <Condutividade_entrada url={url}/>
          </Grid>
          {/* <Grid item xs={6}>
            <Condutividade_permeado url={url}/>
          </Grid>
          <Grid item xs={6}>
            <Vazao_entrada url={url}/>
          </Grid>     
          <Grid item xs={12}>
            <Vazao_permeado url={url}/>
          </Grid>       */}
      </Grid>
    </div>
  );
}
