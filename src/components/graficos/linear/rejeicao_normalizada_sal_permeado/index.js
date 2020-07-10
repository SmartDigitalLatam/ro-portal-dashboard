import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';
import axios from 'axios';


class rejeicao_sal_normalizada_permeado extends Component{
    constructor(props){
        super(props);
        this.state = {
            chartData:{}
        }
    }

    componentDidMount(){
        this.getChartData();
    }

    
    getChartData(){

        axios.get("/person").then(res => {
       
            const value = res.data;
            let novo_array_date = [];
            let novo_array_feed_pressure = [];
            let novo_array_concentrated_pressure = [];
            let novo_array_feed_conductivity = [];
            let novo_array_perm_conductivity = [];
            let novo_array_perm_flow = [];
            let novo_array_concentrated_flow = [];
            let novo_array_flow_feed = [];
            let novo_array_feed_temperature = [];
           
            // pega o valor especifico dentro da aarray de obejtos e gera um anova array de objetos
           value.map(function(i){
                novo_array_date.push({
                    "Date": i.Date,
                   
                });
            })

            value.map(function(i){
                novo_array_feed_pressure.push({
                   
                    "FeedPressure": i.FeedPressure,
                });
            })

            value.map(function(i){
                novo_array_concentrated_pressure.push({
                    
                    "ConcentratedPressure": i.ConcentratedPressure,
                });
            })

            value.map(function(i){
                novo_array_feed_conductivity.push({
                    "FeedConductivity": i.FeedConductivity,
            
                });
            })

            value.map(function(i){
                novo_array_perm_conductivity.push({
                   
                    "PermConductivity": i.PermConductivity,
                });
            })

            value.map(function(i){
                novo_array_perm_flow.push({
                    "PermFlow": i.PermFlow,
                });
            })

            value.map(function(i){
                novo_array_concentrated_flow.push({
                    
                    "ConcentratedFlow": i.ConcentratedFlow,
                });
            })

            value.map(function(i){
                novo_array_flow_feed.push({
                    "FeedFlow": i.FeedFlow,
                });
            })

            value.map(function(i){
                novo_array_feed_temperature.push({
                    "FeeTemperature": i.FeeTemperature,
                });
            })
        
            //pega apenas o valor da array de objeto transformando em uma array
            let FeedPressureArray1 = novo_array_feed_pressure.map(a => a.FeedPressure);
            let ConcentratedPressureArray1 = novo_array_concentrated_pressure.map(a => a.ConcentratedPressure);
            let FeedConductivityArray1 = novo_array_feed_conductivity.map(a => a.FeedConductivity);
            let PermConductivityArray1 = novo_array_perm_conductivity.map(a => a.PermConductivity);
            let PermFlowArray1 = novo_array_perm_flow.map(a => a.PermFlow);
            let ConcentratedFlowArray1 = novo_array_concentrated_flow.map(a => a.ConcentratedFlow);
            let FeedFlowArray1 = novo_array_flow_feed.map(a => a.FeedFlow);
            let FeeTemperatureArray1 = novo_array_feed_temperature.map(a => a.FeeTemperature);
            let DateArray1 = novo_array_date.map(a => a.Date);
        
            //converte a array de string em nnumeros
            let FeedPressureArray2 = FeedPressureArray1.map(Number);
            let ConcentratedPressureArray2 = ConcentratedPressureArray1.map(Number);
            let FeedConductivityArray2 = FeedConductivityArray1.map(Number);
            let PermConductivityArray2 = PermConductivityArray1.map(Number);
            let PermFlowArray2 = PermFlowArray1.map(Number);
            let ConcentratedFlowArray2 = ConcentratedFlowArray1.map(Number);
            let FeedFlowArray2 = FeedFlowArray1.map(Number);
            let FeeTemperatureArray2 = FeeTemperatureArray1.map(Number);
            let DateArray2 = DateArray1;

            let FeedPressureArray3 = FeedPressureArray2.reverse();
            let ConcentratedPressureArray3 = ConcentratedPressureArray2.reverse();
            let FeedConductivityArray3 = FeedConductivityArray2.reverse();
            let PermConductivityArray3 = PermConductivityArray2.reverse();
            let PermFlowArray3 = PermFlowArray2.reverse();
            let ConcentratedFlowArray3 = ConcentratedFlowArray2.reverse();
            let FeedFlowArray3 = FeedFlowArray2.reverse();
            let FeeTemperatureArray3 = FeeTemperatureArray2.reverse();
            let DateArray3 = DateArray2.reverse();

            //----------------------------------------DEFINIÇÃO DE VARIÁVEIS MANUAIS-------------------------------

            let pressao_permeado = 0;
            let pressao_net_driving_zero = 0;
            let Temp_correcao_zero = 1.047;
            let conc_media_calculada_entrada_zero = 0;
            let vazao_permeado_zero = 0;
            let TDS_entrada_calculado_zero = 132.958;
        

            //----------------------------------------INÍCIO DOS CÁLCULOS-----------------------------------------------------

            //cálculo da PRESSÃO DIFERENCIAL: pressão entrada - pressão concentrado estágio final (kgf/cm²)
            let PressaoDif = [];
            let i = 0;
            for (i=0; i < FeedPressureArray3.length+1; i++)
            {
                if (FeedPressureArray3[i]>0){
                PressaoDif[i] = FeedPressureArray3[i] - ConcentratedPressureArray3[i];
                }
                else PressaoDif[i] = 0; 
            }

            //cálculo do TDS ENTRADA CALCULADO (ppm)
            let TDS_entrada_calculado = [];
            for (i=0; i < FeedConductivityArray3.length+1; i++)
            {
                if (FeedConductivityArray3[i] == 0) 
                { 
                    TDS_entrada_calculado[i] = 0;
                }
                if (FeedConductivityArray3[i] > 0 && FeedConductivityArray3[i] <= 7630) 
                {
                    TDS_entrada_calculado[i] = 7.7013840097 * Math.pow(10, -20) * Math.exp(Math.pow(-90.475562243 - Math.log(FeedConductivityArray3[i]), 2) / 188.88442227);
                }
                if (FeedConductivityArray3[i] > 7630) {
                    TDS_entrada_calculado[i] = 8.0090966 * Math.pow(10, -11) * Math.exp(Math.pow(-50.645805186 - Math.log(FeedConductivityArray3[i]), 2) / 112.483950289);
                }
            }

            //cálculo do TDS ENTRADA (sem fórmula e multiplicadopor 0.7 apenas) (ppm)
            let TDS_entrada = [];
            for (i=0; i < FeedConductivityArray3.length+1; i++)
            {
                TDS_entrada[i] = FeedConductivityArray3[i]*0.7;
            }
            
            //cálculo do TDS PERMEADO CALCULADO (ppm)
            let TDS_permeado_calculado = [];
            for (i=0; i < PermConductivityArray3.length+1; i++)
            {
                if (PermConductivityArray3[i] == 0) 
                { 
                    TDS_permeado_calculado[i] = 0;
                }
                if (PermConductivityArray3[i] > 0 && PermConductivityArray3[i] <= 7630) 
                {
                    TDS_permeado_calculado[i] = 7.7013840097 * Math.pow(10, -20) * Math.exp(Math.pow(-90.475562243 - Math.log(PermConductivityArray3[i]), 2) / 188.88442227);
                }
                if (PermConductivityArray3[i] > 7630) 
                {
                    TDS_permeado_calculado[i] = 8.0090966 * Math.pow(10, -11) * Math.exp(Math.pow(-50.645805186 - Math.log(PermConductivityArray3[i]), 2) / 112.483950289);
                }
            }

            //cálculo do TDS PERMEADO (ppm)
            let TDS_permeado = [];
            for (i=0; i < PermConductivityArray3.length+1; i++)
            {
                TDS_permeado[i] = PermConductivityArray3[i]*0.7;
            }

            //cálculo TEMPERATURA CORREÇÃO
            let Temp_correcao = [];
            for (i=0; i < FeeTemperatureArray3.length+1; i++)
            {
                if (FeeTemperatureArray3[i] <= 0) 
                { 
                    Temp_correcao[i] = 0;
                }
                if (FeeTemperatureArray3[i] > 0 ) 
                {
                    Temp_correcao[i] = Math.exp(2640 * ((1 / 298.15) - 1 / (FeeTemperatureArray3[i] + 273.15)));
                }
            }

            //cálculo CONCENTRAÇÃO MÉDIA CALCULADA ENTRADA (ppm)
            let conc_media_calculada_entrada = [];
            for (i=0; i < PermFlowArray3.length+1; i++)
            {
                if (PermFlowArray3[i] > 0) 
                { 
                   if (FeedConductivityArray3[i] > 0)
                   {
                    conc_media_calculada_entrada[i] = TDS_entrada_calculado[i] * Math.log(1 / (1 - PermFlowArray3[i] / FeedFlowArray3[i])) / (PermFlowArray3[i] / FeedFlowArray3[i]); 
                   }
                   if (FeedConductivityArray3[i] <= 0)
                   {
                    conc_media_calculada_entrada[i] = TDS_entrada[i] * Math.log(1 / (1 - PermFlowArray3[i] / FeedFlowArray3[i])) / (PermFlowArray3[i] / FeedFlowArray3[i]);   
                   }
                }
                if (PermFlowArray3[i] <= 0)
                {
                conc_media_calculada_entrada[i] = 0;
                }
            }

            //cálculo PRESSÃO OSMÓTICA ENTRADA (kgf/cm²)
            let pressao_osmotica_entrada = [];
            for (i=0; i < FeedPressureArray3.length+1; i++)
            {
                if (FeedPressureArray3[i] > 0 && FeeTemperatureArray3[i] > 0)
                {
                pressao_osmotica_entrada[i] = 0.0385 * conc_media_calculada_entrada[i] * (FeeTemperatureArray3[i] + 273.15) / ((1000 - (conc_media_calculada_entrada[i] / 1000)) * 14.25);
                }
                if (FeedPressureArray3[i] <= 0 || FeeTemperatureArray3[i] <= 0 )
                {
                pressao_osmotica_entrada[i] = 0;
                }
            }

            //cálculo PRESSÃO OSMÓTICA PERMEADO (kgf/cm²)
            let pressao_osmotica_permeado = [];
            for (i=0; i < FeedPressureArray3.length+1; i++)
            {
                if (FeedPressureArray3[i] <= 0)
                {
                    pressao_osmotica_permeado[i] = 0;
                }
                if (FeedPressureArray3[i] > 0 && PermConductivityArray3[i] > 0 && FeeTemperatureArray3[i] > 0)
                {
                    pressao_osmotica_permeado[i] = ((0.0385 * TDS_permeado_calculado[i] * (FeeTemperatureArray3[i] + 273.15)) / (1000 - (TDS_permeado_calculado[i] / 1000))) / 14.25;
                }
                if (FeedPressureArray3[i] > 0 && PermConductivityArray3[i] > 0 && FeeTemperatureArray3[i] <= 0)
                {
                    pressao_osmotica_permeado[i] = 0;
                }
                if (FeedPressureArray3[i] > 0 && PermConductivityArray3[i] <= 0)
                {
                    if (TDS_permeado[i] <=0 || FeeTemperatureArray3[i] <= 0)
                    {
                        pressao_osmotica_permeado[i] = 0;
                    }
                    if (TDS_permeado[i] > 0 && FeeTemperatureArray3[i] > 0)
                    {
                        pressao_osmotica_permeado[i] = ((0.0385 * TDS_permeado[i] * (FeeTemperatureArray3[i] + 273.15)) / (1000 - (TDS_permeado[i] / 1000))) / 14.25;
                    }
                }
            }

            // cálculo da PRESSÃO NET DRIVING
            let pressao_net_driving = [];
            for (i=0; i < FeedPressureArray3.length+1; i++)
            {
                if (FeedPressureArray3[i] > 0)
                {
                    pressao_net_driving[i] = FeedPressureArray3[i] - (PressaoDif[i] / 2) - pressao_osmotica_entrada[i] - pressao_permeado + pressao_osmotica_permeado[i];
                }
                if (FeedPressureArray3[i] <= 0)
                {
                    pressao_net_driving[i] = 0;
                }
            }

            //cálculo VAZÃO NORMALIZADA DO PERMEADO (m³/h)
            let vazao_normalizada_permeado = [];
            for (i=0; i < PermFlowArray3.length+1; i++)
            {
                if (PermFlowArray3[i] > 0)
                {
                    vazao_normalizada_permeado[i] = (pressao_net_driving_zero * Temp_correcao_zero) / (pressao_net_driving[i] * Temp_correcao[i]) * PermFlowArray3[i];
                }
                if (PermFlowArray3[i] <= 0)
                {
                    vazao_normalizada_permeado[i] = 0;
                }
            }

            //cálculo da PASSAGEM SAL NORMALIZADA PERMEADO (%)
            let passagem_normalizada = [];
            for (i=0; i < PermFlowArray3.length+1; i++)
            {
                if (PermFlowArray3[i] <= 0)
               {
                passagem_normalizada[i] = 0;
               }
               if (PermFlowArray3[i] > 0 && FeedConductivityArray3[i] > 0)
               {
                passagem_normalizada[i] = TDS_permeado_calculado[i] * PermFlowArray3[i] * Temp_correcao_zero * conc_media_calculada_entrada_zero / (vazao_permeado_zero * Temp_correcao[i] * conc_media_calculada_entrada[i] * TDS_entrada_calculado_zero) * 100;
               }
               if (PermFlowArray3[i] > 0 && FeedConductivityArray3[i] <= 0 && TDS_entrada[i] > 0)
               {
                passagem_normalizada[i] = TDS_permeado[i] * PermFlowArray3[i] * Temp_correcao_zero * conc_media_calculada_entrada_zero / (vazao_permeado_zero * Temp_correcao[i] * conc_media_calculada_entrada[i] * conc_media_calculada_entrada[i]) * 100;
               }
               if (PermFlowArray3[i] > 0 && FeedConductivityArray3[i] <= 0 && TDS_entrada[i] <= 0)
               {
                passagem_normalizada[i] = 0;
               }
            }

            //cálculo REJEIÇÃO SAL NORMALIZADA PERMEADO (%)
            let rejeicao_normalizada = [];
            for (i=0; i < PermFlowArray3.length+1; i++)
            {
                if (PermFlowArray3[i] <= 0)
                {
                    rejeicao_normalizada[i] = 0;
                }
                if (PermFlowArray3[i] > 0 && FeedConductivityArray3[i] > 0)
                {
                    rejeicao_normalizada[i] = 100 - passagem_normalizada[i];
                }
                if (PermFlowArray3[i] > 0 && FeedConductivityArray3[i] <= 0 && TDS_entrada[i] > 0)
                {
                    rejeicao_normalizada[i] = 100 - passagem_normalizada[i];
                }
                if (PermFlowArray3[i] > 0 && FeedConductivityArray3[i] <= 0 && TDS_entrada[i] <= 0)
                {
                    rejeicao_normalizada[i] = 0;
                }
            }

            //----------------------------------------FIM DOS CÁLCULOS-----------------------------------------------------
            this.setState({
                chartData:{
                    labels: DateArray3,
                    datasets: [
                        {
                            label: "Rejeição de Sal Normalizada do Permeado (%)",
                            data: rejeicao_normalizada,
                            lineTension: 0.1,
                            fill:false,
                            backgroundColor: 'rgba(216,216,216,0.4)',
                            borderColor: 'rgba(75,192,192,1)',
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderColor: 'rgba(75,192,192,1)',
                            pointBackgroundColor: '#fff',
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                            pointHoverBorderColor: 'rgba(220,220,220,1)',
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                        }
                    ]
                }
            });
        });
    }



    render(){
        return(
            <div className = "rejeicao_sal_normalizada_permeado">
                
                <Line
                    data = {this.state.chartData}
                    width = {1200}
                    height = {400}
                    options={{
                        title:{
                            display: true,
                            text: 'Rejeição de Sal Normalizada do Permeado (%)',
                            fontSize: 30
                        },
                        legend:{
                            display:false,
                            position: 'top',
                        },
                        scales:{
                            yAxes:[{
                                ticks: {
                                    beginAtZero: false,
                                }
                            }]
                        }
                    }}
                 />
                
            </div>
        )
    }
}

export default rejeicao_sal_normalizada_permeado;