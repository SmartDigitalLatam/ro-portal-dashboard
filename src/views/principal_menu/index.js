import React from 'react';
import { Grid, Button } from '@material-ui/core';
// import { Container } from './styles';

//Dados
import CardDataEntrada from '../../components/dados/cardData_viewPrincipal/entrada';
import CardDataGraphs from '../../components/dados/cardData_viewPrincipal/graphs';
import CardDataPermeado from '../../components/dados/cardData_viewPrincipal/permeado';
import CardDataConcentrado from '../../components/dados/cardData_viewPrincipal/concentrado';
import CardDataHistorico from '../../components/dados/cardData_viewPrincipal/historico';
import CardDataRelatives from '../../components/dados/cardData_viewPrincipal/relatives';


export default function principal_menu(url) {
  return (
    <Grid container spacing ={0.5}>
      <Grid item xs={12}>
        <Grid item xs>
          <CardDataGraphs id="graph_card" url={url.data}/>
        </Grid>
        <br/>
      </Grid>
      <Grid item xs={8}> 
        <div id='big_card'>  
          <Grid container spacing={1}>
          <Grid item xs={12}>
              <CardDataRelatives url={url.data} />
            </Grid>
            <Grid item xs={12}>
              <CardDataEntrada url={url.data} />
            </Grid>
            <br/>
            <Grid item xs={12} sm={6}>
              <CardDataPermeado url={url.data}/>
            </Grid>
            <br/>
            <Grid item xs={12} sm={6}>
              <CardDataConcentrado url={url.data}/>
            </Grid>
          </Grid>
        </div>
      </Grid>
      <Grid item xs>
        <div id="card_historico">
          <CardDataHistorico/>
        </div>  
      </Grid>
    </Grid>
  );
}
