/* Importing util libraries .*/
import React, { Component,useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

import { Container } from './styles';

export default class normalizacao extends Component {
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
 
             //array novo só com as datas (timestamp original em Unix/Epoch Time)
             let data_array= [];
 
             novo_array.map(function(i){
                 data_array.push({
                         "data": i.Date,
                     })
                     return data_array;
                 })
 
              //array novo para selecionar concentrate pressre 
              let ConcentratedPressure_array = [];
 
             novo_array.map(function(i){
                 ConcentratedPressure_array.push({
                         "ConcentratedPressure": i.ConcentratedPressure,
                     })
                     return ConcentratedPressure_array;
                 })

                 let FeedConductivity_array = [];
                 novo_array.map(function(i){
                    FeedConductivity_array.push({
                        "FeedConductivity": i.FeedConductivity,
                    });
                })


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


                let ConcentratedFlow_array = [];
                novo_array.map(function(i){
                    ConcentratedFlow_array.push({
                        "ConcentratedFlow": i.ConcentratedFlow,
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



           //manipulando o array de dados
             let FeedPressure_array_1 = FeedPressure_array.map(a => a.FeedPressure);  
             let ConcentratedPressure_array_1 = ConcentratedPressure_array.map(a => a.ConcentratedPressure);  
             let FeedConductivity_array_1 = FeedConductivity_array.map(a => a.FeedConductivity); 
             let PermConductivity_array_1 = PermConductivity_array.map(a => a.PermConductivity); 
             let PermFlow_array_1 = PermFlow_array.map(a => a.PermFlow); 
             let ConcentratedFlow_array_1 = ConcentratedFlow_array.map(a => a.ConcentratedFlow); 
             let FeedFlow_array_1 = FeedFlow_array.map(a => a.FeedFlow); 
             let FeeTemperature_array_1 = FeeTemperature_array.map(a => a.FeeTemperature); 
             let data_array_1 = data_array.map(a => a.data);    
 
              //converte a array de string em nnumeros
              let FeedPressure_array_2 = FeedPressure_array_1.map(Number);
              let ConcentratedPressure_array_2 = ConcentratedPressure_array_1.map(Number);
              let FeedConductivity_array_2 = FeedConductivity_array_1.map(Number);
              let PermConductivity_array_2 = PermConductivity_array_1.map(Number);
              let PermFlow_array_2 = PermFlow_array_1.map(Number);
              let ConcentratedFlow_array_2 = ConcentratedFlow_array_1.map(Number);
              let FeedFlow_array_2 = FeedFlow_array_1.map(Number);
              let FeeTemperature_array_2 = FeeTemperature_array_1.map(Number);

        
            //Dados limpos e finalizados
            //-----------------------------------------------__________--------------------------------------   

            //---------------------------PEGANDO ÚLTIMO VALOR DA STRING--------------------------------------
    
    //armazenando valor da última posição na var k
    let k = FeedPressure_array_2.length;
    
    let FeedPressure_value = FeedPressure_array_2[0];
    let ConcentratedPressure_value = ConcentratedPressure_array_2[0];
    let FeedConductivity_value = FeedConductivity_array_2[0];
    let PermConductivity_value = PermConductivity_array_2[0];
    let PermFlow_value = PermFlow_array_2[0];
    let ConcentratedFlow_value = ConcentratedFlow_array_2[0];
    let FeedFlow_value = FeedFlow_array_2[0];
    let FeeTemperature_value = FeeTemperature_array_2[0];



    //---------------------------CÁLCULO DA NORMALIZAÇÃO--------------------------------------
    
   
   //----------------------------------------DEFINIÇÃO DE VARIÁVEIS MANUAIS-------------------------------

   let pressao_permeado = 0;
   let pressao_net_driving_zero = 0;
   let Temp_correcao_zero = 1.047;
   let conc_media_calculada_entrada_zero = 0;
   let vazao_permeado_zero = 0;
   let TDS_entrada_calculado_zero = 132.958;


    //---------------------------CÁLCULO DA NORMALIZAÇÃO--------------------------------------
    
    //DIFFERENTIAL PRESSURE

    let PressaoDif_array = [];
            for (let i=0; i < FeedPressure_array_2.length+1; i++)
            {
                if (FeedPressure_array_2[i]>0){
                PressaoDif_array[i] = FeedPressure_array_2[i] - ConcentratedPressure_array_2[i];
                }
                else PressaoDif_array[i] = 0; 
            }
    
            let PressaoDif_value = PressaoDif_array[0];
           

            //cálculo do TDS ENTRADA CALCULADO (ppm)
 let TDS_entrada_calculado = 0;

 if (FeedConductivity_value === 0) 
 { 
     TDS_entrada_calculado = 0;
 }
 if (FeedConductivity_value > 0 && FeedConductivity_value <= 7630) 
 {
     TDS_entrada_calculado = 7.7013840097 * Math.pow(10, -20) * Math.exp(Math.pow(-90.475562243 - Math.log(FeedConductivity_value), 2) / 188.88442227);
 }
 if (FeedConductivity_value > 7630) {
     TDS_entrada_calculado = 8.0090966 * Math.pow(10, -11) * Math.exp(Math.pow(-50.645805186 - Math.log(FeedConductivity_value), 2) / 112.483950289);
 }



//cálculo do TDS ENTRADA (sem fórmula e multiplicadopor 0.7 apenas) (ppm)
let TDS_entrada = 0;
    TDS_entrada = FeedConductivity_value*0.7;


 //cálculo do TDS PERMEADO CALCULADO (ppm)
 let TDS_permeado_calculado = 0;
 
     if (PermConductivity_value === 0) 
     { 
         TDS_permeado_calculado = 0;
     }
     if (PermConductivity_value > 0 && PermConductivity_value <= 7630) 
     {
         TDS_permeado_calculado = 7.7013840097 * Math.pow(10, -20) * Math.exp(Math.pow(-90.475562243 - Math.log(PermConductivity_value), 2) / 188.88442227);
     }
     if (PermConductivity_value > 7630) 
     {
         TDS_permeado_calculado = 8.0090966 * Math.pow(10, -11) * Math.exp(Math.pow(-50.645805186 - Math.log(PermConductivity_value), 2) / 112.483950289);
     }


 //cálculo do TDS PERMEADO (ppm)
 let TDS_permeado = 0;
     TDS_permeado = PermConductivity_value*0.7;


//cálculo TEMPERATURA CORREÇÃO
let Temp_correcao =0;

 if (FeeTemperature_value <= 0) 
 { 
     Temp_correcao = 0;
 }
 if (FeeTemperature_value > 0 ) 
 {
     Temp_correcao = Math.exp(2640 * ((1 / 298.15) - 1 / (FeeTemperature_value + 273.15)));
 }



 //cálculo CONCENTRAÇÃO MÉDIA CALCULADA ENTRADA (ppm)
 let conc_media_calculada_entrada = 0;
 
     if (PermFlow_value > 0) 
     { 
        if (FeedConductivity_value > 0)
        {
         conc_media_calculada_entrada = TDS_entrada_calculado * Math.log(1 / (1 - PermFlow_value / FeedFlow_value)) / (PermFlow_value / FeedFlow_value); 
        }
        if (FeedConductivity_value <= 0)
        {
         conc_media_calculada_entrada = TDS_entrada * Math.log(1 / (1 - PermFlow_value / FeedFlow_value)) / (PermFlow_value / FeedFlow_value);   
        }
     }
     if (PermFlow_value <= 0)
     {
     conc_media_calculada_entrada = 0;
     }

//cálculo PRESSÃO OSMÓTICA ENTRADA (kgf/cm²)
let pressao_osmotica_entrada = 0;
if (FeedPressure_value > 0 && FeeTemperature_value > 0)
{
pressao_osmotica_entrada = 0.0385 * conc_media_calculada_entrada * (FeeTemperature_value + 273.15) / ((1000 - (conc_media_calculada_entrada / 1000)) * 14.25);
}
if (FeedPressure_value <= 0 || FeeTemperature_value <= 0 )
{
pressao_osmotica_entrada = 0;
}


//cálculo PRESSÃO OSMÓTICA PERMEADO (kgf/cm²)
let pressao_osmotica_permeado = 0;

    if (FeedPressure_value <= 0)
    {
        pressao_osmotica_permeado = 0;
    }
    if (FeedPressure_value > 0 && PermConductivity_value > 0 && FeeTemperature_value > 0)
    {
        pressao_osmotica_permeado = ((0.0385 * TDS_permeado_calculado * (FeeTemperature_value + 273.15)) / (1000 - (TDS_permeado_calculado / 1000))) / 14.25;
    }
    if (FeedPressure_value > 0 && PermConductivity_value > 0 && FeeTemperature_value <= 0)
    {
        pressao_osmotica_permeado = 0;
    }
    if (FeedPressure_value > 0 && PermConductivity_value <= 0)
    {
        if (TDS_permeado <=0 || FeeTemperature_value <= 0)
        {
            pressao_osmotica_permeado = 0;
        }
        if (TDS_permeado > 0 && FeeTemperature_value > 0)
        {
            pressao_osmotica_permeado = ((0.0385 * TDS_permeado * (FeeTemperature_value + 273.15)) / (1000 - (TDS_permeado / 1000))) / 14.25;
        }
    }

 // cálculo da PRESSÃO NET DRIVING
 let pressao_net_driving = 0;
 
     if (FeedPressure_value > 0)
     {
         pressao_net_driving = FeedPressure_value - (PressaoDif_value / 2) - pressao_osmotica_entrada - pressao_permeado + pressao_osmotica_permeado;
     }
     if (FeedPressure_value <= 0)
     {
         pressao_net_driving = 0;
     }

    //cálculo VAZÃO NORMALIZADA DO PERMEADO (m³/h)
    let vazao_normalizada_permeado = 0;
    
        if (PermFlow_value > 0)
        {
            vazao_normalizada_permeado = (pressao_net_driving_zero * Temp_correcao_zero) / (pressao_net_driving * Temp_correcao) * PermFlow_value;
        }
        if (PermFlow_value <= 0)
        {
            vazao_normalizada_permeado = 0;
        }

         //cálculo da PASSAGEM SAL NORMALIZADA PERMEADO (%)
         let passagem_normalizada = 0;
         
             if (PermFlow_value <= 0)
            {
             passagem_normalizada = 0;
            }
            if (PermFlow_value > 0 && FeedConductivity_value > 0)
            {
             passagem_normalizada = TDS_permeado_calculado * PermFlow_value * Temp_correcao_zero * conc_media_calculada_entrada_zero / (vazao_permeado_zero * Temp_correcao * conc_media_calculada_entrada * TDS_entrada_calculado_zero) * 100;
            }
            if (PermFlow_value > 0 && FeedConductivity_value <= 0 && TDS_entrada > 0)
            {
             passagem_normalizada = TDS_permeado * PermFlow_value * Temp_correcao_zero * conc_media_calculada_entrada_zero / (vazao_permeado_zero * Temp_correcao * conc_media_calculada_entrada * conc_media_calculada_entrada) * 100;
            }
            if (PermFlow_value > 0 && FeedConductivity_value <= 0 && TDS_entrada <= 0)
            {
             passagem_normalizada = 0;
            }
         
            //cálculo REJEIÇÃO SAL NORMALIZADA PERMEADO (%)
        let rejeicao_normalizada = 0;
        
            if (PermFlow_value <= 0)
            {
                rejeicao_normalizada = 0;
            }
            if (PermFlow_value > 0 && FeedConductivity_value > 0)
            {
                rejeicao_normalizada = 100 - passagem_normalizada;
            }
            if (PermFlow_value > 0 && FeedConductivity_value <= 0 && TDS_entrada > 0)
            {
                rejeicao_normalizada = 100 - passagem_normalizada;
            }
            if (PermFlow_value > 0 && FeedConductivity_value <= 0 && TDS_entrada <= 0)
            {
                rejeicao_normalizada = 0;
            }
        
            //----------------------------------------FIM DOS CÁLCULOS-----------------------------------------------------

    

    //.tofixed determina o quanto de algarismos decimais terá meu número 
    this.setState({
      series1: [PressaoDif_value.toFixed(2)],
      series2: [vazao_normalizada_permeado.toFixed(2)],
      series3: [rejeicao_normalizada.toFixed(2)],
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
                            <p>DADOS DE NORMALIZAÇÃO</p>
                        </div>
                        <Grid container spacing={2} direction="row" justify="center" alignItems="center" style={me.state.style.custom_card}>
                            

                            <Grid style={me.state.style.custom_center_item} item xs={12} sm={2}>
                                <Typography id='card_content'component="h2">
                                {me.state.series1}
                                </Typography>
                                <Typography  >
                        
                                </Typography>
                                <Typography id='card_desc' variant="body2" component="p" color="textSecondary">
                                    <a href=" "style={me.state.style.custom_button}>Pressão Diferencial, kgf/cm²</a>
                                </Typography>
                            </Grid>

                            <Grid style={me.state.style.custom_center_item} item xs={12} sm={2}>
                                <Typography id='card_content'component="h2">
                                {me.state.series2}
                                </Typography>
                                <Typography  >
                        
                                </Typography>
                                <Typography id='card_desc' variant="body2" component="p" color="textSecondary">
                                    <a href=" "style={me.state.style.custom_button}>Vazão Normalizada do Permeado, m³/h</a>
                                </Typography>
                            </Grid>

                            <Grid style={me.state.style.custom_center_item} item xs={12} sm={2}>
                                <Typography id='card_content'component="h2">
                                {me.state.series3}
                                </Typography>
                                <Typography  >
                        
                                </Typography>
                                <Typography id='card_desc' variant="body2" component="p" color="textSecondary">
                                    <a href=" "style={me.state.style.custom_button}>Rejeição Normalizada de Sal do Permeado, %</a>
                                </Typography>
                            </Grid>


                        </Grid>
                    </div>
                </Container>
            </div>
        );
    }
}
