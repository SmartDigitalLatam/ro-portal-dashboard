import React from 'react';
import { Grid, Button } from '@material-ui/core';
// import { Container } from './styles';

//Dados
import CardDataData from '../../components/dados/cardData_viewPrincipal/data';
import CardDataNormalizacao from '../../components/dados/cardData_viewPrincipal/normalizacao';
import CardDataEntrada from '../../components/dados/cardData_viewPrincipal/entrada';
import CardDataPermeado from '../../components/dados/cardData_viewPrincipal/permeado';
import CardDataConcentrado from '../../components/dados/cardData_viewPrincipal/concentrado';

export default function principal_menu(url) {
  return (
    <Grid container spacing ={0.5}>


      <Grid item xs={16}> 
        <div id='big_card'>  
          <Grid container spacing={1}>
      
          <Grid item xs={12} >
              <CardDataData url={url.data}/>
            </Grid>

          <Grid item xs={12} >
              <CardDataNormalizacao url={url.data}/>
            </Grid>

            <Grid item xs={12}>
              <CardDataEntrada url={url.data} />
            </Grid>

            <br/>
            <Grid item xs={12} >
              <CardDataPermeado url={url.data}/>
            </Grid>
            <br/>

            <Grid item xs={12} >
              <CardDataConcentrado url={url.data}/>
            </Grid>

          </Grid>
        </div>
      </Grid>
     
    </Grid>
  );
}
