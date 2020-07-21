/* Importing util libraries .*/
import React, { Component,useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

import { Container } from './styles';

export default class permeado extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            //Numbers to start the application  
            style:{
                custom_card:{
                    color:'white',
                    minWidth: 12,
                    borderRadius:'25px',
                    // cor do fundo do elemento
                    backgroundColor:'#009065',
                    border:'none',
                    boxShadow: '0 6px 20px 0 rgba(0, 0, 0, 0.19);'
                },
                custom_title:{
                    fontSize: 14,
                    color:'white',
                    borderRadius:'25px',
                },
                custom_root:{
                    flexGrow: 1,
                },
                custom_center_item:{
                    textAlign:"center",
                    width:'18%',
                },
                custom_button:{
                    fontSize:'18px',
                    fontWeight:'bold'
                }
            }
        }
    }
    componentDidMount() {
        axios.get("https://ro-back-graph.azurewebsites.net/person").then(res => {
    
             //pegando valor do api - uri - localhost
             const value = res.data;

             //adentrando o campo [result]
             //let novo_array = value["result"]; - usar essa contrução quando usar cosmoDB API SQL
             let novo_array = value;


             
  //splitando os dados em: Data, Dados e ConcentratedPressure
            //-----------------------------------------------__________--------------------------------------   

            let i = 0;
            let j = 0;

        
                let PermConductivity_array = [];
                novo_array.map(function(i){
                    PermConductivity_array.push({
                        "PermConductivity": i.PermConductivity,
                    });
                })


                let PermFlow_array = [];
                novo_array.map(function(i){
                    PermFlow_array.push({
                        "PermFlow": i.PermFlow,
                    });
                })

           //manipulando o array de dados
             
             let PermConductivity_array_1 = PermConductivity_array.map(a => a.PermConductivity); 
             let PermFlow_array_1 = PermFlow_array.map(a => a.PermFlow); 
          
 
              //converte a array de string em nnumeros
            
              let PermConductivity_array_2 = PermConductivity_array_1.map(Number);
              let PermFlow_array_2 = PermFlow_array_1.map(Number);
           

        
            //Dados limpos e finalizados
            //-----------------------------------------------__________--------------------------------------   

            //---------------------------PEGANDO ÚLTIMO VALOR DA STRING--------------------------------------
    
    //armazenando valor da última posição na var k
    let k = PermConductivity_array_2.length;
    
  
    let PermConductivity_value = PermConductivity_array_2[0];
    let PermFlow_value = PermFlow_array_2[0];
   


    

    //.tofixed determina o quanto de algarismos decimais terá meu número 
    this.setState({
      series1: [PermConductivity_value.toFixed(2)],
      series2: [PermFlow_value.toFixed(2)],
    });

      })
    }
    
    componentWillUnmount() {
        this.setState.close();
      }

    render() {
        var me = this;
        return (
            <div>
                <Container>
                    <div style={me.state.style.custom_root}>
                        <div id="card_title">
                            <p>PERMEADO</p>
                        </div>
                        <Grid container spacing={2} direction="row" justify="center" alignItems="center" style={me.state.style.custom_card}>
                            

                            <Grid style={me.state.style.custom_center_item} item xs={12} sm={2}>
                                <Typography id='card_content'component="h2">
                                {me.state.series1}
                                </Typography>
                                <Typography  >
                        
                                </Typography>
                                <Typography id='card_desc' variant="body2" component="p" color="textSecondary">
                                    <a href=" "style={me.state.style.custom_button}>Condutividade do Permeado, µS/cm</a>
                                </Typography>
                            </Grid>

                            <Grid style={me.state.style.custom_center_item} item xs={12} sm={2}>
                                <Typography id='card_content'component="h2">
                                {me.state.series2}
                                </Typography>
                                <Typography  >
                        
                                </Typography>
                                <Typography id='card_desc' variant="body2" component="p" color="textSecondary">
                                    <a href=" "style={me.state.style.custom_button}>Vazão  do Permeado, m³/h</a>
                                </Typography>
                            </Grid>

    


                        </Grid>
                    </div>
                </Container>
            </div>
        );
    }
}
