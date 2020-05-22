/* Util libraries .*/
import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

/* Importing chart's components .*/
import Condutividade_entrada from '../../../graficos/linear/condutividade_entrada';
import Condutividade_permeado from '../../../graficos/linear/condutividade_permeado';
import Vazao_normalizada_permeado from '../../../graficos/linear/vazao_normalzada_permeado';
import Pressao_diferencial from '../../../graficos/linear/pressao_diferencial';
import Rejeicao_normalizada_sal_permeado from '../../../graficos/linear/rejeicao_normalizada_sal_permeado';
import Vazao_entrada from '../../../graficos/linear/vazao_entrada';
import Vazao_permeado from '../../../graficos/linear/vazao_permeado';

export default class linear_graph_grid extends Component {

  render() {
    return (
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Vazao_normalizada_permeado data={this.props.url}/>
          </Grid>
          {/* <Grid item xs={12}>
            <Vazao_normalizada_permeado_mes data={this.props.url}/>
          </Grid> */}
          <Grid item xs={12}>
            <Pressao_diferencial data={this.props.url}/>
          </Grid>
          {/* <Grid item xs={12}>
            <Pressao_diferencial_mes data={this.props.url}/>
          </Grid> */}
          <Grid item xs={12}>
            <Rejeicao_normalizada_sal_permeado data={this.props.url}/>
          </Grid>
          {/* <Grid item xs={12}>
            <Rejeicao_normalizada_sal_permeado_mes data={this.props.url}/>
          </Grid> */}
          <Grid item xs={12}>
            <Condutividade_entrada data={this.props.url} />
          </Grid>
          {/* <Grid item xs={12}>
            <Condutividade_entrada_mes data={this.props.url} />
          </Grid> */}
          <Grid item xs={12}>
            <Condutividade_permeado data={this.props.url}/>
          </Grid>
          {/* <Grid item xs={12}>
            <Condutividade_permeado_mes data={this.props.url}/>
          </Grid> */}
          <Grid item xs={12}>
            <Vazao_entrada data={this.props.url}/>
          </Grid> 
          {/* <Grid item xs={12}>
            <Vazao_entrada_mes data={this.props.url}/>
          </Grid>  */}
          <Grid item xs={12}>
            <Vazao_permeado data={this.props.url}/>
          </Grid>
          {/* <Grid item xs={12}>
            <Vazao_permeado_mes data={this.props.url}/>
          </Grid> */}
        </Grid>
      </div>
    );
  }
}
