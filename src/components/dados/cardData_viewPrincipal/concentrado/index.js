/* Importing util libraries .*/
import React, { Component,useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

import { Container } from './styles';

export default class concentrado extends Component {
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
                    fontSize: 20,
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

 
              //array novo para selecionar concentrate pressre 
              let ConcentratedPressure_array = [];
 
             novo_array.map(function(i){
                 ConcentratedPressure_array.push({
                         "ConcentratedPressure": i.ConcentratedPressure,
                     })
                     return ConcentratedPressure_array;
                 })

           
                let ConcentratedFlow_array = [];
                novo_array.map(function(i){
                    ConcentratedFlow_array.push({
                        "ConcentratedFlow": i.ConcentratedFlow,
                    });
                })



           //manipulando o array de dados
 
             let ConcentratedPressure_array_1 = ConcentratedPressure_array.map(a => a.ConcentratedPressure);  
             let ConcentratedFlow_array_1 = ConcentratedFlow_array.map(a => a.ConcentratedFlow); 
             
 
              //converte a array de string em nnumeros
              let ConcentratedPressure_array_2 = ConcentratedPressure_array_1.map(Number);
              let ConcentratedFlow_array_2 = ConcentratedFlow_array_1.map(Number);
        
            //Dados limpos e finalizados
            //-----------------------------------------------__________--------------------------------------   

            //---------------------------PEGANDO ÚLTIMO VALOR DA STRING--------------------------------------
    
    //armazenando valor da última posição na var k
    let k = ConcentratedPressure_array_2.length;
    
    let ConcentratedPressure_value = ConcentratedPressure_array_2[0];
    let ConcentratedFlow_value = ConcentratedFlow_array_2[0];

    

    //.tofixed determina o quanto de algarismos decimais terá meu número 
    this.setState({
      series1: [ConcentratedPressure_value.toFixed(2)],
      series2: [ConcentratedFlow_value.toFixed(2)],
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
                            <p>CONCENTRADO</p>
                        </div>
                        <Grid container spacing={2} direction="row" justify="center" alignItems="center" style={me.state.style.custom_card}>
                            

                            <Grid style={me.state.style.custom_center_item} item xs={12} sm={2}>
                                <Typography id='card_content'component="h2">
                                {me.state.series1}
                                </Typography>
                                <Typography  >
                        
                                </Typography>
                                <Typography id='card_desc' variant="body2" component="p" color="textSecondary">
                                    <a href=" "style={me.state.style.custom_button}>Pressão Concentrado, kgf/cm²</a>
                                </Typography>
                            </Grid>

                            <Grid style={me.state.style.custom_center_item} item xs={12} sm={2}>
                                <Typography id='card_content'component="h2">
                                {me.state.series2}
                                </Typography>
                                <Typography  >
                        
                                </Typography>
                                <Typography id='card_desc' variant="body2" component="p" color="textSecondary">
                                    <a href=" "style={me.state.style.custom_button}>Vazão do Concentrado, m³/h</a>
                                </Typography>
                            </Grid>



                        </Grid>
                    </div>
                </Container>
            </div>
        );
    }
}
