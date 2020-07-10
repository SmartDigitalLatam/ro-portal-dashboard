/* Util libraries .*/
import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

/* Importing chart's components .*/
import Condutividade_entrada from '../../../graficos/linear/condutividade_entrada';
import Condutividade_permeado from '../../../graficos/linear/condutividade_permeado';
import Indicador_cip from '../../../graficos/linear/indicador_cip';
import PH_entrada from '../../../graficos/linear/pH_entrada';
import Pressao_concentrado_estagio_1 from '../../../graficos/linear/pressao_concentrado_estagio_1';
import Pressao_concentrado_final from '../../../graficos/linear/pressao_concentrado_final';
import Pressao_diferencial from '../../../graficos/linear/pressao_diferencial';
import Pressao_entrada from '../../../graficos/linear/pressao_entrada';
import Rejeicao_normalizada_sal_permeado from '../../../graficos/linear/rejeicao_normalizada_sal_permeado';
import Temp_entrada from '../../../graficos/linear/temp_entrada';
import Vazao_concentrado from '../../../graficos/linear/vazao_concentrado';
import Vazao_entrada from '../../../graficos/linear/vazao_entrada';
import Vazao_normalizada_permeado from '../../../graficos/linear/vazao_normalizada_permeado';
import Vazao_permeado from '../../../graficos/linear/vazao_permeado';

export default class linear_graph_grid extends Component {

  render() {
    return (
      <div>
        <Grid container spacing={1}>
      
          <Grid item xs={12}>
            <Condutividade_entrada data={this.props.url}/>
          </Grid>

          <Grid item xs={12}>
            <Condutividade_permeado data={this.props.url}/>
          </Grid>

          <Grid item xs={12}>
            <Indicador_cip data={this.props.url} />
          </Grid>

          <Grid item xs={12}>
            <PH_entrada data={this.props.url}/>
          </Grid>
      
          <Grid item xs={12}>
            <Pressao_concentrado_estagio_1 data={this.props.url}/>
          </Grid>

          <Grid item xs={12}>
            <Pressao_concentrado_final data={this.props.url}/>
          </Grid>

          <Grid item xs={12}>
            <Pressao_diferencial data={this.props.url}/>
          </Grid>

          <Grid item xs={12}>
            <Pressao_entrada data={this.props.url}/>
          </Grid>

          <Grid item xs={12}>
            <Rejeicao_normalizada_sal_permeado data={this.props.url}/>
          </Grid>

          <Grid item xs={12}>
            <Temp_entrada data={this.props.url}/>
          </Grid>
      
          <Grid item xs={12}>
            <Vazao_concentrado data={this.props.url}/>
          </Grid>
      
          <Grid item xs={12}>
            <Vazao_entrada data={this.props.url}/>
          </Grid>
      
          <Grid item xs={12}>
            <Vazao_normalizada_permeado data={this.props.url}/>
          </Grid> 
      
          <Grid item xs={12}>
            <Vazao_permeado data={this.props.url}/>
          </Grid>
      
        </Grid>
      </div>
    );
  }
}
