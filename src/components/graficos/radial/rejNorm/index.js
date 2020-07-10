/* Importing util libraries .*/
import React, { Component } from 'react';
import Chart from 'react-apexcharts';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import axios from 'axios';

/* Style from local folder .*/
import { Container } from './styles';


class RadialBar extends Component {  
  constructor(props) {
    super(props);
    this.state = {
      nombre:'Testando o SetState',
      options: {
        chart: {
        height: 250,
        type: 'radialBar',
        toolbar: {
          show: false
        },
      },
      plotOptions: {
        radialBar: {
          startAngle: 0,
          endAngle: 360,
           hollow: {
            margin: 0,
            //tamanho do 'circulo'
            size: '65%',
            background: '#fff',
            image: undefined,
            imageOffsetX: 0,
            imageOffsetY: 0,
            position: 'front',
            dropShadow: {
              enabled: true,
              top: 5,
              left: 0,
              blur: 5,
              opacity: 0.12
            }
          },
          track: {
            background: '#fff',
            strokeWidth: '10%',
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 7,
              opacity: 0.35
            }
          },
          dataLabels: {
            show: true,
            name: {
              offsetY: -55,
              show: true,
              color: '#888',
              /* Function that format the text inside the chart(Break lines) .*/
              formatter: function(val) {
                let texto = [`SOS Disp`, `(ft/s)`];
                return texto;
              },
            },
            value: {
              /* Function that adds a '%' in the value of the chart .*/
              formatter: function(val) {
                return [parseFloat(val)];
              },
              color:'#888',
              show: true,
              offsetY: 10
            }
          }
        }
      },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: 'vertical',
            shadeIntensity: 0.5,
            gradientToColors: ['#ABE5A1'],
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100]
          }
        },
        stroke: {
          lineCap: 'round'
        },
        //labels: ['Vazão Normalizada do Permeado'],
      },
      series: [0], // Value that goes to the radial chart .
    }
  }
  componentDidMount() {

    axios.get("/person").then(res => {
       
      const value = res.data;
      let novo_array = [];
     
      // pega o valor especifico dentro da aarray de obejtos e gera um anova array de objetos
     value.map(function(i){
          novo_array.push({
              "Date": i.Date,
              "FeedPressure": i.FeedPressure,
              "ConcentratedPressure": i.ConcentratedPressure,
              "FeedConductivity": i.FeedConductivity,
              "PermConductivity": i.PermConductivity,
              "PermFlow": i.PermFlow,
              "ConcentratedFlow": i.ConcentratedFlow,
              "FeedFlow": i.FeedFlow,
              "FeeTemperature": i.FeeTemperature,
          });
      })
  
      //pega apenas o valor da array de objeto transformando em uma array
      let FeedPressureArray1 = novo_array.map(a => a.FeedPressure);
      let ConcentratedPressureArray1 = novo_array.map(a => a.ConcentratedPressure);
      let FeedConductivityArray1 = novo_array.map(a => a.FeedConductivity);
      let PermConductivityArray1 = novo_array.map(a => a.PermConductivity);
      let PermFlowArray1 = novo_array.map(a => a.PermFlow);
      let ConcentratedFlowArray1 = novo_array.map(a => a.ConcentratedFlow);
      let FeedFlowArray1 = novo_array.map(a => a.FeedFlow);
      let FeeTemperatureArray1 = novo_array.map(a => a.FeeTemperature);
      let DateArray1 = novo_array.map(a => a.Date);
  
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
        
      
    //---------------------------PEGANDO ÚLTIMO VALOR DA STRING--------------------------------------
    
    //armazenando valor da última posição na var k
    let k = rejeicao_normalizada.length;
   
    let rejeicao_normalizada_value = rejeicao_normalizada[k-1];

    //.tofixed determina o quanto de algarismos terá meu número 
    this.setState({
      series: [rejeicao_normalizada_value.toFixed(3)],
    });

      })
  }

  componentWillUnmount() {
    this.ws.close();
  }

  /* Rendering the component .*/
  render() {
    return (
      <Container>
        <div className="radialbar">
          <Grid container spacing={0.5} direction="row" justify="center" alignItems="center" id="graph_card">
            <Grid item xs={12}>
              <Chart id="graph" options={this.state.options} series={this.state.series} type="radialBar" height="280" />
            </Grid> 
          </Grid>
        </div>
      </Container>
    );
  }
}

export default RadialBar;
