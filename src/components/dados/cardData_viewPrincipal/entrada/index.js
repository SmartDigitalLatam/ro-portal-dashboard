/* Importing util libraries .*/
import React, { Component,useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

import { Container } from './styles';

export default class entrada extends Component {
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

            //array novo só com os dados
            let FeedPressure_array = [];
 
            novo_array.map(function(i){
             FeedPressure_array.push({
                     "FeedPressure": i.FeedPressure,
                 })
                 return FeedPressure_array;
             })


                 let FeedConductivity_array = [];
                 novo_array.map(function(i){
                    FeedConductivity_array.push({
                        "FeedConductivity": i.FeedConductivity,
                    });
                })



                let FeedFlow_array = [];
                novo_array.map(function(i){
                    FeedFlow_array.push({
                        "FeedFlow": i.FeedFlow,
                    });
                })


                let FeeTemperature_array = [];
                novo_array.map(function(i){
                    FeeTemperature_array.push({
                        "FeeTemperature": i.FeeTemperature,
                    });
                })

                let ph_array = [];
                novo_array.map(function(i){
                    ph_array.push({
                      
                        "pH": i.pH,
                    });
                })




           //manipulando o array de dados
             let FeedPressure_array_1 = FeedPressure_array.map(a => a.FeedPressure);  
             let FeedConductivity_array_1 = FeedConductivity_array.map(a => a.FeedConductivity); 
             let FeedFlow_array_1 = FeedFlow_array.map(a => a.FeedFlow); 
             let FeeTemperature_array_1 = FeeTemperature_array.map(a => a.FeeTemperature); 
             let ph_array_1 = ph_array.map(a => a.pH);    
 
              //converte a array de string em nnumeros
              let FeedPressure_array_2 = FeedPressure_array_1.map(Number);
              let FeedConductivity_array_2 = FeedConductivity_array_1.map(Number);
              let FeedFlow_array_2 = FeedFlow_array_1.map(Number);
              let FeeTemperature_array_2 = FeeTemperature_array_1.map(Number);
              let ph_array_2 = ph_array_1.map(Number);

        
            //Dados limpos e finalizados
            //-----------------------------------------------__________--------------------------------------   

            //---------------------------PEGANDO ÚLTIMO VALOR DA STRING--------------------------------------
    
    //armazenando valor da última posição na var k
    let k = FeedPressure_array_2.length;
    
    let FeedPressure_value = FeedPressure_array_2[0];
    let FeedConductivity_value = FeedConductivity_array_2[0];
    let FeedFlow_value = FeedFlow_array_2[0];
    let FeeTemperature_value = FeeTemperature_array_2[0];
    let ph_value = ph_array_2[0];



    //.tofixed determina o quanto de algarismos decimais terá meu número 
    this.setState({
      series1: [FeedPressure_value.toFixed(2)],
      series2: [FeedConductivity_value.toFixed(2)],
      series3: [FeedFlow_value.toFixed(2)],
      series4: [FeeTemperature_value.toFixed(2)],
      series5: [ph_value.toFixed(2)],
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
                            <p>ENTRADA</p>
                        </div>
                        <Grid container spacing={2} direction="row" justify="center" alignItems="center" style={me.state.style.custom_card}>
                            

                            <Grid style={me.state.style.custom_center_item} item xs={12} sm={2}>
                                <Typography id='card_content'component="h2">
                                {me.state.series1}
                                </Typography>
                                <Typography  >
                        
                                </Typography>
                                <Typography id='card_desc' variant="body2" component="p" color="textSecondary">
                                    <a href=" "style={me.state.style.custom_button}>Pressão da Entrada, kgf/cm²</a>
                                </Typography>
                            </Grid>

                            <Grid style={me.state.style.custom_center_item} item xs={12} sm={2}>
                                <Typography id='card_content'component="h2">
                                {me.state.series2}
                                </Typography>
                                <Typography  >
                        
                                </Typography>
                                <Typography id='card_desc' variant="body2" component="p" color="textSecondary">
                                    <a href=" "style={me.state.style.custom_button}>Condutividade da entrada, µS/cm</a>
                                </Typography>
                            </Grid>

                            <Grid style={me.state.style.custom_center_item} item xs={12} sm={2}>
                                <Typography id='card_content'component="h2">
                                {me.state.series3}
                                </Typography>
                                <Typography  >
                        
                                </Typography>
                                <Typography id='card_desc' variant="body2" component="p" color="textSecondary">
                                    <a href=" "style={me.state.style.custom_button}>Vazão da entrada, m³/h</a>
                                </Typography>
                            </Grid>

                            <Grid style={me.state.style.custom_center_item} item xs={12} sm={2}>
                                <Typography id='card_content'component="h2">
                                {me.state.series4}
                                </Typography>
                                <Typography  >
                        
                                </Typography>
                                <Typography id='card_desc' variant="body2" component="p" color="textSecondary">
                                    <a href=" "style={me.state.style.custom_button}>Temperatura da entrada, ºC</a>
                                </Typography>
                            </Grid>


                            <Grid style={me.state.style.custom_center_item} item xs={12} sm={2}>
                                <Typography id='card_content'component="h2">
                                {me.state.series5}
                                </Typography>
                                <Typography  >
                        
                                </Typography>
                                <Typography id='card_desc' variant="body2" component="p" color="textSecondary">
                                    <a href=" "style={me.state.style.custom_button}>pH da entrada</a>
                                </Typography>
                            </Grid>



                        </Grid>
                    </div>
                </Container>
            </div>
        );
    }
}
