/* Util libraries .*/
import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';
import ApexCharts from 'apexcharts';
import { Button } from '@material-ui/core';

/* Variables to buildup the time that the chart'll update .*/
var data = [];
var data_list = [];

/* Local variables that're used to build the data structure .*/
let variable;
let hour;
let minutes;
let seconds;
let formated_hour;
let date;
let dia,mes,ano,formated_date;
let add=0;
let vazaoEntradaII;
let vazaoPermeadoII;
let vazaoConcentradoII;
let pressaoEntradaII;
let pressaoConcentradoII;
let pressaoPermeadoI = 0.1;
let condutividadeEntradaII;
let condutividadePermeadoII;
let temperaturaEntradaII;
let me = this;

// function resetData(){
//   // Alternatively, you can also reset the data at certain intervals to prevent creating a huge series .
//   data = data.slice(data.length - 10, data.length);
// }

export default class vazao_normalzada_permeado extends Component {
  constructor(props) {
    super(props);
    this.state = {
    
      series: [{
        data: data_list.slice(),
        name:'Valor' // Here goes the name that'll appear when u hover the marker .
      }],
      options: {
        chart: {
          id: 'realtime',
          height: 250,
          type: 'line',
          animations: {
            enabled: true,
            easing: 'linear',
            dynamicAnimation: {
              speed: 1000 // The speed that the chart'll connect 2 lines .
            }
          },
          zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: false
          },
          toolbar: {
            show:false,
          }
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth',
        },
        title: {
          text: 'Vazão Normalizada do Permeado',
          align: 'center'
        },
        markers: {
          size: 0
        },
        xaxis: {
          type: 'category', // This type is a non-numeric so we can put everytype of data .
          range: 100, // Here is the range of the X axis ...  so 100 = 100 values in the X axis .
          title:{
            text:'',
          },
          labels:{
            show: true,
          },
          categories:{
            offsetX:10
          }
        },
        yaxis: {
          max: 15, // Here goes the max value for the Y axis .
          min: 0,
          range:500,
          title:{
            text:'m³/h',
          },
          decimalsInFloat: Number
        },
        legend: {
          show: true,
        },
      },
    };
  }
  componentDidMount() {

    /* Function that keeps the chart updating after every 10 seconds .*/
    window.setInterval(() => {
      if(formated_date!==0){
        if(data.length>0){
          ApexCharts.exec('realtime', 'updateSeries', [{
            data: data_list
          }]);
        }
      }
    }, 10000);
    
    // Setting the URL to create a WebSocket connection with the back-end server .
    this.ws = new WebSocket(this.props.data);

    this.ws.onmessage = e => {
      /* Building the data structure that were text formated .*/
      const value = JSON.parse(e.data);
      var lista_teste=value.IotData.data;
      var lista_converted='';
      
      /* Uncrypting the data that comes from raspberry/plc .*/
      lista_teste.map(function(item,i){
        if(item!==32 && item!==0){
          lista_converted=lista_converted+String.fromCharCode(item);
        }
      });
      let dados = lista_converted.split(',');
      
      /* Getting the date */
      [, date] = dados[0].split(':');
      [dia,mes]=date.split('/');
      /* Filtering variables */
      [, variable] = dados[2].split(':');
      /* Getting the exact hour */
      [, hour, minutes, seconds] = dados[1].split(':');
      formated_hour=`${date}-${hour}:${minutes}:${seconds}`;
      
      formated_date = `${dia}/${mes} ${hour}:${minutes}:${seconds}`;
      console.log(`data novo formato; ${formated_date}`);

      
      /**
       * Create variable for calculated 
       */
      
          
      [, vazaoPermeadoII] = dados[6].split(':');
      [, vazaoConcentradoII] = dados[7].split(':');
      [, pressaoEntradaII] = dados[9].split(':');
      [, pressaoConcentradoII] = dados[11].split(':');
      [, condutividadeEntradaII] = dados[2].split(':');
      [, condutividadePermeadoII] = dados[3].split(':');
      [, temperaturaEntradaII] = dados[5].split(':');
      // [, vazaoEntradaII] = dados[8].split(':');

      let vazaoPermeadoI = parseFloat(vazaoPermeadoII);
      let vazaoConcentradoI = parseFloat(vazaoConcentradoII)
      let pressaoEntradaI = parseFloat(pressaoEntradaII)
      let pressaoConcentradoI = parseFloat(pressaoConcentradoII)
      let condutividadeEntradaI = parseFloat(condutividadeEntradaII)
      let condutividadePermeadoI = parseFloat(condutividadePermeadoII)
      let temperaturaEntradaI = parseFloat(temperaturaEntradaII)
      // let vazaoEntradaI = parseFloat(vazaoEntradaII);


      const vazaoPermeadoZero = 60.94;
      const vazaoConcentradoZero = 20.74;
      const pressaoEntrada = 8.76;
      const pressaoConcentradoZero = 7.68;
      const pressaoPermeadoZero = 6.14;
      const condutividadePermeadoZero = 2;
      const temperaturaEntradaZero = 25;
      const pressureNetDrivingZero = 2.02514;
      const correcaoTemperaturaZero = 1;
      const concentracaoMediaCalculadaEntradaZero = 69.087149;
      const TDSCalculatedFeedZero = 37.603419;
      /**
       * Calulate
       */

  function getData(dados) {
    console.log('click')
  }
  // let getData = getData(dados)
        
  function funcTDSCalculatedFeed(condutividadeEntradaI) {
    if (condutividadeEntradaI == 0) { //TODO; Confirmar variavel ()
        let TDSCalculatedFeed;
        return TDSCalculatedFeed = 0;
    }
    if (condutividadeEntradaI > 0 && condutividadeEntradaI <= 7630) {
        let TDSCalculatedFeed = 7.7013840097 * Math.pow(10, -20) * Math.exp(Math.pow(-90.475562243 - Math.log(condutividadeEntradaI), 2) / 188.88442227);
        return TDSCalculatedFeed;
    }
    if (condutividadeEntradaI > 7630) {
        let TDSCalculatedFeed = 8.0090966 * Math.pow(10, -11) * Math.exp(Math.pow(-50.645805186 - Math.log(condutividadeEntradaI), 2) / 112.483950289);
        return TDSCalculatedFeed;

    }
  }
  let TDSCalculatedFeed = funcTDSCalculatedFeed(condutividadeEntradaI);
  // console.log(`Condutividade de Entrada: ${TDSCalculatedFeed}`);

  function funcTDSFeed(condutividadeEntradaI) {
    let TDSFeedI = condutividadeEntradaI * 0.7;
    return TDSFeedI;
  }
  let TDSFeedI = funcTDSFeed(condutividadeEntradaI);
  // console.log(`TDS feed: ${TDSFeedI}`);

  function funcTDSCalculatedPermeado(condutividadePermeadoI) {
    if (condutividadePermeadoI == 0) { //TODO; Confirmar variavel ()
        return TDSCalculatedPermeado = 0;
    }
    if (condutividadePermeadoI > 0 && condutividadePermeadoI <= 7630) {
        let TDSCalculatedPermeado = 7.7013840097 * Math.pow(10, -20) * Math.exp(Math.pow(-90.475562243 - Math.log(condutividadePermeadoI), 2) / 188.88442227);
        return TDSCalculatedPermeado;
    }
    if (condutividadePermeadoI > 7630) {
        let TDSCalculatedPermeado = 8.0090966 * Math.pow(10, -11) * Math.exp(Math.pow(-50.645805186 - Math.log(condutividadePermeadoI), 2) / 112.483950289);
        return TDSCalculatedPermeado;
    }
  }

  let TDSCalculatedPermeado = funcTDSCalculatedPermeado(condutividadePermeadoI);
  //  console.log(`TDS Calculated Permeado: ${TDSCalculatedPermeado}`);

  function funcTDSPermeado(condutividadePermeadoI) {
    let TDSPermeado = condutividadePermeadoI * 0.7;
    return TDSPermeado;
  }

  let TDSPermeado = funcTDSPermeado(condutividadePermeadoI);
  // console.log(`TDS Permeado: ${TDSPermeado}`);

  function funcVazaoEntrada(vazaoPermeadoI, vazaoConcentradoI) {
    let vazaoEntrada = vazaoPermeadoI + vazaoConcentradoI;
    return vazaoEntrada;
}

  let vazaoEntradaI = parseFloat(funcVazaoEntrada(vazaoPermeadoI, vazaoConcentradoI));
  // console.log(typeof(vazaoEntradaI));
  // console.log(`valor entrada função ${vazaoEntradaI}`)
  function funcPressaoDiferencial(pressaoEntradaI, pressaoConcentradoI) {

    if (pressaoEntradaI > 0) {
        let pressaoDiferencialI = pressaoEntradaI - pressaoConcentradoI; //TODO; confiarmar variaveis (x)
        return pressaoDiferencialI
    }
    if (pressaoEntradaI <= 0) {
        let pressaoDiferencialI = 0;
        return pressaoDiferencialI
    }
  }

  let pressaoDiferencialI = funcPressaoDiferencial(pressaoEntradaI, pressaoConcentradoI);
  // console.log(`Pressão Diferencial: ${pressaoDiferencialI}`);

  function funcCorrecaoTemperatura(temperaturaEntradaI) {
    if (temperaturaEntradaI <= 0) {
        let correcaoTemperatura = 0;
        return correcaoTemperatura;
    } else {
        let correcaoTemperatura = Math.exp(2640 * ((1 / 298.15) - 1 / (temperaturaEntradaI + 273.15)));
        return correcaoTemperatura;
    }
  }

  let correcaoTemperatura = funcCorrecaoTemperatura(temperaturaEntradaI);
  // console.log(`Correção do fator de Temperatura: ${correcaoTemperatura}`);

  function funcConcentracaoMediaCalculadaEntrada(TDSCalculatedFeed, vazaoPermeadoI, condutividadeEntradaI, vazaoEntradaI, TDSFeedI) {
    let concentracaoMediaCalculadaEntrada;
    if (vazaoPermeadoI > 0) {
        if (condutividadeEntradaI > 0) {
            return concentracaoMediaCalculadaEntrada = TDSCalculatedFeed * Math.log(1 / (1 - vazaoPermeadoI / vazaoEntradaI)) / (vazaoPermeadoI / vazaoEntradaI);
            if (condutividadeEntradaI <= 0) {
                return concentracaoMediaCalculadaEntrada = TDSFeedI * Math.log(1 / (1 - vazaoPermeadoI / vazaoEntradaI)) / (vazaoPermeadoI / vazaoEntradaI);
            }
        }
        if (vazaoPermeadoI <= 0) {
            return concentracaoMediaCalculadaEntrada = 0;
        }
    }
  }
  let concentracaoMediaCalculadaEntrada = funcConcentracaoMediaCalculadaEntrada(TDSCalculatedFeed, vazaoPermeadoI, condutividadeEntradaI, vazaoEntradaI, TDSFeedI);


  function funcPressaoOsmoticaEntrada(pressaoEntradaI, temperaturaEntradaI, concentracaoMediaCalculadaEntrada) {
    if (pressaoEntradaI > 0 && temperaturaEntradaI > 0) {
        let pressaoOsmoticaEntradaI = 0.0385 * concentracaoMediaCalculadaEntrada * (temperaturaEntradaI + 273.15) / ((1000 - (concentracaoMediaCalculadaEntrada / 1000)) * 14.25);
        return pressaoOsmoticaEntradaI;

        //TODO; confirmar se tem o .015 (x)
    }

    if (pressaoEntradaI <= 0 || temperaturaEntradaI <= 0) {
        let pressaoOsmoticaEntradaI = 0
        return pressaoOsmoticaEntradaI
    }
  }

  let pressaoOsmoticaEntradaI = funcPressaoOsmoticaEntrada(pressaoEntradaI, temperaturaEntradaI, concentracaoMediaCalculadaEntrada);
  // console.log(`Pressão Osmotica de Entrada: ${pressaoOsmoticaEntradaI}`);

  function funcPressaoOsmoticaPermeado(pressaoEntradaI, condutividadePermeadoI, TDSCalculatedPermeado, TDSPermeado) {

    if (pressaoEntradaI <= 0) {
        let pressaoOsmoticaPermeado;
        return pressaoOsmoticaPermeado = 0;
    }
    if (pressaoEntradaI > 0 && condutividadePermeadoI > 0 && temperaturaEntradaI > 0) {
        let pressaoOsmoticaPermeado = ((0.0385 * TDSCalculatedPermeado * (temperaturaEntradaI + 273.15)) / (1000 - (TDSCalculatedPermeado / 1000))) / 14.25;
        return pressaoOsmoticaPermeado;

    }
    if (pressaoEntradaI > 0 && condutividadePermeadoI > 0 && temperaturaEntradaI <= 0) {
        let pressaoOsmoticaPermeado;
        return pressaoOsmoticaPermeado = 0;
    }

    if (pressaoEntradaI > 0 && condutividadePermeadoI <= 0) {
        if (TDSPermeado <= 0 || temperaturaEntradaI <= 0) {
            let pressaoOsmoticaPermeado;
            return pressaoOsmoticaPermeado = 0;
        } else {
            let pressaoOsmoticaPermeado = ((0.0385 * TDSPermeado * (temperaturaEntradaI + 273.15)) / (1000 - (TDSPermeado / 1000))) / 14.25;
            return pressaoOsmoticaPermeado;
        }

    }
  }

  let pressaoOsmoticaPermeado = funcPressaoOsmoticaPermeado(pressaoEntradaI, condutividadePermeadoI, TDSCalculatedPermeado, TDSPermeado);
  // console.log(`Pressâo Osmotica do Permeado: ${pressaoOsmoticaPermeado}`);

  function funcPressureNetDriving(pressaoEntradaI, pressaoDiferencialI, pressaoOsmoticaEntradaI, pressaoPermeadoI, pressaoOsmoticaPermeado) {
    let pressureNetDrivingI

    if (pressaoEntradaI > 0) {
        return pressureNetDrivingI = pressaoEntradaI - (pressaoDiferencialI / 2) - pressaoOsmoticaEntradaI - pressaoPermeadoI + pressaoOsmoticaPermeado; //TODO; confirmar variavel (x)
        
    }
    if (pressaoEntradaI <= 0) {
        return pressureNetDrivingI = 0;
    }
  }
  let pressureNetDrivingI = funcPressureNetDriving(pressaoEntradaI, pressaoDiferencialI, pressaoOsmoticaEntradaI, pressaoPermeadoI, pressaoOsmoticaPermeado);
  // console.log(`Pressure Net Driving: ${pressureNetDrivingI}`);
  // console.log(pressaoEntradaI);

  function funcVazaoNormalizadaPermeado(vazaoPermeadoI, pressureNetDrivingZero, pressureNetDrivingI, correcaoTemperatura, correcaoTemperaturaZero) {
    let vazaoNormalizadaPermeado
    if (vazaoPermeadoI > 0) {
        return vazaoNormalizadaPermeado = (pressureNetDrivingZero * correcaoTemperaturaZero) / (pressureNetDrivingI * correcaoTemperatura) * vazaoPermeadoI;
      
    }
    if (vazaoPermeadoI < 0) {
        return vazaoNormalizadaPermeado = 0;
    }
  }

  let vazaoNormalizadaPermeado = funcVazaoNormalizadaPermeado(vazaoPermeadoI, pressureNetDrivingZero, pressureNetDrivingI, correcaoTemperatura, correcaoTemperaturaZero);
  // console.log(`Vazão Normalizada do Permeado:${vazaoNormalizadaPermeado}`);

  function funcPassagemNormalizadaDeSalDoPermeado(vazaoPermeadoI,condutividadeEntradaI,TDSCalculatedPermeado, correcaoTemperaturaZero, concentracaoMediaCalculadaEntradaZero, vazaoPermeadoZero, TDSCalculatedFeedZero, concentracaoMediaCalculadaEntrada, TDSPermeado) {
    let PassagemNormalizadaDeSalDoPermeado;
    if (vazaoPermeadoI <= 0) {
        return PassagemNormalizadaDeSalDoPermeado = 0;
    }
    if (vazaoPermeadoI > 0 && condutividadeEntradaI > 0) {
        return PassagemNormalizadaDeSalDoPermeado = TDSCalculatedPermeado * vazaoPermeadoI * correcaoTemperaturaZero * concentracaoMediaCalculadaEntradaZero / (vazaoPermeadoZero * correcaoTemperatura * concentracaoMediaCalculadaEntrada * TDSCalculatedFeedZero) * 100;
    }
    if (vazaoPermeadoI > 0 && condutividadeEntradaI <= 0 && TDSFeedI > 0) {
        return PassagemNormalizadaDeSalDoPermeado = TDSPermeado * vazaoPermeadoI * correcaoTemperaturaZero * concentracaoMediaCalculadaEntradaZero / (vazaoPermeadoZero * correcaoTemperatura * concentracaoMediaCalculadaEntrada * TDSCalculatedFeedZero) * 100;

    }
    if (vazaoPermeadoI > 0 && condutividadeEntradaI <= 0 && TDSFeedI <= 0) {
        return PassagemNormalizadaDeSalDoPermeado = 0;

    }
  }

  let PassagemNormalizadaDeSalDoPermeado = funcPassagemNormalizadaDeSalDoPermeado(vazaoPermeadoI,condutividadeEntradaI,TDSCalculatedPermeado, correcaoTemperaturaZero, concentracaoMediaCalculadaEntradaZero, vazaoPermeadoZero, TDSCalculatedFeedZero,concentracaoMediaCalculadaEntrada, TDSPermeado);
  // console.log(`Passagem Normalizada de Sal: ${PassagemNormalizadaDeSalDoPermeado}`);


  function funcRejeicaoNormalizadaDeSalDoPermeado(vazaoPermeadoI, condutividadeEntradaI, PassagemNormalizadaDeSalDoPermeado, TDSFeedI) {
    let RejeicaoNormalizadaDeSalDoPermeado
    if (vazaoPermeadoI <= 0) {
        return RejeicaoNormalizadaDeSalDoPermeado = 0; 
    }
    if (vazaoPermeadoI > 0 && condutividadeEntradaI > 0) {
        return RejeicaoNormalizadaDeSalDoPermeado = 100 - PassagemNormalizadaDeSalDoPermeado; 

    }
    if (vazaoPermeadoI > 0 && condutividadeEntradaI <= 0 && TDSFeedI > 0) {
        return RejeicaoNormalizadaDeSalDoPermeado = 100 - PassagemNormalizadaDeSalDoPermeado; 

    }
    if (vazaoPermeadoI > 0 && condutividadeEntradaI <= 0 && TDSFeedI <= 0) {
        return RejeicaoNormalizadaDeSalDoPermeado = 0; 

    }
  }

  let RejeicaoNormalizadaDeSalDoPermeado = funcRejeicaoNormalizadaDeSalDoPermeado(vazaoPermeadoI, condutividadeEntradaI, PassagemNormalizadaDeSalDoPermeado, TDSFeedI);
  // console.log(`Reijeção Normalizada de Sal do Permeado: ${RejeicaoNormalizadaDeSalDoPermeado}`);
    /*
       Creating a local variable that store the object that'll be sent to 
       the Data of this chart .
      */
      let obj = {x:formated_date,y:parseFloat(vazaoNormalizadaPermeado)};
      add=add+100;
      data_list.push(obj);

      /* Updating chart .*/
      this.setState({
        series:[{
          data:data_list.slice(),
        }]
      });
    };
  }
  componentWillUnmount() {
    this.ws.close();
  }

  /* Rendering the component .*/
  render() {
    return (
      <div>
        <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={350} />
      </div>
    );
  }
}
