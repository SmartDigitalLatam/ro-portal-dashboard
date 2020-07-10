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
                let texto = [`Pressão`, `Diferencial`];
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
    
      //pegando valor do api - uri - localhost
      const value = res.data;
  
      // pega o valor especifico dentro da aarray de obejtos e gera um anova array de objetos
      let novo_array = [];

      value.map(function(i){
          novo_array.push({
              "Date": i.Date,
              "PressureConcentradStageOne": i.PressureConcentradStageOne,
          });
      })
  
     //pega apenas o valor da array de objeto transformando em uma array
     let PressureConcentradStageOneArray1 = novo_array.map(a => a.PressureConcentradStageOne);
     let DateArray1 = novo_array.map(a => a.Date);
 
     //converte a array de string em nnumeros
     let PressureConcentradStageOneArray2 = PressureConcentradStageOneArray1.map(Number);
     let DateArray2 = DateArray1;

     //let PressureConcentradStageOneArray3 = PressureConcentradStageOneArray2.reverse();
     //let DateArray3 = DateArray2.reverse();  
      
    //---------------------------PEGANDO ÚLTIMO VALOR DA STRING--------------------------------------
    
    //armazenando valor da última posição na var k
    let k = PressureConcentradStageOneArray2.length;
   
    let PressureConcentradStageOne_value = PressureConcentradStageOneArray2[k-1];

    //.tofixed determina o quanto de algarismos terá meu número 
    this.setState({
      series: [PressureConcentradStageOne_value.toFixed(3)],
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
